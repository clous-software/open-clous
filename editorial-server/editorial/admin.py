""" admin.py """
from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from users.models import UserAccount
from .models import BlogCategory, Wiki, Blog, Research, Guide, HelpCenter, ContentSection


# Inline para ContentSection, permitiendo edición en la misma página que el modelo principal
class ContentSectionInline(GenericStackedInline):
    model = ContentSection
    extra = 1


# Clase genérica de admin para manejar campos comunes de ContentBase
class ContentModelAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'view_count', 'yes_count',
                    'status', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at',
                       'view_count', 'no_count', 'yes_count', 'slug')
    search_fields = ['title']
    list_filter = ('status',)

    inlines = [ContentSectionInline]

    fieldsets = (
        (None, {'fields': ('title', 'cover', 'alt_cover', 'date_up', 'author', 'introduction', 'conclusion', 'reading_time', 'slug',
                           'status', 'created_at', 'updated_at', 'view_count', 'no_count', 'yes_count')}),
    )

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = super().get_readonly_fields(request, obj)
        if not request.user.is_superuser:
            readonly_fields += ('status',)
        return readonly_fields

    def save_model(self, request, obj, form, change):
        if obj.pk:  # Si es una actualización, no una creación
            if 'author' in self.get_readonly_fields(request, obj):
                # Obtén la instancia de UserAccount correspondiente al usuario actual
                user_account_instance = UserAccount.objects.get(
                    user=request.user)
                obj.author = user_account_instance
        super().save_model(request, obj, form, change)

# Clases específicas para Blog y HelpCenter para manejar campos adicionales


class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ['name']


admin.site.register(BlogCategory, BlogCategoryAdmin)


class BlogAdmin(ContentModelAdmin):
    list_display = ContentModelAdmin.list_display + ('category',)
    fieldsets = ContentModelAdmin.fieldsets + \
        ((None, {'fields': ('category',)}),)


class HelpCenterAdmin(ContentModelAdmin):
    list_display = ContentModelAdmin.list_display + ('video',)
    fieldsets = ContentModelAdmin.fieldsets + ((None, {'fields': ('video',)}),)


class GuideAdmin(ContentModelAdmin):
    list_display = ContentModelAdmin.list_display + ('pdf', 'resource')
    fieldsets = ContentModelAdmin.fieldsets + \
        ((None, {'fields': ('pdf', 'resource')}),)


# Registro de los modelos con sus clases de admin específicas
admin.site.register(Blog, BlogAdmin)
admin.site.register(Guide, GuideAdmin)
admin.site.register(Wiki, ContentModelAdmin)
admin.site.register(Research, ContentModelAdmin)
admin.site.register(HelpCenter, HelpCenterAdmin)
