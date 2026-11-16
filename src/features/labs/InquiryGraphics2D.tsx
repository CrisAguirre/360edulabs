/**
 * Gráficos vectoriales 2D animados para las preguntas motivadoras de la
 * sub-actividad 1.1. Se usan dentro de tarjetas reflectivas (React Bits)
 * para que cada pregunta tenga su propia imagen científica.
 */

/**
 * Pregunta 1: la vida está formada por células invisibles a simple vista.
 * Escena: tres formas de vida (persona, planta y animal) observadas a través
 * de una lente de aumento que revela las células que las componen.
 */
export function BodyLifeGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Lente de aumento que revela las células de una persona, una planta y un animal"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bl-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#082f49" />
          <stop offset="0.55" stopColor="#04182f" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="bl-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bl-lensBody" cx="38%" cy="32%" r="72%">
          <stop stopColor="#e0f2fe" stopOpacity="0.24" />
          <stop offset="0.55" stopColor="#0ea5e9" stopOpacity="0.16" />
          <stop offset="1" stopColor="#082f49" stopOpacity="0.42" />
        </radialGradient>
        <linearGradient id="bl-person" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#bae6fd" />
          <stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
        <linearGradient id="bl-plant" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#bbf7d0" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="bl-animal" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fef3c7" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="bl-glare" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id="bl-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="bl-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="bl-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.1" fill="#38bdf8" opacity="0.16" />
        </pattern>
        <clipPath id="bl-lensClip">
          <circle cx="182" cy="72" r="43" />
        </clipPath>
        <style>
          {`
            @keyframes blLensFloat {
              0%, 100% { transform: translate(0px, 0px) scale(1); }
              50% { transform: translate(3px, -6px) scale(1.02); }
            }
            @keyframes blGlare {
              0% { transform: translate(-80px, -60px) rotate(18deg); opacity: 0; }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% { transform: translate(80px, 60px) rotate(18deg); opacity: 0; }
            }
            @keyframes blCellPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.14); opacity: 1; }
            }
            @keyframes blDivide {
              0%, 12% { transform: scale(1); }
              55% { transform: scale(1.22); }
              100% { transform: scale(1); }
            }
            @keyframes blDash {
              to { stroke-dashoffset: -60; }
            }
            @keyframes blSway {
              0%, 100% { transform: rotate(-2.2deg); }
              50% { transform: rotate(2.2deg); }
            }
            @keyframes blTail {
              0%, 100% { transform: rotate(-9deg); }
              50% { transform: rotate(11deg); }
            }
            @keyframes blTwinkle {
              0%, 100% { opacity: 0.15; transform: scale(0.8); }
              50% { opacity: 0.95; transform: scale(1.15); }
            }
            @keyframes blBob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            .bl-lens { animation: blLensFloat 6s ease-in-out infinite; transform-origin: 182px 72px; }
            .bl-glare { animation: blGlare 7s ease-in-out infinite; }
            .bl-cell { animation: blCellPulse 3.2s ease-in-out infinite; }
            .bl-cell-2 { animation-delay: 0.55s; }
            .bl-cell-3 { animation-delay: 1.1s; }
            .bl-cell-4 { animation-delay: 1.65s; }
            .bl-divide { animation: blDivide 5.5s ease-in-out infinite; transform-origin: 204px 96px; }
            .bl-connector { stroke-dasharray: 4 6; animation: blDash 3.4s linear infinite; }
            .bl-plant { animation: blSway 5.5s ease-in-out infinite; transform-origin: 180px 176px; }
            .bl-tail { animation: blTail 2.6s ease-in-out infinite; transform-origin: 316px 152px; }
            .bl-twinkle { animation: blTwinkle 2.8s ease-in-out infinite; }
            .bl-twinkle-2 { animation-delay: 0.9s; }
            .bl-twinkle-3 { animation-delay: 1.7s; }
            .bl-bob { animation: blBob 4.4s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#bl-bg)" />
      <rect width="360" height="210" fill="url(#bl-dots)" />
      <ellipse cx="182" cy="70" rx="120" ry="86" fill="url(#bl-halo)" opacity="0.7" />

      {/* Conectores lente → formas de vida */}
      <g fill="none" stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1.2">
        <path className="bl-connector" d="M150 104C120 122 92 128 74 132" />
        <path className="bl-connector" d="M182 118V146" />
        <path className="bl-connector" d="M214 104c30 18 58 24 76 28" />
      </g>

      {/* Formas de vida */}
      <g>
        <ellipse cx="74" cy="184" rx="30" ry="5" fill="#0ea5e9" opacity="0.18" filter="url(#bl-soft)" />
        <g className="bl-bob">
          <circle cx="74" cy="128" r="12" fill="url(#bl-person)" />
          <path d="M74 141c-11 0-18 7-18 17v20h36v-20c0-10-7-17-18-17Z" fill="url(#bl-person)" opacity="0.92" />
          <path d="M56 158h36" stroke="#0369a1" strokeOpacity="0.35" strokeWidth="1.6" />
        </g>
        <text x="74" y="197" textAnchor="middle" fill="#bae6fd" fontSize="9" fontWeight="800" letterSpacing="0.4">TÚ</text>
      </g>

      <g className="bl-plant">
        <ellipse cx="182" cy="186" rx="26" ry="4.5" fill="#22c55e" opacity="0.18" filter="url(#bl-soft)" />
        <path d="M182 175v-40" stroke="#4ade80" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M182 148c-16 0-25-9-25-23 15 0 25 8 25 23Z" fill="url(#bl-plant)" />
        <path d="M182 136c16 0 25-9 25-23-15 0-25 8-25 23Z" fill="url(#bl-plant)" opacity="0.9" />
        <path d="M182 160c-12 0-19-7-19-18 11 0 19 7 19 18Z" fill="url(#bl-plant)" opacity="0.75" />
        <path d="M170 176h24l-3 12h-18Z" fill="#0f766e" />
        <text x="182" y="197" textAnchor="middle" fill="#86efac" fontSize="9" fontWeight="800" letterSpacing="0.4">PLANTAS</text>
      </g>

      <g>
        <ellipse cx="296" cy="185" rx="28" ry="5" fill="#f59e0b" opacity="0.18" filter="url(#bl-soft)" />
        <g className="bl-bob">
          <path
            className="bl-tail"
            d="M316 150c12-2 18 4 16 12"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <ellipse cx="296" cy="158" rx="22" ry="13" fill="url(#bl-animal)" />
          <circle cx="276" cy="146" r="10" fill="url(#bl-animal)" />
          <path d="M269 138l-2-8 8 4Z" fill="#f59e0b" />
          <path d="M283 137l3-8 5 6Z" fill="#f59e0b" />
          <circle cx="273" cy="145" r="1.7" fill="#1c1917" />
          <circle cx="280" cy="145" r="1.7" fill="#1c1917" />
          <path d="M275 151c2 1.6 4 1.6 6 0" stroke="#1c1917" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
        <text x="296" y="197" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="800" letterSpacing="0.4">ANIMALES</text>
      </g>

      {/* Lente de aumento con células dentro */}
      <g className="bl-lens">
        <circle cx="182" cy="72" r="49" fill="#0ea5e9" opacity="0.16" filter="url(#bl-soft)" />
        <circle cx="182" cy="72" r="43" fill="url(#bl-lensBody)" stroke="#7dd3fc" strokeWidth="3" />
        <circle cx="182" cy="72" r="36" fill="none" stroke="#e0f2fe" strokeOpacity="0.32" strokeWidth="1" strokeDasharray="3 4" />

        <g clipPath="url(#bl-lensClip)">
          {/* Tejido celular */}
          <g filter="url(#bl-glow)">
            <g className="bl-cell">
              <ellipse cx="164" cy="58" rx="12" ry="10.5" fill="#5eead4" opacity="0.55" stroke="#99f6e4" strokeWidth="1.4" />
              <circle cx="164" cy="58" r="4" fill="#0f766e" opacity="0.85" />
            </g>
            <g className="bl-cell bl-cell-2">
              <ellipse cx="196" cy="52" rx="10.5" ry="9.5" fill="#7dd3fc" opacity="0.55" stroke="#bae6fd" strokeWidth="1.4" />
              <circle cx="196" cy="52" r="3.4" fill="#0c4a6e" opacity="0.8" />
            </g>
            <g className="bl-cell bl-cell-3">
              <ellipse cx="158" cy="84" rx="11" ry="9.5" fill="#a7f3d0" opacity="0.55" stroke="#d1fae5" strokeWidth="1.4" />
              <circle cx="158" cy="84" r="3.6" fill="#065f46" opacity="0.8" />
            </g>
            <g className="bl-cell bl-cell-4">
              <ellipse cx="190" cy="88" rx="12.5" ry="10" fill="#bae6fd" opacity="0.5" stroke="#e0f2fe" strokeWidth="1.4" />
              <circle cx="190" cy="88" r="4.2" fill="#075985" opacity="0.8" />
            </g>
            <g className="bl-divide">
              <ellipse cx="204" cy="96" rx="9" ry="7.5" fill="#67e8f9" opacity="0.5" stroke="#cffafe" strokeWidth="1.3" />
              <line x1="204" y1="90" x2="204" y2="102" stroke="#cffafe" strokeWidth="1.2" opacity="0.9" />
            </g>
          </g>

          {/* Destello de vidrio */}
          <rect className="bl-glare" x="130" y="24" width="46" height="150" fill="url(#bl-glare)" opacity="0.5" />
        </g>

        <path d="M216 104l22 26" stroke="#7dd3fc" strokeWidth="9" strokeLinecap="round" />
        <path d="M216 104l22 26" stroke="#e0f2fe" strokeWidth="3.4" strokeLinecap="round" opacity="0.55" />
        <circle cx="182" cy="72" r="43" fill="none" stroke="#e0f2fe" strokeOpacity="0.7" strokeWidth="1.2" />

        <g transform="translate(182 30)">
          <rect x="-27" y="-8" width="54" height="16" rx="8" fill="#0ea5e9" opacity="0.85" />
          <text x="0" y="3.4" textAnchor="middle" fill="#f0f9ff" fontSize="8" fontWeight="900" letterSpacing="0.6">¡CÉLULAS!</text>
        </g>
      </g>

      {/* Partículas */}
      <g fill="#e0f2fe" filter="url(#bl-glow)">
        <circle className="bl-twinkle" cx="60" cy="52" r="1.8" />
        <circle className="bl-twinkle bl-twinkle-2" cx="304" cy="46" r="1.5" />
        <circle className="bl-twinkle bl-twinkle-3" cx="268" cy="26" r="1.2" />
        <circle className="bl-twinkle bl-twinkle-2" cx="36" cy="130" r="1.3" />
        <circle className="bl-twinkle bl-twinkle-3" cx="336" cy="112" r="1.4" />
      </g>
    </svg>
  );
}

/**
 * Pregunta 2: cómo son las células y qué hacen para mantenernos vivos.
 * Escena: corte de una célula con organelos animados, transporte de vesículas
 * y liberación de energía (ATP) hacia el exterior.
 */
export function CellActivityGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Corte de una célula con núcleo, mitocondrias, retículo, aparato de Golgi y energía ATP"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ca-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#042f2e" />
          <stop offset="0.6" stopColor="#031b26" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="ca-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#2dd4bf" stopOpacity="0.32" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ca-cytoplasm" cx="38%" cy="32%" r="74%">
          <stop stopColor="#5eead4" stopOpacity="0.34" />
          <stop offset="0.6" stopColor="#14b8a6" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f766e" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="ca-membrane" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#99f6e4" />
          <stop offset="0.5" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <radialGradient id="ca-nucleus" cx="38%" cy="34%" r="70%">
          <stop stopColor="#ddd6fe" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <radialGradient id="ca-mito" cx="40%" cy="36%" r="70%">
          <stop stopColor="#fdba74" />
          <stop offset="1" stopColor="#ea580c" />
        </radialGradient>
        <radialGradient id="ca-mito2" cx="40%" cy="36%" r="70%">
          <stop stopColor="#fde68a" />
          <stop offset="1" stopColor="#d97706" />
        </radialGradient>
        <radialGradient id="ca-atp" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fef9c3" />
          <stop offset="1" stopColor="#facc15" />
        </radialGradient>
        <filter id="ca-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ca-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <pattern id="ca-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.1" fill="#2dd4bf" opacity="0.14" />
        </pattern>
        <style>
          {`
            @keyframes caBreathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.025); }
            }
            @keyframes caNucleus {
              0%, 100% { transform: scale(1); opacity: 0.96; }
              50% { transform: scale(1.055); opacity: 1; }
            }
            @keyframes caMito {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.09) rotate(-3deg); }
            }
            @keyframes caMito2 {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.08) rotate(3deg); }
            }
            @keyframes caWobble {
              0%, 100% { transform: translate(0px, 0px); }
              33% { transform: translate(2.5px, -2px); }
              66% { transform: translate(-2px, 2px); }
            }
            @keyframes caGolgi {
              0%, 100% { transform: translateX(0px); opacity: 0.9; }
              50% { transform: translateX(2.5px); opacity: 1; }
            }
            @keyframes caMembrane {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; }
            }
            @keyframes caTwinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .ca-breathe { animation: caBreathe 6s ease-in-out infinite; transform-origin: 180px 104px; }
            .ca-nucleus { animation: caNucleus 3.4s ease-in-out infinite; transform-origin: 156px 88px; }
            .ca-mito { animation: caMito 2.8s ease-in-out infinite; transform-origin: 118px 134px; }
            .ca-mito-2 { animation: caMito2 3.4s ease-in-out infinite; transform-origin: 254px 78px; }
            .ca-wobble { animation: caWobble 5s ease-in-out infinite; }
            .ca-wobble-2 { animation-delay: 0.8s; }
            .ca-golgi { animation: caGolgi 3.6s ease-in-out infinite; }
            .ca-membrane { animation: caMembrane 4.4s ease-in-out infinite; }
            .ca-twinkle { animation: caTwinkle 2.6s ease-in-out infinite; }
            .ca-twinkle-2 { animation-delay: 0.7s; }
            .ca-twinkle-3 { animation-delay: 1.4s; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#ca-bg)" />
      <rect width="360" height="210" fill="url(#ca-dots)" />
      <ellipse cx="180" cy="100" rx="140" ry="92" fill="url(#ca-halo)" opacity="0.65" />

      <g className="ca-breathe">
        {/* Membrana celular (doble capa) */}
        <path
          className="ca-membrane"
          d="M180 16c52 0 96 34 96 84s-38 94-96 94-96-42-96-94 44-84 96-84Z"
          fill="url(#ca-cytoplasm)"
          stroke="url(#ca-membrane)"
          strokeWidth="3"
        />
        <path
          d="M180 24c46 0 88 31 88 76s-35 86-88 86-88-38-88-86 42-76 88-76Z"
          fill="none"
          stroke="#99f6e4"
          strokeOpacity="0.3"
          strokeWidth="1.1"
          strokeDasharray="5 6"
        />
        {/* Fosfolípidos sugeridos */}
        <g stroke="#5eead4" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round">
          <line x1="104" y1="58" x2="104" y2="66" />
          <line x1="120" y1="42" x2="120" y2="50" />
          <line x1="240" y1="42" x2="240" y2="50" />
          <line x1="256" y1="58" x2="256" y2="66" />
          <line x1="88" y1="88" x2="88" y2="96" />
          <line x1="272" y1="88" x2="272" y2="96" />
          <line x1="94" y1="126" x2="94" y2="134" />
          <line x1="266" y1="126" x2="266" y2="134" />
          <line x1="180" y1="182" x2="180" y2="190" />
          <line x1="136" y1="176" x2="136" y2="184" />
          <line x1="224" y1="176" x2="224" y2="184" />
        </g>

        {/* Retículo endoplasmático */}
        <g className="ca-wobble" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <path d="M132 68c-8 4-8 12-1 15s7 11-1 14" />
          <path d="M124 66c-9 5-9 15-1 18s8 13-1 17" />
        </g>

        {/* Aparato de Golgi */}
        <g className="ca-golgi" stroke="#fca5a5" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.85">
          <path d="M196 146c10-3 18-3 26 0" />
          <path d="M194 152c12-3 22-3 32 0" />
          <path d="M197 158c9-2 17-2 25 0" />
        </g>

        {/* Núcleo */}
        <g className="ca-nucleus" filter="url(#ca-glow)">
          <circle cx="156" cy="88" r="30" fill="url(#ca-nucleus)" />
          <circle cx="156" cy="88" r="23" fill="none" stroke="#ede9fe" strokeOpacity="0.35" strokeWidth="1.1" />
          <circle cx="156" cy="88" r="7.5" fill="#f5f3ff" opacity="0.95" />
          <g stroke="#ede9fe" strokeOpacity="0.55" strokeWidth="1.4" fill="none" strokeLinecap="round">
            <path d="M140 74c6 4 10-3 16 2s9-2 13 5" />
            <path d="M139 100c7-3 11 4 17 0s9 4 14-2" />
          </g>
        </g>
        <text x="156" y="128" textAnchor="middle" fill="#ddd6fe" fontSize="7.5" fontWeight="900" letterSpacing="0.5">NÚCLEO</text>

        {/* Mitocondria 1 */}
        <g className="ca-mito" filter="url(#ca-glow)">
          <ellipse cx="118" cy="134" rx="23" ry="11.5" fill="url(#ca-mito)" transform="rotate(-20 118 134)" />
          <g stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeOpacity="0.8">
            <path d="M102 130c4 6 8-5 12 1s8-4 12 2" />
            <path d="M105 138c4 5 8-4 12 1s8-3 11 2" />
          </g>
        </g>
        <text x="116" y="160" textAnchor="middle" fill="#fed7aa" fontSize="7" fontWeight="900" letterSpacing="0.4">MITOCONDRIA</text>

        {/* Mitocondria 2 */}
        <g className="ca-mito ca-mito-2">
          <ellipse cx="254" cy="78" rx="21" ry="10.5" fill="url(#ca-mito2)" transform="rotate(18 254 78)" />
          <g stroke="#713f12" strokeWidth="1.4" fill="none" strokeOpacity="0.8">
            <path d="M240 76c4 5 8-4 12 1s7-4 11 1" />
            <path d="M243 83c3 4 7-3 11 1s7-2 9 1" />
          </g>
        </g>

        {/* Lisosomas y vesículas */}
        <g className="ca-wobble">
          <circle cx="222" cy="128" r="7" fill="#f472b6" opacity="0.55" stroke="#fbcfe8" strokeWidth="1.2" />
          <circle cx="196" cy="60" r="6" fill="#38bdf8" opacity="0.5" stroke="#bae6fd" strokeWidth="1.2" />
        </g>
        <g className="ca-wobble ca-wobble-2">
          <circle cx="132" cy="158" r="5.5" fill="#5eead4" opacity="0.5" stroke="#ccfbf1" strokeWidth="1.1" />
          <circle cx="238" cy="158" r="4.5" fill="#a7f3d0" opacity="0.5" stroke="#d1fae5" strokeWidth="1.1" />
        </g>

        {/* Ribosomas */}
        <g fill="#99f6e4" opacity="0.6">
          <circle cx="176" cy="128" r="1.6" />
          <circle cx="186" cy="120" r="1.4" />
          <circle cx="196" cy="112" r="1.6" />
          <circle cx="146" cy="148" r="1.4" />
          <circle cx="216" cy="104" r="1.5" />
          <circle cx="166" cy="154" r="1.3" />
        </g>

        {/* ATP orbitando y saliendo */}
        <g filter="url(#ca-glow)">
          <g>
            <circle r="5.5" fill="url(#ca-atp)" stroke="#fefce8" strokeWidth="1" />
            <text y="2" textAnchor="middle" fill="#78350f" fontSize="4.2" fontWeight="900">ATP</text>
            <animateMotion dur="7s" repeatCount="indefinite" path="M214 116C250 96 274 70 268 44C262 20 230 16 208 28" />
          </g>
          <g opacity="0.9">
            <circle r="4.6" fill="url(#ca-atp)" stroke="#fefce8" strokeWidth="0.9" />
            <text y="1.7" textAnchor="middle" fill="#78350f" fontSize="3.6" fontWeight="900">ATP</text>
            <animateMotion dur="8.4s" repeatCount="indefinite" begin="1.2s" path="M150 152C120 148 96 122 100 96C104 70 128 56 150 62" />
          </g>
          <g opacity="0.85">
            <circle r="4.2" fill="url(#ca-atp)" stroke="#fefce8" strokeWidth="0.9" />
            <text y="1.5" textAnchor="middle" fill="#78350f" fontSize="3.4" fontWeight="900">ATP</text>
            <animateMotion dur="9.2s" repeatCount="indefinite" begin="2.4s" path="M196 140C224 152 252 144 268 122C282 102 274 84 256 96" />
          </g>
        </g>

        {/* Vesículas en transporte */}
        <g filter="url(#ca-glow)">
          <circle r="4.4" fill="#a5f3fc" opacity="0.9" stroke="#ecfeff" strokeWidth="0.9" />
          <animateMotion dur="6.2s" repeatCount="indefinite" path="M186 146C168 138 150 140 138 148" />
        </g>
        <g filter="url(#ca-glow)">
          <circle r="3.8" fill="#bbf7d0" opacity="0.9" stroke="#ecfdf5" strokeWidth="0.9" />
          <animateMotion dur="6.8s" repeatCount="indefinite" begin="1.6s" path="M226 120C240 112 246 100 240 88" />
        </g>
      </g>

      {/* Partículas ambientales */}
      <g fill="#ccfbf1" filter="url(#ca-glow)">
        <circle className="ca-twinkle" cx="44" cy="48" r="1.7" />
        <circle className="ca-twinkle ca-twinkle-2" cx="318" cy="60" r="1.5" />
        <circle className="ca-twinkle ca-twinkle-3" cx="308" cy="168" r="1.4" />
        <circle className="ca-twinkle ca-twinkle-2" cx="52" cy="164" r="1.3" />
      </g>

      <text x="180" y="200" textAnchor="middle" fill="#99f6e4" fontSize="8" fontWeight="900" letterSpacing="1.2">
        ENERGÍA Y VIDA EN ACCIÓN
      </text>
    </svg>
  );
}

