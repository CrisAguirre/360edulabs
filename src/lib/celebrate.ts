import confetti from 'canvas-confetti';
import { prefersReducedMotion } from './utils';

export function celebrate(intensity: 'small' | 'big' = 'big') {
  if (prefersReducedMotion()) return;
  const colors = ['#58e6c5', '#7dd3fc', '#fbbf24', '#a78bfa', '#f472b6'];
  if (intensity === 'small') {
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.75 }, colors, scalar: 0.9 });
    return;
  }
  confetti({
    particleCount: 140,
    spread: 90,
    origin: { y: 0.7 },
    colors,
    scalar: 1.05
  });
  window.setTimeout(() => {
    confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors });
  }, 250);
}
