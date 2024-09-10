from django.db import models
from django.contrib.auth import get_user_model

from digital_library.books.models import Book


class GameResult(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    score = models.IntegerField()
    date_played = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s result for {self.book.title}"


class Question(models.Model):
    LANGUAGE_CHOICES = [
        ('kazakh', 'Қазақша'),
        ('russian', 'Русский'),
        ('english', 'English'),
    ]

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()
    correct_answer = models.CharField(max_length=255)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.text} ({self.get_language_display()})"

    def get_answers(self):
        answers = Answer.objects.filter(question=self)
        return [answer.text for answer in answers]


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    text = models.CharField(max_length=255)  # The text of the answer option

    def __str__(self):
        return self.text
