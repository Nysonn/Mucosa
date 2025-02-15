from rest_framework import serializers
from .models import Project, Category, Technology


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            # 'id',
            'name'.lower(),
            # 'slug'
            )


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = (
            # 'id',
            'name'.lower(),
            # 'slug'
            )


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

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        return {
            "title": rep["title"],
            "description": rep["description"],
            "image": rep["image_url"],  # rename image_url to image
            "category": rep["category"]["name"] if rep["category"] else None,
            "link": rep["link"],
            "tech": [tech["name"] for tech in rep["technologies"]],
        }
