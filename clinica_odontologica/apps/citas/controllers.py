from django.core.exceptions import ObjectDoesNotExist
from .models import Cita

class CitaController:
    @staticmethod
    def crear_cita(**kwargs):
        return Cita.objects.create(**kwargs)
    
    @staticmethod
    def obtener_citas():
        return Cita.objects.all()
    
    @staticmethod
    def obtener_cita(cita_id):
        try:
            return Cita.objects.get(id=cita_id)
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró una cita con id {cita_id}")
    
    @staticmethod
    def actualizar_cita(cita_id, **kwargs):
        try:
            cita = Cita.objects.get(id=cita_id)
            
            for key, value in kwargs.items():
                setattr(cita, key, value)
            
            cita.save()
            return cita
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró una cita con id {cita_id}")
    
    @staticmethod
    def eliminar_cita(cita_id):
        try:
            cita = Cita.objects.get(id=cita_id)
            cita.delete()
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró una cita con id {cita_id}")