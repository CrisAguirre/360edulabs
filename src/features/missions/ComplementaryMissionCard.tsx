import { CheckCircle2, Trophy } from 'lucide-react';
import { Chip, LinkButton } from '../../components/ui';
import { SpotlightCard } from '../../components/reactbits';
import { ACTIVITY_META, PHASE_META } from '../../lib/activityMeta';
import { activityUrl } from '../../lib/curriculum';
import type { Activity } from '../../lib/types';

export function ComplementaryMissionCard({
  activity,
  missionCode
}: {
  activity: Activity;
  missionCode: string;
}) {
  const meta = ACTIVITY_META[activity.type];
  const phase = PHASE_META[activity.phase];
  const Icon = meta.icon;
  const done = activity.status === 'completed';
  const isQuiz = activity.type === 'quiz';
  const isEvidence = activity.type === 'evidence';

  return (
    <SpotlightCard
      spotlightColor={`${meta.color}20`}
      borderColor={
        done
          ? 'rgba(88, 230, 197, 0.35)'
          : isQuiz
            ? 'rgba(251, 191, 36, 0.35)'
            : 'rgba(255, 255, 255, 0.12)'
      }
      className="flex flex-col justify-between p-5 space-y-4 bg-ink-900/60 transition-all hover:border-white/20"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <span
            className="grid size-11 shrink-0 place-items-center rounded-2xl"
            style={{ background: `${meta.color}22`, color: meta.color }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <Chip tone="neutral">{phase.label}</Chip>
            {isQuiz ? (
              <Chip tone="gold">
                <Trophy className="size-3" aria-hidden />
                Obligatorio · Reto final
              </Chip>
            ) : isEvidence ? (
              <Chip tone="sky">Bitácora · Opcional</Chip>
            ) : (
              <Chip tone="mint">Complementaria · Opcional</Chip>
            )}
            {done ? (
              <Chip tone="mint">
                <CheckCircle2 className="size-3" aria-hidden />
                Completada
              </Chip>
            ) : null}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            {meta.label} · +{activity.xp} XP {isQuiz ? '· Obligatorio' : '· Opcional'}
          </span>
          <h3 className="mt-1 font-display text-base font-bold text-white sm:text-lg">
            {activity.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-300">
            {activity.instructions}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/8 pt-3">
        <span className="text-xs font-bold text-slate-400">
          {done ? '✨ Misión cumplida' : `+${activity.xp} XP`}
        </span>
        <LinkButton
          to={activityUrl(missionCode, activity)}
          variant={done ? 'secondary' : isQuiz ? 'gold' : 'primary'}
          size="sm"
        >
          {done ? 'Repasar' : isQuiz ? 'Presentar' : 'Iniciar'}
        </LinkButton>
      </div>
    </SpotlightCard>
  );
}
