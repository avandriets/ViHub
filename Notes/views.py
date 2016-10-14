from django.shortcuts import render
from rest_framework import viewsets
from Notes.models import Note
from Notes.serializers import NoteSerializer
from rest_framework import filters


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('element',)
    ordering_fields = ('created_at', 'updated_at')

    def filter_queryset(self, queryset):

        queryset = Note.objects.all()

        owner_val = self.request.query_params.get('element', None)

        if owner_val is not None:
            queryset = queryset.filter(element=owner_val)

        return queryset
