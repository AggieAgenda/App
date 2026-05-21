# Aggie Agenda: Course-to-Calendar Sync & Google Export Workflow

## Overview
This document outlines the complete workflow for:
1. Creating courses in the Courses app
2. Automatically syncing course meeting times to the Calendar app
3. Exporting the calendar to Google Calendar

The workflow is broken into **short, achievable chunks** with AI prompts for each step.

---

## Architecture Overview

### Current State
- **Courses App**: Stores user courses with `meetingTimes`, `location`, `professor`, etc.
- **Calendars App**: Has `CalendarItem` (one-off events), `CalendarRule` (recurring events)
- **Events App**: Stores global campus events
- **Frontend**: Calendar.jsx handles week/month views, event creation, and ICS import

### Desired State
```
User creates/updates Course 
  ↓
Backend syncs course meeting times to CalendarRule (on save)
  ↓
Frontend calls GET /calendars to fetch all calendar items + expanded rules
  ↓
Calendar view displays course meetings + user events
  ↓
User clicks "Export to Google Calendar"
  ↓
Backend generates OAuth link or JWT payload
  ↓
Frontend handles OAuth flow, syncs calendar items to Google Calendar
```

---

## Step-by-Step Implementation Plan

### PHASE 1: Course Model Improvements
**Goal**: Prepare the Course model to properly sync with Calendar

#### Step 1.1: Enhance Course Model
**Chunk**: Update the Course model to support calendar sync

**Current Issues**:
- `meetingTimes` is a CharField (e.g., "MWF 10:00-11:00") - needs parsing
- No FK to CalendarRule - no direct link
- Missing recurring schedule data

**Changes to Make**:
```python
# courses/models.py

class Course(models.Model):
    # ... existing fields ...
    
    # NEW: Better structure for meeting times
    meeting_days = models.JSONField(
        default=list,  
        help_text='e.g., ["MO", "WE", "FR"]'
    )
    meeting_start_time = models.TimeField(null=True, blank=True)
    meeting_end_time = models.TimeField(null=True, blank=True)
    
    # NEW: Link to CalendarRule for easy sync
    calendar_rule = models.OneToOneField(
        'calendars.CalendarRule',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='course'
    )
    
    # NEW: Track if calendar sync is enabled
    sync_to_calendar = models.BooleanField(default=True)
    
    # Keep old field for backward compatibility
    meetingTimes = models.CharField(max_length=32, blank=True, default="")
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Trigger calendar sync (see Step 1.2)
        if self.sync_to_calendar:
            self.sync_to_calendar_rule()
    
    def sync_to_calendar_rule(self):
        """Create or update CalendarRule based on course meeting times"""
        # Implementation in Step 1.2
        pass
```

**JSON Schema Example**:
```json
{
  "id": "uuid-123",
  "name": "CSCE",
  "fullName": "CSCE 120",
  "professor": "Dr. Smith",
  "section": "701",
  "location": "Blocker 158",
  "meeting_days": ["MO", "WE", "FR"],
  "meeting_start_time": "10:00:00",
  "meeting_end_time": "11:00:00",
  "exam_date": "2026-05-15",
  "credit_hours": 3,
  "sync_to_calendar": true,
  "color": "#500000"
}
```

**AI Prompt**:
> Update courses/models.py to add meeting_days, meeting_start_time, meeting_end_time fields, and a OneToOne FK to CalendarRule. Also add a sync_to_calendar_rule() method stub that will be implemented in Step 1.2. Ensure backward compatibility by keeping meetingTimes. Add a save() hook to trigger sync.

---

#### Step 1.2: Create sync_to_calendar_rule() Method
**Chunk**: Implement automatic calendar sync when a course is saved

**Logic**:
1. Extract meeting_days, meeting_start_time, meeting_end_time from Course
2. Create or update a CalendarRule with the same data
3. Set source_type='course' and source_id=course.id

**Implementation**:
```python
# courses/models.py

from calendars.models import CalendarRule
from datetime import date

def sync_to_calendar_rule(self):
    """
    Sync course meeting times to CalendarRule.
    Creates a new rule if it doesn't exist, updates if it does.
    """
    if not self.meeting_days or not self.meeting_start_time:
        return  # Can't create rule without meeting times
    
    # Determine start/end dates (entire semester)
    today = date.today()
    semester_start = date(today.year, 1, 15)  # Jan 15 (adjust per semester)
    semester_end = date(today.year, 5, 15)    # May 15 (adjust per semester)
    
    rule_data = {
        'user': self.user,
        'title': self.fullName or self.name,
        'location_name': self.location,
        'days': self.meeting_days,
        'start_time': self.meeting_start_time,
        'end_time': self.meeting_end_time,
        'start_date': semester_start,
        'end_date': semester_end,
        'source_type': 'course',
        'source_id': self.id,
    }
    
    # Create or update
    if self.calendar_rule:
        for key, value in rule_data.items():
            setattr(self.calendar_rule, key, value)
        self.calendar_rule.save()
    else:
        rule = CalendarRule.objects.create(**rule_data)
        self.calendar_rule = rule
        self.save(update_fields=['calendar_rule'])
```

