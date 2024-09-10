from django.db import models
from django.contrib.auth import get_user_model
from digital_library.users.models import User
from django.conf import settings


class Book(models.Model):
    LANGUAGE_CHOICES = [
        ('kazakh', 'Қазақша'),
        ('russian', 'Русский'),
        ('english', 'English'),
    ]
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genre = models.CharField(max_length=100)
    isbn = models.CharField(max_length=13, unique=True)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='book_covers/', blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    is_available = models.BooleanField(default=True)
    is_visible = models.BooleanField(default=True)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='english')

    def __str__(self):
        return f"{self.title} ({self.author}) - {self.get_language_display()}"


class ExchangeRequest(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='exchange_requests')
    requester = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='book_requests')
    message = models.TextField()
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return f"Request for {self.book.title} by {self.requester.username}"


class UserBookProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    progress = models.PositiveIntegerField(default=0)
    is_finished = models.BooleanField(default=False)
    shared = models.BooleanField(default=False)
    started_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.progress}%)"

    def toggle_visibility(self):
        self.shared = not self.shared
        self.save()


class UserFinishedBook(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    finished_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} finished {self.book.title}"


class Discussion(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='discussions')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Comment(models.Model):
    discussion = models.ForeignKey(Discussion, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)

    def __str__(self):
        return f'Comment by {self.created_by} on {self.discussion}'
