# 🧬 Laboratorio 360 La Célula — Guía Técnica para Agentes de IA (AGENTS.md)

> **Propósito de este archivo**: Proveer el contexto arquitectónico, técnico y pedagógico completo de la aplicación *Laboratorio 360 La Célula*. Cualquier agente de IA debe leer este archivo como punto de entrada único para comprender el estado actual del proyecto, resolver incidencias o implementar nuevas funciones sin necesidad de reanalizar el código base desde cero.

---

## 1. Identidad del Proyecto y Visión Pedagógica

- **Nombre**: Laboratorio 360 La Célula
- **Audiencia objetivo**: Estudiantes de 5.º grado de primaria (10 a 11 años), docentes de Ciencias Naturales y directivos escolares.
- **Enfoque pedagógico**: Aprendizaje basado en indagación científica guiada por la mascota **Cito**. Fundamentado de forma literal y metodológica en el documento maestro `Estrategia Indagación.docx`, alineado a los Estándares Básicos de Competencias y Derechos Básicos de Aprendizaje (DBA) de Colombia e Hispanoamérica.
- **Estructura curricular**: Cada misión corresponde a una sesión de indagación y se divide en 3 fases:
  1. **Inicio** (Enganche, activación e indagación inicial):
     - **Misión 1 (Sesión 1)**: Estructurada por sub-actividades oficiales (1.1 a 1.6):
       * **1.1 Aportes y socialización**: Preguntas motivadoras iniciales presentadas al estudiante en dos tarjetas reflectivas React Bits (`ReflectiveCard`) con gráficos vectoriales 2D animados propios (`InquiryGraphics2D.tsx`: `BodyLifeGraphic2D` y `CellActivityGraphic2D`), más participación oral/escrita del estudiante en plataforma.
       * **1.2 Aporte conceptual**: Los postulados de la teoría celular y exclusión de virus acelulares presentados mediante el **Muro 3D Continuo de React Bits** (`DriftWall.tsx` en `https://reactbits.dev/components/drift-wall`) con perspectiva 3D, deriva infinita en doble riel, pausa al hover, selector de velocidad, vista alternativa en cuadrícula e inspección interactiva con ClickSpark.
       * **1.3 Video**: «La extraña historia de la teoría celular» (YouTube) con descripción y para qué se mira este video.
       * **1.4 Lectura y participación**: Carrusel circular 3D de React Bits (`https://reactbits.dev/components/circular-carousel`) con tarjetas completas y ajustadas en proporción y carrusel acordeón interactivo con 5 gráficos vectoriales 2D animados (`HistoryGraphics2D.tsx`: Janssen, Hooke, Leeuwenhoek, Schleiden/Schwann, Virchow), lectura adaptada con Google Docs oficial y respuesta formal argumentada con selector de ideas a la pregunta oficial en el espacio de participación.
       * **1.5 Reto Final de Evaluación**: Examen evaluativo obligatorio de la Sesión 1 con Cito como tutor y aprobación del 70%.
       * **1.6 Contenidos extras y complementarias**: Integración exclusiva de las experiencias de apoyo de la Sesión 1 (gota de agua 360, microscopio 3D, cubo Merge AR, zoom 3D, línea de tiempo, glosario interactivo y actividades complementarias de M1).
     - **Misión 2 (Sesión 2)**: Estructurada en el nivel superior por 8 sub-actividades oficiales con carga dinámica por pestañas:
       * **2.1 Introducción y saberes previos**: Reconocimiento de saberes previos con React Bits, participación activa y detonadores de curiosidad.
       * **2.2 Célula Vegetal**: Plantilla oficial Quiver en Google Drive, carrusel circular 3D de React Bits con gráficos vectoriales científicos 2D (`CellGraphics2D.tsx`), desglose de estructuras exclusivas (pared de celulosa, cloroplastos con clorofila, gran vacuola central) y guía de colores.
       * **2.3 Célula Animal**: Plantilla oficial Quiver en Google Drive, carrusel circular 3D de React Bits con gráficos vectoriales científicos 2D (`CellGraphics2D.tsx`), desglose de estructuras animales (membrana elástica, núcleo central, mitocondrias dinámicas) y guía de colores.
       * **2.4 Presentación del modelo 360 y video interactivo**: Video interactivo YouTube (`h1gryskdtmk`), descripción, para qué se mira este video y accesos a modelos 3D y vista panorámica 360.
       * **2.5 Participación**: Pregunta obligatoria literal sobre semejanzas/diferencias y necesidades vitales, selector interactivo de ideas M2, autoguardado en borrador y envío formal calificado a MongoDB en el espacio de participación de la plataforma.
       * **2.6 Material impreso Quiver y Análisis Comparativo**: Protocolo de coloreado y proyección en la app Quiver, tabla comparativa interactiva de 7 organelos con filtros, comparador deslizante de diferencias anatómicas y glosario.
       * **2.7 Reto Final de Evaluación**: Examen evaluativo obligatorio de 8 preguntas «Células bajo la lupa», con Cito como tutor y aprobación del 70%.
       * **2.8 Actividades complementarias**: Integración exclusiva en pestaña de las actividades complementarias de M2 (video 360, modelo 3D de organelos, animación comparativa, cubo Merge AR, estación Quiver física, comparador 2D y bitácora).
     - **Misión 3 (Sesión 3)**: Estructurada en el nivel superior por 8 sub-actividades oficiales con carga dinámica por pestañas:
       * **3.1 Introducción y saberes previos**: Activación con situaciones cotidianas (combustible de los alimentos, transformaciones y motor celular continuo) con React Bits y muro interactivo.
       * **3.2 Analogía de la fábrica y Video 360**: Célula comparada con una fábrica de producción (materias primas, maquinarias, energía ATP, trabajadores y productos), simulador panorámico 360° y desglose de catabolismo vs anabolismo. Incluye una tarjeta «La célula, una fábrica viva» con el texto del metabolismo celular y la figura 2D animada `FactoryMetabolismGraphic2D` (`InquiryGraphics2D.tsx`: fábrica → célula con flujo de partículas, engranaje, rayo de energía, mitocondrias y ATP), y dos modelos 3D de Sketchfab para explorar antes del Quiz final: «Célula test 1» (`celula_test1` de foro3d, clave `m3-celula-test1`) y «Célula parietal del estómago» (`Parietal Cell final version` de Wenrong, clave `m3-celula-parietal`) para observar el movimiento de las partes.
       * **3.3 Preguntas motivadoras y respuesta en plataforma**: Cuestionamientos de qué pasaría si la fábrica o la célula se detuvieran, selector de argumentos científicos y autoguardado de respuesta. Se ambientó con dos figuras 2D animadas en `InquiryGraphics2D.tsx`: `FactoryStoppedGraphic2D` (fábrica detenida: alarma parpadeante, rayo de energía apagado, banda transportadora quieta) y `WiltingCellGraphic2D` (comparación célula nutrida vs. célula marchita que pierde agua), cada una dentro de su tarjeta de pregunta.
       * **3.4 Video 360, Lectura adaptada y Canva**: Cuestionamientos de energía y desechos, lectura oficial adaptada («El metabolismo celular: ¿Cómo obtienen y utilizan la energía las células?», Google Docs `1RNF1OnvpUMINXE-p-D-T9ZF2B6ycDj3x`), comparador fotosíntesis vs respiración celular y taller para infografía en Canva. Se eliminó el bloque «Texto de la actividad pedagógica» («La docente presenta el video 360…») y en su lugar se insertó el modelo 3D «Célula eucariota y sus funciones» (`RA-t05-pmc` de CNCI_VIRTUAL, clave `m3-celula-eucariota`), movido desde 3.2, para dar soporte visual a los cuestionamientos y a la infografía.
       * **3.5 Cubo Merge y Metabolismo**: Realidad Aumentada con las dos experiencias oficiales del panel Merge («Meet the Plant Cell» y «Unicellular Organisms»), componente dedicado `MergeCubeActivities.tsx` que reemplaza al antiguo simulador de 6 caras: preparación del cubo imprimible (`/cube-merge.pdf`), instalación de la app (Merge Object Viewer / Merge Explorer) o acceso web (`dashboard.merge3d.ai`), credenciales del aula, paso a paso de 7 pasos, imágenes anotadas (`/images/merge1.png` y `merge2.png`) con traducción de etiquetas y un cuestionario de impresiones por actividad (guardado en `localStorage` con claves `merge360_survey_actividad-1-celula-vegetal` y `merge360_survey_actividad-2-organismos-unicelulares`).
       * **3.6 Cuadro de estructura celular en plataforma**: Llenado del cuadro oficial de 6 estructuras celulares mediante el **Carrusel de Cards Reflectivas** (`ReflectiveCard.tsx` de React Bits con 6 figuras 2D animadas en SVG/CSS, rol metabólico, analogía de fábrica y cajón de texto para funciones), adjunto de infografía Canva, autoguardado en borrador y envío formal calificado a MongoDB.
       * **3.7 Reto Final de Evaluación**: Examen evaluativo obligatorio de 8 preguntas «La fábrica de la vida», con Cito como tutor, aprobación del 70% e insignias «Guardián de la Energía» y «Científico 360».
       * **3.8 Actividades complementarias**: Integración exclusiva en pestaña de las actividades complementarias de M3 (video 360 fábrica, video 360 metabolismo, célula 3D con sliders de luz/agua/nutrientes, animación plasmólisis/ATP 2D, cubo Merge virtual, danza del metabolismo 2D, bitácora y laboratorio de ósmosis en papa).
     > [!IMPORTANT]
     > **Regla de Exclusividad de Actividades Complementarias**: Las actividades complementarias están integradas como la pestaña final de cada sesión (1.6 en M1, 2.8 en M2 y 3.8 en M3), eliminando redundancias al final de la página. Bajo ninguna circunstancia deben mezclarse actividades de diferentes sesiones en una misma pantalla.
  2. **Desarrollo** (Exploración profunda): Modelos 3D interactivos (GLB y Sketchfab), cubos AR (Merge Cube), estaciones Quiver, simulaciones 2D (Plasmólisis y Pared Celular) y laboratorios virtuales (Ósmosis).
  3. **Cierre** (Consolidación y evaluación): Bitácora de evidencia con rúbrica, reto evaluativo (Quiz) y entrega de insignias de gamificación.

