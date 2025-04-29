package make.your.dish.Api.services;

import make.your.dish.Api.entidades.Ingrediente;
import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.repositorio.IngredienteRepository;
import make.your.dish.Api.repositorio.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredienteService {
    private final IngredienteRepository ingredienteRepository;

    @Autowired
    public IngredienteService(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }
    public List<Ingrediente> getAllIngredientesPrincipales() {
        return ingredienteRepository.findByPrincipal("Si");
    }

    public List<Ingrediente> getAllIngredientes() {
        return ingredienteRepository.findAll();
    }
}
