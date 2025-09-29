from django.db import models

# Create your models here.
class User(models.Model): # used for user date
    name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name