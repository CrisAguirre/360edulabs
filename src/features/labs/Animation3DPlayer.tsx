import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Button, Chip, LoadingBlock, ProgressBar } from '../../components/ui';
import { ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn, prefersReducedMotion } from '../../lib/utils';
import type { ActivityRuntimeProps, HotspotView } from './types';
import type { ViewerModel } from './Cell3DViewer';
import { MODEL_EMBEDS } from './embedCatalog';
import { SketchfabViewer } from './SketchfabViewer';
import { PlasmolysisAnimator } from './PlasmolysisAnimator';

const Cell3DViewer = lazy(() => import('./Cell3DViewer'));

export function Animation3DPlayer({ activity, mission }: ActivityRuntimeProps) {
  const content = activity.content as Record<string, any>;
  const steps: Array<{ title: string; description: string; highlight?: string }> = Array.isArray(content.steps)
    ? content.steps
    : [];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  // View mode:
  // For M3, default to 'plasmolysis-2d' (user explicitly requested pure HTML/CSS/ReactBits 2D animation for plasmolysis)
  // For M1/M2, default to 'sketchfab' with toggle to 'steps'
  const isM3 = mission.code === 'm3';
  const isM1 = mission.code === 'm1';
  const defaultView = isM3 ? 'plasmolysis-2d' : 'sketchfab';
  const [viewMode, setViewMode] = useState<'sketchfab' | 'steps' | 'plasmolysis-2d'>(defaultView);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => {
        if (current >= steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  const model: ViewerModel =
    mission.code === 'm3' ? 'energy-cell' : mission.code === 'm2' ? 'cell-plant' : 'cell-plant';

  const hotspots: HotspotView[] = useMemo(
    () =>
      steps
        .filter((step) => Boolean(step.highlight))
        .map((step) => ({
          id: String(step.highlight),
          label: step.title,
          description: step.description
        })),
    [steps]
  );

  const active = steps[index];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Chip tone="grape">
            <Sparkles className="size-3.5" aria-hidden />
            {isM3
              ? 'Animación 2D y 3D · Plasmólisis'
              : isM1
                ? 'Animación 3D · Zoom Celular'
                : 'Animación 3D · Comparación Celular'}
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">
            <ShinyText text={content.title ?? activity.title} speed={4} />
          </h3>
          <p className="mt-1 text-sm text-slate-400">{content.intro}</p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {isM3 ? (
            <div className="flex rounded-2xl border border-white/10 bg-ink-950/60 p-1">
              <button
                type="button"
                onClick={() => setViewMode('plasmolysis-2d')}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                  viewMode === 'plasmolysis-2d'
                    ? 'bg-gradient-to-r from-mint-500/25 to-sky-500/25 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                Animación interactiva 2D
              </button>
              <button
                type="button"
                onClick={() => setViewMode('steps')}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                  viewMode === 'steps'
                    ? 'bg-gradient-to-r from-mint-500/25 to-sky-500/25 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                Recorrido guiado 3D
              </button>
            </div>
          ) : (
            <div className="flex rounded-2xl border border-white/10 bg-ink-950/60 p-1">
              <button
                type="button"
                onClick={() => setViewMode('sketchfab')}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                  viewMode === 'sketchfab'
                    ? 'bg-gradient-to-r from-violet-500/25 to-mint-500/25 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                Visor Sketchfab Inmersivo
              </button>
              <button
                type="button"
                onClick={() => setViewMode('steps')}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                  viewMode === 'steps'
                    ? 'bg-gradient-to-r from-violet-500/25 to-mint-500/25 text-white border border-white/20'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                Recorrido guiado paso a paso
              </button>
            </div>
          )}

          {viewMode === 'steps' ? (
            <Button size="sm" variant={playing ? 'secondary' : 'primary'} onClick={() => setPlaying((current) => !current)}>
              {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              {playing ? 'Pausar secuencia' : 'Reproducir secuencia'}
            </Button>
          ) : null}
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'plasmolysis-2d' ? (
        <PlasmolysisAnimator />
      ) : viewMode === 'sketchfab' ? (
        <div className="space-y-4">
          <SketchfabViewer
            embed={isM1 ? MODEL_EMBEDS['m1_zoom_celula'] : MODEL_EMBEDS['m2_comparacion_celular']}
            onSwitchToLocal={() => setViewMode('steps')}
            hasLocalModel
          />
          {content.closing ? (
            <div className="rounded-2xl border border-violet-400/20 bg-violet-400/8 p-4 text-sm font-semibold leading-relaxed text-violet-100">
              {content.closing}
            </div>
          ) : null}
        </div>
      ) : (
        /* Steps view (Guided 3D Tour) */
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-ink-900/40 p-2">
            <Suspense fallback={<LoadingBlock message="Preparando la animación 3D…" />}>
              <Cell3DViewer
                model={model}
                hotspots={hotspots}
                activeHotspot={active?.highlight ?? null}
                label={`Paso ${index + 1}: ${active?.title ?? ''}`}
                water={mission.code === 'm3' ? 70 : 65}
                light={70}
                nutrients={65}
              />
            </Suspense>
          </div>

          <div className="space-y-3">
            <SpotlightCard spotlightColor="rgba(167, 139, 250, 0.18)">
              <div className="p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">
                  Paso {index + 1} de {steps.length}
                </p>
                <h4 className="mt-1 font-display text-2xl font-extrabold text-white">{active?.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{active?.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIndex((current) => Math.max(0, current - 1))}
                    disabled={index === 0}
                    aria-label="Paso anterior"
                  >
                    <ChevronLeft className="size-4" aria-hidden />
                    Anterior
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIndex((current) => Math.min(steps.length - 1, current + 1))}
                    disabled={index >= steps.length - 1}
                    aria-label="Paso siguiente"
                  >
                    Siguiente
                    <ChevronRight className="size-4" aria-hidden />
                  </Button>
                </div>
                <div className="mt-4">
                  <ProgressBar value={index + 1} max={steps.length} color="#a78bfa" label="Recorrido de la animación" />
                </div>
              </div>
            </SpotlightCard>

            <ol className="space-y-1.5">
              {steps.map((step, stepIndex) => (
                <li key={`${step.title}-${stepIndex}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setIndex(stepIndex);
                      setPlaying(false);
                    }}
                    className={cn(
                      'flex w-full min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-bold transition',
                      stepIndex === index
                        ? 'border-violet-400/35 bg-violet-400/12 text-violet-100 font-extrabold'
                        : 'border-white/8 bg-white/3 text-slate-400 hover:bg-white/7'
                    )}
                    aria-current={stepIndex === index ? 'step' : undefined}
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/8 text-[10px] font-extrabold">
                      {stepIndex + 1}
                    </span>
                    <span>{step.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {viewMode === 'steps' && content.closing ? (
        <div className="rounded-2xl border border-violet-400/20 bg-violet-400/8 p-4 text-sm font-semibold leading-relaxed text-violet-100">
          {content.closing}
        </div>
      ) : null}

      {prefersReducedMotion() ? (
        <p className="text-xs text-slate-500">
          Tienes activado “movimiento reducido”: la secuencia no avanza automáticamente, pero puedes recorrerla con los botones.
        </p>
      ) : null}
    </div>
  );
}
