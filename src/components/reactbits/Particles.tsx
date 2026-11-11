/**
 * Particles — React Bits (reactbits.dev)
 *
 * High-performance 2D canvas particle background with drifting nodes,
 * connecting proximity lines, and optional cursor repulsion.
 */
import { useEffect, useRef } from 'react';
import { cn, prefersReducedMotion } from '../../lib/utils';

export interface ParticlesProps {
  className?: string;
  count?: number;
  color?: string;
  speed?: number;
  connectDistance?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
}

export function Particles({
  className,
  count = 40,
  color = '#8df5df',
  speed = 0.3,
  connectDistance = 100,
  interactive = true
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight);

    const mouse = { x: -9999, y: -9999, active: false };
    const reducedMotion = prefersReducedMotion();

    // Generate particles
    const particles: Particle[] = Array.from({ length: count }, () => {
      const radius = 1 + Math.random() * 2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        radius,
        baseRadius: radius,
        alpha: 0.25 + Math.random() * 0.5
      };
    });

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDistance) {
            const lineAlpha = (1 - dist / connectDistance) * 0.15;
            ctx.strokeStyle = color;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (const p of particles) {
        if (!reducedMotion) {
          // Mouse repulsion
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 90;
            if (dist < maxDist && dist > 0) {
              const force = (maxDist - dist) / maxDist;
              p.x += (dx / dist) * force * 2.5;
              p.y += (dy / dist) * force * 2.5;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [count, color, speed, connectDistance, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
      aria-hidden="true"
    />
  );
}

export default Particles;
