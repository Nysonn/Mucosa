from django.contrib import admin
from django.forms import CharField, Textarea
from .models import Skill, RoadmapCategory, RoadmapItem, Job, Resource
from django.forms import Textarea


class CommaSeparatedWidget(Textarea):
    def format_value(self, value):
        if isinstance(value, list):
            return ", ".join(value)
        return super().format_value(value)

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
    list_display = ('title',
                    'company',
                    'location',
                    'employment_type',
                    'created_at')
    list_filter = ('employment_type',
                   'company')
    search_fields = ('title',
                     'company',
                     'description')
    date_hierarchy = 'created_at'
    
    # def get_form(self, request, obj=None, **kwargs):
    #     """
    #     Override the default form to replace the widget for the JSONField
    #     with a plain Textarea that accepts a comma-separated string.
    #     """
    #     form = super().get_form(request, obj, **kwargs)
    #     # Replace the 'requirements' field with a CharField widget
    #     form.base_fields['requirements'] = CharField(
    #         required=False,
    #         widget=Textarea(attrs={
    #             'placeholder': "Enter comma-separated requirements (e.g., Bachelor's degree, JavaScript, Problem-solving)"
    #         })
    #     )
    #             # If the object exists and has a list of requirements, convert it to a string
    #     if obj and obj.requirements:
    #         form.initial['requirements'] = ", ".join(obj.requirements)
    #     return form
    
    # def save_model(self, request, obj, form, change):
    #     """
    #     Convert the comma-separated string input into a list for JSONField storage.
    #     """
    #     req_input = form.cleaned_data.get('requirements', '')
    #     if isinstance(req_input, str):
    #         obj.requirements = [r.strip() for r in req_input.split(',') if r.strip()]
    #     super().save_model(request, obj, form, change)
    
    def formfield_for_dbfield(self, db_field, request, **kwargs):
        # Override the form field for the JSONField "requirements" with a CharField.
        if db_field.name == 'requirements':
            return CharField(
                required=False,
                widget=CommaSeparatedWidget(attrs={
                    'placeholder': "Enter comma-separated requirements (e.g., Bachelor's degree, JavaScript, Problem-solving)"
                })
            )
        return super().formfield_for_dbfield(db_field, request, **kwargs)
    
    def save_model(self, request, obj, form, change):
        """
        Convert the comma-separated string input into a list for JSONField storage.
        """
        req_input = form.cleaned_data.get('requirements', '')
        if isinstance(req_input, str):
            obj.requirements = [r.strip() for r in req_input.split(',') if r.strip()]
        super().save_model(request, obj, form, change)



@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'
