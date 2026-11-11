import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Trophy,
  XCircle
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CitoMascot } from '../../components/Cito';
import { Button, Card, Chip, ErrorBlock, LinkButton, LoadingBlock, ProgressBar } from '../../components/ui';
import { useToast } from '../../components/ui/Toast';
import { ApiError } from '../../lib/api';
import { celebrate } from '../../lib/celebrate';
import { useAttempts, useMission, useQuiz, useStartQuiz, useSubmitQuiz } from '../../lib/queries';
import type { QuizOption, QuizResult } from '../../lib/types';
import { cn, formatDate } from '../../lib/utils';

export function QuizPage() {
  const { codigo } = useParams<{ codigo: string }>();
  const toast = useToast();

  const missionQuery = useMission(codigo);
  const quizQuery = useQuiz(codigo);
  const startQuiz = useStartQuiz();
  const submitQuiz = useSubmitQuiz(codigo ?? '');

  const quiz = quizQuery.data;
  const attemptsQuery = useAttempts(quiz?.id);

  // Quiz state
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const mission = missionQuery.data;

  if (quizQuery.isLoading || missionQuery.isLoading) {
    return <LoadingBlock message="Cargando el examen de indagación…" />;
  }

  if (quizQuery.isError || !quiz || missionQuery.isError || !mission) {
    return (
      <ErrorBlock
        title="Quiz no disponible"
        message="No pudimos cargar las preguntas de esta misión."
        onRetry={() => {
          quizQuery.refetch();
          missionQuery.refetch();
        }}
      />
    );
  }

  const attempts = attemptsQuery.data ?? [];
  const bestAttempt = attempts.reduce<number>((max, att) => (att.percentage > max ? att.percentage : max), 0);

  const handleStartAttempt = async () => {
    try {
      const res = await startQuiz.mutateAsync(quiz.id);
      setAttemptId(res.attemptId);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setQuizResult(null);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'No pudimos iniciar el examen.');
    }
  };

  const handleOptionToggle = (questionId: string, optionId: string, isSingle: boolean) => {
    setAnswers((prev) => {
      const current = prev[questionId] ?? [];
      if (isSingle) {
        return { ...prev, [questionId]: [optionId] };
      }
      if (current.includes(optionId)) {
        return { ...prev, [questionId]: current.filter((id) => id !== optionId) };
      }
      return { ...prev, [questionId]: [...current, optionId] };
    });
  };

  const handleSubmit = async () => {
    if (!attemptId) return;

    const formattedAnswers = Object.entries(answers).map(([questionId, selected]) => ({
      questionId,
      selected
    }));

    if (formattedAnswers.length < quiz.questions.length) {
      const pendingCount = quiz.questions.length - formattedAnswers.length;
      if (!window.confirm(`Aún tienes ${pendingCount} pregunta(s) sin responder. ¿Deseas entregar el examen de todas formas?`)) {
        return;
      }
    }

    try {
      const result = await submitQuiz.mutateAsync({
        quizId: quiz.id,
        attemptId,
        answers: formattedAnswers
      });
      setQuizResult(result);
      setAttemptId(null);

      if (result.passed) {
        celebrate('big');
        toast.success(`¡Felicitaciones! Aprobaste con ${result.percentage}%`);
      } else {
        celebrate('small');
        toast.error(`Obtuviste ${result.percentage}%. Necesitas ${quiz.passScore}% para aprobar. ¡Puedes intentarlo de nuevo!`);
      }
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : 'Error al enviar las respuestas.');
    }
  };

  const currentQ = quiz.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      {/* Top back button */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to={`/misiones/${mission.code}`}
          className="inline-flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-sm font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver a la misión
        </Link>
        <Chip tone="gold">
          <Trophy className="size-3.5" aria-hidden />
          Reto de Evaluación · 5.º Grado
        </Chip>
      </div>

      {/* RESULT VIEW */}
      {quizResult ? (
        <div className="space-y-6">
          <Card className="relative overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl"
              style={{ background: quizResult.passed ? 'rgba(88,230,197,0.25)' : 'rgba(244,114,182,0.2)' }}
              aria-hidden
            />

            <div className="relative flex flex-col items-center text-center">
              <span className="grid size-20 place-items-center rounded-3xl text-4xl shadow-xl"
                style={{
                  background: quizResult.passed ? 'rgba(88,230,197,0.18)' : 'rgba(244,114,182,0.18)',
                  color: quizResult.passed ? '#58e6c5' : '#f472b6'
                }}
              >
                {quizResult.passed ? '🎉' : '🌱'}
              </span>

              <h1 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl">
                {quizResult.passed ? '¡Excelente trabajo, explorador!' : '¡Buen esfuerzo! Puedes mejorar'}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300">
                {quizResult.passed
                  ? `Has superado el reto con un ${quizResult.percentage}% (${quizResult.score} de ${quizResult.total} puntos). Demostraste un gran dominio de los conceptos científicos.`
                  : `Obtuviste ${quizResult.percentage}% (${quizResult.score} de ${quizResult.total} puntos). Necesitas ${quiz.passScore}% para conquistar la insignia. Revisa la retroalimentación y reintenta.`}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Button size="lg" onClick={handleStartAttempt} loading={startQuiz.isPending}>
                  <RotateCcw className="size-5" aria-hidden />
                  {quizResult.passed ? 'Mejorar puntaje (opcional)' : 'Intentar el quiz de nuevo'}
                </Button>
                <LinkButton to={`/misiones/${mission.code}`} variant="secondary" size="lg">
                  Volver a la misión
                  <ArrowRight className="size-5" aria-hidden />
                </LinkButton>
                {quizResult.passed ? (
                  <LinkButton to="/logros" variant="gold" size="lg">
                    <Trophy className="size-5" aria-hidden />
                    Ver mis insignias
                  </LinkButton>
                ) : null}
              </div>
            </div>
          </Card>

          {/* Detailed Question Review */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Revisión de respuestas y explicaciones</h2>
            <div className="space-y-3">
              {quizResult.graded.map((item, index) => {
                const questionData = quiz.questions.find((q) => q.id === item.questionId);
                return (
                  <Card
                    key={item.questionId}
                    className={cn(
                      'p-5 transition',
                      item.correct ? 'border-mint-400/30 bg-mint-950/15' : 'border-rose-400/30 bg-rose-950/15'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'grid size-8 shrink-0 place-items-center rounded-xl text-sm font-bold',
                            item.correct ? 'bg-mint-400/20 text-mint-300' : 'bg-rose-400/20 text-rose-300'
                          )}
                        >
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-white leading-snug">
                            {questionData?.text ?? `Pregunta ${index + 1}`}
                          </h3>
                        </div>
                      </div>
                      <Chip tone={item.correct ? 'mint' : 'rose'}>
                        {item.correct ? (
                          <>
                            <CheckCircle2 className="size-3.5" aria-hidden /> Correcta
                          </>
                        ) : (
                          <>
                            <XCircle className="size-3.5" aria-hidden /> Por mejorar
                          </>
                        )}
                      </Chip>
                    </div>

                    <div className="mt-3 pl-11 space-y-2">
                      {questionData?.options.map((opt) => {
                        const isChosen = item.selected.includes(opt.id);
                        const isCorrectOption = item.correctAnswers.includes(opt.id);
                        return (
                          <div
                            key={opt.id}
                            className={cn(
                              'flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold',
                              isCorrectOption
                                ? 'bg-mint-400/15 border border-mint-400/30 text-mint-100'
                                : isChosen && !isCorrectOption
                                ? 'bg-rose-400/15 border border-rose-400/30 text-rose-200 line-through'
                                : 'bg-white/3 text-slate-400'
                            )}
                          >
                            <span>{isCorrectOption ? '✓' : isChosen ? '✗' : '•'}</span>
                            <span>{opt.text}</span>
                            {isChosen ? (
                              <span className="ml-auto text-[10px] font-extrabold uppercase text-slate-400">
                                Tu respuesta
                              </span>
                            ) : null}
                          </div>
                        );
                      })}

                      {item.feedback ? (
                        <div className="mt-2 rounded-xl bg-ink-950/60 p-3 text-xs leading-relaxed text-slate-300 border border-white/8">
                          <p className="font-bold text-mint-300 mb-0.5">Pista pedagógica:</p>
                          {item.feedback}
                        </div>
                      ) : null}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      ) : attemptId ? (
        /* ACTIVE ATTEMPT VIEW */
        <div className="space-y-6">
          <div className="glass rounded-3xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <p className="eyebrow">{mission.title} · Examen final</p>
                <h1 className="font-display text-xl font-bold text-white">
                  Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}
                </h1>
              </div>
              <div className="flex items-center gap-2">
                <Chip tone="neutral">
                  Respondidas: {answeredCount}/{quiz.questions.length}
                </Chip>
              </div>
            </div>
            <ProgressBar
              value={answeredCount}
              max={quiz.questions.length}
              color="#fbbf24"
              label="Avance en el quiz"
            />
          </div>

          {currentQ ? (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-400/15 text-lg font-extrabold text-amber-300">
                  {currentQuestionIndex + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      {currentQ.type === 'multiple'
                        ? 'Selección múltiple (puedes marcar varias)'
                        : currentQ.type === 'true_false'
                        ? 'Verdadero o Falso'
                        : 'Selección única'}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-white sm:text-2xl leading-snug">
                    {currentQ.text}
                  </h2>
                </div>
              </div>

              <div className="grid gap-3 pt-2">
                {currentQ.options.map((option: QuizOption) => {
                  const selectedList = answers[currentQ.id] ?? [];
                  const isSelected = selectedList.includes(option.id);
                  const isSingle = currentQ.type === 'single' || currentQ.type === 'true_false';

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleOptionToggle(currentQ.id, option.id, isSingle)}
                      className={cn(
                        'group flex items-center gap-3.5 rounded-2xl border p-4 text-left transition',
                        isSelected
                          ? 'border-mint-400/50 bg-mint-400/15 shadow-md text-white'
                          : 'border-white/10 bg-white/4 text-slate-300 hover:border-white/20 hover:bg-white/8 hover:text-white'
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-6 shrink-0 place-items-center rounded-lg border transition',
                          isSingle ? 'rounded-full' : 'rounded-lg',
                          isSelected
                            ? 'border-mint-400 bg-mint-400 text-ink-950 font-extrabold text-xs'
                            : 'border-white/20 group-hover:border-white/40'
                        )}
                      >
                        {isSelected ? '✓' : ''}
                      </span>
                      <span className="text-sm font-semibold leading-relaxed flex-1">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/8">
                <Button
                  variant="secondary"
                  size="md"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  Anterior
                </Button>

                <div className="flex flex-wrap gap-1.5">
                  {quiz.questions.map((q, idx) => {
                    const answered = Boolean(answers[q.id]?.length);
                    const isCurrent = idx === currentQuestionIndex;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={cn(
                          'size-8 rounded-xl text-xs font-bold transition',
                          isCurrent
                            ? 'border border-amber-300 bg-amber-400/25 text-amber-200'
                            : answered
                            ? 'bg-mint-400/20 text-mint-300'
                            : 'bg-white/6 text-slate-500 hover:text-white'
                        )}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <Button
                    size="md"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                  >
                    Siguiente
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                ) : (
                  <Button
                    variant="gold"
                    size="md"
                    onClick={handleSubmit}
                    loading={submitQuiz.isPending}
                  >
                    <CheckCircle2 className="size-4" aria-hidden />
                    Entregar examen final
                  </Button>
                )}
              </div>
            </Card>
          ) : null}
        </div>
      ) : (
        /* QUIZ LANDING / PRE-ATTEMPT VIEW */
        <div className="space-y-6">
          <Card className="relative overflow-hidden p-6 sm:p-8">
            <div
              className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl"
              style={{ background: `${mission.theme.accent}25` }}
              aria-hidden
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Trophy className="size-3.5" aria-hidden />
                  Quiz de la Misión {mission.order}
                </span>

                <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  {quiz.title}
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                  Demuestra lo que has descubierto sobre {mission.title.toLowerCase()}. Este quiz evalúa tu
                  comprensión conceptual y te otorgará la insignia de la misión si logras{' '}
                  <strong className="text-white">{quiz.passScore}% o más</strong>.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <span className="rounded-xl border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-bold text-slate-300">
                    📋 {quiz.questions.length} preguntas de indagación
                  </span>
                  <span className="rounded-xl border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-bold text-slate-300">
                    🎯 Puntaje para aprobar: {quiz.passScore}%
                  </span>
                  <span className="rounded-xl border border-white/10 bg-white/4 px-3.5 py-2 text-xs font-bold text-slate-300">
                    🔄 Intentos ilimitados (se guarda la mejor nota)
                  </span>
                </div>

                <div className="pt-3">
                  <Button size="lg" onClick={handleStartAttempt} loading={startQuiz.isPending}>
                    <Play className="size-5" aria-hidden />
                    {attempts.length > 0 ? 'Iniciar nuevo intento' : 'Comenzar el quiz ahora'}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3">
                <CitoMascot size={160} mood={bestAttempt >= quiz.passScore ? 'celebrating' : 'curious'} />
                <div className="glass-soft w-full max-w-xs rounded-2xl p-4 text-center">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Tu mejor puntaje</p>
                  <p className="font-display text-3xl font-extrabold text-white mt-1">
                    {bestAttempt > 0 ? `${bestAttempt}%` : 'Sin intentos'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {bestAttempt >= quiz.passScore
                      ? '✅ Aprobado · ¡Insignia conquistada!'
                      : bestAttempt > 0
                      ? 'Aún puedes mejorar para aprobar'
                      : '¡El primer intento te espera!'}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Past Attempts Table */}
          {attempts.length > 0 ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">Historial de intentos</h2>
              <div className="space-y-2">
                {attempts.map((att) => (
                  <div
                    key={att._id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/3 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">Intento #{att.attemptNumber}</p>
                      <p className="text-xs text-slate-400">
                        Entregado el {att.submittedAt ? formatDate(att.submittedAt) : 'En progreso'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-extrabold text-white">{att.percentage}%</span>
                      <Chip tone={att.passed ? 'mint' : 'neutral'}>
                        {att.passed ? 'Aprobado' : 'No aprobado'}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
}
