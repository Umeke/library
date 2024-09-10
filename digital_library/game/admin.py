from django.contrib import admin
from .models import GameResult, Question, Answer


@admin.register(GameResult)
class GameResultAdmin(admin.ModelAdmin):
    pass


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('book', 'text', 'correct_answer')
    search_fields = ('text',)
    list_filter = ('book',)


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('question', 'text')
