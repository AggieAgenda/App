
import json
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from events.models import Event

class Command(BaseCommand):
    help = "Import TAMU career fairs into the Event table."

    def handle(self, *args, **options):

        listOfID = [
            "f7ab6895-c677-4d32-a589-f9fd70dc6941",
            "a82568e8-338a-48b0-9eab-890c95291524",
            "e490d1ef-23a0-4e4f-975c-d002108ac42c",

            
            
            ]
        for id_entry in listOfID:
            Event.objects.get(id=id_entry).delete()

      