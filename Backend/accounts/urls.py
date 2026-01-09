from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.login_with_email, name="login"),
    path("me/", views.me, name="me"),
    path("logout/", views.logout, name="logout"),
    path("profile/", views.update_profile, name="update_profile"),

    # Optional
    path("google/", views.GoogleCodeLogin.as_view(), name="google_login"),
]
