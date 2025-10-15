from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView

from users.models import UserAccount
from users.serializers import UserProfileSerializer
from .models import BlogCategory, HelpCategory, Wiki, Blog, Research, Guide, HelpCenter
from .serializers import (
    BlogCategorySerializer, ContentSectionSerializer, WikiSerializer, BlogSerializer,
    GuideSerializer
)
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions


# Vista para obtener una lista de todas las noticias
class WikiListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        wikis_queryset = Wiki.objects.filter(status=Wiki.Status.PUBLISHED)
        serialized_wikis = WikiSerializer(wikis_queryset, many=True).data

        # Ahora, serializamos manualmente el perfil del autor para cada noticia
        for entry in serialized_wikis:
            author_id = entry['author']
            try:
                author_profile = UserAccount.objects.get(user_id=author_id)
                entry['author_profile'] = UserProfileSerializer(
                    author_profile).data
            except UserAccount.DoesNotExist:
                entry['author_profile'] = None

        return Response(serialized_wikis, status=status.HTTP_200_OK)

# Vista para obtener detalles de una noticia específica


class WikiDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    queryset = Wiki.objects.filter(status=Wiki.Status.PUBLISHED)
    serializer_class = WikiSerializer

    def post(self, request, *args, **kwargs):
        wikis_instance = self.get_object()

        if 'vote' in request.data:
            vote_choice = request.data['vote']

            # Check if the user has already voted
            user_has_voted = request.session.get(
                f'voted_{wikis_instance.id}', False)

            if not user_has_voted:
                if vote_choice == 'yes':
                    wikis_instance.yes_count += 1
                elif vote_choice == 'no':
                    wikis_instance.no_count += 1

                wikis_instance.save()

                # Mark the user as voted in session
                request.session[f'voted_{wikis_instance.id}'] = True
                request.session.save()
            else:
                return Response({"error": "User has already voted for this Wiki."}, status=status.HTTP_400_BAD_REQUEST)
        # Return a response with updated news details
        serialized_wikis = WikiSerializer(wikis_instance).data
        return Response(serialized_wikis, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        # Obtén la instancia de News asociada a la vista
        wikis_instance = self.get_object()

        # Obtén la lista de noticias vistas en la sesión actual
        viewed_wikis = request.session.get('viewed_wikis', [])

        # Incrementa el conteo de vistas solo si la noticia no ha sido vista en esta sesión
        if wikis_instance.id not in viewed_wikis:
            wikis_instance.view_count += 1
            wikis_instance.save()

            # Marca la noticia como vista en esta sesión
            viewed_wikis.append(wikis_instance.id)
            request.session['viewed_wikis'] = viewed_wikis

        # Resto del código para serializar y devolver la respuesta
        serialized_wikis = WikiSerializer(wikis_instance).data

        # Serializa manualmente el perfil del autor
        author_profile = wikis_instance.author
        if author_profile:
            serialized_wikis['author_profile'] = UserProfileSerializer(
                author_profile).data
            serialized_wikis['first_name'] = author_profile.user.first_name
            serialized_wikis['last_name'] = author_profile.user.last_name
        else:
            serialized_wikis['author_profile'] = None
            serialized_wikis['first_name'] = None
            serialized_wikis['last_name'] = None

        # Accede a las ContentSection asociadas a la instancia de News
        content_sections = wikis_instance.content_sections.all()
        serialized_content_sections = ContentSectionSerializer(
            content_sections, many=True).data

        # Agrega las ContentSection serializadas a la respuesta
        serialized_wikis['content_sections'] = serialized_content_sections

        return Response(serialized_wikis, status=status.HTTP_200_OK)
    # Repite el proceso para otros modelos (Blog, HRTalks, Research, Guide, HelpCenter)...

# Puedes repetir este patrón para los otros modelos (HRTalks, Research, Guide, HelpCenter)...
# Vista para obtener una lista de todas las noticias


class BlogCategoryListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = BlogCategorySerializer

    def get_queryset(self):
        return BlogCategory.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialized_categories = self.serializer_class(queryset, many=True).data
        return Response(serialized_categories, status=status.HTTP_200_OK)


class HelpCategoryListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = BlogCategorySerializer

    def get_queryset(self):
        return HelpCategory.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serialized_categories = self.serializer_class(queryset, many=True).data
        return Response(serialized_categories, status=status.HTTP_200_OK)


class BlogListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        # Obtener las categorías que tienen blogs publicados asociados
        categories_with_published_blogs = BlogCategory.objects.filter(
            blog__status=Blog.Status.PUBLISHED).distinct()

        # Serializar las categorías
        serialized_categories = BlogCategorySerializer(
            categories_with_published_blogs, many=True).data

        # Obtener todos los blogs publicados
        blog_queryset = Blog.objects.filter(status=Blog.Status.PUBLISHED)
        serialized_blog = BlogSerializer(blog_queryset, many=True).data

        # Ahora, serializamos manualmente el perfil del autor para cada blog
        for entry in serialized_blog:
            author_id = entry['author']
            try:
                author_profile = UserAccount.objects.get(user_id=author_id)
                entry['author_profile'] = UserProfileSerializer(
                    author_profile).data
            except UserAccount.DoesNotExist:
                entry['author_profile'] = None

        return Response({'categories': serialized_categories, 'blogs': serialized_blog}, status=status.HTTP_200_OK)

 #########################      BLOGS     #########################


class BlogDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    queryset = Blog.objects.filter(status=Blog.Status.PUBLISHED)
    serializer_class = BlogSerializer

    def post(self, request, *args, **kwargs):
        blog_instance = self.get_object()

        if 'vote' in request.data:
            vote_choice = request.data['vote']

            # Check if the user has already voted
            user_has_voted = request.session.get(
                f'voted_{blog_instance.id}', False)

            if not user_has_voted:
                if vote_choice == 'yes':
                    blog_instance.yes_count += 1
                elif vote_choice == 'no':
                    blog_instance.no_count += 1

                blog_instance.save()

                # Mark the user as voted in session
                request.session[f'voted_{blog_instance.id}'] = True
                request.session.save()
            else:
                return Response({"error": "User has already voted for this blog."}, status=status.HTTP_400_BAD_REQUEST)
        # Return a response with updated news details
        serialized_blog = WikiSerializer(blog_instance).data
        return Response(serialized_blog, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        # Obtén la instancia de News asociada a la vista
        blog_instance = self.get_object()

        # Obtén la lista de noticias vistas en la sesión actual
        viewed_blog = request.session.get('viewed_blog', [])

        # Incrementa el conteo de vistas solo si la noticia no ha sido vista en esta sesión
        if blog_instance.id not in viewed_blog:
            blog_instance.view_count += 1
            blog_instance.save()

            # Marca la noticia como vista en esta sesión
            viewed_blog.append(blog_instance.id)
            request.session['viewed_blog'] = viewed_blog

        # Resto del código para serializar y devolver la respuesta
        serialized_blog = BlogSerializer(blog_instance).data

        # Serializa manualmente el perfil del autor
        author_profile = blog_instance.author
        if author_profile:
            serialized_blog['author_profile'] = UserProfileSerializer(
                author_profile).data
            serialized_blog['first_name'] = author_profile.user.first_name
            serialized_blog['last_name'] = author_profile.user.last_name
        else:
            serialized_blog['author_profile'] = None
            serialized_blog['first_name'] = None
            serialized_blog['last_name'] = None

        # Accede a las ContentSection asociadas a la instancia de News
        content_sections = blog_instance.content_sections.all()
        serialized_content_sections = ContentSectionSerializer(
            content_sections, many=True).data

        # Agrega las ContentSection serializadas a la respuesta
        serialized_blog['content_sections'] = serialized_content_sections

        return Response(serialized_blog, status=status.HTTP_200_OK)


class GuideListView(ListAPIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        guides_queryset = Guide.objects.filter(status=Guide.Status.PUBLISHED)
        serialized_guides = GuideSerializer(guides_queryset, many=True).data

        # Ahora, serializamos manualmente el perfil del autor para cada guide
        for entry in serialized_guides:
            author_id = entry['author']
            try:
                author_profile = UserAccount.objects.get(user_id=author_id)
                entry['author_profile'] = UserProfileSerializer(
                    author_profile).data
            except UserAccount.DoesNotExist:
                entry['author_profile'] = None

        return Response(serialized_guides, status=status.HTTP_200_OK)


class GuideDetailView(RetrieveAPIView):
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny,)
    queryset = Guide.objects.filter(status=Guide.Status.PUBLISHED)
    serializer_class = GuideSerializer

    def post(self, request, *args, **kwargs):
        guide_instance = self.get_object()

        if 'vote' in request.data:
            vote_choice = request.data['vote']

            # Verifica si el usuario ya votó
            user_has_voted = request.session.get(
                f'voted_{guide_instance.id}', False)

            if not user_has_voted:
                if vote_choice == 'yes':
                    guide_instance.yes_count += 1
                elif vote_choice == 'no':
                    guide_instance.no_count += 1

                guide_instance.save()

                # Marca al usuario como que votó en la sesión
                request.session[f'voted_{guide_instance.id}'] = True
                request.session.save()
            else:
                return Response({"error": "User has already voted for this guide."}, status=status.HTTP_400_BAD_REQUEST)

        # Devuelve una respuesta con los detalles actualizados del guide
        serialized_guide = GuideSerializer(guide_instance).data
        return Response(serialized_guide, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        # Obtén la instancia de Guide asociada a la vista
        guide_instance = self.get_object()

        # Obtén la lista de guides vistos en la sesión actual
        viewed_guides = request.session.get('viewed_guides', [])

        # Incrementa el conteo de vistas solo si el guide no ha sido visto en esta sesión
        if guide_instance.id not in viewed_guides:
            guide_instance.view_count += 1
            guide_instance.save()

            # Marca al guide como visto en esta sesión
            viewed_guides.append(guide_instance.id)
            request.session['viewed_guides'] = viewed_guides

        # Resto del código para serializar y devolver la respuesta
        serialized_guide = GuideSerializer(guide_instance).data

        # Serializa manualmente el perfil del autor
        author_profile = guide_instance.author
        if author_profile:
            serialized_guide['author_profile'] = UserProfileSerializer(
                author_profile).data
            serialized_guide['first_name'] = author_profile.user.first_name
            serialized_guide['last_name'] = author_profile.user.last_name
        else:
            serialized_guide['author_profile'] = None
            serialized_guide['first_name'] = None
            serialized_guide['last_name'] = None

        # Accede a las ContentSection asociadas a la instancia de Guide
        content_sections = guide_instance.content_sections.all()
        serialized_content_sections = ContentSectionSerializer(
            content_sections, many=True).data

        # Agrega las ContentSection serializadas a la respuesta
        serialized_guide['content_sections'] = serialized_content_sections

        return Response(serialized_guide, status=status.HTTP_200_OK)
