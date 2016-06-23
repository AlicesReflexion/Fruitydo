from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.core.urlresolvers import reverse
from django.contrib.auth import logout as logoutaccount
from django.contrib.auth import login as loginaccount
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail
from userprefs.models import Userpreference
import pyotp
from django.template.loader import get_template

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

def register(request):
    return render(request, 'fd_register/register.html')

def cofirm_register(request):
    username = request.POST['username'].lower()
    email = request.POST['email'].lower()
    password = request.POST['password']
    confirm_password = request.POST['confirm_password']
    if password == confirm_password:
        newuser = User.objects.create_user(
            username=username,
            email=email,
            password=password)
        Userpreference.createprefs(newuser)
        if settings.EMAIL_AVAILABLE:
            newuser.is_active = False
            newuser.save()
            send_email(newuser, request)
    return HttpResponse("ayylmao")

def send_email(user, request):
    message_template = get_template("fd_register/email.txt")
    activationurl = request.build_absolute_uri(reverse('fd_register:confirm_email'))
    emailcode = user.userpreference.activationurl
    message = message_template.render({'activationurl': activationurl, 'emailcode':emailcode})
    send_mail("Verify your email address with Fruitydo",
              message,
              "noreply@fruitydo.alexskc.xyz",
              [user.email],
              fail_silently=False)

def confirm_email(request):
    emailcode = request.GET['emailcode']
    try:
        userpref = Userpreference.objects.get(activationurl=emailcode)
    except Userpreference.DoesNotExist:
        return HttpResponse("pls")
    user = userpref.user
    if not user.is_active:
        user.is_active = True
        user.save()
        return HttpResponse(user)
    else:
        return HttpResponse("pls")