---

## 2. Estructura del Repositorio

El repositorio está organizado como un monorepo funcional en dos carpetas principales:

```
c:\Users\USUARIO\Desktop\360\
├── AGENTS.md                  # Este documento (Contexto maestro para agentes de IA)
├── guia.md                    # Guía Maestra de Navegación y correspondencia curricular con el docx
├── Estrategia Indagación.docx # Documento maestro curricular y pedagógico de referencia
├── Guia_Maestra_CitoIndagar360.pdf # Documentación pedagógica histórica complementaria
├── package.json               # Scripts raíz del workspace (dev/build/seed por prefijo)
├── vercel.json                # Rewrite SPA para despliegue en Vercel
├── 360edulabs/                # APLICACIÓN FRONTEND (React 19 + Vite 8 + Tailwind 4 + R3F)
│   ├── public/
│   │   ├── models/            # 4 modelos 3D locales en formato .glb
│   │   ├── cube-merge.pdf     # Plantilla imprimible del Cubo Merge
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── reactbits/     # 14 efectos: Particles, SpotlightCard, ClickSpark, DriftWall, SplashCursor, etc.
│   │   │   ├── navigation/    # BreadcrumbBar, SiteMapModal
│   │   │   ├── gamification/  # BadgeCabinet (vitrina de insignias)
│   │   │   ├── layout/        # AppShell, ProtectedRoute
│   │   │   ├── missions/      # MissionCard
│   │   │   └── ui/            # Button, Card, Chip, Toast, ProgressBar, StatCard, etc.
│   │   ├── features/
│   │   │   ├── admin/         # AdminPage (consola institucional)
│   │   │   ├── auth/          # LoginPage (con selector rápido de roles)
│   │   │   ├── labs/          # Reproductores, visores 3D, animaciones y simulaciones
│   │   │   ├── landing/       # LandingPage de bienvenida
│   │   │   ├── missions/      # MissionDetailPage, ActivityPage, MissionTabBar, missionTabs, ComplementaryMissionCard
│   │   │   ├── profile/       # ProfilePage (/perfil)
│   │   │   ├── quiz/          # QuizPage (examen con intentos y Cito)
│   │   │   ├── student/       # StudentHome, LogrosPage
│   │   │   └── teacher/       # TeacherDashboard, TeacherEvidencePage, TeacherReportsPage
│   │   ├── contexts/          # AuthContext (gestión de sesión y JWT)
│   │   └── lib/               # api, queries, types, badges, curriculum, activityMeta, celebrate, utils, queryClient
│   ├── .env.development       # VITE_API_URL=http://localhost:4000/api/v1
│   └── vite.config.ts         # Proxy local '/api' -> http://localhost:4000
│
└── 360edulabsbknd/            # SERVICIO BACKEND (Node.js 22 + Express 5 + Mongoose 9)
    ├── src/
    │   ├── config/            # database.ts (Atlas / Memory fallback), env.ts, logger.ts
    │   ├── controllers/       # 9 controladores (admin, auth, badge, classroom, evidence, mission, progress, quiz, user)
    │   ├── middleware/        # auth, error, requestId
    │   ├── models/            # 12 esquemas Mongoose (User, Mission, Activity, Quiz, etc.)
    │   ├── routes/            # 11 routers Express montados en /api/v1/
    │   ├── seeds/             # Semillas maestras (mission-m1/m2/m3, quizzes, badges, users, officialSource, run)
    │   ├── services/          # 9 servicios de lógica de negocio y queries optimizadas
    │   ├── types/             # express.d.ts (extensión de Request con auth y requestId)
    │   ├── utils/             # AppError, asyncHandler, activityOrder
    │   ├── validators/        # 5 esquemas Zod (auth, common, evidence, progress, quiz)
    │   ├── app.ts             # Configuración de Express, CORS dinámico y Helmet
    │   └── server.ts          # Arranque HTTP y cierre ordenado (Graceful shutdown)
    ├── .env                   # Variables locales (PORT 4000, JWT secrets, AUTO_SEED)
    └── .env.example           # Plantilla de variables de entorno
```

---

## 3. Frontend: Tecnologías, Componentes y Patrones

### Stack Tecnológico
- **React 19.3** + **Vite 8.3** + **TypeScript ~7.0.2**
- **Tailwind CSS 4.3** con plugin Vite
- **React Router 7** (rutas declarativas en `src/App.tsx`)
- **Three.js 0.187** + **@react-three/fiber 9** + **@react-three/drei 10** (visores 3D)
- **@tanstack/react-query 5** (estado asíncrono y caché de API)
- **Framer Motion 14**, **Zustand 5**, **Lucide React**, **canvas-confetti**
- **oxlint** para lint (`npm run lint`)

