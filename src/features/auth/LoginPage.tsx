import { ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, Hash, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CitoMascot, Logo } from '../../components/Cito';
import { Button } from '../../components/ui';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../lib/api';
import { BlurText, ClickSpark, Particles } from '../../components/reactbits';

type LoginMode = 'student' | 'staff';

const demoAccounts = [
  {
    label: 'Estudiante',
    mode: 'student' as LoginMode,
    value: 'SB',
    icon: UserRound,
    hint: 'Ej.: SB · Samuel Barcos',
    accent: '#58e6c5'
  },
  {
    label: 'Docente',
    mode: 'staff' as LoginMode,
    value: 'docente01',
    password: 'Docente2026*',
    icon: GraduationCap,
    hint: 'Profe Camila',
    accent: '#7dd3fc'
  },
  {
    label: 'Admin',
    mode: 'staff' as LoginMode,
    value: 'admin',
    password: 'Admin2026*',
    icon: ShieldCheck,
    hint: 'Gestión',
    accent: '#fbbf24'
  }
];

export function LoginPage() {
  const { login, user, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<LoginMode>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated' && user) {
      navigate(roleHome(user.role), { replace: true });
    }
  }, [status, user, navigate]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const logged = await login(username.trim(), mode === 'student' ? '' : password);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from !== '/login' ? from : roleHome(logged.role), { replace: true });
    } catch (loginError) {
      setError(
        loginError instanceof ApiError
          ? loginError.message
          : 'No pudimos iniciar sesión. Revisa tu conexión e intenta de nuevo.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (nextMode: LoginMode) => {
    setMode(nextMode);
    setUsername('');
    setPassword('');
    setError(null);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* React Bits: Particles background */}
      <Particles count={28} speed={0.16} color="#7dd3fc" connectDistance={95} className="absolute inset-0 -z-10" />

      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-32 top-0 size-[30rem] rounded-full bg-mint-400/8 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[34rem] rounded-full bg-sky-400/8 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-dvh w-full max-w-7xl items-center gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden flex-col justify-between gap-10 lg:flex">
          <Link to="/" aria-label="Laboratorio 360 La Célula">
            <Logo />
          </Link>
          <div className="space-y-6">
            <CitoMascot size={210} mood="happy" className="animate-float" />
            <div>
              <p className="eyebrow">Bienvenido de vuelta</p>
              <h1 className="mt-2 max-w-lg font-display text-5xl font-extrabold leading-[1.05] text-white">
                Tu próxima{' '}
                <span className="text-gradient inline-block">
                  <BlurText text="misión" delay={0.2} animateBy="letters" />
                </span>{' '}
                te espera.
              </h1>
              <p className="mt-4 max-w-md text-slate-300">
                Entra al Laboratorio 360 La Célula y continúa tu exploración por el mundo invisible de las células.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Video 360', 'Modelos 3D', 'Cubo Merge', 'Quiver', 'Evidencias'].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            El Laboratorio no publica datos personales de menores. Tu progreso solo lo ves tú y tu docente.
          </p>
        </div>

        <div className="mx-auto w-full max-w-lg">
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <Link to="/" aria-label="Laboratorio 360 La Célula">
              <Logo />
            </Link>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-400 hover:bg-white/6 hover:text-white">
              <ArrowLeft className="size-4" aria-hidden />
              Inicio
            </Link>
          </div>

          <div className="glass rounded-[2rem] p-5 sm:p-8">
            <div className="mb-6">
              <p className="eyebrow">Acceso al Laboratorio</p>
              <h1 className="mt-1 text-3xl font-bold text-white">Inicia tu sesión</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                {mode === 'student'
                  ? 'Los estudiantes entran solo con su código de dos letras, sin contraseña.'
                  : 'Docentes y administradores usan su usuario y contraseña.'}
              </p>
            </div>

            {/* Selector de tipo de acceso */}
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-ink-950/50 p-1">
              <button
                type="button"
                onClick={() => switchMode('student')}
                className={
                  mode === 'student'
                    ? 'flex items-center justify-center gap-2 rounded-xl bg-mint-400/20 py-2.5 text-sm font-extrabold text-mint-200'
                    : 'flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-slate-400 hover:text-white'
                }
              >
                <UserRound className="size-4" aria-hidden />
                Estudiante
              </button>
              <button
                type="button"
                onClick={() => switchMode('staff')}
                className={
                  mode === 'staff'
                    ? 'flex items-center justify-center gap-2 rounded-xl bg-sky-400/20 py-2.5 text-sm font-extrabold text-sky-200'
                    : 'flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-slate-400 hover:text-white'
                }
              >
                <ShieldCheck className="size-4" aria-hidden />
                Docente / Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'student' ? (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Tu código (2 letras)
                  </span>
                  <span className="relative block">
                    <Hash className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-mint-400" aria-hidden />
                    <input
                      value={username}
                      onChange={(event) =>
                        setUsername(event.target.value.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ]/g, '').slice(0, 2))
                      }
                      required
                      minLength={2}
                      maxLength={2}
                      autoCapitalize="characters"
                      autoComplete="off"
                      className="min-h-14 w-full rounded-2xl border border-white/12 bg-ink-950/55 pl-11 pr-4 text-center font-mono text-2xl font-black tracking-[0.4em] text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none"
                      placeholder="SB"
                    />
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-slate-400">
                    Es la inicial de tu nombre y la de tu apellido. Ej.: <strong className="text-mint-300">Samuel Barcos → SB</strong>.
                  </span>
                </label>
              ) : (
                <>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Usuario
                    </span>
                    <span className="relative block">
                      <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-500" aria-hidden />
                      <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        autoComplete="username"
                        className="min-h-13 w-full rounded-2xl border border-white/12 bg-ink-950/55 pl-11 pr-4 text-sm font-semibold text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none"
                        placeholder="docente01"
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Contraseña
                    </span>
                    <span className="relative block">
                      <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-slate-500" aria-hidden />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                        className="min-h-13 w-full rounded-2xl border border-white/12 bg-ink-950/55 pl-11 pr-12 text-sm font-semibold text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none"
                        placeholder="Tu contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {showPassword ? <EyeOff className="size-5" aria-hidden /> : <Eye className="size-5" aria-hidden />}
                      </button>
                    </span>
                  </label>
                </>
              )}

              {error ? (
                <p role="alert" className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
                  {error}
                </p>
              ) : null}

              <ClickSpark sparkColor="#58e6c5" sparkCount={10}>
                <Button type="submit" size="lg" className="w-full" loading={submitting}>
                  Entrar a mi laboratorio
                  <ArrowRight className="size-5" aria-hidden />
                </Button>
              </ClickSpark>
            </form>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" aria-hidden />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Accesos de demostración
                </span>
                <span className="h-px flex-1 bg-white/10" aria-hidden />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <ClickSpark key={account.label} sparkColor={account.accent} sparkCount={8}>
                      <button
                        type="button"
                        onClick={() => {
                          setMode(account.mode);
                          setUsername(account.value);
                          setPassword(account.password ?? '');
                          setError(null);
                        }}
                        className="group w-full rounded-2xl border border-white/10 bg-white/4 p-3 text-left transition hover:border-white/20 hover:bg-white/8"
                      >
                        <span
                          className="grid size-8 place-items-center rounded-lg"
                          style={{ background: `${account.accent}1f`, color: account.accent }}
                        >
                          <Icon className="size-4" aria-hidden />
                        </span>
                        <span className="mt-2 block text-xs font-extrabold text-white">{account.label}</span>
                        <span className="block text-[10px] text-slate-500">{account.hint}</span>
                      </button>
                    </ClickSpark>
                  );
                })}
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-500">
                El estudiante entra con su código; docente y admin se completan con su contraseña.
              </p>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            ¿Problemas para entrar? Pide apoyo a tu docente o consulta la guía de acceso.
          </p>
        </div>
      </div>
    </div>
  );
}
