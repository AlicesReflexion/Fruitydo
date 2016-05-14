from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth.models import User
from profilepage import urls
from django.core.urlresolvers import reverse

def home(request):
	if request.user.is_authenticated():
		return HttpResponseRedirect(reverse('profilepage:profile'))
	else:
		return render(request, 'home.html')

def about(request):
	return render(request, 'about.html')

def help(request):	
	return render(request, 'help.html')
