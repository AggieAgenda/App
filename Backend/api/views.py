from django.shortcuts import render

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView # probably import someething for this

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

google_login = GoogleLogin.as_view()

class EventListAPI(APIView):
    def get(self, request):
        events = Event.objects.all()  # Get all events from the database
        serializer = EventSerializer(events, many=True)  # Convert to JSON
        return Response(serializer.data)
