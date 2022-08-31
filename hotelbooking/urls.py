from django.urls import path
from . import views
from .views import BookingmanageViewset, HotelViweSet
from .views import BookingViewset
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"hotels", HotelViweSet, basename="hotels")
router.register(
    r"managehotelbookings", BookingmanageViewset, basename="managehotelbookings"
)
router.register(r"booking", BookingViewset, basename="booking")


urlpatterns = [
    path("register", views.register, name="register"),
    path("edit", views.updateprofile, name="edit"),
    path("profile/picture", views.updateprofilepicture, name="editpicture"),
    path("detail", views.userdetail, name="detail"),
    path("amenities", views.amenities_view, name="amenities"),
]

urlpatterns += router.urls
