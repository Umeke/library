from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('select-book/', views.select_book, name='select_book'),
    path('<int:book_id>/<str:language>/ask/', views.ask_question, name='ask_question'),
    path('<int:book_id>/ask/', views.ask_local_question, name='ask_local_question'),
    path('submit-answer/', views.submit_answer, name='submit_answer'),
    path('result/', views.show_result, name='show_result'),
    path('restart/', views.restart_game, name='restart_game'),
    path('<int:book_id>/ratings/', views.view_ratings, name='view_ratings'),
    path('error/', views.error_page, name='error'),
]
