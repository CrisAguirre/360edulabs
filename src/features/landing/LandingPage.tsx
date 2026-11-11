import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth, roleHome } from '../contexts/AuthContext';
import { BADGE_CATALOG } from '../lib/badges';
import { CitoMascot } from '../components/Cito';
import { Card, LinkButton } from '../components/ui';

const missions = [
  {
    code: 'm1',
    title: '¡Misión microscópica!',
    question: '¿De qué están hechos todos los seres vivos?',
    icon: '🔬',
    accent: '#58e6c5',
    description: 'Una muestra misteriosa llega al laboratorio. Explora una gota de agua y descubre la teoría celular.'
  },
  {
    code: 'm2',
    title: '¡Misión celular!',
    question: '¿Son iguales las células de nuestro cuerpo y las de una planta?',
    icon: '🧬',
    accent: '#7dd3fc',
    description: 'Compara células animales y vegetales, explora el Cubo Merge y colorea tus plantillas Quiver.'
  },
  {
    code: 'm3',
    title: '¡Misión energía!',
    question: '¿Cómo obtienen y usan la energía las células?',
    icon: '⚡',
    accent: '#fbbf24',
    description: 'Entra a la fábrica celular, ajusta agua y luz, y descubre cómo se produce el ATP.'
  }
];

const features = [
  { icon: '🌐', title: 'Video 360', text: 'Inmersión en una gota de agua y en el interior de la célula.' },
  { icon: '🧊', title: 'Modelos 3D', text: 'Gira, acerca y toca organelos con hotspots explicativos.' },
  { icon: '📦', title: 'Cubo Merge AR', text: 'Explora seis caras con pistas científicas y un cubo virtual de respaldo.' },
  { icon: '🎨', title: 'Estación Quiver', text: 'Colorea plantillas, escanéalas y convierte tu dibujo en 3D.' },
  { icon: '🏅', title: 'Insignias y XP', text: 'Cada misión entrega una insignia y desbloquea la siguiente estación.' },
  { icon: '📊', title: 'Panel docente', text: 'Progreso del aula, evidencias para revisar y reportes descargables.' }
];

export function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-mint-400/12 blur-3xl" />
        <div className="absolute -right-40 top-1/4 size-[38rem] rounded-full bg-sky-400/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-violet-400/10 blur-3xl" />
      </div>

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" aria-label="CitoIndagar 360">
          <span className="grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-mint-300 to-sky-400 font-display text-xl font-extrabold text-ink-950">
            C
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-extrabold text-white">
              CitoIndagar <span className="text-mint-300">360</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Agencia de exploradores
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/login" className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/6 hover:text-white sm:block">
            Iniciar sesión
          </Link>
          <LinkButton to={user ? roleHome(user.role) : '/login'} size="sm">
            {user ? 'Ir a mi panel' : 'Entrar a la Agencia'}
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-14">
        <div className="relative space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint-400/25 bg-mint-400/10 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-mint-300">
            <Sparkles className="size-4" aria-hidden />
            Ciencia para 5.º de primaria
          </span>
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            La célula se vuelve una <span className="text-gradient">aventura</span>.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tres misiones gamificadas para descubrir lo invisible: video 360, modelos 3D, realidad aumentada,
            experimentos y evidencias. Cito, tu mascota mitocondria, te acompaña en cada paso.
          </p>
          <div className="flex flex-wrap gap-3">
            <LinkButton to={user ? roleHome(user.role) : '/login'} size="lg">
              Comenzar la exploración
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
            <a
              href="#misiones"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-white/14 bg-white/6 px-6 py-3 text-base font-bold text-white transition hover:bg-white/12"
            >
              Ver las misiones
            </a>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-3 pt-3">
            {[
              ['3', 'misiones'],
              ['28', 'actividades'],
              ['5', 'insignias']
            ].map(([value, label]) => (
              <div key={label} className="glass-soft rounded-2xl px-4 py-3">
                <dt className="font-display text-2xl font-extrabold text-mint-300">{value}</dt>
                <dd className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-8 rounded-full bg-mint-400/20 blur-3xl" aria-hidden />
          <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/2 p-6 shadow-2xl backdrop-blur-xl">
            <div className="relative mx-auto grid aspect-square max-w-sm place-items-center rounded-[2rem] bg-ink-900/70 p-6">
              <div className="orbit-ring" aria-hidden />
              <div className="orbit-ring scale-75 opacity-70" aria-hidden />
              <div className="cell-blob left-8 top-12 h-24 w-28 bg-mint-400/30" aria-hidden />
              <div className="cell-blob bottom-10 right-8 h-20 w-24 bg-sky-400/30" aria-hidden style={{ animationDelay: '-4s' }} />
              <CitoMascot size={230} mood="celebrating" className="animate-float" />
            </div>
            <div className="mt-4 rounded-2xl border border-white/8 bg-ink-950/60 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-mint-300">Cito dice…</p>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-200">
                “¡Hola, explorador! Hoy vamos a descubrir de qué está hecha la vida. Trae tu curiosidad y tu
                bitácora.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="misiones" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">El mapa de la Agencia</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Tres estaciones, una gran pregunta</h2>
          <p className="mt-2 text-slate-400">
            Cada misión combina observación, manipulación y argumentación. Completa la anterior para abrir la
            siguiente.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {missions.map((mission, index) => (
            <Card key={mission.code} className="relative overflow-hidden p-5">
              <div
                className="absolute -right-12 -top-12 size-36 rounded-full blur-2xl"
                style={{ background: `${mission.accent}33` }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl text-3xl" style={{ background: `${mission.accent}1f` }}>
                    {mission.icon}
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/10">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{mission.title}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: mission.accent }}>
                  {mission.question}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{mission.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow">Un laboratorio completo</p>
          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Aprender haciendo, con evidencia</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="glass-soft rounded-2xl p-5">
              <span className="text-2xl" aria-hidden>{feature.icon}</span>
              <h3 className="mt-3 font-bold text-white">{feature.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-br from-mint-400/12 via-sky-400/8 to-violet-400/10 p-6 sm:p-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="eyebrow">Para docentes</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Tu aula, en una sola mirada</h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Consulta el avance de cada estudiante, revisa evidencias con rúbrica, identifica quién necesita
              acompañamiento y descarga un reporte para tu consejo de aula.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <LinkButton to="/login" variant="secondary">
                Entrar como docente
                <ArrowRight className="size-4" aria-hidden />
              </LinkButton>
              <span className="inline-flex items-center rounded-xl bg-white/6 px-3 py-2 text-xs font-bold text-slate-300">
                Código de aula demo: CITO5A
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {BADGE_CATALOG.slice(0, 4).map((badge) => (
              <div key={badge.code} className="rounded-2xl border border-white/10 bg-ink-950/45 p-4">
                <span className="text-2xl" aria-hidden>{badge.icon}</span>
                <p className="mt-2 text-sm font-extrabold text-white">{badge.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>CitoIndagar 360 · Agencia de exploradores científicos · v1.0.0</p>
          <p>Diseñado para 5.º de primaria · WCAG 2.1 AA · Datos de menores protegidos</p>
        </div>
      </footer>
    </div>
  );
}
