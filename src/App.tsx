import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './contexts/AuthContext';
import { AdminPage } from './features/admin/AdminPage';
import { LoginPage } from './features/auth/LoginPage';
import { LandingPage } from './features/landing/LandingPage';
import { ActivityPage } from './features/missions/ActivityPage';
import { MissionDetailPage } from './features/missions/MissionDetailPage';
import { QuizPage } from './features/quiz/QuizPage';
import { LogrosPage } from './features/student/LogrosPage';
import { StudentHome } from './features/student/StudentHome';
import { TeacherDashboard } from './features/teacher/TeacherDashboard';
import { TeacherEvidencePage } from './features/teacher/TeacherEvidencePage';
import { TeacherReportsPage } from './features/teacher/TeacherReportsPage';
import { queryClient } from './lib/queryClient';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Authenticated routes inside AppShell */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  {/* Student routes */}
                  <Route path="/estudiante" element={<StudentHome />} />
                  <Route path="/logros" element={<LogrosPage />} />
                  <Route path="/misiones/:codigo" element={<MissionDetailPage />} />
                  <Route path="/misiones/:codigo/:phase" element={<MissionDetailPage />} />
                  <Route path="/misiones/:codigo/actividades/:activityId" element={<ActivityPage />} />
                  <Route path="/misiones/:codigo/quiz" element={<QuizPage />} />

                  {/* Teacher routes */}
                  <Route element={<ProtectedRoute roles={['teacher', 'admin']} />}>
                    <Route path="/docente" element={<TeacherDashboard />} />
                    <Route path="/docente/aulas/:id" element={<TeacherDashboard />} />
                    <Route path="/docente/evidencias" element={<TeacherEvidencePage />} />
                    <Route path="/docente/reportes" element={<TeacherReportsPage />} />
                    <Route path="/docente/misiones" element={<StudentHome />} />
                  </Route>

                  {/* Admin routes */}
                  <Route element={<ProtectedRoute roles={['admin']} />}>
                    <Route path="/admin" element={<AdminPage />} />
                  </Route>
                </Route>
              </Route>

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
