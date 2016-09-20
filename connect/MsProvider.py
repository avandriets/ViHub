import msgraph
from msgraph.auth_provider_base import AuthProviderBase


class MyAuthProvider(AuthProviderBase):
    def get_auth_url(self, auth_server_url, redirect_uri):
        pass

    def __init__(self, http_provider, client_id, scopes, access_token):
        self._auth_code = None
        self._client_secret = None
        self._redirect_uri = ''
        self._http_provider = http_provider
        self._client_id = client_id
        self._scopes = scopes
        self._access_token = access_token

    def refresh_token(self):
        pass

    def authenticate_request(self, request):
        request._headers['User-Agent'] = 'python_tutorial/1.0'
        request._headers['Authorization'] = 'Bearer {0}'.format(self._access_token)
        request._headers['Accept'] = 'application/json'
        request._headers['Content-Type'] = 'application/json'

    def authenticate(self, code, auth_server_url, redirect_uri, client_secret):
        pass
