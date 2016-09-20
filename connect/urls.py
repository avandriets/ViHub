from django.conf.urls import url
from connect import views

urlpatterns = [
    url(r'^$', views.my_login, name='home'),
    # url(r'^home/$', views.home, name='home'),
    url(r'^get_token/$', views.get_token, name='get_token'),
    # url(r'^main/$', views.main, name='main'),
    url(r'^disconnect/$', views.disconnect, name='disconnect'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.my_login, name='login'),
]