**Testing**:
```python
# courses/tests.py

def test_sync_to_calendar_rule():
    """When a course is saved with meeting times, a CalendarRule is created"""
    user = User.objects.create_user('test@tamu.edu')
    course = Course.objects.create(
        user=user,
        fullName='CSCE 120',
        location='Blocker 158',
        meeting_days=['MO', 'WE', 'FR'],
        meeting_start_time=time(10, 0),
        meeting_end_time=time(11, 0),
    )
    
    assert course.calendar_rule is not None
    assert course.calendar_rule.title == 'CSCE 120'
    assert course.calendar_rule.source_type == 'course'
```

**AI Prompt**:
> Implement the sync_to_calendar_rule() method in Course model that:
> 1. Takes meeting_days, meeting_start_time, meeting_end_time
> 2. Creates a CalendarRule with title=fullName, location_name=location
> 3. Sets source_type='course' and source_id=course.id
> 4. Handles create-or-update logic using self.calendar_rule FK
> 5. Use semester dates (Jan 15 - May 15) as start/end_date
> Include a unit test that verifies a CalendarRule is created when a course is saved.

---

### PHASE 2: Backend API Enhancements

#### Step 2.1: Update Courses ViewSet
**Chunk**: Fix the courses endpoints to properly handle create/update with sync

**Current Issues**:
- All endpoints mapped to same view
- No proper POST/PUT/DELETE handlers
- No validation

**Implementation**:
```python
# courses/views.py

from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Course
from .serializers import CourseSerializer

# Option A: Using ViewSet (recommended for REST)
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Course.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        # Automatically set user
        serializer.save(user=self.request.user)
    
    # This triggers sync_to_calendar_rule() via Course.save()

# Option B: Keep function-based views but improve them
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def course_list(request):
    if request.method == 'GET':
        courses = Course.objects.filter(user=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response({
            'success': True,
            'courses': serializer.data,
            'total': courses.count()
        })
    
    elif request.method == 'POST':
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def course_detail(request, course_id):
    course = get_object_or_404(Course, id=course_id, user=request.user)
    
    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Triggers sync
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        # Also delete associated CalendarRule
        if course.calendar_rule:
            course.calendar_rule.delete()
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

**Serializer**:
```python
# courses/serializers.py

from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'name', 'fullName', 'professor', 'section', 'location',
            'meeting_days', 'meeting_start_time', 'meeting_end_time',
            'exam_date', 'credit_hours', 'color', 'sync_to_calendar',
            'meetingTimes'
        ]
```

**Updated URLs**:
```python
# courses/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.course_list, name='course_list'),
    path('<uuid:course_id>/', views.course_detail, name='course_detail'),
]
```

**API Response Examples**:

**GET /api/courses/**
```json
{
  "success": true,
  "courses": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullName": "CSCE 120",
      "professor": "Dr. Smith",
      "section": "701",
      "location": "Blocker 158",
      "meeting_days": ["MO", "WE", "FR"],
      "meeting_start_time": "10:00:00",
      "meeting_end_time": "11:00:00",
      "exam_date": "2026-05-15",
      "credit_hours": 3,
      "sync_to_calendar": true,
      "color": "#500000"
    }
  ],
  "total": 1
}
```

**POST /api/courses/**
```json
{
  "fullName": "CSCE 120",
  "professor": "Dr. Smith",
  "section": "701",
  "location": "Blocker 158",
  "meeting_days": ["MO", "WE", "FR"],
  "meeting_start_time": "10:00:00",
  "meeting_end_time": "11:00:00",
  "color": "#500000",
  "sync_to_calendar": true
}
```

**Response** (status 201):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "fullName": "CSCE 120",
  "professor": "Dr. Smith",
  "section": "701",
  "location": "Blocker 158",
  "meeting_days": ["MO", "WE", "FR"],
  "meeting_start_time": "10:00:00",
  "meeting_end_time": "11:00:00",
  "exam_date": null,
  "credit_hours": 3,
  "sync_to_calendar": true,
  "color": "#500000"
}
```

**AI Prompt**:
> Create a CourseSerializer that handles all Course fields including meeting_days, meeting_start_time, meeting_end_time. Then update courses/views.py to implement:
> 1. GET /api/courses/ - List all user courses (with count)
> 2. POST /api/courses/ - Create course (auto-sync to calendar via Course.save())
> 3. GET /api/courses/<id>/ - Get single course
> 4. PUT /api/courses/<id>/ - Update course (auto-sync)
> 5. DELETE /api/courses/<id>/ - Delete course (also delete calendar rule)
> Use a consistent response structure with "success" flag. Include proper error handling and status codes.

---

#### Step 2.2: Enhance Calendar Sync Endpoint
**Chunk**: Create a dedicated endpoint that returns both calendar items AND expanded course rules

**Current Issue**:
- GET /calendars returns only manual events from UserCalendarEvents
- Doesn't expand CalendarRules into actual occurrences
- Frontend has to handle expansion, which is inefficient

