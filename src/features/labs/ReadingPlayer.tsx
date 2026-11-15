import {
  BookOpenCheck,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Layout,
  Lightbulb,
  Loader2,
  Microscope,
  Palette,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  Table as TableIcon
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button, Card, Chip, EvidenceStatusBadge } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import {
  evidenceForActivity,
  useMyEvidence,
  useSaveEvidence,
  useSubmitEvidence
} from '../../lib/queries';
import type { Activity, Evidence, MissionDetail } from '../../lib/types';
import { cn, timeAgo } from '../../lib/utils';
import {
  AnimatedList,
  Aurora,
  BlurText,
  ClickSpark,
  DecryptedText,
  ShinyText,
  SpotlightCard
} from '../../components/reactbits';

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

interface StructureItem {
  id: string;
  name: string;
  placeholder?: string;
}

export interface ReadingPlayerProps {
  activity: Activity;
  mission?: MissionDetail;
  onEvidenceSubmitted?: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
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
            ¡Toca para descubrir el postulado!
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
              Toca para conocer su aporte científico
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
          <span className="text-xs text-slate-500">Pasa el cursor para revelar...</span>
        )}
      </dd>
    </SpotlightCard>
  );
}

/* ── Candidate ideas for Mission 1 ──────────────────────────── */
const DEFAULT_IDEAS = [
  {
    id: 'unidad-estructural',
    title: 'La célula como unidad estructural',
    description:
      'Todos los seres vivos que habitan el planeta se componen de una o más células (unicelulares o pluricelulares).'
  },
  {
    id: 'unidad-origen',
    title: 'La célula como unidad de origen',
    description:
      'Toda célula procede de otra célula preexistente, tras copiar su material genético antes de dividirse.'
  },
  {
    id: 'biomoleculas',
    title: 'Composición química universal',
    description:
      'Toda célula se compone básicamente de las mismas biomoléculas: agua, minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos.'
  },
  {
    id: 'unidad-funcional',
    title: 'La célula como unidad funcional',
    description:
      'En la célula ocurren las reacciones químicas indispensables para vivir, independientemente del tipo de organismo.'
  },
  {
    id: 'microscopia-historica',
    title: 'Aporte de la microscopía científica',
    description:
      'Los aportes de Hooke y Leeuwenhoek permitieron descubrir el mundo celular invisible a simple vista.'
  }
];

