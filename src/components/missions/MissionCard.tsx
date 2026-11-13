import { ArrowRight, CheckCircle2, Clock3, Flame, LockKeyhole, Sparkles, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MissionSummary } from '../../lib/types';
import { badgeForCode } from '../../lib/badges';
import { cn } from '../../lib/utils';
import { MissionStatusBadge, ProgressBar } from '../ui';
import { AnimatedList, ShinyText, SpotlightCard } from '../reactbits';

export function MissionCard({ mission, index }: { mission: MissionSummary; index: number }) {
  const badge = badgeForCode(mission.badgeCode);
  const locked = mission.progress.status === 'locked';
  const completed = mission.progress.status === 'completed';

  return (
    <SpotlightCard
      spotlightColor={locked ? 'rgba(255,255,255,0.05)' : `${mission.theme.accent}25`}
      borderColor={locked ? 'rgba(255,255,255,0.1)' : `${mission.theme.accent}45`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden p-5 transition duration-300',
        locked
          ? 'bg-ink-900/45 opacity-70'
          : 'bg-ink-900/70 hover:-translate-y-1 hover:shadow-2xl'
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full blur-3xl transition group-hover:scale-125"
        style={{ background: `${mission.theme.accent}26` }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
          style={{ background: `${mission.theme.accent}1f`, border: `1px solid ${mission.theme.accent}33` }}
        >
          {mission.theme.icon}
        </span>
        <div className="flex flex-col items-end gap-1.5">
          <MissionStatusBadge status={mission.progress.status} />
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Estación {index + 1}
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex-1">
        <h3 className="text-xl font-bold leading-tight text-white">{mission.title}</h3>
        <p className="mt-1 text-sm font-bold" style={{ color: mission.theme.accent }}>
          {mission.bigQuestion}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{mission.description}</p>

        <div className="mt-4 space-y-2">
          <ProgressBar
            value={mission.progress.completedActivities}
            max={mission.progress.totalActivities}
            color={mission.theme.accent}
            label={`${mission.progress.completedActivities} de ${mission.progress.totalActivities} actividades`}
          />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Clock3 className="size-3.5" aria-hidden />
              {mission.estimatedMinutes} min
            </span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5" aria-hidden />
              {mission.progress.xpEarned} XP
            </span>
            {mission.progress.bestQuizPercentage > 0 ? (
              <span className="inline-flex items-center gap-1 text-mint-300">
                <Trophy className="size-3.5" aria-hidden />
                Quiz {mission.progress.bestQuizPercentage}%
              </span>
            ) : null}
            {completed ? (
              <span className="inline-flex items-center gap-1 text-mint-300">
                <CheckCircle2 className="size-3.5" aria-hidden />
                Insignia ganada
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="text-lg" aria-hidden>{badge?.icon ?? '🏅'}</span>
          <span className="line-clamp-2 max-w-[9rem] leading-tight">{badge?.shortName ?? 'Insignia'}</span>
        </div>
        {locked ? (
          <Link
            to={`/misiones/${mission.code}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/4 px-4 text-sm font-bold text-slate-400 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
          >
            <LockKeyhole className="size-4 text-amber-300" aria-hidden />
            Ver requisitos
          </Link>
        ) : (
          <Link
            to={`/misiones/${mission.code}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition shadow-lg"
            style={{
              background: completed ? 'rgba(255,255,255,0.08)' : mission.theme.accent,
              color: completed ? '#e2e8f0' : '#061022'
            }}
          >
            {completed ? (
              'Repasar'
            ) : mission.progress.status === 'in_progress' ? (
              'Continuar'
            ) : (
              <ShinyText text="Entrar" speed={3} className="font-extrabold text-ink-950" />
            )}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        )}
      </div>
    </SpotlightCard>
  );
}

export function MissionMap({ missions }: { missions: MissionSummary[] }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
        aria-hidden
      />
      <AnimatedList className="grid gap-4 md:grid-cols-3" stagger={0.08}>
        {missions.map((mission, index) => (
          <MissionCard key={mission.code} mission={mission} index={index} />
        ))}
      </AnimatedList>
    </div>
  );
}

export function StreakHint() {
  return (
    <div className="glass-soft flex items-center gap-3 rounded-2xl px-4 py-3">
      <span className="grid size-10 place-items-center rounded-xl bg-amber-400/12 text-amber-300">
        <Flame className="size-5" aria-hidden />
      </span>
      <div>
        <p className="text-sm font-extrabold text-white">Explorador constante</p>
        <p className="text-xs text-slate-400">Cada actividad completada suma XP a tu bitácora.</p>
      </div>
    </div>
  );
}

export function QuickTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl border border-mint-400/20 bg-mint-400/8 p-3 text-xs leading-relaxed text-mint-100">
      <Sparkles className="mt-0.5 size-4 shrink-0 text-mint-300" aria-hidden />
      <p>{children}</p>
    </div>
  );
}