**New Endpoint**:
```python
# calendars/views.py

from datetime import datetime, timedelta
from .models import CalendarItem, CalendarRule
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_calendar_sync(request):
    """
    Get calendar for a date range, with both manual items and expanded course rules.
    
    Query params:
    - start_date: ISO format (2026-05-15)
    - end_date: ISO format (2026-05-22)
    """
    start_date_str = request.query_params.get('start_date')
    end_date_str = request.query_params.get('end_date')
    
    if not start_date_str or not end_date_str:
        return Response({
            'success': False,
            'error': 'start_date and end_date query params required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    start_date = datetime.fromisoformat(start_date_str).date()
    end_date = datetime.fromisoformat(end_date_str).date()
    
    user = request.user
    calendar_items = []
    
    # 1. Get manual calendar items
    manual_items = CalendarItem.objects.filter(
        user=user,
        starts_at__date__gte=start_date,
        starts_at__date__lte=end_date
    )
    
    for item in manual_items:
        calendar_items.append({
            'id': str(item.id),
            'title': item.title,
            'description': item.description,
            'location_name': item.location_name,
            'starts_at': item.starts_at.isoformat(),
            'ends_at': item.ends_at.isoformat() if item.ends_at else None,
            'source_type': item.source_type,
            'source_id': str(item.source_id) if item.source_id else None,
            'type': 'item'
        })
    
    # 2. Get and expand CalendarRules (courses)
    calendar_rules = CalendarRule.objects.filter(
        user=user,
        start_date__lte=end_date,
        end_date__gte=start_date
    )
    
    for rule in calendar_rules:
        # Expand rule into individual occurrences
        current = max(rule.start_date, start_date)
        while current <= min(rule.end_date, end_date):
            # Check if current day matches rule days
            day_name = current.strftime('%A')
            day_abbr = current.strftime('%a').upper()
            
            if day_abbr in rule.days:
                # Create occurrence
                start_dt = datetime.combine(current, rule.start_time)
                end_dt = datetime.combine(current, rule.end_time)
                
                calendar_items.append({
                    'id': f"{rule.id}-{current}",  # Unique per occurrence
                    'rule_id': str(rule.id),
                    'title': rule.title,
                    'location_name': rule.location_name,
                    'starts_at': start_dt.isoformat(),
                    'ends_at': end_dt.isoformat(),
                    'source_type': rule.source_type,
                    'source_id': str(rule.source_id) if rule.source_id else None,
                    'type': 'rule_occurrence'
                })
            
            current += timedelta(days=1)
    
    # Sort by start time
    calendar_items.sort(key=lambda x: x['starts_at'])
    
    return Response({
        'success': True,
        'calendar': calendar_items,
        'total_items': len(calendar_items),
        'date_range': {
            'start': start_date.isoformat(),
            'end': end_date.isoformat()
        }
    })
```

**API Response Example**:

**GET /api/calendars/sync?start_date=2026-05-15&end_date=2026-05-22**
```json
{
  "success": true,
  "calendar": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "CSCE 120",
      "location_name": "Blocker 158",
      "starts_at": "2026-05-15T10:00:00",
      "ends_at": "2026-05-15T11:00:00",
      "source_type": "course",
      "source_id": "550e8400-e29b-41d4-a716-446655440001",
      "type": "rule_occurrence"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "title": "Project Deadline",
      "description": "Submit final project",
      "location_name": "",
      "starts_at": "2026-05-16T23:59:00",
      "ends_at": null,
      "source_type": "manual",
      "type": "item"
    }
  ],
  "total_items": 2,
  "date_range": {
    "start": "2026-05-15",
    "end": "2026-05-22"
  }
}
```

**AI Prompt**:
> Create a new endpoint GET /api/calendars/sync in calendars/views.py that:
> 1. Takes start_date and end_date query params (ISO format)
> 2. Fetches all CalendarItems in that date range
> 3. Fetches all CalendarRules for user
> 4. Expands each rule into occurrences based on meeting_days (MO, WE, FR, etc)
> 5. Combines both into single list, sorted by start time
> 6. Returns with metadata (total_items, date_range)
> For each rule occurrence, generate a unique ID: "{rule_id}-{date}"
> Include source_type and source_id so frontend knows what to do with each item.

---

### PHASE 3: Frontend Integration

#### Step 3.1: Update Calendar.jsx to Use New Sync Endpoint
**Chunk**: Refactor Calendar.jsx to call new /api/calendars/sync endpoint

**Current Implementation Issues**:
- Fetches from /api/calendars (manual items only)
- Client-side expansion of recurring events
- No course data integration

**Updated fetchCalendarData**:
```javascript
// Frontend/src/pages/DashboardPages/Calendar.jsx

const fetchCalendarData = async () => {
  try {
    const weekStart = StartOfWeek(currentDate);
    const weekEnd = AddDays(weekStart, 6);
    
    const startISO = weekStart.toISOString().split('T')[0];
    const endISO = weekEnd.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_URL}/calendars/sync?start_date=${startISO}&end_date=${endISO}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch calendar');
    
    const data = await response.json();
    
    // Convert API response to event object
    // Backend returns flat list; reorganize for week/month views
    const eventsObj = {};
    
    data.calendar.forEach((item) => {
      eventsObj[item.id] = {
        id: item.id,
        title: item.title,
        description: item.description || '',
        location: item.location_name || '',
        start: new Date(item.starts_at),
        end: item.ends_at ? new Date(item.ends_at) : null,
        source: item.source_type,
        sourceId: item.source_id,
        type: item.type,  // 'item' or 'rule_occurrence'
        ruleId: item.rule_id // for rule occurrences
      };
    });
    
    setEvents(eventsObj);
    setLoading(false);
    
  } catch (error) {
    console.error('Error fetching calendar:', error);
    setError(error.message);
    setLoading(false);
  }
};
```

