import type { Session, StepResponse } from "./types";

const FEEDBACK_PREFIX = "rava_feedback:";
const SESSION_KEY = "rava_session_id";
const PROGRESS_KEY = "rava_progress";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      "sid_" +
      Date.now() +
      "_" +
      Math.random().toString(36).slice(2, 7);
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;
  const key = FEEDBACK_PREFIX + session.session;
  const payload = JSON.stringify(session);
  localStorage.setItem(key, payload);
  // Attempt window.storage (custom platform API, optional)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).storage?.set(key, payload, true);
  } catch {
    // ignore — window.storage is optional
  }
}

export function getAllSessions(): Session[] {
  if (typeof window === "undefined") return [];
  const out: Session[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(FEEDBACK_PREFIX)) {
      try {
        const raw = localStorage.getItem(key);
        if (raw) out.push(JSON.parse(raw) as Session);
      } catch {
        // ignore corrupt entries
      }
    }
  }
  return out.sort((a, b) => b.ts.localeCompare(a.ts));
}

export interface ProgressSnapshot {
  responses: Record<string, StepResponse>;
  activeTab: number;
  stepInTab: number;
}

export function saveProgress(data: ProgressSnapshot): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export function loadProgress(): ProgressSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as ProgressSnapshot) : null;
  } catch {
    return null;
  }
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}
