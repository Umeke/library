from django.db import models
from django.contrib.auth import get_user_model


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    poster = models.ImageField(upload_to='event_posters/', blank=True, null=True)
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    participants = models.ManyToManyField(get_user_model(), related_name='events')

    def __str__(self):
        return self.title
