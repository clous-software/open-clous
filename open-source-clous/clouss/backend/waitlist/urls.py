# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('waitlist/', views.add_to_waitlist, name='add_to_waitlist'),
    path('feedback/', views.submit_feedback, name='submit-feedback'),
    path('contact/', views.submit_contact, name='submit-contact'),

]