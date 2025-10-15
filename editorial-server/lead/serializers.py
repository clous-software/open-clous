from rest_framework import serializers
from .models import Resource, WaitlistEmail, ContactSale


class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['first', 'last', 'email', 'companyName',
                  'companyWebsite', 'companySize', 'interest', 'created_at']


class WaitlistEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEmail
        fields = '__all__'


class ContactSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSale
        fields = ['id', 'first', 'last', 'email',
                  'reason', 'message', 'date_submitted']
