from oauth2_provider.ext.rest_framework import IsAuthenticatedOrTokenHasScope
from rest_framework import permissions
from rest_framework.permissions import DjangoModelPermissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        if request.method in ('HEAD', 'OPTIONS'):
            return True

        return obj.owner == request.user


class IsOwnerOrReadOnlyElements(IsOwnerOrReadOnly):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in permissions.SAFE_METHODS:
        if request.method in ('HEAD', 'OPTIONS'):
            return True

        # Instance must have an attribute named `owner`.
        if request.method in ('GET',):
            members = obj.members.filter(user_involved=request.user)
            for member in members:
                if member.user_involved == request.user:
                    return True
            return False

        return obj.owner == request.user


class IsAuthenticatedOrTokenHasScopeUsers(IsAuthenticatedOrTokenHasScope):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_permission(self, request, view):
        has_permissions = super().has_permission(request, view)

        if not request.user.is_authenticated and request.method in ('POST',):
            return True

        if not has_permissions or request.method in ('DELETE',):
            return False

        return True

    def has_object_permission(self, request, view, obj):
        has_permissions = super().has_object_permission(request, view, obj)

        if has_permissions and request.method in ('PUT',) and obj.id == request.user.id:
            return True

        return False


class IsSelf(IsAuthenticatedOrTokenHasScope):

    def has_permission(self, request, view):
        has_permissions = super().has_permission(request, view)

        if has_permissions and request.method in ('POST',):
            return True

        return False

    def has_object_permission(self, request, view, obj):
        has_permissions = super().has_object_permission(request, view, obj)

        if has_permissions and request.method in ('POST',) and obj.id == request.user.id:
            return True

        return False
