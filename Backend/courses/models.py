# courses/models.py
import uuid
from django.db import models
from django.conf import settings

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses")

    code = models.CharField(max_length=32)     # "CSCE 120"
    title = models.CharField(max_length=140, blank=True, default="")  # optional display name
    section = models.CharField(max_length=32, blank=True, default="")

    term = models.CharField(max_length=32, blank=True, default="")  # "Spring 2026"
    color = models.CharField(max_length=16, blank=True, default="") # optional UI color

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("user", "code", "section", "term")]

class CourseMeeting(models.Model):
    """
    Reusable “meeting pattern” pieces for a course.
    Example: MWF 9:10-10:00 at ZACH 100
    """
    DAYS = [
        ("MO", "Monday"),
        ("TU", "Tuesday"),
        ("WE", "Wednesday"),
        ("TH", "Thursday"),
        ("FR", "Friday"),
        ("SA", "Saturday"),
        ("SU", "Sunday"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="meetings")

    day = models.CharField(max_length=2, choices=DAYS)
    start_time = models.TimeField()
    end_time = models.TimeField()

    location_name = models.CharField(max_length=200, blank=True, default="")
