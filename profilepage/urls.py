from django.conf.urls import url

from . import views

app_name = 'profilepage'
urlpatterns = [
    url(r'^event_fetch', views.event_fetch, name='event_fetch'),
    url(r'^task_delete', views.task_delete, name='task_delete'),
    url(r'^create_task', views.create, name='create'),
    url(r'^create_event', views.event_create, name='event_create'),
    url(r'^event_dates', views.event_dates, name='event_dates'),
    url(r'^done', views.done, name='done'),
    url(r'^', views.profile, name='profile'),
    ]
