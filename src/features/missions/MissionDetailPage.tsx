import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Layers,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Chip,
  ErrorBlock,
  LinkButton,
  LoadingBlock,
  ProgressBar,
  SectionHeading
} from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import { ACTIVITY_META, PHASE_META } from '../../lib/activityMeta';
import { badgeForCode } from '../../lib/badges';
import { activityUrl, sessionInfo, splitActivities } from '../../lib/curriculum';
import { useMission, useStartMission } from '../../lib/queries';
import type { Activity } from '../../lib/types';
import { cn } from '../../lib/utils';
import { AnimatedList, Aurora, SpotlightCard } from '../../components/reactbits';

export function MissionDetailPage() {
  const { user } = useAuth();
  const { codigo } = useParams<{ codigo: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const missionQuery = useMission(codigo);
  const startMission = useStartMission(codigo ?? '');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [codigo]);

  // Permite enlaces profundos como /misiones/m1#apoyo desde el mapa del sitio.
  useEffect(() => {
    if (!location.hash) return;
    const anchor = document.getElementById(location.hash.slice(1));
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.hash, missionQuery.data]);

  if (missionQuery.isLoading) return <LoadingBlock message="Cargando estación de la misión…" />;
  if (missionQuery.isError || !missionQuery.data) {
    return <ErrorBlock message="No pudimos cargar la misión solicitada." onRetry={() => missionQuery.refetch()} />;
  }

  const mission = missionQuery.data;
  const info = sessionInfo(mission.code);
  const sessionNumber = info?.session ?? mission.order;
  const badge = badgeForCode(mission.badgeCode);
  const completed = mission.progress.status === 'completed';
  const inProgress = mission.progress.status === 'in_progress';
  const isLocked = mission.progress.status === 'locked' && user?.role !== 'admin';

  const { required, support } = splitActivities(mission);
  const completedRequired = required.filter((activity) => activity.status === 'completed').length;
  const remainingRequired = required.length - completedRequired;
  const nextStep = required.find((activity) => activity.status !== 'completed') ?? null;

  const nextMissionCode = mission.code === 'm1' ? 'm2' : mission.code === 'm2' ? 'm3' : null;
  const nextMissionInfo = sessionInfo(nextMissionCode);
  const nextMissionName = nextMissionInfo
    ? `Sesión ${nextMissionInfo.session}: ${nextMissionInfo.theme}`
    : null;

  if (isLocked) {
    const previousInfo = sessionInfo(`m${mission.order - 1}`);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={roleHome(user?.role)}
            className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Volver al mapa
          </Link>
          <Chip tone="rose">
            <LockKeyhole className="size-3.5" aria-hidden />
            Misión Bloqueada
          </Chip>
        </div>

        <section className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center space-y-4">
          <span className="grid size-20 place-items-center rounded-3xl bg-rose-400/15 text-rose-300 text-4xl mx-auto shadow-xl">
            <LockKeyhole className="size-10" />
          </span>
          <p className="eyebrow">Estación Bloqueada</p>
          <h1 className="text-3xl font-display font-extrabold text-white">{mission.title}</h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
            Para desbloquear esta sesión, primero debes completar la ruta obligatoria de la{' '}
            <strong className="text-white">
              Sesión {previousInfo?.session ?? mission.order - 1}
              {previousInfo ? `: ${previousInfo.theme}` : ''}
            </strong>{' '}
            y aprobar su reto evaluativo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <LinkButton to={`/misiones/m${mission.order - 1}`} variant="primary" size="lg">
              Ir a la Sesión {previousInfo?.session ?? mission.order - 1}
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
            <LinkButton to={roleHome(user?.role)} variant="secondary" size="lg">
              Volver al mapa de misiones
            </LinkButton>
          </div>
        </section>
      </div>
    );
  }

  const handleStart = async () => {
    if (!nextStep) return;
    try {
      if (mission.progress.status === 'available') {
        await startMission.mutateAsync();
      }
      navigate(activityUrl(mission.code, nextStep));
    } catch {
      toast.error('No pudimos iniciar la sesión. Intenta de nuevo.');
    }
  };

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to={roleHome(user?.role)}
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al mapa de sesiones
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="sky">Sesión {sessionNumber}</Chip>
          <Chip tone={completed ? 'mint' : inProgress ? 'gold' : 'sky'}>
            {completed ? 'Sesión conquistada' : inProgress ? 'Sesión en curso' : 'Sesión disponible'}
          </Chip>
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
            <ShieldCheck className="size-4 text-amber-300" aria-hidden />
            <span>Modo verificación: puedes abrir cualquier contenido de esta sesión.</span>
          </div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 hover:underline"
          >
            Panel de Admin
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      )}

      {/* ── Cabecera de la sesión ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 p-6 sm:p-8"
        style={{
          background: `linear-gradient(135deg, ${mission.theme.accent}14 0%, rgba(8,13,32,0.85) 60%, rgba(5,8,23,0.95) 100%)`
        }}
      >
        <Aurora className="rounded-[2.5rem]" opacity={0.22} colors={[mission.theme.accent, '#7dd3fc', '#a78bfa']} />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl"
          style={{ background: `${mission.theme.accent}25` }}
          aria-hidden
        />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="gold">Contenido oficial · Estrategia Indagación</Chip>
              <span className="text-xs font-bold text-slate-400">
                Sesión {sessionNumber} · {info?.theme ?? 'Sesión de indagación'}
              </span>
            </div>

            <div className="flex items-start gap-3.5">
              <span
                className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
                style={{ background: `${mission.theme.accent}22`, border: `1px solid ${mission.theme.accent}44` }}
              >
                {mission.theme.icon}
              </span>
              <div>
                <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  {mission.title}
                </h1>
                <p className="mt-1 text-sm font-bold text-slate-300">{mission.subtitle}</p>
              </div>
            </div>

            <p className="font-display text-lg font-bold sm:text-xl" style={{ color: mission.theme.accent }}>
              {mission.bigQuestion}
            </p>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{mission.description}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                <Clock3 className="size-3.5 text-slate-400" aria-hidden />
                {mission.estimatedMinutes} min estimados
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/25 bg-amber-400/8 px-3 py-1.5 text-xs font-bold text-amber-200">
                <Target className="size-3.5 text-amber-300" aria-hidden />
                {required.length} pasos obligatorios
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                <Sparkles className="size-3.5 text-mint-300" aria-hidden />
                {support.length} actividades opcionales
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                <Star className="size-3.5 text-amber-300" aria-hidden />
                {mission.progress.xpEarned} XP acumulados
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {nextStep ? (
                <Button size="lg" onClick={handleStart} loading={startMission.isPending}>
                  <Play className="size-5" aria-hidden />
                  {completed
                    ? 'Repasar la ruta'
                    : inProgress
                      ? `Continuar: paso ${completedRequired + 1} de ${required.length}`
                      : 'Comenzar la sesión'}
                </Button>
              ) : (
                <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="lg">
                  <Trophy className="size-5" aria-hidden />
                  Presentar el reto final
                </LinkButton>
              )}
              {support.length > 0 ? (
                <a
                  href="#apoyo"
                  className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-5 text-sm font-bold text-slate-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <Sparkles className="size-4 text-mint-300" aria-hidden />
                  Exploración opcional
                </a>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 lg:items-end">
            <div className="glass-soft relative flex w-full max-w-sm items-center gap-4 rounded-3xl border border-white/10 p-5">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-2xl text-4xl"
                style={{ background: `${badge?.accent ?? mission.theme.accent}22` }}
              >
                {badge?.icon ?? '🏅'}
              </span>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Insignia en juego</p>
                <h3 className="font-display text-base font-extrabold text-white">{badge?.name ?? 'Insignia de sesión'}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{badge?.description}</p>
                <p className="mt-1 text-[11px] font-bold text-mint-300">+{badge?.xpBonus ?? 50} XP al conquistar</p>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-ink-950/40 p-4">
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Avance de la ruta obligatoria
              </p>
              <ProgressBar
                value={completedRequired}
                max={required.length}
                color={mission.theme.accent}
                label={`Ruta obligatoria: ${completedRequired} de ${required.length} pasos completados`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Propósitos ────────────────────────────────────────────── */}
      <Card className="p-5">
        <div className="flex items-center gap-2">
          <Target className="size-5 text-mint-300" aria-hidden />
          <h2 className="text-base font-extrabold text-white">Propósitos de la sesión</h2>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {mission.objectives.map((objective, index) => (
            <li key={objective} className="flex items-start gap-2.5 text-xs leading-relaxed text-slate-300">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-lg bg-mint-400/12 text-[11px] font-extrabold text-mint-300">
                {index + 1}
              </span>
              {objective}
            </li>
          ))}
        </ul>
      </Card>

      {/* ── Ruta obligatoria del documento ────────────────────────── */}
      <section id="ruta" className="scroll-mt-24 space-y-4">
        <SectionHeading
          eyebrow={`Contenido oficial · Sesión ${sessionNumber}`}
          title="Ruta obligatoria de la sesión"
          description="Estos son los pasos que describe Estrategia Indagación.docx. Recórrelos en orden: cuentan para tu progreso y desbloquean la insignia."
          action={
            <Chip tone="gold">
              <Target className="size-3.5" aria-hidden />
              {completedRequired} de {required.length} completados
            </Chip>
          }
        />

        <ol className="space-y-3">
          {required.map((activity, index) => (
            <RouteStep
              key={activity._id}
              activity={activity}
              index={index}
              total={required.length}
              missionCode={mission.code}
              isNext={nextStep?._id === activity._id}
            />
          ))}
        </ol>

        {required.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">
            Esta sesión todavía no tiene pasos obligatorios configurados.
          </div>
        ) : null}
      </section>

      {/* ── Exploración de apoyo ──────────────────────────────────── */}
      {support.length > 0 ? (
        <section id="apoyo" className="scroll-mt-24 space-y-4">
          <SectionHeading
            eyebrow="Exploración de apoyo"
            title="Actividades opcionales"
            description="No forman parte de la ruta del documento curricular. Amplían la sesión con modelos, animaciones y laboratorios, pero no bloquean el avance."
            action={
              <Chip tone="neutral">
                <Sparkles className="size-3.5 text-mint-300" aria-hidden />
                No cuentan para el progreso
              </Chip>
            }
          />

          <AnimatedList className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
            {support.map((activity) => (
              <SupportCard key={activity._id} activity={activity} missionCode={mission.code} />
            ))}
          </AnimatedList>
        </section>
      ) : null}

      {/* ── Cierre de la sesión ───────────────────────────────────── */}
      <section className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-amber-400/12 text-3xl text-amber-300">
            {completed ? '🎉' : '🏆'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {completed
                ? '¡Sesión conquistada!'
                : remainingRequired > 0
                  ? `Te ${remainingRequired === 1 ? 'falta 1 paso obligatorio' : `faltan ${remainingRequired} pasos obligatorios`}`
                  : 'Todos los pasos obligatorios están completos'}
            </h2>
            <p className="text-xs text-slate-400">
              {completed
                ? nextMissionCode
                  ? 'Avanza a la siguiente sesión de indagación.'
                  : 'Completaste las tres sesiones del Laboratorio 360. Revisa tu vitrina de insignias.'
                : 'La exploración opcional queda siempre abierta: puedes volver cuando quieras.'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {completed && nextMissionCode ? (
            <LinkButton to={`/misiones/${nextMissionCode}`} variant="primary" size="lg">
              Siguiente sesión: {nextMissionName}
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
          ) : completed ? (
            <LinkButton to="/logros" variant="gold" size="lg">
              <Trophy className="size-5" aria-hidden />
              Ver mis insignias
              <ArrowRight className="size-5" aria-hidden />
            </LinkButton>
          ) : nextStep ? (
            <Button size="lg" onClick={handleStart} loading={startMission.isPending}>
              <Play className="size-5" aria-hidden />
              Continuar la ruta
            </Button>
          ) : null}
        </div>
      </section>
    </div>
  );
}

