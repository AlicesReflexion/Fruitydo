from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import Userpreference
from django.contrib import messages
import pyotp
import qrcode

def settings_page(request):
    return render(request, 'userprefs/settingspage.html')

def enable_otp(request):
    return render(request, 'userprefs/enableotp.html')

def disable_otp(request):
    request.user.userpreference.otp = False
    request.user.userpreference.save()
    messages.success(request, "Disabled Two Factor Authentication.")
    return HttpResponseRedirect(reverse('userprefs:settings_page'))

def otp_qrcode(request):
    otpkey = pyotp.TOTP(request.user.userpreference.otpkey)
    provision = otpkey.provisioning_uri("Fruitydo")
    otpqr = qrcode.make(provision)
    response = HttpResponse(content_type="image/png")
    otpqr.save(response, "PNG")
    return response

def confirm_otp(request):
    user = request.user
    confirmcode = request.POST['confirmcode']
    otpkey = pyotp.TOTP(request.user.userpreference.otpkey)
    if confirmcode == otpkey.now():
        user.userpreference.otp = True
        user.userpreference.save()
        messages.success(request, "Enabled Two Factor Authentication.")
    else:
        messages.error(request, "Key does not match.")
    return HttpResponseRedirect(reverse('userprefs:settings_page'))
