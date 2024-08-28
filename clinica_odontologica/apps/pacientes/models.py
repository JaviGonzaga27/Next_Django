from django.db import models
from apps.usuarios.models import Usuario

class Paciente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=10)
    direccion = models.TextField()

    def __str__(self):
        return f"{self.nombre} {self.apellido} - Paciente"