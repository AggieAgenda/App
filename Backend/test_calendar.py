#!/usr/bin/env python
"""
Quick script to test calendar API with sample data
Run with: python test_calendar.py
"""
import os
import django
import sys

# Setup Django
sys.path.append('/Users/user/Documents/AggieAgenda/App/Backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Backend.settings')
django.setup()

from accounts.models import User
from events.models import Event, UserCalendarEvent
from datetime import datetime, timedelta

def create_test_data():
    # Get or create a test user
    user, created = User.objects.get_or_create(
        email='test@example.com',
        defaults={
            'username': 'testuser',
            'first_name': 'Test',
            'last_name': 'User'
        }
    )
    if created:
        user.set_password('testpass123')
        user.save()
        print(f"Created test user: {user.email}")
    
    # Create a test event
    event, created = Event.objects.get_or_create(
        title='Test Math Class',
        defaults={
            'description': 'Sample math class for testing',
            'starts_at': datetime.now() + timedelta(days=1),
            'ends_at': datetime.now() + timedelta(days=1, hours=1),
            'location_name': 'Room 101'
        }
    )
    if created:
        print(f"Created test event: {event.title}")
    
    # Add event to user's calendar
    calendar_entry, created = UserCalendarEvent.objects.get_or_create(
        user=user,
        event=event,
        defaults={
            'custom_title': 'My Math Class',
            'notes': 'Don\'t forget calculator!'
        }
    )
    if created:
        print(f"Added event to {user.email}'s calendar")
    
    print(f"\nTest user credentials:")
    print(f"Email: {user.email}")
    print(f"Password: testpass123")
    print(f"User ID: {user.id}")

if __name__ == '__main__':
    create_test_data()