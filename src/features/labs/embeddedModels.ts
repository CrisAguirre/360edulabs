import type { Activity, MissionDetail } from '../../lib/types';

/**
 * Actividades sintéticas para incrustar los modelos 3D interactivos
 * directamente dentro de las pestañas de lectura (2.2, 2.3 y 2.4), sin tener
 * que navegar a la actividad independiente. El contenido replica el de las
 * semillas del backend (m3 model3d "energy-cell", m2 model3d "cell-compare" y
 * m1 animation3d "zoom").
 */

export const ENERGY_CELL_ACTIVITY = {
  _id: 'embedded-energy-cell',
  missionId: 'm3',
  phase: 'desarrollo',
  type: 'model3d',
  order: 0,
  title: 'Célula de la energía',
  instructions:
    'Explora el modelo, mueve los controles de agua, luz y nutrientes y observa qué ocurre con la vacuola y la producción de ATP.',
  required: false,
  completionRule: { type: 'confirm' },
  content: {
    model: 'energy-cell',
    title: 'Célula de la energía',
    intro:
      'Esta célula vegetal reacciona a tus decisiones. Ajusta el agua, la luz y los nutrientes y observa los cambios en la vacuola, los cloroplastos y las mitocondrias.',
    sliders: [
      { id: 'water', label: 'Agua', min: 0, max: 100, initial: 70, lowLabel: 'Poca agua', highLabel: 'Mucha agua', icon: '💧' },
      { id: 'light', label: 'Luz', min: 0, max: 100, initial: 60, lowLabel: 'Oscuridad', highLabel: 'Luz intensa', icon: '☀️' },
      { id: 'nutrients', label: 'Nutrientes', min: 0, max: 100, initial: 65, lowLabel: 'Escasos', highLabel: 'Abundantes', icon: '🥗' }
    ],
    hotspots: [
      { id: 'vacuola', label: 'Vacuola central', description: 'Con agua abundante se infla y mantiene la turgencia.', position: [0, 0.15, 0.4] },
      { id: 'cloroplasto', label: 'Cloroplastos', description: 'Con luz producen glucosa y oxígeno.', position: [0.7, -0.2, 0.35] },
      { id: 'mitocondria', label: 'Mitocondrias', description: 'Con nutrientes y oxígeno producen ATP.', position: [-0.7, -0.3, 0.3] },
      { id: 'membrana', label: 'Membrana', description: 'Regula la entrada y salida de agua y sustancias.', position: [0, 0.9, 0.8] }
    ],
    states: {
      turgent: 'Con agua suficiente, la vacuola está llena y la célula se ve firme.',
      plasmolyzed: 'Con poca agua, la vacuola se reduce y la célula se arruga: plasmólisis.',
      energy: 'Con luz y nutrientes, los cloroplastos producen glucosa y las mitocondrias generan ATP.'
    }
  },
  assetKeys: ['celula_energia_kids.glb'],
  xp: 0
} as Activity;

export const CELL_COMPARE_ACTIVITY = {
  _id: 'embedded-cell-compare',
  missionId: 'm2',
  phase: 'desarrollo',
  type: 'model3d',
  order: 0,
  title: 'Células animal y vegetal en 3D',
  instructions:
    'Gira los modelos, cambia entre célula animal y vegetal, activa las capas y toca los hotspots para conocer cada organelo.',
  required: false,
  completionRule: { type: 'confirm' },
  content: {
    model: 'cell-compare',
    title: 'Dos células para comparar',
    intro:
      'Usa el conmutador para cambiar de célula. Activa o desactiva capas y abre la vista desarmada para ver los organelos por separado.',
    modes: [
      {
        id: 'animal',
        label: 'Célula animal',
        color: '#7dd3fc',
        hotspots: [
          { id: 'membrana', label: 'Membrana', description: 'Barrera flexible que regula el intercambio.', position: [0, 0.9, 0.9] },
          { id: 'nucleo', label: 'Núcleo', description: 'Centro de control con la información genética.', position: [0, 0.2, 0.5] },
          { id: 'mitocondria', label: 'Mitocondrias', description: 'Producen ATP mediante la respiración celular.', position: [0.7, -0.3, 0.4] },
          { id: 'vacuola', label: 'Vacuolas pequeñas', description: 'Almacenan agua y sustancias de forma temporal.', position: [-0.6, -0.2, 0.3] }
        ]
      },
      {
        id: 'vegetal',
        label: 'Célula vegetal',
        color: '#4ade80',
        hotspots: [
          { id: 'pared', label: 'Pared celular', description: 'Capa rígida que da forma y protección.', position: [0, 0.9, 0.9] },
          { id: 'cloroplasto', label: 'Cloroplastos', description: 'Captan la luz y realizan la fotosíntesis.', position: [0.7, -0.3, 0.4] },
          { id: 'vacuola-central', label: 'Vacuola central', description: 'Grande, almacena agua y mantiene la turgencia.', position: [0, 0.1, 0.4] },
          { id: 'nucleo', label: 'Núcleo', description: 'Dirige las actividades de la célula.', position: [-0.7, 0.2, 0.3] }
        ]
      }
    ],
    layers: ['Membrana', 'Citoplasma', 'Núcleo', 'Organelos'],
    sketchfabEmbed: 'cell-animal',
    controls: ['Arrastrar para girar', 'Rueda para acercar', 'Botón de capas', 'Vista desarmada']
  },
  assetKeys: ['celula_animal_kids.glb', 'celula_vegetal_kids.glb'],
  xp: 0
} as Activity;

export const ZOOM_ACTIVITY = {
  _id: 'embedded-zoom',
  missionId: 'm1',
  phase: 'desarrollo',
  type: 'animation3d',
  order: 0,
  title: 'Zoom microscópico: del organismo a la célula',
  instructions: 'Observa la animación y sigue el viaje de la cámara: desde un organismo completo hasta una célula y su núcleo.',
  required: false,
  completionRule: { type: 'confirm' },
  content: {
    title: 'Zoom microscópico',
    intro: 'La cámara se acerca una y otra vez. ¿Hasta dónde puedes llegar?',
    steps: [
      { title: 'El organismo', description: 'Un ser vivo completo, como una planta o un animal.', highlight: 'organismo' },
      { title: 'El tejido', description: 'Muchas células del mismo tipo trabajan juntas.', highlight: 'tejido' },
      { title: 'La célula', description: 'Aparece la membrana, el citoplasma y el núcleo.', highlight: 'celula' },
      { title: 'El núcleo', description: 'Dentro está la información que dirige las actividades.', highlight: 'nucleo' },
      { title: 'Los postulados', description: 'La teoría celular resume lo que descubrimos.', highlight: 'teoria' }
    ],
    durationSeconds: 25,
    closing: 'No importa si es una hoja, una bacteria o una persona: la célula está allí, sosteniendo la vida.'
  },
  assetKeys: ['m1_zoom_celular.glb'],
  xp: 0
} as Activity;

/** Stub de misión para que `Animation3DPlayer` reconozca el comportamiento de zoom (M1). */
export const M1_ZOOM_MISSION = {
  code: 'm1'
} as unknown as MissionDetail;
