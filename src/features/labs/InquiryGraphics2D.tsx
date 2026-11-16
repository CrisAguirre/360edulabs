/**
 * Gráficos vectoriales 2D animados para las preguntas motivadoras de la
 * sub-actividad 1.1. Se usan dentro de tarjetas reflectivas (React Bits)
 * para que cada pregunta tenga su propia imagen científica.
 */

/** Pregunta 1: la vida está formada por células invisibles a simple vista. */
export function BodyLifeGraphic2D() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-auto w-full"
      role="img"
      aria-label="Lupa que revela células en un cuerpo humano, una planta y un animal"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="il-life-bg" x1="0" y1="0" x2="320" y2="180">
          <stop stopColor="#082f49" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="il-life-lens" cx="50%" cy="50%" r="50%">
          <stop stopColor="#bae6fd" stopOpacity="0.28" />
          <stop offset="1" stopColor="#0ea5e9" stopOpacity="0.05" />
        </radialGradient>
        <style>
          {`
            @keyframes ilLifeFloat {
              0%, 100% { transform: translate(0px, 0px); }
              50% { transform: translate(6px, -5px); }
            }
            @keyframes ilLifeCellPulse {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.12); opacity: 1; }
            }
            @keyframes ilLifeTwinkle {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.9; }
            }
            .il-life-lens { animation: ilLifeFloat 5s ease-in-out infinite; transform-origin: 160px 82px; }
            .il-life-cell { animation: ilLifeCellPulse 2.8s ease-in-out infinite; }
            .il-life-cell-2 { animation-delay: 0.5s; }
            .il-life-cell-3 { animation-delay: 1s; }
            .il-life-cell-4 { animation-delay: 1.4s; }
            .il-life-star { animation: ilLifeTwinkle 2.2s ease-in-out infinite; }
            .il-life-star-2 { animation-delay: 0.8s; }
            .il-life-star-3 { animation-delay: 1.5s; }
          `}
        </style>
      </defs>

      <rect x="4" y="4" width="312" height="172" rx="18" fill="url(#il-life-bg)" stroke="#0ea5e9" strokeOpacity="0.45" />

      {/* Siluetas: estudiante, planta y animal */}
      <g opacity="0.9">
        {/* Persona */}
        <circle cx="62" cy="104" r="10" fill="#7dd3fc" />
        <path d="M62 116c-9 0-15 6-15 15v22h30v-22c0-9-6-15-15-15Z" fill="#7dd3fc" opacity="0.85" />
        <text x="62" y="166" textAnchor="middle" fill="#bae6fd" fontSize="8" fontWeight="700">Tú</text>

        {/* Planta */}
        <path d="M160 152v-34" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
        <path d="M160 128c-14 0-22-8-22-20 13 0 22 7 22 20Z" fill="#4ade80" opacity="0.9" />
        <path d="M160 118c14 0 22-8 22-20-13 0-22 7-22 20Z" fill="#22c55e" opacity="0.9" />
        <text x="160" y="166" textAnchor="middle" fill="#86efac" fontSize="8" fontWeight="700">Plantas</text>

        {/* Animal */}
        <ellipse cx="258" cy="138" rx="20" ry="12" fill="#fbbf24" opacity="0.9" />
        <circle cx="244" cy="130" r="6" fill="#fbbf24" />
        <path d="M268 128c6-8 12-8 16-2" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="252" cy="132" r="1.6" fill="#0f172a" />
        <text x="258" y="166" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="700">Animales</text>
      </g>

      {/* Lupa revelando células */}
      <g className="il-life-lens">
        <circle cx="160" cy="82" r="44" fill="url(#il-life-lens)" stroke="#38bdf8" strokeWidth="3" />
        <circle cx="160" cy="82" r="38" fill="none" stroke="#bae6fd" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="192" y1="114" x2="212" y2="134" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round" />

        <g className="il-life-cell">
          <circle cx="146" cy="70" r="9" fill="#58e6c5" opacity="0.9" />
          <circle cx="146" cy="70" r="3.5" fill="#064e3b" />
        </g>
        <g className="il-life-cell il-life-cell-2">
          <circle cx="174" cy="78" r="10" fill="#7dd3fc" opacity="0.9" />
          <circle cx="174" cy="78" r="4" fill="#082f49" />
        </g>
        <g className="il-life-cell il-life-cell-3">
          <circle cx="154" cy="96" r="8" fill="#a7f3d0" opacity="0.9" />
          <circle cx="154" cy="96" r="3" fill="#064e3b" />
        </g>
        <g className="il-life-cell il-life-cell-4">
          <circle cx="178" cy="99" r="7" fill="#bae6fd" opacity="0.9" />
          <circle cx="178" cy="99" r="2.6" fill="#0c4a6e" />
        </g>

        <text x="160" y="58" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="800">¡Células!</text>
      </g>

      <g fill="#e0f2fe">
        <circle className="il-life-star" cx="104" cy="38" r="1.6" />
        <circle className="il-life-star il-life-star-2" cx="222" cy="46" r="1.3" />
        <circle className="il-life-star il-life-star-3" cx="196" cy="30" r="1.1" />
      </g>
    </svg>
  );
}

