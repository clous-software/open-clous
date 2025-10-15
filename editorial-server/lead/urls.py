from django.urls import path
from .views import *

urlpatterns = [
    path('resource/', ResourceView.as_view(), name='resource'),
    path('contact/', SubmitContactView.as_view(), name='submit-contact'),
    path('waitlist/', AddToWaitlistView.as_view(), name='add_to_waitlist'),
]
