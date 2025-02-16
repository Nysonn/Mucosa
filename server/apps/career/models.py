from django.db import models
from django.utils.text import slugify


# Skill used in Roadmap items
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        ordering = ['name']
        verbose_name_plural = "Skills"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# Dynamic category for Career Roadmap
class RoadmapCategory(models.Model):
    name = models.CharField(max_length=100, unique=True, db_index=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        ordering = ['name']
        verbose_name = "Roadmap Category"
        verbose_name_plural = "Roadmap Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


# Individual roadmap item with skills
class RoadmapItem(models.Model):
    category = models.ForeignKey(
        RoadmapCategory,
        on_delete=models.CASCADE,
        related_name='items'
    )
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    icon_url = models.URLField(max_length=500)
    skills = models.ManyToManyField(Skill,
                                    related_name='roadmap_items',
                                    blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'title']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['category']),
        ]
        verbose_name = "Roadmap Item"
        verbose_name_plural = "Roadmap Items"

    def __str__(self):
        return self.title


# Job opportunities posted on the Career page
EMPLOYMENT_TYPE_CHOICES = (
    ('full_time', 'Full-time'),
    ('part_time', 'Part-time'),
    ('contract', 'Contract'),
    ('internship', 'Internship'),
)


class Job(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=50, choices=EMPLOYMENT_TYPE_CHOICES, default='full_time')
    description = models.TextField()
    # Using JSONField to store list of requirements (PostgreSQL JSON field)
    requirements = models.JSONField(default=list, blank=True)
    link = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['company']),
        ]
        verbose_name = "Job"
        verbose_name_plural = "Jobs"

    def __str__(self):
        return f"{self.title} at {self.company}"


# Career resources (courses, bootcamps, guides, etc.)
class Resource(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    description = models.TextField()
    link = models.URLField(max_length=500)
    icon_url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']
        indexes = [
            models.Index(fields=['title']),
        ]
        verbose_name = "Resource"
        verbose_name_plural = "Resources"

    def __str__(self):
        return self.title
