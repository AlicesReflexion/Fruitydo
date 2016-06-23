from django.conf.urls import url

from . import views

app_name = 'fd_register'
urlpatterns = [
    url(r'^logout', views.logout, name='logout'),
    url(r'^login', views.login, name='login'),
    url(r'^confirm_login', views.confirm_login, name='confirm_login'),
    url(r'^register', views.register, name='register'),
    url(r'^confirm_register', views.cofirm_register, name='confirm_register'),
    url(r'^confirm_email', views.confirm_email, name='confirm_email'),
]
