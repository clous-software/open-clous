from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserAccount
from django.contrib.auth.models import Group


class UserProfileInline(admin.StackedInline):
    model = UserAccount
    can_delete = False
    verbose_name_plural = 'UserProfile'
    fk_name = 'user'


class CustomUserAdmin(UserAdmin):
    model = User
    inlines = (UserProfileInline,)
    list_display = ['email', 'first_name', 'last_name', 'is_staff', 'is_active']
    list_filter = ['email', 'is_staff', 'is_active']
    ordering = ['email']
    search_fields = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_active', 'is_staff',
                       'is_superuser', 'groups', 'user_permissions'),
        }),
    )


admin.site.register(User, CustomUserAdmin)

class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('get_author_name','position', 'linkedin', 'twitter', 'website', 'avatar')

    def get_author_name(self, obj):
        return obj.user.get_full_name()  # Utiliza el método get_full_name del modelo User
    get_author_name.short_description = 'Author Name'  # Cambia el encabezado de la columna

admin.site.register(UserAccount, UserAccountAdmin)