**Important**: No need for ExpandRecurringEvents() anymore - backend handles it!

**Remove old code**:
```javascript
// DELETE this function - backend now does expansion
function ExpandRecurringEvents(eventsObj, startDate, endDate) {
  // REMOVE - handled by backend
}

// In WeekView and MonthView, remove the expansion:
// OLD:
// const expandedEvents = ExpandRecurringEvents(events, weekStart, weekEnd);
// NEW: Just use events directly
```

**Weekly sync**:
```javascript
useEffect(() => {
  fetchCalendarData();
}, [currentDate]); // Refetch when week/month changes
```

**AI Prompt**:
> Update Calendar.jsx's fetchCalendarData() to:
> 1. Call GET /api/calendars/sync with start_date and end_date query params
> 2. Transform response into events object (id -> event data)
> 3. Set type field for each event ('item' or 'rule_occurrence')
> 4. Remove the ExpandRecurringEvents() function entirely
> 5. Update WeekView/MonthView to not call expand (just use events directly)
> 6. Trigger refetch when currentDate changes
> Handle errors gracefully and show loading state.

---

#### Step 3.2: Add Visual Differentiation for Course Events
**Chunk**: Show course meetings differently from manual events (optional but nice)

**In WeekView/MonthView, add styling**:
```javascript
// Calendar.jsx

function getEventStyle(event) {
  // Rule occurrences (courses) get a different color
  if (event.type === 'rule_occurrence') {
    return {
      backgroundColor: '#500000',  // Maroon for courses
      borderLeft: '4px solid #3d0000',
      opacity: 0.9
    };
  }
  // Manual items get default style
  return {
    backgroundColor: '#f3f4f6',
    borderLeft: '4px solid #500000'
  };
}

// In rendering code:
<div style={getEventStyle(event)} className="...">
  {event.title}
</div>
```

---

### PHASE 4: Google Calendar Export

#### Step 4.1: Setup Google OAuth (Backend)
**Chunk**: Create OAuth flow for Google Calendar sync

**Backend Setup**:
```python
# Backend/settings.py additions

GOOGLE_OAUTH_SETTINGS = {
    'CLIENT_ID': env('GOOGLE_CLIENT_ID'),
    'CLIENT_SECRET': env('GOOGLE_CLIENT_SECRET'),
    'REDIRECT_URI': env('GOOGLE_REDIRECT_URI', default='http://localhost:5173/auth/google/callback'),
    'SCOPES': ['https://www.googleapis.com/auth/calendar']
}
```

**Create GoogleCalendarToken model**:
```python
# calendars/models.py

class GoogleCalendarToken(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    access_token = models.TextField()
    refresh_token = models.TextField(null=True, blank=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def is_expired(self):
        return timezone.now() >= self.expires_at
```

**Create OAuth callback endpoint**:
```python
# calendars/views.py

from django.conf import settings
import requests
from django.utils import timezone
from datetime import timedelta

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_google_auth(request):
    """
    Return Google OAuth URL for user to authorize
    """
    auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={settings.GOOGLE_OAUTH_SETTINGS['CLIENT_ID']}&"
        f"redirect_uri={settings.GOOGLE_OAUTH_SETTINGS['REDIRECT_URI']}&"
        f"response_type=code&"
        f"scope={'%20'.join(settings.GOOGLE_OAUTH_SETTINGS['SCOPES'])}&"
        f"state={str(request.user.id)}"  # Pass user ID for security
    )
    
    return Response({
        'success': True,
        'auth_url': auth_url
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def google_auth_callback(request):
    """
    Handle OAuth callback, exchange code for tokens
    """
    code = request.data.get('code')
    
    if not code:
        return Response({
            'success': False,
            'error': 'No authorization code'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    # Exchange code for tokens
    token_response = requests.post(
        'https://oauth2.googleapis.com/token',
        data={
            'code': code,
            'client_id': settings.GOOGLE_OAUTH_SETTINGS['CLIENT_ID'],
            'client_secret': settings.GOOGLE_OAUTH_SETTINGS['CLIENT_SECRET'],
            'redirect_uri': settings.GOOGLE_OAUTH_SETTINGS['REDIRECT_URI'],
            'grant_type': 'authorization_code'
        }
    )
    
    if not token_response.ok:
        return Response({
            'success': False,
            'error': 'Token exchange failed'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    tokens = token_response.json()
    
    # Store tokens
    GoogleCalendarToken.objects.update_or_create(
        user=request.user,
        defaults={
            'access_token': tokens['access_token'],
            'refresh_token': tokens.get('refresh_token'),
            'expires_at': timezone.now() + timedelta(seconds=tokens['expires_in'])
        }
    )
    
    return Response({
        'success': True,
        'message': 'Google Calendar connected!'
    })
```

