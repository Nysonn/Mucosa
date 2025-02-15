from collections import defaultdict
from rest_framework import viewsets
# filters
# from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import RoadmapItem, Job, Resource
from .serializers import (
        RoadmapItemSerializer,
        JobSerializer,
        ResourceSerializer
)


class RoadmapItemViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that returns roadmap items grouped by category.
    """
    queryset = RoadmapItem.objects.select_related('category').prefetch_related(
        'skills'
        ).all()
    serializer_class = RoadmapItemSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter,
    #                    filters.OrderingFilter]
    # filterset_fields = ['category__slug']
    # search_fields = ['title', 'description']
    # ordering_fields = ['created_at', 'title']
    # ordering = ['category__name', 'title']

    def list(self, request, *args, **kwargs):
        # Serialize all items
        serializer = self.get_serializer(self.get_queryset(), many=True)
        items = serializer.data

        # Group items by the category name
        grouped_data = {}
        for item in items:
            # Extract the category name from the serialized category field
            category_name = item['category']['name']
            # Remove the category field from the individual item as it's now the grouping key
            item.pop('category', None)
            if category_name in grouped_data:
                grouped_data[category_name].append(item)
            else:
                grouped_data[category_name] = [item]
        return Response(grouped_data)


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows job postings to be viewed.
    Supports search by title, company, and description.
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    pagination_class = None
    # filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # search_fields = ['title', 'company', 'description']
    # ordering_fields = ['created_at', 'title']
    # ordering = ['-created_at']


class ResourceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows career resources to be viewed.
    Supports search by title and description.
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    pagination_class = None
    # filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # search_fields = ['title', 'description']
    # ordering_fields = ['title']
    # ordering = ['title']
