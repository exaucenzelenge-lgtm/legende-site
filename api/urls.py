from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet

# ============================================================
# CRÉATION DU ROUTEUR
# ============================================================
router = DefaultRouter()
router.register('artist', ArtistViewSet, basename='artist')

# ============================================================
# URL PATTERNS
# ============================================================
urlpatterns = [
    path('', include(router.urls)),
]