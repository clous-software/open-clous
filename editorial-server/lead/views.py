from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
# Create your views here.
from rest_framework import permissions
from rest_framework.decorators import api_view
from django.core.mail import send_mail


def send_admin_notification(email, first, last):
    subject = f"{email} left their email address"
    message = f"{first} {last} left their email because they're interested in our guides."
    from_email = 'avillalba@clous.app'  # Tu dirección de correo electrónico
    # Reemplaza con el correo electrónico donde deseas recibir las notificaciones
    admin_email = 'avillalba@clous.app'

    send_mail(subject, message, from_email, [admin_email])


def send_sales_notification(email, first, last, reason, message):
    subject = f"{email} left their email address"
    message = f"{first} {last} left their email because they're {reason} and interested in {message}."
    from_email = 'avillalba@clous.app'  # Tu dirección de correo electrónico
    # Reemplaza con el correo electrónico donde deseas recibir las notificaciones
    admin_email = 'avillalba@clous.app'

    send_mail(subject, message, from_email, [admin_email])


def send_waitlist_notification(email):
    subject = f"{email} joined our waitlist"
    message = f"{email} should be imported to our waitlist data."
    from_email = 'avillalba@clous.app'  # Tu dirección de correo electrónico
    # Reemplaza con el correo electrónico donde deseas recibir las notificaciones
    admin_email = 'avillalba@clous.app'

    send_mail(subject, message, from_email, [admin_email])


class ResourceView(APIView):
    permission_classes = (permissions.AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = ResourceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            # Dirección de correo del usuario
            user_email = serializer.validated_data['email']

            # Contenido del correo electrónico para el usuario
            subject = 'Whatever you need, we are here'
            message = '''
            Hi,

            Welcome to Clous! We're super pumped that you've shown interest in a guide made by our marketing team.

            In case you missed it, our mission is to to connect every person to a fulfilling job and democratize employment information to make it universally accessible. Whether it's optimizing your hiring processes or improving candidate engagement, we've got you covered.

            Take a moment to explore www.clous.app and discover how our first product version can streamline your recruitment journey.

            Looking forward to being part of your success story!

            Warm welcome,
            Clous Team
        '''
            from_email = 'avillalba@clous.app'
            recipient_list = [user_email]

            # Envía el email al usuario
            send_mail(subject, message, from_email, recipient_list)

            # Envía una notificación al administrador
            send_admin_notification(user_email)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddToWaitlistView(APIView):
    permission_classes = (permissions.AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = WaitlistEmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Dirección de correo del usuario
            user_email = serializer.validated_data['email']

            # Contenido del correo electrónico para el usuario
            subject = 'Welcome to Clous (1/3) - All aboard!'
            message = '''
            Hi,

            Welcome to Clous! We're super pumped that you've shown interest in the Alpha version of our product.

            In case you missed it, our mission is to to connect every person to a fulfilling job and democratize employment information to make it universally accessible. Whether it's optimizing your hiring processes or improving candidate engagement, we've got you covered.

            Take a moment to explore www.clous.app and discover how our first product version can streamline your recruitment journey.

            Looking forward to being part of your success story!

            Warm welcome,
            Clous Team
        '''
            from_email = 'avillalba@clous.app'
            recipient_list = [user_email]

            # Envía el email al usuario
            send_mail(subject, message, from_email, recipient_list)

            # Envía una notificación al administrador
            send_waitlist_notification(user_email)

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SubmitContactView(APIView):
    permission_classes = (permissions.AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, first, request, *args, **kwargs):
        serializer = ContactSaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Dirección de correo del usuario
            user_email = serializer.validated_data['email']

            # Contenido del correo electrónico para el usuario
            subject = 'Thank you for your interest in Clous'
            message = f'''
            Hi {first},
                        
            Thank you for reaching out to Clous sales team! We're excited to learn more about your needs and how we can help.
            
            We've received your message, and we wanted to let you know that we're currently experiencing higher than usual contact volumes. But don't worry! We'll do our best to get back to you within 72 hours.
            
            In the meantime, feel free to check out our <a className="text-[#F26C21]" href="https://beta.clous.app">website</a> and learn more about how our first product version ClousH Alpha can help improve the efficiency of your recruitment processes and talent engagement.
            
            Warm welcome,
            Clous Team

        '''
            from_email = 'avillalba@clous.app'
            recipient_list = [user_email]

            # Envía el email al usuario
            send_mail(subject, message, from_email, recipient_list)

            # Envía una notificación al administrador
            send_sales_notification(user_email)

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
