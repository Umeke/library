from django.urls import path
from . import views

app_name = 'clubs'

urlpatterns = [
    path('', views.club_list, name='club_list'),
    path('create/', views.club_create, name='club_create'),
    path('<int:club_id>/', views.club_detail, name='club_detail'),
    # path('<int:id>/update/', views.club_update, name='club_update'),
    # path('<int:id>/delete/', views.club_delete, name='club_delete'),
    path('<int:club_id>/post/create/', views.club_post_create, name='club_post_create'),
    path('<int:club_id>/request-to-join/', views.request_to_join, name='request_to_join'),
    path('<int:club_id>/manage-requests/', views.manage_membership_requests, name='manage_membership_requests'),
]
