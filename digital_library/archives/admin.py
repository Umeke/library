from django.contrib import admin
from .models import DigitalArchive


class ArchiveAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'uploaded_by')
    search_fields = ('title',)
    list_filter = ('uploaded_by',)


admin.site.register(DigitalArchive, ArchiveAdmin)
