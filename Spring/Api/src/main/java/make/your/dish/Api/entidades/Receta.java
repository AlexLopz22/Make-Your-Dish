package make.your.dish.Api.entidades;

import jakarta.persistence.*;

@Entity
@Table(name = "recipes", schema = "myd_app")
public class Receta {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String title;
        private String imageUrl;
        private String instructions;
        private Integer prepTime;
        private Integer cookTime;
        private Integer servings;
        private String description;

        // Getters and setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getImageUrl() {
            return imageUrl;
        }

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }

        public String getInstructions() {
            return instructions;
        }

        public void setInstructions(String instructions) {
            this.instructions = instructions;
        }

        public Integer getPrepTime() {
            return prepTime;
        }

        public void setPrepTime(Integer prepTime) {
            this.prepTime = prepTime;
        }

        public Integer getCookTime() {
            return cookTime;
        }

        public void setCookTime(Integer cookTime) {
            this.cookTime = cookTime;
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
}
