import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function CitoMascot({
  size = 120,
  className,
  mood = 'happy'
}: {
  size?: number;
  className?: string;
  mood?: 'happy' | 'curious' | 'celebrating';
}) {
  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{ width: size, height: size }}
      animate={mood === 'celebrating' ? { rotate: [0, -5, 5, 0], y: [0, -6, 0] } : undefined}
      transition={mood === 'celebrating' ? { duration: 1.6, repeat: Infinity } : undefined}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-mint-400/25 blur-2xl" />
      <svg viewBox="0 0 160 160" className="relative drop-shadow-[0_20px_35px_rgba(43,212,173,0.3)]">
        <defs>
          <linearGradient id="cito-body" x1="22" y1="20" x2="140" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8df5df" />
            <stop offset="0.55" stopColor="#58e6c5" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id="cito-cheek" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#f472b6" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M48 38c-17 9-29 30-27 55 3 30 27 51 57 50 25-1 44-15 53-36 10-24 4-51-14-65-16-12-37-11-52-7-6 2-12 1-17 3Z"
          fill="url(#cito-body)"
        />
        <path
          d="M42 55c-7 8-12 20-12 33M118 51c8 9 13 23 11 38"
          stroke="#ffffff"
          strokeOpacity="0.28"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="64" cy="84" rx="13" ry="15" fill="#071022" />
        <ellipse cx="100" cy="80" rx="12" ry="14" fill="#071022" />
        <circle cx="68" cy="78" r="4.2" fill="#ffffff" />
        <circle cx="104" cy="74" r="3.8" fill="#ffffff" />
        <ellipse cx="52" cy="102" rx="10" ry="7" fill="url(#cito-cheek)" />
        <ellipse cx="112" cy="97" rx="9" ry="6" fill="url(#cito-cheek)" />
        <path
          d={mood === 'curious' ? 'M72 108c6 2 12 2 18-1' : 'M71 105c6 6 15 6 21 0'}
          stroke="#071022"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M40 126c-8 4-12 11-12 19M121 123c8 4 12 11 12 19"
          stroke="#58e6c5"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M42 36c-4-8-2-15 5-20M118 34c5-7 4-14-2-20"
          stroke="#7dd3fc"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative grid size-10 place-items-center rounded-2xl bg-gradient-to-br from-mint-300 to-sky-400 shadow-[0_8px_24px_-8px_rgba(88,230,197,0.7)]">
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden>
          <path
            d="M10 10c-4 4-4 10 1 13 4 2 8 0 9-3 1-2 4-3 4-6 1-4-3-7-7-6-3 1-5 0-7 2Z"
            fill="#061022"
          />
          <circle cx="14" cy="15" r="2.3" fill="#8df5df" />
          <circle cx="21" cy="14" r="1.8" fill="#8df5df" />
        </svg>
      </span>
      {!compact ? (
        <span className="leading-none">
          <span className="block font-display text-lg font-extrabold tracking-tight text-white">
            CitoIndagar <span className="text-mint-300">360</span>
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Agencia de exploradores
          </span>
        </span>
      ) : null}
    </span>
  );
}
