import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cloud,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FlaskConical,
  GraduationCap,
  Layout,
  Lightbulb,
  Loader2,
  MessageSquare,
  Microscope,
  Palette,
  Play,
  Quote,
  Send,
  Share2,
  Sliders,
  Sparkles,
  Star,
  Table as TableIcon,
  Trophy
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Chip, EvidenceStatusBadge } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import { activityUrl } from '../../lib/curriculum';
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

export interface Scientist {
  name?: string;
  year?: string;
  icon?: string;
  contribution?: string;
  text?: string;
}

export interface GlossaryItem {
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
          spotlightColor="rgba(56, 189, 248, 0.15)"
          borderColor="rgba(56, 189, 248, 0.3)"
          className="cursor-pointer p-4 transition-all hover:border-sky-400/50"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded-lg border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs font-bold text-sky-200">
                {scientist.year ?? 'Histórico'}
              </span>
              <h4 className="mt-1 text-base font-extrabold text-white sm:text-lg">
                {scientist.name}
              </h4>
            </div>
            <button
              type="button"
              className="grid size-7 place-items-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label={expanded ? 'Ocultar aporte' : 'Ver aporte'}
            >
              {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            </button>
          </div>

          {expanded ? (
            <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm animate-in fade-in duration-300">
              {description}
            </p>
          ) : (
            <p className="mt-2 line-clamp-1 text-xs text-slate-400">
              {description} <span className="text-sky-300 font-bold">(toca para leer más)</span>
            </p>
          )}
        </SpotlightCard>
      </ClickSpark>
    </div>
  );
}

