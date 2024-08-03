from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Paciente
from .controllers import PacienteController
from .serializers import PacienteSerializer

class PacienteListView(APIView):
    def get(self, request):
        pacientes = PacienteController.obtener_pacientes()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            paciente = PacienteController.crear_paciente(**serializer.validated_data)
            return Response(PacienteSerializer(paciente).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PacienteDetailView(APIView):
    def get(self, request, pk):
        try:
            paciente = PacienteController.obtener_paciente(pk)
            serializer = PacienteSerializer(paciente)
            return Response(serializer.data)
        except Paciente.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            paciente = PacienteController.actualizar_paciente(pk, **request.data)
            return Response(PacienteSerializer(paciente).data)
        except Paciente.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            PacienteController.eliminar_paciente(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Paciente.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
