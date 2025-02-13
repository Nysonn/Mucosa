from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer
# from rest_framework import viewsets, mixins


class EventListAPIView(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to list events. Supports filtering by category and searching
    by title/description.
    """
    queryset = Event.objects.select_related('organizer').all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'description']
