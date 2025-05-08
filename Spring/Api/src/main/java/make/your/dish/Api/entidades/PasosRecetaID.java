package make.your.dish.Api.entidades;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;


@Embeddable
public class PasosRecetaID implements Serializable {
    @Column(name = "recipe_id")
    private int recetaId;
    @Column(name = "step_number")
    private int numPaso;

    public PasosRecetaID() {}

    public PasosRecetaID(int recetaId, int numPaso) {
        this.recetaId = recetaId;
        this.numPaso = numPaso;
    }

    public int getrecetaId() { return recetaId; }
    public void setrecetaId(int recipeId) { this.recetaId = recetaId; }

    public int getnumPaso() { return numPaso; }
    public void setnumPaso(int numPaso) { this.numPaso = numPaso; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PasosRecetaID)) return false;
        PasosRecetaID that = (PasosRecetaID) o;
        return recetaId == that.recetaId && numPaso == that.numPaso;
    }

    @Override
    public int hashCode() {
        return Objects.hash(recetaId, numPaso);
    }
}

