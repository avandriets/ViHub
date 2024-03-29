from django.db import models
from connect.models import Account


ELEM_TYPE = (
    ('W', 'Workflow'),
    ('K', 'Wiki'),
    ('H', 'White board'),
)


class Element(models.Model):
    parent = models.ForeignKey('self', blank=True, null=True, related_name='tree', on_delete=models.CASCADE)
    name = models.CharField(verbose_name='Наименование', max_length=100, help_text='Наименование')
    description = models.CharField(verbose_name='Описание', max_length=30000, null=True, blank=True, help_text='Описание')
    element_type = models.CharField(verbose_name='Тип хаба', max_length=1, choices=ELEM_TYPE, help_text='Тип хаба')
    is_delete = models.SmallIntegerField(verbose_name='Удален', null=False, blank=False, help_text='Удален - 1', default=0)
    is_signal = models.BooleanField(verbose_name='Личная', help_text='Личная', default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(Account, null=True, related_name='element_owner')

    def get_all_favorite(self):
        favorites = Favorite.objects.filter(element=self)
        return favorites


class Members(models.Model):
    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='members')
    user_involved = models.ForeignKey(Account, null=True, related_name='user_involved')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Favorite(models.Model):
    element = models.ForeignKey(Element,on_delete=models.CASCADE, related_name='favorite')
    owner = models.ForeignKey(Account, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
