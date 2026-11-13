import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpenCheck,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Trophy,
  UserRound
} from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import { cn, initials } from '../../lib/utils';
import { Logo } from '../Cito';
import { BreadcrumbBar } from '../navigation/BreadcrumbBar';
import { SiteMapModal } from '../navigation/SiteMapModal';
import { SplashCursor } from '../reactbits';

const navByRole = {
  student: [
    { to: '/estudiante', label: 'Misiones', icon: Compass },
    { to: '/logros', label: 'Mis logros', icon: Trophy }
  ],
  teacher: [
    { to: '/docente', label: 'Panel', icon: LayoutDashboard },
    { to: '/docente/evidencias', label: 'Evidencias', icon: ClipboardCheck },
    { to: '/docente/reportes', label: 'Reportes', icon: ChartNoAxesColumnIncreasing },
    { to: '/docente/misiones', label: 'Misiones', icon: BookOpenCheck }
  ],
  admin: [
    { to: '/admin', label: 'Administración', icon: ShieldCheck },
    { to: '/estudiante', label: 'Misiones', icon: Compass },
    { to: '/logros', label: 'Logros', icon: Trophy },
    { to: '/docente', label: 'Aulas', icon: LayoutDashboard },
    { to: '/docente/evidencias', label: 'Evidencias', icon: ClipboardCheck },
    { to: '/docente/reportes', label: 'Reportes', icon: ChartNoAxesColumnIncreasing }
  ]
} as const;

const roleLabel = { student: 'Estudiante', teacher: 'Docente', admin: 'Administrador' };

export function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [siteMapOpen, setSiteMapOpen] = useState(false);
  const items = user ? navByRole[user.role] : [];

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="relative min-h-dvh">
      {/* React Bits: Desktop glow cursor */}
      <SplashCursor color="#58e6c5" size={26} />

      <a
        href="#contenido"
        className="sr-only z-[100] rounded-xl bg-mint-400 px-4 py-2 font-bold text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -left-32 top-20 size-[28rem] rounded-full bg-sky-400/8 blur-3xl" />
        <div className="absolute -right-40 top-1/3 size-[32rem] rounded-full bg-mint-400/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[26rem] rounded-full bg-violet-400/7 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse at top, black 10%, transparent 75%)'
          }}
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-ink-950/72 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <NavLink to={roleHome(user?.role)} aria-label="Ir al inicio de Laboratorio 360 La Célula">
            <Logo />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/docente' || item.to === '/admin' || item.to === '/estudiante'}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center gap-2 rounded-xl px-3.5 text-sm font-bold transition',
                      isActive
                        ? 'bg-mint-400/12 text-mint-300'
                        : 'text-slate-400 hover:bg-white/6 hover:text-white'
                    )
                  }
                >
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Botón de Mapa del Sitio Superior */}
            <button
              type="button"
              onClick={() => setSiteMapOpen(true)}
              className="flex min-h-10 items-center gap-1.5 rounded-xl border border-mint-400/30 bg-mint-400/10 px-3 py-1.5 text-xs font-extrabold text-mint-300 transition hover:border-mint-400/50 hover:bg-mint-400/20 hover:text-white"
              aria-label="Abrir mapa del sitio y orientación"
              title="Mapa del Laboratorio 360"
            >
              <Compass className="size-4 animate-spin-slow text-mint-300" aria-hidden />
              <span className="hidden sm:inline">Mapa del Sitio</span>
            </button>

            {user ? (
              <>
                <div className="hidden items-center gap-2.5 rounded-2xl border border-white/8 bg-white/4 px-3 py-1.5 sm:flex">
                  <span className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-mint-300 to-sky-400 text-xs font-extrabold text-ink-950">
                    {initials(user.displayName)}
                  </span>
                  <span className="leading-tight">
                    <span className="block max-w-36 truncate text-xs font-extrabold text-white">{user.displayName}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {roleLabel[user.role]}
                    </span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="grid size-11 place-items-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white"
                  aria-label="Cerrar sesión"
                  title="Cerrar sesión"
                >
                  <LogOut className="size-5" aria-hidden />
                </button>
              </>
            ) : (
              <NavLink to="/login" className="rounded-xl bg-mint-400 px-4 py-2.5 text-sm font-extrabold text-ink-950">
                Entrar
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Barra de Migas de Pan y Orientación Superior */}
      <BreadcrumbBar onOpenSiteMap={() => setSiteMapOpen(true)} />

      <main id="contenido" className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8 md:pb-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {user && items.length > 0 ? (
        <nav
          className="fixed inset-x-3 bottom-3 z-50 flex items-center justify-around rounded-3xl border border-white/10 bg-ink-900/92 p-1.5 shadow-2xl backdrop-blur-xl md:hidden"
          aria-label="Navegación móvil"
        >
          {items.slice(0, 4).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/docente' || item.to === '/admin' || item.to === '/estudiante'}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-13 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-extrabold uppercase tracking-wide transition',
                    isActive ? 'bg-mint-400/14 text-mint-300' : 'text-slate-400'
                  )
                }
              >
                <Icon className="size-5" aria-hidden />
                {item.label}
              </NavLink>
            );
          })}
          <button
            type="button"
            onClick={() => navigate(user.role === 'student' ? '/logros' : user.role === 'admin' ? '/admin' : '/docente')}
            className="flex min-h-13 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-extrabold uppercase tracking-wide text-slate-400"
          >
            <UserRound className="size-5" aria-hidden />
            Perfil
          </button>
        </nav>
      ) : null}

      {/* Modal interactivo de Mapa del Sitio */}
      <SiteMapModal isOpen={siteMapOpen} onClose={() => setSiteMapOpen(false)} />
    </div>
  );
}
