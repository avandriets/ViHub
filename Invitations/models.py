from django.db import models
from Hub.models import Element
from connect.models import Account
import uuid


class Invitation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='invitation_to_element')
    invited_user = models.ForeignKey(Account, null=True)
    accepted = models.BooleanField(default=False)
    declined = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
