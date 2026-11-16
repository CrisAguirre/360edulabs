import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { BlurText } from './BlurText';

export interface AccordionCarouselItem {
  id: string;
  year: string;
  scientist: string;
  title: string;
  subtitle?: string;
  tag?: string;
  tagTone?: 'mint' | 'gold' | 'rose' | 'sky' | 'purple' | 'cyan' | 'neutral';
  color: string; // e.g. '#38bdf8'
  glowColor?: string; // e.g. 'rgba(56, 189, 248, 0.35)'
  icon?: string;
  description: string;
  detailedText?: string[];
  keyContribution: string;
  quote?: string;
  graphic2D: React.ReactNode;
  metadata?: { label: string; value: string }[];
}

export interface AccordionCarouselProps {
  items: AccordionCarouselItem[];
  defaultActiveIndex?: number;
  className?: string;
  accentColor?: string;
  onItemChange?: (item: AccordionCarouselItem, index: number) => void;
}

export function AccordionCarousel({
  items,
  defaultActiveIndex = 0,
  className,
  accentColor = '#f59e0b',
  onItemChange
}: AccordionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [viewMode, setViewMode] = useState<'accordion' | 'grid'>('accordion');

  const total = items.length;

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    if (onItemChange && items[index]) {
      onItemChange(items[index], index);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (activeIndex - 1 + total) % total;
    handleSelect(nextIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIdx = (activeIndex + 1) % total;
    handleSelect(nextIdx);
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 p-3 sm:p-5 shadow-2xl transition-all duration-300',
        className
      )}
      style={{
        boxShadow: `0 20px 40px -15px ${accentColor}15`
      }}
    >
      {/* ── BARRA SUPERIOR: TÍTULO, SELECTOR RÁPIDO Y BOTÓN DE MODO ── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="grid size-8 place-items-center rounded-xl font-black text-xs shadow-inner"
            style={{
              backgroundColor: `${accentColor}25`,
              color: accentColor,
              border: `1px solid ${accentColor}40`
            }}
          >
            <Sparkles className="size-4" />
          </span>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Galería Acordeón Interactiva · React Bits
            </span>
            <h4 className="text-sm font-extrabold text-white sm:text-base">
              Hitos históricos de la teoría celular
            </h4>
          </div>
        </div>

        {/* Controles de vista y pasos */}
        <div className="flex items-center gap-2">
          {/* Selector de modo Acordeón vs Cuadrícula */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'accordion' ? 'grid' : 'accordion')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            title={viewMode === 'accordion' ? 'Ver todos en cuadrícula' : 'Ver en carrusel acordeón'}
          >
            {viewMode === 'accordion' ? (
              <>
                <LayoutGrid className="size-3.5" />
                <span className="hidden sm:inline">Ver cuadrícula</span>
              </>
            ) : (
              <>
                <Maximize2 className="size-3.5" />
                <span className="hidden sm:inline">Modo acordeón</span>
              </>
            )}
          </button>

          {/* Flechas de navegación rápida */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Hito histórico anterior"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="Hito histórico siguiente"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── SELECTOR DE PESTAÑAS RÁPIDAS (DESKTOP & MÓVIL) ── */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(idx)}
              className={cn(
                'group flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 font-bold transition-all duration-200 shrink-0 border',
                isActive
                  ? 'border-white/30 bg-white/15 text-white shadow-md'
                  : 'border-white/5 bg-white/3 text-slate-400 hover:border-white/15 hover:bg-white/8 hover:text-slate-200'
              )}
              style={
                isActive
                  ? {
                      borderColor: `${item.color}80`,
                      boxShadow: `0 0 12px ${item.color}25`
                    }
                  : {}
              }
            >
              <span
                className="grid size-5 place-items-center rounded-md text-[10px] font-black transition-colors"
                style={{
                  backgroundColor: isActive ? item.color : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#050a10' : '#cbd5e1'
                }}
              >
                {idx + 1}
              </span>
              <span className="truncate max-w-[120px] sm:max-w-none">{item.scientist}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({item.year})</span>
            </button>
          );
        })}
      </div>

      {/* ── MODO ACORDEÓN EXPANDIBLE (HORIZONTAL EN DESKTOP, VERTICAL EN MÓVIL) ── */}
      {viewMode === 'accordion' ? (
        <div className="flex flex-col md:flex-row gap-3 w-full md:min-h-[580px] lg:min-h-[620px]">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;

            return (
              <div
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={cn(
                  'group relative overflow-hidden rounded-2xl border transition-all duration-500 ease-out cursor-pointer',
                  isActive
                    ? 'md:flex-[4.5] lg:flex-[5] bg-ink-950/90 shadow-xl'
                    : 'md:flex-1 md:min-w-[68px] lg:min-w-[80px] md:max-w-[96px] bg-ink-900/60 hover:bg-ink-800/80 hover:border-white/25'
                )}
                style={{
                  borderColor: isActive ? `${item.color}90` : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isActive ? `0 0 24px -4px ${item.color}35` : 'none'
                }}
              >
                {/* ── VISTA INACTIVA (PANEL COLAPSADO VERTICAL EN DESKTOP) ── */}
                {!isActive ? (
                  <div className="flex md:flex-col items-center justify-between md:justify-between p-3.5 md:py-6 h-full w-full">
                    {/* Número y año */}
                    <div className="flex md:flex-col items-center gap-2">
                      <span
                        className="grid size-8 place-items-center rounded-xl text-xs font-black"
                        style={{
                          backgroundColor: `${item.color}20`,
                          color: item.color,
                          border: `1px solid ${item.color}40`
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-[11px] font-extrabold text-slate-400 md:rotate-180 md:[writing-mode:vertical-rl]">
                        {item.year}
                      </span>
                    </div>

                    {/* Nombre del científico en columna vertical */}
                    <div className="flex items-center gap-2 md:my-auto">
                      <span className="text-xs sm:text-sm font-extrabold tracking-wide text-slate-200 md:rotate-180 md:[writing-mode:vertical-rl] group-hover:text-white transition-colors">
                        {item.scientist}
                      </span>
                    </div>

                    {/* Indicador de expandir */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 group-hover:text-amber-300 transition-colors">
                      <span className="md:hidden">Tocar para expandir</span>
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ) : (
                  /* ── VISTA ACTIVA (PANEL EXPANDIDO CON GRÁFICO 2D ANIMADO Y NARRATIVA) ── */
                  <div className="flex flex-col h-full p-4 sm:p-6 space-y-4 animate-in fade-in duration-300">
                    {/* Cabecera del panel activo */}
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                            style={{
                              backgroundColor: `${item.color}25`,
                              color: item.color,
                              border: `1px solid ${item.color}50`
                            }}
                          >
                            Hito {idx + 1} de {total} · {item.year}
                          </span>
                          {item.tag && (
                            <span className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-lg sm:text-2xl font-black text-white">
                          <BlurText
                            text={`${item.scientist}: ${item.title}`}
                            className="inline-block"
                            delay={30}
                          />
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs font-semibold text-slate-300">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Botón de siguiente hito rápido */}
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-extrabold text-ink-950 transition hover:brightness-110 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      >
                        <span>Siguiente</span>
                        <ChevronRight className="size-3.5" />
                      </button>
                    </div>

                    {/* Cuerpo dividido: Gráfico 2D interactivo + Explicación pedagógica */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-start">
                      {/* Columna Izquierda: Contenedor del Gráfico 2D animado */}
                      <div className="lg:col-span-6 flex flex-col space-y-2">
                        <div
                          className="relative rounded-2xl overflow-hidden border bg-ink-950/80 p-2 sm:p-3 shadow-inner flex items-center justify-center min-h-[220px]"
                          style={{
                            borderColor: `${item.color}40`,
                            boxShadow: `inset 0 0 20px ${item.color}15`
                          }}
                        >
                          {/* Gráfico 2D animado */}
                          {item.graphic2D}

                          {/* Marca de agua de laboratorio */}
                          <div className="absolute top-2 right-2 rounded-md bg-ink-950/80 px-2 py-0.5 text-[9px] font-mono font-bold text-slate-400 border border-white/10">
                            2D SCIENTIFIC VECTOR
                          </div>
                        </div>

                        {/* Cita histórica o principio científico */}
                        {item.quote && (
                          <div
                            className="rounded-xl border p-2.5 text-xs font-medium leading-relaxed italic"
                            style={{
                              borderColor: `${item.color}35`,
                              backgroundColor: `${item.color}10`,
                              color: '#f8fafc'
                            }}
                          >
                            <span className="font-bold not-italic mr-1.5" style={{ color: item.color }}>
                              Cita histórica:
                            </span>
                            «{item.quote}»
                          </div>
                        )}
                      </div>

                      {/* Columna Derecha: Narrativa pedagógica y aportes clave */}
                      <div className="lg:col-span-6 flex flex-col justify-between space-y-3.5">
                        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-200">
                          <p className="font-medium">{item.description}</p>

                          {item.detailedText && item.detailedText.length > 0 && (
                            <div className="space-y-2 text-slate-300">
                              {item.detailedText.map((p, pIdx) => (
                                <p key={pIdx}>{p}</p>
                              ))}
                            </div>
                          )}

                          {/* Tarjeta de Aporte Clave */}
                          <div className="rounded-xl border border-white/10 bg-white/4 p-3 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                              <Sparkles className="size-3" />
                              Aporte a la Teoría Celular
                            </span>
                            <p className="text-xs font-semibold text-white">
                              {item.keyContribution}
                            </p>
                          </div>
                        </div>

                        {/* Metadatos en chips */}
                        {item.metadata && item.metadata.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
                            {item.metadata.map((meta, mIdx) => (
                              <div
                                key={mIdx}
                                className="rounded-lg bg-white/5 border border-white/5 p-2"
                              >
                                <span className="block text-[9px] font-bold uppercase text-slate-400">
                                  {meta.label}
                                </span>
                                <span className="font-bold text-white truncate block">
                                  {meta.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Barra de progreso inferior y controles numéricos */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1 font-bold text-slate-400 hover:text-white transition"
                      >
                        <ChevronLeft className="size-4" />
                        <span>Hito anterior</span>
                      </button>

                      {/* Indicadores de bolitas */}
                      <div className="flex items-center gap-1.5">
                        {items.map((it, dIdx) => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelect(dIdx);
                            }}
                            className={cn(
                              'h-2 rounded-full transition-all duration-300',
                              dIdx === activeIndex ? 'w-6' : 'w-2 bg-white/20 hover:bg-white/40'
                            )}
                            style={{
                              backgroundColor: dIdx === activeIndex ? item.color : undefined
                            }}
                            aria-label={`Ir al hito ${dIdx + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-1 font-bold text-slate-400 hover:text-white transition"
                      >
                        <span>Siguiente hito</span>
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ── MODO CUADRÍCULA (VISTA PARALELA DE TODOS LOS HITOS) ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                handleSelect(idx);
                setViewMode('accordion');
              }}
              className="group relative rounded-2xl border border-white/10 bg-ink-900/80 p-4 transition-all duration-300 hover:border-white/30 hover:bg-ink-800/90 cursor-pointer space-y-3"
              style={{
                boxShadow: `0 8px 24px -10px ${item.color}25`
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                    border: `1px solid ${item.color}40`
                  }}
                >
                  {item.year}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  #{idx + 1}
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10 bg-ink-950 p-2 min-h-[140px] flex items-center justify-center">
                {item.graphic2D}
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {item.scientist}
                </h4>
                <p className="text-xs text-slate-300 font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white">
                <span>Explorar en acordeón</span>
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
