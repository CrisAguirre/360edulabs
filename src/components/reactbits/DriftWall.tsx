import { useEffect, useId, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  Grid,
  Layers,
  Pause,
  Play,
  Star,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ClickSpark } from './ClickSpark';
import { ShinyText } from './ShinyText';

export interface DriftWallItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
  icon?: string | React.ReactNode;
  color?: string; // hex color for accent
  badge?: string;
  isSpecial?: boolean; // e.g. for the virus card
  details?: string[];
  keyTerm?: string;
}

export interface DriftWallProps {
  items: DriftWallItem[];
  speed?: number; // duration in seconds for one full loop (default: 32)
  tiltAngleX?: number; // 3D tilt X in deg, default 9
  tiltAngleY?: number; // 3D tilt Y in deg, default -11
  perspective?: number; // CSS perspective, default 1200
  pauseOnHover?: boolean; // default true
  onItemClick?: (item: DriftWallItem, index: number) => void;
  revealedIds?: Set<string>;
  title?: string;
  instruction?: string;
  className?: string;
  accentColor?: string;
}

export function DriftWall({
  items,
  speed = 34,
  tiltAngleX = 9,
  tiltAngleY = -11,
  perspective = 1200,
  pauseOnHover = true,
  onItemClick,
  revealedIds = new Set(),
  title = 'Muro interactivo de la Teoría Celular',
  instruction = 'Explora los postulados y la exclusión de virus en este muro dinámico 3D. Toca cualquier tarjeta para analizarla.',
  className,
  accentColor = '#58e6c5'
}: DriftWallProps) {
  const componentId = useId().replace(/:/g, '');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeItem, setActiveItem] = useState<DriftWallItem | null>(() => items[0] ?? null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Split or distribute items into two rows for authentic Drift Wall depth
  const row1Items = items.length <= 3 ? items : items.filter((_, i) => i % 2 === 0);
  const row2Items = items.length <= 3 ? items : items.filter((_, i) => i % 2 !== 0);

  // If a row has only 1 item, pad it with items to make the drift stream rich
  const safeRow1 = row1Items.length === 0 ? items : row1Items;
  const safeRow2 = row2Items.length === 0 ? items : row2Items;

  // Duplicate items 3 times for a seamless infinite loop
  const loopRow1 = [...safeRow1, ...safeRow1, ...safeRow1];
  const loopRow2 = [...safeRow2, ...safeRow2, ...safeRow2];

  const handleCardClick = (item: DriftWallItem, index: number) => {
    setActiveItem(item);
    onItemClick?.(item, index);
  };

  const isDriftPaused = isPaused || (pauseOnHover && isHovered);

  // Responsive tilt
  const activeTiltX = containerWidth < 640 ? Math.min(tiltAngleX, 5) : tiltAngleX;
  const activeTiltY = containerWidth < 640 ? Math.max(tiltAngleY, -6) : tiltAngleY;

  // Animation duration calculated from speed prop & multiplier
  const effectiveDurationRow1 = Math.max(12, speed / speedMultiplier);
  const effectiveDurationRow2 = Math.max(14, (speed * 1.15) / speedMultiplier);

  const keyframeAnimId = `drift-wall-keyframes-${componentId}`;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-mint-400/25 bg-gradient-to-b from-ink-950/90 via-slate-950/80 to-ink-950/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      {/* CSS Keyframes for smooth 60fps infinite drifting rows */}
      <style>{`
        @keyframes driftRowLeft-${keyframeAnimId} {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333333%); }
        }
        @keyframes driftRowRight-${keyframeAnimId} {
          0% { transform: translateX(-33.333333%); }
          100% { transform: translateX(0%); }
        }
        .anim-drift-left-${keyframeAnimId} {
          animation: driftRowLeft-${keyframeAnimId} ${effectiveDurationRow1}s linear infinite;
        }
        .anim-drift-right-${keyframeAnimId} {
          animation: driftRowRight-${keyframeAnimId} ${effectiveDurationRow2}s linear infinite;
        }
        .perspective-drift-stage {
          perspective: ${perspective}px;
          perspective-origin: 50% 45%;
        }
        .drift-wall-plane {
          transform-style: preserve-3d;
          transform: rotateX(${activeTiltX}deg) rotateY(${activeTiltY}deg) rotateZ(1deg);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .drift-card-lift {
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          transform-style: preserve-3d;
        }
        .drift-card-lift:hover {
          transform: translateZ(42px) scale(1.03) rotateX(-${activeTiltX * 0.75}deg) rotateY(-${activeTiltY * 0.75}deg);
          z-index: 40;
        }
      `}</style>

      {/* Decorative ambient gradients */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: accentColor }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full blur-3xl opacity-20 bg-amber-400"
        aria-hidden
      />

      {/* Top Header & Interactive Control Bar */}
      <div className="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-mint-400/20 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-400/30 bg-mint-400/10 px-3 py-1 text-xs font-bold text-mint-300">
              <Layers className="size-3.5 text-mint-400" />
              React Bits · Drift Wall
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              {revealedIds.size}/{items.length} explorados
            </span>
          </div>
          <h4 className="text-base font-extrabold text-white sm:text-lg">
            <ShinyText text={title} speed={4} className="font-extrabold text-white" />
          </h4>
          <p className="text-xs leading-relaxed text-slate-300 max-w-2xl">{instruction}</p>
        </div>

        {/* View Mode & Playback Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Pause / Play Toggle */}
          {viewMode === '3d' && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className={cn(
                'flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-sm',
                isPaused
                  ? 'border-amber-400/40 bg-amber-400/15 text-amber-200 hover:bg-amber-400/25'
                  : 'border-mint-400/30 bg-mint-400/10 text-mint-200 hover:bg-mint-400/20'
              )}
              title={isPaused ? 'Reanudar movimiento continuo' : 'Pausar movimiento continuo'}
            >
              {isPaused ? (
                <>
                  <Play className="size-3.5 fill-current" />
                  <span>Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="size-3.5 fill-current" />
                  <span>Pausar</span>
                </>
              )}
            </button>
          )}

          {/* Speed Multiplier (3D mode) */}
          {viewMode === '3d' && (
            <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 text-[11px] font-bold text-slate-300">
              <span className="px-1 text-slate-400 flex items-center gap-1">
                <Zap className="size-3 text-mint-400" />
              </span>
              {[
                { label: '0.6x', val: 0.6 },
                { label: '1x', val: 1 },
                { label: '1.5x', val: 1.5 }
              ].map((sp) => (
                <button
                  key={sp.label}
                  type="button"
                  onClick={() => setSpeedMultiplier(sp.val)}
                  className={cn(
                    'rounded-lg px-2 py-0.5 transition',
                    speedMultiplier === sp.val
                      ? 'bg-mint-400 text-ink-950 font-extrabold shadow'
                      : 'hover:bg-white/10 text-slate-300'
                  )}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          )}

          {/* Perspective 3D / Flat Grid Switch */}
          <div className="flex items-center rounded-xl border border-white/15 bg-white/5 p-1 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1 font-bold transition',
                viewMode === '3d'
                  ? 'bg-mint-400 text-ink-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              )}
              title="Vista 3D en perspectiva interactiva (Drift Wall)"
            >
              <Layers className="size-3.5" />
              <span>Muro 3D</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-3 py-1 font-bold transition',
                viewMode === 'grid'
                  ? 'bg-mint-400 text-ink-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              )}
              title="Vista en cuadrícula estática"
            >
              <Grid className="size-3.5" />
              <span>Cuadrícula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Drift Stage */}
      {viewMode === '3d' ? (
        <div
          className="perspective-drift-stage relative my-3 min-h-[380px] sm:min-h-[440px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-3 sm:p-5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle edge fading gradients for endless perspective feel */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 sm:w-20 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 sm:w-20 bg-gradient-to-l from-slate-950 via-slate-950/60 to-transparent" />

          {/* 3D Tilted Plane */}
          <div className="drift-wall-plane flex flex-col gap-5 py-4">
            {/* ROW 1: Drifting Left */}
            <div className="overflow-visible">
              <div
                className={cn(
                  `flex w-max items-center gap-4 sm:gap-6 anim-drift-left-${keyframeAnimId}`,
                  isDriftPaused && '[animation-play-state:paused]'
                )}
              >
                {loopRow1.map((item, idx) => (
                  <DriftCard
                    key={`row1-${item.id}-${idx}`}
                    item={item}
                    index={idx % safeRow1.length}
                    isRevealed={revealedIds.has(item.id)}
                    isSelected={activeItem?.id === item.id}
                    onClick={() => handleCardClick(item, idx % safeRow1.length)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 2: Drifting Right */}
            <div className="overflow-visible">
              <div
                className={cn(
                  `flex w-max items-center gap-4 sm:gap-6 anim-drift-right-${keyframeAnimId}`,
                  isDriftPaused && '[animation-play-state:paused]'
                )}
              >
                {loopRow2.map((item, idx) => (
                  <DriftCard
                    key={`row2-${item.id}-${idx}`}
                    item={item}
                    index={idx % safeRow2.length}
                    isRevealed={revealedIds.has(item.id)}
                    isSelected={activeItem?.id === item.id}
                    onClick={() => handleCardClick(item, idx % safeRow2.length)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Flat Grid View fallback */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-4">
          {items.map((item, idx) => (
            <DriftCard
              key={`grid-${item.id}`}
              item={item}
              index={idx}
              isRevealed={revealedIds.has(item.id)}
              isSelected={activeItem?.id === item.id}
              onClick={() => handleCardClick(item, idx)}
              isFlat
            />
          ))}
        </div>
      )}

      {/* Active Inspector / Detail Drawer */}
      {activeItem && (
        <div className="relative mt-5 rounded-2xl border border-mint-400/40 bg-gradient-to-r from-mint-950/40 via-slate-900/90 to-ink-950/90 p-4 sm:p-5 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-mint-400/20 pb-3">
            <div className="flex items-center gap-3">
              <span
                className="grid size-10 place-items-center rounded-xl text-xl shadow-md border"
                style={{
                  backgroundColor: `${activeItem.color ?? '#58e6c5'}20`,
                  borderColor: `${activeItem.color ?? '#58e6c5'}50`
                }}
              >
                {activeItem.icon ?? '🔬'}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${activeItem.color ?? '#58e6c5'}25`,
                      color: activeItem.color ?? '#58e6c5'
                    }}
                  >
                    {activeItem.tag ?? 'Postulado'}
                  </span>
                  {activeItem.isSpecial && (
                    <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-[11px] font-extrabold text-amber-300 border border-amber-400/40">
                      Exclusión Científica
                    </span>
                  )}
                  {revealedIds.has(activeItem.id) && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-mint-400">
                      <CheckCircle2 className="size-3.5" />
                      Explorado
                    </span>
                  )}
                </div>
                <h4 className="mt-0.5 text-base font-extrabold text-white sm:text-lg">
                  {activeItem.title}
                </h4>
              </div>
            </div>

            {activeItem.subtitle && (
              <span className="text-xs text-slate-400 font-medium italic sm:text-right">
                {activeItem.subtitle}
              </span>
            )}
          </div>

          <div className="mt-3.5 space-y-3">
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base">
              {activeItem.description}
            </p>

            {activeItem.details && activeItem.details.length > 0 && (
              <div className="grid gap-2 sm:grid-cols-2 pt-2 border-t border-white/10">
                {activeItem.details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-slate-300"
                  >
                    <Star className="size-3.5 text-mint-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Individual Drift Card Component ── */
interface DriftCardProps {
  item: DriftWallItem;
  index: number;
  isRevealed: boolean;
  isSelected: boolean;
  onClick: () => void;
  isFlat?: boolean;
}

function DriftCard({
  item,
  index,
  isRevealed,
  isSelected,
  onClick,
  isFlat = false
}: DriftCardProps) {
  const itemColor = item.color ?? (item.isSpecial ? '#f59e0b' : '#58e6c5');

  return (
    <ClickSpark sparkColor={itemColor} sparkCount={7}>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className={cn(
          'group relative cursor-pointer select-none rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-md transition-all duration-300',
          isFlat
            ? 'w-full shadow-lg hover:border-mint-400/50 hover:bg-white/10'
            : 'drift-card-lift w-[270px] sm:w-[320px] shrink-0 shadow-2xl',
          isSelected
            ? 'ring-2 ring-offset-2 ring-offset-ink-950'
            : '',
          item.isSpecial
            ? 'border-amber-400/40 bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-ink-950/90 hover:border-amber-400'
            : isRevealed
            ? 'border-mint-400/35 bg-gradient-to-br from-mint-950/30 via-slate-900/80 to-ink-950/90 hover:border-mint-400'
            : 'border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-ink-950/95 hover:border-mint-400/40'
        )}
        style={{
          boxShadow: isSelected
            ? `0 0 25px ${itemColor}30, 0 10px 30px rgba(0,0,0,0.6)`
            : '0 8px 24px rgba(0,0,0,0.5)',
          borderColor: isSelected ? itemColor : undefined
        }}
      >
        {/* Glow overlay */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full blur-2xl opacity-10 transition-opacity group-hover:opacity-30"
          style={{ backgroundColor: itemColor }}
          aria-hidden
        />

        {/* Header row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="grid size-8 place-items-center rounded-xl text-lg shadow border"
              style={{
                backgroundColor: `${itemColor}20`,
                borderColor: `${itemColor}50`
              }}
            >
              {item.icon ?? '🔬'}
            </span>
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
              style={{
                backgroundColor: `${itemColor}25`,
                color: itemColor
              }}
            >
              {item.tag ?? `Opción ${index + 1}`}
            </span>
          </div>

          {item.isSpecial ? (
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-400/30">
              ¡Importante!
            </span>
          ) : isRevealed ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-mint-400">
              <CheckCircle2 className="size-3.5" />
              <span>Listo</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 group-hover:text-mint-300">
              <Star className="size-3 text-mint-400/60" />
              <span>Explorar</span>
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h5 className="text-sm font-extrabold text-white sm:text-base line-clamp-1 group-hover:text-mint-200 transition-colors">
          {item.title}
        </h5>
        {item.subtitle && (
          <p className="text-[11px] font-semibold text-slate-400 line-clamp-1">
            {item.subtitle}
          </p>
        )}

        {/* Description preview */}
        <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-3">
          {item.description}
        </p>

        {/* Action prompt */}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-[11px] font-semibold">
          <span className="text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
            <Eye className="size-3 text-mint-400" />
            Toca para inspeccionar
          </span>
          <ChevronRight className="size-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-mint-300 transition-all" />
        </div>
      </div>
    </ClickSpark>
  );
}
