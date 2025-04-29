package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.Ingrediente;
import make.your.dish.Api.entidades.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    List<Ingrediente> findByPrincipal(String principal);
}
