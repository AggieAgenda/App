from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    title = models.CharField(max_length=200)
    image = models.URLField(blank=True, null=True)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    date = models.DateField()
    tags = models.JSONField(default=list)

    def __str__(self):
        return self.title
class OrganizationEntry(models.Model):
    name = models.CharField(max_length=100)
    # other organization information
    

class Deadline(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    course = models.CharField(max_length=100)
    due_date = models.DateField()
    due_time = models.TimeField()
    type = models.CharField(max_length=50)  # assignment, exam, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.course} - {self.title}"

class Schedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    day_of_week = models.CharField(max_length=20)  # Monday, Tuesday, etc.
    time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=200)
    
    def __str__(self):
        return f"{self.title} - {self.day_of_week}"
