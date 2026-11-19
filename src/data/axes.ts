import { AxisId, AxisInfo } from '../types';

export const AXES: AxisInfo[] = [
  {
    id: 1,
    code: 'E01',
    name: {
      pt: 'Alterações e Variabilidade Climáticas',
      en: 'Climate Change and Variability',
    },
    shortName: {
      pt: 'Clima & Variabilidade',
      en: 'Climate & Variability',
    },
    cluster: 'physical',
    color: '#0EA5E9',
    bgTint: 'rgba(14, 165, 233, 0.12)',
    description: {
      pt: 'Modelagem climática regional e global (CMIP6/CMIP7), teleconexões oceano-atmosfera, paleoclima e extremos climáticos na América do Sul.',
      en: 'Regional and global climate modeling (CMIP6/CMIP7), ocean-atmosphere teleconnections, paleoclimate, and South American extremes.',
    },
    leadPIs: ['Ilana Wainer', 'Rosmeri P. da Rocha', 'Cristiano Chiessi'],
    hostUnits: ['IO-USP', 'IAG-USP', 'EACH-USP', 'IEE-USP'],
  },
  {
    id: 2,
    code: 'E02',
    name: {
      pt: 'Redução e Gestão do Risco de Desastres',
      en: 'Disaster Risk Reduction and Management',
    },
    shortName: {
      pt: 'Risco de Desastres',
      en: 'Disaster Risk',
    },
    cluster: 'physical',
    color: '#EF4444',
    bgTint: 'rgba(239, 68, 68, 0.12)',
    description: {
      pt: 'Monitoramento, sistemas de alerta precoce, deslizamentos, inundações bruscas, secas severas e gestão de crises hidrometeorológicas.',
      en: 'Monitoring, early warning systems, landslides, flash floods, severe droughts, and hydrometeorological crisis management.',
    },
    leadPIs: ['José Marengo'],
    hostUnits: ['CEMADEN', 'INPE', 'IEE-USP'],
  },
  {
    id: 3,
    code: 'E03',
    name: {
      pt: 'Transição Energética e Tecnologia',
      en: 'Energy Transition and Technology',
    },
    shortName: {
      pt: 'Transição Energética',
      en: 'Energy Transition',
    },
    cluster: 'systems',
    color: '#F59E0B',
    bgTint: 'rgba(245, 158, 11, 0.12)',
    description: {
      pt: 'Descarbonização da matriz elétrica, energia solar fotovoltaica, resiliência hidrelétrica a secas, armazenamento e redes inteligentes.',
      en: 'Grid decarbonization, solar PV, hydropower resilience under droughts, storage, and smart grid systems.',
    },
    leadPIs: ['Roberto Zilles', 'Ildo Sauer'],
    hostUnits: ['IEE-USP', 'POLI-USP'],
  },
  {
    id: 4,
    code: 'E04',
    name: {
      pt: 'Segurança Alimentar e Redução da Fome',
      en: 'Food Security and Hunger Reduction',
    },
    shortName: {
      pt: 'Segurança Alimentar',
      en: 'Food Security',
    },
    cluster: 'systems',
    color: '#84CC16',
    bgTint: 'rgba(132, 204, 22, 0.13)',
    description: {
      pt: 'Agroclimatologia, zoneamento de risco agrícola, impactos de ondas de calor e estiagens em safras, agricultura familiar e cadeias alimentares.',
      en: 'Agroclimatology, agricultural risk zoning, heat/drought shocks on yields, smallholder farming, and food supply chains.',
    },
    leadPIs: ['Jurandir Zullo'],
    hostUnits: ['CEPAGRI-UNICAMP', 'ESALQ-USP'],
  },
  {
    id: 5,
    code: 'E05',
    name: {
      pt: 'Segurança Hídrica e Gestão Adaptativa',
      en: 'Water Security and Adaptive Management',
    },
    shortName: {
      pt: 'Segurança Hídrica',
      en: 'Water Security',
    },
    cluster: 'systems',
    color: '#06B6D4',
    bgTint: 'rgba(6, 182, 212, 0.12)',
    description: {
      pt: 'Hidrologia de bacias, drenagem urbana sustentável, reservatórios estratégicos, nexo água-energia-alimento e soluções baseadas na natureza.',
      en: 'Watershed hydrology, sustainable urban drainage, strategic reservoirs, water-energy-food nexus, and nature-based solutions.',
    },
    leadPIs: ['Eduardo Mario Mendiondo'],
    hostUnits: ['EESC-USP', 'POLI-USP'],
  },
  {
    id: 6,
    code: 'E06',
    name: {
      pt: 'Segurança em Saúde e Risco de Pandemias',
      en: 'Health Security and Pandemic Risk',
    },
    shortName: {
      pt: 'Saúde & Pandemias',
      en: 'Health & Pandemics',
    },
    cluster: 'systems',
    color: '#EC4899',
    bgTint: 'rgba(236, 72, 153, 0.12)',
    description: {
      pt: 'Estresse térmico urbano, mortalidade cardiovascular, arboviroses (dengue/chikungunya), saúde do trabalhador e preparação sanitária climática.',
      en: 'Urban heat stress, cardiovascular mortality, vector-borne diseases (dengue), occupational health, and climate-driven pandemic preparedness.',
    },
    leadPIs: ['Cláudia Moreno'],
    hostUnits: ['FSP-USP', 'FM-USP'],
  },
  {
    id: 7,
    code: 'E07',
    name: {
      pt: 'Educação e Difusão do Conhecimento',
      en: 'Education and Knowledge Dissemination',
    },
    shortName: {
      pt: 'Educação & Difusão',
      en: 'Education & Outreach',
    },
    cluster: 'crosscutting',
    color: '#8B5CF6',
    bgTint: 'rgba(139, 92, 246, 0.12)',
    description: {
      pt: 'Letramento climático em escolas e municípios, tradução científica para gestores públicos, jornalismo científico e ciência cidadã.',
      en: 'Climate literacy in schools and municipalities, science translation for public managers, science journalism, and citizen science.',
    },
    leadPIs: ['Leila Ferreira'],
    hostUnits: ['IFCH-UNICAMP', 'NEPAM-UNICAMP'],
  },
  {
    id: 8,
    code: 'E08',
    name: {
      pt: 'Inovação na Intervenção Climática',
      en: 'Innovation in Climate Action',
    },
    shortName: {
      pt: 'Inovação Climática',
      en: 'Climate Innovation',
    },
    cluster: 'society',
    color: '#14B8A6',
    bgTint: 'rgba(20, 184, 166, 0.12)',
    description: {
      pt: 'Captura e armazenamento geológico de carbono (CCUS), rotas tecnológicas de remoção de CO2, biogás e inovação industrial de baixo carbono.',
      en: 'Carbon capture and geological storage (CCUS), CO2 removal pathways, biogas, and low-carbon industrial innovation.',
    },
    leadPIs: ['Colombo Tassinari'],
    hostUnits: ['IEE-USP', 'IGc-USP'],
  },
  {
    id: 9,
    code: 'E09',
    name: {
      pt: 'Transformação Social face às Alterações Climáticas',
      en: 'Social Transformation & Climate Change',
    },
    shortName: {
      pt: 'Transformação Social',
      en: 'Social Transformation',
    },
    cluster: 'society',
    color: '#F97316',
    bgTint: 'rgba(249, 115, 22, 0.12)',
    description: {
      pt: 'Governança ambiental participativa, justiça climática, adaptação em territórios vulneráveis, conflitos socioambientais e políticas municipais.',
      en: 'Participatory environmental governance, climate justice, adaptation in vulnerable communities, and municipal climate policy.',
    },
    leadPIs: ['Pedro Jacobi'],
    hostUnits: ['IEE-USP', 'PROCAM-USP'],
  },
  {
    id: 10,
    code: 'E10',
    name: {
      pt: 'Impactos Econômicos da Crise Climática',
      en: 'Economic Impacts of the Climate Crisis',
    },
    shortName: {
      pt: 'Impactos Econômicos',
      en: 'Economic Impacts',
    },
    cluster: 'society',
    color: '#6366F1',
    bgTint: 'rgba(99, 102, 241, 0.12)',
    description: {
      pt: 'Modelos de equilíbrio geral computável (CGE) e insumo-produto inter-regional (IIOA), quantificação de perdas setoriais e financiamento climático.',
      en: 'Computable general equilibrium (CGE) and interregional input-output (IIOA) modeling, sectoral loss valuation, and climate finance.',
    },
    leadPIs: ['Eduardo Haddad'],
    hostUnits: ['FEA-USP', 'NEREUS-USP'],
  },
  {
    id: 11,
    code: 'E11',
    name: {
      pt: 'Amazônia: Desenvolvimento Tecnológico e Sustentável',
      en: 'Amazon: Technological & Sustainable Dev.',
    },
    shortName: {
      pt: 'Amazônia 4.0',
      en: 'Amazon 4.0',
    },
    cluster: 'crosscutting',
    color: '#10B981',
    bgTint: 'rgba(16, 185, 129, 0.12)',
    description: {
      pt: 'Pontos de não retorno (tipping points) na Amazônia, bioeconomia de floresta em pé (Amazônia 4.0), povos indígenas e tecnologia territorial.',
      en: 'Amazon tipping points, standing-forest bioeconomy (Amazonia 4.0), indigenous partnerships, and territorial bio-innovation.',
    },
    leadPIs: ['Carlos Nobre'],
    hostUnits: ['IEA-USP', 'Instituto Amazônia 4.0'],
  },
];

export const AXIS_MAP: Record<AxisId, AxisInfo> = Object.fromEntries(
  AXES.map((a) => [a.id, a])
) as Record<AxisId, AxisInfo>;
