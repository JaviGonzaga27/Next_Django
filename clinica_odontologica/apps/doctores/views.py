from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Doctor
from .controllers import DoctorController
from .serializers import DoctorSerializer

class DoctorListView(APIView):
    def get(self, request):
        doctores = DoctorController.obtener_doctores()
        serializer = DoctorSerializer(doctores, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            doctor = DoctorController.crear_doctor(**serializer.validated_data)
            return Response(DoctorSerializer(doctor).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorDetailView(APIView):
    def get(self, request, pk):
        try:
            doctor = DoctorController.obtener_doctor(pk)
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            doctor = DoctorController.actualizar_doctor(pk, **request.data)
            return Response(DoctorSerializer(doctor).data)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            DoctorController.eliminar_doctor(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Doctor.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
