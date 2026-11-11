import { Sparkles } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { Chip, LoadingBlock } from '../../components/ui';
import { ClickSpark, ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';
import { ORGANELLES_CATALOG, MODEL_EMBEDS } from './embedCatalog';
import { SketchfabViewer } from './SketchfabViewer';
import { CellWallAnimator } from './CellWallAnimator';

const Cell3DViewer = lazy(() => import('./Cell3DViewer'));

export function OrganelleExplorer() {
  const [selectedId, setSelectedId] = useState<string>('nucleo');

  const currentOrganelle = ORGANELLES_CATALOG.find((item) => item.id === selectedId) ?? ORGANELLES_CATALOG[0];

  return (
    <div className="space-y-4">
      {/* Selector pills */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-mint-300">
            Explorador de organelos individuales
          </p>
          <span className="text-xs text-slate-400">
            Selecciona un organelo para explorar su modelo 3D o animación
          </span>
        </div>

        <ClickSpark sparkColor={currentOrganelle.accent}>
          <div className="mt-2.5 flex flex-wrap gap-2" role="tablist" aria-label="Elegir organelo">
            {ORGANELLES_CATALOG.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    'flex min-h-11 items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-extrabold transition-all',
                    isSelected
                      ? 'border-white/20 bg-white/12 text-white shadow-lg'
                      : 'border-white/8 bg-ink-950/40 text-slate-400 hover:border-white/15 hover:bg-white/6 hover:text-slate-200'
                  )}
                  style={isSelected ? { borderColor: `${item.accent}66`, boxShadow: `0 0 20px ${item.accent}22` } : undefined}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ background: item.accent }}
                    aria-hidden
                  />
                  <span>{item.name}</span>
                  {item.cellTypes === 'plant-only' ? (
                    <span className="rounded-md bg-emerald-400/15 px-1.5 py-0.5 text-[9px] font-black text-emerald-300">
                      Vegetal
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </ClickSpark>
      </div>

      {/* Main content display based on organelle type */}
      <div className="rounded-3xl border border-white/10 bg-ink-950/60 p-4">
        {currentOrganelle.type === 'embed' && currentOrganelle.embedKey ? (
          <SketchfabViewer embed={MODEL_EMBEDS[currentOrganelle.embedKey]} />
        ) : currentOrganelle.type === 'glb' && currentOrganelle.glbUrl ? (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Chip tone="mint">
                <Sparkles className="size-3.5" aria-hidden />
                Modelo 3D Local ({currentOrganelle.name})
              </Chip>
              <span className="text-xs text-slate-400">
                Formato GLB de alta resolución · Arrastra para girar
              </span>
            </div>
            <Suspense fallback={<LoadingBlock message={`Cargando modelo 3D de ${currentOrganelle.name}…`} />}>
              <Cell3DViewer
                model="cell-plant"
                glbUrl={currentOrganelle.glbUrl}
                label={currentOrganelle.name}
              />
            </Suspense>
          </div>
        ) : currentOrganelle.type === '2d-animation' ? (
          <CellWallAnimator />
        ) : null}
      </div>

      {/* Educational info card */}
      <SpotlightCard spotlightColor={`${currentOrganelle.accent}20`}>
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider"
                  style={{ background: `${currentOrganelle.accent}22`, color: currentOrganelle.accent }}
                >
                  {currentOrganelle.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {currentOrganelle.cellTypes === 'both'
                    ? '🌱🐾 Presente en célula vegetal y animal'
                    : '🌱 Exclusivo de la célula vegetal'}
                </span>
              </div>
              <h4 className="mt-2 font-display text-xl font-black text-white">
                <ShinyText text={currentOrganelle.name} speed={3.5} />
              </h4>
              <p className="mt-1 text-sm font-semibold text-mint-200">
                {currentOrganelle.functionSummary}
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {currentOrganelle.description}
          </p>

          <div className="mt-4 rounded-2xl border border-white/8 bg-white/3 p-3.5">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              ¿Qué debes buscar al observar este modelo?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {currentOrganelle.id === 'nucleo' &&
                'Observa la doble membrana nuclear con sus poros nucleares y el nucléolo denso en el centro, donde se fabrican los ribosomas.'}
              {currentOrganelle.id === 'mitocondria' &&
                'Gira la mitocondria y observa las crestas mitocondriales internas (pliegues de la membrana interior) que aumentan el área para sintetizar ATP.'}
              {currentOrganelle.id === 'cloroplasto' &&
                'Fíjate en los tilacoides organizados en pilas llamadas granas, rodeadas por el estroma. Es ahí donde los pigmentos de clorofila atrapan fotones.'}
              {currentOrganelle.id === 'membrana' &&
                'Examina la bicapa lipídica (cabezas hidrofílicas y colas hidrofóbicas) y las proteínas integrales de canal que permiten el transporte selectivo.'}
              {currentOrganelle.id === 'vacuola' &&
                'Aprecia el enorme volumen que ocupa en la célula vegetal, acumulando agua con iones para empujar el citoplasma y dar firmeza a la planta.'}
              {currentOrganelle.id === 'pared' &&
                'Observa cómo las microfibrillas de celulosa forman una malla entrecruzada resistente pero permeable, que impide que la célula vegetal reviente.'}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

