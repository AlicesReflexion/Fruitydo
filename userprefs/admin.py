from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from userprefs.models import user_preferences

class UserprefsInline(admin.StackedInline):
    model = user_preferences
    can_delete = False
    verbose_name_plural = 'preferences'

class UserAdmin(BaseUserAdmin):
    inlines = (UserprefsInline, )

admin.site.unregister(User)
admin.site.register(User, UserAdmin)

# Register your models here.
