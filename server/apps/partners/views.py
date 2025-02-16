from rest_framework import viewsets
# filters
from .models import Partner
from .serializers import PartnerSerializer


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows partners to be viewed.
    """
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer
    pagination_class = None
    # filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # search_fields = ['name']
    # ordering_fields = ['name']
    # ordering = ['name']
