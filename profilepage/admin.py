from django.contrib import admin

from .models import Task, Event

class EventInline(admin.StackedInline):
        model = Event
        extra = 3

class TaskAdmin(admin.ModelAdmin):
        inlines = [EventInline]

admin.site.register(Task, TaskAdmin)

# Register your models here.
