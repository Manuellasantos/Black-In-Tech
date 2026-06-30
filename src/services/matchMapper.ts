import type { MatchRequest } from '../types/match';

export interface VacancyFormData {
  titulo: string;
  descricao: string;
  skills: string[];
  nivel: string;
  modalidade: string;
  regiao: string;
  antiVies: boolean;
  destacarGrupos: boolean;
  prioridadeDiversidade: string;
}

const LEVEL_MAP: Record<string, string> = {
  Júnior: 'junior',
  Pleno: 'pleno',
  Sênior: 'senior',
};

const MODALITY_MAP: Record<string, string> = {
  Presencial: 'presencial',
  Híbrido: 'hibrido',
  Remoto: 'remoto',
};

const DIVERSITY_TARGET_MAP: Record<string, number> = {
  Baixa: 20,
  Média: 40,
  Alta: 60,
};

export function buildMatchRequest(form: VacancyFormData): MatchRequest {
  return {
    empresa_id: 'empresa-demo',
    vaga: {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim() || undefined,
      skills: form.skills.map((skill) => skill.trim()).filter(Boolean),
      nivel: LEVEL_MAP[form.nivel] ?? form.nivel.toLowerCase(),
      regiao: form.regiao,
      modalidade: MODALITY_MAP[form.modalidade] ?? form.modalidade.toLowerCase(),
    },
    filtros: {
      anti_vies: form.antiVies,
      diversidade_minima: form.destacarGrupos
        ? DIVERSITY_TARGET_MAP[form.prioridadeDiversidade] ?? 0
        : 0,
      limite: 10,
    },
  };
}
