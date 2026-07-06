import { describe, expect, test } from 'vitest';
import { buildMatchRequest } from './matchMapper';


describe('buildMatchRequest', () => {
  test('converte o formulário para o contrato do backend', () => {
    const request = buildMatchRequest({
      titulo: '  Desenvolvedor Front-end  ',
      descricao: '  Interfaces acessíveis  ',
      skills: ['React', ' TypeScript '],
      nivel: 'Júnior',
      modalidade: 'Híbrido',
      regiao: 'Grande Florianópolis',
      antiVies: true,
      destacarGrupos: true,
      prioridadeDiversidade: 'Alta',
    });

    expect(request).toEqual({
      empresa_id: 'empresa-demo',
      vaga: {
        titulo: 'Desenvolvedor Front-end',
        descricao: 'Interfaces acessíveis',
        skills: ['React', 'TypeScript'],
        nivel: 'junior',
        regiao: 'Grande Florianópolis',
        modalidade: 'hibrido',
      },
      filtros: {
        anti_vies: true,
        diversidade_minima: 60,
        limite: 10,
      },
    });
  });

  test('não aplica meta de diversidade quando o destaque está desativado', () => {
    const request = buildMatchRequest({
      titulo: 'Backend',
      descricao: '',
      skills: ['Python'],
      nivel: 'Pleno',
      modalidade: 'Remoto',
      regiao: 'Sul',
      antiVies: false,
      destacarGrupos: false,
      prioridadeDiversidade: 'Alta',
    });

    expect(request.filtros.diversidade_minima).toBe(0);
    expect(request.vaga.descricao).toBeUndefined();
  });
});
