from django.contrib import admin
from django import forms
from .models import Event

# Custom form for Event to add a date picker
class EventAdminForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = '__all__'
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),  # HTML5 date picker
        }

# Custom admin using the form
class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm

# Register the model with the custom admin
admin.site.register(Event, EventAdmin)
