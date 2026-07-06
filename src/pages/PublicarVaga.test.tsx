import React from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { requestMatch } from '../services/api';
import { loadMatchSession } from '../services/matchSession';
import { matchResponseFixture } from '../test/matchFixture';
import PublicarVaga from './PublicarVaga';


vi.mock('../services/api', () => ({
  requestMatch: vi.fn(),
}));

describe('PublicarVaga', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test('exibe estado de carregamento durante a busca', async () => {
    vi.mocked(requestMatch).mockReturnValue(new Promise(() => undefined));
    render(<MemoryRouter><PublicarVaga /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Digite o título da vaga'), {
      target: { value: 'Desenvolvedor Front-end' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Gerar Matching/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Buscando talentos/i })).toBeDisabled();
    });
  });

  test('valida o título antes de chamar a API', () => {
    render(<MemoryRouter><PublicarVaga /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: /Gerar Matching/i }));

    expect(screen.getByRole('alert')).toHaveTextContent('Informe um título de vaga válido.');
    expect(requestMatch).not.toHaveBeenCalled();
  });

  test('salva o resultado e navega para a shortlist após sucesso', async () => {
    vi.mocked(requestMatch).mockResolvedValue(matchResponseFixture);
    render(
      <MemoryRouter initialEntries={['/publicar-vaga']}>
        <Route exact path="/publicar-vaga"><PublicarVaga /></Route>
        <Route path="/resultados"><div>Shortlist carregada</div></Route>
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Digite o título da vaga'), {
      target: { value: 'Desenvolvedor Front-end' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Gerar Matching/i }));

    expect(await screen.findByText('Shortlist carregada')).toBeInTheDocument();
    expect(loadMatchSession()?.response).toEqual(matchResponseFixture);
  });
});
