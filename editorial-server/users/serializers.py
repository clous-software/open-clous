from rest_framework import serializers
from .models import User, UserAccount


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['position', 'linkedin', 'twitter', 'website', 'avatar']


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'is_staff', 'is_active']


class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'is_staff', 'is_active', 'userprofile']

    def create(self, validated_data):
        user_profile_data = validated_data.pop('userprofile','first_name', 'last_name', None)
        user = User.objects.create_user(**validated_data)
        if user_profile_data:
            UserAccount.objects.create(user=user, **user_profile_data)
        return user
