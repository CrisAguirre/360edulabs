import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Chip, ErrorBlock, LoadingBlock, SectionHeading, StatCard } from '../../components/ui';
import { AnimatedList, SpotlightCard } from '../../components/reactbits';
import { api, classroomsApi } from '../../lib/api';
import type { Classroom, User } from '../../lib/types';

export function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, classroomsRes] = await Promise.all([
        api.get<{ users: User[] } | User[]>('/users').catch(() => []),
        classroomsApi.list().catch(() => [])
      ]);

      const userList = Array.isArray(usersRes)
        ? usersRes
        : (usersRes as { users?: User[] })?.users ?? [];
      setUsers(userList);
      setClassrooms(classroomsRes);
    } catch {
      setError('No pudimos cargar la información de administración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <LoadingBlock message="Cargando consola de administración…" />;
  if (error) return <ErrorBlock message={error} onRetry={loadData} />;

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
            Gestión Institucional de CitoIndagar 360
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Administra usuarios, docentes, grupos escolares y el catálogo de misiones de indagación.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={loadData}>
          <RefreshCw className="size-4" aria-hidden />
          Actualizar datos
        </Button>
      </section>

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
