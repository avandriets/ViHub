from django.shortcuts import render
from rest_framework import viewsets
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

        if owner_val is not None:
            queryset = queryset.filter(element=owner_val)

        return queryset
