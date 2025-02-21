from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.template.defaultfilters import slugify
from .models import Post, ViewCount

from .serializers import PostSerializer, PostListSerializer
from .permissions import IsPostAuthorOrReadOnly, AuthorPermission
from django.db.models.query_utils import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response


from rest_framework.response import Response


class WikiListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Post.postobjects.all().exists():
            posts = Post.postobjects.all()
            serializer = PostListSerializer(posts, many=True)
            # Devuelve los datos utilizando un objeto Response
            return Response({'posts': serializer.data})
        else:
            # En caso de error, devuelve una respuesta con el código 404
            return Response({'error': 'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class PostDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slug, format=None):
        if Post.objects.filter(slug=slug).exists():

            post = Post.objects.get(slug=slug)
            serializer = PostSerializer(post)

            address = request.META.get('HTTP_X_FORWARDED_FOR')
            if address:
                ip = address.split(',')[-1].strip()
            else:
                ip = request.META.get('REMOTE_ADDR')

            if not ViewCount.objects.filter(post=post, ip_address=ip):
                view = ViewCount(post=post, ip_address=ip)
                view.save()
                post.views += 1
                post.save()

            return Response({'post': serializer.data})
        else:
            return Response({'error': 'Post doesnt exist'}, status=status.HTTP_404_NOT_FOUND)


class EditWikiPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, format=None):
        user = self.request.user

        data = self.request.data
        slug = data['slug']

        print(data)

        post = Post.objects.get(slug=slug)

        if (data['title']):
            if not (data['title'] == 'undefined'):
                post.title = data['title']
                post.save()
        if (data['wiki_slug']):
            if not (data['wiki_slug'] == 'undefined'):
                post.slug = slugify(data['wiki_slug'])
                post.save()
        if (data['description']):
            if not (data['description'] == 'undefined'):
                post.description = data['description']
                post.save()
        if (data['time_read']):
            if not (data['time_read'] == 'undefined'):
                post.time_read = data['time_read']
                post.save()
        if (data['content']):
            if not (data['content'] == 'undefined'):
                post.content = data['content']
                post.save()

        if (data['thumbnail']):
            if not (data['thumbnail'] == 'undefined'):
                post.thumbnail = data['thumbnail']
                post.save()

        return Response({'success': 'Post edited'})


class DraftWikiPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'draft'
        post.save()

        return Response({'success': 'Post edited'})


class PublishWikiPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'published'
        post.save()

        return Response({'success': 'Post edited'})


class DeleteWikiPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def delete(self, request, slug, format=None):

        post = Post.objects.get(slug=slug)

        post.delete()

        return Response({'success': 'Post edited'})


class CreateWikiPostView(APIView):
    permission_classes = (AuthorPermission, )

    def post(self, request, format=None):
        user = self.request.user
        Post.objects.create(author=user)

        return Response({'success': 'Post edited'})
