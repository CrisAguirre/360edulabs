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
  Factory,
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
  RotateCcw,
  Send,
  Share2,
  Sliders,
  Sparkles,
  Star,
  Table as TableIcon,
  Trophy,
  Zap
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Chip, EvidenceStatusBadge, LinkButton } from '../../components/ui';
import { CitoMascot } from '../../components/Cito';
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
  AccordionCarousel,
  type AccordionCarouselItem,
  AnimatedList,
  Aurora,
  BlurText,
  CircularCarousel,
  type CircularCarouselItem,
  ClickSpark,
  DecryptedText,
  DriftWall,
  type DriftWallItem,
  OrbitCards,
  type OrbitItem,
  ReflectiveCard,
  ShinyText,
  SpotlightCard
} from '../../components/reactbits';
import {
  BodyLifeGraphic2D,
  CellActivityGraphic2D,
  CellFuelGraphic2D,
  CellStructuresGraphic2D,
  CellularMotorGraphic2D,
  CinemaGraphic2D,
  ParticipationGraphic2D,
  PlantAnimalCellGraphic2D
} from './InquiryGraphics2D';
import {
  CellWallGraphic2D,
  ChloroplastGraphic2D,
  CentralVacuoleGraphic2D,
  PlasmaMembraneGraphic2D,
  NucleusGraphic2D,
  MitochondriaGraphic2D,
  CytoplasmGraphic2D,
  AnimalMembraneGraphic2D,
  CentriolesGraphic2D,
  GolgiGraphic2D,
  LysosomeGraphic2D,
  AnimalVacuolesGraphic2D,
  JanssenMicroscopeGraphic2D,
  HookeCorkGraphic2D,
  LeeuwenhoekAnimalculesGraphic2D,
  SchleidenSchwannGraphic2D,
  VirchowDivisionGraphic2D
} from './CellGraphics2D';
import { ReflectiveStructureCarousel } from './ReflectiveStructureCarousel';
import { Model3DPlayer } from './Model3DPlayer';
import { Animation3DPlayer } from './Animation3DPlayer';
import {
  CELL_COMPARE_ACTIVITY,
  ENERGY_CELL_ACTIVITY,
  M1_ZOOM_MISSION,
  ZOOM_ACTIVITY
} from './embeddedModels';

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

