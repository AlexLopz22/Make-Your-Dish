package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.PasosReceta;
import make.your.dish.Api.entidades.Receta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasosRecetaRepository extends JpaRepository<PasosReceta, Long> {
    List<PasosReceta> findByIdRecetaIdOrderByIdNumPasoAsc(Long idReceta);
}
