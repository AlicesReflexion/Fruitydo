from django.conf.urls import url

from . import views

app_name = 'userprefs'
urlpatterns = [
    url(r'^enable_otp/qr_code.png', views.otp_qrcode, name='otp_qrcode'),
    url(r'^enable_otp/confirm_otp', views.confirm_otp, name='confirm_otp'),
    url(r'^enable_otp', views.enable_otp, name='enable_otp'),
    url(r'^disable_otp', views.disable_otp, name='disable_otp'),
    url(r'^', views.settings_page, name='settings_page'),
    ]
