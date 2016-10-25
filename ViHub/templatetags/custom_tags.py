from django import template
from ViHub.settings import SITE_NAME, STATIC_URL

register = template.Library()


@register.inclusion_tag('nav_bar_tag.html', takes_context=True)
def nav_bar(context):
    return {'user': context['user'], 'logoutUrl': context['logoutUrl']}


@register.simple_tag
def site_name_simple_tag():
    return SITE_NAME


@register.simple_tag
def static_url_path():
    return STATIC_URL
