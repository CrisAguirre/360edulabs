import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Minus, MousePointer2, Pause, Play, Plus, RotateCcw } from 'lucide-react';
import { Suspense, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import * as THREE from 'three';
import { Button, Chip } from '../../components/ui';
import { cn, prefersReducedMotion } from '../../lib/utils';
import { GLBModel } from './GLBModelViewer';

export interface ViewerHotspot {
  id: string;
  label: string;
  description: string;
  position?: [number, number, number];
}

export type ViewerModel = 'microscope' | 'cell-animal' | 'cell-plant' | 'energy-cell';

interface Cell3DViewerProps {
  model: ViewerModel;
  glbUrl?: string;
  hotspots?: ViewerHotspot[];
  activeHotspot?: string | null;
  onHotspot?: (id: string) => void;
  water?: number;
  light?: number;
  nutrients?: number;
  label?: string;
}

const DEFAULT_POSITIONS: Record<string, [number, number, number]> = {
  membrana: [0, 1.15, 0.3],
  nucleo: [-0.18, 0.25, 0.35],
  mitocondria: [0.62, -0.35, 0.45],
  vacuola: [-0.65, -0.22, 0.35],
  'vacuola-central': [0.2, -0.1, 0.4],
  pared: [0, 1.32, 0],
  cloroplasto: [0.7, -0.18, 0.35],
  ocular: [0, 1.25, 0.25],
  objetivo: [0, 0.35, 0.7],
  placa: [0, -0.1, 0.6],
  fuente: [0, -0.8, 0.25]
};

function positionFor(id: string, fallback?: [number, number, number]): [number, number, number] {
  return fallback ?? DEFAULT_POSITIONS[id] ?? [0, 0, 0.9];
}

function Mitochondrion({
  position,
  energy = 0.6,
  color = '#fbbf24'
}: {
  position: [number, number, number];
  energy?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.1 + position[0] * 2) * 0.07 * energy;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} position={position} rotation={[0, 0.4, 0.5]}>
      <capsuleGeometry args={[0.085, 0.2, 6, 12]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.25 + energy * 0.55}
        roughness={0.35}
      />
    </mesh>
  );
}

function Chloroplast({ position, light = 0.6 }: { position: [number, number, number]; light?: number }) {
  return (
    <mesh position={position} rotation={[0.4, 0.8, -0.2]} scale={[0.22, 0.12, 0.14]}>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial
        color="#4ade80"
        emissive="#22c55e"
        emissiveIntensity={0.12 + light * 0.5}
        roughness={0.45}
      />
    </mesh>
  );
}

function HotspotMarker({
  hotspot,
  active,
  onClick
}: {
  hotspot: ViewerHotspot;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const scale = active ? 1.3 + Math.sin(clock.elapsedTime * 4) * 0.12 : 1;
    ref.current.scale.setScalar(scale);
  });
  return (
    <mesh ref={ref} position={positionFor(hotspot.id, hotspot.position)} onClick={onClick}>
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshBasicMaterial color={active ? '#ffffff' : '#8df5df'} />
    </mesh>
  );
}

function CellModel({
  model,
  hotspots,
  activeHotspot,
  onHotspot,
  water,
  light,
  nutrients
}: {
  model: ViewerModel;
  hotspots: ViewerHotspot[];
  activeHotspot: string | null;
  onHotspot?: (id: string) => void;
  water: number;
  light: number;
  nutrients: number;
}) {
  const isPlant = model === 'cell-plant' || model === 'energy-cell';
  const isEnergy = model === 'energy-cell';
  const membraneColor = isEnergy ? '#fbbf24' : isPlant ? '#4ade80' : '#7dd3fc';
  const vacuoleScale = isEnergy ? 0.35 + (water / 100) * 0.95 : isPlant ? 0.82 : 0.28;

  return (
    <>
      <mesh scale={[1.2, 1.12, 1.2]}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color={membraneColor}
          transparent
          opacity={isEnergy ? 0.13 : 0.16}
          roughness={0.18}
          metalness={0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={[1.19, 1.11, 1.19]}>
        <sphereGeometry args={[1.15, 28, 22]} />
        <meshBasicMaterial color={membraneColor} wireframe transparent opacity={0.22} />
      </mesh>

      {isPlant ? (
        <mesh scale={[1.27, 1.2, 1.27]}>
          <sphereGeometry args={[1.15, 20, 16]} />
          <meshBasicMaterial color="#4ade80" wireframe transparent opacity={0.13} />
        </mesh>
      ) : null}

      <mesh position={[-0.18, 0.25, 0.3]}>
        <sphereGeometry args={[0.34, 32, 24]} />
        <meshStandardMaterial color="#a78bfa" emissive="#7c3aed" emissiveIntensity={0.35} roughness={0.3} />
        <mesh position={[0.08, 0.08, 0.12]}>
          <sphereGeometry args={[0.12, 20, 16]} />
          <meshStandardMaterial color="#f5d0fe" emissive="#e879f9" emissiveIntensity={0.5} />
        </mesh>
      </mesh>

      <mesh position={isPlant ? [0.18, -0.12, 0.25] : [-0.65, -0.22, 0.32]} scale={vacuoleScale}>
        <sphereGeometry args={[0.52, 32, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.28}
          roughness={0.1}
          depthWrite={false}
        />
      </mesh>

      {!isPlant ? (
        <>
          <Mitochondrion position={[0.62, -0.35, 0.45]} energy={0.6} />
          <Mitochondrion position={[-0.15, -0.62, 0.55]} energy={0.45} />
          <Mitochondrion position={[0.45, 0.58, 0.35]} energy={0.5} />
        </>
      ) : (
        <>
          <Mitochondrion position={[0.62, -0.35, 0.45]} energy={isEnergy ? nutrients / 100 : 0.55} />
          <Mitochondrion position={[-0.7, 0.45, 0.35]} energy={isEnergy ? nutrients / 100 : 0.4} />
          <Chloroplast position={[0.7, -0.18, 0.35]} light={isEnergy ? light / 100 : 0.6} />
          <Chloroplast position={[-0.55, -0.55, 0.4]} light={isEnergy ? light / 100 : 0.45} />
          <Chloroplast position={[0.25, 0.68, 0.4]} light={isEnergy ? light / 100 : 0.5} />
        </>
      )}

      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          active={activeHotspot === hotspot.id}
          onClick={() => onHotspot?.(hotspot.id)}
        />
      ))}

      <mesh rotation={[1.2, 0.4, 0.6]}>
        <torusGeometry args={[0.72, 0.012, 8, 80]} />
        <meshBasicMaterial color={membraneColor} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[0.4, 1.1, -0.5]}>
        <torusGeometry args={[0.88, 0.01, 8, 80]} />
        <meshBasicMaterial color="#8df5df" transparent opacity={0.23} />
      </mesh>
    </>
  );
}

