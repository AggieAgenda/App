from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = [
    #path('', views.CalendarItemViewSet, name='list'),
    path('', views.get_user_calendar, name='get_user_calendar'),
    path('create', views.create_calendar_event, name='create_calendar_event'),
    path('calendar/<uuid:event_id>/update/', views.update_calendar_event, name='update_calendar_event'),
    path('calendar/<uuid:event_id>/delete/', views.delete_calendar_event, name='delete_calendar_event'),

]
