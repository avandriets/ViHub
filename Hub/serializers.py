from Hub.models import Members, Element, Favorite
from rest_framework import serializers


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('element', 'user_involved', 'created_at', 'updated_at',)


class FavoriteListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        elements_ids = list(Favorite.objects.filter(owner=self.context['request'].user).values_list("element_id",flat=True))
        data = data.filter(id__in=elements_ids)
        return super(FavoriteListSerializer, self).to_representation(data)


class FavoriteSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)
    members = MembersSerializer(many=True, read_only=True)
    class Meta:
        list_serializer_class = FavoriteListSerializer
        model = Element
        fields = ('id', 'parent','name', 'description', 'is_delete', 'element_type', 'created_at', 'updated_at',
                  'members', 'owner', 'username', 'first_name', 'last_name',
                  )


class ElementsListSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(owner=self.context['request'].user)
        return super(ElementsListSerializer, self).to_representation(data)


class ElementSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)
    members = MembersSerializer(many=True, read_only=True)
    # favorite = FavoriteSerializer(many=True, read_only=True, required=False)
    is_favorite = serializers.SerializerMethodField('get_favorite')

    def get_favorite(self, element):
        qs = Favorite.objects.filter(owner=element.owner, element=element)
        if qs.count() > 0:
            return True
        else:
            return False

    class Meta:
        list_serializer_class = ElementsListSerializer
        model = Element
        fields = ('id', 'parent','name', 'description', 'is_delete', 'element_type', 'created_at', 'updated_at',
                  'members', 'owner', 'username', 'first_name', 'last_name'
                  , 'is_favorite'
                  )

    def create(self, validated_data):
        hub = super(ElementSerializer, self).create(validated_data)
        hub.owner = self.context['request'].user
        hub.save()

        hub_members = Members()
        hub_members.user_involved = hub.owner
        hub_members.element = hub
        hub_members.save()

        return hub
