from django.shortcuts import render
from django.http import HttpResponse

def demo(request):
    return render(request, 'demo/index.html')
# Create your views here.
