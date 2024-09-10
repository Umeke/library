from django.contrib.auth.decorators import login_required
from .models import Book, ExchangeRequest, UserFinishedBook, UserBookProgress, Discussion, Comment
from .forms import ExchangeRequestForm, BookForm, UpdateProgressForm, CommentForm, DiscussionForm

from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin

from ..clubs.models import Club


class BookListView(ListView):
    template_name = 'books/book_list.html'
    model = Book
    paginate_by = 100

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        books = Book.objects.filter(is_visible=True)
        context['books'] = books
        return context


class BookDetailView(DetailView):
    template_name = 'books/book_detail.html'  # Point to your book detail template
    model = Book

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['book'] = self.object
        return context


class BookFormView(LoginRequiredMixin, CreateView):
    form_class = BookForm
    template_name = 'books/book_form.html'  # Point to your book form template
    login_url = '/accounts/login/'  # Redirect to login if user is not authenticated

    def form_valid(self, form):
        book = form.save(commit=False)
        book.owner = self.request.user  # Set the logged-in user as the owner
        book.save()
        return redirect(reverse('books:book_list'))


class BookUpdateFormView(LoginRequiredMixin, UpdateView):
    form_class = BookForm
    template_name = 'books/book_form.html'  # Point to your book form template
    model = Book
    login_url = '/accounts/login/'

    def form_valid(self, form):
        self.object = form.save(commit=False)
        if self.object.owner == self.request.user:  # Ensure only the owner can update the book
            self.object.save()
            return redirect(reverse('books:book_list'))
        else:
            return redirect(reverse('books:book_list'))


# @login_required
# def book_list(request):
#     books = Book.objects.filter(is_available=True).exclude(owner=request.user)
#     return render(request, 'books/book_list.html', {'books': books})
#
# @login_required
# def book_detail(request, pk):
#     book = get_object_or_404(Book, pk=pk)
#     return render(request, 'books/book_detail.html', {'book': book})

@login_required
def exchange_request(request, pk):
    book = get_object_or_404(Book, pk=pk)
    if request.method == 'POST':
        form = ExchangeRequestForm(request.POST)
        if form.is_valid():
            exchange_request = form.save(commit=False)
            exchange_request.book = book
            exchange_request.requester = request.user
            exchange_request.save()
            return redirect('book_list')
    else:
        form = ExchangeRequestForm()
    return render(request, 'books/exchange_request.html', {'form': form, 'book': book})


# def book_create(request):
#     if request.method == 'POST':
#         form = BookForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('books:book_list')  # Redirect to the book list after creating a book
#     else:
#         form = BookForm()
#
#     return render(request, 'books/book_form.html', {'form': form})


