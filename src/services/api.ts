import type { MatchRequest, MatchResponse } from '../types/match';

const DEFAULT_API_URL = 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getApiUrl(): string {
  return (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
}

export async function requestMatch(
  payload: MatchRequest,
  fetcher: typeof fetch = fetch,
): Promise<MatchResponse> {
  let response: Response;

  try {
    response = await fetcher(`${getApiUrl()}/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new ApiError('Não foi possível conectar à API. Verifique se o backend está em execução.', 0);
  }

  if (!response.ok) {
    throw new ApiError(await extractErrorMessage(response), response.status);
  }

  return response.json() as Promise<MatchResponse>;
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json() as { detail?: string | Array<{ msg?: string }> };
    if (typeof body.detail === 'string') {
      return body.detail;
    }
    if (Array.isArray(body.detail)) {
      const messages = body.detail.map((item) => item.msg).filter(Boolean);
      if (messages.length > 0) {
        return messages.join(', ');
      }
    }
  } catch {
    return `A API respondeu com erro ${response.status}.`;
  }
  return `A API respondeu com erro ${response.status}.`;
}
