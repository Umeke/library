from django.urls import path
from . import views

app_name = 'events'

urlpatterns = [
    path('', views.event_list, name='event_list'),
    path('', views.event_list, name='event_list'),
    path('<int:pk>/', views.event_detail, name='event_detail'),
    path('<int:pk>/join/', views.join_event, name='join_event'),
    path('create/', views.create_event, name='create_event'),
    # path('<int:id>/update/', views.event_update, name='event_update'),
    # path('<int:id>/delete/', views.event_delete, name='event_delete'),
]
