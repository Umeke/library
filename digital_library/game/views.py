from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from .models import GameResult, Question
from digital_library.books.models import Book
import openai
from django.conf import settings
import json

openai.api_key = settings.OPENAI_API_KEY

SUPPORTED_LANGUAGES = [
    ('kazakh', 'Қазақша'),
    ('russian', 'Русский'),
    ('english', 'English'),
]

@login_required
def select_book(request):
    books = Book.objects.all()
    if request.method == 'POST':
        book_id = request.POST.get('book_id')
        language = request.POST.get('language')

        return redirect('game:ask_question', book_id=book_id, language=language)

    return render(request, 'game/select_book.html', {
        'books': books,
        'languages': SUPPORTED_LANGUAGES
    })


def generate_questions(book, language):
    try:
        prompt = f"Generate 5 multiple-choice questions about the book (title: {book.title}, author: {book.author}) in {language}. " \
                 f"Return JSON array ('question': text, 'options':list, 'correct':text)."
        client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        content = response.choices[0].message.content
        print(content)
        questions = json.loads(content)
        return questions
    except Exception as e:
        print(f"Error generating questions: {e}")
        return None

@login_required
def ask_question(request, book_id, language):
    if 'questions' not in request.session:
        book = Book.objects.get(id=book_id)
        questions = generate_questions(book, language)

        if questions:
            clear_session(request)
            request.session['questions'] = questions
            request.session['current_question'] = 0
            request.session['score'] = 0
            request.session['book_id'] = book.id
            request.session['language'] = language
        else:
            messages.error(request, "Failed to generate questions. Please try again later.")
            return redirect('game:error')

    current_question_index = request.session['current_question']
    questions = request.session['questions']

    if current_question_index >= len(questions):
        return redirect('game:show_result')
    current_question = questions[current_question_index]

    context = {
        'book_id': book_id,
        'language': language,
        'index': current_question_index,
        'question': current_question['question'],
        'options': current_question['options']
    }
    return render(request, 'game/ask_question.html', context)

@login_required
def ask_local_question(request, book_id):
    book = get_object_or_404(Book, id=book_id)

    questions = Question.objects.filter(book=book).order_by('?')[:5]

    if not questions:
        return render(request, 'error.html', {
            'message': 'No questions available for this book.'
        })

    clear_session(request)
    request.session['questions'] = [{'question': q.text, 'options': q.get_answers(), 'correct': q.correct_answer} for q
                                    in questions]
    request.session['book_id'] = book.id
    request.session['language'] = book.language
    request.session['current_question'] = 0
    request.session['score'] = 0
    current_question = request.session['questions'][0]
    context = {
        'book_id': book_id,
        'language': book.language,
        'index': 0,
        'question': current_question['question'],
        'options': current_question['options']
    }
    return render(request, 'game/ask_question.html', context)


@login_required
def submit_answer(request):
    questions = request.session.get('questions', [])
    current_question_index = request.session.get('current_question', 0)
    user_answer = request.POST.get('answer')
    if current_question_index < len(questions):
        current_question = questions[current_question_index]
        correct_answer = current_question.get('correct', '')

        if user_answer == correct_answer:
            request.session['score'] = request.session.get('score', 0) + 1

        if 'results' not in request.session:
            request.session['results'] = []
        request.session['results'].append((current_question['question'], user_answer, correct_answer))

        request.session['current_question'] = current_question_index + 1

        if request.session['current_question'] < len(questions):
            return redirect('game:ask_question', book_id=request.session['book_id'],
                            language=request.session['language'])

    return redirect('game:show_result')


@login_required
def show_result(request):
    score = request.session.get('score', 0)
    total_questions = len(request.session.get('questions', []))
    results = request.session.get('results', [])
    book_id = request.session.get('book_id')
    book = Book.objects.get(id=book_id)
    GameResult.objects.create(book=book, user=request.user, score=score)
    clear_session(request)

    return render(request, 'game/result.html', {
        'score': score,
        'total_questions': total_questions,
        'results': results,
        'book_id': book_id,
    })


def view_ratings(request, book_id):
    book = Book.objects.get(id=book_id)
    results = GameResult.objects.filter(book=book).order_by('-score', 'date_played')
    context = {
        'book': book,
        'results': results
    }
    return render(request, 'game/ratings.html', context)


def clear_session(request):
    keys_to_clear = ['questions', 'current_question', 'score', 'results', 'book_id', 'language']
    for key in keys_to_clear:
        if key in request.session:
            del request.session[key]


def restart_game(request):
    # GameResult.objects.all().delete()
    clear_session(request)
    return redirect('game:select_book')


def error_page(request):
    return render(request, 'error.html', {
        'message': messages.get_messages(request),
    })
