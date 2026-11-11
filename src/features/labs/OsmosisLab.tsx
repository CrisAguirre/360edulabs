import { Droplets, FlaskConical, Ruler, ShieldAlert, Timer, Waves } from 'lucide-react';
import { useState } from 'react';
import { Card, Chip } from '../../components/ui';
import { cn } from '../../lib/utils';
import type { ActivityRuntimeProps } from './types';

const CUPS = [
  { id: 'pure', label: 'Agua pura', salinity: '0 %', factor: 0.2, color: '#38bdf8', result: 'Gana agua · se vuelve más firme' },
  { id: 'low', label: 'Poca sal', salinity: '5 %', factor: 0.05, color: '#fbbf24', result: 'Cambio leve · mantiene flexibilidad' },
  { id: 'high', label: 'Mucha sal', salinity: '15 %', factor: -0.16, color: '#fb7185', result: 'Pierde agua · se arruga y se pone blando' }
];

function lengthFor(base: number, factor: number, minutes: number) {
  const progress = minutes / 30;
  return (base + base * factor * progress).toFixed(1);
}

export function OsmosisLab({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const materials: string[] = Array.isArray(content.materials) ? content.materials : [];
  const steps: string[] = Array.isArray(content.steps) ? content.steps : [];
  const [minutes, setMinutes] = useState(0);
  const [notes, setNotes] = useState('');
  const [selectedCup, setSelectedCup] = useState('pure');
  const cup = CUPS.find((item) => item.id === selectedCup) ?? CUPS[0];

  const activeCup = CUPS.find((item) => item.id === selectedCup) ?? CUPS[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Chip tone="mint">
            <FlaskConical className="size-3.5" aria-hidden />
            Laboratorio optativo
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">{content.title ?? activity.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{content.intro}</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/3 px-3 py-2 text-xs font-bold text-slate-300">
          +{activity.xp} XP · no obligatorio
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <h4 className="font-bold text-white">Materiales</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {materials.map((material) => (
              <span key={material} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                {material}
              </span>
            ))}
          </div>
          <h4 className="mt-4 font-bold text-white">Procedimiento</h4>
          <ol className="mt-2 space-y-2">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-2 text-sm text-slate-300">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-[11px] font-extrabold text-emerald-300">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Waves className="size-5 text-sky-300" aria-hidden />
            <h4 className="font-bold text-white">Simulación de ósmosis</h4>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">
            Elige un vaso y mueve el tiempo para observar cómo cambia el bastón de papa. Es una simulación: no reemplaza
            el experimento real.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {CUPS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCup(item.id)}
                className={cn(
                  'min-h-20 rounded-2xl border p-2 text-center transition',
                  selectedCup === item.id
                    ? 'border-white/25 bg-white/8'
                    : 'border-white/8 bg-white/3 hover:bg-white/6'
                )}
                aria-pressed={selectedCup === item.id}
              >
                <span
                  className="mx-auto mb-1 block h-8 w-6 rounded-b-lg rounded-t-sm border-2 border-t-0"
                  style={{ background: `${item.color}44`, borderColor: item.color }}
                  aria-hidden
                />
                <span className="block text-[10px] font-extrabold text-white">{item.label}</span>
                <span className="block text-[9px] text-slate-400">{item.salinity}</span>
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="flex items-center justify-between text-xs font-extrabold text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Timer className="size-4 text-sky-300" aria-hidden />
                Tiempo transcurrido
              </span>
              <span className="text-sky-300">{minutes} min</span>
            </span>
            <input
              type="range"
              min={0}
              max={30}
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
              className="range-glow mt-2"
              aria-label="Minutos del experimento"
            />
          </label>

          <div className="mt-4 rounded-2xl border border-white/8 bg-ink-950/45 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-white">
                <Ruler className="size-4 text-mint-300" aria-hidden />
                {cup.label}
              </span>
              <span className="font-display text-2xl font-extrabold" style={{ color: cup.color }}>
                {lengthFor(6, cup.factor, minutes)} cm
              </span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(100, (Number(lengthFor(6, cup.factor, minutes)) / 8) * 100)}%`,
                  background: cup.color
                }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-400">
              {minutes === 0
                ? 'Longitud inicial: 6,0 cm. Inicia el tiempo para observar el cambio.'
                : `${activeCup.result} Explicación: el agua se mueve por ósmosis desde donde hay menor concentración de sales hacia donde hay mayor concentración.`}
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h4 className="font-bold text-white">Tabla de observaciones</h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-white/6 text-[10px] font-extrabold uppercase tracking-wider text-slate-300">
                <th className="px-3 py-2" scope="col">Vaso</th>
                <th className="px-3 py-2" scope="col">Salinidad</th>
                <th className="px-3 py-2" scope="col">Longitud inicial</th>
                <th className="px-3 py-2" scope="col">Longitud final ({minutes} min)</th>
                <th className="px-3 py-2" scope="col">Flexibilidad</th>
                <th className="px-3 py-2" scope="col">Explicación</th>
              </tr>
            </thead>
            <tbody>
              {CUPS.map((item) => {
                const finalLength = lengthFor(6, item.factor, minutes);
                const flexibility = item.id === 'high' ? 'Blanda, arrugada' : item.id === 'pure' ? 'Firme, turgente' : 'Flexible';
                return (
                  <tr key={item.id} className="border-t border-white/6">
                    <th className="px-3 py-2 font-extrabold text-white" scope="row">{item.label}</th>
                    <td className="px-3 py-2 text-slate-300">{item.salinity}</td>
                    <td className="px-3 py-2 text-slate-400">6,0 cm</td>
                    <td className="px-3 py-2 font-bold" style={{ color: item.color }}>{finalLength} cm</td>
                    <td className="px-3 py-2 text-slate-300">{minutes === 0 ? 'Sin cambios' : flexibility}</td>
                    <td className="px-3 py-2 text-slate-400">
                      {item.id === 'high'
                        ? 'Plasmólisis: pierde agua.'
                        : item.id === 'pure'
                          ? 'Turgencia: gana agua.'
                          : 'Equilibrio leve.'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Mis observaciones y conclusión
          </span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-white/12 bg-ink-950/55 p-3 text-sm text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none"
            placeholder={content.hypothesisPrompt ?? '¿Qué ocurrió y por qué?'}
          />
        </label>
        <p className="mt-2 text-[11px] text-slate-500">
          Tus notas se quedan en esta pantalla. Si quieres conservarlas para tu bitácora, cópialas en tu evidencia o
          cuaderno.
        </p>
      </Card>

      {content.safety ? (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-400/8 p-4">
          <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-300" aria-hidden />
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300">Seguridad</p>
            <p className="mt-1 text-sm leading-relaxed text-rose-100">{content.safety}</p>
          </div>
        </div>
      ) : null}

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Droplets className="size-4 text-sky-300" aria-hidden />
        <span>Recuerda: la papa no se debe comer después del experimento.</span>
      </div>
    </div>
  );
}
