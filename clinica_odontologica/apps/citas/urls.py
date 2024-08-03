from django.urls import path
from .views import CitaListView, CitaDetailView

urlpatterns = [
    path('citas/', CitaListView.as_view(), name='cita-list'),
    path('citas/<int:pk>/', CitaDetailView.as_view(), name='cita-detail'),
]