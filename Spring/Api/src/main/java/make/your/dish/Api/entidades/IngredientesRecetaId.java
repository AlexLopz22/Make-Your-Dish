package make.your.dish.Api.entidades;

import java.io.Serializable;
import java.util.Objects;

public class IngredientesRecetaId implements Serializable {
    private Integer recipeId;
    private Integer ingredientId;

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        IngredientesRecetaId that = (IngredientesRecetaId) o;
        return Objects.equals(recipeId, that.recipeId) && Objects.equals(ingredientId, that.ingredientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeId, ingredientId);
    }
}
