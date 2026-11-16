interface GraphicProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/* ══════════════════════════════════════════════════════════════════════════
   GRÁFICOS 2D CÉLULA VEGETAL
   ══════════════════════════════════════════════════════════════════════════ */

/** 1. Pared Celular de Celulosa: Lámina media, pared primaria y microfibrillas */
export function CellWallGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wallLamella" x1="0" y1="0" x2="240" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#92400e" />
          <stop offset="0.5" stopColor="#b45309" />
          <stop offset="1" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="wallCellulose" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d97706" stopOpacity="0.8" />
          <stop offset="1" stopColor="#78350f" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Fondo de placa vegetal */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#18120c" stroke="#b45309" strokeWidth="1.5" />

      {/* Capa externa: Lámina media de pectina */}
      <rect x="20" y="22" width="200" height="18" rx="6" fill="url(#wallLamella)" opacity="0.9" />
      <text x="120" y="34" textAnchor="middle" fill="#fef3c7" fontSize="8.5" fontWeight="bold">
        Lámina media (Pectina cementante)
      </text>

      {/* Pared primaria con microfibrillas entrecruzadas */}
      <rect x="20" y="46" width="200" height="46" rx="8" fill="url(#wallCellulose)" />
      
      {/* Red de microfibrillas de celulosa */}
      <path d="M26 56 H214 M26 68 H214 M26 80 H214" stroke="#fde68a" strokeWidth="1.2" strokeDasharray="5 3" />
      <path d="M45 48 L75 90 M95 48 L125 90 M145 48 L175 90 M195 48 L210 70" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />
      <path d="M75 48 L45 90 M125 48 L95 90 M175 48 L145 90" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
      <text x="120" y="72" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
        Microfibrillas de celulosa (Resistencia mecánica)
      </text>

      {/* Canales de plasmodesmos */}
      <g>
        <rect x="52" y="44" width="14" height="50" rx="3" fill="#059669" stroke="#34d399" strokeWidth="1" />
        <line x1="59" y1="44" x2="59" y2="94" stroke="#a7f3d0" strokeWidth="1.5" />
        <rect x="174" y="44" width="14" height="50" rx="3" fill="#059669" stroke="#34d399" strokeWidth="1" />
        <line x1="181" y1="44" x2="181" y2="94" stroke="#a7f3d0" strokeWidth="1.5" />
      </g>

      {/* Membrana plasmática interior */}
      <rect x="20" y="98" width="200" height="12" rx="4" fill="#7c3aed" opacity="0.8" />
      <text x="120" y="107" textAnchor="middle" fill="#ede9fe" fontSize="8" fontWeight="600">
        Membrana plasmática subyacente
      </text>

      {/* Etiquetas indicadoras inferiores */}
      <text x="59" y="126" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontWeight="bold">
        Plasmodesmo (Canal)
      </text>
      <text x="181" y="126" textAnchor="middle" fill="#6ee7b7" fontSize="7.5" fontWeight="bold">
        Comunicación celular
      </text>
    </svg>
  );
}

