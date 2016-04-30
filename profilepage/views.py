from django.http import HttpResponse
from django.views import generic
from django.contrib.auth.models import User
from django.template import loader
from django.shortcuts import render

def profile(request):
    return render(request, 'profilepage/index.html')

# Create your views here.
