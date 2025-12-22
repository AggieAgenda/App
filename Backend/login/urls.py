from django.urls import path
from . import views

urlpatterns = [
    path('test-db/', views.create_test_data, name='test_db'),
]