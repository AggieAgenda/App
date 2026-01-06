import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser.
    Supports both regular users and organization accounts.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, max_length=255)
    is_organization = models.BooleanField(default=False)
    profile_picture = models.URLField(max_length=500, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    def save(self, *args, **kwargs):
        # Ensure username is never blank (AbstractUser expects it)
        if not self.username:
            # create a stable-ish username from email prefix + short uuid
            prefix = (self.email.split("@")[0] if self.email else "user")
            if not self.id:
                # Generate a new UUID if not set
                self.id = uuid.uuid4()
            self.username = f"{prefix}-{str(self.id)[:8]}"
        super().save(*args, **kwargs)
    def __str__(self):
        return self.email
