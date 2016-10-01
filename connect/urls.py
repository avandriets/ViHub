from django.conf.urls import url
from connect import views

urlpatterns = [
    url(r'^$', views.my_login, name='home'),
    url(r'^get_token/$', views.get_token, name='get_token'),
    url(r'^disconnect/$', views.disconnect, name='disconnect'),
    url(r'^register/$', views.register, name='register'),
    url(r'^login/$', views.my_login, name='login'),
    url(r'^profile/$', views.profile_edit, name='profile'),
]
