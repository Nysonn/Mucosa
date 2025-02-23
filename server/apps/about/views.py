from rest_framework import status
from django.core.mail import send_mail
from rest_framework import permissions
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from .models import TeamMember, ImpactMetric, ContactSubmission
from .serializers import (
    TeamMemberSerializer,
    ImpactMetricSerializer,
    ContactSubmissionSerializer
)
from django.conf import settings


# List API view for team members – used prefetch_related to optimize social
# links retrieval.
class TeamMemberListAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all().prefetch_related('social_links')
    serializer_class = TeamMemberSerializer

    # Overriding the list method to return a custom response.
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# List API view for impact metrics.
class ImpactMetricListAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = ImpactMetric.objects.all()
    serializer_class = ImpactMetricSerializer

    # Overriding the list method to return a custom response.
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Create API view for contact submissions.
# This endpoint is POST-only and prevents any editing via the API.
class ContactSubmissionCreateAPIView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    POST-only endpoint to handle contact submissions.
    It sends the sender’s message to the admin and then sends an acknowledgment email from a noreply address.
    """
    # queryset = ContactSubmission.objects.all()  # Uncomment and set your queryset if needed.
    permission_classes = [permissions.AllowAny]
    serializer_class = ContactSubmissionSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'detail': 'Your message has been sent.'}, status=status.HTTP_201_CREATED)
    
    def perform_create(self, serializer):
        data = serializer.validated_data
        subject = data.get('subject', 'No Subject')
        sender_email = data.get('email')
        name = data.get('name')
        # Compose the email message for the admin.
        message = (
            f"Name: {name}\n"
            f"Email: {sender_email}\n"
            f"Message:\n{data.get('message')}"
        )
        recipient_list = [settings.EMAIL_HOST_USER]
        
        # Send the email to the admin using the sender’s email as the from address.
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=sender_email,
                recipient_list=recipient_list,
                fail_silently=False
            )
        except Exception as e:
            raise e

        # Compose the acknowledgment email to the sender.
        ack_subject = "Thank you for contacting us!"
        ack_message = (
            f"Dear {name},\n\n"
            "Thank you for reaching out. We have received your message and our team will get back to you as soon as possible. "
            "If you have any further questions, please feel free to reply to this email.\n\n"
            "Best regards,\nThe Team"
        )
        noreply_email = getattr(settings, "NOREPLY_EMAIL", "noreply@example.com")
        try:
            send_mail(
                subject=ack_subject,
                message=ack_message,
                from_email=noreply_email,
                recipient_list=[sender_email],
                fail_silently=False
            )
        except Exception as ack_e:
            # Optionally log the error.
            pass