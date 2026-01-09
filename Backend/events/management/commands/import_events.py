import json
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from events.models import Event

CAREER_FAIRS_JSON = r'''[
  {
    Put Events here
]'''


class Command(BaseCommand):
    help = "Import TAMU career fairs into the Event table."

    def handle(self, *args, **options):
        events = json.loads(CAREER_FAIRS_JSON)
        created = 0

        for item in events:
            starts_at = parse_datetime(item["starts_at"])
            ends_at = parse_datetime(item.get("ends_at")) if item.get("ends_at") else None

            _, was_created = Event.objects.get_or_create(
                title=item["title"],
                starts_at=starts_at,
                defaults={
                    "description": item.get("description", ""),
                    "image_url": item.get("image_url"),
                    "location_name": item.get("location_name", ""),
                    "ends_at": ends_at,
                    "tags": item.get("tags", []),
                },
            )

            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(
            f"Career fair import complete. {created} new events created."
        ))
