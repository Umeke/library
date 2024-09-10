from django.contrib import admin
from .models import Club, ClubPost

class ClubPostInline(admin.TabularInline):
    model = ClubPost
    extra = 1
    readonly_fields = ('author', 'created_at')
    can_delete = False

class ClubAdmin(admin.ModelAdmin):
    list_display = ('name', 'creator', 'description', 'get_members_count', 'get_posts_count')
    search_fields = ('name', 'description', 'creator__username')
    list_filter = ('creator',)
    inlines = [ClubPostInline]

    def get_members_count(self, obj):
        return obj.members.count()
    get_members_count.short_description = 'Members'

    def get_posts_count(self, obj):
        return obj.posts.count()
    get_posts_count.short_description = 'Posts'

class ClubPostAdmin(admin.ModelAdmin):
    list_display = ('club', 'author', 'created_at', 'content')
    search_fields = ('club__name', 'author__username', 'content')
    list_filter = ('created_at', 'club')

admin.site.register(Club, ClubAdmin)
admin.site.register(ClubPost, ClubPostAdmin)
