from django.conf.urls import url

from . import views

app_name = 'fd_register'
urlpatterns = [
    url(r'^logout', views.logout, name='logout'),
    url(r'^login', views.login, name='login'),

]
