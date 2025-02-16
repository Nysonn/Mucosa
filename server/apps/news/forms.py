# from django import forms
# from .models import NewsArticle


# class NewsArticleForm(forms.ModelForm):
#     class Meta:
#         model = NewsArticle
#         fields = ['title', 'excerpt', 'content', 'category', 'published_date',
#                   'image', 'author']

#     def clean_title(self):
#         title = self.cleaned_data['title']
#         if len(title) < 10:
#             raise forms.ValidationError(
#                 "Title must be at least 5 characters long")
#         return title



from django import forms
from .models import NewsArticle, Author

class NewsArticleForm(forms.ModelForm):
    # New fields to let the admin enter author details
    author_username = forms.CharField(
        max_length=150,
        label="Author Username",
        help_text="Enter the username for the news article's author."
    )
    author_avatar = forms.URLField(
        required=False,
        label="Author Avatar",
        help_text="Enter the URL for the author’s avatar."
    )

    class Meta:
        model = NewsArticle
        # Exclude the 'author' field from the default fields.
        fields = [
            'title', 'slug', 'excerpt', 'content', 'category', 'published_date', 'image',
            'author_username', 'author_avatar'
        ]

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 10:
            raise forms.ValidationError("Title must be at least 5 characters long")
        return title

    def save(self, commit=True):
        # Create the NewsArticle instance without saving yet.
        instance = super().save(commit=False)
        # Retrieve the input for the new author.
        username = self.cleaned_data.get('author_username')
        avatar = self.cleaned_data.get('author_avatar')
        # Create a new Author instance using the provided username and avatar.
        # (This always creates a new Author rather than reusing any logged-in user.)
        author = Author.objects.create(username=username, avatar=avatar)
        instance.author = author
        if commit:
            instance.save()
        return instance
