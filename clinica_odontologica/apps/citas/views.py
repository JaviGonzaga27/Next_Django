from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cita
from .controllers import CitaController
from .serializers import CitaSerializer
from django.utils import timezone
from datetime import timedelta

class CitaListView(APIView):
    def get(self, request):
        citas = CitaController.obtener_citas()
        serializer = CitaSerializer(citas, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        print("Datos recibidos:", request.data)
        serializer = CitaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CitaDetailView(APIView):
    def get(self, request, pk):
        try:
            cita = CitaController.obtener_cita(pk)
            serializer = CitaSerializer(cita)
            return Response(serializer.data)
        except Cita.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            cita = CitaController.actualizar_cita(pk, **request.data)
            return Response(CitaSerializer(cita).data)
        except Cita.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            CitaController.eliminar_cita(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Cita.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class EstadisticasCitasView(APIView):
    def get(self, request):
        hoy = timezone.now().date()
        semana = hoy + timedelta(days=7)
        
        citas_hoy = Cita.objects.filter(fecha__date=hoy).count()
        
        proxima_cita = Cita.objects.filter(fecha__gte=timezone.now()).order_by('fecha').first()
        proxima_cita_str = proxima_cita.fecha.strftime("%H:%M") if proxima_cita else "No hay citas programadas"
        
        citas_semana = Cita.objects.filter(fecha__date__range=[hoy, semana]).count()
        
        citas_pendientes = Cita.objects.filter(fecha__gte=timezone.now(), estado='PROGRAMADA').count()

        return Response({
            'citasHoy': citas_hoy,
            'proximaCita': proxima_cita_str,
            'citasSemana': citas_semana,
            'citasPendientes': citas_pendientes
        }, status=status.HTTP_200_OK)