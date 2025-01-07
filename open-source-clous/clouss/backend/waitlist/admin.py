from django.contrib import admin
from .models import WaitlistEmail, ContactSale, FeedbackMessage

@admin.register(WaitlistEmail)
class WaitlistEmailAdmin(admin.ModelAdmin):
    list_display = ('email', 'date_submitted')
    search_fields = ('email',)

@admin.register(ContactSale)
class ContactSaleAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'date_submitted')
    search_fields = ('email', 'first_name', 'last_name')



@admin.register(FeedbackMessage)
class FeedbackMessageAdmin(admin.ModelAdmin):
    list_display = ('message', 'date_submitted')
    search_fields = ('message',)
