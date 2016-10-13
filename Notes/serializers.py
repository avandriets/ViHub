from rest_framework import serializers
from Notes.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note

    def create(self, validated_data):
        note = super(NoteSerializer, self).create(validated_data)
        note.owner = self.context['request'].user
        note.save()

        return note
