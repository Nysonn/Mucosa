# from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import EventListAPIView, CategoryListAPIView



router = DefaultRouter()
router.register(r'events', EventListAPIView, basename='event-list'),
# router.register(r'categories', CategoryListAPIView, basename='category-list')


schema_view = get_schema_view(
   openapi.Info(
      title="Events API",
      default_version='v1',
      description="API documentation for the Events service.",
   ),
   public=True,
   patterns=router.urls,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   *router.urls,  # Include all routes from the router
   path('categories/', CategoryListAPIView.as_view(), name='category-list'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
