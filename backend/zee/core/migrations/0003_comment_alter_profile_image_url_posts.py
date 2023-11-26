# Generated by Django 4.2.5 on 2023-11-26 02:13

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0002_rename_profileimg_profile_image_url_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('user', models.CharField(max_length=100)),
                ('post_id', models.CharField(max_length=500)),
                ('comment', models.TextField()),
                ('created_on', models.DateTimeField(default=datetime.datetime.now)),
            ],
        ),
        migrations.AlterField(
            model_name='profile',
            name='image_url',
            field=models.ImageField(default='blank-profile-picture.jpg', upload_to='profile_images'),
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('image_url', models.ImageField(upload_to='media')),
                ('caption', models.TextField()),
                ('created_at', models.DateTimeField(default=datetime.datetime.now)),
                ('no_of_likes', models.IntegerField(default=0)),
                ('comments', models.ManyToManyField(blank=True, to='core.comment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]