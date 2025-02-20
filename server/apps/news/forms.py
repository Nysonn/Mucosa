from django import forms
from .models import NewsArticle, NewsAuthor

class NewsArticleForm(forms.ModelForm):
    author_name = forms.CharField(
        max_length=150,
        label="Author Name",
        help_text="Enter the name for the news article's author."
    )
    author_avatar = forms.URLField(
        required=False,
        label="Author Avatar",
        help_text="Enter the URL for the author’s avatar."
    )

    class Meta:
        model = NewsArticle
        fields = [
            'title', 'slug', 'excerpt', 'content', 'category',
            'published_date', 'image', 'author_name', 'author_avatar'
        ]

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 10:
            raise forms.ValidationError("Title must be at least 10 characters long")
        return title

    def save(self, commit=True):
        instance = super().save(commit=False)
        name = self.cleaned_data.get('author_name')
        avatar = self.cleaned_data.get('author_avatar')
        # Get or create an Author with the provided name.
        author, created = NewsAuthor.objects.get_or_create(name=name, defaults={'avatar': avatar})
        instance.author = author
        if commit:
            instance.save()
        return instance
