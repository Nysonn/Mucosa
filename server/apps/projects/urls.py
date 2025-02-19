from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import ProjectViewSet, CategoryViewSet, ProjectSubmissionEmailView

# Register the Project viewset with the router to automatically
# generate endpoints.
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'categories', CategoryViewSet, basename='category')  # New registration


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
    patterns=router.urls,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    *router.urls,  # Include all routes from the router
    # Swagger UI documentation endpoint
    # path('all-data/', ProjectViewSet.as_view(),name='projects-data'),
    path('submit-project/', ProjectSubmissionEmailView.as_view(), name='submit-project'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # ReDoc documentation endpoint
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
