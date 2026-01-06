from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    # Option A: Return simple text
    return HttpResponse("Welcome to the Homepage!")

    # Option B: Render an HTML template (if you have one)
    # return render(request, 'index.html')