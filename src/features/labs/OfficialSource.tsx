import { ChevronDown, ChevronUp, ExternalLink, FileText, Link2 } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui';
import { PHASE_META } from '../../lib/activityMeta';
import type { Activity } from '../../lib/types';

interface SourceResource {
  label?: string;
  url?: string;
}

function asParagraphs(value: unknown): string[] {
  if (typeof value === 'string') return value.trim().length > 0 ? [value] : [];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function asResources(value: unknown): SourceResource[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is SourceResource =>
      Boolean(item) && typeof item === 'object' && typeof (item as SourceResource).label === 'string'
  );
}

/**
 * Bloque «Texto oficial»: muestra el fragmento literal de `Estrategia Indagación.docx`
 * que sustenta la actividad que el estudiante está realizando.
 *
 * Las actividades de tipo `reading` no lo muestran porque su cuerpo completo ya
 * reproduce el texto del documento curricular.
 */
export function OfficialSource({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(true);

  if (activity.type === 'reading') return null;

  const content = activity.content ?? {};
  const paragraphs = asParagraphs(content.sourceExcerpt);
  const resources = asResources(content.sourceResources);
  const note = typeof content.sourceNote === 'string' && content.sourceNote.trim().length > 0 ? content.sourceNote : null;
  const session = typeof content.sourceSession === 'number' ? content.sourceSession : null;
  const section = typeof content.sourceSection === 'string' ? content.sourceSection : null;

  if (paragraphs.length === 0 && resources.length === 0 && !note) return null;

  const phase = PHASE_META[activity.phase];
  const bodyId = `texto-oficial-${activity._id}`;

  return (
    <section
      aria-label="Texto oficial de la Estrategia de Indagación"
      className="overflow-hidden rounded-3xl border border-sky-400/25 bg-gradient-to-br from-sky-400/10 via-ink-950/80 to-ink-950/90"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sky-400/15 text-sky-200">
            <FileText className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-300">
              Estrategia Indagación · documento curricular
            </p>
            <h2 className="mt-0.5 text-base font-extrabold text-white sm:text-lg">Texto oficial de la sesión</h2>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {session !== null ? <Chip tone="sky">Sesión {session}</Chip> : null}
              <Chip tone="neutral">{phase.label}</Chip>
              {section ? (
                <span className="text-[11px] font-semibold text-slate-400">{section}</span>
              ) : null}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="inline-flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-bold text-sky-200 transition hover:bg-sky-400/20 hover:text-white"
        >
          {open ? <ChevronUp className="size-4" aria-hidden /> : <ChevronDown className="size-4" aria-hidden />}
          {open ? 'Ocultar texto' : 'Ver texto'}
        </button>
      </div>

      {open ? (
        <div id={bodyId} className="space-y-3 border-t border-white/8 px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
          {paragraphs.length > 0 ? (
            <blockquote className="space-y-2.5 rounded-2xl border border-white/10 bg-ink-950/60 p-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={`${index}-${paragraph.slice(0, 24)}`}
                  className="whitespace-pre-line border-l-2 border-sky-400/40 pl-3 text-sm leading-relaxed text-slate-200"
                >
                  {paragraph}
                </p>
              ))}
            </blockquote>
          ) : null}

          {note ? (
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/8 p-3.5">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                Vínculo con la actividad · apoyo pedagógico
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-100">{note}</p>
            </div>
          ) : null}

          {resources.length > 0 ? (
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Recursos que pide el documento
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-2">
                {resources.map((resource, index) =>
                  resource.url ? (
                    <li key={`${resource.label}-${index}`}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 text-xs font-bold text-sky-200 transition hover:bg-sky-400/20 hover:text-white"
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        {resource.label}
                      </a>
                    </li>
                  ) : (
                    <li
                      key={`${resource.label}-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300"
                    >
                      <Link2 className="size-3.5" aria-hidden />
                      {resource.label}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : null}

          <p className="text-[11px] text-slate-500">
            Fragmento transcrito literalmente de{' '}
            <strong className="font-bold text-slate-400">Estrategia Indagación.docx</strong>.
          </p>
        </div>
      ) : null}
    </section>
  );
}
