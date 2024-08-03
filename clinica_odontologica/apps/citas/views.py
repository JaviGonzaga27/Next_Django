from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Cita
from .serializers import CitaSerializer
from .controllers import CitaController

class CitaListView(APIView):
    def get(self, request):
        citas = CitaController.obtener_citas()
        serializer = CitaSerializer(citas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CitaSerializer(data=request.data)
        if serializer.is_valid():
            cita = CitaController.crear_cita(**serializer.validated_data)
            return Response(CitaSerializer(cita).data, status=status.HTTP_201_CREATED)
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