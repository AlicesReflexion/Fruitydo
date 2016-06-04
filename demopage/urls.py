from django.conf.urls import url

from . import views

app_name = 'demopage'
urlpatterns = [
    url(r'^demo', views.demo, name='demo'),
    ]
