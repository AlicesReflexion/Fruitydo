from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from userprefs.models import Userpreference

class Userprefinline(admin.StackedInline):
    model = Userpreference
    can_delete = False
    verbose_name_plural = "Preferences"

class UserAdmin(BaseUserAdmin):
    inlines = (Userprefinline, )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
