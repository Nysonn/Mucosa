from django.db import models
from django.utils.text import slugify


class Partner(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    logo = models.URLField(max_length=500, blank=True)
    website = models.URLField(max_length=500)

    class Meta:
        ordering = ['name']
        verbose_name = "Partner"
        verbose_name_plural = "Partners"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
