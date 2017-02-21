"""BindHub URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from Hub.views import ElementViewSet, MembersViewSet, FavoriteViewSet
from Invitations.views import accept_invitation, decline_invitation
from Messages.views import MessageViewSet
from Notes.views import NoteViewSet
from connect.views import AccountViewSet, get_current_user_info, search_user
from rest_framework import routers
import oauth2_provider.views as oauth2_views
from django.conf import settings


router = routers.DefaultRouter()
router.register(r'elements', ElementViewSet)
router.register(r'element-favorite', FavoriteViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'users', AccountViewSet)


oauth2_endpoint_views = [
    url(r'^authorize/$', oauth2_views.AuthorizationView.as_view(), name="authorize"),
    url(r'^token/$', oauth2_views.TokenView.as_view(), name="token"),
    url(r'^revoke-token/$', oauth2_views.RevokeTokenView.as_view(), name="revoke-token"),
]

if settings.DEBUG:
    # OAuth2 Application Management endpoints
    oauth2_endpoint_views += [
        url(r'^applications/$', oauth2_views.ApplicationList.as_view(), name="list"),
        url(r'^applications/register/$', oauth2_views.ApplicationRegistration.as_view(), name="register"),
        url(r'^applications/(?P<pk>\d+)/$', oauth2_views.ApplicationDetail.as_view(), name="detail"),
        url(r'^applications/(?P<pk>\d+)/delete/$', oauth2_views.ApplicationDelete.as_view(), name="delete"),
        url(r'^applications/(?P<pk>\d+)/update/$', oauth2_views.ApplicationUpdate.as_view(), name="update"),
    ]

    # OAuth2 Token Management endpoints
    oauth2_endpoint_views += [
        url(r'^authorized-tokens/$', oauth2_views.AuthorizedTokensListView.as_view(), name="authorized-token-list"),
        url(r'^authorized-tokens/(?P<pk>\d+)/delete/$', oauth2_views.AuthorizedTokenDeleteView.as_view(),
            name="authorized-token-delete"),
    ]

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^rest/', include(router.urls)),
    url(r'^vi-hub/me$', get_current_user_info),
    url(r'^vi-hub/search-user', search_user),
    url(r'^o/', include(oauth2_endpoint_views, namespace="oauth2_provider")),
]
