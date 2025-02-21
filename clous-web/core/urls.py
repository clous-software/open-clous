
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings
from django.views.static import serve
import os

sitemaps = {
}


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),

    path('api/blog/', include('apps.blog.urls')),
    path('api/wikis/', include('apps.wikis.urls')),
    path('api/category/', include('apps.category.urls')),

    path('ckeditor/', include('ckeditor_uploader.urls')),

    path('admin/', admin.site.urls),
    path('sitemap.xml', serve, {'document_root': str(
        settings.BASE_DIR / 'build'), 'path': 'sitemap.xml'}),
    path('disavow.txt', serve, {'document_root': str(
        settings.BASE_DIR / 'build'), 'path': 'disavow.txt'}),
    path('robots.txt', serve, {'document_root': str(
        settings.BASE_DIR / 'build'), 'path': 'robots.txt'}),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
