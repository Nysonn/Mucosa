from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import RoadmapItemViewSet, JobViewSet, ResourceViewSet

# Create a router and register our viewsets for automatic URL routing
router = DefaultRouter()
router.register(r'roadmap', RoadmapItemViewSet, basename='roadmap')
router.register(r'jobs', JobViewSet, basename='jobs')
router.register(r'resources', ResourceViewSet, basename='resources')

# Configure Swagger/OpenAPI documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Career API",
        default_version='v1',
        description="API documentation for the Career app endpoints. This includes roadmap items, job postings, and career resources.",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # path('api/', include(router.urls)),
    # Swagger UI documentation endpoint
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # ReDoc documentation endpoint
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
