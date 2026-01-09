# events/serializers.py
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    """Standard event serializer for list views"""
    organization_name = serializers.CharField(
        source='organization.name', 
        read_only=True,
        allow_null=True
    )
    organization_id = serializers.UUIDField(
        source='organization.id',
        read_only=True,
        allow_null=True
    )
    
    # Format dates for frontend compatibility
    date = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'image',
            'image_url',
            'date',
            'starts_at',
            'ends_at',
            'location_name',
            'tags',
            'organization_name',
            'organization_id',
            'external_url',
        ]
    
    def get_date(self, obj):
        """Return date in YYYY-MM-DD format for frontend"""
        return obj.starts_at.strftime('%Y-%m-%d')
    
    def get_image(self, obj):
        """Return image_url for frontend compatibility"""
        return obj.image_url


class EventDetailSerializer(serializers.ModelSerializer):
    """Detailed event serializer with full organization info"""
    organization = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()
    time = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'description',
            'image',
            'image_url',
            'date',
            'time',
            'starts_at',
            'ends_at',
            'location_name',
            'tags',
            'organization',
            'external_url',
            'created_at',
        ]
    
    def get_organization(self, obj):
        if obj.organization:
            return {
                'id': str(obj.organization.id),
                'name': obj.organization.name,
                # Add more organization fields as needed
            }
        return None
    
    def get_date(self, obj):
        return obj.starts_at.strftime('%Y-%m-%d')
    
    def get_time(self, obj):
        return obj.starts_at.strftime('%H:%M')
    
    def get_image(self, obj):
        return obj.image_url