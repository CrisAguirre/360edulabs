export interface ModelEmbedConfig {
  id: string;
  title: string;
  author: string;
  embedUrl: string;
  modelUrl: string;
  description?: string;
}

export const MODEL_EMBEDS: Record<string, ModelEmbedConfig> = {
  // Célula animal (Misión 2 - Model 3D)
  'cell-animal': {
    id: 'cell-animal',
    title: 'Célula animal 2',
    author: 'Tec | VR',
    embedUrl: 'https://sketchfab.com/models/47baced2318049f3bb119f0c3f020954/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/celula-animal-2-47baced2318049f3bb119f0c3f020954',
    description: 'Estructura tridimensional detallada de la célula animal y sus organelos.'
  },
  // Célula vegetal (Misión 2 - Model 3D)
  'cell-plant': {
    id: 'cell-plant',
    title: 'Célula Vegetal',
    author: 'SAV. Universidad de Sevilla',
    embedUrl: 'https://sketchfab.com/models/9689d81987c046819de5a98a182df3ef/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/celula-vegetal-9689d81987c046819de5a98a182df3ef',
    description: 'Célula vegetal interactiva con pared celular, vacuola central y cloroplastos.'
  },
  // Célula energía (Misión 3 - Model 3D)
  'energy-cell': {
    id: 'energy-cell',
    title: 'Célula vegetal interactiva (Metabolismo y Energía)',
    author: 'Orii',
    embedUrl: 'https://sketchfab.com/models/d7b45968847b40fb8c9527b3f896e97a/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/celula-vegetal-interactiva-d7b45968847b40fb8c9527b3f896e97a',
    description: 'Modelo interactivo que representa las rutas de flujo y producción de energía vegetal.'
  },
  // M1 Zoom microscópico 3D
  'm1_zoom_celula': {
    id: 'm1_zoom_celula',
    title: 'Eukaryotic cell cross-section (Zoom celular)',
    author: 'Ebers',
    embedUrl: 'https://sketchfab.com/models/74f714127a8c4211bb1a2cac7195fb1a/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/eukaryotic-cell-cross-section-74f714127a8c4211bb1a2cac7195fb1a',
    description: 'Corte transversal inmersivo desde el exterior hacia el núcleo celular.'
  },
  // M2 Comparación celular 3D
  'm2_comparacion_celular': {
    id: 'm2_comparacion_celular',
    title: 'Plant and Animal Cells (Comparación anatómica)',
    author: 'AVRcontent',
    embedUrl: 'https://sketchfab.com/models/cbdf7e677572492dacbb5834081592e7/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/plant-and-animal-cells-cbdf7e677572492dacbb5834081592e7',
    description: 'Modelos simultáneos de célula animal y vegetal para identificar analogías y diferencias.'
  },
  // Organelo: Núcleo celular
  'organelo_nucleo': {
    id: 'organelo_nucleo',
    title: 'Núcleo y Nucléolo',
    author: 'Laboratorio Virtual',
    embedUrl: 'https://sketchfab.com/models/de89ce1324504883877b24df4c989853/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/nucleolo-de89ce1324504883877b24df4c989853',
    description: 'Centro de control genético de la célula eucariota.'
  },
  // Organelo: Mitocondria
  'organelo_mitocondria': {
    id: 'organelo_mitocondria',
    title: 'Mitocondria',
    author: '(MEDPIXEL)',
    embedUrl: 'https://sketchfab.com/models/e1b1e04ccfe34caf9e59ee39ebe547cc/embed?autostart=1&ui_theme=dark',
    modelUrl: 'https://sketchfab.com/3d-models/mitocondria-e1b1e04ccfe34caf9e59ee39ebe547cc',
    description: 'Central energética celular donde se sintetiza el ATP mediante respiración celular.'
  }
};

export interface OrganelleItem {
  id: string;
  name: string;
  type: 'embed' | 'glb' | '2d-animation';
  embedKey?: string;
  glbUrl?: string;
  badge: string;
  description: string;
  cellTypes: 'both' | 'plant-only' | 'animal-only';
  functionSummary: string;
  accent: string;
}

export const ORGANELLES_CATALOG: OrganelleItem[] = [
  {
    id: 'nucleo',
    name: 'Núcleo y Nucléolo',
    type: 'embed',
    embedKey: 'organelo_nucleo',
    badge: 'Centro de Control',
    description: 'Alberga el material genético (ADN) y dirige todas las funciones vitales, síntesis de proteínas y división celular.',
    cellTypes: 'both',
    functionSummary: 'Dirige la actividad celular y protege el ADN.',
    accent: '#818cf8'
  },
  {
    id: 'mitocondria',
    name: 'Mitocondria',
    type: 'embed',
    embedKey: 'organelo_mitocondria',
    badge: 'Central Energética',
    description: 'Realiza la respiración celular descomponiendo glucosa con oxígeno para producir moléculas de ATP (energía utilizable).',
    cellTypes: 'both',
    functionSummary: 'Genera el 90 % de la energía celular en forma de ATP.',
    accent: '#fbbf24'
  },
  {
    id: 'cloroplasto',
    name: 'Cloroplasto',
    type: 'glb',
    glbUrl: '/models/organelo_cloroplasto.glb',
    badge: 'Fábrica de Azúcar',
    description: 'Contiene clorofila que captura la energía de la luz solar para convertir agua y dióxido de carbono en glucosa y oxígeno.',
    cellTypes: 'plant-only',
    functionSummary: 'Realiza la fotosíntesis (exclusivo de plantas y algas).',
    accent: '#4ade80'
  },
  {
    id: 'membrana',
    name: 'Membrana Plasmática',
    type: 'glb',
    glbUrl: '/models/organelo_membrana.glb',
    badge: 'Frontera Selectiva',
    description: 'Bicapa de fosfolípidos con proteínas que delimita la célula y regula el transporte selectivo de agua, iones y nutrientes.',
    cellTypes: 'both',
    functionSummary: 'Controla qué entra y qué sale de la célula.',
    accent: '#38bdf8'
  },
  {
    id: 'vacuola',
    name: 'Vacuola Central',
    type: 'glb',
    glbUrl: '/models/organelo_vacuola.glb',
    badge: 'Tanque de Presión y Reserva',
    description: 'Gran saco membranoso que acumula agua y reservas, ejerciendo presión de turgencia contra la pared para sostener la planta.',
    cellTypes: 'plant-only',
    functionSummary: 'Mantiene la turgencia y almacena sustancias de reserva.',
    accent: '#2dd4bf'
  },
  {
    id: 'pared',
    name: 'Pared Celular',
    type: '2d-animation',
    badge: 'Armadura Protectora',
    description: 'Capa rígida y porosa compuesta principalmente de fibras de celulosa que envuelve la membrana y protege a la célula vegetal.',
    cellTypes: 'plant-only',
    functionSummary: 'Soporte mecánico y protección contra lisis osmótica.',
    accent: '#10b981'
  }
];
