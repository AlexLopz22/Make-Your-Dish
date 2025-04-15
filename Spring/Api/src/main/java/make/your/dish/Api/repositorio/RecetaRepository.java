package make.your.dish.Api.repositorio;

import make.your.dish.Api.entidades.Receta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    Page<Receta> findAll(Pageable pageable);
}
