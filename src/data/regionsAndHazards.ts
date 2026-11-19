import { Hazard, StudyRegion } from '../types';

export const STUDY_REGIONS: StudyRegion[] = [
  {
    id: 'rmsp',
    name: { pt: 'Grande São Paulo (RMSP)', en: 'Greater São Paulo (RMSP)' },
    shortName: { pt: 'Grande SP', en: 'Greater SP' },
    emoji: '🏙️',
    state: 'SP',
    biome: { pt: 'Metrópole Urbana', en: 'Urban Metropolis' },
    lat: -23.55,
    lng: -46.63,
    summary: {
      pt: 'Ilhas de calor, enchentes urbanas, saúde pública e economia metropolitana.',
      en: 'Urban heat islands, flash floods, public health, and metropolitan economy.',
    },
  },
  {
    id: 'litoral-norte-sp',
    name: { pt: 'Litoral Norte de SP & Serra do Mar', en: 'São Paulo North Coast & Serra do Mar' },
    shortName: { pt: 'Litoral Norte SP', en: 'SP North Coast' },
    emoji: '⛰️',
    state: 'SP',
    biome: { pt: 'Mata Atlântica Costeira', en: 'Coastal Atlantic Forest' },
    lat: -23.72,
    lng: -45.41,
    summary: {
      pt: 'Chuvas extremas, deslizamentos de encosta, alertas e comunidades costeiras.',
      en: 'Extreme rainfall, landslides, early warnings, and coastal communities.',
    },
  },
  {
    id: 'cantareira-pcj',
    name: { pt: 'Sistema Cantareira & Bacias PCJ', en: 'Cantareira & PCJ Basins' },
    shortName: { pt: 'Cantareira / PCJ', en: 'Cantareira / PCJ' },
    emoji: '💧',
    state: 'SP/MG',
    biome: { pt: 'Mananciais do Sudeste', en: 'Southeast Watersheds' },
    lat: -22.91,
    lng: -46.75,
    summary: {
      pt: 'Abastecimento de água, secas, reservatórios e comitês de bacia.',
      en: 'Water supply, droughts, reservoirs, and watershed governance.',
    },
  },
  {
    id: 'xingu',
    name: { pt: 'Bacia do Xingu & Amazônia Oriental', en: 'Xingu Basin & Eastern Amazon' },
    shortName: { pt: 'Amazônia / Xingu', en: 'Amazon / Xingu' },
    emoji: '🌳',
    state: 'PA/MT',
    biome: { pt: 'Amazônia', en: 'Amazon' },
    lat: -8.15,
    lng: -52.85,
    summary: {
      pt: 'Hidroclima amazônico, energia, povos indígenas e bioeconomia Amazônia 4.0.',
      en: 'Amazon hydroclimate, hydropower, indigenous territories, and bioeconomy.',
    },
  },
  {
    id: 'sul-amazonia',
    name: { pt: 'Sul da Amazônia & Arco do Desmatamento', en: 'Southern Amazon' },
    shortName: { pt: 'Sul da Amazônia', en: 'Southern Amazon' },
    emoji: '🔥',
    state: 'AM/RO/MT',
    biome: { pt: 'Amazônia', en: 'Amazon' },
    lat: -9.85,
    lng: -62.45,
    summary: {
      pt: 'Estresse hídrico florestal, queimadas, fumaça e ponto de não retorno.',
      en: 'Forest drought stress, wildfires, smoke health impacts, and tipping points.',
    },
  },
  {
    id: 'taquari-rs',
    name: { pt: 'Rio Grande do Sul (Taquari & Guaíba)', en: 'Rio Grande do Sul Basins' },
    shortName: { pt: 'Rio Grande do Sul', en: 'Rio Grande do Sul' },
    emoji: '🌊',
    state: 'RS',
    biome: { pt: 'Sul do Brasil', en: 'Southern Brazil' },
    lat: -29.85,
    lng: -51.45,
    summary: {
      pt: 'Enchentes extremas, reconstrução, alertas hidrometeorológicos e perdas econômicas.',
      en: 'Mega-floods, resilient reconstruction, warnings, and economic losses.',
    },
  },
  {
    id: 'cerrado-sp-co',
    name: { pt: 'Cerrado Paulista & Centro-Oeste', en: 'Cerrado & Central-West' },
    shortName: { pt: 'Cerrado', en: 'Cerrado' },
    emoji: '🌾',
    state: 'SP/GO/MT',
    biome: { pt: 'Cerrado', en: 'Cerrado' },
    lat: -16.65,
    lng: -49.25,
    summary: {
      pt: 'Produção de alimentos, safras, bioenergia e captura de carbono (CCUS/BECCS).',
      en: 'Food production, crop yields, bioenergy, and carbon capture.',
    },
  },
  {
    id: 'vale-ribeira',
    name: { pt: 'Vale do Ribeira & Litoral Sul', en: 'Ribeira Valley' },
    shortName: { pt: 'Vale do Ribeira', en: 'Ribeira Valley' },
    emoji: '🌿',
    state: 'SP/PR',
    biome: { pt: 'Mata Atlântica', en: 'Atlantic Forest' },
    lat: -24.55,
    lng: -48.15,
    summary: {
      pt: 'Comunidades tradicionais, educação climática, cheias e conservação.',
      en: 'Traditional communities, climate education, floods, and conservation.',
    },
  },
  {
    id: 'paraiba-sul',
    name: { pt: 'Vale do Paraíba do Sul (Eixo SP–RJ)', en: 'Paraíba do Sul Valley' },
    shortName: { pt: 'Vale do Paraíba', en: 'Paraíba Valley' },
    emoji: '🏭',
    state: 'SP/RJ/MG',
    biome: { pt: 'Mata Atlântica', en: 'Atlantic Forest' },
    lat: -22.65,
    lng: -44.95,
    summary: {
      pt: 'Corredor urbano-industrial, segurança hídrica e riscos de encosta.',
      en: 'Urban-industrial corridor, water security, and slope hazards.',
    },
  },
  {
    id: 'semiarido',
    name: { pt: 'Semiárido Brasileiro', en: 'Brazilian Semi-Arid' },
    shortName: { pt: 'Semiárido', en: 'Semi-Arid' },
    emoji: '🌵',
    state: 'NE',
    biome: { pt: 'Caatinga', en: 'Caatinga' },
    lat: -8.35,
    lng: -39.35,
    summary: {
      pt: 'Secas prolongadas, expansão solar/eólica e agricultura familiar.',
      en: 'Prolonged droughts, solar/wind expansion, and smallholder farming.',
    },
  },
];

