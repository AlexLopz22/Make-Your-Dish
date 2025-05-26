package make.your.dish.Api.repositorio;

import make.your.dish.Api.dto.IngredienteCantidadDTO;
import make.your.dish.Api.entidades.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
    List<Ingrediente> findByPrincipal(String principal);

    @Query("SELECT new make.your.dish.Api.dto.IngredienteCantidadDTO(i.id, i.name, ri.quantity) " +
            "FROM IngredientesReceta ri JOIN ri.ingrediente i " +
            "WHERE ri.receta.id = :recetaId")
    List<IngredienteCantidadDTO> findIngredienteNamesByRecetaId(Long recetaId);
}
