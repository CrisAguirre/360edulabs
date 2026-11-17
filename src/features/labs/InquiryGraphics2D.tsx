/**
 * Gráficos vectoriales 2D animados para las preguntas motivadoras de las
 * sub-actividades de apertura (1.1, 2.1 y 3.1). Se usan dentro de tarjetas
 * reflectivas (React Bits) para que cada pregunta tenga su propia imagen
 * científica dinámica e inmersiva.
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
              50% { transform: translate(1.5px, -3px) scale(1.008); }
            }
            @keyframes blGlare {
              0% { transform: translate(-80px, -60px) rotate(18deg); opacity: 0; }
              15% { opacity: 1; }
              85% { opacity: 1; }
              100% { transform: translate(80px, 60px) rotate(18deg); opacity: 0; }
            }
            @keyframes blCellPulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.07); opacity: 1; }
            }
            @keyframes blDivide {
              0%, 12% { transform: scale(1); }
              55% { transform: scale(1.08); }
              100% { transform: scale(1); }
            }
            @keyframes blDash {
              to { stroke-dashoffset: -60; }
            }
            @keyframes blSway {
              0%, 100% { transform: rotate(-1.4deg); }
              50% { transform: rotate(1.4deg); }
            }
            @keyframes blTail {
              0%, 100% { transform: rotate(-5deg); }
              50% { transform: rotate(6deg); }
            }
            @keyframes blTwinkle {
              0%, 100% { opacity: 0.2; transform: scale(0.85); }
              50% { opacity: 0.9; transform: scale(1.08); }
            }
            @keyframes blBob {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-1.5px); }
            }
            .bl-lens { animation: blLensFloat 7s ease-in-out infinite; transform-origin: 182px 72px; }
            .bl-glare { animation: blGlare 7s ease-in-out infinite; }
            .bl-cell { animation: blCellPulse 4s ease-in-out infinite; }
            .bl-cell-2 { animation-delay: 0.6s; }
            .bl-cell-3 { animation-delay: 1.2s; }
            .bl-cell-4 { animation-delay: 1.8s; }
            .bl-divide { animation: blDivide 6s ease-in-out infinite; transform-origin: 204px 96px; }
            .bl-connector { stroke-dasharray: 4 6; animation: blDash 3.4s linear infinite; }
            .bl-plant { animation: blSway 6.5s ease-in-out infinite; transform-origin: 180px 176px; }
            .bl-tail { animation: blTail 3.2s ease-in-out infinite; transform-origin: 316px 152px; }
            .bl-twinkle { animation: blTwinkle 3.4s ease-in-out infinite; }
            .bl-twinkle-2 { animation-delay: 1s; }
            .bl-twinkle-3 { animation-delay: 1.9s; }
            .bl-bob { animation: blBob 5s ease-in-out infinite; }
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
        <path className="bl-connector" d="M214 104c30 18 56 26 74 42" />
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
              50% { transform: scale(1.012); }
            }
            @keyframes caNucleus {
              0%, 100% { transform: scale(1); opacity: 0.97; }
              50% { transform: scale(1.025); opacity: 1; }
            }
            @keyframes caMito {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.04) rotate(-1.5deg); }
            }
            @keyframes caMito2 {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.035) rotate(1.5deg); }
            }
            @keyframes caWobble {
              0%, 100% { transform: translate(0px, 0px); }
              33% { transform: translate(1.2px, -1px); }
              66% { transform: translate(-1px, 1px); }
            }
            @keyframes caGolgi {
              0%, 100% { transform: translateX(0px); opacity: 0.92; }
              50% { transform: translateX(1.2px); opacity: 1; }
            }
            @keyframes caMembrane {
              0%, 100% { opacity: 0.9; }
              50% { opacity: 1; }
            }
            @keyframes caTwinkle {
              0%, 100% { opacity: 0.25; transform: scale(0.9); }
              50% { opacity: 0.95; transform: scale(1.08); }
            }
            .ca-breathe { animation: caBreathe 7s ease-in-out infinite; transform-origin: 180px 104px; }
            .ca-nucleus { animation: caNucleus 4s ease-in-out infinite; transform-origin: 156px 88px; }
            .ca-mito { animation: caMito 3.6s ease-in-out infinite; transform-origin: 118px 134px; }
            .ca-mito-2 { animation: caMito2 4.2s ease-in-out infinite; transform-origin: 254px 78px; }
            .ca-wobble { animation: caWobble 6s ease-in-out infinite; }
            .ca-wobble-2 { animation-delay: 0.9s; }
            .ca-golgi { animation: caGolgi 4.4s ease-in-out infinite; }
            .ca-membrane { animation: caMembrane 5.4s ease-in-out infinite; }
            .ca-twinkle { animation: caTwinkle 3.2s ease-in-out infinite; }
            .ca-twinkle-2 { animation-delay: 0.8s; }
            .ca-twinkle-3 { animation-delay: 1.6s; }
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

/**
 * 2.1 · Pregunta 1: ¿en qué se diferencian tus células de las de un árbol?
 * Escena: comparación lado a lado de una célula vegetal (pared, cloroplastos,
 * vacuola central) y una célula animal (membrana, núcleo, mitocondrias).
 */
