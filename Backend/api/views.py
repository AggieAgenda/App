from django.shortcuts import render

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView # probably import someething for this

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

google_login = GoogleLogin.as_view()
