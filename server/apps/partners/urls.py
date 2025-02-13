from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PartnerViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

router = DefaultRouter()
router.register(r'partners', PartnerViewSet, basename='partners')


schema_view = get_schema_view(
   openapi.Info(
      title="Partners API",
      default_version='v1',
      description="API documentation for the partners app",
      terms_of_service="https://www.example.com/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   patterns=router.urls,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
   *router.urls,
   # Swagger UI documentation
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