**Updated URLs**:
```python
# calendars/urls.py

urlpatterns = [
    # ... existing ...
    path('google/auth/init', views.initiate_google_auth, name='initiate_google_auth'),
    path('google/auth/callback', views.google_auth_callback, name='google_auth_callback'),
    path('sync', views.get_calendar_sync, name='get_calendar_sync'),
]
```

**AI Prompt**:
> Create a GoogleCalendarToken model to store access_token, refresh_token, and expires_at.
> Implement two endpoints:
> 1. POST /api/calendars/google/auth/init - Returns Google OAuth URL
> 2. POST /api/calendars/google/auth/callback - Handles code exchange, stores tokens
> Use the GOOGLE_CLIENT_ID, CLIENT_SECRET from settings
> Include security (use user.id as state parameter)
> Return proper error messages for debugging.

---

#### Step 4.2: Sync Calendar to Google Calendar
**Chunk**: Create endpoint that pushes calendar items to Google Calendar

**Endpoint**:
```python
# calendars/views.py

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sync_calendar_to_google(request):
    """
    Sync all user calendar items to Google Calendar
    """
    user = request.user
    
    # Check if user has Google auth token
    try:
        token_record = GoogleCalendarToken.objects.get(user=user)
    except GoogleCalendarToken.DoesNotExist:
        return Response({
            'success': False,
            'error': 'Not authorized with Google Calendar. Please authenticate first.'
        }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Refresh token if needed
    if token_record.is_expired():
        refreshed = refresh_google_token(token_record)
        if not refreshed:
            return Response({
                'success': False,
                'error': 'Failed to refresh Google token'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    # Build Google Calendar service
    credentials = Credentials(token=token_record.access_token)
    service = build('calendar', 'v3', credentials=credentials)
    
    # Get calendar items to sync
    start_date_str = request.data.get('start_date')
    end_date_str = request.data.get('end_date')
    
    if not start_date_str or not end_date_str:
        return Response({
            'success': False,
            'error': 'start_date and end_date required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    start_date = datetime.fromisoformat(start_date_str).date()
    end_date = datetime.fromisoformat(end_date_str).date()
    
    # Fetch calendar items (same as sync endpoint)
    calendar_items = []
    
    # Get manual items
    manual_items = CalendarItem.objects.filter(
        user=user,
        starts_at__date__gte=start_date,
        starts_at__date__lte=end_date
    )
    calendar_items.extend(manual_items)
    
    # Get and expand rules
    # ... (same expansion logic as Step 2.2)
    
    # Push to Google Calendar
    synced_count = 0
    errors = []
    
    for item in calendar_items:
        try:
            event = {
                'summary': item.title,
                'description': item.description,
                'location': item.location_name,
                'start': {
                    'dateTime': item.starts_at.isoformat(),
                    'timeZone': 'America/Chicago'
                },
                'end': {
                    'dateTime': (item.ends_at or item.starts_at + timedelta(hours=1)).isoformat(),
                    'timeZone': 'America/Chicago'
                }
            }
            
            # Check if event already exists (by source_id)
            # For now, just create new
            service.events().insert(calendarId='primary', body=event).execute()
            synced_count += 1
            
        except Exception as e:
            errors.append({
                'item_id': str(item.id) if hasattr(item, 'id') else 'unknown',
                'error': str(e)
            })
    
    return Response({
        'success': True,
        'synced_count': synced_count,
        'errors': errors,
        'message': f'Synced {synced_count} events to Google Calendar'
    })

def refresh_google_token(token_record):
    """Refresh expired Google OAuth token"""
    try:
        token_response = requests.post(
            'https://oauth2.googleapis.com/token',
            data={
                'client_id': settings.GOOGLE_OAUTH_SETTINGS['CLIENT_ID'],
                'client_secret': settings.GOOGLE_OAUTH_SETTINGS['CLIENT_SECRET'],
                'refresh_token': token_record.refresh_token,
                'grant_type': 'refresh_token'
            }
        )
        
        if token_response.ok:
            tokens = token_response.json()
            token_record.access_token = tokens['access_token']
            token_record.expires_at = timezone.now() + timedelta(seconds=tokens['expires_in'])
            token_record.save()
            return True
        return False
    except Exception as e:
        print(f"Token refresh failed: {e}")
        return False
```

**API Response**:
```json
{
  "success": true,
  "synced_count": 5,
  "errors": [],
  "message": "Synced 5 events to Google Calendar"
}
```

**AI Prompt**:
> Create a POST /api/calendars/sync-to-google endpoint that:
> 1. Checks if user has GoogleCalendarToken
> 2. Refreshes token if expired
> 3. Fetches calendar items for given date range
> 4. Uses Google Calendar API to insert events
> 5. Returns synced_count and any errors
> Also create a helper function refresh_google_token() that refreshes expired tokens
> Use America/Chicago timezone for all events
> Include proper error handling for missing auth or API failures.

---

#### Step 4.3: Frontend Google Export Button
**Chunk**: Add "Export to Google Calendar" button to Calendar.jsx

**Current Implementation** (in Calendar.jsx):
```javascript
function handleExportToGoogle() {
  console.log("Export to Google Calendar clicked");
}
```

