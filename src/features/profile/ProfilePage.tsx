import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Calendar,
  CameraOff,
  CheckCircle2,
  Compass,
  GraduationCap,
  Info,
  LayoutDashboard,
  Lock,
  RotateCcw,
  Save,
  School,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  UserCheck
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CitoMascot } from '../../components/Cito';
import { SpotlightCard } from '../../components/reactbits';
import { Avatar, Button, Chip } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateProfile, useUserProfile } from '../../lib/queries';
import { cn } from '../../lib/utils';

const roleLabels = {
  student: 'Estudiante',
  teacher: 'Docente de Ciencias Naturales',
  admin: 'Administrador del Laboratorio'
};

export function ProfilePage() {
  const { user: authUser, updateUser } = useAuth();
  const { data: profileUser, isLoading: isLoadingProfile } = useUserProfile();
  const updateMutation = useUpdateProfile();
  const toast = useToast();
  const navigate = useNavigate();

  const user = profileUser ?? authUser;

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [prevUserDisplayName, setPrevUserDisplayName] = useState(user?.displayName);
  const [error, setError] = useState<string | null>(null);

  if (user?.displayName && user.displayName !== prevUserDisplayName) {
    setPrevUserDisplayName(user.displayName);
    setDisplayName(user.displayName);
  }

  const originalName = user?.displayName ?? '';
  const isDirty = displayName.trim() !== originalName;
  const isTooShort = displayName.trim().length > 0 && displayName.trim().length < 2;
  const isTooLong = displayName.trim().length > 80;
  const isValid = !isTooShort && !isTooLong && displayName.trim().length >= 2;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid || !isDirty || updateMutation.isPending) return;

    try {
      setError(null);
      const updated = await updateMutation.mutateAsync({ displayName: displayName.trim() });
      updateUser({ displayName: updated.displayName });
      toast.success('¡Perfil actualizado! Tus datos se guardaron correctamente.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo actualizar tu perfil';
      setError(message);
      toast.error(message);
    }
  };

  const handleReset = () => {
    setDisplayName(originalName);
    setError(null);
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Ciclo escolar 2026';

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Botón superior de regreso inteligente */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-bold text-slate-300 backdrop-blur-md transition hover:border-mint-400/40 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Volver
        </button>

        <div className="flex items-center gap-2">
          <Chip tone={user?.role === 'admin' ? 'mint' : user?.role === 'teacher' ? 'sky' : 'gold'}>
            {user ? roleLabels[user.role] : 'Usuario'}
          </Chip>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-extrabold text-emerald-300">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            Cuenta Activa
          </span>
        </div>
      </div>

      {/* Hero Banner con Cito Mascot */}
      <SpotlightCard className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-900/90 via-ink-950/80 to-surface-900/90 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex flex-col-reverse items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-mint-400/30 bg-mint-400/10 px-3 py-1 text-xs font-extrabold text-mint-300">
              <Sparkles className="size-3.5 text-mint-300" />
              Centro de Usuario · Laboratorio 360
            </div>

            <h1 className="font-display text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              Perfil de <span className="text-mint-300">{user?.displayName || 'Investigador'}</span>
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {user?.role === 'student' &&
                '¡Hola, explorador(a)! Aquí puedes consultar la información de tu cuenta escolar y actualizar tu nombre para mostrar en bitácoras, evidencias e insignias.'}
              {user?.role === 'teacher' &&
                '¡Hola, Profe! En este espacio puedes gestionar tu información personal como docente de Ciencias Naturales y revisar los datos de tus aulas.'}
              {user?.role === 'admin' &&
                'Panel del Administrador de la plataforma. Puedes editar tu nombre o ingresar a la consola de administración del laboratorio.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <UserCheck className="size-4 text-mint-400" />
                Usuario: <span className="font-mono text-slate-200">@{user?.username}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-sky-400" />
                Registrado: <span className="text-slate-200">{joinedDate}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CitoMascot size={110} mood="happy" />
            <span className="rounded-full bg-mint-400/15 px-3 py-0.5 text-[11px] font-extrabold text-mint-300 border border-mint-400/30">
              Cito Guía
            </span>
          </div>
        </div>
      </SpotlightCard>

      {/* Grid Principal: Datos de la Cuenta y Formulario de Edición */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Columna Izquierda: Tarjetas de Información del Usuario */}
        <div className="space-y-6 lg:col-span-1">
          {/* Tarjeta de Identidad y Rol */}
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-5 backdrop-blur-md space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-300">
              <User className="size-4 text-mint-400" />
              Datos de Cuenta
            </h2>

            <div className="flex items-center gap-3.5 rounded-xl border border-white/6 bg-white/4 p-3.5">
              <Avatar name={displayName || user?.displayName || 'Cito'} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-extrabold text-white">{displayName || user?.displayName}</p>
                <p className="font-mono text-xs text-mint-300 truncate">@{user?.username}</p>
                <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {user ? roleLabels[user.role] : ''}
                </span>
              </div>
            </div>

            {/* Aviso especial: Sin fotografía por ahora */}
            <div className="rounded-xl border border-sky-400/20 bg-sky-400/5 p-3.5 space-y-1.5 text-xs text-sky-200/90">
              <div className="flex items-center gap-1.5 font-bold text-sky-300">
                <CameraOff className="size-4 shrink-0 text-sky-400" />
                Fotografía no disponible
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Por políticas de privacidad y protección de menores en 5.º de primaria, la carga de fotografías está desactivada por ahora. Tu avatar científico se genera automáticamente.
              </p>
            </div>
          </div>

          {/* Tarjeta de Institución o Aula */}
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-5 backdrop-blur-md space-y-3.5">
            <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-300">
              <School className="size-4 text-sky-400" />
              Institución y Aula
            </h2>

            {user?.role === 'student' && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Aula asignada:</span>
                  <span className="font-bold text-white">{user.classroom?.name || '5.º A - Exploradores'}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Código de clase:</span>
                  <span className="font-mono font-bold text-mint-300">{user.classroom?.code || 'CITO5A'}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Grado:</span>
                  <span className="font-bold text-white">{user.classroom?.grade || '5.º de primaria'}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Colegio:</span>
                  <span className="font-bold text-slate-200 truncate max-w-40 text-right">
                    {user.classroom?.school || 'Colegio Horizonte'}
                  </span>
                </div>
              </div>
            )}

            {user?.role === 'teacher' && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Rol académico:</span>
                  <span className="font-bold text-sky-300">Docente Titular</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Aulas a cargo:</span>
                  <span className="font-bold text-white">
                    {user.classrooms?.length ? `${user.classrooms.length} aula(s)` : '5.º A - Exploradores'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Código para alumnos:</span>
                  <span className="font-mono font-bold text-mint-300">
                    {user.classrooms?.[0]?.code || 'CITO5A'}
                  </span>
                </div>
              </div>
            )}

            {user?.role === 'admin' && (
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Nivel de acceso:</span>
                  <span className="font-bold text-mint-300">Administrador Total</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-white/4 p-2.5">
                  <span className="text-slate-400">Ámbito:</span>
                  <span className="font-bold text-white">Todas las Aulas y Misiones</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha: Formulario de Edición y Accesos Rápidos */}
        <div className="space-y-6 lg:col-span-2">
          {/* Formulario de Edición de Perfil */}
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-md space-y-6">
            <div className="border-b border-white/8 pb-4">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="size-5 text-mint-400" />
                Editar Datos Personales
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Actualiza cómo deseas que aparezca tu nombre en reportes, evidencias y actividades del laboratorio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo Nombre Completo */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="displayName" className="block text-xs font-extrabold uppercase tracking-wide text-slate-300">
                    Nombre completo o para mostrar <span className="text-mint-400">*</span>
                  </label>
                  <span className={cn('text-[11px] font-mono', displayName.length > 80 ? 'text-rose-400 font-bold' : 'text-slate-500')}>
                    {displayName.length}/80
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => {
                      setDisplayName(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Ej. Sofía Rojas o Profe Camila Torres"
                    disabled={updateMutation.isPending || isLoadingProfile}
                    className={cn(
                      'w-full rounded-xl border bg-ink-950/80 px-4 py-3 text-sm font-semibold text-white placeholder-slate-500 transition',
                      'focus:outline-none focus:ring-2 focus:ring-mint-400/50',
                      isTooShort || isTooLong || error
                        ? 'border-rose-500/60 focus:border-rose-400'
                        : 'border-white/12 focus:border-mint-400/80'
                    )}
                  />
                  {isValid && isDirty && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mint-400" title="Nombre válido">
                      <CheckCircle2 className="size-4.5" />
                    </div>
                  )}
                </div>

                {isTooShort && (
                  <p className="text-xs font-semibold text-rose-400">
                    El nombre debe tener al menos 2 caracteres.
                  </p>
                )}
                {isTooLong && (
                  <p className="text-xs font-semibold text-rose-400">
                    El nombre no puede superar los 80 caracteres.
                  </p>
                )}
                {error && (
                  <p className="text-xs font-semibold text-rose-400">
                    {error}
                  </p>
                )}

                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Info className="size-3.5 text-slate-500 shrink-0" />
                  Este nombre se utiliza para identificar tus respuestas y registros científicos.
                </p>
              </div>

              {/* Campo Nombre de Usuario (Solo lectura / Protegido) */}
              <div className="space-y-2 opacity-80">
                <label htmlFor="username" className="block text-xs font-extrabold uppercase tracking-wide text-slate-400 flex items-center gap-1.5">
                  <Lock className="size-3 text-slate-500" />
                  Nombre de usuario en plataforma (No editable)
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    value={user?.username ? `@${user.username}` : ''}
                    disabled
                    className="w-full cursor-not-allowed rounded-xl border border-white/8 bg-white/4 px-4 py-3 font-mono text-sm text-slate-400 focus:outline-none select-none"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" title="Usuario bloqueado por seguridad escolar">
                    <Lock className="size-4" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500">
                  El identificador de usuario es fijado por el docente o administración y no puede modificarse.
                </p>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/8">
                {isDirty && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={handleReset}
                    disabled={updateMutation.isPending}
                    className="text-xs"
                  >
                    <RotateCcw className="size-4 mr-1.5" />
                    Restablecer
                  </Button>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={!isValid || !isDirty || updateMutation.isPending}
                  loading={updateMutation.isPending}
                  className="min-w-36"
                >
                  <Save className="size-4 mr-2" />
                  {updateMutation.isPending ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </div>
            </form>
          </div>

          {/* Accesos Rápidos según el Rol */}
          <div className="rounded-2xl border border-white/10 bg-ink-900/60 p-6 backdrop-blur-md space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Compass className="size-4 text-mint-400" />
              Accesos Rápidos del Laboratorio
            </h2>

            {user?.role === 'student' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  to="/estudiante"
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-mint-400/40 hover:bg-mint-400/8 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-mint-400/15 text-mint-300 group-hover:scale-105 transition-transform">
                      <Compass className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-mint-300 transition-colors">
                        Sesiones de Indagación
                      </h3>
                      <p className="text-xs text-slate-400">Ir a Misiones M1, M2 y M3</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-slate-500 group-hover:text-mint-400 group-hover:translate-x-0.5 transition" />
                </Link>

                <Link
                  to="/logros"
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-amber-400/40 hover:bg-amber-400/8 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-amber-400/15 text-amber-300 group-hover:scale-105 transition-transform">
                      <Trophy className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        Mis Logros
                      </h3>
                      <p className="text-xs text-slate-400">Vitrina de Insignias y Puntos</p>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition" />
                </Link>
              </div>
            )}

            {user?.role === 'teacher' && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Link
                  to="/docente"
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-mint-400/40 hover:bg-mint-400/8 group"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-mint-400/15 text-mint-300">
                    <LayoutDashboard className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-mint-300">Panel de Aulas</h3>
                    <p className="text-[11px] text-slate-400">Progreso general de 5.º A</p>
                  </div>
                </Link>

                <Link
                  to="/docente/evidencias"
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-sky-400/40 hover:bg-sky-400/8 group"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-sky-400/15 text-sky-300">
                    <GraduationCap className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-sky-300">Evidencias</h3>
                    <p className="text-[11px] text-slate-400">Calificar respuestas de indagación</p>
                  </div>
                </Link>

                <Link
                  to="/docente/reportes"
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-white/4 p-4 transition hover:border-violet-400/40 hover:bg-violet-400/8 group"
                >
                  <div className="grid size-9 place-items-center rounded-lg bg-violet-400/15 text-violet-300">
                    <BookOpenCheck className="size-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-violet-300">Reportes</h3>
                    <p className="text-[11px] text-slate-400">Métricas y exportación de notas</p>
                  </div>
                </Link>
              </div>
            )}

            {user?.role === 'admin' && (
              <div>
                <Link
                  to="/admin"
                  className="flex items-center justify-between rounded-xl border border-mint-400/30 bg-mint-400/10 p-4 transition hover:border-mint-400/60 hover:bg-mint-400/15 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-mint-400 text-ink-950 shadow-md">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white group-hover:text-mint-300">
                        Consola de Administración
                      </h3>
                      <p className="text-xs text-slate-300">
                        Gestionar usuarios, restablecer datos, simular misiones y verificar el estado del sistema.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="size-5 text-mint-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}