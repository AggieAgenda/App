from django.urls import path
from . import views

urlpatterns = [
    path('calendar/', views.get_user_calendar, name='get_user_calendar'),
    path('calendar/create/', views.create_calendar_event, name='create_calendar_event'),
    path('calendar/<uuid:event_id>/update/', views.update_calendar_event, name='update_calendar_event'),
    path('calendar/<uuid:event_id>/delete/', views.delete_calendar_event, name='delete_calendar_event'),
    path('find/', views.get_event, name='get_events'),
    path('add/',views.create_event, name='Add Event')
]