import {
  ArrowLeft,
  BookOpenCheck,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  Eye,
  GraduationCap,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  Users
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button, Card, Chip, ErrorBlock, LoadingBlock, SectionHeading, StatCard } from '../../components/ui';
import { AnimatedList, SpotlightCard } from '../../components/reactbits';
import { api, classroomsApi, missionsApi } from '../../lib/api';
import type { MissionSummary, User } from '../../lib/types';

export function AdminPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const [usersRes, classroomsRes, missionsRes] = await Promise.all([
        api.get<{ users: User[] } | User[]>('/users').catch(() => []),
        classroomsApi.list().catch(() => []),
        missionsApi.list().catch(() => [])
      ]);

      const userList = Array.isArray(usersRes)
        ? usersRes
        : (usersRes as { users?: User[] })?.users ?? [];
      return { users: userList, classrooms: classroomsRes, missions: missionsRes as MissionSummary[] };
    }
  });

  const users = data?.users ?? [];
  const classrooms = data?.classrooms ?? [];
  const missions = data?.missions ?? [];

  if (isLoading) return <LoadingBlock message="Cargando consola de administración…" />;
  if (isError) return <ErrorBlock message="No pudimos cargar la información de administración." onRetry={() => refetch()} />;

  const studentCount = users.filter((u) => u.role === 'student').length;
  const teacherCount = users.filter((u) => u.role === 'teacher').length;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al inicio
        </Link>
        <Chip tone="gold">
          <ShieldCheck className="size-3.5" aria-hidden />
          Panel de Administración
        </Chip>
      </div>

      {/* Header */}
      <section className="glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Consola de Control</p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Gestión Institucional de Laboratorio 360 La Célula
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administra usuarios, docentes, grupos escolares y el catálogo de misiones de indagación.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => refetch()}>
          <RefreshCw className="size-4" aria-hidden />
          Actualizar datos
        </Button>
      </section>

      {/* Quick Verification Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-mint-400/20 bg-mint-400/6 p-3">
        <div className="flex items-center gap-2 text-xs font-bold text-mint-300 mr-2">
          <Sparkles className="size-4" aria-hidden />
          <span>Vistas de Verificación Directa:</span>
        </div>
        <Link
          to="/estudiante"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/12"
        >
          <Compass className="size-3.5 text-mint-400" aria-hidden />
          Misiones (Estudiante)
        </Link>
        <Link
          to="/logros"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/12"
        >
          <Trophy className="size-3.5 text-amber-300" aria-hidden />
          Vitrina de Logros
        </Link>
        <Link
          to="/docente"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/12"
        >
          <BookOpenCheck className="size-3.5 text-sky-400" aria-hidden />
          Panel de Aulas (Docente)
        </Link>
        <Link
          to="/docente/evidencias"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/12"
        >
          <ClipboardCheck className="size-3.5 text-violet-400" aria-hidden />
          Revisión de Evidencias
        </Link>
        <Link
          to="/docente/reportes"
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/12"
        >
          <ChartNoAxesColumnIncreasing className="size-3.5 text-emerald-400" aria-hidden />
          Reportes Docentes
        </Link>
      </div>

      {/* Summary stats */}
      <AnimatedList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Estudiantes"
          value={studentCount}
          hint="Cuentas activas de 5.º"
          icon={UserRound}
          accent="#58e6c5"
        />
        <StatCard
          label="Docentes"
          value={teacherCount}
          hint="Profesores facilitadores"
          icon={GraduationCap}
          accent="#7dd3fc"
        />
        <StatCard
          label="Aulas creadas"
          value={classrooms.length}
          hint="Grupos de ciencias"
          icon={Users}
          accent="#fbbf24"
        />
        <StatCard
          label="Misiones activas"
          value="3 de 3"
          hint="M1, M2 y M3 publicadas"
          icon={CheckCircle2}
          accent="#a78bfa"
        />
      </AnimatedList>

      {/* Content Verification Section */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Verificación de Contenidos"
          title="Misiones, Fases y Actividades de Indagación"
          description="Accede directamente a cada misión, recorre sus fases (Inicio, Desarrollo, Cierre) y prueba sus actividades interactivas para verificar su correcto funcionamiento."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {missions.map((mission) => (
            <SpotlightCard
              key={mission._id}
              spotlightColor={`${mission.theme?.accent ?? '#58e6c5'}25`}
              borderColor={`${mission.theme?.accent ?? '#58e6c5'}40`}
              className="flex flex-col justify-between p-6 space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="grid size-10 place-items-center rounded-xl text-xl"
                      style={{
                        background: `${mission.theme?.accent ?? '#58e6c5'}20`,
                        border: `1px solid ${mission.theme?.accent ?? '#58e6c5'}40`
                      }}
                    >
                      {mission.theme?.icon ?? '🔬'}
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Misión {mission.order} · {mission.code.toUpperCase()}
                      </span>
                      <h3 className="font-display text-base font-bold text-white leading-tight">
                        {mission.title}
                      </h3>
                    </div>
                  </div>
                  <Chip tone="mint">Activa</Chip>
                </div>

                <p className="text-xs font-semibold leading-relaxed" style={{ color: mission.theme?.accent ?? '#58e6c5' }}>
                  {mission.bigQuestion}
                </p>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {mission.description}
                </p>

                {/* Phases Pill Navigation */}
                <div className="space-y-1.5 pt-2 border-t border-white/8">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    Fases disponibles:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-center">
                    <Link
                      to={`/misiones/${mission.code}/inicio`}
                      className="rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-[11px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Fase 1: Inicio"
                    >
                      1. Inicio
                    </Link>
                    <Link
                      to={`/misiones/${mission.code}/desarrollo`}
                      className="rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-[11px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Fase 2: Desarrollo"
                    >
                      2. Desarrollo
                    </Link>
                    <Link
                      to={`/misiones/${mission.code}/cierre`}
                      className="rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-[11px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Fase 3: Cierre"
                    >
                      3. Cierre
                    </Link>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/8">
                <Link
                  to={`/misiones/${mission.code}`}
                  className="flex min-h-10 items-center justify-center gap-2 rounded-xl bg-mint-400 px-4 text-xs font-extrabold text-ink-950 transition hover:bg-mint-300 shadow-md"
                >
                  <Eye className="size-4" aria-hidden />
                  Ver Estación Completa
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to={`/misiones/${mission.code}/quiz`}
                    className="flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-2 text-xs font-bold text-amber-300 transition hover:bg-amber-400/20"
                  >
                    <Trophy className="size-3.5" aria-hidden />
                    Probar Quiz
                  </Link>
                  <Link
                    to="/estudiante"
                    className="flex min-h-9 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/4 px-2 text-xs font-bold text-slate-300 transition hover:bg-white/8 hover:text-white"
                  >
                    <Play className="size-3.5" aria-hidden />
                    Ver en Mapa
                  </Link>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Classrooms List */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Aulas Escolares"
          title="Grupos y Aulas Registradas"
          description="Aulas de clase donde se aplican las misiones de indagación sobre la célula."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classrooms.map((c) => (
            <SpotlightCard key={c._id} spotlightColor="#7dd3fc" className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{c.name}</h3>
                  <p className="text-xs text-slate-400">{c.school} · {c.grade}</p>
                </div>
                <Chip tone="mint">Código: {c.code}</Chip>
              </div>
              <div className="pt-2 border-t border-white/8 text-xs text-slate-500 flex justify-between">
                <span>Año lectivo: {c.academicYear}</span>
                <span>{c.teacherIds?.length ?? 1} docente(s)</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Users List */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Usuarios del Sistema"
          title="Directorio de Cuentas"
          description="Estudiantes, docentes y administradores registrados en la plataforma."
        />

        <Card className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 font-extrabold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Usuario</th>
                <th className="pb-3">Nombre</th>
                <th className="pb-3 text-center">Rol</th>
                <th className="pb-3 text-center">Avatar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/2 transition">
                  <td className="py-3 pl-2 font-bold text-white">@{u.username}</td>
                  <td className="py-3 text-slate-300 font-semibold">{u.displayName}</td>
                  <td className="py-3 text-center">
                    <Chip
                      tone={
                        u.role === 'admin'
                          ? 'gold'
                          : u.role === 'teacher'
                          ? 'sky'
                          : 'mint'
                      }
                    >
                      {u.role === 'admin'
                        ? 'Administrador'
                        : u.role === 'teacher'
                        ? 'Docente'
                        : 'Estudiante'}
                    </Chip>
                  </td>
                  <td className="py-3 text-center text-slate-400">{u.avatarKey}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
