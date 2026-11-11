import { Droplets, Pause, Play, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, Chip } from '../../components/ui';
import { ClickSpark, Particles, ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';

export type OsmoticState = 'turgid' | 'isotonic' | 'plasmolyzed';

interface StateDetails {
  id: OsmoticState;
  title: string;
  subtitle: string;
  environment: string;
  waterMovement: string;
  vacuoleScale: number;
  membraneInset: number;
  waterPercent: number;
  description: string;
  consequence: string;
  accent: string;
}

const STATES: Record<OsmoticState, StateDetails> = {
  turgid: {
    id: 'turgid',
    title: 'Turgencia (Célula firme)',
    subtitle: 'Medio hipotónico · Agua pura (0 % sal)',
    environment: 'Menor concentración de solutos afuera que adentro.',
    waterMovement: 'El agua entra masivamente a la vacuola central.',
    vacuoleScale: 1.0,
    membraneInset: 4,
    waterPercent: 95,
    description: 'La vacuola central se llena de agua y empuja la membrana plasmática con fuerza contra la pared celular rígida. La pared resiste la presión sin romperse.',
    consequence: 'Tallo y hojas firmes, erectas y turgentes. Máxima eficiencia en fotosíntesis y producción de ATP.',
    accent: '#38bdf8'
  },
  isotonic: {
    id: 'isotonic',
    title: 'Equilibrio (Célula flácida)',
    subtitle: 'Medio isotónico · Salinidad equilibrada (0.9 % sal)',
    environment: 'Igual concentración de agua y solutos adentro y afuera.',
    waterMovement: 'El agua entra y sale a la misma velocidad (flujo neto cero).',
    vacuoleScale: 0.72,
    membraneInset: 14,
    waterPercent: 65,
    description: 'La vacuola central mantiene un volumen intermedio. La membrana apenas roza la pared celular sin ejercer presión de turgencia activa.',
    consequence: 'Estado de equilibrio neutro. Si se mantiene, los tejidos vegetales pueden perder rigidez mecánica.',
    accent: '#fbbf24'
  },
  plasmolyzed: {
    id: 'plasmolyzed',
    title: 'Plasmólisis (Célula deshidratada)',
    subtitle: 'Medio hipertónico · Mucha sal (10 % - 15 % sal)',
    environment: 'Mayor concentración de sales afuera que adentro de la célula.',
    waterMovement: 'El agua escapa rápidamente de la vacuola hacia el exterior.',
    vacuoleScale: 0.38,
    membraneInset: 36,
    waterPercent: 25,
    description: 'La vacuola se encoge drásticamente. El citoplasma y la membrana plasmática se arrugan y se desprenden de la pared celular rígida, que permanece intacta como un marco.',
    consequence: 'Pérdida de turgencia: la planta se marchita de inmediato. La respiración celular y síntesis de ATP caen en picada.',
    accent: '#fb7185'
  }
};

export function PlasmolysisAnimator() {
  const [activeState, setActiveState] = useState<OsmoticState>('turgid');
  const [isPlaying, setIsPlaying] = useState(false);
  const info = STATES[activeState];

  // Auto-cycle through states
  useEffect(() => {
    if (!isPlaying) return;
    const order: OsmoticState[] = ['turgid', 'isotonic', 'plasmolyzed'];
    const interval = window.setInterval(() => {
      setActiveState((current) => {
        const nextIndex = (order.indexOf(current) + 1) % order.length;
        return order[nextIndex];
      });
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Chip tone="mint">
            <Droplets className="size-3.5" aria-hidden />
            Simulación 2D Interactiva de Plasmólisis
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">
            Plasmólisis y Turgencia Celular
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Descubre cómo el movimiento del agua por ósmosis transforma la estructura interna de la célula vegetal.
          </p>
        </div>

        <ClickSpark sparkColor={info.accent}>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isPlaying ? 'secondary' : 'primary'}
              onClick={() => setIsPlaying((current) => !current)}
            >
              {isPlaying ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
              {isPlaying ? 'Pausar secuencia' : 'Secuencia automática'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsPlaying(false);
                setActiveState('turgid');
              }}
              aria-label="Reiniciar a turgencia"
            >
              <RotateCcw className="size-4" aria-hidden />
              Reiniciar
            </Button>
          </div>
        </ClickSpark>
      </div>

      {/* State Switcher Pills */}
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-ink-950/60 p-1.5">
        {(Object.keys(STATES) as OsmoticState[]).map((stateKey) => {
          const state = STATES[stateKey];
          const isSelected = activeState === stateKey;
          return (
            <button
              key={stateKey}
              type="button"
              onClick={() => {
                setActiveState(stateKey);
                setIsPlaying(false);
              }}
              className={cn(
                'flex flex-col items-center justify-center rounded-xl p-2.5 text-center transition',
                isSelected
                  ? 'border border-white/20 bg-white/12 shadow-lg text-white'
                  : 'border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200'
              )}
              style={isSelected ? { boxShadow: `inset 0 0 20px ${state.accent}22` } : undefined}
            >
              <span className="text-xs font-extrabold" style={{ color: isSelected ? state.accent : undefined }}>
                {state.title.split(' ')[0]}
              </span>
              <span className="hidden text-[10px] text-slate-400 sm:inline mt-0.5">
                {state.subtitle.split('·')[1]?.trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Animated SVG Cell Graphic */}
        <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_50%_40%,rgba(15,23,42,0.95),rgba(3,7,18,0.98))] p-4">
          {/* React Bits: Canvas Particles for floating water molecules */}
          <Particles
            count={activeState === 'turgid' ? 36 : activeState === 'isotonic' ? 20 : 8}
            speed={activeState === 'turgid' ? 0.35 : 0.15}
            color={info.accent}
            connectDistance={65}
            className="absolute inset-0 pointer-events-none opacity-40"
          />

          <div className="relative flex flex-col items-center justify-center py-4">
            <svg
              viewBox="0 0 500 380"
              className="w-full max-w-md drop-shadow-2xl select-none"
              style={{ transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <defs>
                {/* Gradients */}
                <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>
                <linearGradient id="cytoplasmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.35" />
                </linearGradient>
                <radialGradient id="vacuoleGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="70%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </radialGradient>
                <radialGradient id="nucleusGradient" cx="40%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#7e22ce" />
                </radialGradient>
              </defs>

              {/* OUTSIDE MEDIUM WATER FLOW INDICATORS */}
              <g className="text-[11px] font-bold fill-slate-400">
                <text x="25" y="30" fill={info.accent}>
                  {activeState === 'turgid'
                    ? 'Agua entra (H2O →)'
                    : activeState === 'isotonic'
                    ? 'Flujo en equilibrio (↔)'
                    : 'Agua escapa (← H2O)'}
                </text>
              </g>

              {/* 1. PARED CELULAR (RIGID CELL WALL - NEVER DEFORMS) */}
              <rect
                x="40"
                y="45"
                width="420"
                height="300"
                rx="35"
                fill="none"
                stroke="url(#wallGradient)"
                strokeWidth="14"
                className="drop-shadow-lg"
              />
              <rect
                x="46"
                y="51"
                width="408"
                height="288"
                rx="30"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2"
                strokeDasharray="8 6"
                opacity="0.6"
              />

              {/* 2. ESPACIO PLASMOLIZADO (WHEN CELL SHRINKS, VISIBLE GAP BETWEEN WALL AND MEMBRANE) */}
              {activeState === 'plasmolyzed' ? (
                <rect
                  x="48"
                  y="53"
                  width="404"
                  height="284"
                  rx="28"
                  fill="#fb7185"
                  fillOpacity="0.08"
                />
              ) : null}

              {/* 3. MEMBRANA PLASMÁTICA + CITOPLASMA (SHRINKS IN PLASMOLYSIS) */}
              <rect
                x={40 + info.membraneInset}
                y={45 + info.membraneInset}
                width={420 - info.membraneInset * 2}
                height={300 - info.membraneInset * 2}
                rx={Math.max(12, 35 - info.membraneInset * 0.4)}
                fill="url(#cytoplasmGradient)"
                stroke={activeState === 'plasmolyzed' ? '#fb7185' : '#38bdf8'}
                strokeWidth={activeState === 'plasmolyzed' ? '3.5' : '3'}
                style={{
                  transition: 'all 0.8s cubic-bezier(0.34, 1.25, 0.64, 1)',
                  filter: activeState === 'plasmolyzed' ? 'drop-shadow(0 0 10px rgba(251,113,133,0.3))' : undefined
                }}
              />

              {/* 4. VACUOLA CENTRAL (SWELLS OR SHRINKS DRAMATICALLY) */}
              <ellipse
                cx="250"
                cy="195"
                rx={150 * info.vacuoleScale}
                ry={95 * info.vacuoleScale}
                fill="url(#vacuoleGradient)"
                opacity={activeState === 'plasmolyzed' ? 0.45 : 0.85}
                style={{
                  transition: 'all 0.8s cubic-bezier(0.34, 1.25, 0.64, 1)',
                  filter: `drop-shadow(0 0 16px ${info.accent}55)`
                }}
              />
              <text
                x="250"
                y="198"
                textAnchor="middle"
                fill="#ffffff"
                fontSize={activeState === 'plasmolyzed' ? '10' : '12'}
                fontWeight="800"
                letterSpacing="0.05em"
                style={{ transition: 'all 0.5s ease' }}
              >
                {activeState === 'plasmolyzed' ? 'Vacuola arrugada' : 'Vacuola central'}
              </text>

              {/* 5. NÚCLEO CELULAR */}
              <g
                style={{
                  transform: `translate(${activeState === 'plasmolyzed' ? '-15px' : '0px'}, ${
                    activeState === 'plasmolyzed' ? '10px' : '0px'
                  })`,
                  transition: 'all 0.7s ease'
                }}
              >
                <circle cx="120" cy="140" r="32" fill="url(#nucleusGradient)" />
                <circle cx="114" cy="134" r="10" fill="#f3e8ff" opacity="0.6" />
                <text x="120" y="184" textAnchor="middle" fill="#e9d5ff" fontSize="10" fontWeight="700">
                  Núcleo
                </text>
              </g>

              {/* 6. CLOROPLASTOS */}
              <g
                style={{
                  transform: `scale(${activeState === 'plasmolyzed' ? 0.9 : 1})`,
                  transformOrigin: '250px 195px',
                  transition: 'all 0.7s ease'
                }}
              >
                {/* Cloroplasto 1 */}
                <ellipse cx="370" cy="115" rx="20" ry="11" transform="rotate(-15 370 115)" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                {/* Cloroplasto 2 */}
                <ellipse cx="380" cy="270" rx="22" ry="12" transform="rotate(25 380 270)" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                {/* Cloroplasto 3 */}
                <ellipse cx="140" cy="265" rx="19" ry="10" transform="rotate(-30 140 265)" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
              </g>

              {/* 7. ETIQUETA DE PARED CELULAR */}
              <g>
                <line x1="250" y1="45" x2="250" y2="20" stroke="#4ade80" strokeWidth="2" />
                <circle cx="250" cy="45" r="4" fill="#4ade80" />
                <text x="250" y="14" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="800">
                  Pared celular rígida (no se deforma)
                </text>
              </g>

              {/* 8. ETIQUETA DE DESPRENDIMIENTO EN PLASMÓLISIS */}
              {activeState === 'plasmolyzed' ? (
                <g>
                  <line x1="395" y1="195" x2="445" y2="195" stroke="#fb7185" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="395" cy="195" r="3.5" fill="#fb7185" />
                  <text x="448" y="198" fill="#fda4af" fontSize="9" fontWeight="800">
                    Membrana desprendida
                  </text>
                </g>
              ) : null}
            </svg>

            {/* Stage Footer Metrics */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <Droplets className="size-3.5 text-sky-400" />
                Agua vacuolar: <strong style={{ color: info.accent }}>{info.waterPercent} %</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <Zap className="size-3.5 text-amber-400" />
                Síntesis de ATP:{' '}
                <strong className={activeState === 'turgid' ? 'text-emerald-400' : activeState === 'isotonic' ? 'text-amber-400' : 'text-rose-400'}>
                  {activeState === 'turgid' ? 'Alta (100 %)' : activeState === 'isotonic' ? 'Moderada (60 %)' : 'Detenida (10 %)'}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Scientific Explanation Panel */}
        <div className="space-y-3">
          <SpotlightCard
            spotlightColor={`${info.accent}25`}
            borderColor={`${info.accent}45`}
            className="p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Estado Celular Activo
              </span>
              <Chip tone={activeState === 'turgid' ? 'mint' : activeState === 'isotonic' ? 'gold' : 'rose'}>
                {activeState === 'turgid' ? 'Hipotónico' : activeState === 'isotonic' ? 'Isotónico' : 'Hipertónico'}
              </Chip>
            </div>

            <h4 className="mt-2 font-display text-2xl font-extrabold text-white">
              <ShinyText text={info.title} speed={3} className="font-extrabold" />
            </h4>
            <p className="mt-1 text-xs font-bold" style={{ color: info.accent }}>
              {info.subtitle}
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  ¿Qué ocurre con el agua?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-200">
                  {info.waterMovement}
                </p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Comportamiento anatómico
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-200">
                  {info.description}
                </p>
              </div>

              <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Impacto en la planta y energía
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-200">
                  {info.consequence}
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Quick Fact Card */}
          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/8 p-4 text-xs leading-relaxed text-sky-100">
            <span className="inline-flex items-center gap-1.5 font-extrabold text-sky-200">
              <Sparkles className="size-4" aria-hidden />
              Pregunta de Indagación de Cito
            </span>
            <p className="mt-1">
              ¿Por qué una célula animal explota en agua pura, mientras que la célula vegetal se vuelve más firme sin romperse?
              <br />
              <strong>Respuesta:</strong> ¡Gracias a la <strong>pared celular</strong> de celulosa que resiste la presión de turgencia!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

