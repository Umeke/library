from django.urls import path
from . import views

app_name = 'archives'

urlpatterns = [
    path('', views.archive_list, name='archive_list'),
    path('create/', views.archive_create, name='archive_create'),
    path('<int:pk>/', views.archive_detail, name='archive_detail'),
    path('<int:pk>/update/', views.archive_update, name='archive_update'),
    path('<int:pk>/delete/', views.archive_delete, name='archive_delete'),
]
