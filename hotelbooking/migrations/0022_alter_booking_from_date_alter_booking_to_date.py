# Generated by Django 4.0.6 on 2022-07-26 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotelbooking', '0021_rename_hotel_name_booking_hotel_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='from_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='booking',
            name='to_date',
            field=models.DateField(),
        ),
    ]
