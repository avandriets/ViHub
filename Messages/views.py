from django.shortcuts import render
from rest_framework import exceptions
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from Hub.models import Members, Element
from Messages.models import Message
from Messages.serializers import MessageSerializer
from rest_framework import filters


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('element',)
    ordering_fields = ('created_at', 'updated_at')

    def filter_queryset(self, queryset):

        queryset = Message.objects.all()

        owner_val = self.request.query_params.get('element', None)

        try:
            element = Element.objects.get(id=owner_val)
        except Element.DoesNotExist:
            raise exceptions.NotFound()

        if owner_val is not None:
            members_list = Members.objects.filter(element=owner_val, user_involved=self.request.user)
            if members_list.count() > 0:
                queryset = queryset.filter(element=owner_val)
            else:
                raise exceptions.PermissionDenied()
        else:
            queryset = Message.objects.none()

        return queryset
