import { ExternalLink, Eye, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button, Chip } from '../../components/ui';
import type { ModelEmbedConfig } from './embedCatalog';

interface SketchfabViewerProps {
  embed: ModelEmbedConfig;
  onSwitchToLocal?: () => void;
  hasLocalModel?: boolean;
}

export function SketchfabViewer({ embed, onSwitchToLocal, hasLocalModel = false }: SketchfabViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Fullscreen not supported or blocked
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="grape">
            <Sparkles className="size-3.5" aria-hidden />
            Visor 3D Sketchfab (Inmersivo)
          </Chip>
          <span className="text-xs font-bold text-slate-300">{embed.title}</span>
        </div>

        <div className="flex items-center gap-2">
          {hasLocalModel && onSwitchToLocal ? (
            <Button size="sm" variant="secondary" onClick={onSwitchToLocal}>
              <Eye className="size-4" aria-hidden />
              Ver modelo local
            </Button>
          ) : null}
          <Button size="sm" variant="ghost" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
            {isFullscreen ? <Minimize2 className="size-4" aria-hidden /> : <Maximize2 className="size-4" aria-hidden />}
            <span className="hidden sm:inline">{isFullscreen ? 'Salir' : 'Pantalla completa'}</span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[16/10] min-h-[19rem] sm:min-h-[25rem] w-full overflow-hidden rounded-3xl border border-white/12 bg-ink-950 shadow-2xl"
      >
        {isLoading ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink-950/90 backdrop-blur-sm">
            <div className="size-10 animate-spin rounded-full border-4 border-mint-400 border-t-transparent" />
            <p className="text-xs font-bold text-slate-300">Cargando modelo 3D de Sketchfab…</p>
          </div>
        ) : null}

        <iframe
          title={embed.title}
          src={embed.embedUrl}
          className="size-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
        <span>
          Modelo: <strong className="text-slate-200">{embed.title}</strong> por <span className="text-mint-300">{embed.author}</span>
        </span>
        <a
          href={embed.modelUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-sky-400 hover:text-sky-300"
        >
          Ver original en Sketchfab
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </div>
    </div>
  );
}

