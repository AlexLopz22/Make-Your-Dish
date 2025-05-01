package make.your.dish.Api.dto;

public class IngredienteCantidadDTO {
    private Integer id;
    private String name;
    private String quantity;

    public IngredienteCantidadDTO(Integer id, String name, String quantity) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCantidad() {
        return quantity;
    }

    public void setCantidad(String quantity) {
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
