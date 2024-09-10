# forms.py
from django import forms
from .models import Club, ClubPost

from ckeditor_uploader.widgets import CKEditorUploadingWidget


class ClubForm(forms.ModelForm):
    class Meta:
        model = Club
        fields = ['name', 'description']


class ClubPostForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditorUploadingWidget())

    class Meta:
        model = ClubPost
        fields = ['content']
