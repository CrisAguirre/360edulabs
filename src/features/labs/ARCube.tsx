import { Box, Camera, Check, MousePointer2, RotateCcw, ScanLine } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button, Chip, ProgressBar } from '../../components/ui';
import { cn } from '../../lib/utils';
import type { ActivityRuntimeProps } from './types';
import { ClickSpark, Particles, ShinyText, SpotlightCard } from '../../components/reactbits';

interface CubeFace {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
  fact: string;
}

const FACE_TRANSFORMS = [
  'rotateY(0deg) translateZ(120px)',
  'rotateY(90deg) translateZ(120px)',
  'rotateY(180deg) translateZ(120px)',
  'rotateY(-90deg) translateZ(120px)',
  'rotateX(90deg) translateZ(120px)',
  'rotateX(-90deg) translateZ(120px)'
];

const FACE_ROTATIONS = [
  { x: 0, y: 0 },
  { x: 0, y: -90 },
  { x: 0, y: -180 },
  { x: 0, y: 90 },
  { x: -90, y: 0 },
  { x: 90, y: 0 }
];

export function ARCube({ activity, onProgressChange }: ActivityRuntimeProps) {
  const content = activity.content as Record<string, any>;
  const faces: CubeFace[] = Array.isArray(content.faces) ? content.faces : [];
  const minFaces = activity.completionRule.type === 'faces_explored' ? activity.completionRule.min : 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(FACE_ROTATIONS[0]);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [arGuide, setArGuide] = useState(false);
  const active = faces[activeIndex];

  const exploredCount = explored.size;

  useEffect(() => {
    onProgressChange({ faces: exploredCount });
  }, [exploredCount, onProgressChange]);

  const selectFace = (index: number) => {
    setActiveIndex(index);
    setRotation(FACE_ROTATIONS[index]);
    const face = faces[index];
    if (face) {
      setExplored((current) => {
        const next = new Set(current);
        next.add(face.id);
        return next;
      });
    }
  };

  const rotateBy = (axis: 'x' | 'y', amount: number) => {
    setRotation((current) => ({ ...current, [axis]: current[axis] + amount }));
  };

  const gridHint = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => (index * 7 + index % 5) % 3 === 0).map((filled, index) => ({
        filled,
        index
      })),
    []
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Chip tone="gold">
          <ScanLine className="size-3.5" aria-hidden />
          Cubo Merge · experiencia virtual
        </Chip>
        <Button size="sm" variant="secondary" onClick={() => setArGuide((current) => !current)}>
          <Camera className="size-4" aria-hidden />
          {arGuide ? 'Ocultar guía AR' : '¿Cómo usar el cubo real?'}
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(251,191,36,0.13),rgba(5,8,23,0.9)_70%)] p-4">
          <Particles count={28} speed={0.18} color="#fbbf24" connectDistance={75} className="absolute inset-0 pointer-events-none opacity-40" />

          <div className="cube-scene relative grid place-items-center py-6" style={{ minHeight: '19rem' }}>
            <div
              className="cube"
              style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
              aria-hidden
            >
              {faces.map((face, index) => (
                <div
                  key={face.id}
                  className="cube-face"
                  style={{
                    transform: FACE_TRANSFORMS[index],
                    background: `linear-gradient(145deg, ${face.color}33, rgba(8,13,32,0.96) 65%)`,
                    borderColor: `${face.color}66`,
                    boxShadow: `inset 0 0 40px ${face.color}22, 0 0 30px ${face.color}22`
                  }}
                >
                  <span className="text-3xl" aria-hidden>{face.icon}</span>
                  <span className="text-sm font-extrabold text-white">{face.label}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: face.color }}>
                    Cara {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ClickSpark sparkColor="#fbbf24">
            <div className="relative flex flex-wrap items-center justify-center gap-1.5">
              <Button size="sm" variant="secondary" onClick={() => rotateBy('y', -90)} aria-label="Girar cubo a la izquierda">
                ←
              </Button>
              <Button size="sm" variant="secondary" onClick={() => rotateBy('x', -90)} aria-label="Girar cubo hacia arriba">
                ↑
              </Button>
              <Button size="sm" variant="secondary" onClick={() => rotateBy('x', 90)} aria-label="Girar cubo hacia abajo">
                ↓
              </Button>
              <Button size="sm" variant="secondary" onClick={() => rotateBy('y', 90)} aria-label="Girar cubo a la derecha">
                →
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setRotation(FACE_ROTATIONS[0]);
                  setActiveIndex(0);
                }}
                aria-label="Reiniciar cubo"
              >
                <RotateCcw className="size-4" aria-hidden />
                Reiniciar
              </Button>
            </div>
          </ClickSpark>
        </div>

        <div className="space-y-3">
          <SpotlightCard
            spotlightColor={`${active?.color ?? '#fbbf24'}22`}
            borderColor={`${active?.color ?? '#fbbf24'}45`}
            className="p-5"
          >
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
              Cara seleccionada · {activeIndex + 1} de {faces.length}
            </p>
            {active ? (
              <>
                <div className="mt-2 flex items-center gap-3">
                  <span
                    className="grid size-12 place-items-center rounded-2xl text-2xl"
                    style={{ background: `${active.color}1f`, color: active.color }}
                    aria-hidden
                  >
                    {active.icon}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white">
                    <ShinyText text={active.label} speed={4} className="font-extrabold text-white" />
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{active.description}</p>
                <p className="mt-3 rounded-xl border border-white/8 bg-white/3 p-3 text-xs leading-relaxed text-slate-400">
                  <strong className="text-slate-200">Dato curioso:</strong> {active.fact}
                </p>
              </>
            ) : null}
          </SpotlightCard>

          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
            <ProgressBar
              value={exploredCount}
              max={faces.length}
              color="#fbbf24"
              label={`Caras exploradas: ${exploredCount} de ${faces.length} (mínimo ${minFaces})`}
            />
            <ClickSpark sparkColor="#fbbf24">
              <div className="mt-3 grid grid-cols-2 gap-2">
                {faces.map((face, index) => (
                  <button
                    key={face.id}
                    type="button"
                    onClick={() => selectFace(index)}
                    className={cn(
                      'flex min-h-11 items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-[11px] font-bold transition',
                      index === activeIndex
                        ? 'border-amber-400/40 bg-amber-400/12 text-amber-100'
                        : 'border-white/8 bg-white/3 text-slate-300 hover:bg-white/7'
                    )}
                    aria-pressed={index === activeIndex}
                  >
                    {explored.has(face.id) ? (
                      <Check className="size-4 shrink-0 text-emerald-300" aria-label="Cara explorada" />
                    ) : (
                      <MousePointer2 className="size-4 shrink-0 text-slate-500" aria-hidden />
                    )}
                    <span className="truncate">{face.label}</span>
                  </button>
                ))}
              </div>
            </ClickSpark>
          </div>
        </div>
      </div>

      {arGuide ? (
        <SpotlightCard
          spotlightColor="rgba(251, 191, 36, 0.15)"
          borderColor="rgba(251, 191, 36, 0.35)"
          className="p-5"
        >
          <div className="flex items-start gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-amber-400/12 text-amber-300">
              <Box className="size-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Del cubo virtual al Cubo Merge real</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">
                En el aula puedes usar un Cubo Merge físico y la app de realidad aumentada. Si no tienes el cubo o la
                cámara no está disponible, este cubo virtual ofrece la misma información y no bloquea tu avance.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
                <div className="grid size-36 grid-cols-6 gap-1 rounded-2xl border border-white/12 bg-white/5 p-3" aria-hidden>
                  {gridHint.map((cell) => (
                    <span
                      key={cell.index}
                      className={cn('rounded-[2px]', cell.filled ? 'bg-amber-300/80' : 'bg-white/8')}
                    />
                  ))}
                </div>
                <ol className="space-y-2 text-sm text-slate-300">
                  <li>1. Abre la app de Cubo Merge o el lector AR de tu docente.</li>
                  <li>2. Apunta la cámara al cubo físico y espera a que aparezca el modelo.</li>
                  <li>3. Gira el cubo para recorrer las seis caras.</li>
                  <li>4. Si algo falla, continúa aquí con el cubo virtual y registra tus ideas.</li>
                </ol>
              </div>
            </div>
          </div>
        </SpotlightCard>
      ) : null}
    </div>
  );
}
