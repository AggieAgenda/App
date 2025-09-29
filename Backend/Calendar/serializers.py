from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Handles serialization and deserialization of User objects.
    """
    class Meta:
        model = User
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']  # These fields are auto-generated

class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new User instances.
    Only includes fields that can be set during creation.
    """
    class Meta:
        model = User
        fields = ['name', 'description']
