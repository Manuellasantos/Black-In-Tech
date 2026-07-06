import type { MatchRequest, MatchResponse } from '../types/match';

export const matchRequestFixture: MatchRequest = {
  empresa_id: 'empresa-demo',
  vaga: {
    titulo: 'Desenvolvedor Front-end',
    descricao: 'Construção de interfaces acessíveis',
    skills: ['React', 'TypeScript', 'CSS'],
    nivel: 'junior',
    regiao: 'Grande Florianópolis',
    modalidade: 'hibrido',
  },
  filtros: {
    anti_vies: true,
    diversidade_minima: 40,
    limite: 10,
  },
};

export const matchResponseFixture: MatchResponse = {
  candidatos: [
    {
      candidato_id: 'cand-001',
      nome: 'Candidato 001',
      cargo: 'Desenvolvedora Front-end',
      score_match: 100,
      badge_diversidade: 'Mulheres na tecnologia',
      skills: ['React', 'TypeScript', 'CSS'],
      nivel: 'Júnior',
      regiao: 'Grande Florianópolis',
      lat: -27.5954,
      lng: -48.548,
      anonimizado: true,
      score_breakdown: {
        skills: 60,
        senioridade: 20,
        regiao_modalidade: 15,
        disponibilidade: 5,
      },
      explicacoes: [
        'Atende 3 de 3 skills solicitadas',
        'Senioridade compatível',
      ],
    },
  ],
  total_analisados: 24,
  diversidade_resultado: {
    total_shortlist: 1,
    candidatos_com_badge: 1,
    percentual_representacao: 100,
    meta_diversidade: 40,
    meta_atingida: true,
    criterio: 'Badges autodeclarados na shortlist; não altera score nem elegibilidade',
  },
};
