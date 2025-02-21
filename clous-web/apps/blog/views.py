from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.template.defaultfilters import slugify
from .models import Post, ViewCount
from ..category.models import Category
from .serializers import PostSerializer, PostListSerializer
from .permissions import IsPostAuthorOrReadOnly, AuthorPermission
from django.db.models.query_utils import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
# This is the logic rules to manage the requests and responses


class BlogListView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        # Obtener todas las publicaciones publicadas
        posts = Post.postobjects.filter(status='published')

        if posts.exists():
            serializer = PostListSerializer(posts, many=True)
            return Response({'posts': serializer.data})
        else:
            return Response({'error': 'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class ListPostsByCategoryView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Post.postobjects.all().exists():
            slug = request.query_params.get('slug')
            category = Category.objects.get(slug=slug)
            posts = Post.postobjects.order_by('-published').all()

            if not Category.objects.filter(parent=category).exists():
                posts = posts.filter(category=category)
            else:
                sub_categories = Category.objects.filter(parent=category)
                filtered_categories = [category]
                for cat in sub_categories:
                    filtered_categories.append(cat)
                filtered_categories = tuple(filtered_categories)
                posts = posts.filter(category__in=filtered_categories)

            serializer = PostListSerializer(posts, many=True)

            return Response({'posts': serializer.data})
        else:
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


class SearchBlogView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, search_term):
        # search_term = request.query_params.get('s')
        matches = Post.postobjects.filter(
            Q(title__icontains=search_term) |
            Q(description__icontains=search_term) |
            Q(content__icontains=search_term) |
            Q(category__name__icontains=search_term)

        )

        results = (matches, request)

        serializer = PostListSerializer(results, many=True)
        # return ({'filtered_posts': serializer.data})

        return Response({'filtered_posts': serializer.data}, status=status.HTTP_200_OK)


class AuthorBlogListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):

        user = self.request.user

        if Post.objects.filter(author=user).exists():

            posts = Post.objects.filter(author=user)

            results = (posts, request)
            serializer = PostListSerializer(results, many=True)

            return ({'posts': serializer.data})
        else:
            return Response({'error': 'No posts found'}, status=status.HTTP_404_NOT_FOUND)


class EditBlogPostView(APIView):
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
        if (data['new_slug']):
            if not (data['new_slug'] == 'undefined'):
                post.slug = slugify(data['new_slug'])
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

        if (data['category']):
            if not (data['category'] == 'undefined'):
                category_id = int(data['category'])
                category = Category.objects.get(id=category_id)
                post.category = category
                post.save()

        if (data['thumbnail']):
            if not (data['thumbnail'] == 'undefined'):
                post.thumbnail = data['thumbnail']
                post.save()

        return Response({'success': 'Post edited'})


class DraftBlogPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'draft'
        post.save()

        return Response({'success': 'Post edited'})


class PublishBlogPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def put(self, request, format=None):
        data = self.request.data
        slug = data['slug']

        post = Post.objects.get(slug=slug)

        post.status = 'published'
        post.save()

        return Response({'success': 'Post edited'})


class DeleteBlogPostView(APIView):
    permission_classes = (IsPostAuthorOrReadOnly, )

    def delete(self, request, slug, format=None):

        post = Post.objects.get(slug=slug)

        post.delete()

        return Response({'success': 'Post edited'})


class CreateBlogPostView(APIView):
    permission_classes = (AuthorPermission, )

    def post(self, request, format=None):
        user = self.request.user
        Post.objects.create(author=user)

        return Response({'success': 'Post edited'})
