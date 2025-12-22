from django.shortcuts import render
from django.http import HttpResponse
from .models import TestEntry

def create_test_data(request):
    # This creates a record in your Neon Postgres database
    new_item = TestEntry.objects.create(name="Team Test Entry")
    
    # Let's count how many we have now
    total_count = TestEntry.objects.count()
    
    return HttpResponse(f"Success! Saved '{new_item.name}' to the database. Total entries: {total_count}")
# Create your views here.
