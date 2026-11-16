import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Grid, Pause, Play, RotateCcw, Sparkles, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ClickSpark } from './ClickSpark';

export interface OrbitItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  color?: string;
  tag?: string;
}

export interface OrbitCardsProps {
  items: OrbitItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  maxSelectable?: number;
  speed?: number; // duration in seconds
  title?: string;
  instruction?: string;
  className?: string;
  accentColor?: string;
  onApplySelected?: () => void;
  isReadOnly?: boolean;
}

export function OrbitCards({
  items,
  selectedIds,
  onToggle,
  maxSelectable = 2,
  speed = 42,
  title = 'Ideas clave para tu argumentación',
  instruction = 'Da clic en alguna de las tarjetas para seleccionarla e integrarla a tu respuesta',
  className,
  accentColor = '#f59e0b',
  onApplySelected,
  isReadOnly = false
}: OrbitCardsProps) {
  const [viewMode, setViewMode] = useState<'orbit' | 'grid'>('orbit');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(700);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const orbitAngleRef = useRef(0);
  const pausedRef = useRef(false);
  const selectedRef = useRef(selectedIds);

  useEffect(() => {
    selectedRef.current = selectedIds;
  }, [selectedIds]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    pausedRef.current = isPaused || isHovered;
  }, [isPaused, isHovered]);

  // Responsive orbit radius
  const radius =
    containerWidth < 460
      ? 140
      : containerWidth < 640
      ? 175
      : containerWidth < 860
      ? 205
      : 225;

  const stageHeight = radius * 2 + 150;
  const total = items.length;
  const angleStep = 360 / Math.max(total, 1);
  const selectedCount = selectedIds.size;

  /* ── Órbita calculada por JS: las tarjetas se trasladan alrededor del centro
     pero NUNCA se rotan, por lo que su texto siempre queda horizontal. ── */
  useEffect(() => {
    if (viewMode !== 'orbit') return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paint = () => {
      items.forEach((item, idx) => {
        const el = cardRefs.current[idx];
        if (!el) return;
        const a = ((idx * angleStep + orbitAngleRef.current) * Math.PI) / 180;
        const x = Math.sin(a) * radius;
        const y = -Math.cos(a) * radius;
        // depth: 0 = fondo (arriba), 1 = frente (abajo)
        const depth = (y + radius) / (2 * radius);
        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
        el.style.opacity = String((0.84 + 0.16 * depth).toFixed(3));
        el.style.zIndex = String(selectedRef.current.has(item.id) ? 40 : 10 + Math.round(depth * 10));
      });
    };

    paint();
    if (prefersReduced) return;

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const delta = Math.min(now - last, 80);
      last = now;
      if (!pausedRef.current) {
        orbitAngleRef.current =
          (orbitAngleRef.current + (360 / Math.max(speed, 1)) * (delta / 1000)) % 360;
      }
      paint();
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [viewMode, radius, angleStep, items, speed, selectedIds]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-ink-950/90 via-ink-900/80 to-ink-950/90 p-4 sm:p-6 shadow-2xl space-y-4 select-none',
        className
      )}
    >
      {/* ── Barra de cabecera con instrucciones y controles ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span
              className="flex size-7 items-center justify-center rounded-lg text-sm font-black"
              style={{ background: `${accentColor}25`, color: accentColor }}
            >
              🪐
            </span>
            <h4 className="font-display text-sm font-extrabold text-white sm:text-base">
              {title}
            </h4>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
              style={{
                background: `${accentColor}20`,
                color: accentColor,
                border: `1px solid ${accentColor}40`
              }}
            >
              {selectedCount}/{maxSelectable} seleccionadas
            </span>
          </div>
          <p className="text-xs text-amber-200/90 font-medium flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-300 shrink-0" aria-hidden />
            <strong>Instrucción:</strong> {instruction} (máximo {maxSelectable}).
          </p>
        </div>

        {/* Controles de vista y reproducción */}
        <div className="flex items-center gap-2">
          {onApplySelected && selectedCount > 0 && !isReadOnly ? (
            <button
              type="button"
              onClick={onApplySelected}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-mint-400 to-sky-400 px-3 py-1.5 text-xs font-black text-ink-950 shadow-md shadow-mint-400/20 transition hover:brightness-110 active:scale-95"
            >
              <CheckCircle2 className="size-3.5" />
              Insertar en mi texto
            </button>
          ) : null}

          {/* Toggle Órbita / Cuadrícula */}
          <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setViewMode('orbit')}
              className={cn(
                'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all',
                viewMode === 'orbit'
                  ? 'bg-amber-400 text-ink-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              )}
              title="Ver en órbita interactiva"
            >
              <RotateCcw className="size-3.5" />
              Órbita
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={cn(
                'inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all',
                viewMode === 'grid'
                  ? 'bg-amber-400 text-ink-950 font-black shadow-sm'
                  : 'text-slate-300 hover:text-white'
              )}
              title="Ver en cuadrícula estática"
            >
              <Grid className="size-3.5" />
              Cuadrícula
            </button>
          </div>

          {/* Pausar / Reanudar giro */}
          {viewMode === 'orbit' && (
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="inline-flex size-8 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white"
              title={isPaused ? 'Reanudar órbita' : 'Pausar órbita'}
              aria-label={isPaused ? 'Reanudar órbita' : 'Pausar órbita'}
            >
              {isPaused ? <Play className="size-3.5 text-mint-300" /> : <Pause className="size-3.5 text-slate-300" />}
            </button>
          )}
        </div>
      </div>

      {/* ── MODO 1: ANIMACIÓN DE ÓRBITA CIRCULAR (React Bits Orbit Images) ── */}
      {viewMode === 'orbit' ? (
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-white/8 bg-black/40 touch-pan-y"
          style={{ height: stageHeight }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Resplandor ambiental de fondo */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
            style={{ background: accentColor }}
          />

          {/* Anillos de órbita concéntricos */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
            style={{ width: radius * 2 - 60, height: radius * 2 - 60 }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-400/25"
            style={{ width: radius * 2, height: radius * 2 }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{ width: radius * 2 + 60, height: radius * 2 + 60 }}
          />

          {/* Núcleo central / Hub orbital */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center rounded-full border border-amber-400/30 bg-ink-950/90 p-3 sm:p-4 text-center shadow-2xl backdrop-blur-md size-28 sm:size-32">
            <span className="text-xl sm:text-2xl animate-pulse">💡</span>
            <span className="mt-1 text-[11px] font-black text-amber-300 uppercase tracking-wider leading-tight">
              Ideas Clave
            </span>
            <span className="text-[10px] text-slate-300 font-semibold mt-0.5">
              {selectedCount === 0
                ? 'Elige hasta 2'
                : selectedCount === 1
                ? '1 de 2 lista'
                : '¡2 elegidas!'}
            </span>
            <span className="text-[9px] text-slate-400">Pasa el cursor para pausar</span>
          </div>

          {/* Anillo orbital: las tarjetas se posicionan por JS y nunca se rotan */}
          <div className="absolute left-1/2 top-1/2 size-0 -translate-x-1/2 -translate-y-1/2">
            {items.map((item, idx) => {
              const isSelected = selectedIds.has(item.id);
              const cardColor = item.color ?? accentColor;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="absolute left-0 top-0 will-change-transform"
                  style={{ transform: 'translate(-50%, -50%)' }}
                >
                  <ClickSpark sparkColor={cardColor} sparkCount={6}>
                    <button
                      type="button"
                      disabled={isReadOnly}
                      onClick={() => onToggle(item.id)}
                      className={cn(
                        'group relative flex flex-col justify-between rounded-2xl border text-left p-2.5 sm:p-3 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-300 cursor-pointer shadow-lg active:scale-95',
                        containerWidth < 640 ? 'w-44 sm:w-52 min-h-24' : 'w-56 lg:w-60 min-h-28',
                        isSelected
                          ? 'border-amber-400 bg-ink-900/95 ring-2 ring-amber-400/80 shadow-amber-400/25'
                          : 'border-white/12 bg-ink-950/85 hover:border-white/35 hover:bg-ink-900/90'
                      )}
                      style={{
                        boxShadow: isSelected
                          ? `0 0 0 2px ${cardColor}, 0 12px 30px -8px ${cardColor}55`
                          : undefined
                      }}
                    >
                      {/* Cabecera de la tarjeta orbital */}
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className="grid size-6 shrink-0 place-items-center rounded-lg text-xs font-bold"
                            style={{ background: `${cardColor}25`, color: cardColor }}
                          >
                            {item.icon ?? '🔬'}
                          </span>
                          {item.tag && (
                            <span
                              className="truncate rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider"
                              style={{
                                background: `${cardColor}20`,
                                color: cardColor,
                                border: `1px solid ${cardColor}40`
                              }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>

                        {isSelected ? (
                          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-black text-ink-950 shadow-sm animate-in zoom-in-50 duration-200">
                            <Star className="size-2.5 fill-current" />
                            Elegida
                          </span>
                        ) : (
                          <span className="text-[9px] font-extrabold text-slate-400 opacity-60 group-hover:opacity-100 transition">
                            Clic para elegir
                          </span>
                        )}
                      </div>

                      {/* Título de la idea */}
                      <h5
                        className={cn(
                          'mt-1.5 font-display text-xs font-extrabold leading-tight line-clamp-2 transition-colors',
                          isSelected ? 'text-amber-200' : 'text-white group-hover:text-amber-100'
                        )}
                      >
                        {item.title}
                      </h5>

                      {/* Descripción condensada */}
                      <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-300">
                        {item.description}
                        </p>
                      </button>
                    </ClickSpark>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── MODO 2: CUADRÍCULA ESTÁTICA RESPONSIVA ── */
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const isSelected = selectedIds.has(item.id);
            const cardColor = item.color ?? accentColor;

            return (
              <ClickSpark key={item.id} sparkColor={cardColor} sparkCount={6}>
                <button
                  type="button"
                  disabled={isReadOnly}
                  onClick={() => onToggle(item.id)}
                  className={cn(
                    'w-full flex flex-col justify-between rounded-2xl border p-3.5 text-left transition-all duration-300 cursor-pointer',
                    isSelected
                      ? 'border-amber-400/60 bg-amber-400/15 text-amber-100 shadow-md shadow-amber-400/15 ring-2 ring-amber-400/40'
                      : 'border-white/10 bg-white/4 text-slate-300 hover:border-sky-400/40 hover:bg-white/8'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="grid size-7 shrink-0 place-items-center rounded-lg text-sm font-bold"
                        style={{ background: `${cardColor}25`, color: cardColor }}
                      >
                        {item.icon ?? '🔬'}
                      </span>
                      <span className="text-xs font-extrabold text-amber-300">{item.title}</span>
                    </div>

                    {isSelected ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                        <Star className="size-3 fill-current" aria-hidden /> Elegida
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Clic para elegir</span>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{item.description}</p>
                </button>
              </ClickSpark>
            );
          })}
        </div>
      )}
    </div>
  );
}