/** 2. Cloroplasto con Clorofila: Doble membrana, tilacoides, granas y estroma */
export function ChloroplastGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="chloroGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#15803d" stopOpacity="0.9" />
          <stop offset="0.8" stopColor="#14532d" stopOpacity="0.95" />
          <stop offset="1" stopColor="#052e16" />
        </radialGradient>
        <linearGradient id="granaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#86efac" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
      </defs>

      {/* Caja contenedor */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#042111" stroke="#22c55e" strokeWidth="1.5" />

      {/* Doble membrana elipsoidal del cloroplasto */}
      <ellipse cx="120" cy="74" rx="98" ry="52" fill="url(#chloroGrad)" stroke="#4ade80" strokeWidth="2.5" />
      <ellipse cx="120" cy="74" rx="92" ry="47" stroke="#86efac" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

      {/* Rayos solares entrando */}
      <path d="M22 20 L55 45" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 14 L65 35" stroke="#fde047" strokeWidth="1.5" strokeLinecap="round" />
      <text x="32" y="44" fill="#fef08a" fontSize="7.5" fontWeight="bold">Luz solar (hν)</text>

      {/* Granas (Pilas de tilacoides) */}
      {/* Grana izquierda */}
      <g>
        <ellipse cx="68" cy="62" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="68" cy="68" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="68" cy="74" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="68" cy="80" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="68" cy="86" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
      </g>

      {/* Grana central */}
      <g>
        <ellipse cx="120" cy="58" rx="16" ry="4.5" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="120" cy="65" rx="16" ry="4.5" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="120" cy="72" rx="16" ry="4.5" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="120" cy="79" rx="16" ry="4.5" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="120" cy="86" rx="16" ry="4.5" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
      </g>

      {/* Grana derecha */}
      <g>
        <ellipse cx="172" cy="62" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="172" cy="68" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="172" cy="74" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="172" cy="80" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
        <ellipse cx="172" cy="86" rx="14" ry="4" fill="url(#granaGrad)" stroke="#166534" strokeWidth="0.8" />
      </g>

      {/* Lamelas estromáticas que conectan las granas */}
      <path d="M82 74 Q100 70 104 72" stroke="#4ade80" strokeWidth="1.5" />
      <path d="M136 76 Q150 78 158 74" stroke="#4ade80" strokeWidth="1.5" />

      {/* Rótulos anatómicos */}
      <text x="120" y="44" textAnchor="middle" fill="#bbf7d0" fontSize="8" fontWeight="bold">
        Estroma (Fase oscura / Glucosa)
      </text>
      <text x="68" y="103" textAnchor="middle" fill="#dcfce7" fontSize="7.5" fontWeight="bold">
        Grana (Tilacoides)
      </text>
      <text x="172" y="103" textAnchor="middle" fill="#fef08a" fontSize="7.5" fontWeight="bold">
        Clorofila activa
      </text>

      {/* Producto de salida */}
      <text x="120" y="126" textAnchor="middle" fill="#4ade80" fontSize="8.5" fontWeight="extrabold">
        Fotosíntesis: 6CO₂ + 6H₂O + Luz → C₆H₁₂O₆ + 6O₂
      </text>
    </svg>
  );
}

/** 3. Gran Vacuola Central: Tonoplasto, presión de turgencia y reserva acuosa */
export function CentralVacuoleGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="vacuoleWater" cx="45%" cy="45%" r="55%">
          <stop stopColor="#38bdf8" stopOpacity="0.85" />
          <stop offset="0.6" stopColor="#0284c7" stopOpacity="0.8" />
          <stop offset="1" stopColor="#0369a1" stopOpacity="0.95" />
        </radialGradient>
      </defs>

      {/* Contenedor vegetal */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#041a24" stroke="#0ea5e9" strokeWidth="1.5" />

      {/* Pared vegetal rígida poligonal */}
      <polygon points="24,18 216,18 226,132 14,132" fill="#1e293b" stroke="#b45309" strokeWidth="2.5" />

      {/* Citoplasma periférico comprimido */}
      <polygon points="27,21 213,21 222,129 17,129" fill="#065f46" opacity="0.6" />

      {/* Gran Vacuola Central (Ocupa hasta el 90% del volumen) */}
      <ellipse cx="120" cy="75" rx="82" ry="46" fill="url(#vacuoleWater)" stroke="#7dd3fc" strokeWidth="2.5" />

      {/* Flechas de Presión Hidrostática de Turgencia (empujan hacia afuera) */}
      <g stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round">
        <path d="M120 45 L120 28 M116 32 L120 27 L124 32" />
        <path d="M120 105 L120 122 M116 118 L120 123 L124 118" />
        <path d="M55 75 L38 75 M42 71 L37 75 L42 79" />
        <path d="M185 75 L202 75 M198 71 L203 75 L198 79" />
      </g>

      {/* Burbujas y solutos dentro de la vacuola */}
      <circle cx="85" cy="65" r="4" fill="#bae6fd" opacity="0.7" />
      <circle cx="150" cy="85" r="5" fill="#bae6fd" opacity="0.6" />
      <circle cx="105" cy="90" r="3" fill="#bae6fd" opacity="0.5" />
      <circle cx="160" cy="60" r="3.5" fill="#bae6fd" opacity="0.6" />

      {/* Núcleo arrinconado contra la pared por la vacuola */}
      <circle cx="192" cy="40" r="13" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="192" cy="40" r="4" fill="#1e3a8a" />
      <text x="192" y="58" textAnchor="middle" fill="#93c5fd" fontSize="6.5" fontWeight="bold">
        Núcleo periférico
      </text>

      {/* Textos y etiquetas */}
      <text x="120" y="68" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="extrabold">
        Gran Vacuola Central
      </text>
      <text x="120" y="81" textAnchor="middle" fill="#e0f2fe" fontSize="8" fontWeight="bold">
        Tonoplasto + Jugo celular acuoso
      </text>
      <text x="120" y="94" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="extrabold">
        Presión de Turgencia (Firmeza vegetal)
      </text>
    </svg>
  );
}

