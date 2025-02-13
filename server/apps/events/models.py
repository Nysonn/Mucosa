from django.db import models

class Organizer(models.Model):
    name = models.CharField(max_length=255)
    # Assuming an external URL for the avatar image; adjust to ImageField if you store files.
    avatar = models.URLField(max_length=500)

    def __str__(self):
        return self.name


class Event(models.Model):
    # Fixed category choices. You can expand or override these as needed.
    CATEGORY_CHOICES = [
        ('workshops', 'Workshops'),
        ('seminars', 'Seminars'),
        ('hackathons', 'Hackathons'),
        ('meetups', 'Meetups'),
        ('conferences', 'Conferences'),
        ('competitions', 'Competitions'),
        ('expos', 'Expos'),
    ]
    
    title = models.CharField(max_length=255)
    # Store full date; the serializer will extract month and day for frontend display.
    date = models.DateField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    # Using URLField here for image URLs; change to ImageField if using Django media.
    image = models.URLField(max_length=500)
    # Use choices for standard categories. Allow blank so non-standard values can be added.
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True)
    is_registration_open = models.BooleanField(default=False)
    organizer = models.ForeignKey(Organizer, related_name='events', on_delete=models.CASCADE)
    
    # Timestamps for record keeping.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['date']),
        ]
        ordering = ['-date']

    def __str__(self):
        return self.title
