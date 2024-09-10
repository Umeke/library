from django import forms
from .models import ExchangeRequest, Book, UserBookProgress, UserFinishedBook, Comment, Discussion


class ExchangeRequestForm(forms.ModelForm):
    class Meta:
        model = ExchangeRequest
        fields = ['message']


class BookForm(forms.ModelForm):
    class Meta:
        model = Book
        fields = ['title', 'author', 'description', 'cover_image', 'isbn', 'language']

    def clean_isbn(self):
        isbn = self.cleaned_data.get('isbn')
        if not isbn:
            raise forms.ValidationError("ISBN is required")
        if Book.objects.filter(isbn=isbn).exists():
            raise forms.ValidationError("A book with this ISBN already exists.")
        return isbn


class UpdateProgressForm(forms.ModelForm):
    class Meta:
        model = UserBookProgress
        fields = ['progress']


class AddFinishedBookForm(forms.ModelForm):
    class Meta:
        model = UserFinishedBook
        fields = []


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']


class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ['title']
