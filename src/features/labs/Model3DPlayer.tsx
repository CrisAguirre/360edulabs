import { Boxes, Droplets, Eye, FlaskConical, Layers, Leaf, ScanEye, Sparkles, Sun, Waves } from 'lucide-react';
import { lazy, Suspense, useMemo, useState } from 'react';
import { Chip, LoadingBlock } from '../../components/ui';
import { ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';
import type { ViewerModel } from './Cell3DViewer';
import type { ActivityRuntimeProps, HotspotView } from './types';
import { MODEL_EMBEDS } from './embedCatalog';
import { SketchfabViewer } from './SketchfabViewer';
import { OrganelleExplorer } from './OrganelleExplorer';

const Cell3DViewer = lazy(() => import('./Cell3DViewer'));

interface RawHotspot {
  id: string;
  label: string;
  description: string;
  position?: [number, number, number];
}

interface ModeContent {
  id: string;
  label: string;
  color: string;
  hotspots: RawHotspot[];
}

export function Model3DPlayer({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const model = String(content.model ?? 'microscope');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [modeIndex, setModeIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [water, setWater] = useState<number>(content.sliders?.find?.((item: any) => item.id === 'water')?.initial ?? 70);
  const [light, setLight] = useState<number>(content.sliders?.find?.((item: any) => item.id === 'light')?.initial ?? 60);
  const [nutrients, setNutrients] = useState<number>(
    content.sliders?.find?.((item: any) => item.id === 'nutrients')?.initial ?? 65
  );

  // View mode switcher for cell-compare: 'sketchfab' | 'local' | 'organelles'
  const [cellCompareView, setCellCompareView] = useState<'sketchfab' | 'local' | 'organelles'>('sketchfab');

  // View mode switcher for energy-cell: 'sketchfab' | 'simulator'
  const [energyView, setEnergyView] = useState<'sketchfab' | 'simulator'>('sketchfab');

  const modes: ModeContent[] = Array.isArray(content.modes) ? content.modes : [];
  const mode = modes[modeIndex];

  const rawHotspots: RawHotspot[] = useMemo(() => {
    if (model === 'cell-compare') return mode?.hotspots ?? [];
    return Array.isArray(content.hotspots) ? content.hotspots : [];
  }, [model, mode, content.hotspots]);

  const hotspots: HotspotView[] = rawHotspots.map((item) => ({
    id: item.id,
    label: item.label,
    description: item.description
  }));

  const active = hotspots.find((hotspot) => hotspot.id === activeHotspot) ?? null;
  const zoomLevels: Array<{ id: string; label: string; description: string }> = Array.isArray(content.zoomLevels)
    ? content.zoomLevels
    : [];
  const postulates: string[] = Array.isArray(content.postulates) ? content.postulates : [];
  const layers: string[] = Array.isArray(content.layers) ? content.layers : [];

  const viewerModel: ViewerModel =
    model === 'cell-compare' ? (mode?.id === 'vegetal' ? 'cell-plant' : 'cell-animal') : model === 'energy-cell' ? 'energy-cell' : 'microscope';

  const emptyState =
    water < 35
      ? content.states?.plasmolyzed
      : light > 50 && nutrients > 50
        ? content.states?.energy
        : content.states?.turgent;

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Chip tone="mint">
            <Boxes className="size-3.5" aria-hidden />
            {model === 'microscope'
              ? 'Modelo 3D · Microscopio Óptico Compuesto'
              : model === 'cell-compare'
                ? 'Modelos 3D · Células Animal y Vegetal'
                : 'Modelo 3D · Célula de la Energía'}
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">
            <ShinyText text={content.title ?? activity.title} speed={4} />
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{content.intro}</p>
        </div>

        {/* Mode selector for cell-compare */}
        {model === 'cell-compare' && modes.length > 0 && cellCompareView !== 'organelles' ? (
          <div className="flex rounded-2xl border border-white/10 bg-white/4 p-1" role="group" aria-label="Elegir tipo de célula">
            {modes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setModeIndex(index);
                  setActiveHotspot(null);
                }}
                className={cn(
                  'min-h-10 rounded-xl px-3.5 text-xs font-extrabold transition',
                  index === modeIndex ? 'text-ink-950 font-black shadow-md' : 'text-slate-300 hover:bg-white/6'
                )}
                style={index === modeIndex ? { background: item.color } : undefined}
                aria-pressed={index === modeIndex}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Tab Switcher for cell-compare */}
      {model === 'cell-compare' ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-2">
          <div className="flex rounded-2xl border border-white/10 bg-ink-950/60 p-1">
            <button
              type="button"
              onClick={() => setCellCompareView('sketchfab')}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                cellCompareView === 'sketchfab'
                  ? 'bg-gradient-to-r from-violet-500/25 to-mint-500/25 text-white border border-white/20'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-purple-300" aria-hidden />
                Visor Sketchfab Inmersivo
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCellCompareView('local')}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                cellCompareView === 'local'
                  ? 'bg-gradient-to-r from-violet-500/25 to-mint-500/25 text-white border border-white/20'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5 text-mint-300" aria-hidden />
                Visor Interactivo Local
              </span>
            </button>
            <button
              type="button"
              onClick={() => setCellCompareView('organelles')}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                cellCompareView === 'organelles'
                  ? 'bg-gradient-to-r from-violet-500/25 to-mint-500/25 text-white border border-white/20'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span className="flex items-center gap-1.5">
                <Layers className="size-3.5 text-sky-300" aria-hidden />
                Explorador de Organelos
              </span>
            </button>
          </div>
          <span className="text-[11px] text-slate-400">
            {cellCompareView === 'sketchfab'
              ? 'Modelo 3D fotorrealista embed'
              : cellCompareView === 'local'
                ? 'Modelo 3D manipulable con puntos informativos'
                : 'Inspecciona organelo por organelo'}
          </span>
        </div>
      ) : null}

      {/* Tab Switcher for energy-cell */}
      {model === 'energy-cell' ? (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 pb-2">
          <div className="flex rounded-2xl border border-white/10 bg-ink-950/60 p-1">
            <button
              type="button"
              onClick={() => setEnergyView('sketchfab')}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                energyView === 'sketchfab'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-300" aria-hidden />
                Visor Sketchfab (Célula Interactiva)
              </span>
            </button>
            <button
              type="button"
              onClick={() => setEnergyView('simulator')}
              className={cn(
                'rounded-xl px-3.5 py-1.5 text-xs font-extrabold transition',
                energyView === 'simulator'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <span className="flex items-center gap-1.5">
                <Waves className="size-3.5 text-sky-300" aria-hidden />
                Simulador de Fábrica Celular
              </span>
            </button>
          </div>
          <span className="text-[11px] text-slate-400">
            {energyView === 'sketchfab' ? 'Modelo 3D metabólico' : 'Manipula agua, luz y nutrientes'}
          </span>
        </div>
      ) : null}

      {/* MAIN VIEW AREA */}
      {model === 'microscope' ? (
        <Suspense fallback={<LoadingBlock message="Cargando el microscopio 3D…" />}>
          <Cell3DViewer
            model="microscope"
            hotspots={rawHotspots}
            activeHotspot={activeHotspot}
            onHotspot={(id) => setActiveHotspot((current) => (current === id ? null : id))}
            label={content.title}
          />
        </Suspense>
      ) : model === 'cell-compare' ? (
        cellCompareView === 'sketchfab' ? (
          <SketchfabViewer
            embed={mode?.id === 'vegetal' ? MODEL_EMBEDS['cell-plant'] : MODEL_EMBEDS['cell-animal']}
            onSwitchToLocal={() => setCellCompareView('local')}
            hasLocalModel
          />
        ) : cellCompareView === 'local' ? (
          <Suspense fallback={<LoadingBlock message="Cargando visor 3D local…" />}>
            <Cell3DViewer
              model={viewerModel}
              hotspots={rawHotspots}
              activeHotspot={activeHotspot}
              onHotspot={(id) => setActiveHotspot((current) => (current === id ? null : id))}
              water={water}
              light={light}
              nutrients={nutrients}
              label={mode?.label ?? content.title}
            />
          </Suspense>
        ) : (
          <OrganelleExplorer />
        )
      ) : model === 'energy-cell' ? (
        energyView === 'sketchfab' ? (
          <SketchfabViewer
            embed={MODEL_EMBEDS['energy-cell']}
            onSwitchToLocal={() => setEnergyView('simulator')}
            hasLocalModel
          />
        ) : (
          <Suspense fallback={<LoadingBlock message="Cargando simulador celular…" />}>
            <Cell3DViewer
              model="energy-cell"
              hotspots={rawHotspots}
              activeHotspot={activeHotspot}
              onHotspot={(id) => setActiveHotspot((current) => (current === id ? null : id))}
              water={water}
              light={light}
              nutrients={nutrients}
              label={content.title}
            />
          </Suspense>
        )
      ) : null}

      {/* Selected Hotspot Details */}
      {active && (cellCompareView === 'local' || model === 'microscope') ? (
        <SpotlightCard spotlightColor="rgba(88, 230, 197, 0.2)">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">
                  Estructura seleccionada
                </p>
                <h4 className="mt-1 text-lg font-bold text-white">{active.label}</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{active.description}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveHotspot(null)}
                className="rounded-full px-2.5 py-1 text-xs font-bold text-slate-400 hover:bg-white/10 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </SpotlightCard>
      ) : null}

      {/* Microscope specific cards */}
      {model === 'microscope' ? (
        <div className="grid gap-3 md:grid-cols-2">
          <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <ScanEye className="size-5 text-sky-300" aria-hidden />
                <h4 className="font-bold text-white">Cambia el aumento del objetivo</h4>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {zoomLevels.map((level, index) => (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setZoomLevel(index)}
                    className={cn(
                      'min-h-11 rounded-xl border px-4 text-sm font-extrabold transition',
                      index === zoomLevel
                        ? 'border-mint-400/40 bg-mint-400/15 text-mint-200'
                        : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
                    )}
                    aria-pressed={index === zoomLevel}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
              {zoomLevels[zoomLevel] ? (
                <p className="mt-3 rounded-xl bg-sky-400/8 p-3 text-sm text-sky-100">
                  <strong className="text-sky-200">{zoomLevels[zoomLevel].label}:</strong> {zoomLevels[zoomLevel].description}
                </p>
              ) : null}
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.15)">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <FlaskConical className="size-5 text-amber-300" aria-hidden />
                <h4 className="font-bold text-white">Los tres postulados fundamentales</h4>
              </div>
              <ol className="mt-3 space-y-2">
                {postulates.map((postulate, index) => (
                  <li key={postulate} className="flex gap-2 text-sm text-slate-300">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-400/15 text-[11px] font-extrabold text-amber-300">
                      {index + 1}
                    </span>
                    <span>{postulate}</span>
                  </li>
                ))}
              </ol>
            </div>
          </SpotlightCard>
        </div>
      ) : null}

      {/* Cell-compare specific educational cards */}
      {model === 'cell-compare' && cellCompareView !== 'organelles' ? (
        <div className="grid gap-3 md:grid-cols-2">
          <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.15)">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Layers className="size-5 text-sky-300" aria-hidden />
                <h4 className="font-bold text-white">Capas del modelo</h4>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(layers.length > 0 ? layers : ['Membrana', 'Citoplasma', 'Núcleo', 'Organelos']).map((layer) => (
                  <Chip key={layer} tone="sky">{layer}</Chip>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">
                El visor muestra las estructuras celulares tridimensionales. Utiliza el botón de pantalla completa o
                pasa al Explorador de Organelos para ver cada uno en detalle.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(88, 230, 197, 0.15)">
            <div className="p-4">
              <div className="flex items-center gap-2">
                <Leaf className="size-5 text-mint-300" aria-hidden />
                <h4 className="font-bold text-white">Pregunta guía</h4>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                ¿Qué estructuras comparten ambas células (núcleo, mitocondria, membrana) y cuáles son exclusivas de la
                célula vegetal (pared celular, cloroplastos, vacuola central)?
              </p>
            </div>
          </SpotlightCard>
        </div>
      ) : null}

      {/* Energy controls for energy-cell */}
      {model === 'energy-cell' ? (
        <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.15)">
          <div className="p-5">
            <div className="flex items-center gap-2">
              <Waves className="size-5 text-amber-300" aria-hidden />
              <h4 className="font-bold text-white">Controles de la fábrica celular</h4>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Ajusta los factores ambientales para simular el comportamiento de la célula en tiempo real:
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { id: 'water', label: 'Agua', value: water, set: setWater, icon: Droplets, color: '#38bdf8' },
                { id: 'light', label: 'Luz solar', value: light, set: setLight, icon: Sun, color: '#fbbf24' },
                { id: 'nutrients', label: 'Nutrientes / Sales', value: nutrients, set: setNutrients, icon: FlaskConical, color: '#4ade80' }
              ].map((slider) => {
                const Icon = slider.icon;
                return (
                  <label key={slider.id} className="block rounded-2xl border border-white/6 bg-white/2 p-3">
                    <span className="flex items-center justify-between text-xs font-extrabold text-slate-300">
                      <span className="inline-flex items-center gap-1.5">
                        <Icon className="size-4" style={{ color: slider.color }} aria-hidden />
                        {slider.label}
                      </span>
                      <span style={{ color: slider.color }}>{slider.value}%</span>
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={slider.value}
                      onChange={(event) => slider.set(Number(event.target.value))}
                      className="range-glow mt-2 w-full"
                      aria-label={`Nivel de ${slider.label.toLowerCase()}`}
                    />
                  </label>
                );
              })}
            </div>
            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/8 p-3.5 text-sm leading-relaxed text-amber-100">
              <strong className="text-amber-200">Estado observado:</strong> {emptyState}
            </div>
          </div>
        </SpotlightCard>
      ) : null}

      {Array.isArray(content.controls) && content.controls.length > 0 ? (
        <p className="text-xs text-slate-500">
          Controles: {content.controls.join(' · ')}
        </p>
      ) : null}
    </div>
  );
}
