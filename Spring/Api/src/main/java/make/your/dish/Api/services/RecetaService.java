package make.your.dish.Api.services;

import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.repositorio.RecetaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

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

    public List<Receta> obtenerRecetasPorIngrediente(Integer ingredienteId) {
        return recetaRepository.findRecetasByIngrediente(ingredienteId);
    }

    public Optional<Receta> obtenerRecetaPorId(Integer id) {
        return recetaRepository.findById(Long.valueOf(id));
    }

}