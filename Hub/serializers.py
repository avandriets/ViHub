from Hub.models import Members, Element, Favorite
from rest_framework import serializers


class MembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Members
        fields = ('element', 'user_involved', 'created_at', 'updated_at',)


class ElementsListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        pass

    def to_representation(self, data):
        # elements_ids = list(Members.objects.filter(user_involved=self.context['request'].user).values_list("element_id", flat=True))
        # data = data.filter(is_delete=0, id__in=elements_ids)
        return super(ElementsListSerializer, self).to_representation(data)


class ElementSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='owner.last_name', required=False)
    members = MembersSerializer(many=True, read_only=True)
    is_favorite = serializers.SerializerMethodField('get_favorite')
    element = serializers.SerializerMethodField('get_element_id')

    def get_element_id(self, element):
        return element.id

    def get_favorite(self, element):
        # self.context['request'].user
        qs = Favorite.objects.filter(owner=self.context['request'].user, element=element)
        if qs.count() > 0:
            return True
        else:
            return False

    class Meta:
        list_serializer_class = ElementsListSerializer
        model = Element
        fields = ('id', 'element', 'parent', 'name', 'description', 'is_delete', 'is_signal', 'element_type', 'created_at', 'updated_at',
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


class FavoriteListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        pass

    def to_representation(self, data):
        # elements_ids = list(Favorite.objects.filter(owner=self.context['request'].user).values_list("element_id",flat=True))
        # data = data.filter(id__in=elements_ids)
        # data = data.filter(owner=self.context['request'].user)
        return super(FavoriteListSerializer, self).to_representation(data)


class FavoriteSerializer(serializers.ModelSerializer):
    parent = serializers.ReadOnlyField(source='element.parent.id', required=False)
    name = serializers.ReadOnlyField(source='element.name', required=False)
    description = serializers.ReadOnlyField(source='element.description', required=False)
    is_delete = serializers.ReadOnlyField(source='element.is_delete', required=False)
    is_signal = serializers.ReadOnlyField(source='element.is_signal', required=False)
    element_type = serializers.ReadOnlyField(source='element.element_type', required=False)
    username = serializers.ReadOnlyField(source='element.owner.username', required=False)
    first_name = serializers.ReadOnlyField(source='element.owner.first_name', required=False)
    last_name = serializers.ReadOnlyField(source='element.owner.last_name', required=False)
    element_created_at = serializers.ReadOnlyField(source='element.created_at', required=False)
    element_updated_at = serializers.ReadOnlyField(source='element.updated_at', required=False)
    element_owner = serializers.ReadOnlyField(source='element.owner.id', required=False)
    is_favorite = serializers.SerializerMethodField('get_favorite')

    def get_favorite(self, obj):
        return True

    class Meta:
        list_serializer_class = FavoriteListSerializer
        model = Favorite
        fields = ('id', 'element', 'parent', 'name', 'description', 'is_delete', 'is_signal' , 'element_type',
                  'element_created_at', 'element_updated_at', 'element_owner',
                  'username', 'first_name', 'last_name',
                  'is_favorite', 'created_at', 'updated_at', 'owner',
                  )

    def create(self, validated_data):
        hub = super(FavoriteSerializer, self).create(validated_data)
        hub.owner = self.context['request'].user
        hub.save()
        return hub
