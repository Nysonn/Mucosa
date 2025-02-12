from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import (
    TeamMemberListAPIView,
    ImpactMetricListAPIView,
    ContactSubmissionCreateAPIView
)

    # About API endpoints
router = DefaultRouter()
router.register(r'team', TeamMemberListAPIView.as_view(), basename='team-member-list'),
router.register(r'impact', ImpactMetricListAPIView.as_view(), basename='impact-metric-list'),
router.register(r'contact', ContactSubmissionCreateAPIView.as_view(), basename='contact-submission-create'),
    

schema_view = get_schema_view(
    openapi.Info(
        title="About API",
        default_version='v1',
        description="Comprehensive API documentation for the About page endpoints. "
                    "This includes endpoints for team members, impact metrics, and secure contact submissions.",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [

    # Swagger UI documentation endpoint
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # ReDoc documentation endpoint for an alternative view
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
