from rest_framework import serializers
from .models import Cita
from apps.pacientes.serializers import PacienteSerializer
from apps.doctores.serializers import DoctorSerializer
from apps.pacientes.models import Paciente
from apps.doctores.models import Doctor

class CitaSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    paciente_id = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all(),
        source='paciente',
        write_only=True
    )
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source='doctor',
        write_only=True
    )

    class Meta:
        model = Cita
        fields = ['id', 'paciente', 'doctor', 'paciente_id', 'doctor_id', 'fecha', 'duracion', 'motivo', 'estado']
        extra_kwargs = {
            'paciente': {'read_only': True},
            'doctor': {'read_only': True},
        }

    def create(self, validated_data):
        return Cita.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['paciente_nombre'] = instance.paciente.nombre + ' ' + instance.paciente.apellido
        representation['doctor_nombre'] = instance.doctor.usuario.get_full_name()
        return representation