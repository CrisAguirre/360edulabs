import { BookOpenCheck, FlaskConical, Lightbulb, Microscope, Quote, Sparkles } from 'lucide-react';
import { Card, Chip } from '../../components/ui';
import type { ActivityRuntimeProps } from './types';

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

export function ReadingPlayer({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const scientists: Scientist[] = Array.isArray(content.scientists) ? content.scientists : [];
  const postulates: string[] = Array.isArray(content.postulates) ? content.postulates : [];
  const sections: Array<{ heading: string; body: string }> = Array.isArray(content.sections) ? content.sections : [];
  const comparisonTable: TableRow[] = Array.isArray(content.comparisonTable) ? content.comparisonTable : [];
  const comparison: ProcessRow[] = Array.isArray(content.comparison) ? content.comparison : [];
  const glossary: GlossaryItem[] = Array.isArray(content.glossary) ? content.glossary : [];

  return (
    <article className="space-y-6">
      <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-mint-400/10 via-ink-900/60 to-sky-400/8 p-5 sm:p-6">
        <Chip tone="mint">
          <BookOpenCheck className="size-3.5" aria-hidden />
          Lectura guiada
        </Chip>
        <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
          {content.title ?? activity.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{content.intro}</p>
      </header>

      {sections.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {sections.map((section, index) => (
            <Card key={section.heading} className="p-5">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-sky-400/12 text-xs font-extrabold text-sky-200">
                  {index + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{section.heading}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {scientists.length > 0 ? (
        <div className="relative space-y-3 pl-6 sm:pl-8">
          <div className="timeline-rail" aria-hidden />
          {scientists.map((scientist) => (
            <div key={`${scientist.name}-${scientist.year}`} className="relative">
              <span className="absolute -left-[1.85rem] top-4 grid size-8 place-items-center rounded-full border border-mint-400/40 bg-ink-900 text-sm sm:-left-[2.35rem]">
                {scientist.icon ?? '🔬'}
              </span>
              <Card className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">{scientist.name}</h3>
                  <Chip tone="sky">{scientist.year}</Chip>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                  {scientist.contribution ?? scientist.text}
                </p>
              </Card>
            </div>
          ))}
        </div>
      ) : null}

      {postulates.length > 0 ? (
        <Card className="border-mint-400/20 p-5">
          <div className="flex items-center gap-2">
            <Microscope className="size-5 text-mint-300" aria-hidden />
            <h3 className="text-lg font-bold text-white">Los postulados de la teoría celular</h3>
          </div>
          <ol className="mt-3 grid gap-2 sm:grid-cols-3">
            {postulates.map((postulate, index) => (
              <li key={postulate} className="rounded-2xl border border-mint-400/15 bg-mint-400/6 p-3 text-sm font-semibold leading-relaxed text-mint-100">
                <span className="mb-1 block font-display text-xl font-extrabold text-mint-300">{index + 1}</span>
                {postulate}
              </li>
            ))}
          </ol>
        </Card>
      ) : null}

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

      {comparison.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {comparison.map((row) => (
            <Card key={row.process} className="p-5">
              <div className="flex items-center gap-2">
                <FlaskConical className="size-5 text-amber-300" aria-hidden />
                <h3 className="text-lg font-bold text-white">{row.process}</h3>
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ['Ocurre en', row.where],
                  ['Necesita', row.needs],
                  ['Produce', row.produces],
                  ['Quién lo realiza', row.who]
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[8rem_1fr] gap-2 border-t border-white/6 pt-2">
                    <dt className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">{label}</dt>
                    <dd className="text-slate-300">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      ) : null}

      {glossary.length > 0 ? (
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-violet-300" aria-hidden />
            <h3 className="text-lg font-bold text-white">Glosario visual</h3>
          </div>
          <dl className="mt-3 grid gap-2 sm:grid-cols-2">
            {glossary.map((item) => (
              <div key={item.term} className="rounded-2xl border border-white/8 bg-white/3 p-3">
                <dt className="text-sm font-extrabold text-mint-300">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-300">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ) : null}

      {content.didYouKnow || content.note ? (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-amber-300" aria-hidden />
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              {content.didYouKnow ? '¿Sabías que…?' : 'Nota científica'}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-100">{content.didYouKnow ?? content.note}</p>
          </div>
        </div>
      ) : null}

      <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 p-4">
        <Quote className="mt-0.5 size-5 shrink-0 text-sky-300" aria-hidden />
        <p className="text-sm leading-relaxed text-slate-300">
          Mientras lees, piensa en una idea que puedas explicar con tus propias palabras. La usarás en tu evidencia.
        </p>
      </div>
    </article>
  );
}