export function PlantAnimalCellGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Comparación entre una célula vegetal con pared y cloroplastos y una célula animal con membrana y mitocondrias"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pa-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#052e2b" />
          <stop offset="0.5" stopColor="#031b26" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="pa-glow-green" cx="50%" cy="50%" r="50%">
          <stop stopColor="#22c55e" stopOpacity="0.3" />
          <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pa-glow-pink" cx="50%" cy="50%" r="50%">
          <stop stopColor="#f472b6" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pa-wall" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#166534" />
        </linearGradient>
        <radialGradient id="pa-vacuole" cx="40%" cy="36%" r="70%">
          <stop stopColor="#86efac" stopOpacity="0.85" />
          <stop offset="1" stopColor="#15803d" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="pa-animal-cyto" cx="38%" cy="34%" r="74%">
          <stop stopColor="#fbcfe8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#9d174d" stopOpacity="0.22" />
        </radialGradient>
        <radialGradient id="pa-nucleus" cx="38%" cy="34%" r="70%">
          <stop stopColor="#ddd6fe" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <filter id="pa-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="pa-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#5eead4" opacity="0.14" />
        </pattern>
        <style>
          {`
            @keyframes paChloro { 0%,100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.045); opacity: 1; } }
            @keyframes paVacuole { 0%,100% { transform: scale(1); } 50% { transform: scale(1.018); } }
            @keyframes paMito { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.05) rotate(-2deg); } }
            @keyframes paNucleus { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }
            @keyframes paQuestion { 0%,100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-2.5px) scale(1.03); } }
            .pa-chloro { animation: paChloro 5s ease-in-out infinite; transform-origin: 108px 92px; }
            .pa-chloro-2 { animation-delay: 0.9s; transform-origin: 76px 66px; }
            .pa-vacuole { animation: paVacuole 7s ease-in-out infinite; transform-origin: 108px 104px; }
            .pa-mito { animation: paMito 4.6s ease-in-out infinite; transform-origin: 262px 88px; }
            .pa-mito-2 { animation-delay: 1s; transform-origin: 282px 120px; }
            .pa-nucleus { animation: paNucleus 5.4s ease-in-out infinite; transform-origin: 256px 100px; }
            .pa-question { animation: paQuestion 5s ease-in-out infinite; transform-origin: 180px 104px; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#pa-bg)" />
      <rect width="360" height="210" fill="url(#pa-dots)" />

      {/* Separador central */}
      <line x1="180" y1="18" x2="180" y2="192" stroke="#5eead4" strokeOpacity="0.3" strokeWidth="1.4" strokeDasharray="4 6" />

      {/* ── Célula Vegetal (izquierda) ── */}
      <ellipse cx="108" cy="104" rx="86" ry="80" fill="url(#pa-glow-green)" opacity="0.6" />
      <g filter="url(#pa-glow)">
        <rect x="30" y="34" width="156" height="140" rx="26" fill="#0f3d2a" opacity="0.55" stroke="url(#pa-wall)" strokeWidth="4" />
        {/* Pared celular resaltada */}
        <rect x="34" y="38" width="148" height="132" rx="22" fill="none" stroke="#86efac" strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="6 5" />
        {/* Vacuola central */}
        <g className="pa-vacuole">
          <ellipse cx="116" cy="104" rx="44" ry="40" fill="url(#pa-vacuole)" stroke="#bbf7d0" strokeWidth="1.6" />
        </g>
        {/* Cloroplastos */}
        <g className="pa-chloro">
          <ellipse cx="108" cy="74" rx="18" ry="10" fill="#16a34a" opacity="0.9" stroke="#86efac" strokeWidth="1.4" transform="rotate(-18 108 74)" />
          <g transform="rotate(-18 108 74)" stroke="#14532d" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
            <line x1="98" y1="70" x2="98" y2="78" />
            <line x1="102" y1="69.5" x2="102" y2="78.5" />
            <line x1="106" y1="70" x2="106" y2="78" />
            <line x1="112" y1="70" x2="112" y2="78" />
            <line x1="116" y1="69.5" x2="116" y2="78.5" />
          </g>
        </g>
        <g className="pa-chloro pa-chloro-2">
          <ellipse cx="76" cy="66" rx="14" ry="8" fill="#22c55e" opacity="0.9" stroke="#bbf7d0" strokeWidth="1.3" transform="rotate(12 76 66)" />
          <g transform="rotate(12 76 66)" stroke="#14532d" strokeWidth="1" strokeLinecap="round" opacity="0.85">
            <line x1="70" y1="63" x2="70" y2="69" />
            <line x1="74" y1="62.5" x2="74" y2="69.5" />
            <line x1="78" y1="63" x2="78" y2="69" />
            <line x1="82" y1="62.5" x2="82" y2="69.5" />
          </g>
        </g>
        {/* Núcleo vegetal */}
        <circle cx="82" cy="118" r="13" fill="url(#pa-nucleus)" opacity="0.85" />
      </g>
      <text x="108" y="196" textAnchor="middle" fill="#86efac" fontSize="9.5" fontWeight="900" letterSpacing="0.6">CÉLULA VEGETAL</text>

      {/* ── Célula Animal (derecha) ── */}
      <ellipse cx="252" cy="104" rx="86" ry="80" fill="url(#pa-glow-pink)" opacity="0.6" />
      <g filter="url(#pa-glow)">
        <path
          d="M252 28c50 0 88 34 88 76s-36 80-88 80-88-38-88-80 38-76 88-76Z"
          fill="url(#pa-animal-cyto)"
          stroke="#f472b6"
          strokeWidth="3.2"
        />
        <path
          d="M252 36c44 0 80 31 80 68s-32 72-80 72-80-36-80-72 36-68 80-68Z"
          fill="none"
          stroke="#fbcfe8"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          strokeDasharray="5 6"
        />
        {/* Núcleo */}
        <g className="pa-nucleus">
          <circle cx="256" cy="100" r="24" fill="url(#pa-nucleus)" />
          <circle cx="256" cy="100" r="17" fill="none" stroke="#ede9fe" strokeOpacity="0.35" strokeWidth="1.1" />
          <circle cx="256" cy="100" r="6" fill="#f5f3ff" opacity="0.95" />
        </g>
        {/* Mitocondrias */}
        <g className="pa-mito">
          <ellipse cx="262" cy="62" rx="17" ry="8.5" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.3" transform="rotate(18 262 62)" />
          <path d="M252 60c3 4 7-3 10 1s6-3 9 1" stroke="#7c2d12" strokeWidth="1.2" fill="none" />
        </g>
        <g className="pa-mito pa-mito-2">
          <ellipse cx="282" cy="128" rx="15" ry="8" fill="#fbbf24" stroke="#fde68a" strokeWidth="1.2" transform="rotate(-16 282 128)" />
          <path d="M273 126c3 3 6-2 9 1s5-2 8 1" stroke="#78350f" strokeWidth="1.1" fill="none" />
        </g>
        {/* Lisosomas */}
        <circle cx="214" cy="76" r="6" fill="#f472b6" opacity="0.6" stroke="#fbcfe8" strokeWidth="1.1" />
        <circle cx="286" cy="82" r="5" fill="#c084fc" opacity="0.6" stroke="#ede9fe" strokeWidth="1" />
        {/* Vesículas */}
        <circle cx="226" cy="138" r="5" fill="#38bdf8" opacity="0.6" stroke="#bae6fd" strokeWidth="1" />
      </g>
      <text x="252" y="196" textAnchor="middle" fill="#f9a8d4" fontSize="9.5" fontWeight="900" letterSpacing="0.6">CÉLULA ANIMAL</text>

      {/* Insignia "¿?" central */}
      <g className="pa-question" filter="url(#pa-glow)">
        <circle cx="180" cy="104" r="17" fill="#0f172a" stroke="#5eead4" strokeWidth="2.2" />
        <text x="180" y="111" textAnchor="middle" fill="#5eead4" fontSize="18" fontWeight="900">?</text>
      </g>
    </svg>
  );
}

/**
 * 2.1 · Pregunta 2: ¿qué estructuras tiene una célula y qué función cumplen?
 * Escena: una célula con sus organelos etiquetados y su función principal.
 */
export function CellStructuresGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Célula con membrana, núcleo, mitocondrias, retículo, aparato de Golgi, lisosomas y ribosomas etiquetados"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cs-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#0c1a3a" />
          <stop offset="0.6" stopColor="#04182f" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="cs-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#38bdf8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cs-cyto" cx="38%" cy="32%" r="74%">
          <stop stopColor="#7dd3fc" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0c4a6e" stopOpacity="0.14" />
        </radialGradient>
        <radialGradient id="cs-nucleus" cx="38%" cy="34%" r="70%">
          <stop stopColor="#ddd6fe" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <filter id="cs-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="cs-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#38bdf8" opacity="0.14" />
        </pattern>
        <style>
          {`
            @keyframes csNucleus { 0%,100% { transform: scale(1); } 50% { transform: scale(1.025); } }
            @keyframes csMito { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.05) rotate(-2deg); } }
            @keyframes csGolgi { 0%,100% { transform: translateX(0); } 50% { transform: translateX(1.2px); } }
            @keyframes csWobble { 0%,100% { transform: translate(0,0); } 33% { transform: translate(1px,-1px); } 66% { transform: translate(-1px,1px); } }
            @keyframes csLabel { 0%,100% { opacity: 0.8; } 50% { opacity: 1; } }
            .cs-nucleus { animation: csNucleus 5.2s ease-in-out infinite; transform-origin: 180px 88px; }
            .cs-mito { animation: csMito 4.4s ease-in-out infinite; transform-origin: 122px 138px; }
            .cs-mito-2 { animation-delay: 0.9s; transform-origin: 242px 70px; }
            .cs-golgi { animation: csGolgi 5.6s ease-in-out infinite; }
            .cs-wobble { animation: csWobble 7s ease-in-out infinite; }
            .cs-label { animation: csLabel 4s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#cs-bg)" />
      <rect width="360" height="210" fill="url(#cs-dots)" />
      <ellipse cx="180" cy="104" rx="150" ry="94" fill="url(#cs-halo)" opacity="0.7" />

      <g filter="url(#cs-glow)">
        {/* Membrana celular */}
        <path d="M180 16c54 0 98 36 98 88s-40 92-98 92-98-40-98-92 44-88 98-88Z" fill="url(#cs-cyto)" stroke="#7dd3fc" strokeWidth="3" />
        <path d="M180 25c48 0 90 33 90 79s-36 84-90 84-90-38-90-84 42-79 90-79Z" fill="none" stroke="#bae6fd" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="5 6" />

        {/* Retículo endoplasmático */}
        <g className="cs-wobble" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <path d="M120 64c-9 4-9 14-1 17s8 13-1 16" />
          <path d="M110 62c-10 5-10 16-1 19s8 14-1 18" />
        </g>

        {/* Aparato de Golgi */}
        <g className="cs-golgi" stroke="#fca5a5" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M200 152c10-3 18-3 26 0" />
          <path d="M198 158c12-3 22-3 32 0" />
          <path d="M201 164c9-2 17-2 25 0" />
        </g>

        {/* Núcleo */}
        <g className="cs-nucleus">
          <circle cx="180" cy="88" r="30" fill="url(#cs-nucleus)" />
          <circle cx="180" cy="88" r="22" fill="none" stroke="#ede9fe" strokeOpacity="0.35" strokeWidth="1.1" />
          <circle cx="180" cy="88" r="7" fill="#f5f3ff" opacity="0.95" />
        </g>

        {/* Mitocondrias */}
        <g className="cs-mito">
          <ellipse cx="122" cy="138" rx="22" ry="11" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.4" transform="rotate(-18 122 138)" />
          <path d="M108 133c4 6 8-5 12 1s8-4 12 2" stroke="#7c2d12" strokeWidth="1.3" fill="none" />
        </g>
        <g className="cs-mito cs-mito-2">
          <ellipse cx="242" cy="66" rx="19" ry="9.5" fill="#fbbf24" stroke="#fde68a" strokeWidth="1.3" transform="rotate(16 242 66)" />
          <path d="M230 63c3 4 7-3 11 1s6-3 10 1" stroke="#78350f" strokeWidth="1.2" fill="none" />
        </g>

        {/* Lisosomas y vesículas */}
        <g className="cs-wobble">
          <circle cx="226" cy="128" r="7" fill="#f472b6" opacity="0.6" stroke="#fbcfe8" strokeWidth="1.2" />
          <circle cx="140" cy="60" r="6" fill="#38bdf8" opacity="0.55" stroke="#bae6fd" strokeWidth="1.2" />
        </g>

        {/* Ribosomas */}
        <g fill="#99f6e4" opacity="0.7">
          <circle cx="186" cy="122" r="1.7" />
          <circle cx="196" cy="116" r="1.5" />
          <circle cx="206" cy="108" r="1.7" />
          <circle cx="156" cy="146" r="1.5" />
          <circle cx="166" cy="140" r="1.4" />
        </g>
      </g>

      {/* Etiquetas con líneas guía */}
      <g className="cs-label" fontFamily="Nunito, sans-serif">
        <g>
          <line x1="180" y1="88" x2="96" y2="26" stroke="#c4b5fd" strokeWidth="1" strokeOpacity="0.5" />
          <text x="92" y="22" textAnchor="end" fill="#ddd6fe" fontSize="8" fontWeight="900">NÚCLEO · ADN</text>
        </g>
        <g>
          <line x1="122" y1="138" x2="56" y2="170" stroke="#fdba74" strokeWidth="1" strokeOpacity="0.5" />
          <text x="20" y="184" fill="#fed7aa" fontSize="8" fontWeight="900">MITOCONDRIA · ENERGÍA</text>
        </g>
        <g>
          <line x1="226" y1="128" x2="298" y2="152" stroke="#f9a8d4" strokeWidth="1" strokeOpacity="0.5" />
          <text x="262" y="170" fill="#fbcfe8" fontSize="8" fontWeight="900">LISOSOMAS · LIMPIEZA</text>
        </g>
        <g>
          <line x1="212" y1="155" x2="292" y2="74" stroke="#fda4af" strokeWidth="1" strokeOpacity="0.5" />
          <text x="272" y="60" fill="#fecdd3" fontSize="8" fontWeight="900">GOLGI · EMPAQUE</text>
        </g>
      </g>

      <text x="180" y="202" textAnchor="middle" fill="#bae6fd" fontSize="8.5" fontWeight="900" letterSpacing="1">
        CADA ESTRUCTURA CUMPLE UNA FUNCIÓN
      </text>
    </svg>
  );
}