**Updated Implementation**:
```javascript
// Calendar.jsx

const [exportLoading, setExportLoading] = useState(false);
const [googleConnected, setGoogleConnected] = useState(false);

useEffect(() => {
  // Check if user is connected to Google
  checkGoogleAuth();
}, []);

const checkGoogleAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/calendars/google/status`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setGoogleConnected(data.connected);
  } catch (error) {
    console.error('Error checking Google auth:', error);
  }
};

const initiateGoogleAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/calendars/google/auth/init`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    
    if (data.success) {
      // Redirect to Google OAuth
      window.location.href = data.auth_url;
    }
  } catch (error) {
    alert('Error initiating Google auth: ' + error.message);
  }
};

const handleExportToGoogle = async () => {
  if (!googleConnected) {
    initiateGoogleAuth();
    return;
  }
  
  setExportLoading(true);
  try {
    const weekStart = StartOfWeek(currentDate);
    const weekEnd = AddDays(weekStart, 6);
    
    const startISO = weekStart.toISOString().split('T')[0];
    const endISO = weekEnd.toISOString().split('T')[0];
    
    const response = await fetch(`${API_URL}/calendars/sync-to-google`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        start_date: startISO,
        end_date: endISO
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`✓ Synced ${data.synced_count} events to Google Calendar!`);
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    alert('Export failed: ' + error.message);
  } finally {
    setExportLoading(false);
  }
};

// In CalendarHeader:
<button
  onClick={handleExportToGoogle}
  disabled={exportLoading}
  className="px-4 py-2 text-white rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50"
  style={{ backgroundColor: MAROON }}
>
  {exportLoading ? 'Exporting...' : (googleConnected ? 'Export to Google' : 'Connect Google')}
</button>
```

**Handle OAuth Callback**:
```javascript
// After user authorizes, Google redirects to:
// http://localhost:5173/auth/google/callback?code=<auth_code>

// Create a new page: Frontend/src/pages/GoogleAuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function GoogleAuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (!code) {
      navigate('/dashboard/calendar?error=no_code');
      return;
    }
    
    // Exchange code on backend
    const exchangeCode = async () => {
      try {
        const response = await fetch(`${API_URL}/calendars/google/auth/callback`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ code })
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Redirect to calendar
          navigate('/dashboard/calendar?google_connected=true');
        } else {
          navigate('/dashboard/calendar?error=' + data.error);
        }
      } catch (error) {
        navigate('/dashboard/calendar?error=' + error.message);
      }
    };
    
    exchangeCode();
  }, [searchParams, navigate]);
  
  return <div>Connecting to Google Calendar...</div>;
}
```

**AI Prompt**:
> Update Calendar.jsx to:
> 1. Add "Export to Google Calendar" button with loading state
> 2. Implement checkGoogleAuth() to verify Google connection
> 3. If not connected, show "Connect Google" and call initiateGoogleAuth()
> 4. If connected, call sync-to-google endpoint with date range
> 5. Show success message with synced count
> Also create GoogleAuthCallback.jsx page that handles the OAuth redirect, exchanges the code, and redirects back to calendar with status.

---

### PHASE 5: Testing

#### Step 5.1: Backend Model Tests
**Chunk**: Test Course-to-Calendar sync logic

```python
# courses/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import time, date, datetime
from .models import Course
from calendars.models import CalendarRule

User = get_user_model()

class CourseCalendarSyncTests(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user('student@tamu.edu', password='test123')
    
    def test_course_creation_creates_calendar_rule(self):
        """When Course is created with meeting times, CalendarRule is auto-created"""
        course = Course.objects.create(
            user=self.user,
            fullName='CSCE 120',
            location='Blocker 158',
            meeting_days=['MO', 'WE', 'FR'],
            meeting_start_time=time(10, 0),
            meeting_end_time=time(11, 0),
            sync_to_calendar=True
        )
        
        assert course.calendar_rule is not None
        assert course.calendar_rule.title == 'CSCE 120'
        assert course.calendar_rule.location_name == 'Blocker 158'
        assert course.calendar_rule.source_type == 'course'
        assert course.calendar_rule.source_id == course.id
    
    def test_course_update_updates_calendar_rule(self):
        """When Course is updated, CalendarRule is updated too"""
        course = Course.objects.create(
            user=self.user,
            fullName='CSCE 120',
            location='Blocker 158',
            meeting_days=['MO', 'WE', 'FR'],
            meeting_start_time=time(10, 0),
            meeting_end_time=time(11, 0),
            sync_to_calendar=True
        )
        
        # Update location
        course.location = 'Blocker 201'
        course.save()
        
        course.refresh_from_db()
        assert course.calendar_rule.location_name == 'Blocker 201'
    
    def test_course_no_sync_skips_calendar(self):
        """When sync_to_calendar=False, no rule is created"""
        course = Course.objects.create(
            user=self.user,
            fullName='CSCE 120',
            sync_to_calendar=False
        )
        
        assert course.calendar_rule is None
    
    def test_course_deletion_deletes_calendar_rule(self):
        """When Course is deleted, CalendarRule is deleted"""
        course = Course.objects.create(
            user=self.user,
            fullName='CSCE 120',
            location='Blocker 158',
            meeting_days=['MO', 'WE', 'FR'],
            meeting_start_time=time(10, 0),
            meeting_end_time=time(11, 0),
            sync_to_calendar=True
        )
        
        rule_id = course.calendar_rule.id
        course.delete()
        
        assert not CalendarRule.objects.filter(id=rule_id).exists()

class CourseAPITests(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user('student@tamu.edu', password='test123')
        self.client.force_authenticate(user=self.user)
    
    def test_create_course_via_api(self):
        """POST /api/courses/ creates course and syncs to calendar"""
        response = self.client.post('/api/courses/', {
            'fullName': 'CSCE 120',
            'professor': 'Dr. Smith',
            'location': 'Blocker 158',
            'meeting_days': ['MO', 'WE', 'FR'],
            'meeting_start_time': '10:00:00',
            'meeting_end_time': '11:00:00'
        }, format='json')
        
        assert response.status_code == 201
        assert Course.objects.count() == 1
        assert Course.objects.first().calendar_rule is not None
    
    def test_get_courses_returns_all_user_courses(self):
        """GET /api/courses/ returns only user's courses"""
        # Create course
        Course.objects.create(
            user=self.user,
            fullName='CSCE 120'
        )
        
        response = self.client.get('/api/courses/')
        
        assert response.status_code == 200
        assert response.json()['total'] == 1
```

