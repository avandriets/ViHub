from django.contrib.auth.decorators import login_required
from django.db import Error
from django.shortcuts import render
from django.urls import reverse
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import filters

from Hub.models import Element, Members, Favorite
from Hub.serializers import ElementSerializer, MembersSerializer, FavoriteSerializer
from connect.auth_helper import get_signout_url


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
            queryset = queryset.filter(parent=parent_val)

        # return super(PollutionMarkViewSet, self).filter_queryset(queryset)
        return queryset


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
