import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Play,
  ShieldCheck,
  Star,
  Trophy,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Chip, ErrorBlock, LinkButton, LoadingBlock, ProgressBar } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { ACTIVITY_META, PHASE_META } from '../../lib/activityMeta';
import { badgeForCode } from '../../lib/badges';
import { useMission, useStartMission } from '../../lib/queries';
import type { PhaseKey } from '../../lib/types';
import { cn } from '../../lib/utils';
import { AnimatedList, Aurora, SpotlightCard } from '../../components/reactbits';

export function MissionDetailPage() {
  const { user } = useAuth();
  const { codigo, phase: paramPhase } = useParams<{ codigo: string; phase?: string }>();
  const navigate = useNavigate();
  const missionQuery = useMission(codigo);
  const startMission = useStartMission(codigo ?? '');
  const [selectedPhase, setSelectedPhase] = useState<PhaseKey>(
    paramPhase === 'inicio' || paramPhase === 'desarrollo' || paramPhase === 'cierre' ? paramPhase : 'inicio'
  );

  if (missionQuery.isLoading) return <LoadingBlock message="Cargando estación de la misión…" />;
  if (missionQuery.isError || !missionQuery.data) {
    return <ErrorBlock message="No pudimos cargar la misión solicitada." onRetry={() => missionQuery.refetch()} />;
  }

  const mission = missionQuery.data;
  const badge = badgeForCode(mission.badgeCode);
  const completed = mission.progress.status === 'completed';
  const inProgress = mission.progress.status === 'in_progress';

  const phaseActivities = mission.activities.filter((act) => act.phase === selectedPhase);
  const completedInPhase = phaseActivities.filter((act) => act.status === 'completed').length;

  const nextActivity =
    mission.activities.find((act) => act.status !== 'completed' && act.required) ??
    mission.activities.find((act) => act.status !== 'completed') ??
    mission.activities[0];

  const handleStart = async () => {
    if (mission.progress.status === 'available') {
      await startMission.mutateAsync();
    }
    if (nextActivity) {
      navigate(`/misiones/${mission.code}/actividades/${nextActivity._id}`);
    }
  };

  const phases: PhaseKey[] = ['inicio', 'desarrollo', 'cierre'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/estudiante"
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al mapa
        </Link>
        <Chip tone={completed ? 'mint' : inProgress ? 'gold' : 'sky'}>
          {completed ? 'Misión conquistada' : inProgress ? 'Misión en curso' : 'Misión disponible'}
        </Chip>
      </div>

      {user?.role === 'admin' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-200">
            <ShieldCheck className="size-4 text-amber-300" aria-hidden />
            <span>Verificando Misión como Administrador · Todas las fases y actividades están disponibles para comprobación.</span>
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

      {/* Header Banner */}
      <section
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 p-6 sm:p-8"
        style={{
          background: `linear-gradient(135deg, ${mission.theme.accent}14 0%, rgba(8,13,32,0.85) 60%, rgba(5,8,23,0.95) 100%)`
        }}
      >
        <Aurora
          className="rounded-[2.5rem]"
          opacity={0.22}
          colors={[mission.theme.accent, '#7dd3fc', '#a78bfa']}
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl"
          style={{ background: `${mission.theme.accent}25` }}
          aria-hidden
        />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="grid size-12 place-items-center rounded-2xl text-2xl"
                style={{ background: `${mission.theme.accent}22`, border: `1px solid ${mission.theme.accent}44` }}
              >
                {mission.theme.icon}
              </span>
              <div>
                <p className="eyebrow">Misión {mission.order} · Laboratorio 360 La Célula</p>
                <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{mission.title}</h1>
              </div>
            </div>

            <p className="font-display text-lg font-bold sm:text-xl" style={{ color: mission.theme.accent }}>
              {mission.bigQuestion}
            </p>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">{mission.description}</p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                <Clock3 className="size-3.5 text-slate-400" aria-hidden />
                {mission.estimatedMinutes} min estimados
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                <Star className="size-3.5 text-amber-300" aria-hidden />
                {mission.progress.xpEarned} XP acumulados
              </span>
              {mission.progress.bestQuizPercentage > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-mint-400/20 bg-mint-400/10 px-3 py-1.5 text-xs font-bold text-mint-300">
                  <Trophy className="size-3.5" aria-hidden />
                  Mejor Quiz: {mission.progress.bestQuizPercentage}%
                </span>
              ) : null}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {nextActivity ? (
                <Button size="lg" onClick={handleStart} loading={startMission.isPending}>
                  <Play className="size-5" aria-hidden />
                  {completed ? 'Repasar actividades' : inProgress ? 'Continuar siguiente actividad' : 'Comenzar misión'}
                </Button>
              ) : null}

              <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="lg">
                <Trophy className="size-5" aria-hidden />
                {completed ? 'Repetir Quiz final' : 'Reto: Quiz de misión'}
              </LinkButton>
            </div>
          </div>

          {/* Badge & card */}
          <div className="flex flex-col items-center justify-center gap-4 lg:items-end">
            <div className="glass-soft relative flex w-full max-w-sm items-center gap-4 rounded-3xl border border-white/10 p-5">
              <span
                className="grid size-16 shrink-0 place-items-center rounded-2xl text-4xl"
                style={{ background: `${badge?.accent ?? mission.theme.accent}22` }}
              >
                {badge?.icon ?? '🏅'}
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Insignia en juego</p>
                <h3 className="font-display text-base font-extrabold text-white">{badge?.name ?? 'Insignia de misión'}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{badge?.description}</p>
                <p className="mt-1 text-[11px] font-bold text-mint-300">+{badge?.xpBonus ?? 50} XP al conquistar</p>
              </div>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-white/8 bg-ink-950/40 p-4">
              <ProgressBar
                value={mission.progress.completedActivities}
                max={mission.progress.totalActivities}
                color={mission.theme.accent}
                label={`Progreso de misión: ${mission.progress.completedActivities} de ${mission.progress.totalActivities} actividades`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mission.objectives.map((obj, i) => (
          <Card key={i} className="flex items-start gap-3 p-4">
            <span className="grid size-7 shrink-0 place-items-center rounded-xl bg-mint-400/12 text-xs font-bold text-mint-300">
              0{i + 1}
            </span>
            <p className="text-xs leading-relaxed text-slate-300">{obj}</p>
          </Card>
        ))}
      </section>

      {/* Phase Navigation Tabs */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
          {phases.map((phaseKey) => {
            const meta = PHASE_META[phaseKey];
            const active = selectedPhase === phaseKey;
            const count = mission.activities.filter((a) => a.phase === phaseKey).length;
            const done = mission.activities.filter((a) => a.phase === phaseKey && a.status === 'completed').length;
            return (
              <button
                key={phaseKey}
                type="button"
                onClick={() => setSelectedPhase(phaseKey)}
                className={cn(
                  'flex min-h-12 items-center gap-2.5 rounded-2xl px-5 text-sm font-bold transition',
                  active
                    ? 'border border-mint-400/30 bg-mint-400/14 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-white/6 hover:text-white'
                )}
              >
                <span>{meta.label}</span>
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-extrabold',
                    done === count && count > 0
                      ? 'bg-mint-400/20 text-mint-300'
                      : 'bg-white/10 text-slate-400'
                  )}
                >
                  {done}/{count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Phase Description */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-xl font-bold text-white">
              Fase: {PHASE_META[selectedPhase].label}
            </h2>
            <p className="text-sm text-slate-400">{PHASE_META[selectedPhase].description}</p>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {completedInPhase} de {phaseActivities.length} completadas en esta fase
          </span>
        </div>

        {/* Activities List */}
        <AnimatedList className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {phaseActivities.map((activity) => {
            const meta = ACTIVITY_META[activity.type];
            const Icon = meta.icon;
            const isCompleted = activity.status === 'completed';

            return (
              <SpotlightCard
                key={activity._id}
                spotlightColor={`${meta.color}20`}
                borderColor={`${meta.color}45`}
                className={cn(
                  'group relative flex flex-col justify-between overflow-hidden p-5 transition duration-200',
                  isCompleted
                    ? 'border-mint-400/25 bg-ink-900/60'
                    : 'border-white/10 bg-ink-900/80 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-xl'
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="grid size-12 shrink-0 place-items-center rounded-2xl text-xl"
                      style={{ background: `${meta.color}1f`, color: meta.color }}
                    >
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div className="flex flex-col items-end gap-1">
                      {isCompleted ? (
                        <Chip tone="mint">
                          <CheckCircle2 className="size-3.5" aria-hidden />
                          Completada
                        </Chip>
                      ) : (
                        <Chip tone={activity.required ? 'gold' : 'neutral'}>
                          {activity.required ? 'Obligatoria' : 'Optativa'}
                        </Chip>
                      )}
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        +{activity.xp} XP
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Paso {activity.order} · {meta.label}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug text-white group-hover:text-mint-300 transition">
                      {activity.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">
                      {activity.instructions}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    {activity.type === 'quiz' ? 'Reto evaluativo' : activity.type === 'evidence' ? 'Producción escrita' : 'Interactivo'}
                  </span>
                  <LinkButton
                    to={
                      activity.type === 'quiz'
                        ? `/misiones/${mission.code}/quiz`
                        : `/misiones/${mission.code}/actividades/${activity._id}`
                    }
                    variant={isCompleted ? 'secondary' : 'primary'}
                    size="sm"
                  >
                    {isCompleted ? 'Repasar' : 'Abrir'}
                    <ArrowRight className="size-4" aria-hidden />
                  </LinkButton>
                </div>
              </SpotlightCard>
            );
          })}
        </AnimatedList>

        {phaseActivities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">
            No hay actividades configuradas para esta fase.
          </div>
        ) : null}
      </section>

      {/* Cierre Banner */}
      <section className="glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid size-14 place-items-center rounded-2xl bg-amber-400/12 text-amber-300 text-3xl">
            🏆
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">¿Listo para el reto final?</h2>
            <p className="text-xs text-slate-400">
              Aprueba el quiz con 70% o más para obtener la insignia <strong>{badge?.name}</strong>.
            </p>
          </div>
        </div>
        <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="lg">
          <Trophy className="size-5" aria-hidden />
          Presentar Quiz de la Misión
          <ArrowRight className="size-4" aria-hidden />
        </LinkButton>
      </section>
    </div>
  );
}
