import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import {
  activitiesApi,
  classroomsApi,
  evidenceApi,
  missionsApi,
  progressApi,
  quizApi
} from './api';
import type { Evidence, EvidenceLevel } from './types';

export const queryKeys = {
  missions: ['missions'] as const,
  mission: (code: string) => ['mission', code] as const,
  progress: ['progress', 'me'] as const,
  myEvidence: ['evidence', 'me'] as const,
  classrooms: ['classrooms'] as const,
  classroom: (id: string) => ['classroom', id] as const,
  classroomEvidence: (id: string) => ['classroom', id, 'evidence'] as const,
  quiz: (code: string) => ['quiz', code] as const,
  attempts: (quizId: string) => ['quiz', quizId, 'attempts'] as const
};

function useInvalidateStudentData() {
  const client = useQueryClient();
  return async (missionCode?: string) => {
    await Promise.all([
      client.invalidateQueries({ queryKey: queryKeys.missions }),
      client.invalidateQueries({ queryKey: queryKeys.progress }),
      client.invalidateQueries({ queryKey: queryKeys.myEvidence }),
      ...(missionCode ? [client.invalidateQueries({ queryKey: queryKeys.mission(missionCode) })] : [])
    ]);
  };
}

export function useMissions() {
  return useQuery({ queryKey: queryKeys.missions, queryFn: missionsApi.list });
}

export function useMission(code: string | undefined) {
  return useQuery({
    queryKey: queryKeys.mission(code ?? ''),
    queryFn: () => missionsApi.detail(code!),
    enabled: Boolean(code)
  });
}

export function useProgress() {
  return useQuery({ queryKey: queryKeys.progress, queryFn: progressApi.me });
}

export function useMyEvidence() {
  return useQuery({ queryKey: queryKeys.myEvidence, queryFn: evidenceApi.mine });
}

export function useClassrooms() {
  return useQuery({ queryKey: queryKeys.classrooms, queryFn: classroomsApi.list });
}

export function useClassroomDashboard(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.classroom(id ?? ''),
    queryFn: () => classroomsApi.dashboard(id!),
    enabled: Boolean(id)
  });
}

export function useClassroomEvidence(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.classroomEvidence(id ?? ''),
    queryFn: () => evidenceApi.byClassroom(id!),
    enabled: Boolean(id)
  });
}

export function useQuiz(code: string | undefined) {
  return useQuery({
    queryKey: queryKeys.quiz(code ?? ''),
    queryFn: () => quizApi.byMission(code!),
    enabled: Boolean(code)
  });
}

export function useAttempts(quizId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.attempts(quizId ?? ''),
    queryFn: () => quizApi.attempts(quizId!),
    enabled: Boolean(quizId)
  });
}

export function useStartMission(code: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => missionsApi.start(code),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: queryKeys.missions });
      client.invalidateQueries({ queryKey: queryKeys.mission(code) });
      client.invalidateQueries({ queryKey: queryKeys.progress });
    }
  });
}

export function useCompleteActivity(missionCode: string) {
  const invalidate = useInvalidateStudentData();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      activitiesApi.complete(id, payload),
    onSuccess: () => invalidate(missionCode)
  });
}

export function useSaveEvidence(missionCode: string) {
  const invalidate = useInvalidateStudentData();
  return useMutation({
    mutationFn: (input: { missionId: string; activityId: string; text?: string; linkUrl?: string; type?: string }) =>
      evidenceApi.save(input),
    onSuccess: () => invalidate(missionCode)
  });
}

export function useSubmitEvidence(missionCode: string) {
  const invalidate = useInvalidateStudentData();
  return useMutation({
    mutationFn: (id: string) => evidenceApi.submit(id),
    onSuccess: () => invalidate(missionCode)
  });
}

export function useStartQuiz() {
  return useMutation({
    mutationFn: (quizId: string) => quizApi.start(quizId)
  });
}

export function useSubmitQuiz(missionCode: string) {
  const invalidate = useInvalidateStudentData();
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      quizId,
      attemptId,
      answers
    }: {
      quizId: string;
      attemptId: string;
      answers: Array<{ questionId: string; selected: string[] }>;
    }) => quizApi.submit(quizId, attemptId, answers),
    onSuccess: async (_data, variables) => {
      await invalidate(missionCode);
      client.invalidateQueries({ queryKey: queryKeys.attempts(variables.quizId) });
    }
  });
}

export function useReviewEvidence(classroomId: string | undefined) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      teacherScore,
      feedback
    }: {
      id: string;
      status: 'approved' | 'changes_requested';
      teacherScore: EvidenceLevel;
      feedback: string;
    }) => evidenceApi.review(id, { status, teacherScore, feedback }),
    onSuccess: async () => {
      if (classroomId) {
        await Promise.all([
          client.invalidateQueries({ queryKey: queryKeys.classroomEvidence(classroomId) }),
          client.invalidateQueries({ queryKey: queryKeys.classroom(classroomId) })
        ]);
      }
    }
  });
}

export function evidenceForActivity(evidence: Evidence[] | undefined, activityId: string | undefined) {
  if (!evidence || !activityId) return undefined;
  return evidence.find((item) => String(item.activityId) === activityId);
}
