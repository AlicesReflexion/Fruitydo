from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as logoutaccount
from django.contrib.auth import login as loginaccount
from django.contrib.auth import authenticate
from userprefs.models import Userpreference
import pyotp

def logout(request):
    logoutaccount(request)
    return HttpResponseRedirect(reverse('home'))

def login(request):
    return render(request, 'fd_register/login.html')

def confirm_login(request):
    username = request.POST["username"]
    password = request.POST["password"]
    if 'otpkey' in request.POST:
        otpkey = request.POST["otpkey"]
    else:
        otpkey = ""
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active and user.userpreference.otp is False:
            loginaccount(request, user)
            return HttpResponseRedirect(reverse("profilepage:profile"))
        elif user.userpreference.otp is True:
            serverkey = pyotp.TOTP(user.userpreference.otpkey)
            if otpkey != serverkey.now():
                return render(request, 'fd_register/login.html', {
                    'otp_required': True,
                    'username': username,
                    'password': password,
                })
            elif otpkey == serverkey.now():
                loginaccount(request, user)
                return HttpResponseRedirect(reverse("profilepage:profile"))
        else: return HttpResponse("Inactive user account.")
    else: return HttpResponseRedirect(reverse("home"))

# Create your views here.
