from rest_framework import serializers
from .models import Cita

class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = ['id', 'paciente', 'doctor', 'fecha', 'duracion', 'motivo', 'estado']

    def create(self, validated_data):
        return Cita.objects.create(**validated_data)