package make.your.dish.Api.rest;

import make.your.dish.Api.entidades.LoginRequest;
import make.your.dish.Api.entidades.Usuario;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import make.your.dish.Api.services.UsuariosService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UsuariosService usuarioService;

    // Endpoint para registro
    @PostMapping("/register")
    public ResponseEntity<String> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok("Usuario registrado exitosamente");
        } catch (DataIntegrityViolationException e) {
            String errorMessage = e.getMessage();

            if (errorMessage.contains("Duplicate entry") && errorMessage.contains("usuarios.email")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado.");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error de integridad de datos: " + errorMessage);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error de restricción: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el usuario: " + e.getMessage());
        }
    }

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.autenticarYObtenerUsuario(
                loginRequest.getEmail(),
                loginRequest.getContraseña()
        );

        if (usuario != null) {
            return ResponseEntity.ok(Map.of(
                    "id", usuario.getId(),
                    "email", usuario.getEmail(),
                    "nombre", usuario.getNombre()
            ));
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }

    @PutMapping("/modificar")
    public ResponseEntity<String> actualizarUsuario(@RequestBody Usuario usuarioDetalles) {
        try {
            usuarioService.actualizarUsuario(usuarioDetalles);
            return ResponseEntity.ok("Usuario actualizado exitosamente");

        } catch (DataIntegrityViolationException e) {
            String errorMessage = e.getMessage();

            if (errorMessage.contains("Duplicate entry") && errorMessage.contains("usuarios.email")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo electrónico ya está registrado.");
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error de integridad de datos: " + errorMessage);

        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error de restricción: " + e.getMessage());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el usuario: " + e.getMessage());
        }
    }
}
