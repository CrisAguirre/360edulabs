import { CheckCircle2, Download, ExternalLink, Palette, Printer, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button, Card, Chip } from '../../components/ui';
import { cn, downloadText } from '../../lib/utils';
import type { ActivityRuntimeProps } from './types';

const CELL_TEMPLATES = {
  animal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f8fafc"/>
  <text x="400" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#0f172a">Plantilla Quiver · Célula animal</text>
  <text x="400" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Colorea cada estructura y escribe tu nombre antes de escanear.</text>
  <ellipse cx="400" cy="320" rx="260" ry="200" fill="none" stroke="#0f172a" stroke-width="8"/>
  <ellipse cx="400" cy="320" rx="245" ry="185" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="8 8"/>
  <circle cx="360" cy="280" r="70" fill="none" stroke="#0f172a" stroke-width="6"/>
  <circle cx="340" cy="265" r="18" fill="none" stroke="#0f172a" stroke-width="4"/>
  <g fill="none" stroke="#0f172a" stroke-width="5">
    <ellipse cx="500" cy="400" rx="40" ry="18" transform="rotate(-25 500 400)"/>
    <ellipse cx="520" cy="250" rx="36" ry="16" transform="rotate(20 520 250)"/>
    <ellipse cx="260" cy="390" rx="34" ry="15" transform="rotate(35 260 390)"/>
  </g>
  <g fill="none" stroke="#0f172a" stroke-width="4">
    <circle cx="470" cy="330" r="22"/>
    <circle cx="300" cy="240" r="18"/>
  </g>
  <g font-family="Arial, sans-serif" font-size="16" fill="#0f172a">
    <text x="80" y="180">Membrana celular</text><line x1="205" y1="176" x2="160" y2="210" stroke="#0f172a"/>
    <text x="560" y="200">Núcleo</text><line x1="560" y1="206" x2="430" y2="250" stroke="#0f172a"/>
    <text x="590" y="420">Mitocondrias</text><line x1="588" y1="414" x2="540" y2="400" stroke="#0f172a"/>
    <text x="90" y="450">Vacuolas pequeñas</text><line x1="240" y1="443" x2="260" y2="400" stroke="#0f172a"/>
    <text x="70" y="80">Nombre: ____________________</text>
  </g>
</svg>`,
  plant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <rect width="800" height="600" fill="#f8fafc"/>
  <text x="400" y="48" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#0f172a">Plantilla Quiver · Célula vegetal</text>
  <text x="400" y="78" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#475569">Colorea cada estructura y escribe tu nombre antes de escanear.</text>
  <rect x="150" y="140" width="500" height="370" rx="55" fill="none" stroke="#0f172a" stroke-width="10"/>
  <rect x="168" y="158" width="464" height="334" rx="45" fill="none" stroke="#0f172a" stroke-width="5"/>
  <rect x="245" y="205" width="310" height="245" rx="80" fill="none" stroke="#0f172a" stroke-width="6"/>
  <circle cx="400" cy="300" r="55" fill="none" stroke="#0f172a" stroke-width="6"/>
  <circle cx="385" cy="285" r="14" fill="none" stroke="#0f172a" stroke-width="4"/>
  <g fill="none" stroke="#0f172a" stroke-width="5">
    <ellipse cx="270" cy="470" rx="38" ry="16" transform="rotate(-20 270 470)"/>
    <ellipse cx="520" cy="460" rx="36" ry="15" transform="rotate(25 520 460)"/>
    <ellipse cx="530" cy="200" rx="34" ry="14" transform="rotate(-30 530 200)"/>
    <ellipse cx="250" cy="190" rx="32" ry="13" transform="rotate(30 250 190)"/>
  </g>
  <g font-family="Arial, sans-serif" font-size="16" fill="#0f172a">
    <text x="70" y="160">Pared celular</text><line x1="198" y1="156" x2="170" y2="175" stroke="#0f172a"/>
    <text x="580" y="160">Membrana</text><line x1="578" y1="166" x2="540" y2="185" stroke="#0f172a"/>
    <text x="600" y="330">Vacuola central</text><line x1="598" y1="324" x2="540" y2="310" stroke="#0f172a"/>
    <text x="590" y="460">Cloroplastos</text><line x1="588" y1="454" x2="545" y2="462" stroke="#0f172a"/>
    <text x="80" y="300">Núcleo</text><line x1="150" y1="295" x2="345" y2="300" stroke="#0f172a"/>
    <text x="70" y="80">Nombre: ____________________</text>
  </g>
</svg>`
};

