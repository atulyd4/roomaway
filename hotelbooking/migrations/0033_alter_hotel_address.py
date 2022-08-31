# Generated by Django 4.0.6 on 2022-08-24 06:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hotelbooking', '0032_alter_booking_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hotel',
            name='address',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='address', to='hotelbooking.location'),
        ),
    ]
