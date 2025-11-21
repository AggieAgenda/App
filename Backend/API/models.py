from django.db import models


class Event(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/')
    description = models.TextField()
    link = models.URLField()
    category = models.CharField(max_length=50)
    date = models.DateField(null=True, blank=True)  

    def __str__(self):
        return self.title