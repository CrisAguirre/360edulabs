import {
  ArrowLeft,
  BookOpenCheck,
  Clock,
  ExternalLink,
  Trophy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CitoMascot } from '../../components/Cito';
import { BadgeCabinet } from '../../components/gamification/BadgeCabinet';
import { Card, Chip, ErrorBlock, EvidenceStatusBadge, LinkButton, LoadingBlock, ProgressBar, SectionHeading } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { useMyEvidence, useProgress } from '../../lib/queries';
import type { Evidence, EvidenceLevel } from '../../lib/types';
import { formatDate } from '../../lib/utils';

const levelDescriptions: Record<EvidenceLevel, { label: string; tone: 'mint' | 'sky' | 'gold' | 'rose'; desc: string }> = {
  superior: { label: 'Superior (4.6 - 5.0)', tone: 'mint', desc: 'Excelente conexión de conceptos y argumentación científica' },
  alto: { label: 'Alto (4.0 - 4.5)', tone: 'sky', desc: 'Buen uso de vocabulario y relación estructura-función' },
  basico: { label: 'Básico (3.0 - 3.9)', tone: 'gold', desc: 'Identifica ideas clave con explicación parcial' },
  bajo: { label: 'Bajo (1.0 - 2.9)', tone: 'rose', desc: 'Respuesta incompleta, requiere ajustes' }
};

export function LogrosPage() {
  const { user } = useAuth();
  const progressQuery = useProgress();
  const evidenceQuery = useMyEvidence();

  if (progressQuery.isLoading || evidenceQuery.isLoading) {
    return <LoadingBlock message="Abriendo tu bitácora de logros…" />;
  }

  if (progressQuery.isError || !progressQuery.data) {
    return (
      <ErrorBlock
        title="No pudimos cargar tus logros"
        message="Revisa tu conexión e intenta de nuevo."
        onRetry={() => {
          progressQuery.refetch();
          evidenceQuery.refetch();
        }}
      />
    );
  }

  const progress = progressQuery.data;
  const evidences = evidenceQuery.data ?? [];

  return (
    <div className="space-y-8">
      {/* Top back button */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/estudiante"
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver a misiones
        </Link>
        <Chip tone="gold">
          <Trophy className="size-3.5" aria-hidden />
          Bitácora Científica Personal
        </Chip>
      </div>

      {/* Explorer Profile Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-mint-400/10 via-ink-900/80 to-sky-400/10 p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-mint-400/12 blur-3xl" aria-hidden />

        <div className="relative grid items-center gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-mint-300 to-sky-400 font-display text-2xl font-extrabold text-ink-950">
                {user?.displayName?.[0] ?? 'E'}
              </span>
              <div>
                <p className="eyebrow">Bitácora de Explorador</p>
                <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {user?.displayName ?? 'Estudiante'}
                </h1>
                <p className="text-xs font-semibold text-slate-400">@{user?.username} · 5.º Grado de Primaria</p>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              Aquí se registran todas tus insignias conquistadas, los puntos de experiencia acumulados y las
              evidencias revisadas por tu docente.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="glass-soft rounded-2xl p-3 text-center">
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Total XP</p>
                <p className="font-display text-2xl font-extrabold text-mint-300 mt-0.5">{progress.totalXP}</p>
              </div>
              <div className="glass-soft rounded-2xl p-3 text-center">
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Nivel</p>
                <p className="font-display text-2xl font-extrabold text-white mt-0.5">{progress.level}</p>
              </div>
              <div className="glass-soft rounded-2xl p-3 text-center">
                <p className="text-[10px] font-extrabold uppercase text-slate-400">Insignias</p>
                <p className="font-display text-2xl font-extrabold text-amber-300 mt-0.5">
                  {progress.badges.length}/5
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <CitoMascot size={150} mood="celebrating" />
            <div className="glass-soft w-full max-w-xs rounded-2xl p-4 text-center">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Nivel {progress.level}</p>
              <div className="mt-2">
                <ProgressBar
                  value={300 - progress.xpToNextLevel}
                  max={300}
                  color="#58e6c5"
                  label={`${progress.xpToNextLevel} XP para el nivel ${progress.level + 1}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Cabinet */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Gabinete Científico"
          title="Tus Insignias Conquistadas"
          description="Cada misión de indagación te otorga una insignia oficial al completar las actividades y el quiz."
        />
        <BadgeCabinet earned={progress.badges} />
      </section>

      {/* Evidences Notebook / Bitácora */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Producciones del Estudiante"
          title="Bitácora de Evidencias"
          description="Registros fotográficos de Quiver, respuestas argumentadas, infografías de Canva y notas de laboratorio."
        />

        {evidences.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <BookOpenCheck className="size-12 mx-auto text-slate-500 mb-2" />
            <h3 className="text-lg font-bold text-white">Aún no has enviado evidencias</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Al avanzar en cada misión, encontrarás actividades donde deberás escribir tus explicaciones o subir tus fotos.
            </p>
            <div className="mt-4">
              <LinkButton to="/estudiante">Ir a las misiones</LinkButton>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {evidences.map((item: Evidence) => {
              const missionTitle = typeof item.missionId === 'object' ? item.missionId.title : 'Misión';
              const missionCode = typeof item.missionId === 'object' ? item.missionId.code : 'm1';
              const menLevel = item.teacherScore ? levelDescriptions[item.teacherScore] : null;

              return (
                <Card key={item._id} className="p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">
                          {missionTitle}
                        </span>
                        <h3 className="text-base font-bold text-white leading-snug mt-0.5">
                          Evidencia de Indagación
                        </h3>
                      </div>
                      <EvidenceStatusBadge status={item.status} />
                    </div>

                    {/* Content Preview */}
                    <div className="rounded-2xl border border-white/8 bg-ink-950/50 p-4 text-xs leading-relaxed text-slate-300">
                      {item.text ? (
                        <p className="whitespace-pre-line line-clamp-4">{item.text}</p>
                      ) : (
                        <p className="italic text-slate-500">Sin contenido de texto</p>
                      )}

                      {item.linkUrl ? (
                        <a
                          href={item.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-1.5 font-bold text-mint-300 hover:text-mint-200"
                        >
                          <ExternalLink className="size-3.5" aria-hidden />
                          Ver infografía o enlace entregado
                        </a>
                      ) : null}
                    </div>

                    {/* Teacher Feedback / MEN Grade */}
                    {item.teacherScore || item.feedback ? (
                      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-3 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold uppercase text-[10px] text-amber-300">
                            Evaluación docente (Escala MEN)
                          </span>
                          {menLevel ? (
                            <Chip tone={menLevel.tone}>{menLevel.label}</Chip>
                          ) : null}
                        </div>
                        {item.feedback ? (
                          <p className="text-slate-200 leading-relaxed pt-1">
                            “{item.feedback}”
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="size-3.5" />
                        <span>Pendiente de revisión por tu docente</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/8 text-xs text-slate-500">
                    <span>Entregado: {formatDate(item.updatedAt)}</span>
                    <Link
                      to={`/misiones/${missionCode}`}
                      className="font-bold text-mint-300 hover:text-mint-200"
                    >
                      Ver en la misión →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
