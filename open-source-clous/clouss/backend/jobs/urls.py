from django.urls import path
from .views import ChatGPTView, JobListView, JobDetailView, JobCreateView 

urlpatterns = [
    path('chat/', ChatGPTView.as_view(), name='chat'),  # Ruta 
    path('job_list/', JobListView.as_view(), name='job_list'),  # Ruta para JobListing
    path('job/<uuid:id>/', JobDetailView.as_view(), name='job_detail'),
    path('job/', JobCreateView.as_view(), name='job_create'),
]