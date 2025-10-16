from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello World. You're at the polls index.")

# Create your views here.
@api_view(['POST']) # not sure if this works yet.
def google_login(request):
    token = request.data.get('token')
    idinfo = id_token.verify_oauth2_token(token, requests.Request())
    # logic to get or create user
    return Response({"message": "Login successful"})
