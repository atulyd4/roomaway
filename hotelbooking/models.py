from distutils.command.upload import upload
from email.policy import default
from operator import mod
from statistics import mode
from django.contrib.auth.models import AbstractUser, AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.forms import CharField
from pkg_resources import require
from requests import delete
from django.contrib.auth.hashers import check_password


class User(AbstractUser):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_manager = models.BooleanField(default=False)
    picture = models.ImageField(null=True, blank=True)

    def __str__(self) -> str:
        return self.username


class Location(models.Model):
    address_line_one = models.CharField(max_length=150)
    address_line_two = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    state = models.CharField(max_length=150)


class Amenities(models.Model):
    name = models.CharField(max_length=200, blank=True)
    icon = models.CharField(max_length=200, blank=True)

    def __str__(self) -> str:
        return self.name


class Image(models.Model):
    image = models.ImageField(upload_to="images/")
    hotel = models.ForeignKey(
        "Hotel", on_delete=models.CASCADE, null=True, related_name="photos"
    )


class Hotel(models.Model):
    name = models.CharField(max_length=150)
    address = models.ForeignKey(
        "Location", on_delete=models.CASCADE, related_name="hotel"
    )
    rooms = models.ForeignKey("Room", on_delete=models.CASCADE)
    total_rooms = models.IntegerField(blank=True, default=False)
    avilable_rooms = models.IntegerField(null=True, default=False)
    manager = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="manager"
    )

    amenities = models.ManyToManyField("Amenities")

    def __str__(self) -> str:
        return "User: %s %s" % (self.id, self.name)


class Room(models.Model):
    class RoomType(models.TextChoices):
        LUXURY = "LUX", _("Luxury")
        NORMAL = "NOR", _("Normal")

    is_booked = models.BooleanField(default=False)
    room_type = models.CharField(
        max_length=3, choices=RoomType.choices, default=RoomType.NORMAL
    )

    price = models.DecimalField(decimal_places=2, null=False, max_digits=10)


class Booking(models.Model):
    from_date = models.DateField(null=False)
    to_date = models.DateField(null=False)
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    hotel_id = models.ForeignKey("Hotel", on_delete=models.CASCADE, null=True)
    booked_by = models.ForeignKey("User", on_delete=models.CASCADE, null=True)
    rooms_count = models.IntegerField(blank=True, default=False)
    guest_count = models.IntegerField(null=False, default=False)
    total_amount = models.DecimalField(null=False, decimal_places=2, max_digits=11)
    created_at = models.DateTimeField(auto_now_add=True)
