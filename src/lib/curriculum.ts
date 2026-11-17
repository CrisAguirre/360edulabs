/**
 * Correspondencia entre cada misión y la sesión de `Estrategia Indagación.docx`.
 *
 * `SESSION_INFO` es la única fuente de los títulos curriculares que se muestran
 * en el menú, las migas de pan y el mapa del sitio, para que la plataforma use
 * siempre el mismo nombre que el documento oficial.
 */
import type { Activity, MissionDetail } from './types';

export interface SessionInfo {
  session: number;
  theme: string;
  subthemes: [string, string];
}

export const SESSION_INFO: Record<string, SessionInfo> = {
  m1: {
    session: 1,
    theme: 'Acercamiento a la teoría celular',
    subthemes: ['Teoría celular', 'La célula como unidad estructural y funcional']
  },
  m2: {
    session: 2,
    theme: 'Concepto de célula',
    subthemes: ['Partes o componentes de la célula', 'Funciones de los componentes de la célula']
  },
  m3: {
    session: 3,
    theme: 'Procesos metabólicos de la célula',
    subthemes: ['Catabolismo', 'Estructura celular']
  }
};

export function sessionInfo(code?: string | null): SessionInfo | null {
  if (!code) return null;
  return SESSION_INFO[code.toLowerCase()] ?? null;
}

export function sessionShortLabel(code?: string | null): string {
  const info = sessionInfo(code);
  return info ? `Sesión ${info.session}` : 'Sesión';
}

const PHASE_WEIGHT: Record<string, number> = {
  inicio: 0,
  desarrollo: 1,
  cierre: 2
};

/** Ordena las actividades como se recorren: Inicio → Desarrollo → Cierre. */
export function sortByRoute<T extends { phase: string; order: number }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => (PHASE_WEIGHT[a.phase] ?? 9) - (PHASE_WEIGHT[b.phase] ?? 9) || a.order - b.order
  );
}

/**
 * Separa el contenido de la sesión en:
 * - `required`: los pasos que describe el documento curricular.
 * - `support`: la exploración opcional que no bloquea el avance.
 */
export function splitActivities(mission: Pick<MissionDetail, 'activities'>): {
  required: Activity[];
  support: Activity[];
} {
  return {
    required: sortByRoute(mission.activities.filter((activity) => activity.required)),
    support: sortByRoute(mission.activities.filter((activity) => !activity.required))
  };
}

export function activityUrl(missionCode: string, activity: Pick<Activity, '_id' | 'type'>): string {
  return activity.type === 'quiz'
    ? `/misiones/${missionCode}/quiz`
    : `/misiones/${missionCode}/actividades/${activity._id}`;
}

/**
 * Recursos complementarios de una misión: todas las actividades que no son la
 * lectura principal ni el reto evaluativo. Equivale a lo que mostraban las
 * antiguas pestañas 1.6 / 2.8 / 3.8 (modelos 3D, videos 360, cubo AR,
 * animaciones, laboratorios, infografía y la bitácora).
 */
export function complementaryActivities(mission: Pick<MissionDetail, 'activities'>): Activity[] {
  return sortByRoute(
    mission.activities.filter((activity) => activity.type !== 'reading' && activity.type !== 'quiz')
  );
}
