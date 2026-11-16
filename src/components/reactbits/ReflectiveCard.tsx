import {
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent
} from 'react';
import { cn } from '../../lib/utils';

export interface ReflectiveCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glareOpacity?: number;
  reflectionColor?: string; // Color para el resplandor especular/reflejo
  borderColor?: string;
}

export function ReflectiveCard({
  children,
  className,
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glareOpacity = 0.45,
  reflectionColor = '#10b981',
  borderColor,
  ...props
}: ReflectiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, xPct: 50, yPct: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      const yPct = Math.min(Math.max((y / rect.height) * 100, 0), 100);

      // Calcular inclinación angular 3D
      const rotateX = ((yPct - 50) / 50) * -maxTilt;
      const rotateY = ((xPct - 50) / 50) * maxTilt;

      setTilt({ rotateX, rotateY, xPct, yPct });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Retorno suave a posición neutra
    setTilt({ rotateX: 0, rotateY: 0, xPct: 50, yPct: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative rounded-3xl transition-all duration-300 ease-out will-change-transform',
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d'
      }}
      {...props}
    >
      {/* Contenedor con inclinación 3D física */}
      <div
        className="relative size-full overflow-hidden rounded-3xl border bg-gradient-to-b from-ink-900/95 via-ink-950/95 to-ink-950/95 shadow-2xl transition-transform duration-200 ease-out"
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          borderColor: borderColor ?? (isHovered ? `${reflectionColor}80` : 'rgba(255, 255, 255, 0.12)'),
          boxShadow: isHovered
            ? `0 24px 50px -15px ${reflectionColor}30, 0 0 20px -5px ${reflectionColor}25`
            : '0 10px 30px -15px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Capa de destello especular / Glare reflectivo de React Bits */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: `radial-gradient(circle 320px at ${tilt.xPct}% ${tilt.yPct}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 70%)`
          }}
        />

        {/* Reflejo metálico iridiscente superficial que cruza la tarjeta */}
        <div
          className="pointer-events-none absolute inset-0 z-10 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0.05,
            background: `linear-gradient(${105 + (tilt.xPct - 50) * 0.8}deg, transparent 20%, ${reflectionColor}40 45%, rgba(255, 255, 255, 0.6) 50%, ${reflectionColor}40 55%, transparent 80%)`
          }}
        />

        {/* Resplandor suave perimetral (Borde iluminado) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-3xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.6 : 0.15,
            background: `radial-gradient(circle at ${tilt.xPct}% ${tilt.yPct}%, ${reflectionColor}25 0%, transparent 60%)`
          }}
        />

        {/* Contenido de la tarjeta */}
        <div className="relative z-20 flex size-full flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
