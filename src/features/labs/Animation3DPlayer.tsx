import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Button, Card, Chip, LoadingBlock, ProgressBar } from '../../components/ui';
import { cn, prefersReducedMotion } from '../../lib/utils';
import type { ActivityRuntimeProps, HotspotView } from './types';
import type { ViewerModel } from './Cell3DViewer';

const Cell3DViewer = lazy(() => import('./Cell3DViewer'));

export function Animation3DPlayer({ activity, mission }: ActivityRuntimeProps) {
  const content = activity.content as Record<string, any>;
  const steps: Array<{ title: string; description: string; highlight?: string }> = Array.isArray(content.steps)
    ? content.steps
    : [];
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

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
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Chip tone="grape">
            <Sparkles className="size-3.5" aria-hidden />
            Animación 3D guiada
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">{content.title ?? activity.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{content.intro}</p>
        </div>
        <Button size="sm" variant={playing ? 'secondary' : 'primary'} onClick={() => setPlaying((current) => !current)}>
          {playing ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          {playing ? 'Pausar secuencia' : 'Reproducir secuencia'}
        </Button>
      </div>

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
          <Card className="p-4">
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
          </Card>

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
                      ? 'border-violet-400/35 bg-violet-400/12 text-violet-100'
                      : 'border-white/8 bg-white/3 text-slate-400 hover:bg-white/7'
                  )}
                  aria-current={stepIndex === index ? 'step' : undefined}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/8 text-[10px] font-extrabold">
                    {stepIndex + 1}
                  </span>
                  {step.title}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {content.closing ? (
        <div className="rounded-2xl border border-violet-400/20 bg-violet-400/8 p-4 text-sm font-semibold leading-relaxed text-violet-100">
          {content.closing}
        </div>
      ) : null}
      {prefersReducedMotion() ? (
        <p className="text-xs text-slate-500">
          Tienes activado “movimiento reducido”: la secuencia no avanza automáticamente, pero puedes recorrerla con los
          botones.
        </p>
      ) : null}
    </div>
  );
}
