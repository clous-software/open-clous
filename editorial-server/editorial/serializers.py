""" serializers.py """
from rest_framework import serializers

from .models import BlogCategory, HelpCategory, Wiki, Blog, Research, Guide, HelpCenter, ContentSection, ContentBase


class ContentBaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentBase
        fields = ['author', 'cover', 'alt_cover', 'date_up', 'title', 'introduction',
                  'conclusion', 'view_count', 'yes_count', 'no_count', 'status', 'slug', 'reading_time']


class ContentSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentSection
        fields = ['heading', 'content', 'image',
                  'alt_image', 'content_type', 'object_id']


class WikiSerializer(serializers.ModelSerializer):
    content_sections = ContentSectionSerializer(many=True, read_only=True)

    class Meta(ContentBaseSerializer.Meta):
        model = Wiki
        fields = ContentBaseSerializer.Meta.fields + ['content_sections']


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['name']


class BlogSerializer(ContentBaseSerializer):
    category = BlogCategorySerializer()
    content_sections = ContentSectionSerializer(many=True, read_only=True)

    class Meta(ContentBaseSerializer.Meta):
        model = Blog
        fields = ContentBaseSerializer.Meta.fields + \
            ['category'] + ['content_sections']


class ResearchSerializer(ContentBaseSerializer):
    content_sections = ContentSectionSerializer(many=True, read_only=True)

    class Meta(ContentBaseSerializer.Meta):
        model = Research
        fields = ContentBaseSerializer.Meta.fields + ['content_sections']


class GuideSerializer(ContentBaseSerializer):
    content_sections = ContentSectionSerializer(many=True, read_only=True)

    class Meta(ContentBaseSerializer.Meta):
        model = Guide
        fields = ContentBaseSerializer.Meta.fields + \
            ['content_sections'] + ['pdf'] + ['resource']


class HelpCenterSerializer(ContentBaseSerializer):
    content_sections = ContentSectionSerializer(many=True, read_only=True)

    class Meta(ContentBaseSerializer.Meta):
        model = HelpCenter
        fields = ContentBaseSerializer.Meta.fields + \
            ['video'] + ['content_sections']


class HelpCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = HelpCategory
        fields = ['name']
