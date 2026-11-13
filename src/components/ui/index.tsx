import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Inbox,
  Loader2,
  LockKeyhole,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  X
} from 'lucide-react';
import {
  useEffect,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import type { EvidenceStatus, MissionStatus } from '../../lib/types';
import { cn, initials } from '../../lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold' | 'soft';
type ButtonSize = 'sm' | 'md' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-mint-400 text-ink-950 hover:bg-mint-300 shadow-[0_12px_30px_-10px_rgba(88,230,197,0.7)] font-extrabold',
  secondary:
    'bg-white/8 text-white border border-white/14 hover:bg-white/14 hover:border-white/25 font-bold',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/8 font-bold',
  danger:
    'bg-rose-500/90 text-white hover:bg-rose-500 shadow-[0_12px_30px_-12px_rgba(244,63,94,0.7)] font-extrabold',
  gold:
    'bg-sun-glow text-ink-950 hover:bg-amber-300 shadow-[0_12px_30px_-10px_rgba(251,191,36,0.65)] font-extrabold',
  soft: 'bg-mint-400/12 text-mint-300 border border-mint-400/25 hover:bg-mint-400/20 font-bold'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-3.5 py-2 text-sm rounded-xl gap-1.5',
  md: 'min-h-11 px-5 py-2.5 text-sm rounded-2xl gap-2',
  lg: 'min-h-13 px-6 py-3 text-base rounded-2xl gap-2.5'
};

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(
    'btn-shine inline-flex items-center justify-center text-center transition-all duration-200 disabled:pointer-events-none disabled:opacity-45 active:translate-y-px',
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClass(variant, size, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

interface LinkButtonProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function LinkButton({ variant = 'primary', size = 'md', className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('glass rounded-3xl', className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl space-y-1.5">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {description ? <p className="text-sm leading-relaxed text-slate-400 sm:text-base">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = '#58e6c5',
  className,
  label
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  label?: string;
}) {
  const percent = max <= 0 ? 0 : Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className={cn('space-y-1.5', className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>{label}</span>
          <span className="text-slate-300">{percent}%</span>
        </div>
      ) : null}
      <div
        className="h-2.5 overflow-hidden rounded-full bg-white/8"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progreso'}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: `linear-gradient(90deg, ${color}bb, ${color})`,
            boxShadow: `0 0 18px ${color}66`
          }}
        />
      </div>
    </div>
  );
}

export function ProgressRing({
  value,
  size = 104,
  stroke = 8,
  color = '#58e6c5',
  children,
  label
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
  label?: string;
}) {
  const percent = Math.min(100, Math.max(0, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease', filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        {children ?? (
          <span className="font-display text-xl font-bold text-white">
            {Math.round(percent)}%
            {label ? <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span> : null}
          </span>
        )}
      </div>
    </div>
  );
}

