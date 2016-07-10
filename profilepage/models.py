"""Tasks and events. Each user can have any number of tasks,
and each task can have any number of events."""
from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    """A user's task. Just a name, an optional due date, and an
    attached calendar. When the use is done, the user can send it
    to their archive of done tasks."""
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    task_title = models.CharField(max_length=200)
    pub_date = models.DateField('date published')
    due_date = models.DateField('due date')
    recurring = models.IntegerField()
    complete = models.BooleanField('Complete', default=0)
    #1=Every day
    #2=Every other day
    #3=Every weekday
    #4=Every Week
    #5=Every other week
    #6=Every Month
    #7=Every Yeah
    def __str__(self):
        return self.task_title

class Event(models.Model):
    """Events belong to tasks. Any number of events can exist,
    but only one per day. pub_date is not actually the publication
    date, but a date the user has chosen."""
    Task = models.ForeignKey(Task, on_delete=models.CASCADE)
    event_description = models.TextField('event description')
    pub_date = models.DateField('date published') # NOT THE PUBLICATION DATE
    def __str__(self):
        return self.event_description
