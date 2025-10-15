""" models.py """
import uuid
from users.models import UserAccount
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from ckeditor.fields import RichTextField
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import GenericRelation
from django.utils import timezone


class BlogCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"

    def __str__(self):
        return self.name


class ContentSection(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    heading = models.CharField(max_length=200, blank=True)
    content = RichTextField(blank=True)
    image = models.URLField(blank=True)
    alt_image = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.heading} - {self.content_object}"


class ContentBase(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DR', _('Draft')
        PUBLISHED = 'PU', _('Published')

    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    cover = models.URLField(blank=True)
    title = models.CharField(max_length=200)
    date_up = models.DateField(default=timezone.now)
    introduction = RichTextField(blank=True)
    conclusion = RichTextField(blank=True)
    slug = models.SlugField(max_length=255, unique=True, default=uuid.uuid4)
    view_count = models.PositiveIntegerField(default=0)
    yes_count = models.PositiveIntegerField(default=0)
    no_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reading_time = models.PositiveIntegerField(
        default=5, help_text="Estimated reading time in minutes")
    content_sections = GenericRelation(ContentSection)
    alt_cover = models.CharField(max_length=200, blank=True)
    # Tus campos existentes...
    status = models.CharField(
        max_length=2,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    class Meta:
        abstract = True
        verbose_name = "Content Base"
        verbose_name_plural = "Contents Base"

    def __str__(self):
        return self.title


class Wiki(ContentBase):
    class Meta:
        verbose_name = "Wiki"
        verbose_name_plural = "Wiki"

    def __str__(self):
        return f"Wiki: {self.title}"


class Blog(ContentBase):
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Blog"
        verbose_name_plural = "Blog"

    def __str__(self):
        return f"Blog: {self.title}"


class Research(ContentBase):
    # Campos específicos para Research
    class Meta:
        verbose_name = "Research"
        verbose_name_plural = "Research"

    def __str__(self):
        return f"Research: {self.title}"


class Guide(ContentBase):
    pdf = models.URLField(blank=True, null=True)
    resource = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "Guide"
        verbose_name_plural = "Guide"

    def __str__(self):
        return f"Guide: {self.title}"


class HelpCenter(ContentBase):
    video = models.URLField(blank=True, null=True)

    class Meta:
        verbose_name = "HelpCenter"
        verbose_name_plural = "HelpCenter"

    def __str__(self):
        return f"Help Center: {self.title}"


class HelpCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Help Category"
        verbose_name_plural = "Help Categories"

    def __str__(self):
        return self.name
