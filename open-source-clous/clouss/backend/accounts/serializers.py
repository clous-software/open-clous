# serializers.py

from rest_framework import serializers
from .models import CustomUserModel

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUserModel
        fields = [ 'email', 'first_name', 'last_name', 'is_active', 'is_staff', 'date_joined', 'last_login']

    def create(self, validated_data):
        user = CustomUserModel.objects.create(**validated_data)
        return user
