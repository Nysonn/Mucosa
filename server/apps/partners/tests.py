from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Partner


class PartnerAPITests(APITestCase):
    def setUp(self):
        # Create sample partners for testing
        self.partner1 = Partner.objects.create(
            name="Test Partner One",
            logo="https://example.com/logo1.png",
            website="https://example.com"
        )
        self.partner2 = Partner.objects.create(
            name="Test Partner Two",
            logo="https://example.com/logo2.png",
            website="https://example.org"
        )

    def test_list_partners(self):
        """
        Ensure we can retrieve a list of partners.
        """
        url = reverse('partners-list')  # 'partners-list' comes from the router's naming convention.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Check that the correct number of partners are returned
        self.assertEqual(len(response.data), 2)

    def test_search_partner(self):
        """
        Ensure search by partner name works.
        """
        url = reverse('partners-list')
        response = self.client.get(url, {'search': 'One'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Only one partner should match the search query "One"
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], self.partner1.name)
