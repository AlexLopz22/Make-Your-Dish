package make.your.dish.Api.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
@Entity
@Table(name = "recipe_steps")
public class PasosReceta {

    @EmbeddedId
    private PasosRecetaID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "recipe_id", insertable = false, updatable = false)
    private Receta receta;

    @Column(name = "description")
    private String descripcion;

    @Column(name = "image_url", length = 2083)
    private String imagenUrl;

    // Constructors
    public PasosReceta() {}

    public PasosReceta(PasosRecetaID id, String descripcion, String imagenUrl) {
        this.id = id;
        this.descripcion = descripcion;
        this.imagenUrl = imagenUrl;
    }

    // Getters and Setters
    public PasosRecetaID getId() {
        return id;
    }

    public void setId(PasosRecetaID id) {
        this.id = id;
    }

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta recipe) {
        this.receta = recipe;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }
}
