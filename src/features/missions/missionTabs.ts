export type MissionTabViewMode = 'tabs' | 'all';

export interface MissionTabDef {
  key: string;
  label: string;
  shortLabel: string;
  tone?: 'quiz' | 'extras';
  badge?: string;
}

/**
 * Pestañas oficiales de cada sesión. La barra vive en `MissionDetailPage`
 * (nivel superior, antes de la cabecera), y los reproductores de lectura la
 * consumen en modo controlado para no duplicar el estado ni el marcado.
 */
export const MISSION_TABS: Record<string, MissionTabDef[]> = {
  m1: [
    { key: '1.1', label: '1.1 Aportes y socialización', shortLabel: '1.1 Aportes' },
    { key: '1.2', label: '1.2 Aporte conceptual', shortLabel: '1.2 Concepto' },
    { key: '1.3', label: '1.3 Video: Historia celular', shortLabel: '1.3 Video' },
    { key: '1.4', label: '1.4 Lectura y participación', shortLabel: '1.4 Lectura' },
    { key: '1.5', label: '1.5 Reto Final de Evaluación', shortLabel: '1.5 Reto 🏆', tone: 'quiz' },
    { key: '1.6', label: '1.6 Contenidos extras (Opcional)', shortLabel: '1.6 Extras', tone: 'extras' }
  ],
  m2: [
    { key: '2.1', label: '2.1 Saberes previos', shortLabel: '2.1 Saberes' },
    { key: '2.2', label: '2.2 Célula Vegetal', shortLabel: '2.2 Vegetal' },
    { key: '2.3', label: '2.3 Célula Animal', shortLabel: '2.3 Animal' },
    { key: '2.4', label: '2.4 Modelo 360 y Video', shortLabel: '2.4 360 y Video' },
    { key: '2.5', label: '2.5 Participación', shortLabel: '2.5 Participación' },
    { key: '2.6', label: '2.6 Quiver y Comparación', shortLabel: '2.6 Quiver' },
    { key: '2.7', label: '2.7 Reto Final (Quiz)', shortLabel: '2.7 Reto 🏆', tone: 'quiz' },
    { key: '2.8', label: '2.8 Actividades complementarias', shortLabel: '2.8 Extras', tone: 'extras' }
  ],
  m3: [
    { key: '3.1', label: '3.1 Saberes previos', shortLabel: '3.1 Saberes' },
    { key: '3.2', label: '3.2 Fábrica y Video 360', shortLabel: '3.2 Fábrica' },
    { key: '3.3', label: '3.3 Preguntas motivadoras', shortLabel: '3.3 Preguntas' },
    { key: '3.4', label: '3.4 Video 360, Lectura y Canva', shortLabel: '3.4 Video y Canva' },
    { key: '3.5', label: '3.5 Cubo Merge', shortLabel: '3.5 Cubo Merge' },
    {
      key: '3.6',
      label: '3.6 Cuadro de Estructuras',
      shortLabel: '3.6 Estructuras',
      badge: 'Evaluado'
    },
    {
      key: '3.7',
      label: '3.7 Reto Final',
      shortLabel: '3.7 Reto 🏆',
      tone: 'quiz',
      badge: 'Examen'
    },
    {
      key: '3.8',
      label: '3.8 Actividades complementarias',
      shortLabel: '3.8 Extras',
      tone: 'extras',
      badge: 'Opcional'
    }
  ]
};
