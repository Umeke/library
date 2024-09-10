from django.contrib import admin
from .models import Event


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'creator')
    search_fields = ('title', 'description')
    list_filter = ('date',)
    filter_horizontal = ('participants',)