/** 4. Membrana Plasmática: Bicapa lipídica, proteínas integrales y transporte */
export function PlasmaMembraneGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Fondo */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#140b24" stroke="#a78bfa" strokeWidth="1.5" />

      {/* Espacio extracelular */}
      <text x="120" y="24" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontWeight="bold">
        Medio Extracelular (Fluido externo)
      </text>

      {/* Bicapa Lipídica Superior: Cabezas polares y colas */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 24 + i * 14.5;
        // Saltear espacio de la proteína
        if (i >= 6 && i <= 8) return null;
        return (
          <g key={`head-top-${i}`}>
            <circle cx={x} cy="42" r="5" fill="#a78bfa" stroke="#c4b5fd" strokeWidth="1" />
            <line x1={x - 1.5} y1="47" x2={x - 1.5} y2="65" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
            <line x1={x + 1.5} y1="47" x2={x + 1.5} y2="65" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );
      })}

      {/* Bicapa Lipídica Inferior */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 24 + i * 14.5;
        if (i >= 6 && i <= 8) return null;
        return (
          <g key={`head-bot-${i}`}>
            <circle cx={x} cy="92" r="5" fill="#a78bfa" stroke="#c4b5fd" strokeWidth="1" />
            <line x1={x - 1.5} y1="87" x2={x - 1.5} y2="69" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
            <line x1={x + 1.5} y1="87" x2={x + 1.5} y2="69" stroke="#f472b6" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        );
      })}

      {/* Proteína Integral Canal de Transporte */}
      <path
        d="M104 36 C104 32, 136 32, 136 36 L134 98 C134 102, 106 102, 106 98 Z"
        fill="#0284c7"
        stroke="#38bdf8"
        strokeWidth="1.5"
      />
      {/* Canal poro central */}
      <path d="M116 34 L116 100 M124 34 L124 100" stroke="#bae6fd" strokeWidth="1" strokeDasharray="3 2" />

      {/* Flecha de paso de moléculas a través del canal */}
      <path d="M120 28 L120 106 M116 102 L120 107 L124 102" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />

      {/* Moléculas en transporte */}
      <circle cx="120" cy="22" r="3" fill="#fde047" />
      <circle cx="120" cy="55" r="3" fill="#fde047" />
      <circle cx="120" cy="115" r="3" fill="#fde047" />

      {/* Cadenas glicolipídicas (receptores tipo antena) */}
      <path d="M53 37 Q58 26 50 18 M58 26 Q64 20 60 14" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="18" r="2" fill="#6ee7b7" />
      <circle cx="60" cy="14" r="2" fill="#6ee7b7" />
      <text x="75" y="18" fill="#6ee7b7" fontSize="7" fontWeight="bold">Glicocálix</text>

      {/* Espacio intracelular / Citoplasma */}
      <text x="120" y="132" textAnchor="middle" fill="#818cf8" fontSize="8" fontWeight="bold">
        Citoplasma Intracelular · Control de Entrada y Salida (Bicapa Lipídica)
      </text>
    </svg>
  );
}