/* ── Virtual space: response to mandatory question on Vercel ── */
function VercelResponseSection({
  activity,
  mission,
  mandatoryQuestion,
  structuresTable = [],
  onEvidenceSubmitted
}: {
  activity: Activity;
  mission?: MissionDetail;
  mandatoryQuestion: string;
  structuresTable?: StructureItem[];
  onEvidenceSubmitted?: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
}) {
  const missionCode = mission?.code ?? 'm1';
  const evidenceQuery = useMyEvidence();
  const saveMutation = useSaveEvidence(missionCode);
  const submitMutation = useSubmitEvidence(missionCode);
  const toast = useToast();

  const parseExistingTable = (rawText?: string): Record<string, string> => {
    const map: Record<string, string> = {};
    if (!rawText) return map;
    for (const item of structuresTable) {
      const match = rawText.match(new RegExp(`•\\s*${item.name}\\s*:\\s*(.+)`, 'i'));
      if (match) map[item.id] = match[1].trim();
    }
    return map;
  };

  const parseExistingReflection = (rawText?: string): string => {
    if (!rawText) return '';
    if (structuresTable.length > 0 && rawText.includes('--- Reflexión y análisis ---')) {
      return rawText.split('--- Reflexión y análisis ---')[1]?.trim() ?? '';
    }
    return rawText;
  };

  const existing = evidenceForActivity(evidenceQuery.data, activity._id);
  const [evidence, setEvidence] = useState<Evidence | undefined>(existing);
  const [text, setText] = useState(() => parseExistingReflection(existing?.text));
  const [tableAnswers, setTableAnswers] = useState<Record<string, string>>(() =>
    parseExistingTable(existing?.text)
  );
  const [linkUrl, setLinkUrl] = useState(existing?.linkUrl ?? '');
  const [prevExisting, setPrevExisting] = useState(existing);
  const [selectedIdeas, setSelectedIdeas] = useState<Set<string>>(new Set());
  const [dirty, setDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (existing !== prevExisting) {
    setPrevExisting(existing);
    setEvidence(existing);
    if (!dirty) {
      setText(parseExistingReflection(existing?.text));
      setTableAnswers(parseExistingTable(existing?.text));
      setLinkUrl(existing?.linkUrl ?? '');
    }
  }

  const buildCompositeText = (answers: Record<string, string>, reflection: string): string => {
    if (structuresTable.length === 0) return reflection.trim();
    const lines = structuresTable.map(
      (item) => `• ${item.name}: ${answers[item.id]?.trim() || 'Sin completar'}`
    );
    return `--- Cuadro de Estructuras Celulares ---\n${lines.join('\n')}\n\n--- Reflexión y análisis ---\n${reflection.trim()}`;
  };

  const handleTableCellChange = (id: string, value: string) => {
    setTableAnswers((prev) => ({ ...prev, [id]: value }));
    setDirty(true);
  };

  const toggleIdea = (ideaId: string) => {
    setSelectedIdeas((prev) => {
      const next = new Set(prev);
      if (next.has(ideaId)) {
        next.delete(ideaId);
      } else if (next.size < 2) {
        next.add(ideaId);
      } else {
        toast.info('Solo puedes seleccionar 2 ideas principales.');
      }
      return next;
    });
  };

  const handleApplyIdeasToText = () => {
    if (selectedIdeas.size === 0) {
      toast.info('Selecciona al menos una idea arriba primero.');
      return;
    }
    const chosen = DEFAULT_IDEAS.filter((i) => selectedIdeas.has(i.id));
    let template = '';
    chosen.forEach((item, index) => {
      template += `• Idea ${index + 1}: ${item.title}\nArgumento: ${item.description} Considero que es importante porque...\n\n`;
    });
    const newText = text.trim() ? `${text.trim()}\n\n${template.trim()}` : template.trim();
    setText(newText);
    setDirty(true);
    toast.success('Ideas insertadas en tu espacio de respuesta.');
  };

  const handleSaveDraft = async () => {
    if (!mission) {
      toast.info('Borrador guardado localmente.');
      setDirty(false);
      return;
    }
    const compositeText = buildCompositeText(tableAnswers, text);
    if (compositeText.length < 10 && !linkUrl.trim()) {
      toast.error('Escribe al menos 10 caracteres antes de guardar el borrador.');
      return;
    }

    setSaving(true);
    try {
      const saved = await saveMutation.mutateAsync({
        missionId: mission._id,
        activityId: activity._id,
        text: compositeText,
        linkUrl: linkUrl.trim() || undefined,
        type: linkUrl.trim() ? 'link' : 'text'
      });
      setEvidence(saved);
      setDirty(false);
      setLastSavedAt(new Date().toISOString());
      toast.success('Borrador guardado en la plataforma.');
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'No pudimos guardar el borrador.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!mission) {
      toast.error('Misión no identificada.');
      return;
    }
    const compositeText = buildCompositeText(tableAnswers, text);
    if (compositeText.length < 40 && !linkUrl.trim()) {
      toast.error('Tu respuesta debe tener al menos 40 caracteres para ser enviada.');
      return;
    }

    setSubmitting(true);
    try {
      let targetId = evidence?._id;
      if (!targetId || dirty) {
        const saved = await saveMutation.mutateAsync({
          missionId: mission._id,
          activityId: activity._id,
          text: compositeText,
          linkUrl: linkUrl.trim() || undefined,
          type: linkUrl.trim() ? 'link' : 'text'
        });
        setEvidence(saved);
        targetId = saved._id;
        setDirty(false);
      }

      const result = await submitMutation.mutateAsync(targetId);
      setEvidence(result.evidence);
      toast.success('¡Respuesta enviada formalmente a la docente!');
      onEvidenceSubmitted?.({
        evidence: result.evidence,
        missionCompleted: result.missionCompleted,
        badgeAwarded: result.badgeAwarded
      });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'No pudimos enviar tu respuesta.');
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitted = evidence?.status === 'submitted' || evidence?.status === 'approved';
  const isApproved = evidence?.status === 'approved';
  const isChangesRequested = evidence?.status === 'changes_requested';

  return (
    <Card className="space-y-5 border-amber-400/35 bg-gradient-to-b from-amber-400/10 via-ink-950/80 to-ink-950 p-5 shadow-2xl sm:p-6">
      {/* ── Banner cabecera del espacio virtual ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-2xl bg-amber-400/20 text-amber-300">
            <Quote className="size-5" aria-hidden />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <Chip tone="gold">Espacio virtual de la plataforma Vercel</Chip>
              {evidence?.status ? <EvidenceStatusBadge status={evidence.status} /> : null}
            </div>
            <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">
              Pregunta de Indagación Obligatoria
            </h3>
          </div>
        </div>

        {lastSavedAt ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Cloud className="size-3.5 text-mint-400" aria-hidden />
            Borrador guardado {timeAgo(lastSavedAt)}
          </span>
        ) : null}
      </div>

      {/* ── Pregunta exacta ── */}
      <div className="rounded-2xl border border-amber-400/30 bg-amber-400/8 p-4">
        <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
          Pregunta central a responder:
        </p>
        <p className="mt-1 font-display text-base font-bold text-white sm:text-lg">
          {mandatoryQuestion}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Formula tus argumentos de forma clara con tus propias palabras y relaciónalos con las evidencias observadas en las actividades.
        </p>
      </div>

      {/* ── Selector interactivo de ideas (para Misión 1) ── */}
      {missionCode === 'm1' && structuresTable.length === 0 ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Paso 1: Selecciona tus 2 ideas clave ({selectedIdeas.size}/2 seleccionadas)
            </label>
            {selectedIdeas.size > 0 && !isSubmitted ? (
              <button
                type="button"
                onClick={handleApplyIdeasToText}
                className="text-xs font-bold text-mint-300 hover:text-mint-200 hover:underline"
              >
                + Insertar ideas seleccionadas en el texto
              </button>
            ) : null}
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {DEFAULT_IDEAS.map((idea) => {
              const isSelected = selectedIdeas.has(idea.id);
              return (
                <ClickSpark key={idea.id} sparkColor="#fbbf24" sparkCount={6}>
                  <button
                    type="button"
                    disabled={isSubmitted && !isChangesRequested}
                    onClick={() => toggleIdea(idea.id)}
                    className={cn(
                      'w-full rounded-2xl border p-3.5 text-left transition-all duration-300',
                      isSelected
                        ? 'border-amber-400/50 bg-amber-400/15 text-amber-100 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/40'
                        : 'border-white/10 bg-white/4 text-slate-300 hover:border-sky-400/30 hover:bg-white/8'
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold text-amber-300">{idea.title}</span>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/25 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                          <Star className="size-3 fill-current" aria-hidden /> Elegida
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">{idea.description}</p>
                  </button>
                </ClickSpark>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* ── Cuadro de estructura celular (Obligatorio en Sesión 3) ── */}
      {structuresTable.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TableIcon className="size-4 text-amber-300" aria-hidden />
            <label className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
              Paso 1: Completa el cuadro de la estructura celular (Estructura celular | Función principal)
            </label>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/3">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white/6 text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  <th className="w-1/3 px-4 py-3 border-b border-white/10">Estructura celular</th>
                  <th className="px-4 py-3 border-b border-white/10">Función principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {structuresTable.map((item) => (
                  <tr key={item.id} className="hover:bg-white/4 transition">
                    <td className="px-4 py-3 font-bold text-white whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        disabled={isSubmitted && !isChangesRequested}
                        value={tableAnswers[item.id] ?? ''}
                        onChange={(e) => handleTableCellChange(item.id, e.target.value)}
                        placeholder={item.placeholder ?? `Describe la función de ${item.name}...`}
                        className="w-full rounded-xl border border-white/10 bg-ink-950/80 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 outline-none"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {/* ── Editor de texto para la argumentación ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="student-argument-text" className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            {structuresTable.length > 0
              ? 'Paso 2: Escribe tu respuesta y análisis pedagógico'
              : 'Paso 2: Escribe tu argumentación detallada'}
          </label>
          <span
            className={cn(
              'text-xs font-bold',
              text.trim().length >= 40 ? 'text-mint-300' : 'text-slate-400'
            )}
          >
            {text.trim().length} / mín. 40 caracteres
          </span>
        </div>

        <textarea
          id="student-argument-text"
          value={text}
          disabled={isSubmitted && !isChangesRequested}
          onChange={(e) => {
            setText(e.target.value);
            setDirty(true);
          }}
          placeholder={
            structuresTable.length > 0
              ? 'Responde aquí al cuestionamiento de la docente. Por ejemplo: ¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual obtienen energía y eliminan desechos?...'
              : `Escribe aquí tu respuesta y argumentación. Por ejemplo:\n\n• Idea 1: ...\nArgumento: ...\n\n• Idea 2: ...\nArgumento: ...`
          }
          rows={6}
          className="w-full rounded-2xl border border-white/15 bg-ink-950/90 p-4 text-sm leading-relaxed text-white placeholder-slate-500 shadow-inner outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* ── Campo opcional de enlace (por ejemplo Canva o fotografía) ── */}
      <div className="space-y-1.5">
        <label htmlFor="student-link-url" className="text-xs font-bold text-slate-400">
          Enlace complementario (opcional, ej. infografía en Canva o foto de tu trabajo):
        </label>
        <input
          id="student-link-url"
          type="url"
          disabled={isSubmitted && !isChangesRequested}
          value={linkUrl}
          onChange={(e) => {
            setLinkUrl(e.target.value);
            setDirty(true);
          }}
          placeholder="https://www.canva.com/design/..."
          className="w-full rounded-xl border border-white/15 bg-ink-950/80 px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition focus:border-amber-400"
        />
      </div>

      {/* ── Retroalimentación del docente si existe ── */}
      {evidence?.feedback ? (
        <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-sky-300" aria-hidden />
            <h4 className="text-sm font-bold text-white">Retroalimentación de la docente:</h4>
            {evidence.teacherScore ? (
              <Chip tone="sky">Calificación: {evidence.teacherScore.toUpperCase()}</Chip>
            ) : null}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-sky-100">{evidence.feedback}</p>
        </div>
      ) : null}

      {/* ── Botones de acción ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <p className="text-xs text-slate-400">
          {isApproved
            ? '✅ Tu respuesta ha sido aprobada por la docente.'
            : isSubmitted
              ? '📬 Tu respuesta está en espera de revisión por la docente.'
              : isChangesRequested
                ? '⚠️ La docente solicitó ajustes en tu respuesta. Edita y vuelve a enviar.'
                : 'Guarda tu borrador las veces que quieras antes de enviar.'}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {!isSubmitted || isChangesRequested ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleSaveDraft}
                disabled={saving || submitting || (text.trim().length === 0 && !linkUrl.trim())}
              >
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Guardando…
                  </>
                ) : (
                  <>
                    <Cloud className="size-4" aria-hidden />
                    Guardar borrador
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="gold"
                size="sm"
                onClick={handleSubmit}
                disabled={saving || submitting || (text.trim().length < 40 && !linkUrl.trim())}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="size-4" aria-hidden />
                    Enviar respuesta a la docente
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-mint-400/30 bg-mint-400/10 px-3 py-1.5 text-xs font-bold text-mint-200">
              <CheckCircle2 className="size-4 text-mint-400" aria-hidden />
              Respuesta registrada en la plataforma
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ── Main ReadingPlayer component ───────────────────────────── */
export function ReadingPlayer({ activity, mission, onEvidenceSubmitted }: ReadingPlayerProps) {
  const content = (activity.content ?? {}) as Record<string, unknown>;
  const scientists: Scientist[] = Array.isArray(content.scientists) ? content.scientists : [];
  const postulates: string[] = Array.isArray(content.postulates) ? content.postulates : [];
  const sections: Array<{ heading: string; body: string }> = Array.isArray(content.sections)
    ? content.sections
    : [];
  const comparisonTable: TableRow[] = Array.isArray(content.comparisonTable)
    ? content.comparisonTable
    : [];
  const comparison: ProcessRow[] = Array.isArray(content.comparison) ? content.comparison : [];
  const glossary: GlossaryItem[] = Array.isArray(content.glossary) ? content.glossary : [];
  const structuresTable: StructureItem[] = Array.isArray(content.structuresTable)
    ? (content.structuresTable as StructureItem[])
    : [];

  const [revealedPostulates, setRevealedPostulates] = useState(0);

  const handlePostulateReveal = useCallback(() => {
    setRevealedPostulates((prev) => prev + 1);
  }, []);

  const sessionTitle = content.sessionTitle as string | undefined;
  const mainTheme = content.mainTheme as string | undefined;
  const subtheme1 = content.subtheme1 as string | undefined;
  const subtheme2 = content.subtheme2 as string | undefined;
  const activityDescription = content.activityDescription as string | undefined;
  const initialQuestion = content.initialQuestion as string | undefined;
  const mandatoryQuestion = (content.mandatoryQuestion as string | undefined) ??
    'Identifique dos ideas mencionadas en la lectura que usted considera importantes para el estudio de la biología. Argumente cada una de ellas.';
  const hasEvidenceResponse = Boolean(content.hasEvidenceResponse || content.mandatoryQuestion);
  const docUrl = content.docUrl as string | undefined;
  const videoUrl = content.videoUrl as string | undefined;
  const videoEmbedUrl = content.videoEmbedUrl as string | undefined;
  const videoTitle =
    (content.videoTitle as string | undefined) ??
    'Video educativo de la sesión';

  const plantTemplateDriveUrl = (content.plantTemplateDriveUrl as string | undefined) ??
    'https://drive.google.com/file/d/1Rc_5xG1CsOAcfSwXpzT3dA5aBwOfNMMa/view?usp=sharing';
  const animalTemplateDriveUrl = (content.animalTemplateDriveUrl as string | undefined) ??
    'https://drive.google.com/file/d/1euCki6yPm4LXeIMCyWAKvnBfRPPVmJmu/view?usp=sharing';
  const hasQuiver = Boolean(content.hasQuiver || content.quiverLinks || (sessionTitle && sessionTitle.includes('Sesión 2')));
  const hasCanva = Boolean(content.hasCanva || (sessionTitle && sessionTitle.includes('Sesión 3')));
  const hasMergeCube = Boolean(content.hasMergeCube || (sessionTitle && sessionTitle.includes('Sesión 3')));

  return (
    <article className="space-y-6">
      {/* ── 1. Cabecera principal con jerarquía curricular completa ── */}
      <header className="relative overflow-hidden rounded-3xl border border-white/10 p-5 sm:p-7">
        <Aurora
          className="rounded-3xl"
          opacity={0.3}
          colors={['#58e6c5', '#38bdf8', '#818cf8']}
        />
        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="mint">
              <BookOpenCheck className="size-3.5" aria-hidden />
              {sessionTitle ?? 'Sesión Curricular'}
            </Chip>
            {mainTheme ? <Chip tone="sky">{mainTheme}</Chip> : null}
          </div>

          <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            {(content.title as string) ?? activity.title}
          </h2>

          {(subtheme1 || subtheme2) ? (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-300">
              <span className="font-bold text-mint-300">Subtemas curriculares:</span>
              {subtheme1 ? (
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-semibold text-slate-200">
                  {subtheme1}
                </span>
              ) : null}
              {subtheme2 ? (
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-semibold text-slate-200">
                  {subtheme2}
                </span>
              ) : null}
            </div>
          ) : null}

          {content.intro ? (
            <p className="max-w-4xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {content.intro as string}
            </p>
          ) : null}
        </div>
      </header>

      {/* ── 2. Descripción pedagógica de la actividad (Texto exacto) ── */}
      {activityDescription ? (
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.12)"
          borderColor="rgba(56, 189, 248, 0.3)"
          className="p-5 sm:p-6"
        >
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-sky-400/20 text-sky-300">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-white sm:text-lg">
                <ShinyText text="Descripción de la actividad" speed={4} className="font-extrabold text-sky-200" />
              </h3>
              <p className="text-xs text-slate-400">Orientación pedagógica y ruta de aprendizaje para el estudiante</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5">
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200 sm:text-base">
              {activityDescription}
            </p>
          </div>
        </SpotlightCard>
      ) : null}

      {/* ── 3. Activación de saberes previos: Pregunta motivadora ── */}
      {initialQuestion ? (
        <SpotlightCard
          spotlightColor="rgba(88, 230, 197, 0.15)"
          borderColor="rgba(88, 230, 197, 0.35)"
          className="p-5 sm:p-6"
        >
          <div className="flex items-start gap-3.5">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-mint-400/20 text-xl text-mint-300">
              🧬
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Chip tone="mint">Pregunta motivadora inicial</Chip>
                <span className="text-xs text-slate-400">Reflexión de apertura con Cito</span>
              </div>
              <p className="font-display text-base font-bold text-white sm:text-lg">
                {initialQuestion}
              </p>
              <p className="text-xs text-slate-300">
                Comparte tus hipótesis de forma oral o escrita con tus compañeros de clase antes de profundizar en los recursos de la plataforma.
              </p>
            </div>
          </div>
        </SpotlightCard>
      ) : null}

      {/* ── 4. Recursos obligatorios de la sesión ── */}
      <section aria-labelledby="session-resources-title" className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-mint-300" aria-hidden />
          <h3 id="session-resources-title" className="text-lg font-extrabold text-white">
            Recursos obligatorios de la sesión
          </h3>
        </div>

        {/* Video Oficial (YouTube si aplica) */}
        {(videoEmbedUrl || videoUrl) ? (
          <Card className="overflow-hidden border-rose-400/25 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-rose-500/20 text-rose-400">
                  <Play className="size-5 fill-current" aria-hidden />
                </span>
                <div>
                  <h4 className="text-base font-extrabold text-white">
                    {videoTitle}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Recurso audiovisual de apoyo para la sesión
                  </p>
                </div>
              </div>

              {videoUrl ? (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-200 transition hover:bg-rose-500/20 hover:text-white"
                >
                  <ExternalLink className="size-4" aria-hidden />
                  Ver video
                </a>
              ) : null}
            </div>

            {videoEmbedUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                <iframe
                  src={videoEmbedUrl}
                  title={videoTitle}
                  className="absolute inset-0 size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}
          </Card>
        ) : null}

        {/* Documento Oficial en Google Docs (M1 o M3) */}
        {docUrl ? (
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.15)"
            borderColor="rgba(56, 189, 248, 0.35)"
            className="p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="grid size-11 place-items-center rounded-2xl bg-sky-400/20 text-sky-200">
                  <FileText className="size-6" aria-hidden />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-white">
                      Lectura oficial: Documento de la sesión
                    </h4>
                    <Chip tone="sky">Google Docs</Chip>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Texto oficial que contiene los fundamentos teóricos y las actividades curriculares.
                  </p>
                </div>
              </div>

              <a
                href={docUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-400 px-4 py-2 text-xs font-extrabold text-ink-950 transition hover:bg-sky-300 shadow-md shadow-sky-400/20"
              >
                <ExternalLink className="size-4" aria-hidden />
                Abrir lectura en Google Docs
              </a>
            </div>
          </SpotlightCard>
        ) : null}

        {/* Estación de Realidad Aumentada Quiver (Sesión 2) */}
        {hasQuiver ? (
          <SpotlightCard
            spotlightColor="rgba(167, 139, 250, 0.15)"
            borderColor="rgba(167, 139, 250, 0.35)"
            className="p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-violet-500/20 text-violet-300">
                  <Palette className="size-5" aria-hidden />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-extrabold text-white">
                      Aplicación de Realidad Aumentada Quiver
                    </h4>
                    <Chip tone="grape">Plantillas Imprimibles</Chip>
                  </div>
                  <p className="text-xs text-slate-400">
                    Descarga, imprime y colorea las plantillas para proyectarlas en 3D con la app de Quiver
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              A fin de afianzar el concepto de la célula y sus partes, descarga el material de Quiver para colorear la estructura vegetal y animal, e identificar semejanzas y diferencias entre ellas:
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={plantTemplateDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 transition hover:bg-emerald-400/20 hover:border-emerald-400/50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌿</span>
                  <div>
                    <span className="block text-sm font-bold text-emerald-200">
                      Plantilla Célula Vegetal
                    </span>
                    <span className="text-[11px] text-slate-400">Google Drive oficial</span>
                  </div>
                </div>
                <Download className="size-4 text-emerald-300" aria-hidden />
              </a>

              <a
                href={animalTemplateDriveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 transition hover:bg-sky-400/20 hover:border-sky-400/50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🐾</span>
                  <div>
                    <span className="block text-sm font-bold text-sky-200">
                      Plantilla Célula Animal
                    </span>
                    <span className="text-[11px] text-slate-400">Google Drive oficial</span>
                  </div>
                </div>
                <Download className="size-4 text-sky-300" aria-hidden />
              </a>
            </div>
          </SpotlightCard>
        ) : null}

        {/* Herramienta Canva y Cubo Merge (Sesión 3) */}
        {hasCanva || hasMergeCube ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {hasCanva ? (
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.15)"
                borderColor="rgba(56, 189, 248, 0.3)"
                className="p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-cyan-400/20 text-cyan-300">
                    <Layout className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">Herramienta Canva</h5>
                    <p className="mt-1 text-xs text-slate-300">
                      Elabora una infografía que responda cómo las células obtienen y usan energía y eliminan desechos.
                    </p>
                    <a
                      href="https://www.canva.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-cyan-300 hover:text-cyan-200"
                    >
                      <ExternalLink className="size-3" aria-hidden /> Abrir Canva
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            ) : null}

            {hasMergeCube ? (
              <SpotlightCard
                spotlightColor="rgba(251, 191, 36, 0.15)"
                borderColor="rgba(251, 191, 36, 0.3)"
                className="p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-400/20 text-amber-300">
                    <Box className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">Aplicación RA Cubo Merge</h5>
                    <p className="mt-1 text-xs text-slate-300">
                      Superpón la imagen de la célula vegetal para identificar las estructuras que realizan el metabolismo.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ) : null}
          </div>
        ) : null}
      </section>

      {/* ── 5. Aporte conceptual: Los 4 postulados (Misión 1) ──────── */}
      {postulates.length > 0 ? (
        <SpotlightCard
          spotlightColor="rgba(88, 230, 197, 0.2)"
          borderColor="rgba(88, 230, 197, 0.4)"
          className="p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-2 border-b border-mint-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <Microscope className="size-5 text-mint-300" aria-hidden />
              <h3 className="text-base font-extrabold text-white sm:text-lg">
                <ShinyText text="Aporte conceptual: Los postulados de la teoría celular" speed={4} className="font-extrabold text-mint-200" />
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              {revealedPostulates}/{postulates.length} revelados
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            La Teoría celular explica por qué razón la célula es la unidad estructural y funcional de todos los seres vivos que habitan el planeta, excepto los virus que son acelulares. Incluye los siguientes postulados:
          </p>

          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
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
            <div className="mt-4 rounded-xl border border-mint-400/30 bg-mint-400/10 p-3 text-center text-sm font-semibold text-mint-300">
              <Sparkles className="mb-0.5 mr-1 inline size-4" aria-hidden />
              ¡Excelente! Has descubierto los 4 postulados de la teoría celular.
            </div>
          )}
        </SpotlightCard>
      ) : null}

      {/* ── 6. Representantes históricos (Línea de tiempo) ─────────── */}
      {scientists.length > 0 ? (
        <section aria-labelledby="scientists-title" className="space-y-3">
          <div className="flex items-center gap-2">
            <Microscope className="size-5 text-sky-300" aria-hidden />
            <h3 id="scientists-title" className="text-lg font-extrabold text-white">
              Representantes en la construcción del conocimiento científico
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Abre cada tarjeta para descubrir el aporte y la época de los investigadores que formularon la teoría celular:
          </p>

          <div className="relative pl-6 sm:pl-8 pt-2">
            <div className="timeline-rail" aria-hidden />
            <AnimatedList className="space-y-3" stagger={0.06}>
              {scientists.map((scientist) => (
                <ScientistCard key={`${scientist.name}-${scientist.year}`} scientist={scientist} />
              ))}
            </AnimatedList>
          </div>
        </section>
      ) : null}

      {/* ── 7. Tabla de comparación entre célula animal y vegetal ─── */}
      {comparisonTable.length > 0 ? (
        <Card className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2">
            <TableIcon className="size-5 text-mint-300" aria-hidden />
            <h3 className="text-base font-extrabold text-white sm:text-lg">
              Comparación de estructuras: Célula Animal vs. Célula Vegetal
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Identifica qué estructuras comparten y cuáles son exclusivas de cada tipo celular:
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/10 mt-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/6 text-[11px] font-extrabold uppercase tracking-wider text-slate-300">
                    <th className="px-4 py-3" scope="col">Estructura celular</th>
                    <th className="px-4 py-3" scope="col">Célula animal</th>
                    <th className="px-4 py-3" scope="col">Célula vegetal</th>
                    <th className="px-4 py-3" scope="col">Función biológica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {comparisonTable.map((row) => (
                    <tr key={row.structure} className="hover:bg-white/4 transition align-top">
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
        </Card>
      ) : null}

      {/* ── 8. Comparación de procesos (Metabolismo celular: Fotosíntesis vs Respiración) ── */}
      {comparison.length > 0 ? (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="size-5 text-amber-300" aria-hidden />
            <h3 className="text-lg font-extrabold text-white">
              Procesos metabólicos clave: Fotosíntesis y Respiración celular
            </h3>
          </div>
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
                  <h4 className="text-lg font-bold text-white">{row.process}</h4>
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
        </section>
      ) : null}

      {/* ── 9. Capítulos o secciones adicionales ─────────────────────── */}
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
                <h4 className="text-lg font-bold text-white">{section.heading}</h4>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
            </SpotlightCard>
          ))}
        </AnimatedList>
      ) : null}

      {/* ── 10. Glosario interactivo de términos clave ─────────────── */}
      {glossary.length > 0 ? (
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-violet-300" aria-hidden />
            <h3 className="text-base font-extrabold text-white sm:text-lg">
              <ShinyText text="Glosario científico de la sesión" speed={3} className="font-extrabold text-violet-200" />
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Toca o pasa el cursor por cada término para visualizar su definición científica
          </p>
          <AnimatedList className="mt-3 grid gap-2.5 sm:grid-cols-2" stagger={0.04}>
            {glossary.map((item) => (
              <GlossaryTerm key={item.term} item={item} />
            ))}
          </AnimatedList>
        </Card>
      ) : null}

      {/* ── 11. Nota científica o ¿Sabías que...? ───────────────────── */}
      {(content.didYouKnow || content.note) ? (
        <ClickSpark sparkColor="#fbbf24" sparkCount={10}>
          <div className="flex cursor-pointer items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4 transition-all hover:border-amber-400/40 hover:bg-amber-400/12">
            <Lightbulb className="mt-0.5 size-5 shrink-0 animate-pulse text-amber-300" aria-hidden />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                {content.didYouKnow ? '¿Sabías que…?' : 'Nota científica de la docente'}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-100">
                {(content.didYouKnow ?? content.note) as string}
              </p>
            </div>
          </div>
        </ClickSpark>
      ) : null}

      {/* ── 12. Espacio virtual de la plataforma Vercel (Respuesta escrita integrada) ── */}
      {hasEvidenceResponse ? (
        <VercelResponseSection
          activity={activity}
          mission={mission}
          mandatoryQuestion={mandatoryQuestion}
          structuresTable={structuresTable}
          onEvidenceSubmitted={onEvidenceSubmitted}
        />
      ) : null}
    </article>
  );
}
