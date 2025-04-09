package make.your.dish.Api.services;

import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.repositorio.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RecetaService {

    private final RecetaRepository recetaRepository;

    @Autowired
    public RecetaService(RecetaRepository recetaRepository) {
        this.recetaRepository = recetaRepository;
    }

    public List<Receta> getAllRecipes() {
        return recetaRepository.findAll();
    }
}