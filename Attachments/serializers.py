from rest_framework import serializers

from Attachments.models import Attachment


class AttachmentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)

    class Meta:
        model = Attachment

        fields = ('id', 'element', 'description', 'fileURL',
                  'owner', 'created_at', 'updated_at', 'username',
                  'first_name', 'last_name')

    def create(self, validated_data):
        note = super(AttachmentSerializer, self).create(validated_data)
        note.owner = self.context['request'].user
        note.save()

        return note
