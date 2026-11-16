import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Grid, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CircularCarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  tagTone?: 'mint' | 'gold' | 'rose' | 'sky' | 'purple' | 'cyan' | 'neutral';
  description: string;
  color: string;
  icon: string;
  quiverColor?: { label: string; hex: string };
  graphic2D: React.ReactNode;
  details?: { label: string; value: string }[];
}

export interface CircularCarouselProps {
  items: CircularCarouselItem[];
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
  accentColor?: string;
  onItemSelect?: (item: CircularCarouselItem, index: number) => void;
}

export function CircularCarousel({
  items,
  radius: customRadius,
  cardWidth = 300,
  cardHeight = 440,
  className,
  accentColor = '#22c55e',
  onItemSelect
}: CircularCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const [viewLayout, setViewLayout] = useState<'circular' | 'grid'>('circular');
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = items.length;
  const angleStep = 360 / Math.max(total, 1);

  // Measure container for responsive radius
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

  // Compute responsive radius so cards stay fully visible inside the viewport
  const dynamicRadius =
    customRadius ??
    Math.round(
      Math.max(
        180,
        Math.min(
          total <= 5 ? 290 : 340,
          containerWidth < 480
            ? 180
            : containerWidth < 768
            ? 240
            : containerWidth < 1024
            ? 280
            : 320
        )
      )
    );

  // Update active index based on rotation
  const syncActiveIndex = useCallback(
    (rot: number) => {
      const normalized = ((-rot % 360) + 360) % 360;
      const index = Math.round(normalized / angleStep) % total;
      setActiveIndex(index);
      if (onItemSelect && items[index]) {
        onItemSelect(items[index], index);
      }
    },
    [angleStep, total, onItemSelect, items]
  );

  // Rotate to specific index
  const rotateToIndex = useCallback(
    (index: number) => {
      // Find shortest rotation
      const targetAngle = -index * angleStep;
      // Bring target angle closest to current rotation
      const currentMod = rotation % 360;
      let diff = (targetAngle - currentMod) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      const nextRot = rotation + diff;
      setRotation(nextRot);
      setActiveIndex(index);
      if (onItemSelect && items[index]) {
        onItemSelect(items[index], index);
      }
    },
    [angleStep, rotation, onItemSelect, items]
  );

  // Step next/prev
  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    rotateToIndex(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    rotateToIndex(prevIdx);
  };

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // Sensitivity: 0.35 deg per px
    const newRot = startRotation + deltaX * 0.35;
    setRotation(newRot);
    syncActiveIndex(newRot);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // Snap to nearest item
    const normalized = ((-rotation % 360) + 360) % 360;
    const snapIdx = Math.round(normalized / angleStep) % total;
    rotateToIndex(snapIdx);
  };

  return (
    <div ref={containerRef} className={cn('relative w-full select-none space-y-4', className)}>
      {/* Barra superior de controles del Circular Carousel */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
            {activeIndex + 1}/{total}
          </span>
          <span className="text-xs font-bold text-slate-300">
            Estructura activa: <strong className="text-white">{items[activeIndex]?.title}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Alternador de vista circular vs cuadrícula */}
          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setViewLayout('circular')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all',
                viewLayout === 'circular'
                  ? 'bg-white/20 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <RotateCcw className="size-3.5" />
              Circular 3D
            </button>
            <button
              type="button"
              onClick={() => setViewLayout('grid')}
              className={cn(
                'flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all',
                viewLayout === 'grid'
                  ? 'bg-white/20 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Grid className="size-3.5" />
              Cuadrícula
            </button>
          </div>

          {/* Flechas de navegación */}
          {viewLayout === 'circular' && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                className="grid size-8 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white"
                title="Estructura anterior"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="grid size-8 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white"
                title="Siguiente estructura"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── MODO 1: 3D CIRCULAR CAROUSEL RING ───────────────────────────────── */}
      {viewLayout === 'circular' ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-950/90 to-ink-900/90 py-8 px-4 shadow-2xl">
          {/* Halo luminoso de fondo en la estructura enfocada */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-30 transition-all duration-700"
            style={{ background: items[activeIndex]?.color ?? accentColor }}
          />

          {/* Escena 3D con perspectiva cilíndrica */}
          <div
            className="relative mx-auto flex items-center justify-center touch-pan-y"
            style={{
              height: cardHeight + 48,
              perspective: '1400px',
              perspectiveOrigin: '50% 50%'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Contenedor cilíndrico giratorio */}
            <div
              className="relative size-full cursor-grab active:cursor-grabbing"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateZ(-${dynamicRadius}px) rotateY(${rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {items.map((item, idx) => {
                const cardAngle = idx * angleStep;
                // Ángulo relativo respecto a la cámara (frente = 0°)
                const relativeAngle = ((cardAngle + rotation) % 360 + 540) % 360 - 180;
                const isCenter = Math.abs(relativeAngle) < angleStep / 2;
                const isBack = Math.abs(relativeAngle) > 90;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (!isDragging) rotateToIndex(idx);
                    }}
                    className={cn(
                      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-shadow duration-300',
                      isCenter ? 'z-30' : isBack ? 'z-10 opacity-30' : 'z-20 opacity-80'
                    )}
                    style={{
                      width: Math.min(cardWidth, containerWidth - 32),
                      height: cardHeight,
                      transform: `rotateY(${cardAngle}deg) translateZ(${dynamicRadius}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-full flex-col justify-between rounded-3xl border p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 overflow-hidden',
                        isCenter
                          ? 'border-white/35 bg-ink-900/90 shadow-2xl ring-2'
                          : 'border-white/10 bg-ink-950/75 hover:border-white/25 hover:opacity-100'
                      )}
                      style={{
                        borderColor: isCenter ? item.color : undefined,
                        boxShadow: isCenter ? `0 0 0 2px ${item.color}, 0 20px 45px -10px ${item.color}44` : 'none'
                      }}
                    >
                      {/* Cabecera de la tarjeta */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className="grid size-9 shrink-0 place-items-center rounded-xl text-lg font-bold"
                            style={{ background: `${item.color}25`, color: item.color }}
                          >
                            {item.icon}
                          </span>
                          {item.tag && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                              style={{
                                background: `${item.color}20`,
                                color: item.color,
                                border: `1px solid ${item.color}40`
                              }}
                            >
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="font-display text-base font-extrabold text-white leading-tight">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <p className="text-[11px] font-bold text-slate-400">{item.subtitle}</p>
                          )}
                        </div>
                      </div>

                      {/* Gráfico 2D interactivo / ilustrativo de la estructura */}
                      <div className="my-2 flex h-40 sm:h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-inner">
                        {item.graphic2D}
                      </div>

                      {/* Explicación científica y código Quiver o detalles */}
                      <div className="space-y-2 border-t border-white/8 pt-2">
                        <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-300">
                          {item.description}
                        </p>

                        {item.details && item.details.length > 0 && (
                          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                            {item.details.map((d, i) => (
                              <div
                                key={i}
                                className="rounded-xl border border-white/8 bg-white/4 px-2 py-1 text-[10px]"
                              >
                                <span className="block font-bold text-slate-400">{d.label}</span>
                                <span className="block font-semibold text-white truncate" title={d.value}>
                                  {d.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {item.quiverColor && (
                          <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-bold text-slate-300">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="size-2.5 rounded-full ring-1 ring-white/30"
                                style={{ background: item.quiverColor.hex }}
                              />
                              Color Quiver: {item.quiverColor.label}
                            </span>
                            <span className="text-slate-400">RA 3D</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selector interactivo de píldoras / miniaturas inferiores */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 pt-2">
            {items.map((item, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => rotateToIndex(idx)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all',
                    isSelected
                      ? 'scale-105 border text-white shadow-lg'
                      : 'border border-white/8 bg-white/5 text-slate-400 hover:border-white/20 hover:text-slate-200'
                  )}
                  style={{
                    borderColor: isSelected ? item.color : undefined,
                    background: isSelected ? `${item.color}25` : undefined
                  }}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── MODO 2: VISTA EN CUADRÍCULA EXPANDIDA ────────────────────────── */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveIndex(idx);
                if (onItemSelect) onItemSelect(item, idx);
              }}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-ink-950/70 p-5 shadow-xl transition-all hover:border-white/25 hover:bg-ink-900/80"
              style={{ borderLeft: `4px solid ${item.color}` }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="grid size-10 place-items-center rounded-2xl text-xl font-bold"
                    style={{ background: `${item.color}25`, color: item.color }}
                  >
                    {item.icon}
                  </span>
                  {item.tag && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}40`
                      }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-display text-base font-extrabold text-white">{item.title}</h4>
                  {item.subtitle && (
                    <p className="text-xs font-bold text-slate-400">{item.subtitle}</p>
                  )}
                </div>

                {/* Gráfico 2D en cada tarjeta de la cuadrícula */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-2.5">
                  {item.graphic2D}
                </div>

                <p className="text-xs leading-relaxed text-slate-300">{item.description}</p>
              </div>

              {item.quiverColor && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-full ring-1 ring-white/30"
                      style={{ background: item.quiverColor.hex }}
                    />
                    Color Quiver: {item.quiverColor.label}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">Ficha 3D</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tarjeta de resumen de la estructura activa */}
      {items[activeIndex] && (
        <div
          className="rounded-2xl border p-4 sm:p-5 backdrop-blur-xl shadow-lg transition-all duration-300"
          style={{
            borderColor: `${items[activeIndex].color}40`,
            background: `linear-gradient(135deg, ${items[activeIndex].color}12 0%, rgba(8,13,32,0.85) 100%)`
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{items[activeIndex].icon}</span>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Estructura seleccionada · {items[activeIndex].tag ?? 'Organelo Celular'}
                </span>
                <h4 className="font-display text-lg font-extrabold text-white">
                  {items[activeIndex].title}
                </h4>
              </div>
            </div>

            {items[activeIndex].quiverColor && (
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-extrabold text-white">
                <span
                  className="size-3 rounded-full shadow"
                  style={{ background: items[activeIndex].quiverColor.hex }}
                />
                <span>Pintar en Quiver: {items[activeIndex].quiverColor.label}</span>
              </div>
            )}
          </div>

          <p className="mt-3 text-xs leading-relaxed text-slate-200 sm:text-sm">
            {items[activeIndex].description}
          </p>
        </div>
      )}
    </div>
  );
}
