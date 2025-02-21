

from django.urls import path
from .views import *

urlpatterns = [
 path('contact',ContactView.as_view()),
 path('teams',TeamsView.as_view()),
 path('press',PressView.as_view()),
 path('partners',PartnersView.as_view())
 ]