**AI Prompt**:
> Create comprehensive unit tests for courses/models.py and courses/views.py that cover:
> 1. Course creation auto-syncs to CalendarRule
> 2. Course update updates CalendarRule
> 3. Course deletion deletes CalendarRule
> 4. sync_to_calendar=False skips sync
> 5. API endpoints return correct status codes and data format
> 6. Only user's courses are returned (no leaking other users' data)
> Use Django TestCase and self.client for API testing. Include setUp and tearDown.

---

#### Step 5.2: Calendar Sync Endpoint Tests
**Chunk**: Test the calendar sync expansion logic

```python
# calendars/tests.py

from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import date, time, datetime, timedelta
from .models import CalendarRule, CalendarItem
from courses.models import Course

User = get_user_model()

class CalendarSyncTests(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user('student@tamu.edu', password='test123')
        self.client.force_authenticate(user=self.user)
    
    def test_calendar_sync_expands_recurring_events(self):
        """GET /api/calendars/sync expands CalendarRules into occurrences"""
        # Create a course that meets MWF
        rule = CalendarRule.objects.create(
            user=self.user,
            title='CSCE 120',
            days=['MO', 'WE', 'FR'],
            start_time=time(10, 0),
            end_time=time(11, 0),
            start_date=date(2026, 5, 15),
            end_date=date(2026, 5, 22),
            source_type='course'
        )
        
        # Request week of May 15-22 (contains 3 occurrences)
        response = self.client.get('/api/calendars/sync', {
            'start_date': '2026-05-15',
            'end_date': '2026-05-22'
        })
        
        assert response.status_code == 200
        data = response.json()
        
        # Should have 3 occurrences (MO 18, WE 20, FR 22)
        # Actually May 15 is Friday, so: FR 15, MO 18, WE 20
        assert len(data['calendar']) == 3
        
        # Check that all are marked as rule_occurrence
        for item in data['calendar']:
            assert item['type'] == 'rule_occurrence'
            assert item['title'] == 'CSCE 120'
    
    def test_calendar_sync_includes_manual_items(self):
        """GET /api/calendars/sync includes both rules and manual items"""
        # Create rule (course)
        rule = CalendarRule.objects.create(
            user=self.user,
            title='CSCE 120',
            days=['MO'],
            start_time=time(10, 0),
            end_time=time(11, 0),
            start_date=date(2026, 5, 15),
            end_date=date(2026, 5, 22),
            source_type='course'
        )
        
        # Create manual item
        item = CalendarItem.objects.create(
            user=self.user,
            title='Project Deadline',
            starts_at=datetime(2026, 5, 15, 23, 59),
            source_type='manual'
        )
        
        response = self.client.get('/api/calendars/sync', {
            'start_date': '2026-05-15',
            'end_date': '2026-05-22'
        })
        
        data = response.json()
        
        # Should have 1 rule occurrence + 1 manual item = 2 total
        assert len(data['calendar']) == 2
        
        types = [item['type'] for item in data['calendar']]
        assert 'rule_occurrence' in types
        assert 'item' in types
    
    def test_calendar_sync_respects_date_range(self):
        """Only items within date range are returned"""
        rule = CalendarRule.objects.create(
            user=self.user,
            title='CSCE 120',
            days=['MO'],
            start_time=time(10, 0),
            end_time=time(11, 0),
            start_date=date(2026, 1, 1),
            end_date=date(2026, 12, 31),
            source_type='course'
        )
        
        # Request only May 15
        response = self.client.get('/api/calendars/sync', {
            'start_date': '2026-05-15',
            'end_date': '2026-05-15'
        })
        
        data = response.json()
        
        # May 15, 2026 is Friday, not Monday, so 0 occurrences
        assert len(data['calendar']) == 0
```

