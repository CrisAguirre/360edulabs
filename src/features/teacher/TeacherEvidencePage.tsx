import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Chip, EmptyState, ErrorBlock, EvidenceStatusBadge, LoadingBlock, Modal } from '../../components/ui';
import { AnimatedList, SpotlightCard } from '../../components/reactbits';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import { useClassroomEvidence, useClassrooms, useReviewEvidence } from '../../lib/queries';
import type { Evidence, EvidenceLevel } from '../../lib/types';
import { cn, formatDate } from '../../lib/utils';

const menRubric: Record<
  EvidenceLevel,
  { label: string; range: string; tone: 'mint' | 'sky' | 'gold' | 'rose'; description: string }
> = {
  superior: {
    label: 'Superior',
    range: '4.6 - 5.0',
    tone: 'mint',
    description: 'Conecta conceptos científicos, argumenta con precisión y propone analogías o aplicaciones.'
  },
  alto: {
    label: 'Alto',
    range: '4.0 - 4.5',
    tone: 'sky',
    description: 'Explica con vocabulario adecuado, da ejemplos claros y relaciona estructura con función.'
  },
  basico: {
    label: 'Básico',
    range: '3.0 - 3.9',
    tone: 'gold',
    description: 'Identifica ideas o partes principales, aunque su explicación es parcial o limitada.'
  },
  bajo: {
    label: 'Bajo',
    range: '1.0 - 2.9',
    tone: 'rose',
    description: 'Respuesta incompleta o sin relación con los conceptos científicos de la actividad.'
  }
};

const feedbackShortcuts = [
  '¡Excelente explicación! Usaste el vocabulario científico con mucha claridad.',
  'Muy buen trabajo. Recuerda detallar la función de la mitocondria y la producción de ATP.',
  'Identificas bien las estructuras, pero te falta explicar la diferencia clave entre animal y vegetal.',
  'Por favor revisa la lectura y amplía tu respuesta argumentando con tus propias palabras.'
];

