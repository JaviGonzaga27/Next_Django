# Generated by Django 5.0.7 on 2024-08-27 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pacientes', '0003_paciente_apellido_paciente_nombre_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paciente',
            name='apellido',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='paciente',
            name='nombre',
            field=models.CharField(max_length=30),
        ),
    ]
