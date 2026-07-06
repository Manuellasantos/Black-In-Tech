export interface VagaMatchInput {
  titulo: string;
  descricao?: string;
  skills: string[];
  nivel: string;
  regiao: string;
  modalidade: string;
}

export interface FiltrosMatchInput {
  anti_vies: boolean;
  diversidade_minima: number;
  limite: number;
}

export interface MatchRequest {
  empresa_id: string;
  vaga: VagaMatchInput;
  filtros: FiltrosMatchInput;
}

export interface ScoreBreakdown {
  skills: number;
  senioridade: number;
  regiao_modalidade: number;
  disponibilidade: number;
}

export interface CandidatoMatch {
  candidato_id: string;
  nome: string;
  cargo: string;
  score_match: number;
  badge_diversidade: string | null;
  skills: string[];
  nivel: string;
  regiao: string;
  lat: number;
  lng: number;
  anonimizado: boolean;
  score_breakdown: ScoreBreakdown;
  explicacoes: string[];
}

export interface DiversidadeResultado {
  total_shortlist: number;
  candidatos_com_badge: number;
  percentual_representacao: number;
  meta_diversidade: number;
  meta_atingida: boolean;
  criterio: string;
}

export interface MatchResponse {
  candidatos: CandidatoMatch[];
  total_analisados: number;
  diversidade_resultado: DiversidadeResultado;
}

export interface MatchSession {
  request: MatchRequest;
  response: MatchResponse;
}
