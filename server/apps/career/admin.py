from django.contrib import admin
from .models import Skill, RoadmapCategory, RoadmapItem, Job, Resource

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)

@admin.register(RoadmapCategory)
class RoadmapCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ('name',)

@admin.register(RoadmapItem)
class RoadmapItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('title', 'description')
    filter_horizontal = ('skills',)
    date_hierarchy = 'created_at'

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'employment_type', 'created_at')
    list_filter = ('employment_type', 'company')
    search_fields = ('title', 'company', 'description')
    date_hierarchy = 'created_at'

@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'
