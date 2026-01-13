# courses/views.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_date

from .models import Course



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_courses(request):
    """
    Return the current user's courses 
    """
    user = request.user
    
    course_entries = Course.objects.filter(user=request.user)
    course_data = []
    id = 0
    for entry in course_entries:
        id += 1
        data = {
            "id": id,
            "name": entry.name,
            "fullName": entry.fullName,
            "professor": entry.professor,
            "section": entry.section,
            "location":entry.location,
            "examDate": entry.examDate.isoformat() if entry.examDate else None,
            "creditHours": entry.credit_hours,
            "meetingTimes": entry.meetingTimes,
            "color": entry.color,     
        }
        

        course_data.append(data)

        
    return Response({
        'success': True,
        'user_id': str(user.id),
        'courses': course_data,
        'total_events': len(course_data)
    })
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def add_user_courses(request):
    """
    add the current user's courses 
    """
    try:
        user = request.user
        course = Course.objects.create(
            user = user,
            

        ) # define course things
    except:
        return Response({
            'success':False,
            'message': "error creating course"
        })
        
    return Response({
        'success': True,
        'user_id': str(user.id),
    })
        
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def delete_user_courses(request):
    """
    Return the current user's courses 
    """
    user = request.user
    
    course_entries = Course.objects.filter(user=request.user)
    course_data = []
    id = 0
    for entry in course_entries:
        id += 1
        data = {
            "id": id,
            "name": entry.name,
            "fullName": entry.fullName,
            "professor": entry.professor,
            "section": entry.section,
            "location":entry.location,
            "examDate": entry.examDate.isoformat() if entry.examDate else None,
            "creditHours": entry.credit_hours,
            "meetingTimes": entry.meetingTimes,
            "color": entry.color,     
        }
        

        course_data.append(data)

        
    return Response({
        'success': True,
        'user_id': str(user.id),
        'courses': course_data,
        'total_events': len(course_data)
    })
        



@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_user_course(request, course_id):
    """
    Update an existing course for the current user.
    If 'meetings' is provided, we replace all meetings with the new list.
    """
    try:
        course = get_object_or_404(Course, id=course_id, user=request.user)
        data = request.data

        

        course = Course.objects.prefetch_related("meetings").get(id=course.id)

        return Response({
            "success": True,
            "message": "Course updated successfully",
            "course": _serialize_course(course),
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


'''
        [
  {
    "id": 1,
    "name": "CSCE 314",
    "fullName": "Programming Languages",
    "professor": "Dr. Smith",
    "location": "HRBB 124",
    "examDate": "2025-05-10",
    "creditHours": 3,
    "meetingTimes": "MWF 10:20-11:10 AM",
    "color": "#3B82F6"
  },
  {
    "id": 2,
    "name": "MATH 251",
    "fullName": "Engineering Mathematics III",
    "professor": "Dr. Johnson",
    "location": "BLOC 150",
    "examDate": "2025-05-08",
    "creditHours": 3,
    "meetingTimes": "TR 12:45-2:00 PM",
    "color": "#10B981"
  },
  {
    "id": 3,
    "name": "MATH 251",
    "fullName": "Engineering Mathematics III",
    "professor": "Dr. Johnson",
    "location": "BLOC 150",
    "examDate": "2025-05-08",
    "creditHours": 3,
    "meetingTimes": "TR 12:45-2:00 PM",
    "color": "#10B981"
  }
]
        '''