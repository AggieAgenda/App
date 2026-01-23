# organizations/urls.py
from django.urls import path
from . import views

app_name = 'organizations'

urlpatterns = [

    path('', views.get_organizations),
    path('join', views.join_organization),
    
]