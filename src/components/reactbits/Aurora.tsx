/**
 * Aurora — React Bits (reactbits.dev)
 *
 * Fluid, Northern Lights-style glowing gradient waves that slowly morph
 * and drift in the background to provide an ethereal cellular atmosphere.
 */
import { cn } from '../../lib/utils';

export interface AuroraProps {
  className?: string;
  colors?: [string, string, string];
  opacity?: number;
}

export function Aurora({
  className,
  colors = ['#58e6c5', '#7dd3fc', '#a78bfa'],
  opacity = 0.28
}: AuroraProps) {
  const [c1, c2, c3] = colors;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10 overflow-hidden',
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate3d(-15%, -10%, 0) scale(1); }
          50% { transform: translate3d(20%, 15%, 0) scale(1.18); }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate3d(25%, 10%, 0) scale(1.1); }
          50% { transform: translate3d(-20%, -15%, 0) scale(0.9); }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate3d(0%, 30%, 0) scale(0.95); }
          50% { transform: translate3d(15%, -20%, 0) scale(1.15); }
        }
      `}</style>

      {/* Aurora Orb 1 */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[140%] w-[80%] rounded-full opacity-60 blur-[85px] will-change-transform"
        style={{
          background: `radial-gradient(ellipse at center, ${c1} 0%, transparent 68%)`,
          animation: 'aurora-1 22s ease-in-out infinite'
        }}
      />

      {/* Aurora Orb 2 */}
      <div
        className="absolute -right-1/4 -top-1/4 h-[140%] w-[80%] rounded-full opacity-55 blur-[85px] will-change-transform"
        style={{
          background: `radial-gradient(ellipse at center, ${c2} 0%, transparent 68%)`,
          animation: 'aurora-2 26s ease-in-out infinite'
        }}
      />

      {/* Aurora Orb 3 */}
      <div
        className="absolute bottom-0 left-1/4 h-[120%] w-[70%] rounded-full opacity-45 blur-[95px] will-change-transform"
        style={{
          background: `radial-gradient(ellipse at center, ${c3} 0%, transparent 68%)`,
          animation: 'aurora-3 30s ease-in-out infinite'
        }}
      />
    </div>
  );
}

export default Aurora;
