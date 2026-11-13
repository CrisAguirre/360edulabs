import { BookOpenCheck, ChevronDown, ChevronUp, FlaskConical, Lightbulb, Microscope, Quote, Sparkles, Star } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Card, Chip } from '../../components/ui';
import type { ActivityRuntimeProps } from './types';
import { AnimatedList, Aurora, BlurText, ClickSpark, DecryptedText, ShinyText, SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';

interface Scientist {
  name?: string;
  year?: string;
  icon?: string;
  contribution?: string;
  text?: string;
}

interface GlossaryItem {
  term: string;
  definition: string;
}

interface TableRow {
  structure?: string;
  animal?: string;
  plant?: string;
  function?: string;
}

interface ProcessRow {
  process?: string;
  where?: string;
  needs?: string;
  produces?: string;
  who?: string;
}

/* ── Flip card for postulates ───────────────────────────────── */
function PostulateCard({
  postulate,
  index,
  onReveal
}: {
  postulate: string;
  index: number;
  onReveal?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      onReveal?.();
    }
  };

  return (
    <ClickSpark sparkColor="#58e6c5" sparkCount={6}>
      <li
        role="button"
        tabIndex={0}
        aria-label={`Postulado ${index + 1}: ${revealed ? postulate : 'Toca para revelar'}`}
        onClick={handleReveal}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleReveal()}
        className={cn(
          'relative cursor-pointer overflow-hidden rounded-2xl border p-4 text-sm font-semibold leading-relaxed shadow-sm transition-all duration-500',
          revealed
            ? 'border-mint-400/30 bg-mint-400/10 text-mint-100'
            : 'border-white/15 bg-white/5 text-slate-400 hover:border-mint-400/25 hover:bg-mint-400/5'
        )}
      >
        <span className="mb-1 block font-display text-xl font-extrabold text-mint-300">{index + 1}</span>
        {revealed ? (
          <BlurText text={postulate} delay={0.02} className="text-mint-100" animateBy="words" />
        ) : (
          <span className="flex items-center gap-2 text-xs tracking-wide text-slate-500">
            <Star className="size-4 animate-pulse text-mint-400/50" aria-hidden />
            ¡Toca para descubrir!
          </span>
        )}
      </li>
    </ClickSpark>
  );
}

