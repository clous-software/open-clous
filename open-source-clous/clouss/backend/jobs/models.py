import uuid
from django.db import models
from django.utils import timezone


class ToolList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class LocationList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class RequirementList(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class LanguageList(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ResponsibilitiesList(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class BenefitsList(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# class CompensationsList(models.Model):
   # name = models.CharField(max_length=100)

    # def __str__(self):
    #    return self.name


class JobList(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('closed', 'Closed'),         # Nueva opción añadida
        ('inactive', 'Inactive'),
    )
    CONTRACT_TYPE = (
        ('Full-Time', 'Full-Time'),
        ('Part-Time', 'Part-Time'),
        ('Project', 'Project'),
        ('Internship', 'Internship'),
    )

    CURRENCY_CHOICES = (
        ('EUR', 'EUR'),
        ('USD', 'USD'),
        ('GBP', 'GBP'),
        ('AUD', 'AUD'),
        ('CAD', 'CAD'),
        ('CNY', 'CNY'),
        # Agrega otras opciones según tus necesidades
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    tools = models.ManyToManyField(ToolList)
    languages = models.ManyToManyField(LanguageList)
    location = models.ManyToManyField(LocationList)
    role = models.CharField(max_length=100)  # Nuevo campo para el rol
    # Nuevo campo para la información de 'share'
    share = models.TextField(blank=True, null=True)
   # business = models.CharField(max_length=100, blank=True, null=True)
    contract_type = models.CharField(max_length=50, choices=CONTRACT_TYPE)
    maximum_salary = models.CharField(max_length=20, blank=True, null=True)
    minimum_salary = models.CharField(max_length=20, blank=True, null=True)
    currency = models.CharField(
        max_length=50, choices=CURRENCY_CHOICES, blank=True, null=True)
   # compensation = models.ManyToManyField(CompensationsList)
    requirements = models.ManyToManyField(RequirementList)
    responsibilities = models.ManyToManyField(ResponsibilitiesList)
    benefits = models.ManyToManyField(BenefitsList)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(
        default=timezone.now)  # Fecha de publicación
    updated_at = models.DateTimeField(auto_now=True)

    # Campo para marcar como eliminado        # Fecha de actualización
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.title


<<<<<<< HEAD





=======
>>>>>>> 4e22db6866b061125d97190041ff4650e7e5f786
class Conversation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(
        default=timezone.now)  # Fecha de publicación

    def __str__(self):
        return self.prompt
