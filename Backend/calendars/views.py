from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import UserCalendarEvents, Events


#Calendar Code
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_calendar(request):
    """
    Return the current user's calendar events.
    """

    try:
        user = request.user

        calendar_entries = UserCalendarEvents.objects.filter(user=request.user)

        events = []
        for entry in calendar_entries:
            event_data = {
                'id': str(entry.event.id),
                'title': entry.custom_title or entry.event.title,
                'description': entry.event.description,
                'location_name': entry.event.location_name,
                'starts_at': entry.event.starts_at,
                'ends_at': entry.event.ends_at,
                'tags': entry.event.tags,
                'user_notes': entry.notes,
                'added_at': entry.added_at
            }
            events.append(event_data)

        return Response({
            'success': True,
            'user_id': str(user.id),
            'calendar': events,
            'total_events': len(events)
        }) 

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_calendar_event(request):
    """
    Add a new event to user's calendar.
    """

    try:
        data = request.data
        title = data.get('title')
        description = data.get('description', '')
        location_name = data.get('location_name', '')
        starts_at = data.get('starts_at')
        ends_at = data.get('ends_at')
        tags = data.get('tags', [])
        user_notes = data.get('user_notes', '')

        if not title or not starts_at:
            return Response({
                'success': False,
                'error': 'Title and start time are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        event = Events.objects.create(
            title=title,
            description=description,
            starts_at=starts_at,
            ends_at=ends_at,
            location_name=location_name,
            tags=tags
        )
        
        calendar_entry = UserCalendarEvents.objects.create(
            user=request.user,
            event=event,
            notes=user_notes
        )

        return Response({
            'success': True,
            'message': 'Event created successfully',
            'event': {
                'id': str(event.id),
                'title': event.title,
                'description': event.description,
                'location_name': event.location_name,
                'starts_at': event.starts_at,
                'ends_at': event.ends_at,
                'tags': event.tags,
                'user_notes': calendar_entry.notes,
                'added_at': calendar_entry.added_at
            }
        }, status=status.HTTP_201_CREATED) 

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_calendar_event(request, event_id):
    """
    Update an existing calendar event.
    """
    try:
        calendar_entry = UserCalendarEvents.objects.get(
            event__id=event_id, 
            user=request.user
        )
        event = calendar_entry.event

        data = request.data
        
        title = data.get('title')
        description = data.get('description', '')
        location_name = data.get('location_name', '')
        starts_at = data.get('starts_at')
        ends_at = data.get('ends_at')
        tags = data.get('tags', [])
        user_notes = data.get('user_notes', '')

        if not title or not starts_at:
            return Response({
                'success': False,
                'error': 'Title and start time are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        event.title = title
        event.description = description
        event.location_name = location_name
        event.starts_at = starts_at
        event.ends_at = ends_at
        event.tags = tags
        event.save()
        
        calendar_entry.notes = user_notes
        calendar_entry.save()

        return Response({
            'success': True,
            'message': 'Event updated successfully',
            'event': {
                'id': str(event.id),
                'title': event.title,
                'description': event.description,
                'location_name': event.location_name,
                'starts_at': event.starts_at,
                'ends_at': event.ends_at,
                'tags': event.tags,
                'user_notes': calendar_entry.notes,
                'updated_at': event.updated_at if hasattr(event, 'updated_at') else None
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_calendar_event(request, event_id):
    """
    Delete an existing calendar event.
    """
    try:
        calendar_entry = UserCalendarEvents.objects.get(
            event__id=event_id, 
            user=request.user
        )
        event = calendar_entry.event

        calendar_entry.delete()

        event.delete()

        return Response({
            'success': True,
            'message': 'Event deleted successfully',
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    