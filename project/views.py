from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.models import User

def home(request):
	if request.user.is_authenticated():
		return render(request, 'profilepage/index.html')
	else:
		return render(request, 'home.html')

def about(request):
	return render(request, 'about.html')

def help(request):	
	return render(request, 'help.html')
