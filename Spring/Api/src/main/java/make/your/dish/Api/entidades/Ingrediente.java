package make.your.dish.Api.entidades;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "ingredients", schema = "myd_app")
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "principal", nullable = false)
    private String principal;

    @OneToMany(mappedBy = "ingrediente")
    private List<IngredientesReceta> recetas;


    public String getPrincipal() {
        return principal;
    }

    public void setPrincipal(String principal) {
        this.principal = principal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}