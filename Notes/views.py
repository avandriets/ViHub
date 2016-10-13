from django.shortcuts import render
from rest_framework import viewsets

from Notes.models import Note
from Notes.serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
