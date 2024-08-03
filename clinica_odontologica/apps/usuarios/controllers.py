from .models import Usuario

class UsuarioController:
    @staticmethod
    def crear_usuario(username, email, password, **kwargs):
        return Usuario.objects.create_user(username=username, email=email, password=password, **kwargs)
    
    @staticmethod
    def obtener_usuarios():
        return Usuario.objects.all()
    
    @staticmethod
    def obtener_usuario(usuario_id):
        return Usuario.objects.get(id=usuario_id)
    
    @staticmethod
    def actualizar_usuario(usuario_id, **kwargs):
        usuario = Usuario.objects.get(id=usuario_id)
        for key, value in kwargs.items():
            setattr(usuario, key, value)
        usuario.save()
        return usuario
    
    @staticmethod
    def eliminar_usuario(usuario_id):
        usuario = Usuario.objects.get(id=usuario_id)
        usuario.delete()
