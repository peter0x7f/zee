from django.shortcuts import render
from .models import Profile, Posts, User, Comment
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, SettingsSerializer, CustomTokenObtainPairSerializer
from .serializers import RegisterSerializer, SettingsSerializer,UploadSerializer, ProfilePostsSerializer, CommentSerializer, ProfileSerializer
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
from django.http import Http404
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from datetime import datetime, timezone
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.serializers import DateTimeField

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
            response.data['is_logged_in'] = user.customuser.is_logged_in if hasattr(user, 'customuser') else False
            
            # Update last_login using the current time in UTC
            user_instance = User.objects.get(id=user.id)
            user_instance.is_logged_in = True
            user_instance.save()
            
            # Use a custom JSON encoder to serialize datetime
            return Response(response.data, status=response.status_code)
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
    # def make_user(self, serializer):
    #     user_profile = self.get_object()
    #     user = serializer.save()
    #     username = serializer.validated_data.get('username', user_profile.username)
    #     user_field = User.objects.get(username=username).first()
    #     print(user_field)
    #     Profile.objects.create(user=user)
    #     return "created"


@permission_classes([IsAuthenticated])
@authentication_classes([BasicAuthentication])
class UserSettings(generics.CreateAPIView): 
    #queryset = Profile.objects.all()
    #if error with session save user_id in local storage to oull username or use token to pull info
    queryset = Profile.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = SettingsSerializer
    def perform_update(self, serializer):
        print(self.request.user)
        profile = self.get_object()
        print(profile.image_url)
        # Update the existing profile fields with the serializer data
        if serializer.validated_data.get('bio', profile.bio) != None:
            profile.bio = serializer.validated_data.get('bio', profile.bio)
        if serializer.validated_data.get('image_url', profile.image_url) != None:
            # profile.image_url.delete()
            image_data = serializer.validated_data.get('image_url', profile.image_url)
            if isinstance(image_data, InMemoryUploadedFile):
                image_file = ImageFile(image_data)
                profile.image_url.save(image_data.name, image_file)
            else:
                profile.image_url = image_data
        if serializer.validated_data.get('bw', profile.bw) != None:
            profile.bw=serializer.validated_data.get('bw', profile.bw)
        # if serializer.validated_data.get('achievements', profile.achievements) != None:
        #     profile.achievements.set(serializer.validated_data.get('achievements', profile.achievements))
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
            # profile = self.get_object()
            # image_data = serializer.validated_data.get('image_url', profile.image_url)
            # If no profile exists, create a new one
            serializer.save(user=self.request.user)
    # def get_object(self):
    #     # Get the profile for the current user
    #     print(self.request.user)
    #     return get_object_or_404(Profile, user=self.request.user)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_user_posts(request, pk):
    # Retrieve all posts for the specified user
    user = User.objects.get(username=pk)
    posts = reversed(Posts.objects.filter(user=user))
    posts_data = []

    for post in posts:
        comments = Comment.objects.filter(post_id=post.id)
        # Serialize the posts data with comments
        serializer = ProfilePostsSerializer(post, context={'comments': CommentSerializer(comments, many=True).data})
        posts_data.append(serializer.data)

    # Return the serialized data as a JSON response
    return Response(posts_data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_feed_posts(request):
        # Retrieve all posts for the specified user
        # user = Profile.objects.get(username=request.user)#retrieve followers
        posts = reversed(Posts.objects.all())
        # Serialize the posts data
        serializer = ProfilePostsSerializer(posts, many=True)
        # Return the serialized data as a JSON response
        return Response(serializer.data)


@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class Upload(generics.CreateAPIView):
        queryset = Posts.objects.all()
        permission_classes = (IsAuthenticated,)
        serializer_class = UploadSerializer
        def perform_create(self, serializer):
            serializer.save(user=self.request.user)

@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
class ProfileCreation(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (AllowAny,)  # Restrict creation to authenticated users

    def perform_create(self, serializer):
        # Get the user associated with the request
        Profile.objects.create(user=self.request.user)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def Comment_Post(request, post_id):
    if request.method == 'GET':
        # Retrieve comments associated with the specified post
        try:
            post = Posts.objects.get(id=post_id)
            comments = Comment.objects.filter(post_id=post_id)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        except Posts.DoesNotExist:
            raise Http404("Posts matching query does not exist.")

    elif request.method == 'POST':
        # Create a new comment for the specified post
        try:
            post = Posts.objects.get(id=post_id)
        except Posts.DoesNotExist:
            raise Http404("Posts matching query does not exist.")

        # Get the authenticated user
        user = request.user

        # Extract comment data from the request
        comment_text = request.data.get('comment')

        # Create a new Comment object
        new_comment = Comment(user=user, post_id=post_id, comment=comment_text)

        # Save the new comment
        new_comment.save()

        # Serialize the new comment for the response
        serializer = CommentSerializer(new_comment)

        return Response(serializer.data)
