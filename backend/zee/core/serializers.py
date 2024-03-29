from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Posts, Comment
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Customize the token payload here
        token['user_id'] = user.id
        token['username'] = user.username
        token['is_logged_in'] = user.customuser.is_logged_in if hasattr(user, 'customuser') else False
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:

        model = User
        fields = ('id', 'username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['id'] = instance.id
        return representation
    
    # def create(self, validated_data):
    #     # Create user instance
    #     user = User.objects.create_user(**validated_data)
    #     # Create profile for the new user
    #     Profile.objects.create(user=user)

    #     return user

    
    # def create_profile(self, user):
    #     print(user)
    #     profile = Profile.objects.create(
    #         user=user,
    #     )
    #     profile.save()

    #     return profile

class SettingsSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    #image_url = Base64ImageField()

    class Meta:
        model = Profile
        fields = ('image_url', 'bio', 'max_bench','max_squat','max_deadlift', 'total', 'bw')
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if 'image_url' in representation and representation['image_url']:
            representation['image_url'] = instance.image_url.url
        return representation


  

class UploadSerializer(serializers.ModelSerializer):
        post_url = serializers.ImageField(required=True)
       # image_url = Base64ImageField(required=True)
        class Meta:
            model = Posts
            fields = ('post_url','caption','no_of_likes')
        # def to_representation(self, instance):
        #     representation = super().to_representation(instance)
        #     if 'post_url' in representation and representation['post_url']:
        #         representation['post_url'] = instance.post_url
        #     return representation



class ProfileSerializer(serializers.ModelSerializer):
    # username = serializers.CharField(source='user.username')
    class Meta:
        model = Profile
        fields = ('user','image_url')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'comment', 'created_on']
        read_only_fields = ['user', 'post']

    def create(self, validated_data):
        # Get the user from the request
        user = self.context['request'].user
        # Get the post using the 'post_id' passed in the context
        post_id = self.context['post_id']
        post = Posts.objects.get(id=post_id)
        # Create and return the new comment instance
        return Comment.objects.create(user=user, post=post, **validated_data)

class ProfilePostsSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(source='user.profile')
    comments = CommentSerializer(many=True)
    class Meta:
        model = Posts
        fields = ('post_url', 'caption', 'created_at', 'no_of_likes', 'comments','profile', 'id')
 