export const REGION_MAP: Record<string, StudyRegion> = Object.fromEntries(
  STUDY_REGIONS.map((r) => [r.id, r])
);

export const HAZARDS: Hazard[] = [
  {
    id: 'heatwaves',
    name: { pt: 'Ondas de Calor & Estresse Térmico', en: 'Heatwaves & Thermal Stress' },
    shortName: { pt: 'Ondas de Calor', en: 'Heatwaves' },
    emoji: '🌡️',
    color: '#F97316',
  },
  {
    id: 'extreme-rain-landslides',
    name: { pt: 'Chuvas Extremas & Deslizamentos', en: 'Extreme Rainfall & Landslides' },
    shortName: { pt: 'Chuvas & Deslizamentos', en: 'Rain & Landslides' },
    emoji: '🌧️',
    color: '#EF4444',
  },
  {
    id: 'compound-drought',
    name: { pt: 'Secas Severas & Estiagens', en: 'Severe Droughts' },
    shortName: { pt: 'Secas', en: 'Droughts' },
    emoji: '☀️',
    color: '#D97706',
  },
  {
    id: 'floods',
    name: { pt: 'Enchentes & Inundações', en: 'Floods' },
    shortName: { pt: 'Inundações', en: 'Floods' },
    emoji: '🌊',
    color: '#0EA5E9',
  },
  {
    id: 'amazon-tipping',
    name: { pt: 'Degradação Florestal & Fogo', en: 'Forest Degradation & Fire' },
    shortName: { pt: 'Floresta & Fogo', en: 'Forest & Fire' },
    emoji: '🔥',
    color: '#10B981',
  },
  {
    id: 'energy-stress',
    name: { pt: 'Transição & Risco Energético', en: 'Energy Transition & Grid Risk' },
    shortName: { pt: 'Energia', en: 'Energy' },
    emoji: '⚡',
    color: '#EAB308',
  },
  {
    id: 'health-vectors',
    name: { pt: 'Saúde Pública & Epidemias', en: 'Public Health & Epidemics' },
    shortName: { pt: 'Saúde', en: 'Health' },
    emoji: '🏥',
    color: '#EC4899',
  },
  {
    id: 'crop-shock',
    name: { pt: 'Risco Agrícola & Alimentar', en: 'Agricultural & Food Risk' },
    shortName: { pt: 'Alimentos', en: 'Food Risk' },
    emoji: '🌾',
    color: '#84CC16',
  },
];

export const HAZARD_MAP: Record<string, Hazard> = Object.fromEntries(
  HAZARDS.map((h) => [h.id, h])
);
