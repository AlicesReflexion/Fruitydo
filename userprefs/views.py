from django.shortcuts import render
from django.http import HttpResponse

def enable_otp(request):
    return render(request, 'userprefs/enableotp.html')

def otp_qrcode(request):
    return HttpResponse(request.user.username)

# Create your views here.
