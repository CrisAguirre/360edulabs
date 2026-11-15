import { AnimatePresence, motion } from 'framer-motion';
import {
  Award,
  ChevronRight,
  ClipboardCheck,
  Compass,
  GraduationCap,
  LayoutDashboard,
  MapPin,
  Microscope,
  ShieldCheck,
  Trophy,
  X
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { SESSION_INFO } from '../../lib/curriculum';
import { cn } from '../../lib/utils';
import { ShinyText, SpotlightCard } from '../reactbits';

interface SiteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MissionNode {
  code: string;
  order: number;
  title: string;
  icon: string;
  color: string;
  links: Array<{ key: string; label: string; to: string }>;
}

const MISSION_ICONS = ['🔬', '🏙️', '⚡'];
const MISSION_COLORS = ['#58e6c5', '#38bdf8', '#fbbf24'];

const MISSIONS_MAP: MissionNode[] = (['m1', 'm2', 'm3'] as const).map((code, index) => {
  const info = SESSION_INFO[code];
  return {
    code,
    order: info.session,
    title: info.theme,
    icon: MISSION_ICONS[index],
    color: MISSION_COLORS[index],
    links: [
      { key: 'ruta', label: 'Ruta obligatoria (documento)', to: `/misiones/${code}#ruta` },
      { key: 'apoyo', label: 'Exploración opcional', to: `/misiones/${code}#apoyo` }
    ]
  };
});

export function SiteMapModal({ isOpen, onClose }: SiteMapModalProps) {
  const location = useLocation();
  const { user } = useAuth();
  const currentPath = location.pathname;

  // Cerrar al pulsar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const isActive = (path: string, exact = false) => {
    if (exact) return currentPath === path;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
          {/* Backdrop con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-950/85 backdrop-blur-md"
            aria-hidden
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[2.2rem] border border-white/12 bg-ink-900/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-mint-400/15 text-mint-300">
                  <Compass className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                    <ShinyText text="Mapa del Laboratorio 360 La Célula" speed={3} className="text-white" />
                  </h2>
                  <p className="text-xs text-slate-400">
                    Guía de orientación y salto rápido a cualquier sesión o recurso de la plataforma.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white"
                aria-label="Cerrar mapa"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="space-y-6 overflow-y-auto p-5 sm:p-6">
              {/* Estación Central del Estudiante */}
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Zona central de aprendizaje
                </span>
                <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/estudiante"
                    onClick={onClose}
                    className={cn(
                      'group flex items-center justify-between rounded-2xl border p-4 transition',
                      isActive('/estudiante', true)
                        ? 'border-mint-400/40 bg-mint-400/14 shadow-lg'
                        : 'border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-mint-400/15 text-mint-300">
                        <Microscope className="size-5" aria-hidden />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">Mapa de sesiones</h3>
                          {isActive('/estudiante', true) && (
                            <span className="rounded-full bg-mint-400/20 px-2 py-0.5 text-[10px] font-extrabold text-mint-300">
                              📍 Estás aquí
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">Ruta principal con las 3 sesiones de indagación</p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>

                  <Link
                    to="/logros"
                    onClick={onClose}
                    className={cn(
                      'group flex items-center justify-between rounded-2xl border p-4 transition',
                      isActive('/logros', true)
                        ? 'border-amber-400/40 bg-amber-400/14 shadow-lg'
                        : 'border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                        <Trophy className="size-5" aria-hidden />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">Vitrina de Logros e Insignias</h3>
                          {isActive('/logros', true) && (
                            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-300">
                              📍 Estás aquí
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">Colección de medallas y nivel científico</p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </div>
              </div>

              {/* Las 3 Misiones de Indagación */}
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Ruta de Indagación Científica (Sesiones 1, 2 y 3)
                </span>

                <div className="grid gap-4 md:grid-cols-3">
                  {MISSIONS_MAP.map((m) => {
                    const isMissionActive = isActive(`/misiones/${m.code}`);
                    return (
                      <SpotlightCard
                        key={m.code}
                        spotlightColor={`${m.color}20`}
                        borderColor={isMissionActive ? `${m.color}50` : 'rgba(255,255,255,0.08)'}
                        className={cn(
                          'flex flex-col justify-between p-4 transition',
                          isMissionActive && 'bg-white/6 ring-1 ring-mint-400/30'
                        )}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-2xl" aria-hidden>
                              {m.icon}
                            </span>
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                              style={{ background: `${m.color}22`, color: m.color }}
                            >
                              Sesión {m.order}
                            </span>
                          </div>

                          <div>
                            <Link
                              to={`/misiones/${m.code}`}
                              onClick={onClose}
                              className="font-display text-sm font-bold text-white transition hover:underline"
                            >
                              {m.title}
                            </Link>
                            {isMissionActive && (
                              <p className="mt-1 flex items-center gap-1 text-[11px] font-extrabold text-mint-300">
                                <MapPin className="size-3" />
                                Sesión actual
                              </p>
                            )}
                          </div>

                          {/* Contenido de la sesión */}
                          <div className="space-y-1 pt-2 border-t border-white/8 text-xs">
                            {m.links.map((link) => (
                              <Link
                                key={link.key}
                                to={link.to}
                                onClick={onClose}
                                className="flex items-center justify-between rounded-lg px-2 py-1 text-[11px] text-slate-400 transition hover:bg-white/6 hover:text-white"
                              >
                                <span>{link.label}</span>
                                <ChevronRight className="size-3 text-slate-600" aria-hidden />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Enlace al Quiz */}
                        <div className="mt-3 pt-2.5 border-t border-white/8 flex justify-between items-center text-xs">
                          <Link
                            to={`/misiones/${m.code}/quiz`}
                            onClick={onClose}
                            className="inline-flex items-center gap-1 font-bold text-amber-300 hover:underline text-[11px]"
                          >
                            <Award className="size-3" />
                            Reto Quiz
                          </Link>
                          <Link
                            to={`/misiones/${m.code}`}
                            onClick={onClose}
                            className="font-extrabold text-slate-300 hover:text-white text-[11px]"
                          >
                            Abrir sesión →
                          </Link>
                        </div>
                      </SpotlightCard>
                    );
                  })}
                </div>
              </div>

              {/* Área de Docentes y Administración */}
              {(user?.role === 'teacher' || user?.role === 'admin') && (
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Área Docente e Institucional
                  </span>
                  <div className="mt-2.5 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    <Link
                      to="/docente"
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-3.5 transition',
                        isActive('/docente', true)
                          ? 'border-sky-400/40 bg-sky-400/14'
                          : 'border-white/8 bg-white/4 hover:bg-white/8'
                      )}
                    >
                      <LayoutDashboard className="size-4 text-sky-400" />
                      <div>
                        <p className="text-xs font-bold text-white">Panel de Aulas</p>
                        <p className="text-[10px] text-slate-400">Grupos y turnos</p>
                      </div>
                    </Link>

                    <Link
                      to="/docente/evidencias"
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-3.5 transition',
                        isActive('/docente/evidencias', true)
                          ? 'border-violet-400/40 bg-violet-400/14'
                          : 'border-white/8 bg-white/4 hover:bg-white/8'
                      )}
                    >
                      <ClipboardCheck className="size-4 text-violet-400" />
                      <div>
                        <p className="text-xs font-bold text-white">Evidencias</p>
                        <p className="text-[10px] text-slate-400">Rúbricas y bitácoras</p>
                      </div>
                    </Link>

                    <Link
                      to="/docente/reportes"
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border p-3.5 transition',
                        isActive('/docente/reportes', true)
                          ? 'border-emerald-400/40 bg-emerald-400/14'
                          : 'border-white/8 bg-white/4 hover:bg-white/8'
                      )}
                    >
                      <GraduationCap className="size-4 text-emerald-400" />
                      <div>
                        <p className="text-xs font-bold text-white">Reportes</p>
                        <p className="text-[10px] text-slate-400">Métricas escolares</p>
                      </div>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-3 rounded-2xl border p-3.5 transition',
                          isActive('/admin', true)
                            ? 'border-amber-400/40 bg-amber-400/14'
                            : 'border-white/8 bg-white/4 hover:bg-white/8'
                        )}
                      >
                        <ShieldCheck className="size-4 text-amber-400" />
                        <div>
                          <p className="text-xs font-bold text-white">Administración</p>
                          <p className="text-[10px] text-slate-400">Consola general</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer con atajo de teclado */}
            <div className="flex items-center justify-between border-t border-white/10 bg-ink-950/40 px-6 py-3 text-xs text-slate-500">
              <span>Laboratorio 360 La Célula · Mapa General</span>
              <span>Pulsa <kbd className="rounded border border-white/20 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-300">ESC</kbd> para cerrar</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

