from rest_framework import serializers
from .models import Event, Organizer


# class OrganizerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Organizer
#         fields = (
#             # 'id',
#             'name',
#             'avatar')


class EventSerializer(serializers.ModelSerializer):
    # Compute a custom date representation.
    date = serializers.SerializerMethodField()
    # organizer = OrganizerSerializer(read_only=True)
    isRegistrationOpen = serializers.BooleanField(source='is_registration_open')
    registrationLink = serializers.URLField(required=False, allow_null=True)
    class Meta:
        model = Event
        fields = (
            # 'id',
            "title",
            "date",
            "location",
            "description",
            "image",
            "category",
            # "organizer",
            "isRegistrationOpen",
            "registrationLink",
        )

    def get_date(self, obj):
        return {
            'month': obj.date.strftime('%b').upper(),  # e.g., MAR, APR
            'day': obj.date.strftime('%d'),
            'year': obj.date.strftime('%Y')  # Adding the year
        }