/** 5. Núcleo Celular: Carioteca doble, poros nucleares, nucleolo y cromatina */
export function NucleusGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#3b82f6" />
          <stop offset="0.7" stopColor="#1e40af" />
          <stop offset="1" stopColor="#0f172a" />
        </radialGradient>
      </defs>

      {/* Contenedor */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#091124" stroke="#3b82f6" strokeWidth="1.5" />

      {/* Envoltura nuclear esférica */}
      <circle cx="120" cy="74" r="54" fill="url(#nucGrad)" stroke="#60a5fa" strokeWidth="2.5" />

      {/* Poros nucleares marcados alrededor */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 120 + 54 * Math.cos(rad);
        const cy = 74 + 54 * Math.sin(rad);
        return <circle key={angle} cx={cx} cy={cy} r="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />;
      })}

      {/* Hebras de Cromatina (ADN desenrollado) */}
      <path
        d="M85 65 Q95 50 110 65 T135 60 T155 70 T145 90 T115 85 T95 90 Z"
        stroke="#93c5fd"
        strokeWidth="1.8"
        strokeDasharray="4 2"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M92 78 Q105 88 125 78 T140 85 T130 98"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
        opacity="0.7"
      />

      {/* Nucleolo denso central */}
      <circle cx="120" cy="74" r="18" fill="#1e3a8a" stroke="#93c5fd" strokeWidth="1.5" />
      <circle cx="120" cy="74" r="14" fill="#172554" />
      <text x="120" y="77" textAnchor="middle" fill="#dbeafe" fontSize="7.5" fontWeight="extrabold">
        Nucleolo
      </text>

      {/* Rótulos */}
      <text x="120" y="22" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
        Poros Nucleares (Intercambio de ARN y proteínas)
      </text>
      <text x="120" y="118" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">
        Carioteca + Cromatina (Instrucciones genéticas de ADN)
      </text>
      <text x="120" y="132" textAnchor="middle" fill="#60a5fa" fontSize="8.5" fontWeight="extrabold">
        Centro de Control Celular Maestro
      </text>
    </svg>
  );
}

/** 6. Mitocondria: Crestas, matriz, membrana interna y síntesis de ATP */
export function MitochondriaGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mitoGrad" cx="50%" cy="50%" r="50%">
          <stop stopColor="#c2410c" />
          <stop offset="0.8" stopColor="#9a3412" />
          <stop offset="1" stopColor="#431407" />
        </radialGradient>
      </defs>

      {/* Contenedor */}
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#1f0d05" stroke="#fb923c" strokeWidth="1.5" />

      {/* Membrana Externa Lisa */}
      <ellipse cx="120" cy="74" rx="92" ry="46" fill="url(#mitoGrad)" stroke="#fb923c" strokeWidth="2.5" />

      {/* Crestas Mitocondriales Plegadas (Membrana Interna) */}
      <path
        d="M48 74 Q62 60 72 74 Q82 88 92 74 Q102 60 112 74 Q122 88 132 74 Q142 60 152 74 Q162 88 172 74 Q182 60 192 74"
        stroke="#fed7aa"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 62 L75 74 M88 86 L100 74 M115 62 L128 74 M142 86 L154 74 M168 62 L180 74"
        stroke="#fdba74"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Partículas de ATP Sintasa (Chispas de energía) */}
      <g fill="#fde047">
        <circle cx="70" cy="66" r="2.5" />
        <circle cx="95" cy="80" r="2.5" />
        <circle cx="125" cy="66" r="2.5" />
        <circle cx="150" cy="80" r="2.5" />
        <circle cx="175" cy="66" r="2.5" />
      </g>

      {/* Rótulo de ATP */}
      <g>
        <rect x="100" y="20" width="40" height="16" rx="5" fill="#eab308" />
        <text x="120" y="31" textAnchor="middle" fill="#000000" fontSize="8.5" fontWeight="extrabold">
          ⚡ ATP
        </text>
      </g>

      {/* Textos explicativos */}
      <text x="120" y="112" textAnchor="middle" fill="#fed7aa" fontSize="8" fontWeight="bold">
        Crestas mitocondriales + Matriz con ADN propio
      </text>
      <text x="120" y="128" textAnchor="middle" fill="#f97316" fontSize="8.5" fontWeight="extrabold">
        Respiración Celular: Glucosa + O₂ → ATP + CO₂ + H₂O
      </text>
    </svg>
  );
}

