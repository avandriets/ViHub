from django.conf.urls import url

from Hub import views

urlpatterns = [
  url(r'^$', views.hub_home, name='index'),
url(r'^test$', views.hub_test, name='test'),
  url(r'^(?P<id>\d+)/$', views.hub_detail_view, name='detail'),
]