# Generated by Django 4.0.6 on 2022-07-25 06:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hotelbooking', '0015_image'),
    ]

    operations = [
        migrations.RenameField(
            model_name='booking',
            old_name='amount',
            new_name='total_amount',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='room',
        ),
        migrations.RemoveField(
            model_name='hotel',
            name='image',
        ),
        migrations.AddField(
            model_name='booking',
            name='booked_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='booking',
            name='check_in_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='booking',
            name='check_out_time',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='booking',
            name='guest_count',
            field=models.IntegerField(default=False),
        ),
        migrations.AddField(
            model_name='booking',
            name='rooms_count',
            field=models.IntegerField(blank=True, default=False),
        ),
        migrations.AddField(
            model_name='hotel',
            name='avilable_rooms',
            field=models.IntegerField(default=False, null=True),
        ),
        migrations.AddField(
            model_name='hotel',
            name='total_rooms',
            field=models.IntegerField(blank=True, default=False),
        ),
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
