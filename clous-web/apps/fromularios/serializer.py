from rest_framework import serializers
from .models import *

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'


class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HrTeams
        fields = [
            'id',
            'name',
            'email',
            'company',
            'industry',
            'message',
            'created_at',
        ]

class PressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Press
        fields = [
            'id',
            'name',
            'email',
            'angle',
            'date',
            'created_at',
        ]


class PartnersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partners
        fields = [
            'id',
            'name',
            'email',
            'angle',
            'type',
            'company',
            'message',
            'created_at',
        ]
