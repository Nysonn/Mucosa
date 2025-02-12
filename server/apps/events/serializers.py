from rest_framework import serializers
from .models import Event, Organizer

class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = ('id', 'name', 'avatar')


class EventSerializer(serializers.ModelSerializer):
    # Compute a custom date representation.
    date = serializers.SerializerMethodField()
    organizer = OrganizerSerializer()

    class Meta:
        model = Event
        fields = (
            'id',
            'title',
            'date',
            'location',
            'description',
            'image',
            'category',
            'is_registration_open',
            'organizer',
        )

    def get_date(self, obj):
        return {
            'month': obj.date.strftime('%b').upper(),  # e.g., MAR, APR
            'day': obj.date.strftime('%d')
        }
