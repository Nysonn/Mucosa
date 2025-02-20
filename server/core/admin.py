from django.contrib.admin import AdminSite
from django.contrib import admin


# Import models
from apps.news.models import NewsAuthor, Category, NewsArticle
from apps.projects.models import Project, Category as ProjectCategory, Technology
from apps.career.models import Skill, RoadmapCategory, RoadmapItem, Job, Resource
from apps.about.models import TeamMember, ImpactMetric
from apps.partners.models import Partner
from apps.events.models import Event


# Import custom admin classes
from apps.career.admin import JobAdmin, SkillAdmin, RoadmapCategoryAdmin, RoadmapItemAdmin, ResourceAdmin
from apps.projects.admin import CategoryAdmin as ProjectCategoryAdmin, TechnologyAdmin, ProjectAdmin
from apps.news.admin import CategoryAdmin as NewsCategoryAdmin, AuthorAdmin, NewsArticleAdmin
from apps.about.admin import TeamMemberAdmin, ImpactMetricAdmin
from apps.partners.admin import PartnerAdmin
from apps.events.admin import EventAdmin


class DevCareerAdminSite(AdminSite):
    site_header = 'Mucosa Administration'
    site_title = 'Mucosa Admin'
    index_title = 'Mucosa Site Administration'


admin_site = DevCareerAdminSite(name='mucosa_admin')

# Register all models with the custom admin site
admin_site.register(TeamMember, TeamMemberAdmin)
admin_site.register(Job, JobAdmin)
admin_site.register(ProjectCategory, ProjectCategoryAdmin)
admin_site.register(Category, NewsCategoryAdmin)
admin_site.register(Partner, PartnerAdmin)
admin_site.register(ImpactMetric, ImpactMetricAdmin)
admin_site.register(Skill, SkillAdmin)
admin_site.register(RoadmapCategory, RoadmapCategoryAdmin)
admin_site.register(RoadmapItem, RoadmapItemAdmin)
admin_site.register(Resource, ResourceAdmin)
admin_site.register(Event, EventAdmin)
admin_site.register(NewsAuthor, AuthorAdmin)
admin_site.register(NewsArticle, NewsArticleAdmin)
admin_site.register(Technology, TechnologyAdmin)
admin_site.register(Project, ProjectAdmin)

