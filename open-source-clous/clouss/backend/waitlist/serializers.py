# serializers.py
from rest_framework import serializers
from .models import FeedbackMessage, ContactSale, WaitlistEmail
from rest_framework import serializers

class WaitlistEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEmail
        fields = ['email', 'date_submitted']

class WaitlistEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitlistEmail
        fields = ['subject', 'reason', 'message', 'image', 'date_submitted']

class ContactSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSale
        fields = ['first_name', 'last_name', 'email', 'phone_number', 'date_submitted']

class FeedbackMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackMessage
        fields = ['message', 'date_submitted']