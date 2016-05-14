from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from .models import Task, Event
from datetime import datetime
from django_markup.filter import MarkupFilter
from django_markup.markup import formatter

def profile(request):
    tasks = Task.objects.filter(User = request.user)
    completedtasks = tasks.filter(complete = True)
    incompletetasks = tasks.filter(complete = False)
    print(incompletetasks)
    return render(request, 'profilepage/index.html', {'completedtasks':completedtasks, 'incompletetasks':incompletetasks})

def complete(request):
    task_id = request.POST['task_id']
    task = get_object_or_404(Task, pk=task_id)
    task.complete = 1
    task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def create(request):
    entered_title = request.POST['task_title']
    task = Task(User = request.user, task_title = entered_title, pub_date = datetime.now(), recurring = 0, complete = 0, due_date = datetime.now())
    task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_create(request):
    entered_description = request.POST['event_description']
    entered_task = request.POST['task']
    entered_date = request.POST['pub_date']
    returnevent = Event.objects.filter(pub_date = entered_date, Task_id = entered_task)
    if not returnevent:
        event = Event(event_description = entered_description, pub_date = entered_date, Task = get_object_or_404(Task, pk=entered_task))
        event.save()
    else:
        returnevent[0].event_description = entered_description
        returnevent[0].save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_fetch(request):
    user = request.user
    date = request.POST['date']
    task = request.POST['task']
    returnevent = Event.objects.filter(pub_date = date, Task_id = task)
    if not returnevent:
        return HttpResponse("Nothing happened on this day!")
    else:
        formatted = (formatter(returnevent[0].event_description, filter_name='markdown'))
        return HttpResponse(formatted)

def event_fetch_raw(request):
    user = request.user
    date = request.POST['date']
    task = request.POST['task']
    returnevent = Event.objects.filter(pub_date = date, Task_id = task)
    if not returnevent:
        return HttpResponse("Nothing happened on this day!")
    else:
        return HttpResponse(returnevent[0].event_description)

# Create your views here.
