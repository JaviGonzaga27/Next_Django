# Generated by Django 5.0.7 on 2024-08-03 01:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('citas', '0002_initial'),
        ('pacientes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cita',
            name='paciente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pacientes.paciente'),
        ),
    ]
