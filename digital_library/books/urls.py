from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    path('', views.BookListView.as_view(), name='book_list'),
    path('search/', views.search_results, name='search_results'),

    path('create/', views.BookFormView.as_view(), name='book_create'),
    path('<int:id>/', views.BookDetailView.as_view(), name='book_detail'),
    path('<int:pk>/update/', views.BookUpdateFormView.as_view(), name='book_update'),

    path('books/<int:book_id>/request/', views.create_exchange_request, name='create_exchange_request'),
    path('pending-requests/', views.pending_requests, name='pending_requests'),
    path('accept-request/<int:request_id>/', views.accept_request, name='accept_request'),
    path('reject-request/<int:request_id>/', views.reject_request, name='reject_request'),

    path('shared-progress/', views.shared_progress, name='shared_progress'),
    path('finished-books/', views.finished_books, name='finished_books'),
    path('finished-books/remove/<int:book_id>/', views.remove_finished_book, name='remove_finished_book'),

    path('bookshelf/', views.profile_bookshelf, name='profile_bookshelf'),
    path('book/<int:book_id>/progress/', views.add_edit_progress, name='add_edit_progress'),
    path('book/<int:book_id>/finished/', views.add_to_finished_books, name='add_to_finished_books'),
    path('book/<int:book_id>/toggle_visibility/', views.toggle_visibility, name='toggle_visibility'),
    path('progress/<int:book_id>/toggle_visibility/', views.toggle_progress_visibility, name='toggle_progress_visibility'),

    path('<int:book_id>/discussions/start/', views.start_discussion, name='start_discussion'),
    path('<int:book_id>/discussions/', views.discussion_list, name='discussion_list'),
    path('<int:book_id>/discussions/<int:discussion_id>/', views.discussion_detail, name='discussion_detail'),
    path('discussions/<int:discussion_id>/comment/', views.add_comment, name='add_comment'),
    path('discussions/<int:discussion_id>/comment/<int:comment_id>/reply/', views.reply_comment, name='reply_comment'),

    # path('<int:id>/delete/', views.book_delete, name='book_delete'),
]