### Efectos Visuales React Bits (`src/components/reactbits/`)
La aplicación integra componentes de [React Bits](https://reactbits.dev/) para brindar una atmósfera inmersiva:
- `Particles.tsx`: Partículas en movimiento para citoplasma, ósmosis y fondos galácticos.
- `SpotlightCard.tsx`: Tarjetas interactivas con resplandor radial dinámico según la posición del cursor.
- `ClickSpark.tsx`: Efecto de chispas y estallido luminoso al pulsar botones y controles.
- `ShinyText.tsx`: Texto animado con reflejo metálico continuo en títulos clave.
- `Aurora.tsx`: Fondos fluidos de gradientes boreales en cabeceras y modales.
- `AnimatedList.tsx`: Transición escalonada de entrada para listas de postulados y resultados.
- `BlurText.tsx`: Revelación tipográfica con desenfoque progresivo.
- `DecryptedText.tsx`: Efecto de texto desencriptado estilo terminal de investigación.
- `CircularCarousel.tsx`: Carrusel cilíndrico 3D inmersivo basado en React Bits con física de arrastre, tarjetas snap, soporte táctil/ratón y modo cuadrícula.
- `ReflectiveCard.tsx`: Tarjetas reflectivas con inclinación 3D según el cursor, destello especular dinámico (*glare overlay*) y brillo iridiscente de React Bits para recepción de respuestas estudiantiles en 3.6.
- `AccordionCarousel.tsx`: Carrusel acordeón expandible horizontal/vertical de React Bits con navegación por pasos y gráficos 2D.
- `OrbitCards.tsx`: Paneles orbitales interactivos basados en React Bits Orbit Images (`https://reactbits.dev/animations/orbit-images`) con rotación en órbita concéntrica, contra-rotación que mantiene tarjetas horizontales, pausa al pasar el cursor o botón táctil, selección al clic con ClickSpark e integración directa al texto en 1.4 y 2.5.
- `DriftWall.tsx`: Muro dinámico en perspectiva 3D basado en React Bits Drift Wall (`https://reactbits.dev/components/drift-wall`) con deriva continua infinita en doble riel con keyframes CSS a 60fps, pausa al hover o botón manual, elevación espacial (`translateZ`) al interactuar, selector de velocidad (0.6x, 1x, 1.5x), conmutador a cuadrícula estática y panel de inspección activa para los postulados de la teoría celular y la exclusión de virus acelulares en 1.2.
- `SplashCursor.tsx`: cursor luminoso con estela líquida usado en `AppShell` para reforzar la atmósfera de laboratorio.
- `index.ts`: barrel de exportaciones de todos los efectos React Bits (importaciones como `import { AnimatedList } from '../reactbits'`).

### Sistema de Actividades y Reproductores (`src/features/labs/`)
Todas las actividades son despachadas dinámicamente por `ActivityPlayer.tsx` según su propiedad `type`:

| Tipo de Actividad | Componente Player | Funcionalidad / Motor |
|:---|:---|:---|
| `video360` | `Video360Player.tsx` | Simulación de video panorámico 360 con arrastre táctil/mouse, sincronización de subtítulos, velocidad y simulación animada de microscopía acuática (`WaterDropSimulation.tsx`) con signos explícitos de crecimiento celular y reproducción por bipartición. |
| `reading` | `ReadingPlayer.tsx` | Estación de Indagación y Lectura Unificada (Sesiones 1, 2 y 3 de `Estrategia Indagación.docx`): jerarquía curricular oficial, textos pedagógicos literales, preguntas motivadoras, recursos integrados (YouTube embebido, enlaces directos a Google Docs, descargas de plantillas Quiver en Google Drive, enlaces a Canva y Merge Cube), tarjetas flip con BlurText para postulados, línea de tiempo histórica de científicos, comparador de procesos fotosíntesis/respiración, glosario visual con DecryptedText y el **Espacio de Participación** (`VercelResponseSection`) para redacción interactiva, selección guiada de ideas (M1), argumentación en plataforma (M2), llenado estructurado de la tabla de organelos (M3), autoguardado en borrador y envío formal a MongoDB con calificación docente. |
| `model3d` | `Model3DPlayer.tsx` | Visor 3D multifuncional: Microscopio GLB en M1; Célula vegetal/animal + Explorador de Organelos en M2; Célula de energía con sliders en M3. |
| `animation3d` | `Animation3DPlayer.tsx` | Secuencia guiada paso a paso o visor inmersivo Sketchfab (M1 Zoom, M2 Comparación). En M3 renderiza la **Simulación 2D de Plasmólisis**. |
| `animation2d` | `Animation2DPlayer.tsx` | Línea de tiempo interactiva con riel animado (`timeline-rail`) y comparador deslizante de organelos. |
| `ar_cube` | `ARCube.tsx` | Simulación virtual del Cubo Merge con matrices CSS 3D, rotación por caras y conteo de caras exploradas para validación de logro. |
| `quiver` | `QuiverStation.tsx` | Estación de Realidad Aumentada con descarga de plantillas SVG descargables para colorear en clase. |
| `infographic` | `InfographicPlayer.tsx` | Incrustación y visor de infografías interactivas (Canva). |
| `evidence` | `EvidenceEditor.tsx` | Cuaderno de bitácora del estudiante con autoguardado, lista de verificación científica, rúbrica evaluativa y retroalimentación docente. |
| `quiz` | `QuizPage.tsx` | Motor de evaluación interactivo con selección única/múltiple, Cito como guía y cálculo de puntajes. |
| `lab` | `OsmosisLab.tsx` | Laboratorio virtual de ósmosis en rodajas de papa con simulación de partículas y cálculo de pérdida/ganancia de masa. |

Además del despachador, `src/features/labs/` incluye piezas de soporte reutilizables: `Cell3DViewer.tsx` (escena R3F con controles accesibles), `GLBModelViewer.tsx` (`useGLTF` + `<primitive>`), `SketchfabViewer.tsx` (iframe con fallback), `OrganelleExplorer.tsx`, `CellWallAnimator.tsx`, `PlasmolysisAnimator.tsx`, `ReflectiveStructureCarousel.tsx`, `OfficialSource.tsx` (enlaces oficiales Google Docs/Drive/Canva/YouTube), `WaterDropSimulation.tsx`, `embedCatalog.ts` y `types.ts`.

### Rutas del Frontend (`src/App.tsx`)
| Ruta | Componente | Acceso |
|:---|:---|:---|
| `/` | `LandingPage` | público |
| `/login` | `LoginPage` | público |
| `/perfil` | `ProfilePage` | autenticado |
| `/estudiante` | `StudentHome` | autenticado |
| `/logros` | `LogrosPage` | autenticado |
| `/misiones/:codigo` | `MissionDetailPage` | autenticado |
| `/misiones/:codigo/:phase` | `MissionDetailPage` | autenticado (compatibilidad con rutas heredadas) |
| `/misiones/:codigo/actividades/:activityId` | `ActivityPage` | autenticado |
| `/misiones/:codigo/quiz` | `QuizPage` | autenticado |
| `/docente` y `/docente/aulas/:id` | `TeacherDashboard` | `teacher` / `admin` |
| `/docente/evidencias` | `TeacherEvidencePage` | `teacher` / `admin` |
| `/docente/reportes` | `TeacherReportsPage` | `teacher` / `admin` |
| `/docente/misiones` | `StudentHome` (vista de sesiones) | `teacher` / `admin` |
| `/admin` | `AdminPage` | `admin` |
| `*` | `NotFoundRedirect` | redirige al home según el rol |

> El menú de `AppShell` para `admin` muestra Sesiones, Logros, Aulas, Evidencias y Reportes; la consola `/admin` se abre desde el nombre/botón de la cuenta en la cabecera.

### Sistema de Navegación Continua y Orientación (`src/components/navigation/`)
Para evitar la desorientación del estudiante y garantizar navegación fluida sin bloqueos:
- `BreadcrumbBar.tsx`: Barra superior persistente con botón inteligente de "Atrás" con cálculo jerárquico determinista (`getBackFallback()`) y rastro dinámico de migas de pan (sin duplicar el botón de Mapa del Sitio, que reside en el encabezado principal `AppShell`).
- `SiteMapModal.tsx`: Modal inmersivo con brújula (`Compass`), diagrama de las 3 misiones y sus fases (Inicio, Desarrollo, Cierre), indicador dinámico "📍 Estás aquí" y enlaces rápidos según el rol autenticado.
- **Navegación continua en actividades (`ActivityPage.tsx`)**: Barras de salto anterior/siguiente de actividades, sugerencias directas de continuidad al completar cada estación ("Siguiente actividad" o "Ir al Quiz"), botón para volver a la fase específica de la misión, y reinicio limpio de estado por actividad con desplazamiento automático superior.
- **Transición entre Misiones (`MissionDetailPage.tsx`)**:
  - **Sesión 1 (`m1`)**: Estructurada en el nivel superior por **6 pestañas oficiales (1.1 a 1.6)** (`1.1 Aportes y socialización`, `1.2 Aporte conceptual`, `1.3 Video YouTube`, `1.4 Lectura y participación`, `1.5 Reto Final de Evaluación (Quiz)` y `1.6 Contenidos extras y complementarias`). La estación 1.5 es el examen obligatorio y la estación 1.6 reúne los 5 simuladores opcionales y las actividades complementarias exclusivas de la sesión mediante `ComplementaryMissionCard`, eliminando redundancias al pie de la página.
  - **Sesión 2 (`m2`)**: Estructurada en el nivel superior por **8 pestañas dinámicas (2.1 a 2.8)** sin scroll vertical continuo (`2.1 Saberes previos`, `2.2 Célula Vegetal`, `2.3 Célula Animal`, `2.4 Modelo 360 y Video`, `2.5 Participación`, `2.6 Quiver y Análisis Comparativo`, `2.7 Reto Final de Evaluación` y `2.8 Actividades complementarias`). La estación 2.8 alberga de forma exclusiva las actividades complementarias de M2.
  - **Sesión 3 (`m3`)**: Estructurada en el nivel superior por **8 pestañas dinámicas (3.1 a 3.8)** (`3.1 Introducción y saberes previos`, `3.2 Analogía fábrica y video 360`, `3.3 Preguntas motivadoras`, `3.4 Video 360, lectura y Canva`, `3.5 Cubo Merge (dos experiencias AR)`, `3.6 Cuadro de estructuras con Reflective Cards`, `3.7 Reto Final de Evaluación` y `3.8 Actividades complementarias`). La estación 3.8 alberga de forma exclusiva las actividades complementarias de M3.
  - Las rutas heredadas `/misiones/:code/:phase` resuelven a la misma vista y los anclas `#ruta` / `#estaciones-sesion-1` / `#estaciones-sesion-2` / `#estaciones-sesion-3` permiten enlaces directos desde el mapa del sitio. La correspondencia sesión ↔ tema vive en `src/lib/curriculum.ts`; la pantalla pedagógica de "Misión Bloqueada" conserva el botón de regreso a la sesión anterior.
- **Perfil y Acceso a Administración en Cabecera (`AppShell.tsx` & `ProfilePage.tsx`)**:
  - El enlace general «Administración» fue retirado del menú superior de navegación de la barra fija. Dicha función administrativa se integró directamente en el botón/nombre de la cuenta del Administrador (`/admin`).
  - Para los roles de docente y estudiante, hacer clic sobre su nombre en la cabecera (o en el botón «Perfil» en dispositivos móviles) navega a la página `/perfil`, donde visualizan los datos de su cuenta (usuario, rol, aula asignada, colegio, estado activo) y un formulario interactivo para editar su nombre para mostrar (`displayName`), manteniendo el perfil sin fotografía por ahora por requerimiento de privacidad escolar.
- **Flujo fluido en Evaluaciones (`QuizPage.tsx`)**: Vistas previa y posterior al examen con enlaces directos a "Siguiente Misión" (cuando el estudiante aprueba el quiz), barras inferiores de retorno a la misión o al mapa, e historial interactivo de intentos.
- **Tarjetas de Misión accesibles (`MissionCard.tsx`)**: Las misiones bloqueadas enlazan a la vista de requisitos con "Ver requisitos" en lugar de ser elementos inertes.
- **Backend Resiliente (`mission.service.ts` & `quiz.service.ts`)**: `getMissionDetail` retorna el estado `locked` sin lanzar errores 403 HTTP, y `submitQuizAttempt` autoinicializa el progreso si el examen se presenta de forma directa.
- **Pestañas de sesión en el nivel superior (2026-11-16)**: la barra de pestañas oficiales (1.1–1.6, 2.1–2.8 y 3.1–3.8) salió de los reproductores de lectura y ahora se renderiza en `MissionDetailPage` con `features/missions/MissionTabBar.tsx`, justo debajo de la barra de migas y antes de «Volver al mapa de sesiones». Las definiciones viven en `features/missions/missionTabs.ts` (fuente única) y los reproductores (`Session1/2/3Subactivities`) aceptan `activeTab`, `viewMode`, `onTabChange`, `onViewModeChange` y `showTabBar` para funcionar en modo controlado; en `/misiones/:codigo/actividades/:activityId` conservan su barra interna. Al cambiar de pestaña se hace scroll a la estación visible y el modo «Ver todo» salta al ancla `sub-X-Y`. En la Sesión 1 la cabecera usa el texto motivador corto («¿Sabías que?» + la frase de las estructuras microscópicas), no muestra los botones «Explorar estaciones»/«Reto Final», oculta las etiquetas de duración/estaciones/complementarias y los propósitos, y el contador de experiencia dice «puntos de experiencia» en lugar de «XP».
- **Cabecera de la Sesión 1 sin bloque duplicado (2026-11-16)**: se eliminó el `SectionHeading` «Contenido General · Nivel Superior / La extraña historia de la teoría celular / Eje central…» que precedía a las estaciones. El chip «N puntos de experiencia» se movió dentro de la estación 1.1, junto al badge `1.1` y el título «Aportes y socialización», mediante la prop `missionXp` de `Session1Subactivities`; la cabecera y la estación quedan como una sola sección continua (`space-y-4`).
- **Preguntas de 1.1 como tarjetas reflectivas (2026-11-16)**: se eliminó la línea «La docente inicia la sesión motivando a los estudiantes a dar respuesta a la pregunta…». Las dos preguntas motivadoras se presentan ahora directamente al estudiante en dos `ReflectiveCard` de React Bits (una por pregunta, con brillo especular y tinte cian/menta) acompañadas de sus gráficos vectoriales 2D animados `BodyLifeGraphic2D` y `CellActivityGraphic2D` en `features/labs/InquiryGraphics2D.tsx`. Ambas ilustraciones se rediseñaron (2026-11-16) con composición full-bleed dentro de la tarjeta, filtros de brillo (`feGaussianBlur` + `feMerge`), degradados, patrón de puntos, conectores animados y movimiento continuo: la primera muestra persona/planta/animal junto a una lente con células pulsantes, destello de vidrio y una célula en división; la segunda muestra una célula completa con núcleo, mitocondrias con crestas, retículo, Golgi, lisosomas, ribosomas y vesículas/ATP en tránsito mediante `animateMotion`.
- **Imagen del banner de la Sesión 1 (2026-11-16)**: debajo del texto motivador «…estructuras que no podemos ver a simple vista?», al pie de la cabecera de la sesión, se muestra `public/images/m1.jpg` (aula con estudiantes observando una célula en RA) en un `figure` redondeado con degradado inferior y leyenda «Núcleo · Mitocondria · Membrana». Solo se renderiza en la Sesión 1.
- **Invitación inmersiva a participar en 1.1 (2026-11-16)**: el párrafo-instructivo «Los estudiantes participan de forma oral y escrita… la docente proyecta un recurso multimedial…» se reemplazó por una tarjeta inmersiva con degradado menta/cian/violeta, halos difuminados y el gráfico 2D animado `ParticipationGraphic2D` (`InquiryGraphics2D.tsx`: estudiantes, globos de diálogo, bombilla, ondas de voz y tableta). El texto ahora se dirige al estudiante: «¡Participa y comparte lo que imaginas!», con tres micro-pasos (Habla, Escribe, Descubre) y la mención de Cito proyectando el recurso multimedia sobre el origen de la teoría celular.
- **Ideas clave de la teoría celular siempre legibles (2026-11-16)**: `OrbitCards.tsx` ya **no usa rotaciones CSS**. La versión anterior contra-rotaba cada tarjeta con `@keyframes` y `var(--orbit-angle)`, pero dependía de que la animación estuviera activa: con `prefers-reduced-motion`, con navegadores que no resuelven `var()` dentro de `@keyframes` o si la animación no arrancaba, las tarjetas heredaban el giro estático y aparecían acostadas o de cabeza. Ahora un `useEffect` con `requestAnimationFrame` calcula la posición de cada tarjeta con seno/coseno sobre el radio de la órbita y aplica solo `translate3d(x, y, 0)` (más opacidad y `z-index` por profundidad) mediante refs, sin re-render de React ni `rotate()` alguno. El texto queda siempre horizontal en las 5 tarjetas; se conservan el botón de pausa, la pausa al pasar el cursor, el modo cuadrícula y una ubicación estática correcta cuando el usuario tiene movimiento reducido.
- **Cabeceras de las Sesiones 2 y 3 alineadas con la Sesión 1 (2026-11-16)**: en `MissionDetailPage.tsx` desaparecieron las etiquetas de emisión que solo existían en M2/M3 («90 min estimados», «Estaciones 2.1 a 2.7 (Reto final incluido)», «7 complementarias opcionales», «8 pasos obligatorios», «XP acumulados»). También se eliminaron los dos botones «Explorar las 8 estaciones (2.1 a 2.8 / 3.1 a 3.8)» y «Presentar Reto Final (2.7 / 3.7)», quedando esos bloques de CTA solo para misiones sin sesión oficial. La tarjeta «Propósitos de la sesión» y el `SectionHeading` «Contenido General · Nivel Superior» que precedía a las estaciones 2.1 y 3.1 fueron retirados. El banner fotográfico pasó a ser genérico por código de misión (`/images/m1.jpg`, `/images/m2.jpg`, `/images/m3.jpg`) desde el mapa `MISSION_BANNERS`, con leyenda y chips propios: M1 «Núcleo · Mitocondria · Membrana», M2 «Pared de celulosa · Cloroplastos · Vacuola central» y M3 «Metabolismo · Mitocondria · ATP». La columna derecha (insignia en juego + avance de la ruta obligatoria) quedó con el mismo ancho y ritmo en las tres sesiones (`w-full max-w-sm`, `gap-3`, `justify-self-center lg:justify-self-end`) y el chip «N puntos de experiencia» se muestra dentro de la primera estación de cada sesión mediante la prop `missionXp` de `Session2Subactivities` y `Session3Subactivities` (igual que `Session1Subactivities`), de modo que las tres cabeceras son estructuralmente idénticas.
- **Ilustraciones históricas de 1.4 rediseñadas (2026-11-16)**: los cinco gráficos de `HistoryGraphics2D.tsx` se reconstruyeron con fondo a sangre, degradados, patrón de puntos, filtros `feGaussianBlur` + `feMerge`, etiquetas y animaciones continuas: Janssen (banco óptico con haz pulsante, tubo corredizo y polvo luminoso), Hooke (campo circular con panal de corcho, celda protagonista ampliada, aro giratorio y barrido de escaneo), Leeuwenhoek (gota con ondas concéntricas, paramecio ciliado, espirilo, flagelado, burbujas y etiquetas con líneas guía), Schleiden & Schwann (célula vegetal y animal con orgánulos, puente de partículas `animateMotion` y medallón del 1.er postulado) y Virchow (estrangulamiento celular animado, cromosomas que migran a cada polo, huso acromático y lema en latín). El contenedor del gráfico en `CircularCarousel` creció a `h-40 sm:h-48` y las ilustraciones usan `h-full w-full` con `preserveAspectRatio`, evitando recortes.
- **Estación 1.3 con marco de cine (2026-11-16)**: se eliminó la línea «Se solicita a los estudiantes visualizar el video…» y su enlace suelto. El video bajó de posición y ahora se presenta primero con una tarjeta «Función científica» (degradado rosa/violeta, halos y la viñeta animada `CinemaGraphic2D` con microscopio antiguo, haz de luz, fotogramas y carrete) que invita al estudiante con la pregunta «¿Y si la célula fuera el mayor misterio de la historia?» y le pide anotar nombres en la bitácora. El reproductor se envolvió en un marco con resplandor degradado, badge «En pantalla» y pie con crédito TED-Ed; el bloque «¿Para qué se mira este video? (Propósito pedagógico)» se renombró a «¿Qué vas a descubrir en este video?».
- **Modelos 3D incrustados en la Sesión 2 (2026-11-16)**: se insertaron tres visores 3D interactivos dentro de las pestañas de lectura de la Sesión 2. En **2.2** (Célula Vegetal) se incrustó «Célula de la energía» (modelo `energy-cell`, con sliders de agua/luz/nutrientes) y en **2.3** (Célula Animal) «Dos células para comparar» (modelo `cell-compare`, con conmutador animal/vegetal), ambos vía `Model3DPlayer` con la nueva prop `initialView` para arrancar en el visor local interactivo en lugar de Sketchfab. En **2.4** se incrustó «Zoom microscópico» (animación M1) vía `Animation3DPlayer`, con una descripción superior («Explora libremente… identifica las partes vistas en 2.2 y 2.3») y el video interactivo reubicado abajo como dato adjunto de tamaño reducido. Los contenidos de estos modelos se centralizaron en `features/labs/embeddedModels.ts` (`ENERGY_CELL_ACTIVITY`, `CELL_COMPARE_ACTIVITY`, `ZOOM_ACTIVITY`, `M1_ZOOM_MISSION`) para no depender del flag `required` ni de la misión a la que pertenecen en el backend. En 2.2 y 2.3 se conservaron los elementos previos (párrafo y carrusel circular 2D) debajo del modelo.
- **Gráficos de las preguntas 1.1 y 2.1 reducidos y refinados (2026-11-16)**: las cuatro ilustraciones de las preguntas motivadoras de 1.1 (`BodyLifeGraphic2D`, `CellActivityGraphic2D`) y 2.1 (`PlantAnimalCellGraphic2D`, `CellStructuresGraphic2D`) se envolvieron en un contenedor `max-w-[20rem]` centrado (320 px de ancho; antes ocupaban todo el ancho de la tarjeta, ~550 px) y se eliminó el degradado inferior de esas cuatro tarjetas porque oscurecía las etiquetas con el nuevo tamaño. Se suavizaron los keyframes (escalas de 1.02–1.07 en lugar de 1.06–1.22, traslaciones de 1–3 px y duraciones de 4,4–7 s) para un movimiento más sereno. En las formas se añadieron granas (tilacoides) a los cloroplastos del gráfico vegetal/animal, se corrigió el conector que quedaba flotando sobre el animal en 1.1 y se reubicaron las etiquetas «NÚCLEO · ADN», «GOLGI · EMPAQUE» y «LISOSOMAS · LIMPIEZA» del gráfico de estructuras para que no se crucen con las líneas guía ni salgan del lienzo.
- **Gráficos de las preguntas 3.1 rediseñados (2026-11-17)**: `CellFuelGraphic2D` y `CellularMotorGraphic2D` (`InquiryGraphics2D.tsx`) se reconstruyeron para alinearse con el lenguaje visual de 1.1/2.1 (fondo con degradado y puntos, halo radial, filtro de brillo, etiquetas y leyenda inferior). La pregunta 1 compone alimentos → nutrientes → célula: manzana con hoja y brillos, tostada con corteza y miga, tres partículas (amarilla, verde y azul) que viajan por una guía punteada hasta una célula con membrana doble, núcleo con nucléolo, dos mitocondrias con matriz y crestas, vesículas y ribosomas; el ATP aparece como una píldora con rayo y partículas que ascienden desde las mitocondrias. La pregunta 2 muestra el motor celular: engranajes de 10 y 8 dientes que giran en sentidos opuestos, sol de ocho rayos con rotación lenta, luna creciente recortada con `mask`, arco punteado día/noche con un punto en tránsito, dos mitocondrias, núcleo y dos píldoras de ATP con pulsos desfasados. Ambas usan movimiento sereno (`cfBob`, `cfBreathe`, `cfMitoPulse`, `cfAtp`, `cmGear`, `cmBreathe`, `cmSunSpin`, `cmMoonFloat`, `cmAtpPulse`, entre 3 y 10 s) y `transform-box: fill-box` para escalar o rotar alrededor de cada forma. En `ReadingPlayer.tsx` las dos tarjetas se envolvieron en `max-w-[20rem]` centrado (320 px) y se eliminó el degradado inferior que oscurecía las etiquetas. Se corrigieron las formas inválidas anteriores (`<circle>` con `rx`/`ry` y la luna con un círculo opaco superpuesto).
- **Enlaces externos de Sketchfab retirados (2026-11-17)**: se eliminó el enlace «Ver original en Sketchfab» del pie de `SketchfabViewer.tsx` en todos los visores de la app. Se conserva el crédito textual del modelo y su autor («Modelo: … por …») y el botón de pantalla completa; no quedan enlaces salientes a `sketchfab.com` en la interfaz.
- **Pestañas internas de los visores 3D unificadas (2026-11-16)**: todas las pestañas que activan las vistas de `Model3DPlayer` usan el patrón **«Modelo 3D · …»**. En 2.3: «Modelo 3D · Célula Animal» (Sketchfab con el modelo `cell-animal`), «Modelo 3D · Visor Local» y «Modelo 3D · Núcleo y Nucléolo». En 2.2: «Modelo 3D · Célula Vegetal» y «Modelo 3D · Célula Vegetal Interactiva». En el recurso complementario de células (sin props) los valores por defecto son «Modelo 3D · Sketchfab», «Modelo 3D · Visor Local» y «Modelo 3D · Organelos». En **2.4** (`Animation3DPlayer` con `ZOOM_ACTIVITY`) las pestañas son «Modelo 3D · Sketchfab» y «Modelo 3D · Recorrido guiado», y el chip superior dice «Modelo 3D · Zoom Celular». El chip interno de `SketchfabViewer` pasó de «Visor 3D Sketchfab (Inmersivo)» a «Modelo 3D · Sketchfab». Los textos auxiliares de la barra («Modelo 3D · fotorrealista», «Modelo 3D · manipulable…», etc.) y el chip superior de `Model3DPlayer` («Modelo 3D · Células Animal y Vegetal») siguen el mismo patrón.
- **Visor 360 Célula Animal en 2.3 (2026-11-16)**: la pestaña «Visor Sketchfab Inmersivo» de 2.3 fue reemplazada por el visor de la célula animal anotada, que carga el embed `cell-animal` («Célula animal 2» de Tec | VR), el mismo modelo con las partes anotadas que ya se usaba en la actividad complementaria. `Model3DPlayer` acepta `sketchfabLabel` para renombrar la pestaña y el campo `sketchfabEmbed` del contenido para fijar el modelo por contexto; cuando `sketchfabEmbed` está presente se oculta el conmutador animal/vegetal porque el modelo ya es fijo. La pestaña «Explorador de Organelos» se renombró a «Núcleo y Nucléolo» en 2.3 mediante la prop `organellesLabel`, y se corrigieron las tildes de «Núcleo Central y Nucléolo» y de la etiqueta «Nucléolo» del gráfico 2D. El recurso complementario conserva sus embeds por modo (`cell-animal`/`cell-plant`) y el visor local de 2.3 se mantiene sin cambios.
- **Modelo 3D de 2.2 sin controles de fábrica (2026-11-16)**: en la estación 2.2 el visor «Célula de la energía» se muestra en modo observación, sin los sliders de agua/luz/nutrientes ni el bloque «Controles de la fábrica celular», porque el objetivo pedagógico es identificar las partes de la célula vegetal. `Model3DPlayer` incorporó la prop `showEnergyControls` (por defecto `true`) para conservar los controles en el resto de contextos; en 2.2 se pasa `false`, se sustituye la descripción por una invitación a girar el modelo y explorar pared celular, cloroplastos, vacuola y mitocondrias, y la pestaña del simulador pasa a llamarse «Modelo 3D · Célula Vegetal Interactiva»; además, la pestaña Sketchfab se renombra a «Modelo 3D · Célula Vegetal» en ese contexto.
- **Animaciones realistas en los gráficos celulares (2026-11-16)**: los 12 gráficos 2D de `features/labs/CellGraphics2D.tsx` (7 vegetales y 5 animales) pasaron de ser estáticos a animados para dar vida a los carruseles «Carrusel Circular 3D · 7 Estructuras» de 2.2 y 2.3. Se añadió una hoja de estilos compartida `CG_STYLE` (keyframes `cgPulse`, `cgBreathe`, `cgFloat`, `cgRise`, `cgShine`, `cgSpin`, `cgSway`, `cgDash` y clases `.cg-*`) que se inyecta de forma idéntica en cada SVG, evitando colisiones de nombres aunque todos los gráficos se rendericen a la vez. Cada organelo recibe movimiento realista: pared con microfibrillas que brillan, cloroplastos con granas pulsantes y CO₂/H₂O ascendentes, vacuola con burbujas que flotan y turgencia que empuja, membrana con fosfolípidos que se mecen y moléculas que cruzan el canal, núcleo con cromatina a la deriva, mitocondria con ATP titilante, citoplasma con ciclosis giratoria, membrana animal elástica que respira, centríolos con áster rotatorio, Golgi con vesículas que brotan, lisosomas con enzimas flotantes y vacuolas animales flotando. Además se añadieron filtros `feGaussianBlur` de resplandor con IDs únicos por gráfico.
- **Aporte conceptual 1.2 dirigido al estudiante (2026-11-16)**: el texto de la estación 1.2 pasó de un párrafo descriptivo de la docente («La docente realiza un aporte conceptual explicando que…») a una invitación inmersiva en segunda persona: «¡Descubramos juntos el gran secreto de la biología!» + «…imagina que los científicos unieron todos sus hallazgos en una sola gran conclusión: la Teoría Celular…». Se conserva intacto el contenido pedagógico (unidad estructural y funcional, exclusión de virus acelulares y los postulados).
- **Apertura de 2.1 y 3.1 alineada con 1.1 (2026-11-16)**: los bloques de texto descriptivo de la docente («A partir de la identificación de la célula…» y la «Dinámica de indagación en el aula» en 2.1; «Texto de la actividad pedagógica» en 3.1) fueron retirados por considerarse no válidos tras la reestructuración de la Sesión 1. Ambas aperturas ahora replican la estructura dinámica de 1.1 en `ReadingPlayer.tsx`: encabezado «Preguntas para indagar», dos `ReflectiveCard` de React Bits con gráfico 2D animado y pregunta motivadora (badge «Pregunta 1/2» + etiqueta temática), tarjeta inmersiva «Tu voz hace ciencia · ¡Participa y comparte lo que imaginas!» con `ParticipationGraphic2D` y tres micro-pasos, y el formulario de participación escrito con su muro de ideas (conservados). Se añadieron cuatro gráficos en `features/labs/InquiryGraphics2D.tsx`: `PlantAnimalCellGraphic2D` (célula vegetal vs animal, 2.1 P1), `CellStructuresGraphic2D` (organelos etiquetados con funciones, 2.1 P2), `CellFuelGraphic2D` (de los alimentos a la energía ATP, 3.1 P1) y `CellularMotorGraphic2D` (el motor celular que nunca duerme con día/noche, 3.1 P2). Las «3 preguntas detonadoras» (2.1) y las «Situaciones cotidianas» (3.1) se conservan como contenido complementario posterior.
- **4.ª sesión «Actividades Complementarias» (2026-11-16)**: se eliminaron las pestañas de actividades complementarias de las tres sesiones (1.6, 2.8 y 3.8) y se agruparon todas las actividades complementarias de m1/m2/m3 en una nueva sesión de nivel superior. Cambios: en `features/missions/missionTabs.ts` se quitaron `1.6`, `2.8` y `3.8`; en `ReadingPlayer.tsx` se eliminaron las secciones 1.6/2.8/3.8, los tipos `Session1/2/3TabKey` ya no incluyen el último ítem, se retiró la prop `complementaryActivities` (y `scientists`/`ScientistCard`/`showTimeline` de la Sesión 1), y el glosario de la Sesión 1 se movió dentro de la estación 1.4 (la línea de tiempo histórica ya residía en 1.4 vía carrusel). Se creó `features/missions/ComplementaryActivitiesPage.tsx` (ruta `/complementarias`, autenticada) que agrupa por sesión **todas las actividades complementarias** usando el helper `complementaryActivities(mission)` de `lib/curriculum.ts`, que filtra por tipo excluyendo solo `reading` y `quiz` (no depende del flag `required`), de modo que no se pierde ningún recurso: modelos 3D, videos 360, cubo AR, animaciones, laboratorio, infografía y la bitácora (22 recursos en total: 6 en M1, 7 en M2 y 9 en M3). En `components/missions/MissionCard.tsx` el `MissionMap` pasó a 4 columnas (`md:grid-cols-2 lg:grid-cols-4`) e incluye una cuarta tarjeta `ComplementarySessionCard` («Sesión 4 · Actividades Complementarias») que enlaza a `/complementarias` y muestra el total de experiencias opcionales. `BreadcrumbBar.tsx` añadió la miga «Actividades Complementarias». No se tocó el backend: las actividades siguen perteneciendo a sus misiones originales y conservan su estado.

---

## 4. Integración 3D y 2D Especializada

### A. Modelos Locales en formato GLB (`/public/models/`)
Se encuentran en `360edulabs/public/models/` y son cargados mediante Three.js (`useGLTF` dentro de `GLBModelViewer.tsx`):
1. **`microscopio_celula.glb`** (3.11 MB): Microscopio óptico compuesto utilizado en la Misión 1.
2. **`organelo_cloroplasto.glb`** (2.21 MB): Estructura del cloroplasto con tilacoides y estroma.
3. **`organelo_membrana.glb`** (16.06 MB): Bicapa lipídica detallada con proteínas integrales.
4. **`organelo_vacuola.glb`** (0.97 MB): Vacuola central vegetal.

### B. Catálogo de Embeds Sketchfab (`embedCatalog.ts`)
Para los modelos que no cuentan con GLB descargado, se emplean iframes de Sketchfab con controles estandarizados y botón de alternancia al modelo local:
- `cell-animal`: `https://sketchfab.com/models/47baced2318049f3bb119f0c3f020954/embed` (Tec \| VR)
- `cell-plant`: `https://sketchfab.com/models/9689d81987c046819de5a98a182df3ef/embed` (SAV. Univ. de Sevilla)
- `energy-cell`: `https://sketchfab.com/models/d7b45968847b40fb8c9527b3f896e97a/embed` (Orii)
- `m1_zoom_celula`: `https://sketchfab.com/models/74f714127a8c4211bb1a2cac7195fb1a/embed` (Ebers)
- `m2_comparacion_celular`: `https://sketchfab.com/models/cbdf7e677572492dacbb5834081592e7/embed` (AVRcontent)
- `organelo_nucleo`: `https://sketchfab.com/models/de89ce1324504883877b24df4c989853/embed` (Laboratorio Virtual)
- `organelo_mitocondria`: `https://sketchfab.com/models/e1b1e04ccfe34caf9e59ee39ebe547cc/embed` ((MEDPIXEL))
- `m3-celula-eucariota`: `https://sketchfab.com/models/ac569925866e49f99a9774f70112b896/embed` (CNCI_VIRTUAL · RA-t05-pmc, «Célula eucariota y sus funciones»; mostrada en 3.4)
- `m3-celula-parietal`: `https://sketchfab.com/models/fff5e5d8086b4de3880bb8bcfe5880ca/embed` (Wenrong · Parietal Cell final version; mostrada en 3.2)
- `m3-celula-test1`: `https://sketchfab.com/models/886ad8f319034cd68b7bdac107cddc1c/embed` (foro3d · celula_test1; mostrada en 3.2)

### C. Explorador de Organelos (`OrganelleExplorer.tsx`)
Permite navegar uno a uno por 6 organelos clave:
1. **Núcleo** → Sketchfab embed
2. **Mitocondria** → Sketchfab embed
3. **Cloroplasto** → GLB local (`/models/organelo_cloroplasto.glb`)
4. **Membrana celular** → GLB local (`/models/organelo_membrana.glb`)
5. **Vacuola central** → GLB local (`/models/organelo_vacuola.glb`)
6. **Pared Celular** → Animación interactiva 2D (`CellWallAnimator.tsx`)

### D. Animaciones 2D Exclusivas (Requisito Explícito del Usuario)
Por directriz del proyecto, **la plasmólisis y la pared celular se animan en 2D puro** con SVG, CSS y React Bits:
- **`PlasmolysisAnimator.tsx`**: Simula el comportamiento celular en 3 medios osmóticos:
  - *Turgente* (0 % sal): Vacuola inflada (100 %), membrana pegada a la pared, máxima presión hidrostática.
  - *Isotónico* (0.9 % sal): Estado neutro, vacuola al 72 %, membrana en contacto suave.
  - *Plasmolizado* (15 % sal): Pérdida de agua masiva, vacuola encogida al 38 %, membrana desprendida y plegada, pared celular rígida conservada.
- **`CellWallAnimator.tsx`**: Explora la armadura vegetal con dos modos:
  - *Vista celular*: Presión de turgor interna contra la pared y canales de plasmodesmos.
  - *Malla molecular*: Red de microfibrillas de celulosa y enlaces de pectina.
- **`CellGraphics2D.tsx`**: Catálogo de 12 ilustraciones vectoriales científicas 2D de alta resolución integradas en el carrusel circular de las estaciones 2.2 y 2.3 (pared celular, cloroplastos con grana/tilacoides, vacuola central con turgor, bicapa fosfolipídica, núcleo con envoltura/poros, mitocondrias con crestas, centríolos 9x3, aparato de Golgi, lisosomas, etc.).
- **`HistoryGraphics2D.tsx`**: Catálogo de 5 ilustraciones vectoriales científicas 2D animadas con SVG/CSS para los hitos de la teoría celular en 1.4 (microscopio de doble lente de Janssen con haz óptico, celdas de corcho de Hooke en Micrographia, animálculos vivos en gota de agua de Leeuwenhoek, unión vegetal/animal de Schleiden & Schwann y bipartición celular *Omnis cellula e cellula* de Virchow).


---

## 5. Backend: Arquitectura y API REST

### Stack Tecnológico
- **Node.js 22** + **Express 5.2** + **TypeScript 5.9**
- **Mongoose 9** (ORM MongoDB)
- **Zod 4** (validación de esquemas de petición)
- **Pino + Pino-Http** (logging estructurado JSON con correlación `requestId`)
- **Helmet** + **CORS** + **Express-Rate-Limit**
- **JSON Web Tokens (JWT)** + **Bcryptjs**
- **mongodb-memory-server 7.0.14** como fallback de desarrollo cuando no hay `MONGODB_URI` o MongoDB local (los datos se resembran al reiniciar)

### Endpoints de la API (`/api/v1`)
Todos los endpoints están agrupados bajo el prefijo `/api/v1/`:

- **Salud**
  - `GET /health`: estado del servicio, base de datos, versión y uptime.
- **Autenticación**
  - `POST /auth/login`: autenticación con rate limiter (40 req/15 min).
  - `POST /auth/refresh`: renovación silenciosa del access token.
  - `POST /auth/logout`: invalidación del refresh token y limpieza de cookies.
  - `GET /auth/me`: perfil autenticado con aula y datos del rol.
  - `PATCH /auth/me`: actualización de `displayName`.
  - `PATCH /auth/password`: cambio de contraseña.
- **Misiones y actividades**
  - `GET /missions`: lista de misiones con progreso del estudiante.
  - `GET /missions/:code`: detalle de misión con actividades y estado (`locked` sin error 403).
  - `GET /missions/:code/activities`: actividades de la misión.
  - `GET /activities/:id`: metadatos y contenido de una actividad.
  - `POST /activities/:id/complete`: reglas de finalización (`confirm`, `video_progress`, `faces_explored`).
- **Progreso**
  - `GET /progress/me`: resumen global (XP, nivel, misiones, insignias).
  - `GET /progress/:missionCode`: progreso de una misión.
  - `POST /progress/:missionCode/start`: inicia o reanuda una misión.
  - `POST /progress/:missionCode/phase`: actualiza la fase activa.
  - `POST /progress/activities/:id/complete`: alias de finalización de actividad.
- **Quizzes**
  - `GET /quizzes/mission/:missionCode`: cuestionario de la misión.
  - `POST /quizzes/:id/attempts`: inicia un intento.
  - `POST /quizzes/:id/attempts/:attemptId/submit`: califica en servidor y actualiza progreso.
  - `GET /quizzes/:id/attempts/me`: historial de intentos del estudiante.
- **Evidencias**
  - `GET /evidence/me`: evidencias del estudiante autenticado.
  - `GET /evidence?classroomId=...`: bandeja docente/admin por aula.
  - `POST /evidence`: crea o guarda borrador (actividades `evidence` y `reading` con `content.hasEvidenceResponse`).
  - `PATCH /evidence/:id`: actualiza borrador.
  - `POST /evidence/:id/submit`: entrega formal para revisión.
  - `POST /evidence/:id/review`: aprobación o cambios con rúbrica docente (`teacher`/`admin`).
- **Insignias**
  - `GET /badges`: catálogo completo.
  - `GET /badges/me`: insignias obtenidas (forma plana o con `badgeId` poblado).
  - `POST /badges/:code/claim`: reclamo de insignia elegible (solo estudiante).
- **Aulas**
  - `GET /classrooms`: aulas del usuario (admin: todas; docente: propias; estudiante: matriculadas).
  - `POST /classrooms/join`: unión por código (estudiante).
  - `POST /classrooms`: crear aula (`teacher`/`admin`); genera código de 6 caracteres si no se envía.
  - `GET /classrooms/:id`: detalle con estudiantes (`teacher`/`admin`).
  - `PATCH /classrooms/:id`: editar datos y ajustes (`teacher`/`admin`).
  - `POST /classrooms/:id/enrollments`: matricular por `studentIds` o `usernames` (`teacher`/`admin`).
  - `DELETE /classrooms/:id/enrollments/:studentId`: retirar matrícula (`teacher`/`admin`).
  - `GET /classrooms/:id/dashboard`: métricas grupales y tablero docente.
- **Usuarios y gestión** (`teacher`/`admin`; el docente queda limitado a sus aulas)
  - `GET /users`: listado paginado con filtros `role`, `search`, `active`, `classroomId`.
  - `POST /users`: crear cuenta (el docente solo puede crear estudiantes).
  - `POST /users/import`: importación CSV con reporte de errores por fila.
  - `GET /users/:id`: detalle de usuario.
  - `PATCH /users/:id`: editar nombre, rol, avatar o estado.
  - `POST /users/:id/reset-password`: contraseña temporal `Cito####*` y revocación de refresh tokens.
- **Administración** (`admin`)
  - `GET /admin/overview`: métricas globales.
  - `GET /admin/classrooms`: aulas con conteo de estudiantes.
  - `GET /admin/missions`: misiones en todos los estados con actividades y quiz.
  - `POST /admin/missions/:id/publish` y `POST /admin/missions/:id/archive`: publicación/archivo.
  - `GET /admin/quizzes`: inventario de quizzes.
  - `GET /admin/assets`: biblioteca de activos y usos.
  - `GET /admin/evidence/recent`: evidencias recientes pendientes.
  - `GET /admin/badges`: catálogo con conteo de otorgamientos.

### Autenticación y Cookies
- **Access Token**: JWT con duración de **15 minutos**, retornado en el cuerpo de la respuesta (`data.accessToken`).
- **Refresh Token**: JWT con duración de **7 días**, almacenado en una cookie segura `httpOnly` llamada `cito_refresh`.
  - En producción (`NODE_ENV=production`): `sameSite: 'none'`, `secure: true`.
  - En desarrollo: `sameSite: 'lax'`, `secure: false`.
- **Login sin contraseña para estudiantes (2026-11-17)**: `login()` en `auth.service.ts` omite `verifyPassword` cuando `user.role === 'student'` (entran solo con su código de 2 letras); docente y admin sí validan contraseña. `loginSchema` acepta usuario desde 2 caracteres y contraseña opcional (`default('')`). El frontend `LoginPage.tsx` presenta un selector «Estudiante / Docente · Admin»; en modo estudiante solo se pide el código. Nota de despliegue: Render debe tener `0.0.0.0/0` en la allowlist de Atlas porque sus IPs son dinámicas; el seed de producción se corre con `npm run seed` apuntando `MONGODB_URI` a Atlas.

### Usuarios Semilla Preconfigurados (`src/seeds/users.ts`)
| Rol | Username | Password | Nombre Completo |
|:---|:---|:---|:---|
| **Admin** | `admin` | `Admin2026*` | Administrador Laboratorio 360 |
| **Docente** | `docente01` | `Docente2026*` | Profe Camila Torres |
| **Estudiante** | Código de 2 letras (ej. `SB`) | *(sin contraseña)* | 23 estudiantes del aula `CITO5A` |

> **Acceso de estudiantes (2026-11-17)**: los estudiantes entran **solo con su código de dos letras** (inicial del 1.er nombre + inicial del apellido; si el código se repite, se usa la inicial del 2.º apellido), **sin contraseña**. Solo docente y admin usan contraseña. La validación vive en `auth.service.ts` (`login()` omite la verificación de contraseña cuando `user.role === 'student'`) y el login del frontend (`LoginPage.tsx`) ofrece un selector «Estudiante / Docente · Admin». El listado completo de códigos está en `src/seeds/users.ts` (`demoUsers`).

Aula semilla: **`5.º A - Exploradores`**, código **`CITO5A`**, grado «5.º de primaria», colegio «Colegio Horizonte», año 2026, con los **23 estudiantes** matriculados.

### Catálogo de Insignias (`src/seeds/badges.ts`)
| Código | Nombre | XP | Misión |
|:---|:---|:---:|:---|
| `explorador-celular` | Explorador Celular | 50 | m1 |
| `constructor-conocimiento` | Constructor del Conocimiento Celular | 50 | m2 |
| `guardian-energia` | Guardián de la Energía Celular | 50 | m3 |
| `cientifico-360` | Científico Laboratorio 360 (insignia maestra) | 100 | — |
| `persistente` | Persistente (mejorar un quiz reintentado) | 10 | — |

---

## 6. Despliegue en Producción (Render + Vercel)

### Workspace y rutas SPA
- `package.json` en la raíz expone atajos: `npm run dev:backend`, `dev:frontend`, `build:backend`, `build:frontend`, `seed`.
- Hay `vercel.json` tanto en la raíz como en `360edulabs/` con rewrite `/(.*)` → `/index.html` para que React Router 7 funcione al recargar rutas profundas.
- El frontend admite `VITE_API_URL`; en local, `.env.development` apunta a `http://localhost:4000/api/v1` y Vite proxya `/api` al backend.

### Backend en Render (Web Service)
- **Root Directory**: `360edulabsbknd`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Variables de Entorno Requeridas**:
  ```env
  NODE_ENV=production
  PORT=4000
  CLIENT_ORIGIN=https://tu-frontend.vercel.app
  MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/laboratorio360
  JWT_ACCESS_SECRET=770c1fccb2c929aefa9f50f24528c008935a3d50e8cf1ccfd2b3db4a04235cbc
  JWT_REFRESH_SECRET=06c78c1a12bd31c8ff5f730657d73a519655a412213c86d0e1a7e37417d2c6ed
  ACCESS_TOKEN_TTL=15m
  REFRESH_TOKEN_TTL_DAYS=7
  AUTO_SEED=true
  ```

### Frontend en Vercel
- **Root Directory**: `360edulabs`
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Variable de Entorno Requerida**:
  ```env
  VITE_API_URL=https://<nombre-de-tu-servicio-en-render>.onrender.com/api/v1
  ```
  *(Nota crítica: NUNCA usar marcadores ficticios como `tu-backend.onrender.com`).*

---

## 7. Reglas de Mantenimiento para Agentes de IA

1. **Integridad de TypeScript**:
   Antes de dar por concluido cualquier cambio, SIEMPRE compilar ambos proyectos:
   - `npm --prefix 360edulabs run build` (debe retornar código 0).
   - `npm --prefix 360edulabsbknd run build` (debe retornar código 0).
   - Prestar especial atención al flag `noUnusedLocals` / `noUnusedParameters` (`TS6133`): no dejar imports o variables huérfanas.
2. **Conservación de Animaciones 2D**:
   No intentar convertir la plasmólisis o la pared celular a modelos 3D GLB. El requerimiento expreso del usuario es que sean animaciones 2D interactivas con HTML, SVG, CSS y React Bits.
3. **Respaldo de Modelos 3D**:
   Todo componente que cargue iframes de Sketchfab debe ofrecer un botón o fallback hacia el visor procedural/local en Three.js para garantizar disponibilidad offline o en entornos escolares con redes restringidas.
4. **Seguridad de Secretos**:
   Bajo ninguna circunstancia colocar secretos JWT o credenciales de base de datos en el cliente frontend.
5. **Idioma**:
   Toda la interfaz, alertas, retroalimentación y comunicación con el usuario deben mantenerse en **Español**.
6. **Modo de Verificación de Contenidos para el Rol Administrador**:
   El usuario admin (`admin` / `Admin2026*`) cuenta con acceso directo de verificación en su panel (`AdminPage.tsx`) y en la barra de navegación superior a todas las vistas de estudiantes (`/estudiante`, `/misiones/:code`, actividades, quiz, `/logros`) y docentes (`/docente`, evidencias, reportes). El backend permite explícitamente al rol `admin` iniciar y probar actividades y quizzes de cualquier misión (M1, M2 y M3) sin bloqueos por requisitos previos de correlación de misiones.
7. **Fidelidad Curricular Literal con `Estrategia Indagación.docx`**:
   Las actividades iniciales de las misiones M1, M2 y M3 deben mantener los textos exactos, preguntas motivadoras, preguntas de indagación obligatorias, enlaces externos a Google Docs, videos de YouTube, plantillas Quiver en Drive y tablas comparativas según lo documentado en `guia.md`.
8. **Persistencia Dual en Actividades de Lectura (`hasEvidenceResponse`)**:
   Las actividades de tipo `reading` con `content.hasEvidenceResponse: true` integran el `VercelResponseSection`. Todo cambio en el esquema o backend de evidencias debe garantizar que el guardado (`POST /evidence`) y entrega (`POST /evidence/:id/submit`) operen tanto para actividades tipo `evidence` como para estas estaciones unificadas.
9. **Separación entre ruta obligatoria y exploración opcional**:
   Solo las actividades con `required: true` (las que describe `Estrategia Indagación.docx`) cuentan para el progreso, desbloquean insignias y sostienen el botón "Continuar". `model3d`, `ar_cube`, `animation3d`, `animation2d` y `lab` son apoyo opcional, salvo cuando el documento los exige de forma explícita: estación Quiver en la Sesión 2, e infografía de Canva y cubo Merge en la Sesión 3. Totales obligatorios esperados: **M1 = 3** (lectura, evidencia, quiz), **M2 = 5** (+ Quiver), **M3 = 7** (+ infografía y cubo). El quiz cuenta como reto de plataforma, no como texto literal del documento. *Ver la nota de desalineación del seed en la sección 8.*

---

## 8. Estado Actual Verificado (2026-11-17)

### Compilación
- `360edulabs`: `npm run build` (`tsc -b && vite build`) pasa sin errores; solo advierte chunks > 500 kB (`Cell3DViewer` ≈ 1.0 MB y bundle principal ≈ 1.19 MB).
- `360edulabsbknd`: `npm run build` (`tsc -p tsconfig.json`) pasa sin errores.

### Contenido y datos semilla
- **3 misiones** (`m1`, `m2`, `m3`), **28 actividades** sembradas (**8 / 9 / 11**), **3 quizzes** con **22 preguntas** (**6 / 8 / 8**), **5 insignias**.
- **1 aula** `CITO5A` con **23 estudiantes** matriculados (códigos de 2 letras, sin contraseña).
- Sin escenarios de progreso de demostración: los 23 estudiantes del aula inician desde cero (`progressScenarios` vacío en `src/seeds/users.ts`).
- XP por misión: 100 de actividades + 20 de evidencia + 30 de quiz + 50 de insignia = **150**; insignia maestra final +100.

### Comandos
- Backend: `npm run dev` (tsx watch), `npm run build`, `npm start`, `npm run seed`, `npm test`, `npm run lint`.
- Frontend: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint` (oxlint).
- Sin MongoDB local, el backend arranca con `mongodb-memory-server` y **resiembre al reiniciar**; la base no persiste entre reinicios.

### Pendientes / observaciones conocidas
1. **Desalineación de actividades obligatorias**: la regla pedagógica espera M1=3, M2=5 y M3=7 (incluyendo quiz), pero el seed actual marca `required: true` en **2 actividades de m1, 2 de m2 y 7 de m3**; sumando el quiz daría 3/3/8. Conviene revisar las banderas `required` de M2 (Quiver) y M1 antes de congelar métricas de avance.
2. **`AdminPage.tsx` vs `/users`**: la página llama `GET /users` esperando un arreglo o `{ users: [...] }`, pero el backend responde `{ items, total, page, limit }`; los contadores del panel admin pueden quedar en 0 hasta adaptar la respuesta.
3. `360edulabs/package.json` conserva el nombre `frontend-scaffold`; no afecta la build, pero conviene renombrarlo.
4. **Versionado**: los dos subrepositorios ya tienen commits y remoto configurado (`360edulabs` y `360edulabsbknd` → GitHub `CrisAguirre`). El repo raíz `Desktop\360` no es un repo git; los documentos maestros (`AGENTS.md`, `guia.md`, `Estrategia Indagación.docx`, etc.) viven duplicados en `360edulabs/src/assets/var/`.
5. Los archivos de semillas y `AGENTS.md` son UTF-8 válidos; la consola de PowerShell puede mostrar acentos/emoji como mojibake sin que el contenido esté corrupto.
6. **Despliegue activo (2026-11-17)**: frontend en Vercel y backend en Render (`three60edulabsbknd.onrender.com`) sobre MongoDB Atlas (`edulab360`). La allowlist de Atlas debe incluir `0.0.0.0/0` porque las IPs de Render son dinámicas; sin eso el backend queda `database: disconnected` y los logins dan 500. Para poblar/actualizar producción: `npm run seed` con `MONGODB_URI` apuntando a Atlas. Nota: al sembrar se borran progreso/evidencias y se restablecen las contraseñas de admin/docente.
7. **Auditoría de calidad (2026-11-17)**: frontend auditado con `impeccable` (`npx impeccable detect src/` y `npx impeccable detect http://localhost:5173/login`), backend con ESLint (`npm run lint`). Se corrigieron todos los hallazgos: `side-tab` en `CircularCarousel.tsx` (borde lateral → eliminado), `border-accent-on-rounded` en `ReadingPlayer.tsx` (`border-t-2` → eliminado), `ai-color-palette` en `ProfilePage.tsx` (violeta → sky), `bounce-easing` en `InquiryGraphics2D.tsx` (keyframes `caWobble`/`csWobble` renombrados a `caDrift`/`csDrift` con `cubic-bezier`), y en `LoginPage.tsx` los eyebrows/kickers sobre los H1 integrados en los títulos, textos de 10–11 px subidos a 11–12 px, contraste del pie legal mejorado (`slate-500` → `slate-400`) y el anidamiento de tarjetas aplanado. Estado final: detector de código `[]`, detector de `/login` `[]`, ESLint exit 0, build limpio.