function MicroscopeModel({
  hotspots,
  activeHotspot,
  onHotspot
}: {
  hotspots: ViewerHotspot[];
  activeHotspot: string | null;
  onHotspot?: (id: string) => void;
}) {
  return (
    <group position={[0, -0.15, 0]} rotation={[0.08, -0.3, 0]}>
      <mesh position={[0, -1.15, 0]}>
        <boxGeometry args={[1.5, 0.16, 0.95]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[-0.55, -0.45, 0]}>
        <boxGeometry args={[0.18, 1.35, 0.22]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.25, 0.25, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.17, 0.2, 1.15, 24]} />
        <meshStandardMaterial color="#58e6c5" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.13, 0.17, 0.3, 24]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.28, 0.02]}>
        <cylinderGeometry args={[0.24, 0.24, 0.14, 24]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
      </mesh>
      {[0.66, 0.52, 0.38].map((z, index) => (
        <mesh key={z} position={[0, 0.05 - index * 0.06, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.075, 0.09, 0.22, 18]} />
          <meshStandardMaterial color="#7dd3fc" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, -0.42, 0.42]}>
        <boxGeometry args={[0.85, 0.08, 0.58]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.4} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.78, 0.22]}>
        <sphereGeometry args={[0.13, 20, 16]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={1.3} />
      </mesh>
      <pointLight position={[0, -0.75, 0.35]} color="#fde68a" intensity={4} distance={3} />

      {hotspots.map((hotspot) => (
        <HotspotMarker
          key={hotspot.id}
          hotspot={hotspot}
          active={activeHotspot === hotspot.id}
          onClick={() => onHotspot?.(hotspot.id)}
        />
      ))}
    </group>
  );
}

function SceneRig({
  rotation,
  zoom,
  autoRotate,
  children
}: {
  rotation: { x: number; y: number };
  zoom: number;
  autoRotate: boolean;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    if (autoRotate) {
      group.current.rotation.y += delta * 0.3;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.14;
    } else {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, rotation.y, 0.18);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, rotation.x, 0.18);
    }
    const target = zoom;
    const current = group.current.scale.x;
    group.current.scale.setScalar(THREE.MathUtils.lerp(current, target, 0.15));
  });
  return <group ref={group}>{children}</group>;
}

