from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

import fitz
from .syllabusReader import readPDF, extract_dates
from datetime import datetime


# =============================================================================
# AUTHENTICATION
# =============================================================================

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


# =============================================================================
# SYLLABUS READER API
# =============================================================================

class PDFScraperView(APIView):
    """
    API endpoint for uploading and parsing syllabus PDFs.
    Extracts dates and course information from uploaded PDF files.
    """
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def post(self, request, *args, **kwargs):
        """
        Handle PDF upload and extraction.
        
        Expected request format:
        - file: PDF file (multipart/form-data)
        
        Returns:
        - dates: List of extracted dates with associated information
        - text_preview: First 500 chars of extracted text
        - success: Boolean indicating success
        """
        file = request.FILES.get('file')
        
        if not file:
            return Response(
                {'error': 'No file provided', 'success': False},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate file type
        if not file.name.endswith('.pdf'):
            return Response(
                {'error': 'File must be a PDF', 'success': False},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Extract text from PDF
            text = readPDF(file)
            
            if not text or len(text.strip()) == 0:
                return Response(
                    {'error': 'Could not extract text from PDF', 'success': False},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Extract dates from text
            dates = extract_dates(text)
            
            return Response({
                'success': True,
                'dates': dates,
                'text_preview': text[:500] if text else '',
                'total_dates_found': len(dates) if dates else 0
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {'error': f'Error processing PDF: {str(e)}', 'success': False},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def get(self, request, *args, **kwargs):
        """
        Return API information and usage instructions.
        """
        return Response({
            'message': 'Syllabus PDF Parser API',
            'usage': 'POST a PDF file with key "file" to extract dates',
            'supported_formats': ['PDF'],
            'methods': ['POST', 'GET']
        }, status=status.HTTP_200_OK)


# =============================================================================
# CALENDAR EVENTS API
# =============================================================================

class CalendarEventsView(APIView):
    """
    API endpoint for managing calendar events.
    Supports creating, retrieving, updating, and deleting events.
    """
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def get(self, request, *args, **kwargs):
        """
        Get all calendar events for the authenticated user.
        
        Query parameters:
        - start_date: Filter events from this date (YYYY-MM-DD)
        - end_date: Filter events until this date (YYYY-MM-DD)
        - event_type: Filter by event type (assignment, exam, class, etc.)
        """
        # Mock data - replace with actual database queries
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        event_type = request.query_params.get('event_type')
        
        mock_events = [
            {
                'id': 1,
                'title': 'Math Assignment Due',
                'description': 'Complete homework problems 1-20',
                'date': '2024-12-25',
                'time': '23:59',
                'type': 'assignment',
                'course': 'MATH 101',
                'color': '#FF5733'
            },
            {
                'id': 2,
                'title': 'Physics Exam',
                'description': 'Chapters 1-5',
                'date': '2024-12-28',
                'time': '10:00',
                'type': 'exam',
                'course': 'PHYS 201',
                'color': '#3498DB'
            },
            {
                'id': 3,
                'title': 'Study Group Meeting',
                'description': 'Group project discussion',
                'date': '2024-12-23',
                'time': '15:00',
                'type': 'meeting',
                'course': 'CS 301',
                'color': '#2ECC71'
            }
        ]
        
        return Response({
            'success': True,
            'events': mock_events,
            'total_count': len(mock_events),
            'filters': {
                'start_date': start_date,
                'end_date': end_date,
                'event_type': event_type
            }
        }, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Create a new calendar event.
        
        Required fields:
        - title: Event title
        - date: Event date (YYYY-MM-DD)
        
        Optional fields:
        - description: Event description
        - time: Event time (HH:MM)
        - type: Event type (assignment, exam, class, meeting, other)
        - course: Associated course
        - color: Event color (hex code)
        """
        data = request.data
        
        # Validate required fields
        required_fields = ['title', 'date']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return Response(
                {
                    'error': f'Missing required fields: {", ".join(missing_fields)}',
                    'success': False
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Mock event creation - replace with actual database save
        new_event = {
            'id': 999,  # Would be auto-generated by database
            'title': data.get('title'),
            'description': data.get('description', ''),
            'date': data.get('date'),
            'time': data.get('time', '00:00'),
            'type': data.get('type', 'other'),
            'course': data.get('course', ''),
            'color': data.get('color', '#95A5A6'),
            'created_at': '2024-12-21T10:00:00Z'
        }
        
        return Response({
            'success': True,
            'message': 'Event created successfully',
            'event': new_event
        }, status=status.HTTP_201_CREATED)
    
    def put(self, request, event_id, *args, **kwargs):
        """
        Update an existing calendar event.
        """
        data = request.data
        
        # Mock update - replace with actual database update
        updated_event = {
            'id': event_id,
            'title': data.get('title', 'Updated Event'),
            'description': data.get('description', ''),
            'date': data.get('date'),
            'time': data.get('time'),
            'type': data.get('type'),
            'course': data.get('course', ''),
            'color': data.get('color', '#95A5A6'),
            'updated_at': '2024-12-21T10:00:00Z'
        }
        
        return Response({
            'success': True,
            'message': 'Event updated successfully',
            'event': updated_event
        }, status=status.HTTP_200_OK)
    
    def delete(self, request, event_id, *args, **kwargs):
        """
        Delete a calendar event.
        """
        # Mock deletion - replace with actual database deletion
        return Response({
            'success': True,
            'message': f'Event {event_id} deleted successfully'
        }, status=status.HTTP_200_OK)


# =============================================================================
# EVENT SEARCH API
# =============================================================================

class EventSearchView(APIView):
    """
    API endpoint for searching campus events.
    Allows filtering by various criteria.
    """
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def get(self, request, *args, **kwargs):
        """
        Search for campus events.
        
        Query parameters:
        - q: Search query (searches title and description)
        - category: Event category filter
        - organization: Filter by organization ID
        - date_from: Start date filter (YYYY-MM-DD)
        - date_to: End date filter (YYYY-MM-DD)
        - limit: Number of results to return (default: 20)
        - offset: Pagination offset (default: 0)
        """
        query = request.query_params.get('q', '')
        category = request.query_params.get('category')
        organization = request.query_params.get('organization')
        date_from = request.query_params.get('date_from')
        date_to = request.query_params.get('date_to')
        limit = int(request.query_params.get('limit', 20))
        offset = int(request.query_params.get('offset', 0))
        
        # Mock events - replace with actual database queries
        mock_events = [
            {
                'id': 1,
                'title': 'Tech Career Fair',
                'description': 'Meet with top tech companies recruiting for internships and full-time positions',
                'date': '2024-12-27',
                'time': '14:00',
                'location': 'Student Union Ballroom',
                'category': 'career',
                'organization': {
                    'id': 101,
                    'name': 'Career Services',
                    'logo_url': 'https://example.com/logo1.png'
                },
                'attendee_count': 234,
                'is_registered': False
            },
            {
                'id': 2,
                'title': 'Winter Concert',
                'description': 'Annual winter concert featuring student performances',
                'date': '2024-12-30',
                'time': '19:00',
                'location': 'Concert Hall',
                'category': 'music',
                'organization': {
                    'id': 102,
                    'name': 'Music Department',
                    'logo_url': 'https://example.com/logo2.png'
                },
                'attendee_count': 456,
                'is_registered': True
            },
            {
                'id': 3,
                'title': 'Hackathon 2024',
                'description': '24-hour coding competition with prizes',
                'date': '2025-01-05',
                'time': '09:00',
                'location': 'Engineering Building',
                'category': 'technology',
                'organization': {
                    'id': 103,
                    'name': 'Computer Science Club',
                    'logo_url': 'https://example.com/logo3.png'
                },
                'attendee_count': 89,
                'is_registered': False
            }
        ]
        
        return Response({
            'success': True,
            'events': mock_events[offset:offset+limit],
            'total_count': len(mock_events),
            'filters': {
                'query': query,
                'category': category,
                'organization': organization,
                'date_from': date_from,
                'date_to': date_to
            },
            'pagination': {
                'limit': limit,
                'offset': offset,
                'has_more': offset + limit < len(mock_events)
            }
        }, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        """
        Register for an event.
        
        Required fields:
        - event_id: ID of the event to register for
        """
        event_id = request.data.get('event_id')
        
        if not event_id:
            return Response(
                {'error': 'event_id is required', 'success': False},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Mock registration - replace with actual database operation
        return Response({
            'success': True,
            'message': f'Successfully registered for event {event_id}',
            'event_id': event_id
        }, status=status.HTTP_201_CREATED)


# =============================================================================
# ORGANIZATION SEARCH API
# =============================================================================

class OrganizationSearchView(APIView):
    """
    API endpoint for searching campus organizations.
    """
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def get(self, request, *args, **kwargs):
        """
        Search for campus organizations.
        
        Query parameters:
        - q: Search query
        - category: Organization category
        - limit: Number of results (default: 20)
        - offset: Pagination offset (default: 0)
        """
        query = request.query_params.get('q', '')
        category = request.query_params.get('category')
        limit = int(request.query_params.get('limit', 20))
        offset = int(request.query_params.get('offset', 0))
        
        # Mock organizations - replace with actual database queries
        mock_organizations = [
            {
                'id': 101,
                'name': 'Computer Science Club',
                'description': 'A community for students interested in programming and technology',
                'category': 'academic',
                'member_count': 234,
                'logo_url': 'https://example.com/cs-club.png',
                'contact_email': 'csclub@university.edu',
                'meeting_schedule': 'Fridays at 5 PM',
                'is_member': False
            },
            {
                'id': 102,
                'name': 'Photography Society',
                'description': 'Learn and share photography skills with fellow enthusiasts',
                'category': 'arts',
                'member_count': 89,
                'logo_url': 'https://example.com/photo-society.png',
                'contact_email': 'photo@university.edu',
                'meeting_schedule': 'Tuesdays at 6 PM',
                'is_member': True
            },
            {
                'id': 103,
                'name': 'Environmental Action Group',
                'description': 'Working together for campus sustainability',
                'category': 'service',
                'member_count': 156,
                'logo_url': 'https://example.com/env-group.png',
                'contact_email': 'enviro@university.edu',
                'meeting_schedule': 'Wednesdays at 4 PM',
                'is_member': False
            }
        ]
        
        return Response({
            'success': True,
            'organizations': mock_organizations[offset:offset+limit],
            'total_count': len(mock_organizations),
            'filters': {
                'query': query,
                'category': category
            },
            'pagination': {
                'limit': limit,
                'offset': offset,
                'has_more': offset + limit < len(mock_organizations)
            }
        }, status=status.HTTP_200_OK)


# =============================================================================
# ORGANIZATION DETAIL API
# =============================================================================

class OrganizationDetailView(APIView):
    """
    API endpoint for organization details and management.
    """
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def get(self, request, org_id, *args, **kwargs):
        """
        Get detailed information about a specific organization.
        """
        # Mock organization detail - replace with actual database query
        mock_org = {
            'id': org_id,
            'name': 'Computer Science Club',
            'description': 'A community for students interested in programming and technology',
            'long_description': 'We host weekly coding sessions, tech talks, and hackathons...',
            'category': 'academic',
            'member_count': 234,
            'logo_url': 'https://example.com/cs-club.png',
            'banner_url': 'https://example.com/cs-club-banner.png',
            'contact_email': 'csclub@university.edu',
            'website': 'https://csclub.university.edu',
            'social_media': {
                'instagram': '@university_csclub',
                'twitter': '@uni_csclub',
                'discord': 'discord.gg/csclub'
            },
            'meeting_schedule': 'Fridays at 5 PM in Engineering Building Room 301',
            'officers': [
                {'name': 'John Doe', 'position': 'President'},
                {'name': 'Jane Smith', 'position': 'Vice President'},
                {'name': 'Bob Johnson', 'position': 'Treasurer'}
            ],
            'upcoming_events': [
                {
                    'id': 1,
                    'title': 'Hackathon 2024',
                    'date': '2025-01-05',
                    'time': '09:00'
                }
            ],
            'is_member': False,
            'join_requirements': 'Open to all students'
        }
        
        return Response({
            'success': True,
            'organization': mock_org
        }, status=status.HTTP_200_OK)
    
    def post(self, request, org_id, *args, **kwargs):
        """
        Join an organization or perform organization actions.
        
        Required fields:
        - action: 'join', 'leave', 'post_announcement', etc.
        """
        action = request.data.get('action')
        
        if not action:
            return Response(
                {'error': 'action field is required', 'success': False},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if action == 'join':
            return Response({
                'success': True,
                'message': f'Successfully joined organization {org_id}'
            }, status=status.HTTP_200_OK)
        
        elif action == 'leave':
            return Response({
                'success': True,
                'message': f'Successfully left organization {org_id}'
            }, status=status.HTTP_200_OK)
        
        elif action == 'post_announcement':
            announcement = request.data.get('content')
            if not announcement:
                return Response(
                    {'error': 'content field is required for announcements', 'success': False},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            return Response({
                'success': True,
                'message': 'Announcement posted successfully',
                'announcement': {
                    'id': 999,
                    'content': announcement,
                    'posted_at': '2024-12-21T10:00:00Z'
                }
            }, status=status.HTTP_201_CREATED)
        
        return Response(
            {'error': 'Invalid action', 'success': False},
            status=status.HTTP_400_BAD_REQUEST
        )


# =============================================================================
# DASHBOARD OVERVIEW API
# =============================================================================

class DashboardOverviewView(APIView):
    """
    API endpoint for dashboard overview data.
    Returns summary information for the user's dashboard.
    """
    # permission_classes = [IsAuthenticated]  # Uncomment for production
    
    def get(self, request, *args, **kwargs):
        """
        Get dashboard overview data for the authenticated user.
        """
        # Mock dashboard data - replace with actual database queries
        mock_data = {
            'success': True,
            'user': {
                'name': 'John Doe',
                'email': 'john.doe@university.edu',
                'student_id': '12345678',
                'major': 'Computer Science',
                'year': 'Junior'
            },
            'upcoming_deadlines': [
                {
                    'id': 1,
                    'title': 'Math Assignment',
                    'due_date': '2025-12-25',
                    'due_time': '23:59',
                    'course': 'MATH 101',
                    'type': 'assignment',
                    'days_until_due': 8
                },
                {
                    'id': 2,
                    'title': 'Physics Exam',
                    'due_date': '2025-12-28',
                    'due_time': '10:00',
                    'course': 'PHYS 201',
                    'type': 'exam',
                    'days_until_due': 7
                }
            ],
            'today_schedule': [
                {
                    'id': 1,
                    'title': 'CS 301 Lecture',
                    'time': '10:00',
                    'end_time': '11:30',
                    'location': 'Engineering Building 205'
                },
                {
                    'id': 2,
                    'title': 'Study Group',
                    'time': '15:00',
                    'end_time': '17:00',
                    'location': 'Library Room 3B'
                }
            ],
            'registered_events': [
                {
                    'id': 1,
                    'title': 'Winter Concert',
                    'date': '2024-12-30',
                    'time': '19:00'
                }
            ],
            'organizations': [
                {
                    'id': 101,
                    'name': 'Computer Science Club',
                    'logo_url': 'https://example.com/cs-club.png'
                },
                {
                    'id': 102,
                    'name': 'Photography Society',
                    'logo_url': 'https://example.com/photo-society.png'
                }
            ],
            'statistics': {
                'total_assignments': 12,
                'completed_assignments': 9,
                'upcoming_exams': 3,
                'events_attended': 5
            }
        }
        
        # --- SORT SECTIONS ---

        # Deadlines: soonest first
        mock_data['upcoming_deadlines'].sort(
            key=lambda d: d['days_until_due']
        )

        # Today's schedule: earliest time first
        mock_data['today_schedule'].sort(
            key=lambda s: s['time']
        )

        # Events: earliest date first
        mock_data['registered_events'].sort(
            key=lambda e: e['date']
        )


        return Response(mock_data, status=status.HTTP_200_OK)


# =============================================================================
# URL EXPORTS
# =============================================================================

# Export view instances
google_login = GoogleLogin.as_view()
pdf_scraper = PDFScraperView.as_view()
calendar_events = CalendarEventsView.as_view()
event_search = EventSearchView.as_view()
organization_search = OrganizationSearchView.as_view()
organization_detail = OrganizationDetailView.as_view()
dashboard_overview = DashboardOverviewView.as_view()