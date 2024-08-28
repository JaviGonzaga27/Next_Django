from django.core.exceptions import ObjectDoesNotExist
from .models import Doctor

class DoctorController:
    @staticmethod
    def crear_doctor(usuario, especialidad, telefono, is_active=True):
        return Doctor.objects.create(
            usuario=usuario, 
            especialidad=especialidad, 
            telefono=telefono, 
            is_active=is_active
        )
    
    @staticmethod
    def obtener_doctores():
        return Doctor.objects.all()
    
    @staticmethod
    def obtener_doctor(doctor_id):
        try:
            return Doctor.objects.get(id=doctor_id)
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un doctor con id {doctor_id}")
    
    @staticmethod
    def actualizar_doctor(doctor_id, **kwargs):
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            for key, value in kwargs.items():
                setattr(doctor, key, value)
            doctor.save()
            return doctor
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un doctor con id {doctor_id}")
    
    @staticmethod
    def eliminar_doctor(doctor_id):
        try:
            doctor = Doctor.objects.get(id=doctor_id)
            doctor.delete()
        except ObjectDoesNotExist:
            raise ValueError(f"No se encontró un doctor con id {doctor_id}")