/* ── Interactive Glossary Term ──────────────────────────────── */
function GlossaryTerm({ item }: { item: GlossaryItem }) {
  const [open, setOpen] = useState(false);

  return (
    <ClickSpark sparkColor="#a78bfa" sparkCount={5}>
      <SpotlightCard
        spotlightColor="rgba(167, 139, 250, 0.15)"
        borderColor="rgba(167, 139, 250, 0.3)"
        className="cursor-pointer p-3.5 transition-all hover:border-violet-400/50"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-sm font-bold text-violet-200">
            <DecryptedText text={item.term} speed={30} triggerOnHover />
          </span>
          <span className="text-xs text-slate-400 font-bold">
            {open ? '−' : '+'}
          </span>
        </div>
        {open ? (
          <p className="mt-2 border-t border-white/10 pt-2 text-xs leading-relaxed text-slate-300 animate-in fade-in duration-200">
            {item.definition}
          </p>
        ) : null}
      </SpotlightCard>
    </ClickSpark>
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

/* ── Candidate ideas for Mission 2 ──────────────────────────── */
const M2_IDEAS = [
  {
    id: 'm2-diferencias-nutricion',
    title: 'Diferencias por nutrición y modo de vida',
    description:
      'Nuestras células y las de una planta no son iguales: las plantas son autótrofas y requieren soporte rígido, mientras que los animales somos heterótrofos con células móviles y flexibles.'
  },
  {
    id: 'm2-pared-celulosa',
    title: 'Pared celular y soporte mecánico',
    description:
      'La célula vegetal posee una pared rígida de celulosa que da forma fija y sostén mecánico para que los árboles y plantas crezcan erguidos sin esqueleto óseo.'
  },
  {
    id: 'm2-cloroplastos-fotosintesis',
    title: 'Cloroplastos y fotosíntesis',
    description:
      'Las células vegetales tienen cloroplastos con clorofila para captar luz solar y fabricar glucosa, estructuras que no existen en nuestras células animales.'
  },
  {
    id: 'm2-vacuola-turgencia',
    title: 'Gran vacuola central y turgencia',
    description:
      'La célula vegetal tiene una enorme vacuola de agua que genera presión de turgencia para no marchitarse, mientras que las células animales tienen vacuolas pequeñas y transitorias.'
  },
  {
    id: 'm2-estructuras-comunes',
    title: 'Estructuras comunes indispensables',
    description:
      'Ambas células necesitan obligatoriamente membrana plasmática (intercambio), núcleo con ADN (dirección), citoplasma (reacciones) y mitocondrias (energía ATP) para vivir y funcionar.'
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

  const currentIdeas = missionCode === 'm2' ? M2_IDEAS : DEFAULT_IDEAS;
  const showIdeaSelector = (missionCode === 'm1' || missionCode === 'm2') && structuresTable.length === 0;

  const handleApplyIdeasToText = () => {
    if (selectedIdeas.size === 0) {
      toast.info('Selecciona al menos una idea arriba primero.');
      return;
    }
    const chosen = currentIdeas.filter((i) => selectedIdeas.has(i.id));
    let template = '';
    chosen.forEach((item, index) => {
      if (missionCode === 'm2') {
        template += `• ${item.title}:\n${item.description}\nMi argumento para esta pregunta: Considero que esta idea explica por qué...\n\n`;
      } else {
        template += `• Idea ${index + 1}: ${item.title}\nArgumento: ${item.description} Considero que es importante porque...\n\n`;
      }
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

      {/* ── Selector interactivo de ideas (para Misión 1 y Misión 2) ── */}
      {showIdeaSelector ? (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
              Paso 1: Selecciona tus ideas clave ({selectedIdeas.size}/2 seleccionadas)
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
            {currentIdeas.map((idea) => {
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

      {/* ── Área de redacción y argumentación ── */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label htmlFor="student-reflection-text" className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
            {structuresTable.length > 0
              ? 'Paso 2: Argumenta los cuestionamientos de la docente'
              : 'Paso 2: Escribe tu respuesta y argumentación científica'}
          </label>
          <span className="text-xs text-slate-400">
            {text.trim().length} caracteres (mínimo 40 para entregar)
          </span>
        </div>

        <textarea
          id="student-reflection-text"
          disabled={isSubmitted && !isChangesRequested}
          value={text}
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

/* ══════════════════════════════════════════════════════════════════════
   SESIÓN 1 · SUB-ACTIVIDADES 1.1 A 1.5 ESPECÍFICAS
   ══════════════════════════════════════════════════════════════ */
export interface Session1SubactivitiesProps {
  activity: Activity;
  mission?: MissionDetail;
  content: Record<string, unknown>;
  postulates: string[];
  scientists: Scientist[];
  glossary: GlossaryItem[];
  mandatoryQuestion?: string;
  docUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  onEvidenceSubmitted?: ReadingPlayerProps['onEvidenceSubmitted'];
}

export function Session1Subactivities({
  activity,
  mission,
  postulates,
  scientists,
  glossary,
  mandatoryQuestion,
  docUrl,
  videoUrl,
  videoEmbedUrl,
  onEvidenceSubmitted
}: Session1SubactivitiesProps) {
  const [initialAporte, setInitialAporte] = useState('');
  const [aporteShared, setAporteShared] = useState(false);
  const [revealedPostulates, setRevealedPostulates] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [activeTab, setActiveTab] = useState<'1.1' | '1.2' | '1.3' | '1.4' | '1.5'>('1.1');
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');
  const toast = useToast();

  const handleSelectTab = (tab: '1.1' | '1.2' | '1.3' | '1.4' | '1.5') => {
    setActiveTab(tab);
    if (viewMode === 'all') {
      const idMap = {
        '1.1': 'sub-1-1',
        '1.2': 'sub-1-2',
        '1.3': 'sub-1-3',
        '1.4': 'sub-1-4',
        '1.5': 'sub-1-5'
      };
      const el = document.getElementById(idMap[tab]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleShareAporte = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialAporte.trim()) {
      toast.info('Escribe primero tus ideas o hipótesis antes de compartir.');
      return;
    }
    setAporteShared(true);
    toast.success('¡Aporte registrado! Ahora socializa tu respuesta con el grupo.');
  };

  const handlePostulateReveal = () => {
    setRevealedPostulates((prev) => prev + 1);
  };

  // Extra activities from mission to link in 1.5
  const extraVideo360 = mission?.activities.find((a) => a.type === 'video360');
  const extraModel3d = mission?.activities.find((a) => a.type === 'model3d');
  const extraArCube = mission?.activities.find((a) => a.type === 'ar_cube');
  const extraAnimation3d = mission?.activities.find((a) => a.type === 'animation3d');
  const extraAnimation2d = mission?.activities.find((a) => a.type === 'animation2d');

  return (
    <div className="space-y-6">
      {/* ── Barra de navegación de nivel superior por 5 pestañas ── */}
      <nav
        aria-label="Pestañas de la Sesión 1"
        className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/10 bg-ink-950/95 p-2.5 backdrop-blur-md shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-mint-400/20 text-xs font-extrabold text-mint-300">
            S1
          </span>
          <span className="hidden text-xs font-extrabold uppercase tracking-wider text-slate-300 sm:inline">
            Pestañas de la Sesión:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { tab: '1.1' as const, label: '1.1 Aportes y socialización', shortLabel: '1.1 Aportes' },
            { tab: '1.2' as const, label: '1.2 Aporte conceptual', shortLabel: '1.2 Concepto' },
            { tab: '1.3' as const, label: '1.3 Video: Historia celular', shortLabel: '1.3 Video' },
            { tab: '1.4' as const, label: '1.4 Lectura y Espacio Vercel', shortLabel: '1.4 Lectura y Vercel' },
            { tab: '1.5' as const, label: '1.5 Contenidos extras (Opcional)', shortLabel: '1.5 Extras' }
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleSelectTab(item.tab)}
              className={cn(
                'rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all',
                activeTab === item.tab
                  ? 'bg-mint-400 text-ink-950 shadow-md shadow-mint-400/25 scale-[1.02]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
            </button>
          ))}

          <a
            href="#misiones-complementarias"
            className="inline-flex items-center gap-1 rounded-xl border border-amber-400/30 bg-amber-400/10 px-2.5 py-1.5 text-xs font-bold text-amber-200 transition hover:bg-amber-400/20"
          >
            <Sparkles className="size-3 text-amber-300" aria-hidden />
            <span className="hidden sm:inline">Misiones complementarias</span>
            <span className="sm:hidden">Complementarias</span>
          </a>
        </div>

        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'tabs' ? 'all' : 'tabs')}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-400 hover:bg-white/6 hover:text-white transition"
            title={viewMode === 'tabs' ? 'Cambiar a vista corrida continua' : 'Cambiar a vista pestaña por pestaña'}
          >
            {viewMode === 'tabs' ? '📜 Ver todo' : '📑 Pestañas'}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          1.1 APORTES Y SOCIALIZACIÓN
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.1') && (
        <section id="sub-1-1" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.15)"
            borderColor="rgba(56, 189, 248, 0.35)"
            className="p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-sky-400/20 text-sky-300 font-extrabold text-sm">
                  1.1
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="sky">Sub-actividad 1.1 · Apertura e Indagación Inicial</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Aportes y socialización
                  </h3>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Participación oral y escrita</span>
            </div>

            {/* Texto literal de la docente */}
            <div className="rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 sm:p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">👩‍🏫</span>
                <p className="text-sm leading-relaxed text-slate-100 sm:text-base font-medium">
                  La docente inicia la sesión motivando a los estudiantes a dar respuesta a la pregunta{' '}
                  <strong className="text-sky-200 font-bold">
                    ¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de pequeñas estructuras que no podemos ver a simple vista? ¿se imaginan cómo son y qué hacen para mantenernos vivos?
                  </strong>
                </p>
              </div>
            </div>

            {/* Texto literal de participación */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm space-y-1.5">
              <p className="font-bold text-white flex items-center gap-2">
                <Share2 className="size-4 text-mint-400" aria-hidden />
                Dinámica de la sesión:
              </p>
              <p>
                Los estudiantes participan de forma oral y escrita en la plataforma, dan a conocer sus aportes y socializan con el grupo sus ideas, la docente, proyecta un recurso multimedial que explica los aportes, sus inicios y representantes en la construcción del conocimiento de lo que actualmente se reconoce como teoría celular,
              </p>
            </div>

            {/* Interacción escrita del estudiante */}
            <form onSubmit={handleShareAporte} className="space-y-3 rounded-2xl border border-sky-400/25 bg-ink-950/70 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="aporte-input" className="text-xs font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" aria-hidden />
                  Tu aporte escrito para la socialización:
                </label>
                <span className="text-[11px] text-slate-400">Comparte con el grupo</span>
              </div>

              <textarea
                id="aporte-input"
                rows={3}
                value={initialAporte}
                onChange={(e) => setInitialAporte(e.target.value)}
                placeholder="¿Cómo te imaginas que son estas estructuras invisibles y qué hacen para mantenernos vivos? Escribe aquí tus hipótesis..."
                className="w-full rounded-xl border border-white/15 bg-ink-950/90 p-3 text-xs leading-relaxed text-white placeholder-slate-500 focus:border-sky-400 outline-none sm:text-sm"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  {aporteShared
                    ? '✨ Tu aporte ha sido registrado en la plataforma para socializar con la docente y tus compañeros.'
                    : 'Escribe tu respuesta y pulsa compartir para sumar tu voz al debate grupal.'}
                </p>
                <Button type="submit" variant="primary" size="sm">
                  <Send className="size-3.5" aria-hidden />
                  {aporteShared ? 'Actualizar mi aporte' : 'Compartir mi aporte'}
                </Button>
              </div>
            </form>

            {/* Muro de ideas de la clase */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Aportes para la socialización en clase:
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {aporteShared && initialAporte.trim() ? (
                  <div className="rounded-xl border border-mint-400/40 bg-mint-400/10 p-3 space-y-1 animate-in fade-in">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-mint-300">Tú (en esta sesión)</span>
                      <Chip tone="mint">Mi aporte</Chip>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed italic">“{initialAporte.trim()}”</p>
                  </div>
                ) : null}

                <div className="rounded-xl border border-white/10 bg-white/4 p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-sky-300">Sofía Rojas (5.º A)</span>
                    <span className="text-[11px] text-slate-400">Hipótesis inicial</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    “Me imagino que son como pequeños ladrillitos transparentes que respiran, absorben agua de la comida y nos dan fuerza para movernos y crecer.”
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/4 p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-amber-300">Mateo García (5.º A)</span>
                    <span className="text-[11px] text-slate-400">Hipótesis inicial</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    “Creo que son como fábricas microscópicas donde se cocina la energía para que el corazón lata y las plantas puedan mantenerse de pie.”
                  </p>
                </div>
              </div>
            </div>

            {/* Pie de navegación de pestaña 1.1 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sky-400/20 pt-4">
              <span className="text-xs font-semibold text-slate-400">Pestaña 1 de 5 · Apertura e indagación</span>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  setActiveTab('1.2');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Siguiente: 1.2 Aporte conceptual
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.2 APORTE CONCEPTUAL (LOS 4 POSTULADOS)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.2') && (
        <section id="sub-1-2" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(88, 230, 197, 0.2)"
            borderColor="rgba(88, 230, 197, 0.4)"
            className="p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mint-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-mint-400/20 text-mint-300 font-extrabold text-sm">
                  1.2
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="mint">Sub-actividad 1.2 · Aporte conceptual</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="Aporte conceptual: La Teoría Celular" speed={4} className="font-extrabold text-mint-200" />
                  </h3>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-semibold">
                {revealedPostulates}/{postulates.length} postulados revelados
              </span>
            </div>

            {/* Texto literal del aporte conceptual */}
            <div className="rounded-2xl border border-mint-400/30 bg-mint-400/8 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
                La docente realiza un aporte conceptual explicando que{' '}
                <strong className="text-mint-200 font-extrabold">
                  La Teoría celular explica por qué razón la célula es la unidad estructural y funcional de todos los seres vivos que habitan el planeta, excepto los virus que son acelulares.
                </strong>{' '}
                Incluye los siguientes postulados:
              </p>
            </div>

            {/* Tarjetas interactivas de los 4 postulados literales */}
            <ol className="grid gap-3 sm:grid-cols-2">
              {postulates.map((postulate, index) => (
                <PostulateCard
                  key={postulate}
                  postulate={postulate}
                  index={index}
                  onReveal={handlePostulateReveal}
                />
              ))}
            </ol>

            {/* Nota especial sobre virus acelulares */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4">
              <Lightbulb className="size-5 text-amber-300 shrink-0 mt-0.5" aria-hidden />
              <div className="text-xs leading-relaxed text-amber-100 sm:text-sm space-y-1">
                <p className="font-bold text-amber-300">¿Por qué la teoría celular excluye a los virus?</p>
                <p>
                  Los virus son <strong className="text-white">acelulares</strong>: carecen de citoplasma y metabolismo propio, y no pueden nutrirse ni reproducirse por sí mismos; dependen obligatoriamente de invadir una célula viva. Por eso, la célula es la unidad de vida universal.
                </p>
              </div>
            </div>

            {/* Pie de navegación de pestaña 1.2 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mint-400/20 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setActiveTab('1.1');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Anterior: 1.1 Aportes
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  setActiveTab('1.3');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Siguiente: 1.3 Video YouTube
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.3 VIDEO MULTIMEDIAL (YOUTUBE)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.3') && (
        <section id="sub-1-3" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.15)"
            borderColor="rgba(244, 63, 94, 0.35)"
            className="p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-rose-500/20 text-rose-300 font-extrabold text-sm">
                  1.3
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="rose">Sub-actividad 1.3 · Recurso audiovisual</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Video: La extraña historia de la teoría celular
                  </h3>
                </div>
              </div>

              {videoUrl ? (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/20 hover:text-white"
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  Abrir en YouTube
                </a>
              ) : null}
            </div>

            {/* Texto de solicitud literal */}
            <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
              Se solicita a los estudiantes visualizar el video{' '}
              <strong className="text-rose-200">
                «Video YouTube: La extraña historia de la teoría celular»
              </strong>{' '}
              (<a href="https://youtu.be/OOXO3fGImoU" target="_blank" rel="noreferrer" className="text-sky-300 underline hover:text-sky-200">https://youtu.be/OOXO3fGImoU</a>).
            </p>

            {/* Reproductor embebido sin cookies */}
            {videoEmbedUrl ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                <iframe
                  src={videoEmbedUrl}
                  title="Video YouTube: La extraña historia de la teoría celular"
                  className="absolute inset-0 size-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}

            {/* Descripción pedagógica del video */}
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Play className="size-4 text-rose-400 fill-current" aria-hidden />
                Descripción del video:
              </h4>
              <p>
                Este video animado (basado en la famosa lección de TED-Ed escrita por Lauren Royal-Woods) narra de manera divertida cómo se construyeron los cimientos de la biología moderna. Muestra que el progreso científico no fue un camino recto ni limpio, sino una apasionante aventura repleta de microscopios artesanales, personajes excéntricos, rivalidades y debates históricos.
              </p>
            </div>

            {/* ¿Para qué se mira este video? */}
            <div className="space-y-3 rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 sm:p-5">
              <h4 className="text-sm font-extrabold text-sky-200 uppercase tracking-wider flex items-center gap-2">
                <Star className="size-4 text-sky-300 fill-current" aria-hidden />
                ¿Para qué se mira este video? (Propósito pedagógico):
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">1.</span>
                  <span>
                    <strong>Comprender el rol de la tecnología:</strong> Ver cómo Zacharias Janssen y Anton van Leeuwenhoek abrieron una ventana al mundo microscópico.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">2.</span>
                  <span>
                    <strong>Descubrir el origen de la palabra «célula»:</strong> Robert Hooke comparó las cavidades del corcho con las celdas de un monasterio.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">3.</span>
                  <span>
                    <strong>Identificar los «animálculos»:</strong> Leeuwenhoek descubrió bacterias vivas y protozoos en agua de lluvia y sarro dental.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-sky-400 shrink-0">4.</span>
                  <span>
                    <strong>Conectar los reinos biológicos:</strong> Schleiden (plantas) y Schwann (animales) demostraron que todos los seres vivos están hechos de células.
                  </span>
                </li>
                <li className="flex items-start gap-2 sm:col-span-2">
                  <span className="font-bold text-sky-400 shrink-0">5.</span>
                  <span>
                    <strong>Desmentir la generación espontánea:</strong> Rudolf Virchow demostró que las células no aparecen de la nada: proceden de la división celular (*omnis cellula e cellula*).
                  </span>
                </li>
              </ul>
            </div>

            {/* Pie de navegación de pestaña 1.3 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rose-400/20 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setActiveTab('1.2');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Anterior: 1.2 Aporte conceptual
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  setActiveTab('1.4');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Siguiente: 1.4 Lectura y Espacio Vercel
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.4 LECTURA ADAPTADA Y ESPACIO VIRTUAL DE VERCEL
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.4') && (
        <section id="sub-1-4" className="scroll-mt-36 space-y-6 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.15)"
            borderColor="rgba(251, 191, 36, 0.4)"
            className="p-5 sm:p-7 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-amber-400/20 text-amber-300 font-extrabold text-sm">
                  1.4
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Sub-actividad 1.4 · Lectura oficial y respuesta en plataforma</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Lectura adaptada y Espacio Virtual de Vercel
                  </h3>
                </div>
              </div>

              {docUrl ? (
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-extrabold text-ink-950 transition hover:bg-amber-300 shadow-md shadow-amber-400/20"
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                  Abrir en Google Docs oficial
                </a>
              ) : null}
            </div>

            {/* Texto de instrucción oficial */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-200 sm:text-sm space-y-2">
              <p className="font-bold text-white">Instrucción de la docente:</p>
              <p>
                Realizar la lectura que se aloja en la plataforma (disponible abajo y en Google Docs) para dar respuesta a la siguiente pregunta en el espacio virtual de la plataforma Vercel:
              </p>
              <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 font-display text-sm font-bold text-amber-200 sm:text-base">
                «{mandatoryQuestion}»
              </p>
            </div>

            {/* ── Lectura adaptada maquetada en la plataforma ── */}
            <div className="space-y-4 rounded-3xl border border-white/15 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950 p-6 sm:p-8 shadow-inner">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-amber-400/15 text-2xl text-amber-300">
                  📖
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Lectura curricular adaptada para 5.º grado
                  </span>
                  <h4 className="font-display text-xl font-extrabold text-white sm:text-2xl">
                    La extraña historia de la teoría celular
                  </h4>
                </div>
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-slate-200 sm:text-base">
                <p>
                  Durante miles de años, la humanidad vivió rodeada de un secreto maravilloso: no sabíamos que los árboles gigantes, los pájaros en el cielo, las flores del jardín y nuestro propio cuerpo estamos construidos exactamente con los mismos bloques diminutos. Las personas creían que las cosas vivas aparecían espontáneamente del lodo o de la fruta podrida, porque nadie tenía ojos capaces de ver lo microscópico.
                </p>

                <div className="rounded-2xl border border-sky-400/20 bg-sky-400/5 p-4 sm:p-5 space-y-2">
                  <h5 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
                    <span>1.</span> El invento que abrió una ventana a lo invisible (Principios del siglo XVII)
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    En los Países Bajos, el fabricante de lentes <strong>Zacharias Janssen</strong>, junto con su padre, descubrió que al alinear dos lentes de aumento en un tubo, los objetos pequeños se veían enormes. Acababa de nacer el <strong>primer microscopio compuesto</strong>. Aunque al principio se usó como una curiosidad para examinar telas o insectos, muy pronto se convirtió en la llave mágica de la ciencia.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-4 sm:p-5 space-y-2">
                  <h5 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <span>2.</span> Robert Hooke y el bautizo de la «célula» (1665)
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    En Inglaterra, el científico <strong>Robert Hooke</strong> puso bajo su microscopio una rebanada muy fina de corcho (la corteza de un árbol). Lo que vio lo dejó boquiabierto: cientos de pequeñas cavidades vacías organizadas en hileras, como un panal de abejas. Hooke pensó que se parecían a las pequeñas habitaciones o «celdas» donde dormían los monjes en los monasterios, y decidió llamarlas <strong>células</strong>. Aunque Hooke solo estaba observando las paredes vacías de células que ya no estaban vivas, acababa de acuñar la palabra más importante de la biología.
                  </p>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 sm:p-5 space-y-2">
                  <h5 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <span>3.</span> Anton van Leeuwenhoek y sus diminutos «animálculos» (1674)
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    Poco después, un comerciante holandés llamado <strong>Anton van Leeuwenhoek</strong> aprendió a pulir lentes diminutos pero de una claridad asombrosa. Empezó a observar todo lo que caía en sus manos: gotas de agua estancada, lluvia y hasta el sarro de sus propios dientes. Vio con emoción a millones de seres vivos nadando y moviéndose con energía. Los llamó <em>«animálculos»</em>. Sin saberlo, Leeuwenhoek fue el primer ser humano en ver bacterias vivas y protozoos unicelulares.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-4 sm:p-5 space-y-2">
                  <h5 className="text-sm font-bold text-violet-300 uppercase tracking-wider flex items-center gap-2">
                    <span>4.</span> El gran acuerdo: Las plantas y los animales están hechos de células (1838 - 1839)
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    Pasaron casi dos siglos hasta que dos amigos científicos juntaron las piezas. El botánico <strong>Matthias Schleiden</strong> concluyó tras años de estudio que todas las plantas están hechas de células. Al compartir su café con el zoólogo <strong>Theodor Schwann</strong>, este último se dio cuenta de que los tejidos de los animales también estaban formados por células. Juntos proclamaron que <em>todos los seres vivos del planeta están formados por células</em> y que la célula es la unidad básica de la estructura y función de la vida.
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 sm:p-5 space-y-2">
                  <h5 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span>5.</span> Rudolf Virchow y el origen de la vida celular (1855)
                  </h5>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
                    Había un problema: Schleiden creía que las células nacían por una especie de «cristalización espontánea». Fue el médico <strong>Rudolf Virchow</strong> quien demostró la verdad con su famosa frase en latín: <em>«Omnis cellula e cellula»</em> (Toda célula procede de otra célula preexistente). Las células copian su información genética y se dividen en dos células hijas. La vida no surge por arte de magia: se hereda de célula en célula.
                  </p>
                </div>

                <p className="rounded-2xl border border-mint-400/30 bg-mint-400/10 p-4 text-xs font-semibold text-mint-200 sm:text-sm leading-relaxed">
                  💡 <strong>Conclusión para la biología moderna:</strong> La teoría celular cambió nuestra forma de entender el mundo: demostró que una hormiga diminuta, una hoja de árbol, una bacteria y tú mismo compartimos exactamente la misma arquitectura y las mismas biomoléculas (agua, proteínas, lípidos, carbohidratos y ácidos nucleicos).
                </p>
              </div>
            </div>

            {/* ── Espacio Virtual de Vercel (Formulario de Respuesta y Entrega) ── */}
            {mandatoryQuestion ? (
              <VercelResponseSection
                activity={activity}
                mission={mission}
                mandatoryQuestion={mandatoryQuestion}
                onEvidenceSubmitted={onEvidenceSubmitted}
              />
            ) : null}

            {/* Pie de navegación de pestaña 1.4 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-amber-400/20 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setActiveTab('1.3');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-3')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Anterior: 1.3 Video
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => {
                  setActiveTab('1.5');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-5')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Siguiente: 1.5 Contenidos extras
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.5 CONTENIDOS EXTRAS (OPCIONALES PARA EL ESTUDIANTE)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.5') && (
        <section id="sub-1-5" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(167, 139, 250, 0.15)"
            borderColor="rgba(167, 139, 250, 0.35)"
            className="p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-violet-500/20 text-violet-300 font-extrabold text-sm">
                  1.5
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="grape">Sub-actividad 1.5 · Exploración opcional</Chip>
                    <span className="text-xs text-slate-400">No bloquea tu avance</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Contenidos extras de apoyo (Opcionales para el estudiante)
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">7 recursos de profundización</Chip>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Los contenidos extras que no se encuentran en 1.1, 1.2, 1.3 ni 1.4 están reunidos en esta sección de manera opcional para enriquecer tu experiencia científica con modelos 3D, simulaciones y laboratorios sin bloquear tu avance curricular:
            </p>

            {/* Rejilla de contenidos extras con lanzadores */}
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Extra 1: Dentro de una gota de agua */}
              <div className="flex flex-col justify-between rounded-2xl border border-sky-400/25 bg-sky-400/5 p-4 space-y-3 transition hover:border-sky-400/40">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">💧</span>
                    <Chip tone="sky">Video 360 · +20 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">Dentro de una gota de agua</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Simulación panorámica de microscopía acuática con paramecios y signos explícitos de nutrición, crecimiento celular y reproducción por bipartición.
                  </p>
                </div>
                {extraVideo360 && mission ? (
                  <Link
                    to={activityUrl(mission.code, extraVideo360)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-xs font-bold text-sky-200 transition hover:bg-sky-400/20"
                  >
                    <Eye className="size-3.5" /> Explorar escena 360
                  </Link>
                ) : null}
              </div>

              {/* Extra 2: Microscopio 3D */}
              <div className="flex flex-col justify-between rounded-2xl border border-mint-400/25 bg-mint-400/5 p-4 space-y-3 transition hover:border-mint-400/40">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">🔬</span>
                    <Chip tone="mint">Modelo 3D · +20 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">El microscopio y la célula</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Visor 3D interactivo en Three.js con aumentos 10x, 40x y 100x y exploración de componentes ópticos (ocular, objetivos y platina).
                  </p>
                </div>
                {extraModel3d && mission ? (
                  <Link
                    to={activityUrl(mission.code, extraModel3d)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-mint-400/30 bg-mint-400/10 px-3 py-2 text-xs font-bold text-mint-200 transition hover:bg-mint-400/20"
                  >
                    <Eye className="size-3.5" /> Abrir microscopio 3D
                  </Link>
                ) : null}
              </div>

              {/* Extra 3: Cubo Merge AR */}
              <div className="flex flex-col justify-between rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 space-y-3 transition hover:border-amber-400/40">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">🧊</span>
                    <Chip tone="gold">Cubo AR · +15 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">Cubo de la teoría celular</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Simulador 3D virtual del Cubo Merge con matrices CSS para girar 6 caras de científicos y organismos unicelulares/pluricelulares.
                  </p>
                </div>
                {extraArCube && mission ? (
                  <Link
                    to={activityUrl(mission.code, extraArCube)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-bold text-amber-200 transition hover:bg-amber-400/20"
                  >
                    <Eye className="size-3.5" /> Girar Cubo Merge
                  </Link>
                ) : null}
              </div>

              {/* Extra 4: Zoom microscópico */}
              <div className="flex flex-col justify-between rounded-2xl border border-violet-400/25 bg-violet-400/5 p-4 space-y-3 transition hover:border-violet-400/40">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">🔎</span>
                    <Chip tone="grape">Animación 3D · +15 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">Zoom microscópico</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Viaje visual guiado paso a paso desde el cuerpo completo del organismo hasta el tejido, la célula y el núcleo con material genético.
                  </p>
                </div>
                {extraAnimation3d && mission ? (
                  <Link
                    to={activityUrl(mission.code, extraAnimation3d)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-xs font-bold text-violet-200 transition hover:bg-violet-400/20"
                  >
                    <Eye className="size-3.5" /> Ver zoom animado
                  </Link>
                ) : null}
              </div>

              {/* Extra 5: Línea de tiempo interactiva */}
              <div className="flex flex-col justify-between rounded-2xl border border-sky-400/25 bg-sky-400/5 p-4 space-y-3 transition hover:border-sky-400/40">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">⏳</span>
                    <Chip tone="sky">Línea de tiempo · +15 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">Línea de tiempo de científicos</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cronología desplegable con los aportes de Hooke (1665), Leeuwenhoek (1674), Schleiden (1838), Schwann (1839) y Virchow (1855).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTimeline((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-sky-300 hover:text-sky-200"
                  >
                    {showTimeline ? 'Ocultar aquí' : 'Ver aquí abajo'}
                  </button>
                  {extraAnimation2d && mission ? (
                    <Link
                      to={activityUrl(mission.code, extraAnimation2d)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Abrir estación →
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* Extra 6: Reto final (Quiz) */}
              <div className="flex flex-col justify-between rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 space-y-3 transition hover:border-amber-400/50">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-2xl">🏆</span>
                    <Chip tone="gold">Reto Evaluativo · +30 XP</Chip>
                  </div>
                  <h5 className="text-sm font-extrabold text-white">Quiz de la Sesión 1</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Examen interactivo de 6 preguntas con Cito como guía. Necesitas el 70% para aprobar y conquistar la sesión.
                  </p>
                </div>
                <Link
                  to={`/misiones/${mission?.code ?? 'm1'}/quiz`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-3 py-2 text-xs font-extrabold text-ink-950 transition hover:bg-amber-300 shadow-md shadow-amber-400/20"
                >
                  <Trophy className="size-3.5" /> Presentar Quiz
                </Link>
              </div>
            </div>

            {/* Vista desplegada de la Línea de tiempo si el estudiante la activa */}
            {showTimeline && scientists.length > 0 ? (
              <div className="rounded-2xl border border-sky-400/30 bg-ink-950/80 p-5 space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    <Microscope className="size-4 text-sky-400" />
                    Científicos históricos de la teoría celular
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowTimeline(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cerrar vista
                  </button>
                </div>
                <div className="relative pl-6 sm:pl-8 pt-2">
                  <div className="timeline-rail" aria-hidden />
                  <div className="space-y-3">
                    {scientists.map((scientist) => (
                      <ScientistCard key={`${scientist.name}-${scientist.year}`} scientist={scientist} />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {/* Vista desplegada del Glosario si el estudiante la activa */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-violet-300" />
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-violet-200">
                    Glosario científico y datos clave
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGlossary((prev) => !prev)}
                  className="text-xs font-bold text-violet-300 hover:underline"
                >
                  {showGlossary ? 'Ocultar términos' : 'Explorar términos (+)'}
                </button>
              </div>

              {showGlossary && glossary.length > 0 ? (
                <div className="grid gap-2.5 sm:grid-cols-2 pt-2 animate-in fade-in">
                  {glossary.map((item) => (
                    <GlossaryTerm key={item.term} item={item} />
                  ))}
                </div>
              ) : null}
            </div>

            {/* Pie de navegación de pestaña 1.5 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-violet-400/20 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setActiveTab('1.4');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-4')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Anterior: 1.4 Lectura y Vercel
              </Button>
              <a
                href="#misiones-complementarias"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-mint-400 to-sky-400 px-5 py-2.5 text-xs font-extrabold text-ink-950 shadow-lg shadow-mint-400/20 transition hover:brightness-110 sm:text-sm"
              >
                <Sparkles className="size-4" aria-hidden />
                Explorar Misiones complementarias
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </SpotlightCard>
        </section>
      )}
    </div>
  );
}

/* ── Subactivities layout specifically for Sesión 2 ────────────── */
interface Session2SubactivitiesProps {
  activity: Activity;
  mission?: MissionDetail;
  comparisonTable: TableRow[];
  glossary: GlossaryItem[];
  mandatoryQuestion: string;
  plantTemplateDriveUrl: string;
  animalTemplateDriveUrl: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  onEvidenceSubmitted?: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
}

function Session2Subactivities({
  activity,
  mission,
  comparisonTable,
  glossary,
  mandatoryQuestion,
  plantTemplateDriveUrl,
  animalTemplateDriveUrl,
  videoUrl,
  videoEmbedUrl,
  onEvidenceSubmitted
}: Session2SubactivitiesProps) {
  const [activeTab, setActiveTab] = useState<'2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6'>('2.1');
  const [initialAporte, setInitialAporte] = useState('');
  const [aporteShared, setAporteShared] = useState(false);
  const [selectedOrganelleFilter, setSelectedOrganelleFilter] = useState<'all' | 'shared' | 'plant_only' | 'animal_only'>('all');
  const [activeSliderOrganelle, setActiveSliderOrganelle] = useState<'vacuola' | 'pared' | 'cloroplasto'>('vacuola');
  const [showGlossary, setShowGlossary] = useState(false);
  const toast = useToast();

  const scrollToSub = (
    id: 'sub-2-1' | 'sub-2-2' | 'sub-2-3' | 'sub-2-4' | 'sub-2-5' | 'sub-2-6',
    tab: '2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6'
  ) => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShareAporte = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initialAporte.trim()) {
      toast.info('Escribe primero tus saberes previos antes de compartir.');
      return;
    }
    setAporteShared(true);
    toast.success('¡Saberes previos registrados! Ahora socializa tu respuesta con el grupo.');
  };

  // Extra activities from mission to link
  const extraVideo360 = mission?.activities.find((a) => a.type === 'video360');
  const extraModel3d = mission?.activities.find((a) => a.type === 'model3d');
  const extraAnimation3d = mission?.activities.find((a) => a.type === 'animation3d');
  const extraArCube = mission?.activities.find((a) => a.type === 'ar_cube');
  const extraQuiver = mission?.activities.find((a) => a.type === 'quiver');
  const extraAnimation2d = mission?.activities.find((a) => a.type === 'animation2d');
  const extraQuiz = mission?.activities.find((a) => a.type === 'quiz');

  // Comparison table items with filter
  const baseTable: TableRow[] = comparisonTable.length > 0 ? comparisonTable : [
    { structure: 'Membrana celular', animal: 'Sí', plant: 'Sí', function: 'Controla qué sustancias entran y salen de la célula' },
    { structure: 'Núcleo', animal: 'Sí', plant: 'Sí', function: 'Guarda el material genético (ADN) y coordina actividades' },
    { structure: 'Citoplasma', animal: 'Sí', plant: 'Sí', function: 'Medio acuoso y gelatinoso donde ocurren las reacciones vitales' },
    { structure: 'Mitocondrias', animal: 'Sí (muchas)', plant: 'Sí', function: 'Producen ATP mediante la respiración celular para dar energía' },
    { structure: 'Vacuola', animal: 'Pequeñas y temporales', plant: 'Grande y central (hasta 90%)', function: 'Almacena agua, nutrientes y mantiene la turgencia firme' },
    { structure: 'Pared celular', animal: 'No', plant: 'Sí (de celulosa)', function: 'Armadura externa rígida que confiere forma y protección' },
    { structure: 'Cloroplastos', animal: 'No', plant: 'Sí (con clorofila)', function: 'Captan la luz solar para sintetizar glucosa mediante la fotosíntesis' }
  ];

  const filteredRows = baseTable.filter((row) => {
    if (selectedOrganelleFilter === 'shared') {
      return (row.animal === 'Sí' || (typeof row.animal === 'string' && row.animal.startsWith('Sí')) || row.structure === 'Vacuola') &&
             (row.plant === 'Sí' || (typeof row.plant === 'string' && row.plant.startsWith('Sí')) || row.structure === 'Vacuola');
    }
    if (selectedOrganelleFilter === 'plant_only') {
      return row.animal === 'No';
    }
    if (selectedOrganelleFilter === 'animal_only') {
      return row.plant === 'No';
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* ── Barra de navegación rápida por sub-actividades de la Sesión 2 ── */}
      <nav
        aria-label="Navegación de sub-actividades de la Sesión 2"
        className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-ink-950/90 p-2 backdrop-blur-md shadow-xl"
      >
        <span className="hidden px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400 sm:inline">
          Ruta Sesión 2:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'sub-2-1' as const, tab: '2.1' as const, label: '2.1 Saberes previos' },
            { id: 'sub-2-2' as const, tab: '2.2' as const, label: '2.2 Célula Vegetal' },
            { id: 'sub-2-3' as const, tab: '2.3' as const, label: '2.3 Célula Animal' },
            { id: 'sub-2-4' as const, tab: '2.4' as const, label: '2.4 Pregunta e Indagación' },
            { id: 'sub-2-5' as const, tab: '2.5' as const, label: '2.5 Modelo 360 y Video' },
            { id: 'sub-2-6' as const, tab: '2.6' as const, label: '2.6 Quiver y Comparación' }
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => scrollToSub(item.id, item.tab)}
              className={cn(
                'rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all',
                activeTab === item.tab
                  ? 'bg-sky-400 text-ink-950 shadow-md shadow-sky-400/20'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          2.1 INTRODUCCIÓN Y RECONOCIMIENTO DE SABERES PREVIOS
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-1" className="scroll-mt-36 space-y-4">
        <SpotlightCard
          spotlightColor="rgba(56, 189, 248, 0.15)"
          borderColor="rgba(56, 189, 248, 0.35)"
          className="p-5 sm:p-7 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-sky-400/20 text-sky-300 font-extrabold text-sm">
                2.1
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="sky">Sub-actividad 2.1 · Apertura e Indagación Inicial</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Introducción y reconocimiento de saberes previos
                </h3>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Participación y construcción colectiva</span>
          </div>

          {/* Texto literal oficial de la docente */}
          <div className="rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 sm:p-5 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">👩‍🏫</span>
              <p className="text-sm leading-relaxed text-slate-100 sm:text-base font-medium">
                A partir de la identificación de la célula como unidad estructural y funcional de los seres vivos, la docente, busca reconocer los saberes previos de los estudiantes de grado 5.º sobre la clasificación de las células, especialmente las animales y vegetales, así como identificar sus conocimientos acerca de las principales estructuras celulares y sus funciones, promoviendo la curiosidad, la participación y la construcción colectiva del conocimiento.
              </p>
            </div>
          </div>

          {/* Dinámica inmersiva animada con React Bits */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm space-y-1.5">
            <p className="font-bold text-white flex items-center gap-2">
              <Share2 className="size-4 text-mint-400" aria-hidden />
              Dinámica de indagación en el aula:
            </p>
            <p>
              Explora cómo imaginas las diferencias entre tus células y las de un árbol o flor. Antes de ingresar a los visores microscópicos 3D, registra tus hipótesis previas para compartirlas y contrastarlas con la evidencia científica.
            </p>
          </div>

          {/* Formulario de saberes previos del estudiante */}
          <form onSubmit={handleShareAporte} className="space-y-3 rounded-2xl border border-sky-400/25 bg-ink-950/70 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="saberes-m2-input" className="text-xs font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                <MessageSquare className="size-3.5" aria-hidden />
                Tus saberes previos sobre células animales y vegetales:
              </label>
              <span className="text-[11px] text-slate-400">Construcción colectiva</span>
            </div>

            <textarea
              id="saberes-m2-input"
              rows={3}
              value={initialAporte}
              onChange={(e) => setInitialAporte(e.target.value)}
              placeholder="¿Qué partes crees que tienen las células de tu cuerpo y las de una planta? ¿Crees que son iguales o diferentes? Escribe aquí tus hipótesis..."
              className="w-full rounded-xl border border-white/15 bg-ink-950/90 p-3 text-xs leading-relaxed text-white placeholder-slate-500 focus:border-sky-400 outline-none sm:text-sm"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-400">
                {aporteShared
                  ? '✨ Tus saberes previos quedaron registrados para socializar con la docente y tus compañeros.'
                  : 'Comparte tus ideas iniciales para comenzar la indagación colectiva.'}
              </p>
              <Button type="submit" variant="primary" size="sm">
                <Send className="size-3.5" aria-hidden />
                {aporteShared ? 'Actualizar mis saberes previos' : 'Compartir mis saberes previos'}
              </Button>
            </div>
          </form>

          {/* Muro de ideas previas de 5.º grado */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Saberes previos compartidos en el grupo:
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {aporteShared && initialAporte.trim() ? (
                <div className="rounded-xl border border-mint-400/40 bg-mint-400/10 p-3 space-y-1 animate-in fade-in">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-mint-300">Tú (en esta sesión)</span>
                    <Chip tone="mint">Mi hipótesis</Chip>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">“{initialAporte.trim()}”</p>
                </div>
              ) : null}

              <div className="rounded-xl border border-white/10 bg-white/4 p-3 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-emerald-300">Sofía Rojas (5.º A)</span>
                  <span className="text-[11px] text-slate-400">Saberes previos</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  “Me imagino que las células de las plantas tienen que ser duras como madera para que las hojas no se caigan, mientras que las nuestras son elásticas para poder correr y doblar los brazos.”
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/4 p-3 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-sky-300">Mateo García (5.º A)</span>
                  <span className="text-[11px] text-slate-400">Saberes previos</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  “Las plantas comen luz del sol gracias a partes verdes que nosotros no tenemos. Nosotros necesitamos comer otros seres vivos para tener energía.”
                </p>
              </div>
            </div>
          </div>

          {/* 3 Preguntas detonadoras de curiosidad científica */}
          <div className="grid gap-3 sm:grid-cols-3 pt-2">
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-4 space-y-2">
              <span className="text-2xl">🌿</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                Sostén sin huesos
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                ¿Cómo se sostiene un árbol de 40 metros de altura sin tener un solo hueso? La clave está en su armadura de pared celular y la turgencia del agua.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 space-y-2">
              <span className="text-2xl">☀️</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Cocinas solares verdes
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                ¿Por qué las hojas son verdes y nosotros no? Poseen cloroplastos con clorofila que atrapan la luz solar para fabricar glucosa (fotosíntesis).
              </p>
            </div>

            <div className="rounded-2xl border border-sky-400/25 bg-sky-400/5 p-4 space-y-2">
              <span className="text-2xl">🏃</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                Elasticidad y motilidad
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">
                ¿Por qué podemos doblar los dedos y respirar? Nuestras células animales tienen membrana flexible sin pared dura externa.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2.2 CÉLULA VEGETAL (PLANTILLA QUIVER)
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-2" className="scroll-mt-36 space-y-4">
        <SpotlightCard
          spotlightColor="rgba(74, 222, 128, 0.15)"
          borderColor="rgba(74, 222, 128, 0.35)"
          className="p-5 sm:p-7 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold text-sm">
                2.2
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="mint">Sub-actividad 2.2 · Estructura Vegetal y Ficha Quiver</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  <ShinyText text="Célula Vegetal (Plantilla educativa oficial)" speed={4} className="font-extrabold text-emerald-200" />
                </h3>
              </div>
            </div>

            <a
              href={plantTemplateDriveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-3.5 py-1.5 text-xs font-extrabold text-ink-950 transition hover:bg-emerald-300 shadow-md shadow-emerald-400/20"
            >
              <Download className="size-3.5" aria-hidden />
              Abrir plantilla Célula Vegetal en Google Drive
            </a>
          </div>

          <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
            La célula vegetal es la unidad básica del reino de las plantas. Su arquitectura está diseñada para sostener el cuerpo del vegetal, resistir cambios climáticos y producir su propio alimento a partir del sol:
          </p>

          {/* Desglose de estructuras vegetales clave */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🧱</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                  Exclusivo vegetal
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">1. Pared Celular de Celulosa</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Capa rígida exterior que rodea la membrana. Da soporte mecánico, forma poliédrica fija y evita que la célula reviente con el exceso de agua.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#b45309]" /> Color Quiver: Café / Ocre
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🌿</span>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                  Exclusivo vegetal
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">2. Cloroplastos con Clorofila</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Organelos ovalados verdes con tilacoides. Convierten la luz solar, agua y $CO_2$ en glucosa y oxígeno mediante la fotosíntesis.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#4ade80]" /> Color Quiver: Verde intenso
              </div>
            </div>

            <div className="rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🫧</span>
                <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[10px] font-bold text-sky-200">
                  Gran tamaño central
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">3. Gran Vacuola Central</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Ocupa hasta el 90 % del volumen celular. Almacena agua y sales; cuando está inflada ejerce presión de turgencia contra la pared, manteniendo la planta erguida.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-sky-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#38bdf8]" /> Color Quiver: Celeste / Azul claro
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                  Compartido
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">4. Membrana Plasmática</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Lámina semipermeable ubicada justo por dentro de la pared celular. Regula selectivamente qué nutrientes entran y qué desechos salen.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#10b981]" /> Color Quiver: Verde menta
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🧠</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                  Compartido
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">5. Núcleo, Mitocondrias y Citoplasma</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                El núcleo resguarda el ADN vegetal (desplazado a la orilla por la vacuola gigante); las mitocondrias queman glucosa para producir energía utilizable (ATP), y el citoplasma es el medio donde ocurren las reacciones biológicas.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#3b82f6]" /> Color Quiver: Azul (Núcleo) / Naranja (Mitocondrias)
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2.3 CÉLULA ANIMAL (PLANTILLA QUIVER)
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-3" className="scroll-mt-36 space-y-4">
        <SpotlightCard
          spotlightColor="rgba(125, 211, 252, 0.15)"
          borderColor="rgba(125, 211, 252, 0.35)"
          className="p-5 sm:p-7 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-sky-400/20 text-sky-300 font-extrabold text-sm">
                2.3
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="sky">Sub-actividad 2.3 · Estructura Animal y Ficha Quiver</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  <ShinyText text="Célula Animal (Plantilla educativa oficial)" speed={4} className="font-extrabold text-sky-200" />
                </h3>
              </div>
            </div>

            <a
              href={animalTemplateDriveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-400 px-3.5 py-1.5 text-xs font-extrabold text-ink-950 transition hover:bg-sky-300 shadow-md shadow-sky-400/20"
            >
              <Download className="size-3.5" aria-hidden />
              Abrir plantilla Célula Animal en Google Drive
            </a>
          </div>

          <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
            La célula animal forma los tejidos de todos los animales y del cuerpo humano. Al no tener pared rígida, es extraordinariamente flexible y dinámica:
          </p>

          {/* Desglose de estructuras animales clave */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-violet-400/30 bg-violet-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🛡️</span>
                <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] font-bold text-violet-200">
                  Gran flexibilidad
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">1. Membrana Celular Elástica</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Bicapa lipídica exterior flexible sin pared rígida. Permite que la célula adopte formas variadas (neuronas estrelladas, glóbulos rojos redondos) y se desplace.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-violet-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#a78bfa]" /> Color Quiver: Morado / Púrpura
              </div>
            </div>

            <div className="rounded-2xl border border-blue-400/30 bg-blue-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🧠</span>
                <span className="rounded-full bg-blue-400/20 px-2 py-0.5 text-[10px] font-bold text-blue-200">
                  Posición central
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">2. Núcleo Central y Nucléolo</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Esférico y ubicado en el centro. Protegido por la envoltura nuclear, resguarda el ADN completo y coordina el metabolismo, crecimiento y reproducción.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-blue-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#60a5fa]" /> Color Quiver: Azul intenso
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">⚡</span>
                <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-200">
                  Alta densidad
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">3. Mitocondrias Activas</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Las «centrales energéticas». Presentes en gran cantidad para metabolizar los nutrientes ingeridos mediante respiración celular y producir ATP constante para movernos.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#fb923c]" /> Color Quiver: Naranja brillante
              </div>
            </div>

            <div className="rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">🫧</span>
                <span className="rounded-full bg-sky-400/20 px-2 py-0.5 text-[10px] font-bold text-sky-200">
                  Pequeñas y dispersas
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">4. Vacuolas Pequeñas</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                A diferencia de la planta, las células animales poseen vacuolas diminutas y transitorias destinadas al transporte de nutrientes o digestión celular de desechos.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-sky-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#fbbf24]" /> Color Quiver: Amarillo
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-2xl">💧</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                  Soporte dinámico
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-white">5. Citoplasma, Citoesqueleto y Centríolos</h4>
              <p className="text-xs leading-relaxed text-slate-300">
                Matriz fluida surcada por microfilamentos que permiten el movimiento intracelular. Posee centríolos exclusivos que organizan los filamentos para dividir la célula durante la mitosis.
              </p>
              <div className="pt-1 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[#7dd3fc]" /> Color Quiver: Celeste claro
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2.4 PLANTEAMIENTO DE LA PREGUNTA Y ESPACIO VIRTUAL VERCEL
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-4" className="scroll-mt-36 space-y-6">
        <SpotlightCard
          spotlightColor="rgba(251, 191, 36, 0.15)"
          borderColor="rgba(251, 191, 36, 0.4)"
          className="p-5 sm:p-7 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-amber-400/20 text-amber-300 font-extrabold text-sm">
                2.4
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="gold">Sub-actividad 2.4 · Planteamiento e Indagación en Vercel</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Planteamiento de la pregunta y Espacio Virtual Vercel
                </h3>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Respuesta argumentada del estudiante</span>
          </div>

          {/* Texto literal del planteamiento */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-200 sm:text-sm space-y-2.5">
            <p className="font-bold text-white flex items-center gap-2">
              <Quote className="size-4 text-amber-300" aria-hidden />
              Planteamiento pedagógico de la docente:
            </p>
            <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 font-display text-sm font-bold text-amber-200 sm:text-base leading-snug">
              «{mandatoryQuestion}»
            </p>
            <p className="text-slate-300">
              Para dar respuesta al planteamiento, la docente invita a los estudiantes a visualizar el modelo 360 de la célula y sus partes y el video interactivo (<a href="https://www.youtube.com/watch?v=h1gryskdtmk" target="_blank" rel="noreferrer" className="text-sky-300 underline hover:text-sky-200">https://www.youtube.com/watch?v=h1gryskdtmk</a>). Los estudiantes dan respuesta al planteamiento en la plataforma Vercel.
            </p>
          </div>

          {/* ── Espacio Virtual de Vercel (Formulario de Respuesta y Entrega Persistida) ── */}
          <VercelResponseSection
            activity={activity}
            mission={mission}
            mandatoryQuestion={mandatoryQuestion}
            onEvidenceSubmitted={onEvidenceSubmitted}
          />
        </SpotlightCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2.5 PRESENTACIÓN DEL MODELO 360 Y VIDEO INTERACTIVO
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-5" className="scroll-mt-36 space-y-4">
        <SpotlightCard
          spotlightColor="rgba(244, 63, 94, 0.15)"
          borderColor="rgba(244, 63, 94, 0.35)"
          className="p-5 sm:p-7 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-rose-500/20 text-rose-300 font-extrabold text-sm">
                2.5
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="rose">Sub-actividad 2.5 · Recursos Multimedia 360 y 3D</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Presentación del modelo 360 de la célula y video interactivo
                </h3>
              </div>
            </div>

            {videoUrl ? (
              <a
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-bold text-rose-200 transition hover:bg-rose-500/20 hover:text-white"
              >
                <ExternalLink className="size-3.5" aria-hidden />
                Abrir en YouTube
              </a>
            ) : null}
          </div>

          <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
            Para afianzar y dar respuesta al planteamiento de indagación, la docente invita a los estudiantes a visualizar el{' '}
            <strong className="text-rose-200">modelo 360 de la célula y sus partes</strong> y el{' '}
            <strong className="text-sky-200">video interactivo</strong> (<a href="https://www.youtube.com/watch?v=h1gryskdtmk" target="_blank" rel="noreferrer" className="text-sky-300 underline hover:text-sky-200">https://www.youtube.com/watch?v=h1gryskdtmk</a>).
          </p>

          {/* Reproductor de video interactivo embebido sin cookies */}
          {videoEmbedUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
              <iframe
                src={videoEmbedUrl}
                title="Video interactivo: Estructura y partes de la célula animal y vegetal"
                className="absolute inset-0 size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          {/* Descripción pedagógica del video interactivo */}
          <div className="space-y-2 rounded-2xl border border-white/10 bg-white/4 p-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Play className="size-4 text-rose-400 fill-current" aria-hidden />
              Descripción del video interactivo:
            </h4>
            <p>
              Este video interactivo recorre tridimensionalmente el interior de las células, mostrando cómo se organizan sus partes, sus funciones específicas y por qué las células vegetales y animales presentan diferencias anatómicas adaptadas a su tipo de vida.
            </p>
          </div>

          {/* ¿Para qué se mira este video? */}
          <div className="space-y-3 rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 sm:p-5">
            <h4 className="text-sm font-extrabold text-sky-200 uppercase tracking-wider flex items-center gap-2">
              <Star className="size-4 text-sky-300 fill-current" aria-hidden />
              ¿Para qué se mira este video? (Propósito pedagógico):
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2 text-xs leading-relaxed text-slate-200 sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-400 shrink-0">1.</span>
                <span>
                  <strong>Identificar la tridimensionalidad celular:</strong> Apreciar la disposición tridimensional real de mitocondrias, núcleo y vacuolas.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-400 shrink-0">2.</span>
                <span>
                  <strong>Comprender la especialización fotosintética:</strong> Entender por qué los cloroplastos son verdes y sintetizan alimento con la luz del sol.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-400 shrink-0">3.</span>
                <span>
                  <strong>Observar la función de la pared celular:</strong> Descubrir cómo la pared de celulosa previene que la célula vegetal reviente por exceso de agua.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-sky-400 shrink-0">4.</span>
                <span>
                  <strong>Argumentar en la plataforma Vercel:</strong> Recopilar evidencias visuales para sustentar tu respuesta a la pregunta 2.4.
                </span>
              </li>
            </ul>
          </div>

          {/* Tarjeta del Modelo 360 y enlaces 3D interactivos */}
          <div className="rounded-2xl border border-mint-400/30 bg-mint-400/8 p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🧬</span>
              <div>
                <h4 className="text-sm font-extrabold text-white sm:text-base">
                  Presentación del modelo 360 de la célula y sus partes
                </h4>
                <p className="text-xs text-slate-300">
                  Explora las células vegetal y animal en tres dimensiones con controles de rotación, zoom y conmutación de capas:
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-1">
              {extraModel3d && mission ? (
                <Link
                  to={activityUrl(mission.code, extraModel3d)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-mint-400/30 bg-mint-400/10 p-3.5 transition hover:bg-mint-400/20"
                >
                  <div className="flex items-center gap-2.5">
                    <Box className="size-4 text-mint-300" />
                    <div>
                      <span className="block text-xs font-bold text-white">Visor 3D: Células animal y vegetal</span>
                      <span className="text-[11px] text-slate-400">Gira los modelos 3D y toca hotspots</span>
                    </div>
                  </div>
                  <Eye className="size-4 text-mint-300" />
                </Link>
              ) : null}

              {extraVideo360 && mission ? (
                <Link
                  to={activityUrl(mission.code, extraVideo360)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-sky-400/30 bg-sky-400/10 p-3.5 transition hover:bg-sky-400/20"
                >
                  <div className="flex items-center gap-2.5">
                    <Eye className="size-4 text-sky-300" />
                    <div>
                      <span className="block text-xs font-bold text-white">Video 360 panorámico de la célula</span>
                      <span className="text-[11px] text-slate-400">Recorrido 360 inmersivo</span>
                    </div>
                  </div>
                  <Eye className="size-4 text-sky-300" />
                </Link>
              ) : null}
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2.6 MATERIAL IMPRESO QUIVER Y ANÁLISIS COMPARATIVO
          ══════════════════════════════════════════════════════════════ */}
      <section id="sub-2-6" className="scroll-mt-36 space-y-6">
        <SpotlightCard
          spotlightColor="rgba(167, 139, 250, 0.15)"
          borderColor="rgba(167, 139, 250, 0.35)"
          className="p-5 sm:p-7 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-400/20 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-violet-500/20 text-violet-300 font-extrabold text-sm">
                2.6
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Chip tone="grape">Sub-actividad 2.6 · Estación Quiver y Análisis Comparativo</Chip>
                </div>
                <h3 className="text-lg font-extrabold text-white sm:text-xl">
                  Material impreso Quiver y Análisis Comparativo
                </h3>
              </div>
            </div>
            <Chip tone="neutral">7 estructuras evaluadas</Chip>
          </div>

          {/* Texto literal oficial */}
          <div className="rounded-2xl border border-violet-400/30 bg-violet-400/8 p-4 sm:p-5 space-y-2">
            <p className="font-bold text-white flex items-center gap-2 text-sm">
              <Palette className="size-4 text-violet-300" />
              Instrucción literal de la docente:
            </p>
            <p className="text-sm leading-relaxed text-slate-100 sm:text-base font-medium">
              A fin de afianzar el concepto de la célula y sus partes, la docente proporciona material impreso de Quiver y solicita a los estudiantes colorear la estructura de la célula vegetal y animal, posterior a ello, cada grupo de estudiantes proyecta la imagen a través de la aplicación de Quiver e identifican las semejanzas y diferencias de la estructura entre la célula animal y vegetal.
            </p>
          </div>

          {/* Guía en 4 pasos para la sesión Quiver en el aula */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-violet-300">
              Protocolo para la Estación de Realidad Aumentada Quiver:
            </h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/4 p-3.5 space-y-1.5">
                <span className="grid size-7 place-items-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-200">1</span>
                <h5 className="text-xs font-bold text-white">Material impreso</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Recibe la hoja física o descarga las plantillas de célula animal y vegetal (en 2.2 y 2.3).
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/4 p-3.5 space-y-1.5">
                <span className="grid size-7 place-items-center rounded-lg bg-emerald-500/20 text-xs font-bold text-emerald-200">2</span>
                <h5 className="text-xs font-bold text-white">Colorear estructuras</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Pinta con colores respetando la guía de tonos: cloroplastos verdes, mitocondrias naranjas, pared café.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/4 p-3.5 space-y-1.5">
                <span className="grid size-7 place-items-center rounded-lg bg-sky-500/20 text-xs font-bold text-sky-200">3</span>
                <h5 className="text-xs font-bold text-white">Proyectar con Quiver</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Abre la app Quiver en la tablet o teléfono y enfoca tu dibujo para ver la célula en 3D aumentada.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/4 p-3.5 space-y-1.5">
                <span className="grid size-7 place-items-center rounded-lg bg-amber-500/20 text-xs font-bold text-amber-200">4</span>
                <h5 className="text-xs font-bold text-white">Comparar en grupo</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Identifica junto a tu equipo qué estructuras comparten y cuáles son exclusivas en la tabla inferior.
                </p>
              </div>
            </div>
          </div>

          {/* ── Tabla comparativa interactiva completa de las 7 estructuras ── */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <TableIcon className="size-5 text-mint-300" aria-hidden />
                <h4 className="text-base font-extrabold text-white">
                  Tabla Comparativa: Célula Animal vs. Célula Vegetal
                </h4>
              </div>

              {/* Filtro interactivo de estructuras */}
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <span className="text-slate-400 mr-1 font-semibold">Filtrar:</span>
                {[
                  { key: 'all' as const, label: 'Todas (7)' },
                  { key: 'shared' as const, label: 'Compartidas' },
                  { key: 'plant_only' as const, label: 'Solo Vegetal' },
                  { key: 'animal_only' as const, label: 'Solo Animal' }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setSelectedOrganelleFilter(f.key)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 font-bold transition-all',
                      selectedOrganelleFilter === f.key
                        ? 'bg-mint-400 text-ink-950'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10">
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
                    {filteredRows.map((row) => (
                      <tr key={row.structure} className="hover:bg-white/4 transition align-top">
                        <th className="px-4 py-3 font-extrabold text-white" scope="row">
                          <span className="flex items-center gap-2">
                            {row.structure === 'Cloroplastos' ? '🌿' :
                             row.structure === 'Pared celular' ? '🧱' :
                             row.structure === 'Vacuola' ? '🫧' :
                             row.structure === 'Mitocondrias' ? '⚡' :
                             row.structure === 'Núcleo' ? '🧠' :
                             row.structure === 'Membrana celular' ? '🛡️' : '💧'}
                            {row.structure}
                          </span>
                        </th>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold',
                            row.animal === 'No'
                              ? 'bg-rose-500/15 text-rose-300'
                              : 'bg-sky-400/15 text-sky-300'
                          )}>
                            {row.animal}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn(
                            'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold',
                            row.plant === 'No'
                              ? 'bg-rose-500/15 text-rose-300'
                              : 'bg-emerald-400/15 text-emerald-300'
                          )}>
                            {row.plant}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 text-xs sm:text-sm">{row.function}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Comparador interactivo deslizante de diferencias anatómicas ── */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sliders className="size-4 text-mint-400" />
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Comparador interactivo de diferencias anatómicas
                </h5>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { key: 'vacuola' as const, label: 'Vacuolas' },
                  { key: 'pared' as const, label: 'Pared Celular' },
                  { key: 'cloroplasto' as const, label: 'Cloroplastos' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveSliderOrganelle(item.key)}
                    className={cn(
                      'rounded-lg px-2 py-1 text-xs font-bold transition-all',
                      activeSliderOrganelle === item.key
                        ? 'bg-mint-400 text-ink-950 shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 pt-2">
              <div className="rounded-xl border border-sky-400/30 bg-sky-400/5 p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase text-sky-300">En Célula Animal:</span>
                  <span className="text-lg">🐾</span>
                </div>
                <p className="text-sm font-bold text-white">
                  {activeSliderOrganelle === 'vacuola' ? 'Vacuolas pequeñas y temporales' :
                   activeSliderOrganelle === 'pared' ? 'No tiene pared celular' :
                   'No tiene cloroplastos'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSliderOrganelle === 'vacuola'
                    ? 'Múltiples vesículas diminutas dedicadas al transporte y digestión celular sin generar presión hidrostática.'
                    : activeSliderOrganelle === 'pared'
                    ? 'Su membrana celular flexible le permite estirarse, deformarse y desplazarse para formar tejidos musculares y nerviosos.'
                    : 'Obtiene los nutrientes y glucosa consumiendo alimentos de otros seres vivos (nutrición heterótrofa).'}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase text-emerald-300">En Célula Vegetal:</span>
                  <span className="text-lg">🌿</span>
                </div>
                <p className="text-sm font-bold text-white">
                  {activeSliderOrganelle === 'vacuola' ? 'Gran vacuola central permanente (hasta 90%)' :
                   activeSliderOrganelle === 'pared' ? 'Pared rígida de celulosa' :
                   'Cloroplastos fotosintéticos con clorofila'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeSliderOrganelle === 'vacuola'
                    ? 'Un depósito gigante de agua que presiona hacia afuera (turgencia) para mantener las hojas firmes y vivas.'
                    : activeSliderOrganelle === 'pared'
                    ? 'Armadura poligonal que le da estructura rígida y protección mecánica para sostener el árbol erguido.'
                    : 'Captan la luz solar, agua y dióxido de carbono para sintetizar azúcares propios (nutrición autótrofa).'}
                </p>
              </div>
            </div>
          </div>

          {/* Glosario científico desplegable */}
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-violet-300" />
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-violet-200">
                  Glosario científico de la Sesión 2
                </h5>
              </div>
              <button
                type="button"
                onClick={() => setShowGlossary((prev) => !prev)}
                className="text-xs font-bold text-violet-300 hover:underline"
              >
                {showGlossary ? 'Ocultar términos' : 'Explorar términos (+)'}
              </button>
            </div>

            {showGlossary && glossary.length > 0 ? (
              <div className="grid gap-2.5 sm:grid-cols-2 pt-2 animate-in fade-in">
                {glossary.map((item) => (
                  <GlossaryTerm key={item.term} item={item} />
                ))}
              </div>
            ) : null}
          </div>

          {/* Rejilla de lanzadores a experiencias de apoyo de la Misión 2 */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Experiencias de apoyo de la Misión 2 (Opcionales):
              </h4>
              <span className="text-[11px] text-slate-500">Exploración profunda</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {extraModel3d && mission ? (
                <Link
                  to={activityUrl(mission.code, extraModel3d)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-sky-400/25 bg-sky-400/5 p-3.5 transition hover:bg-sky-400/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧬</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">Modelos 3D de Células</h5>
                      <p className="text-[11px] text-slate-400">Compara animal y vegetal en 3D</p>
                    </div>
                  </div>
                  <Eye className="size-3.5 text-sky-300" />
                </Link>
              ) : null}

              {extraAnimation3d && mission ? (
                <Link
                  to={activityUrl(mission.code, extraAnimation3d)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-3.5 transition hover:bg-emerald-400/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🔍</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">Recorrido por Organelos</h5>
                      <p className="text-[11px] text-slate-400">Animación guiada paso a paso</p>
                    </div>
                  </div>
                  <Eye className="size-3.5 text-emerald-300" />
                </Link>
              ) : null}

              {extraArCube && mission ? (
                <Link
                  to={activityUrl(mission.code, extraArCube)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-amber-400/25 bg-amber-400/5 p-3.5 transition hover:bg-amber-400/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧊</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">Cubo Merge Celular</h5>
                      <p className="text-[11px] text-slate-400">Gira las 6 caras celulares</p>
                    </div>
                  </div>
                  <Eye className="size-3.5 text-amber-300" />
                </Link>
              ) : null}

              {extraQuiver && mission ? (
                <Link
                  to={activityUrl(mission.code, extraQuiver)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-violet-400/25 bg-violet-400/5 p-3.5 transition hover:bg-violet-400/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">Estación Quiver RA</h5>
                      <p className="text-[11px] text-slate-400">Subir foto y verificar logro</p>
                    </div>
                  </div>
                  <Eye className="size-3.5 text-violet-300" />
                </Link>
              ) : null}

              {extraAnimation2d && mission ? (
                <Link
                  to={activityUrl(mission.code, extraAnimation2d)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-pink-400/25 bg-pink-400/5 p-3.5 transition hover:bg-pink-400/15"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🧱</span>
                    <div>
                      <h5 className="text-xs font-bold text-white">Animación 2D Pared Celular</h5>
                      <p className="text-[11px] text-slate-400">Simulación interactiva 2D</p>
                    </div>
                  </div>
                  <Eye className="size-3.5 text-pink-300" />
                </Link>
              ) : null}

              {extraQuiz && mission ? (
                <Link
                  to={activityUrl(mission.code, extraQuiz)}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-mint-400/30 bg-mint-400/10 p-3.5 transition hover:bg-mint-400/20"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏆</span>
                    <div>
                      <h5 className="text-xs font-bold text-mint-200">Reto Evaluativo (Quiz)</h5>
                      <p className="text-[11px] text-slate-400">8 preguntas de la Sesión 2</p>
                    </div>
                  </div>
                  <Trophy className="size-3.5 text-mint-300" />
                </Link>
              ) : null}
            </div>
          </div>
        </SpotlightCard>
      </section>
    </div>
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
  const mandatoryQuestion = content.mandatoryQuestion as string | undefined;
  const hasEvidenceResponse = content.hasEvidenceResponse === true;
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

  const isSession1 =
    mission?.code === 'm1' ||
    content.sessionNumber === 1 ||
    (typeof sessionTitle === 'string' && sessionTitle.includes('Sesión 1'));

  const isSession2 =
    mission?.code === 'm2' ||
    content.sessionNumber === 2 ||
    (typeof sessionTitle === 'string' && sessionTitle.includes('Sesión 2'));

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

      {/* ── Si es Sesión 1: Renderizamos la estructura específica de sub-actividades 1.1 a 1.5 ── */}
      {isSession1 ? (
        <Session1Subactivities
          activity={activity}
          mission={mission}
          content={content}
          postulates={postulates}
          scientists={scientists}
          glossary={glossary}
          mandatoryQuestion={mandatoryQuestion}
          docUrl={docUrl}
          videoUrl={videoUrl}
          videoEmbedUrl={videoEmbedUrl}
          onEvidenceSubmitted={onEvidenceSubmitted}
        />
      ) : isSession2 ? (
        /* ── Si es Sesión 2: Renderizamos la estructura específica de sub-actividades 2.1 a 2.6 ── */
        <Session2Subactivities
          activity={activity}
          mission={mission}
          comparisonTable={comparisonTable}
          glossary={glossary}
          mandatoryQuestion={
            mandatoryQuestion ??
            '¿Creen que las células de nuestro cuerpo son iguales a las de una planta? ¿Qué diferencias imaginan que existen entre ellas y qué partes creen que necesitan para poder vivir y funcionar?'
          }
          plantTemplateDriveUrl={plantTemplateDriveUrl}
          animalTemplateDriveUrl={animalTemplateDriveUrl}
          videoUrl={videoUrl}
          videoEmbedUrl={videoEmbedUrl}
          onEvidenceSubmitted={onEvidenceSubmitted}
        />
      ) : (
        /* ── Sesión 2 o Sesión 3: Renderizado tradicional multimodal ── */
        <div className="space-y-6">
          {/* Descripción pedagógica */}
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

          {/* Pregunta motivadora inicial */}
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

          {/* Recursos obligatorios de la sesión (Sesión 2 y 3) */}
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

            {/* Documento Oficial en Google Docs */}
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

          {/* Aporte conceptual: Los 4 postulados si existen */}
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
            </SpotlightCard>
          ) : null}

          {/* Tabla de comparación entre célula animal y vegetal (Sesión 2) */}
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

          {/* Comparación de procesos (Sesión 3) */}
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

          {/* Capítulos o secciones adicionales */}
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

          {/* Glosario en sesiones 2 y 3 */}
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

          {/* Espacio virtual de la plataforma Vercel */}
          {hasEvidenceResponse && mandatoryQuestion ? (
            <VercelResponseSection
              activity={activity}
              mission={mission}
              mandatoryQuestion={mandatoryQuestion}
              structuresTable={structuresTable}
              onEvidenceSubmitted={onEvidenceSubmitted}
            />
          ) : null}
        </div>
      )}
    </article>
  );
}