/* ── Paso de la ruta obligatoria ──────────────────────────────── */
function RouteStep({
  activity,
  index,
  total,
  missionCode,
  isNext
}: {
  activity: Activity;
  index: number;
  total: number;
  missionCode: string;
  isNext: boolean;
}) {
  const meta = ACTIVITY_META[activity.type];
  const phase = PHASE_META[activity.phase];
  const Icon = meta.icon;
  const done = activity.status === 'completed';
  const isQuiz = activity.type === 'quiz';

  return (
    <li className="relative pl-11 sm:pl-14">
      {index < total - 1 ? (
        <span className="absolute left-[15px] top-12 bottom-0 w-px bg-white/10" aria-hidden />
      ) : null}
      <span
        className={cn(
          'absolute left-0 top-4 grid size-8 place-items-center rounded-full border text-xs font-extrabold',
          done
            ? 'border-mint-400/50 bg-mint-400/20 text-mint-200'
            : isNext
              ? 'border-amber-400/60 bg-amber-400/15 text-amber-200'
              : 'border-white/15 bg-ink-900 text-slate-300'
        )}
        aria-hidden
      >
        {done ? <CheckCircle2 className="size-4" /> : index + 1}
      </span>

      <SpotlightCard
        spotlightColor={`${meta.color}18`}
        borderColor={done ? 'rgba(88, 230, 197, 0.28)' : isNext ? 'rgba(251, 191, 36, 0.35)' : 'rgba(255,255,255,0.10)'}
        className="p-4 sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className="grid size-10 shrink-0 place-items-center rounded-xl"
              style={{ background: `${meta.color}1f`, color: meta.color }}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Paso {index + 1} · {meta.label}
                </span>
                <Chip tone="neutral">{phase.label}</Chip>
                {isQuiz ? <Chip tone="gold">Reto de la plataforma</Chip> : null}
                {done ? (
                  <Chip tone="mint">
                    <CheckCircle2 className="size-3" aria-hidden />
                    Completado
                  </Chip>
                ) : isNext ? (
                  <Chip tone="gold">Siguiente</Chip>
                ) : null}
              </div>
              <h3 className="mt-1.5 font-display text-base font-bold leading-snug text-white sm:text-lg">
                {activity.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">{activity.instructions}</p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              +{activity.xp} XP
            </span>
            <LinkButton
              to={activityUrl(missionCode, activity)}
              variant={done ? 'secondary' : isNext ? 'primary' : 'secondary'}
              size="sm"
            >
              {done ? 'Repasar' : 'Abrir'}
              <ArrowRight className="size-4" aria-hidden />
            </LinkButton>
          </div>
        </div>
      </SpotlightCard>
    </li>
  );
}

/* ── Tarjeta de actividad opcional ────────────────────────────── */
function SupportCard({ activity, missionCode }: { activity: Activity; missionCode: string }) {
  const meta = ACTIVITY_META[activity.type];
  const Icon = meta.icon;

  return (
    <SpotlightCard
      spotlightColor="rgba(167, 139, 250, 0.12)"
      borderColor="rgba(255,255,255,0.08)"
      className="flex h-full flex-col justify-between bg-ink-900/45 p-4"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl opacity-80"
            style={{ background: `${meta.color}18`, color: meta.color }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <Chip tone="neutral">
            <Layers className="size-3" aria-hidden />
            Opcional
          </Chip>
        </div>
        <p className="mt-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{meta.label}</p>
        <h3 className="mt-0.5 font-display text-sm font-bold leading-snug text-white">{activity.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400">{activity.instructions}</p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-2.5">
        <span className="text-[11px] font-bold text-slate-400">{activity.xp} XP de apoyo</span>
        <Link
          to={activityUrl(missionCode, activity)}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-mint-300 transition hover:text-mint-200"
        >
          Abrir
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </SpotlightCard>
  );
}
