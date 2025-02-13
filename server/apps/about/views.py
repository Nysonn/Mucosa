# from rest_framework import generics
from rest_framework import viewsets, mixins
from .models import TeamMember, ImpactMetric, ContactSubmission
from .serializers import (
    TeamMemberSerializer,
    ImpactMetricSerializer,
    ContactSubmissionSerializer
)


# List API view for team members – uses prefetch_related to optimize social
# links retrieval.
class TeamMemberListAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all().prefetch_related('social_links')
    serializer_class = TeamMemberSerializer


# List API view for impact metrics.
class ImpactMetricListAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = ImpactMetric.objects.all()
    serializer_class = ImpactMetricSerializer


# Create API view for contact submissions.
# This endpoint is POST-only and prevents any editing via the API.
class ContactSubmissionCreateAPIView(mixins.CreateModelMixin,
                                     viewsets.GenericViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def perform_create(self, serializer):
        # Django ORM’s parameterized queries safeguard against SQL injection.
        serializer.save()
