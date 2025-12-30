from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class TestEntry(models.Model):
    name = models.CharField(max_length = 100)
    created_at = models.DateTimeField(auto_now_add=True)

def __str__(self):
    return self.name

