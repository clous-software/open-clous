from rest_framework import serializers
from .models import *
from apps.user.models import UserAccount  # Importa el modelo UserAccount desde la app "User"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id', 'email', 'first_name', 'last_name']
class PostSerializer(serializers.ModelSerializer):

    get_status=serializers.CharField(source='status')
    author = UserSerializer()  # Incluye el serializador del autor

    class Meta: 
        model=Post
        fields=[
            'id',
            'title',
            'slug',
            'thumbnail',
            'description',
            'content',
            'time_read',
            'published',
            'views',
            'status',
            'author',  # Incluye el campo del autor
            'get_status'
        ]

class PostListSerializer(serializers.ModelSerializer):
    author = UserSerializer()  # Incluye el serializador del autor

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'thumbnail',
            'description',
            'content',
            'time_read',
            'published',
            'views',
            'status',
            'author',  # Incluye el campo del autor
        ]