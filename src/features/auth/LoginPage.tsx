import { ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CitoMascot, Logo } from '../../components/Cito';
import { Button } from '../../components/ui';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import { ApiError } from '../../lib/api';

const demoAccounts = [
  {
    label: 'Estudiante',
    username: 'estudiante01',
    password: 'Cito2026*',
    icon: UserRound,
    hint: 'Sofía, 5.º A',
    accent: '#58e6c5'
  },
  {
    label: 'Docente',
    username: 'docente01',
    password: 'Docente2026*',
    icon: GraduationCap,
    hint: 'Profe Camila',
    accent: '#7dd3fc'
  },
  {
    label: 'Admin',
    username: 'admin',
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
  const [username, setUsername] = useState('estudiante01');
  const [password, setPassword] = useState('Cito2026*');
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
      const logged = await login(username.trim(), password);
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

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-32 top-0 size-[30rem] rounded-full bg-mint-400/12 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[34rem] rounded-full bg-sky-400/12 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-dvh w-full max-w-7xl items-center gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden flex-col justify-between gap-10 lg:flex">
          <Link to="/" aria-label="CitoIndagar 360">
            <Logo />
          </Link>
          <div className="space-y-6">
            <CitoMascot size={210} mood="happy" className="animate-float" />
            <div>
              <p className="eyebrow">Bienvenido de vuelta</p>
              <h1 className="mt-2 max-w-lg font-display text-5xl font-extrabold leading-[1.05] text-white">
                Tu próxima <span className="text-gradient">misión</span> te espera.
              </h1>
              <p className="mt-4 max-w-md text-slate-300">
                Entra a la Agencia CitoIndagar 360 y continúa tu exploración por el mundo invisible de las células.
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
            La Agencia no publica datos personales de menores. Tu progreso solo lo ves tú y tu docente.
          </p>
        </div>

        <div className="mx-auto w-full max-w-lg">
          <div className="mb-5 flex items-center justify-between lg:hidden">
            <Link to="/" aria-label="CitoIndagar 360">
              <Logo />
            </Link>
            <Link to="/" className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-slate-400 hover:bg-white/6 hover:text-white">
              <ArrowLeft className="size-4" aria-hidden />
              Inicio
            </Link>
          </div>

          <div className="glass rounded-[2rem] p-5 sm:p-8">
            <div className="mb-6">
              <p className="eyebrow">Acceso a la Agencia</p>
              <h1 className="mt-1 text-3xl font-bold text-white">Inicia tu sesión</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Usa la cuenta que te entregó tu docente. Si estás explorando, prueba una cuenta demo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="estudiante01"
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

              {error ? (
                <p role="alert" className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-3 text-sm font-semibold text-rose-200">
                  {error}
                </p>
              ) : null}

              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                Entrar a mi laboratorio
                <ArrowRight className="size-5" aria-hidden />
              </Button>
            </form>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" aria-hidden />
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Cuentas de demostración
                </span>
                <span className="h-px flex-1 bg-white/10" aria-hidden />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {demoAccounts.map((account) => {
                  const Icon = account.icon;
                  return (
                    <button
                      key={account.username}
                      type="button"
                      onClick={() => {
                        setUsername(account.username);
                        setPassword(account.password);
                        setError(null);
                      }}
                      className="group rounded-2xl border border-white/10 bg-white/4 p-3 text-left transition hover:border-white/20 hover:bg-white/8"
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
                  );
                })}
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-500">
                Al elegir una cuenta se completan usuario y contraseña. Luego pulsa “Entrar”.
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
