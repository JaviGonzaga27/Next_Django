from .models import Doctor

class DoctorController:
    @staticmethod
    def crear_doctor(usuario, especialidad, telefono, is_active):
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
        return Doctor.objects.get(id=doctor_id)
    
    @staticmethod
    def actualizar_doctor(doctor_id, **kwargs):
        doctor = Doctor.objects.get(id=doctor_id)
        for key, value in kwargs.items():
            setattr(doctor, key, value)
        doctor.save()
        return doctor
    
    @staticmethod
    def eliminar_doctor(doctor_id):
        doctor = Doctor.objects.get(id=doctor_id)
        doctor.delete()