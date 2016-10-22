from django.conf.urls import url
from Hub import views

urlpatterns = [
  url(r'^$', views.hub_home, name='index'),
  url(r'^test$', views.hub_test, name='test'),
  url(r'^about$', views.about, name='about'),
]