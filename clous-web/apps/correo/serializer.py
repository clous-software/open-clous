from rest_framework import serializers
from.models import *


class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscriber
        fields = [
            'email',
        ]
class EmailRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailRegister
        fields = [
            'email',
        ]