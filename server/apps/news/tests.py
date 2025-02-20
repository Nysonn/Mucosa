from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import NewsAuthor, NewsArticle, Category


class NewsArticleAPITests(APITestCase):
    def setUp(self):
        # Create test category first
        self.category = Category.objects.create(
            name="General",
            slug="general"
        )
        
        self.author = NewsAuthor.objects.create(
            name="Test Author",
            avatar="https://example.com/avatar.jpg"
        )
        
        self.article = NewsArticle.objects.create(
            title="Test Article",
            excerpt="Test excerpt",
            content="Test content",
            category=self.category,
            image="https://example.com/image.jpg",
            author=self.author
        )

    def test_get_news_article_list(self):
        url = reverse('newsarticle-list')  # Using the DefaultRouter naming convention
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_article(self):
        url = reverse('newsarticle-list')
        data = {
            'title': 'New Test Article',
            'excerpt': 'New test excerpt',
            'content': 'New test content',
            'category': self.category.id,
            'image': 'https://example.com/new-image.jpg',
            'author': {
                'name': 'New Test Author',
                'avatar': 'https://example.com/new-avatar.jpg'
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
