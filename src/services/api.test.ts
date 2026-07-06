import { describe, expect, test, vi } from 'vitest';
import { ApiError, requestMatch } from './api';
import { matchRequestFixture, matchResponseFixture } from '../test/matchFixture';


describe('requestMatch', () => {
  test('envia o contrato e retorna a shortlist', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(
      JSON.stringify(matchResponseFixture),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )) as unknown as typeof fetch;

    const response = await requestMatch(matchRequestFixture, fetcher);

    expect(response).toEqual(matchResponseFixture);
    expect(fetcher).toHaveBeenCalledWith(
      'http://localhost:8000/match',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(matchRequestFixture),
      }),
    );
  });

  test('propaga a mensagem de erro retornada pela API', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(
      JSON.stringify({ detail: 'Dados da vaga inválidos' }),
      { status: 422, headers: { 'Content-Type': 'application/json' } },
    )) as unknown as typeof fetch;

    await expect(requestMatch(matchRequestFixture, fetcher)).rejects.toEqual(
      new ApiError('Dados da vaga inválidos', 422),
    );
  });

  test('apresenta erro amigável quando a API está indisponível', async () => {
    const fetcher = vi.fn().mockRejectedValue(new TypeError('Network error')) as unknown as typeof fetch;

    await expect(requestMatch(matchRequestFixture, fetcher)).rejects.toMatchObject({
      status: 0,
      message: 'Não foi possível conectar à API. Verifique se o backend está em execução.',
    });
  });
});
