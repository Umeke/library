from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.db.models import QuerySet
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.views.generic import DetailView
from django.views.generic import RedirectView
from django.views.generic import UpdateView

from digital_library.users.models import User

from digital_library.books.models import UserBookProgress, UserFinishedBook, Book, Comment


class UserDetailView(LoginRequiredMixin, DetailView):
    model = User
    slug_field = "username"
    slug_url_kwarg = "username"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user = self.get_object()

        context['progress_books'] = UserBookProgress.objects.filter(user=user, shared=True)
        context['finished_books'] = UserFinishedBook.objects.filter(user=user)
        context['books_added_by_user'] = Book.objects.filter(owner=user, is_visible=True)

        return context


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, SuccessMessageMixin, UpdateView):
    model = User
    fields = ["name"]
    success_message = _("Information successfully updated")

    def get_success_url(self) -> str:
        assert self.request.user.is_authenticated  # type guard
        return self.request.user.get_absolute_url()

    def get_object(self, queryset: QuerySet) -> User:
        assert self.request.user.is_authenticated  # type guard
        return self.request.user


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):
    permanent = False

    def get_redirect_url(self) -> str:
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


from django.shortcuts import render
from django.db.models import Count, Avg
from digital_library.books.models import Book, UserBookProgress, Discussion
from digital_library.game.models import GameResult

from django.db.models import Count


def get_recommended_for_user(user):
    # Get the list of books the user has finished or interacted with
    user_finished_books = UserBookProgress.objects.filter(user=user, is_finished=True).values_list('book', flat=True)

    # Get books discussed or commented on by the user
    discussed_books = Discussion.objects.filter(created_by=user).values_list('book', flat=True)
    commented_books = Comment.objects.filter(created_by=user).values_list('discussion__book', flat=True)

    # Combine book lists and remove duplicates
    interacted_books = set(user_finished_books) | set(discussed_books) | set(commented_books)

    # Find books finished by other users who have finished the same books
    similar_users_books = UserBookProgress.objects.filter(book__in=interacted_books).exclude(
        user=user)
    print(similar_users_books)
    # Aggregate the books finished by those similar users
    recommended_books = Book.objects.filter(userbookprogress__in=similar_users_books).annotate(
        count=Count('id')).order_by('-count')[:5]

    return recommended_books


def home_view(request):
    # Recommended Books (assuming you have a method or function to get this data)
    recommended_books = get_recommended_for_user(request.user) if request.user.is_authenticated else []

    # Top 3 Gaming Books (books with highest average score or most plays)
    top_gaming_books = Book.objects.annotate(play_count=Count('gameresult')).order_by('-play_count')[:3]

    # Top 3 Progress Books (books that users are reading based on progress)
    top_progress_books = Book.objects.annotate(progress_count=Count('userbookprogress')).order_by('-progress_count')[:3]

    # Top 3 Most Discussed Books (books with the highest number of discussions)
    most_discussed_books = Book.objects.annotate(discussion_count=Count('discussions')).order_by('-discussion_count')[:3]

    context = {
        'recommended_books': recommended_books,
        'top_gaming_books': top_gaming_books,
        'top_progress_books': top_progress_books,
        'most_discussed_books': most_discussed_books,
    }

    return render(request, 'pages/home.html', context)
