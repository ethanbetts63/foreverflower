from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    """
    Custom user admin configuration that includes emergency contacts.
    """
    pass

admin.site.register(User, CustomUserAdmin)
