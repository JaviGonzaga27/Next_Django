from .models import Paciente

class PacienteController:
    @staticmethod
    def crear_paciente(usuario, fecha_nacimiento, telefono, direccion):
        return Paciente.objects.create(
            usuario=usuario, 
            fecha_nacimiento=fecha_nacimiento, 
            telefono=telefono, 
            direccion=direccion
        )
    
    @staticmethod
    def obtener_pacientes():
        return Paciente.objects.all()
    
    @staticmethod
    def obtener_paciente(paciente_id):
        return Paciente.objects.get(id=paciente_id)
    
    @staticmethod
    def actualizar_paciente(paciente_id, **kwargs):
        paciente = Paciente.objects.get(id=paciente_id)
        for key, value in kwargs.items():
            setattr(paciente, key, value)
        paciente.save()
        return paciente
    
    @staticmethod
    def eliminar_paciente(paciente_id):
        paciente = Paciente.objects.get(id=paciente_id)
        paciente.delete()