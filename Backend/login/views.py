from django.shortcuts import render
from django.http import HttpResponse
from .models import TestEntry
from django.shortcuts import redirect
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .models import UserProfile

def create_test_data(request):
    # This creates a record in your Neon Postgres database
    new_item = TestEntry.objects.create(name="Team Test Entry")
    
    # Let's count how many we have now
    total_count = TestEntry.objects.count()
    
    return HttpResponse(f"Success! Saved '{new_item.name}' to the database. Total entries: {total_count}")


@api_view(['GET'])
@permission_classes([AllowAny])
def google_login(request):
    """
    Redirect to Google OAuth login
    This endpoint initiates the OAuth flow
    """
    # The frontend should redirect to this URL
    redirect_uri = f"{settings.ALLOWED_HOSTS[0]}/api/auth/google/callback/"
    return Response({
        'auth_url': f'/accounts/google/login/?next=/api/auth/google/callback/'
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def google_callback(request):
    """
    Handle the callback from Google OAuth
    This is called after user authenticates with Google
    """
    # After successful authentication, django-allauth handles the user creation
    # We just need to get or create a token and return user data
    
    if request.user.is_authenticated:
        # Get or create token for the user
        token, created = Token.objects.get_or_create(user=request.user)
        
        # Get user's social account data
        try:
            social_account = SocialAccount.objects.get(user=request.user, provider='google')
            extra_data = social_account.extra_data
            
            # Update user profile with Google data
            profile = request.user.profile
            profile.google_id = extra_data.get('id')
            profile.profile_picture = extra_data.get('picture')
            profile.save()
            
            # Update user's name if not set
            if not request.user.first_name:
                request.user.first_name = extra_data.get('given_name', '')
            if not request.user.last_name:
                request.user.last_name = extra_data.get('family_name', '')
            request.user.save()
            
        except SocialAccount.DoesNotExist:
            pass
        
        # Serialize user data
        serializer = UserSerializer(request.user)
        
        # Redirect to frontend with token
        frontend_url = 'http://localhost:5173'  # Change port if your React app uses different port
        return redirect(f'{frontend_url}/auth/callback?token={token.key}')
    
    else:
        frontend_url = 'http://localhost:5173'
        return redirect(f'{frontend_url}/auth/callback?error=authentication_failed')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    Get current authenticated user's data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout user by deleting their token
    """
    try:
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update user profile information
    """
    user = request.user
    profile = user.profile
    
    # Update user fields
    user.first_name = request.data.get('first_name', user.first_name)
    user.last_name = request.data.get('last_name', user.last_name)
    user.save()
    
    # Update profile fields
    profile.bio = request.data.get('bio', profile.bio)
    profile.location = request.data.get('location', profile.location)
    profile.save()
    
    serializer = UserSerializer(user)
    return Response(serializer.data)