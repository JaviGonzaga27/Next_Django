from rest_framework import serializers
from .models import Doctor
from apps.usuarios.serializers import UsuarioSerializer
from apps.usuarios.models import Usuario

class DoctorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    usuario_id = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.all(), 
        source='usuario', 
        write_only=True
    )

    class Meta:
        model = Doctor
        fields = ['id', 'usuario', 'usuario_id', 'especialidad', 'telefono', 'is_active']
        extra_kwargs = {'usuario': {'read_only': True}}

    def create(self, validated_data):
        return Doctor.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['nombre_completo'] = instance.usuario.get_full_name()
        return representation