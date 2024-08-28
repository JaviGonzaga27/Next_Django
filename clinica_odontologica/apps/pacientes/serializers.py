from rest_framework import serializers
from apps.usuarios.models import Usuario
from .models import Paciente

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['id', 'nombre', 'apellido', 'fecha_nacimiento', 'telefono', 'direccion']

    def create(self, validated_data):
        return Paciente.objects.create(**validated_data)