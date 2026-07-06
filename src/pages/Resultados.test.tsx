import React from 'react';
import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { saveMatchSession } from '../services/matchSession';
import { matchRequestFixture, matchResponseFixture } from '../test/matchFixture';
import Resultados from './Resultados';


describe('Resultados', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test('exibe estado vazio sem matching salvo', () => {
    render(<MemoryRouter><Resultados /></MemoryRouter>);

    expect(screen.getByText('Nenhum matching executado')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Publicar uma vaga' })).toHaveAttribute('href', '/publicar-vaga');
  });

  test('renderiza shortlist, métricas e explicabilidade da API', () => {
    saveMatchSession({ request: matchRequestFixture, response: matchResponseFixture });

    render(<MemoryRouter><Resultados /></MemoryRouter>);

    expect(screen.getByText('Candidato 001')).toBeInTheDocument();
    expect(screen.getAllByText('100%')).toHaveLength(2);
    expect(screen.getByText('Mulheres na tecnologia', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText('Total analisados')).toBeInTheDocument();
    expect(screen.getByText('Na shortlist')).toBeInTheDocument();
    expect(screen.getByText('Representação')).toBeInTheDocument();
    expect(screen.getByText('Por que este score?')).toBeInTheDocument();
    expect(screen.getByText('Atende 3 de 3 skills solicitadas')).toBeInTheDocument();
  });
});
