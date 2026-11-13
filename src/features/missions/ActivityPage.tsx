import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ListChecks,
  LockKeyhole,
  Sparkles,
  Trophy
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Chip, ErrorBlock, LinkButton, LoadingBlock, ProgressBar } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import { ACTIVITY_META, PHASE_META } from '../../lib/activityMeta';
import { celebrate } from '../../lib/celebrate';
import { useCompleteActivity, useMission, useStartMission } from '../../lib/queries';
import type { Evidence } from '../../lib/types';
import { cn } from '../../lib/utils';
import { ActivityPlayer } from '../labs/ActivityPlayer';

interface Reward {
  badge: { code: string; name: string; description: string; icon: string } | null;
  missionCompleted: boolean;
  awardedXp?: number;
}

export function ActivityPage() {
  const { codigo, activityId } = useParams<{ codigo: string; activityId: string }>();
  const missionQuery = useMission(codigo);
  const startMission = useStartMission(codigo ?? '');
  const completeActivity = useCompleteActivity(codigo ?? '');
  const toast = useToast();
  const [runtime, setRuntime] = useState<{ progress?: number; faces?: number }>({});
  const [confirmed, setConfirmed] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const autoStarted = useRef(false);

  const mission = missionQuery.data;
  const activity = mission?.activities.find((item) => item._id === activityId);

  useEffect(() => {
    if (!mission || mission.progress.status !== 'available' || autoStarted.current) return;
    autoStarted.current = true;
    startMission.mutate(undefined, {
      onError: (error) => {
        toast.error(error instanceof ApiError ? error.message : 'No pudimos iniciar la misión.');
      }
    });
  }, [mission, startMission, toast]);

  if (missionQuery.isLoading) return <LoadingBlock message="Abriendo la actividad…" />;
  if (missionQuery.isError || !mission) {
    const message = missionQuery.error instanceof ApiError ? missionQuery.error.message : 'No pudimos cargar la misión.';
    return (
      <ErrorBlock
        title="Misión no disponible"
        message={message}
        onRetry={() => missionQuery.refetch()}
      />
    );
  }
  if (!activity) {
    return (
      <ErrorBlock
        title="Actividad no encontrada"
        message="Esta actividad no existe en la misión o fue movida."
        onRetry={() => missionQuery.refetch()}
      />
    );
  }

  const meta = ACTIVITY_META[activity.type];
  const phase = PHASE_META[activity.phase];
  const Icon = meta.icon;
  const completed = activity.status === 'completed';
  const starting = startMission.isPending || (mission.progress.status === 'available' && !startMission.isError);

  const currentIndex = mission.activities.findIndex((item) => item._id === activityId);
  const previousActivity = currentIndex > 0 ? mission.activities[currentIndex - 1] : null;
  const nextActivity =
    currentIndex >= 0 && currentIndex < mission.activities.length - 1
      ? mission.activities[currentIndex + 1]
      : null;

  const getActivityUrl = (act: (typeof mission.activities)[number]) => {
    return act.type === 'quiz' ? `/misiones/${mission.code}/quiz` : `/misiones/${mission.code}/actividades/${act._id}`;
  };

  const completePayload = (): Record<string, unknown> | null => {
    if (activity.completionRule.type === 'confirm') return { confirmed: true };
    if (activity.completionRule.type === 'video_progress') {
      return { progress: Math.round(runtime.progress ?? 0) };
    }
    if (activity.completionRule.type === 'faces_explored') {
      return { faces: runtime.faces ?? 0 };
    }
    return null;
  };

  const canComplete = (() => {
    if (completed) return false;
    if (activity.completionRule.type === 'confirm') return confirmed;
    if (activity.completionRule.type === 'video_progress') {
      return (runtime.progress ?? 0) >= activity.completionRule.min;
    }
    if (activity.completionRule.type === 'faces_explored') {
      return (runtime.faces ?? 0) >= activity.completionRule.min;
    }
    return false;
  })();

  const handleComplete = async () => {
    const payload = completePayload();
    if (!payload) return;
    try {
      const result = await completeActivity.mutateAsync({ id: activity._id, payload });
      setReward({
        badge: result.badgeAwarded,
        missionCompleted: result.missionCompleted,
        awardedXp: activity.xp
      });
      if (result.badgeAwarded) {
        celebrate('big');
        toast.success(`¡Ganaste la insignia ${result.badgeAwarded.name}!`);
      } else {
        celebrate('small');
        toast.success(`Actividad completada: +${activity.xp} XP`);
      }
      if (result.missionCompleted && !result.badgeAwarded) {
        toast.success('¡Completaste la misión!');
      }
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'No pudimos completar la actividad.');
    }
  };

  const handleEvidenceSubmitted = (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => {
    setReward({
      badge: result.badgeAwarded,
      missionCompleted: result.missionCompleted,
      awardedXp: activity.xp
    });
    if (result.badgeAwarded) {
      celebrate('big');
      toast.success(`¡Ganaste la insignia ${result.badgeAwarded.name}!`);
    } else {
      celebrate('small');
      toast.success('Evidencia enviada. Tu docente la revisará pronto.');
    }
  };

  const renderCompletion = () => {
    if (activity.type === 'quiz') {
      return (
        <Card className="border-amber-400/20 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">Reto final de la misión</h2>
              <p className="mt-1 text-sm text-slate-400">
                Responde el quiz en su página dedicada. Necesitas {activity.content?.passScore ?? 70} % para aprobarlo.
              </p>
            </div>
            <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold">
              <Trophy className="size-4" aria-hidden />
              {completed ? 'Repetir quiz' : 'Abrir quiz'}
              <ArrowRight className="size-4" aria-hidden />
            </LinkButton>
          </div>
        </Card>
      );
    }

    if (activity.type === 'evidence') return null;

    if (completed) {
      return (
        <Card className="border-mint-400/25 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-mint-400/12 text-mint-300">
                <CheckCircle2 className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">Actividad completada</h2>
                <p className="text-sm text-slate-400">
                  Ya recibiste los {activity.xp} XP de esta actividad. Puedes repasar el contenido las veces que quieras.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {nextActivity ? (
                <LinkButton to={getActivityUrl(nextActivity)} variant="primary" size="sm">
                  Siguiente actividad
                  <ArrowRight className="size-4" aria-hidden />
                </LinkButton>
              ) : (
                <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="sm">
                  <Trophy className="size-4" aria-hidden />
                  Ir al Quiz de la Misión
                  <ArrowRight className="size-4" aria-hidden />
                </LinkButton>
              )}
            </div>
          </div>
        </Card>
      );
    }

    if (activity.completionRule.type === 'confirm') {
      const label = activity.completionRule.label ?? 'Confirmo que completé esta actividad';
      return (
        <Card className="p-5 border-white/15">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="size-5 text-mint-400" aria-hidden />
            Registrar finalización
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Para registrar tu avance y sumar tus XP, confirma que exploraste los contenidos de la estación:
          </p>
          <label className={cn(
            'mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm transition-all duration-300',
            confirmed
              ? 'border-mint-400/40 bg-mint-400/10 text-mint-100'
              : 'border-white/10 bg-white/3 text-slate-300 hover:border-mint-400/20 hover:bg-white/6'
          )}>
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(event) => setConfirmed(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 accent-[#2bd4ad]"
            />
            <span>
              <strong className="text-white block">{label}</strong>
              <span className="mt-1 block text-xs text-slate-400">
                Al marcar la casilla, se habilita el botón para registrar tus {activity.xp} XP y continuar.
              </span>
            </span>
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              onClick={handleComplete}
              disabled={!canComplete}
              loading={completeActivity.isPending}
              variant={confirmed ? 'primary' : 'secondary'}
            >
              <CheckCircle2 className="size-4" aria-hidden />
              Completar actividad (+{activity.xp} XP)
            </Button>
            {!confirmed ? (
              <span className="text-xs text-amber-300/80 animate-pulse font-medium">
                👉 Marca la casilla de arriba para habilitar este botón
              </span>
            ) : (
              <span className="text-xs text-mint-300 font-medium">
                ¡Listo! Haz clic en el botón para guardar tu progreso.
              </span>
            )}
          </div>
        </Card>
      );
    }

    if (activity.completionRule.type === 'video_progress') {
      const min = activity.completionRule.min;
      const value = runtime.progress ?? 0;
      return (
        <Card className="p-5">
          <h2 className="text-lg font-bold text-white">Cerrar recorrido</h2>
          <p className="mt-1 text-sm text-slate-400">
            Necesitas observar al menos el {min} % de la escena. Puedes pausar, cambiar la velocidad o leer la
            transcripción.
          </p>
          <div className="mt-3">
            <ProgressBar value={value} max={100} color="#7dd3fc" label={`Recorrido observado: ${Math.round(value)} %`} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleComplete} disabled={!canComplete} loading={completeActivity.isPending}>
              <CheckCircle2 className="size-4" aria-hidden />
              Completar actividad (+{activity.xp} XP)
            </Button>
            {value < min ? (
              <span className="text-xs text-slate-500">Te falta {Math.ceil(min - value)} % de recorrido.</span>
            ) : (
              <span className="text-xs text-mint-300">¡Listo para cerrar la actividad!</span>
            )}
          </div>
        </Card>
      );
    }

    if (activity.completionRule.type === 'faces_explored') {
      const min = activity.completionRule.min;
      const value = runtime.faces ?? 0;
      return (
        <Card className="p-5">
          <h2 className="text-lg font-bold text-white">Cerrar exploración del cubo</h2>
          <p className="mt-1 text-sm text-slate-400">
            Debes explorar al menos {min} caras. Toca cada cara en la lista para descubrir su pista científica.
          </p>
          <div className="mt-3">
            <ProgressBar value={value} max={6} color="#fbbf24" label={`Caras exploradas: ${value} de 6`} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={handleComplete} disabled={!canComplete} loading={completeActivity.isPending}>
              <CheckCircle2 className="size-4" aria-hidden />
              Completar actividad (+{activity.xp} XP)
            </Button>
            {value < min ? <span className="text-xs text-slate-500">Explora {min - value} cara(s) más.</span> : null}
          </div>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Link
            to={`/misiones/${mission.code}/${activity.phase}`}
            className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Volver a la misión
          </Link>
          {previousActivity && (
            <Link
              to={getActivityUrl(previousActivity)}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-white/6 hover:text-mint-300 transition"
              title={`Actividad anterior: ${previousActivity.title}`}
            >
              <ArrowLeft className="size-3" aria-hidden />
              Anterior
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Chip tone="neutral">
            <ListChecks className="size-3.5" aria-hidden />
            {phase.label} · actividad {activity.order}
          </Chip>
          {nextActivity && (
            <Link
              to={getActivityUrl(nextActivity)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-mint-300 hover:bg-mint-400/10 transition"
              title={`Siguiente: ${nextActivity.title}`}
            >
              Siguiente
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      <header className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-900/85 via-ink-900/65 to-ink-950/85 p-5 sm:p-6">
        <div
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full blur-3xl"
          style={{ background: `${meta.color}24` }}
          aria-hidden
        />
        <div className="relative flex flex-wrap items-start gap-4">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl"
            style={{ background: `${meta.color}1f`, border: `1px solid ${meta.color}33`, color: meta.color }}
          >
            <Icon className="size-7" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="mint">{meta.label}</Chip>
              <Chip tone="neutral">{activity.required ? 'Obligatoria' : 'Optativa'}</Chip>
              {completed ? (
                <Chip tone="mint">
                  <CheckCircle2 className="size-3.5" aria-hidden />
                  Completada
                </Chip>
              ) : null}
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                +{activity.xp} XP
              </span>
            </div>
            <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {activity.title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300">{activity.instructions}</p>
          </div>
        </div>
      </header>

      {starting ? (
        <LoadingBlock message="Iniciando tu misión y preparando la actividad…" />
      ) : (
        <>
          <ActivityPlayer
            activity={activity}
            mission={mission}
            onProgressChange={(value) => setRuntime((current) => ({ ...current, ...value }))}
            onEvidenceSubmitted={handleEvidenceSubmitted}
          />
          {renderCompletion()}
        </>
      )}

      {reward ? (
        <Card className="relative overflow-hidden border-mint-400/30 p-5">
          <div className="pointer-events-none absolute -right-20 -top-20 size-60 rounded-full bg-mint-400/15 blur-3xl" aria-hidden />
          <div className="relative flex flex-wrap items-start gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-mint-400/12 text-3xl">
              {reward.badge?.icon ?? (reward.missionCompleted ? <Trophy className="size-7" aria-hidden /> : <Sparkles className="size-7" aria-hidden />)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="eyebrow">Registro del Laboratorio 360</p>
              <h2 className="mt-1 text-xl font-bold text-white">
                {reward.badge
                  ? `¡Insignia desbloqueada: ${reward.badge.name}!`
                  : reward.missionCompleted
                    ? '¡Misión completada!'
                    : `¡Actividad completada! +${reward.awardedXp ?? activity.xp} XP`}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                {reward.badge?.description ??
                  (reward.missionCompleted
                    ? 'Tu bitácora ya registra esta estación. Revisa tus logros y comparte el resultado con tu docente.'
                    : 'Tu progreso quedó guardado. Puedes seguir con la siguiente actividad de la misión.')}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nextActivity ? (
                  <LinkButton to={getActivityUrl(nextActivity)} variant="primary" size="sm">
                    Siguiente: {nextActivity.title}
                    <ArrowRight className="size-4" aria-hidden />
                  </LinkButton>
                ) : (
                  <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="sm">
                    <Trophy className="size-4" aria-hidden />
                    Ir al Quiz de la Misión
                    <ArrowRight className="size-4" aria-hidden />
                  </LinkButton>
                )}
                <LinkButton to={`/misiones/${mission.code}`} variant="secondary" size="sm">
                  Ver la misión
                </LinkButton>
                <LinkButton to="/logros" variant="secondary" size="sm">
                  <Trophy className="size-4" aria-hidden />
                  Mis logros
                </LinkButton>
                <LinkButton to="/estudiante" variant="ghost" size="sm">
                  Volver al mapa
                </LinkButton>
              </div>
            </div>
          </div>
        </Card>
      ) : null}

      {/* Barra de navegación continua entre actividades */}
      <nav aria-label="Navegación continua entre actividades" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-ink-950/40 p-3 sm:p-4">
        {previousActivity ? (
          <LinkButton to={getActivityUrl(previousActivity)} variant="ghost" size="sm">
            <ArrowLeft className="size-4" aria-hidden />
            <span className="hidden sm:inline">Anterior:</span> {previousActivity.title.length > 25 ? previousActivity.title.slice(0, 25) + '…' : previousActivity.title}
          </LinkButton>
        ) : (
          <LinkButton to={`/misiones/${mission.code}`} variant="ghost" size="sm">
            <ArrowLeft className="size-4" aria-hidden />
            Inicio de la misión
          </LinkButton>
        )}

        <Link
          to={`/misiones/${mission.code}/${activity.phase}`}
          className="text-xs font-bold text-slate-400 hover:text-mint-300 transition"
        >
          {phase.label} · {currentIndex + 1} de {mission.activities.length}
        </Link>

        {nextActivity ? (
          <LinkButton to={getActivityUrl(nextActivity)} variant="secondary" size="sm">
            <span className="hidden sm:inline">Siguiente:</span> {nextActivity.title.length > 25 ? nextActivity.title.slice(0, 25) + '…' : nextActivity.title}
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        ) : (
          <LinkButton to={`/misiones/${mission.code}/quiz`} variant="gold" size="sm">
            <Trophy className="size-4" aria-hidden />
            Reto Quiz Final
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        )}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-xs text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <ClipboardCheck className="size-4 text-mint-300" aria-hidden />
          Tu progreso se guarda en el Laboratorio 360.
        </span>
        <span className={cn('inline-flex items-center gap-1.5', completed && 'text-mint-300')}>
          {completed ? <CheckCircle2 className="size-4" aria-hidden /> : <LockKeyhole className="size-4" aria-hidden />}
          {completed ? 'Actividad completada' : 'Actividad pendiente'}
        </span>
      </div>
    </div>
  );
}
