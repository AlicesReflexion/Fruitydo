from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as logoutaccount

def logout(request):
    logoutaccount(request)
    return HttpResponseRedirect(reverse('home'))

def login(request):
    return render(request, 'fd_register/login.html')


# Create your views here.
