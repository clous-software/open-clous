from django.db import models
from django.utils import timezone

# Create your models here.


class Resource(models.Model):
    INTEREST_TYPE = (
        ("Most of my work is recruitment", "Most of my work is recruitment"),
        ("I lead recruitment teams", "I lead recruitment teams"),
        ("I'm a business leader", "I'm a business leader"),
        ("I'm just super curious", "I'm just super curious"),
        # Agrega otras opciones según tus necesidades
    )
    first = models.CharField(max_length=200)
    last = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    companyName = models.CharField(max_length=200)
    companyWebsite = models.URLField(max_length=200)
    companySize = models.CharField(max_length=200)
    interest = models.CharField(max_length=200, choices=INTEREST_TYPE)
    created_at = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return self.first, self.last, self.email


class WaitlistEmail(models.Model):
    email = models.EmailField(unique=True)
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email


class ContactSale(models.Model):
    REASON_TYPE = (
        ("Most of my work is recruitment", "Most of my work is recruitment"),
        ("I lead recruitment teams", "I lead recruitment teams"),
        ("I'm a business leader", "I'm a business leader"),
        ("I'm just super curious", "I'm just super curious"),
        # Agrega otras opciones según tus necesidades
    )
    first = models.CharField(max_length=200)
    last = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    reason = models.CharField(max_length=150, choices=REASON_TYPE)
    message = models.TextField(max_length=450)
    date_submitted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email, self.first, self.last, self.message, self.reason
