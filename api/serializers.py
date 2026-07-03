from rest_framework import serializers
from .models import Artist, GalleryPhoto, PlaylistTrack, SocialLink, MusicLink

class GalleryPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryPhoto
        fields = ['id', 'photo_data', 'order']

class PlaylistTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistTrack
        fields = ['id', 'title', 'url', 'duration', 'order']

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ['id', 'name', 'url', 'icon_class', 'color', 'order']

class MusicLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicLink
        fields = ['id', 'link_type', 'platform_name', 'url', 'icon_class', 'color', 'order']

class ArtistSerializer(serializers.ModelSerializer):
    gallery = GalleryPhotoSerializer(many=True, read_only=True)
    playlist = PlaylistTrackSerializer(many=True, read_only=True)
    socials = SocialLinkSerializer(many=True, read_only=True)
    music_links = MusicLinkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Artist
        fields = '__all__'