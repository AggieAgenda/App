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

class UserProfile(models.Model):
    """
    Extended user profile to store additional OAuth information
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # OAuth specific fields
    google_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    profile_picture = models.URLField(max_length=500, null=True, blank=True)
    
    # Additional user info
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s profile"
    
    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'


# Signal to automatically create UserProfile when User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()