package make.your.dish.Api.services;

import make.your.dish.Api.entidades.PlanSemanal;
import make.your.dish.Api.entidades.Receta;
import make.your.dish.Api.entidades.Usuario;
import make.your.dish.Api.repositorio.PlanSemanalRepository;
import make.your.dish.Api.repositorio.RecetaRepository;
import make.your.dish.Api.repositorio.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PlanSemanalService {

    @Autowired
    private PlanSemanalRepository planRepo;

    @Autowired
    private UsuariosRepository usuarioRepo;

    @Autowired
    private RecetaRepository recetaRepo;

    public PlanSemanal asignarRecetaADia(Integer usuarioId, PlanSemanal.DiaSemana dia, Long recetaId) {
        Usuario usuario = usuarioRepo.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Receta receta = recetaRepo.findById(recetaId)
                .orElseThrow(() -> new RuntimeException("Receta no encontrada"));

        PlanSemanal plan = new PlanSemanal();
        plan.setUsuario(usuario);
        plan.setDia(dia);
        plan.setReceta(receta);

        return planRepo.save(plan);
    }

    public List<PlanSemanal> obtenerPlanSemanal(Long usuarioId) {
        return planRepo.findByUsuarioId(usuarioId);
    }

    public List<Object[]> obtenerIngredientesSemanal(Long usuarioId) {
        return planRepo.findIngredientesSemanalByUsuarioId(usuarioId);
    }

}
