import { CheckCircle2, ShieldCheck, Waves } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui';
import { AnimatedList, ClickSpark, Particles, ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';

export function CellWallAnimator() {
  const [pressure, setPressure] = useState(50);
  const [viewMode, setViewMode] = useState<'cellular' | 'microfibrils'>('cellular');

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Chip tone="mint">
            <ShieldCheck className="size-3.5" aria-hidden />
            Animación 2D · Arquitectura de la Pared Celular
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">
            La Armadura Vegetal: Pared Celular y Presión
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Explora la estructura de celulosa que da soporte a las plantas y evita que las células estallen.
          </p>
        </div>

        <ClickSpark sparkColor="#22c55e">
          <div className="flex rounded-2xl border border-white/10 bg-ink-950/60 p-1">
            <button
              type="button"
              onClick={() => setViewMode('cellular')}
              className={cn(
                'rounded-xl px-3 py-1.5 text-xs font-bold transition',
                viewMode === 'cellular' ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30' : 'text-slate-400 hover:text-white'
              )}
            >
              Vista celular y turgencia
            </button>
            <button
              type="button"
              onClick={() => setViewMode('microfibrils')}
              className={cn(
                'rounded-xl px-3 py-1.5 text-xs font-bold transition',
                viewMode === 'microfibrils' ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-400/30' : 'text-slate-400 hover:text-white'
              )}
            >
              Malla de celulosa molecular
            </button>
          </div>
        </ClickSpark>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Animated Diagram Canvas */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_50%_40%,rgba(15,23,42,0.95),rgba(3,7,18,0.98))] p-5">
          <Particles count={28} speed={0.2} color="#4ade80" connectDistance={70} className="absolute inset-0 pointer-events-none opacity-30" />

          {viewMode === 'cellular' ? (
            <div className="relative flex flex-col items-center justify-center">
              <svg viewBox="0 0 500 320" className="w-full max-w-md select-none drop-shadow-2xl">
                <defs>
                  <linearGradient id="wallGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                  <linearGradient id="pressureFluid" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* PARED CELULAR EXTERIOR */}
                <rect
                  x="40"
                  y="30"
                  width="420"
                  height="260"
                  rx="32"
                  fill="none"
                  stroke="url(#wallGradientGreen)"
                  strokeWidth="16"
                  className="transition-all"
                />

                {/* LÁMINA MEDIA Y PLASMODESMOS (CANALES DE COMUNICACIÓN) */}
                <g fill="#15803d">
                  <rect x="235" y="22" width="30" height="16" rx="3" />
                  <rect x="235" y="282" width="30" height="16" rx="3" />
                  <rect x="32" y="145" width="16" height="30" rx="3" />
                  <rect x="452" y="145" width="16" height="30" rx="3" />
                </g>
                <text x="250" y="18" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="800">
                  Plasmodesmo (canal de comunicación)
                </text>

                {/* MEMBRANA INTERNA PRESIONADA CONTRA LA PARED */}
                <rect
                  x={48 - (pressure / 100) * 4}
                  y={38 - (pressure / 100) * 4}
                  width={404 + (pressure / 100) * 8}
                  height={244 + (pressure / 100) * 8}
                  rx="26"
                  fill="url(#pressureFluid)"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  style={{ transition: 'all 0.3s ease-out' }}
                />

                {/* VECTORES DE PRESIÓN HIDROSTÁTICA */}
                <g stroke="#facc15" strokeWidth="2.5" strokeDasharray="4 4" opacity={pressure / 100}>
                  <line x1="250" y1="120" x2="250" y2="48" markerEnd="url(#arrow)" />
                  <line x1="250" y1="200" x2="250" y2="272" markerEnd="url(#arrow)" />
                  <line x1="160" y1="160" x2="60" y2="160" markerEnd="url(#arrow)" />
                  <line x1="340" y1="160" x2="440" y2="160" markerEnd="url(#arrow)" />
                </g>

                <text x="250" y="165" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
                  Presión de Turgencia: {pressure} %
                </text>
                <text x="250" y="185" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">
                  {pressure > 70
                    ? 'La pared celular resiste y mantiene la forma rígida.'
                    : 'Presión moderada en los tejidos vegetales.'}
                </text>
              </svg>

              {/* Slider de Presión de Agua */}
              <div className="mt-4 w-full max-w-sm rounded-2xl border border-white/8 bg-ink-950/70 p-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-mint-300">
                    <Waves className="size-4" />
                    Presión hidrostática interna
                  </span>
                  <span className="text-emerald-400 font-extrabold">{pressure} %</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="range-glow mt-2 w-full"
                  aria-label="Ajustar presión interna"
                />
              </div>
            </div>
          ) : (
            /* Vista molecular de microfibrillas */
            <div className="relative flex flex-col items-center justify-center py-6">
              <svg viewBox="0 0 460 260" className="w-full max-w-md select-none drop-shadow-2xl">
                {/* Rejilla de microfibrillas de celulosa */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="30"
                    y1={35 + i * 36}
                    x2="430"
                    y2={35 + i * 36}
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={45 + i * 36}
                    y1="25"
                    x2={45 + i * 36}
                    y2="235"
                    stroke="#16a34a"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                ))}
                {/* Enlaces de pectina y hemicelulosa */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <circle
                    key={`p-${i}`}
                    cx={60 + (i % 5) * 80 + (i % 2) * 15}
                    cy={45 + Math.floor(i / 5) * 70}
                    r="5"
                    fill="#fbbf24"
                    className="animate-pulse"
                  />
                ))}
              </svg>
              <div className="mt-3 flex items-center gap-4 text-[11px] font-bold">
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <span className="size-3 rounded-full bg-emerald-500" /> Microfibrillas de celulosa
                </span>
                <span className="inline-flex items-center gap-1.5 text-amber-300">
                  <span className="size-3 rounded-full bg-amber-400" /> Puentes de pectina
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Informative Side Panel */}
        <div className="space-y-3">
          <SpotlightCard
            spotlightColor="rgba(34, 197, 94, 0.2)"
            borderColor="rgba(34, 197, 94, 0.4)"
            className="p-5"
          >
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
              Estructura Exclusiva Vegetal
            </span>
            <h4 className="mt-1 font-display text-2xl font-extrabold text-white">
              <ShinyText text="¿Por qué la pared celular es vital?" speed={3} className="font-extrabold" />
            </h4>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Está formada principalmente por <strong>celulosa</strong>, el compuesto orgánico más abundante del planeta Tierra.
            </p>

            <AnimatedList className="mt-4 space-y-2.5 text-xs leading-relaxed" stagger={0.05}>
              <li className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/3 p-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-white">Resistencia a la lisis:</strong> Mientras que una célula animal se hincha y revienta si absorbe demasiada agua, la pared vegetal soporta hasta 20 atmósferas de presión.
                </span>
              </li>
              <li className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/3 p-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-white">Esqueleto sin huesos:</strong> Permite que los árboles y las plantas alcancen grandes alturas desafiando la gravedad sin necesitar un esqueleto óseo.
                </span>
              </li>
              <li className="flex items-start gap-2 rounded-xl border border-white/8 bg-white/3 p-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  <strong className="text-white">Comunicación por plasmodesmos:</strong> Posee poros microscópicos que conectan el citoplasma de células vecinas para compartir agua y nutrientes.
                </span>
              </li>
            </AnimatedList>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}

