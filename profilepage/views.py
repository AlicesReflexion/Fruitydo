from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404
from django.core.urlresolvers import reverse
from .models import Task
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

# Create your views here.
