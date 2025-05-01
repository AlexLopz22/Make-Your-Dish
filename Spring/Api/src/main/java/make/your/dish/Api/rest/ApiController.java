package make.your.dish.Api.rest;


import make.your.dish.Api.dto.IngredienteCantidadDTO;
import make.your.dish.Api.entidades.Ingrediente;
import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.services.IngredienteService;
import make.your.dish.Api.services.RecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import make.your.dish.Api.repositorio.RecetaRepository;
import java.util.List;
import java.util.Optional;

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
    public List<Ingrediente> getAllIngredientesPrincipales(){
        return ingredienteService.getAllIngredientesPrincipales();
    }

    @GetMapping("/recetas/ingrediente/{ingredienteId}")
    public List<Receta> obtenerRecetasPorIngrediente(@PathVariable Integer ingredienteId) {
        return recetaService.obtenerRecetasPorIngrediente(ingredienteId);
    }

    @GetMapping("/receta/{id}")
    public Optional<Receta> obtenerRecetaPorId(@PathVariable Integer id) {
        return recetaService.obtenerRecetaPorId(id);
    }

    @GetMapping("/receta/ingredientes/{idreceta}")
    public List<IngredienteCantidadDTO> obtenerIngredientesPorReceta(@PathVariable Integer idreceta) {
        return ingredienteService.getIngredientesByReceta(idreceta);
    }
}