export function QuiverStation({ activity }: Pick<ActivityRuntimeProps, 'activity'>) {
  const content = activity.content as Record<string, any>;
  const steps: Array<{ title: string; description: string }> = Array.isArray(content.steps) ? content.steps : [];
  const colorGuide: Array<{ structure: string; color: string; hex: string }> = Array.isArray(content.colorGuide)
    ? content.colorGuide
    : [];
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

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Chip tone="gold">
            <Palette className="size-3.5" aria-hidden />
            Estación Quiver
          </Chip>
          <h3 className="mt-2 font-display text-xl font-extrabold text-white">{content.title ?? activity.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{content.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => downloadText('plantilla_celula_animal.svg', CELL_TEMPLATES.animal, 'image/svg+xml;charset=utf-8')}
          >
            <Download className="size-4" aria-hidden />
            Plantilla animal
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => downloadText('plantilla_celula_vegetal.svg', CELL_TEMPLATES.plant, 'image/svg+xml;charset=utf-8')}
          >
            <Download className="size-4" aria-hidden />
            Plantilla vegetal
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card className="p-4">
          <h4 className="font-bold text-white">Cómo funciona la estación</h4>
          <ol className="mt-3 space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3 text-sm">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-amber-400/15 text-xs font-extrabold text-amber-300">
                  {index + 1}
                </span>
                <span className="text-slate-300">
                  <strong className="text-white">{step.title}.</strong> {step.description}
                </span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-white">Código de colores</h4>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {colorGuide.map((item) => (
              <div key={item.structure} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2">
                <span className="size-6 shrink-0 rounded-lg border border-white/20" style={{ background: item.hex }} aria-hidden />
                <span>
                  <span className="block text-xs font-extrabold text-white">{item.structure}</span>
                  <span className="block text-[10px] text-slate-400">{item.color}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-white">Mi checklist Quiver</h4>
          <span className="text-xs font-extrabold text-mint-300">{checked.size} de {checklist.length}</span>
        </div>
        <div className="mt-3 space-y-2">
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
              {checked.has(index) ? <CheckCircle2 className="ml-auto size-4 shrink-0 text-mint-300" aria-hidden /> : null}
            </label>
          ))}
        </div>
      </Card>

      <div className="rounded-2xl border border-white/8 bg-white/3 p-4 text-sm leading-relaxed text-slate-300">
        <p className="font-bold text-white">¿No tienes impresora?</p>
        <p className="mt-1">{content.downloadNote}</p>
        <p className="mt-2 text-xs text-slate-500">
          Guarda una foto clara de tu modelo para adjuntarla en la evidencia de cierre.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => window.print()}>
          <Printer className="size-4" aria-hidden />
          Imprimir esta guía
        </Button>
        <a
          href="https://www.quivereducation.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-white/12 bg-white/6 px-3.5 text-sm font-bold text-white transition hover:bg-white/12"
        >
          <ExternalLink className="size-4" aria-hidden />
          Sitio oficial de Quiver
        </a>
        <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400/8 px-3 py-2 text-xs font-bold text-amber-200">
          <Sparkles className="size-4" aria-hidden />
          La app de Quiver es externa: la actividad se completa con tu modelo y tu registro.
        </span>
      </div>
    </div>
  );
}
