from django.db import models
#from .models import Artist

class Artist(models.Model):
    name = models.CharField(max_length=100, default="ROCK M")
    nickname = models.CharField(max_length=100, default="Roi Lion")
    bio = models.TextField(default="Rock M lover est un artiste chanteur...")
    hero_photo = models.TextField(blank=True, null=True)
    background_photo = models.TextField(blank=True, null=True)
    dashboard_background = models.TextField(blank=True, null=True)
    next_concert = models.CharField(max_length=200, default="Kinshasa - 15 Décembre 2025")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class GalleryPhoto(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='gallery')
    photo_data = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class PlaylistTrack(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='playlist')
    title = models.CharField(max_length=200)
    url = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=20, default="3:30")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class SocialLink(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='socials')
    name = models.CharField(max_length=50)
    url = models.URLField()
    icon_class = models.CharField(max_length=50)
    color = models.CharField(max_length=20, default="#ffffff")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class MusicLink(models.Model):
    LINK_TYPES = [
        ('clip', 'Nouveau Clip'),
        ('song', 'Nouveau Son'),
        ('album', 'Nouvel Album'),
    ]
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='music_links')
    link_type = models.CharField(max_length=10, choices=LINK_TYPES)
    platform_name = models.CharField(max_length=50)
    url = models.URLField()
    icon_class = models.CharField(max_length=50)
    color = models.CharField(max_length=20, default="#ffffff")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['link_type', 'order']