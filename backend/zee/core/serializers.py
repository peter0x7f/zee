from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Posts
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Customize the token payload here
        token['user_id'] = user.id
        token['username'] = user.username
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
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
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
            last_name=validated_data['last_name']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user

class SettingsSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # image_url = serializers.ImageField(required=False)
    class Meta:
        model = Profile
        fields = ('image_url', 'bio', 'achievements', 'max_bench','max_squat','max_deadlift', 'total', 'bw')
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if 'image_url' in representation and representation['image_url']:
            representation['image_url'] = instance.image_url.url
        return representation
    # def create(self):
    #     profile = Profile.objects.create(
    #         user=user,
    #         image_url='image_url',
    #         bio='bio',
    #         achievements='achievements',
    #         max_bench='max_bench',
    #         max_squat='max_squat',
    #         max_deadlift='max_deadlift',
    #         total='total',
    #         bw='bw',
    #     )
    #     profile.save()
    #     return profile

class UploadSerializer(serializers.ModelSerializer):
        image_url = serializers.ImageField(required=True)
        class Meta:
            model = Posts
            fields = ('image_url', 'bio', 'achievements', 'max_bench','max_squat','max_deadlift', 'total', 'bw')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('image_url', 'bio', 'achievements', 'max_bench','max_squat','max_deadlift', 'total', 'bw')