from django.urls import path
from . import views

urlpatterns = [
    path('google/login/', views.google_login, name='google-login'),
    path('events/', views.EventListAPI.as_view(), name='event-list-api'),  #api route
]
