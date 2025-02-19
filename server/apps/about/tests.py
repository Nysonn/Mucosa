from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import TeamMember, ImpactMetric, ContactSubmission, SocialLink

class TeamMemberAPITest(APITestCase):
    def setUp(self):
        self.team_member = TeamMember.objects.create(
            name="John Doe",
            role="Developer",
            image_url="http://example.com/image.jpg",
            bio="A talented developer."
        )
        SocialLink.objects.create(
            team_member=self.team_member,
            platform="LinkedIn",
            link="https://linkedin.com/in/johndoe"
        )

    def test_team_member_list(self):
        url = reverse('team-member-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

class ImpactMetricAPITest(APITestCase):
    def setUp(self):
        self.metric = ImpactMetric.objects.create(
            number=100,
            label="Active Members",
            icon_url="http://example.com/icon.png"
        )

    def test_impact_metric_list(self):
        url = reverse('impact-metric-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

# class ContactSubmissionAPITest(APITestCase):
#     def test_create_contact_submission(self):
#         url = reverse('contact-submission-create')
#         data = {
#             "name": "Jane Doe",
#             "email": "jane@example.com",
#             "subject": "Test Message",
#             "message": "Hello, this is a test message."
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)


from django.core.mail import send_mail
from django.conf import settings

def send_test_email():
    send_mail(
        subject="Test Email from Django",
        message="This is a test email to confirm SMTP settings.",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.EMAIL_HOST_USER],  # Sending to yourself
        fail_silently=False,
    )

# You can call this function from a Django shell:
# python manage.py shell
# >>> from your_app_name.module import send_test_email
# >>> send_test_email()
