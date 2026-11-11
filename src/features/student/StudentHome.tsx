import { ArrowRight, BookOpenCheck, CheckCircle2, ClipboardCheck, Compass, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BadgeCabinet } from '../../components/gamification/BadgeCabinet';
import { MissionMap, QuickTip } from '../../components/missions/MissionCard';
import { CitoMascot } from '../../components/Cito';
import { Button, Card, ErrorBlock, LinkButton, LoadingBlock, ProgressBar, ProgressRing, SectionHeading } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { useMyEvidence, useProgress } from '../../lib/queries';
import { AnimatedList, Aurora, DecryptedText } from '../../components/reactbits';

export function StudentHome() {
  const { user } = useAuth();
  const progressQuery = useProgress();
  const evidenceQuery = useMyEvidence();

  if (progressQuery.isLoading) return <LoadingBlock message="Abriendo el mapa de misiones…" />;
  if (progressQuery.isError || !progressQuery.data) {
    return <ErrorBlock message="No pudimos cargar tu progreso." onRetry={() => progressQuery.refetch()} />;
  }

  const progress = progressQuery.data;
  const missions = progress.missions;
  const active = missions.find((mission) => mission.progress.status === 'in_progress') ??
    missions.find((mission) => mission.progress.status === 'available');
  const completed = missions.filter((mission) => mission.progress.status === 'completed').length;
  const evidence = evidenceQuery.data ?? [];
  const approved = evidence.filter((item) => item.status === 'approved').length;
  const levelProgress = Math.min(100, Math.round(((300 - progress.xpToNextLevel) / 300) * 100));

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-mint-400/12 via-ink-900/70 to-sky-400/10 p-5 sm:p-7">
        <Aurora className="rounded-[2rem]" opacity={0.25} />
        <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-mint-400/12 blur-3xl" aria-hidden />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="eyebrow">Agencia CitoIndagar 360 · 5.º A</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              ¡Hola,{' '}
              <span className="text-mint-300 inline-block">
                <DecryptedText
                  text={user?.displayName.split(' ')[0] ?? 'explorador'}
                  speed={45}
                  triggerOnHover
                />
              </span>
              !
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {active
                ? `Tu siguiente estación es “${active.title}”. ${active.bigQuestion}`
                : 'Completaste todas las misiones. ¡Tu bitácora es digna de un Científico CitoIndagar 360!'}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {active ? (
                <LinkButton to={`/misiones/${active.code}`} size="lg">
                  {active.progress.status === 'in_progress' ? 'Continuar misión' : 'Empezar misión'}
                  <ArrowRight className="size-5" aria-hidden />
                </LinkButton>
              ) : (
                <LinkButton to="/logros" size="lg">
                  Ver mi bitácora
                  <Trophy className="size-5" aria-hidden />
                </LinkButton>
              )}
              <LinkButton to="/logros" variant="secondary" size="lg">
                <BookOpenCheck className="size-5" aria-hidden />
                Mis logros
              </LinkButton>
            </div>
            <AnimatedList className="mt-5 grid gap-2 sm:grid-cols-3" stagger={0.06}>
              <div className="rounded-2xl border border-white/8 bg-ink-950/35 px-3 py-2.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Misiones completadas</p>
                <p className="font-display text-xl font-bold text-white">
                  {completed}<span className="text-sm text-slate-500"> / {missions.length}</span>
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-ink-950/35 px-3 py-2.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Insignias</p>
                <p className="font-display text-xl font-bold text-white">
                  {progress.badges.length}<span className="text-sm text-slate-500"> / 5</span>
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-ink-950/35 px-3 py-2.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Evidencias aprobadas</p>
                <p className="font-display text-xl font-bold text-white">{approved}</p>
              </div>
            </AnimatedList>
          </div>

          <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-3">
            <div className="relative">
              <CitoMascot size={150} mood={completed > 0 ? 'celebrating' : 'happy'} className="animate-float" />
            </div>
            <div className="glass-soft w-full rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Nivel explorador</p>
                  <p className="font-display text-2xl font-extrabold text-white">{progress.level}</p>
                </div>
                <ProgressRing value={levelProgress} size={64} stroke={6} color="#58e6c5">
                  <span className="text-xs font-extrabold text-mint-300">{progress.totalXP}</span>
                </ProgressRing>
              </div>
              <ProgressBar
                className="mt-2"
                value={300 - progress.xpToNextLevel}
                max={300}
                color="#58e6c5"
                label={`${progress.totalXP} XP en total`}
              />
              <p className="mt-1 text-[10px] text-slate-500">{progress.xpToNextLevel} XP para el siguiente nivel</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          eyebrow="Mapa de misiones"
          title="Tu ruta por la célula"
          description="Avanza en orden: cada insignia abre la siguiente estación de la Agencia."
          action={<QuickTip>Consejo: explora todos los hotspots antes de completar una actividad.</QuickTip>}
        />
        <MissionMap missions={missions} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5">
          <SectionHeading
            eyebrow="Gabinete de insignias"
            title="Tus logros científicos"
            action={
              <Link to="/logros" className="inline-flex items-center gap-1.5 text-sm font-bold text-mint-300 hover:text-mint-200">
                Ver todas
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            }
          />
          <div className="mt-4">
            <BadgeCabinet earned={progress.badges} compact />
          </div>
          {progress.badges.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-dashed border-white/12 p-4 text-sm text-slate-400">
              Aún no tienes insignias. Completa la primera misión y Cito te entregará la insignia{' '}
              <strong className="text-white">Explorador Celular</strong>.
            </p>
          ) : null}
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-rose-400/12 text-rose-300">
                <ClipboardCheck className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">Mi bitácora</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {evidence.length === 0
                    ? 'Tus evidencias aparecerán aquí. Cada misión tiene un espacio para argumentar.'
                    : `${evidence.length} evidencia${evidence.length === 1 ? '' : 's'} guardada${evidence.length === 1 ? '' : 's'} en tu bitácora.`}
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {evidence.slice(0, 3).map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/3 px-3 py-2">
                  <span className="truncate text-xs font-bold text-slate-300">
                    {typeof item.missionId === 'object' ? item.missionId.title : 'Evidencia'}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    {item.status === 'approved' ? 'Aprobada' : item.status === 'submitted' ? 'En revisión' : item.status === 'changes_requested' ? 'Ajustes' : 'Borrador'}
                  </span>
                </div>
              ))}
            </div>
            <Link to="/logros" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-mint-300 hover:text-mint-200">
              Abrir bitácora completa
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-sky-400/12 text-sky-300">
                <Compass className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">¿Cómo avanzar?</h2>
                <p className="text-sm text-slate-400">Tres pasos simples en cada estación.</p>
              </div>
            </div>
            <ol className="mt-4 space-y-3 text-sm text-slate-300">
              {[
                'Explora las actividades de Inicio y Desarrollo.',
                'Escribe tu evidencia y revisa la rúbrica.',
                'Aprueba el quiz final para ganar la insignia.'
              ].map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint-400/15 text-[11px] font-extrabold text-mint-300">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-400/8 px-3 py-2 text-xs font-bold text-amber-200">
              <Star className="size-4" aria-hidden />
              Necesitas 70 % en el quiz para completar cada misión.
            </div>
          </Card>
        </div>
      </section>

      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
        <CheckCircle2 className="size-4 text-mint-300" aria-hidden />
        Tu progreso se guarda automáticamente en la Agencia.
        <Button variant="ghost" size="sm" onClick={() => progressQuery.refetch()} className="ml-1">
          Actualizar
        </Button>
      </div>
    </div>
  );
}
