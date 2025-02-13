from rest_framework import serializers
from .models import TeamMember, SocialLink, ImpactMetric, ContactSubmission

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ('platform', 'link')

class TeamMemberSerializer(serializers.ModelSerializer):
    social_links = SocialLinkSerializer(many=True, read_only=True)

    class Meta:
        model = TeamMember
        fields = ('id', 'name', 'role', 'image_url', 'bio', 'social_links')

class ImpactMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactMetric
        fields = ('id', 'number', 'label', 'icon_url')

class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ('id', 'name', 'email', 'subject', 'message', 'created_at')
        read_only_fields = ('created_at',)
