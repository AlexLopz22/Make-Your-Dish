package make.your.dish.Api.entidades;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "recipes", schema = "myd_app")
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;  // Cambié de Long a Integer, ya que el tipo en la base de datos es INT.

    @Column(name = "title")
    private String title;

    @Column(name = "image_url")
    private String image_url;

    @Column(name = "cook_time_minutes")
    private Integer cookTimeMinutes;

    @Column(name = "prep_time_minutes")
    private Integer prepTimeMinutes;

    @Column(name = "total_time_minutes")
    private Integer totalTimeMinutes;

    @Column(name = "servings")
    private Integer servings;

    @Column(name = "category")
    private String category;

    @Column(name = "cuisine")
    private String cuisine;

    @Column(name = "calories_per_serving")
    private Integer caloriesPerServing;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "receta", cascade = CascadeType.ALL)
    private List<IngredientesReceta> ingredientes;

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getCookTimeMinutes() {
        return cookTimeMinutes;
    }

    public void setCookTimeMinutes(Integer cookTimeMinutes) {
        this.cookTimeMinutes = cookTimeMinutes;
    }

    public Integer getPrepTimeMinutes() {
        return prepTimeMinutes;
    }

    public void setPrepTimeMinutes(Integer prepTimeMinutes) {
        this.prepTimeMinutes = prepTimeMinutes;
    }

    public Integer getTotalTimeMinutes() {
        return totalTimeMinutes;
    }

    public void setTotalTimeMinutes(Integer totalTimeMinutes) {
        this.totalTimeMinutes = totalTimeMinutes;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getCaloriesPerServing() {
        return caloriesPerServing;
    }

    public void setCaloriesPerServing(Integer caloriesPerServing) {
        this.caloriesPerServing = caloriesPerServing;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }
}
