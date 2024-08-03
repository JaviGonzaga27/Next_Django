from django.urls import path
from .views import DoctorListView, DoctorDetailView

urlpatterns = [
    path('doctores/', DoctorListView.as_view(), name='doctor-list'),
    path('doctores/<int:pk>/', DoctorDetailView.as_view(), name='doctor-detail'),
]