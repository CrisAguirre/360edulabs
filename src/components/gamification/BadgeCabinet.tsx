import { LockKeyhole } from 'lucide-react';
import type { AwardedBadge } from '../../lib/types';
import { BADGE_CATALOG } from '../../lib/badges';
import { cn, formatDate } from '../../lib/utils';
import { Chip } from '../ui';
import { AnimatedList, SpotlightCard } from '../reactbits';

export function BadgeCabinet({
  earned,
  compact = false
}: {
  earned: AwardedBadge[];
  compact?: boolean;
}) {
  const badgeCode = (item: AwardedBadge) => item.badgeId?.code ?? item.code ?? '';
  const earnedCodes = new Set(earned.map((item) => badgeCode(item)));
  const items = BADGE_CATALOG.map((badge) => {
    const awarded = earned.find((item) => badgeCode(item) === badge.code);
    return { badge, awarded };
  });

  return (
    <AnimatedList
      className={cn('grid gap-3', compact ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-3')}
      stagger={0.04}
    >
      {items.map(({ badge, awarded }) => (
        <SpotlightCard
          key={badge.code}
          spotlightColor={awarded ? `${badge.accent}30` : 'rgba(255,255,255,0.08)'}
          borderColor={awarded ? `${badge.accent}50` : 'rgba(255,255,255,0.1)'}
          className={cn(
            'relative overflow-hidden p-4 transition',
            awarded
              ? 'bg-ink-900/70 hover:-translate-y-0.5'
              : 'border-dashed bg-white/2 opacity-70'
          )}
        >
          {awarded ? (
            <div
              className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full blur-2xl"
              style={{ background: `${badge.accent}30` }}
              aria-hidden
            />
          ) : null}
          <div className="relative flex items-start justify-between gap-2">
            <span className={cn('grid size-12 place-items-center rounded-2xl text-2xl', !awarded && 'grayscale')} style={{ background: `${badge.accent}18` }}>
              {awarded ? badge.icon : <LockKeyhole className="size-5 text-slate-500" aria-hidden />}
            </span>
            {awarded ? <Chip tone="mint">Ganada</Chip> : <Chip>Bloqueada</Chip>}
          </div>
          <h3 className="relative mt-3 text-sm font-extrabold leading-tight text-white">{badge.name}</h3>
          <p className="relative mt-1 text-xs leading-relaxed text-slate-400">{badge.description}</p>
          <p className="relative mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {awarded ? `Obtenida el ${formatDate(awarded.awardedAt)}` : `+${badge.xpBonus} XP`}
          </p>
        </SpotlightCard>
      ))}
      {earnedCodes.size === 0 ? (
        <p className="sr-only">Todavía no has ganado insignias. Completa una misión para obtener la primera.</p>
      ) : null}
    </AnimatedList>
  );
}
