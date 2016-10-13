from django.db import models
from Hub.models import Element
from Messages.models import Message
from connect.models import Account


class Note(models.Model):
    message = models.ForeignKey(Message, blank=True, null=True, on_delete=models.CASCADE, related_name='notes_to_message')
    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='notes_to_element')
    subject = models.CharField(verbose_name='Тема', max_length=50, help_text='Тема')
    body = models.CharField(verbose_name='Содержание', max_length=300, help_text='Содержание')
    private = models.BooleanField(verbose_name='Личная', help_text='Личная', default=False)
    owner = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
