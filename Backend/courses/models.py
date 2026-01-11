# courses/models.py
import uuid
from django.db import models
from django.conf import settings

class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="courses",
    )

    code = models.CharField(max_length=32)  # "CSCE 120"
    title = models.CharField(max_length=140, blank=True, default="")
    professor = models.CharField(max_length=64, blank=True, default="")
    section = models.CharField(max_length=32, blank=True, default="")
    term = models.CharField(max_length=32, blank=True, default="")  # "Spring 2026"
    credit_hours = models.SmallIntegerField(null=True, blank=True)

    # optional UI fields
    color = models.CharField(max_length=16, blank=True, default="")

    # optional course-level default location (meetings can override)
    default_location = models.CharField(max_length=200, blank=True, default="")

    exam_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["user", "code", "section", "term"], name="uniq_user_course")
        ]

    def __str__(self):
        return f"{self.code} ({self.term})"


class CourseMeeting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="meetings",
    )

    DAYS = [
        ("MO", "Monday"),
        ("TU", "Tuesday"),
        ("WE", "Wednesday"),
        ("TH", "Thursday"),
        ("FR", "Friday"),
        ("SA", "Saturday"),
        ("SU", "Sunday"),
    ]

    day = models.CharField(max_length=2, choices=DAYS)
    start_time = models.TimeField()
    end_time = models.TimeField()

    location_name = models.CharField(max_length=200, blank=True, default="")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["course", "day", "start_time", "end_time", "location_name"],
                name="uniq_course_meeting"
            )
        ]

    def __str__(self):
        return f"{self.course.code} {self.day} {self.start_time}-{self.end_time}"
