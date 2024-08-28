from django.core.exceptions import ObjectDoesNotExist
from .models import Paciente
from apps.usuarios.models import Usuario

class PacienteController:
    @staticmethod
    def crear_paciente(**kwargs):
        return Paciente.objects.create(**kwargs)
    
    @staticmethod
    def obtener_pacientes():
        return Paciente.objects.all()
    
    @staticmethod
    def obtener_paciente(paciente_id):
        try:
            return Paciente.objects.get(id=paciente_id)
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un paciente con id {paciente_id}")
    
    @staticmethod
    def actualizar_paciente(paciente_id, **kwargs):
        try:
            paciente = Paciente.objects.get(id=paciente_id)
            usuario_data = kwargs.pop('usuario', {})
            
            for key, value in kwargs.items():
                setattr(paciente, key, value)
            
            if usuario_data:
                for key, value in usuario_data.items():
                    setattr(paciente.usuario, key, value)
                paciente.usuario.save()
            
            paciente.save()
            return paciente
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un paciente con id {paciente_id}")
    
    @staticmethod
    def eliminar_paciente(paciente_id):
        try:
            paciente = Paciente.objects.get(id=paciente_id)
            usuario = paciente.usuario
            paciente.delete()
            # Descomenta la siguiente línea si quieres eliminar también el usuario
            # usuario.delete()
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un paciente con id {paciente_id}")