from django.urls import path
from .views import BlogCategoryListView, WikiListView, WikiDetailView, BlogListView, BlogDetailView, HelpCategoryListView, GuideListView, GuideDetailView

urlpatterns = [
    # Repite para otros modelos (Blog, HRTalks, Research, Guide, HelpCenter)...

    path('blog/list', BlogListView.as_view(), name='blog-list'),
    path('blog/details/<slug>', BlogDetailView.as_view(), name='blog-detail'),

    path('wikis/list', WikiListView.as_view(), name='wikis-list'),
    path('wikis/details/<slug>', WikiDetailView.as_view(), name='wikis-detail'),


    path('guide/list', GuideListView.as_view(), name='guide-list'),
    path('guide/details/<slug>', GuideDetailView.as_view(), name='guide-detail'),

    path('blog/categories/list', BlogCategoryListView.as_view(),
         name='blog-category-list'),
    # path('help/categories/list', HelpCategoryListView.as_view(),
    #      name='help-category-list'),

]
