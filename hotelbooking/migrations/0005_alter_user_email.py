# Generated by Django 4.0.2 on 2022-03-14 12:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotelbooking', '0004_alter_user_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
