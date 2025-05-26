package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.PasosReceta;
import make.your.dish.Api.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuariosRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
}
