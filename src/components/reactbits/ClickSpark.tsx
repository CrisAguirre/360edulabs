/**
 * ClickSpark — React Bits (reactbits.dev)
 *
 * Micro-interaction wrapper that emits radiating spark particles
 * from the exact point of user click.
 */
import { useState, type MouseEvent, type ReactNode } from 'react';
import { cn, prefersReducedMotion } from '../../lib/utils';

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkCount?: number;
  className?: string;
}

export function ClickSpark({
  children,
  sparkColor = '#8df5df',
  sparkCount = 8,
  className
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, index) => {
      const angle = (index * (360 / sparkCount) * Math.PI) / 180;
      return {
        id: Date.now() + index + Math.random(),
        x: clickX,
        y: clickY,
        angle,
        distance: 28 + Math.random() * 20
      };
    });

    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 600);
  };

  return (
    <div onClick={handleClick} className={cn('relative inline-block overflow-visible', className)}>
      <style>{`
        @keyframes spark-burst {
          0% { transform: translate3d(0, 0, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(var(--dx), var(--dy), 0) scale(0); opacity: 0; }
        }
      `}</style>
      {children}
      {sparks.map((spark) => {
        const targetX = Math.cos(spark.angle) * spark.distance;
        const targetY = Math.sin(spark.angle) * spark.distance;

        return (
          <span
            key={spark.id}
            className="pointer-events-none absolute size-1.5 rounded-full"
            style={{
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              backgroundColor: sparkColor,
              boxShadow: `0 0 6px ${sparkColor}`,
              animation: 'spark-burst 550ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
              ['--dx' as string]: `${targetX}px`,
              ['--dy' as string]: `${targetY}px`
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}

export default ClickSpark;
