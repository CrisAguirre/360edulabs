interface GraphicProps {
  className?: string;
}

const SVG_PROPS = {
  viewBox: '0 0 320 200',
  preserveAspectRatio: 'xMidYMid meet',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
} as const;

/* ══════════════════════════════════════════════════════════════════════════
   1. ZACHARIAS JANSSEN (Principios siglo XVII)
   El primer microscopio compuesto: alineación de 2 lentes en un tubo
   ══════════════════════════════════════════════════════════════════════════ */
export function JanssenMicroscopeGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      {...SVG_PROPS}
      className={className ?? 'h-full w-full'}
      role="img"
      aria-label="Esquema óptico del primer microscopio compuesto de Zacharias Janssen"
    >
      <defs>
        <linearGradient id="js-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#082f49" />
          <stop offset="0.55" stopColor="#061c30" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="js-brass" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#fcd34d" />
          <stop offset="0.35" stopColor="#d97706" />
          <stop offset="0.72" stopColor="#92400e" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="js-glass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e0f2fe" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#7dd3fc" stopOpacity="0.75" />
          <stop offset="1" stopColor="#0369a1" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="js-ray" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#fef08a" stopOpacity="0.1" />
          <stop offset="0.45" stopColor="#fef08a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="js-focus" cx="50%" cy="50%" r="50%">
          <stop stopColor="#fff7ed" />
          <stop offset="0.45" stopColor="#fde047" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <pattern id="js-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" stroke="#38bdf8" strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
        <filter id="js-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @keyframes jsBeam {
              0%, 100% { opacity: 0.45; }
              50% { opacity: 0.95; }
            }
            @keyframes jsDash {
              to { stroke-dashoffset: -80; }
            }
            @keyframes jsTube {
              0%, 100% { transform: translateX(0px); }
              50% { transform: translateX(3px); }
            }
            @keyframes jsDust {
              0% { transform: translate(0, 0); opacity: 0; }
              30% { opacity: 0.9; }
              100% { transform: translate(18px, -22px); opacity: 0; }
            }
            @keyframes jsFocus {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.25); opacity: 1; }
            }
            @keyframes jsShine {
              0%, 100% { opacity: 0.35; }
              50% { opacity: 0.9; }
            }
            .js-beam { animation: jsBeam 3.4s ease-in-out infinite; }
            .js-dash { stroke-dasharray: 5 6; animation: jsDash 3s linear infinite; }
            .js-tube { animation: jsTube 5s ease-in-out infinite; }
            .js-dust { animation: jsDust 5s linear infinite; }
            .js-dust-2 { animation-delay: 1.4s; }
            .js-dust-3 { animation-delay: 2.8s; }
            .js-focus { animation: jsFocus 2.6s ease-in-out infinite; transform-origin: 168px 100px; }
            .js-shine { animation: jsShine 4s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#js-bg)" />
      <rect width="320" height="200" fill="url(#js-grid)" />

      {/* Mesa óptica */}
      <rect x="16" y="164" width="288" height="2" fill="#0ea5e9" opacity="0.35" />
      <g stroke="#38bdf8" strokeOpacity="0.5" strokeWidth="1">
        <line x1="40" y1="164" x2="40" y2="171" />
        <line x1="100" y1="164" x2="100" y2="169" />
        <line x1="160" y1="164" x2="160" y2="171" />
        <line x1="220" y1="164" x2="220" y2="169" />
        <line x1="280" y1="164" x2="280" y2="171" />
      </g>

      {/* Haz óptico */}
      <g className="js-beam">
        <path d="M58 74 L168 100 L278 66 L278 134 L168 100 L58 126 Z" fill="url(#js-ray)" />
        <path className="js-dash" d="M30 100H290" stroke="#fef08a" strokeOpacity="0.55" strokeWidth="1.2" />
      </g>

      {/* Tubo de latón */}
      <g>
        <rect x="34" y="60" width="58" height="80" rx="9" fill="url(#js-brass)" />
        <rect x="39" y="65" width="48" height="70" rx="7" fill="#111827" opacity="0.55" />
        <rect className="js-shine" x="45" y="69" width="7" height="62" rx="3.5" fill="#fef3c7" opacity="0.5" />
        <g className="js-tube">
          <rect x="90" y="66" width="96" height="68" rx="7" fill="url(#js-brass)" />
          <rect x="95" y="71" width="86" height="58" rx="5" fill="#111827" opacity="0.6" />
          <g stroke="#fde68a" strokeWidth="1.2" strokeOpacity="0.85">
            <line x1="112" y1="74" x2="112" y2="83" />
            <line x1="132" y1="74" x2="132" y2="83" />
            <line x1="152" y1="74" x2="152" y2="83" />
            <line x1="170" y1="74" x2="170" y2="83" />
          </g>
        </g>
        <rect x="184" y="62" width="34" height="76" rx="7" fill="url(#js-brass)" />
        <rect x="189" y="67" width="24" height="66" rx="5" fill="#111827" opacity="0.55" />
      </g>

      {/* Lente ocular */}
      <g>
        <path d="M56 66c9 14 9 54 0 68-9-14-9-54 0-68Z" fill="url(#js-glass)" stroke="#e0f2fe" strokeWidth="1.6" />
        <path className="js-shine" d="M53 78c3 10 3 34 0 44" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
        <text x="52" y="52" textAnchor="middle" fill="#7dd3fc" fontSize="9.4" fontWeight="800">OCULAR</text>
        <text x="52" y="150" textAnchor="middle" fill="#94a3b8" fontSize="7.6">1.ª lente</text>
      </g>

      {/* Lente objetivo */}
      <g>
        <path d="M272 60c10 16 10 64 0 80-10-16-10-64 0-80Z" fill="url(#js-glass)" stroke="#e0f2fe" strokeWidth="1.6" />
        <path className="js-shine" d="M269 74c3 12 3 40 0 52" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
        <text x="276" y="48" textAnchor="middle" fill="#7dd3fc" fontSize="9.4" fontWeight="800">OBJETIVO</text>
        <text x="276" y="156" textAnchor="middle" fill="#94a3b8" fontSize="7.6">2.ª lente</text>
      </g>

      {/* Foco conjugado */}
      <g className="js-focus" filter="url(#js-glow)">
        <circle cx="168" cy="100" r="17" fill="url(#js-focus)" />
        <circle cx="168" cy="100" r="3.6" fill="#fff7ed" />
      </g>
      <text x="168" y="124" textAnchor="middle" fill="#fde68a" fontSize="7.8" fontWeight="700">FOCO</text>

      {/* Muestra */}
      <g>
        <rect x="296" y="82" width="5" height="36" rx="2.5" fill="#4ade80" />
        <circle cx="297" cy="100" r="10" fill="#38bdf8" opacity="0.4" />
        <circle cx="297" cy="100" r="3" fill="#bae6fd" />
        <text x="300" y="140" textAnchor="middle" fill="#86efac" fontSize="6.8" fontWeight="800">MUESTRA</text>
      </g>

      {/* Polvo luminoso */}
      <g fill="#fef3c7" filter="url(#js-glow)">
        <circle className="js-dust" cx="120" cy="132" r="1.5" />
        <circle className="js-dust js-dust-2" cx="205" cy="128" r="1.3" />
        <circle className="js-dust js-dust-3" cx="158" cy="140" r="1.7" />
      </g>

      <text x="160" y="188" textAnchor="middle" fill="#bae6fd" fontSize="8.2" fontWeight="700" letterSpacing="0.3">
        Zacharias Janssen · Microscopio compuesto de doble lente (1590–1608)
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. ROBERT HOOKE (1665)
   Observación de corteza de corcho: celdas poliédricas ("células")
   ══════════════════════════════════════════════════════════════════════════ */
export function HookeCorkGraphic2D({ className }: GraphicProps) {
  const hex = (cx: number, cy: number, r = 11) => {
    const points: string[] = [];
    for (let i = 0; i < 6; i += 1) {
      const angle = (Math.PI / 180) * (60 * i - 30);
      points.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    return points.join(' ');
  };
  const cells: Array<[number, number, boolean]> = [
    [118, 52, false], [141, 52, false], [164, 52, false], [187, 52, false], [210, 52, false],
    [107, 72, false], [130, 72, false], [153, 72, true], [176, 72, false], [199, 72, false], [222, 72, false],
    [118, 92, false], [141, 92, false], [164, 92, false], [187, 92, false], [210, 92, false],
    [107, 112, false], [130, 112, false], [153, 112, false], [176, 112, false], [199, 112, false], [222, 112, false],
    [118, 132, false], [141, 132, false], [164, 132, false], [187, 132, false], [210, 132, false],
    [130, 151, false], [153, 151, false], [176, 151, false], [199, 151, false]
  ];

  return (
    <svg
      {...SVG_PROPS}
      className={className ?? 'h-full w-full'}
      role="img"
      aria-label="Celdas de corcho observadas por Robert Hooke en Micrographia 1665"
    >
      <defs>
        <linearGradient id="hk-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#04231a" />
          <stop offset="0.6" stopColor="#03150f" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="hk-field" cx="50%" cy="48%" r="52%">
          <stop stopColor="#065f46" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#022c22" stopOpacity="0.85" />
          <stop offset="1" stopColor="#01120d" />
        </radialGradient>
        <linearGradient id="hk-cell" x1="0" y1="0" x2="0.4" y2="1">
          <stop stopColor="#34d399" stopOpacity="0.85" />
          <stop offset="0.55" stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="1" stopColor="#065f46" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="hk-hero" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a7f3d0" />
          <stop offset="0.5" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <radialGradient id="hk-vignette" cx="50%" cy="50%" r="50%">
          <stop stopColor="#000000" stopOpacity="0" />
          <stop offset="0.72" stopColor="#000000" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.75" />
        </radialGradient>
        <filter id="hk-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="hk-fieldClip">
          <circle cx="160" cy="98" r="82" />
        </clipPath>
        <style>
          {`
            @keyframes hkScan {
              0% { transform: translateY(0); opacity: 0; }
              12% { opacity: 0.85; }
              88% { opacity: 0.85; }
              100% { transform: translateY(160px); opacity: 0; }
            }
            @keyframes hkPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.07); opacity: 1; }
            }
            @keyframes hkRing {
              to { transform: rotate(360deg); }
            }
            @keyframes hkTwinkle {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.9; }
            }
            .hk-scan { animation: hkScan 5.5s ease-in-out infinite; }
            .hk-hero { animation: hkPulse 3.2s ease-in-out infinite; transform-origin: 153px 72px; }
            .hk-ring { animation: hkRing 24s linear infinite; transform-origin: 160px 98px; }
            .hk-tw { animation: hkTwinkle 3s ease-in-out infinite; }
            .hk-tw-2 { animation-delay: 1.1s; }
            .hk-tw-3 { animation-delay: 2.2s; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#hk-bg)" />

      {/* Campo circular del microscopio */}
      <circle cx="160" cy="98" r="84" fill="url(#hk-field)" />
      <g clipPath="url(#hk-fieldClip)">
        {/* Panal de corcho */}
        <g stroke="#065f46" strokeWidth="1.4">
          {cells.map(([cx, cy, hero], i) =>
            hero ? null : (
              <polygon key={i} points={hex(cx, cy)} fill="url(#hk-cell)" opacity={0.55 + ((i % 4) * 0.1)} />
            )
          )}
        </g>

        {/* Célula protagonista */}
        <g className="hk-hero" filter="url(#hk-glow)">
          <polygon points={hex(153, 72, 14)} fill="url(#hk-hero)" stroke="#d1fae5" strokeWidth="2.2" />
          <text x="153" y="70" textAnchor="middle" fill="#022c22" fontSize="7" fontWeight="900">CELL</text>
          <text x="153" y="77.5" textAnchor="middle" fill="#064e3b" fontSize="5.4" fontWeight="800">celdilla</text>
        </g>

        {/* Línea de barrido */}
        <g className="hk-scan">
          <rect x="70" y="14" width="180" height="18" fill="#34d399" opacity="0.14" />
          <line x1="72" y1="14" x2="248" y2="14" stroke="#a7f3d0" strokeWidth="1.4" opacity="0.9" />
        </g>

        <circle cx="160" cy="98" r="84" fill="url(#hk-vignette)" />
      </g>

      {/* Aro del ocular */}
      <circle cx="160" cy="98" r="82" fill="none" stroke="#10b981" strokeWidth="2.6" />
      <circle cx="160" cy="98" r="87" fill="none" stroke="#34d399" strokeOpacity="0.5" strokeWidth="1" />
      <g className="hk-ring">
        <circle cx="160" cy="98" r="93" fill="none" stroke="#6ee7b7" strokeWidth="1.6" strokeDasharray="2 14" strokeLinecap="round" opacity="0.8" />
        <circle cx="160" cy="6" r="2" fill="#a7f3d0" />
        <circle cx="252" cy="98" r="1.6" fill="#a7f3d0" />
      </g>

      {/* Etiquetas flotantes */}
      <g>
        <line x1="163" y1="64" x2="238" y2="44" stroke="#34d399" strokeWidth="1.1" strokeDasharray="3 3" />
        <circle cx="163" cy="64" r="2" fill="#a7f3d0" />
        <rect x="216" y="30" width="94" height="14" rx="4" fill="#022c22" stroke="#10b981" strokeOpacity="0.8" />
        <text x="263" y="39.5" textAnchor="middle" fill="#d1fae5" fontSize="7.2" fontWeight="800">«CÉLULAS DE CORCHO»</text>

        <line x1="107" y1="122" x2="62" y2="152" stroke="#fbbf24" strokeWidth="1.1" strokeDasharray="3 3" />
        <circle cx="107" cy="122" r="2" fill="#fde68a" />
        <rect x="10" y="146" width="82" height="14" rx="4" fill="#3f2a08" stroke="#fbbf24" strokeOpacity="0.8" />
        <text x="51" y="155.5" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="800">PARED MUERTA</text>
      </g>

      <g fill="#a7f3d0" filter="url(#hk-glow)">
        <circle className="hk-tw" cx="18" cy="52" r="1.5" />
        <circle className="hk-tw hk-tw-2" cx="300" cy="66" r="1.3" />
        <circle className="hk-tw hk-tw-3" cx="288" cy="168" r="1.4" />
      </g>

      <text x="160" y="194" textAnchor="middle" fill="#a7f3d0" fontSize="8.2" fontWeight="700" letterSpacing="0.3">
        Robert Hooke · Micrographia (1665) · Acuñó el término «célula»
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. ANTON VAN LEEUWENHOEK (1674)
   Gota de agua y diminutos «animálculos» vivos en movimiento
   ══════════════════════════════════════════════════════════════════════════ */
export function LeeuwenhoekAnimalculesGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      {...SVG_PROPS}
      className={className ?? 'h-full w-full'}
      role="img"
      aria-label="Animálculos microscópicos observados por Anton van Leeuwenhoek en 1674"
    >
      <defs>
        <linearGradient id="lw-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#042a33" />
          <stop offset="0.6" stopColor="#03181f" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="lw-drop" cx="42%" cy="36%" r="62%">
          <stop stopColor="#67e8f9" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#0891b2" stopOpacity="0.7" />
          <stop offset="0.85" stopColor="#0e7490" stopOpacity="0.9" />
          <stop offset="1" stopColor="#083344" />
        </radialGradient>
        <linearGradient id="lw-paramecium" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#a5f3fc" />
          <stop offset="0.55" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="lw-brass" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#d97706" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>
        <filter id="lw-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="lw-dropClip">
          <circle cx="170" cy="98" r="76" />
        </clipPath>
        <style>
          {`
            @keyframes lwSwimA {
              0% { transform: translate(0px, 0px) rotate(0deg); }
              25% { transform: translate(16px, -9px) rotate(5deg); }
              50% { transform: translate(30px, 5px) rotate(-4deg); }
              75% { transform: translate(12px, 13px) rotate(6deg); }
              100% { transform: translate(0px, 0px) rotate(0deg); }
            }
            @keyframes lwSwimB {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              50% { transform: translate(-22px, 11px) rotate(-10deg); }
            }
            @keyframes lwSwimC {
              0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
              33% { transform: translate(10px, -12px) rotate(8deg); }
              66% { transform: translate(-8px, -4px) rotate(-6deg); }
            }
            @keyframes lwCilia {
              0%, 100% { opacity: 0.35; transform: scale(1); }
              50% { opacity: 0.95; transform: scale(1.08); }
            }
            @keyframes lwRipple {
              0% { transform: scale(0.7); opacity: 0.5; }
              100% { transform: scale(1.25); opacity: 0; }
            }
            @keyframes lwBubble {
              0% { transform: translateY(6px); opacity: 0; }
              25% { opacity: 0.8; }
              100% { transform: translateY(-40px); opacity: 0; }
            }
            @keyframes lwBeam {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.75; }
            }
            .lw-swim-a { animation: lwSwimA 7s ease-in-out infinite; }
            .lw-swim-b { animation: lwSwimB 5.4s ease-in-out infinite; }
            .lw-swim-c { animation: lwSwimC 6.4s ease-in-out infinite; }
            .lw-cilia { animation: lwCilia 1.4s ease-in-out infinite; transform-origin: 130px 68px; }
            .lw-ripple { animation: lwRipple 4s ease-out infinite; transform-origin: 170px 98px; }
            .lw-ripple-2 { animation-delay: 2s; }
            .lw-bubble { animation: lwBubble 4.6s linear infinite; }
            .lw-bubble-2 { animation-delay: 1.5s; }
            .lw-bubble-3 { animation-delay: 3s; }
            .lw-beam { animation: lwBeam 3.6s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#lw-bg)" />

      {/* Haz de luz de la lente */}
      <g className="lw-beam">
        <path d="M44 86 L120 96 L120 106 L44 120 Z" fill="#22d3ee" opacity="0.16" />
      </g>

      {/* Gota de agua */}
      <circle cx="170" cy="98" r="78" fill="#0e7490" opacity="0.25" />
      <circle cx="170" cy="98" r="76" fill="url(#lw-drop)" stroke="#22d3ee" strokeWidth="2.2" />
      <g clipPath="url(#lw-dropClip)">
        <g fill="none" stroke="#a5f3fc" strokeWidth="1" opacity="0.35">
          <circle className="lw-ripple" cx="170" cy="98" r="40" />
          <circle className="lw-ripple lw-ripple-2" cx="170" cy="98" r="40" />
        </g>

        {/* Paramecio */}
        <g className="lw-swim-a" filter="url(#lw-glow)">
          <ellipse cx="130" cy="68" rx="25" ry="12.5" fill="url(#lw-paramecium)" transform="rotate(-14 126 66)" />
          <ellipse className="lw-cilia" cx="130" cy="68" rx="28" ry="15.5" fill="none" stroke="#cffafe" strokeWidth="1" strokeDasharray="1.4 2.4" transform="rotate(-14 126 66)" />
          <circle cx="122" cy="66" r="4.4" fill="#f0fdff" opacity="0.9" />
          <circle cx="137" cy="70" r="3.2" fill="#083344" opacity="0.8" />
          
        </g>

        {/* Espirilo */}
        <g className="lw-swim-b" filter="url(#lw-glow)">
          <path d="M198 122q7-6 14 0t14 0t14 0" stroke="#fde68a" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <circle cx="198" cy="122" r="2.4" fill="#facc15" />
          <circle cx="240" cy="122" r="2.4" fill="#facc15" />
          
        </g>

        {/* Flagelado */}
        <g className="lw-swim-c" filter="url(#lw-glow)">
          <path d="M150 128c9 0 14 8 5 14-7 5-13-5-5-14Z" fill="#34d399" stroke="#a7f3d0" strokeWidth="1.2" />
          <circle cx="152" cy="135" r="1.8" fill="#064e3b" />
          <path d="M155 142q-8 10-18 12t-14 10" stroke="#86efac" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.9" />
          
        </g>

        {/* Bacilos */}
        <g opacity="0.85">
          <ellipse cx="214" cy="64" rx="9" ry="6" fill="#c4b5fd" stroke="#e9d5ff" strokeWidth="1" />
          <circle cx="211" cy="62" r="1.4" fill="#4c1d95" />
          <circle cx="217" cy="66" r="1.2" fill="#4c1d95" />
        </g>
        <g fill="#fb7185" opacity="0.85">
          <rect x="176" y="56" width="7" height="3" rx="1.5" transform="rotate(32 176 56)" />
          <rect x="204" y="78" width="7.5" height="3" rx="1.5" transform="rotate(-38 204 78)" />
          <rect x="140" y="152" width="6" height="2.6" rx="1.3" transform="rotate(14 140 152)" />
        </g>

        {/* Burbujas */}
        <g fill="#cffafe">
          <circle className="lw-bubble" cx="136" cy="112" r="3" opacity="0.5" />
          <circle className="lw-bubble lw-bubble-2" cx="210" cy="128" r="3.6" opacity="0.45" />
          <circle className="lw-bubble lw-bubble-3" cx="192" cy="94" r="2.4" opacity="0.55" />
        </g>

        {/* Reflejo superior */}
        <path d="M112 46c22-12 72-14 104 2-26-9-74-9-104-2Z" fill="#ffffff" opacity="0.3" />
      </g>
      <circle cx="170" cy="98" r="76" fill="none" stroke="#a5f3fc" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 5" />

      {/* Microscopio de Leeuwenhoek */}
      <g transform="translate(14 44) scale(0.8)">
        <rect x="0" y="0" width="24" height="60" rx="5" fill="url(#lw-brass)" stroke="#fbbf24" strokeWidth="1.2" />
        <rect x="4" y="4" width="6" height="52" rx="3" fill="#fef3c7" opacity="0.35" />
        <circle cx="12" cy="20" r="4" fill="#7dd3fc" stroke="#ffffff" strokeWidth="1" filter="url(#lw-glow)" />
        <line x1="12" y1="34" x2="32" y2="28" stroke="#fbbf24" strokeWidth="1.6" />
        <circle cx="32" cy="28" r="2.2" fill="#f59e0b" />
        <text x="12" y="74" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="800">LENTE</text>
      </g>

      {/* Etiquetas de los animálculos */}
      <g>
        <path d="M84 42 L126 64" stroke="#67e8f9" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.8" />
        <rect x="6" y="33" width="78" height="13" rx="4" fill="#083344" stroke="#22d3ee" strokeOpacity="0.7" />
        <text x="45" y="42.4" textAnchor="middle" fill="#cffafe" fontSize="6.4" fontWeight="800">ANIMÁLCULO</text>

        <path d="M240 103 L224 118" stroke="#facc15" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.8" />
        <rect x="238" y="94" width="62" height="13" rx="4" fill="#3f2a08" stroke="#facc15" strokeOpacity="0.7" />
        <text x="269" y="103.4" textAnchor="middle" fill="#fef08a" fontSize="6.4" fontWeight="800">ESPIRILO</text>

        <path d="M80 148 L148 140" stroke="#86efac" strokeWidth="0.9" strokeDasharray="3 3" opacity="0.8" />
        <rect x="6" y="141" width="68" height="13" rx="4" fill="#052e16" stroke="#4ade80" strokeOpacity="0.7" />
        <text x="40" y="150.4" textAnchor="middle" fill="#bbf7d0" fontSize="6.4" fontWeight="800">FLAGELADO</text>
      </g>

      <text x="170" y="194" textAnchor="middle" fill="#a5f3fc" fontSize="8.2" fontWeight="700" letterSpacing="0.3">
        Anton van Leeuwenhoek (1674) · Primero en ver bacterias y protozoos vivos
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. MATTHIAS SCHLEIDEN & THEODOR SCHWANN (1838 - 1839)
   Unión de reinos: Plantas y Animales construidos por células
   ══════════════════════════════════════════════════════════════════════════ */
export function SchleidenSchwannGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      {...SVG_PROPS}
      className={className ?? 'h-full w-full'}
      role="img"
      aria-label="Célula vegetal y animal unificadas en la teoría celular por Schleiden y Schwann"
    >
      <defs>
        <linearGradient id="ss-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#1b1032" />
          <stop offset="0.55" stopColor="#120c22" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="ss-plant" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#166534" />
          <stop offset="0.6" stopColor="#065f46" />
          <stop offset="1" stopColor="#022c22" />
        </linearGradient>
        <radialGradient id="ss-animal" cx="42%" cy="36%" r="68%">
          <stop stopColor="#be185d" />
          <stop offset="0.7" stopColor="#831843" />
          <stop offset="1" stopColor="#4c0519" />
        </radialGradient>
        <linearGradient id="ss-bridge" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#22c55e" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="ss-vacuole" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7dd3fc" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0369a1" stopOpacity="0.85" />
        </linearGradient>
        <filter id="ss-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @keyframes ssFlow {
              to { stroke-dashoffset: -60; }
            }
            @keyframes ssSway {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-3px) rotate(3deg); }
            }
            @keyframes ssMedallion {
              0%, 100% { transform: scale(1); opacity: 0.92; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes ssPulseCell {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.03); }
            }
            .ss-flow { stroke-dasharray: 5 6; animation: ssFlow 3s linear infinite; }
            .ss-sway { animation: ssSway 3.4s ease-in-out infinite; transform-origin: 76px 66px; }
            .ss-medallion { animation: ssMedallion 3.2s ease-in-out infinite; transform-origin: 160px 100px; }
            .ss-plant { animation: ssPulseCell 5s ease-in-out infinite; transform-origin: 78px 100px; }
            .ss-animal { animation: ssPulseCell 4.4s ease-in-out infinite; transform-origin: 242px 100px; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#ss-bg)" />

      {/* Célula vegetal */}
      <g className="ss-plant">
        <polygon
          points="42,52 112,44 132,100 112,154 42,148 22,100"
          fill="url(#ss-plant)"
          stroke="#22c55e"
          strokeWidth="3"
        />
        <polygon
          points="47,57 108,50 126,100 108,148 47,143 28,100"
          fill="none"
          stroke="#86efac"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <ellipse cx="76" cy="98" rx="27" ry="23" fill="url(#ss-vacuole)" stroke="#38bdf8" strokeWidth="1.2" />
        <text x="76" y="101" textAnchor="middle" fill="#e0f2fe" fontSize="6.8" fontWeight="800">VACUOLA</text>

        <g className="ss-sway">
          <ellipse cx="48" cy="70" rx="8" ry="4.6" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(24 48 70)" />
          <ellipse cx="103" cy="70" rx="7.5" ry="4.4" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(-20 103 70)" />
          <ellipse cx="56" cy="130" rx="7.5" ry="4.4" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(12 56 130)" />
        </g>

        <circle cx="104" cy="124" r="9.5" fill="#7c3aed" stroke="#c084fc" strokeWidth="1.2" />
        <circle cx="104" cy="124" r="3.4" fill="#fbcfe8" />

        <rect x="26" y="22" width="104" height="15" rx="5" fill="#052e16" stroke="#22c55e" strokeOpacity="0.85" />
        <text x="78" y="32" textAnchor="middle" fill="#86efac" fontSize="7.6" fontWeight="800">SCHLEIDEN · PLANTAS</text>
      </g>

      {/* Célula animal */}
      <g className="ss-animal">
        <circle cx="242" cy="100" r="55" fill="url(#ss-animal)" stroke="#f43f5e" strokeWidth="2.8" />
        <circle cx="242" cy="100" r="48" fill="none" stroke="#fda4af" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="242" cy="100" r="17" fill="#581c87" stroke="#c084fc" strokeWidth="1.6" />
        <circle cx="242" cy="100" r="6" fill="#f472b6" />
        <text x="242" y="126" textAnchor="middle" fill="#fbcfe8" fontSize="6.8" fontWeight="800">NÚCLEO</text>

        <g>
          <ellipse cx="212" cy="74" rx="8.5" ry="5" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(30 212 74)" />
          <ellipse cx="270" cy="78" rx="7.5" ry="4.6" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(-34 270 78)" />
          <ellipse cx="220" cy="128" rx="8.5" ry="5" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(-18 220 128)" />
        </g>

        <g fill="#facc15">
          <rect x="258" y="124" width="4.5" height="9" rx="1.4" />
          <rect x="265" y="126.5" width="9" height="4.5" rx="1.4" />
        </g>

        <rect x="192" y="22" width="104" height="15" rx="5" fill="#4c0519" stroke="#f43f5e" strokeOpacity="0.85" />
        <text x="244" y="32" textAnchor="middle" fill="#fbcfe8" fontSize="7.6" fontWeight="800">SCHWANN · ANIMALES</text>
      </g>

      {/* Puente de unificación */}
      <g filter="url(#ss-glow)">
        <path className="ss-flow" d="M132 100C146 72 176 72 190 100" stroke="url(#ss-bridge)" strokeWidth="3" fill="none" />
        <path className="ss-flow" d="M132 100C146 128 176 128 190 100" stroke="url(#ss-bridge)" strokeWidth="3" fill="none" />

        <circle r="3.4" fill="#fef08a">
          <animateMotion dur="3.4s" repeatCount="indefinite" path="M132 100C146 72 176 72 190 100" />
        </circle>
        <circle r="3" fill="#86efac">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="0.9s" path="M190 100C176 128 146 128 132 100" />
        </circle>

        <g className="ss-medallion">
          <circle cx="160" cy="100" r="18" fill="#1e1b4b" stroke="#facc15" strokeWidth="2" />
          <circle cx="160" cy="100" r="22" fill="none" stroke="#facc15" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 4" />
          <text x="160" y="98.5" textAnchor="middle" fill="#fde047" fontSize="7.6" fontWeight="900">1.er</text>
          <text x="160" y="107.5" textAnchor="middle" fill="#ffffff" fontSize="4.6" fontWeight="800" letterSpacing="0.3">POSTULADO</text>
        </g>
      </g>

      <text x="160" y="194" textAnchor="middle" fill="#ddd6fe" fontSize="8.2" fontWeight="700" letterSpacing="0.3">
        1838–1839 · Todos los seres vivos estamos formados por células
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5. RUDOLF VIRCHOW (1855)
   «Omnis cellula e cellula»: Bipartición celular y continuidad genética
   ══════════════════════════════════════════════════════════════════════════ */
export function VirchowDivisionGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      {...SVG_PROPS}
      className={className ?? 'h-full w-full'}
      role="img"
      aria-label="División celular mitótica demostrada por Rudolf Virchow en 1855"
    >
      <defs>
        <linearGradient id="vc-bg" x1="0" y1="0" x2="320" y2="200">
          <stop stopColor="#2b1a06" />
          <stop offset="0.55" stopColor="#1a1005" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="vc-left" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f59e0b" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#b45309" stopOpacity="0.85" />
          <stop offset="1" stopColor="#78350f" opacity="0.9" />
        </linearGradient>
        <linearGradient id="vc-right" x1="1" y1="0" x2="0" y2="1">
          <stop stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="0.6" stopColor="#b45309" stopOpacity="0.85" />
          <stop offset="1" stopColor="#78350f" opacity="0.9" />
        </linearGradient>
        <linearGradient id="vc-dna" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <filter id="vc-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>
          {`
            @keyframes vcPinch {
              0%, 8% { transform: scaleX(1); }
              55% { transform: scaleX(0.9); }
              100% { transform: scaleX(1); }
            }
            @keyframes vcSepLeft {
              0%, 20% { transform: translateX(0px); }
              60% { transform: translateX(-9px); }
              100% { transform: translateX(0px); }
            }
            @keyframes vcSepRight {
              0%, 20% { transform: translateX(0px); }
              60% { transform: translateX(9px); }
              100% { transform: translateX(0px); }
            }
            @keyframes vcChromo {
              0%, 100% { opacity: 0.75; }
              50% { opacity: 1; }
            }
            @keyframes vcArrow {
              0%, 100% { transform: translateX(0px); opacity: 0.7; }
              50% { transform: translateX(4px); opacity: 1; }
            }
            @keyframes vcTwinkle {
              0%, 100% { opacity: 0.15; transform: scale(0.8); }
              50% { opacity: 0.95; transform: scale(1.2); }
            }
            .vc-pinch { animation: vcPinch 6s ease-in-out infinite; transform-origin: 160px 100px; }
            .vc-left { animation: vcSepLeft 6s ease-in-out infinite; }
            .vc-right { animation: vcSepRight 6s ease-in-out infinite; }
            .vc-chromo { animation: vcChromo 2.6s ease-in-out infinite; }
            .vc-arrow { animation: vcArrow 1.8s ease-in-out infinite; }
            .vc-tw { animation: vcTwinkle 2.8s ease-in-out infinite; }
            .vc-tw-2 { animation-delay: 0.9s; }
            .vc-tw-3 { animation-delay: 1.8s; }
          `}
        </style>
      </defs>

      <rect width="320" height="200" fill="url(#vc-bg)" />
      <g opacity="0.1" stroke="#f59e0b" strokeWidth="0.8">
        <line x1="0" y1="100" x2="320" y2="100" strokeDasharray="5 5" />
        <line x1="160" y1="20" x2="160" y2="180" strokeDasharray="5 5" />
      </g>

      {/* Célula en división */}
      <g className="vc-pinch">
        <path
          d="M160 46C118 46 78 60 78 100s40 54 82 54c6-16 6-92 0-108Z"
          fill="url(#vc-left)"
          stroke="#fbbf24"
          strokeWidth="2.4"
        />
        <path
          d="M160 46c42 0 82 14 82 54s-40 54-82 54c-6-16-6-92 0-108Z"
          fill="url(#vc-right)"
          stroke="#fbbf24"
          strokeWidth="2.4"
        />
        <path d="M160 46c6 16 6 92 0 108" stroke="#7c2d12" strokeWidth="2" opacity="0.55" />
        <g stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" filter="url(#vc-glow)">
          <line x1="160" y1="52" x2="160" y2="70" />
          <line x1="160" y1="130" x2="160" y2="148" />
        </g>
      </g>

      {/* Célula hija A */}
      <g className="vc-left">
        <g stroke="#fef08a" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2">
          <line x1="88" y1="100" x2="118" y2="82" />
          <line x1="88" y1="100" x2="120" y2="100" />
          <line x1="88" y1="100" x2="118" y2="118" />
        </g>
        <circle cx="88" cy="100" r="3.6" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
        <g className="vc-chromo">
          <path d="M105 80l8 8M113 80l-8 8" stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M108 96l8 8M116 96l-8 8" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M105 112l8 8M113 112l-8 8" stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" />
        </g>
        <circle cx="109" cy="100" r="22" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 3" />
        <text x="112" y="66" textAnchor="middle" fill="#fef08a" fontSize="7.2" fontWeight="800">CÉLULA A</text>
      </g>

      {/* Célula hija B */}
      <g className="vc-right">
        <g stroke="#fef08a" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2">
          <line x1="232" y1="100" x2="202" y2="82" />
          <line x1="232" y1="100" x2="200" y2="100" />
          <line x1="232" y1="100" x2="202" y2="118" />
        </g>
        <circle cx="232" cy="100" r="3.6" fill="#facc15" stroke="#ffffff" strokeWidth="1" />
        <g className="vc-chromo">
          <path d="M209 80l8 8M217 80l-8 8" stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M206 96l8 8M214 96l-8 8" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M209 112l8 8M217 112l-8 8" stroke="#fb7185" strokeWidth="2.8" strokeLinecap="round" />
        </g>
        <circle cx="211" cy="100" r="22" stroke="#fbbf24" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="4 3" />
        <text x="208" y="66" textAnchor="middle" fill="#fef08a" fontSize="7.2" fontWeight="800">CÉLULA B</text>
      </g>

      {/* Flechas de separación */}
      <g className="vc-arrow" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M70 100H54M60 94L54 100L60 106" />
        <path d="M250 100H266M260 94L266 100L260 106" />
      </g>

      {/* Lema */}
      <g filter="url(#vc-glow)">
        <rect x="72" y="20" width="176" height="19" rx="7" fill="#451a03" stroke="#f59e0b" strokeWidth="1.3" />
        <text x="160" y="33" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" letterSpacing="0.9">
          «OMNIS CELLULA E CELLULA»
        </text>
      </g>

      <text x="160" y="104" textAnchor="middle" fill="#fda4af" fontSize="6.4" fontWeight="800">SURCO DE DIVISIÓN</text>
      <text x="160" y="194" textAnchor="middle" fill="#fde68a" fontSize="8.2" fontWeight="700" letterSpacing="0.3">
        Rudolf Virchow (1855) · Toda célula procede de otra célula
      </text>

      <g fill="#fde68a" filter="url(#vc-glow)">
        <circle className="vc-tw" cx="14" cy="52" r="1.4" />
        <circle className="vc-tw vc-tw-2" cx="306" cy="60" r="1.3" />
        <circle className="vc-tw vc-tw-3" cx="298" cy="172" r="1.2" />
      </g>
    </svg>
  );
}
