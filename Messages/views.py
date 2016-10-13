from django.shortcuts import render
from rest_framework import viewsets
from Messages.models import Message
from Messages.serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
