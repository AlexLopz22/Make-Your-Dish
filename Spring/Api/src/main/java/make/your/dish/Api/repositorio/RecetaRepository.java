package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.Receta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {

    @Query("SELECT ri.receta FROM IngredientesReceta ri WHERE ri.ingrediente.id = :ingredienteId")
    List<Receta> findRecetasByIngrediente(@Param("ingredienteId") Integer ingredienteId);
}
