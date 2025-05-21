package make.your.dish.Api.services;

import make.your.dish.Api.entidades.Usuario;
import make.your.dish.Api.repositorio.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuariosService {
    private UsuariosRepository repository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UsuariosService(UsuariosRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Usuario> getAllUsuarios (){
        return repository.findAll();
    }

    public void registrarUsuario(Usuario usuario) {
        String contraseñaEncriptada = passwordEncoder.encode(usuario.getContraseña());

        usuario.setContraseña(contraseñaEncriptada);

        repository.save(usuario);
    }

    public Usuario autenticarYObtenerUsuario(String email, String contraseñaIngresada) {
        return repository.findByEmail(email)
                .filter(usuario -> passwordEncoder.matches(contraseñaIngresada, usuario.getContraseña()))
                .orElse(null);
    }

    public Usuario actualizarUsuario(Usuario usuarioNuevo) {
        Usuario usuario = repository.findById(usuarioNuevo.getId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (usuarioNuevo.getNombre() != null) {
            usuario.setNombre(usuarioNuevo.getNombre());
        }

        if (usuarioNuevo.getEmail() != null) {
            usuario.setEmail(usuarioNuevo.getEmail());
        }

        if (usuarioNuevo.getContraseña() != null && !usuarioNuevo.getContraseña().isBlank()) {
            String contraseñaEncriptada = passwordEncoder.encode(usuarioNuevo.getContraseña());

            usuario.setContraseña(contraseñaEncriptada);
        }

        return repository.save(usuario);
    }
}
