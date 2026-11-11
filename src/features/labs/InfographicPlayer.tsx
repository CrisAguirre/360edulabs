import { CheckCircle2, Download, ExternalLink, LayoutTemplate, Lightbulb, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, Chip } from '../../components/ui';
import { cn, downloadText } from '../../lib/utils';
import type { ActivityRuntimeProps } from './types';

export function InfographicPlayer({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const guidingQuestions: string[] = Array.isArray(content.guidingQuestions) ? content.guidingQuestions : [];
  const structure: string[] = Array.isArray(content.structure) ? content.structure : [];
  const checklist: string[] = Array.isArray(content.checklist) ? content.checklist : [];
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const downloadPlan = () => {
    const lines = [
      `PLAN DE INFOGRAFÍA · ${content.title ?? activity.title}`,
      '',
      'Preguntas guía:',
      ...guidingQuestions.map((question, index) => `${index + 1}. ${question}`),
      '',
      'La infografía debe incluir:',
      ...structure.map((item) => `- ${item}`),
      '',
      'Checklist:',
      ...checklist.map((item) => `- [ ] ${item}`),
      '',
      'Herramienta sugerida: Canva. Guarda el enlace público de solo lectura.'
    ];
    downloadText('plan_infografia_citoindagar.txt', lines.join('\n'));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Chip tone="sky">
            <LayoutTemplate className="size-3.5" aria-hidden />
            Taller de infografía · {content.tool ?? 'Canva'}
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">{content.title ?? activity.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{content.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={downloadPlan}>
            <Download className="size-4" aria-hidden />
            Descargar plan
          </Button>
          <a
            href={content.templateUrl ?? 'https://www.canva.com/'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-sky-400 px-3.5 text-sm font-extrabold text-ink-950 transition hover:bg-sky-300"
          >
            <ExternalLink className="size-4" aria-hidden />
            Abrir Canva
          </a>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-amber-300" aria-hidden />
            <h4 className="font-bold text-white">Preguntas guía</h4>
          </div>
          <ol className="mt-3 space-y-2">
            {guidingQuestions.map((question, index) => (
              <li key={question} className="flex gap-2 rounded-xl border border-amber-400/15 bg-amber-400/6 p-3 text-sm leading-relaxed text-amber-50">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-400/20 text-[11px] font-extrabold text-amber-200">
                  {index + 1}
                </span>
                {question}
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-sky-300" aria-hidden />
            <h4 className="font-bold text-white">Tu infografía debe incluir</h4>
          </div>
          <ul className="mt-3 space-y-2">
            {structure.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-slate-300">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-white">Checklist antes de entregar</h4>
          <span className="text-xs font-extrabold text-mint-300">{checked.size} de {checklist.length}</span>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {checklist.map((item, index) => (
            <label
              key={item}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition',
                checked.has(index)
                  ? 'border-mint-400/25 bg-mint-400/8 text-mint-100'
                  : 'border-white/8 bg-white/3 text-slate-300 hover:bg-white/6'
              )}
            >
              <input
                type="checkbox"
                checked={checked.has(index)}
                onChange={() => toggle(index)}
                className="mt-0.5 size-4 shrink-0 accent-[#2bd4ad]"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Card>

      <div className="rounded-2xl border border-white/8 bg-white/3 p-4 text-sm leading-relaxed text-slate-300">
        <p className="font-bold text-white">Entrega</p>
        <p className="mt-1">
          Cuando termines, copia el enlace público de solo lectura de tu infografía y pégalo en la evidencia de cierre.
          Asegúrate de que cualquier persona con el enlace pueda verla sin iniciar sesión.
        </p>
      </div>
    </div>
  );
}
