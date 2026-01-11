from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_user_courses, name='get_user_courses'),
    path('create/', views.create_user_course, name='create_user_courses'),
    path('update/', views.update_user_course, name='update_user_courses'),
    path('delete/', views.delete_user_course, name='delete_user_course'),


    
]