from django.db import models
import uuid
from datetime import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
# Create your models here.
from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
# core/models.py
from django.contrib.auth.models import AbstractUser, BaseUserManager, Permission
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(default=timezone.now)


    # New field to indicate login status
    is_logged_in = models.BooleanField(default=False)

    # Specify the manager for the User model
    objects = CustomUserManager()

    class Meta:
        # Set unique related_names for groups and user_permissions
        unique_together = ("email",)
        default_related_name = "custom_user"
        permissions = [
            ("can_add_custom_permission", "Can add custom permission"),
            # Add other custom permissions...
        ]

    # Specify unique related_names for groups and user_permissions
    groups = "custom_user_groups"
    user_permissions = "custom_user_permissions"

User = get_user_model()

class Achievements(models.Model):
    title = models.CharField(max_length=30)
    class Meta:
        ordering = ["title"]
    def __str__(self):
        return self.title
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True)
    image_url = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')
    #make profile pic default in profile images
    # achievements = models.ManyToManyField(Achievements,blank=True)
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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.CharField(max_length=500)
    comment = models.TextField()
    # no_likes = models.IntegerField(default=0)
    created_on = models.DateTimeField(default=datetime.now)
    def __str__(self):
        return self.post_id
    
class Posts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_url = models.ImageField(upload_to='media', blank=False)
    caption = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)
    no_of_likes = models.IntegerField(default=0)
    comments = models.ManyToManyField(Comment, blank=True)
    # add comment feature
    def the_user(self):
        return self.user