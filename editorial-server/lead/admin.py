from django.contrib import admin
from .models import *
# Register your models here.


class ResourceAdmin(admin.ModelAdmin):
    list_display = ('id', 'email', 'first', 'last', 'companyName',
                    'companyWebsite', 'companySize',  'interest', 'created_at')
    list_display_links = ('email',)
    search_fields = ['email']
    list_per_page = 25


admin.site.register(Resource, ResourceAdmin)


@admin.register(WaitlistEmail)
class WaitlistEmailAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_submitted')
    search_fields = ('email',)


@admin.register(ContactSale)
class ContactSaleAdmin(admin.ModelAdmin):
    list_display = ('first', 'last', 'email', 'reason', 'message', 'date_submitted')
    search_fields = ('email',)
