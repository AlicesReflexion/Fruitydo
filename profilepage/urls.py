from django.conf.urls import url

from . import views

app_name = 'profilepage'
urlpatterns = [
        url(r'^profile/(?P<task_id>[0-9]+)/complete/$', views.complete, name='complete'),
        url(r'^profile/(?P<task_title>.+)/create/$', views.create, name='create'),
        url(r'^profile', views.profile, name='profile')
        ]
