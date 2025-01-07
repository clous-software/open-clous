from django.contrib.auth.models import BaseUserManager
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
  def email_validator(self, email):
    try:
      validate_email(email)
    except ValidationError:
      raise ValidationError(_('You must provide a valid email'))
  
  def create_user(self, email, first_name, last_name=None, password=None, **extra_fields):
    if not email:
      raise ValueError(_('This field is required'))
    else:
      self.email_validator(email)
      clean_email = self.normalize_email(email)
    if not first_name:
      raise ValueError(_('This field is required'))
    user = self.model(
      email=clean_email, 
      first_name=first_name, 
      last_name=last_name, 
      **extra_fields
    )
    user.set_password(password)
    extra_fields.setdefault('is_superuser', False)
    extra_fields.setdefault('is_staff', False)
    user.save()
    return user
  
  def create_superuser(self, email, first_name, last_name=None, password=None, **extra_fields):
    extra_fields.setdefault('is_superuser', True)
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_active', True)
    if not email:
      raise ValueError(_('This field is required'))
    else:
      self.email_validator(email)
      clean_email = self.normalize_email(email)
    if not first_name:
      raise ValueError(_('This field is required'))
    if extra_fields.get('is_superuser') is not True:
      raise ValueError(_('Superuser must have True in is_superuser=True'))
    if extra_fields.get('is_staff') is not True:
      raise ValueError(_('Superuser must have True in is_staff=True'))
    
    user = self.create_user(
      clean_email, 
      first_name, 
      last_name, 
      password, 
      **extra_fields
    )

    user.save()
    return user