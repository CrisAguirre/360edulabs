export interface BadgeInfo {
  code: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  xpBonus: number;
  missionCode: string | null;
  accent: string;
}

export const BADGE_CATALOG: BadgeInfo[] = [
  {
    code: 'explorador-celular',
    name: 'Explorador Celular',
    shortName: 'Explorador',
    description: 'Descubriste que todos los seres vivos están formados por células.',
    icon: '🔬',
    xpBonus: 50,
    missionCode: 'm1',
    accent: '#58e6c5'
  },
  {
    code: 'constructor-conocimiento',
    name: 'Constructor del Conocimiento Celular',
    shortName: 'Constructor',
    description: 'Comparaste células animales y vegetales y explicaste sus partes.',
    icon: '🧩',
    xpBonus: 50,
    missionCode: 'm2',
    accent: '#7dd3fc'
  },
  {
    code: 'guardian-energia',
    name: 'Guardián de la Energía Celular',
    shortName: 'Guardián',
    description: 'Comprendiste cómo las células obtienen y usan la energía.',
    icon: '⚡',
    xpBonus: 50,
    missionCode: 'm3',
    accent: '#fbbf24'
  },
  {
    code: 'cientifico-citoindagar',
    name: 'Científico Laboratorio 360',
    shortName: 'Científico 360',
    description: 'Completaste la ruta y presentaste tu bitácora como un verdadero científico.',
    icon: '🏆',
    xpBonus: 100,
    missionCode: null,
    accent: '#f472b6'
  },
  {
    code: 'persistente',
    name: 'Persistente',
    shortName: 'Persistente',
    description: 'Reintentaste un quiz y mejoraste tu puntaje.',
    icon: '🔁',
    xpBonus: 10,
    missionCode: null,
    accent: '#a78bfa'
  }
];

export function badgeForCode(code: string | undefined) {
  return BADGE_CATALOG.find((badge) => badge.code === code);
}
