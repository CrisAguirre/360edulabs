interface GraphicProps {
  className?: string;
}

/* ══════════════════════════════════════════════════════════════════════════
   1. ZACHARIAS JANSSEN (Principios siglo XVII)
   El primer microscopio compuesto: alineación de 2 lentes en un tubo
   ══════════════════════════════════════════════════════════════════════════ */
export function JanssenMicroscopeGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className ?? 'w-full h-auto max-h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Esquema óptico del primer microscopio compuesto de Zacharias Janssen"
    >
      <defs>
        {/* Gradiente de latón dorado para el tubo */}
        <linearGradient id="brassGrad" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#78350f" />
          <stop offset="0.3" stopColor="#d97706" />
          <stop offset="0.6" stopColor="#fbbf24" />
          <stop offset="0.9" stopColor="#b45309" />
          <stop offset="1" stopColor="#78350f" />
        </linearGradient>

        {/* Gradiente de lente ocular de vidrio */}
        <linearGradient id="lensGlass" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#e0f2fe" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0284c7" stopOpacity="0.85" />
        </linearGradient>

        {/* Gradiente del haz de luz */}
        <linearGradient id="lightRayGrad" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#38bdf8" stopOpacity="0.95" />
        </linearGradient>

        {/* Filtro de resplandor */}
        <filter id="janssenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes lightPulse {
              0%, 100% { opacity: 0.55; stroke-width: 1.5; }
              50% { opacity: 0.95; stroke-width: 2.5; }
            }
            @keyframes sparkFloat {
              0% { transform: translateY(0) scale(1); opacity: 0.4; }
              50% { transform: translateY(-4px) scale(1.3); opacity: 0.9; }
              100% { transform: translateY(0) scale(1); opacity: 0.4; }
            }
            @keyframes tubeSlide {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(4px); }
            }
            .animate-light-pulse {
              animation: lightPulse 2.4s ease-in-out infinite;
            }
            .animate-spark {
              animation: sparkFloat 2s ease-in-out infinite;
            }
            .animate-slide {
              animation: tubeSlide 4s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Fondo de tarjeta científica */}
      <rect x="6" y="6" width="308" height="188" rx="16" fill="#09131d" stroke="#0284c7" strokeWidth="1.2" />

      {/* Rejilla óptica de fondo */}
      <g opacity="0.12" stroke="#38bdf8" strokeWidth="0.75">
        <line x1="20" y1="100" x2="300" y2="100" strokeDasharray="4 4" />
        <line x1="60" y1="20" x2="60" y2="180" strokeDasharray="3 3" />
        <line x1="160" y1="20" x2="160" y2="180" strokeDasharray="3 3" />
        <line x1="255" y1="20" x2="255" y2="180" strokeDasharray="3 3" />
      </g>

      {/* Haz óptico de luz refractada en forma de cono doble */}
      <g className="animate-light-pulse" filter="url(#janssenGlow)">
        {/* Rayo superior desde el ocular cruzando al foco medio y abriéndose al objetivo */}
        <polygon
          points="60,65 160,100 255,55 255,145 160,100 60,135"
          fill="url(#lightRayGrad)"
          opacity="0.35"
        />
        {/* Líneas guía centrales de los rayos */}
        <line x1="30" y1="100" x2="295" y2="100" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="6 3" />
        <path d="M60 65 L160 100 L255 145" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M60 135 L160 100 L255 55" stroke="#38bdf8" strokeWidth="1.5" />
      </g>

      {/* Tubo corredizo exterior de latón */}
      <g>
        {/* Cilindro soporte base */}
        <rect x="40" y="48" width="80" height="104" rx="8" fill="url(#brassGrad)" stroke="#f59e0b" strokeWidth="1.2" />
        <rect x="44" y="52" width="72" height="96" rx="6" fill="#1c1917" opacity="0.6" />
        
        {/* Cilindro interior deslizante */}
        <g className="animate-slide">
          <rect x="110" y="56" width="105" height="88" rx="6" fill="url(#brassGrad)" stroke="#fbbf24" strokeWidth="1" />
          <rect x="114" y="60" width="97" height="80" rx="4" fill="#292524" opacity="0.6" />
          {/* Marcas de medición en el tubo corredizo */}
          <line x1="130" y1="62" x2="130" y2="72" stroke="#fef08a" strokeWidth="1.2" />
          <line x1="150" y1="62" x2="150" y2="72" stroke="#fef08a" strokeWidth="1.2" />
          <line x1="170" y1="62" x2="170" y2="72" stroke="#fef08a" strokeWidth="1.2" />
          <line x1="190" y1="62" x2="190" y2="72" stroke="#fef08a" strokeWidth="1.2" />
        </g>

        {/* Cilindro de objetivo delantero */}
        <rect x="235" y="44" width="40" height="112" rx="6" fill="url(#brassGrad)" stroke="#f59e0b" strokeWidth="1.2" />
      </g>

      {/* Lente 1: Ocular biconvexa (izquierda) */}
      <g>
        <path
          d="M60 55 C68 75 68 125 60 145 C52 125 52 75 60 55 Z"
          fill="url(#lensGlass)"
          stroke="#e0f2fe"
          strokeWidth="1.5"
          filter="url(#janssenGlow)"
        />
        <text x="60" y="40" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">
          Lente Ocular
        </text>
        <text x="60" y="165" textAnchor="middle" fill="#94a3b8" fontSize="7.5">
          (Aumento 1)
        </text>
      </g>

      {/* Foco óptico intermedio con chispas */}
      <g className="animate-spark" filter="url(#janssenGlow)">
        <circle cx="160" cy="100" r="4.5" fill="#fef08a" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="160" cy="100" r="9" fill="#facc15" opacity="0.3" />
        <text x="160" y="125" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">
          Foco conjugado
        </text>
      </g>

      {/* Lente 2: Objetivo biconvexa (derecha) */}
      <g>
        <path
          d="M255 48 C266 70 266 130 255 152 C244 130 244 70 255 48 Z"
          fill="url(#lensGlass)"
          stroke="#e0f2fe"
          strokeWidth="1.5"
          filter="url(#janssenGlow)"
        />
        <text x="255" y="36" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">
          Lente Objetivo
        </text>
        <text x="255" y="170" textAnchor="middle" fill="#94a3b8" fontSize="7.5">
          (Ampliación final)
        </text>
      </g>

      {/* Muestra iluminada en el extremo derecho */}
      <g>
        <rect x="290" y="80" width="4" height="40" rx="2" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
        <circle cx="292" cy="100" r="7" fill="#38bdf8" opacity="0.4" />
        <text x="292" y="74" textAnchor="middle" fill="#86efac" fontSize="7" fontWeight="bold">
          Muestra
        </text>
      </g>

      {/* Insignia conmemorativa inferior */}
      <rect x="18" y="174" width="284" height="15" rx="5" fill="#0369a1" fillOpacity="0.25" />
      <text x="160" y="185" textAnchor="middle" fill="#bae6fd" fontSize="8" fontWeight="600">
        Zacharias Janssen · Primer microscopio compuesto de doble lente (aprox. 1590 - 1608)
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. ROBERT HOOKE (1665)
   Observación de corteza de corcho: celdas poliédricas ("células")
   ══════════════════════════════════════════════════════════════════════════ */
