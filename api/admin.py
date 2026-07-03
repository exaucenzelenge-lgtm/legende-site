from django.contrib import admin
from .models import Artist, GalleryPhoto, PlaylistTrack, SocialLink, MusicLink

#admin.site.register(Artist)
#admin.site.register(GalleryPhoto)
#admin.site.register(PlaylistTrack)
#admin.site.register(SocialLink)
#admin.site.register(MusicLink)

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'nickname', 'next_concert', 'created_at']
    search_fields = ['name', 'nickname']

@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ['id', 'artist', 'order']
    list_filter = ['artist']

@admin.register(PlaylistTrack)
class PlaylistTrackAdmin(admin.ModelAdmin):
    list_display = ['title', 'artist', 'duration', 'order']
    list_filter = ['artist']

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'artist', 'order']
    list_filter = ['artist']

@admin.register(MusicLink)
class MusicLinkAdmin(admin.ModelAdmin):
    list_display = ['link_type', 'platform_name', 'artist', 'order']
    list_filter = ['artist', 'link_type']