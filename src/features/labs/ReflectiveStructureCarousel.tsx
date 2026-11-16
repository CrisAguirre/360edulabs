import { useState, type ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import { ReflectiveCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';
import type { StructureItem } from './ReadingPlayer';

interface ReflectiveStructureCarouselProps {
  structures: StructureItem[];
  answers: Record<string, string>;
  onAnswerChange: (id: string, value: string) => void;
  isReadOnly?: boolean;
}

interface StructureData {
  id: string;
  name: string;
  roleTag: string;
  analogy: string;
  color: string;
  description: string;
  placeholder: string;
  graphic: ReactNode;
}

/* ══════════════════════════════════════════════════════════════════════════
   GRÁFICOS 2D ANIMADOS CIENTÍFICOS PARA CADA ESTRUCTURA METABÓLICA
   ══════════════════════════════════════════════════════════════════════════ */

/** 1. Membrana Celular Animada 2D (Bicapa lipídica y canales) */
function AnimatedMembrane2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="memGrad" x1="0" y1="0" x2="280" y2="0">
          <stop stopColor="#0284c7" />
          <stop offset="0.5" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#0284c7" />
        </linearGradient>
        <style>
          {`
            @keyframes ionPass {
              0% { transform: translateY(-20px); opacity: 0; }
              30% { opacity: 1; }
              70% { opacity: 1; }
              100% { transform: translateY(40px); opacity: 0; }
            }
            @keyframes waveHeads {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-2px); }
            }
            .animate-ion { animation: ionPass 2.4s ease-in-out infinite; }
            .animate-wave { animation: waveHeads 3s ease-in-out infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#081524" stroke="#0284c7" strokeWidth="1.2" />
      <text x="140" y="24" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="bold">Medio Extracelular</text>

      {/* Cabezas de fosfolípidos superiores */}
      <g className="animate-wave">
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 24 + i * 18;
          if (i >= 6 && i <= 8) return null;
          return (
            <g key={`top-${i}`}>
              <circle cx={x} cy="42" r="5.5" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1" />
              <line x1={x - 1.5} y1="48" x2={x - 1.5} y2="68" stroke="#f472b6" strokeWidth="1.4" />
              <line x1={x + 1.5} y1="48" x2={x + 1.5} y2="68" stroke="#f472b6" strokeWidth="1.4" />
            </g>
          );
        })}
      </g>

      {/* Proteína de canal central */}
      <rect x="122" y="34" width="36" height="74" rx="10" fill="#6366f1" stroke="#a5b4fc" strokeWidth="1.5" />
      <rect x="134" y="32" width="12" height="78" rx="4" fill="#0f172a" />
      <text x="140" y="74" textAnchor="middle" fill="#c7d2fe" fontSize="6.5" fontWeight="900" transform="rotate(-90 140 74)">CANAL</text>

      {/* Iones en movimiento por el canal */}
      <g className="animate-ion">
        <circle cx="140" cy="50" r="3.5" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
      </g>

      {/* Cabezas inferiores */}
      <g className="animate-wave">
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 24 + i * 18;
          if (i >= 6 && i <= 8) return null;
          return (
            <g key={`bot-${i}`}>
              <circle cx={x} cy="100" r="5.5" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1" />
              <line x1={x - 1.5} y1="74" x2={x - 1.5} y2="94" stroke="#f472b6" strokeWidth="1.4" />
              <line x1={x + 1.5} y1="74" x2={x + 1.5} y2="94" stroke="#f472b6" strokeWidth="1.4" />
            </g>
          );
        })}
      </g>
      <text x="140" y="138" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">Citoplasma Interno (Permeabilidad Selectiva)</text>
    </svg>
  );
}

/** 2. Cloroplastos Animados 2D (Tilacoides y luz solar) */
function AnimatedChloroplast2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chloroGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#15803d" />
          <stop offset="0.75" stopColor="#14532d" />
          <stop offset="1" stopColor="#052e16" />
        </radialGradient>
        <style>
          {`
            @keyframes sunPulse {
              0%, 100% { opacity: 0.5; stroke-width: 1.5; }
              50% { opacity: 1; stroke-width: 2.5; }
            }
            @keyframes glucosePop {
              0% { transform: scale(0.9); opacity: 0.6; }
              50% { transform: scale(1.15); opacity: 1; }
              100% { transform: scale(0.9); opacity: 0.6; }
            }
            .animate-sun { animation: sunPulse 2s ease-in-out infinite; }
            .animate-glucose { transform-origin: 220px 80px; animation: glucosePop 2.5s ease-in-out infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#041a0d" stroke="#22c55e" strokeWidth="1.2" />

      {/* Doble membrana */}
      <ellipse cx="140" cy="80" rx="112" ry="54" fill="url(#chloroGrad)" stroke="#4ade80" strokeWidth="2.5" />
      <ellipse cx="140" cy="80" rx="106" ry="49" stroke="#86efac" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />

      {/* Rayos de sol animados */}
      <g className="animate-sun">
        <path d="M26 22 L62 50" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 14 L78 40" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
        <text x="36" y="48" fill="#fef08a" fontSize="7.5" fontWeight="bold">Luz solar (hν)</text>
      </g>

      {/* Granas (pilas de tilacoides) */}
      <g fill="#22c55e" stroke="#166534" strokeWidth="0.8">
        <ellipse cx="80" cy="70" rx="16" ry="4.5" /><ellipse cx="80" cy="77" rx="16" ry="4.5" /><ellipse cx="80" cy="84" rx="16" ry="4.5" /><ellipse cx="80" cy="91" rx="16" ry="4.5" />
        <ellipse cx="140" cy="65" rx="18" ry="5" /><ellipse cx="140" cy="73" rx="18" ry="5" /><ellipse cx="140" cy="81" rx="18" ry="5" /><ellipse cx="140" cy="89" rx="18" ry="5" /><ellipse cx="140" cy="97" rx="18" ry="5" />
        <ellipse cx="200" cy="70" rx="16" ry="4.5" /><ellipse cx="200" cy="77" rx="16" ry="4.5" /><ellipse cx="200" cy="84" rx="16" ry="4.5" /><ellipse cx="200" cy="91" rx="16" ry="4.5" />
      </g>

      {/* Síntesis de Glucosa */}
      <g className="animate-glucose">
        <rect x="180" y="32" width="60" height="16" rx="5" fill="#facc15" />
        <text x="210" y="43" textAnchor="middle" fill="#052e16" fontSize="7.5" fontWeight="900">✨ Glucosa C₆H₁₂O₆</text>
      </g>

      <text x="140" y="126" textAnchor="middle" fill="#bbf7d0" fontSize="8" fontWeight="bold">Fotosíntesis: CO₂ + H₂O + Luz → Glucosa + O₂</text>
    </svg>
  );
}

/** 3. Mitocondrias Animadas 2D (Respiración celular y chispa de ATP) */
function AnimatedMitochondria2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mitoGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#c2410c" />
          <stop offset="0.75" stopColor="#9a3412" />
          <stop offset="1" stopColor="#431407" />
        </radialGradient>
        <style>
          {`
            @keyframes atpFlash {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #facc15); }
              50% { transform: scale(1.15); filter: drop-shadow(0 0 10px #f59e0b); }
            }
            .animate-atp { transform-origin: 140px 32px; animation: atpFlash 1.8s ease-in-out infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#200d04" stroke="#f97316" strokeWidth="1.2" />

      {/* Membrana externa */}
      <ellipse cx="140" cy="80" rx="108" ry="50" fill="url(#mitoGrad)" stroke="#fb923c" strokeWidth="2.5" />

      {/* Crestas plegadas internas */}
      <path
        d="M58 80 Q74 62 88 80 Q102 98 116 80 Q130 62 144 80 Q158 98 172 80 Q186 62 200 80 Q214 98 226 80"
        stroke="#fed7aa"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Batería / Insignia de ATP */}
      <g className="animate-atp">
        <rect x="110" y="22" width="60" height="20" rx="6" fill="#eab308" stroke="#fef08a" strokeWidth="1.2" />
        <text x="140" y="35" textAnchor="middle" fill="#000000" fontSize="9" fontWeight="900">⚡ ATP (Energía)</text>
      </g>

      <text x="140" y="118" textAnchor="middle" fill="#fed7aa" fontSize="8" fontWeight="bold">Crestas mitocondriales + Matriz respiratoria</text>
      <text x="140" y="132" textAnchor="middle" fill="#fdba74" fontSize="7.5" fontWeight="bold">Respiración Celular: Glucosa + O₂ → ATP + CO₂ + H₂O</text>
    </svg>
  );
}

/** 4. Citoplasma Animado 2D (Ciclosis y suspensión coloidal) */
function AnimatedCytoplasm2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#581c87" />
          <stop offset="0.75" stopColor="#3b0764" />
          <stop offset="1" stopColor="#1e053a" />
        </radialGradient>
        <style>
          {`
            @keyframes cyclosisFlow {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .animate-cyclosis { transform-origin: 140px 80px; animation: cyclosisFlow 20s linear infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#140624" stroke="#a855f7" strokeWidth="1.2" />

      {/* Citosol coloidal */}
      <rect x="20" y="24" width="240" height="112" rx="18" fill="url(#cytoGrad)" stroke="#c084fc" strokeWidth="1.5" />

      {/* Corrientes de ciclosis rotatorias */}
      <g className="animate-cyclosis" stroke="#d8b4fe" strokeWidth="1" strokeDasharray="5 4" opacity="0.4">
        <circle cx="140" cy="80" r="42" fill="none" />
        <circle cx="140" cy="80" r="24" fill="none" />
      </g>

      {/* Organelos y partículas en suspensión metabólica */}
      <circle cx="100" cy="65" r="8" fill="#ec4899" opacity="0.8" />
      <circle cx="175" cy="70" r="10" fill="#06b6d4" opacity="0.8" />
      <circle cx="130" cy="105" r="7" fill="#eab308" opacity="0.8" />
      <circle cx="155" cy="55" r="6" fill="#22c55e" opacity="0.8" />

      <text x="140" y="44" textAnchor="middle" fill="#f3e8ff" fontSize="8" fontWeight="bold">Citosol acuoso + Citoesqueleto en ciclosis</text>
      <text x="140" y="130" textAnchor="middle" fill="#c084fc" fontSize="7.5" fontWeight="bold">Soporte y vía de transporte para todas las reacciones</text>
    </svg>
  );
}

/** 5. Vacuola Central Animada 2D (Turgencia hidrostática) */
function AnimatedVacuole2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="vacGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#0284c7" />
          <stop offset="0.7" stopColor="#0369a1" />
          <stop offset="1" stopColor="#075985" />
        </radialGradient>
        <style>
          {`
            @keyframes turgorBreath {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .animate-turgor { transform-origin: 140px 80px; animation: turgorBreath 3.5s ease-in-out infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#061c27" stroke="#06b6d4" strokeWidth="1.2" />

      {/* Pared vegetal rígida exterior */}
      <rect x="22" y="24" width="236" height="112" rx="16" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 3" />
      <text x="34" y="38" fill="#86efac" fontSize="7" fontWeight="bold">Pared celular</text>

      {/* Vacuola turgente que respira */}
      <g className="animate-turgor">
        <ellipse cx="140" cy="80" rx="90" ry="42" fill="url(#vacGrad)" stroke="#38bdf8" strokeWidth="2.5" />
        <ellipse cx="140" cy="80" rx="84" ry="37" fill="none" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x="140" y="78" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">💧 Jugo Celular (Agua)</text>
        <text x="140" y="90" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="bold">Alta Presión de Turgor</text>
      </g>

      <text x="140" y="130" textAnchor="middle" fill="#67e8f9" fontSize="7.5" fontWeight="bold">Mantiene a la planta erguida y almacena reservas</text>
    </svg>
  );
}

/** 6. Núcleo Animado 2D (Cromatina, nucleolo y poros) */
function AnimatedNucleus2D() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto max-h-40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#7e22ce" />
          <stop offset="0.75" stopColor="#581c87" />
          <stop offset="1" stopColor="#3b0764" />
        </radialGradient>
        <style>
          {`
            @keyframes dnaPulse {
              0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 2px #facc15); }
              50% { opacity: 1; filter: drop-shadow(0 0 8px #facc15); }
            }
            .animate-dna { animation: dnaPulse 2.2s ease-in-out infinite; }
          `}
        </style>
      </defs>
      <rect x="6" y="6" width="268" height="148" rx="14" fill="#180728" stroke="#eab308" strokeWidth="1.2" />

      {/* Envoltura nuclear con poros */}
      <circle cx="140" cy="80" r="54" fill="url(#nucGrad)" stroke="#c084fc" strokeWidth="2.5" />
      <circle cx="140" cy="80" r="50" stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 3" />

      {/* Nucleolo denso central */}
      <circle cx="140" cy="80" r="18" fill="#eab308" stroke="#fde047" strokeWidth="1.5" />
      <text x="140" y="83" textAnchor="middle" fill="#000000" fontSize="7.5" fontWeight="900">ARN</text>

      {/* Hebras de ADN / Cromatina animadas */}
      <g className="animate-dna" stroke="#fef08a" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M102 65 Q115 55 125 65" />
        <path d="M155 95 Q165 105 178 95" />
        <path d="M105 95 Q118 105 128 95" />
        <path d="M152 65 Q165 55 175 65" />
      </g>

      <text x="140" y="24" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="bold">Poros Nucleares + Doble Membrana</text>
      <text x="140" y="132" textAnchor="middle" fill="#e9d5ff" fontSize="7.5" fontWeight="bold">Comando Central: Guarda el ADN y dirige la síntesis de enzimas</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CATÁLOGO DE LAS 6 ESTRUCTURAS METABÓLICAS
   ══════════════════════════════════════════════════════════════════════════ */
const STRUCTURE_DETAILS: Record<string, Omit<StructureData, 'id' | 'name' | 'placeholder'>> = {
  membrana: {
    roleTag: 'Barrera y Aduana Selectiva',
    analogy: 'Puerta de entrada y control de aduana de la fábrica',
    color: '#38bdf8',
    description:
      'Bicapa lipídica semipermeable que envuelve a la célula. Controla el ingreso de nutrientes indispensables (glucosa, agua, iones) y la salida de productos y desechos metabólicos, manteniendo la homeostasis.',
    graphic: <AnimatedMembrane2D />
  },
  cloroplastos: {
    roleTag: 'Fábrica Fotosintética de Azúcar',
    analogy: 'Paneles solares de captación energética',
    color: '#22c55e',
    description:
      'Organelos exclusivos de células vegetales y algas. Contienen clorofila en sus tilacoides para transformar la energía de la luz solar, agua y dióxido de carbono en glucosa y oxígeno vital (anabolismo).',
    graphic: <AnimatedChloroplast2D />
  },
  mitocondrias: {
    roleTag: 'Central Eléctrica Celular (ATP)',
    analogy: 'Generadores y turbinas de energía',
    color: '#f97316',
    description:
      'Centrales energéticas de la célula. A través de la respiración celular (catabolismo), oxidan los nutrientes en presencia de oxígeno para producir moléculas de ATP (adenosín trifosfato), el combustible biológico.',
    graphic: <AnimatedMitochondria2D />
  },
  citoplasma: {
    roleTag: 'Taller de Ensamblaje y Reacciones',
    analogy: 'Piso de trabajo de la fábrica donde laboran las máquinas',
    color: '#a855f7',
    description:
      'Medio coloidal gelatinoso (citosol) atravesado por el citoesqueleto. En él flotan todos los organelos, circulan los nutrientes por ciclosis y ocurren miles de reacciones metabólicas vitales a cada segundo.',
    graphic: <AnimatedCytoplasm2D />
  },
  vacuola: {
    roleTag: 'Tanque Hidrostático de Presión',
    analogy: 'Tanque de reserva de agua y presión',
    color: '#06b6d4',
    description:
      'Gran compartimento membranoso que almacena agua, iones y nutrientes. Genera alta presión hidrostática de turgencia contra la pared celular, manteniendo firmes los tallos y hojas de las plantas.',
    graphic: <AnimatedVacuole2D />
  },
  nucleo: {
    roleTag: 'Oficina Central de Comando y Planos',
    analogy: 'Gerencia y archivo de planos maestros',
    color: '#eab308',
    description:
      'Centro de control de la célula rodeado por una doble membrana con poros. Resguarda el ADN (los planos maestros de la vida) y coordina qué proteínas y enzimas metabólicas deben fabricarse.',
    graphic: <AnimatedNucleus2D />
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL: CARRUSEL DE CARDS REFLECTIVAS (REACT BITS)
   ══════════════════════════════════════════════════════════════════════════ */
export function ReflectiveStructureCarousel({
  structures,
  answers,
  onAnswerChange,
  isReadOnly = false
}: ReflectiveStructureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'carousel' | 'grid'>('carousel');

  const total = structures.length;
  const currentItem = structures[activeIndex] ?? structures[0];

  // Contar cuántas respuestas han sido diligenciadas
  const completedCount = structures.filter((s) => (answers[s.id]?.trim()?.length ?? 0) >= 10).length;
  const progressPct = Math.round((completedCount / total) * 100);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="space-y-4">
      {/* ── BARRA SUPERIOR: PROGRESO, PÍLDORAS Y SELECTOR DE VISTA ── */}
      <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-xl bg-emerald-400/20 text-emerald-300 font-extrabold text-xs">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h4 className="text-sm font-extrabold text-white">
                Cuadro Interactivo con Cards Reflectivas (React Bits)
              </h4>
              <p className="text-xs text-slate-400">
                Escribe la función principal de cada una de las 6 estructuras celulares
              </p>
            </div>
          </div>

          {/* Selector de modo Carrusel vs Cuadrícula */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLayoutMode(layoutMode === 'carousel' ? 'grid' : 'carousel')}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              {layoutMode === 'carousel' ? (
                <>
                  <LayoutGrid className="size-3.5" />
                  <span>Ver todas en cuadrícula</span>
                </>
              ) : (
                <>
                  <Maximize2 className="size-3.5" />
                  <span>Modo carrusel animado</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Medidor de progreso */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">
              Progreso del cuadro: <strong className="text-emerald-300">{completedCount} de {total}</strong> redactadas
            </span>
            <span className="font-bold text-emerald-400">{progressPct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-mint-400 to-sky-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Tira interactiva de píldoras para salto directo */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {structures.map((s, idx) => {
            const hasText = (answers[s.id]?.trim()?.length ?? 0) >= 10;
            const isSelected = activeIndex === idx && layoutMode === 'carousel';
            const details = STRUCTURE_DETAILS[s.id] ?? STRUCTURE_DETAILS.membrana;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  setLayoutMode('carousel');
                }}
                className={cn(
                  'flex items-center gap-1.5 rounded-xl px-2.5 py-1 text-xs font-bold transition-all border',
                  isSelected
                    ? 'border-emerald-400/60 bg-emerald-400/20 text-white shadow-md'
                    : 'border-white/8 bg-white/4 text-slate-300 hover:border-white/20 hover:text-white'
                )}
                style={isSelected ? { borderColor: `${details.color}80` } : {}}
              >
                <span className="text-[10px] font-mono opacity-70">#{idx + 1}</span>
                <span>{s.name}</span>
                {hasText ? (
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                ) : (
                  <span className="size-1.5 rounded-full bg-slate-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MODO 1: CARRUSEL DE CARDS REFLECTIVAS ANIMADAS ── */}
      {layoutMode === 'carousel' ? (
        <div className="space-y-3">
          {(() => {
            const s = currentItem;
            const details = STRUCTURE_DETAILS[s.id] ?? STRUCTURE_DETAILS.membrana;
            const currentAnswer = answers[s.id] ?? '';
            const isCompleted = currentAnswer.trim().length >= 10;

            return (
              <ReflectiveCard
                key={s.id}
                reflectionColor={details.color}
                maxTilt={10}
                className="w-full"
              >
                <div className="p-5 sm:p-7 space-y-5">
                  {/* Encabezado de la card reflectiva */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid size-9 place-items-center rounded-xl text-xs font-black shadow-inner"
                        style={{
                          backgroundColor: `${details.color}25`,
                          color: details.color,
                          border: `1px solid ${details.color}50`
                        }}
                      >
                        {activeIndex + 1}/{total}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
                            style={{
                              backgroundColor: `${details.color}20`,
                              color: details.color,
                              border: `1px solid ${details.color}40`
                            }}
                          >
                            {details.roleTag}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white sm:text-2xl mt-0.5">
                          {s.name}
                        </h3>
                      </div>
                    </div>

                    {/* Badge de completado */}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300 shadow-sm">
                        <CheckCircle2 className="size-4" />
                        <span>Función redactada</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                        <AlertCircle className="size-4" />
                        <span>Pendiente de redactar</span>
                      </span>
                    )}
                  </div>

                  {/* Cuerpo en dos columnas: Gráfico 2D animado + Cajón de texto */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Columna Izquierda: Ilustración 2D animada y descripción */}
                    <div className="lg:col-span-5 space-y-3">
                      <div
                        className="rounded-2xl border bg-black/50 p-3 shadow-inner flex items-center justify-center min-h-[170px]"
                        style={{
                          borderColor: `${details.color}35`,
                          boxShadow: `inset 0 0 25px ${details.color}15`
                        }}
                      >
                        {details.graphic}
                      </div>

                      <div className="rounded-xl border border-white/8 bg-white/4 p-3 text-xs text-slate-300 leading-relaxed space-y-1.5">
                        <span className="block font-bold text-white text-[11px] uppercase tracking-wider">
                          Rol en el metabolismo celular:
                        </span>
                        <p>{details.description}</p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-white/2 p-2.5 text-[11px] text-slate-400 italic">
                        💡 <strong>Analogía:</strong> {details.analogy}
                      </div>
                    </div>

                    {/* Columna Derecha: Cajón de texto para que el estudiante responda */}
                    <div className="lg:col-span-7 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={`function-input-${s.id}`}
                          className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-1.5"
                        >
                          <Sparkles className="size-3.5 text-amber-300" />
                          <span>Escribe aquí la función principal de: <strong className="text-white">{s.name}</strong></span>
                        </label>
                        <span className="text-[10px] font-mono text-slate-400">
                          {currentAnswer.length} caracteres
                        </span>
                      </div>

                      <textarea
                        id={`function-input-${s.id}`}
                        rows={6}
                        disabled={isReadOnly}
                        value={currentAnswer}
                        onChange={(e) => onAnswerChange(s.id, e.target.value)}
                        placeholder={s.placeholder ?? `Explica con tus palabras cuál es la función principal de ${s.name} en la célula y cómo ayuda al metabolismo...`}
                        className="w-full rounded-2xl border border-white/15 bg-ink-950/90 p-3.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/25 outline-none leading-relaxed transition-all shadow-inner"
                      />

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>
                          {currentAnswer.length < 15 ? (
                            <span className="text-amber-300 font-medium">
                              Escribe al menos una frase completa explicando su función.
                            </span>
                          ) : (
                            <span className="text-emerald-300 font-medium flex items-center gap-1">
                              <CheckCircle2 className="size-3" /> ¡Respuesta registrada para este organelo!
                            </span>
                          )}
                        </span>
                        <span className="text-slate-500">Se guarda automáticamente</span>
                      </div>
                    </div>
                  </div>

                  {/* Controles de navegación del carrusel */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs font-bold">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition"
                    >
                      <ChevronLeft className="size-4" />
                      <span>Estructura anterior</span>
                    </button>

                    {/* Indicadores de puntos */}
                    <div className="flex items-center gap-1.5">
                      {structures.map((st, dIdx) => (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => setActiveIndex(dIdx)}
                          className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            dIdx === activeIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/20 hover:bg-white/40'
                          )}
                          aria-label={`Ir a estructura ${dIdx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 hover:border-white/30 hover:bg-white/10 hover:text-white transition"
                    >
                      <span>Siguiente estructura</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </ReflectiveCard>
            );
          })()}
        </div>
      ) : (
        /* ── MODO 2: CUADRÍCULA DE TODAS LAS CARDS REFLECTIVAS ── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {structures.map((s, idx) => {
            const details = STRUCTURE_DETAILS[s.id] ?? STRUCTURE_DETAILS.membrana;
            const currentAnswer = answers[s.id] ?? '';
            const isCompleted = currentAnswer.trim().length >= 10;

            return (
              <ReflectiveCard
                key={s.id}
                reflectionColor={details.color}
                maxTilt={8}
                className="w-full"
              >
                <div className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-white">
                        {s.name}
                      </h4>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="size-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-bold text-amber-300">Pendiente</span>
                    )}
                  </div>

                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2 min-h-[120px] flex items-center justify-center">
                    {details.graphic}
                  </div>

                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {details.description}
                  </p>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400 block">
                      Función principal:
                    </label>
                    <textarea
                      rows={3}
                      disabled={isReadOnly}
                      value={currentAnswer}
                      onChange={(e) => onAnswerChange(s.id, e.target.value)}
                      placeholder={s.placeholder ?? `Describe la función de ${s.name}...`}
                      className="w-full rounded-xl border border-white/10 bg-ink-950/80 p-2 text-xs text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 outline-none"
                    />
                  </div>
                </div>
              </ReflectiveCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
