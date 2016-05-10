from django.conf.urls import url

from . import views

app_name = 'profilepage'
urlpatterns = [
        url(r'^profile/event_fetch_raw', views.event_fetch_raw, name='event_fetch_raw'),
        url(r'^profile/event_fetch', views.event_fetch, name='event_fetch'),
        url(r'^profile/(?P<task_id>[0-9]+)/complete/$', views.complete, name='complete'),
        url(r'^profile/(?P<task_title>.+)/create/$', views.create, name='create'),
        url(r'^profile/event_create', views.event_create, name='event_create'),
        url(r'^profile', views.profile, name='profile'),
        ]
