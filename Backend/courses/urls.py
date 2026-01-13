from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_user_courses, name='get_user_courses'),
    path('update/', views.update_user_course, name='update_user_courses'),
    path('add/', views.update_user_course, name='add_user_courses'),
    path('delete/', views.update_user_course, name='delete_user_courses'),
]