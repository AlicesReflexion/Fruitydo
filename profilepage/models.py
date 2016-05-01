from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
        User = models.ForeignKey(User, on_delete=models.CASCADE)
        task_title = models.CharField(max_length=200)
        pub_date = models.DateTimeField('date published')
        due_date = models.DateTimeField('due date')
        recurring = models.IntegerField()
        complete = models.BooleanField('Complete', default=0)
        #1=Every day
        #2=Every other day
        #3=Every weekday
        #4=Every Week
        #5=Every other week
        #6=Every Month
        #7=Every Yeah

class Event(models.Model):
        Task = models.ForeignKey(Task, on_delete=models.CASCADE)
        event_description = models.TextField('event description')
        pub_date = models.DateTimeField('date published')


# Create your models here.
