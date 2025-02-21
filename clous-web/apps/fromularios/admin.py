from django.contrib import admin
from .models import *
# Register your models here.
class ContactoAdmin(admin.ModelAdmin):
    list_display =  ('id', 'email', 'first', 'created_at', 'subject')
    list_display_links = ('email',)
    search_fields = ['email']
    list_per_page = 25


admin.site.register(Contacto, ContactoAdmin)


class TeamsAdmin(admin.ModelAdmin):
    list_display =  ('id', 'email', 'name', 'created_at', 'industry', 'company',)
    list_display_links = ('email',)
    search_fields = ['email']
    list_per_page = 25


admin.site.register(HrTeams, TeamsAdmin)

class PressAdmin(admin.ModelAdmin):
    list_display =  ('id', 'email', 'name', 'created_at', 'date', 'angle',)
    list_display_links = ('email',)
    search_fields = ['email']
    list_per_page = 25


admin.site.register(Press, PressAdmin)



class PartnersAdmin(admin.ModelAdmin):
    list_display =  ('id', 'email', 'name', 'created_at', 'type', 'company', 'angle')
    list_display_links = ('email',)
    search_fields = ['email']
    list_per_page = 25


admin.site.register(Partners, PartnersAdmin)