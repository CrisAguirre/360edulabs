import { AlertTriangle, CheckCircle2, ClipboardCheck, Cloud, Loader2, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Chip, EvidenceStatusBadge } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import { evidenceForActivity, useMyEvidence, useSaveEvidence, useSubmitEvidence } from '../../lib/queries';
import type { Activity, Evidence, MissionDetail } from '../../lib/types';
import { cn, timeAgo } from '../../lib/utils';
import { AnimatedList, ClickSpark, SpotlightCard } from '../../components/reactbits';

interface EvidenceEditorProps {
  activity: Activity;
  mission: MissionDetail;
  onSubmitted: (result: {
    evidence: Evidence;
    missionCompleted: boolean;
    badgeAwarded: { code: string; name: string; description: string; icon: string } | null;
  }) => void;
}

const SCORE_LABELS: Record<string, string> = {
  bajo: 'Bajo',
  basico: 'Básico',
  alto: 'Alto',
  superior: 'Superior'
};

export function EvidenceEditor({ activity, mission, onSubmitted }: EvidenceEditorProps) {
  const content = activity.content as Record<string, any>;
  const minLength = Number(content.minLength ?? 80);
  const requiresLink = Boolean(content.requiresLink);
  const checklist: string[] = Array.isArray(content.checklist) ? content.checklist : [];
  const rubric: Array<{ level: string; description: string }> = Array.isArray(content.rubric) ? content.rubric : [];

  const evidenceQuery = useMyEvidence();
  const saveMutation = useSaveEvidence(mission.code);
  const submitMutation = useSubmitEvidence(mission.code);
  const toast = useToast();

  const existing = evidenceForActivity(evidenceQuery.data, activity._id);
  const [evidence, setEvidence] = useState<Evidence | undefined>(existing);
  const [text, setText] = useState(existing?.text ?? '');
  const [linkUrl, setLinkUrl] = useState(existing?.linkUrl ?? '');
  const [dirty, setDirty] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const saveRef = useRef(saveMutation.mutateAsync);
  saveRef.current = saveMutation.mutateAsync;

  const status = evidence?.status ?? 'draft';
  const locked = status === 'submitted' || status === 'approved';
  const enoughContent = text.trim().length >= minLength && (!requiresLink || linkUrl.trim().length > 0);
  const canDraft = text.trim().length >= 10 || linkUrl.trim().length > 0;

  useEffect(() => {
    if (!evidence && existing) {
      setEvidence(existing);
      setText(existing.text ?? '');
      setLinkUrl(existing.linkUrl ?? '');
    }
  }, [existing, evidence]);

  // Autoguardado del borrador: espera 1,4 s después del último cambio.
  useEffect(() => {
    if (!dirty || locked || !canDraft) return;
    const timer = window.setTimeout(() => {
      setSaving(true);
      saveRef
        .current({
          missionId: mission._id,
          activityId: activity._id,
          text,
          linkUrl,
          type: linkUrl ? 'link' : 'text'
        })
        .then((saved) => {
          setEvidence(saved);
          setDirty(false);
          setLastSavedAt(new Date().toISOString());
        })
        .catch(() => undefined)
        .finally(() => setSaving(false));
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [text, linkUrl, dirty, locked, canDraft, mission._id, activity._id]);

  const updateText = (value: string) => {
    setText(value);
    setDirty(true);
  };

  const updateLink = (value: string) => {
    setLinkUrl(value);
    setDirty(true);
  };

  const persist = async () => {
    const saved = await saveMutation.mutateAsync({
      missionId: mission._id,
      activityId: activity._id,
      text,
      linkUrl,
      type: linkUrl ? 'link' : 'text'
    });
    setEvidence(saved);
    setDirty(false);
    setLastSavedAt(new Date().toISOString());
    return saved;
  };

  const handleSave = async () => {
    if (!canDraft) {
      toast.error('Escribe al menos 10 caracteres o agrega un enlace para guardar.');
      return;
    }
    setSaving(true);
    try {
      await persist();
      toast.success('Borrador guardado. Puedes seguir editando.');
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'No pudimos guardar el borrador.');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!enoughContent) {
      toast.error(
        requiresLink
          ? `Completa al menos ${minLength} caracteres y agrega el enlace solicitado.`
          : `Escribe al menos ${minLength} caracteres antes de enviar.`
      );
      return;
    }
    setSubmitting(true);
    try {
      const current = !evidence || dirty ? await persist() : evidence;
      const result = await submitMutation.mutateAsync(current._id);
      setEvidence(result.evidence);
      setDirty(false);
      onSubmitted(result);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : 'No pudimos enviar la evidencia.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleCheck = (index: number) => {
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="rose">
            <ClipboardCheck className="size-3.5" aria-hidden />
            Evidencia de aprendizaje
          </Chip>
          <EvidenceStatusBadge status={status} />
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
          {saving ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <Cloud className="size-3.5" aria-hidden />}
          {saving
            ? 'Guardando borrador…'
            : lastSavedAt
              ? `Guardado ${timeAgo(lastSavedAt)}`
              : 'Autoguardado activo'}
        </span>
      </div>

      <SpotlightCard
        spotlightColor="rgba(244, 114, 182, 0.15)"
        borderColor="rgba(244, 114, 182, 0.35)"
        className="p-5"
      >
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-rose-300">Consigna</p>
        <p className="mt-1 text-sm leading-relaxed text-white">{content.prompt}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-bold text-slate-400">
          <span className="rounded-full bg-white/6 px-3 py-1">Mínimo {minLength} caracteres</span>
          {requiresLink ? <span className="rounded-full bg-amber-400/10 px-3 py-1 text-amber-200">Enlace obligatorio</span> : null}
          <span className="rounded-full bg-mint-400/10 px-3 py-1 text-mint-200">+{activity.xp} XP</span>
        </div>
      </SpotlightCard>

      {evidence?.feedback || status === 'approved' || status === 'changes_requested' ? (
        <div
          className={cn(
            'rounded-2xl border p-4',
            status === 'approved'
              ? 'border-mint-400/25 bg-mint-400/8'
              : status === 'changes_requested'
                ? 'border-amber-400/25 bg-amber-400/8'
                : 'border-white/10 bg-white/3'
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {status === 'approved' ? (
              <CheckCircle2 className="size-5 text-mint-300" aria-hidden />
            ) : (
              <AlertTriangle className="size-5 text-amber-300" aria-hidden />
            )}
            <p className="text-sm font-extrabold text-white">
              {status === 'approved'
                ? 'Evidencia aprobada por tu docente'
                : status === 'changes_requested'
                  ? 'Tu docente pidió ajustes'
                  : 'Retroalimentación del docente'}
            </p>
            {evidence?.teacherScore ? <Chip tone="mint">Nivel {SCORE_LABELS[evidence.teacherScore] ?? evidence.teacherScore}</Chip> : null}
          </div>
          {evidence?.feedback ? <p className="mt-2 text-sm leading-relaxed text-slate-200">{evidence.feedback}</p> : null}
          {status === 'changes_requested' ? (
            <p className="mt-2 text-xs text-amber-200">
              Edita tu respuesta y vuelve a enviarla. El borrador conserva los cambios.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5">
          <label className="block">
            <span className="mb-2 flex items-center justify-between gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
              <span>Mi respuesta</span>
              <span className={cn('normal-case tracking-normal', text.trim().length >= minLength ? 'text-mint-300' : 'text-slate-500')}>
                {text.trim().length} / {minLength}
              </span>
            </span>
            <textarea
              value={text}
              onChange={(event) => updateText(event.target.value)}
              readOnly={locked}
              rows={10}
              className="w-full resize-y rounded-2xl border border-white/12 bg-ink-950/55 p-4 text-sm leading-relaxed text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none disabled:opacity-60"
              placeholder="Escribe con tus propias palabras. Nombra las ideas, explica por qué son importantes y usa vocabulario científico…"
              aria-describedby="evidence-help"
            />
          </label>
          <p id="evidence-help" className="mt-2 text-[11px] text-slate-500">
            {locked
              ? 'La evidencia ya fue enviada. Si necesitas cambiar algo, pide a tu docente que habilite una nueva revisión.'
              : 'El borrador se guarda automáticamente. Revisa la rúbrica antes de enviar.'}
          </p>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Enlace de apoyo {requiresLink ? '(obligatorio)' : '(opcional)'}
            </span>
            <input
              type="url"
              value={linkUrl}
              onChange={(event) => updateLink(event.target.value)}
              readOnly={locked}
              placeholder="https://www.canva.com/…"
              className="min-h-12 w-full rounded-2xl border border-white/12 bg-ink-950/55 px-4 text-sm font-semibold text-white placeholder:text-slate-600 focus:border-mint-400/50 focus:outline-none"
            />
          </label>

          {!locked ? (
            <ClickSpark sparkColor="#58e6c5">
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="secondary" onClick={handleSave} loading={saving} disabled={!canDraft}>
                  Guardar borrador
                </Button>
                <Button onClick={handleSubmit} loading={submitting} disabled={!enoughContent}>
                  <Send className="size-4" aria-hidden />
                  Enviar a revisión
                </Button>
              </div>
            </ClickSpark>
          ) : null}
        </Card>

        <div className="space-y-3">
          <SpotlightCard
            spotlightColor="rgba(88, 230, 197, 0.12)"
            borderColor="rgba(255, 255, 255, 0.1)"
            className="p-4"
          >
            <h4 className="text-sm font-extrabold text-white">Checklist de calidad</h4>
            <AnimatedList className="mt-2 space-y-1.5" stagger={0.03}>
              {checklist.map((item, index) => (
                <label
                  key={item}
                  className={cn(
                    'flex cursor-pointer items-start gap-2 rounded-xl px-2 py-1.5 text-xs leading-relaxed transition',
                    checked.has(index) ? 'bg-mint-400/8 text-mint-100' : 'text-slate-300 hover:bg-white/5'
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked.has(index)}
                    onChange={() => toggleCheck(index)}
                    className="mt-0.5 size-3.5 shrink-0 accent-[#2bd4ad]"
                  />
                  {item}
                </label>
              ))}
            </AnimatedList>
          </SpotlightCard>

          {rubric.length > 0 ? (
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.12)"
              borderColor="rgba(255, 255, 255, 0.1)"
              className="p-4"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-mint-300" aria-hidden />
                <h4 className="text-sm font-extrabold text-white">Rúbrica de evaluación</h4>
              </div>
              <AnimatedList className="mt-2 space-y-1.5" stagger={0.03}>
                {rubric.map((level) => (
                  <div key={level.level} className="rounded-xl border border-white/6 bg-white/2 p-2">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">{level.level}</p>
                    <p className="text-xs leading-relaxed text-slate-400">{level.description}</p>
                  </div>
                ))}
              </AnimatedList>
            </SpotlightCard>
          ) : null}

          <div className="rounded-2xl border border-sky-400/20 bg-sky-400/8 p-3 text-xs leading-relaxed text-sky-100">
            <span className="inline-flex items-center gap-1.5 font-extrabold text-sky-200">
              <Sparkles className="size-4" aria-hidden />
              Consejo de Cito
            </span>
            <p className="mt-1">Usa ejemplos de tu vida diaria y revisa que cada idea tenga una explicación, no solo un nombre.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
