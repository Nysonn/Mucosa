from rest_framework import serializers
from .models import NewsArticle, Author, Category


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = [
            # 'id',
            'username',
            # 'email',
            'avatar',
            # 'role'
            ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            # 'id',
            'name',
            # 'slug'
            ]


class NewsArticleSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
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

    def get_author(self, obj):
        # Return a simple dict with just name and avatar.
        return {
            'name': obj.author.username,  # or obj.author.first_name if preferred
            'avatar': obj.author.avatar
        }
    
    # def get_category(self, obj):
    #     # Return the category name (or None if category is null)
    #     return obj.category.name if obj.category else None

    def get_date(self, obj):
        # Format the published_date (e.g., "March 15, 2024")
        return obj.published_date.strftime("%B %d, %Y")


class NewsArticleDetailSerializer(NewsArticleSerializer):
    class Meta(NewsArticleSerializer.Meta):
        # Include all fields from list plus 'content'
        fields = NewsArticleSerializer.Meta.fields + ['content']
