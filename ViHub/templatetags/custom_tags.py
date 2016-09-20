from django import template
from ViHub.settings import SITE_NAME, STATIC_URL

register = template.Library()


@register.simple_tag
def site_name_simple_tag():
    return SITE_NAME


@register.simple_tag
def static_url_path():
    return STATIC_URL