export function TeacherEvidencePage() {
  const classroomsQuery = useClassrooms();
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [reviewingItem, setReviewingItem] = useState<Evidence | null>(null);

  // Review Form
  const [selectedScore, setSelectedScore] = useState<EvidenceLevel>('alto');
  const [feedbackText, setFeedbackText] = useState('');

  const toast = useToast();
  const classrooms = classroomsQuery.data ?? [];
  const activeClassroomId = selectedClassroomId ?? classrooms[0]?._id;

  const evidenceQuery = useClassroomEvidence(activeClassroomId);
  const reviewMutation = useReviewEvidence(activeClassroomId);

  if (classroomsQuery.isLoading || evidenceQuery.isLoading) {
    return <LoadingBlock message="Cargando evidencias del aula…" />;
  }

  if (classroomsQuery.isError || classrooms.length === 0) {
    return (
      <ErrorBlock
        title="Sin aulas disponibles"
        message="No se encontraron aulas asignadas a tu cuenta."
      />
    );
  }

  const allEvidence = evidenceQuery.data ?? [];
  const filteredEvidence = allEvidence.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const handleOpenReview = (item: Evidence) => {
    setReviewingItem(item);
    setSelectedScore(item.teacherScore ?? 'alto');
    setFeedbackText(item.feedback ?? '');
  };

  const handleSaveReview = async (newStatus: 'approved' | 'changes_requested') => {
    if (!reviewingItem) return;

    try {
      await reviewMutation.mutateAsync({
        id: reviewingItem._id,
        status: newStatus,
        teacherScore: selectedScore,
        feedback: feedbackText.trim()
      });
      toast.success(
        newStatus === 'approved'
          ? 'Evidencia aprobada y calificada exitosamente.'
          : 'Se han solicitado ajustes al estudiante.'
      );
      setReviewingItem(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Error al calificar la evidencia.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/docente"
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al panel docente
        </Link>
        <Chip tone="sky">
          <GraduationCap className="size-3.5" aria-hidden />
          Evaluación Formativa · Escala MEN
        </Chip>
      </div>

      {/* Header and Classroom filter */}
      <section className="glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Gestión de Aprendizaje</p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Revisión de Evidencias de Indagación
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Califica las producciones de tus estudiantes con retroalimentación cualitativa y cuantitativa.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={activeClassroomId ?? ''}
            onChange={(e) => setSelectedClassroomId(e.target.value)}
            className="bg-ink-950/80 border border-white/12 text-white font-bold text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-mint-400/50"
          >
            {classrooms.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.grade})
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <div className="flex items-center rounded-xl bg-white/6 p-1 text-xs font-bold">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'submitted', label: 'Por revisar' },
              { id: 'approved', label: 'Aprobadas' },
              { id: 'changes_requested', label: 'Ajustes' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStatusFilter(f.id)}
                className={cn(
                  'rounded-lg px-2.5 py-1 transition',
                  statusFilter === f.id ? 'bg-mint-400 text-ink-950' : 'text-slate-400 hover:text-white'
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Cards Grid */}
      {filteredEvidence.length === 0 ? (
        <EmptyState
          title="No hay evidencias con este filtro"
          description="Las producciones enviadas por los estudiantes aparecerán aquí para tu revisión."
        />
      ) : (
        <AnimatedList className="grid gap-4 sm:grid-cols-2">
          {filteredEvidence.map((item) => {
            const student = typeof item.studentId === 'object' ? item.studentId : null;
            const mission = typeof item.missionId === 'object' ? item.missionId : null;
            const currentRubric = item.teacherScore ? menRubric[item.teacherScore] : null;

            return (
              <SpotlightCard key={item._id} spotlightColor="#58e6c5" className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-mint-300 to-sky-400 font-bold text-ink-950 text-sm">
                        {student?.displayName?.[0] ?? 'E'}
                      </span>
                      <div>
                        <h3 className="font-bold text-white text-sm">{student?.displayName ?? 'Estudiante'}</h3>
                        <p className="text-[11px] text-slate-400">@{student?.username}</p>
                      </div>
                    </div>
                    <EvidenceStatusBadge status={item.status} />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">
                      {mission?.title ?? 'Misión'}
                    </span>
                    <p className="text-xs text-slate-400 font-semibold">
                      Tipo: {item.type === 'text' ? 'Texto argumentado' : item.type === 'link' ? 'Infografía (enlace)' : item.type}
                    </p>
                  </div>

                  {/* Submission Body */}
                  <div className="rounded-2xl border border-white/8 bg-ink-950/60 p-3.5 text-xs text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                    {item.text ? (
                      <p className="whitespace-pre-line">{item.text}</p>
                    ) : (
                      <p className="italic text-slate-500">Sin contenido de texto</p>
                    )}

                    {item.linkUrl ? (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 font-bold text-mint-300 hover:text-mint-200"
                      >
                        <ExternalLink className="size-3.5" aria-hidden />
                        Abrir enlace de Canva
                      </a>
                    ) : null}
                  </div>

                  {/* Existing Review / Score */}
                  {currentRubric || item.feedback ? (
                    <div className="rounded-xl border border-white/8 bg-white/2 p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400">Calificación:</span>
                        {currentRubric ? (
                          <Chip tone={currentRubric.tone}>
                            {currentRubric.label} ({currentRubric.range})
                          </Chip>
                        ) : null}
                      </div>
                      {item.feedback ? (
                        <p className="text-slate-300 italic">“{item.feedback}”</p>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">{formatDate(item.updatedAt)}</span>
                  <Button size="sm" onClick={() => handleOpenReview(item)}>
                    {item.status === 'submitted' ? 'Calificar ahora' : 'Editar calificación'}
                  </Button>
                </div>
              </SpotlightCard>
            );
          })}
        </AnimatedList>
      )}

      {/* Review Modal */}
      {reviewingItem ? (
        <Modal
          open={Boolean(reviewingItem)}
          onClose={() => setReviewingItem(null)}
          title="Calificación de Evidencia (Escala MEN)"
          size="md"
        >
          <div className="space-y-4">
            <div className="rounded-2xl bg-ink-950/70 p-3 border border-white/8 text-xs text-slate-300">
              <p className="font-extrabold text-white">
                Estudiante:{' '}
                {typeof reviewingItem.studentId === 'object'
                  ? reviewingItem.studentId.displayName
                  : 'Estudiante'}
              </p>
              <p className="mt-1 line-clamp-3 text-slate-400 italic">“{reviewingItem.text}”</p>
            </div>

            {/* Rubric selector */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Nivel de desempeño (Escala MEN)
              </label>
              <div className="grid gap-2 sm:grid-cols-2">
                {(['superior', 'alto', 'basico', 'bajo'] as const).map((key) => {
                  const r = menRubric[key];
                  const selected = selectedScore === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedScore(key)}
                      className={cn(
                        'p-3 rounded-2xl border text-left transition',
                        selected
                          ? 'border-mint-400/50 bg-mint-400/15 text-white'
                          : 'border-white/10 bg-white/3 text-slate-300 hover:bg-white/6'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">{r.label}</span>
                        <span className="text-xs text-slate-400 font-extrabold">{r.range}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight mt-1">{r.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback shortcuts */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Pistas y comentarios predefinidos
              </label>
              <div className="flex flex-wrap gap-1.5">
                {feedbackShortcuts.map((text, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFeedbackText(text)}
                    className="text-[11px] rounded-xl border border-white/10 bg-white/4 px-2.5 py-1 text-slate-300 hover:bg-white/10 text-left transition"
                  >
                    + {text.slice(0, 45)}…
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Retroalimentación formativa para el estudiante
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                rows={3}
                placeholder="Escribe comentarios que orienten y motiven al estudiante…"
                className="w-full rounded-2xl border border-white/12 bg-ink-950/80 p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-mint-400/50"
              />
            </div>

            {/* Modal actions */}
            <div className="flex flex-wrap justify-end gap-2 pt-3 border-t border-white/8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReviewingItem(null)}
              >
                Cancelar
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleSaveReview('changes_requested')}
                loading={reviewMutation.isPending}
              >
                <AlertTriangle className="size-4" aria-hidden />
                Pedir ajustes
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveReview('approved')}
                loading={reviewMutation.isPending}
              >
                <CheckCircle2 className="size-4" aria-hidden />
                Aprobar evidencia
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
