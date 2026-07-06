import type { MatchSession } from '../types/match';

const MATCH_SESSION_KEY = 'appbit:last-match';

export function saveMatchSession(session: MatchSession): void {
  sessionStorage.setItem(MATCH_SESSION_KEY, JSON.stringify(session));
}

export function loadMatchSession(): MatchSession | null {
  const storedSession = sessionStorage.getItem(MATCH_SESSION_KEY);
  if (!storedSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedSession) as Partial<MatchSession>;
    if (!parsed.request?.vaga || !Array.isArray(parsed.response?.candidatos)) {
      return null;
    }
    return parsed as MatchSession;
  } catch {
    return null;
  }
}

export function clearMatchSession(): void {
  sessionStorage.removeItem(MATCH_SESSION_KEY);
}