/* ── Expandable scientist card ──────────────────────────────── */
function ScientistCard({ scientist }: { scientist: Scientist }) {
  const [expanded, setExpanded] = useState(false);
  const description = scientist.contribution ?? scientist.text ?? '';

  return (
    <div className="relative">
      <span className="absolute -left-[1.85rem] top-4 grid size-8 place-items-center rounded-full border border-mint-400/40 bg-ink-900 text-sm sm:-left-[2.35rem]">
        {scientist.icon ?? '🔬'}
      </span>
      <ClickSpark sparkColor="#38bdf8" sparkCount={5}>
        <SpotlightCard
          spotlightColor="rgba(88, 230, 197, 0.15)"
          borderColor="rgba(88, 230, 197, 0.3)"
          className="cursor-pointer p-4 transition-all duration-300 sm:p-5"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-extrabold text-white">{scientist.name}</h3>
              <Chip tone="sky">{scientist.year}</Chip>
            </div>
            {expanded ? (
              <ChevronUp className="size-4 text-mint-300 transition-transform" aria-hidden />
            ) : (
              <ChevronDown className="size-4 text-slate-400 transition-transform" aria-hidden />
            )}
          </div>

          <div
            className={cn(
              'overflow-hidden transition-all duration-500 ease-in-out',
              expanded ? 'mt-2 max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="text-sm leading-relaxed text-slate-300">
              <BlurText text={description} delay={0.015} className="text-slate-300" animateBy="words" />
            </div>
          </div>

          {!expanded && description.length > 0 && (
            <p className="mt-1.5 text-xs text-slate-500">
              <Sparkles className="mb-0.5 mr-1 inline size-3 text-mint-400/60" aria-hidden />
              Toca para conocer su aporte
            </p>
          )}
        </SpotlightCard>
      </ClickSpark>
    </div>
  );
}

/* ── Interactive glossary term ──────────────────────────────── */
function GlossaryTerm({ item }: { item: GlossaryItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <SpotlightCard
      spotlightColor="rgba(167, 139, 250, 0.15)"
      borderColor="rgba(167, 139, 250, 0.3)"
      className="cursor-pointer p-3 transition-all hover:scale-[1.02]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <dt className="text-sm font-extrabold text-mint-300">
        <DecryptedText
          text={item.term}
          speed={40}
          triggerOnHover={false}
          className="text-mint-300"
        />
      </dt>
      <dd className="mt-1 text-sm leading-relaxed text-slate-300">
        {hovered ? (
          <BlurText text={item.definition} delay={0.01} className="text-slate-300" animateBy="words" />
        ) : (
          <span className="text-slate-500 text-xs">Pasa el cursor para revelar...</span>
        )}
      </dd>
    </SpotlightCard>
  );
}

/* ── Bottom engagement: idea selector ───────────────────────── */
function IdeaReflection({ scientists }: { scientists: Scientist[] }) {
  const ideas = scientists.filter(s => s.contribution || s.text).map(s => ({
    name: s.name ?? 'Científico',
    idea: s.contribution ?? s.text ?? ''
  }));

  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = useCallback((idx: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else if (next.size < 2) next.add(idx);
      return next;
    });
  }, []);

  if (ideas.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-4">
        <Quote className="mt-0.5 size-5 shrink-0 text-sky-300" aria-hidden />
        <p className="text-sm leading-relaxed text-slate-300">
          Mientras lees, piensa en una idea que puedas explicar con tus propias palabras. La usarás en tu evidencia.
        </p>
      </div>
    );
  }

  return (
    <SpotlightCard
      spotlightColor="rgba(56, 189, 248, 0.12)"
      borderColor="rgba(56, 189, 248, 0.3)"
      className="p-5"
    >
      <div className="flex items-center gap-2">
        <Quote className="size-5 text-sky-300" aria-hidden />
        <h3 className="text-base font-bold text-white">
          <ShinyText text="🎯 Elige las 2 ideas más importantes" speed={5} className="font-bold text-sky-200" />
        </h3>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        Selecciona los aportes científicos que consideres más relevantes. Esto te ayudará a preparar tu evidencia.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {ideas.map((idea, idx) => (
          <ClickSpark key={idea.name} sparkColor="#fbbf24" sparkCount={8}>
            <button
              type="button"
              onClick={() => toggle(idx)}
              className={cn(
                'w-full rounded-xl border p-3 text-left text-sm transition-all duration-300',
                selected.has(idx)
                  ? 'border-amber-400/40 bg-amber-400/12 text-amber-100 shadow-lg shadow-amber-400/10'
                  : 'border-white/10 bg-white/3 text-slate-400 hover:border-sky-400/20 hover:bg-sky-400/5'
              )}
            >
              <span className="block text-xs font-extrabold text-sky-300">{idea.name}</span>
              <span className="mt-1 block leading-relaxed">
                {idea.idea.length > 100 ? idea.idea.slice(0, 100) + '…' : idea.idea}
              </span>
              {selected.has(idx) && (
                <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  <Star className="size-3" aria-hidden /> Seleccionada
                </span>
              )}
            </button>
          </ClickSpark>
        ))}
      </div>

      {selected.size === 2 && (
        <div className="mt-4 rounded-xl border border-mint-400/25 bg-mint-400/8 p-3 text-center text-sm font-semibold text-mint-200">
          <Sparkles className="mb-0.5 mr-1 inline size-4" aria-hidden />
          ¡Excelente selección! Usa estas ideas para redactar tu evidencia con tus propias palabras.
        </div>
      )}
    </SpotlightCard>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export function ReadingPlayer({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, unknown>;
  const scientists: Scientist[] = Array.isArray(content.scientists) ? content.scientists : [];
  const postulates: string[] = Array.isArray(content.postulates) ? content.postulates : [];
  const sections: Array<{ heading: string; body: string }> = Array.isArray(content.sections) ? content.sections : [];
  const comparisonTable: TableRow[] = Array.isArray(content.comparisonTable) ? content.comparisonTable : [];
  const comparison: ProcessRow[] = Array.isArray(content.comparison) ? content.comparison : [];
  const glossary: GlossaryItem[] = Array.isArray(content.glossary) ? content.glossary : [];

  const [revealedPostulates, setRevealedPostulates] = useState(0);

  const handlePostulateReveal = useCallback(() => {
    setRevealedPostulates((prev) => prev + 1);
  }, []);

  return (
    <article className="space-y-6">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="relative overflow-hidden rounded-3xl border border-white/10 p-5 sm:p-6">
        <Aurora
          className="rounded-3xl"
          opacity={0.25}
          colors={['#58e6c5', '#38bdf8', '#818cf8']}
        />
        <div className="relative">
          <Chip tone="mint">
            <BookOpenCheck className="size-3.5" aria-hidden />
            Lectura guiada
          </Chip>
          <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
            {(content.title as string) ?? activity.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{content.intro as string}</p>
        </div>
      </header>

      {/* ── Sections (chapters) ─────────────────────────── */}
      {sections.length > 0 ? (
        <AnimatedList className="grid gap-3 md:grid-cols-2" stagger={0.05}>
          {sections.map((section, index) => (
            <SpotlightCard
              key={section.heading}
              spotlightColor="rgba(56, 189, 248, 0.15)"
              borderColor="rgba(56, 189, 248, 0.3)"
              className="p-5"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-sky-400/12 text-xs font-extrabold text-sky-200">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{section.heading}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
            </SpotlightCard>
          ))}
        </AnimatedList>
      ) : null}

      {/* ── Scientists timeline (expandable) ────────────── */}
      {scientists.length > 0 ? (
        <div className="relative pl-6 sm:pl-8">
          <div className="timeline-rail" aria-hidden />
          <AnimatedList className="space-y-3" stagger={0.06}>
            {scientists.map((scientist) => (
              <ScientistCard key={`${scientist.name}-${scientist.year}`} scientist={scientist} />
            ))}
          </AnimatedList>
        </div>
      ) : null}

      {/* ── Postulates (flip-to-reveal) ─────────────────── */}
      {postulates.length > 0 ? (
        <SpotlightCard
          spotlightColor="rgba(88, 230, 197, 0.2)"
          borderColor="rgba(88, 230, 197, 0.4)"
          className="p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Microscope className="size-5 text-mint-300" aria-hidden />
              <h3 className="text-lg font-bold text-white">
                <ShinyText text="Los postulados de la teoría celular" speed={4} className="font-bold text-mint-200" />
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {revealedPostulates}/{postulates.length} revelados
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            🧪 Toca cada tarjeta para descubrir los postulados fundamentales
          </p>

          <ol className="mt-3 grid gap-2 sm:grid-cols-3">
            {postulates.map((postulate, index) => (
              <PostulateCard
                key={postulate}
                postulate={postulate}
                index={index}
                onReveal={handlePostulateReveal}
              />
            ))}
          </ol>

          {revealedPostulates === postulates.length && postulates.length > 0 && (
            <div className="mt-3 text-center text-sm font-semibold text-mint-300">
              <Sparkles className="mb-0.5 mr-1 inline size-4" aria-hidden />
              ¡Has descubierto todos los postulados!
            </div>
          )}
        </SpotlightCard>
      ) : null}

      {/* ── Comparison table (structure) ────────────────── */}
      {comparisonTable.length > 0 ? (
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">Comparación entre célula animal y célula vegetal</caption>
              <thead>
                <tr className="bg-white/6 text-[11px] font-extrabold uppercase tracking-wider text-slate-300">
                  <th className="px-4 py-3" scope="col">Estructura</th>
                  <th className="px-4 py-3" scope="col">Célula animal</th>
                  <th className="px-4 py-3" scope="col">Célula vegetal</th>
                  <th className="px-4 py-3" scope="col">Función</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row) => (
                  <tr key={row.structure} className="border-t border-white/6 align-top">
                    <th className="px-4 py-3 font-extrabold text-white" scope="row">{row.structure}</th>
                    <td className="px-4 py-3 text-slate-300">{row.animal}</td>
                    <td className="px-4 py-3 text-slate-300">{row.plant}</td>
                    <td className="px-4 py-3 text-slate-400">{row.function}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* ── Process comparison cards ────────────────────── */}
      {comparison.length > 0 ? (
        <AnimatedList className="grid gap-3 md:grid-cols-2" stagger={0.06}>
          {comparison.map((row) => (
            <SpotlightCard
              key={row.process}
              spotlightColor="rgba(251, 191, 36, 0.15)"
              borderColor="rgba(251, 191, 36, 0.3)"
              className="p-5"
            >
              <div className="flex items-center gap-2">
                <FlaskConical className="size-5 text-amber-300" aria-hidden />
                <h3 className="text-lg font-bold text-white">{row.process}</h3>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                {([
                  ['Ocurre en', row.where],
                  ['Necesita', row.needs],
                  ['Produce', row.produces],
                  ['Quién lo realiza', row.who]
                ] as const).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-2 border-t border-white/6 pt-2">
                    <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
                    <dd className="text-slate-300">{value}</dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          ))}
        </AnimatedList>
      ) : null}

      {/* ── Interactive glossary ─────────────────────────── */}
      {glossary.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-violet-300" aria-hidden />
            <h3 className="text-lg font-bold text-white">
              <ShinyText text="Glosario interactivo" speed={3} className="font-bold text-violet-200" />
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">Pasa el cursor o toca cada término para ver su definición</p>
          <AnimatedList className="mt-3 grid gap-2 sm:grid-cols-2" stagger={0.04}>
            {glossary.map((item) => (
              <GlossaryTerm key={item.term} item={item} />
            ))}
          </AnimatedList>
        </Card>
      ) : null}

      {/* ── Did you know? (with ClickSpark) ─────────────── */}
      {content.didYouKnow || content.note ? (
        <ClickSpark sparkColor="#fbbf24" sparkCount={10}>
          <div className="flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4 transition-all hover:border-amber-400/40 hover:bg-amber-400/12">
            <Lightbulb className="mt-0.5 size-5 shrink-0 animate-pulse text-amber-300" aria-hidden />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                {content.didYouKnow ? '¿Sabías que…?' : 'Nota científica'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-100">
                {(content.didYouKnow ?? content.note) as string}
              </p>
            </div>
          </div>
        </ClickSpark>
      ) : null}

      {/* ── Bottom engagement: idea selector ─────────────── */}
      <IdeaReflection scientists={scientists} />
    </article>
  );
}
