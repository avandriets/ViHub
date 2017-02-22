from django.shortcuts import render
from Attachments.models import Attachment
from Attachments.serializers import AttachmentSerializer
from Hub.models import Element
from ViHub.permission import IsOwnerOrReadOnlyElements, IsOwnerOrReadOnly
from oauth2_provider.ext.rest_framework import IsAuthenticatedOrTokenHasScope
from rest_framework import exceptions
from rest_framework import viewsets
from rest_framework import filters


class AttachmentsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('element',)
    ordering_fields = ('created_at', 'updated_at')

    permission_classes = (IsOwnerOrReadOnly, IsAuthenticatedOrTokenHasScope)
    required_scopes = ['read', 'write']
    pagination_class = None

    def create(self, request, *args, **kwargs):
        # TODO add check before add file to element
        return super().create(request, *args, **kwargs)

    def filter_queryset(self, queryset):

        queryset = Attachment.objects.all()

        owner_val = self.request.query_params.get('element', None)

        if owner_val is not None:
            try:
                element = Element.objects.get(id=owner_val)
            except Element.DoesNotExist:
                raise exceptions.NotFound()

            files_list = Attachment.objects.filter(element_id=owner_val, user_involved=self.request.user)
            if files_list.count() > 0:
                queryset = queryset.filter(element_id=owner_val)
            else:
                raise exceptions.PermissionDenied()

            queryset = queryset.filter(element_id=owner_val)
        elif self.action == 'list' and owner_val is None:
            queryset = Attachment.objects.none()

        return queryset
