package make.your.dish.Api.rest;


import make.your.dish.Api.entidades.Ingrediente;
import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.services.IngredienteService;
import make.your.dish.Api.services.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final RecetaService recetaService;
    private final IngredienteService ingredienteService;

    @Autowired
    public ApiController(RecetaService recetaService, IngredienteService ingredienteService) {
        this.recetaService = recetaService;
        this.ingredienteService = ingredienteService;
    }

    @GetMapping("/recetas")
    public List<Receta> getAllRecipes() {
        return recetaService.getAllRecipes();
    }

    @GetMapping("/ingredientes")
    public List<Ingrediente> getAllIngredientes(){
        return ingredienteService.getAllIngredientes();
    }
}