/** 7. Citoplasma y Citoesqueleto: Microtúbulos, microfilamentos y corrientes de ciclosis */
export function CytoplasmGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#04201e" stroke="#58e6c5" strokeWidth="1.5" />

      {/* Matriz coloidal de Citosol */}
      <rect x="20" y="20" width="200" height="110" rx="10" fill="#064e43" opacity="0.6" />

      {/* Microtúbulos (Cilindros gruesos) */}
      <line x1="30" y1="40" x2="210" y2="48" stroke="#5eead4" strokeWidth="3" strokeDasharray="8 3" />
      <line x1="35" y1="110" x2="205" y2="102" stroke="#5eead4" strokeWidth="3" strokeDasharray="8 3" />
      <line x1="45" y1="35" x2="70" y2="115" stroke="#2dd4bf" strokeWidth="2.5" />
      <line x1="170" y1="35" x2="195" y2="115" stroke="#2dd4bf" strokeWidth="2.5" />

      {/* Microfilamentos de actina (red fina) */}
      <path
        d="M30 75 Q60 55 90 75 T150 75 T210 75"
        stroke="#99f6e4"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M30 85 Q75 100 120 85 T210 85"
        stroke="#14b8a6"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Corrientes citoplasmáticas de Ciclosis (flechas en remolino) */}
      <path
        d="M100 65 A 25 18 0 1 1 140 85"
        stroke="#fde047"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <polygon points="144,83 140,89 135,84" fill="#fde047" />

      {/* Organelos flotando suspendidos en la red */}
      <circle cx="85" cy="55" r="5" fill="#f97316" />
      <circle cx="155" cy="58" r="4" fill="#38bdf8" />
      <circle cx="140" cy="95" r="5.5" fill="#84cc16" />
      <circle cx="75" cy="95" r="4.5" fill="#a855f7" />

      <text x="120" y="32" textAnchor="middle" fill="#99f6e4" fontSize="8" fontWeight="bold">
        Red de Citoesqueleto: Microtúbulos y Microfilamentos
      </text>
      <text x="120" y="126" textAnchor="middle" fill="#5eead4" fontSize="8.5" fontWeight="extrabold">
        Citosol y Corrientes de Ciclosis (Transporte interno de organelos)
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   GRÁFICOS 2D CÉLULA ANIMAL EXCLUSIVOS / ESPECÍFICOS
   ══════════════════════════════════════════════════════════════════════════ */

/** 8. Membrana Animal Elástica y Flexible (Sin pared celular) */
export function AnimalMembraneGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#1a102b" stroke="#c084fc" strokeWidth="1.5" />

      {/* Contorno ondulante y flexible (ameboide/dinámico) */}
      <path
        d="M30 75 Q45 35 90 40 T170 35 T210 75 T160 115 T70 120 Z"
        fill="#3b0764"
        stroke="#a855f7"
        strokeWidth="3.5"
        opacity="0.8"
      />
      <path
        d="M38 75 Q50 45 92 48 T165 44 T202 75 T155 108 T76 112 Z"
        fill="#581c87"
        stroke="#e9d5ff"
        strokeWidth="1.2"
        strokeDasharray="4 2"
      />

      {/* Vesículas de endocitosis/exocitosis brotando */}
      <circle cx="198" cy="75" r="7" fill="#c084fc" stroke="#f3e8ff" strokeWidth="1.2" />
      <circle cx="178" cy="75" r="5" fill="#a855f7" />
      <text x="198" y="93" textAnchor="middle" fill="#e9d5ff" fontSize="6.5" fontWeight="bold">
        Endocitosis
      </text>

      {/* Colesterol integrado en la membrana (proporciona flexibilidad) */}
      <rect x="75" y="44" width="6" height="4" rx="1" fill="#facc15" />
      <rect x="125" y="42" width="6" height="4" rx="1" fill="#facc15" />
      <rect x="105" y="112" width="6" height="4" rx="1" fill="#facc15" />

      <text x="120" y="24" textAnchor="middle" fill="#f3e8ff" fontSize="8.5" fontWeight="bold">
        Membrana Elástica sin pared externa rígida
      </text>
      <text x="120" y="74" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="extrabold">
        Movimiento y Forma Dinámica
      </text>
      <text x="120" y="87" textAnchor="middle" fill="#d8b4fe" fontSize="7.5" fontWeight="bold">
        Colesterol intercalado + Fluidez de bicapa
      </text>
      <text x="120" y="132" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="extrabold">
        Permite deformación elástica de tejidos musculares y sanguíneos
      </text>
    </svg>
  );
}

