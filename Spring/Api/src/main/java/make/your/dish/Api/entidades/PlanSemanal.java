    package make.your.dish.Api.entidades;

    import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
    import jakarta.persistence.*;

    import java.time.LocalDate;

    @Entity
    @Table(name = "planes_semanales", uniqueConstraints = {
            @UniqueConstraint(columnNames = {"usuario_id", "fecha_lunes", "dia"})
    })
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public class PlanSemanal {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "usuario_id", nullable = false)
        private Usuario usuario;

        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private DiaSemana dia;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "receta_id", nullable = false)
        private Receta receta;

        public enum DiaSemana {
            Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public Usuario getUsuario() {
            return usuario;
        }

        public void setUsuario(Usuario usuario) {
            this.usuario = usuario;
        }

        public DiaSemana getDia() {
            return dia;
        }

        public void setDia(DiaSemana dia) {
            this.dia = dia;
        }

        public Receta getReceta() {
            return receta;
        }

        public void setReceta(Receta receta) {
            this.receta = receta;
        }
    }