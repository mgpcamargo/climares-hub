import { Hazard, StudyRegion } from '../types';

export const STUDY_REGIONS: StudyRegion[] = [
  {
    id: 'rmsp',
    name: { pt: 'Região Metropolitana de São Paulo (RMSP)', en: 'São Paulo Metropolitan Region (RMSP)' },
    state: 'SP',
    biome: { pt: 'Mata Atlântica / Urbano', en: 'Atlantic Forest / Urban' },
    lat: -23.55,
    lng: -46.63,
    summary: {
      pt: 'Maior metrópole da América do Sul: foco crítico de ilhas de calor urbano, alagamentos relâmpago, mortalidade por calor e perdas econômicas em cadeias de serviço.',
      en: 'South America’s largest metropolis: critical hotspot for urban heat islands, flash floods, heat mortality, and service-sector disruption.',
    },
  },
  {
    id: 'litoral-norte-sp',
    name: { pt: 'Litoral Norte de São Paulo', en: 'São Paulo North Coast' },
    state: 'SP',
    biome: { pt: 'Mata Atlântica / Serra do Mar', en: 'Atlantic Forest / Serra do Mar' },
    lat: -23.72,
    lng: -45.41,
    summary: {
      pt: 'Encostas da Serra do Mar (São Sebastião, Caraguatatuba, Ubatuba): chuvas orográficas extremas, deslizamentos, infraestrutura rodoviária vulnerável e justiça climática.',
      en: 'Serra do Mar slopes (São Sebastião, Ubatuba): extreme orographic rainfall, landslides, vulnerable coastal infrastructure, and climate justice.',
    },
  },
  {
    id: 'cantareira-pcj',
    name: { pt: 'Sistema Cantareira & Bacias PCJ', en: 'Cantareira System & PCJ Basins' },
    state: 'SP/MG',
    biome: { pt: 'Mata Atlântica / Transição', en: 'Atlantic Forest / Transition' },
    lat: -22.91,
    lng: -46.75,
    summary: {
      pt: 'Manancial estratégico que abastece milhões em SP e Campinas: nexo entre secas prolongadas, segurança hídrica, agricultura periurbana e governança de comitês de bacia.',
      en: 'Strategic water supply for São Paulo and Campinas: drought-water nexus, reservoir resilience, peri-urban farming, and watershed governance.',
    },
  },
  {
    id: 'xingu',
    name: { pt: 'Bacia do Xingu (Amazônia)', en: 'Xingu River Basin (Amazon)' },
    state: 'PA/MT',
    biome: { pt: 'Amazônia / Transição Cerrado', en: 'Amazon / Cerrado Transition' },
    lat: -8.15,
    lng: -52.85,
    summary: {
      pt: 'Fronteira climática e socioambiental da Amazônia: variabilidade hidroclimática extrema, hidrelétrica de Belo Monte, territórios indígenas e cadeias da bioeconomia.',
      en: 'Amazon hydroclimatic frontier: extreme drought variability, Belo Monte hydropower exposure, indigenous lands, and standing-forest bioeconomy.',
    },
  },
  {
    id: 'sul-amazonia',
    name: { pt: 'Sul da Amazônia & Arco do Desmatamento', en: 'Southern Amazon & Deforestation Arc' },
    state: 'AM/RO/MT',
    biome: { pt: 'Amazônia', en: 'Amazon' },
    lat: -9.85,
    lng: -62.45,
    summary: {
      pt: 'Zona crítica de estresse hídrico da floresta, fumaça de queimadas com impacto respiratório, risco de savanização e inovação em restauração produtiva.',
      en: 'Critical forest drought-stress zone, wildfire smoke health burden, savannization tipping point risk, and productive restoration innovation.',
    },
  },
  {
    id: 'taquari-rs',
    name: { pt: 'Bacia Taquari-Antas & Guaíba (RS)', en: 'Taquari-Antas & Guaíba Basin (RS)' },
    state: 'RS',
    biome: { pt: 'Pampa / Mata Atlântica', en: 'Pampa / Atlantic Forest' },
    lat: -29.85,
    lng: -51.45,
    summary: {
      pt: 'Palco do desastre histórico de maio de 2024: laboratório vivo para atribuição de extremos, modelagem hidrodinâmica, perdas no PIB nacional e reconstrução resiliente.',
      en: 'Site of the historic May 2024 flood catastrophe: living lab for extreme event attribution, hydrodynamic modeling, GDP losses, and resilient recovery.',
    },
  },
  {
    id: 'cerrado-sp-co',
    name: { pt: 'Cerrado Paulista & Centro-Oeste', en: 'São Paulo & Central-West Cerrado' },
    state: 'SP/GO/MT',
    biome: { pt: 'Cerrado', en: 'Cerrado' },
    lat: -16.65,
    lng: -49.25,
    summary: {
      pt: 'Coração agroenergético do Brasil: vulnerabilidade da safrinha e cana-de-açúcar a ondas de calor-seca compostas, recarga de aquíferos e armazenamento de CO2 (CCUS/BECCS).',
      en: 'Brazil’s agro-energy heartland: crop and sugarcane vulnerability to compound heat-drought, aquifer recharge, and BECCS/CCUS carbon storage.',
    },
  },
  {
    id: 'vale-ribeira',
    name: { pt: 'Vale do Ribeira (SP/PR)', en: 'Ribeira Valley (SP/PR)' },
    state: 'SP/PR',
    biome: { pt: 'Mata Atlântica', en: 'Atlantic Forest' },
    lat: -24.55,
    lng: -48.15,
    summary: {
      pt: 'Maior contínuo de Mata Atlântica de SP com comunidades quilombolas e caiçaras: cheias recorrentes, adaptação baseada em ecossistemas e educação climática territorial.',
      en: 'Largest Atlantic Forest corridor in SP with Quilombola communities: recurring river floods, ecosystem-based adaptation, and territorial climate education.',
    },
  },
  {
    id: 'paraiba-sul',
    name: { pt: 'Bacia do Paraíba do Sul', en: 'Paraíba do Sul Basin' },
    state: 'SP/RJ/MG',
    biome: { pt: 'Mata Atlântica', en: 'Atlantic Forest' },
    lat: -22.65,
    lng: -44.95,
    summary: {
      pt: 'Corredor industrial e energético Rio–São Paulo: conflitos pelo uso múltiplo da água, enchentes urbanas e riscos à infraestrutura logística estratégica.',
      en: 'Rio–São Paulo industrial & energy corridor: multi-use water conflicts, urban flooding, and risk to strategic logistics corridors.',
    },
  },
  {
    id: 'semiarido',
    name: { pt: 'Semiárido Nordestino', en: 'Northeast Semi-Arid (Caatinga)' },
    state: 'CE/PE/BA',
    biome: { pt: 'Caatinga', en: 'Caatinga' },
    lat: -8.35,
    lng: -39.35,
    summary: {
      pt: 'Fronteira de aridização, expansão solar e eólica acelerada, vulnerabilidade da agricultura familiar, migrações climáticas e convivência adaptativa com a seca.',
      en: 'Aridification frontier, rapid solar/wind expansion, smallholder food vulnerability, climate migration, and drought resilience.',
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
    color: '#F97316',
  },
  {
    id: 'extreme-rain-landslides',
    name: { pt: 'Chuvas Extremas & Deslizamentos', en: 'Extreme Rainfall & Landslides' },
    shortName: { pt: 'Chuvas & Deslizamentos', en: 'Rain & Landslides' },
    color: '#EF4444',
  },
  {
    id: 'compound-drought',
    name: { pt: 'Secas Severas & Eventos Compostos', en: 'Severe Droughts & Compound Events' },
    shortName: { pt: 'Seca Composta', en: 'Compound Drought' },
    color: '#D97706',
  },
  {
    id: 'floods',
    name: { pt: 'Inundações Fluviais & Urbanas', en: 'Riverine & Urban Floods' },
    shortName: { pt: 'Inundações', en: 'Floods' },
    color: '#0EA5E9',
  },
  {
    id: 'amazon-tipping',
    name: { pt: 'Ponto de Não Retorno & Queimadas', en: 'Amazon Tipping Point & Wildfires' },
    shortName: { pt: 'Tipping Point Amazônia', en: 'Amazon Tipping' },
    color: '#10B981',
  },
  {
    id: 'energy-stress',
    name: { pt: 'Estresse Hidrelétrico & Rede Elétrica', en: 'Hydropower & Grid Stress' },
    shortName: { pt: 'Estresse Energético', en: 'Grid Stress' },
    color: '#EAB308',
  },
  {
    id: 'health-vectors',
    name: { pt: 'Arboviroses & Risco Sanitário', en: 'Vector-Borne & Health Risk' },
    shortName: { pt: 'Saúde & Arboviroses', en: 'Health & Vectors' },
    color: '#EC4899',
  },
  {
    id: 'crop-shock',
    name: { pt: 'Quebra de Safra & Choque Alimentar', en: 'Crop Yield & Food Shock' },
    shortName: { pt: 'Choque Agrícola', en: 'Crop Shock' },
    color: '#84CC16',
  },
];

export const HAZARD_MAP: Record<string, Hazard> = Object.fromEntries(
  HAZARDS.map((h) => [h.id, h])
);
