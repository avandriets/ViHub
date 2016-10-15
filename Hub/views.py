from django.contrib.auth.decorators import login_required
from django.db import Error
from django.db import models
from django.shortcuts import render
from django.urls import reverse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework import filters

from Hub.models import Element, Members, Favorite
from Hub.serializers import ElementSerializer, MembersSerializer, FavoriteSerializer, ElementsListSerializer
from Messages.models import Message
from Messages.serializers import MessageSerializer
from Notes.models import Note
from Notes.serializers import NoteSerializer
from connect.auth_helper import get_signout_url
from django.db.models import Q


@login_required
def hub_home(request):
    # if request.session['pageRefresh'] == 'false':
    #     request.session['pageRefresh'] = 'true'
    # else:
    #     request.session['showSuccess'] = 'false'
    #     request.session['showError'] = 'false'

    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))

    context = {
        # 'alias': request.session['alias'],
        # 'emailAddress': request.session['emailAddress'],
        # 'showSuccess': request.session['showSuccess'],
        # 'showError': request.session['showError'],
        'logoutUrl': get_signout_url(redirect_uri)
    }
    return render(request, 'main_page.html', context)


class ElementViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

    filter_backends = (filters.DjangoFilterBackend, filters.OrderingFilter,)
    filter_fields = ('parent',)
    ordering_fields = ('created_at', 'updated_at')

    def filter_queryset(self, queryset):

        queryset = Element.objects.all()

        parent_val = self.request.query_params.get('parent', None)

        if parent_val is not None:
            if parent_val != '-1':
                queryset = queryset.filter(parent=parent_val)
            else:
                queryset = queryset.filter(parent__isnull=True)

        # return super(PollutionMarkViewSet, self).filter_queryset(queryset)
        return queryset

    def update(self, request, *args, **kwargs):

        # TODO insert condition is you are owner this element
        if request.data["is_delete"] == 1:
            upd_list = Element.objects.filter(parent=request.data["id"])
            self.set_delete_mark(upd_list)

        return super().update(request, *args, **kwargs)

    def set_delete_mark(self, elements_list):
        for curElement in elements_list:
            upd_list = Element.objects.filter(parent=curElement.id)
            if upd_list.count() > 0:
                self.set_delete_mark(upd_list)
            else:
                curElement.is_delete = 1
                curElement.save()

    @detail_route(methods=['get'], url_path='get-messages')
    def get_messages(self, request, pk=None):

        members_set = Members.objects.filter(element=pk, user_involved=request.user)
        if members_set.count() > 0:
            messages_set = Message.objects.filter(element=pk)
            serializer = MessageSerializer(messages_set, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @detail_route(methods=['get'], url_path='get-notes')
    def get_notes(self, request, pk=None):

        members_set = Members.objects.filter(element=pk, user_involved=request.user)
        if members_set.count() > 0:

            notes_set = Note.objects.filter(Q(element=pk) & (Q(owner=request.user) | (~Q(owner=request.user) & Q(private_note=False))))

            # notes_set = Note.objects.filter(element=pk, private_note=False)
            serializer = NoteSerializer(notes_set, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get_elements_tree(self, elements_list, element):

        if element.parent:
            elements_list.insert(0, element.parent)
            self.get_elements_tree(elements_list, element.parent)
        else:
            return elements_list

    @detail_route(methods=['get'], url_path='get-breadcrumbs')
    def get_breadcrumbs(self, request, pk=None):

        try:
            element = Element.objects.get(id=pk)
        except Element.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        members_set = Members.objects.filter(element=pk, user_involved=request.user)
        if members_set.count() > 0:
            if element.owner_id != request.user.id:
                return Response([ElementSerializer(element).data])

            list_os_elements = [element]
            self.get_elements_tree(list_os_elements, element)

            json_list = []
            for el in list_os_elements:
                json_list.append(ElementSerializer(el).data)

            return Response(json_list)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class MembersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Members.objects.all()
    serializer_class = MembersSerializer


class FavoriteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer


@login_required
def hub_detail_view(request, id):

    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))
    context = {
        'logoutUrl': get_signout_url(redirect_uri)
    }
    return render(request, 'detail_page.html', context)


def hub_test(request):
    context = {
    }
    return render(request, 'test_page.html', context)


@login_required
def about(request):

    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))
    context = {
        'logoutUrl': get_signout_url(redirect_uri)
    }
    return render(request, 'about_page.html', context)


@login_required
@api_view(['POST'])
def set_favorite(request, id_obj):

    if request.method == 'POST':
        try:
            element = Element.objects.get(id=id_obj)
        except Element.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            favorite_data = Favorite.objects.filter(owner=request.user, element=id_obj)
            if favorite_data.count() == 0:
                favorite_obj = Favorite.objects.create(element=element, owner=request.user)
                favorite_obj.save()
                return Response({"message": "successfully add to favorite"})
            else:
                favorite_data = Favorite.objects.filter(owner=request.user, element=id_obj)
                favorite_data.delete()
                return Response({"message": "successfully remove from favorite"})
        except Error:
            return Response({"message": "db error"}, status=status.HTTP_404_NOT_FOUND)