export interface TableRow {
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

export interface StructureItem {
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

/* ── Candidate ideas for Mission 1 (Orbit Cards) ──────────────── */
const DEFAULT_IDEAS: OrbitItem[] = [
  {
    id: 'unidad-estructural',
    title: 'La célula como unidad estructural',
    description:
      'Todos los seres vivos que habitan el planeta se componen de una o más células (unicelulares o pluricelulares).',
    icon: '🔬',
    color: '#38bdf8',
    tag: 'Postulado 1'
  },
  {
    id: 'unidad-origen',
    title: 'La célula como unidad de origen',
    description:
      'Toda célula procede de otra célula preexistente, tras copiar su material genético antes de dividirse.',
    icon: '🧬',
    color: '#10b981',
    tag: 'Postulado 2'
  },
  {
    id: 'biomoleculas',
    title: 'Composición química universal',
    description:
      'Toda célula se compone básicamente de las mismas biomoléculas: agua, minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos.',
    icon: '🧪',
    color: '#f59e0b',
    tag: 'Postulado 3'
  },
  {
    id: 'unidad-funcional',
    title: 'La célula como unidad funcional',
    description:
      'En la célula ocurren las reacciones químicas indispensables para vivir, independientemente del tipo de organismo.',
    icon: '⚡',
    color: '#a855f7',
    tag: 'Postulado 4'
  },
  {
    id: 'microscopia-historica',
    title: 'Aporte de la microscopía científica',
    description:
      'Los aportes de Hooke y Leeuwenhoek permitieron descubrir el mundo celular invisible a simple vista.',
    icon: '📜',
    color: '#ec4899',
    tag: 'Historia'
  }
];

/* ── Candidate ideas for Mission 2 (Orbit Cards) ──────────────── */
const M2_IDEAS: OrbitItem[] = [
  {
    id: 'm2-diferencias-nutricion',
    title: 'Diferencias por nutrición y modo de vida',
    description:
      'Nuestras células y las de una planta no son iguales: las plantas son autótrofas y requieren soporte rígido, mientras que los animales somos heterótrofos con células móviles y flexibles.',
    icon: '🌱',
    color: '#f59e0b',
    tag: 'Nutrición'
  },
  {
    id: 'm2-pared-celulosa',
    title: 'Pared celular y soporte mecánico',
    description:
      'La célula vegetal posee una pared rígida de celulosa que da forma fija y sostén mecánico para que los árboles y plantas crezcan erguidos sin esqueleto óseo.',
    icon: '🧱',
    color: '#b45309',
    tag: 'Soporte'
  },
  {
    id: 'm2-cloroplastos-fotosintesis',
    title: 'Cloroplastos y fotosíntesis',
    description:
      'Las células vegetales tienen cloroplastos con clorofila para captar luz solar y fabricar glucosa, estructuras que no existen en nuestras células animales.',
    icon: '🌿',
    color: '#22c55e',
    tag: 'Energía'
  },
  {
    id: 'm2-vacuola-turgencia',
    title: 'Gran vacuola central y turgencia',
    description:
      'La célula vegetal tiene una enorme vacuola de agua que genera presión de turgencia para no marchitarse, mientras que las células animales tienen vacuolas pequeñas y transitorias.',
    icon: '💧',
    color: '#06b6d4',
    tag: 'Turgencia'
  },
  {
    id: 'm2-estructuras-comunes',
    title: 'Estructuras comunes indispensables',
    description:
      'Ambas células necesitan obligatoriamente membrana plasmática (intercambio), núcleo con ADN (dirección), citoplasma (reacciones) y mitocondrias (energía ATP) para vivir y funcionar.',
    icon: '🧬',
    color: '#8b5cf6',
    tag: 'Esenciales'
  }
];

/* ── Candidate ideas for Mission 3 (Orbit Cards) ──────────────── */
const M3_IDEAS: OrbitItem[] = [
  {
    id: 'm3-fabrica-celular',
    title: 'La célula como fábrica metabólica activa',
    description:
      'La célula funciona como una fábrica: recibe nutrientes como materias primas, los transforma mediante reacciones químicas continuas y usa energía (ATP) para elaborar sustancias vitales.',
    icon: '🏭',
    color: '#f59e0b',
    tag: 'Fábrica'
  },
  {
    id: 'm3-respiracion-atp',
    title: 'Respiración celular y generación de ATP',
    description:
      'En las mitocondrias de células animales y vegetales se oxidan los nutrientes con ayuda del oxígeno para generar ATP, la batería energética universal que impulsa las maquinarias celulares.',
    icon: '⚡',
    color: '#e11d48',
    tag: 'Respiración'
  },
  {
    id: 'm3-fotosintesis-glucosa',
    title: 'Fotosíntesis y producción de glucosa',
    description:
      'Las células vegetales captan luz solar, agua y CO2 en los cloroplastos para fabricar glucosa y liberar oxígeno, actuando como paneles solares generadores de alimento.',
    icon: '🌿',
    color: '#16a34a',
    tag: 'Fotosíntesis'
  },
  {
    id: 'm3-osmosis-turgencia',
    title: 'Ósmosis, vacuola central y turgencia',
    description:
      'El agua entra y sale por ósmosis. En la célula vegetal, la gran vacuola central almacena agua y genera presión de turgencia que mantiene erguida a la planta, evitando la plasmólisis.',
    icon: '💧',
    color: '#0284c7',
    tag: 'Ósmosis'
  },
  {
    id: 'm3-eliminacion-desechos',
    title: 'Catabolismo y eliminación de desechos',
    description:
      'El catabolismo degrada nutrientes para liberar energía, produciendo desechos como CO2 y agua que son transportados hacia el exterior a través de la membrana celular.',
    icon: '🔄',
    color: '#8b5cf6',
    tag: 'Catabolismo'
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

  const currentIdeas = missionCode === 'm3' ? M3_IDEAS : missionCode === 'm2' ? M2_IDEAS : DEFAULT_IDEAS;
  const showIdeaSelector = structuresTable.length === 0 || missionCode === 'm3';

  const handleApplyIdeasToText = () => {
    if (selectedIdeas.size === 0) {
      toast.info('Selecciona al menos una idea arriba primero.');
      return;
    }
    const chosen = currentIdeas.filter((i) => selectedIdeas.has(i.id));
    let template = '';
    chosen.forEach((item, index) => {
      if (missionCode === 'm3') {
        template += `• ${item.title}:\n${item.description}\nMi conclusión sobre este proceso: Considero que esto demuestra que...\n\n`;
      } else if (missionCode === 'm2') {
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
              <Chip tone="gold">Espacio de participación</Chip>
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

      {/* ── Paneles elegibles estilo Orbit Images (React Bits) para Misión 1 y Misión 2 ── */}
      {showIdeaSelector ? (
        <div className="space-y-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
            Paso 1: Selecciona tus ideas clave ({selectedIdeas.size}/2 seleccionadas)
          </label>
          <OrbitCards
            items={currentIdeas}
            selectedIds={selectedIdeas}
            onToggle={toggleIdea}
            maxSelectable={2}
            title={
              missionCode === 'm2'
                ? 'Ideas clave sobre semejanzas, diferencias y necesidades celulares'
                : 'Ideas clave de la teoría celular para tu argumentación'
            }
            instruction="Da clic en alguna para seleccionarlas e integrarlas a tu respuesta"
            accentColor={missionCode === 'm2' ? '#38bdf8' : '#f59e0b'}
            onApplySelected={handleApplyIdeasToText}
            isReadOnly={isSubmitted && !isChangesRequested}
          />
        </div>
      ) : null}

      {/* ── Cuadro de estructura celular con Cards Reflectivas (Obligatorio en Sesión 3) ── */}
      {structuresTable.length > 0 ? (
        <div className="space-y-3">
          <ReflectiveStructureCarousel
            structures={structuresTable}
            answers={tableAnswers}
            onAnswerChange={handleTableCellChange}
            isReadOnly={isSubmitted && !isChangesRequested}
          />
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
  glossary: GlossaryItem[];
  mandatoryQuestion?: string;
  docUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  onEvidenceSubmitted?: ReadingPlayerProps['onEvidenceSubmitted'];
  activeTab?: Session1TabKey;
  onTabChange?: (tab: Session1TabKey) => void;
  viewMode?: 'tabs' | 'all';
  onViewModeChange?: (mode: 'tabs' | 'all') => void;
  showTabBar?: boolean;
  /** XP acumulado de la misión, mostrado junto al título de la estación 1.1. */
  missionXp?: number;
}

export type Session1TabKey = '1.1' | '1.2' | '1.3' | '1.4' | '1.5';

export function Session1Subactivities({
  activity,
  mission,
  postulates,
  glossary,
  mandatoryQuestion,
  docUrl,
  videoUrl,
  videoEmbedUrl,
  onEvidenceSubmitted,
  activeTab: controlledTab,
  onTabChange,
  viewMode: controlledViewMode,
  onViewModeChange,
  showTabBar = true,
  missionXp
}: Session1SubactivitiesProps) {
  const [initialAporte, setInitialAporte] = useState('');
  const [aporteShared, setAporteShared] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState<Session1TabKey>('1.1');
  const [internalViewMode, setInternalViewMode] = useState<'tabs' | 'all'>('tabs');
  const activeTab = controlledTab ?? internalActiveTab;
  const viewMode = controlledViewMode ?? internalViewMode;
  const setActiveTab = (tab: Session1TabKey) => {
    if (onTabChange) onTabChange(tab);
    else setInternalActiveTab(tab);
  };
  const setViewMode = (mode: 'tabs' | 'all') => {
    if (onViewModeChange) onViewModeChange(mode);
    else setInternalViewMode(mode);
  };
  const [historyCarouselLayout, setHistoryCarouselLayout] = useState<'circular' | 'accordion'>('circular');
  const toast = useToast();

  const handleSelectTab = (tab: Session1TabKey) => {
    setActiveTab(tab);
    if (viewMode === 'all') {
      const idMap: Record<Session1TabKey, string> = {
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

  const [revealedPostulateIds, setRevealedPostulateIds] = useState<Set<string>>(new Set());

  const handleDriftWallItemClick = (item: DriftWallItem) => {
    if (!revealedPostulateIds.has(item.id)) {
      setRevealedPostulateIds((prev) => new Set(prev).add(item.id));
    }
  };

  const session1DriftWallItems: DriftWallItem[] = useMemo(() => {
    const p1 =
      postulates[0] ??
      'Todos los seres vivos que habitan el planeta se componen de una (unicelulares) o más células (pluricelulares).';
    const p2 =
      postulates[1] ??
      'Toda célula procede de otra preexistente, que ha copiado su información genética antes de dividirse en dos células hijas.';
    const p3 =
      postulates[2] ??
      'Toda célula se compone básicamente de las mismas sustancias químicas: agua, trazas de minerales, carbohidratos, lípidos, proteínas y ácidos nucleicos, conocidas como biomoléculas.';
    const p4 =
      postulates[3] ??
      'La célula es la unidad funcional de los seres vivos, porque independientemente del organismo al cual se haga referencia, es en ella donde ocurren las reacciones químicas que se necesitan para vivir.';

    return [
      {
        id: 'postulado-1-estructural',
        title: '1. Unidad Estructural',
        subtitle: 'Postulado I · Todos los seres vivos están formados por células',
        description: p1,
        tag: 'Unidad Estructural',
        icon: '🧱',
        color: '#58e6c5',
        keyTerm: 'Unicelulares y Pluricelulares',
        details: [
          'Seres unicelulares: bacterias, protozoos y algas microscópicas formadas por una sola célula.',
          'Seres pluricelulares: plantas, animales y hongos formados por millones o billones de células.',
          'La célula es la pieza anatómica mínima capaz de poseer vida propia.'
        ]
      },
      {
        id: 'postulado-2-funcional',
        title: '2. Unidad Funcional',
        subtitle: 'Postulado II · La célula realiza todas las funciones vitales',
        description: p4.includes('unidad funcional') ? p4 : p2,
        tag: 'Unidad Funcional',
        icon: '⚡',
        color: '#38bdf8',
        keyTerm: 'Metabolismo celular',
        details: [
          'En cada célula se realizan las reacciones químicas del metabolismo (nutrición, respiración, síntesis).',
          'Catabolismo: obtención de energía vital en forma de ATP.',
          'Anabolismo: fabricación y reparación de componentes biológicos.'
        ]
      },
      {
        id: 'postulado-3-origen',
        title: '3. Unidad de Origen',
        subtitle: 'Postulado III · Toda célula proviene de otra preexistente',
        description: p2.includes('preexistente') ? p2 : p4,
        tag: 'Unidad de Origen',
        icon: '🧬',
        color: '#a855f7',
        keyTerm: 'División celular (ADN)',
        details: [
          'Postulado formulado por Rudolf Virchow: "Omnis cellula e cellula".',
          'Toda célula copia su información genética (ADN) antes de dividirse.',
          'Descarta definitivamente la teoría de la generación espontánea.'
        ]
      },
      ...(postulates.length >= 4 && p3
        ? [
            {
              id: 'postulado-4-quimico',
              title: '4. Composición Química Universal',
              subtitle: 'Postulado IV · Biomoléculas de la vida',
              description: p3,
              tag: 'Biomoléculas',
              icon: '🧪',
              color: '#34d399',
              keyTerm: 'Biomoléculas universales',
              details: [
                'Composición universal compartida: agua, carbohidratos, lípidos, proteínas y ácidos nucleicos.',
                'Código genético universal compartido por todas las formas de vida celular.',
                'Mismas leyes bioquímicas en bacterias, plantas y seres humanos.'
              ]
            }
          ]
        : []),
      {
        id: 'mensaje-final-virus',
        title: '¿Por qué la teoría celular excluye a los virus?',
        subtitle: 'Mensaje Final · Exclusión científica de entidades acelulares',
        description:
          'Los virus son acelulares: carecen de citoplasma y metabolismo propio, y no pueden nutrirse ni reproducirse por sí mismos; dependen obligatoriamente de invadir una célula viva para multiplicarse. Por eso, la célula es la unidad de vida universal.',
        tag: 'Mensaje Final',
        icon: '🦠',
        color: '#f59e0b',
        isSpecial: true,
        keyTerm: 'Entidades acelulares',
        details: [
          'No poseen citoplasma, membrana lipídica autónoma ni organelos generadores de energía.',
          'No metabolizan nutrientes ni generan ATP por su cuenta.',
          'Son parásitos intracelulares obligados: solo se replican al secuestrar una célula hospedera viva.'
        ]
      }
    ];
  }, [postulates]);

  return (
    <div className="space-y-6">
      {showTabBar ? (
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
            { tab: '1.4' as const, label: '1.4 Lectura y participación', shortLabel: '1.4 Lectura y participación' },
            { tab: '1.5' as const, label: '1.5 Reto Final de Evaluación', shortLabel: '1.5 Reto Final 🏆' }
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleSelectTab(item.tab)}
              className={cn(
                'rounded-xl px-3 py-1.5 text-xs font-extrabold transition-all',
                activeTab === item.tab
                  ? item.tab === '1.5'
                    ? 'bg-amber-400 text-ink-950 shadow-md shadow-amber-400/25 scale-[1.02]'
                    : 'bg-mint-400 text-ink-950 shadow-md shadow-mint-400/25 scale-[1.02]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">{item.shortLabel}</span>
            </button>
          ))}
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
      ) : null}

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
              <div className="flex flex-col items-end gap-1.5">
                {typeof missionXp === 'number' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                    <Star className="size-3.5 text-amber-300" aria-hidden />
                    {missionXp} puntos de experiencia
                  </span>
                ) : null}
                <span className="text-xs text-slate-400 font-semibold">Participación oral y escrita</span>
              </div>
            </div>

            {/* Preguntas motivadoras con tarjetas reflectivas y gráficos 2D */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                  <Lightbulb className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                    Preguntas para indagar
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Observa cada imagen, imagina una respuesta y compártela con el grupo.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#38bdf8"
                  borderColor="rgba(56, 189, 248, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <BodyLifeGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-sky-400/15 px-2 py-0.5 text-[11px] font-extrabold text-sky-300">
                          Pregunta 1
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Unidad en la diversidad
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        ¿Sabías que tu cuerpo, las plantas y los animales están formados por millones de
                        pequeñas estructuras que no podemos ver a simple vista?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>

                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#58e6c5"
                  borderColor="rgba(88, 230, 197, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <CellActivityGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-mint-400/15 px-2 py-0.5 text-[11px] font-extrabold text-mint-300">
                          Pregunta 2
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Vida en acción
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        ¿Se imaginan cómo son y qué hacen para mantenerse vivos?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>
              </div>
            </div>

            {/* Invitación inmersiva a participar */}
            <div className="relative overflow-hidden rounded-3xl border border-mint-400/25 bg-gradient-to-br from-mint-500/12 via-sky-500/10 to-violet-500/12 p-4 sm:p-5">
              <div
                className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-mint-400/20 blur-3xl"
                aria-hidden
              />
              <div className="pointer-events-none absolute -bottom-14 -left-10 size-40 rounded-full bg-sky-400/15 blur-3xl" aria-hidden />

              <div className="relative grid items-center gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <ParticipationGraphic2D />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-mint-400/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-mint-300">
                      <MessageSquare className="size-3.5" aria-hidden />
                      Tu voz hace ciencia
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Aportes y socialización</span>
                  </div>

                  <h4 className="font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                    ¡Participa y comparte lo que imaginas!
                  </h4>

                  <p className="text-sm leading-relaxed text-slate-200">
                    Cuenta con tus palabras cómo te imaginas esas estructuras invisibles, escucha las
                    ideas de tus compañeros y únelas con las tuyas. Mientras compartimos,{' '}
                    <strong className="font-bold text-mint-300">Cito</strong> proyectará un recurso
                    multimedia que revela cómo nació la teoría celular y quiénes la construyeron.
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-3">
                    {[
                      { icon: <MessageSquare className="size-3.5" aria-hidden />, title: 'Habla', text: 'Di tus ideas en voz alta.' },
                      { icon: <Share2 className="size-3.5" aria-hidden />, title: 'Escribe', text: 'Regístralas en la plataforma.' },
                      { icon: <Sparkles className="size-3.5" aria-hidden />, title: 'Descubre', text: 'Mira el recurso y compáralo.' }
                    ].map((step) => (
                      <li
                        key={step.title}
                        className="rounded-xl border border-white/10 bg-ink-950/50 px-2.5 py-2"
                      >
                        <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-sky-300">
                          {step.icon}
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{step.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
                {revealedPostulateIds.size}/{session1DriftWallItems.length} conceptos analizados
              </span>
            </div>

            {/* Texto del aporte conceptual (dirigido al estudiante) */}
            <div className="rounded-2xl border border-mint-400/30 bg-gradient-to-r from-mint-400/12 via-mint-400/6 to-transparent p-4 sm:p-5 space-y-2">
              <p className="flex items-center gap-2 text-sm font-extrabold text-mint-200 sm:text-base">
                <Sparkles className="size-4" aria-hidden />
                ¡Descubramos juntos el gran secreto de la biología!
              </p>
              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
                Ahora que conoces cómo nació la idea de la célula, imagina que los científicos unieron todos sus
                hallazgos en una sola gran conclusión:{' '}
                <strong className="text-mint-200 font-extrabold">
                  la Teoría Celular, que explica por qué la célula es la unidad estructural y funcional de todos
                  los seres vivos que habitan el planeta… ¡excepto los virus, que son acelulares!
                </strong>{' '}
                Explora el muro y descubre sus postulados:
              </p>
            </div>

            {/* Muro interactivo Drift Wall (React Bits) con las 3 opciones y el mensaje final */}
            <DriftWall
              items={session1DriftWallItems}
              revealedIds={revealedPostulateIds}
              onItemClick={handleDriftWallItemClick}
              title="Muro en perspectiva 3D: Los postulados de la Teoría Celular"
              instruction="Observa el desplazamiento continuo de las opciones y el mensaje final. Pasa el cursor para pausar, arrastra o toca cualquier tarjeta para inspeccionar su postulado en profundidad."
              accentColor="#58e6c5"
            />

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

            {/* Invitación inmersiva a la función científica */}
            <div className="relative overflow-hidden rounded-3xl border border-rose-400/25 bg-gradient-to-br from-rose-500/12 via-violet-500/10 to-sky-500/12 p-4 sm:p-5">
              <div
                className="pointer-events-none absolute -left-12 -top-14 size-44 rounded-full bg-rose-500/20 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full bg-violet-500/20 blur-3xl"
                aria-hidden
              />

              <div className="relative grid items-center gap-4 md:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-200">
                      <Play className="size-3.5 fill-current" aria-hidden />
                      Función científica
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Video · 8 minutos</span>
                  </div>

                  <h4 className="font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                    ¿Y si la célula fuera el mayor misterio de la historia?
                  </h4>

                  <p className="text-sm leading-relaxed text-slate-200">
                    Sube al tren del tiempo con <strong className="font-bold text-rose-200">Cito</strong>:
                    viajarás a los talleres de los primeros microscopistas, espiarás agua de lluvia llena
                    de «animálculos» y descubrirás por qué una simple lámina de corcho cambió para siempre
                    la biología.
                  </p>

                  <ul className="flex flex-wrap gap-1.5">
                    {['Microscopios artesanales', 'Personajes excéntricos', 'Rivalidades científicas'].map(
                      (tag) => (
                        <li
                          key={tag}
                          className="rounded-lg border border-white/12 bg-ink-950/50 px-2 py-1 text-[11px] font-bold text-slate-300"
                        >
                          {tag}
                        </li>
                      )
                    )}
                  </ul>

                  <p className="text-[11px] leading-relaxed text-slate-400">
                    Mientras lo miras, anota en tu bitácora los nombres y los descubrimientos que más te
                    sorprendan: los necesitarás más adelante.
                  </p>
                </div>

                <CinemaGraphic2D />
              </div>
            </div>

            {/* Reproductor embebido en marco inmersivo */}
            {videoEmbedUrl ? (
              <div className="pt-2">
                <div className="relative rounded-[2rem] border border-white/12 bg-white/4 p-2 shadow-2xl sm:p-3">
                  <div
                    className="pointer-events-none absolute -inset-1 rounded-[2.4rem] bg-gradient-to-r from-rose-500/20 via-violet-500/20 to-sky-500/20 opacity-70 blur-xl"
                    aria-hidden
                  />
                  <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                    <iframe
                      src={videoEmbedUrl}
                      title="Video YouTube: La extraña historia de la teoría celular"
                      className="absolute inset-0 size-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink-950/80 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-rose-200 backdrop-blur">
                      <span className="size-1.5 animate-pulse rounded-full bg-rose-400" aria-hidden />
                      En pantalla
                    </div>
                    <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] font-bold text-white/70">
                      <span>La extraña historia de la teoría celular</span>
                      <span className="hidden sm:inline">TED-Ed</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1.5 pb-0.5 text-[11px] font-semibold text-slate-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Play className="size-3 text-rose-300" aria-hidden />
                      Video animado · TED-Ed (Lauren Royal-Woods)
                    </span>
                    {videoUrl ? (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-sky-300 hover:text-sky-200"
                      >
                        Ver en YouTube
                        <ExternalLink className="size-3" aria-hidden />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {/* ¿Qué vas a descubrir en este video? */}
            <div className="space-y-3 rounded-2xl border border-sky-400/30 bg-sky-400/8 p-4 sm:p-5">
              <h4 className="text-sm font-extrabold text-sky-200 uppercase tracking-wider flex items-center gap-2">
                <Star className="size-4 text-sky-300 fill-current" aria-hidden />
                ¿Qué vas a descubrir en este video?
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
                Siguiente: 1.4 Lectura y participación
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.4 LECTURA ADAPTADA Y ESPACIO DE PARTICIPACIÓN
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
                    <Chip tone="gold">Sub-actividad 1.4 · Lectura y participación</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Lectura adaptada y Espacio de participación
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
                Realizar la lectura que se aloja en la plataforma (disponible abajo y en Google Docs) para dar respuesta a la siguiente pregunta en el espacio de participación:
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

                {/* ── Carrusel Circular 3D con Gráficos 2D Animados (React Bits) ── */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-extrabold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="size-4 text-amber-400" />
                      Carrusel Circular 3D · Hitos Históricos de la Teoría Celular
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 hidden sm:inline">
                        Arrastra o gira en 3D para explorar cada hito histórico con su gráfico 2D animado
                      </span>
                      <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-0.5 text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() => setHistoryCarouselLayout('circular')}
                          className={cn(
                            'rounded-lg px-2.5 py-1 transition',
                            historyCarouselLayout === 'circular'
                              ? 'bg-amber-400 text-ink-950 font-black shadow-sm'
                              : 'text-slate-300 hover:text-white'
                          )}
                        >
                          Carrusel 3D
                        </button>
                        <button
                          type="button"
                          onClick={() => setHistoryCarouselLayout('accordion')}
                          className={cn(
                            'rounded-lg px-2.5 py-1 transition',
                            historyCarouselLayout === 'accordion'
                              ? 'bg-amber-400 text-ink-950 font-black shadow-sm'
                              : 'text-slate-300 hover:text-white'
                          )}
                        >
                          Acordeón
                        </button>
                      </div>
                    </div>
                  </div>

                  {historyCarouselLayout === 'circular' ? (
                    <CircularCarousel items={historyCarouselItems} accentColor="#f59e0b" cardWidth={310} cardHeight={480} />
                  ) : (
                    <AccordionCarousel
                      items={historyTheoryAccordionItems}
                      accentColor="#f59e0b"
                      className="w-full my-2"
                    />
                  )}
                </div>

                <p className="rounded-2xl border border-mint-400/30 bg-mint-400/10 p-4 text-xs font-semibold text-mint-200 sm:text-sm leading-relaxed">
                  💡 <strong>Conclusión para la biología moderna:</strong> La teoría celular cambió nuestra forma de entender el mundo: demostró que una hormiga diminuta, una hoja de árbol, una bacteria y tú mismo compartimos exactamente la misma arquitectura y las mismas biomoléculas (agua, proteínas, lípidos, carbohidratos y ácidos nucleicos).
                </p>
              </div>
            </div>

            {/* ── Espacio de participación (Formulario de Respuesta y Entrega) ── */}
            {mandatoryQuestion ? (
              <VercelResponseSection
                activity={activity}
                mission={mission}
                mandatoryQuestion={mandatoryQuestion}
                onEvidenceSubmitted={onEvidenceSubmitted}
              />
            ) : null}

            {/* Glosario científico de la Sesión 1 (recurso de la lectura) */}
            {glossary.length > 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowGlossary((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-2 text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpenCheck className="size-5 text-amber-400" />
                    <span className="font-display text-sm font-extrabold text-white sm:text-base">
                      Glosario científico de la Sesión 1
                    </span>
                    <Chip tone="neutral">{glossary.length} términos</Chip>
                  </div>
                  {showGlossary ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                </button>

                {showGlossary ? (
                  <div className="grid gap-2.5 sm:grid-cols-2 pt-1 animate-in fade-in duration-300">
                    {glossary.map((item) => (
                      <GlossaryTerm key={item.term} item={item} />
                    ))}
                  </div>
                ) : null}
              </div>
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
                variant="gold"
                size="md"
                onClick={() => {
                  setActiveTab('1.5');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-5')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Siguiente: 1.5 Reto Final de Evaluación
                <ArrowRight className="size-4 ml-1.5" aria-hidden />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          1.5 RETO FINAL DE EVALUACIÓN: TEORÍA CELULAR (OBLIGATORIO)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '1.5') && (
        <section id="sub-1-5" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.2)"
            borderColor="rgba(251, 191, 36, 0.45)"
            className="p-5 sm:p-7 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/25 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-amber-400/20 text-amber-300 font-extrabold text-base">
                  1.5
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Sub-actividad 1.5 · Cierre y Reto Final Obligatorio</Chip>
                    <span className="text-xs font-bold text-amber-200">+30 XP</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                    <ShinyText text="Reto final de evaluación: Teoría Celular" speed={4} className="font-extrabold text-amber-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="gold">
                <Trophy className="size-3.5 text-amber-300" aria-hidden />
                Requisito para conquistar la Sesión 1
              </Chip>
            </div>

            {/* Mensaje de orientación con Cito */}
            <div className="flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/8 p-4 sm:p-5">
              <div className="shrink-0">
                <CitoMascot mood="celebrating" size={56} />
              </div>
              <div className="space-y-1.5 text-xs text-slate-200 sm:text-sm">
                <h4 className="font-display font-extrabold text-amber-200 text-sm sm:text-base">
                  ¡Cito te acompaña al Reto Evaluativo!
                </h4>
                <p className="leading-relaxed">
                  Has recorrido los orígenes de la microscopía con Janssen y Leeuwenhoek, el descubrimiento de Hooke, los 4 postulados de Schleiden, Schwann y Virchow, y la exclusión de los virus acelulares. Es momento de comprobar tus conocimientos y conquistar tu insignia científica.
                </p>
              </div>
            </div>

            {/* Ficha técnica del reto evaluativo */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Preguntas oficiales</span>
                <p className="font-display text-lg font-extrabold text-white">6 Preguntas</p>
                <p className="text-[11px] text-slate-400">Opción múltiple con justificación</p>
              </div>
              <div className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Puntaje para aprobar</span>
                <p className="font-display text-lg font-extrabold text-amber-200">70% de aciertos</p>
                <p className="text-[11px] text-slate-400">Mínimo para desbloquear la insignia</p>
              </div>
              <div className="rounded-2xl border border-mint-400/25 bg-mint-400/5 p-4 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-mint-300">Intentos y progreso</span>
                <p className="font-display text-lg font-extrabold text-mint-200">Intentos libres</p>
                <p className="text-[11px] text-slate-400">Se conserva tu calificación más alta</p>
              </div>
            </div>

            {/* Checklist interactivo de repaso de los 4 postulados antes del quiz */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-3">
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-mint-300" />
                Checklist de conceptos clave para el Reto 1.5:
              </h5>
              <ul className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                <li className="flex items-start gap-2 rounded-xl bg-white/4 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">✓</span>
                  <span><strong>Postulado 1:</strong> Todos los seres vivos están hechos de 1 o más células.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/4 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">✓</span>
                  <span><strong>Postulado 2:</strong> Toda célula procede de otra preexistente por división.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/4 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">✓</span>
                  <span><strong>Postulado 3:</strong> Todas comparten biomoléculas (agua, proteínas, ADN, lípidos).</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-white/4 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">✓</span>
                  <span><strong>Postulado 4:</strong> La célula es la unidad funcional donde ocurre el metabolismo.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-rose-400/10 p-2.5 sm:col-span-2 text-rose-200 border border-rose-400/20">
                  <span className="text-rose-400 font-bold shrink-0">⚠️</span>
                  <span><strong>Exclusión biológica:</strong> Los virus son <em>acelulares</em>: no poseen estructura celular propia y necesitan parasitar a una célula viva.</span>
                </li>
              </ul>
            </div>

            {/* Botón de acción principal al Reto Final */}
            <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-extrabold text-white">¿Listo para presentar tu Reto Final?</h4>
                <p className="text-xs text-slate-300">Al aprobar con 70% conquistarás la Sesión 1 y habilitarás el paso a la Sesión 2.</p>
              </div>
              <Link
                to={`/misiones/${mission?.code ?? 'm1'}/quiz`}
                className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 text-sm font-extrabold text-ink-950 shadow-xl shadow-amber-400/25 transition hover:brightness-110"
              >
                <Trophy className="size-5" />
                Iniciar Reto Final de Evaluación (Quiz)
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Pie de navegación de pestaña 1.5 */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
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
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 1.4 Lectura y participación
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => {
                  setActiveTab('1.1');
                  if (viewMode === 'all') {
                    document.getElementById('sub-1-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                <RotateCcw className="size-4 mr-1.5" />
                Repasar desde 1.1
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

    </div>
  );
}
/* ── Hitos Históricos en Carrusel Acordeón con Gráficos 2D Animados (Sesión 1 - 1.4) ── */
const historyTheoryAccordionItems: AccordionCarouselItem[] = [
  {
    id: 'janssen',
    year: 'Principios S. XVII (~1590-1608)',
    scientist: 'Zacharias Janssen',
    title: 'El primer microscopio compuesto',
    subtitle: 'Alineación de dos lentes convexas en un tubo corredizo de latón',
    tag: 'Hito 1 · Óptica y Ampliación',
    tagTone: 'sky',
    color: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: '🔬',
    description:
      'En Middelburg (Países Bajos), el fabricante de lentes Zacharias Janssen, junto con su padre Hans, descubrió que al alinear dos lentes de aumento en un tubo corredizo, los objetos pequeños se veían enormemente ampliados. Acababa de nacer el primer microscopio compuesto.',
    detailedText: [
      'Al combinar una lente ocular y una lente objetivo en un eje óptico, la imagen experimentaba una doble amplificación geométrica que superaba a cualquier lupa simple de la época.',
      'Aunque en sus inicios se usó como una curiosidad para examinar telas e insectos, muy pronto se transformó en el instrumento insignia de la revolución científica moderna.'
    ],
    keyContribution:
      'Invención del microscopio óptico compuesto: abrió la primera ventana visual hacia el universo invisible para los ojos humanos.',
    quote: 'Alinear dos lentes convexas en un tubo duplica la capacidad del ojo y revela lo invisible.',
    graphic2D: <JanssenMicroscopeGraphic2D />,
    metadata: [
      { label: 'Instrumento', value: 'Microscopio de tubo corredizo' },
      { label: 'Ubicación', value: 'Middelburg, Países Bajos' },
      { label: 'Innovación', value: 'Doble lente biconvexa' },
      { label: 'Impacto', value: 'Nacimiento de la microscopía' }
    ]
  },
  {
    id: 'hooke',
    year: '1665',
    scientist: 'Robert Hooke',
    title: 'El bautizo de la «célula»',
    subtitle: 'Observación de cavidades en finas láminas de corcho vegetal',
    tag: 'Hito 2 · Origen del Término',
    tagTone: 'mint',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    icon: '🪵',
    description:
      'En Inglaterra, el científico y dibujante Robert Hooke colocó bajo su microscopio una rebanada muy fina de corcho (corteza del alcornoque). Lo que vio lo dejó boquiabierto: cientos de pequeñas cavidades vacías organizadas en hileras regulares, semejantes al panal de una colmena.',
    detailedText: [
      'Hooke pensó que se parecían a las pequeñas habitaciones o «celdas» (en latín cellae) donde descansaban los monjes en los monasterios, y decidió llamarlas células.',
      'Publicó sus observaciones en su célebre libro Micrographia. Aunque Hooke observaba las paredes celulares muertas de suberina y no el interior vivo, acuñó la palabra central de la biología.'
    ],
    keyContribution:
      'Acuñó el término «célula» y publicó los primeros diagramas microscópicos de tejidos vegetales en su obra Micrographia.',
    quote: 'Eran todas porosas y perforadas, como un panal de abejas... llamé a estas partes celdas o células.',
    graphic2D: <HookeCorkGraphic2D />,
    metadata: [
      { label: 'Obra cumbre', value: 'Micrographia (Londres, 1665)' },
      { label: 'Muestra', value: 'Lámina de corcho (Quercus suber)' },
      { label: 'Estructura', value: 'Paredes vegetales de suberina' },
      { label: 'Término', value: '«Cell» (Célula / Celdilla)' }
    ]
  },
  {
    id: 'leeuwenhoek',
    year: '1674',
    scientist: 'Anton van Leeuwenhoek',
    title: 'Los diminutos «animálculos»',
    subtitle: 'Primeras observaciones de microorganismos vivos en movimiento',
    tag: 'Hito 3 · Vida Unicelular',
    tagTone: 'cyan',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    icon: '💧',
    description:
      'El comerciante holandés Anton van Leeuwenhoek aprendió a pulir diminutas perlas de vidrio con una precisión insólita, creando lentes simples con más de 200 aumentos. Comenzó a examinar gotas de agua estancada, lluvia, sarro dental y fluidos biológicos.',
    detailedText: [
      'Vio con emoción y asombro a millones de seres vivos microscópicos nadando con vigor. Los bautizó como «animálculos».',
      'Sin saberlo, Leeuwenhoek fue el primer ser humano en descubrir bacterias vivas, protozoarios ciliados, espermatozoides y glóbulos rojos, abriendo la microbiología mundial.'
    ],
    keyContribution:
      'Descubrió los primeros seres vivos unicelulares móviles (bacterias y protozoarios), probando que la vida existe a escala microscópica.',
    quote: 'Vi con gran asombro en el agua una cantidad prodigiosa de animálculos que se movían con increíble agilidad.',
    graphic2D: <LeeuwenhoekAnimalculesGraphic2D />,
    metadata: [
      { label: 'Lente', value: 'Microesferas de vidrio pulido (>200x)' },
      { label: 'Muestras', value: 'Agua estancada, lluvia y sarro' },
      { label: 'Descubrimiento', value: 'Bacterias y protozoos vivientes' },
      { label: 'Impacto', value: 'Pionero de la microbiología' }
    ]
  },
  {
    id: 'schleiden-schwann',
    year: '1838 - 1839',
    scientist: 'Schleiden & Schwann',
    title: 'Universalidad celular: Plantas y Animales',
    subtitle: 'Unión de botánica y zoología bajo la misma arquitectura viva',
    tag: 'Hito 4 · Teoría Celular Formal',
    tagTone: 'purple',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    icon: '🌱🐾',
    description:
      'Pasaron casi dos siglos hasta que dos amigos científicos unieron las piezas. El botánico Matthias Schleiden concluyó que todas las plantas están formadas por células. Al compartir sus hallazgos en un café con el zoólogo Theodor Schwann, este reconoció la misma arquitectura en animales.',
    detailedText: [
      'Juntos proclamaron los dos primeros postulados: Todos los seres vivos del planeta están formados por células, y la célula es la unidad básica estructural y funcional de la vida.',
      'Esta gran síntesis demostró que una brizna de hierba y un elefante gigante comparten exactamente la misma unidad biológica fundamental.'
    ],
    keyContribution:
      'Formulación formal de los postulados 1 y 2 de la Teoría Celular: la célula como unidad estructural y funcional universal de todos los seres vivos.',
    quote: 'Hay un principio general de construcción para todas las producciones orgánicas: la formación de células.',
    graphic2D: <SchleidenSchwannGraphic2D />,
    metadata: [
      { label: 'Schleiden', value: 'Botánica: todas las plantas son celulares' },
      { label: 'Schwann', value: 'Zoología: todos los animales son celulares' },
      { label: 'Unificación', value: 'Reinos vegetal y animal hermanados' },
      { label: 'Postulados', value: '1.er y 2.º postulado universal' }
    ]
  },
  {
    id: 'virchow',
    year: '1855',
    scientist: 'Rudolf Virchow',
    title: '«Omnis cellula e cellula»',
    subtitle: 'Origen celular por división biológica y continuidad genética',
    tag: 'Hito 5 · Continuidad de la Vida',
    tagTone: 'gold',
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    icon: '🧬',
    description:
      'Existía un dilema científico: Schleiden creía erróneamente que las células se formaban por una especie de «cristalización espontánea». El patólogo alemán Rudolf Virchow resolvió definitivamente el enigma con su célebre aforismo latino: «Omnis cellula e cellula».',
    detailedText: [
      'Virchow demostró que toda célula procede siempre de otra célula preexistente por bipartición biológica. Las células copian su ADN y se dividen en dos células hijas.',
      'Con este postulado se descartó para siempre la generación espontánea y se estableció la cadena ininterrumpida de la herencia biológica.'
    ],
    keyContribution:
      'Tercer postulado de la Teoría Celular: Toda célula procede de otra preexistente por mitosis y división biológica.',
    quote: 'Donde existe una célula debe haber existido una célula previa, así como un animal solo nace de un animal y una planta de una planta.',
    graphic2D: <VirchowDivisionGraphic2D />,
    metadata: [
      { label: 'Aforismo', value: '«Omnis cellula e cellula»' },
      { label: 'Fenómeno', value: 'División celular y mitosis' },
      { label: 'Revolución', value: 'Fin del dogma de generación espontánea' },
      { label: 'Postulado', value: '3.er postulado: origen celular' }
    ]
  }
];

/* ── Hitos Históricos en Carrusel Circular 3D con Gráficos 2D Animados (Sesión 1 - 1.4) ── */
const historyCarouselItems: CircularCarouselItem[] = [
  {
    id: 'janssen',
    title: '1. Zacharias Janssen',
    subtitle: 'El primer microscopio compuesto (~1590 - 1608)',
    tag: 'Óptica y Aumento',
    tagTone: 'sky',
    description:
      'En Middelburg (Países Bajos), el fabricante de lentes Zacharias Janssen descubrió que al alinear dos lentes de aumento en un tubo corredizo de latón, los objetos se veían enormes. Acababa de nacer el primer microscopio compuesto.',
    color: '#38bdf8',
    icon: '🔬',
    graphic2D: <JanssenMicroscopeGraphic2D />,
    details: [
      { label: 'Aporte', value: 'Microscopio de doble lente convexa' },
      { label: 'Impacto', value: 'Apertura de la era microscópica' }
    ]
  },
  {
    id: 'hooke',
    title: '2. Robert Hooke',
    subtitle: 'El bautizo de la «célula» (1665)',
    tag: 'Origen del Término',
    tagTone: 'mint',
    description:
      'En Inglaterra, Robert Hooke observó finas rebanadas de corcho vegetal y descubrió cientos de pequeñas cavidades poliédricas en hilera parecidas a un panal de abejas. Las llamó «células» (celdillas), acuñando la palabra más célebre de la biología.',
    color: '#10b981',
    icon: '🪵',
    graphic2D: <HookeCorkGraphic2D />,
    details: [
      { label: 'Obra', value: 'Micrographia (Londres, 1665)' },
      { label: 'Hallazgo', value: 'Celdillas en corteza de corcho' }
    ]
  },
  {
    id: 'leeuwenhoek',
    title: '3. Anton van Leeuwenhoek',
    subtitle: 'Los diminutos «animálculos» (1674)',
    tag: 'Vida Unicelular',
    tagTone: 'cyan',
    description:
      'Con lentes artesanales pulidas de más de 200 aumentos, Leeuwenhoek observó gotas de agua estancada y sarro dental, descubriendo por primera vez en la historia bacterias vivas y protozoarios nadando vigorosamente.',
    color: '#06b6d4',
    icon: '💧',
    graphic2D: <LeeuwenhoekAnimalculesGraphic2D />,
    details: [
      { label: 'Lente', value: 'Microesferas de vidrio pulido (>200x)' },
      { label: 'Descubrimiento', value: 'Bacterias y protozoarios vivos' }
    ]
  },
  {
    id: 'schleiden-schwann',
    title: '4. Schleiden & Schwann',
    subtitle: 'Universalidad: Plantas y Animales (1838 - 1839)',
    tag: 'Teoría Celular Formal',
    tagTone: 'purple',
    description:
      'El botánico Schleiden y el zoólogo Schwann unieron la botánica y la zoología: proclamaron que todos los seres vivos (plantas y animales) están formados por células, constituyendo la unidad anatómica y funcional de la vida.',
    color: '#8b5cf6',
    icon: '🌱',
    graphic2D: <SchleidenSchwannGraphic2D />,
    details: [
      { label: 'Postulado 1', value: 'Unidad estructural de la vida' },
      { label: 'Postulado 2', value: 'Unidad funcional de los seres vivos' }
    ]
  },
  {
    id: 'virchow',
    title: '5. Rudolf Virchow',
    subtitle: '«Omnis cellula e cellula» (1855)',
    tag: 'Continuidad Biológica',
    tagTone: 'gold',
    description:
      'Virchow demostró que toda célula procede siempre de otra célula preexistente por mitosis y división biológica, desterrando el mito de la generación espontánea y probando la continuidad genética ininterrumpida de la vida.',
    color: '#f59e0b',
    icon: '🧬',
    graphic2D: <VirchowDivisionGraphic2D />,
    details: [
      { label: 'Aforismo', value: '«Omnis cellula e cellula»' },
      { label: 'Postulado 3', value: 'Toda célula procede de otra previa' }
    ]
  }
];

/* ── Elementos del Carrusel Circular 3D con Gráficos 2D (Sesión 2) ── */
const plantCarouselItems: CircularCarouselItem[] = [
  {
    id: 'pared',
    title: '1. Pared Celular de Celulosa',
    subtitle: 'Armadura externa vegetal',
    tag: 'Exclusivo vegetal',
    tagTone: 'mint',
    description: 'Capa rígida de celulosa que rodea la membrana plasmática. Brinda soporte mecánico a las plantas para crecer erguidas sin esqueleto y previene el estallamiento celular ante alta turgencia.',
    color: '#b45309',
    icon: '🧱',
    quiverColor: { label: 'Café / Ocre', hex: '#b45309' },
    graphic2D: <CellWallGraphic2D />
  },
  {
    id: 'cloroplasto',
    title: '2. Cloroplastos con Clorofila',
    subtitle: 'Fábrica fotosintética',
    tag: 'Exclusivo vegetal',
    tagTone: 'mint',
    description: 'Organelos ovalados verdes con tilacoides y clorofila. Absorben fotones de luz solar para transformar dióxido de carbono y agua en azúcares (glucosa) y oxígeno vital mediante la fotosíntesis.',
    color: '#22c55e',
    icon: '🌿',
    quiverColor: { label: 'Verde intenso', hex: '#22c55e' },
    graphic2D: <ChloroplastGraphic2D />
  },
  {
    id: 'vacuola',
    title: '3. Gran Vacuola Central',
    subtitle: 'Depósito de turgencia',
    tag: 'Exclusivo vegetal',
    tagTone: 'sky',
    description: 'Vesícula gigante que puede ocupar hasta el 90% del volumen celular. Almacena agua, minerales y azúcares; al llenarse empuja las paredes celulares dando firmeza (turgencia) a tallos y hojas.',
    color: '#0ea5e9',
    icon: '🫧',
    quiverColor: { label: 'Celeste / Azul claro', hex: '#0ea5e9' },
    graphic2D: <CentralVacuoleGraphic2D />
  },
  {
    id: 'membrana',
    title: '4. Membrana Plasmática',
    subtitle: 'Barrera selectiva',
    tag: 'Compartido',
    tagTone: 'purple',
    description: 'Bicapa de fosfolípidos con canales proteicos situada por dentro de la pared celular. Regula selectivamente el ingreso de agua, nutrientes esenciales y la salida de residuos metabólicos.',
    color: '#a78bfa',
    icon: '🛡️',
    quiverColor: { label: 'Morado / Violeta', hex: '#a78bfa' },
    graphic2D: <PlasmaMembraneGraphic2D />
  },
  {
    id: 'nucleo',
    title: '5. Núcleo Celular',
    subtitle: 'Centro de control genético',
    tag: 'Compartido',
    tagTone: 'sky',
    description: 'Resguarda el material genético (ADN) con las instrucciones para construir todas las proteínas de la planta. En la célula vegetal se encuentra desplazado a la periferia por la gran vacuola.',
    color: '#3b82f6',
    icon: '🧠',
    quiverColor: { label: 'Azul', hex: '#3b82f6' },
    graphic2D: <NucleusGraphic2D />
  },
  {
    id: 'mitocondria',
    title: '6. Mitocondrias Vegetales',
    subtitle: 'Centrales de energía celular',
    tag: 'Compartido',
    tagTone: 'gold',
    description: 'Queman la glucosa fabricada en los cloroplastos mediante la respiración celular diurna y nocturna para producir ATP utilizable por la planta para crecer, florecer y defenderse.',
    color: '#f97316',
    icon: '⚡',
    quiverColor: { label: 'Naranja', hex: '#f97316' },
    graphic2D: <MitochondriaGraphic2D />
  },
  {
    id: 'citoplasma',
    title: '7. Citoplasma y Citoesqueleto',
    subtitle: 'Medio y corrientes de transporte',
    tag: 'Compartido',
    tagTone: 'mint',
    description: 'Matriz fluida donde se suspenden los organelos. Su red de filamentos genera corrientes citoplasmáticas continuas (ciclosis) que movilizan cloroplastos hacia la luz solar.',
    color: '#14b8a6',
    icon: '💧',
    quiverColor: { label: 'Verde menta', hex: '#14b8a6' },
    graphic2D: <CytoplasmGraphic2D />
  }
];

const animalCarouselItems: CircularCarouselItem[] = [
  {
    id: 'membrana-animal',
    title: '1. Membrana Celular Elástica',
    subtitle: 'Bicapa lipídica flexible',
    tag: 'Gran flexibilidad',
    tagTone: 'purple',
    description: 'Bicapa lipídica fluida sin pared exterior rígida. Permite que las células animales cambien de forma, se deformen elásticamente y formen tejidos móviles (músculo, sangre, piel).',
    color: '#a855f7',
    icon: '🛡️',
    quiverColor: { label: 'Morado / Púrpura', hex: '#a855f7' },
    graphic2D: <AnimalMembraneGraphic2D />
  },
  {
    id: 'nucleo-animal',
    title: '2. Núcleo Central y Nucleolo',
    subtitle: 'Carioteca central esférica',
    tag: 'Posición central',
    tagTone: 'sky',
    description: 'Ubicado en el centro geométrico de la célula animal. Contiene la cromatina y nucleolo denso, dirigiendo la síntesis de proteínas, el metabolismo y la división celular.',
    color: '#3b82f6',
    icon: '🧠',
    quiverColor: { label: 'Azul intenso', hex: '#3b82f6' },
    graphic2D: <NucleusGraphic2D />
  },
  {
    id: 'mitocondria-animal',
    title: '3. Mitocondrias Activas',
    subtitle: 'Alta producción de ATP',
    tag: 'Alta densidad',
    tagTone: 'gold',
    description: 'Presentes en gran número para soportar la alta tasa metabólica y de locomoción de los animales. Oxidan nutrientes orgánicos ingeridos para liberar energía constante.',
    color: '#f97316',
    icon: '⚡',
    quiverColor: { label: 'Naranja brillante', hex: '#f97316' },
    graphic2D: <MitochondriaGraphic2D />
  },
  {
    id: 'vacuolas-animal',
    title: '4. Vacuolas Pequeñas y Vesículas',
    subtitle: 'Dispersas y transitorias',
    tag: 'Pequeñas y dispersas',
    tagTone: 'gold',
    description: 'A diferencia de la planta, las células animales poseen vacuolas diminutas que almacenan temporalmente agua o transportan nutrientes sin generar presión de turgencia.',
    color: '#eab308',
    icon: '🫧',
    quiverColor: { label: 'Amarillo', hex: '#eab308' },
    graphic2D: <AnimalVacuolesGraphic2D />
  },
  {
    id: 'centriolos',
    title: '5. Centríolos y Citosol Animal',
    subtitle: 'Huso mitótico y división celular',
    tag: 'Exclusivo animal',
    tagTone: 'sky',
    description: 'Par de cilindros de microtúbulos (organización 9x3) perpendiculares entre sí. Organizan el huso mitótico durante la división celular (mitosis y meiosis).',
    color: '#06b6d4',
    icon: '🎯',
    quiverColor: { label: 'Celeste claro', hex: '#06b6d4' },
    graphic2D: <CentriolesGraphic2D />
  },
  {
    id: 'golgi',
    title: '6. Complejo de Golgi',
    subtitle: 'Empaquetador y distribuidor',
    tag: 'Compartido',
    tagTone: 'rose',
    description: 'Pila de sacos membranosos que recibe proteínas del retículo endoplásmico, las modifica químicamente y las empaqueta en vesículas para secreción o uso celular.',
    color: '#ec4899',
    icon: '📦',
    quiverColor: { label: 'Rosado', hex: '#ec4899' },
    graphic2D: <GolgiGraphic2D />
  },
  {
    id: 'lisosomas',
    title: '7. Lisosomas Digestivos',
    subtitle: 'Reciclaje y defensa celular',
    tag: 'Digestor celular',
    tagTone: 'rose',
    description: 'Vesículas esféricas con enzimas digestivas ácidas (pH ~5.0). Descomponen bacterias invasoras, macromoléculas de desecho y organelos envejecidos.',
    color: '#f43f5e',
    icon: '🧪',
    quiverColor: { label: 'Rojo / Magenta', hex: '#f43f5e' },
    graphic2D: <LysosomeGraphic2D />
  }
];

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
  activeTab?: Session2TabKey;
  onTabChange?: (tab: Session2TabKey) => void;
  viewMode?: 'tabs' | 'all';
  onViewModeChange?: (mode: 'tabs' | 'all') => void;
  showTabBar?: boolean;
  missionXp?: number;
}

export type Session2TabKey = '2.1' | '2.2' | '2.3' | '2.4' | '2.5' | '2.6' | '2.7';

export function Session2Subactivities({
  activity,
  mission,
  comparisonTable = [],
  glossary = [],
  mandatoryQuestion,
  plantTemplateDriveUrl,
  animalTemplateDriveUrl,
  videoUrl,
  videoEmbedUrl,
  onEvidenceSubmitted,
  activeTab: controlledTab,
  onTabChange,
  viewMode: controlledViewMode,
  onViewModeChange,
  showTabBar = true,
  missionXp
}: Session2SubactivitiesProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<Session2TabKey>('2.1');
  const [internalViewMode, setInternalViewMode] = useState<'tabs' | 'all'>('tabs');
  const activeTab = controlledTab ?? internalActiveTab;
  const viewMode = controlledViewMode ?? internalViewMode;
  const setActiveTab = (tab: Session2TabKey) => {
    if (onTabChange) onTabChange(tab);
    else setInternalActiveTab(tab);
  };
  const setViewMode = (mode: 'tabs' | 'all') => {
    if (onViewModeChange) onViewModeChange(mode);
    else setInternalViewMode(mode);
  };
  const [initialAporte, setInitialAporte] = useState('');
  const [aporteShared, setAporteShared] = useState(false);
  const [selectedOrganelleFilter, setSelectedOrganelleFilter] = useState<'all' | 'shared' | 'plant_only' | 'animal_only'>('all');
  const [activeSliderOrganelle, setActiveSliderOrganelle] = useState<'vacuola' | 'pared' | 'cloroplasto'>('vacuola');
  const [showGlossary, setShowGlossary] = useState(false);
  const toast = useToast();

  const handleSelectTab = (tab: Session2TabKey) => {
    setActiveTab(tab);
    if (viewMode === 'all') {
      const idMap: Record<Session2TabKey, string> = {
        '2.1': 'sub-2-1',
        '2.2': 'sub-2-2',
        '2.3': 'sub-2-3',
        '2.4': 'sub-2-4',
        '2.5': 'sub-2-5',
        '2.6': 'sub-2-6',
        '2.7': 'sub-2-7'
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
      toast.info('Escribe primero tus saberes previos antes de compartir.');
      return;
    }
    setAporteShared(true);
    toast.success('¡Saberes previos registrados! Ahora socializa tu respuesta con el grupo.');
  };

  // Comparison table items with filter
  const baseTable: TableRow[] = comparisonTable && comparisonTable.length > 0 ? comparisonTable : [
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
    <div className="space-y-6">
      {showTabBar ? (
      <nav
        aria-label="Pestañas de la Sesión 2"
        className="sticky top-20 z-20 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-white/10 bg-ink-950/95 p-2.5 backdrop-blur-md shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-sky-400/20 text-xs font-extrabold text-sky-300">
            S2
          </span>
          <span className="hidden text-xs font-extrabold uppercase tracking-wider text-slate-300 sm:inline">
            Pestañas de la Sesión:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { tab: '2.1' as const, label: '2.1 Saberes previos', shortLabel: '2.1 Saberes' },
            { tab: '2.2' as const, label: '2.2 Célula Vegetal', shortLabel: '2.2 Vegetal' },
            { tab: '2.3' as const, label: '2.3 Célula Animal', shortLabel: '2.3 Animal' },
            { tab: '2.4' as const, label: '2.4 Modelo 360 y Video', shortLabel: '2.4 360 y Video' },
            { tab: '2.5' as const, label: '2.5 Participación', shortLabel: '2.5 Participación' },
            { tab: '2.6' as const, label: '2.6 Quiver y Comparación', shortLabel: '2.6 Quiver' },
            { tab: '2.7' as const, label: '2.7 Reto Final (Quiz)', shortLabel: '2.7 Reto Final 🏆' }
          ].map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleSelectTab(item.tab)}
              className={cn(
                'rounded-xl px-2.5 py-1.5 text-xs font-extrabold transition-all',
                activeTab === item.tab
                  ? item.tab === '2.7'
                    ? 'bg-amber-400 text-ink-950 shadow-md shadow-amber-400/25 scale-[1.02]'
                    : 'bg-sky-400 text-ink-950 shadow-md shadow-sky-400/25 scale-[1.02]'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              )}
            >
              <span className="hidden lg:inline">{item.label}</span>
              <span className="lg:hidden">{item.shortLabel}</span>
            </button>
          ))}
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
      ) : null}

      {/* ══════════════════════════════════════════════════════════════
          2.1 INTRODUCCIÓN Y RECONOCIMIENTO DE SABERES PREVIOS
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.1') && (
        <section id="sub-2-1" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
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
              <div className="flex flex-col items-end gap-1.5">
                {typeof missionXp === 'number' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                    <Star className="size-3.5 text-amber-300" aria-hidden />
                    {missionXp} puntos de experiencia
                  </span>
                ) : null}
                <span className="text-xs text-slate-400 font-semibold">Participación y construcción colectiva</span>
              </div>
            </div>

            {/* Preguntas para indagar con tarjetas reflectivas y gráficos 2D */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                  <Lightbulb className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-sky-300">
                    Preguntas para indagar
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Observa cada imagen, imagina una respuesta y compártela con el grupo.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#38bdf8"
                  borderColor="rgba(56, 189, 248, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <PlantAnimalCellGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-sky-400/15 px-2 py-0.5 text-[11px] font-extrabold text-sky-300">
                          Pregunta 1
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Clasificación celular
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        ¿Cómo te imaginas las diferencias entre tus células y las de un árbol o una flor?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>

                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#34d399"
                  borderColor="rgba(52, 211, 153, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <CellStructuresGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-emerald-400/15 px-2 py-0.5 text-[11px] font-extrabold text-emerald-300">
                          Pregunta 2
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Estructuras y funciones
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        ¿Qué estructuras crees que tiene una célula y para qué le sirve cada una?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>
              </div>
            </div>

            {/* Invitación inmersiva a participar */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/12 via-sky-500/10 to-violet-500/12 p-4 sm:p-5">
              <div
                className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-emerald-400/20 blur-3xl"
                aria-hidden
              />
              <div className="pointer-events-none absolute -bottom-14 -left-10 size-40 rounded-full bg-sky-400/15 blur-3xl" aria-hidden />

              <div className="relative grid items-center gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <ParticipationGraphic2D />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-400/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300">
                      <MessageSquare className="size-3.5" aria-hidden />
                      Tu voz hace ciencia
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Saberes previos · Células animales y vegetales</span>
                  </div>

                  <h4 className="font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                    ¡Participa y comparte lo que imaginas!
                  </h4>

                  <p className="text-sm leading-relaxed text-slate-200">
                    Antes de entrar a los visores microscópicos 3D, escribe lo que crees: ¿en qué se parecen o
                    diferencian las células de tu cuerpo y las de una planta? Luego compártelo con el grupo y{' '}
                    <strong className="font-bold text-emerald-300">Cito</strong> te acompañará a contrastarlo con la
                    evidencia científica.
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-3">
                    {[
                      { icon: <Eye className="size-3.5" aria-hidden />, title: 'Imagina', text: 'Piensa en ambas células.' },
                      { icon: <Share2 className="size-3.5" aria-hidden />, title: 'Comparte', text: 'Registra tus hipótesis.' },
                      { icon: <Sparkles className="size-3.5" aria-hidden />, title: 'Contrasta', text: 'Compáralo con la evidencia.' }
                    ].map((step) => (
                      <li
                        key={step.title}
                        className="rounded-xl border border-white/10 bg-ink-950/50 px-2.5 py-2"
                      >
                        <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-sky-300">
                          {step.icon}
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{step.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-slate-400">
                Paso 1 de 7 · Indagación inicial
              </span>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('2.2')}
              >
                Siguiente: 2.2 Célula Vegetal
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.2 CÉLULA VEGETAL (PLANTILLA QUIVER)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.2') && (
        <section id="sub-2-2" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
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

            {/* Modelo 3D interactivo: Célula de la energía */}
            <div className="overflow-hidden rounded-3xl border border-emerald-400/25 bg-ink-950/60 p-4 sm:p-5">
              <Model3DPlayer activity={ENERGY_CELL_ACTIVITY} initialView="simulator" />
            </div>

            <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
              La célula vegetal es la unidad básica del reino de las plantas. Su arquitectura está diseñada para sostener el cuerpo del vegetal, resistir cambios climáticos y producir su propio alimento a partir del sol:
            </p>

            {/* Carrusel Circular 3D de Estructuras Vegetales con Gráficos 2D (React Bits) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <RotateCcw className="size-3.5" />
                  Carrusel Circular 3D · 7 Estructuras de la Célula Vegetal
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">Arrastra o gira para explorar cada organelo con su gráfico 2D</span>
              </div>
              <CircularCarousel items={plantCarouselItems} accentColor="#22c55e" />
            </div>

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.1')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.1 Saberes previos
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('2.3')}
              >
                Siguiente: 2.3 Célula Animal
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.3 CÉLULA ANIMAL (PLANTILLA QUIVER)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.3') && (
        <section id="sub-2-3" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
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

            {/* Modelo 3D interactivo: Dos células para comparar */}
            <div className="overflow-hidden rounded-3xl border border-sky-400/25 bg-ink-950/60 p-4 sm:p-5">
              <Model3DPlayer activity={CELL_COMPARE_ACTIVITY} initialView="local" />
            </div>

            <p className="text-sm leading-relaxed text-slate-200 sm:text-base font-medium">
              La célula animal forma los tejidos de todos los animales y del cuerpo humano. Al no tener pared rígida, es extraordinariamente flexible y dinámica:
            </p>

            {/* Carrusel Circular 3D de Estructuras Animales con Gráficos 2D (React Bits) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                  <RotateCcw className="size-3.5" />
                  Carrusel Circular 3D · 7 Estructuras de la Célula Animal
                </span>
                <span className="text-[11px] text-slate-400 hidden sm:inline">Arrastra o gira para explorar cada organelo con su gráfico 2D</span>
              </div>
              <CircularCarousel items={animalCarouselItems} accentColor="#38bdf8" />
            </div>

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.2')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.2 Célula Vegetal
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('2.4')}
              >
                Siguiente: 2.4 Modelo 360 y Video
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.4 PRESENTACIÓN DEL MODELO 360 Y VIDEO INTERACTIVO
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.4') && (
        <section id="sub-2-4" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.15)"
            borderColor="rgba(244, 63, 94, 0.35)"
            className="p-5 sm:p-7 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-rose-500/20 text-rose-300 font-extrabold text-sm">
                  2.4
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="rose">Sub-actividad 2.4 · Modelo 360 y Video Interactivo</Chip>
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

            {/* Descripción: exploración libre de la célula */}
            <div className="rounded-2xl border border-rose-400/25 bg-rose-400/8 p-4 sm:p-5">
              <p className="text-sm leading-relaxed text-slate-100 sm:text-base">
                <strong className="text-rose-200">Explora libremente la estructura de la célula.</strong> Gira el
                modelo, acércate y reconoce las partes que viste en los dos módulos anteriores: la{' '}
                <strong className="text-emerald-300">célula vegetal</strong> (pared celular, cloroplastos y vacuola
                central) y la <strong className="text-sky-300">célula animal</strong> (membrana, núcleo y
                mitocondrias).
              </p>
            </div>

            {/* Modelo 3D: Zoom microscópico */}
            <div className="overflow-hidden rounded-3xl border border-violet-400/25 bg-ink-950/60 p-4 sm:p-5">
              <Animation3DPlayer activity={ZOOM_ACTIVITY} mission={M1_ZOOM_MISSION} onProgressChange={() => {}} />
            </div>

            {/* Video interactivo como dato adjunto (tamaño reducido) */}
            {videoEmbedUrl ? (
              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Play className="size-4 text-rose-400 fill-current" aria-hidden />
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Video de apoyo: estructura y partes de la célula
                  </h4>
                  {videoUrl ? (
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold text-sky-300 hover:text-sky-200"
                    >
                      Abrir en YouTube
                      <ExternalLink className="size-3" aria-hidden />
                    </a>
                  ) : null}
                </div>
                <div className="relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-black">
                  <iframe
                    src={videoEmbedUrl}
                    title="Video de apoyo: Estructura y partes de la célula animal y vegetal"
                    className="absolute inset-0 size-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Recorre tridimensionalmente el interior de las células y fíjate en cómo se organizan sus partes y
                  en las diferencias entre célula vegetal y animal.
                </p>
              </div>
            ) : null}

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.3')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.3 Célula Animal
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('2.5')}
              >
                Siguiente: 2.5 Participación
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.5 PARTICIPACIÓN
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.5') && (
        <section id="sub-2-5" className="scroll-mt-36 space-y-6 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.15)"
            borderColor="rgba(251, 191, 36, 0.4)"
            className="p-5 sm:p-7 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-amber-400/20 text-amber-300 font-extrabold text-sm">
                  2.5
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Sub-actividad 2.5 · Participación</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Participación
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
                Para dar respuesta al planteamiento, la docente invita a los estudiantes a visualizar el modelo 360 de la célula y sus partes y el video interactivo. Los estudiantes dan respuesta al planteamiento en la plataforma.
              </p>
            </div>

            {/* ── Espacio de participación (Formulario de Respuesta y Entrega Persistida) ── */}
            <VercelResponseSection
              activity={activity}
              mission={mission}
              mandatoryQuestion={mandatoryQuestion}
              onEvidenceSubmitted={onEvidenceSubmitted}
            />

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.4')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.4 Modelo 360 y Video
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('2.6')}
              >
                Siguiente: 2.6 Quiver y Comparación
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.6 MATERIAL IMPRESO QUIVER Y ANÁLISIS COMPARATIVO
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.6') && (
        <section id="sub-2-6" className="scroll-mt-36 space-y-6 animate-in fade-in duration-300">
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

            {/* Pie de navegación de la sub-actividad */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.5')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.5 Participación
              </Button>
              <Button
                type="button"
                variant="gold"
                size="md"
                onClick={() => handleSelectTab('2.7')}
              >
                Siguiente: 2.7 Reto Final de Evaluación
                <Trophy className="size-4 ml-1.5 text-amber-300" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          2.7 RETO FINAL DE EVALUACIÓN (QUIZ)
          ══════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '2.7') && (
        <section id="sub-2-7" className="scroll-mt-36 space-y-4 animate-in fade-in duration-300">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.2)"
            borderColor="rgba(251, 191, 36, 0.4)"
            className="p-5 sm:p-7 space-y-6 bg-gradient-to-br from-ink-900/90 via-ink-950/80 to-surface-900/90"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-400/20 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-amber-400/20 text-amber-300 font-extrabold text-sm">
                  2.7
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Sub-actividad 2.7 · Reto Final Evaluativo (Obligatorio)</Chip>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Reto evaluativo: Células bajo la lupa
                  </h3>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-extrabold flex items-center gap-1.5">
                <Trophy className="size-3.5" />
                Requisito obligatorio para conquistar Sesión 2
              </span>
            </div>

            {/* Banner con Cito tutor */}
            <div className="flex flex-col-reverse items-center justify-between gap-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 sm:flex-row">
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-display text-lg font-extrabold text-amber-200">
                  ¡Hora de demostrar lo que descubriste sobre la célula!
                </h4>
                <p className="max-w-xl text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Has explorado las células animal y vegetal, comparado sus 7 organelos principales, formulado tus hipótesis previas y contrastado semejanzas y diferencias con el modelo 3D y Quiver. Este reto evalúa tus aprendizajes a través de <strong>8 preguntas</strong> interactivas.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs font-semibold text-slate-300">
                  <span className="rounded-lg bg-white/10 px-2.5 py-1">🎯 8 Preguntas</span>
                  <span className="rounded-lg bg-white/10 px-2.5 py-1">⭐ 70% mínimo para aprobar</span>
                  <span className="rounded-lg bg-white/10 px-2.5 py-1">🔄 Reintentos ilimitados</span>
                  <span className="rounded-lg bg-amber-400/20 px-2.5 py-1 text-amber-200">🏅 +30 XP + Insignia</span>
                </div>
              </div>
              <CitoMascot size={100} mood="celebrating" />
            </div>

            {/* Lista de preparación científica */}
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="size-4 text-mint-400" />
                Conceptos clave que se evalúan en este reto:
              </h4>
              <ul className="grid gap-2.5 sm:grid-cols-2 text-xs text-slate-300">
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">1.</span>
                  <span><strong>Membrana y Núcleo:</strong> Control del intercambio con el exterior y centro de mando genético de la vida.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">2.</span>
                  <span><strong>Mitocondrias vs Cloroplastos:</strong> Respiración celular (producción de ATP) vs fotosíntesis (fabricación de glucosa con luz).</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">3.</span>
                  <span><strong>Pared Celular:</strong> Armadura exterior rígida de celulosa presente exclusivamente en la célula vegetal.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-mint-400 font-bold shrink-0">4.</span>
                  <span><strong>Vacuola y Turgencia:</strong> Por qué la célula vegetal posee una gran vacuola central permanente y la animal vacuolas pequeñas.</span>
                </li>
              </ul>
            </div>

            {/* Botón de acción para presentar el Reto */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 to-mint-400/10 p-5">
              <div>
                <p className="text-sm font-extrabold text-white">¿Listo para presentar tu reto evaluativo?</p>
                <p className="text-xs text-slate-300 mt-0.5">Puedes rendirlo cuantas veces necesites. Siempre se conserva tu puntaje más alto.</p>
              </div>
              <LinkButton
                to={`/misiones/${mission?.code ?? 'm2'}/quiz`}
                variant="gold"
                size="lg"
                className="shadow-xl shadow-amber-400/20 font-black"
              >
                <Trophy className="size-5 mr-2" />
                Comenzar Reto Final (8 Preguntas)
                <ArrowRight className="size-5 ml-2" />
              </LinkButton>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('2.6')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 2.6 Quiver y Comparación
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => handleSelectTab('2.1')}
                >
                  <RotateCcw className="size-4 mr-1.5" />
                  Repasar desde 2.1
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </section>
      )}

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SESIÓN 3: SUB-ACTIVIDADES 3.1 A 3.7 (PROCESOS METABÓLICOS DE LA CÉLULA)
   ══════════════════════════════════════════════════════════════════════════ */

export const DEFAULT_M3_STRUCTURES: StructureItem[] = [
  {
    id: 'membrana',
    name: 'Membrana celular',
    placeholder: 'Función: controla la entrada de nutrientes y la salida de desechos por permeabilidad selectiva...'
  },
  {
    id: 'cloroplastos',
    name: 'Cloroplastos',
    placeholder: 'Función: captan la luz solar para fabricar glucosa mediante la fotosíntesis (célula vegetal)...'
  },
  {
    id: 'mitocondrias',
    name: 'Mitocondrias',
    placeholder: 'Función: transforman nutrientes y oxígeno en energía ATP mediante la respiración celular...'
  },
  {
    id: 'citoplasma',
    name: 'Citoplasma',
    placeholder: 'Función: medio gelatinoso donde flotan los organelos y ocurren las reacciones metabólicas...'
  },
  {
    id: 'vacuola',
    name: 'Vacuola central',
    placeholder: 'Función: almacena agua y solutos, manteniendo la presión de turgencia firme en la planta...'
  },
  {
    id: 'nucleo',
    name: 'Núcleo',
    placeholder: 'Función: resguarda el ADN con los planos maestros y dirige todas las funciones celulares...'
  }
];

interface FactoryHotspot {
  id: string;
  name: string;
  analogy: string;
  organelle: string;
  icon: string;
  color: string;
  description: string;
  roleInFactory: string;
  roleInCell: string;
}

const FACTORY_HOTSPOTS: FactoryHotspot[] = [
  {
    id: 'membrana',
    name: 'Puerta de Embarque y Aduana',
    analogy: 'Puerta de seguridad y control de acceso',
    organelle: 'Membrana celular',
    icon: '🚪',
    color: '#38bdf8',
    description: 'Regula celosamente qué materias primas ingresan y qué productos o desechos son expulsados.',
    roleInFactory: 'Los guardias de seguridad verifican los camiones que llegan y solo autorizan insumos permitidos.',
    roleInCell: 'Bicapa lipídica semipermeable que permite el paso de agua, oxígeno y glucosa, impidiendo sustancias tóxicas.'
  },
  {
    id: 'citoplasma',
    name: 'Planta de Producción Central',
    analogy: 'Nave de montaje y bandas transportadoras',
    organelle: 'Citoplasma y citoesqueleto',
    icon: '🏭',
    color: '#58e6c5',
    description: 'Espacio dinámico donde las máquinas y trabajadores se mueven para elaborar productos.',
    roleInFactory: 'Piso industrial amplio con rieles donde se ensamblan piezas y circulan materias primas.',
    roleInCell: 'Medio acuoso con corrientes de ciclosis donde los organelos interactúan y ocurren las vías metabólicas.'
  },
  {
    id: 'mitocondria',
    name: 'Central Eléctrica y Generadores',
    analogy: 'Generador termoeléctrico de alta potencia',
    organelle: 'Mitocondrias',
    icon: '⚡',
    color: '#fbbf24',
    description: 'Quema combustible (glucosa) en presencia de oxígeno para producir energía utilizable (ATP).',
    roleInFactory: 'Generador que convierte combustible en electricidad para que todas las máquinas trabajen sin parar.',
    roleInCell: 'Realiza la respiración celular generando moléculas de ATP, las baterías que alimentan cada proceso vital.'
  },
  {
    id: 'cloroplasto',
    name: 'Parque de Paneles Solares',
    analogy: 'Sistema de captación de energía solar limpia',
    organelle: 'Cloroplastos (célula vegetal)',
    icon: '🌞',
    color: '#4ade80',
    description: 'Captura los fotones de luz del Sol para sintetizar azúcares (glucosa) a partir de CO2 y agua.',
    roleInFactory: 'Paneles fotovoltaicos en el techo que capturan energía solar gratuita para generar su propio combustible.',
    roleInCell: 'Contiene clorofila en los tilacoides para llevar a cabo la fotosíntesis y alimentar a todo el organismo.'
  },
  {
    id: 'vacuola',
    name: 'Torre y Depósito Hidráulico',
    analogy: 'Tanque cisterna de agua y presión hidrostática',
    organelle: 'Gran vacuola central',
    icon: '🛢️',
    color: '#60a5fa',
    description: 'Almacena agua y nutrientes, inflando la célula para otorgarle rigidez y firmeza estructural.',
    roleInFactory: 'Depósito gigante de reserva de agua que mantiene la presión en las tuberías de refrigeración y limpieza.',
    roleInCell: 'Mantiene la turgencia; si se vacía por falta de agua, la célula se arruga y ocurre la plasmólisis.'
  },
  {
    id: 'nucleo',
    name: 'Oficina de Gerencia y Dirección',
    analogy: 'Oficina ejecutiva y archivo de planos maestros',
    organelle: 'Núcleo celular',
    icon: '🗂️',
    color: '#c084fc',
    description: 'Guarda las instrucciones originales y coordina el ritmo de producción y duplicación.',
    roleInFactory: 'La oficina de dirección donde los ingenieros custodian las recetas y códigos de fabricación de los productos.',
    roleInCell: 'Protege el ADN dentro de la envoltura nuclear y envía copias en ARN para la síntesis de proteínas.'
  }
];

interface MergeCubeFace {
  id: string;
  name: string;
  organelle: string;
  icon: string;
  color: string;
  metabolicFunction: string;
  plantRole: string;
  faceLabel: string;
}

const MERGE_CUBE_FACES: MergeCubeFace[] = [
  {
    id: 'face-mitocondria',
    name: 'Mitocondria',
    organelle: 'Generador de ATP',
    icon: '⚡',
    color: '#fbbf24',
    faceLabel: 'Cara 1 · Frente',
    metabolicFunction: 'Respiración celular catabólica: oxida nutrientes con O2 para recargar ATP continuo.',
    plantRole: 'Proporciona la energía nocturna y de crecimiento celular a partir de la glucosa almacenada.'
  },
  {
    id: 'face-cloroplasto',
    name: 'Cloroplasto',
    organelle: 'Planta de fotosíntesis',
    icon: '🌞',
    color: '#4ade80',
    faceLabel: 'Cara 2 · Derecha',
    metabolicFunction: 'Fotosíntesis anabólica: transforma fotones solares en glucosa y libera O2.',
    plantRole: 'Permite la nutrición autótrofa exclusiva del reino vegetal y algas fotosintéticas.'
  },
  {
    id: 'face-vacuola',
    name: 'Gran Vacuola Central',
    organelle: 'Depósito osmótico',
    icon: '🛢️',
    color: '#38bdf8',
    faceLabel: 'Cara 3 · Atrás',
    metabolicFunction: 'Almacenamiento de agua y turgencia hidrostática mediante ósmosis.',
    plantRole: 'Empuja la membrana contra la pared de celulosa para sostener tallos y hojas erguidas.'
  },
  {
    id: 'face-nucleo',
    name: 'Núcleo Celular',
    organelle: 'Centro de control genético',
    icon: '🗂️',
    color: '#a78bfa',
    faceLabel: 'Cara 4 · Izquierda',
    metabolicFunction: 'Regulación de la expresión genética y replicación del ADN celular.',
    plantRole: 'Ordena la producción de enzimas fotosintéticas y proteínas de crecimiento.'
  },
  {
    id: 'face-membrana',
    name: 'Membrana Celular',
    organelle: 'Filtro selectivo semipermeable',
    icon: '🚪',
    color: '#7dd3fc',
    faceLabel: 'Cara 5 · Arriba',
    metabolicFunction: 'Transporte de solutos, paso de agua por ósmosis y expulsión de CO2/desechos.',
    plantRole: 'Comunica a las células vecinas a través de túneles microscópicos de plasmodesmos.'
  },
  {
    id: 'face-citoplasma',
    name: 'Citoplasma',
    organelle: 'Medio de reacción metabólica',
    icon: '🏭',
    color: '#58e6c5',
    faceLabel: 'Cara 6 · Abajo',
    metabolicFunction: 'Glicólisis y ciclosis citoplasmática que transporta vesículas y metabolitos.',
    plantRole: 'Distribuye los cloroplastos hacia la luz mediante corrientes internas del citosol.'
  }
];

const READING_CHAPTERS_M3 = [
  {
    number: '1',
    title: 'Metabolismo: la fábrica de la vida en marcha',
    tag: 'Concepto Clave',
    icon: '🏭',
    body: `El metabolismo celular es el conjunto de todas las reacciones químicas que ocurren dentro de las células para mantenerlas con vida, permitirles crecer, repararse y multiplicarse. Lejos de ser estructuras inertes, las células son verdaderas fábricas biológicas que trabajan sin interrupción las 24 horas del día.

Este gran engranaje metabólico se divide en dos procesos complementarios:
• Catabolismo: Reacciones de degradación donde moléculas complejas (como la glucosa o los lípidos) se descomponen en sustancias más simples, liberando energía utilizable.
• Anabolismo: Reacciones de construcción donde la célula utiliza esa energía liberada para fabricar nuevas proteínas, celulosa, ADN y reparar sus organelos.

Sin este flujo coordinado de materia y energía, las maquinarias celulares se apagarían, provocando el colapso de la célula.`
  },
  {
    number: '2',
    title: 'Respiración celular: las mitocondrias como generadores de energía (ATP)',
    tag: 'Catabolismo',
    icon: '⚡',
    body: `Para que un automóvil funcione necesita gasolina; de manera similar, para que tus células contraigan músculos o transmitan impulsos nerviosos necesitan una molécula llamada ATP (Adenosín Trifosfato), considerada la "moneda energética universal" de la biología.

¿Dónde se fabrica el ATP? En las mitocondrias. A través del proceso de respiración celular, las mitocondrias toman las moléculas de nutrientes (principalmente glucosa) y, en presencia de oxígeno, las oxidan de forma controlada.

Como resultado de esta combustión química limpia, se liberan cerca de 36 a 38 moléculas de ATP por cada molécula de glucosa, produciendo como sustancias de desecho dióxido de carbono (CO2) y agua (H2O), los cuales son transportados fuera de la célula y eliminados por la respiración y los riñones.`
  },
  {
    number: '3',
    title: 'Fotosíntesis: los cloroplastos captando la energía del Sol',
    tag: 'Anabolismo Autótrofo',
    icon: '🌞',
    body: `A diferencia de los animales, que debemos alimentarnos de otros seres vivos para conseguir glucosa (nutrición heterótrofa), las plantas son capaces de fabricar su propio alimento a partir de elementos inorgánicos del ambiente gracias a la fotosíntesis.

Este proceso ocurre dentro de los cloroplastos de las células vegetales. En su interior, el pigmento verde llamado clorofila absorbe la radiación solar. Utilizando esa energía lumínica, el cloroplasto combina dióxido de carbono (CO2) absorbido del aire y agua (H2O) absorbida por las raíces para producir moléculas de glucosa rica en energía química y liberar oxígeno (O2) a la atmósfera.

Las plantas luego usan esa misma glucosa en sus mitocondrias para producir ATP mediante respiración celular, tanto de día como de noche.`
  },
  {
    number: '4',
    title: 'Agua y equilibrio interno: ósmosis, turgencia y plasmólisis',
    tag: 'Equilibrio Hídrico',
    icon: '💧',
    body: `El agua es el solvente universal de la vida y el componente principal del citoplasma (más del 70%). El movimiento de agua a través de la membrana semipermeable de la célula se conoce como ósmosis, y se produce desde donde hay menor concentración de sales hacia donde hay mayor concentración de solutos para buscar el equilibrio.

En las células vegetales, la gran vacuola central cumple un papel decisivo:
• Turgencia: Cuando la planta recibe suficiente agua, la vacuola se infla por completo y empuja con fuerza el citoplasma contra la rígida pared celular. Esta presión hidrostática (presión de turgor) mantiene erguidas las hojas y los tallos sin necesidad de huesos.
• Plasmólisis: Si la planta deja de recibir agua o se encuentra en un medio muy salino, el agua sale de la vacuola por ósmosis. La vacuola se encoge drásticamente, la membrana se desprende de la pared celular y la planta se marchita visiblemente.`
  }
];

const PROCESS_COMPARISON_M3 = [
  {
    process: 'Fotosíntesis',
    where: 'Cloroplastos (en células vegetales y algas)',
    needs: 'Energía solar, dióxido de carbono (CO2) y agua (H2O)',
    produces: 'Glucosa (C6H12O6) y oxígeno (O2)',
    who: 'Organismos autótrofos (plantas, algas y cianobacterias)',
    color: '#22c55e'
  },
  {
    process: 'Respiración celular',
    where: 'Mitocondrias (en células vegetales y animales)',
    needs: 'Glucosa y oxígeno (O2)',
    produces: 'Energía ATP, dióxido de carbono (CO2) y agua (H2O)',
    who: 'Organismos autótrofos y heterótrofos (plantas, animales, hongos)',
    color: '#f59e0b'
  }
];

export interface Session3SubactivitiesProps {
  activity: Activity;
  mission?: MissionDetail;
  structuresTable?: StructureItem[];
  glossary?: GlossaryItem[];
  mandatoryQuestion?: string;
  docUrl?: string;
  videoUrl?: string;
  videoEmbedUrl?: string;
  onEvidenceSubmitted?: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
  activeTab?: Session3TabKey;
  onTabChange?: (tab: Session3TabKey) => void;
  viewMode?: 'tabs' | 'all';
  onViewModeChange?: (mode: 'tabs' | 'all') => void;
  showTabBar?: boolean;
  missionXp?: number;
}

export type Session3TabKey = '3.1' | '3.2' | '3.3' | '3.4' | '3.5' | '3.6' | '3.7';

export function Session3Subactivities({
  activity,
  mission,
  structuresTable = [],
  glossary = [],
  mandatoryQuestion,
  docUrl = 'https://docs.google.com/document/d/1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true',
  onEvidenceSubmitted,
  activeTab: controlledTab,
  onTabChange,
  viewMode: controlledViewMode,
  onViewModeChange,
  showTabBar = true,
  missionXp
}: Session3SubactivitiesProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<Session3TabKey>('3.1');
  const [internalViewMode, setInternalViewMode] = useState<'tabs' | 'all'>('tabs');
  const activeTab = controlledTab ?? internalActiveTab;
  const viewMode = controlledViewMode ?? internalViewMode;
  const setActiveTab = (tab: Session3TabKey) => {
    if (onTabChange) onTabChange(tab);
    else setInternalActiveTab(tab);
  };
  const setViewMode = (mode: 'tabs' | 'all') => {
    if (onViewModeChange) onViewModeChange(mode);
    else setInternalViewMode(mode);
  };
  const [initialAporte, setInitialAporte] = useState('');
  const [aporteShared, setAporteShared] = useState(false);
  const [questionReflection, setQuestionReflection] = useState('');
  const [questionShared, setQuestionShared] = useState(false);
  const [activeFactoryHotspot, setActiveFactoryHotspot] = useState<string>('membrana');
  const [panAngle, setPanAngle] = useState(0);
  const [activeCubeFaceIndex, setActiveCubeFaceIndex] = useState(0);
  const [exploredCubeFaces, setExploredCubeFaces] = useState<Set<number>>(new Set([0]));
  const [canvaUrlInput, setCanvaUrlInput] = useState('');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedProcessComparison, setSelectedProcessComparison] = useState<'both' | 'fotosintesis' | 'respiracion'>('both');
  const [showGlossary, setShowGlossary] = useState(false);
  const toast = useToast();

  const handleSelectTab = (tab: Session3TabKey) => {
    setActiveTab(tab);
    if (viewMode === 'all') {
      const idMap: Record<Session3TabKey, string> = {
        '3.1': 'sub-3-1',
        '3.2': 'sub-3-2',
        '3.3': 'sub-3-3',
        '3.4': 'sub-3-4',
        '3.5': 'sub-3-5',
        '3.6': 'sub-3-6',
        '3.7': 'sub-3-7'
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
      toast.info('Escribe primero tus saberes previos sobre nutrientes y energía.');
      return;
    }
    setAporteShared(true);
    toast.success('¡Saberes previos registrados! Ahora socializa tu respuesta con el grupo.');
  };

  const handleShareQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionReflection.trim()) {
      toast.info('Escribe tu reflexión sobre qué pasaría si la fábrica o la célula se detuvieran.');
      return;
    }
    setQuestionShared(true);
    toast.success('¡Respuesta registrada en la plataforma!');
  };

  const handleRotateCube = (index: number) => {
    setActiveCubeFaceIndex(index);
    setExploredCubeFaces((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === 6 && prev.size < 6) {
        toast.success('¡Felicitaciones! Has explorado las 6 estructuras metabólicas del Cubo Merge.');
      }
      return next;
    });
  };

  const handleSaveCanvaUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canvaUrlInput.trim()) {
      toast.info('Ingresa el enlace público de tu infografía de Canva.');
      return;
    }
    try {
      localStorage.setItem('m3_canva_url', canvaUrlInput.trim());
      toast.success('Enlace de Canva guardado correctamente.');
    } catch {
      toast.info('Enlace registrado en esta sesión.');
    }
  };

  // Extra activities from mission to link in 3.2/3.5
  const extraVideo360 = mission?.activities.find((a) => a.type === 'video360');
  const extraArCube = mission?.activities.find((a) => a.type === 'ar_cube');
  const effectiveStructures = structuresTable && structuresTable.length > 0 ? structuresTable : DEFAULT_M3_STRUCTURES;
  const currentHotspot = FACTORY_HOTSPOTS.find((h) => h.id === activeFactoryHotspot) ?? FACTORY_HOTSPOTS[0];
  const currentCubeFace = MERGE_CUBE_FACES[activeCubeFaceIndex] ?? MERGE_CUBE_FACES[0];

  const TAB_DEFS_S3: { key: Session3TabKey; number: string; label: string; badge?: string }[] = [
    { key: '3.1', number: '3.1', label: 'Saberes previos' },
    { key: '3.2', number: '3.2', label: 'Fábrica y Video 360' },
    { key: '3.3', number: '3.3', label: 'Preguntas motivadoras' },
    { key: '3.4', number: '3.4', label: 'Video 360, Lectura y Canva' },
    { key: '3.5', number: '3.5', label: 'Cubo Merge' },
    { key: '3.6', number: '3.6', label: 'Cuadro de Estructuras', badge: 'Evaluado' },
    { key: '3.7', number: '3.7', label: 'Reto Final', badge: 'Examen' }
  ];

  return (
    <div className="space-y-6">
      {showTabBar ? (
      <nav
        aria-label="Sub-actividades oficiales de la Sesión 3"
        className="sticky top-16 z-30 -mx-2 rounded-2xl border border-white/10 bg-ink-950/95 p-2 backdrop-blur-xl shadow-2xl sm:mx-0"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-amber-400/20 text-xs font-black text-amber-300">
              S3
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Estaciones oficiales de indagación (3.1 a 3.8)
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 hidden sm:inline">Visualización:</span>
            <button
              type="button"
              onClick={() => setViewMode('tabs')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                viewMode === 'tabs'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 shadow'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Pestañas
            </button>
            <button
              type="button"
              onClick={() => setViewMode('all')}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold transition',
                viewMode === 'all'
                  ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 shadow'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Ver todo continuo
            </button>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10">
          {TAB_DEFS_S3.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleSelectTab(tab.key)}
                className={cn(
                  'group flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition whitespace-nowrap',
                  isActive
                    ? 'border border-amber-400/40 bg-gradient-to-r from-amber-400/25 to-amber-500/15 text-amber-100 shadow-lg shadow-amber-500/10'
                    : 'border border-white/5 bg-white/3 text-slate-400 hover:border-white/15 hover:bg-white/6 hover:text-white'
                )}
              >
                <span
                  className={cn(
                    'grid size-5 place-items-center rounded-md text-[10px] font-black',
                    isActive ? 'bg-amber-400 text-ink-950' : 'bg-white/10 text-slate-300'
                  )}
                >
                  {tab.number}
                </span>
                <span>{tab.label}</span>
                {tab.badge ? (
                  <span
                    className={cn(
                      'rounded-md px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider',
                      tab.badge === 'Examen'
                        ? 'bg-rose-400/20 text-rose-300 border border-rose-400/30'
                        : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                    )}
                  >
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </nav>
      ) : null}

      {/* ══════════════════════════════════════════════════════════════════
          3.1 ACTIVACIÓN DE SABERES PREVIOS
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.1') && (
        <section id="sub-3-1" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.16)"
            borderColor="rgba(251, 191, 36, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-amber-400/20 text-amber-300 text-lg font-black">
                  3.1
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Saberes previos · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Punto de partida reflexivo</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="Activación de saberes previos: nutrientes y energía" speed={3.5} className="font-extrabold text-amber-200" />
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {typeof missionXp === 'number' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-bold text-slate-300">
                    <Star className="size-3.5 text-amber-300" aria-hidden />
                    {missionXp} puntos de experiencia
                  </span>
                ) : null}
                <Chip tone="neutral">
                  <GraduationCap className="size-3.5 text-amber-300" aria-hidden />
                  Orientación docente
                </Chip>
              </div>
            </div>

            {/* Preguntas para indagar con tarjetas reflectivas y gráficos 2D */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                  <Lightbulb className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                    Preguntas para indagar
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    Observa cada imagen, imagina una respuesta y compártela con el grupo.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#fbbf24"
                  borderColor="rgba(251, 191, 36, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <CellFuelGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-amber-400/15 px-2 py-0.5 text-[11px] font-extrabold text-amber-300">
                          Pregunta 1
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          El combustible diario
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        Cuando desayunas una fruta o un pan, ¿cómo convierte tu cuerpo esos alimentos en la energía
                        que usas para correr, jugar o estudiar?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>

                <ReflectiveCard
                  className="h-full"
                  reflectionColor="#fb923c"
                  borderColor="rgba(251, 146, 60, 0.32)"
                >
                  <div className="flex h-full flex-col">
                    <div className="relative overflow-hidden border-b border-white/10 bg-ink-950/60">
                      <CellularMotorGraphic2D />
                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/90 to-transparent"
                        aria-hidden
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-orange-400/15 px-2 py-0.5 text-[11px] font-extrabold text-orange-300">
                          Pregunta 2
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          El motor que nunca duerme
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-extrabold leading-snug text-white sm:text-lg">
                        ¿Por qué crees que tus células siguen trabajando incluso mientras duermes, y qué
                        transformaciones ocurren dentro de ellas?
                      </p>
                    </div>
                  </div>
                </ReflectiveCard>
              </div>
            </div>

            {/* Invitación inmersiva a participar */}
            <div className="relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/12 via-orange-500/10 to-violet-500/12 p-4 sm:p-5">
              <div
                className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full bg-amber-400/20 blur-3xl"
                aria-hidden
              />
              <div className="pointer-events-none absolute -bottom-14 -left-10 size-40 rounded-full bg-orange-400/15 blur-3xl" aria-hidden />

              <div className="relative grid items-center gap-4 md:grid-cols-[0.85fr_1.15fr]">
                <ParticipationGraphic2D />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                      <MessageSquare className="size-3.5" aria-hidden />
                      Tu voz hace ciencia
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">Saberes previos · Nutrientes y energía</span>
                  </div>

                  <h4 className="font-display text-lg font-extrabold leading-snug text-white sm:text-xl">
                    ¡Participa y comparte lo que imaginas!
                  </h4>

                  <p className="text-sm leading-relaxed text-slate-200">
                    Antes de explorar la célula como una fábrica, escribe lo que sabes o imaginas sobre cómo las
                    células transforman lo que comemos en energía. Luego compártelo con el grupo y{' '}
                    <strong className="font-bold text-amber-300">Cito</strong> te guiará para descubrir el metabolismo
                    celular.
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-3">
                    {[
                      { icon: <Eye className="size-3.5" aria-hidden />, title: 'Imagina', text: 'Piensa en el alimento.' },
                      { icon: <Share2 className="size-3.5" aria-hidden />, title: 'Registra', text: 'Escribe tus saberes.' },
                      { icon: <Sparkles className="size-3.5" aria-hidden />, title: 'Descubre', text: 'Conoce el metabolismo.' }
                    ].map((step) => (
                      <li
                        key={step.title}
                        className="rounded-xl border border-white/10 bg-ink-950/50 px-2.5 py-2"
                      >
                        <p className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                          {step.icon}
                          {step.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-slate-400">{step.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3 Detonadores de curiosidad científica cotidiana */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Lightbulb className="size-4 text-amber-400" />
                Situaciones cotidianas para reflexionar en clase:
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍎</span>
                    <h5 className="text-xs font-bold text-amber-200 uppercase tracking-wide">El combustible diario</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cuando desayunas una fruta o un pan, ¿cómo hace tu cuerpo para convertir esos alimentos sólidos en la energía que usas para correr, jugar o estudiar?
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <h5 className="text-xs font-bold text-amber-200 uppercase tracking-wide">Transformaciones invisibles</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Los alimentos no entran enteros a las células: se descomponen en micromoléculas de glucosa, agua y minerales que viajan por la sangre hasta cada célula.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🌙</span>
                    <h5 className="text-xs font-bold text-amber-200 uppercase tracking-wide">El motor que nunca duerme</h5>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Incluso mientras duermes profundamente, tus células siguen respirando químicamente, reparando tejidos y manteniendo tu corazón latiendo.
                  </p>
                </div>
              </div>
            </div>

            {/* Formulario de registro de saberes previos */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-4 sm:p-5 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✍️</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-white">
                    Registra tus saberes previos sobre la energía y los nutrientes
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Escribe lo que sabes o imaginas sobre cómo nuestras células transforman lo que comemos en energía vital:
                  </p>
                </div>
              </div>

              {/* Ideas de ayuda para inspirarse */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold">Ideas sugeridas para inspirarte:</span>
                {[
                  'Los alimentos nos dan energía porque las células los transforman.',
                  'Si no nos alimentamos ni tomamos agua, las células se quedan sin materiales.',
                  'Dentro de las células ocurren reacciones químicas que nos mantienen vivos.'
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setInitialAporte((prev) => (prev ? `${prev} ${sug}` : sug))}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-amber-200 transition hover:border-amber-400/40 hover:bg-amber-400/10"
                  >
                    + {sug}
                  </button>
                ))}
              </div>

              <form onSubmit={handleShareAporte} className="space-y-3">
                <textarea
                  value={initialAporte}
                  onChange={(e) => setInitialAporte(e.target.value)}
                  rows={3}
                  placeholder="Escribe aquí tu aporte o reflexión inicial sobre los nutrientes, la energía y las células..."
                  className="w-full rounded-xl border border-white/10 bg-ink-900/80 p-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-400">
                    {initialAporte.trim().length} caracteres registrados
                  </span>
                  <Button type="submit" variant="primary" size="sm" className="font-bold">
                    <Send className="size-3.5 mr-1.5" />
                    Registrar saberes previos
                  </Button>
                </div>
              </form>

              {aporteShared && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                  <span>
                    ¡Aporte guardado con éxito! Puedes socializarlo oralmente con tu docente y compañeros antes de continuar.
                  </span>
                </div>
              )}
            </div>

            {/* Muro colectivo de ideas previas */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="size-3.5 text-amber-400" />
                Muro de ideas del salón de clase:
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-white/2 p-3 text-xs text-slate-300">
                  <strong className="text-amber-200 font-bold block mb-1">Sofía (5.º A):</strong>
                  «Pienso que la comida es como la leña para una fogata: la célula la quema para tener calor y energía para correr.»
                </div>
                <div className="rounded-xl border border-white/5 bg-white/2 p-3 text-xs text-slate-300">
                  <strong className="text-amber-200 font-bold block mb-1">Mateo (5.º A):</strong>
                  «Si no tomamos agua las células se secan como una planta marchita y se detienen todas sus funciones.»
                </div>
              </div>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400">
                Paso 1 de 7 · Inicio de indagación
              </span>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.2')}
                className="font-bold shadow-lg shadow-amber-500/10"
              >
                Siguiente: 3.2 La Fábrica y Video 360
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.2 VIDEO 360 Y ANALOGÍA DE LA FÁBRICA CELULAR
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.2') && (
        <section id="sub-3-2" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(56, 189, 248, 0.16)"
            borderColor="rgba(56, 189, 248, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-sky-400/20 text-sky-300 text-lg font-black">
                  3.2
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="sky">Analogía oficial · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Recurso 360 interactivo</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="La célula como una pequeña fábrica de producción" speed={3.5} className="font-extrabold text-sky-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">
                <Factory className="size-3.5 text-sky-300" aria-hidden />
                Día y noche
              </Chip>
            </div>

            {/* Texto literal oficial */}
            <div className="rounded-2xl border border-sky-400/25 bg-sky-400/8 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Texto de la actividad pedagógica:
              </p>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base italic">
                «presenta el video 360 de una fábrica de producción, comparando a la célula con una pequeña fábrica que trabaja día y noche. En esta fábrica llegan materiales que son transformados para elaborar productos, se utiliza energía para que las máquinas funcionen y cada trabajador cumple una tarea especial, de manera parecida, las células de nuestro cuerpo reciben nutrientes, los transforman, obtienen energía y producen sustancias necesarias para mantenerse vivas y realizar sus funciones. A todo este conjunto de procesos lo llamamos metabolismo celular”.»
              </p>
            </div>

            {/* Simulador Interactivo de Video 360: La Fábrica Celular */}
            <div className="overflow-hidden rounded-3xl border border-sky-400/30 bg-ink-950/90 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/3 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-sky-400/20 text-sky-300 text-xs font-bold">
                    360°
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Simulador panorámico de la fábrica celular
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPanAngle((a) => a - 45)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    ← Girar Izq
                  </button>
                  <span className="text-[11px] font-mono text-sky-300">{panAngle}°</span>
                  <button
                    type="button"
                    onClick={() => setPanAngle((a) => a + 45)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10"
                  >
                    Girar Der →
                  </button>
                  <button
                    type="button"
                    onClick={() => setPanAngle(0)}
                    className="rounded-lg border border-white/10 bg-white/5 p-1 text-slate-400 hover:text-white"
                    title="Restablecer ángulo"
                  >
                    <RotateCcw className="size-3.5" />
                  </button>
                </div>
              </div>

              {/* Visor Panorámico Gráfico de la Fábrica Celular */}
              <div
                className="relative h-64 sm:h-72 w-full overflow-hidden transition-all duration-500 flex items-center justify-center p-6 text-center"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(14, 165, 233, 0.22) 0%, rgba(7, 16, 34, 0.95) 75%), linear-gradient(135deg, #071022 0%, #0c1e3d 100%)`,
                  backgroundPosition: `${panAngle * 2}px center`
                }}
              >
                {/* Cuadrícula de estaciones de la fábrica en perspectiva */}
                <div className="relative z-10 max-w-xl space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-400/15 px-3 py-1 text-xs font-bold text-sky-200">
                    <span className="size-2 rounded-full bg-sky-400 animate-ping" />
                    Estación seleccionada: {currentHotspot.name}
                  </div>
                  <h4 className="font-display text-2xl font-black text-white sm:text-3xl">
                    {currentHotspot.icon} {currentHotspot.analogy}
                  </h4>
                  <p className="text-xs text-slate-300 sm:text-sm leading-relaxed max-w-lg mx-auto">
                    {currentHotspot.description}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                    {extraVideo360 && mission ? (
                      <LinkButton
                        to={activityUrl(mission.code, extraVideo360)}
                        variant="primary"
                        size="sm"
                        className="font-bold text-xs shadow-lg"
                      >
                        <Play className="size-3.5 mr-1" />
                        Abrir experiencia 360 completa
                      </LinkButton>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Selector de estaciones de la fábrica */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-white/10 border-t border-white/10 bg-white/2">
                {FACTORY_HOTSPOTS.map((hotspot) => {
                  const isSelected = activeFactoryHotspot === hotspot.id;
                  return (
                    <button
                      key={hotspot.id}
                      type="button"
                      onClick={() => setActiveFactoryHotspot(hotspot.id)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 p-3 text-center transition',
                        isSelected
                          ? 'bg-sky-400/20 text-white font-extrabold'
                          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                      )}
                    >
                      <span className="text-2xl">{hotspot.icon}</span>
                      <span className="text-xs font-bold truncate max-w-full">{hotspot.organelle}</span>
                      <span className="text-[10px] text-slate-400 font-normal truncate max-w-full">
                        {hotspot.analogy}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ficha técnica comparativa Fábrica ↔ Célula */}
            <div className="rounded-2xl border border-white/10 bg-white/3 p-4 sm:p-5 space-y-3">
              <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span className="text-sky-300 font-mono">⚡</span>
                Detalle comparativo: {currentHotspot.organelle} vs. {currentHotspot.analogy}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3 space-y-1">
                  <strong className="text-sky-300 font-bold block">En la fábrica de producción:</strong>
                  <p className="text-slate-300 leading-relaxed">{currentHotspot.roleInFactory}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3 space-y-1">
                  <strong className="text-mint-300 font-bold block">En la célula viva:</strong>
                  <p className="text-slate-300 leading-relaxed">{currentHotspot.roleInCell}</p>
                </div>
              </div>
            </div>

            {/* Definición del concepto maestro: Metabolismo Celular */}
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 sm:p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-emerald-300" />
                <h4 className="font-extrabold text-emerald-200 text-sm sm:text-base">
                  <DecryptedText text="¿Qué es el Metabolismo Celular?" speed={40} className="font-black text-emerald-100" />
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                El <strong className="text-white">metabolismo celular</strong> es el conjunto coordinado de todas las reacciones químicas que ocurren dentro de las células. Se divide en dos ramas principales:
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2 pt-1 text-xs">
                <div className="rounded-xl border border-amber-400/20 bg-amber-400/8 p-3">
                  <strong className="text-amber-300 font-bold block mb-1">🔥 Catabolismo (Degradación):</strong>
                  Rompe moléculas complejas (como nutrientes) en sustancias simples para <strong>liberar energía (ATP)</strong>, por ejemplo en la respiración celular.
                </div>
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/8 p-3">
                  <strong className="text-emerald-300 font-bold block mb-1">🌱 Anabolismo (Construcción):</strong>
                  Utiliza esa energía liberada para <strong>fabricar nuevas moléculas</strong>, reparar estructuras y crecer, por ejemplo en la fotosíntesis.
                </div>
              </div>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.1')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.1 Saberes previos
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.3')}
                className="font-bold shadow-lg shadow-sky-500/10"
              >
                Siguiente: 3.3 Preguntas Motivadoras
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.3 PLANTEAMIENTO DE LA PREGUNTA MOTIVADORA
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.3') && (
        <section id="sub-3-3" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.16)"
            borderColor="rgba(245, 158, 11, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-amber-400/20 text-amber-300 text-lg font-black">
                  3.3
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Cuestionamiento · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Reflexión en plataforma</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="¿Qué pasaría si la fábrica o la célula se detuvieran?" speed={3.5} className="font-extrabold text-amber-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">
                <MessageSquare className="size-3.5 text-amber-300" aria-hidden />
                Participación activa
              </Chip>
            </div>

            {/* Texto literal oficial */}
            <div className="rounded-2xl border border-amber-400/25 bg-amber-400/8 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Texto de la actividad pedagógica:
              </p>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base italic">
                «La docente plantea los siguientes cuestionamientos ¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar? ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan? Los estudiantes dan respuesta a pregunta motivadora en la plataforma»
              </p>
            </div>

            {/* Las 2 Grandes Preguntas en Tarjetas con Resplandor */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-sky-400/30 bg-sky-400/10 p-4 space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-sky-300">Pregunta 1</span>
                <p className="font-display font-extrabold text-white text-base">
                  ¿Qué creen que sucedería si una fábrica dejara de recibir materiales o energía para funcionar?
                </p>
              </div>

              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 space-y-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">Pregunta 2</span>
                <p className="font-display font-extrabold text-white text-base">
                  ¿Pasaría algo parecido en nuestras células si no recibieran los nutrientes que necesitan?
                </p>
              </div>
            </div>

            {/* Selector de argumentos científicos guía */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Lightbulb className="size-3.5 text-amber-300" />
                Haz clic en una idea para añadirla a tu respuesta:
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  {
                    title: 'Paralización de maquinarias',
                    desc: 'Si una fábrica no recibe energía ni materiales, sus máquinas se apagan y no puede elaborar productos.'
                  },
                  {
                    title: 'Falta de ATP en mitocondrias',
                    desc: 'En la célula pasa lo mismo: sin nutrientes ni oxígeno, las mitocondrias no pueden generar ATP para vivir.'
                  },
                  {
                    title: 'Pérdida de turgencia y marchitamiento',
                    desc: 'Sin agua ni nutrientes, la célula pierde presión, se arruga (plasmólisis) y sus funciones se detienen.'
                  },
                  {
                    title: 'Colapso del metabolismo',
                    desc: 'Se interrumpe el catabolismo y el anabolismo, provocando la debilidad del organismo entero.'
                  }
                ].map((idea, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setQuestionReflection((prev) =>
                        prev ? `${prev}\n• ${idea.title}: ${idea.desc}` : `• ${idea.title}: ${idea.desc}`
                      )
                    }
                    className="flex flex-col text-left rounded-xl border border-white/10 bg-white/4 p-3 transition hover:border-amber-400/40 hover:bg-amber-400/10"
                  >
                    <span className="text-xs font-bold text-amber-200">+ {idea.title}</span>
                    <span className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{idea.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Espacio de redacción en plataforma */}
            <form onSubmit={handleShareQuestion} className="space-y-3 rounded-2xl border border-white/10 bg-ink-950/60 p-4 sm:p-5">
              <label htmlFor="question-reflection-input" className="text-sm font-extrabold text-white block">
                Tu respuesta fundamentada en la plataforma:
              </label>
              <textarea
                id="question-reflection-input"
                value={questionReflection}
                onChange={(e) => setQuestionReflection(e.target.value)}
                rows={4}
                placeholder="Explica qué le ocurriría a la fábrica y qué le ocurriría a tus células si no recibieran los materiales y la energía necesarios para funcionar..."
                className="w-full rounded-xl border border-white/10 bg-ink-900/80 p-3.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  {questionReflection.trim().length} caracteres redactados
                </span>
                <Button type="submit" variant="primary" size="sm" className="font-bold">
                  <Send className="size-3.5 mr-1.5" />
                  Guardar respuesta en la plataforma
                </Button>
              </div>

              {questionShared && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-xs text-emerald-200">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
                  <span>
                    ¡Respuesta guardada con éxito en la plataforma! Lista para socializar con tu docente.
                  </span>
                </div>
              )}
            </form>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.2')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.2 Fábrica y Video 360
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.4')}
                className="font-bold shadow-lg shadow-amber-500/10"
              >
                Siguiente: 3.4 Video 360, Lectura e Infografía Canva
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.4 VIDEO 360 DEL METABOLISMO, LECTURA OFICIAL E INFOGRAFÍA CANVA
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.4') && (
        <section id="sub-3-4" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(244, 63, 94, 0.16)"
            borderColor="rgba(244, 63, 94, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-rose-500/20 text-rose-300 text-lg font-black">
                  3.4
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="rose">Indagación profunda · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Metabolismo y Canva</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="Video 360, Lectura adaptada y Taller de Infografía en Canva" speed={3.5} className="font-extrabold text-rose-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">
                <Palette className="size-3.5 text-rose-300" aria-hidden />
                Canva + Docs
              </Chip>
            </div>

            {/* Texto literal oficial */}
            <div className="rounded-2xl border border-rose-400/25 bg-rose-400/8 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Texto de la actividad pedagógica:
              </p>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base italic">
                «La docente presenta el video el video 360 y solicita a los estudiantes visualizarlo y dar respuesta al siguiente cuestionamiento: ¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?, se solicita los estudiantes apoyarse en el contenido del recurso multimedial como también en la lectura “El metabolismo celular: Lectura el metabolismo celular (maquetar lectura desde este enlace: https://docs.google.com/document/d/1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true), luego decir: ¿Cómo obtienen y utilizan la energía las células?” para dar respuesta a los cuestionamientos a través de la elaboración de una infografía en la herramienta Canva»
              </p>
            </div>

            {/* Cuestionamientos clave a responder */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Lightbulb className="size-3.5" /> Cuestionamientos guía obligatorios para tu infografía:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200 sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">1.</span>
                  <span>¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">2.</span>
                  <span>¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">3.</span>
                  <span>¿Cómo obtienen y utilizan la energía las células?</span>
                </li>
              </ul>
            </div>

            {/* Lectura oficial adaptada directamente maquetada */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpenCheck className="size-4 text-emerald-400" />
                  <h4 className="text-sm font-extrabold text-white">
                    Lectura adaptada: «El metabolismo celular: ¿Cómo obtienen y utilizan la energía las células?»
                  </h4>
                </div>
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-bold text-sky-200 transition hover:bg-sky-400/20"
                >
                  <FileText className="size-3.5" /> Abrir en Google Docs original
                  <ExternalLink className="size-3" />
                </a>
              </div>

              {/* Selector de capítulos editoriales */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {READING_CHAPTERS_M3.map((ch, idx) => (
                  <button
                    key={ch.number}
                    type="button"
                    onClick={() => setActiveChapterIndex(idx)}
                    className={cn(
                      'shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition',
                      activeChapterIndex === idx
                        ? 'border border-emerald-400/40 bg-emerald-400/20 text-emerald-200 shadow'
                        : 'border border-white/5 bg-white/3 text-slate-400 hover:text-white'
                    )}
                  >
                    <span>{ch.icon}</span>
                    <span>Cap. {ch.number}</span>
                  </button>
                ))}
              </div>

              {/* Cuerpo del capítulo seleccionado */}
              {READING_CHAPTERS_M3[activeChapterIndex] && (
                <div className="rounded-2xl border border-white/10 bg-ink-950/80 p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{READING_CHAPTERS_M3[activeChapterIndex].icon}</span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          {READING_CHAPTERS_M3[activeChapterIndex].tag}
                        </span>
                        <h5 className="text-sm font-extrabold text-white">
                          Capítulo {READING_CHAPTERS_M3[activeChapterIndex].number}: {READING_CHAPTERS_M3[activeChapterIndex].title}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-pre-line text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {READING_CHAPTERS_M3[activeChapterIndex].body}
                  </p>
                </div>
              )}
            </div>

            {/* Comparativa Interactiva: Fotosíntesis vs. Respiración Celular */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Zap className="size-4 text-amber-400" />
                  Comparativa de procesos: Fotosíntesis vs. Respiración Celular
                </h4>
                <div className="flex items-center gap-1.5 text-xs">
                  {(['both', 'fotosintesis', 'respiracion'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setSelectedProcessComparison(filter)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 text-[11px] font-bold transition capitalize',
                        selectedProcessComparison === filter
                          ? 'border border-white/20 bg-white/15 text-white'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      {filter === 'both' ? 'Ver ambos' : filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {PROCESS_COMPARISON_M3.filter((p) =>
                  selectedProcessComparison === 'both'
                    ? true
                    : p.process.toLowerCase().includes(selectedProcessComparison)
                ).map((proc) => (
                  <div
                    key={proc.process}
                    className="rounded-2xl border p-4 space-y-2.5"
                    style={{ borderColor: `${proc.color}40`, backgroundColor: `${proc.color}08` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-extrabold text-white text-sm" style={{ color: proc.color }}>
                        {proc.process}
                      </span>
                      <Chip tone="neutral">{proc.where}</Chip>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-slate-400 block">Materias primas que necesita:</strong>
                        <span className="text-slate-200">{proc.needs}</span>
                      </div>
                      <div>
                        <strong className="text-slate-400 block">Productos generados:</strong>
                        <span className="text-slate-200 font-semibold">{proc.produces}</span>
                      </div>
                      <div>
                        <strong className="text-slate-400 block">¿Quiénes lo realizan?:</strong>
                        <span className="text-slate-300">{proc.who}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Taller de Infografía en Canva */}
            <div className="rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/10 via-purple-500/5 to-transparent p-5 space-y-4 border-t-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-2xl bg-rose-500/20 text-rose-300 text-xl">
                    🎨
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-white sm:text-base">
                      Taller de Diseño: Elabora tu Infografía en Canva
                    </h4>
                    <p className="text-xs text-slate-300">
                      Plasma de manera visual las respuestas a las preguntas de indagación y la analogía de la fábrica
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.canva.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-rose-400/40 bg-rose-500/20 px-4 py-2 text-xs font-black text-rose-100 transition hover:bg-rose-500/30 shadow-lg shadow-rose-500/20"
                >
                  <Palette className="size-4 mr-1" />
                  Abrir Canva en pestaña nueva
                  <ExternalLink className="size-3.5 ml-1" />
                </a>
              </div>

              {/* Checklist de lo que debe incluir la infografía */}
              <div className="rounded-xl border border-white/10 bg-ink-950/60 p-4 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                  Checklist obligatorio de tu infografía:
                </h5>
                <div className="grid gap-2 sm:grid-cols-2 text-xs text-slate-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Título creativo y tu nombre completo.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Respuestas a los cuestionamientos de energía y desechos.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Al menos 3 estructuras celulares con su función metabólica.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="size-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>Uso de la analogía de la pequeña fábrica celular.</span>
                  </div>
                </div>
              </div>

              {/* Registro del enlace público de Canva */}
              <form onSubmit={handleSaveCanvaUrl} className="space-y-2">
                <label htmlFor="canva-url-input-field" className="text-xs font-bold text-slate-300 block">
                  Enlace público de solo lectura de tu infografía en Canva:
                </label>
                <div className="flex gap-2">
                  <input
                    id="canva-url-input-field"
                    type="url"
                    value={canvaUrlInput}
                    onChange={(e) => setCanvaUrlInput(e.target.value)}
                    placeholder="https://www.canva.com/design/..."
                    className="flex-1 rounded-xl border border-white/10 bg-ink-900/80 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-rose-400/50 focus:outline-none"
                  />
                  <Button type="submit" variant="secondary" size="sm" className="font-bold text-xs">
                    Guardar enlace
                  </Button>
                </div>
              </form>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.3')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.3 Preguntas Motivadoras
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.5')}
                className="font-bold shadow-lg shadow-rose-500/10"
              >
                Siguiente: 3.5 Cubo Merge y Estructuras
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.5 CUBO MERGE: ESTRUCTURAS CELULARES Y METABOLISMO
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.5') && (
        <section id="sub-3-5" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.16)"
            borderColor="rgba(168, 85, 247, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-purple-500/20 text-purple-300 text-lg font-black">
                  3.5
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="grape">Realidad Aumentada · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Célula Vegetal y Metabolismo</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="Cubo Merge: Identificación de Estructuras Metabólicas" speed={3.5} className="font-extrabold text-purple-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">
                <Box className="size-3.5 text-purple-300" aria-hidden />
                6 Caras Celulares
              </Chip>
            </div>

            {/* Texto literal oficial */}
            <div className="rounded-2xl border border-purple-400/25 bg-purple-400/8 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Texto de la actividad pedagógica:
              </p>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base italic">
                «A partir de la visualización, la docente, presenta y proporciona a los estudiantes un cubo Merge e indica las funcionalidades de la herramienta y propone hacer uso del cubo superponiendo la imagen de la célula vegetal con el propósito de identificar las estructuras celulares para llevar a cabo el metabolismo celular»
              </p>
            </div>

            {/* Simulador Interactivo 3D del Cubo Merge */}
            <div className="rounded-3xl border border-purple-400/30 bg-ink-950/90 p-5 space-y-5 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-lg bg-purple-400/20 text-purple-300 text-xs font-bold">
                    🧊
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Simulador Interactivo del Cubo Merge en 3D
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Chip tone="grape">
                    {exploredCubeFaces.size} de 6 caras exploradas
                  </Chip>
                  {extraArCube && mission ? (
                    <Link
                      to={activityUrl(mission.code, extraArCube)}
                      className="rounded-lg border border-purple-400/30 bg-purple-400/10 px-2.5 py-1 text-xs font-bold text-purple-200 hover:bg-purple-400/20"
                    >
                      Pantalla completa ↗
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* Tarjetas selectoras de caras del cubo */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {MERGE_CUBE_FACES.map((face, idx) => {
                  const isSelected = activeCubeFaceIndex === idx;
                  const isExplored = exploredCubeFaces.has(idx);
                  return (
                    <button
                      key={face.id}
                      type="button"
                      onClick={() => handleRotateCube(idx)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 rounded-2xl border p-3 text-center transition',
                        isSelected
                          ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                          : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/6'
                      )}
                    >
                      <div className="relative">
                        <span className="text-2xl">{face.icon}</span>
                        {isExplored && (
                          <CheckCircle2 className="size-3.5 text-emerald-400 absolute -top-1 -right-2" />
                        )}
                      </div>
                      <span className="text-xs font-bold text-white truncate max-w-full">{face.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono truncate max-w-full">{face.faceLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Ficha de la cara activa del Cubo Merge */}
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="grid size-12 place-items-center rounded-2xl text-2xl shadow"
                      style={{ backgroundColor: `${currentCubeFace.color}20`, color: currentCubeFace.color }}
                    >
                      {currentCubeFace.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
                        {currentCubeFace.faceLabel} · {currentCubeFace.organelle}
                      </span>
                      <h4 className="text-base font-extrabold text-white sm:text-lg">
                        {currentCubeFace.name}
                      </h4>
                    </div>
                  </div>
                  <Chip tone="gold">{currentCubeFace.organelle}</Chip>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3 space-y-1">
                    <strong className="text-purple-300 font-bold block">Función en el metabolismo celular:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentCubeFace.metabolicFunction}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3 space-y-1">
                    <strong className="text-emerald-300 font-bold block">Importancia en la célula vegetal:</strong>
                    <p className="text-slate-200 leading-relaxed">{currentCubeFace.plantRole}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.4')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.4 Video 360, Lectura y Canva
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.6')}
                className="font-bold shadow-lg shadow-purple-500/10"
              >
                Siguiente: 3.6 Cuadro de Estructuras
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.6 CUADRO DE LA ESTRUCTURA CELULAR EN LA PLATAFORMA
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.6') && (
        <section id="sub-3-6" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(16, 185, 129, 0.16)"
            borderColor="rgba(16, 185, 129, 0.35)"
            className="p-5 sm:p-7 space-y-6"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-2xl bg-emerald-400/20 text-emerald-300 text-lg font-black">
                  3.6
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="mint">Espacio de participación · Sesión 3</Chip>
                    <span className="text-xs text-slate-400">Entrega formal calificada</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    <ShinyText text="Cuadro de la estructura celular y funciones metabólicas" speed={3.5} className="font-extrabold text-emerald-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="neutral">
                <TableIcon className="size-3.5 text-emerald-300" aria-hidden />
                6 Estructuras Clave
              </Chip>
            </div>

            {/* Texto literal oficial */}
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/8 p-4 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Texto de la actividad pedagógica:
              </p>
              <p className="text-sm leading-relaxed text-slate-200 sm:text-base italic">
                «Los estudiantes completan el cuadro de la estructura celular en la plataforma:
                Membrana celular, Cloroplastos, Mitocondrias, Citoplasma, Vacuola central y Núcleo con su respectiva función principal»
              </p>
            </div>

            {/* Componente del Espacio de participación con autoguardado y envío */}
            <VercelResponseSection
              activity={activity}
              mission={mission}
              mandatoryQuestion={
                mandatoryQuestion ??
                'Los estudiantes completan el cuadro de la estructura celular en la plataforma con la función principal de cada organelo y responden cómo obtienen y utilizan energía las células.'
              }
              structuresTable={effectiveStructures}
              onEvidenceSubmitted={onEvidenceSubmitted}
            />

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.5')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.5 Cubo Merge
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => handleSelectTab('3.7')}
                className="font-bold shadow-lg shadow-emerald-500/10"
              >
                Siguiente: 3.7 Reto Final de Evaluación
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </SpotlightCard>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          3.7 RETO FINAL DE EVALUACIÓN: LA FÁBRICA DE LA VIDA
          ══════════════════════════════════════════════════════════════════ */}
      {(viewMode === 'all' || activeTab === '3.7') && (
        <section id="sub-3-7" className="scroll-mt-36 space-y-5">
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.2)"
            borderColor="rgba(251, 191, 36, 0.45)"
            className="p-5 sm:p-7 space-y-6 bg-gradient-to-br from-amber-400/5 via-ink-950/80 to-ink-950"
          >
            {/* Encabezado */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-amber-400/25 text-amber-300 text-xl font-black shadow-lg shadow-amber-400/20">
                  3.7
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Chip tone="gold">Reto Final de Evaluación · Obligatorio</Chip>
                    <span className="text-xs text-amber-300/80 font-bold">Sesión 3</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white sm:text-2xl">
                    <ShinyText text="Reto Final: La fábrica de la vida y el metabolismo celular" speed={3.5} className="font-extrabold text-amber-200" />
                  </h3>
                </div>
              </div>
              <Chip tone="gold">
                <Trophy className="size-3.5 text-amber-300" aria-hidden />
                Requisito para conquistar la Sesión 3
              </Chip>
            </div>

            {/* Mensaje de orientación con Cito */}
            <div className="flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/8 p-4 sm:p-5">
              <div className="shrink-0">
                <CitoMascot mood="celebrating" size={56} />
              </div>
              <div className="space-y-1.5 text-xs text-slate-200 sm:text-sm">
                <h4 className="font-display font-extrabold text-amber-200 text-sm sm:text-base">
                  ¡Cito te acompaña a la Gran Evaluación Final!
                </h4>
                <p className="leading-relaxed">
                  Has descubierto la analogía de la fábrica celular, cómo las mitocondrias generan ATP por respiración celular, cómo los cloroplastos capturan luz solar por fotosíntesis, el equilibrio osmótico y completado el cuadro en la plataforma. ¡Es hora de demostrar tus aprendizajes y conquistar la insignia maestra de <strong className="text-amber-200">Científico 360</strong>!
                </p>
              </div>
            </div>

            {/* Ficha técnica del reto evaluativo */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center space-y-1">
                <span className="text-2xl font-black text-amber-300 font-mono">8</span>
                <p className="text-xs font-bold text-white">Preguntas Oficiales</p>
                <p className="text-[11px] text-slate-400">Selección múltiple e indagación</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center space-y-1">
                <span className="text-2xl font-black text-emerald-300 font-mono">70%</span>
                <p className="text-xs font-bold text-white">Puntaje Aprobatorio</p>
                <p className="text-[11px] text-slate-400">Mínimo para desbloquear logro</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/3 p-4 text-center space-y-1">
                <span className="text-2xl font-black text-sky-300 font-mono">⚡</span>
                <p className="text-xs font-bold text-white">Insignia Final</p>
                <p className="text-[11px] text-slate-400">Guardián de la Energía + Científico 360</p>
              </div>
            </div>

            {/* Checklist de conceptos evaluados */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-4 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-amber-400" />
                Conceptos clave evaluados en el examen:
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs text-slate-300">
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-amber-400 font-bold shrink-0">1.</span>
                  <span><strong>Metabolismo:</strong> Catabolismo que libera energía vs. anabolismo que construye estructuras.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-amber-400 font-bold shrink-0">2.</span>
                  <span><strong>Respiración Celular:</strong> Oxidación de glucosa con O2 en mitocondrias para generar ATP.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-amber-400 font-bold shrink-0">3.</span>
                  <span><strong>Fotosíntesis:</strong> Conversión de luz solar, agua y CO2 en glucosa y O2 en cloroplastos.</span>
                </li>
                <li className="flex items-start gap-2 rounded-xl bg-ink-950/60 p-2.5">
                  <span className="text-amber-400 font-bold shrink-0">4.</span>
                  <span><strong>Ósmosis y Turgencia:</strong> Paso de agua que infla la gran vacuola central y evita la plasmólisis.</span>
                </li>
              </ul>
            </div>

            {/* Botón de acción para presentar el Reto */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 to-mint-400/10 p-5">
              <div>
                <p className="text-sm font-extrabold text-white">¿Listo para presentar tu reto evaluativo final?</p>
                <p className="text-xs text-slate-300 mt-0.5">Puedes rendirlo cuantas veces necesites. Siempre se conserva tu calificación más alta.</p>
              </div>
              <LinkButton
                to={`/misiones/${mission?.code ?? 'm3'}/quiz`}
                variant="gold"
                size="lg"
                className="shadow-xl shadow-amber-400/20 font-black"
              >
                <Trophy className="size-5 mr-2" />
                Comenzar Reto Final (8 Preguntas)
                <ArrowRight className="size-5 ml-2" />
              </LinkButton>
            </div>

            {/* Pie de navegación */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => handleSelectTab('3.6')}
              >
                <ArrowLeft className="size-4 mr-1.5" />
                Anterior: 3.6 Cuadro de Estructuras
              </Button>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => handleSelectTab('3.1')}
                >
                  <RotateCcw className="size-4 mr-1.5" />
                  Repasar desde 3.1
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </section>
      )}


      {/* Glosario Científico de la Sesión 3 Desplegable */}
      {glossary.length > 0 && (
        <section className="space-y-3">
          <button
            type="button"
            onClick={() => setShowGlossary((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/4 p-4 text-left transition hover:border-white/20 hover:bg-white/6"
          >
            <div className="flex items-center gap-2.5">
              <BookOpenCheck className="size-5 text-amber-400" />
              <span className="font-display font-extrabold text-white text-sm sm:text-base">
                Glosario Científico de la Sesión 3: Términos clave del metabolismo
              </span>
              <Chip tone="neutral">{glossary.length} términos</Chip>
            </div>
            {showGlossary ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
          </button>

          {showGlossary && (
            <div className="grid gap-2.5 sm:grid-cols-2 rounded-2xl border border-white/10 bg-ink-950/80 p-4">
              {glossary.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-white/5 bg-white/3 p-3 space-y-1">
                  <span className="text-xs font-bold text-amber-300 font-mono">{item.term}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

/* ── Main ReadingPlayer component ───────────────────────────── */
export function ReadingPlayer({ activity, mission, onEvidenceSubmitted }: ReadingPlayerProps) {
  const content = (activity.content ?? {}) as Record<string, unknown>;
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

  const isSession3 =
    mission?.code === 'm3' ||
    content.sessionNumber === 3 ||
    (typeof sessionTitle === 'string' && sessionTitle.includes('Sesión 3'));

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
          glossary={glossary}
          mandatoryQuestion={mandatoryQuestion}
          docUrl={docUrl}
          videoUrl={videoUrl}
          videoEmbedUrl={videoEmbedUrl}
          onEvidenceSubmitted={onEvidenceSubmitted}
        />
      ) : isSession2 ? (
        /* ── Si es Sesión 2: Renderizamos la estructura específica de sub-actividades 2.1 a 2.7 ── */
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
      ) : isSession3 ? (
        /* ── Si es Sesión 3: Renderizamos la estructura específica de sub-actividades 3.1 a 3.7 ── */
        <Session3Subactivities
          activity={activity}
          mission={mission}
          structuresTable={structuresTable.length > 0 ? structuresTable : DEFAULT_M3_STRUCTURES}
          glossary={glossary}
          mandatoryQuestion={
            mandatoryQuestion ??
            '¿De qué manera las células vegetales y animales llevan a cabo sus actividades para conservar la vida? ¿Cómo se llama el proceso mediante el cual las células adquieren energía y eliminan desechos?'
          }
          docUrl={
            docUrl ??
            'https://docs.google.com/document/d/1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x/edit?usp=sharing&ouid=107395200434224073532&rtpof=true&sd=true'
          }
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
