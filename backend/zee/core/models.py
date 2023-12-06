from django.db import models
import uuid
from datetime import datetime
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


class Achievements(models.Model):
    title = models.CharField(max_length=30)
    class Meta:
        ordering = ["title"]
    def __str__(self):
        return self.title
    

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image_url = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')
    #make profile pic default in profile images
    achievements = models.ManyToManyField(Achievements,blank=True)
    max_bench = models.TextField(blank=True)
    max_deadlift = models.TextField(blank=True)
    max_squat = models.TextField(blank=True)
    total = models.TextField(blank=True)
    bw = models.TextField(blank=True)
    objects = models.Manager()

    def the_user(self):
        return self.user

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.CharField(max_length=100)
    post_id = models.CharField(max_length=500)
    comment = models.TextField()
    created_on = models.DateTimeField(default=datetime.now)
    def the_user(self):
        return self.user
class Posts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to='media', blank=False)
    caption = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)
    no_of_likes = models.IntegerField(default=0)
    comments = models.ManyToManyField(Comment, blank=True)
    # add comment feature
    def __str__(self):
        return self.user