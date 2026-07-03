from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Artist, GalleryPhoto, PlaylistTrack, SocialLink, MusicLink
from .serializers import (
    ArtistSerializer, 
    GalleryPhotoSerializer, 
    PlaylistTrackSerializer,
    SocialLinkSerializer,
    MusicLinkSerializer
)

class ArtistViewSet(viewsets.ModelViewSet):
    """
    API ViewSet pour l'artiste ROCK M
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    
    @action(detail=True, methods=['post'])
    def add_gallery_photo(self, request, pk=None):
        """Ajouter une photo à la galerie (max 10)"""
        artist = self.get_object()
        if artist.gallery.count() >= 10:
            return Response(
                {'error': 'Maximum 10 photos atteint'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = GalleryPhotoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(artist=artist, order=artist.gallery.count())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'])
    def delete_gallery_photo(self, request, pk=None):
        """Supprimer une photo de la galerie"""
        photo_id = request.data.get('photo_id')
        if not photo_id:
            return Response(
                {'error': 'photo_id requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            photo = GalleryPhoto.objects.get(id=photo_id, artist_id=pk)
            photo.delete()
            # Réorganiser les ordres
            artist = self.get_object()
            for idx, p in enumerate(artist.gallery.all()):
                p.order = idx
                p.save()
            return Response({'status': 'deleted', 'message': 'Photo supprimée'})
        except GalleryPhoto.DoesNotExist:
            return Response(
                {'error': 'Photo non trouvée'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['post'])
    def add_playlist_track(self, request, pk=None):
        """Ajouter un morceau à la playlist"""
        artist = self.get_object()
        serializer = PlaylistTrackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(artist=artist, order=artist.playlist.count())
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'])
    def delete_playlist_track(self, request, pk=None):
        """Supprimer un morceau de la playlist"""
        track_id = request.data.get('track_id')
        if not track_id:
            return Response(
                {'error': 'track_id requis'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            track = PlaylistTrack.objects.get(id=track_id, artist_id=pk)
            track.delete()
            return Response({'status': 'deleted', 'message': 'Morceau supprimé'})
        except PlaylistTrack.DoesNotExist:
            return Response(
                {'error': 'Morceau non trouvé'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=True, methods=['get'])
    def full_data(self, request, pk=None):
        """Récupérer toutes les données de l'artiste en une fois"""
        artist = self.get_object()
        serializer = self.get_serializer(artist)
        return Response(serializer.data)

@api_view(['POST'])
def send_contact_message(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')
    
    send_mail(
        subject=f'Nouveau message de {name}',
        message=f'Email: {email}\n\nMessage:\n{message}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=['contact@rockm-music.com'],
        fail_silently=False,
    )

    
    return Response({'status': 'sent'})