/** 9. Centríolos y Citosol Animal: Par de centríolos 9x3 y huso acromático */
export function CentriolesGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#082026" stroke="#06b6d4" strokeWidth="1.5" />

      {/* Áster celular con fibras irradiando */}
      <g stroke="#67e8f9" strokeWidth="1" strokeDasharray="3 3" opacity="0.6">
        <line x1="120" y1="74" x2="30" y2="30" />
        <line x1="120" y1="74" x2="210" y2="30" />
        <line x1="120" y1="74" x2="30" y2="120" />
        <line x1="120" y1="74" x2="210" y2="120" />
        <line x1="120" y1="74" x2="120" y2="20" />
        <line x1="120" y1="74" x2="120" y2="130" />
      </g>

      {/* Centríolo 1 (Vertical) */}
      <g>
        <rect x="100" y="52" width="18" height="42" rx="4" fill="#0891b2" stroke="#22d3ee" strokeWidth="1.5" />
        {/* Microtúbulos en tripletes */}
        <line x1="104" y1="56" x2="104" y2="90" stroke="#a5f3fc" strokeWidth="1.5" />
        <line x1="109" y1="56" x2="109" y2="90" stroke="#a5f3fc" strokeWidth="1.5" />
        <line x1="114" y1="56" x2="114" y2="90" stroke="#a5f3fc" strokeWidth="1.5" />
      </g>

      {/* Centríolo 2 (Perpendicular a 90°) */}
      <g>
        <rect x="122" y="65" width="42" height="18" rx="4" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.5" />
        <line x1="126" y1="69" x2="160" y2="69" stroke="#a5f3fc" strokeWidth="1.5" />
        <line x1="126" y1="74" x2="160" y2="74" stroke="#a5f3fc" strokeWidth="1.5" />
        <line x1="126" y1="79" x2="160" y2="79" stroke="#a5f3fc" strokeWidth="1.5" />
      </g>

      <text x="120" y="24" textAnchor="middle" fill="#67e8f9" fontSize="8.5" fontWeight="bold">
        Centrosoma Animal: Par de centríolos perpendiculares (9x3)
      </text>
      <text x="120" y="116" textAnchor="middle" fill="#cffafe" fontSize="8" fontWeight="bold">
        Organización del Huso Mitótico y División Celular
      </text>
      <text x="120" y="130" textAnchor="middle" fill="#22d3ee" fontSize="8" fontWeight="extrabold">
        Exclusivo de células animales para mitosis y meiosis
      </text>
    </svg>
  );
}

/** 10. Aparato de Golgi: Cisternas apiladas y vesículas secretoras */
export function GolgiGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#260b19" stroke="#f472b6" strokeWidth="1.5" />

      {/* Cisternas curvas del Complejo de Golgi */}
      <g stroke="#f472b6" strokeWidth="5.5" strokeLinecap="round" fill="none">
        <path d="M65 45 Q120 35 175 45" />
        <path d="M60 60 Q120 50 180 60" stroke="#ec4899" />
        <path d="M58 75 Q120 65 182 75" stroke="#db2777" />
        <path d="M62 90 Q120 80 178 90" stroke="#be185d" />
      </g>

      {/* Vesículas de transporte entrando por cara cis */}
      <circle cx="50" cy="40" r="4.5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
      <circle cx="75" cy="30" r="3.5" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
      <text x="60" y="24" fill="#fbcfe8" fontSize="7" fontWeight="bold">Cara Cis (Entrada)</text>

      {/* Vesículas secretoras brotando por cara trans */}
      <circle cx="188" cy="98" r="6" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
      <circle cx="170" cy="108" r="4.5" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
      <circle cx="198" cy="115" r="5" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
      <text x="185" y="128" fill="#fda4af" fontSize="7" fontWeight="bold">Cara Trans (Salida)</text>

      <text x="120" y="24" textAnchor="middle" fill="#fbcfe8" fontSize="8.5" fontWeight="bold">
        Empaquetamiento y Modificación de Proteínas
      </text>
      <text x="120" y="70" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="extrabold">
        Aparato de Golgi
      </text>
      <text x="120" y="112" textAnchor="middle" fill="#f472b6" fontSize="8" fontWeight="bold">
        Brote de lisosomas y vesículas de secreción
      </text>
    </svg>
  );
}

