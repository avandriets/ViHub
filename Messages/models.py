from django.db import models
from Hub.models import Element
from connect.models import Account


class Message(models.Model):
    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='messages_element')
    subject = models.CharField(verbose_name='Тема', max_length=100, help_text='Тема')
    body = models.CharField(verbose_name='Содержание', max_length=1000, help_text='Содержание')
    message_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
