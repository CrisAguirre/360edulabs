import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  RotateCcw,
  Shuffle,
  Trophy,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Button, Card, Chip, EmptyState, ErrorBlock, LinkButton, LoadingBlock, MissionStatusBadge, SectionHeading, StatCard } from '../../components/ui';
import { Aurora, AnimatedList, SpotlightCard } from '../../components/reactbits';
import { useAuth } from '../../contexts/AuthContext';
import { useClassroomDashboard, useClassrooms } from '../../lib/queries';
import type { StudentRow } from '../../lib/types';
import { cn } from '../../lib/utils';

export function TeacherDashboard() {
  const { user } = useAuth();
  const classroomsQuery = useClassrooms();
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);

  // Turn management state (Rotación de aula)
  const [turnIndex, setTurnIndex] = useState(0);
  const [turnStation, setTurnStation] = useState<'Cubo Merge AR' | 'Estación Quiver' | 'Visor 3D'>('Cubo Merge AR');
  const [shuffledStudents, setShuffledStudents] = useState<StudentRow[]>([]);

  const classrooms = classroomsQuery.data ?? [];
  const activeClassroomId = selectedClassroomId ?? classrooms[0]?._id;

  const dashboardQuery = useClassroomDashboard(activeClassroomId);

  if (classroomsQuery.isLoading) {
    return <LoadingBlock message="Cargando tus aulas asignadas…" />;
  }

  if (classroomsQuery.isError || classrooms.length === 0) {
    return (
      <ErrorBlock
        title="Sin aulas disponibles"
        message="No se encontraron aulas asignadas a tu cuenta de docente."
        onRetry={() => classroomsQuery.refetch()}
      />
    );
  }

  const dashboard = dashboardQuery.data;
  const students = dashboard?.students ?? [];

  const handleShuffleTurns = () => {
    if (students.length === 0) return;
    const array = [...students].sort(() => Math.random() - 0.5);
    setShuffledStudents(array);
    setTurnIndex(0);
  };

  const currentTurnList = shuffledStudents.length > 0 ? shuffledStudents : students;
  const activeStudentInTurn = currentTurnList[turnIndex];

  return (
    <div className="space-y-8">
      {/* Teacher Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-sky-400/10 via-ink-900/80 to-mint-400/10 p-6 sm:p-8">
        <Aurora colors={['#38bdf8', '#58e6c5', '#818cf8']} className="opacity-45" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-sky-400/12 blur-3xl" aria-hidden />

        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-bold text-sky-200">
              <GraduationCap className="size-3.5" aria-hidden />
              Panel de Acompañamiento Docente
            </span>
            <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              ¡Hola, {user?.displayName ?? 'Docente'}!
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300">
              Monitorea el avance de tu grupo, revisa evidencias con la escala MEN y organiza la rotación en el aula.
            </p>
          </div>

          {/* Classroom Selector */}
          <div className="glass-soft rounded-2xl p-4 flex flex-col gap-2 min-w-56">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Aula activa
            </label>
            <select
              value={activeClassroomId ?? ''}
              onChange={(e) => {
                setSelectedClassroomId(e.target.value);
                setShuffledStudents([]);
                setTurnIndex(0);
              }}
              className="bg-ink-950/80 border border-white/12 text-white font-bold text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-mint-400/50"
            >
              {classrooms.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.grade}) - Código: {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      {dashboard ? (
        <AnimatedList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Estudiantes activos"
            value={dashboard.summary.totalStudents}
            hint={`Grupo ${dashboard.classroom.grade}`}
            icon={Users}
            accent="#7dd3fc"
          />
          <StatCard
            label="Promedio de XP"
            value={`${dashboard.summary.averageXP} XP`}
            hint="Puntaje global del aula"
            icon={Trophy}
            accent="#fbbf24"
          />
          <StatCard
            label="Completitud de misiones"
            value={`${dashboard.summary.completionRate}%`}
            hint="Tasa de misiones finalizadas"
            icon={CheckCircle2}
            accent="#58e6c5"
          />
          <StatCard
            label="Evidencias por calificar"
            value={dashboard.summary.pendingEvidence}
            hint="Esperando tu retroalimentación"
            icon={ClipboardCheck}
            accent="#f472b6"
          />
        </AnimatedList>
      ) : null}

      {/* Quick Action Navigation */}
      <section className="grid gap-4 sm:grid-cols-2">
        <SpotlightCard spotlightColor="#58e6c5" className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-mint-400/12 text-mint-300">
              <ClipboardCheck className="size-6" aria-hidden />
            </span>
            <div>
              <h3 className="font-bold text-white text-base">Revisión de Evidencias</h3>
              <p className="text-xs text-slate-400">Califica con la rúbrica MEN (Superior, Alto, Básico, Bajo)</p>
            </div>
          </div>
          <LinkButton to="/docente/evidencias" variant="secondary" size="sm">
            Revisar
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        </SpotlightCard>

        <SpotlightCard spotlightColor="#7dd3fc" className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-sky-400/12 text-sky-300">
              <BookOpenCheck className="size-6" aria-hidden />
            </span>
            <div>
              <h3 className="font-bold text-white text-base">Reportes y Exportación</h3>
              <p className="text-xs text-slate-400">Consolidado de calificaciones y descarga a CSV</p>
            </div>
          </div>
          <LinkButton to="/docente/reportes" variant="secondary" size="sm">
            Ver reportes
            <ArrowRight className="size-4" aria-hidden />
          </LinkButton>
        </SpotlightCard>
      </section>

      {/* Classroom Turn System (Rotación de aula) */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Dinámica de Aula"
          title="Sistema de Turnos y Rotación"
          description="Facilita el uso compartido de tablets, el Cubo Merge y la mesa de dibujo Quiver en el laboratorio."
        />

        <Card className="p-6 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase text-slate-400">Estación activa:</span>
              {(['Cubo Merge AR', 'Estación Quiver', 'Visor 3D'] as const).map((station) => (
                <button
                  key={station}
                  type="button"
                  onClick={() => setTurnStation(station)}
                  className={cn(
                    'rounded-xl px-3 py-1.5 text-xs font-bold transition',
                    turnStation === station
                      ? 'bg-mint-400 text-ink-950 shadow-md'
                      : 'bg-white/6 text-slate-300 hover:bg-white/10'
                  )}
                >
                  {station}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={handleShuffleTurns}>
                <Shuffle className="size-3.5" aria-hidden />
                Sortear orden
              </Button>
            </div>
          </div>

          {activeStudentInTurn ? (
            <div className="flex flex-wrap items-center justify-between gap-6 p-4 rounded-2xl bg-ink-950/60 border border-white/8">
              <div className="flex items-center gap-4">
                <span className="grid size-16 place-items-center rounded-2xl bg-mint-400/15 font-display text-2xl font-extrabold text-mint-300">
                  {turnIndex + 1}
                </span>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Turno actual en {turnStation}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeStudentInTurn.displayName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Nivel {activeStudentInTurn.level} · {activeStudentInTurn.totalXP} XP acumulados
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="md"
                  onClick={() => setTurnIndex((prev) => (prev + 1) % currentTurnList.length)}
                >
                  Siguiente estudiante
                  <ChevronRight className="size-4" aria-hidden />
                </Button>
                <Button
                  size="md"
                  variant="ghost"
                  onClick={() => setTurnIndex(0)}
                  title="Reiniciar lista"
                >
                  <RotateCcw className="size-4" aria-hidden />
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No hay estudiantes cargados en este grupo.</p>
          )}
        </Card>
      </section>

      {/* Student Progress Matrix */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Trazabilidad individual"
          title="Matriz de Progreso del Estudiante"
          description="Visualiza el estado de cada estudiante en las tres misiones y sus evidencias entregadas."
        />

        {students.length === 0 ? (
          <EmptyState
            title="Sin estudiantes en esta aula"
            description="Los estudiantes aparecerán aquí una vez matriculados o al iniciar sesión con sus cuentas."
          />
        ) : (
          <Card className="overflow-x-auto p-4 sm:p-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Estudiante</th>
                  <th className="pb-3 text-center">Nivel</th>
                  <th className="pb-3 text-center">XP</th>
                  <th className="pb-3 text-center">M1: Teoría</th>
                  <th className="pb-3 text-center">M2: Partes</th>
                  <th className="pb-3 text-center">M3: Energía</th>
                  <th className="pb-3 text-center">Evidencias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {students.map((student) => {
                  const m1 = student.missions.find((m) => m.code === 'm1');
                  const m2 = student.missions.find((m) => m.code === 'm2');
                  const m3 = student.missions.find((m) => m.code === 'm3');

                  return (
                    <tr key={student.id} className="hover:bg-white/2 transition">
                      <td className="py-3.5 pl-2 font-bold text-white">
                        <div>
                          <span>{student.displayName}</span>
                          <span className="block text-[11px] font-normal text-slate-400">
                            @{student.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center font-extrabold text-slate-300">
                        {student.level}
                      </td>
                      <td className="py-3.5 text-center font-extrabold text-mint-300">
                        {student.totalXP}
                      </td>
                      <td className="py-3.5 text-center">
                        {m1 ? <MissionStatusBadge status={m1.status} /> : <span className="text-slate-600">-</span>}
                      </td>
                      <td className="py-3.5 text-center">
                        {m2 ? <MissionStatusBadge status={m2.status} /> : <span className="text-slate-600">-</span>}
                      </td>
                      <td className="py-3.5 text-center">
                        {m3 ? <MissionStatusBadge status={m3.status} /> : <span className="text-slate-600">-</span>}
                      </td>
                      <td className="py-3.5 text-center">
                        {student.pendingEvidence > 0 ? (
                          <Chip tone="rose">{student.pendingEvidence} pendiente(s)</Chip>
                        ) : (
                          <Chip tone="neutral">Al día</Chip>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
      </section>
    </div>
  );
}
