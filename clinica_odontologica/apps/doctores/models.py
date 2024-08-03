from django.db import models
from apps.usuarios.models import Usuario

class Doctor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    especialidad = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Dr. {self.usuario.get_full_name()} - {self.especialidad}"