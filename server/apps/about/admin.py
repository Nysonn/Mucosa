from django.contrib import admin
from .models import TeamMember, SocialLink, ImpactMetric, ContactSubmission


class SocialLinkInline(admin.TabularInline):
    model = SocialLink
    extra = 1


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role')
    search_fields = ('name', 'role')
    inlines = [SocialLinkInline]


@admin.register(ImpactMetric)
class ImpactMetricAdmin(admin.ModelAdmin):
    list_display = ('label', 'number')

# Commented this to ignore storing the contact form.
# @admin.register(ContactSubmission)
# class ContactSubmissionAdmin(admin.ModelAdmin):
#     list_display = ('name', 'email', 'subject', 'created_at')
#     readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

#     def has_change_permission(self, request, obj=None):
#         # Disable editing of contact submissions – they are created via the
#         # frontend.
#         return False

#     def has_add_permission(self, request):
#         # Disallow manual additions via admin.
#         return False
