# from multiprocessing.dummy import Manager
from django.contrib import admin


# Register your models here.
from .models import User, Hotel, Booking, Room, Location, Amenities, Image

admin.site.register(User)


admin.site.register(Hotel)
admin.site.register(Location)
admin.site.register(Room)
admin.site.register(Booking)
admin.site.register(Amenities)
admin.site.register(Image)
