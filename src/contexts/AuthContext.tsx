import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react';
import type { SessionPayload } from '../lib/api';
import { authApi, refreshSession, setAccessToken } from '../lib/api';
import { queryClient } from '../lib/queryClient';
import type { User } from '../lib/types';

interface AuthContextValue {
  user: User | null;
  status: 'loading' | 'authenticated' | 'anonymous';
  login: (username: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

let bootstrapPromise: Promise<SessionPayload | null> | null = null;

function bootstrap() {
  if (!bootstrapPromise) {
    bootstrapPromise = refreshSession();
  }
  return bootstrapPromise;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'anonymous'>('loading');
  const expiredListener = useRef(false);

  useEffect(() => {
    let active = true;
    bootstrap().then((session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      setStatus(session ? 'authenticated' : 'anonymous');
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (expiredListener.current) return;
    expiredListener.current = true;
    const handleExpired = () => {
      setUser(null);
      setStatus('anonymous');
      queryClient.clear();
    };
    window.addEventListener('cito:session-expired', handleExpired);
    return () => window.removeEventListener('cito:session-expired', handleExpired);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const session = await authApi.login(username, password);
    queryClient.clear();
    setUser(session.user);
    setStatus('authenticated');
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined);
    queryClient.clear();
    setAccessToken(null);
    setUser(null);
    setStatus('anonymous');
  }, []);

  const refreshUser = useCallback(async () => {
    const session = await bootstrap();
    if (session) {
      setUser(session.user);
      setStatus('authenticated');
    }
  }, []);

  const value = useMemo(
    () => ({ user, status, login, logout, refreshUser }),
    [user, status, login, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}

export function roleHome(role: User['role'] | undefined) {
  if (role === 'teacher') return '/docente';
  if (role === 'admin') return '/admin';
  return '/estudiante';
}
