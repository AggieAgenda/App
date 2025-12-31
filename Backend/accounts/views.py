from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

from .serializers import UserSerializer

User = get_user_model()

from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class PatchedOAuth2Client(OAuth2Client):
    def __init__(self, *args, **kwargs):
        # dj-rest-auth may pass scope_delimiter but your allauth OAuth2Client signature
        # conflicts; safest is to remove it and let allauth handle defaults.
        kwargs.pop("scope_delimiter", None)
        super().__init__(*args, **kwargs)



@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    """
    Register user with email + password.
    Returns Token + user.
    """
    from django.conf import settings
    print("DEBUG:", settings.DEBUG)
    try:
        email = request.data.get("email")
        password = request.data.get("password")
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")

        if not email or not password:
            return Response(
                {"success": False, "error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"success": False, "error": "A user with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create user (username auto-filled in save())
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {
                "success": True,
                "token": token.key,
                "user": UserSerializer(user).data,
                "message": "Account created successfully",
            },
            status=status.HTTP_201_CREATED,
        )

    except Exception as e:
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_with_email(request):
    """
    Login with email + password.
    Returns Token + user.
    """
    try:
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"success": False, "error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Since USERNAME_FIELD=email, authenticate expects username=email
        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response(
                {"success": False, "error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response(
            {"success": True, "token": token.key, "user": UserSerializer(user).data},
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    """
    Return the current authenticated user.
    """
    return Response({"success": True, "user": UserSerializer(request.user).data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout by deleting token.
    """
    try:
        request.user.auth_token.delete()
        return Response({"success": True, "message": "Successfully logged out."})
    except Exception as e:
        return Response(
            {"success": False, "error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update user profile fields (and basic name fields).
    """
    user = request.user

    user.first_name = request.data.get("first_name", user.first_name)
    user.last_name = request.data.get("last_name", user.last_name)
    user.profile_picture = request.data.get("profile_picture", user.profile_picture)
    user.bio = request.data.get("bio", user.bio)
    user.location = request.data.get("location", user.location)

    user.save()
    return Response({"success": True, "user": UserSerializer(user).data})
class GoogleCodeLogin(SocialLoginView):
    permission_classes = [AllowAny]  # ✅ THIS is what you want
    adapter_class = GoogleOAuth2Adapter
    client_class = PatchedOAuth2Client
    callback_url = settings.FRONTEND_URL+"/auth/callback"
    print(callback_url)

    def get_response(self):
        user = self.user
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "success": True,
            "token": token.key,
            "user": UserSerializer(user).data,
        })


    