/** 11. Lisosomas y Digestión Celular: Enzimas hidrolíticas y autofagia */
export function LysosomeGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="lysoGrad" cx="40%" cy="40%" r="60%">
          <stop stopColor="#f43f5e" />
          <stop offset="0.7" stopColor="#be123c" />
          <stop offset="1" stopColor="#4c0519" />
        </radialGradient>
      </defs>

      <rect x="8" y="8" width="224" height="134" rx="14" fill="#1f0710" stroke="#f43f5e" strokeWidth="1.5" />

      {/* Esfera lisosómica */}
      <circle cx="120" cy="74" r="50" fill="url(#lysoGrad)" stroke="#fb7185" strokeWidth="2.5" />

      {/* Membrana con bombas de protones H+ (acidifican el interior a pH 5) */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 120 + 50 * Math.cos(rad);
        const y = 74 + 50 * Math.sin(rad);
        return (
          <g key={deg}>
            <rect x={x - 3} y={y - 3} width="6" height="6" rx="1.5" fill="#facc15" />
            <text x={x} y={y + 10} textAnchor="middle" fill="#fef08a" fontSize="6" fontWeight="bold">H⁺</text>
          </g>
        );
      })}

      {/* Enzimas hidrolíticas en el interior descomponiendo desechos */}
      <circle cx="105" cy="65" r="4" fill="#fde047" />
      <circle cx="135" cy="65" r="4.5" fill="#fde047" />
      <circle cx="115" cy="85" r="5" fill="#fde047" />
      <circle cx="130" cy="90" r="3.5" fill="#fde047" />

      {/* Fragmento orgánico en digestión */}
      <path d="M110 70 L125 78 L118 82 Z" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="0.8" />

      <text x="120" y="22" textAnchor="middle" fill="#fda4af" fontSize="8.5" fontWeight="bold">
        Lisosoma: Digestor Celular (pH ácido ~5.0)
      </text>
      <text x="120" y="74" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="extrabold">
        Enzimas Hidrolíticas
      </text>
      <text x="120" y="132" textAnchor="middle" fill="#fb7185" fontSize="8" fontWeight="extrabold">
        Reciclaje celular, degradación de desechos y bacterias
      </text>
    </svg>
  );
}

/** 12. Vacuolas Pequeñas y Vesículas Animales */
export function AnimalVacuolesGraphic2D({ className }: GraphicProps) {
  return (
    <svg
      viewBox="0 0 240 150"
      className={className ?? 'w-full h-auto max-h-36'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="224" height="134" rx="14" fill="#1c1606" stroke="#eab308" strokeWidth="1.5" />

      {/* Múltiples vesículas y vacuolas pequeñas dispersas */}
      <circle cx="65" cy="65" r="22" fill="#ca8a04" opacity="0.4" stroke="#facc15" strokeWidth="2" />
      <circle cx="65" cy="65" r="16" fill="#eab308" opacity="0.6" />
      <text x="65" y="68" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">Vacuola 1</text>

      <circle cx="170" cy="55" r="26" fill="#ca8a04" opacity="0.4" stroke="#facc15" strokeWidth="2" />
      <circle cx="170" cy="55" r="19" fill="#eab308" opacity="0.6" />
      <text x="170" y="58" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">Vacuola 2</text>

      <circle cx="120" cy="95" r="18" fill="#ca8a04" opacity="0.4" stroke="#facc15" strokeWidth="2" />
      <circle cx="120" cy="95" r="13" fill="#eab308" opacity="0.6" />
      <text x="120" y="98" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="bold">Vacuola 3</text>

      <circle cx="130" cy="42" r="10" fill="#a16207" opacity="0.5" stroke="#fde047" strokeWidth="1" />
      <circle cx="185" cy="105" r="9" fill="#a16207" opacity="0.5" stroke="#fde047" strokeWidth="1" />
      <circle cx="50" cy="110" r="8" fill="#a16207" opacity="0.5" stroke="#fde047" strokeWidth="1" />

      <text x="120" y="24" textAnchor="middle" fill="#fef08a" fontSize="8.5" fontWeight="bold">
        Vacuolas Pequeñas y Dispersas (Animales)
      </text>
      <text x="120" y="130" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="extrabold">
        Almacenamiento temporal y transporte de nutrientes (sin turgencia)
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   RE-EXPORTACIÓN DE GRÁFICOS HISTÓRICOS 2D DE LA TEORÍA CELULAR
   ══════════════════════════════════════════════════════════════════════════ */
export {
  JanssenMicroscopeGraphic2D,
  HookeCorkGraphic2D,
  LeeuwenhoekAnimalculesGraphic2D,
  SchleidenSchwannGraphic2D,
  VirchowDivisionGraphic2D
} from './HistoryGraphics2D';

