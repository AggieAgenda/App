from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from . import models

# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_organizations(request):
    """
    Get a organizations from the database
    """

    try:
        '''responseThing = [{
        id: 1,
        name: "Aggie Coding Club",
        image: "/org_coding_club.jpg",
        description:
          "Build projects, prep for interviews, and meet other Aggie developers. Weekly workshops + hack nights.",
        tags: ["tech", "computer science", "workshops"],
        members: 240,
        meetingTime: "Thurs 7:00 PM",
        location: "Zachry 101",
        link: "https://aggiecodingclub.com",
        contact_email: "contact@aggiecodingclub.com",
        founded: "2018"
      },
      {
        id: 2,
        name: "Aggie Business Society",
        image: "/org_business.jpg",
        description:
          "Professional development, networking, and case competitions for students exploring business careers.",
        tags: ["business", "networking", "career"],
        members: 180,
        meetingTime: "Tues 6:30 PM",
        location: "Wehner 113",
        link: "https://aggiebusiness.org",
        contact_email: "info@aggiebusiness.org",
        founded: "2015"
      },
      {
        id: 3,
        name: "Volunteer Aggies",
        image: "/org_volunteer.jpg",
        description:
          "Community service events around College Station with a social, welcoming vibe. No experience needed.",
        tags: ["service", "community", "free"],
        members: 320,
        meetingTime: "Varies",
        location: "Off-campus",
        link: "https://volunteeraggies.org",
        contact_email: "volunteer@tamu.edu",
        founded: "2012"
      },
      {
        id: 4,
        name: "Aggie Design Team",
        image: "/org_design.jpg",
        description:
          "Work on real product/UI projects, learn Figma, and collaborate with devs to ship polished experiences.",
        tags: ["design", "tech", "projects"],
        members: 95,
        meetingTime: "Mon 7:00 PM",
        location: "MSC 2400",
        link: "https://aggiedesign.com",
        contact_email: "design@tamu.edu",
        founded: "2019"
      },
      {
        id: 5,
        name: "Pre-Health Aggies",
        image: "/org_prehealth.jpg",
        description:
          "Shadowing tips, exam prep, and mentorship for students pursuing medicine, PA, nursing, and more.",
        tags: ["health", "mentorship", "career"],
        members: 210,
        meetingTime: "Wed 6:00 PM",
        location: "ILCB 110",
        link: "https://prehealthaggies.org",
        contact_email: "prehealth@tamu.edu",
        founded: "2016"
      },
      {
        id: 6,
        name: "Aggie Outdoors",
        image: "/org_outdoors.jpg",
        description:
          "Weekend hikes, camping trips, and outdoor skill workshops. Great way to explore Texas with friends.",
        tags: ["outdoors", "community", "trips"],
        members: 160,
        meetingTime: "Fri evenings",
        location: "Meet-up spots vary",
        link: "https://aggieoutdoors.com",
        contact_email: "outdoors@tamu.edu",
        founded: "2017"
      },]
        '''
       
        responseThing = [
            {
                "id": 1,
                "name": "Aggie Coding Club",
                "image": "/org_coding_club.jpg",
                "description": "Build projects, prep for interviews, and meet other Aggie developers. Weekly workshops + hack nights.",
                "tags": ["tech", "computer science", "workshops"],
                "members": 240,
                "meetingTime": "Thurs 7:00 PM",
                "location": "Zachry 101",
                "link": "https://aggiecodingclub.com",
                "contact_email": "contact@aggiecodingclub.com",
                "founded": "2018",
            },
            {
                "id": 2,
                "name": "Aggie Business Society",
                "image": "/org_business.jpg",
                "description": "Professional development, networking, and case competitions for students exploring business careers.",
                "tags": ["business", "networking", "career"],
                "members": 180,
                "meetingTime": "Tues 6:30 PM",
                "location": "Wehner 113",
                "link": "https://aggiebusiness.org",
                "contact_email": "info@aggiebusiness.org",
                "founded": "2015",
            }, ]
        return Response({
            'success': True,
            'organizations': responseThing,   
        }) 

    except Exception as e:
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
