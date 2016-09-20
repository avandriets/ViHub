from django.conf.urls import url

from Hub import views

urlpatterns = [
  url(r'^$', views.hub_home, name='hub_home'),
]