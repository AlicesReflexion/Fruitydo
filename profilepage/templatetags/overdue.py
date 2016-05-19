from django import template
from profilepage.models import Task
from django.utils import timezone

register = template.Library()

@register.filter
def overdue(value):
        if value.due_date.date() < timezone.now().date():
                return "OVERDUE"
        else:
                return ""
