# views.py
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
from .serializers import WaitlistEmailSerializer, ContactSaleSerializer, FeedbackMessageSerializer



def send_admin_notification(email):
    subject = "Nuevo Registro en la Lista de Espera"
    message = f"{email} se ha unido a la lista de espera."
    from_email = 'apurdoiu@clous.app'  # Tu dirección de correo electrónico
    admin_email = 'avillalba@clous.app'  # Reemplaza con el correo electrónico donde deseas recibir las notificaciones

    send_mail(subject, message, from_email, [admin_email])


@api_view(['POST'])
def add_to_waitlist(request):
    serializer = WaitlistEmailSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # Dirección de correo del usuario
        user_email = serializer.validated_data['email']

        # Contenido del correo electrónico para el usuario
        subject = 'Bienvenido a Nuestra Lista de Espera'
        message = 'Este es un mensaje automático confirmando tu inscripción a nuestra lista de espera.'
        from_email = 'apurdoiu@clous.app'
        recipient_list = [user_email]

        # Envía el email al usuario
        send_mail(subject, message, from_email, recipient_list)

        # Envía una notificación al administrador
        send_admin_notification(user_email)

        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def submit_feedback(request):
    serializer = FeedbackMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def submit_contact(request):
    serializer = ContactSaleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
