from django.db import models
from django.contrib.auth import get_user_model


class DigitalArchive(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    uploaded_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    file = models.FileField(upload_to='archives/')

    def __str__(self):
        return self.title
