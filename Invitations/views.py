from django.core.mail import EmailMessage
from django.db import Error
from django.http import Http404
from django.shortcuts import render
from django.template import Context
from django.template.loader import get_template
from django.urls import reverse
from Hub.models import Members
from Invitations.models import Invitation


def accept_invitation(request, uuid):
    try:
        invitation = Invitation.objects.get(id=uuid, accepted=False, declined=False)
    except Invitation.DoesNotExist:
        raise Http404("Неверный код доступа.")

    try:
        hub_members = Members()
        hub_members.user_involved = invitation.invited_user
        hub_members.element = invitation.element
        hub_members.save()
    except Error:
        raise Http404("Ошибка доступа к данным.")

    invitation.accepted = True
    invitation.declined = False
    invitation.save()

    redirect_uri = request.build_absolute_uri('/#/element/' + str(invitation.element.id))

    context = {
        'redirectUrl': redirect_uri,
    }

    return render(request, 'accept_invitation.html', context)


def decline_invitation(request, uuid):
    try:
        invitation = Invitation.objects.get(id=uuid, accepted=False, declined=False)
    except Invitation.DoesNotExist:
        raise Http404("Неверный код доступа.")

    invitation.accepted = False
    invitation.declined = True
    invitation.save()

    return render(request, 'decline_invitation.html')


def send_invitation(request, invitation_obj):
    accept_url = request.build_absolute_uri(reverse('accept-invitation', kwargs={'uuid': invitation_obj.id}))
    decline_url = request.build_absolute_uri(reverse('decline-invitation', kwargs={'uuid': invitation_obj.id}))

    subject = "[ViHub] приглашения для участия в совместной работе"
    to = [invitation_obj.invited_user.email]
    from_email = request.user.email

    ctx = {
        'element_name': invitation_obj.element.name,
        'owner_name': request.user.first_name + ' ' + request.user.last_name,
        'accept_url': accept_url,
        'decline_url': decline_url,
    }

    message = get_template('invitation_email_html.html').render(Context(ctx))
    msg = EmailMessage(subject, message, to=to, from_email=from_email)
    msg.content_subtype = 'html'
    msg.send()
