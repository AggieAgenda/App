from django.urls import path
from . import views

from .views import EventListAPIView

urlpatterns = [
    # Authentication
    path('auth/google/', views.google_login, name='google_login'),
    
    # Syllabus Reader
    path('syllabus/', views.pdf_scraper, name='pdf_scraper'),
    
    # Calendar Events
    path('calendar/events/', views.calendar_events, name='calendar_events'),
    path('calendar/events/<int:event_id>/', views.calendar_events, name='calendar_event_detail'),
    
    # Event Search
    path("events/", EventListAPIView.as_view(), name="events"),
    path('events/search/', views.event_search, name='event_search'),
    path('events/register/', views.event_search, name='event_register'),
    
    # Organization Search
    path('organizations/search/', views.organization_search, name='organization_search'),
    path('organizations/<int:org_id>/', views.organization_detail, name='organization_detail'),
    
    # Dashboard Overview
    path('dashboard/overview/', views.dashboard_overview, name='dashboard_overview'),
    path('deadlines/<int:deadline_id>/toggle/', views.toggle_deadline),
    path('schedule/<int:schedule_id>/toggle/', views.toggle_schedule),
    path('events/<int:event_id>/toggle/', views.toggle_event),
]