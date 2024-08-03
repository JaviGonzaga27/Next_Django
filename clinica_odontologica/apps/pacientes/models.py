from django.db import models
from apps.usuarios.models import Usuario

class Paciente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=10)
    direccion = models.TextField()

    def __str__(self):
        return f"{self.usuario.get_full_name()} - Paciente"