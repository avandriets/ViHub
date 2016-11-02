from django.shortcuts import render
from rest_framework import exceptions
from rest_framework import viewsets

from Hub.models import Element, Members
from Notes.models import Note
from Notes.serializers import NoteSerializer
from rest_framework import filters

from ViHub.permission import IsOwnerOrReadOnlyElements


class NoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('element',)
    ordering_fields = ('created_at', 'updated_at')

    permission_classes = (IsOwnerOrReadOnlyElements,)
    pagination_class = None

    def filter_queryset(self, queryset):

        queryset = Note.objects.all()

        owner_val = self.request.query_params.get('element', None)

        if owner_val is not None:
            try:
                element = Element.objects.get(id=owner_val)
            except Element.DoesNotExist:
                raise exceptions.NotFound()

            members_list = Members.objects.filter(element_id=owner_val, user_involved=self.request.user)
            if members_list.count() > 0:
                queryset = queryset.filter(element_id=owner_val)
            else:
                raise exceptions.PermissionDenied()

            queryset = queryset.filter(element_id=owner_val)
        elif self.action == 'list' and owner_val is None:
            queryset = Note.objects.none()

        return queryset
