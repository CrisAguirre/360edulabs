import type {
  ApiEnvelope,
  Classroom,
  ClassroomDashboard,
  Evidence,
  MissionDetail,
  MissionSummary,
  ProgressSummary,
  Quiz,
  QuizAttempt,
  QuizResult,
  User
} from './types';

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '/api/v1';

let accessToken: string | null = null;
let refreshInFlight: Promise<string | null> | null = null;

export class ApiError extends Error {
  status: number;
  code: string;
  details: unknown;

  constructor(message: string, status = 500, code = 'ERROR', details: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const payload = (await response.json().catch(() => null)) as
    | (ApiEnvelope<T> & { error?: { message?: string; code?: string; details?: unknown } })
    | null;

  if (!response.ok) {
    const message = payload?.error?.message ?? 'No pudimos completar la solicitud. Intenta de nuevo.';
    throw new ApiError(message, response.status, payload?.error?.code ?? 'ERROR', payload?.error?.details ?? null);
  }

  return (payload?.data ?? payload) as T;
}

export interface SessionPayload {
  user: User;
  accessToken: string;
}

export async function refreshSession(): Promise<SessionPayload | null> {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) {
      setAccessToken(null);
      return null;
    }
    const session = await parseResponse<SessionPayload>(response);
    setAccessToken(session.accessToken);
    return session;
  } catch {
    setAccessToken(null);
    return null;
  }
}

async function ensureFreshToken(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = refreshSession()
      .then((session) => session?.accessToken ?? null)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include'
    });
  } catch {
    throw new ApiError('No hay conexión con el servidor. Revisa tu red e intenta de nuevo.', 0, 'NETWORK_ERROR');
  }

  if (response.status === 401 && retry && !path.startsWith('/auth/login')) {
    const renewed = await ensureFreshToken();
    if (renewed) {
      return request<T>(path, options, false);
    }
    setAccessToken(null);
    window.dispatchEvent(new Event('cito:session-expired'));
  }

  return parseResponse<T>(response);
}

export const api = {
  get<T>(path: string) {
    return request<T>(path);
  },
  post<T>(path: string, body: unknown = {}) {
    return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
  },
  patch<T>(path: string, body: unknown = {}) {
    return request<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
  },
  delete<T>(path: string) {
    return request<T>(path, { method: 'DELETE' });
  }
};

export const authApi = {
  async login(username: string, password: string): Promise<SessionPayload> {
    const session = await api.post<SessionPayload>('/auth/login', { username, password });
    setAccessToken(session.accessToken);
    return session;
  },
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },
  me() {
    return api.get<User>('/auth/me');
  },
  refresh: refreshSession
};

export const missionsApi = {
  list() {
    return api.get<MissionSummary[]>('/missions');
  },
  detail(code: string) {
    return api.get<MissionDetail>(`/missions/${code}`);
  },
  start(code: string) {
    return api.post<MissionDetail>(`/progress/${code}/start`);
  },
  updatePhase(code: string, phase: string) {
    return api.post(`/progress/${code}/phase`, { phase });
  }
};

export const progressApi = {
  me() {
    return api.get<ProgressSummary>('/progress/me');
  }
};

export const activitiesApi = {
  complete(id: string, payload: Record<string, unknown>) {
    return api.post<{
      activityId: string;
      status: string;
      progress: { status: string; currentPhase: string; xpEarned: number };
      missionCompleted: boolean;
      badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
    }>(`/activities/${id}/complete`, payload);
  }
};

export const quizApi = {
  byMission(code: string) {
    return api.get<Quiz>(`/quizzes/mission/${code}`);
  },
  start(quizId: string) {
    return api.post<{ attemptId: string; attemptNumber: number; quiz: Quiz }>(`/quizzes/${quizId}/attempts`);
  },
  submit(quizId: string, attemptId: string, answers: Array<{ questionId: string; selected: string[] }>) {
    return api.post<QuizResult>(`/quizzes/${quizId}/attempts/${attemptId}/submit`, { answers });
  },
  attempts(quizId: string) {
    return api.get<QuizAttempt[]>(`/quizzes/${quizId}/attempts/me`);
  }
};

export const evidenceApi = {
  mine() {
    return api.get<Evidence[]>('/evidence/me');
  },
  save(input: { missionId: string; activityId: string; text?: string; linkUrl?: string; type?: string }) {
    return api.post<Evidence>('/evidence', input);
  },
  update(id: string, input: { text?: string; linkUrl?: string; type?: string }) {
    return api.patch<Evidence>(`/evidence/${id}`, input);
  },
  submit(id: string) {
    return api.post<{
      evidence: Evidence;
      missionCompleted: boolean;
      badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
    }>(`/evidence/${id}/submit`);
  },
  byClassroom(classroomId: string) {
    return api.get<Evidence[]>(`/evidence?classroomId=${encodeURIComponent(classroomId)}`);
  },
  review(
    id: string,
    input: { status: 'approved' | 'changes_requested'; teacherScore: string; feedback: string }
  ) {
    return api.post<Evidence>(`/evidence/${id}/review`, input);
  }
};

export const classroomsApi = {
  list() {
    return api.get<Classroom[]>('/classrooms');
  },
  dashboard(id: string) {
    return api.get<ClassroomDashboard>(`/classrooms/${id}/dashboard`);
  },
  join(code: string) {
    return api.post('/classrooms/join', { code });
  }
};
