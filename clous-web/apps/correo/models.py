from django.db import models

class EmailSubscriber(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email

class EmailRegister(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
