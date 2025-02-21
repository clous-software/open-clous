from django.contrib import admin
from .models import *
# Register your models here.
class PostAdmin(admin.ModelAdmin):
    list_display =  ('id', 'title', 'status', 'published', 'author')
    list_display_links = ('title',)
    search_fields = ['title']
    list_per_page = 25
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published'
    ordering = ('-published',)

admin.site.register(Post, PostAdmin)
admin.site.register(ViewCount)
