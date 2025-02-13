from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides the standard read-only actions
    to retrieve projects. It supports filtering by category (via the category slug),
    full-text search on title and description, and ordering.
    """
    queryset = Project.objects.select_related('category').prefetch_related('technologies').all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']