/** Invitación a participar: voces, ideas y aportes compartidos en clase. */
export function ParticipationGraphic2D() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-auto w-full"
      role="img"
      aria-label="Tres estudiantes conversando con globos de diálogo, una tableta y chispas de ideas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="il-share-bg" x1="0" y1="0" x2="320" y2="180">
          <stop stopColor="#0b2a2a" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="il-share-bubble" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.18" />
        </linearGradient>
        <style>
          {`
            @keyframes ilShareBob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-5px); }
            }
            @keyframes ilSharePop {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.07); opacity: 1; }
            }
            @keyframes ilShareWave {
              0%, 100% { transform: scaleY(0.55); opacity: 0.45; }
              50% { transform: scaleY(1); opacity: 1; }
            }
            @keyframes ilShareSpark {
              0% { transform: scale(0.6) rotate(0deg); opacity: 0.2; }
              50% { transform: scale(1.1) rotate(90deg); opacity: 1; }
              100% { transform: scale(0.6) rotate(180deg); opacity: 0.2; }
            }
            .il-share-b1 { animation: ilShareBob 4s ease-in-out infinite; transform-origin: 92px 62px; }
            .il-share-b2 { animation: ilShareBob 4.6s ease-in-out infinite; animation-delay: 0.5s; transform-origin: 232px 52px; }
            .il-share-idea { animation: ilSharePop 3s ease-in-out infinite; transform-origin: 160px 44px; }
            .il-share-wave { animation: ilShareWave 1.6s ease-in-out infinite; transform-origin: 268px 132px; }
            .il-share-wave-2 { animation-delay: 0.25s; }
            .il-share-wave-3 { animation-delay: 0.5s; }
            .il-share-spark { animation: ilShareSpark 3.4s ease-in-out infinite; transform-origin: 62px 34px; }
            .il-share-spark-2 { animation-delay: 1.2s; transform-origin: 286px 96px; }
          `}
        </style>
      </defs>

      <rect x="4" y="4" width="312" height="172" rx="18" fill="url(#il-share-bg)" stroke="#2dd4bf" strokeOpacity="0.4" />

      {/* Globo de diálogo izquierdo */}
      <g className="il-share-b1">
        <path
          d="M44 46h96a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12H76l-14 13v-13h-18a12 12 0 0 1-12-12V58a12 12 0 0 1 12-12Z"
          fill="url(#il-share-bubble)"
          stroke="#5eead4"
          strokeWidth="2"
        />
        <circle cx="72" cy="69" r="3" fill="#ccfbf1" />
        <circle cx="88" cy="69" r="3" fill="#ccfbf1" />
        <circle cx="104" cy="69" r="3" fill="#ccfbf1" />
      </g>

      {/* Globo de diálogo derecho */}
      <g className="il-share-b2">
        <path
          d="M186 36h82a12 12 0 0 1 12 12v18a12 12 0 0 1-12 12h-8v12l-13-12h-61a12 12 0 0 1-12-12V48a12 12 0 0 1 12-12Z"
          fill="url(#il-share-bubble)"
          stroke="#7dd3fc"
          strokeWidth="2"
        />
        <rect x="192" y="50" width="46" height="3.6" rx="1.8" fill="#bae6fd" opacity="0.85" />
        <rect x="192" y="59" width="62" height="3.6" rx="1.8" fill="#bae6fd" opacity="0.55" />
      </g>

      {/* Idea central: bombilla */}
      <g className="il-share-idea">
        <circle cx="160" cy="42" r="14" fill="#fde047" opacity="0.18" />
        <path d="M160 30a10 10 0 0 1 6 18v4h-12v-4a10 10 0 0 1 6-18Z" fill="#fde047" opacity="0.95" />
        <rect x="155" y="50" width="10" height="3.4" rx="1.7" fill="#facc15" />
        <rect x="156" y="55" width="8" height="2.6" rx="1.3" fill="#fbbf24" opacity="0.8" />
      </g>

      {/* Estudiantes sentados en la mesa */}
      <g>
        {/* Estudiante 1 */}
        <circle cx="92" cy="118" r="12" fill="#7dd3fc" />
        <path d="M92 132c-13 0-21 8-21 20v10h42v-10c0-12-8-20-21-20Z" fill="#38bdf8" opacity="0.75" />
        {/* Estudiante 2 */}
        <circle cx="160" cy="112" r="13" fill="#fbbf24" />
        <path d="M160 127c-14 0-23 9-23 22v13h46v-13c0-13-9-22-23-22Z" fill="#f59e0b" opacity="0.75" />
        {/* Estudiante 3 */}
        <circle cx="232" cy="120" r="12" fill="#a7f3d0" />
        <path d="M232 134c-13 0-21 8-21 20v8h42v-8c0-12-8-20-21-20Z" fill="#34d399" opacity="0.75" />
      </g>

      {/* Mesa con tableta y cuaderno */}
      <rect x="52" y="158" width="216" height="7" rx="3.5" fill="#0f766e" opacity="0.85" />
      <rect x="132" y="142" width="52" height="16" rx="3" fill="#0f172a" stroke="#5eead4" strokeWidth="1.4" />
      <rect x="138" y="146" width="40" height="8" rx="1.5" fill="#5eead4" opacity="0.5" />
      <rect x="196" y="146" width="34" height="12" rx="2" fill="#e2e8f0" opacity="0.85" />
      <line x1="201" y1="150" x2="225" y2="150" stroke="#94a3b8" strokeWidth="1.1" />
      <line x1="201" y1="154" x2="219" y2="154" stroke="#94a3b8" strokeWidth="1.1" />

      {/* Ondas de voz */}
      <g stroke="#5eead4" strokeWidth="2.2" strokeLinecap="round" fill="none">
        <path className="il-share-wave" d="M266 124c4 3 4 9 0 12" />
        <path className="il-share-wave il-share-wave-2" d="M272 120c7 5 7 15 0 20" />
        <path className="il-share-wave il-share-wave-3" d="M278 116c10 7 10 21 0 28" />
      </g>

      {/* Chispas */}
      <g fill="#fde047">
        <path className="il-share-spark" d="M62 30l1.6 5 5 1.6-5 1.6-1.6 5-1.6-5-5-1.6 5-1.6Z" />
        <path className="il-share-spark il-share-spark-2" d="M286 92l1.4 4.4 4.4 1.4-4.4 1.4-1.4 4.4-1.4-4.4-4.4-1.4 4.4-1.4Z" />
      </g>
    </svg>
  );
}

