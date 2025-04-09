package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.Ingrediente;
import make.your.dish.Api.entidades.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
}
