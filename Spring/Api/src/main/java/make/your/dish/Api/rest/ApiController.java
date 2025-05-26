package make.your.dish.Api.rest;


import make.your.dish.Api.dto.IngredienteCantidadDTO;
import make.your.dish.Api.dto.PlanRequestDTO;
import make.your.dish.Api.entidades.*;
import make.your.dish.Api.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import make.your.dish.Api.repositorio.RecetaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final RecetaService recetaService;
    private final IngredienteService ingredienteService;
    private final PasoRecetaService pasoRecetaService;
    private final UsuariosService usuariosService;
    private final PlanSemanalService planService;

    @Autowired
    public ApiController(RecetaService recetaService, IngredienteService ingredienteService, PasoRecetaService pasoRecetaService, UsuariosService usuariosService, PlanSemanalService planService) {
        this.recetaService = recetaService;
        this.ingredienteService = ingredienteService;
        this.pasoRecetaService = pasoRecetaService;
        this.usuariosService = usuariosService;
        this.planService = planService;
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

    @GetMapping("/receta/pasos/{idreceta}")
    public List<PasosReceta> obtenerPasosPorReceta(@PathVariable Integer idreceta) {
        return pasoRecetaService.getAllPasos(idreceta);
    }

    @PostMapping("/plan/asignar")
    public ResponseEntity<?> asignarReceta(
            @RequestBody PlanRequestDTO request
    ) {
        PlanSemanal nuevo = planService.asignarRecetaADia(
                request.getUsuarioId(),
                request.getDia(),
                request.getRecetaId()
        );
        return ResponseEntity.ok(nuevo);
    }

    @GetMapping("/plan/{usuarioId}")
    public ResponseEntity<?> obtenerPlanSemanal(
            @PathVariable Long usuarioId
    ) {
        return ResponseEntity.ok(planService.obtenerPlanSemanal(usuarioId));
    }

    @GetMapping("/plan/ingredientes/{usuarioId}")
    public ResponseEntity<?> obtenerPlanIngrediente(
            @PathVariable Long usuarioId
    ){
        return ResponseEntity.ok(planService.obtenerIngredientesSemanal(usuarioId));
    }
}
