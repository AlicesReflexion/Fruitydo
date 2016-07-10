"""Fruitydo views that don't belong anywhere else."""
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from profilepage import urls


def home(request):
    """Home/landing page."""
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    else:
        return render(request, 'home.html')

def about(request):
    """About page"""
    return render(request, 'about.html')

def helppage(request):
    """Help page. DO NOT call this function 'help,' it overloads
    the built-in function."""
    return render(request, 'help.html')
