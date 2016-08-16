from django.conf.urls import url

from . import views

app_name = 'userprefs'
urlpatterns = [
    url(r'^change_password', views.change_password, name='change_password'),
    url(r'^changepassword_confirm', views.changepassword_confirm, name='changepassword_confirm'),
    url(r'^change_email', views.change_email, name='change_email'),
    url(r'^confirm_email', views.confirm_email, name='confirm_email'),
    url(r'^enable_otp/qr_code.png', views.otp_qrcode, name='otp_qrcode'),
    url(r'^enable_otp/confirm_otp', views.confirm_otp, name='confirm_otp'),
    url(r'^enable_otp', views.enable_otp, name='enable_otp'),
    url(r'^disable_otp', views.disable_otp, name='disable_otp'),
    url(r'^crypto_settings/all_tasks', views.all_tasks, name='all_tasks'),
    url(r'^crypto_settings/confirm_crypto', views.confirm_crypto, name='confirm_crypto'),
    url(r'^crypto_settings/disable_crypto', views.disable_crypto, name='disable_crypto'),
    url(r'^crypto_settings', views.crypto_settings, name='crypto_settings'),
    url(r'^crypto_key', views.crypto_key, name='crypto_key'),
    url(r'^', views.settings_page, name='settings_page'),
    ]
