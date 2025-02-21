from rest_framework import serializers
from .models import *
from apps.category.serializers import CategorySerializer
# It's a Django REST framework -- so it needs a serializer to receive data from back-end to front-end


class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    get_status = serializers.CharField(source='status')

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
            'category',
            'status',
            'get_status'
        ]


class PostListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'slug',
            'thumbnail',
            'description',
            'time_read',
            'published',
            'views',
            'category',
            'status'
        ]
