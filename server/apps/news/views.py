from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework import viewsets
# filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from django_filters.rest_framework import DjangoFilterBackend
from .models import NewsArticle
from .serializers import NewsArticleSerializer, NewsArticleDetailSerializer


@method_decorator(cache_page(60 * 15), name='dispatch')
class NewsArticleViewSet(viewsets.ModelViewSet):

    lookup_field = 'title'
    lookup_url_kwarg = 'newsTitle'

    queryset = NewsArticle.objects.published().select_related('author', 'category')
    pagination_class = None
    serializer_class = NewsArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    # filter_backends = [DjangoFilterBackend, filters.SearchFilter,
    #                    filters.OrderingFilter]
    # filterset_fields = ['category__slug', 'author__username']
    # search_fields = ['title', 'excerpt', 'content']
    # ordering_fields = ['published_date', 'title']

    def get_serializer_class(self):
        if self.action == "retrieve":
            return NewsArticleDetailSerializer
        return NewsArticleSerializer

    # def perform_create(self, serializer):
    #     # Automatically set the article's author as the logged-in user
    #     serializer.save(author=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save()  # Now uses the author data from the request payload.
