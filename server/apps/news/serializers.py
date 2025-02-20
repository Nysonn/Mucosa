from rest_framework import serializers
from .models import NewsArticle, NewsAuthor, Category


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsAuthor
        fields = ['name', 'avatar']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            # 'id',
            'name',
            # 'slug'
            ]


class NewsArticleSerializer(serializers.ModelSerializer):
    author = AuthorSerializer()
    category = serializers.SlugRelatedField(read_only=True, slug_field='name')
    date = serializers.SerializerMethodField(source='published_date')

    class Meta:
        model = NewsArticle
        fields = [
            'id',
            'title',
            # 'slug',
            'excerpt',
            # 'content',
            'date',
            'image',
            # 'image_caption',
            # 'image_credit',
            'author',
            'category',
            # 'created_at',
            # 'updated_at',
            # 'deleted_at',
            # 'deleted',
        ]
        read_only_fields = ('deleted_at', 'deleted')

    # def get_author(self, obj):
    #     # Return a simple dict with just name and avatar.
    #     return {
    #         'name': obj.author.username,  # or obj.author.first_name if preferred
    #         'avatar': obj.author.avatar
    #     }
    
    # def create(self, validated_data):
    #     # Pop the nested author data from the input.
    #     author_data = validated_data.pop('author')
        # Optionally, if you want to reuse an existing author (if any) based on username:
        # author, created = Author.objects.get_or_create(
        #     username=author_data['username'],
        #     defaults=author_data
        # )
        # Create the article with the provided author.
        # news_article = NewsArticle.objects.create(author=author, **validated_data)
        # return news_article
    
    # def get_category(self, obj):
    #     # Return the category name (or None if category is null)
    #     return obj.category.name if obj.category else None
    
    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author, created = NewsAuthor.objects.get_or_create(name=author_data.get('name'), defaults=author_data)
        news_article = NewsArticle.objects.create(author=author, **validated_data)
        return news_article

    def get_date(self, obj):
        # Format the published_date (e.g., "March 15, 2024")
        return obj.published_date.strftime("%B %d, %Y")


class NewsArticleDetailSerializer(NewsArticleSerializer):
    class Meta(NewsArticleSerializer.Meta):
        # Include all fields from list plus 'content'
        fields = NewsArticleSerializer.Meta.fields + ['content']
