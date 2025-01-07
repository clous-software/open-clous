# views.py

from requests import Response
from rest_framework import generics
from .models import CustomUserModel
from .serializers import CustomUserSerializer
from rest_framework import status

class CustomUserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        user_data = request.data.copy()

        user_serializer = self.get_serializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)

        user_serializer.save()

        headers = self.get_success_headers(user_serializer.data)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CustomUserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = CustomUserSerializer