def track_book_progress(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    progress, created = UserBookProgress.objects.get_or_create(user=request.user, book=book)

    if request.method == 'POST':
        progress_value = request.POST.get('progress')
        share = request.POST.get('share', False)
        progress.progress = int(progress_value)
        progress.is_finished = True if int(progress_value) == 100 else False
        progress.shared = bool(share)
        progress.save()

        return redirect('user_books')  # Redirect to user books overview or detail page

    context = {
        'book': book,
        'progress': progress,
    }
    return render(request, 'books/track_progress.html', context)


@login_required
def shared_progress(request):
    shared_books = UserBookProgress.objects.filter(shared=True).select_related('user', 'book')
    context = {
        'shared_books': shared_books
    }
    return render(request, 'books/shared_progress.html', context)


@login_required
def finished_books(request):
    finished_books = UserFinishedBook.objects.filter(user=request.user)
    context = {
        'finished_books': finished_books
    }
    return render(request, 'books/finished_books.html', context)


@login_required
def profile_bookshelf(request):
    user = request.user
    progress_books = UserBookProgress.objects.filter(user=user)
    finished_books = UserFinishedBook.objects.filter(user=user)
    user_books = Book.objects.filter(owner=user)
    requests = ExchangeRequest.objects.filter(book__owner=request.user, accepted=False)

    context = {
        'progress_books': progress_books,
        'finished_books': finished_books,
        'user_books': user_books,
        'pending_requests': requests,
    }
    return render(request, 'books/profile_bookshelf.html', context)


@login_required
def add_edit_progress(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    progress, created = UserBookProgress.objects.get_or_create(user=request.user, book=book)

    if request.method == 'POST':
        form = UpdateProgressForm(request.POST, instance=progress)
        if form.is_valid():
            form.save()
            return redirect('books:profile_bookshelf')
    else:
        form = UpdateProgressForm(instance=progress)

    return render(request, 'books/add_edit_progress.html', {'form': form, 'book': book})


@login_required
def add_to_finished_books(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    UserFinishedBook.objects.get_or_create(user=request.user, book=book)
    return redirect('books:profile_bookshelf')


@login_required
def remove_finished_book(request, book_id):
    finished_book = get_object_or_404(UserFinishedBook, user=request.user, book_id=book_id)
    finished_book.delete()
    return redirect('books:profile_bookshelf')


@login_required
def toggle_visibility(request, book_id):
    book = get_object_or_404(Book, id=book_id, owner=request.user)
    book.is_visible = not book.is_visible
    book.save()
    return redirect('books:profile_bookshelf')


@login_required
def toggle_progress_visibility(request, book_id):
    progress_book = get_object_or_404(UserBookProgress, user=request.user, book_id=book_id)
    progress_book.toggle_visibility()
    return redirect('books:profile_bookshelf')


def search_results(request):
    query = request.GET.get('query')
    if query:
        books = Book.objects.filter(title__icontains=query)
        clubs = Club.objects.filter(name__icontains=query)
    else:
        books = Book.objects.none()
        clubs = Club.objects.none()

    context = {
        'query': query,
        'books': books,
        'clubs': clubs
    }
    return render(request, 'books/search_results.html', context)


@login_required
def create_exchange_request(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    if request.method == 'POST':
        form = ExchangeRequestForm(request.POST)
        if form.is_valid():
            exchange_request = form.save(commit=False)
            exchange_request.book = book
            exchange_request.requester = request.user
            exchange_request.save()
            return redirect('books:book_list')
    else:
        form = ExchangeRequestForm()

    return render(request, 'books/exchange_request_form.html', {'form': form, 'book': book})


@login_required
def pending_requests(request):
    requests = ExchangeRequest.objects.filter(book__owner=request.user, accepted=False)
    return render(request, 'books/pending_requests.html', {'requests': requests})


@login_required
def accept_request(request, request_id):
    exchange_request = get_object_or_404(ExchangeRequest, id=request_id, book__owner=request.user)
    exchange_request.accepted = True
    exchange_request.save()
    UserBookProgress.objects.get_or_create(book=exchange_request.book, user=exchange_request.requester)
    return redirect('books:profile_bookshelf')


@login_required
def reject_request(request, request_id):
    exchange_request = get_object_or_404(ExchangeRequest, id=request_id, book__owner=request.user)
    exchange_request.delete()  # Rejecting deletes the request
    return redirect('books:profile_bookshelf')


@login_required
def start_discussion(request, book_id):
    book = get_object_or_404(Book, id=book_id)

    if request.method == 'POST':
        form = DiscussionForm(request.POST)
        if form.is_valid():
            discussion = form.save(commit=False)
            discussion.book = book
            discussion.created_by = request.user
            discussion.save()
            return redirect('books:discussion_detail', book_id=book.id, discussion_id=discussion.id)
    else:
        form = DiscussionForm()

    return render(request, 'books/start_discussion.html', {'form': form, 'book': book})


def discussion_list(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    discussions = book.discussions.all()
    return render(request, 'books/discussion_list.html', {'book': book, 'discussions': discussions})


def discussion_detail(request, book_id, discussion_id):
    discussion = get_object_or_404(Discussion, id=discussion_id, book_id=book_id)
    comments = discussion.comments.filter(parent__isnull=True)

    if request.method == 'POST':
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.discussion = discussion
            new_comment.created_by = request.user
            new_comment.save()
            return redirect('books:discussion_detail', book_id=book_id, discussion_id=discussion_id)
    else:
        comment_form = CommentForm()

    return render(request, 'books/discussion_detail.html', {
        'discussion': discussion,
        'comments': comments,
        'comment_form': comment_form
    })

@login_required
def add_comment(request, discussion_id):
    discussion = get_object_or_404(Discussion, id=discussion_id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.created_by = request.user
            comment.discussion = discussion
            comment.save()
            return redirect('books:discussion_detail', book_id=discussion.book.id, discussion_id=discussion.id)
    else:
        form = CommentForm()
    return render(request, 'books/add_comment.html', {'form': form, 'discussion': discussion})


@login_required
def reply_comment(request, discussion_id, comment_id):
    discussion = get_object_or_404(Discussion, id=discussion_id)
    parent_comment = get_object_or_404(Comment, id=comment_id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            reply = form.save(commit=False)
            reply.created_by = request.user
            reply.discussion = discussion
            reply.parent = parent_comment
            reply.save()
            return redirect('books:discussion_detail', book_id=discussion.book.id, discussion_id=discussion.id)
    else:
        form = CommentForm()
    return render(request, 'books/reply_comment.html',
                  {'form': form, 'parent_comment': parent_comment, 'discussion': discussion})
