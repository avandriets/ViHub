from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from Hub.models import Element, Members
from Hub.serializers import ElementSerializer, MembersSerializer
from rest_framework import viewsets
from rest_framework import permissions
from django.urls import reverse
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


class MembersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = Members.objects.all()
    serializer_class = MembersSerializer


@login_required
def hub_detail_view(request, id):

    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))
    context = {
        'logoutUrl': get_signout_url(redirect_uri)
    }
    return render(request, 'detail_page.html', context)