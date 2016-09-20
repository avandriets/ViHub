from Hub.models import Hub
from rest_framework import serializers


class HubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hub
        fields = ('parent', 'name', 'description', 'hub_type', 'is_delete', 'created_at', 'updated_at', 'user')

    def create(self, validated_data):
        hub = super(HubSerializer, self).create(validated_data)
        hub.user = self.context['request'].user
        hub.save()
        return hub
