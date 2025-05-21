package make.your.dish.Api.repositorio;

import jakarta.transaction.Transactional;
import make.your.dish.Api.entidades.PlanSemanal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PlanSemanalRepository extends JpaRepository<PlanSemanal, Long> {

    List<PlanSemanal> findByUsuarioId(Long usuarioId);

    @Query(value = """

    SELECT\s
    nombre_ingrediente,
    SUM(cantidad_num) AS cantidad_total,
    unidad_normalizada AS unidad
    FROM (
        SELECT\s
            i.name AS nombre_ingrediente,
            ri.cantidad_num,
            ri.unidad,
            CASE
                WHEN ri.unidad IN ('al gusto', 'cucharada', 'cucharadas') THEN NULL
                ELSE ri.unidad
            END AS unidad_normalizada
        FROM recipe_ingredients ri
        JOIN ingredients i ON ri.ingredient_id = i.id
        WHERE ri.unidad NOT IN ('al gusto', 'cucharada', 'cucharadas')
    ) AS sub
    GROUP BY nombre_ingrediente, unidad_normalizada
    ORDER BY nombre_ingrediente;
    """, nativeQuery = true)
    @Transactional
    List<Object[]> findIngredientesSemanalByUsuarioId(@Param("usuarioId") Long usuarioId);

}
