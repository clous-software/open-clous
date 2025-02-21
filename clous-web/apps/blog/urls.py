from django.urls import path
from .views import *
# The API routes

urlpatterns = [
    path('list', BlogListView.as_view()),
    path('by_category', ListPostsByCategoryView.as_view()),
    path('detail/<slug>', PostDetailView.as_view(), name="post_detail"),
    path('search/<str:search_term>', SearchBlogView.as_view()),


    path('author_list', AuthorBlogListView.as_view()),
    path('edit', EditBlogPostView.as_view()),
    path('draft', DraftBlogPostView.as_view()),
    path('publish', PublishBlogPostView.as_view()),
    path('delete/<slug>', DeleteBlogPostView.as_view()),
    path('create', CreateBlogPostView.as_view()),
]
