from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import ProjectViewSet

# Register the Project viewset with the router to automatically generate endpoints.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

schema_view = get_schema_view(
    openapi.Info(
        title="Projects API",
        default_version='v1',
        description="API documentation for the Projects endpoints. This includes retrieval of community projects with their categories and technologies.",
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
