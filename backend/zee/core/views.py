from django.shortcuts import render
from .models import *
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, SettingsSerializer, CustomTokenObtainPairSerializer
from .serializers import RegisterSerializer, SettingsSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics

#change to react based api auth
class CustomObtainTokenPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        # Retrieve user credentials from the serializer
        username = request.data.get('username')
        password = request.data.get('password')
        # Authenticate the user
        user = authenticate(username=username, password=password)
        
        if user is not None:
            # If the user is authenticated, generate the token
            response = super().post(request, *args, **kwargs)
            # Add additional user information to the response
            response.data['user_id'] = user.id
            response.data['username'] = user.username
            return response
        else:
            return Response({"detail": "Invalid credentials"}, status=401)
        
class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = TokenObtainPairSerializer
#change to react based api auth
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@permission_classes([IsAuthenticated])
# @permission_classes([IsAuthenticated])
class UserSettings(generics.CreateAPIView): 
    #queryset = Profile.objects.all()
    #if error with session save user_id in local storage to oull username or use token to pull info
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SettingsSerializer
    def perform_create(self, serializer):
        # Associate the logged-in user with the profile being created
        serializer.save(user=self.request.user)

@permission_classes([IsAuthenticated])
class Profile(generics.CreateAPIView):
    queryset = Posts.objects.all()

@permission_classes([IsAuthenticated])
class Upload(generics.CreateAPIView):
        queryset = Posts.objects.all()

