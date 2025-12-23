from django.urls import path
from . import views

urlpatterns = [
    path('test-db/', views.create_test_data, name='test_db'),
    path('google/', views.google_login, name='google_login'),
    path('google/callback/', views.google_callback, name='google_callback'),
    path('user/', views.get_current_user, name='current_user'),
    path('logout/', views.logout, name='logout'),
    path('profile/update/', views.update_profile, name='update_profile'),

]