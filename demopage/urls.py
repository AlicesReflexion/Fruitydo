from django.conf.urls import url

from . import views

app_name = 'demopage'
urlpatterns = [
    url(r'^', views.demo, name='demo'),
    ]
