/**
 * SplashCursor — React Bits (reactbits.dev)
 *
 * Smooth glowing cursor follower with fluid lerp interpolation.
 * Automatically disabled on touch screens and under prefers-reduced-motion.
 */
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../lib/utils';

export interface SplashCursorProps {
  color?: string;
  size?: number;
}

export function SplashCursor({ color = '#8df5df', size = 28 }: SplashCursorProps) {
  const [enabled, setEnabled] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on precise pointer devices (desktops/laptops with mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer || prefersReducedMotion()) return;

    setEnabled(true);

    const handleMouseMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.18);
      current.current.y = lerp(current.current.y, target.current.y, 0.18);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x - size / 2}px, ${current.current.y - size / 2}px, 0)`;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [size]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.55,
        filter: 'blur(2px)'
      }}
      aria-hidden="true"
    />
  );
}

export default SplashCursor;
