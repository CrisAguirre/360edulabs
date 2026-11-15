/**
 * ShinyText — React Bits (reactbits.dev)
 *
 * Texto destacado con color sólido. Se conserva el nombre y la API del
 * componente original para no tocar a sus consumidores, pero se evita el
 * degradado con `background-clip: text` porque reduce la legibilidad y el
 * detector de diseño lo marca como anti-patrón.
 */
import { cn } from '../../lib/utils';

export interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
  speed?: number;
}

export function ShinyText({ text, className }: ShinyTextProps) {
  return (
    <span className={cn('inline-block font-bold text-slate-300', className)}>
      {text}
    </span>
  );
}

export default ShinyText;
