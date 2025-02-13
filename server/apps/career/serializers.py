from rest_framework import serializers
from .models import Skill, RoadmapCategory, RoadmapItem, Job, Resource

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('id', 'name', 'slug')

class RoadmapCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapCategory
        fields = ('id', 'name', 'slug')

class RoadmapItemSerializer(serializers.ModelSerializer):
    category = RoadmapCategorySerializer(read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = RoadmapItem
        fields = ('id', 'title', 'description', 'icon_url', 'category', 'skills', 'created_at')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('id', 'title', 'company', 'location', 'employment_type', 'description', 'requirements', 'link', 'created_at')

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ('id', 'title', 'description', 'link', 'icon_url', 'created_at')
