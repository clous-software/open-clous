from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        prepopulated_fields = {'slug': ('name',)}
        fields =[
            'id',
            'name',
            'slug',
            'views',
        ]
