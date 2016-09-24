from Hub.models import Members, Element
from rest_framework import serializers


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('element', 'user_involved', 'created_at', 'updated_at',)


class ElementSerializer(serializers.ModelSerializer):
    members = MembersSerializer(many=True, read_only=True)

    class Meta:
        model = Element
        fields = ('parent','name', 'description', 'is_delete', 'element_type', 'created_at', 'updated_at', 'members', 'owner')

    def create(self, validated_data):
        hub = super(ElementSerializer, self).create(validated_data)
        hub.owner = self.context['request'].user
        hub.save()

        hub_members = Members()
        hub_members.user_involved = hub.owner
        hub_members.element = hub
        hub_members.save()

        return hub
