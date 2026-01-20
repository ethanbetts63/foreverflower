from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    """
    Custom user admin configuration that includes emergency contacts.
    """
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Contact Info', {'fields': ('country_code', 'phone',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Contact Info', {'fields': ('country_code', 'phone',)}),
    )

admin.site.register(User, CustomUserAdmin)
