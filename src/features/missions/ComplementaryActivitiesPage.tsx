import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Aurora, AnimatedList } from '../../components/reactbits';
import { Chip, ErrorBlock, LoadingBlock, SectionHeading } from '../../components/ui';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import { complementaryActivities, sessionInfo } from '../../lib/curriculum';
import { useMission } from '../../lib/queries';
import type { MissionDetail } from '../../lib/types';
import { ComplementaryMissionCard } from './ComplementaryMissionCard';

/**
 * Sesión 4 «Actividades Complementarias».
 *
 * Reúne los recursos complementarios de las tres sesiones en una única vista,
 * a la que se accede desde el mapa de sesiones. No modifica el backend: las
 * actividades siguen perteneciendo a m1/m2/m3 y conservan su estado de
 * completado, solo se agrupan visualmente aquí.
 */
export function ComplementaryActivitiesPage() {
  const { user } = useAuth();
  const m1 = useMission('m1');
  const m2 = useMission('m2');
  const m3 = useMission('m3');
  const queries = [m1, m2, m3];

  const loading = queries.some((q) => q.isLoading);
  const failed = queries.some((q) => q.isError);
  const missions = queries.map((q) => q.data).filter((m): m is MissionDetail => Boolean(m));

  const totalOptional = missions.reduce(
    (sum, mission) => sum + complementaryActivities(mission).length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Cabecera */}
      <section className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-gradient-to-br from-violet-500/15 via-ink-900/70 to-sky-400/10 p-5 sm:p-7">
        <Aurora className="rounded-[2rem]" opacity={0.22} colors={['#a78bfa', '#7dd3fc', '#58e6c5']} />
        <div
          className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full bg-violet-400/15 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <Link
            to={roleHome(user?.role)}
            className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Volver al mapa de sesiones
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl text-3xl"
              style={{ background: 'rgba(167, 139, 250, 0.18)', border: '1px solid rgba(167, 139, 250, 0.35)' }}
            >
              🧩
            </span>
            <div>
              <p className="eyebrow">Sesión 4 · Exploración opcional</p>
              <h1 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Actividades Complementarias
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Todas las experiencias de apoyo de las tres sesiones reunidas en un solo lugar: modelos 3D, cubos de
            realidad aumentada, videos 360°, animaciones, laboratorios y la bitácora. Explóralas a tu ritmo; no
            bloquean tu avance.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Chip tone="grape">
              <Sparkles className="size-3.5 text-violet-300" aria-hidden />
              {totalOptional} experiencias opcionales
            </Chip>
            <Chip tone="neutral">No cuentan para el progreso</Chip>
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingBlock message="Reuniendo las actividades complementarias…" />
      ) : failed ? (
        <ErrorBlock
          message="No pudimos cargar las actividades complementarias."
          onRetry={() => queries.forEach((q) => q.refetch())}
        />
      ) : (
        <>
          {missions.map((mission) => {
            const extras = complementaryActivities(mission);
            const info = sessionInfo(mission.code);
            if (extras.length === 0) return null;
            return (
              <section key={mission.code} className="space-y-4">
                <SectionHeading
                  eyebrow={`Sesión ${info?.session ?? mission.order}`}
                  title={info?.theme ?? mission.title}
                  action={<Chip tone="neutral">{extras.length} actividades</Chip>}
                />
                <AnimatedList className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.04}>
                  {extras.map((activity) => (
                    <ComplementaryMissionCard
                      key={activity._id}
                      activity={activity}
                      missionCode={mission.code}
                    />
                  ))}
                </AnimatedList>
              </section>
            );
          })}
        </>
      )}
    </div>
  );
}
