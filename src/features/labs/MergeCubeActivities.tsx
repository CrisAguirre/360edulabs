import { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Dna,
  Download,
  ExternalLink,
  Globe,
  KeyRound,
  Leaf,
  MessageSquare,
  Printer,
  RefreshCw,
  ScanLine,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { Button, Chip, buttonClass } from '../../components/ui';
import { SpotlightCard } from '../../components/reactbits';
import { cn } from '../../lib/utils';

const MERGE_DASHBOARD_URL = 'https://dashboard.merge3d.ai/';
const MERGE_PDF_URL = '/cube-merge.pdf';
const MERGE_ACCOUNT = {
  user: 'i.guancha@cinar.edu.co',
  password: 'Janis724@'
};

interface MergeCubeActivitiesProps {
  className?: string;
}

/**
 * 3.5 · Cubo Merge.
 *
 * Reemplaza el antiguo simulador de seis caras metabólicas por las dos
 * experiencias oficiales del panel Merge: «Meet the Plant Cell» y
 * «Unicellular Organisms». Incluye preparación del cubo imprimible, acceso a
 * la app o al panel web, paso a paso y un cuestionario de impresiones por
 * actividad (guardado local en el navegador).
 */
export function MergeCubeActivities({ className }: MergeCubeActivitiesProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="relative overflow-hidden rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/12 via-fuchsia-500/8 to-sky-500/10 p-4 sm:p-5">
        <div className="pointer-events-none absolute -right-12 -top-14 size-44 rounded-full bg-purple-400/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-16 -left-10 size-40 rounded-full bg-sky-400/15 blur-3xl" aria-hidden />
        <p className="relative text-sm leading-relaxed text-slate-200 sm:text-base">
          En esta estación el <strong className="text-purple-200">Cubo Merge</strong> se convierte en una ventana 3D:
          apunta la cámara al cubo y verás dos modelos que parecen salir de él. Primero explorarás una{' '}
          <strong className="text-purple-200">célula vegetal</strong> completa y después un{' '}
          <strong className="text-purple-200">organismo unicelular</strong>. Identifica sus estructuras y cuéntanos cómo
          fue tu experiencia.
        </p>
        <div className="relative mt-3 flex flex-wrap gap-2">
          <Chip tone="grape">
            <ScanLine className="size-3.5" aria-hidden />2 experiencias 3D
          </Chip>
          <Chip tone="gold">
            <Printer className="size-3.5" aria-hidden />1 cubo imprimible
          </Chip>
          <Chip tone="sky">
            <MessageSquare className="size-3.5" aria-hidden />2 cuestionarios
          </Chip>
        </div>
      </div>

      {/* Preparación */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-purple-400/20 text-purple-300">
            <Sparkles className="size-4" aria-hidden />
          </span>
          <h4 className="font-display text-base font-extrabold text-white sm:text-lg">
            Antes de empezar: prepara el cubo y tu cuenta
          </h4>
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.14)" borderColor="rgba(251, 191, 36, 0.35)" className="p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                <Printer className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">Paso 1</p>
                <h5 className="text-sm font-extrabold text-white">Imprime el cubo</h5>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              Descarga el PDF, imprímelo en papel grueso, recorta por las líneas, dobla por las pestañas y pega las
              caras. Si puedes, pide ayuda a tu docente.
            </p>
            <a href={MERGE_PDF_URL} download className={buttonClass('gold', 'sm', 'mt-3 w-full')}>
              <Download className="size-4" aria-hidden />
              Descargar cubo Merge (PDF)
            </a>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.14)" borderColor="rgba(168, 85, 247, 0.35)" className="p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-purple-400/15 text-purple-300">
                <Smartphone className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300">Paso 2</p>
                <h5 className="text-sm font-extrabold text-white">Instala la app</h5>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-300">
              En tu celular o tableta instala <strong className="text-slate-100">Merge Object Viewer</strong> o{' '}
              <strong className="text-slate-100">Merge Explorer</strong> desde la tienda de aplicaciones.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Chip tone="neutral">Android</Chip>
              <Chip tone="neutral">iOS</Chip>
              <Chip tone="neutral">Tableta</Chip>
            </div>
          </SpotlightCard>

          <SpotlightCard spotlightColor="rgba(56, 189, 248, 0.14)" borderColor="rgba(56, 189, 248, 0.35)" className="p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
                <KeyRound className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">Paso 3</p>
                <h5 className="text-sm font-extrabold text-white">Inicia sesión</h5>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <div className="rounded-xl border border-white/10 bg-ink-950/70 p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Usuario</p>
                <p className="mt-0.5 select-all break-all font-mono text-xs text-white">{MERGE_ACCOUNT.user}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-ink-950/70 p-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contraseña</p>
                <p className="mt-0.5 select-all break-all font-mono text-xs text-white">{MERGE_ACCOUNT.password}</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              Cuenta del aula. Úsala solo para las actividades del laboratorio.
            </p>
          </SpotlightCard>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-sky-400/25 bg-sky-400/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sky-400/15 text-sky-300">
              <Globe className="size-5" aria-hidden />
            </span>
            <div>
              <h5 className="text-sm font-extrabold text-white">¿Sin celular o tableta? Usa el navegador</h5>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                En un computador abre el panel web de Merge, inicia sesión con la misma cuenta y proyecta el modelo
                para todo el grupo.
              </p>
            </div>
          </div>
          <a
            href={MERGE_DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonClass('secondary', 'sm', 'shrink-0')}
          >
            <ExternalLink className="size-4" aria-hidden />
            Abrir dashboard.merge3d.ai
          </a>
        </div>
      </div>

      {/* Paso a paso */}
      <div className="rounded-2xl border border-white/10 bg-ink-950/60 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <h4 className="flex items-center gap-2 font-display text-base font-extrabold text-white sm:text-lg">
            <span className="grid size-7 place-items-center rounded-lg bg-mint-400/15 text-mint-300">
              <Check className="size-4" aria-hidden />
            </span>
            Paso a paso para vivir la experiencia
          </h4>
          <Chip tone="mint">7 pasos</Chip>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Prepara el cubo',
              text: 'Descarga el PDF, imprímelo, recorta, dobla y pega el cubo. Déjalo sobre una mesa plana.'
            },
            {
              title: 'Abre la app o el panel web',
              text: 'Usa Merge Object Viewer / Merge Explorer en el celular o entra a dashboard.merge3d.ai desde un computador.'
            },
            {
              title: 'Inicia sesión',
              text: 'Escribe el usuario y la contraseña de la cuenta del aula que aparecen arriba.'
            },
            {
              title: 'Elige la experiencia',
              text: 'Actividad 1: «Meet the Plant Cell». Actividad 2: «Unicellular Organisms».'
            },
            {
              title: 'Enfoca el cubo',
              text: 'Apunta la cámara al cubo con buena luz y espera unos segundos hasta que aparezca el modelo 3D.'
            },
            {
              title: 'Explora y gira',
              text: 'Mueve el cubo y el dispositivo para ver todas las caras. Toca las etiquetas para identificar cada estructura.'
            },
            {
              title: 'Responde y comparte',
              text: 'Completa el cuestionario de impresiones de cada actividad y comparte con el grupo lo que descubriste.'
            }
          ].map((step, index) => (
            <li key={step.title} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-purple-400/15 text-xs font-black text-purple-200">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-extrabold text-white">{step.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/8 p-3 text-xs leading-relaxed text-amber-100">
          <strong>Si la cámara no enfoca o la app falla:</strong> usa el panel web o las imágenes anotadas de esta
          página y continúa con el cuestionario. La actividad no se bloquea.
        </p>
      </div>

      {/* Actividad 1 */}
      <SpotlightCard
        spotlightColor="rgba(74, 222, 128, 0.14)"
        borderColor="rgba(74, 222, 128, 0.35)"
        className="overflow-hidden p-0"
      >
        <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
          <figure className="flex flex-col justify-center border-b border-white/10 bg-[#081226] lg:border-b-0 lg:border-r">
            <div className="p-3">
              <img
                src="/images/merge1.png"
                alt="Célula vegetal en 3D con etiquetas en inglés: núcleo, cloroplastos, pared celular, mitocondrias, vacuola y otros organelos"
                className="h-auto w-full rounded-xl object-contain"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-white/10 px-3 py-2 text-[11px] leading-relaxed text-slate-400">
              Célula vegetal anotada · modelo «Meet the Plant Cell». Las etiquetas del modelo están en inglés.
            </figcaption>
          </figure>

          <div className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="mint">
                <Leaf className="size-3.5" aria-hidden />
                Actividad 1
              </Chip>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-mint-300">Meet the Plant Cell</span>
            </div>
            <h3 className="font-display text-xl font-extrabold text-white">Conoce la célula vegetal</h3>
            <p className="text-sm leading-relaxed text-slate-200">
              Las plantas fabrican su propio alimento mediante la <strong className="text-white">fotosíntesis</strong>,
              un proceso que usa la luz del sol para producir azúcares. Los{' '}
              <strong className="text-white">cloroplastos</strong> son los organelos verdes de las células vegetales que
              capturan la luz solar y la convierten en energía química para que la planta crezca y viva.
            </p>
            <p className="text-sm leading-relaxed text-slate-200">
              Las células vegetales son <strong className="text-white">eucariotas</strong> porque contienen organelos
              rodeados por membranas, incluido un núcleo que guarda la información genética. Muchos organelos tienen
              membranas que controlan qué entra y qué sale, y además poseen una{' '}
              <strong className="text-white">pared celular rígida</strong> por fuera de la membrana que les da estructura
              y soporte. Otros organelos importantes son las <strong className="text-white">mitocondrias</strong>, que
              liberan energía, y las <strong className="text-white">vacuolas</strong>, que almacenan agua y nutrientes.
            </p>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-mint-300">Qué buscar en el cubo</p>
              <ul className="mt-2 space-y-1.5">
                {[
                  'Cloroplastos verdes: capturan la luz y producen glucosa.',
                  'Pared celular: da forma, estructura y soporte a la célula.',
                  'Núcleo: guarda la información genética.',
                  'Mitocondrias: liberan energía en forma de ATP.',
                  'Vacuola central: almacena agua y nutrientes.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <details className="group rounded-xl border border-white/10 bg-ink-950/60 p-3">
              <summary className="cursor-pointer list-none text-xs font-extrabold text-slate-200">
                Traducción de las etiquetas del modelo
              </summary>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  'Chloroplast = Cloroplasto',
                  'Cell Wall = Pared celular',
                  'Nucleus = Núcleo',
                  'Mitochondrion = Mitocondria',
                  'Vacuole = Vacuola',
                  'Cytoplasm = Citoplasma',
                  'Golgi Apparatus = Aparato de Golgi',
                  'Ribosome = Ribosoma'
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/4 px-2 py-1 text-[10px] font-bold text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6">
          <MergeImpressionSurvey
            activityKey="actividad-1-celula-vegetal"
            activityTitle="Conoce la célula vegetal"
            structureOptions={['Cloroplastos', 'Pared celular', 'Núcleo', 'Mitocondrias', 'Vacuola central', 'Otra']}
            accent="mint"
          />
        </div>
      </SpotlightCard>

      {/* Actividad 2 */}
      <SpotlightCard
        spotlightColor="rgba(56, 189, 248, 0.14)"
        borderColor="rgba(56, 189, 248, 0.35)"
        className="overflow-hidden p-0"
      >
        <div className="grid lg:grid-cols-[0.98fr_1.02fr]">
          <figure className="flex flex-col justify-center border-b border-white/10 bg-[#081226] lg:order-2 lg:border-b-0 lg:border-l">
            <div className="p-3">
              <img
                src="/images/merge2.png"
                alt="Organismo unicelular Toxoplasma gondii en 3D con etiquetas en inglés: núcleo, membrana celular, mitocondrias, conoide, roptrias y apicoplasto"
                className="h-auto w-full rounded-xl object-contain"
                loading="lazy"
              />
            </div>
            <figcaption className="border-t border-white/10 px-3 py-2 text-[11px] leading-relaxed text-slate-400">
              Organismo unicelular anotado · modelo «Unicellular Organisms» (Toxoplasma gondii). Etiquetas en inglés.
            </figcaption>
          </figure>

          <div className="space-y-4 p-5 sm:p-6 lg:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="sky">
                <Dna className="size-3.5" aria-hidden />
                Actividad 2
              </Chip>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-300">Unicellular Organisms</span>
            </div>
            <h3 className="font-display text-xl font-extrabold text-white">Organismos unicelulares</h3>
            <p className="text-sm leading-relaxed text-slate-200">
              Los <strong className="text-white">organismos unicelulares</strong>, también llamados de una sola célula,
              están formados por una única célula. Se cree que son algunas de las formas de vida más antiguas, aparecidas
              hace hasta 4000 millones de años. Estas diminutas criaturas viven en el agua, el suelo y dentro de otros
              organismos, y sobreviven en ambientes muy diversos.
            </p>
            <p className="text-sm leading-relaxed text-slate-200">
              Los científicos los agrupan en dos grandes categorías: <strong className="text-white">procariontes</strong>{' '}
              y <strong className="text-white">eucariontes</strong>. Los procariontes, como las bacterias, no tienen
              núcleo y sus estructuras internas son más simples. Los eucariontes, como las algas unicelulares y los
              protozoos, tienen núcleo y partes internas más complejas. Son importantes porque producen oxígeno y
              alimento, reciclan nutrientes, sostienen las cadenas alimenticias y algunos pueden afectar la salud al
              causar enfermedades.
            </p>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300">Qué buscar en el cubo</p>
              <ul className="mt-2 space-y-1.5">
                {[
                  'Una sola célula: todo el organismo es una única célula.',
                  'Núcleo: presente en eucariontes como algas y protozoos.',
                  'Membrana celular: controla qué entra y qué sale.',
                  'Mitocondrias: producen la energía que la célula necesita.',
                  'Estructuras del protozoo: conoide, roptrias y apicoplasto.'
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sky-400" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <details className="group rounded-xl border border-white/10 bg-ink-950/60 p-3">
              <summary className="cursor-pointer list-none text-xs font-extrabold text-slate-200">
                Traducción de las etiquetas del modelo
              </summary>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  'Nucleus = Núcleo',
                  'Cell Membrane = Membrana celular',
                  'Mitochondria = Mitocondria',
                  'Golgi Apparatus = Aparato de Golgi',
                  'Conoid = Conoide',
                  'Rhoptries = Roptrias',
                  'Apicoplast = Apicoplasto',
                  'Dense Granules = Gránulos densos'
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-lg border border-white/10 bg-white/4 px-2 py-1 text-[10px] font-bold text-slate-300"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </details>

            <p className="rounded-xl border border-white/10 bg-white/3 p-3 text-[11px] leading-relaxed text-slate-400">
              <strong className="text-slate-200">Dato del modelo:</strong> el cubo muestra a{' '}
              <em>Toxoplasma gondii</em>, un protozoo unicelular eucarionte. Por eso puedes ver un núcleo y organelos
              internos, a diferencia de una bacteria procarionte.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6">
          <MergeImpressionSurvey
            activityKey="actividad-2-organismos-unicelulares"
            activityTitle="Organismos unicelulares"
            structureOptions={['Núcleo', 'Membrana celular', 'Mitocondrias', 'Conoide', 'Roptrias', 'Otra']}
            accent="sky"
          />
        </div>
      </SpotlightCard>
    </div>
  );
}

interface SurveyAnswers {
  structure: string;
  ease: number;
  clarity: number;
  interest: string;
  improvement: string;
}

const EMPTY_ANSWERS: SurveyAnswers = {
  structure: '',
  ease: 0,
  clarity: 0,
  interest: '',
  improvement: ''
};

const EASE_LABELS = ['Muy difícil', 'Difícil', 'Regular', 'Fácil', 'Muy fácil'];
const CLARITY_LABELS = ['Muy borrosa', 'Poco clara', 'Regular', 'Clara', 'Muy nítida'];
const INTEREST_OPTIONS = ['Sí, mucho', 'Tal vez', 'No'];

function MergeImpressionSurvey({
  activityKey,
  activityTitle,
  structureOptions,
  accent
}: {
  activityKey: string;
  activityTitle: string;
  structureOptions: string[];
  accent: 'mint' | 'sky';
}) {
  const storageKey = `merge360_survey_${activityKey}`;
  const [answers, setAnswers] = useState<SurveyAnswers>(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? { ...EMPTY_ANSWERS, ...(JSON.parse(raw) as Partial<SurveyAnswers>) } : EMPTY_ANSWERS;
    } catch {
      return EMPTY_ANSWERS;
    }
  });
  const [submitted, setSubmitted] = useState<boolean>(() => {
    try {
      return Boolean(window.localStorage.getItem(storageKey));
    } catch {
      return false;
    }
  });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const summary = useMemo(
    () =>
      [
        `Cuestionario Cubo Merge · ${activityTitle}`,
        `1. Estructura identificada más rápido: ${answers.structure}`,
        `2. Facilidad para escanear el cubo: ${answers.ease}/5 (${EASE_LABELS[answers.ease - 1] ?? 'sin respuesta'})`,
        `3. Claridad de la imagen en realidad aumentada: ${answers.clarity}/5 (${
          CLARITY_LABELS[answers.clarity - 1] ?? 'sin respuesta'
        })`,
        `4. ¿Usarías el cubo en otra clase?: ${answers.interest}`,
        `5. Qué mejorarías: ${answers.improvement.trim() || 'Sin observaciones'}`
      ].join('\n'),
    [activityTitle, answers]
  );

  const accentText = accent === 'mint' ? 'text-mint-300' : 'text-sky-300';
  const accentDot = accent === 'mint' ? 'bg-mint-400' : 'bg-sky-400';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!answers.structure || !answers.ease || !answers.clarity || !answers.interest) {
      setError('Completa las preguntas 1 a 4 para guardar tus impresiones.');
      return;
    }
    setError('');
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {
      // Si el navegador bloquea el almacenamiento, la respuesta sigue visible en pantalla.
    }
    setSubmitted(true);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/8 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
            <CheckCircle2 className="size-5" aria-hidden />
          </span>
          <div>
            <h4 className="font-display text-base font-extrabold text-white sm:text-lg">
              ¡Gracias por compartir tus impresiones!
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              Tus respuestas de «{activityTitle}» quedaron guardadas en este dispositivo. Puedes copiarlas y
              compartirlas con tu docente.
            </p>
          </div>
        </div>

        <dl className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estructura más rápida</dt>
            <dd className="mt-0.5 text-sm font-bold text-white">{answers.structure}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Facilidad de escaneo</dt>
            <dd className="mt-0.5 text-sm font-bold text-white">
              {answers.ease}/5 · {EASE_LABELS[answers.ease - 1] ?? '—'}
            </dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Claridad de la imagen</dt>
            <dd className="mt-0.5 text-sm font-bold text-white">
              {answers.clarity}/5 · {CLARITY_LABELS[answers.clarity - 1] ?? '—'}
            </dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">¿Usarías el cubo otra vez?</dt>
            <dd className="mt-0.5 text-sm font-bold text-white">{answers.interest}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-950/60 p-3 sm:col-span-2">
            <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Qué mejorarías</dt>
            <dd className="mt-0.5 text-sm leading-relaxed text-slate-200">
              {answers.improvement.trim() || 'Sin observaciones.'}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={handleCopy}>
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? 'Respuestas copiadas' : 'Copiar respuestas'}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => setSubmitted(false)}>
            <RefreshCw className="size-4" aria-hidden />
            Editar respuestas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', accent === 'mint' ? 'bg-mint-400/15' : 'bg-sky-400/15', accentText)}>
            <MessageSquare className="size-5" aria-hidden />
          </span>
          <div>
            <h4 className="font-display text-base font-extrabold text-white sm:text-lg">
              Cuestionario de impresiones · {activityTitle}
            </h4>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
              Cuéntanos cómo fue tu experiencia con el cubo Merge. Tus respuestas se guardan en este dispositivo.
            </p>
          </div>
        </div>
        <Chip tone="neutral">5 preguntas</Chip>
      </div>

      <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
        <legend className="px-1 text-xs font-extrabold text-slate-200">
          1. ¿Qué estructura identificaste más rápido en el cubo?
        </legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {structureOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, structure: option }))}
              aria-pressed={answers.structure === option}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition',
                answers.structure === option
                  ? 'border-purple-400 bg-purple-500/25 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
        <legend className="px-1 text-xs font-extrabold text-slate-200">
          2. ¿Qué tan fácil fue escanear el cubo y ver el modelo?
        </legend>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, ease: value }))}
              aria-pressed={answers.ease === value}
              aria-label={`${value} de 5: ${EASE_LABELS[value - 1]}`}
              className={cn(
                'grid size-9 place-items-center rounded-xl border text-sm font-extrabold transition',
                answers.ease === value
                  ? 'border-purple-400 bg-purple-500/25 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
              )}
            >
              {value}
            </button>
          ))}
          <span className={cn('ml-1 text-xs font-bold', answers.ease ? accentText : 'text-slate-500')}>
            {answers.ease ? EASE_LABELS[answers.ease - 1] : 'Elige de 1 a 5'}
          </span>
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
        <legend className="px-1 text-xs font-extrabold text-slate-200">
          3. ¿Qué tan clara se vio la imagen en realidad aumentada?
        </legend>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, clarity: value }))}
              aria-pressed={answers.clarity === value}
              aria-label={`${value} de 5: ${CLARITY_LABELS[value - 1]}`}
              className={cn(
                'grid size-9 place-items-center rounded-xl border text-sm font-extrabold transition',
                answers.clarity === value
                  ? 'border-purple-400 bg-purple-500/25 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
              )}
            >
              {value}
            </button>
          ))}
          <span className={cn('ml-1 text-xs font-bold', answers.clarity ? accentText : 'text-slate-500')}>
            {answers.clarity ? CLARITY_LABELS[answers.clarity - 1] : 'Elige de 1 a 5'}
          </span>
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
        <legend className="px-1 text-xs font-extrabold text-slate-200">
          4. ¿Te gustaría usar el cubo Merge en otra clase?
        </legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {INTEREST_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAnswers((current) => ({ ...current, interest: option }))}
              aria-pressed={answers.interest === option}
              className={cn(
                'rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition',
                answers.interest === option
                  ? 'border-purple-400 bg-purple-500/25 text-white'
                  : 'border-white/10 bg-white/4 text-slate-300 hover:bg-white/8'
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block rounded-xl border border-white/10 bg-white/3 p-3">
        <span className="text-xs font-extrabold text-slate-200">
          5. ¿Qué mejorarías de la experiencia con el cubo? <span className="font-normal text-slate-500">(opcional)</span>
        </span>
        <textarea
          value={answers.improvement}
          onChange={(event) => setAnswers((current) => ({ ...current, improvement: event.target.value }))}
          rows={3}
          maxLength={400}
          placeholder="Por ejemplo: la imagen tardó en aparecer, el cubo se movía, faltaban etiquetas…"
          className="mt-2 w-full resize-y rounded-lg border border-white/10 bg-ink-950/80 p-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-purple-400/60 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
        />
      </label>

      {error ? (
        <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs font-bold text-rose-200">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" size="sm" variant="primary">
          <CheckCircle2 className="size-4" aria-hidden />
          Guardar mis impresiones
        </Button>
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className={cn('size-1.5 rounded-full', accentDot)} aria-hidden />
          Se guarda en este navegador
        </span>
      </div>
    </form>
  );
}
