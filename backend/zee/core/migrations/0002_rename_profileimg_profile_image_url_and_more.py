# Generated by Django 4.2.5 on 2023-11-15 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='profileimg',
            new_name='image_url',
        ),
        migrations.AlterField(
            model_name='profile',
            name='achievements',
            field=models.ManyToManyField(blank=True, to='core.achievements'),
        ),
    ]