export default function Cell3DViewer({
  model,
  glbUrl,
  hotspots = [],
  activeHotspot = null,
  onHotspot,
  water = 70,
  light = 60,
  nutrients = 65,
  label
}: Cell3DViewerProps) {
  const [rotation, setRotation] = useState({ x: 0.1, y: -0.25 });
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(!prefersReducedMotion());
  const dragRef = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);

  const rotate = (direction: 'left' | 'right' | 'up' | 'down') => {
    setAutoRotate(false);
    setRotation((current) => {
      if (direction === 'left') return { ...current, y: current.y - 0.35 };
      if (direction === 'right') return { ...current, y: current.y + 0.35 };
      if (direction === 'up') return { ...current, x: Math.max(-1.1, current.x - 0.25) };
      return { ...current, x: Math.min(1.1, current.x + 0.25) };
    });
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragRef.current = { x: event.clientX, y: event.clientY, originX: rotation.x, originY: rotation.y };
    setAutoRotate(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setRotation({
      x: Math.max(-1.1, Math.min(1.1, dragRef.current.originX + (event.clientY - dragRef.current.y) * 0.007)),
      y: dragRef.current.originY + (event.clientX - dragRef.current.x) * 0.009
    });
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const reset = () => {
    setRotation({ x: 0.1, y: -0.25 });
    setZoom(1);
    setAutoRotate(!prefersReducedMotion());
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="mint">
            <MousePointer2 className="size-3.5" aria-hidden />
            Modelo 3D interactivo
          </Chip>
          {label ? <span className="text-xs font-bold text-slate-400">{label}</span> : null}
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="sm" variant="ghost" onClick={() => setAutoRotate((current) => !current)} aria-pressed={autoRotate}>
            {autoRotate ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
            {autoRotate ? 'Pausar giro' : 'Girar solo'}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset} aria-label="Reiniciar vista 3D">
            <RotateCcw className="size-4" aria-hidden />
            Reiniciar
          </Button>
        </div>
      </div>

      <div
        className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(88,230,197,0.12),rgba(5,8,23,0.9)_70%)] sm:h-96"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            rotate('left');
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            rotate('right');
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            rotate('up');
          } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            rotate('down');
          } else if (event.key === '+' || event.key === '=') {
            setZoom((current) => Math.min(2.2, current + 0.15));
          } else if (event.key === '-') {
            setZoom((current) => Math.max(0.6, current - 0.15));
          } else if (event.key.toLowerCase() === 'r') {
            reset();
          }
        }}
        tabIndex={0}
        role="application"
        aria-label={`${label ?? 'Modelo 3D'}. Usa las flechas para girar, más y menos para acercar, R para reiniciar.`}
        style={{ touchAction: 'none' }}
      >
        <Canvas
          camera={{ position: [0, 0.1, 3.8], fov: 42 }}
          dpr={[1, 1.8]}
          gl={{ alpha: true, antialias: true }}
          aria-hidden
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[3, 4, 5]} intensity={1.5} color="#e0f2fe" />
          <pointLight position={[-3, -1, 2]} intensity={2.5} color="#58e6c5" />
          <pointLight position={[3, 2, -2]} intensity={1.6} color="#7dd3fc" />
          <SceneRig rotation={rotation} zoom={zoom} autoRotate={autoRotate}>
            {glbUrl ? (
              <Suspense fallback={<MicroscopeModel hotspots={hotspots} activeHotspot={activeHotspot} onHotspot={onHotspot} />}>
                <GLBModel url={glbUrl} scale={1.2} />
              </Suspense>
            ) : model === 'microscope' ? (
              <Suspense fallback={<MicroscopeModel hotspots={hotspots} activeHotspot={activeHotspot} onHotspot={onHotspot} />}>
                <GLBModel
                  url="/models/microscopio_celula.glb"
                  scale={1.3}
                  position={[0, -0.2, 0]}
                  fallback={<MicroscopeModel hotspots={hotspots} activeHotspot={activeHotspot} onHotspot={onHotspot} />}
                />
              </Suspense>
            ) : (
              <CellModel
                model={model}
                hotspots={hotspots}
                activeHotspot={activeHotspot}
                onHotspot={onHotspot}
                water={water}
                light={light}
                nutrients={nutrients}
              />
            )}
          </SceneRig>
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-t from-ink-950/85 to-transparent px-3 pb-2 pt-8 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>Arrastra para girar · rueda del teclado +/−</span>
          <span>Flechas · R reinicia</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1" role="group" aria-label="Controles de rotación">
          <Button size="sm" variant="secondary" onClick={() => rotate('left')} aria-label="Girar a la izquierda">
            <ArrowLeft className="size-4" aria-hidden />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => rotate('up')} aria-label="Girar hacia arriba">
            <ArrowUp className="size-4" aria-hidden />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => rotate('down')} aria-label="Girar hacia abajo">
            <ArrowDown className="size-4" aria-hidden />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => rotate('right')} aria-label="Girar a la derecha">
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
        <div className="flex items-center gap-1" role="group" aria-label="Controles de acercamiento">
          <Button size="sm" variant="secondary" onClick={() => setZoom((current) => Math.max(0.6, current - 0.15))} aria-label="Alejar">
            <Minus className="size-4" aria-hidden />
          </Button>
          <span className="w-12 text-center text-xs font-extrabold text-slate-300">{Math.round(zoom * 100)}%</span>
          <Button size="sm" variant="secondary" onClick={() => setZoom((current) => Math.min(2.2, current + 0.15))} aria-label="Acercar">
            <Plus className="size-4" aria-hidden />
          </Button>
        </div>
      </div>

      {hotspots.length > 0 ? (
        <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            Puntos interactivos · toca los puntos brillantes o elige una estructura
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                type="button"
                onClick={() => onHotspot?.(hotspot.id)}
                className={cn(
                  'min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-bold transition',
                  activeHotspot === hotspot.id
                    ? 'border-mint-400/40 bg-mint-400/12 text-mint-200'
                    : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
                )}
                aria-pressed={activeHotspot === hotspot.id}
              >
                {hotspot.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
