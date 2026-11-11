import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  BookOpen,
  Boxes,
  ClipboardCheck,
  FlaskConical,
  Layers,
  MonitorPlay,
  Palette,
  ScanLine,
  Sparkles,
  Trophy
} from 'lucide-react';
import type { ActivityType } from './types';

interface ActivityMeta {
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  color: string;
  soft: string;
}

export const ACTIVITY_META: Record<ActivityType, ActivityMeta> = {
  video360: {
    label: 'Video 360',
    shortLabel: 'Video 360',
    icon: MonitorPlay,
    color: '#7dd3fc',
    soft: 'rgba(125, 211, 252, 0.14)'
  },
  reading: {
    label: 'Lectura guiada',
    shortLabel: 'Lectura',
    icon: BookOpen,
    color: '#8df5df',
    soft: 'rgba(141, 245, 223, 0.14)'
  },
  model3d: {
    label: 'Modelo 3D interactivo',
    shortLabel: 'Modelo 3D',
    icon: Boxes,
    color: '#58e6c5',
    soft: 'rgba(88, 230, 197, 0.14)'
  },
  animation3d: {
    label: 'Animación 3D',
    shortLabel: 'Animación 3D',
    icon: Atom,
    color: '#a78bfa',
    soft: 'rgba(167, 139, 250, 0.14)'
  },
  animation2d: {
    label: 'Animación 2D',
    shortLabel: 'Animación 2D',
    icon: Sparkles,
    color: '#f472b6',
    soft: 'rgba(244, 114, 182, 0.14)'
  },
  ar_cube: {
    label: 'Cubo Merge AR',
    shortLabel: 'Cubo AR',
    icon: ScanLine,
    color: '#fbbf24',
    soft: 'rgba(251, 191, 36, 0.14)'
  },
  quiver: {
    label: 'Estación Quiver',
    shortLabel: 'Quiver',
    icon: Palette,
    color: '#fb923c',
    soft: 'rgba(251, 146, 60, 0.14)'
  },
  infographic: {
    label: 'Infografía',
    shortLabel: 'Infografía',
    icon: Layers,
    color: '#38bdf8',
    soft: 'rgba(56, 189, 248, 0.14)'
  },
  evidence: {
    label: 'Evidencia',
    shortLabel: 'Evidencia',
    icon: ClipboardCheck,
    color: '#f472b6',
    soft: 'rgba(244, 114, 182, 0.14)'
  },
  quiz: {
    label: 'Reto final',
    shortLabel: 'Quiz',
    icon: Trophy,
    color: '#fbbf24',
    soft: 'rgba(251, 191, 36, 0.14)'
  },
  lab: {
    label: 'Laboratorio',
    shortLabel: 'Laboratorio',
    icon: FlaskConical,
    color: '#4ade80',
    soft: 'rgba(74, 222, 128, 0.14)'
  }
};

export const PHASE_META = {
  inicio: {
    label: 'Inicio',
    description: 'Activa tus ideas y observa la gran pregunta.',
    color: '#7dd3fc'
  },
  desarrollo: {
    label: 'Desarrollo',
    description: 'Explora, manipula y experimenta con el laboratorio.',
    color: '#58e6c5'
  },
  cierre: {
    label: 'Cierre',
    description: 'Argumenta con evidencias, responde y gana tu insignia.',
    color: '#fbbf24'
  }
} as const;
