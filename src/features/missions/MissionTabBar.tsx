import { cn } from '../../lib/utils';
import type { MissionTabDef, MissionTabViewMode } from './missionTabs';

const SESSION_ACCENTS: Record<string, { short: string; active: string }> = {
  m1: {
    short: 'bg-mint-400/20 text-mint-300',
    active: 'bg-mint-400 text-ink-950 shadow-md shadow-mint-400/25'
  },
  m2: {
    short: 'bg-sky-400/20 text-sky-300',
    active: 'bg-sky-400 text-ink-950 shadow-md shadow-sky-400/25'
  },
  m3: {
    short: 'bg-amber-400/20 text-amber-300',
    active: 'bg-amber-400 text-ink-950 shadow-md shadow-amber-400/25'
  }
};

const QUIZ_ACTIVE = 'bg-amber-400 text-ink-950 shadow-md shadow-amber-400/25';
const EXTRAS_ACTIVE = 'bg-violet-400 text-ink-950 shadow-md shadow-violet-400/25';

interface MissionTabBarProps {
  missionCode: string;
  session: number;
  tabs: MissionTabDef[];
  activeTab: string;
  viewMode: MissionTabViewMode;
  onSelect: (tab: string) => void;
  onViewModeChange: (mode: MissionTabViewMode) => void;
}

export function MissionTabBar({
  missionCode,
  session,
  tabs,
  activeTab,
  viewMode,
  onSelect,
  onViewModeChange
}: MissionTabBarProps) {
  if (tabs.length === 0) return null;
  const accent = SESSION_ACCENTS[missionCode] ?? SESSION_ACCENTS.m1;

  return (
    <nav
      aria-label={`Pestañas de la Sesión ${session}`}
      className="sticky top-20 z-30 rounded-2xl border border-white/10 bg-ink-950/95 p-2.5 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn('grid size-7 place-items-center rounded-lg text-xs font-extrabold', accent.short)}>
            S{session}
          </span>
          <span className="hidden text-xs font-extrabold uppercase tracking-wider text-slate-300 sm:inline">
            Pestañas de la sesión
          </span>
        </div>

        <div className="flex items-center gap-1 border-l border-white/10 pl-2" role="group" aria-label="Vista de las pestañas">
          <button
            type="button"
            onClick={() => onViewModeChange('tabs')}
            aria-pressed={viewMode === 'tabs'}
            className={cn(
              'rounded-lg px-2.5 py-1 text-[11px] font-bold transition',
              viewMode === 'tabs' ? 'bg-white/12 text-white' : 'text-slate-400 hover:bg-white/6 hover:text-white'
            )}
          >
            📑 Pestañas
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('all')}
            aria-pressed={viewMode === 'all'}
            className={cn(
              'rounded-lg px-2.5 py-1 text-[11px] font-bold transition',
              viewMode === 'all' ? 'bg-white/12 text-white' : 'text-slate-400 hover:bg-white/6 hover:text-white'
            )}
          >
            📜 Ver todo
          </button>
        </div>
      </div>

      <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin" role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(tab.key)}
              className={cn(
                'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all',
                isActive
                  ? cn(
                      'scale-[1.02]',
                      tab.tone === 'quiz' ? QUIZ_ACTIVE : tab.tone === 'extras' ? EXTRAS_ACTIVE : accent.active
                    )
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.shortLabel}</span>
              {tab.badge ? (
                <span
                  className={cn(
                    'rounded-md border px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider',
                    tab.tone === 'quiz'
                      ? 'border-rose-400/30 bg-rose-400/20 text-rose-300'
                      : 'border-emerald-400/30 bg-emerald-400/20 text-emerald-300'
                  )}
                >
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
