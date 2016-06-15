from django.shortcuts import render

def enable_otp(request):
    return render(request, 'userprefs/enableotp.html')

# Create your views here.
