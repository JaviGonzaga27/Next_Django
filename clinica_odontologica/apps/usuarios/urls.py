from django.urls import path
from .views import UsuarioListView, UsuarioDetailView

urlpatterns = [
    path('usuarios/', UsuarioListView.as_view(), name='usuario-list'),
    path('usuarios/<int:pk>/', UsuarioDetailView.as_view(), name='usuario-detail'),
]