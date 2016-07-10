"""Views controlling the user settings page. So 2FA, password resetting,
encryption, and other settings, and their relevant pages."""
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
import pyotp
import qrcode
from .models import Userpreference

def settings_page(request):
    """Settings page"""
    return render(request, 'userprefs/settingspage.html')

def enable_otp(request):
    """Page to enable 2FA on the account."""
    return render(request, 'userprefs/enableotp.html')

def change_password(request):
    """Password change page. This only displays the page,
    not the actual logic. That's 'changepassword_confirm.'"""
    return render(request, 'userprefs/changepassword.html')

def changepassword_confirm(request):
    """Password changing logic. Enter the old password,
    and a new password with confirmation. Change password on success."""
    oldpass = request.POST['currentpass']
    newpass = request.POST['newpass']
    newpass_confirm = request.POST['newpass_confirm']
    if not request.user.check_password(oldpass):
        messages.error(request, "Incorrect current password.")
    elif newpass != newpass_confirm:
        messages.error(request, "New passwords do not match.")
    else:
        request.user.set_password(newpass)
        request.user.save()
        update_session_auth_hash(request, request.user)
        messages.success(request, "Successfully changed password.")
    return HttpResponseRedirect(reverse('userprefs:settings_page'))

def disable_otp(request):
    """Button to disable OTP. There's no page for this. Just a single
    button on the user settings page."""
    request.user.userpreference.otp = False
    request.user.userpreference.save()
    messages.success(request, "Disabled Two Factor Authentication.")
    return HttpResponseRedirect(reverse('userprefs:settings_page'))

def otp_qrcode(request):
    """The QRcode image that's generated for the user to scan with their
    phone."""
    otpkey = pyotp.TOTP(request.user.userpreference.otpkey)
    provision = otpkey.provisioning_uri("Fruitydo")
    otpqr = qrcode.make(provision)
    response = HttpResponse(content_type="image/png")
    otpqr.save(response, "PNG")
    return response

def confirm_otp(request):
    """The button to enable 2FA on the user's account. They need to first
    enter the current OTP code before simply enabling it to make sure that
    everything is configured properly for both the user and the server."""
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
