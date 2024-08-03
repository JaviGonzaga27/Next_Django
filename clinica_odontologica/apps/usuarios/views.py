from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Usuario
from .controllers import UsuarioController
from .serializers import UsuarioSerializer

class UsuarioListView(APIView):
    def get(self, request):
        usuarios = UsuarioController.obtener_usuarios()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            usuario = UsuarioController.crear_usuario(**serializer.validated_data)
            return Response(UsuarioSerializer(usuario).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UsuarioDetailView(APIView):
    def get(self, request, pk):
        try:
            usuario = UsuarioController.obtener_usuario(pk)
            serializer = UsuarioSerializer(usuario)
            return Response(serializer.data)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk):
        try:
            usuario = UsuarioController.actualizar_usuario(pk, **request.data)
            return Response(UsuarioSerializer(usuario).data)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, pk):
        try:
            UsuarioController.eliminar_usuario(pk)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Usuario.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)