from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView # probably import someething for this

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
class Test(SocialLoginView):
    print("testing objects")
class Calender(SocialLoginView):
    classes = []

class PDFScraper(APIView): # needs to somehow take a pdf
    # class is the api 
    # define post get set 
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No File'})
        
    def get(self, request, *args, **kwargs):
        return Response({'message': 'You can hear me'})
    pdf = []
google_login = GoogleLogin.as_view()
test = Test.as_view()
pdfScrape = PDFScraper.as_view()
