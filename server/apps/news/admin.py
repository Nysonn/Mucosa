from django.contrib import admin
from .models import NewsAuthor, Category, NewsArticle
from .forms import NewsArticleForm


@admin.register(NewsAuthor)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'avatar')
    search_fields = ('name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {
        'slug': 
            ('name',)
            }
    list_display = ('name', 'slug')


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    form = NewsArticleForm  # Used our custom form!
    list_display = ('title', 'category', 'author', 'published_date', 'deleted_at', 'deleted')
    list_filter = ('category', 'author', 'published_date', 'deleted')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('deleted_at', 'deleted')
