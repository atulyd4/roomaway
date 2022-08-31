# from multiprocessing.dummy import Manager
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum
from django.db.models.functions import Coalesce
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from hotelbooking.serializers import (
    AmenitiesSerializer,
    BookingRequestSerilizer,
    BookingSerilizer,
    HotelSerializer,
    HotelUpdateSerializer,
    UserResponseSerializer,
    UserSerializer,
)
from .models import Amenities, Booking, Image, Location, Room, User, Hotel
from rest_framework.decorators import action

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainpairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        user_serialized = UserResponseSerializer(
            self.user, context={"request": self.context["request"]}
        ).data
        data["user"] = dict(user_serialized)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainpairSerializer


@api_view(["POST"])
@authentication_classes([])
def register(request):
    serializer = UserSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def updateprofile(request):
    user = User.objects.filter(username=request.user).first()
    user.email = request.data.get("email")
    user.first_name = request.data.get("first_name")
    user.last_name = request.data.get("last_name")
    user.save()
    user_serilaized = UserResponseSerializer(user, context={"request": request})
    return Response(user_serilaized.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def updateprofilepicture(request):
    user = User.objects.filter(username=request.user).first()
    user.picture = request.FILES.get("picture")
    user.save()
    user_serilaized = UserResponseSerializer(user, context={"request": request})
    return Response(user_serilaized.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def userdetail(request):
    user = User.objects.filter(username=request.user).first()
    print(user.picture)
    serializer = UserResponseSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def amenities_view(request):
    serializer = AmenitiesSerializer(
        data=Amenities.objects.all(), many=True, context={"request": request}
    )
    serializer.is_valid()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def searchhotel(request, city_name):
    hotel = Hotel.objects.filter(address__in=Location.objects.filter(city=city_name))
    hotel_serilizer = HotelSerializer(
        data=hotel, many=True, context={"request": request}
    )

    hotel_serilizer.is_valid()
    return Response(hotel_serilizer.data, status=status.HTTP_200_OK)


class HotelViweSet(ModelViewSet):
    serializer_class = HotelSerializer, HotelUpdateSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        if request.user.is_manager == True:
            hotel_serilizer = HotelSerializer(
                data=Hotel.objects.filter(manager=request.user),
                many=True,
                context={"request": request},
            )
            hotel_serilizer.is_valid()
            return Response(hotel_serilizer.data, status=status.HTTP_200_OK)

        data = Hotel.objects.all()
        city = request.query_params.get("city")
        if city is not None:
            data = data.filter(address__in=Location.objects.filter(city=city))
            pass

        hotels = HotelSerializer(data=data, many=True, context={"request": request})
        hotels.is_valid()
        return Response(hotels.data)

    def create(self, request):
        address_line_one = request.data.get("address_line_one")
        address_line_two = request.data.get("address_line_two")
        city = request.data.get("city")
        state = request.data.get("state")

        address = Location(
            address_line_one=address_line_one,
            address_line_two=address_line_two,
            city=city,
            state=state,
        )
        address.save()
        room_type = request.data.get("room_type")
        price = request.data.get("price")
        rooms = Room(room_type=room_type, price=price)
        rooms.save()

        name = request.data.get("name")
        total_rooms = request.data.get("total_rooms")
        manager = User.objects.filter(username=request.user).first()
        ame = Amenities.objects.all().first()
        hotel = Hotel(
            name=name,
            address=address,
            rooms=rooms,
            total_rooms=total_rooms,
            manager=manager,
        )
        hotel.save()
        amenities_list = request.data.getlist("amenities")
        for amenity in amenities_list:
            hotel.amenities.add(amenity)

        images = request.FILES.getlist("image")
        for image in images:
            i = Image(image=image, hotel=hotel)
            i.save()

        hotel_serilaized = HotelSerializer(hotel, context={"request": request})
        return Response(hotel_serilaized.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_200_OK)

        pass

    def retrieve(self, request, pk):
        hotel = Hotel.objects.filter(id=pk)
        hotel_serialized = HotelUpdateSerializer(
            data=hotel, many=True, context={"request": request}
        )
        hotel_serialized.is_valid()
        return Response(hotel_serialized.data)

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk):
        hotel = Hotel.objects.filter(id=pk).first()
        serializer = HotelUpdateSerializer(hotel, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.error_messages, status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, pk=None):
        pass

    @action(detail=True, methods=["POST"], url_path="availbility")
    def availbility(self, request, pk):
        from_date = request.data.get("from_date")
        to_date = request.data.get("to_date")
        hotel = Hotel.objects.filter(id=pk).first()
        total_booked_rooms = (
            Booking.objects.filter(
                hotel_id=hotel, from_date__gte=from_date, to_date__lte=to_date
            )
            .aggregate(total=Coalesce(Sum("rooms_count"), 0))
            .get("total")
        )
        available = hotel.total_rooms - total_booked_rooms
        return Response({"available_rooms": available}, status=status.HTTP_200_OK)


class BookingViewset(ModelViewSet):
    serializer_class = BookingSerilizer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        booking = BookingSerilizer(
            data=Booking.objects.filter(booked_by=request.user)
            .order_by("created_at")
            .reverse(),
            many=True,
            context={"request": request},
        )
        booking.is_valid()
        return Response(booking.data)

    def create(self, request):
        serializer = BookingRequestSerilizer(data=request.data)
        serializer.initial_data["booked_by"] = request.user.id
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.error_messages, status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk):
        booking = Booking.objects.filter(id=pk, booked_by=request.user).first()
        serializer = BookingRequestSerilizer(booking, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.error_messages, status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, pk=None):
        pass


class BookingmanageViewset(ModelViewSet):
    serializer_class = BookingSerilizer()
    permission_classes = [IsAuthenticated]

    def list(self, request):
        if request.user.is_manager == True:
            hotel = Hotel.objects.filter(manager=request.user).first()
            booking = BookingSerilizer(
                data=Booking.objects.filter(hotel_id=hotel).order_by("check_in_time"),
                many=True,
                context={"request": request},
            )
            booking.is_valid()
            return Response(booking.data)

    def create(self, request):
        pass

    def retrieve(self, request, pk=None):
        pass

    def update(self, request, pk=None):
        pass

    def partial_update(self, request, pk):
        booking = Booking.objects.filter(id=pk).first()
        serializer = BookingRequestSerilizer(booking, data=request.data, partial=True)

        if serializer.is_valid():
            check_in_time = request.data.get("check_in_time")
            check_out_time = request.data.get("check_out_time")
            if check_in_time:
                serializer.validated_data["check_in_time"] = check_in_time
            if check_out_time:
                serializer.validated_data["check_out_time"] = check_out_time
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                serializer.error_messages, status=status.HTTP_400_BAD_REQUEST
            )
        pass

    def destroy(self, request, pk=None):
        pass
