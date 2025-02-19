from django.contrib import admin
from .models import Organizer, Event


class EventInline(admin.TabularInline):
    model = Event
    extra = 1
    fields = ('title',
              'date',
              'location',
              'category', 'is_registration_open','registrationLink'
              )
    readonly_fields = ('created_at', 'updated_at')
    show_change_link = True


# @admin.register(Organizer)
# class OrganizerAdmin(admin.ModelAdmin):
#     list_display = ('name', 'avatar')
#     search_fields = ('name',)
#     inlines = [EventInline]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'date',
        'location',
        'category',
        'is_registration_open',
        # 'organizer',
        'registrationLink',
        )
    list_filter = ('category', 'is_registration_open', 'date')
    search_fields = ('title', 'description', 'location')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "title",
                    "date",
                    "location",
                    "description",
                    "image",
                    "category",
                    "is_registration_open",
                    'registrationLink',
                    # "organizer",
                )
            },
        ),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )
