"""Add tasks and events to the admin interface"""
from django.contrib import admin

from .models import Task, Event

class EventInline(admin.StackedInline):
    """Create an interface for adding events."""
    model = Event
    extra = 3

class TaskAdmin(admin.ModelAdmin):
    """Add the interface."""
    inlines = [EventInline]

admin.site.register(Task, TaskAdmin)
