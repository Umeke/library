from django.db import models
from django.contrib.auth import get_user_model
from ckeditor_uploader.fields import RichTextUploadingField


class Club(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    creator = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='created_clubs')
    members = models.ManyToManyField(get_user_model(), related_name='clubs')

    def __str__(self):
        return self.name


class ClubPost(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='posts')
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = RichTextUploadingField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Post by {self.author.username} in {self.club.name}'


class ClubMembershipRequest(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='membership_requests')
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=[('pending', 'Pending'), ('approved', 'Approved'), ('rejected', 'Rejected')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} requested to join {self.club.name}'
