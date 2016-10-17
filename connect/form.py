from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.core.exceptions import ImproperlyConfigured
from django.utils.text import capfirst

from connect.models import Account
from django.apps import apps as django_apps
from django.conf import settings
from django.utils.translation import ugettext_lazy as _


class MyRegistrationForm(forms.ModelForm):
    """
    Form for registering a new account.
    """
    first_name = forms.CharField(label=u'Имя', widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Имя'}))
    last_name = forms.CharField(label=u'Фамилия', widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Фамилия'}))
    username = forms.CharField(label=u'Имя пользователя', widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Имя входа в систему'}), required=False)
    email = forms.EmailField(widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Адрес электронной почты', 'type':'email'}), label="Email")
    password1 = forms.CharField(widget=forms.PasswordInput({'class': 'ms-TextField-field', 'placeholder': 'Пароль'}), label="Password")
    password2 = forms.CharField(widget=forms.PasswordInput({'class': 'ms-TextField-field', 'placeholder': 'Подтверждение пароля'}), label="Password (again)")

    class Meta:
        model = Account
        fields = ['email', 'password1', 'password2', 'username', 'first_name', 'last_name']

    def clean(self):
        """
        Verifies that the values entered into the password fields match

        NOTE: Errors here will appear in ``non_field_errors()`` because it applies to more than one field.
        """
        cleaned_data = super(MyRegistrationForm, self).clean()
        if 'password1' in self.cleaned_data and 'password2' in self.cleaned_data:
            if self.cleaned_data['password1'] != self.cleaned_data['password2']:
                raise forms.ValidationError("Passwords don't match. Please enter both fields again.")
        return self.cleaned_data

    def save(self, commit=True):
        user = super(MyRegistrationForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        user.username = user.email.split('@')[0]
        if commit:
            user.save()
        return user


def get_user_model():
    """
    Returns the User model that is active in this project.
    """
    try:
        return django_apps.get_model(settings.AUTH_USER_MODEL)
    except ValueError:
        raise ImproperlyConfigured("AUTH_USER_MODEL must be of the form 'app_label.model_name'")
    except LookupError:
        raise ImproperlyConfigured(
            "AUTH_USER_MODEL refers to model '%s' that has not been installed" % settings.AUTH_USER_MODEL
        )


class MyAuthenticationForm(forms.Form):
    """
    Login form
    """
    email = forms.EmailField(widget=forms.widgets.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Адрес электронной почты', 'type':'email', 'autofocus': ''}))
    password = forms.CharField(strip=False, widget=forms.widgets.PasswordInput({'class': 'ms-TextField-field', 'placeholder': 'Пароль'}))

    class Meta:
        fields = ['email', 'password']

    error_messages = {
        'invalid_login': _(
            "Please enter a correct %(username)s and password. Note that both "
            "fields may be case-sensitive."
        ),
        'inactive': _("This account is inactive."),
    }

    def __init__(self, request=None, *args, **kwargs):
        """
        The 'request' parameter is set for custom auth use by subclasses.
        The form data comes in via the standard 'data' kwarg.
        """
        self.request = request
        self.user_cache = None
        super(MyAuthenticationForm, self).__init__(*args, **kwargs)

        # Set the label for the "username" field.
        UserModel = get_user_model()
        self.email_field = UserModel._meta.get_field(UserModel.USERNAME_FIELD)
        if self.fields['email'].label is None:
            self.fields['email'].label = capfirst(self.email_field.verbose_name)

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')

        if email and password:
            self.user_cache = authenticate(email=email, password=password)
            if self.user_cache is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login',
                    params={'email': self.email_field.verbose_name},
                )
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    def confirm_login_allowed(self, user):
        """
        Controls whether the given User may log in. This is a policy setting,
        independent of end-user authentication. This default behavior is to
        allow login by active users, and reject login by inactive users.

        If the given user cannot log in, this method should raise a
        ``forms.ValidationError``.

        If the given user may log in, this method should return None.
        """
        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )

    def get_user_id(self):
        if self.user_cache:
            return self.user_cache.id
        return None

    def get_user(self):
        return self.user_cache


class UserEditForm(forms.ModelForm):
    class Meta:
        model = Account
        fields = ("first_name",
                  "last_name",
                  "username")

    # username is enforced to some particular rules
    u_error = _("User name needs to match domain convention.")
    username = forms.RegexField(label=u'Имя входа в систему', regex=r'^\w', max_length=9,
                                widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Отображаемое имя пользователя'}),
                                error_messages={'invalid': u_error})
    first_name = forms.CharField(required=False,label=u'Имя', max_length=30,
                                 widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Имя'})
                                 )

    last_name = forms.CharField(required=False,label=u'Фамилия', max_length=30,
                                widget=forms.TextInput({'class': 'ms-TextField-field', 'placeholder': 'Фамилия'})
                                )