/** Viñeta para la estación 1.3: microscopio antiguo proyectando luz y cine. */
export function CinemaGraphic2D() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-auto w-full"
      role="img"
      aria-label="Microscopio antiguo iluminando una célula entre fotogramas de película"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ci-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#2b0b1a" />
          <stop offset="0.55" stopColor="#150b24" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="ci-brass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#d97706" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="ci-beam" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#fecdd3" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fecdd3" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ci-cell" cx="38%" cy="34%" r="72%">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#4c1d95" />
        </radialGradient>
        <radialGradient id="ci-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#f43f5e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
        <filter id="ci-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @keyframes ciFlicker {
              0%, 100% { opacity: 0.55; }
              45% { opacity: 0.9; }
              55% { opacity: 0.62; }
              70% { opacity: 1; }
            }
            @keyframes ciCellSpin {
              0%, 100% { transform: rotate(-4deg) scale(1); }
              50% { transform: rotate(4deg) scale(1.05); }
            }
            @keyframes ciReel {
              to { transform: rotate(360deg); }
            }
            @keyframes ciFrameDrift {
              0% { transform: translateY(6px); opacity: 0; }
              25% { opacity: 1; }
              75% { opacity: 1; }
              100% { transform: translateY(-14px); opacity: 0; }
            }
            @keyframes ciDust {
              0% { transform: translate(0, 0); opacity: 0; }
              30% { opacity: 0.9; }
              100% { transform: translate(26px, -30px); opacity: 0; }
            }
            .ci-beam { animation: ciFlicker 3.6s ease-in-out infinite; }
            .ci-cell { animation: ciCellSpin 6s ease-in-out infinite; transform-origin: 226px 100px; }
            .ci-reel { animation: ciReel 9s linear infinite; transform-origin: 268px 152px; }
            .ci-frame { animation: ciFrameDrift 5.2s ease-in-out infinite; }
            .ci-frame-2 { animation-delay: 1.7s; }
            .ci-frame-3 { animation-delay: 3.4s; }
            .ci-dust { animation: ciDust 4.6s linear infinite; }
            .ci-dust-2 { animation-delay: 1.2s; }
            .ci-dust-3 { animation-delay: 2.4s; }
            .ci-dust-4 { animation-delay: 3.3s; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#ci-bg)" />
      <ellipse cx="226" cy="96" rx="96" ry="80" fill="url(#ci-halo)" opacity="0.8" />

      {/* Haz cónico de luz */}
      <path className="ci-beam" d="M118 74l108 26-8 34-102-24Z" fill="url(#ci-beam)" />

      {/* Célula iluminada */}
      <g className="ci-cell" filter="url(#ci-glow)">
        <circle cx="226" cy="100" r="26" fill="url(#ci-cell)" opacity="0.95" />
        <circle cx="226" cy="100" r="18" fill="none" stroke="#ede9fe" strokeOpacity="0.5" strokeWidth="1.2" />
        <circle cx="226" cy="100" r="7" fill="#f5f3ff" opacity="0.95" />
        <circle cx="212" cy="88" r="4" fill="#fda4af" opacity="0.85" />
        <circle cx="242" cy="112" r="3.4" fill="#fbbf24" opacity="0.9" />
      </g>

      {/* Microscopio antiguo */}
      <g>
        <ellipse cx="92" cy="182" rx="46" ry="6" fill="#f43f5e" opacity="0.18" />
        <rect x="52" y="172" width="82" height="10" rx="5" fill="#3f2412" />
        <path d="M92 172V96" stroke="url(#ci-brass)" strokeWidth="9" strokeLinecap="round" />
        <path d="M74 96h36" stroke="url(#ci-brass)" strokeWidth="7" strokeLinecap="round" />
        <rect x="84" y="82" width="16" height="16" rx="4" fill="url(#ci-brass)" />
        <path d="M92 82V62" stroke="url(#ci-brass)" strokeWidth="10" strokeLinecap="round" />
        <rect x="80" y="50" width="24" height="14" rx="5" fill="#1c1917" stroke="#fbbf24" strokeWidth="1.6" />
        <circle cx="118" cy="76" r="6" fill="#fde68a" opacity="0.9" filter="url(#ci-glow)" />
        <path d="M110 120h-18" stroke="#d97706" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        <circle cx="60" cy="150" r="9" fill="none" stroke="#fbbf24" strokeWidth="2.4" opacity="0.8" />
        <circle cx="60" cy="150" r="3" fill="#fde68a" opacity="0.9" />
      </g>

      {/* Fotogramas de película */}
      <g>
        <g className="ci-frame">
          <rect x="140" y="34" width="34" height="24" rx="3" fill="#0f172a" stroke="#f43f5e" strokeOpacity="0.6" />
          <circle cx="157" cy="46" r="6" fill="#fda4af" opacity="0.75" />
        </g>
        <g className="ci-frame ci-frame-2">
          <rect x="176" y="22" width="30" height="21" rx="3" fill="#0f172a" stroke="#a78bfa" strokeOpacity="0.6" />
          <rect x="183" y="29" width="16" height="2.6" rx="1.3" fill="#c4b5fd" opacity="0.8" />
          <rect x="183" y="34" width="11" height="2.6" rx="1.3" fill="#c4b5fd" opacity="0.5" />
        </g>
        <g className="ci-frame ci-frame-3">
          <rect x="206" y="38" width="32" height="22" rx="3" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.6" />
          <path d="M212 54c5-9 12-9 18 0" stroke="#7dd3fc" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Carrete */}
      <g>
        <circle cx="268" cy="152" r="20" fill="#1c1917" stroke="#fbbf24" strokeWidth="2.2" />
        <g className="ci-reel">
          <circle cx="268" cy="152" r="4" fill="#fbbf24" />
          <line x1="268" y1="136" x2="268" y2="168" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
          <line x1="252" y1="152" x2="284" y2="152" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
          <line x1="257" y1="141" x2="279" y2="163" stroke="#fbbf24" strokeWidth="1.6" opacity="0.5" />
          <line x1="279" y1="141" x2="257" y2="163" stroke="#fbbf24" strokeWidth="1.6" opacity="0.5" />
        </g>
      </g>

      {/* Polvo luminoso */}
      <g fill="#fecdd3" filter="url(#ci-glow)">
        <circle className="ci-dust" cx="150" cy="130" r="1.7" />
        <circle className="ci-dust ci-dust-2" cx="176" cy="140" r="1.4" />
        <circle className="ci-dust ci-dust-3" cx="196" cy="126" r="1.6" />
        <circle className="ci-dust ci-dust-4" cx="164" cy="118" r="1.2" />
      </g>

      <text x="160" y="194" textAnchor="middle" fill="#fecdd3" fontSize="8" fontWeight="900" letterSpacing="1.1">
        UNA HISTORIA PARA MIRAR DE CERCA
      </text>
    </svg>
  );
}
