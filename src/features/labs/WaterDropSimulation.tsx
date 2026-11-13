import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Dna, Sprout } from 'lucide-react';

interface WaterDropSimulationProps {
  playing: boolean;
  time: number;
  duration?: number;
  view: { x: number; y: number };
  activeFocus: 'all' | 'growth' | 'reproduction';
  onFocusChange: (focus: 'all' | 'growth' | 'reproduction') => void;
  onSelectHotspot?: (id: string) => void;
}

export function WaterDropSimulation({
  playing,
  time,
  view,
  activeFocus,
  onFocusChange,
  onSelectHotspot
}: WaterDropSimulationProps) {
  // Cycle progress 0..1 for continuous biological cycle (6 seconds per complete cycle)
  const [internalTime, setInternalTime] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      setInternalTime((t) => (t + 0.05) % 12);
    }, 50);
    return () => window.clearInterval(interval);
  }, [playing]);

  // Use the larger of internalTime or activity time to keep animation alive
  const cycleTime = (internalTime + (time % 12)) % 12; // 12-second biological cycle

  // Parallax offsets based on view (50 is center)
  const offsetX = (view.x - 50) * 1.2;
  const offsetY = (view.y - 50) * 0.8;

  // Growth cycle calculations (0 -> 12s)
  // Scale grows from 0.72 up to 1.35, then resets smoothly
  const growthPhase = (cycleTime % 6) / 6; // 6 second loop for growth
  const growthScale = 0.75 + Math.sin(growthPhase * Math.PI) * 0.55;
  const growthMassPct = Math.round(50 + Math.sin(growthPhase * Math.PI) * 100);

  // Reproduction cycle (12 second loop)
  // Phase 1 (0-3s): Mature mother cell
  // Phase 2 (3-6s): Elongation & genetic duplication
  // Phase 3 (6-9s): Central constriction / cleavage furrow
  // Phase 4 (9-12s): Complete separation into 2 daughter cells
  const repPhase = Math.floor(cycleTime / 3); // 0, 1, 2, 3
  const repSubProgress = (cycleTime % 3) / 3;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── Parallax Container for Organisms ────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: `translate3d(${-offsetX}px, ${-offsetY}px, 0)`
        }}
      >
        {/* Floating Ambient Nutrients (Golden & Blue particles) */}
        <svg className="absolute inset-0 size-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="nutrientGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="nutrientGlowGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Floating nutrient particles moving toward growing cell */}
          {[
            { cx: '24%', cy: '36%', r: 3, fill: 'url(#nutrientGlowGold)' },
            { cx: '29%', cy: '48%', r: 4, fill: 'url(#nutrientGlowGold)' },
            { cx: '18%', cy: '55%', r: 2.5, fill: 'url(#nutrientGlow)' },
            { cx: '35%', cy: '30%', r: 3.5, fill: 'url(#nutrientGlow)' },
            { cx: '22%', cy: '42%', r: 2, fill: 'url(#nutrientGlowGold)' },
            { cx: '68%', cy: '62%', r: 3, fill: 'url(#nutrientGlowGold)' },
            { cx: '75%', cy: '38%', r: 4, fill: 'url(#nutrientGlow)' },
            { cx: '82%', cy: '50%', r: 3, fill: 'url(#nutrientGlowGold)' }
          ].map((dot, i) => (
            <circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              fill={dot.fill}
              className="animate-pulse"
              style={{
                animationDuration: `${1.5 + (i % 3) * 0.7}s`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </svg>

        {/* ═══════════════════════════════════════════════════════════════════
            ORGANISM 1: SIGNO DE CRECIMIENTO CELULAR (Izquierda)
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={cn(
            'pointer-events-auto absolute left-[22%] top-[40%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500',
            activeFocus === 'growth' ? 'scale-125 z-30' : 'hover:scale-105 z-20'
          )}
          onClick={() => {
            onFocusChange('growth');
            onSelectHotspot?.('crecimiento-celular');
          }}
          title="Toca para ver el Crecimiento Celular en detalle"
        >
          {/* Label indicator */}
          <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-400/40 bg-ink-950/85 px-2.5 py-1 text-[11px] font-extrabold text-emerald-300 shadow-lg backdrop-blur">
            <Sprout className="size-3.5 animate-bounce text-emerald-400" />
            <span>Crecimiento: {growthMassPct}% masa</span>
          </div>

          <svg
            width="170"
            height="170"
            viewBox="0 0 170 170"
            className="overflow-visible"
            style={{
              transform: `scale(${growthScale})`,
              transition: 'transform 0.15s ease-out'
            }}
          >
            <defs>
              <radialGradient id="cellBodyGrowth" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
              </radialGradient>
              <radialGradient id="nucleusGlow" cx="40%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="70%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </radialGradient>
              <filter id="membraneGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Membrane outer aura */}
            <circle
              cx="85"
              cy="85"
              r="62"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              className="animate-spin-slow opacity-60"
            />

            {/* Main cellular body that expands */}
            <path
              d="M 85 28 C 122 28, 142 55, 142 85 C 142 120, 118 142, 85 142 C 48 142, 28 118, 28 85 C 28 50, 52 28, 85 28 Z"
              fill="url(#cellBodyGrowth)"
              stroke="#a7f3d0"
              strokeWidth="3"
              filter="url(#membraneGlow)"
            />

            {/* Cytoplasm granules / organelles */}
            <circle cx="62" cy="70" r="7" fill="#6ee7b7" opacity="0.6" />
            <circle cx="108" cy="102" r="6" fill="#6ee7b7" opacity="0.6" />
            <circle cx="70" cy="108" r="5" fill="#34d399" opacity="0.5" />
            <circle cx="105" cy="65" r="8" fill="#34d399" opacity="0.5" />

            {/* Nucleus with vital pulsation */}
            <circle
              cx="85"
              cy="85"
              r="22"
              fill="url(#nucleusGlow)"
              stroke="#ecfdf5"
              strokeWidth="2"
              className="animate-pulse"
            />
            {/* Nucleolus */}
            <circle cx="81" cy="81" r="7" fill="#064e3b" opacity="0.8" />

            {/* Arrows representing nutrients entering across membrane */}
            <g stroke="#fef08a" strokeWidth="2" strokeLinecap="round" opacity="0.9">
              <path d="M 20 85 L 34 85 M 30 80 L 35 85 L 30 90" className="animate-pulse" />
              <path d="M 85 20 L 85 34 M 80 30 L 85 35 L 90 30" className="animate-pulse" />
              <path d="M 150 85 L 136 85 M 140 80 L 135 85 L 140 90" className="animate-pulse" />
            </g>
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ORGANISM 2: SIGNO DE REPRODUCCIÓN (Fisión Binaria / Bipartición)
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={cn(
            'pointer-events-auto absolute left-[68%] top-[52%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500',
            activeFocus === 'reproduction' ? 'scale-125 z-30' : 'hover:scale-105 z-20'
          )}
          onClick={() => {
            onFocusChange('reproduction');
            onSelectHotspot?.('reproduccion-biparticion');
          }}
          title="Toca para ver la Reproducción Celular (Bipartición) en detalle"
        >
          {/* Phase Badge */}
          <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-rose-400/50 bg-ink-950/85 px-3 py-1 text-[11px] font-extrabold text-rose-300 shadow-lg backdrop-blur">
            <Dna className="size-3.5 animate-spin-slow text-rose-400" />
            <span>
              {repPhase === 0 && '1. Célula madre madura'}
              {repPhase === 1 && '2. Duplicando ADN y elongación'}
              {repPhase === 2 && '3. Surco de división (Estrangulamiento)'}
              {repPhase === 3 && '4. ¡Dos células hijas vivas!'}
            </span>
          </div>

          <svg width="240" height="150" viewBox="0 0 240 150" className="overflow-visible">
            <defs>
              <radialGradient id="repCellGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fb7185" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#e11d48" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#881337" stopOpacity="0.95" />
              </radialGradient>
              <radialGradient id="dnaGrad" cx="35%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#fed7aa" />
                <stop offset="60%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#9a3412" />
              </radialGradient>
            </defs>

            {/* ── PHASE 0: Célula madre redonda ────────────── */}
            {repPhase === 0 && (
              <g className="transition-all duration-500">
                <ellipse
                  cx="120"
                  cy="75"
                  rx="48"
                  ry="42"
                  fill="url(#repCellGrad)"
                  stroke="#fecdd3"
                  strokeWidth="3"
                />
                <circle cx="120" cy="75" r="18" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                <circle cx="118" cy="73" r="6" fill="#7c2d12" />
              </g>
            )}

            {/* ── PHASE 1: Elongación y Duplicación de ADN ── */}
            {repPhase === 1 && (
              <g className="transition-all duration-500">
                <ellipse
                  cx="120"
                  cy="75"
                  rx="68"
                  ry="38"
                  fill="url(#repCellGrad)"
                  stroke="#fecdd3"
                  strokeWidth="3"
                />
                {/* Two dividing nuclei moving apart */}
                <circle cx="95" cy="75" r="16" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                <circle cx="145" cy="75" r="16" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                {/* Connecting chromatin thread */}
                <line x1="95" y1="75" x2="145" y2="75" stroke="#fed7aa" strokeWidth="3" strokeDasharray="3 3" />
              </g>
            )}

            {/* ── PHASE 2: Invaginación / Estrangulamiento central */}
            {repPhase === 2 && (
              <g className="transition-all duration-500">
                {/* Dumbbell / Peanut shape path */}
                <path
                  d="M 60 75 C 60 50, 90 45, 110 58 C 116 64, 124 64, 130 58 C 150 45, 180 50, 180 75 C 180 100, 150 105, 130 92 C 124 86, 116 86, 110 92 C 90 105, 60 100, 60 75 Z"
                  fill="url(#repCellGrad)"
                  stroke="#fecdd3"
                  strokeWidth="3.5"
                />
                {/* Two distinct nuclei */}
                <circle cx="88" cy="75" r="16" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                <circle cx="152" cy="75" r="16" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                {/* Constriction arrows */}
                <path d="M 120 40 L 120 54 M 116 50 L 120 55 L 124 50" stroke="#f43f5e" strokeWidth="2.5" />
                <path d="M 120 110 L 120 96 M 116 100 L 120 95 L 124 100" stroke="#f43f5e" strokeWidth="2.5" />
              </g>
            )}

            {/* ── PHASE 3: Dos células hijas completamente separadas */}
            {repPhase === 3 && (
              <g className="transition-all duration-500">
                {/* Daughter Cell 1 */}
                <g style={{ transform: `translate(${-15 * repSubProgress}px, 0)` }}>
                  <ellipse
                    cx="75"
                    cy="75"
                    rx="36"
                    ry="32"
                    fill="url(#repCellGrad)"
                    stroke="#a7f3d0"
                    strokeWidth="3"
                  />
                  <circle cx="75" cy="75" r="14" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                  <text x="75" y="122" textAnchor="middle" fill="#fecdd3" fontSize="10" fontWeight="bold">
                    Hija 1
                  </text>
                </g>

                {/* Daughter Cell 2 */}
                <g style={{ transform: `translate(${15 * repSubProgress}px, 0)` }}>
                  <ellipse
                    cx="165"
                    cy="75"
                    rx="36"
                    ry="32"
                    fill="url(#repCellGrad)"
                    stroke="#a7f3d0"
                    strokeWidth="3"
                  />
                  <circle cx="165" cy="75" r="14" fill="url(#dnaGrad)" stroke="#ffedd5" strokeWidth="2" />
                  <text x="165" y="122" textAnchor="middle" fill="#fecdd3" fontSize="10" fontWeight="bold">
                    Hija 2
                  </text>
                </g>

                {/* Sparkles of new life */}
                <circle cx="120" cy="75" r="4" fill="#fef08a" className="animate-ping" />
              </g>
            )}
          </svg>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ORGANISM 3: PARAMECIO NADADOR (Locomoción y Cilios)
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          className="pointer-events-auto absolute left-[45%] top-[25%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition hover:scale-110"
          onClick={() => onSelectHotspot?.('paramecio')}
          title="Paramecio unicelular con cilios vibrátiles"
        >
          <svg width="120" height="60" viewBox="0 0 120 60">
            <defs>
              <linearGradient id="paramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>
            {/* Cilia fringes */}
            <ellipse
              cx="60"
              cy="30"
              rx="46"
              ry="20"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="3"
              strokeDasharray="2 3"
              className="animate-pulse"
            />
            {/* Slipper shape body */}
            <path
              d="M 20 30 C 20 18, 50 14, 90 20 C 105 23, 105 37, 90 40 C 50 46, 20 42, 20 30 Z"
              fill="url(#paramGrad)"
              stroke="#bae6fd"
              strokeWidth="2"
            />
            {/* Vacuole & Nucleus */}
            <circle cx="45" cy="30" r="7" fill="#e0f2fe" opacity="0.8" />
            <circle cx="75" cy="28" r="5" fill="#fef08a" opacity="0.8" />
          </svg>
          <span className="block text-center text-[10px] font-bold text-sky-300">Paramecio</span>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            ORGANISM 4: COLONIA DE ALGAS VERDES (Fotosíntesis)
            ═══════════════════════════════════════════════════════════════════ */}
        <div
          className="pointer-events-auto absolute left-[80%] top-[22%] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition hover:scale-110"
          onClick={() => onSelectHotspot?.('alga')}
          title="Alga verde unicelular y fotosintética"
        >
          <div className="flex items-center gap-1 rounded-full border border-lime-400/30 bg-emerald-950/60 p-2 backdrop-blur">
            <div className="size-6 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-400 border border-lime-300 shadow-md animate-pulse" />
            <div className="size-4 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-400 border border-lime-300 shadow-md" />
            <div className="size-5 rounded-full bg-gradient-to-tr from-lime-600 to-emerald-400 border border-lime-300 shadow-md animate-pulse" />
          </div>
          <span className="mt-1 block text-center text-[10px] font-bold text-lime-300">Algas verdes (O₂)</span>
        </div>
      </div>

      {/* ── Focus Control Bar Overlay (Bottom Left of Canvas) ──────── */}
      <div className="pointer-events-auto absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/15 bg-ink-950/80 p-1.5 backdrop-blur-md">
        <span className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Enfoque:
        </span>
        <button
          type="button"
          onClick={() => onFocusChange('all')}
          className={cn(
            'rounded-xl px-2.5 py-1 text-xs font-bold transition',
            activeFocus === 'all'
              ? 'bg-white/20 text-white shadow'
              : 'text-slate-400 hover:text-white'
          )}
        >
          Todo el estanque
        </button>
        <button
          type="button"
          onClick={() => onFocusChange('growth')}
          className={cn(
            'flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition',
            activeFocus === 'growth'
              ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 shadow'
              : 'text-slate-400 hover:text-emerald-300'
          )}
        >
          <Sprout className="size-3 text-emerald-400" />
          Signo de Crecimiento
        </button>
        <button
          type="button"
          onClick={() => onFocusChange('reproduction')}
          className={cn(
            'flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition',
            activeFocus === 'reproduction'
              ? 'bg-rose-500/25 border border-rose-400/40 text-rose-200 shadow'
              : 'text-slate-400 hover:text-rose-300'
          )}
        >
          <Dna className="size-3 text-rose-400" />
          Signo de Reproducción
        </button>
      </div>
    </div>
  );
}
