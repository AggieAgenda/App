# organizations/models.py
import uuid
from django.db import models
from django.conf import settings

class Organization(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=140, unique=True)
    slug = models.SlugField(max_length=180, unique=True)
    instagram = models.CharField(max_length=64, blank=True, default="")  # store '@handle' or handle
    description = models.TextField(blank=True, default="")
    logo_url = models.URLField(blank=True, null=True)
    verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class OrganizationMembership(models.Model):
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("member", "Member"), # change to owner
    ]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    organization = models.ForeignKey("organizations.Organization", on_delete=models.CASCADE, related_name="memberships")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="org_memberships")
    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default="member")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("organization", "user")]

class OrganizationInviteCode(models.Model):
    """
    Rotatable join codes. Keep it simple for MVP.
    """
    organization = models.OneToOneField("organizations.Organization", on_delete=models.CASCADE, related_name="invite_code")
    code = models.CharField(max_length=16, unique=True)  # generate random uppercase string
    active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)
