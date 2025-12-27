from django.db import models

# Create your models here.
class EventsEntry(models.Model):
    name = models.CharField(max_length=100)
    organization = models.CharField(max_length=100)
    startTime = models.TimeField()
    endTime = models.TimeField()
    # other event information

class OrganizationEntry(models.Model):
    name = models.CharField(max_length=100)
    # other organization information
    