from django.urls import path
from . import views

urlpatterns = [
    path('google/login/', views.google_login, name='google-login'),
    path('test', views.test, name = 'testing'),
    path('syllabus', views.pdfScrape, name = "syllabus")
]
