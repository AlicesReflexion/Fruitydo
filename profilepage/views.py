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
    return render(request, 'profilepage/index.html', {'completedtasks':completedtasks, 'incompletetasks':incompletetasks})

def create(request):
    entered_title = request.POST['task_title']
    task = Task(User = request.user, task_title = entered_title, pub_date = datetime.now(), recurring = 0, complete = 0, due_date = datetime.now())
    task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_create(request):
    completed = bool("markcomplete" in request.POST)
    print(completed)
    entered_description = request.POST['event_description']
    entered_task = request.POST['task']
    entered_date = request.POST['pub_date']
    task = Task.objects.get(id=entered_task)
    if task.User != request.user:
        return HttpResponse("An unexpected error occured.")
    returnevent = Event.objects.filter(pub_date = entered_date, Task_id = entered_task)
    if not returnevent:
        event = Event(event_description = entered_description, pub_date = entered_date, Task = get_object_or_404(Task, pk=entered_task))
        event.save()
    else:
        returnevent[0].event_description = entered_description
        task.complete = completed
        returnevent[0].save()
        task.save()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def task_delete(request):
    user = request.user
    task = get_object_or_404(Task, User_id = user.id, id = request.POST['task'])
    task.delete()
    return HttpResponseRedirect(reverse('profilepage:profile'))

def event_fetch(request):
    user = request.user
    date = request.POST['date']
    try:
        task = Task.objects.get(id = request.POST['task'], User_id = user.id)
    except Task.DoesNotExist:
        return "An unexpected error occured."
    try:
        returnevent = Event.objects.get(pub_date = date, Task_id = task.id)
    except Event.DoesNotExist:
        return "Nothing happened on this date!"
    else:
        return returnevent.event_description


def event_fetch_fancy(request):
    string = event_fetch(request)
    string = formatter(string, filter_name='markdown')
    return HttpResponse(string)

def event_fetch_raw(request):
    string = event_fetch(request)
    return HttpResponse(string)
# Create your views here.
