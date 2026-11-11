import type { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roleHome, useAuth } from '../../contexts/AuthContext';
import type { Role } from '../../lib/types';
import { LoadingBlock } from '../ui';

export function ProtectedRoute({ roles }: { roles?: Role[] }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return (
      <div className="min-h-dvh px-4">
        <LoadingBlock message="Preparando tu laboratorio…" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={roleHome(user.role)} replace />;
  }

  return <Outlet />;
}

export function RoleGate({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { user, status } = useAuth();
  if (status === 'loading') return <LoadingBlock />;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to={roleHome(user.role)} replace />;
  return <>{children}</>;
}
