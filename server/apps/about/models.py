from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=255, db_index=True)
    role = models.CharField(max_length=255)
    image_url = models.URLField(max_length=500)
    bio = models.TextField()

    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"

    def __str__(self):
        return self.name


class SocialLink(models.Model):
    team_member = models.ForeignKey(
        TeamMember,
        on_delete=models.CASCADE,
        related_name='social_links'
    )
    # A flexible platform field that is not limited by fixed choices.
    platform = models.CharField(max_length=100, db_index=True)
    link = models.URLField(max_length=500)

    class Meta:
        indexes = [
            models.Index(fields=['platform']),
            models.Index(fields=['team_member', 'platform']),
        ]
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.team_member.name} - {self.platform}"


class ImpactMetric(models.Model):
    number = models.PositiveIntegerField()
    label = models.CharField(max_length=255, db_index=True)
    icon_url = models.URLField(max_length=500)

    class Meta:
        indexes = [
            models.Index(fields=['label']),
        ]
        verbose_name = "Impact Metric"
        verbose_name_plural = "Impact Metrics"

    def __str__(self):
        return self.label


class ContactSubmission(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['created_at']),
        ]
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self):
        return f"Submission from {self.name} ({self.email})"
