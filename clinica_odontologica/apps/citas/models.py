from django.db import models
from apps.pacientes.models import Paciente
from apps.doctores.models import Doctor

class Cita(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    fecha = models.DateTimeField()
    duracion = models.IntegerField()
    motivo = models.TextField()
    estado = models.CharField(max_length=20, choices=[
        ('PROGRAMADA', 'Programada'),
        ('COMPLETADA', 'Completada'),
        ('CANCELADA', 'Cancelada')
    ], default='PROGRAMADA')

    def __str__(self):
        return f"Cita de {self.paciente} con {self.doctor} el {self.fecha}"