/** Pregunta 2: cómo son las células y qué hacen para mantenernos vivos. */
export function CellActivityGraphic2D() {
  return (
    <svg
      viewBox="0 0 320 180"
      className="h-auto w-full"
      role="img"
      aria-label="Célula animada con núcleo, mitocondrias y partículas de energía ATP"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="il-cell-bg" x1="0" y1="0" x2="320" y2="180">
          <stop stopColor="#042f2e" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <radialGradient id="il-cell-body" cx="45%" cy="40%" r="70%">
          <stop stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#14b8a6" stopOpacity="0.18" />
          <stop offset="1" stopColor="#0f766e" stopOpacity="0.1" />
        </radialGradient>
        <style>
          {`
            @keyframes ilCellBreathe {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.035); }
            }
            @keyframes ilCellNucleus {
              0%, 100% { transform: scale(1); opacity: 0.95; }
              50% { transform: scale(1.08); opacity: 1; }
            }
            @keyframes ilCellMito {
              0%, 100% { transform: scale(1); opacity: 0.85; }
              50% { transform: scale(1.16); opacity: 1; }
            }
            @keyframes ilCellAtp {
              0% { transform: translateY(8px); opacity: 0; }
              20% { opacity: 1; }
              80% { opacity: 1; }
              100% { transform: translateY(-46px); opacity: 0; }
            }
            @keyframes ilCellVesicle {
              0%, 100% { transform: translate(0, 0); opacity: 0.55; }
              50% { transform: translate(6px, -4px); opacity: 1; }
            }
            .il-cell-breathe { animation: ilCellBreathe 4.5s ease-in-out infinite; transform-origin: 160px 92px; }
            .il-cell-nucleus { animation: ilCellNucleus 3s ease-in-out infinite; transform-origin: 158px 88px; }
            .il-cell-mito { animation: ilCellMito 2.4s ease-in-out infinite; transform-origin: 112px 112px; }
            .il-cell-mito-2 { animation-delay: 0.6s; transform-origin: 210px 108px; }
            .il-cell-atp { animation: ilCellAtp 2.6s ease-in-out infinite; }
            .il-cell-atp-2 { animation-delay: 0.9s; }
            .il-cell-atp-3 { animation-delay: 1.7s; }
            .il-cell-vesicle { animation: ilCellVesicle 3.4s ease-in-out infinite; }
          `}
        </style>
      </defs>

      <rect x="4" y="4" width="312" height="172" rx="18" fill="url(#il-cell-bg)" stroke="#2dd4bf" strokeOpacity="0.45" />

      <g className="il-cell-breathe">
        {/* Membrana celular */}
        <path
          d="M160 22c42 0 76 28 76 66s-28 70-76 70-76-30-76-70 34-66 76-66Z"
          fill="url(#il-cell-body)"
          stroke="#5eead4"
          strokeWidth="2.6"
        />
        <path
          d="M160 30c36 0 67 25 67 58s-25 62-67 62-67-27-67-62 31-58 67-58Z"
          fill="none"
          stroke="#99f6e4"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="4 5"
        />

        {/* Núcleo */}
        <g className="il-cell-nucleus">
          <circle cx="158" cy="88" r="24" fill="#a78bfa" opacity="0.9" />
          <circle cx="158" cy="88" r="17" fill="#7c3aed" opacity="0.85" />
          <circle cx="158" cy="88" r="6" fill="#ede9fe" opacity="0.9" />
        </g>
        <text x="158" y="125" textAnchor="middle" fill="#ddd6fe" fontSize="6.5" fontWeight="800">NÚCLEO</text>

        {/* Mitocondrias */}
        <g className="il-cell-mito">
          <ellipse cx="112" cy="112" rx="18" ry="9" fill="#fb923c" opacity="0.9" transform="rotate(-18 112 112)" />
          <path d="M100 108c4 5 8-4 12 1s8-3 12 2" stroke="#7c2d12" strokeWidth="1.6" fill="none" />
        </g>
        <g className="il-cell-mito il-cell-mito-2">
          <ellipse cx="210" cy="108" rx="17" ry="8.5" fill="#facc15" opacity="0.9" transform="rotate(16 210 108)" />
          <path d="M199 105c4 5 8-4 12 1s8-3 12 2" stroke="#713f12" strokeWidth="1.6" fill="none" />
        </g>
        <text x="112" y="134" textAnchor="middle" fill="#fed7aa" fontSize="6.5" fontWeight="800">MITOCONDRIA</text>

        {/* Vacuolas y vesículas */}
        <circle className="il-cell-vesicle" cx="204" cy="148" r="8" fill="#38bdf8" opacity="0.55" />
        <circle className="il-cell-vesicle" cx="126" cy="146" r="5" fill="#7dd3fc" opacity="0.55" />
        <circle cx="196" cy="70" r="6" fill="#5eead4" opacity="0.5" />

        {/* Energía ATP subiendo */}
        <g className="il-cell-atp">
          <circle cx="236" cy="66" r="4" fill="#fde047" stroke="#fff" strokeWidth="1" />
          <text x="236" y="68.5" textAnchor="middle" fill="#713f12" fontSize="4.5" fontWeight="900">ATP</text>
        </g>
        <g className="il-cell-atp il-cell-atp-2">
          <circle cx="250" cy="86" r="3.5" fill="#fde047" stroke="#fff" strokeWidth="0.8" />
          <text x="250" y="88" textAnchor="middle" fill="#713f12" fontSize="4" fontWeight="900">ATP</text>
        </g>
        <g className="il-cell-atp il-cell-atp-3">
          <circle cx="84" cy="72" r="3.8" fill="#fde047" stroke="#fff" strokeWidth="0.9" />
          <text x="84" y="74" textAnchor="middle" fill="#713f12" fontSize="4.2" fontWeight="900">ATP</text>
        </g>
      </g>

      <text x="160" y="34" textAnchor="middle" fill="#ccfbf1" fontSize="7.5" fontWeight="800">
        ¿Cómo funcionan por dentro?
      </text>
    </svg>
  );
}
