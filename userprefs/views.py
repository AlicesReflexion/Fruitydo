from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from .models import Userpreference
import pyotp
import qrcode

def enable_otp(request):
    return render(request, 'userprefs/enableotp.html')

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
        return HttpResponseRedirect(reverse('profilepage:profile'))
    else:
        return HttpResponse("Codes do not appear to match.")
