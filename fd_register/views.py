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
import re
from django.template.loader import get_template

def logout(request):
    logoutaccount(request)
    return HttpResponseRedirect(reverse('home'))

def login(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
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
        else:
            messages.error(request, "Inactive User account.")
    else:
        messages.error(request, "Incorrect username or password.")
    return HttpResponseRedirect(reverse("fd_register:login"))

def register(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    return render(request, 'fd_register/register.html')

def cofirm_register(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    username = request.POST['username'].lower()
    email = request.POST['email'].lower()
    password = request.POST['password']
    confirm_password = request.POST['confirm_password']
    if test_user(request, username, password, confirm_password, email):
        newuser = User.objects.create_user(
            username=username,
            email=email,
            password=password)
        Userpreference.createprefs(newuser)
        if settings.EMAIL_AVAILABLE:
            newuser.is_active = False
            newuser.save()
            send_email(request, newuser)
            return render(request, "fd_register/email_sent.html")
        else:
            newuser.save()
            newuser = authenticate(username=username, password=password)
            loginaccount(request, newuser)
            return HttpResponseRedirect(reverse("profilepage:profile"))
    else:
        return HttpResponseRedirect(reverse("fd_register:register"))

def test_user(request, username, password, confirm_password, email):
    user_works = True
    try:
        User.objects.get(username=username)
        messages.error(request, "Username is already taken.")
        user_works = False
    except User.DoesNotExist:
        pass
    try:
        User.objects.get(email=email)
        messages.error(request, "Email is already taken.")
    except User.DoesNotExist:
        pass
    if not 3 < len(username) < 32:
        messages.error(request, "Username must be between 3 and 32 characters long.")
        user_works = False
    if not len(password) > 8:
        messages.error(request, "Password must be at least 8 characters long.")
        user_works = False
    if password != confirm_password:
        messages.error(request, "Passwords do not match.")
        user_works = False
    if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
        messages.error(request, "Not a valid email address")
        user_works = False
    return user_works


def send_email(request, user):
    message_template = get_template("fd_register/email.txt")
    activationurl = request.build_absolute_uri(reverse('fd_register:confirm_email'))
    emailcode = user.userpreference.activationurl
    message = message_template.render({'activationurl':activationurl, 'emailcode':emailcode})
    send_mail("Verify your email address with Fruitydo",
              message,
              "noreply@fruitydo.alexskc.xyz",
              [user.email],
              fail_silently=False)

def confirm_email(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    emailcode = request.GET['emailcode']
    try:
        userpref = Userpreference.objects.get(activationurl=emailcode)
    except Userpreference.DoesNotExist:
        return HttpResponse("Activation code does not exist")
    user = userpref.user
    if not user.is_active:
        user.is_active = True
        userpref.activationurl = pyotp.random_base32()
        userpref.save()
        user.save()
        messages.success(request, "Email successfully confirmed. You can log in now.")
        return HttpResponseRedirect(reverse('fd_register:login'))
    else:
        return HttpResponse("User account already activated")

def reset_password(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    if 'email' in request.POST:
        email = request.POST['email']
        try:
            user = User.objects.get(email=email)
            reseturl = request.build_absolute_uri(reverse('fd_register:confirm_reset'))
            emailcode = user.userpreference.activationurl
            message_template = get_template("fd_register/reset.txt")
            message = message_template.render({'reseturl':reseturl, 'emailcode':emailcode})
            send_mail("Fruitydo password reset",
                      message,
                      "noreply@fruitydo.alexskc.xyz",
                      [user.email],
                      fail_silently=False)
        except User.DoesNotExist:
            print("Failed attempt at resetting" + email)
        messages.success(request, "If a user with that address exists, an email has been sent.")
        return HttpResponseRedirect(reverse("fd_register:reset_password"))
    return render(request, "fd_register/reset_password.html")

def confirm_reset(request):
    if request.user.is_authenticated():
        return HttpResponseRedirect(reverse('profilepage:profile'))
    if 'emailcode' in request.GET:
        if 'password' and 'confirm_password' not in request.POST:
            reseturl = reverse('fd_register:confirm_reset') + "?emailcode=" + request.GET['emailcode']
            return render(request, "fd_register/confirm_reset.html", {'reseturl':reseturl})
        else:
            emailcode = request.GET['emailcode']
            try:
                userpref = Userpreference.objects.get(activationurl=emailcode)
            except Userpreference.DoesNotExist:
                messages.error(request, "Invalid reset code.")
                return HttpResponseRedirect(reverse("home"))
            user = userpref.user
            password = request.POST['password']
            confirm_password = request.POST['confirm_password']
            if password == confirm_password:
                user.set_password(password)
                userpref.activationurl = pyotp.random_base32()
                userpref.save()
                user.save()
                user = authenticate(username=user.username,password=password)
                loginaccount(request, user)
                messages.success(request, "Succesfully changed password")
                return HttpResponseRedirect(reverse("profilepage:profile"))
            else:
                messages.error(request, "Passwords do not match.")
                url = reverse("fd_register:confirm_reset")
                url = url + "?emailcode=" + emailcode
                return HttpResponseRedirect(url)
    else:
        messages.error(request, "No reset code")
        return render(request, "fd_register/confirm_reset.html")
