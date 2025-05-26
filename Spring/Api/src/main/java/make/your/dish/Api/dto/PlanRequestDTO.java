package make.your.dish.Api.dto;

import make.your.dish.Api.entidades.PlanSemanal;

import java.time.LocalDate;

public class PlanRequestDTO {
    private Integer usuarioId;
    private PlanSemanal.DiaSemana dia;
    private Long recetaId;

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public PlanSemanal.DiaSemana getDia() {
        return dia;
    }

    public void setDia(PlanSemanal.DiaSemana dia) {
        this.dia = dia;
    }

    public Long getRecetaId() {
        return recetaId;
    }

    public void setRecetaId(Long recetaId) {
        this.recetaId = recetaId;
    }
}
