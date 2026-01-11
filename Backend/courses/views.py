# courses/views.py
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils.dateparse import parse_date

from .models import Course, CourseMeeting


def _serialize_meeting(m: CourseMeeting):
    return {
        "id": str(m.id),
        "day": m.day,
        "start_time": m.start_time.strftime("%H:%M:%S"),
        "end_time": m.end_time.strftime("%H:%M:%S"),
        "location_name": m.location_name,
    }


def _serialize_course(c: Course):
    return {
        "id": str(c.id),
        "code": c.code,
        "title": c.title,
        "professor": c.professor,
        "section": c.section,
        "term": c.term,
        "creditHours": c.creditHours,
        "color": c.color,
        "default_location": c.default_location,
        "examDate": c.examDate.isoformat() if c.examDate else None,
        "created_at": c.created_at.isoformat() if c.created_at else None,
        "meetings": [_serialize_meeting(m) for m in c.meetings.all()],
    }


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_courses(request):
    """
    Return the current user's courses (including meetings).
    """
    try:
        qs = (
            Course.objects
            .filter(user=request.user)
            .prefetch_related("meetings")
            .order_by("term", "code", "section")
        )

        courses = [_serialize_course(c) for c in qs]

        return Response({
            "success": True,
            "user_id": str(request.user.id),
            "courses": courses,
            "total_courses": len(courses),
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_user_course(request):
    """
    Create a course for the current user, optionally with meetings.

    Expected JSON example:
    {
      "code": "CSCE 120",
      "title": "Program Design and Concepts",
      "professor": "Smith",
      "section": "501",
      "term": "Spring 2026",
      "creditHours": 4,
      "color": "#500000",
      "default_location": "ZACH 100",
      "examDate": "2026-05-06",
      "meetings": [
        {"day":"MO","start_time":"13:00","end_time":"14:15","location_name":"ZACH 100"},
        {"day":"WE","start_time":"13:00","end_time":"14:15","location_name":"ZACH 100"}
      ]
    }
    """
    try:
        data = request.data

        code = (data.get("code") or "").strip()
        title = data.get("title", "")
        professor = data.get("professor", "")
        section = data.get("section", "")
        term = data.get("term", "")
        creditHours = data.get("creditHours", None)
        color = data.get("color", "")
        default_location = data.get("default_location", "")

        examDate_raw = data.get("examDate")
        examDate = parse_date(examDate_raw) if examDate_raw else None

        meetings = data.get("meetings", [])

        if not code:
            return Response({
                "success": False,
                "error": "code is required (e.g. 'CSCE 120')"
            }, status=status.HTTP_400_BAD_REQUEST)

        course = Course.objects.create(
            user=request.user,
            code=code,
            title=title,
            professor=professor,
            section=section,
            term=term,
            creditHours=creditHours,
            color=color,
            default_location=default_location,
            examDate=examDate,
        )

        # Create meetings (optional)
        created_meetings = []
        if meetings:
            for m in meetings:
                day = m.get("day")
                start_time = m.get("start_time")
                end_time = m.get("end_time")
                location_name = m.get("location_name", "")

                if not day or not start_time or not end_time:
                    # rollback cleanly
                    course.delete()
                    return Response({
                        "success": False,
                        "error": "Each meeting requires day, start_time, end_time"
                    }, status=status.HTTP_400_BAD_REQUEST)

                cm = CourseMeeting.objects.create(
                    course=course,
                    day=day,
                    start_time=start_time,  # DRF can coerce "HH:MM" into time
                    end_time=end_time,
                    location_name=location_name,
                )
                created_meetings.append(cm)

        # Prefetch for response
        course = Course.objects.prefetch_related("meetings").get(id=course.id)

        return Response({
            "success": True,
            "message": "Course created successfully",
            "course": _serialize_course(course),
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

        # Update fields if present
        if "code" in data:
            course.code = (data.get("code") or "").strip()
            if not course.code:
                return Response({"success": False, "error": "code cannot be blank"}, status=status.HTTP_400_BAD_REQUEST)

        if "title" in data: course.title = data.get("title", "")
        if "professor" in data: course.professor = data.get("professor", "")
        if "section" in data: course.section = data.get("section", "")
        if "term" in data: course.term = data.get("term", "")
        if "creditHours" in data: course.creditHours = data.get("creditHours", None)
        if "color" in data: course.color = data.get("color", "")
        if "default_location" in data: course.default_location = data.get("default_location", "")

        if "examDate" in data:
            examDate_raw = data.get("examDate")
            course.examDate = parse_date(examDate_raw) if examDate_raw else None

        course.save()

        # Replace meetings if provided
        if "meetings" in data:
            meetings = data.get("meetings") or []
            # delete old
            course.meetings.all().delete()

            # create new
            for m in meetings:
                day = m.get("day")
                start_time = m.get("start_time")
                end_time = m.get("end_time")
                location_name = m.get("location_name", "")

                if not day or not start_time or not end_time:
                    return Response({
                        "success": False,
                        "error": "Each meeting requires day, start_time, end_time"
                    }, status=status.HTTP_400_BAD_REQUEST)

                CourseMeeting.objects.create(
                    course=course,
                    day=day,
                    start_time=start_time,
                    end_time=end_time,
                    location_name=location_name,
                )

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


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user_course(request, course_id):
    """
    Delete a course for the current user.
    CourseMeeting rows cascade-delete because they FK to Course with CASCADE.
    """
    try:
        course = get_object_or_404(Course, id=course_id, user=request.user)
        course.delete()

        return Response({
            "success": True,
            "message": "Course deleted successfully",
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({
            "success": False,
            "error": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
