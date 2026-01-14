# courses/models.py
import uuid
from django.db import models
from django.conf import settings

class Course(models.Model):
   

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="courses",
    )
    name = models.CharField(max_length=32, blank= True, default="")
    fullName = models.CharField(max_length=32, blank = True, default="")  # "CSCE 120"
    professor = models.CharField(max_length=64, blank=True, default="")
    section = models.CharField(max_length=32, blank=True, default="")
    location = models.CharField(max_length=200, blank=True, default="")
    exam_date = models.DateField(null=True, blank=True)
    credit_hours = models.SmallIntegerField(null=True, blank=True)
    meetingTimes = models.CharField(max_length=32, blank=True, default="")



    # optional UI fields
    color = models.CharField(max_length=16, blank=True, default="")

    # optional course-level default location (meetings can override)


    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
           
        ]

    def __str__(self):
        return f"{self.code} ({self.term})"

