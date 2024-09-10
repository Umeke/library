from django.contrib import admin
from django.http import HttpResponseRedirect

from .models import Book, UserBookProgress, UserFinishedBook, ExchangeRequest
from ..game.models import Question, Answer

from ..game.views import generate_questions


def generate_questions_action(modeladmin, request, queryset):
    for book in queryset:
        language = book.language
        generate_questions_for_book(book, language)
    modeladmin.message_user(request, "Questions generated successfully for the selected books.")
    return HttpResponseRedirect(request.get_full_path())


generate_questions_action.short_description = "Generate questions"


def generate_questions_for_book(book, language):
    questions = generate_questions(book, language)
    print(questions)
    for question_data in questions:
        question = Question.objects.create(book=book, text=question_data['question'],
                                           correct_answer=question_data['correct'])
        for option in question_data['options']:
            Answer.objects.create(question=question, text=option)


class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'isbn', 'owner')
    search_fields = ('title', 'author', 'isbn')
    list_filter = ('author', 'owner')
    actions = [generate_questions_action]


class UserBookProgressAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'progress', 'is_finished', 'shared', 'updated_at')
    list_filter = ('is_finished', 'shared', 'updated_at')
    search_fields = ('user__username', 'book__title')


class UserFinishedBookAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'finished_at')
    search_fields = ('user__username', 'book__title')


@admin.register(ExchangeRequest)
class ExchangeRequestAdmin(admin.ModelAdmin):
    list_display = ('book', 'requester', 'accepted')
    list_filter = ('accepted',)
    search_fields = ('book__title', 'requester__username')


admin.site.register(Book, BookAdmin)
admin.site.register(UserBookProgress, UserBookProgressAdmin)
admin.site.register(UserFinishedBook, UserFinishedBookAdmin)
