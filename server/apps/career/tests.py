from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import RoadmapCategory, RoadmapItem, Job, Resource, Skill


class RoadmapItemAPITest(APITestCase):
    def setUp(self):
        self.category = RoadmapCategory.objects.create(
                                        name="Software Development"
                                                        )
        self.skill = Skill.objects.create(name="React")
        self.roadmap_item = RoadmapItem.objects.create(
            category=self.category,
            title="Frontend Developer",
            description="Learn HTML, CSS, and JavaScript.",
            icon_url="http://example.com/icon.png"
        )
        self.roadmap_item.skills.add(self.skill)

    def test_get_roadmap_items(self):
        url = reverse('roadmap-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)


class JobAPITest(APITestCase):
    def setUp(self):
        self.job = Job.objects.create(
            title="Junior Developer",
            company="Tech Corp",
            location="Kampala, Uganda",
            employment_type="full_time",
            description="Job description here",
            requirements=["Bachelor's degree"],
            link="http://example.com/apply"
        )

    def test_get_jobs(self):
        url = reverse('jobs-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)


class ResourceAPITest(APITestCase):
    def setUp(self):
        self.resource = Resource.objects.create(
            title="Free Coding Bootcamp",
            description="Learn to code online",
            link="http://example.com/bootcamp",
            icon_url="http://example.com/icon.png"
        )

    def test_get_resources(self):
        url = reverse('resources-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)
