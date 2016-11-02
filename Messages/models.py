from django.db import models
from Hub.models import Element
from connect.models import Account


class Message(models.Model):
    MESSAGE_TYPE = (
        ('S', 'Short message'),
        ('E', 'Email message'),
    )

    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='messages_element')
    subject = models.CharField(verbose_name='Тема', max_length=100, help_text='Тема', blank=True, null=True)
    email_id = models.CharField(verbose_name='Тема', max_length=255, help_text='Тема', blank=True, null=True)
    body = models.CharField(verbose_name='Содержание', max_length=2000, help_text='Содержание')
    body_preview = models.CharField(verbose_name='Содержание', max_length=1000, help_text='Содержание', blank=True, null=True)
    message_date = models.DateTimeField(auto_now_add=True)
    message_type = models.CharField(verbose_name='Тип сообщения', max_length=1, choices=MESSAGE_TYPE, help_text='Тип сообщения', default=MESSAGE_TYPE[0][0])
    owner = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
