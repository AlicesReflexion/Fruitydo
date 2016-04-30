from django.http import HttpResponse


def home(request):
	return HttpResponse('Hello world from django 1.8 on Open Shift')

def about(request):
	return HttpResponse('totes an about page')

def help(request):
	return HttpResponse('totes a help page')
