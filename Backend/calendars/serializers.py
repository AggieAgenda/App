# calendar/serializers.py
from rest_framework import serializers
from .models import CalendarItem, CalendarRule

class CalendarItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarItem
        fields = [
            'id', 'title', 'description', 'location_name',
            'starts_at', 'ends_at', 'source_type', 'source_id',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        # Automatically set user from request context
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CalendarRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarRule
        fields = [
            'id', 'title', 'location_name', 'days',
            'start_time', 'end_time', 'start_date', 'end_date',
            'source_type', 'source_id', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CalendarEventResponseSerializer(serializers.Serializer):
    """
    Serializer for expanded calendar events (both items and rule occurrences)
    """
    id = serializers.CharField()
    title = serializers.CharField()
    location = serializers.CharField(allow_blank=True)
    start = serializers.DateTimeField()
    end = serializers.DateTimeField(allow_null=True)
    recurrence = serializers.DictField(allow_null=True)
    exceptions = serializers.ListField(child=serializers.DateTimeField(), default=list)