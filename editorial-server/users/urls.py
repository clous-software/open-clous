from django.urls import path
from .views import UserListView, UserDetailView, UserProfileView, CustomAuthToken

urlpatterns = [
    path('users_list/', UserListView.as_view(), name='user-list-create'),
    path('user/<str:email>/', UserDetailView.as_view(), name='user-detail'),
    path('profiles/', UserProfileView.as_view(), name='user-profile-list'),

    # Ruta para la vista de inicio de sesión personalizada
    path('login/', CustomAuthToken.as_view(), name='login'),
]
