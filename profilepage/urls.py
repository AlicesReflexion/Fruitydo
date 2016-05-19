from django.conf.urls import url

from . import views

app_name = 'profilepage'
urlpatterns = [
    url(r'^profile/event_fetch_raw', views.event_fetch_raw, name='event_fetch_raw'),
    url(r'^profile/event_fetch_fancy', views.event_fetch_fancy, name='event_fetch_fancy'),
    url(r'^profile/task_delete', views.task_delete, name='task_delete'),
    url(r'^profile/create_task', views.create, name='create'),
    url(r'^profile/create_event', views.event_create, name='event_create'),
    url(r'^profile', views.profile, name='profile'),
    ]
