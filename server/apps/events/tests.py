from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Event, Organizer
from datetime import date


class EventAPITestCase(APITestCase):
    def setUp(self):
        organizer = Organizer.objects.create(
            name="Test Organizer",
            avatar="https://example.com/avatar.jpg"
        )
        self.event = Event.objects.create(
            title="Test Event",
            date=date(2024, 3, 25),
            location="Test Location",
            description="Test Description",
            image="https://example.com/image.jpg",
            category="workshops",
            is_registration_open=True,
            organizer=organizer
        )

    def test_event_list(self):
        url = reverse('event-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