export function HookeCorkGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className ?? 'w-full h-auto max-h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Celdas de corcho observadas por Robert Hooke en Micrographia 1665"
    >
      <defs>
        <radialGradient id="hookeLensGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#064e3b" stopOpacity="0.4" />
          <stop offset="0.75" stopColor="#022c22" stopOpacity="0.95" />
          <stop offset="1" stopColor="#011812" />
        </radialGradient>

        <linearGradient id="cellGlowGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#10b981" />
          <stop offset="0.5" stopColor="#34d399" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>

        <filter id="hookeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes scanLine {
              0% { transform: translateY(0); opacity: 0; }
              20% { opacity: 0.8; }
              80% { opacity: 0.8; }
              100% { transform: translateY(140px); opacity: 0; }
            }
            @keyframes pulseCell {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px #34d399); }
              50% { transform: scale(1.04); filter: drop-shadow(0 0 10px #10b981); }
            }
            .animate-scan {
              animation: scanLine 3.6s ease-in-out infinite;
            }
            .animate-cell-pulse {
              transform-origin: 160px 100px;
              animation: pulseCell 2.8s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Marco de visor microscópico */}
      <rect x="6" y="6" width="308" height="188" rx="16" fill="#051b14" stroke="#059669" strokeWidth="1.2" />

      {/* Retículo circular de microscopio de época de Hooke */}
      <circle cx="160" cy="100" r="82" fill="url(#hookeLensGrad)" stroke="#10b981" strokeWidth="2.5" />
      <circle cx="160" cy="100" r="86" stroke="#34d399" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />

      {/* Graduaciones de aumento del ocular circular */}
      <g stroke="#34d399" strokeWidth="1" opacity="0.7">
        <line x1="160" y1="14" x2="160" y2="24" />
        <line x1="160" y1="176" x2="160" y2="186" />
        <line x1="74" y1="100" x2="84" y2="100" />
        <line x1="236" y1="100" x2="246" y2="100" />
      </g>

      {/* Panal de celdas de corcho (sección vegetal suberosa poliédrica) */}
      <g stroke="#15803d" strokeWidth="1.6" fill="#064e3b" fillOpacity="0.45">
        {/* Fila 1 */}
        <polygon points="110,40 130,40 140,54 130,68 110,68 100,54" />
        <polygon points="145,40 165,40 175,54 165,68 145,68 135,54" />
        <polygon points="180,40 200,40 210,54 200,68 180,68 170,54" />

        {/* Fila 2 */}
        <polygon points="92,57 112,57 122,71 112,85 92,85 82,71" />
        <polygon points="127,57 147,57 157,71 147,85 127,85 117,71" />
        <polygon points="163,57 183,57 193,71 183,85 163,85 153,71" />
        <polygon points="198,57 218,57 228,71 218,85 198,85 188,71" />

        {/* Fila 3 - Celda central protagonista */}
        <polygon points="110,74 130,74 140,88 130,102 110,102 100,88" />
        <polygon points="180,74 200,74 210,88 200,102 180,102 170,88" />

        {/* Fila 4 */}
        <polygon points="92,91 112,91 122,105 112,119 92,119 82,105" />
        <polygon points="127,91 147,91 157,105 147,119 127,119 117,105" />
        <polygon points="163,91 163,91 193,105 183,119 163,119 153,105" />
        <polygon points="198,91 218,91 228,105 218,119 198,119 188,105" />

        {/* Fila 5 */}
        <polygon points="110,108 130,108 140,122 130,136 110,136 100,122" />
        <polygon points="145,108 165,108 175,122 165,136 145,136 135,122" />
        <polygon points="180,108 200,108 210,122 200,136 180,136 170,122" />

        {/* Fila 6 */}
        <polygon points="127,125 147,125 157,139 147,153 127,153 117,139" />
        <polygon points="163,125 183,125 193,139 183,153 163,153 153,139" />
      </g>

      {/* Celda central bautizada «Célula» (Hooke) con animación de pulso */}
      <g className="animate-cell-pulse">
        <polygon
          points="145,74 165,74 175,88 165,102 145,102 135,88"
          fill="url(#cellGlowGrad)"
          stroke="#6ee7b7"
          strokeWidth="2.4"
          filter="url(#hookeGlow)"
        />
        <text x="155" y="91" textAnchor="middle" fill="#022c22" fontSize="7.5" fontWeight="900">
          CELL
        </text>
        <text x="155" y="99" textAnchor="middle" fill="#042f2e" fontSize="6.5" fontWeight="bold">
          (Celdilla)
        </text>
      </g>

      {/* Línea animada de barrido de microscopía */}
      <g className="animate-scan">
        <line x1="90" y1="30" x2="230" y2="30" stroke="#a7f3d0" strokeWidth="1.5" opacity="0.8" />
        <polygon points="90,30 230,30 220,38 100,38" fill="#34d399" opacity="0.15" />
      </g>

      {/* Callouts y etiquetas históricas */}
      <g>
        {/* Puntero a la celda */}
        <line x1="175" y1="88" x2="270" y2="60" stroke="#34d399" strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="270" cy="60" r="3" fill="#10b981" />
        <rect x="235" y="44" width="75" height="15" rx="4" fill="#065f46" stroke="#34d399" strokeWidth="0.8" />
        <text x="272" y="54" textAnchor="middle" fill="#d1fae5" fontSize="7" fontWeight="bold">
          «Células de corcho»
        </text>

        {/* Puntero a pared muerta */}
        <line x1="110" y1="136" x2="45" y2="150" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="45" cy="150" r="2.5" fill="#f59e0b" />
        <rect x="14" y="142" width="75" height="15" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="0.8" />
        <text x="51" y="152" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold">
          Pared vegetal suberina
        </text>
      </g>

      {/* Insignia inferior */}
      <rect x="18" y="174" width="284" height="15" rx="5" fill="#047857" fillOpacity="0.25" />
      <text x="160" y="185" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="600">
        Robert Hooke · Micrographia (1665) · Acuñó el término «célula» al ver panales en corcho
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
      viewBox="0 0 320 200"
      className={className ?? 'w-full h-auto max-h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animálculos microscópicos observados por Anton van Leeuwenhoek en 1674"
    >
      <defs>
        {/* Gradiente acuático profundo */}
        <radialGradient id="waterDropGrad" cx="50%" cy="45%" r="55%">
          <stop stopColor="#0891b2" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#0e7490" stopOpacity="0.95" />
          <stop offset="0.9" stopColor="#155e75" />
          <stop offset="1" stopColor="#083344" />
        </radialGradient>

        {/* Gradiente de microorganismo */}
        <linearGradient id="microbeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#67e8f9" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>

        <filter id="leeuwenGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes swimParamecium {
              0% { transform: translate(0, 0) rotate(0deg); }
              25% { transform: translate(14px, -8px) rotate(6deg); }
              50% { transform: translate(26px, 4px) rotate(-4deg); }
              75% { transform: translate(12px, 12px) rotate(8deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
            @keyframes wiggleSpirillum {
              0% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(-15px, 8px) rotate(-12deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
            @keyframes whipFlagellum {
              0%, 100% { d: path("M150 135 Q140 148 132 152 T120 162"); }
              50% { d: path("M150 135 Q158 145 146 155 T138 165"); }
            }
            @keyframes bubbleRise {
              0% { transform: translateY(0) scale(0.9); opacity: 0.3; }
              50% { opacity: 0.7; }
              100% { transform: translateY(-28px) scale(1.1); opacity: 0.1; }
            }
            .animate-swim-param {
              animation: swimParamecium 6s ease-in-out infinite;
            }
            .animate-wiggle-spirillum {
              animation: wiggleSpirillum 4s ease-in-out infinite;
            }
            .animate-bubble-1 {
              animation: bubbleRise 3.5s ease-in-out infinite;
            }
            .animate-bubble-2 {
              animation: bubbleRise 4.2s ease-in-out infinite 1.2s;
            }
          `}
        </style>
      </defs>

      {/* Marco contenedor */}
      <rect x="6" y="6" width="308" height="188" rx="16" fill="#041d24" stroke="#0891b2" strokeWidth="1.2" />

      {/* Gota de agua estancada bajo la lente de Leeuwenhoek */}
      <circle cx="160" cy="100" r="82" fill="url(#waterDropGrad)" stroke="#22d3ee" strokeWidth="2.5" />
      <circle cx="160" cy="100" r="80" stroke="#a5f3fc" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

      {/* Reflejos de tensión superficial de la gota de agua */}
      <path
        d="M100 45 C125 32 180 32 215 48 C185 40 135 40 100 45 Z"
        fill="#ffffff"
        opacity="0.35"
      />

      {/* Burbujitas microscópicas flotando */}
      <g>
        <circle cx="120" cy="120" r="3.5" fill="#cffafe" opacity="0.5" className="animate-bubble-1" />
        <circle cx="205" cy="135" r="4" fill="#cffafe" opacity="0.4" className="animate-bubble-2" />
        <circle cx="180" cy="70" r="2.5" fill="#cffafe" opacity="0.6" className="animate-bubble-1" />
      </g>

      {/* ── Microorganismo 1: Paramecio / Ciliado en movimiento ── */}
      <g className="animate-swim-param" filter="url(#leeuwenGlow)">
        {/* Cuerpo del animálculo ciliado */}
        <ellipse cx="140" cy="85" rx="26" ry="13" fill="url(#microbeGrad)" stroke="#a5f3fc" strokeWidth="1.2" transform="rotate(-15 140 85)" />
        {/* Cilios periféricos batiéndose */}
        <g stroke="#67e8f9" strokeWidth="1" strokeDasharray="1.5 2">
          <ellipse cx="140" cy="85" rx="29" ry="16" fill="none" transform="rotate(-15 140 85)" />
        </g>
        {/* Vacuola contráctil y núcleo */}
        <circle cx="132" cy="83" r="4.5" fill="#ffffff" opacity="0.9" />
        <circle cx="148" cy="87" r="3.5" fill="#083344" opacity="0.8" />
        <text x="140" y="80" textAnchor="middle" fill="#083344" fontSize="6.5" fontWeight="900">
          Animálculo
        </text>
      </g>

      {/* ── Microorganismo 2: Espirilo / Bacteria espiral ── */}
      <g className="animate-wiggle-spirillum" filter="url(#leeuwenGlow)">
        <path
          d="M185 115 Q192 110 200 115 T215 115 T230 115"
          stroke="#fef08a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="185" cy="115" r="2.5" fill="#facc15" />
        <circle cx="230" cy="115" r="2.5" fill="#facc15" />
        <text x="208" y="106" textAnchor="middle" fill="#fef08a" fontSize="6.5" fontWeight="bold">
          Espirilo
        </text>
      </g>

      {/* ── Microorganismo 3: Flagelado con látigo móvil ── */}
      <g filter="url(#leeuwenGlow)">
        {/* Cuerpo elíptico */}
        <path
          d="M145 125 C155 125 160 135 150 142 C142 148 135 135 145 125 Z"
          fill="#34d399"
          stroke="#a7f3d0"
          strokeWidth="1.2"
        />
        <circle cx="147" cy="133" r="2" fill="#064e3b" />
        {/* Flagelo ondulante animado */}
        <path
          d="M150 142 Q140 155 130 158 T118 168"
          stroke="#86efac"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <text x="175" y="140" textAnchor="start" fill="#86efac" fontSize="6.5" fontWeight="bold">
          Flagelado
        </text>
      </g>

      {/* Micro-bacilos flotando en el agua */}
      <g fill="#f43f5e" opacity="0.8">
        <rect x="110" y="60" width="7" height="3" rx="1.5" transform="rotate(30 110 60)" />
        <rect x="195" y="65" width="8" height="3" rx="1.5" transform="rotate(-40 195 65)" />
        <rect x="125" y="145" width="6" height="2.5" rx="1.2" transform="rotate(15 125 145)" />
      </g>

      {/* Mini microscopio de Leeuwenhoek (lente en paleta de latón) a la izquierda */}
      <g transform="translate(18, 40) scale(0.75)">
        <rect x="0" y="0" width="22" height="55" rx="4" fill="#b45309" stroke="#fbbf24" strokeWidth="1.2" />
        <circle cx="11" cy="18" r="3.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" filter="url(#leeuwenGlow)" />
        <line x1="11" y1="30" x2="28" y2="24" stroke="#fbbf24" strokeWidth="1.5" />
        <circle cx="28" cy="24" r="2" fill="#f59e0b" />
        <text x="11" y="70" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="bold">
          Lente
        </text>
      </g>

      {/* Insignia inferior */}
      <rect x="18" y="174" width="284" height="15" rx="5" fill="#0e7490" fillOpacity="0.25" />
      <text x="160" y="185" textAnchor="middle" fill="#a5f3fc" fontSize="8" fontWeight="600">
        Anton van Leeuwenhoek (1674) · Primer ser humano en observar bacterias y protozoos vivos
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
      viewBox="0 0 320 200"
      className={className ?? 'w-full h-auto max-h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Célula vegetal y animal unificadas en la teoría celular por Schleiden y Schwann"
    >
      <defs>
        <linearGradient id="plantCellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#14532d" />
          <stop offset="0.6" stopColor="#15803d" />
          <stop offset="1" stopColor="#052e16" />
        </linearGradient>

        <radialGradient id="animalCellGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#831843" />
          <stop offset="0.7" stopColor="#9d174d" />
          <stop offset="1" stopColor="#500724" />
        </radialGradient>

        <linearGradient id="bridgeEnergy" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#22c55e" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>

        <filter id="unisonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes bridgePulse {
              0%, 100% { stroke-dashoffset: 0; opacity: 0.6; }
              50% { stroke-dashoffset: -20; opacity: 1; }
            }
            @keyframes chloroSway {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
            .animate-bridge {
              stroke-dasharray: 6 4;
              animation: bridgePulse 3s linear infinite;
            }
            .animate-sway {
              animation: chloroSway 2.5s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Marco contenedor */}
      <rect x="6" y="6" width="308" height="188" rx="16" fill="#150d1e" stroke="#8b5cf6" strokeWidth="1.2" />

      {/* ── LADO IZQUIERDO: CÉLULA VEGETAL (SCHLEIDEN - BOTÁNICA) ── */}
      <g>
        {/* Pared celular rígida poligonal */}
        <polygon
          points="40,50 115,44 135,100 115,152 40,146 22,100"
          fill="url(#plantCellGrad)"
          stroke="#22c55e"
          strokeWidth="2.5"
        />
        {/* Gran vacuola central vegetal */}
        <ellipse cx="78" cy="98" rx="28" ry="24" fill="#0284c7" fillOpacity="0.75" stroke="#38bdf8" strokeWidth="1.2" />
        <text x="78" y="101" textAnchor="middle" fill="#e0f2fe" fontSize="7" fontWeight="bold">
          Vacuola
        </text>

        {/* Cloroplastos con clorofila */}
        <g className="animate-sway">
          <ellipse cx="50" cy="70" rx="8" ry="5" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(25 50 70)" />
          <ellipse cx="105" cy="72" rx="8" ry="5" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(-20 105 72)" />
          <ellipse cx="60" cy="130" rx="8" ry="5" fill="#4ade80" stroke="#16a34a" strokeWidth="1" transform="rotate(10 60 130)" />
        </g>

        {/* Núcleo vegetal lateral */}
        <circle cx="106" cy="124" r="9" fill="#7c3aed" stroke="#c084fc" strokeWidth="1" />
        <circle cx="106" cy="124" r="3.5" fill="#fbcfe8" />

        {/* Etiqueta botánica */}
        <rect x="30" y="24" width="95" height="15" rx="4" fill="#052e16" stroke="#22c55e" strokeWidth="1" />
        <text x="77" y="34" textAnchor="middle" fill="#86efac" fontSize="7.5" fontWeight="bold">
          🌿 Schleiden · Plantas
        </text>
      </g>

      {/* ── PUENTE DE UNIFICACIÓN TEÓRICA CENTRAL ── */}
      <g filter="url(#unisonGlow)">
        {/* Rayos de conexión universal */}
        <path
          d="M135 100 C150 75 170 75 185 100"
          stroke="url(#bridgeEnergy)"
          strokeWidth="3"
          fill="none"
          className="animate-bridge"
        />
        <path
          d="M135 100 C150 125 170 125 185 100"
          stroke="url(#bridgeEnergy)"
          strokeWidth="3"
          fill="none"
          className="animate-bridge"
        />
        {/* Esfera central del postulado */}
        <circle cx="160" cy="100" r="14" fill="#1e1b4b" stroke="#facc15" strokeWidth="2" />
        <text x="160" y="98" textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="900">
          1.er
        </text>
        <text x="160" y="107" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold">
          Postulado
        </text>
      </g>

      {/* ── LADO DERECHO: CÉLULA ANIMAL (SCHWANN - ZOOLOGÍA) ── */}
      <g>
        {/* Membrana celular flexible esférica */}
        <circle
          cx="242" cy="100" r="54"
          fill="url(#animalCellGrad)"
          stroke="#f43f5e"
          strokeWidth="2.5"
        />

        {/* Núcleo animal central prominente */}
        <circle cx="242" cy="100" r="17" fill="#581c87" stroke="#c084fc" strokeWidth="1.5" />
        <circle cx="242" cy="100" r="6" fill="#f472b6" />
        <text x="242" y="124" textAnchor="middle" fill="#fbcfe8" fontSize="6.5" fontWeight="bold">
          Núcleo
        </text>

        {/* Mitocondrias productoras de energía */}
        <g>
          <ellipse cx="212" cy="74" rx="9" ry="5.5" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(30 212 74)" />
          <ellipse cx="270" cy="78" rx="8" ry="5" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(-35 270 78)" />
          <ellipse cx="220" cy="128" rx="9" ry="5.5" fill="#f97316" stroke="#fbbf24" strokeWidth="1" transform="rotate(-20 220 128)" />
        </g>

        {/* Centríolos animales */}
        <rect x="256" y="122" width="5" height="10" rx="1.5" fill="#facc15" />
        <rect x="263" y="125" width="10" height="5" rx="1.5" fill="#facc15" />

        {/* Etiqueta zoológica */}
        <rect x="195" y="24" width="95" height="15" rx="4" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
        <text x="242" y="34" textAnchor="middle" fill="#fbcfe8" fontSize="7.5" fontWeight="bold">
          🐾 Schwann · Animales
        </text>
      </g>

      {/* Insignia inferior */}
      <rect x="18" y="174" width="284" height="15" rx="5" fill="#6d28d9" fillOpacity="0.25" />
      <text x="160" y="185" textAnchor="middle" fill="#ddd6fe" fontSize="8" fontWeight="600">
        1838–1839 · Todos los seres vivos están formados por una o más células
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
      viewBox="0 0 320 200"
      className={className ?? 'w-full h-auto max-h-56'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="División celular mitótica demostrada por Rudolf Virchow en 1855"
    >
      <defs>
        <radialGradient id="divCellGrad1" cx="40%" cy="50%" r="50%">
          <stop stopColor="#b45309" />
          <stop offset="0.7" stopColor="#78350f" />
          <stop offset="1" stopColor="#451a03" />
        </radialGradient>

        <radialGradient id="divCellGrad2" cx="60%" cy="50%" r="50%">
          <stop stopColor="#b45309" />
          <stop offset="0.7" stopColor="#78350f" />
          <stop offset="1" stopColor="#451a03" />
        </radialGradient>

        <linearGradient id="dnaGlow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#f59e0b" />
          <stop offset="0.5" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>

        <filter id="virchowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes pinchFurrow {
              0%, 100% { transform: scaleY(1); }
              50% { transform: scaleY(0.92); }
            }
            @keyframes chromoGlow {
              0%, 100% { opacity: 0.7; filter: drop-shadow(0 0 3px #f59e0b); }
              50% { opacity: 1; filter: drop-shadow(0 0 8px #f43f5e); }
            }
            @keyframes arrowShift {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(3px); }
            }
            .animate-pinch {
              transform-origin: 160px 100px;
              animation: pinchFurrow 3s ease-in-out infinite;
            }
            .animate-chromo {
              animation: chromoGlow 2.2s ease-in-out infinite;
            }
            .animate-arrow {
              animation: arrowShift 1.5s ease-in-out infinite;
            }
          `}
        </style>
      </defs>

      {/* Marco contenedor */}
      <rect x="6" y="6" width="308" height="188" rx="16" fill="#1a1005" stroke="#f59e0b" strokeWidth="1.2" />

      {/* ── CÉLULA EN BIPARTICIÓN / CITOCINESIS (FIGURA EN 8) ── */}
      <g className="animate-pinch">
        {/* Membrana celular estrangulándose en el centro (surco de clivaje) */}
        <path
          d="M160 48 C120 48 80 60 80 100 C80 140 120 152 160 152 C166 138 166 112 160 100 C166 88 166 62 160 48 Z"
          fill="url(#divCellGrad1)"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />
        <path
          d="M160 48 C200 48 240 60 240 100 C240 140 200 152 160 152 C154 138 154 112 160 100 C154 88 154 62 160 48 Z"
          fill="url(#divCellGrad2)"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        {/* Anillo contráctil de actina/miosina en el ecuador */}
        <g stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" filter="url(#virchowGlow)">
          <line x1="160" y1="48" x2="160" y2="70" />
          <line x1="160" y1="130" x2="160" y2="152" />
        </g>
      </g>

      {/* ── HUSO ACROMÁTICO Y CROMOSOMAS (LADO IZQUIERDO: HIJA 1) ── */}
      <g>
        {/* Microtúbulos del huso acromático */}
        <g stroke="#fef08a" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2">
          <line x1="90" y1="100" x2="120" y2="82" />
          <line x1="90" y1="100" x2="122" y2="100" />
          <line x1="90" y1="100" x2="120" y2="118" />
        </g>
        {/* Centrosoma / Polo */}
        <circle cx="90" cy="100" r="3.5" fill="#facc15" stroke="#ffffff" strokeWidth="1" />

        {/* Cromosomas condensados migrando al polo izquierdo */}
        <g className="animate-chromo">
          {/* Cromosoma 1 (forma en X o V) */}
          <path d="M115 80 L123 88 M123 80 L115 88" stroke="#f43f5e" strokeWidth="2.8" strokeLinecap="round" />
          {/* Cromosoma 2 */}
          <path d="M118 96 L126 104 M126 96 L118 104" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" />
          {/* Cromosoma 3 */}
          <path d="M115 112 L123 120 M123 112 L115 120" stroke="#f43f5e" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* Futuro núcleo hija 1 */}
        <circle cx="118" cy="100" r="22" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x="118" y="68" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">
          Célula Hija A
        </text>
      </g>

      {/* ── HUSO ACROMÁTICO Y CROMOSOMAS (LADO DERECHO: HIJA 2) ── */}
      <g>
        {/* Microtúbulos del huso acromático */}
        <g stroke="#fef08a" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2">
          <line x1="230" y1="100" x2="200" y2="82" />
          <line x1="230" y1="100" x2="198" y2="100" />
          <line x1="230" y1="100" x2="200" y2="118" />
        </g>
        {/* Centrosoma / Polo */}
        <circle cx="230" cy="100" r="3.5" fill="#facc15" stroke="#ffffff" strokeWidth="1" />

        {/* Cromosomas idénticos migrando al polo derecho */}
        <g className="animate-chromo">
          {/* Cromosoma 1 */}
          <path d="M197 80 L205 88 M205 80 L197 88" stroke="#f43f5e" strokeWidth="2.8" strokeLinecap="round" />
          {/* Cromosoma 2 */}
          <path d="M194 96 L202 104 M202 96 L194 104" stroke="#ec4899" strokeWidth="2.8" strokeLinecap="round" />
          {/* Cromosoma 3 */}
          <path d="M197 112 L205 120 M205 112 L197 120" stroke="#f43f5e" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* Futuro núcleo hija 2 */}
        <circle cx="202" cy="100" r="22" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x="202" y="68" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">
          Célula Hija B
        </text>
      </g>

      {/* Flechas indicadoras de separación celular */}
      <g className="animate-arrow" stroke="#facc15" strokeWidth="1.5">
        <path d="M72 100 L58 100 M64 94 L58 100 L64 106" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M248 100 L262 100 M256 94 L262 100 L256 106" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Lema histórico en latín de Virchow */}
      <g filter="url(#virchowGlow)">
        <rect x="75" y="22" width="170" height="18" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1.2" />
        <text x="160" y="34" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="900" letterSpacing="0.8">
          «OMNIS CELLULA E CELLULA»
        </text>
      </g>

      {/* Indicador de surco de división */}
      <text x="160" y="103" textAnchor="middle" fill="#fda4af" fontSize="6.5" fontWeight="bold">
        Surco
      </text>

      {/* Insignia inferior */}
      <rect x="18" y="174" width="284" height="15" rx="5" fill="#78350f" fillOpacity="0.25" />
      <text x="160" y="185" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="600">
        Rudolf Virchow (1855) · Toda célula procede de otra preexistente por división biológica
      </text>
    </svg>
  );
}
