from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import RoadmapItem, Job, Resource
from .serializers import RoadmapItemSerializer, JobSerializer, ResourceSerializer

class RoadmapItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows roadmap items to be viewed.
    Supports filtering by category slug, search by title/description, and ordering.
    """
    queryset = RoadmapItem.objects.select_related('category').prefetch_related('skills').all()
    serializer_class = RoadmapItemSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']
    ordering = ['category__name', 'title']

class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows job postings to be viewed.
    Supports search by title, company, and description.
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'company', 'description']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows career resources to be viewed.
    Supports search by title and description.
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['title']
    ordering = ['title']
