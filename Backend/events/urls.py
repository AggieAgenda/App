from django.urls import path
from . import views

urlpatterns = [
    path('calendar/', views.get_user_calendar, name='get_user_calendar'),
    path('calendar/create/', views.create_calendar_event, name='create_calendar_event'),
]