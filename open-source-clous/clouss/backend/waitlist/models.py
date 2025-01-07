# models.py
from django.db import models

class WaitlistEmail(models.Model):
    email = models.EmailField(unique=True)
    date_submitted = models.DateTimeField(auto_now_add=True)

class Support(models.Model):
    REASON_TYPE = (
        ('I need help using ClousH', 'I need help using ClousH'),
        ('I need help with my account', 'I need help with my account'),
        ('I need to report an issue', 'I need to report an issue'),
        # Agrega otras opciones según tus necesidades
    )
    subject = models.EmailField(unique=True)
    reason =  models.CharField(max_length=50, choices=REASON_TYPE)
    message = models.CharField(max_length=100)
    images = models.ImageField(upload_to='support_images/', blank=True, null=True)  # ImageField for storing images

    date_submitted = models.DateTimeField(auto_now_add=True)


class ContactSale(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"
    


class FeedbackMessage(models.Model):
    message = models.TextField()
    date_submitted = models.DateTimeField(auto_now_add=True)    