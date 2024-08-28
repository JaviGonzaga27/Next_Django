from django.urls import path
from .views import CitaListView, CitaDetailView, EstadisticasCitasView

urlpatterns = [
    path('citas/', CitaListView.as_view(), name='cita-list'),
    path('citas/<int:pk>/', CitaDetailView.as_view(), name='cita-detail'),
    path('citas/estadisticas/', EstadisticasCitasView.as_view(), name='estadisticas-citas'),
]