

from django.urls import path
from .views import *

urlpatterns = [
 path('suscriber', EmailView.as_view()),
 path('register', EmailRegisterView.as_view())
 ]
