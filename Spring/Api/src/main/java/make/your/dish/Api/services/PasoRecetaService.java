package make.your.dish.Api.services;

import make.your.dish.Api.entidades.PasosReceta;
import make.your.dish.Api.repositorio.PasosRecetaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PasoRecetaService {
    private final PasosRecetaRepository pasosRecetaRepository;

    public PasoRecetaService(PasosRecetaRepository pasosRecetaRepository) {this.pasosRecetaRepository = pasosRecetaRepository;}

    public List<PasosReceta> getAllPasos(int recetaId) {
        return pasosRecetaRepository.findByIdRecetaIdOrderByIdNumPasoAsc(Long.valueOf(recetaId));
    }
}
