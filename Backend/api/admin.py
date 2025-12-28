from django.contrib import admin
from django import forms
from .models import Event
from api.utils.supabase import upload_event_image
from django.db import transaction

class EventAdminForm(forms.ModelForm):
    image_file = forms.ImageField(required=False)

    class Meta:
        model = Event
        fields = "__all__"

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventAdminForm
    exclude = ("image",)

    def save_model(self, request, obj, form, change):
        image_file = form.cleaned_data.get("image_file")

        super().save_model(request, obj, form, change)

        if image_file:
            transaction.on_commit(
                lambda: self._upload_image(obj, image_file)
            )

    def _upload_image(self, obj, image_file):
        from api.utils.supabase import upload_event_image
        obj.image = upload_event_image(image_file)
        obj.save(update_fields=["image"])