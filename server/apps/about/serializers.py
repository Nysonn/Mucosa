from rest_framework import serializers
from .models import TeamMember, SocialLink, ImpactMetric, ContactSubmission


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ('platform', 'link')


class TeamMemberSerializer(serializers.ModelSerializer):
    socials = SocialLinkSerializer(source="social_links", many=True, read_only=True)
    image = serializers.URLField(source="image_url")

    class Meta:
        model = TeamMember
        fields = ('id', 'name', 'role', 'image', 'bio', 'socials')


class ImpactMetricSerializer(serializers.ModelSerializer):

    icon = serializers.URLField(source="icon_url")
    number = serializers.SerializerMethodField()

    def get_number(self, obj):
        return str(obj.number)

    class Meta:
        model = ImpactMetric
        fields = ('number', 'label', 'icon')


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = (
            # 'id', 
            'name', 
            'email', 
            'subject', 
            'message', 
            'created_at'
            )
        read_only_fields = ('created_at',)
