from django.db import models

from connect.models import Account


class Hub(models.Model):
    HUB_TYPE = (
        ('W', 'Workflow'),
        ('K', 'Wiki'),
        ('H', 'White board'),
    )

    parent = models.ForeignKey('self', blank=True, null=True, related_name='children')
    name = models.CharField(verbose_name='Наименование', max_length=100, help_text='Наименование')
    description = models.CharField(verbose_name='Описание', max_length=300, null=True, blank=True, help_text='Описание')
    hub_type = models.CharField(verbose_name='Тип хаба', max_length=1, choices=HUB_TYPE, help_text='Тип хаба')
    is_delete = models.SmallIntegerField(verbose_name='Удален', null=False, blank=False, help_text='Удален - 1, 0 - Нет', default=0)
    members = models.ManyToManyField(Account, through='HubMembers')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(Account, null=True, related_name = 'HusOwner')

    class Meta:
        db_table = 'Hub'
        verbose_name_plural = 'Hubs'


class HubMembers(models.Model):
    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    member = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'HubMembers'
        verbose_name_plural = 'HubMembers'
