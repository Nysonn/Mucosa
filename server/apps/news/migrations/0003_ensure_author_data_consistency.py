from django.db import migrations

def forward_func(apps, schema_editor):
    NewsArticle = apps.get_model('news', 'NewsArticle')
    NewsAuthor = apps.get_model('news', 'NewsAuthor')
    
    # Get all unique author names from articles
    author_names = NewsArticle.objects.values_list('author__name', flat=True).distinct()
    
    # Create any missing authors
    for name in author_names:
        if name:  # Skip None values
            NewsAuthor.objects.get_or_create(name=name)
    
    # Update any articles with missing authors to use a default author
    default_author, _ = NewsAuthor.objects.get_or_create(
        name="Unknown Author",
        defaults={'avatar': None}
    )
    NewsArticle.objects.filter(author__isnull=True).update(author=default_author)

def reverse_func(apps, schema_editor):
    # No reverse migration needed
    pass

class Migration(migrations.Migration):
    dependencies = [
        ('news', '0002_newsauthor_alter_newsarticle_author_delete_author'),
    ]

    operations = [
        migrations.RunPython(forward_func, reverse_func),
    ] 