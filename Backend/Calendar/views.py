from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer, UserCreateSerializer

def index(request):
    return HttpResponse("Hello World. You're at the polls index.")

# API Views using Django REST Framework
class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for User model providing CRUD operations.
    
    Provides:
    - GET /api/users/ - List all users
    - POST /api/users/ - Create a new user
    - GET /api/users/{id}/ - Retrieve a specific user
    - PUT /api/users/{id}/ - Update a user (full update)
    - PATCH /api/users/{id}/ - Partial update a user
    - DELETE /api/users/{id}/ - Delete a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_serializer_class(self):
        """
        Return the serializer class based on the action.
        """
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Create a new user.
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response_serializer = UserSerializer(user)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        """
        Custom action to get the 5 most recently created users.
        Access via: GET /api/users/recent/
        """
        recent_users = User.objects.all().order_by('-created_at')[:5]
        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        """
        Custom action to duplicate a user.
        Access via: POST /api/users/{id}/duplicate/
        """
        user = self.get_object()
        new_user = User.objects.create(
            name=f"{user.name} (Copy)",
            description=user.description
        )
        serializer = self.get_serializer(new_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
