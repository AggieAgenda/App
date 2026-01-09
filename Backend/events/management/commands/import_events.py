import json
from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_datetime
from events.models import Event

CAREER_FAIRS_JSON = r'''[
  {
    "title": "SBSLC Career Fair",
    "description": "Contact: sbslc.tamu@gmail.com",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC",
    "starts_at": "2026-01-17T00:00:00-06:00",
    "ends_at": "2026-01-17T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged"]
  },
  {
    "title": "Biotechnology Career Fair",
    "description": "Contact: patti.edgar@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "National Center for Therapeutics Manufacturing (NCTM) Building",
    "starts_at": "2026-01-23T00:00:00-06:00",
    "ends_at": "2026-01-23T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:biotech", "major:biomedical-engineering", "major:chemical-engineering", "major:biology", "major:biochemistry"]
  },
  {
    "title": "Engineering Honors Career Fair",
    "description": "Contact: eh-industry@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Zachry Chevron Rooms",
    "starts_at": "2026-01-27T00:00:00-06:00",
    "ends_at": "2026-01-27T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "major:engineering"]
  },
  {
    "title": "Engineering Career Fair",
    "description": "Contact: careerfair@sec.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Legends Event Center in Bryan, TX",
    "starts_at": "2026-01-28T00:00:00-06:00",
    "ends_at": "2026-01-29T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "multi-day", "major:engineering", "major:computer-science", "major:computer-engineering", "major:electrical-engineering", "major:mechanical-engineering", "major:aerospace-engineering", "major:civil-engineering", "major:chemical-engineering", "major:industrial-engineering"]
  },
  {
    "title": "AGLS Career Fair (Agriculture & Life Sciences)",
    "description": "Contact: aglscareerfair@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-01-29T00:00:00-06:00",
    "ends_at": "2026-01-29T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:agriculture", "major:life-sciences", "major:biology", "major:environmental-science"]
  },
  {
    "title": "PAID Career Fair (Industrial Distribution)",
    "description": "Contact: careerfair@tamupaid.org",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Kyle Field - Ford Hall of Champions",
    "starts_at": "2026-01-29T00:00:00-06:00",
    "ends_at": "2026-01-29T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "major:industrial-distribution", "major:engineering-technology", "major:business"]
  },
  {
    "title": "Engineering Career Fair (Virtual)",
    "description": "Virtual on Symplicity. Contact: careerfair@sec.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Virtual on Symplicity",
    "starts_at": "2026-01-30T00:00:00-06:00",
    "ends_at": "2026-01-30T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "virtual", "flagged", "major:engineering", "major:computer-science", "major:computer-engineering", "major:electrical-engineering", "major:mechanical-engineering", "major:aerospace-engineering", "major:civil-engineering", "major:chemical-engineering", "major:industrial-engineering"]
  },
  {
    "title": "IISE Industrial & Systems Engineering Career Fair",
    "description": "Contact: iise.external@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2400",
    "starts_at": "2026-02-02T00:00:00-06:00",
    "ends_at": "2026-02-02T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "major:industrial-engineering", "major:systems-engineering", "major:operations-research", "major:data-analytics"]
  },
  {
    "title": "TASK Consulting Career Fair",
    "description": "Contact: tasktamu@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-02-02T00:00:00-06:00",
    "ends_at": "2026-02-02T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:engineering", "major:business", "major:information-systems", "major:computer-science"]
  },
  {
    "title": "Arts and Sciences Career Fair",
    "description": "Contact: bosborne@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-02-03T00:00:00-06:00",
    "ends_at": "2026-02-03T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged"]
  },
  {
    "title": "Business Career Fair",
    "description": "Contact: cfair@mays.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Kyle Field - Ford Hall of Champions",
    "starts_at": "2026-02-04T00:00:00-06:00",
    "ends_at": "2026-02-04T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged"]
  },
  {
    "title": "Econ Career Night",
    "description": "Contact: paulav@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2400",
    "starts_at": "2026-02-04T00:00:00-06:00",
    "ends_at": "2026-02-04T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026"]
  },
  {
    "title": "Sales Career Fair",
    "description": "Contact: sales@mays.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-02-11T00:00:00-06:00",
    "ends_at": "2026-02-11T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged"]
  },
  {
    "title": "LAUP Career Fair",
    "description": "Contact: t-morris@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Kyle Field - Ford Hall of Champions",
    "starts_at": "2026-02-12T00:00:00-06:00",
    "ends_at": "2026-02-12T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026"]
  },
  {
    "title": "ARCH Career Fair",
    "description": "Contact: tamuarchcareerfair@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Kyle Field - Ford Hall of Champions",
    "starts_at": "2026-02-13T00:00:00-06:00",
    "ends_at": "2026-02-13T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "major:architecture", "major:construction-science", "major:landscape-architecture"]
  },
  {
    "title": "Health Professions Fair",
    "description": "Contact: ablum@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-02-17T00:00:00-06:00",
    "ends_at": "2026-02-17T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:pre-med", "major:public-health", "major:biology", "major:nursing"]
  },
  {
    "title": "CIAC Construction Science Career Fair",
    "description": "Contact: ciac@arch.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Legends Event Center in Bryan, TX",
    "starts_at": "2026-02-19T00:00:00-06:00",
    "ends_at": "2026-02-20T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "multi-day", "major:construction-science", "major:civil-engineering", "major:architecture"]
  },
  {
    "title": "Camp Career Day",
    "description": "Contact: danielaberry@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Academic Plaza and Rudder Plaza",
    "starts_at": "2026-02-25T00:00:00-06:00",
    "ends_at": "2026-02-25T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged"]
  },
  {
    "title": "HMGT Day",
    "description": "Contact: daniel.eichler@ag.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Swinbank AgriLife Center",
    "starts_at": "2026-02-26T00:00:00-06:00",
    "ends_at": "2026-02-26T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "major:health", "major:hospitality", "major:management"]
  },
  {
    "title": "SEC Career Discovery Fair",
    "description": "Contact: engrdevelopment@sec.tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Kyle Field - Ford Hall of Champions",
    "starts_at": "2026-03-04T00:00:00-06:00",
    "ends_at": "2026-03-04T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:engineering", "major:computer-science", "major:computer-engineering", "major:electrical-engineering", "major:mechanical-engineering", "major:aerospace-engineering", "major:civil-engineering", "major:chemical-engineering", "major:industrial-engineering"]
  },
  {
    "title": "TIES (Technical, Industrial, and Engineering Sales) Connection Fair",
    "description": "Contact: wcbolander@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "MSC 2300",
    "starts_at": "2026-03-26T00:00:00-06:00",
    "ends_at": "2026-03-26T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:engineering", "major:industrial-distribution", "major:business", "major:engineering-sales"]
  },
  {
    "title": "Education Career Fair",
    "description": "Contact: educationcareerfair@tamu.edu",
    "image_url": "https://calendar.tamu.edu/live/image/gid/32/width/1260/height/630/crop/1/14137_Career_Center_LiveWhale_Logo.jpg",
    "location_name": "Brazos County Expo",
    "starts_at": "2026-03-30T00:00:00-06:00",
    "ends_at": "2026-03-30T23:59:59-06:00",
    "tags": ["career-fair", "tamu", "spring-2026", "flagged", "major:education"]
  }
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
