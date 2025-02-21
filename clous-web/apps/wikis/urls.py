from django.urls import path
from .views import *


urlpatterns = [
    path('list', WikiListView.as_view()),
    path('detail/<slug>', PostDetailView.as_view(), name="post_detail"),

    path('edit', EditWikiPostView.as_view()),
    path('draft', DraftWikiPostView.as_view()),
    path('publish', PublishWikiPostView.as_view()),
    path('delete/<slug>', DeleteWikiPostView.as_view()),
    path('create', CreateWikiPostView.as_view()),
]
