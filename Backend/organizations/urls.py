# organizations/urls.py
from django.urls import path
from . import views

app_name = 'organizations'

urlpatterns = [
    # Organization CRUD
    path('', views.OrganizationListView.as_view(), name='organization-list'),
    path('<uuid:org_id>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
    # User's organizations
    path('me/organizations/', views.MyOrganizationsView.as_view(), name='my-organizations'),
    
    # Join organization
    path('join/', views.JoinOrganizationView.as_view(), name='join-organization'),
    
    # Invite code management
    path('<uuid:org_id>/invite-code/', views.OrganizationInviteCodeView.as_view(), name='invite-code'),
    
    # Organization events
    path('<uuid:org_id>/events/', views.OrganizationEventsView.as_view(), name='organization-events'),
    path('<uuid:org_id>/events/<uuid:event_id>/', views.OrganizationEventDetailView.as_view(), name='organization-event-detail'),
    
    # Organization members
    path('<uuid:org_id>/members/', views.OrganizationMembersView.as_view(), name='organization-members'),
]