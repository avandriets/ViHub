from django.db import models
from Hub.models import Element
from connect.models import Account


class Attachment(models.Model):
    element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name='attachment_to_element')
    fileURL = models.FileField(verbose_name='Изображение', null=True, blank=True)
    description = models.CharField(verbose_name='Описание', max_length=300, help_text='Описание', null=True, blank=True)
    owner = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
