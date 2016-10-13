from rest_framework import serializers
from Messages.models import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message

    def create(self, validated_data):
        message = super(MessageSerializer, self).create(validated_data)
        message.owner = self.context['request'].user
        message.save()

        return message
