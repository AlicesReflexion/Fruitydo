from django.conf.urls import url

from . import views

app_name = 'userprefs'
urlpatterns = [
    url(r'^enable_otp', views.enable_otp, name='enable_otp'),
    url(r'^enable_otp/qr_code', views.otp_qrcode, name='otp_qrcode')
]
