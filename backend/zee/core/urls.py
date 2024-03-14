from django.urls import path
from .views import CustomObtainTokenPairView, RegisterView, UserSettings, get_user_posts, Upload, get_feed_posts, Comment_Post, ProfileCreation, UserSettingsView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('login/', CustomObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('settings/', UserSettings.as_view(), name='user_settings'),
    path('upload/', Upload.as_view(), name="upload_photo"),
    path('profile/<str:pk>', get_user_posts, name="get_profile"),
    path('explore_feed/', get_feed_posts,name="get_feed"),
    path('comment/<str:post_id>/', Comment_Post,name="comment"),
    path('createprofile/', ProfileCreation.as_view(), name="makeprofile"),
    path('getsettings/', UserSettingsView.as_view(), name='get-settings'),

]