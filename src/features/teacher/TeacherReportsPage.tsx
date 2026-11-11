import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Printer,
  Trophy,
  Users,
  BookOpenCheck
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Chip, EmptyState, ErrorBlock, LoadingBlock, SectionHeading, StatCard } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { useClassroomDashboard, useClassrooms } from '../../lib/queries';
import { cn } from '../../lib/utils';

export function TeacherReportsPage() {
  const classroomsQuery = useClassrooms();
  const [selectedClassroomId, setSelectedClassroomId] = useState<string | null>(null);
  const toast = useToast();

  const classrooms = classroomsQuery.data ?? [];
  const activeClassroomId = selectedClassroomId ?? classrooms[0]?._id;

  const dashboardQuery = useClassroomDashboard(activeClassroomId);

  if (classroomsQuery.isLoading || dashboardQuery.isLoading) {
    return <LoadingBlock message="Generando reporte académico del aula…" />;
  }

  if (classroomsQuery.isError || classrooms.length === 0) {
    return (
      <ErrorBlock
        title="Sin aulas disponibles"
        message="No se encontraron aulas asociadas a tu cuenta."
      />
    );
  }

  const dashboard = dashboardQuery.data;
  const students = dashboard?.students ?? [];

  const handleExportCSV = () => {
    if (!dashboard || students.length === 0) {
      toast.error('No hay datos para exportar.');
      return;
    }

    const headers = [
      'Estudiante',
      'Usuario',
      'Nivel',
      'Total XP',
      'M1 Teoría Celular',
      'M2 Partes y Célula',
      'M3 Energía y Metabolismo',
      'Evidencias Pendientes'
    ];

    const rows = students.map((s) => {
      const m1 = s.missions.find((m) => m.code === 'm1')?.status ?? 'sin iniciar';
      const m2 = s.missions.find((m) => m.code === 'm2')?.status ?? 'sin iniciar';
      const m3 = s.missions.find((m) => m.code === 'm3')?.status ?? 'sin iniciar';

      return [
        `"${s.displayName.replace(/"/g, '""')}"`,
        `"${s.username}"`,
        s.level,
        s.totalXP,
        `"${m1}"`,
        `"${m2}"`,
        `"${m3}"`,
        s.pendingEvidence
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `reporte_${dashboard.classroom.code}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Reporte descargado en formato CSV.');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div className="no-print flex items-center justify-between gap-4">
        <Link
          to="/docente"
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al panel docente
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handlePrint}>
            <Printer className="size-4" aria-hidden />
            Imprimir
          </Button>
          <Button variant="primary" size="sm" onClick={handleExportCSV}>
            <Download className="size-4" aria-hidden />
            Descargar CSV
          </Button>
        </div>
      </div>

      {/* Header */}
      <section className="glass rounded-3xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Reportes de Evaluación y Consejo de Aula</p>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Consolidado Académico {dashboard ? `· ${dashboard.classroom.name}` : ''}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Resumen de desempeño por estudiante según la estrategia pedagógica de indagación.
          </p>
        </div>

        <div className="no-print">
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
        </div>
      </section>

      {/* Summary Stats */}
      {dashboard ? (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Estudiantes"
            value={dashboard.summary.totalStudents}
            hint={`Grupo ${dashboard.classroom.grade}`}
            icon={Users}
            accent="#7dd3fc"
          />
          <StatCard
            label="Promedio XP"
            value={`${dashboard.summary.averageXP} XP`}
            hint="Rendimiento del grupo"
            icon={Trophy}
            accent="#fbbf24"
          />
          <StatCard
            label="Completitud"
            value={`${dashboard.summary.completionRate}%`}
            hint="Ruta de misiones"
            icon={CheckCircle2}
            accent="#58e6c5"
          />
          <StatCard
            label="Evidencias por calificar"
            value={dashboard.summary.pendingEvidence}
            hint="Revisión pendiente"
            icon={BookOpenCheck}
            accent="#f472b6"
          />
        </section>
      ) : null}

      {/* Academic Table */}
      <section className="space-y-4">
        <SectionHeading
          eyebrow="Trazabilidad por Estudiante"
          title="Sábana de Notas y Desempeño"
          description="Detalle del avance en las 3 misiones y evidencias registradas para el período académico."
        />

        {students.length === 0 ? (
          <EmptyState
            title="Sin datos en este grupo"
            description="No hay estudiantes registrados en esta aula."
          />
        ) : (
          <Card className="overflow-x-auto p-4 sm:p-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 font-extrabold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Estudiante</th>
                  <th className="pb-3 text-center">Nivel</th>
                  <th className="pb-3 text-center">XP</th>
                  <th className="pb-3 text-center">M1: Teoría</th>
                  <th className="pb-3 text-center">M2: Partes</th>
                  <th className="pb-3 text-center">M3: Energía</th>
                  <th className="pb-3 text-center">Desempeño MEN estimado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {students.map((student) => {
                  const m1 = student.missions.find((m) => m.code === 'm1');
                  const m2 = student.missions.find((m) => m.code === 'm2');
                  const m3 = student.missions.find((m) => m.code === 'm3');

                  const completedCount = student.completedMissions;
                  const estimatedMen =
                    completedCount === 3
                      ? { label: 'Superior', tone: 'mint' as const }
                      : completedCount === 2
                      ? { label: 'Alto', tone: 'sky' as const }
                      : completedCount === 1
                      ? { label: 'Básico', tone: 'gold' as const }
                      : { label: 'Bajo', tone: 'rose' as const };

                  return (
                    <tr key={student.id} className="hover:bg-white/2 transition">
                      <td className="py-3 pl-2 font-bold text-white">
                        <div>
                          <span>{student.displayName}</span>
                          <span className="block text-[10px] font-normal text-slate-500">
                            @{student.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-center font-bold text-slate-300">{student.level}</td>
                      <td className="py-3 text-center font-extrabold text-mint-300">{student.totalXP}</td>
                      <td className="py-3 text-center">
                        <span className={cn('font-bold', m1?.status === 'completed' ? 'text-mint-300' : 'text-slate-500')}>
                          {m1?.status === 'completed' ? '100%' : m1?.status === 'in_progress' ? 'En curso' : 'Sin iniciar'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={cn('font-bold', m2?.status === 'completed' ? 'text-mint-300' : 'text-slate-500')}>
                          {m2?.status === 'completed' ? '100%' : m2?.status === 'in_progress' ? 'En curso' : 'Sin iniciar'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className={cn('font-bold', m3?.status === 'completed' ? 'text-mint-300' : 'text-slate-500')}>
                          {m3?.status === 'completed' ? '100%' : m3?.status === 'in_progress' ? 'En curso' : 'Sin iniciar'}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <Chip tone={estimatedMen.tone}>{estimatedMen.label}</Chip>
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
