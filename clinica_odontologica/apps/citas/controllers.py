from .models import Cita

class CitaController:
    @staticmethod
    def crear_cita(paciente, doctor, fecha, motivo):
        return Cita.objects.create(
            paciente=paciente,
            doctor=doctor,
            fecha=fecha,
            motivo=motivo
        )
    
    @staticmethod
    def obtener_citas():
        return Cita.objects.all()
    
    @staticmethod
    def obtener_cita(cita_id):
        return Cita.objects.get(id=cita_id)
    
    @staticmethod
    def actualizar_cita(cita_id, **kwargs):
        cita = Cita.objects.get(id=cita_id)
        for key, value in kwargs.items():
            setattr(cita, key, value)
        cita.save()
        return cita
    
    @staticmethod
    def eliminar_cita(cita_id):
        cita = Cita.objects.get(id=cita_id)
        cita.delete()