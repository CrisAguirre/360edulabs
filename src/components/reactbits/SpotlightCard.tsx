/**
 * SpotlightCard — React Bits (reactbits.dev)
 *
 * A card that tracks the cursor and casts a glowing radial gradient spotlight
 * across the card and its border on hover.
 */
import { useRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(88, 230, 197, 0.16)',
  borderColor = 'rgba(88, 230, 197, 0.45)',
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
    onMouseMove?.(event);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    setOpacity(1);
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    setOpacity(0);
    onMouseLeave?.(event);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/10 bg-ink-950/60 p-5 transition-colors',
        className
      )}
      {...rest}
    >
      {/* Radial spotlight on content */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`
        }}
        aria-hidden="true"
      />

      {/* Subtle border glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          boxShadow: `inset 0 0 0 1px ${borderColor}`
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default SpotlightCard;
