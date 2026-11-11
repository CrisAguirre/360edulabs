import {
  Captions,
  Compass,
  Eye,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  ScanLine,
  VolumeX
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { cn } from '../../lib/utils';
import { Button, Chip } from '../../components/ui';
import type { ActivityRuntimeProps, HotspotView } from './types';
import { AnimatedList, ClickSpark, SpotlightCard } from '../../components/reactbits';

interface RawHotspot {
  id?: string;
  name?: string;
  structure?: string;
  label?: string;
  icon?: string;
  color?: string;
  fact?: string;
  analog?: string;
  description?: string;
}

function normalizeHotspots(activity: ActivityRuntimeProps['activity']): HotspotView[] {
  const content = activity.content as Record<string, unknown>;
  const lists = [content.organisms, content.structures, content.factoryMap] as RawHotspot[][];
  const raw = lists.find((list) => Array.isArray(list) && list.length > 0) ?? [];
  return raw.map((item, index) => ({
    id: item.id ?? `hotspot-${index}`,
    label: item.name ?? item.structure ?? item.label ?? `Punto ${index + 1}`,
    icon: item.icon ?? '✦',
    description: item.fact ?? item.analog ?? item.description ?? '',
    color: item.color
  }));
}

export function Video360Player({ activity, onProgressChange }: ActivityRuntimeProps) {
  const content = activity.content as Record<string, any>;
  const duration = Math.max(10, Number(content.durationSeconds ?? 30));
  const narration: string[] = Array.isArray(content.narration) ? content.narration : [];
  const hotspots = useMemo(() => normalizeHotspots(activity), [activity]);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotView | null>(null);
  const [view, setView] = useState({ x: 50, y: 50 });
  const dragRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);

  const progress = Math.min(100, Math.round((time / duration) * 100));
  const captionIndex = narration.length
    ? Math.min(narration.length - 1, Math.floor((time / duration) * narration.length))
    : -1;

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setTime((current) => {
        const next = current + 0.1 * rate;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
    }, 100);
    return () => window.clearInterval(interval);
  }, [playing, rate, duration]);

  useEffect(() => {
    onProgressChange({ progress });
  }, [progress, onProgressChange]);

  const reset = () => {
    setTime(0);
    setPlaying(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, originX: view.x, originY: view.y };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const deltaX = (event.clientX - dragRef.current.x) * 0.18;
    const deltaY = (event.clientY - dragRef.current.y) * 0.18;
    setView({
      x: 50 - deltaX,
      y: 50 - deltaY
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const hotspotPositions = [
    { left: '18%', top: '30%' },
    { left: '72%', top: '26%' },
    { left: '58%', top: '64%' },
    { left: '30%', top: '70%' },
    { left: '84%', top: '52%' },
    { left: '42%', top: '18%' },
    { left: '12%', top: '58%' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="sky">
          <ScanLine className="size-3.5" aria-hidden />
          Escena 360 simulada
        </Chip>
        <p className="text-xs text-slate-400">
          Arrastra la escena para mirar alrededor. No se necesita visor ni conexión externa.
        </p>
      </div>

      <div
        className="relative aspect-[16/9] min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-ink-900 select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        role="img"
        aria-label={`Escena 360: ${content.sceneTitle ?? activity.title}. ${content.place ?? ''}`}
      >
        <div
          className="panorama absolute -inset-16"
          style={{ backgroundPosition: `${view.x}% ${view.y}%` }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(3,7,18,0.72)_100%)]" aria-hidden />

        <div className="absolute left-4 top-4 z-10 max-w-[65%]">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-mint-300">
            {content.place ?? 'Escena inmersiva'}
          </p>
          <h3 className="mt-1 font-display text-lg font-extrabold text-white drop-shadow-lg sm:text-2xl">
            {content.sceneTitle ?? activity.title}
          </h3>
        </div>

        <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink-950/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-sky-200 backdrop-blur">
          <Compass className="size-3.5 animate-pulse-soft" aria-hidden />
          {view.x.toFixed(0)}° · {view.y.toFixed(0)}°
        </span>

        {hotspots.map((hotspot, index) => {
          const position = hotspotPositions[index % hotspotPositions.length];
          return (
            <button
              key={hotspot.id}
              type="button"
              onClick={() => setActiveHotspot(hotspot)}
              className="absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/60 text-lg shadow-xl transition hover:scale-110 focus-visible:scale-110"
              style={{
                left: position.left,
                top: position.top,
                background: `${hotspot.color ?? '#58e6c5'}d9`,
                boxShadow: `0 0 26px ${hotspot.color ?? '#58e6c5'}88`
              }}
              aria-label={`Abrir pista de ${hotspot.label}`}
            >
              <span aria-hidden>{hotspot.icon}</span>
            </button>
          );
        })}

        {activeHotspot ? (
          <SpotlightCard
            spotlightColor={`${activeHotspot.color ?? '#58e6c5'}35`}
            borderColor={`${activeHotspot.color ?? '#58e6c5'}60`}
            className="absolute inset-x-4 bottom-20 z-20 p-4 backdrop-blur-md sm:inset-x-auto sm:left-4 sm:max-w-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-mint-300">
                  {activeHotspot.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-200">{activeHotspot.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="rounded-full px-2 py-1 text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </SpotlightCard>
        ) : null}

        {captionIndex >= 0 ? (
          <div className="absolute inset-x-4 bottom-4 z-10 rounded-2xl border border-white/10 bg-ink-950/85 px-4 py-3 backdrop-blur-md sm:inset-x-8">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">
              Subtítulos · capítulo {captionIndex + 1} de {narration.length}
            </p>
            <p className="mt-0.5 text-sm font-semibold leading-snug text-white sm:text-base">
              {narration[captionIndex]}
            </p>
          </div>
        ) : null}
      </div>

      <ClickSpark sparkColor="#38bdf8">
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-white/3 p-3">
          <Button
            size="sm"
            variant={playing ? 'secondary' : 'primary'}
            onClick={() => setPlaying((current) => !current)}
            aria-label={playing ? 'Pausar recorrido' : 'Reproducir recorrido'}
          >
            {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
            {playing ? 'Pausar' : time >= duration ? 'Volver a ver' : 'Reproducir'}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setRate((current) => (current === 1 ? 2 : 1))}
            aria-label={`Velocidad ${rate}x. Cambiar velocidad`}
          >
            <Gauge className="size-4" aria-hidden />
            {rate}x
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} aria-label="Reiniciar recorrido">
            <RotateCcw className="size-4" aria-hidden />
            Reiniciar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowTranscript((current) => !current)}
            aria-expanded={showTranscript}
          >
            <Captions className="size-4" aria-hidden />
            Transcripción
          </Button>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <VolumeX className="size-3.5" aria-hidden />
            Sin audio en la demo
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-300">{progress}%</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">recorrido</span>
          </div>
        </div>
      </ClickSpark>

      <div className="flex items-center gap-3">
        <Eye className="size-4 shrink-0 text-sky-300" aria-hidden />
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={(event) => {
            const value = Number(event.target.value);
            setTime((value / 100) * duration);
            setPlaying(false);
          }}
          className="range-glow"
          aria-label="Avanzar por el recorrido"
        />
      </div>

      {showTranscript ? (
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.12)"
          borderColor="rgba(255, 255, 255, 0.1)"
          className="space-y-2 p-5"
        >
          <h4 className="text-sm font-extrabold text-white">Transcripción completa</h4>
          <p className="text-xs text-slate-400">{content.transcriptNote ?? 'Texto equivalente al recorrido.'}</p>
          <AnimatedList className="space-y-2" stagger={0.03}>
            {narration.map((line, index) => (
              <li
                key={line}
                className={cn(
                  'rounded-xl border px-3 py-2 text-sm leading-relaxed',
                  index === captionIndex
                    ? 'border-mint-400/30 bg-mint-400/8 text-mint-100'
                    : 'border-white/6 bg-white/2 text-slate-300'
                )}
              >
                <span className="mr-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {index + 1}
                </span>
                {line}
              </li>
            ))}
          </AnimatedList>
        </SpotlightCard>
      ) : null}

      {content.pauseQuestion ? (
        <SpotlightCard
          spotlightColor="rgba(251, 191, 36, 0.2)"
          borderColor="rgba(251, 191, 36, 0.4)"
          className="p-4"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">Pausa para pensar</p>
          <p className="mt-1 text-sm font-semibold leading-relaxed text-amber-100">{content.pauseQuestion}</p>
        </SpotlightCard>
      ) : null}
    </div>
  );
}
