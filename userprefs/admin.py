"""Userpreference changes to the Django admin interface."""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from userprefs.models import Userpreference

class Userprefinline(admin.StackedInline):
    """Create an admin interface for user preferences."""
    model = Userpreference
    can_delete = False
    verbose_name_plural = "Preferences"

class UserAdmin(BaseUserAdmin):
    """attach the userpreferences settings to the
    UserAdmin interface."""
    inlines = (Userprefinline, )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
