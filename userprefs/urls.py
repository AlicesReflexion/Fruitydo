from django.conf.urls import url

from . import views

app_name = 'userprefs'
urlpatterns = [
    url(r'^enable_otp', views.enable_otp, name='enable_otp'),
]
