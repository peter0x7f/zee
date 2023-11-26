from django.shortcuts import render
from .models import *
from .serializers import RegisterSerializer, SettingsSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import rest_framework_simplejwt.authentication


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "This is a protected view."})

#change to react based api auth
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenObtainPairSerializer
#change to react based api auth
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

# @permission_classes([IsAuthenticated])
class UserSettings(generics.CreateAPIView): 
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SettingsSerializer


# class Profile(generics.CreateAPIView):
    # queryset = Profile.objects.order_by('-creation_date')
    # serializer_class = MyModelSerializer define serializer 
    # parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [
    #     permissions.IsAuthenticatedOrReadOnly]
    # def perform_create(self, serializer):
    #     serializer.save(creator=self.request.user)
