from rest_framework import serializers
from Notes.models import Note


class NoteSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)

    class Meta:
        model = Note

        fields = ('id', 'element', 'message', 'subject', 'body', 'private_note',
                  'owner', 'created_at', 'updated_at', 'username',
                  'first_name', 'last_name')

    def create(self, validated_data):
        note = super(NoteSerializer, self).create(validated_data)
        note.owner = self.context['request'].user
        note.save()

        return note
