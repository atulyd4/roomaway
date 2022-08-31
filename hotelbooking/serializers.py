from django.contrib.auth.hashers import make_password
from rest_framework.validators import UniqueValidator
from .models import Amenities, Image, User, Room, Hotel, Booking, Location
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(min_length=3)
    picture = serializers.ImageField(required=False)

    def create(self, validated_data):
        user = User()
        user.username = validated_data["username"]
        user.email = validated_data["email"]
        user.password = make_password(validated_data["password"])
        user.first_name = validated_data["first_name"]
        user.last_name = validated_data["last_name"]
        user.is_manager = validated_data["is_manager"]
        user.save()
        return user

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "is_manager",
            "picture",
            "is_manager",
        ]


class UserResponseSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField(method_name="picture_url")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "picture",
            "is_manager",
        ]

    def picture_url(self, user):
        request = self.context.get("request")
        if not user.picture:
            return []
        else:
            return request.build_absolute_uri(user.picture.url)


class UserUpdateSerializer(serializers.Serializer):
    picture = serializers.ImageField

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "picture"]

    def update(self, instance, validated_data):
        instance["email"] = validated_data.get("email")
        instance["first_name"] = validated_data.get("first_name")
        instance["last_name"] = validated_data.get("last_name")
        instance["picture"] = validated_data.get("picture")
        instance.save()
        return instance


class LocationSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["address_line_one", "address_line_two", "city", "state"]


class AmenitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenities
        fields = ["id", "name", "icon"]


class RoomSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["is_booked", "room_type", "price"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]


class HotelSerializer(serializers.ModelSerializer):
    address = LocationSerilizer()
    rooms = RoomSerilizer()

    amenities = AmenitiesSerializer(many=True)
    photos = serializers.SerializerMethodField(method_name="get_photos")

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "address",
            "rooms",
            "total_rooms",
            "amenities",
            "photos",
        ]

    def get_photos(self, obj):
        request = self.context.get("request")
        photos = obj.photos.all()
        urls = []
        for photo in photos:
            url = request.build_absolute_uri(photo.image.url)
            urls.append(url)
        return urls


class HotelUpdateSerializer(WritableNestedModelSerializer, serializers.ModelSerializer):
    address = LocationSerilizer()
    rooms = RoomSerilizer()

    # photos = ImageSerializer()

    class Meta:
        model = Hotel
        fields = [
            "id",
            "name",
            "address",
            "rooms",
            "total_rooms",
            "amenities",
            "photos",
        ]


class LocationSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["address_line_one", "address_line_two", "city", "state"]


class BookingSerilizer(serializers.ModelSerializer):
    # hotel = serializers.SerializerMethodField(method_name="hotel_data")
    hotel_id = HotelSerializer()
    booked_by = UserResponseSerializer()

    class Meta:
        model = Booking
        fields = [
            "id",
            "from_date",
            "to_date",
            "check_in_time",
            "check_out_time",
            "hotel_id",
            "booked_by",
            "rooms_count",
            "guest_count",
            "total_amount",
            "created_at",
        ]


class BookingRequestSerilizer(serializers.ModelSerializer):
    from_date = serializers.DateField
    to_date = serializers.DateField
    check_in_time = serializers.DateTimeField
    check_out_time = serializers.DateTimeField

    class Meta:
        model = Booking
        fields = [
            "from_date",
            "to_date",
            "check_in_time",
            "check_out_time",
            "hotel_id",
            "booked_by",
            "rooms_count",
            "guest_count",
            "total_amount",
        ]
