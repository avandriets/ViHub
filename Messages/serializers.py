from rest_framework import serializers
from Messages.models import Message


class MessageSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)

    class Meta:
        model = Message
        fields = ('id', 'element', 'subject', 'body', 'message_date',
                  'owner', 'created_at', 'updated_at', 'username',
                  'first_name', 'last_name')

    def create(self, validated_data):
        message = super(MessageSerializer, self).create(validated_data)
        message.owner = self.context['request'].user
        message.save()

        return message
