from django.urls import path
from .views import CustomObtainTokenPairView, RegisterView, UserSettings, Profile, Upload
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('login/', CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('settings/', UserSettings.as_view(), name='user_settings'),
    # path('upload/')
]