from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=200)
    image = models.URLField(blank=True, null=True)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    date = models.DateField()
    tags = models.JSONField(default=list)

    def __str__(self):
        return self.title