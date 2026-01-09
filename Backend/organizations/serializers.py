# organizations/serializers.py
from rest_framework import serializers
from .models import Organization, OrganizationMembership, OrganizationInviteCode


class OrganizationSerializer(serializers.ModelSerializer):
    """Basic organization serializer for list views"""
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Organization
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'instagram',
            'logo_url',
            'verified',
            'member_count',
            'created_at'
        ]
    
    def get_member_count(self, obj):
        return OrganizationMembership.objects.filter(organization=obj).count()


class OrganizationDetailSerializer(serializers.ModelSerializer):
    """Detailed organization serializer"""
    member_count = serializers.SerializerMethodField()
    admin_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Organization
        fields = [
            'id',
            'name',
            'slug',
            'description',
            'instagram',
            'logo_url',
            'verified',
            'member_count',
            'admin_count',
            'created_at'
        ]
    
    def get_member_count(self, obj):
        return OrganizationMembership.objects.filter(organization=obj).count()
    
    def get_admin_count(self, obj):
        return OrganizationMembership.objects.filter(
            organization=obj,
            role='admin'
        ).count()


class CreateOrganizationSerializer(serializers.Serializer):
    """Serializer for creating organizations"""
    name = serializers.CharField(max_length=140)
    description = serializers.CharField(required=False, allow_blank=True)
    instagram = serializers.CharField(required=False, allow_blank=True, max_length=64)
    logo_url = serializers.URLField(required=False, allow_null=True)


class OrganizationMembershipSerializer(serializers.ModelSerializer):
    """Serializer for organization memberships"""
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = OrganizationMembership
        fields = [
            'id',
            'user_email',
            'user_name',
            'role',
            'created_at'
        ]
    
    def get_user_name(self, obj):
        if obj.user.first_name and obj.user.last_name:
            return f"{obj.user.first_name} {obj.user.last_name}"
        return obj.user.username