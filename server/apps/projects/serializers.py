from rest_framework import serializers
from .models import Project, Category, Technology

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug')

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ('id', 'name', 'slug')

class ProjectSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id', 
            'title', 
            'description', 
            'image_url', 
            'link', 
            'category', 
            'technologies', 
            'created_at'
        )
