from rest_framework import serializers
from .models import Skill, RoadmapCategory, RoadmapItem, Job, Resource


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'slug')


class RoadmapCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = RoadmapCategory
        fields = (
            'id',
            'name',
            'slug'
            )


class RoadmapItemSerializer(serializers.ModelSerializer):
    category = RoadmapCategorySerializer(read_only=True)

    icon = serializers.URLField(source='icon_url')

    # skills = SkillSerializer(many=True, read_only=True)
    skills = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = RoadmapItem
        fields = (
            # "id",
            "title",
            "description",
            "icon",
            "category",
            "skills",
            # "created_at",
        )


class JobSerializer(serializers.ModelSerializer):
    type = serializers.CharField(source='employment_type')
    
    class Meta:
        model = Job
        fields = (
            # 'id',
            'title',
            'company',
            'location',
            'type',
            'description',
            'requirements',
            'link',
            # 'created_at',
            )


class ResourceSerializer(serializers.ModelSerializer):
    icon = serializers.URLField(source='icon_url')

    class Meta:
        model = Resource
        fields = (
            # 'id',
            'title',
            'description',
            'icon',
            'link',
            # 'created_at'
            )
