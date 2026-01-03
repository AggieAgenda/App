# calendar/models.py
import uuid
from django.db import models
from django.conf import settings

class CalendarItem(models.Model):
    SOURCE_CHOICES = [
        ("manual", "Manual"),
        ("event", "Event"),
        ("deadline", "Deadline"),
        ("syllabus", "Syllabus"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="calendar_items")

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    location_name = models.CharField(max_length=200, blank=True, default="")

    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField(null=True, blank=True)

    source_type = models.CharField(max_length=16, choices=SOURCE_CHOICES, default="manual")
    source_id = models.UUIDField(null=True, blank=True)  # points to Event/Deadline/etc (not FK to avoid cross-app FK mess)

    created_at = models.DateTimeField(auto_now_add=True)

class CalendarRule(models.Model):
    """
    Recurring rule, mainly for classes.
    We can expand these into occurrences when querying a date range.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="calendar_rules")

    title = models.CharField(max_length=200)
    location_name = models.CharField(max_length=200, blank=True, default="")

    # recurrence basics
    days = models.JSONField(default=list)  # ["MO","WE","FR"]
    start_time = models.TimeField()
    end_time = models.TimeField()

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    source_type = models.CharField(max_length=16, default="course")
    source_id = models.UUIDField(null=True, blank=True)  # points to Course

    created_at = models.DateTimeField(auto_now_add=True)
