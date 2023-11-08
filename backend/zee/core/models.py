from django.db import models
import uuid
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
