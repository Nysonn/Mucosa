from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, Category
from .serializers import ProjectSerializer, CategorySerializer
from rest_framework.response import Response


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides the standard read-only actions
    to retrieve projects. It supports filtering by category (via the category slug),
    full-text search on title and description, and ordering.
    """
    queryset = Project.objects.select_related('category').prefetch_related('technologies').all()
    pagination_class = None
    serializer_class = ProjectSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    # filterset_fields = ['category__slug']
    # search_fields = ['title', 'description']
    # ordering_fields = ['created_at', 'title']
    # ordering = ['-created_at']


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that lists unique category names.
    It uses the CategorySerializer to serialize the category objects,
    then extracts only the 'name' field so the frontend receives a simple list of strings.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(projects__isnull=False).order_by('name').distinct()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Extract only the 'name' field from each serialized object.
        category_names = [item['name'] for item in serializer.data]
        return Response(category_names)
