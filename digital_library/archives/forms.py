from django import forms
from .models import DigitalArchive

class ArchiveForm(forms.ModelForm):
    class Meta:
        model = DigitalArchive
        fields = ['title', 'description', 'file']
