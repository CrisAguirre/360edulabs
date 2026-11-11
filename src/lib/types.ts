export type Role = 'student' | 'teacher' | 'admin';
export type PhaseKey = 'inicio' | 'desarrollo' | 'cierre';
export type MissionStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface User {
  id: string;
  username: string;
  displayName: string;
  role: Role;
  avatarKey: string;
}

export interface ApiEnvelope<T> {
  data: T;
  meta?: { requestId?: string };
}

export interface ProgressView {
  status: MissionStatus;
  currentPhase: PhaseKey;
  xpEarned: number;
  bestQuizPercentage: number;
  completedActivities: number;
  totalActivities: number;
  startedAt?: string | null;
  completedAt?: string | null;
}

export interface MissionTheme {
  accent: string;
  soft: string;
  icon: string;
}

export interface MissionPhase {
  key: PhaseKey;
  title: string;
  description: string;
  order: number;
}

export interface MissionSummary {
  _id: string;
  code: string;
  order: number;
  title: string;
  subtitle: string;
  bigQuestion: string;
  description: string;
  objectives: string[];
  phases: MissionPhase[];
  badgeCode: string;
  estimatedMinutes: number;
  status: string;
  version: number;
  theme: MissionTheme;
  progress: ProgressView;
}

export type ActivityType =
  | 'video360'
  | 'reading'
  | 'model3d'
  | 'animation3d'
  | 'animation2d'
  | 'ar_cube'
  | 'quiver'
  | 'infographic'
  | 'evidence'
  | 'quiz'
  | 'lab';

export type CompletionRule =
  | { type: 'confirm'; label?: string }
  | { type: 'video_progress'; min: number }
  | { type: 'faces_explored'; min: number }
  | { type: 'evidence_submitted' }
  | { type: 'quiz_passed' };

export interface Activity {
  _id: string;
  missionId: string;
  phase: PhaseKey;
  type: ActivityType;
  order: number;
  title: string;
  instructions: string;
  required: boolean;
  completionRule: CompletionRule;
  content: Record<string, any>;
  assetKeys: string[];
  xp: number;
  status?: 'pending' | 'completed';
}

export interface MissionDetail extends MissionSummary {
  activities: Activity[];
}

/**
 * El backend entrega las insignias del progreso de forma plana
 * ({ code, name, icon, awardedAt }). El endpoint /badges/me las entrega
 * con badgeId poblado. Soportamos ambas formas para poder reutilizar el
 * mismo componente en toda la app.
 */
export interface AwardedBadge {
  _id?: string;
  id?: string;
  awardedAt: string;
  source?: string;
  code?: string;
  name?: string;
  description?: string;
  icon?: string;
  xpBonus?: number;
  badgeId?: {
    _id: string;
    code: string;
    name: string;
    description: string;
    icon: string;
    xpBonus: number;
  };
}

export interface ProgressSummary {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  missions: MissionSummary[];
  badges: AwardedBadge[];
}

export type EvidenceStatus = 'draft' | 'submitted' | 'approved' | 'changes_requested';
export type EvidenceLevel = 'bajo' | 'basico' | 'alto' | 'superior';

export interface Evidence {
  _id: string;
  studentId: string | { _id: string; displayName: string; username: string; avatarKey?: string };
  missionId: string | { _id: string; code: string; title: string };
  activityId: string;
  type: 'text' | 'image' | 'link' | 'lab';
  text: string;
  linkUrl: string;
  status: EvidenceStatus;
  teacherScore: EvidenceLevel | null;
  feedback: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  revisions: Array<{ text: string; linkUrl: string; createdAt: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'true_false';
  text: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  missionId: string;
  title: string;
  passScore: number;
  questions: QuizQuestion[];
}

export interface GradedAnswer {
  questionId: string;
  selected: string[];
  correctAnswers: string[];
  correct: boolean;
  feedback: string;
}

export interface QuizResult {
  attemptId: string;
  attemptNumber: number;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  durationSeconds: number;
  graded: GradedAnswer[];
  bestQuizPercentage: number;
}

export interface QuizAttempt {
  _id: string;
  quizId: string;
  studentId: string;
  attemptNumber: number;
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: string;
  submittedAt: string | null;
  durationSeconds: number;
}

export interface Classroom {
  _id: string;
  name: string;
  code: string;
  grade: string;
  school: string;
  academicYear: string;
  teacherIds: string[];
}

export interface StudentRow {
  id: string;
  displayName: string;
  username: string;
  avatarKey: string;
  totalXP: number;
  level: number;
  completedMissions: number;
  currentMission: { code: string; title: string; order: number } | null;
  pendingEvidence: number;
  missions: Array<{ code: string; status: MissionStatus; xp: number }>;
}

export interface ClassroomDashboard {
  classroom: {
    id: string;
    name: string;
    code: string;
    grade: string;
    school: string;
    academicYear: string;
  };
  summary: {
    totalStudents: number;
    averageXP: number;
    completionRate: number;
    pendingEvidence: number;
  };
  missions: Array<{ code: string; title: string; order: number }>;
  students: StudentRow[];
}

export interface ZipSeed {
  code: string;
  name: string;
  description: string;
  icon: string;
  xpBonus: number;
}