export function Chip({
  children,
  tone = 'neutral',
  className
}: {
  children: ReactNode;
  tone?: 'neutral' | 'mint' | 'sky' | 'gold' | 'rose' | 'grape';
  className?: string;
}) {
  const tones = {
    neutral: 'bg-white/8 text-slate-300 border-white/10',
    mint: 'bg-mint-400/12 text-mint-300 border-mint-400/25',
    sky: 'bg-sky-400/12 text-sky-200 border-sky-400/25',
    gold: 'bg-amber-400/12 text-amber-200 border-amber-400/25',
    rose: 'bg-rose-400/12 text-rose-200 border-rose-400/25',
    grape: 'bg-violet-400/12 text-violet-200 border-violet-400/25'
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const missionStatusMeta: Record<MissionStatus, { label: string; tone: 'neutral' | 'mint' | 'sky' | 'gold' | 'rose' | 'grape'; icon: typeof Play }> = {
  locked: { label: 'Bloqueada', tone: 'neutral', icon: LockKeyhole },
  available: { label: 'Disponible', tone: 'sky', icon: Sparkles },
  in_progress: { label: 'En curso', tone: 'gold', icon: Play },
  completed: { label: 'Completada', tone: 'mint', icon: CheckCircle2 }
};

export function MissionStatusBadge({ status }: { status: MissionStatus }) {
  const meta = missionStatusMeta[status] ?? missionStatusMeta.available;
  const Icon = meta.icon;
  return (
    <Chip tone={meta.tone}>
      <Icon className="size-3.5" aria-hidden />
      {meta.label}
    </Chip>
  );
}

const evidenceStatusMeta: Record<EvidenceStatus, { label: string; tone: 'neutral' | 'mint' | 'sky' | 'gold' | 'rose' | 'grape'; icon: typeof Clock }> = {
  draft: { label: 'Borrador', tone: 'neutral', icon: Clock },
  submitted: { label: 'En revisión', tone: 'sky', icon: Clock },
  approved: { label: 'Aprobada', tone: 'mint', icon: CheckCircle2 },
  changes_requested: { label: 'Ajustes pedidos', tone: 'rose', icon: AlertTriangle }
};

export function EvidenceStatusBadge({ status }: { status: EvidenceStatus }) {
  const meta = evidenceStatusMeta[status] ?? evidenceStatusMeta.draft;
  const Icon = meta.icon;
  return (
    <Chip tone={meta.tone}>
      <Icon className="size-3.5" aria-hidden />
      {meta.label}
    </Chip>
  );
}

export function Avatar({ name, size = 'md', accent }: { name: string; size?: 'sm' | 'md' | 'lg'; accent?: string }) {
  const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-14 text-lg' };
  return (
    <span
      className={cn('inline-grid place-items-center rounded-2xl font-extrabold text-ink-950 shadow-lg', sizes[size])}
      style={{ background: `linear-gradient(145deg, ${accent ?? '#8df5df'}, ${accent ? `${accent}99` : '#7dd3fc'})` }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md'
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) {
  useEffect(() => {
    if (!open) return;
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handle);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handle);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-ink-950/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className={cn('glass my-8 w-full rounded-3xl p-5 sm:p-7', sizes[size])}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 id="modal-title" className="text-xl font-bold text-white">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar ventana"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="text-sm leading-relaxed text-slate-300">{children}</div>
            {footer ? <div className="mt-6 flex flex-wrap justify-end gap-2">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function LoadingBlock({ message = 'Cargando tu laboratorio…' }: { message?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <div className="relative">
        <Loader2 className="size-10 animate-spin text-mint-400" aria-hidden />
        <div className="absolute inset-0 -z-10 rounded-full bg-mint-400/20 blur-2xl" />
      </div>
      <p className="text-sm font-bold text-slate-400">{message}</p>
    </div>
  );
}

export function ErrorBlock({
  title = 'Algo salió mal',
  message,
  onRetry
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="glass mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl p-8 text-center">
      <div className="grid size-16 place-items-center rounded-2xl bg-rose-400/12 text-rose-300">
        <ShieldAlert className="size-8" aria-hidden />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-400">{message ?? 'No pudimos cargar esta información.'}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <Button variant="secondary" onClick={onRetry}>
            <RotateCcw className="size-4" aria-hidden />
            Intentar de nuevo
          </Button>
        ) : null}
        <LinkButton to="/estudiante" variant="ghost">
          <ArrowLeft className="size-4" aria-hidden />
          Volver a misiones
        </LinkButton>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  action
}: {
  title: string;
  description: string;
  icon?: typeof Inbox;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-white/12 px-6 py-10 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-white/6 text-slate-400">
        <Icon className="size-7" aria-hidden />
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="mt-1 max-w-md text-sm text-slate-400">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = '#58e6c5'
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: typeof Inbox;
  accent?: string;
}) {
  return (
    <div className="glass-soft rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-1 font-display text-2xl font-bold text-white">{value}</p>
          {hint ? <p className="mt-0.5 text-xs text-slate-500">{hint}</p> : null}
        </div>
        {Icon ? (
          <span
            className="grid size-10 place-items-center rounded-xl"
            style={{ background: `${accent}1f`, color: accent }}
          >
            <Icon className="size-5" aria-hidden />
          </span>
        ) : null}
      </div>
    </div>
  );
}
