from django.shortcuts import render
from .models import Profile, Posts, User
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
from django.shortcuts import get_object_or_404
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.core.files.images import ImageFile
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework_simplejwt.authentication import JWTAuthentication

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
@authentication_classes([JWTAuthentication])
class UserSettings(generics.CreateAPIView): 
    #queryset = Profile.objects.all()
    #if error with session save user_id in local storage to oull username or use token to pull info
    queryset = Profile.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = SettingsSerializer
    def get_object(self):
        # Get the profile for the current user
        return get_object_or_404(Profile, user=self.request.user)
    def perform_update(self, serializer):
        profile = self.get_object()
        print(profile.image_url)
        # Update the existing profile fields with the serializer data
        if serializer.validated_data.get('bio', profile.bio) != None:
            profile.bio = serializer.validated_data.get('bio', profile.bio)
        if serializer.validated_data.get('image_url', profile.image_url) != None:
            profile.image_url.delete()
            image_data = serializer.validated_data.get('image_url', profile.image_url)
            if isinstance(image_data, InMemoryUploadedFile):
                image_file = ImageFile(image_data)
                profile.image_url.save(image_data.name, image_file)
            else:
                profile.image_url = image_data
        if serializer.validated_data.get('bw', profile.bw) != None:
            profile.bw=serializer.validated_data.get('bw', profile.bw)
        if serializer.validated_data.get('achievements', profile.achievements) != None:
            profile.achievements.set(serializer.validated_data.get('achievements', profile.achievements))
        if serializer.validated_data.get('max_bench', profile.max_bench) != None:
            profile.max_bench=serializer.validated_data.get('max_bench', profile.max_bench)
        if serializer.validated_data.get('max_squat', profile.max_squat) != None:
            profile.max_squat=serializer.validated_data.get('max_squat', profile.max_squat)
        if serializer.validated_data.get('max_deadlift', profile.max_deadlift) != None:
            profile.max_deadlift=serializer.validated_data.get('max_deadlift', profile.max_deadlift)
        if serializer.validated_data.get('total', profile.total) != None:
            profile.total=serializer.validated_data.get('total', profile.total)
        profile.save()
    def perform_create(self, serializer):
       
# Check if a profile already exists for the user
        existing_profile = Profile.objects.filter(user=self.request.user).first()
        if existing_profile:
            # If a profile exists, update it
            self.perform_update(serializer)
        else:
            # If no profile exists, create a new one
            serializer.save(user=self.request.user)

@authentication_classes([JWTAuthentication])
class GetProfile(generics.CreateAPIView):
    queryset = Posts.objects.all()

@authentication_classes([JWTAuthentication])
class Upload(generics.CreateAPIView):
        queryset = Posts.objects.all()

