package make.your.dish.Api.entidades;
import jakarta.persistence.*;

@Entity
@Table(name = "recipe_ingredients")
public class IngredientesReceta {

    @EmbeddedId
    private IngredientesRecetaId id;

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    private Receta receta;

    @ManyToOne
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id")
    private Ingrediente ingrediente;

    private String quantity;

    public IngredientesRecetaId getId() {
        return id;
    }

    public void setId(IngredientesRecetaId id) {
        this.id = id;
    }

    public Receta getReceta() {
        return receta;
    }

    public void setReceta(Receta receta) {
        this.receta = receta;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Ingrediente getIngrediente() {
        return ingrediente;
    }

    public void setIngrediente(Ingrediente ingrediente) {
        this.ingrediente = ingrediente;
    }
}