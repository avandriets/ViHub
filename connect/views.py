import msgraph
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from ViHub import settings
from connect import config
from connect.MsProvider import MyAuthProvider
from connect.account_serializer import AccountSerializer
from connect.auth_helper import get_signin_url, get_signout_url, get_token_from_code, get_user_info_from_token
from connect.form import MyRegistrationForm as RegistrationForm, MyAuthenticationForm
from connect.models import Account
from rest_framework import viewsets


def get_token(request):
    auth_code = request.GET['code']
    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))
    token = get_token_from_code(auth_code, redirect_uri)
    access_token = token['access_token']

    user_info = get_user_info_from_token(token['id_token'])

    # Create new user
    user, created = Account.objects.get_or_create(username=user_info['upn'].split('@')[0], email=user_info['upn'])
    if created:
        # user.set_password('')   # This line will hash the password
        user.last_name = user_info['family_name']
        user.first_name = user_info['given_name']
        user.provider = 'M'

        user.save()  # DO NOT FORGET THIS LINE
        # user.last_name first_name

    user.backend = 'django.contrib.auth.backends.ModelBackend'
    login(request, user)

    # Save the token and other information for the view in the session.
    # request.session['access_token'] = access_token
    # request.session['alias'] = user_info['upn'].split('@')[0]
    # request.session['emailAddress'] = user_info['upn']
    # request.session['showSuccess'] = 'false'
    # request.session['showError'] = 'false'
    # request.session['pageRefresh'] = 'true'

    http_provider = msgraph.HttpProvider()
    auth_provider = MyAuthProvider(http_provider, config.client_id, settings.scopes_msgraph, access_token)

    client = msgraph.GraphServiceClient('https://graph.microsoft.com/v1.0/', auth_provider, http_provider)
    users = client.users
    users.get()

    me = client.me.get()
    print('Мое мыло: ' + me.mail)
    # photo = client.me.photo.get()
    # print('Мое фото: ' + me.photo)

    return HttpResponseRedirect(reverse('hub:index'))


# This is the route that is called when the user clicks the disconnect
# button in the navigation bar. Clear user identifying information from
# the session and redirect to the home page.
@login_required
def disconnect(request):
    request.session['access_token'] = None
    # request.session['alias'] = None
    # request.session['emailAddress'] = None

    logout(request)

    return HttpResponseRedirect(reverse('connect:home'))


def register(request):
    """
    User registration view.
    """
    if request.method == 'POST':
        form = RegistrationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('/')
    else:
        form = RegistrationForm()

    return render(request, 'auth/registration.html', {'form': form,})


def my_login(request):
    """
    Log in view
    """
    if request.method == 'POST':
        form = MyAuthenticationForm(data=request.POST)
        if form.is_valid():
            user = authenticate(email=request.POST['email'], password=request.POST['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect('/')
    else:
        form = MyAuthenticationForm()

    redirect_uri = request.build_absolute_uri(reverse('connect:get_token'))
    sign_in_url = get_signin_url(redirect_uri)
    request.session['logoutUrl'] = get_signout_url(redirect_uri)

    context = {
        'sign_in_url': sign_in_url,
        'form': form
    }

    return render(request, 'auth/login.html', context)


class AccountViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
