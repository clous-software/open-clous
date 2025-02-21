from django.db import models
from django.utils import timezone

# Create your models here.
class Contacto(models.Model):
    SUBJECT_CHOICES = (
        ('Request live demo', 'Request live demo'),
        ('Contact sales', 'Contact sales'),
        ('Redeem sign up code', 'Redeem sign up code'),
        ('Onboarding aid', 'Onboarding aid'),
        ('1:1 consulting sessions', '1:1 consulting sessions'),
        ('Paid pilot', 'Paid pilot'),
        # Agrega otras opciones según tus necesidades
    )

    first =          models.CharField(max_length=200)
    last =          models.CharField(max_length=200)
    email =         models.EmailField(unique=True)
    phone =       models.IntegerField()
    subject =       models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    message =       models.TextField()
    created_at =  models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.first


class HrTeams(models.Model):
    name =          models.CharField(max_length=200)
    email =         models.EmailField()
    company =       models.CharField(max_length=100)
    industry =       models.CharField(max_length=100)
    message =       models.TextField()
    created_at =  models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Press(models.Model):
    name =          models.CharField(max_length=200)
    email =         models.EmailField()
    angle =       models.CharField(max_length=100)
    date =       models.DateField()
    created_at =  models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Partners(models.Model):
    name =          models.CharField(max_length=200)
    email =         models.EmailField()
    angle =       models.CharField(max_length=100)
    company =       models.CharField(max_length=100)
    type =       models.CharField(max_length=100)
    message =       models.TextField()
    created_at =  models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name