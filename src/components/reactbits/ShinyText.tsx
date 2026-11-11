/**
 * ShinyText — React Bits (reactbits.dev)
 *
 * Metallic light-sweep animation flowing continuously across text elements.
 */
import { cn } from '../../lib/utils';

export interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
}

export function ShinyText({
  text,
  className,
  disabled = false,
  speed = 3
}: ShinyTextProps) {
  return (
    <span
      className={cn(
        'relative inline-block font-bold text-slate-300',
        disabled ? '' : 'shine-animate',
        className
      )}
      style={
        disabled
          ? undefined
          : {
              backgroundImage:
                'linear-gradient(120deg, rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0) 65%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animation: `shine-sweep ${speed}s linear infinite`
            }
      }
    >
      <style>{`
        @keyframes shine-sweep {
          0% { background-position: 150% 0; }
          100% { background-position: -50% 0; }
        }
      `}</style>
      {text}
    </span>
  );
}

export default ShinyText;
