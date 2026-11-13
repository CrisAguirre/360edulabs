import {
  ArrowLeft,
  ChevronRight,
  Compass,
  Home
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface BreadcrumbBarProps {
  onOpenSiteMap: () => void;
}

const MISSION_TITLES: Record<string, string> = {
  m1: 'Misión 1: El Ojo de Hooke',
  m2: 'Misión 2: La Ciudad Celular',
  m3: 'Misión 3: El Gran Equilibrio Celular'
};

const PHASE_LABELS: Record<string, string> = {
  inicio: 'Fase Inicio',
  desarrollo: 'Fase Desarrollo',
  cierre: 'Fase Cierre'
};

export function BreadcrumbBar({ onOpenSiteMap }: BreadcrumbBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // No mostrar en landing o login
  if (pathname === '/' || pathname === '/login') return null;

  const parts = pathname.split('/').filter(Boolean);

  // Determinar fallback seguro de retorno
  const getBackFallback = () => {
    if (pathname.includes('/actividades/')) {
      const match = pathname.match(/\/misiones\/([^/]+)/);
      return match ? `/misiones/${match[1]}` : '/estudiante';
    }
    if (pathname.includes('/quiz')) {
      const match = pathname.match(/\/misiones\/([^/]+)/);
      return match ? `/misiones/${match[1]}` : '/estudiante';
    }
    if (pathname.startsWith('/misiones/')) {
      return '/estudiante';
    }
    if (pathname.startsWith('/docente/')) {
      return '/docente';
    }
    if (pathname === '/logros') {
      return '/estudiante';
    }
    return '/estudiante';
  };

  const handleBack = () => {
    // Si hay historial en el navegador y no venimos de fuera
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate(getBackFallback());
    }
  };

  // Generar migas de pan dinámicas
  const crumbs: Array<{ label: string; to?: string }> = [
    { label: 'Lab 360', to: '/estudiante' }
  ];

  if (parts[0] === 'estudiante') {
    crumbs.push({ label: 'Mapa de Misiones' });
  } else if (parts[0] === 'logros') {
    crumbs.push({ label: 'Vitrina de Logros' });
  } else if (parts[0] === 'admin') {
    crumbs.push({ label: 'Consola de Administración' });
  } else if (parts[0] === 'docente') {
    if (parts[1] === 'evidencias') {
      crumbs.push({ label: 'Panel Docente', to: '/docente' });
      crumbs.push({ label: 'Revisión de Evidencias' });
    } else if (parts[1] === 'reportes') {
      crumbs.push({ label: 'Panel Docente', to: '/docente' });
      crumbs.push({ label: 'Reportes de Aula' });
    } else if (parts[1] === 'misiones') {
      crumbs.push({ label: 'Panel Docente', to: '/docente' });
      crumbs.push({ label: 'Catálogo de Misiones' });
    } else {
      crumbs.push({ label: 'Panel Docente (Aulas)' });
    }
  } else if (parts[0] === 'misiones' && parts[1]) {
    const missionCode = parts[1].toLowerCase();
    const missionName = MISSION_TITLES[missionCode] ?? `Misión ${missionCode.toUpperCase()}`;
    crumbs.push({ label: missionName, to: `/misiones/${missionCode}` });

    if (parts[2] === 'quiz') {
      crumbs.push({ label: 'Reto Evaluativo (Quiz)' });
    } else if (parts[2] === 'actividades') {
      crumbs.push({ label: 'Actividad de Indagación' });
    } else if (parts[2] && PHASE_LABELS[parts[2]]) {
      crumbs.push({ label: PHASE_LABELS[parts[2]] });
    }
  }

  return (
    <div className="border-b border-white/6 bg-ink-950/60 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Lado izquierdo: Botón Atrás + Breadcrumbs */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="group flex min-h-8 items-center gap-1.5 rounded-lg border border-white/10 bg-white/4 px-2.5 py-1 text-xs font-extrabold text-slate-300 transition hover:border-mint-400/30 hover:bg-white/8 hover:text-white"
            title="Ir a la pantalla anterior"
            aria-label="Volver atrás"
          >
            <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" aria-hidden />
            <span className="hidden sm:inline">Atrás</span>
          </button>

          {/* Separador vertical */}
          <span className="h-4 w-px bg-white/10" aria-hidden />

          {/* Miga de pan */}
          <nav aria-label="Ubicación actual" className="flex items-center gap-1.5 truncate text-xs">
            <Link
              to="/estudiante"
              className="grid size-6 place-items-center rounded-md text-slate-400 transition hover:bg-white/8 hover:text-mint-300"
              title="Ir al inicio del Laboratorio"
            >
              <Home className="size-3.5" aria-hidden />
            </Link>

            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <div key={`${crumb.label}-${idx}`} className="flex items-center gap-1.5 truncate">
                  <ChevronRight className="size-3 shrink-0 text-slate-600" aria-hidden />
                  {crumb.to && !isLast ? (
                    <Link
                      to={crumb.to}
                      className="truncate font-semibold text-slate-400 transition hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={cn('truncate font-bold', isLast ? 'text-mint-300' : 'text-slate-300')}>
                      {crumb.label}
                    </span>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Lado derecho: Botón "Mapa del Sitio" */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSiteMap}
            className="flex min-h-8 items-center gap-1.5 rounded-lg border border-mint-400/25 bg-mint-400/8 px-2.5 py-1 text-xs font-bold text-mint-300 transition hover:border-mint-400/40 hover:bg-mint-400/15 hover:text-white"
            title="Abrir mapa general del Laboratorio 360"
            aria-label="Ubicación y mapa del sitio"
          >
            <Compass className="size-3.5 text-mint-300" aria-hidden />
            <span className="hidden sm:inline">Mapa del Sitio</span>
            <span className="sm:hidden">Mapa</span>
          </button>
        </div>
      </div>
    </div>
  );
}