**AI Prompt**:
> Create unit tests for the GET /api/calendars/sync endpoint:
> 1. Test that CalendarRules are expanded into occurrences for the date range
> 2. Test that manual CalendarItems are included in response
> 3. Test date range filtering (only items in range returned)
> 4. Test sorting by start time
> 5. Test that rule_id and type fields are present
> Use TestCase and self.client for API testing. Include fixtures for courses/rules.

---

#### Step 5.3: View Testing
**Chunk**: Integration tests for full workflow

```python
# tests/test_workflow.py

from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from datetime import date, time
from courses.models import Course
from calendars.models import CalendarRule

User = get_user_model()

class CourseToCalendarWorkflowTests(TestCase):
    """Integration tests for full course→calendar→google workflow"""
    
    def setUp(self):
        self.user = User.objects.create_user('student@tamu.edu', password='test123')
        self.client = Client()
        self.client.force_login(self.user)
    
    def test_full_workflow_create_course_to_export(self):
        """
        Complete workflow:
        1. User creates course
        2. Course syncs to calendar
        3. User can fetch calendar with course times
        4. User can export to Google (if connected)
        """
        # Step 1: Create course
        response = self.client.post('/api/courses/', {
            'fullName': 'CSCE 120',
            'professor': 'Dr. Smith',
            'location': 'Blocker 158',
            'meeting_days': ['MO', 'WE', 'FR'],
            'meeting_start_time': '10:00:00',
            'meeting_end_time': '11:00:00'
        }, format='json')
        
        assert response.status_code == 201
        course = Course.objects.first()
        
        # Step 2: Verify sync
        assert course.calendar_rule is not None
        assert course.calendar_rule.source_type == 'course'
        
        # Step 3: Fetch calendar
        response = self.client.get('/api/calendars/sync', {
            'start_date': '2026-05-15',
            'end_date': '2026-05-22'
        })
        
        assert response.status_code == 200
        calendar = response.json()['calendar']
        
        # Should have course occurrences
        course_items = [item for item in calendar if item['source_type'] == 'course']
        assert len(course_items) > 0
```

---

### PHASE 6: Documentation & Examples

#### Step 6.1: API Documentation (for frontend devs)
**Create**: `Backend/API_DOCS.md`

```markdown
# Aggie Agenda API Documentation

## Courses Endpoints

### GET /api/courses/
Get all user courses

**Response**:
```json
{
  "success": true,
  "courses": [...],
  "total": 3
}
```

### POST /api/courses/
Create a new course (auto-syncs to calendar)

**Request**:
```json
{
  "fullName": "CSCE 120",
  "meeting_days": ["MO", "WE", "FR"],
  "meeting_start_time": "10:00:00",
  "meeting_end_time": "11:00:00"
}
```

## Calendar Endpoints

### GET /api/calendars/sync
Get calendar items + expanded course rules

**Query Params**:
- `start_date`: ISO date (2026-05-15)
- `end_date`: ISO date (2026-05-22)

**Response**: Array of calendar items with type='item' or type='rule_occurrence'

### POST /api/calendars/sync-to-google
Sync calendar to Google Calendar

**Request**:
```json
{
  "start_date": "2026-05-15",
  "end_date": "2026-05-22"
}
```

**Response**:
```json
{
  "success": true,
  "synced_count": 5,
  "errors": []
}
```
```

---

## Summary: Implementation Order

### Week 1: Backend Foundation
- Step 1.1: Enhance Course Model ✓
- Step 1.2: Implement sync_to_calendar_rule() ✓
- Step 2.1: Update Courses API endpoints ✓

### Week 2: Calendar Sync
- Step 2.2: Create /api/calendars/sync endpoint ✓
- Step 3.1: Update Calendar.jsx to use new endpoint ✓

### Week 3: Google Integration
- Step 4.1: Setup Google OAuth ✓
- Step 4.2: Implement sync-to-google endpoint ✓
- Step 4.3: Add frontend export button ✓

### Week 4: Testing & Refinement
- Step 5.1: Model tests ✓
- Step 5.2: Endpoint tests ✓
- Step 5.3: Integration tests ✓

---

## Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Server-side rule expansion | Reduces client complexity, single source of truth |
| CalendarRule model separate from CalendarItem | Supports both recurring (rules) and one-off (items) events |
| Source tracking (source_type, source_id) | Frontend can differentiate between course/manual/event |
| Google OAuth with refresh tokens | Allows long-term sync without re-auth |
| JSON for meeting_days | Flexible, easy to query (["MO", "WE", "FR"]) |

---

## Error Handling Checklist

- [ ] Course creation fails if meeting_days invalid
- [ ] Calendar sync returns 400 if date params missing
- [ ] Google export fails gracefully if token expired
- [ ] Frontend shows loading states for all async operations
- [ ] All 500 errors logged to backend for debugging

---

## Future Enhancements

1. **Recurring rules with exceptions**: "No class on Nov 28"
2. **Syllabus parsing**: Auto-extract meeting times from PDF
3. **Conflict detection**: Alert if two courses overlap
4. **Two-way sync**: Changes in Google Calendar → sync back to Aggie Agenda
5. **Export to other calendars**: Outlook, Apple Calendar, etc.
```