/**
 * 3.1 · Pregunta 1: ¿cómo convierten los alimentos en energía?
 * Escena en tres tiempos: manzana y pan → nutrientes en tránsito → célula que
 * respira y libera ATP. Rediseño 2026-11-17: geometría válida para la manzana,
 * el pan y las mitocondrias (elipse + crestas), flujo continuo de partículas
 * con línea guía punteada y movimiento sereno (escalas 1.01–1.06, 3–7 s).
 */
export function CellFuelGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Manzana y pan que se transforman en nutrientes que viajan hasta una célula, donde las mitocondrias producen energía ATP"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cf-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#1f1405" />
          <stop offset="0.48" stopColor="#0b1730" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="cf-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fbbf24" stopOpacity="0.24" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cf-cyto" cx="34%" cy="28%" r="78%">
          <stop stopColor="#fde68a" stopOpacity="0.3" />
          <stop offset="1" stopColor="#b45309" stopOpacity="0.13" />
        </radialGradient>
        <linearGradient id="cf-apple" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fb7185" />
          <stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="cf-bread" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fde8bf" />
          <stop offset="1" stopColor="#e9b46b" />
        </linearGradient>
        <radialGradient id="cf-mito" cx="38%" cy="32%" r="72%">
          <stop stopColor="#fdba74" />
          <stop offset="1" stopColor="#ea580c" />
        </radialGradient>
        <filter id="cf-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="cf-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#fcd34d" opacity="0.12" />
        </pattern>
        <style>
          {`
            @keyframes cfBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
            @keyframes cfBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.012); } }
            @keyframes cfMitoPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
            @keyframes cfSpark { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
            @keyframes cfDash { to { stroke-dashoffset: -30; } }
            @keyframes cfAtp { 0%,100% { opacity: 0.8; transform: scale(1); } 50% { opacity: 1; transform: scale(1.04); } }
            .cf-bob { animation: cfBob 5.5s ease-in-out infinite; }
            .cf-breathe { animation: cfBreathe 7s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .cf-mito { animation: cfMitoPulse 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .cf-mito-2 { animation-delay: 1.1s; }
            .cf-spark { animation: cfSpark 3s ease-in-out infinite; }
            .cf-dash { animation: cfDash 2.6s linear infinite; }
            .cf-atp { animation: cfAtp 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#cf-bg)" />
      <rect width="360" height="210" fill="url(#cf-dots)" />
      <ellipse cx="256" cy="100" rx="120" ry="96" fill="url(#cf-halo)" opacity="0.65" />

      {/* Alimentos: manzana y tostada */}
      <g className="cf-bob" filter="url(#cf-glow)">
        <g>
          <path
            d="M64 61c-4-3-9-4-13-2-9 4-13 14-11 24 2 12 11 24 24 24s22-12 24-24c2-10-2-20-11-24-4-2-9-1-13 2Z"
            fill="url(#cf-apple)"
            stroke="#fecdd3"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <path d="M64 61c-1-8 3-13 9-14" stroke="#65a30d" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M73 52c5-6 13-6 17-1-4 7-12 9-17 1Z" fill="#4ade80" stroke="#166534" strokeWidth="0.6" />
          <ellipse cx="54" cy="76" rx="5.5" ry="8.5" fill="#fecdd3" opacity="0.32" transform="rotate(-26 54 76)" />
          <ellipse cx="64" cy="68" rx="10" ry="5" fill="#fecdd3" opacity="0.18" />
        </g>
        <g>
          <path
            d="M38 134c0-11 8-20 18-20h12c10 0 18 9 18 20v16a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6Z"
            fill="#92400e"
          />
          <path
            d="M42 135c0-8 6-15 14-15h12c8 0 14 7 14 15v12a3 3 0 0 1-3 3H45a3 3 0 0 1-3-3Z"
            fill="url(#cf-bread)"
          />
          <path
            d="M47 130c4-6 10-8 16-8"
            stroke="#fef3c7"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          <circle cx="54" cy="141" r="1.4" fill="#92400e" opacity="0.3" />
          <circle cx="67" cy="146" r="1.2" fill="#92400e" opacity="0.3" />
          <circle cx="61" cy="133" r="1.1" fill="#92400e" opacity="0.26" />
          <circle cx="75" cy="140" r="1.2" fill="#92400e" opacity="0.26" />
        </g>
      </g>
      <text x="62" y="182" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="900" letterSpacing="1">
        ALIMENTOS
      </text>

      {/* Flujo de nutrientes hacia la célula */}
      <path
        className="cf-dash"
        d="M100 104C134 100 166 100 196 102"
        fill="none"
        stroke="#fbbf24"
        strokeOpacity="0.3"
        strokeWidth="1.4"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <text x="150" y="72" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="900" letterSpacing="1.1" opacity="0.9">
        NUTRIENTES
      </text>
      <g filter="url(#cf-glow)">
        <circle r="3.6" fill="#fde047" opacity="0.9" stroke="#fef9c3" strokeWidth="0.7">
          <animateMotion dur="4.8s" repeatCount="indefinite" path="M104 96C136 92 168 96 198 100" />
        </circle>
      </g>
      <g filter="url(#cf-glow)">
        <circle r="3.2" fill="#4ade80" opacity="0.85" stroke="#bbf7d0" strokeWidth="0.7">
          <animateMotion dur="6s" begin="1.2s" repeatCount="indefinite" path="M100 112C134 108 166 104 196 104" />
        </circle>
      </g>
      <g filter="url(#cf-glow)">
        <circle r="2.8" fill="#38bdf8" opacity="0.85" stroke="#bae6fd" strokeWidth="0.7">
          <animateMotion dur="5.4s" begin="2.4s" repeatCount="indefinite" path="M104 128C136 122 168 112 196 108" />
        </circle>
      </g>

      {/* Célula destino */}
      <g className="cf-breathe" filter="url(#cf-glow)">
        <path
          d="M262 32c34 0 62 30 62 68s-28 68-62 68-62-30-62-68 28-68 62-68Z"
          fill="url(#cf-cyto)"
          stroke="#fbbf24"
          strokeWidth="2.4"
        />
        <path
          d="M262 40c29 0 53 26 53 60s-24 60-53 60-53-26-53-60 24-60 53-60Z"
          fill="none"
          stroke="#fef3c7"
          strokeOpacity="0.28"
          strokeWidth="1.1"
          strokeDasharray="5 6"
        />

        {/* Retículo endoplasmático */}
        <path d="M232 78c-8 4-10 12-6 20" fill="none" stroke="#fcd34d" strokeOpacity="0.45" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M244 70c-10 6-12 16-8 26" fill="none" stroke="#fcd34d" strokeOpacity="0.28" strokeWidth="1.8" strokeLinecap="round" />

        {/* Núcleo con nucléolo */}
        <circle cx="238" cy="90" r="17" fill="#c084fc" fillOpacity="0.45" stroke="#ede9fe" strokeOpacity="0.75" strokeWidth="1.4" />
        <circle cx="241" cy="87" r="6.5" fill="#f5f3ff" fillOpacity="0.92" />

        {/* Mitocondrias con crestas */}
        <g className="cf-mito">
          <ellipse cx="290" cy="86" rx="19" ry="9" fill="url(#cf-mito)" stroke="#fed7aa" strokeWidth="1.3" transform="rotate(-16 290 86)" />
          <ellipse cx="290" cy="86" rx="13" ry="5.6" fill="#7c2d12" fillOpacity="0.18" transform="rotate(-16 290 86)" />
          <path
            d="M279 84c3 4 6-3 9 1s6-3 9 1"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="1.2"
            strokeOpacity="0.9"
            strokeLinecap="round"
            transform="rotate(-16 290 86)"
          />
          <ellipse cx="284" cy="81" rx="6" ry="2.4" fill="#fff7ed" fillOpacity="0.3" transform="rotate(-16 284 81)" />
        </g>
        <g className="cf-mito cf-mito-2">
          <ellipse cx="278" cy="134" rx="15" ry="7.5" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.2" transform="rotate(14 278 134)" />
          <ellipse cx="278" cy="134" rx="10" ry="4.6" fill="#7c2d12" fillOpacity="0.16" transform="rotate(14 278 134)" />
          <path
            d="M269 132c3 3 6-3 9 1s6-3 9 1"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="1.1"
            strokeOpacity="0.9"
            strokeLinecap="round"
            transform="rotate(14 278 134)"
          />
        </g>

        {/* Vesículas y ribosomas */}
        <circle cx="222" cy="132" r="6" fill="#fde68a" fillOpacity="0.5" stroke="#fef3c7" strokeOpacity="0.6" strokeWidth="1" />
        <circle cx="252" cy="120" r="4" fill="#fde68a" fillOpacity="0.45" />
        <circle cx="230" cy="112" r="1.6" fill="#fef3c7" opacity="0.75" />
        <circle cx="216" cy="96" r="1.4" fill="#fef3c7" opacity="0.6" />
        <circle cx="256" cy="68" r="1.5" fill="#fef3c7" opacity="0.7" />
        <circle cx="300" cy="112" r="1.4" fill="#fef3c7" opacity="0.6" />
        <circle className="cf-spark" cx="256" cy="146" r="2.4" fill="#fde047" />
      </g>

      {/* ATP producido */}
      <g className="cf-atp" filter="url(#cf-glow)">
        <rect x="276" y="12" width="60" height="18" rx="9" fill="#fbbf24" fillOpacity="0.16" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="1.1" />
        <path d="M289 16l-4.4 8h3.1l-1.5 5.4 5-8h-3.2Z" fill="#fde047" />
        <text x="315" y="25" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="900" letterSpacing="1">
          ATP
        </text>
      </g>
      <g filter="url(#cf-glow)">
        <circle r="2.6" fill="#fde047" opacity="0.9">
          <animateMotion dur="4.4s" repeatCount="indefinite" path="M300 88C316 74 306 50 302 34" />
        </circle>
      </g>
      <g filter="url(#cf-glow)">
        <circle r="2.2" fill="#fef9c3" opacity="0.85">
          <animateMotion dur="5.6s" begin="1.4s" repeatCount="indefinite" path="M284 128C306 116 318 84 312 36" />
        </circle>
      </g>

      <text x="180" y="200" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="900" letterSpacing="0.9">
        DE LOS ALIMENTOS A LA ENERGÍA
      </text>
    </svg>
  );
}

/**
 * 3.1 · Pregunta 2: ¿por qué la célula trabaja incluso mientras duermes?
 * Escena: la célula como motor vivo (engranajes que encajan y giran en sentidos
 * opuestos, mitocondrias activas y ATP constante) enmarcada por el arco del día
 * y la noche. Rediseño 2026-11-17: engranajes con dientes reales, luna creciente
 * recortada con máscara, sol de ocho rayos, respiración celular sutil y pulsos
 * de ATP lentos para una composición más armónica con la pregunta 1.
 */
export function CellularMotorGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Célula con engranajes y mitocondrias que producen energía sin parar, entre el sol del día y la luna de la noche"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cm-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#2a0a1c" />
          <stop offset="0.5" stopColor="#150a34" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="cm-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fb7185" stopOpacity="0.24" />
          <stop offset="1" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cm-cyto" cx="34%" cy="28%" r="78%">
          <stop stopColor="#fda4af" stopOpacity="0.3" />
          <stop offset="1" stopColor="#9f1239" stopOpacity="0.13" />
        </radialGradient>
        <radialGradient id="cm-mito" cx="38%" cy="32%" r="72%">
          <stop stopColor="#fdba74" />
          <stop offset="1" stopColor="#ea580c" />
        </radialGradient>
        <radialGradient id="cm-sun" cx="36%" cy="32%" r="70%">
          <stop stopColor="#fef08a" />
          <stop offset="1" stopColor="#f59e0b" />
        </radialGradient>
        <radialGradient id="cm-sun-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fbbf24" stopOpacity="0.32" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cm-moon" cx="36%" cy="30%" r="72%">
          <stop stopColor="#f8fafc" />
          <stop offset="1" stopColor="#cbd5e1" />
        </radialGradient>
        <radialGradient id="cm-moon-halo" cx="50%" cy="50%" r="50%">
          <stop stopColor="#7dd3fc" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
        <mask id="cm-moon-mask">
          <rect width="360" height="210" fill="#ffffff" />
          <circle cx="319" cy="41" r="12" fill="#000000" />
        </mask>
        <filter id="cm-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="cm-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#fbbf24" opacity="0.12" />
        </pattern>
        <style>
          {`
            @keyframes cmGear { to { transform: rotate(360deg); } }
            @keyframes cmGearRev { to { transform: rotate(-360deg); } }
            @keyframes cmBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.01); } }
            @keyframes cmMitoPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
            @keyframes cmSunSpin { to { transform: rotate(360deg); } }
            @keyframes cmGlowPulse { 0%,100% { opacity: 0.85; } 50% { opacity: 1; } }
            @keyframes cmMoonFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
            @keyframes cmAtpPulse { 0%,100% { opacity: 0.78; transform: scale(1); } 50% { opacity: 1; transform: scale(1.035); } }
            @keyframes cmDash { to { stroke-dashoffset: -36; } }
            .cm-gear { animation: cmGear 10s linear infinite; transform-box: fill-box; transform-origin: center; }
            .cm-gear-2 { animation: cmGearRev 6.6s linear infinite; }
            .cm-breathe { animation: cmBreathe 8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .cm-mito { animation: cmMitoPulse 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .cm-sun-spin { animation: cmSunSpin 90s linear infinite; transform-box: fill-box; transform-origin: center; }
            .cm-sun-core { animation: cmGlowPulse 4.5s ease-in-out infinite; }
            .cm-moon { animation: cmMoonFloat 6s ease-in-out infinite; }
            .cm-atp { animation: cmAtpPulse 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .cm-atp-2 { animation-delay: 1.3s; }
            .cm-dash { animation: cmDash 3.6s linear infinite; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#cm-bg)" />
      <rect width="360" height="210" fill="url(#cm-dots)" />
      <ellipse cx="180" cy="106" rx="150" ry="94" fill="url(#cm-halo)" opacity="0.6" />

      {/* Arco del ciclo día ↔ noche */}
      <path
        className="cm-dash"
        d="M70 54C110 18 250 18 290 54"
        fill="none"
        stroke="#fbbf24"
        strokeOpacity="0.32"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        strokeLinecap="round"
      />
      <g filter="url(#cm-glow)">
        <circle r="2.4" fill="#fef9c3" opacity="0.9">
          <animateMotion dur="9s" repeatCount="indefinite" path="M70 54C110 18 250 18 290 54" />
        </circle>
      </g>

      {/* Sol (día) */}
      <circle cx="48" cy="42" r="32" fill="url(#cm-sun-halo)" />
      <g filter="url(#cm-glow)">
        <g className="cm-sun-spin" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0.85">
          <line x1="48" y1="26" x2="48" y2="18" />
          <line x1="59.3" y1="30.7" x2="65" y2="25" />
          <line x1="64" y1="42" x2="72" y2="42" />
          <line x1="59.3" y1="53.3" x2="65" y2="59" />
          <line x1="48" y1="58" x2="48" y2="66" />
          <line x1="36.7" y1="53.3" x2="31" y2="59" />
          <line x1="32" y1="42" x2="24" y2="42" />
          <line x1="36.7" y1="30.7" x2="31" y2="25" />
        </g>
        <circle className="cm-sun-core" cx="48" cy="42" r="13" fill="url(#cm-sun)" />
      </g>
      <text x="48" y="78" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="900" letterSpacing="1">
        DÍA
      </text>

      {/* Luna (noche) */}
      <circle cx="312" cy="42" r="30" fill="url(#cm-moon-halo)" />
      <g className="cm-moon" filter="url(#cm-glow)">
        <circle cx="312" cy="42" r="14" fill="url(#cm-moon)" mask="url(#cm-moon-mask)" />
        <circle cx="303" cy="36" r="1.7" fill="#94a3b8" opacity="0.55" />
        <circle cx="305" cy="49" r="1.2" fill="#94a3b8" opacity="0.45" />
      </g>
      <circle cx="288" cy="28" r="1.2" fill="#e2e8f0" opacity="0.5" />
      <circle cx="296" cy="66" r="1" fill="#e2e8f0" opacity="0.4" />
      <circle cx="330" cy="62" r="1.1" fill="#e2e8f0" opacity="0.45" />
      <text x="312" y="78" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="900" letterSpacing="1">
        NOCHE
      </text>

      {/* Célula con el motor en marcha */}
      <g className="cm-breathe" filter="url(#cm-glow)">
        <path
          d="M180 44c38 0 68 28 68 64s-30 64-68 64-68-28-68-64 30-64 68-64Z"
          fill="url(#cm-cyto)"
          stroke="#fb7185"
          strokeWidth="2.4"
        />
        <path
          d="M180 52c33 0 59 25 59 56s-26 56-59 56-59-25-59-56 26-56 59-56Z"
          fill="none"
          stroke="#fecdd3"
          strokeOpacity="0.26"
          strokeWidth="1.1"
          strokeDasharray="5 6"
        />

        {/* Retículo cercano al núcleo */}
        <path d="M124 110c-6 7-6 15 0 21" fill="none" stroke="#fda4af" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        <path d="M132 104c-7 8-7 18 0 26" fill="none" stroke="#fda4af" strokeOpacity="0.26" strokeWidth="1.6" strokeLinecap="round" />

        {/* Núcleo con nucléolo */}
        <circle cx="139" cy="142" r="14" fill="#c084fc" fillOpacity="0.42" stroke="#ede9fe" strokeOpacity="0.7" strokeWidth="1.3" />
        <circle cx="142" cy="139" r="5.5" fill="#f5f3ff" fillOpacity="0.9" />

        {/* Mitocondrias activas */}
        <g className="cm-mito">
          <ellipse cx="136" cy="68" rx="17" ry="8" fill="url(#cm-mito)" stroke="#fed7aa" strokeWidth="1.2" transform="rotate(-16 136 68)" />
          <ellipse cx="136" cy="68" rx="11.5" ry="5" fill="#7c2d12" fillOpacity="0.18" transform="rotate(-16 136 68)" />
          <path
            d="M126 66c3 4 6-3 9 1s6-3 9 1"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="1.1"
            strokeOpacity="0.9"
            strokeLinecap="round"
            transform="rotate(-16 136 68)"
          />
          <ellipse cx="130" cy="63" rx="5.5" ry="2.2" fill="#fff7ed" fillOpacity="0.28" transform="rotate(-16 130 63)" />
        </g>
        <g className="cm-mito" style={{ animationDelay: '1.2s' }}>
          <ellipse cx="222" cy="82" rx="14" ry="7" fill="#fb923c" stroke="#fed7aa" strokeWidth="1.2" transform="rotate(18 222 82)" />
          <ellipse cx="222" cy="82" rx="9.5" ry="4.4" fill="#7c2d12" fillOpacity="0.16" transform="rotate(18 222 82)" />
          <path
            d="M214 80c3 3 5-2 8 1s5-2 8 1"
            fill="none"
            stroke="#7c2d12"
            strokeWidth="1"
            strokeOpacity="0.9"
            strokeLinecap="round"
            transform="rotate(18 222 82)"
          />
        </g>

        {/* Engranajes: el motor que nunca se detiene */}
        <g transform="translate(174 100)">
          <g className="cm-gear">
            <g fill="#fbbf24" stroke="#b45309" strokeWidth="0.7">
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(36)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(72)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(108)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(144)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(180)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(216)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(252)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(288)" />
              <rect x="-2.5" y="-25" width="5" height="9.5" rx="1.1" transform="rotate(324)" />
            </g>
            <circle r="17.5" fill="#f59e0b" stroke="#fde68a" strokeWidth="1.3" />
            <circle r="12" fill="none" stroke="#b45309" strokeOpacity="0.45" strokeWidth="1.4" />
            <circle r="6" fill="#7c2d12" fillOpacity="0.5" />
            <circle r="2.2" fill="#fef3c7" fillOpacity="0.8" />
          </g>
        </g>
        <g transform="translate(205 126)">
          <g className="cm-gear cm-gear-2">
            <g fill="#fda4af" stroke="#9f1239" strokeWidth="0.6">
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(45)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(90)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(135)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(180)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(225)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(270)" />
              <rect x="-2" y="-18" width="4" height="7" rx="0.9" transform="rotate(315)" />
            </g>
            <circle r="11.5" fill="#fb7185" stroke="#fecdd3" strokeWidth="1.1" />
            <circle r="4.5" fill="#831843" fillOpacity="0.45" />
            <circle r="1.6" fill="#fecdd3" fillOpacity="0.7" />
          </g>
        </g>

        {/* Vesículas y ribosomas */}
        <circle cx="196" cy="154" r="4" fill="#fde68a" fillOpacity="0.45" stroke="#fef3c7" strokeOpacity="0.55" strokeWidth="0.9" />
        <circle cx="160" cy="158" r="3" fill="#fde68a" fillOpacity="0.4" />
        <circle cx="214" cy="62" r="1.4" fill="#fecdd3" opacity="0.7" />
        <circle cx="122" cy="98" r="1.3" fill="#fecdd3" opacity="0.6" />
        <circle cx="168" cy="58" r="1.4" fill="#fecdd3" opacity="0.65" />
      </g>

      {/* ATP continuo */}
      <g className="cm-atp" filter="url(#cm-glow)">
        <rect x="64" y="142" width="54" height="17" rx="8.5" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M76 145l-3.6 6.6h2.6l-1.3 4.6 4.2-6.6h-2.7Z" fill="#fde047" />
        <text x="98" y="153.5" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="900" letterSpacing="0.8">
          ATP
        </text>
      </g>
      <g className="cm-atp cm-atp-2" filter="url(#cm-glow)">
        <rect x="242" y="142" width="54" height="17" rx="8.5" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="1" />
        <path d="M254 145l-3.6 6.6h2.6l-1.3 4.6 4.2-6.6h-2.7Z" fill="#fde047" />
        <text x="276" y="153.5" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="900" letterSpacing="0.8">
          ATP
        </text>
      </g>
      <g filter="url(#cm-glow)">
        <circle r="2" fill="#fde047" opacity="0.85">
          <animateMotion dur="4s" repeatCount="indefinite" path="M132 150C120 150 112 150 104 150" />
        </circle>
      </g>
      <g filter="url(#cm-glow)">
        <circle r="2" fill="#fde047" opacity="0.85">
          <animateMotion dur="4s" begin="2s" repeatCount="indefinite" path="M228 150C240 150 248 150 256 150" />
        </circle>
      </g>

      <text x="180" y="200" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="900" letterSpacing="0.9">
        EL MOTOR QUE NUNCA DUERME
      </text>
    </svg>
  );
}

/**
 * 3.3 · Pregunta 1: ¿qué pasaría si una fábrica dejara de recibir materiales
 * o energía para funcionar? Escena: una fábrica detenida: la alarma parpadea,
 * el rayo de energía se apaga, la banda transportadora está quieta y los
 * camiones ya no llegan con insumos.
 */
export function FactoryStoppedGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Fábrica detenida sin materiales ni energía: la alarma parpadea, la banda transportadora está quieta y el rayo de energía se apaga"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fs-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#241505" />
          <stop offset="0.5" stopColor="#0b1222" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="fs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="fs-belt" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#475569" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="fs-alarm" cx="50%" cy="50%" r="50%">
          <stop stopColor="#f87171" stopOpacity="0.9" />
          <stop offset="1" stopColor="#dc2626" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="fs-bolt" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fde047" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0.15" />
        </radialGradient>
        <filter id="fs-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="fs-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <pattern id="fs-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#fbbf24" opacity="0.1" />
        </pattern>
        <style>
          {`
            @keyframes fsBlink {
              0%, 100% { opacity: 0.35; }
              12% { opacity: 1; }
              24% { opacity: 0.35; }
              36% { opacity: 0.85; }
              48% { opacity: 0.3; }
            }
            @keyframes fsBolt {
              0%, 100% { opacity: 0.18; transform: scale(0.96); }
              50% { opacity: 0.55; transform: scale(1.05); }
            }
            @keyframes fsSmoke {
              0% { transform: translateY(0px) scale(0.7); opacity: 0.4; }
              60% { opacity: 0.18; }
              100% { transform: translateY(-26px) scale(1.25); opacity: 0; }
            }
            @keyframes fsFall {
              0% { transform: translate(0, 0); opacity: 0; }
              30% { opacity: 0.7; }
              100% { transform: translate(14px, 34px); opacity: 0; }
            }
            @keyframes fsJitter {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(1.4px); }
            }
            .fs-blink { animation: fsBlink 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .fs-bolt { animation: fsBolt 3.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .fs-smoke { animation: fsSmoke 5s ease-out infinite; }
            .fs-smoke-2 { animation-delay: 1.7s; }
            .fs-smoke-3 { animation-delay: 3.3s; }
            .fs-fall { animation: fsFall 4.2s linear infinite; }
            .fs-fall-2 { animation-delay: 1.4s; }
            .fs-fall-3 { animation-delay: 2.8s; }
            .fs-jitter { animation: fsJitter 2.8s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#fs-bg)" />
      <rect width="360" height="210" fill="url(#fs-dots)" />

      {/* Alarma en el techo */}
      <g className="fs-blink" filter="url(#fs-glow)">
        <circle cx="120" cy="52" r="14" fill="url(#fs-alarm)" />
        <circle cx="120" cy="52" r="6" fill="#fecaca" />
      </g>

      {/* Rayo de energía apagándose */}
      <g className="fs-bolt" filter="url(#fs-glow)">
        <path d="M296 40l-22 34h15l-7 30 30-44h-16Z" fill="url(#fs-bolt)" stroke="#fde68a" strokeOpacity="0.5" strokeWidth="1" />
      </g>

      {/* Fábrica */}
      <g>
        <ellipse cx="120" cy="168" rx="90" ry="8" fill="#fbbf24" opacity="0.1" filter="url(#fs-soft)" />
        {/* Chimenea */}
        <rect x="152" y="34" width="20" height="46" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.2" />
        {/* Humo débil que se desvanece */}
        <g fill="#94a3b8" filter="url(#fs-soft)">
          <circle className="fs-smoke" cx="162" cy="28" r="7" />
          <circle className="fs-smoke fs-smoke-2" cx="168" cy="24" r="5.5" />
          <circle className="fs-smoke fs-smoke-3" cx="158" cy="26" r="6" />
        </g>
        {/* Cuerpo del edificio */}
        <rect x="52" y="74" width="140" height="92" rx="8" fill="url(#fs-wall)" stroke="#475569" strokeWidth="1.4" />
        {/* Techo */}
        <rect x="44" y="66" width="156" height="12" rx="3" fill="#334155" />
        {/* Ventanas con luz tenue */}
        <g fill="#7dd3fc" opacity="0.35">
          <rect x="66" y="88" width="22" height="16" rx="3" />
          <rect x="100" y="88" width="22" height="16" rx="3" />
          <rect x="134" y="88" width="22" height="16" rx="3" />
          <rect x="66" y="118" width="22" height="16" rx="3" />
          <rect x="100" y="118" width="22" height="16" rx="3" />
          <rect x="134" y="118" width="22" height="16" rx="3" />
        </g>
        {/* Puerta */}
        <rect x="108" y="148" width="28" height="18" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      </g>

      {/* Banda transportadora detenida */}
      <g>
        <line x1="40" y1="182" x2="250" y2="182" stroke="url(#fs-belt)" strokeWidth="7" strokeLinecap="round" />
        <circle cx="44" cy="182" r="9" fill="#1e293b" stroke="#475569" strokeWidth="1.6" />
        <circle cx="246" cy="182" r="9" fill="#1e293b" stroke="#475569" strokeWidth="1.6" />
        {/* Cajas detenidas */}
        <g className="fs-jitter">
          <rect x="72" y="162" width="26" height="20" rx="3" fill="#b45309" stroke="#fbbf24" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M78 162v20M90 162v20" stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="1" />
          <rect x="112" y="162" width="26" height="20" rx="3" fill="#92400e" stroke="#fbbf24" strokeOpacity="0.4" strokeWidth="1.2" />
          <text x="125" y="176" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="900">!</text>
          <rect x="152" y="162" width="26" height="20" rx="3" fill="#78350f" stroke="#fbbf24" strokeOpacity="0.35" strokeWidth="1.2" />
        </g>
      </g>

      {/* Partículas que caen (materiales que ya no llegan) */}
      <g fill="#fbbf24" filter="url(#fs-glow)">
        <circle className="fs-fall" cx="286" cy="120" r="2" />
        <circle className="fs-fall fs-fall-2" cx="306" cy="100" r="1.6" />
        <circle className="fs-fall fs-fall-3" cx="272" cy="132" r="1.4" />
      </g>

      <text x="180" y="204" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="900" letterSpacing="0.9">
        SIN MATERIALES NI ENERGÍA, LA FÁBRICA SE DETIENE
      </text>
    </svg>
  );
}

/**
 * 3.3 · Pregunta 2: ¿pasaría algo parecido en nuestras células si no
 * recibieran los nutrientes que necesitan? Escena: comparación entre una
 * célula nutrida y energizada (mitocondrias activas, ATP) y una célula
 * marchita sin nutrientes (membrana arrugada, mitocondrias apagadas y agua
 * que escapa).
 */
export function WiltingCellGraphic2D() {
  return (
    <svg
      viewBox="0 0 360 210"
      className="h-auto w-full"
      role="img"
      aria-label="Comparación entre una célula nutrida con mitocondrias activas y una célula marchita que pierde agua y energía"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wc-bg" x1="0" y1="0" x2="360" y2="210">
          <stop stopColor="#042f2e" />
          <stop offset="0.5" stopColor="#04182f" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="wc-halo-live" cx="50%" cy="50%" r="50%">
          <stop stopColor="#2dd4bf" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wc-halo-wilt" cx="50%" cy="50%" r="50%">
          <stop stopColor="#94a3b8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#94a3b8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wc-cyto-live" cx="38%" cy="32%" r="74%">
          <stop stopColor="#5eead4" stopOpacity="0.34" />
          <stop offset="1" stopColor="#0f766e" stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id="wc-cyto-wilt" cx="38%" cy="32%" r="74%">
          <stop stopColor="#cbd5e1" stopOpacity="0.22" />
          <stop offset="1" stopColor="#475569" stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id="wc-nucleus-live" cx="38%" cy="34%" r="70%">
          <stop stopColor="#ddd6fe" />
          <stop offset="0.55" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#6d28d9" />
        </radialGradient>
        <radialGradient id="wc-nucleus-wilt" cx="38%" cy="34%" r="70%">
          <stop stopColor="#e2e8f0" />
          <stop offset="0.6" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#64748b" />
        </radialGradient>
        <radialGradient id="wc-mito-live" cx="40%" cy="36%" r="70%">
          <stop stopColor="#fdba74" />
          <stop offset="1" stopColor="#ea580c" />
        </radialGradient>
        <radialGradient id="wc-mito-wilt" cx="40%" cy="36%" r="70%">
          <stop stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </radialGradient>
        <radialGradient id="wc-atp" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fef9c3" />
          <stop offset="1" stopColor="#facc15" />
        </radialGradient>
        <filter id="wc-glow" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="wc-dots" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#5eead4" opacity="0.12" />
        </pattern>
        <style>
          {`
            @keyframes wcBreathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.012); } }
            @keyframes wcWilt { 0%,100% { transform: scale(1); } 50% { transform: scale(0.985); } }
            @keyframes wcMitoLive { 0%,100% { transform: scale(1) rotate(0deg); opacity: 1; } 50% { transform: scale(1.05) rotate(-2deg); } }
            @keyframes wcMitoWilt { 0%,100% { transform: scale(1); opacity: 0.55; } 50% { transform: scale(0.97); opacity: 0.38; } }
            @keyframes wcDrop { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 0.9; } 100% { transform: translateY(26px); opacity: 0; } }
            @keyframes wcAtp { 0%,100% { opacity: 0.8; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-2px); } }
            @keyframes wcDoubt { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-2.4px) scale(1.04); } }
            .wc-breathe { animation: wcBreathe 6.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .wc-wilt { animation: wcWilt 5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .wc-mito-live { animation: wcMitoLive 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .wc-mito-wilt { animation: wcMitoWilt 4.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .wc-drop { animation: wcDrop 3.4s linear infinite; }
            .wc-drop-2 { animation-delay: 1.1s; }
            .wc-drop-3 { animation-delay: 2.2s; }
            .wc-atp { animation: wcAtp 3.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
            .wc-doubt { animation: wcDoubt 4.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
          `}
        </style>
      </defs>

      <rect width="360" height="210" fill="url(#wc-bg)" />
      <rect width="360" height="210" fill="url(#wc-dots)" />

      {/* ── Célula nutrida (izquierda) ── */}
      <ellipse cx="100" cy="100" rx="84" ry="82" fill="url(#wc-halo-live)" opacity="0.65" />
      <g className="wc-breathe" filter="url(#wc-glow)">
        <path d="M100 24c42 0 72 32 72 76s-30 76-72 76-72-34-72-76 30-76 72-76Z" fill="url(#wc-cyto-live)" stroke="#2dd4bf" strokeWidth="2.6" />
        {/* Núcleo */}
        <circle cx="86" cy="88" r="17" fill="url(#wc-nucleus-live)" />
        <circle cx="86" cy="88" r="6" fill="#f5f3ff" opacity="0.95" />
        {/* Mitocondrias activas */}
        <g className="wc-mito-live">
          <ellipse cx="138" cy="76" rx="16" ry="8" fill="url(#wc-mito-live)" stroke="#fed7aa" strokeWidth="1.2" transform="rotate(-14 138 76)" />
          <path d="M128 74c3 4 6-3 9 1s6-3 9 1" stroke="#7c2d12" strokeWidth="1.1" fill="none" />
        </g>
        <g className="wc-mito-live" style={{ animationDelay: '0.9s' }}>
          <ellipse cx="130" cy="112" rx="13" ry="7" fill="#fb923c" stroke="#fde68a" strokeWidth="1.1" transform="rotate(16 130 112)" />
          <path d="M121 110c3 3 5-2 8 1s5-2 8 1" stroke="#7c2d12" strokeWidth="1" fill="none" />
        </g>
      </g>
      {/* ATP */}
      <g className="wc-atp" filter="url(#wc-glow)">
        <rect x="56" y="150" width="40" height="15" rx="7.5" fill="#fbbf24" fillOpacity="0.16" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="1" />
        <text x="76" y="161" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="900" letterSpacing="0.6">ATP</text>
      </g>
      <text x="100" y="194" textAnchor="middle" fill="#5eead4" fontSize="9" fontWeight="900" letterSpacing="0.6">CON NUTRIENTES</text>

      {/* ── Célula marchita (derecha) ── */}
      <ellipse cx="262" cy="100" rx="84" ry="82" fill="url(#wc-halo-wilt)" opacity="0.6" />
      <g className="wc-wilt" filter="url(#wc-glow)">
        {/* Membrana arrugada */}
        <path
          d="M262 34c-24 2-40 14-48 28-10 18-9 38 0 54 8 15 20 22 34 20 20-3 36-18 40-36 4-19-2-42-14-54-8-8-8-14-12-12Z"
          fill="url(#wc-cyto-wilt)"
          stroke="#94a3b8"
          strokeWidth="2.4"
        />
        {/* Núcleo apagado */}
        <circle cx="252" cy="92" r="15" fill="url(#wc-nucleus-wilt)" />
        <circle cx="252" cy="92" r="5" fill="#e2e8f0" opacity="0.8" />
        {/* Mitocondrias apagadas */}
        <g className="wc-mito-wilt">
          <ellipse cx="286" cy="82" rx="15" ry="7.5" fill="url(#wc-mito-wilt)" stroke="#64748b" strokeWidth="1.1" transform="rotate(-12 286 82)" />
        </g>
        <g className="wc-mito-wilt" style={{ animationDelay: '1.2s' }}>
          <ellipse cx="282" cy="116" rx="12" ry="6.5" fill="url(#wc-mito-wilt)" stroke="#64748b" strokeWidth="1.1" transform="rotate(14 282 116)" />
        </g>
      </g>
      {/* Gotas de agua que escapan */}
      <g fill="#7dd3fc" filter="url(#wc-glow)">
        <path className="wc-drop" d="M250 150c-2 3-2 7 0 9 2 2 4-2 4-5s-1-5-4-4Z" />
        <path className="wc-drop wc-drop-2" d="M276 156c-2 3-2 7 0 9 2 2 4-2 4-5s-1-5-4-4Z" />
        <path className="wc-drop wc-drop-3" d="M264 152c-2 3-2 7 0 9 2 2 4-2 4-5s-1-5-4-4Z" />
      </g>
      <text x="262" y="194" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="900" letterSpacing="0.6">SIN NUTRIENTES</text>

      {/* Insignia "¿?" central */}
      <g className="wc-doubt" filter="url(#wc-glow)">
        <circle cx="181" cy="100" r="16" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
        <text x="181" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="900">?</text>
      </g>

      <text x="181" y="204" textAnchor="middle" fill="#99f6e4" fontSize="7.5" fontWeight="900" letterSpacing="0.9">
        ¿Y NUESTRAS CÉLULAS?
      </text>
    </svg>
  );
}
