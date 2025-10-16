from django.urls import path
from . import views
from .views import google_login

urlpatterns = [
    path("", views.index, name="index"),
    path('auth/google/', google_login, name='google-login')
]
# backend should expose endpoint http://localhost:8000/api/auth/google/
# use axios.post(url)
# have to install django-cors-headers because browser will block the frontend trying to hit backend since on two different ports