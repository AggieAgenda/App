from django.urls import path
#from rest_framework.routers
from . import views
#router = DefaultRouter()
urlpatterns = [
    path("", views.index, name="index"),
]