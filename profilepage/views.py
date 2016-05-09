from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from .models import Task, Event
from datetime import datetime

def profile(request):
    return render(request, 'profilepage/index.html')

def complete(request, task_id):
    task = get_object_or_404(Task, pk=task_id)
    task.complete = 1
    task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def create(request, task_title):
    entered_title = request.POST['task_title']
    task = Task(User = request.user, task_title = entered_title, pub_date = datetime.now(), recurring = 0, complete = 0, due_date = datetime.now())
    task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_create(request):
    entered_description = request.POST['event_description']
    entered_task = request.POST['task']
    entered_date = request.POST['pub_date']
    event = Event(event_description = entered_description, pub_date = entered_date, Task = get_object_or_404(Task, pk=entered_task))
    event.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_fetch(request):
    user = request.user
    date = request.POST['date']
    task = request.POST['task']
    returnevent = Event.objects.filter(pub_date = date, Task_id = task)
    print(returnevent);
    if not returnevent:
        return HttpResponse("Nothing happened on this day!")
    else:
        return HttpResponse(returnevent)

# Create your views here.
