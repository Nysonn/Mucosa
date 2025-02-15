from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer
from rest_framework.response import Response
# from rest_framework import viewsets, mixins
from rest_framework.views import APIView


class EventListAPIView(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint to list events. Supports filtering by category and searching
    by title/description.
    """
    queryset = Event.objects.select_related(
        # 'organizer'
        ).all()
    pagination_class = None
    serializer_class = EventSerializer
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    # filterset_fields = ['category']
    # search_fields = ['title', 'description']
    
    
class CategoryListAPIView(APIView):
    """
    API endpoint to list event categories as a simple array of strings.
    """
    def get(self, request):
            # Query the Event table for distinct non-empty category values.
        distinct_categories = Event.objects.exclude(category="").values_list('category', flat=True).distinct()
        categories = list(distinct_categories)
        return Response(categories)
