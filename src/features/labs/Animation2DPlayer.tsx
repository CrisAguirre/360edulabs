import { ArrowLeftRight, Clock3, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Card, Chip } from '../../components/ui';
import { cn } from '../../lib/utils';
import type { ActivityRuntimeProps } from './types';

interface TimelineItem {
  year?: string;
  name?: string;
  icon?: string;
  text?: string;
}

interface SpotlightCard {
  id: string;
  title: string;
  icon: string;
  text: string;
  accent: string;
}

interface Particle {
  id: string;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export function Animation2DPlayer({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const items: TimelineItem[] = Array.isArray(content.items) ? content.items : [];
  const cards: SpotlightCard[] = Array.isArray(content.cards) ? content.cards : [];
  const particles: Particle[] = Array.isArray(content.particles) ? content.particles : [];
  const steps: Array<{ title: string; text: string }> = Array.isArray(content.steps) ? content.steps : [];
  const [activeCard, setActiveCard] = useState<string | null>(cards[0]?.id ?? null);
  const [compare, setCompare] = useState(50);
  const selectedCard = cards.find((card) => card.id === activeCard) ?? cards[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <Chip tone="rose">
            <Sparkles className="size-3.5" aria-hidden />
            Animación 2D interactiva
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">{content.title ?? activity.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{content.intro}</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="relative space-y-3 pl-6 sm:pl-8">
          <div className="timeline-rail" aria-hidden />
          {items.map((item, index) => (
            <div key={`${item.year}-${item.name}-${index}`} className="relative">
              <span className="absolute -left-[1.9rem] top-4 grid size-8 place-items-center rounded-full border border-rose-400/30 bg-ink-900 text-sm sm:-left-[2.4rem]">
                {item.icon ?? <Clock3 className="size-4" aria-hidden />}
              </span>
              <Card className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="rose">{item.year}</Chip>
                  <h4 className="text-sm font-extrabold text-white">{item.name}</h4>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{item.text}</p>
              </Card>
            </div>
          ))}
        </div>
      ) : null}

      {content.spotlight ? (
        <Card className="border-rose-400/20 p-5">
          <h4 className="text-lg font-bold text-white">{content.spotlight.title}</h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {content.spotlight.cards?.map((card: { title: string; text: string }) => (
              <div key={card.title} className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <p className="text-sm font-extrabold text-rose-200">{card.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{card.text}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {cards.length > 0 ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {cards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveCard(card.id)}
                className={cn(
                  'min-h-24 rounded-2xl border p-3 text-left transition',
                  activeCard === card.id
                    ? 'border-white/25 bg-white/8'
                    : 'border-white/8 bg-white/3 hover:bg-white/6'
                )}
                style={activeCard === card.id ? { boxShadow: `inset 0 0 30px ${card.accent}22` } : undefined}
                aria-pressed={activeCard === card.id}
              >
                <span className="text-xl" aria-hidden>{card.icon}</span>
                <span className="mt-1 block text-xs font-extrabold text-white">{card.title}</span>
              </button>
            ))}
          </div>
          {selectedCard ? (
            <Card className="p-4" style={{ borderColor: `${selectedCard.accent}44` }}>
              <p className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: selectedCard.accent }}>
                Organelo en primer plano
              </p>
              <h4 className="mt-1 text-lg font-bold text-white">{selectedCard.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{selectedCard.text}</p>
            </Card>
          ) : null}
        </div>
      ) : null}

      {content.slider ? (
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="size-5 text-sky-300" aria-hidden />
            <h4 className="text-lg font-bold text-white">{content.slider.title}</h4>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-sky-400/20 bg-sky-400/8 p-3">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">{content.slider.leftLabel}</p>
              <p className="mt-1 text-sm font-bold text-white">{content.slider.leftValue}</p>
            </div>
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-3">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300">{content.slider.rightLabel}</p>
              <p className="mt-1 text-sm font-bold text-white">{content.slider.rightValue}</p>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={compare}
            onChange={(event) => setCompare(Number(event.target.value))}
            className="range-glow mt-4"
            aria-label="Comparar vacuolas"
          />
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
              style={{ width: `${compare}%` }}
            />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{content.slider.note}</p>
        </Card>
      ) : null}

      {particles.length > 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),rgba(5,8,23,0.9)_70%)] p-5">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {particles.map((particle, index) => (
              <span
                key={particle.id}
                className="absolute size-2 rounded-full opacity-60"
                style={{
                  left: `${18 + index * 28}%`,
                  bottom: '0%',
                  background: particle.color,
                  boxShadow: `0 0 16px ${particle.color}`,
                  animation: `particle-rise ${5 + index}s linear infinite`,
                  animationDelay: `${index * 1.4}s`
                }}
              />
            ))}
          </div>
          <div className="relative grid gap-2 sm:grid-cols-3">
            {particles.map((particle) => (
              <div key={particle.id} className="rounded-2xl border border-white/10 bg-ink-950/55 p-3">
                <span className="text-xl" aria-hidden>{particle.icon}</span>
                <p className="mt-1 text-sm font-extrabold text-white">{particle.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">{particle.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {steps.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-white/8 bg-white/3 p-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Paso {index + 1}</span>
              <p className="mt-1 text-sm font-extrabold text-white">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-300">{step.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
