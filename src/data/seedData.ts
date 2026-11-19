import {
  CollaborationEdge,
  CommonsAsset,
  CrossAxisMission,
  Researcher,
} from '../types';

export const SEED_RESEARCHERS: Researcher[] = [
  // ======================== EIXO 1: ALTERAÇÕES E VARIABILIDADE CLIMÁTICAS ========================
  {
    id: 'tercio-ambrizzi',
    name: 'Tércio Ambrizzi',
    role: 'coordinator',
    institution: 'USP',
    unit: 'IEE-USP / IAG-USP',
    city: 'São Paulo, SP',
    primaryAxis: 1,
    secondaryAxes: [2, 11],
    bio: {
      pt: 'Coordenador Geral do CEPID CLIMARES e Professor Titular (USP). Pesquisa dinâmica atmosférica, teleconexões de grande escala, eventos extremos e cenários climáticos para a América do Sul.',
      en: 'General Coordinator of CEPID CLIMARES and Full Professor (USP). Researches atmospheric dynamics, large-scale teleconnections, extremes, and South American climate scenarios.',
    },
    email: 'ambrizzi@usp.br',
    bvFapespUrl: 'https://bv.fapesp.br/pt/pesquisador/770/tercio-ambrizzi/',
    lattesUrl: 'http://lattes.cnpq.br/',
    methods: ['RegCM', 'CMIP6/CMIP7', 'Teleconexões', 'Dinâmica Atmosférica', 'Análise de Extremos'],
    regions: ['rmsp', 'taquari-rs', 'xingu', 'cantareira-pcj'],
    hazards: ['heatwaves', 'extreme-rain-landslides', 'compound-drought', 'floods'],
    offers: [
      {
        id: 'off-tercio-1',
        domain: 'climate_projections',
        label: {
          pt: 'Conjunto de projeções regionais (RegCM/CORDEX) para América do Sul',
          en: 'Regional climate projections ensemble (RegCM/CORDEX) for South America',
        },
        scale: '12–25 km • 1980–2100',
      },
      {
        id: 'off-tercio-2',
        domain: 'social_governance',
        label: {
          pt: 'Articulação institucional CEPID / FAPESP e síntese inter-eixos',
          en: 'CEPID / FAPESP institutional synthesis & cross-axis integration',
        },
      },
    ],
    needs: [
      {
        id: 'need-tercio-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Tradução de cenários físicos de extremos em métricas de impacto econômico e políticas públicas',
          en: 'Translating physical extreme scenarios into economic loss and policy metrics',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief', 'committee'],
    publications: [
      {
        title: 'Extreme precipitation and blocking dynamics over Southern and Southeastern Brazil under warming scenarios',
        year: 2025,
        journal: 'Climate Dynamics',
        coAuthorIds: ['rosmeri-rocha', 'jose-marengo'],
        crossAxis: true,
      },
      {
        title: 'CLIMARES: Integrating climate science and disaster resilience across 11 thematic axes in Brazil',
        year: 2024,
        journal: 'Estudos Avançados',
        coAuthorIds: ['carlos-nobre', 'pedro-jacobi'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'ilana-wainer',
    name: 'Ilana Wainer',
    role: 'pi',
    institution: 'USP',
    unit: 'IO-USP',
    city: 'São Paulo, SP',
    primaryAxis: 1,
    secondaryAxes: [2],
    bio: {
      pt: 'Investigadora Principal do Eixo 1 (IO-USP). Especialista em interação oceano-atmosfera, variabilidade do Atlântico Sul e simulações acopladas de modelos do sistema terrestre.',
      en: 'Axis 1 Principal Investigator (IO-USP). Specialist in ocean-atmosphere interaction, South Atlantic variability, and coupled Earth System Models.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Modelos Acoplados Oceano-Atmosfera', 'CESM', 'CMIP6/CMIP7', 'Variabilidade do Atlântico Sul'],
    regions: ['litoral-norte-sp', 'taquari-rs', 'semiarido'],
    hazards: ['extreme-rain-landslides', 'compound-drought'],
    offers: [
      {
        id: 'off-ilana-1',
        domain: 'climate_projections',
        label: {
          pt: 'Índices de anomalias de TSM do Atlântico Sul e extremos costeiros (CMIP)',
          en: 'South Atlantic SST anomaly indices and coastal extremes (CMIP)',
        },
        scale: 'Bacia Atlântica • Mensal/Diário',
      },
    ],
    needs: [
      {
        id: 'need-ilana-1',
        domain: 'social_governance',
        label: {
          pt: 'Demandas de municípios costeiros sobre elevação do nível do mar e ressacas',
          en: 'Coastal municipality needs regarding sea-level rise and storm surges',
        },
      },
    ],
    availability: ['coauthor', 'committee', 'mentoring'],
    publications: [
      {
        title: 'South Atlantic subtropical dipole and extreme coastal rainfall events in Southeast Brazil',
        year: 2024,
        journal: 'Journal of Climate',
        coAuthorIds: ['rosmeri-rocha'],
      },
    ],
  },
  {
    id: 'rosmeri-rocha',
    name: 'Rosmeri P. da Rocha',
    role: 'pi',
    institution: 'USP',
    unit: 'IAG-USP',
    city: 'São Paulo, SP',
    primaryAxis: 1,
    secondaryAxes: [2, 3],
    bio: {
      pt: 'Investigadora Principal do Eixo 1 (IAG-USP). Lidera pesquisas em downscaling dinâmico (RegCM/WRF), ciclones extratropicais e projeções de vento e precipitação extrema na América do Sul.',
      en: 'Axis 1 Principal Investigator (IAG-USP). Leads research in dynamical downscaling (RegCM/WRF), extratropical cyclones, and extreme wind/rainfall projections.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['RegCM5', 'WRF', 'CORDEX', 'Ciclones Extratropicais', 'Extremos de Vento/Chuva'],
    regions: ['rmsp', 'litoral-norte-sp', 'taquari-rs', 'semiarido'],
    hazards: ['extreme-rain-landslides', 'floods', 'energy-stress'],
    offers: [
      {
        id: 'off-rosmeri-1',
        domain: 'climate_projections',
        label: {
          pt: 'Simulações RegCM5/WRF de alta resolução (precipitação horária, vento e radiação)',
          en: 'High-resolution RegCM5/WRF runs (hourly rainfall, wind, and solar radiation)',
        },
        scale: '4–12 km • Subdiário',
      },
      {
        id: 'off-rosmeri-2',
        domain: 'energy_grid',
        label: {
          pt: 'Projeções climáticas de potencial eólico e solar no Brasil sob SSP2-4.5 e SSP5-8.5',
          en: 'Climate projections for wind & solar potential in Brazil under SSP2-4.5/SSP5-8.5',
        },
      },
    ],
    needs: [
      {
        id: 'need-rosmeri-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Parcerias para acoplar saídas subdiárias do WRF a modelos hidrológicos urbanos',
          en: 'Partners to couple sub-daily WRF outputs with urban hydrological models',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'committee'],
    publications: [
      {
        title: 'Convection-permitting simulations of the 2023 São Sebastião extreme rainfall event',
        year: 2025,
        journal: 'Atmospheric Research',
        coAuthorIds: ['tercio-ambrizzi', 'marcelo-camargo-demo'],
      },
    ],
  },
  {
    id: 'cristiano-chiessi',
    name: 'Cristiano Chiessi',
    role: 'pi',
    institution: 'USP',
    unit: 'EACH-USP',
    city: 'São Paulo, SP',
    primaryAxis: 1,
    secondaryAxes: [11],
    bio: {
      pt: 'Investigador Principal do Eixo 1 (EACH-USP). Especialista em paleoclimatologia, dinâmica do Sistema de Monção da América do Sul e respostas históricas da Amazônia e do Nordeste.',
      en: 'Axis 1 Principal Investigator (EACH-USP). Specialist in paleoclimatology, South American Monsoon dynamics, and historical hydroclimate shifts in the Amazon and Northeast.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Paleoclima', 'Monção Sul-Americana', 'Proxies Marinhos/Espeleotemas', 'Reconstrução Hidroclimática'],
    regions: ['xingu', 'semiarido', 'sul-amazonia'],
    hazards: ['compound-drought', 'amazon-tipping'],
    offers: [
      {
        id: 'off-cristiano-1',
        domain: 'climate_projections',
        label: {
          pt: 'Séries paleoclimáticas de megassecas e regimes de monção na Amazônia e Semiárido',
          en: 'Paleoclimate series of megadroughts and monsoon shifts in Amazon & Semi-Arid',
        },
      },
    ],
    needs: [
      {
        id: 'need-cristiano-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Integração de limiares paleoclimáticos com modelos de transição floresta-savana',
          en: 'Integrating paleoclimate thresholds with forest-savanna transition models',
        },
      },
    ],
    availability: ['coauthor', 'mentoring'],
    publications: [
      {
        title: 'Centennial-scale hydroclimatic variability across the Xingu and Eastern Amazon',
        year: 2024,
        journal: 'Nature Geoscience',
        coAuthorIds: ['carlos-nobre'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'marcelo-camargo-demo',
    name: 'Lucas Ferreira (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'IAG-USP',
    city: 'São Paulo, SP',
    primaryAxis: 1,
    secondaryAxes: [5, 11],
    bio: {
      pt: 'Doutorando em Meteorologia (IAG-USP). Desenvolve pipelines abertos de extração e correção de viés de dados CMIP6/CMIP7 (Python/Xarray) para bacias brasileiras e análise de eventos compostos seca-calor.',
      en: 'PhD Candidate in Meteorology (IAG-USP). Builds open CMIP6/CMIP7 extraction & bias-correction pipelines (Python/Xarray) for Brazilian watersheds and compound drought-heat events.',
    },
    email: 'lucas.ferreira.demo@usp.br',
    githubUrl: 'https://github.com/',
    methods: ['Python/Xarray', 'CMIP7', 'Bias Correction (QDM)', 'Microfísica de Nuvens', 'ERA5'],
    regions: ['xingu', 'rmsp', 'cantareira-pcj', 'taquari-rs'],
    hazards: ['heatwaves', 'compound-drought', 'extreme-rain-landslides'],
    offers: [
      {
        id: 'off-lucas-1',
        domain: 'climate_projections',
        label: {
          pt: 'Extração sob demanda e correção de viés CMIP6/CMIP7 (Tmax, Tmin, Precip, UR) por recorte de bacia ou município',
          en: 'On-demand CMIP6/CMIP7 extraction & bias correction (Tmax, Tmin, Precip, RH) by watershed or municipality',
        },
        scale: '0.1° diário • NetCDF / CSV',
      },
      {
        id: 'off-lucas-2',
        domain: 'geospatial_code',
        label: {
          pt: 'Scripts Python/Xarray e ferramenta web de download de recortes climáticos',
          en: 'Python/Xarray scripts and web tool for climate area extraction',
        },
      },
    ],
    needs: [
      {
        id: 'need-lucas-1',
        domain: 'health_epi',
        label: {
          pt: 'Definição de limiares epidemiológicos (temperatura de bulbo úmido / dias consecutivos) úteis para o Eixo 6',
          en: 'Epidemiological heat thresholds (wet-bulb temp / consecutive days) relevant for Axis 6',
        },
      },
      {
        id: 'need-lucas-2',
        domain: 'economic_modeling',
        label: {
          pt: 'Formato ideal de índices climáticos agregados por município para alimentar modelos econômicos',
          en: 'Preferred municipal climate-shock index format for economic CGE models',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [
      {
        title: 'Hydroclimatic extremes and compound heat-drought trajectories in the Xingu Basin under CMIP6/CMIP7',
        year: 2025,
        journal: 'International Journal of Climatology',
        coAuthorIds: ['rosmeri-rocha'],
      },
    ],
    isDemoProfile: true,
  },

  // ======================== EIXO 2: REDUÇÃO E GESTÃO DO RISCO DE DESASTRES ========================
  {
    id: 'jose-marengo',
    name: 'José Marengo',
    role: 'pi',
    institution: 'CEMADEN',
    unit: 'CEMADEN / MCTI',
    city: 'São José dos Campos, SP',
    primaryAxis: 2,
    secondaryAxes: [1, 5, 11],
    bio: {
      pt: 'Investigador Principal do Eixo 2 (CEMADEN). Referência internacional em extremos hidrometeorológicos, secas na Amazônia e Nordeste, deslizamentos e sistemas de alerta precoce.',
      en: 'Axis 2 Principal Investigator (CEMADEN). Leading authority on hydrometeorological extremes, Amazon & Northeast droughts, landslides, and early warning systems.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Alertas Precoces', 'Monitoramento de Secas', 'Análise de Desastres', 'Atribuição de Extremos'],
    regions: ['litoral-norte-sp', 'taquari-rs', 'sul-amazonia', 'semiarido', 'rmsp'],
    hazards: ['extreme-rain-landslides', 'compound-drought', 'floods'],
    offers: [
      {
        id: 'off-marengo-1',
        domain: 'extreme_hazards',
        label: {
          pt: 'Catálogo histórico de alertas de deslizamentos, inundações e secas severas (CEMADEN)',
          en: 'Historical catalog of landslide, flood, and severe drought warnings (CEMADEN)',
        },
        scale: 'Municipal Brasil • 2014–2026',
      },
    ],
    needs: [
      {
        id: 'need-marengo-1',
        domain: 'education_comm',
        label: {
          pt: 'Estratégias de comunicação de risco e resposta comunitária à última milha dos alertas',
          en: 'Last-mile risk communication and community response strategies for early warnings',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief', 'committee'],
    publications: [
      {
        title: 'The 2024 Rio Grande do Sul mega-flood: hydrometeorological drivers and disaster governance lessons',
        year: 2025,
        journal: 'Natural Hazards',
        coAuthorIds: ['tercio-ambrizzi', 'eduardo-mendiondo'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'camila-santos-demo',
    name: 'Camila Vasconcelos (Exemplo)',
    role: 'postdoc',
    institution: 'CEMADEN',
    unit: 'CEMADEN / Sala de Situação',
    city: 'São José dos Campos, SP',
    primaryAxis: 2,
    secondaryAxes: [5],
    bio: {
      pt: 'Pós-doutoranda no CEMADEN. Modelagem de limiares críticos de chuva-deslizamento na Serra do Mar e integração de radares meteorológicos com sensores geotécnicos.',
      en: 'Postdoctoral Fellow at CEMADEN. Models critical rainfall-landslide thresholds along Serra do Mar and integrates weather radar with geotechnical sensors.',
    },
    email: 'camila.demo@cemaden.gov.br',
    methods: ['Limiares Chuva-Deslizamento', 'Radar Meteorológico', 'Machine Learning', 'SIG / QGIS'],
    regions: ['litoral-norte-sp', 'paraiba-sul', 'rmsp'],
    hazards: ['extreme-rain-landslides', 'floods'],
    offers: [
      {
        id: 'off-camila-1',
        domain: 'extreme_hazards',
        label: {
          pt: 'Séries subdiárias de pluviômetros CEMADEN e polígonos de áreas de risco na Serra do Mar',
          en: 'Sub-daily CEMADEN rain gauge series and landslide hazard polygons in Serra do Mar',
        },
        scale: '10 min • Litoral Norte SP',
      },
    ],
    needs: [
      {
        id: 'need-camila-1',
        domain: 'climate_projections',
        label: {
          pt: 'Projeções subdiárias de chuva extrema (WRF/RegCM) para recalibrar limiares de deslizamento para 2050',
          en: 'Sub-daily extreme rainfall projections (WRF/RegCM) to recalibrate 2050 landslide thresholds',
        },
      },
      {
        id: 'need-camila-2',
        domain: 'social_governance',
        label: {
          pt: 'Mapeamento participativo de percepção de risco em bairros vulneráveis de São Sebastião',
          en: 'Participatory risk perception mapping in vulnerable São Sebastião neighborhoods',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'fieldwork'],
    publications: [
      {
        title: 'Machine learning thresholds for shallow landslides along São Paulo North Coast',
        year: 2025,
        journal: 'Landslides',
        coAuthorIds: ['jose-marengo'],
      },
    ],
    isDemoProfile: true,
  },
  {
    id: 'rafael-mendes-demo',
    name: 'Rafael Mendes (Exemplo)',
    role: 'phd',
    institution: 'INPE',
    unit: 'CST-INPE',
    city: 'São José dos Campos, SP',
    primaryAxis: 2,
    secondaryAxes: [1],
    bio: {
      pt: 'Doutorando em Ciência do Sistema Terrestre (INPE). Sensoriamento remoto de cicatrizes de inundações (Sentinel-1 SAR) e avaliação rápida de danos em infraestrutura.',
      en: 'PhD Candidate in Earth System Science (INPE). Remote sensing of flood extents (Sentinel-1 SAR) and rapid infrastructure damage mapping.',
    },
    methods: ['Google Earth Engine', 'Sentinel-1 SAR', 'Sensoriamento Remoto', 'Python'],
    regions: ['taquari-rs', 'vale-ribeira', 'litoral-norte-sp'],
    hazards: ['floods', 'extreme-rain-landslides'],
    offers: [
      {
        id: 'off-rafael-1',
        domain: 'geospatial_code',
        label: {
          pt: 'Manchas de inundação mapeadas por radar SAR (10m) para eventos extremos no RS e Vale do Ribeira',
          en: '10m SAR-derived flood inundation footprints for RS and Ribeira Valley events',
        },
        scale: '10 m • GeoTIFF',
      },
    ],
    needs: [
      {
        id: 'need-rafael-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Curvas de dano econômico para converter manchas de inundação SAR em estimativas de prejuízo municipal',
          en: 'Economic damage curves to convert SAR flood footprints into municipal financial loss estimates',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 3: TRANSIÇÃO ENERGÉTICA E TECNOLOGIA ========================
  {
    id: 'roberto-zilles',
    name: 'Roberto Zilles',
    role: 'pi',
    institution: 'USP',
    unit: 'IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 3,
    secondaryAxes: [8],
    bio: {
      pt: 'Investigador Principal do Eixo 3 (IEE-USP). Professor Titular especializado em sistemas fotovoltaicos conectados à rede, microrredes solares e transição energética descentralizada.',
      en: 'Axis 3 Principal Investigator (IEE-USP). Full Professor specializing in grid-connected solar PV systems, microgrids, and decentralized energy transition.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Sistemas Fotovoltaicos', 'Microrredes', 'Armazenamento de Energia', 'Qualidade de Energia'],
    regions: ['rmsp', 'semiarido', 'xingu'],
    hazards: ['energy-stress', 'heatwaves'],
    offers: [
      {
        id: 'off-zilles-1',
        domain: 'energy_grid',
        label: {
          pt: 'Modelos de desempenho de microrredes solares/baterias para resiliência de serviços essenciais',
          en: 'Solar/battery microgrid resilience models for critical municipal infrastructure',
        },
      },
    ],
    needs: [
      {
        id: 'need-zilles-1',
        domain: 'climate_projections',
        label: {
          pt: 'Séries futuras de irradiação solar, nebulosidade e ondas de calor (queda de eficiência PV)',
          en: 'Future solar irradiance, cloud cover, and heatwave series (PV efficiency derating)',
        },
      },
    ],
    availability: ['coauthor', 'committee', 'policy_brief'],
    publications: [
      {
        title: 'Distributed solar microgrids for critical infrastructure resilience during extreme grid outages in São Paulo',
        year: 2024,
        journal: 'Renewable Energy',
        coAuthorIds: ['ildo-sauer'],
      },
    ],
  },
  {
    id: 'ildo-sauer',
    name: 'Ildo Sauer',
    role: 'pi',
    institution: 'USP',
    unit: 'IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 3,
    secondaryAxes: [10],
    bio: {
      pt: 'Investigador Principal do Eixo 3 (IEE-USP). Planejamento energético de longo prazo, segurança do Sistema Interligado Nacional (SIN), geopolítica energética e transição justa.',
      en: 'Axis 3 Principal Investigator (IEE-USP). Long-term energy planning, Brazilian National Interconnected System (SIN) security, and just energy transition.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Planejamento Energético', 'Operação Hidrotérmica (SIN)', 'Política Energética'],
    regions: ['xingu', 'paraiba-sul', 'semiarido'],
    hazards: ['energy-stress', 'compound-drought'],
    offers: [
      {
        id: 'off-sauer-1',
        domain: 'energy_grid',
        label: {
          pt: 'Cenários de despacho hidrotérmico e vulnerabilidade energética do SIN sob restrição hídrica',
          en: 'Hydrothermal dispatch scenarios and SIN grid vulnerability under drought constraints',
        },
      },
    ],
    needs: [
      {
        id: 'need-sauer-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Vazões naturais afluentes projetadas para bacias hidrelétricas estratégicas (Xingu, Paraná, São Francisco)',
          en: 'Projected naturalized streamflow for strategic hydropower basins (Xingu, Paraná, São Francisco)',
        },
      },
    ],
    availability: ['policy_brief', 'committee'],
    publications: [],
  },
  {
    id: 'tiago-oliveira-demo',
    name: 'Tiago Nogueira (Exemplo)',
    role: 'postdoc',
    institution: 'USP',
    unit: 'IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 3,
    secondaryAxes: [5],
    bio: {
      pt: 'Pós-doutorando no IEE-USP. Otimização de sistemas híbridos hidrelétrica-solar-bateria e avaliação de picos de demanda elétrica durante ondas de calor urbano na RMSP.',
      en: 'Postdoctoral Fellow at IEE-USP. Optimizes hybrid hydro-solar-battery systems and models urban electricity demand spikes during RMSP heatwaves.',
    },
    methods: ['PyPSA', 'Otimização Energética', 'Curvas de Carga Elétrica', 'Python'],
    regions: ['rmsp', 'xingu', 'semiarido'],
    hazards: ['heatwaves', 'energy-stress', 'compound-drought'],
    offers: [
      {
        id: 'off-tiago-1',
        domain: 'energy_grid',
        label: {
          pt: 'Modelo PyPSA-BR de estresse de rede elétrica sob picos de calor e seca hidrelétrica',
          en: 'PyPSA-BR power-grid stress model under urban heat peaks and hydro drought',
        },
        scale: 'Subsistema SIN • Horário',
      },
    ],
    needs: [
      {
        id: 'need-tiago-1',
        domain: 'health_epi',
        label: {
          pt: 'Dados de consumo de refrigeração e vulnerabilidade térmica de hospitais/UBS durante apagões por calor',
          en: 'Cooling demand & thermal vulnerability data for hospitals/clinics during heat-induced outages',
        },
      },
      {
        id: 'need-tiago-2',
        domain: 'climate_projections',
        label: {
          pt: 'Projeções futuras de graus-dia de resfriamento (CDD) na RMSP em cenários CMIP7',
          en: 'Future Cooling Degree Days (CDD) projections for RMSP under CMIP7',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [
      {
        title: 'Compound heatwaves and hydropower drought: cascading outage risks in Southeastern Brazil',
        year: 2025,
        journal: 'Applied Energy',
        coAuthorIds: ['roberto-zilles', 'ildo-sauer'],
      },
    ],
    isDemoProfile: true,
  },

  // ======================== EIXO 4: SEGURANÇA ALIMENTAR E REDUÇÃO DA FOME ========================
  {
    id: 'jurandir-zullo',
    name: 'Jurandir Zullo Jr.',
    role: 'pi',
    institution: 'UNICAMP',
    unit: 'CEPAGRI-UNICAMP',
    city: 'Campinas, SP',
    primaryAxis: 4,
    secondaryAxes: [1],
    bio: {
      pt: 'Investigador Principal do Eixo 4 (CEPAGRI-UNICAMP). Especialista em agrometeorologia, zoneamento agrícola de risco climático (ZARC), sensoriamento remoto agrícola e impactos climáticos em culturas estratégicas.',
      en: 'Axis 4 Principal Investigator (CEPAGRI-UNICAMP). Specialist in agrometeorology, agricultural climate risk zoning (ZARC), remote sensing, and crop impacts.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['ZARC', 'Modelagem de Culturas (DSSAT/APSIM)', 'Sensoriamento Remoto Agrícola', 'Agrometeorologia'],
    regions: ['cerrado-sp-co', 'cantareira-pcj', 'semiarido'],
    hazards: ['crop-shock', 'compound-drought', 'heatwaves'],
    offers: [
      {
        id: 'off-jurandir-1',
        domain: 'agro_food',
        label: {
          pt: 'Zoneamento de risco agroclimático e séries de produtividade (soja, milho safrinha, café, cana)',
          en: 'Agroclimatic risk zoning and yield series (soy, safrinha maize, coffee, sugarcane)',
        },
        scale: 'Municipal SP/CO • Safra anual',
      },
    ],
    needs: [
      {
        id: 'need-jurandir-1',
        domain: 'climate_projections',
        label: {
          pt: 'Projeções corrigidas de déficit de pressão de vapor (VPD) e veranicos para recalibração do ZARC',
          en: 'Bias-corrected VPD and dry-spell projections for ZARC recalibration',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'committee'],
    publications: [
      {
        title: 'Shifting agroclimatic suitability of Arabica coffee and maize in São Paulo under high-emission pathways',
        year: 2024,
        journal: 'Agricultural and Forest Meteorology',
        coAuthorIds: ['beatriz-almeida-demo'],
      },
    ],
  },
  {
    id: 'beatriz-almeida-demo',
    name: 'Beatriz Almeida (Exemplo)',
    role: 'postdoc',
    institution: 'UNICAMP',
    unit: 'CEPAGRI-UNICAMP',
    city: 'Campinas, SP',
    primaryAxis: 4,
    secondaryAxes: [9],
    bio: {
      pt: 'Pós-doutoranda no CEPAGRI-UNICAMP. Analisa vulnerabilidade de cinturões verdes periurbanos e agricultura familiar a ondas de calor e escassez hídrica no estado de São Paulo.',
      en: 'Postdoctoral Fellow at CEPAGRI-UNICAMP. Studies smallholder and peri-urban food-belt vulnerability to heatwaves and water scarcity in São Paulo.',
    },
    methods: ['DSSAT', 'Cadeias Curtas Alimentares', 'Insegurança Alimentar', 'R / Spatial Stats'],
    regions: ['cantareira-pcj', 'vale-ribeira', 'cerrado-sp-co'],
    hazards: ['crop-shock', 'compound-drought', 'heatwaves'],
    offers: [
      {
        id: 'off-beatriz-1',
        domain: 'agro_food',
        label: {
          pt: 'Indicadores municipais de exposição de hortaliças e agricultura familiar a choques climáticos',
          en: 'Municipal exposure indicators for peri-urban horticulture and smallholder farms',
        },
      },
    ],
    needs: [
      {
        id: 'need-beatriz-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Cenários de disponibilidade de água para irrigação nas Bacias PCJ em anos de seca crítica',
          en: 'Irrigation water availability scenarios in PCJ basins during severe drought years',
        },
      },
      {
        id: 'need-beatriz-2',
        domain: 'economic_modeling',
        label: {
          pt: 'Elasticidade de preços de alimentos básicos na RMSP após choques climáticos regionais',
          en: 'Staple food price elasticity in RMSP following regional agricultural shocks',
        },
      },
    ],
    availability: ['coauthor', 'fieldwork', 'policy_brief'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'henrique-costa-demo',
    name: 'Henrique Costa (Exemplo)',
    role: 'msc',
    institution: 'USP',
    unit: 'ESALQ-USP',
    city: 'Piracicaba, SP',
    primaryAxis: 4,
    secondaryAxes: [8],
    bio: {
      pt: 'Mestrando na ESALQ-USP. Modelagem de sequestro de carbono no solo em sistemas integração lavoura-pecuária-floresta (ILPF) no Cerrado Paulista.',
      en: 'MSc student at ESALQ-USP. Models soil carbon sequestration in integrated crop-livestock-forestry (ICLF) systems in the São Paulo Cerrado.',
    },
    methods: ['Carbono no Solo', 'ILPF', 'APSIM', 'Sensoriamento MapBiomas'],
    regions: ['cerrado-sp-co'],
    hazards: ['crop-shock', 'compound-drought'],
    offers: [
      {
        id: 'off-henrique-1',
        domain: 'agro_food',
        label: {
          pt: 'Taxas empíricas de carbono orgânico no solo e resiliência hídrica em áreas ILPF',
          en: 'Empirical soil organic carbon and drought-buffering metrics for ICLF farms',
        },
      },
    ],
    needs: [
      {
        id: 'need-henrique-1',
        domain: 'climate_innovation',
        label: {
          pt: 'Integração de métricas de carbono no solo em inventários regionais de remoção de CO2 (BECCS/NBS)',
          en: 'Integrating soil carbon rates into regional CO2 removal accounting (BECCS/NBS)',
        },
      },
    ],
    availability: ['coauthor', 'fieldwork'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 5: SEGURANÇA HÍDRICA E GESTÃO ADAPTATIVA ========================
  {
    id: 'eduardo-mendiondo',
    name: 'Eduardo Mario Mendiondo',
    role: 'pi',
    institution: 'USP',
    unit: 'EESC-USP',
    city: 'São Carlos, SP',
    primaryAxis: 5,
    secondaryAxes: [2, 9],
    bio: {
      pt: 'Investigador Principal do Eixo 5 (EESC-USP). Especialista em socio-hidrologia, segurança hídrica adaptativa, drenagem urbana sustentável (SbN) e monitoramento participativo de bacias.',
      en: 'Axis 5 Principal Investigator (EESC-USP). Specialist in socio-hydrology, adaptive water security, nature-based urban drainage, and participatory watershed monitoring.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Socio-Hidrologia', 'SWAT / HEC-RAS', 'Soluções Baseadas na Natureza', 'Ciência Cidadã Hídrica'],
    regions: ['cantareira-pcj', 'rmsp', 'taquari-rs', 'paraiba-sul'],
    hazards: ['floods', 'compound-drought', 'extreme-rain-landslides'],
    offers: [
      {
        id: 'off-mendiondo-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Simulações hidrológicas (SWAT/HEC-RAS) de vazão, cheias urbanas e segurança de reservatórios',
          en: 'Hydrological simulations (SWAT/HEC-RAS) for runoff, urban flooding, and reservoir reliability',
        },
        scale: 'Sub-bacia • Diário/Horário',
      },
    ],
    needs: [
      {
        id: 'need-mendiondo-1',
        domain: 'climate_projections',
        label: {
          pt: 'Curvas IDF futuras (chuvas intensas subdiárias) derivadas de downscaling dinâmico para dimensionar drenagem',
          en: 'Future IDF curves (sub-daily intense rainfall) from dynamical downscaling for drainage design',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'fieldwork', 'committee'],
    publications: [
      {
        title: 'Socio-hydrological resilience of the Cantareira water supply system under multi-year compound droughts',
        year: 2024,
        journal: 'Water Resources Research',
        coAuthorIds: ['jose-marengo', 'gabriela-tavares-demo'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'gabriela-tavares-demo',
    name: 'Gabriela Tavares (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'EESC-USP',
    city: 'São Carlos, SP',
    primaryAxis: 5,
    secondaryAxes: [2],
    bio: {
      pt: 'Doutoranda em Engenharia Hidráulica (EESC-USP). Modelagem hidrodinâmica 2D de alagamentos urbanos e avaliação de parques lineares (SbN) nas bacias PCJ e RMSP.',
      en: 'PhD Candidate in Hydraulic Engineering (EESC-USP). 2D hydrodynamic urban flood modeling and nature-based floodpark assessment in PCJ and RMSP.',
    },
    methods: ['HEC-RAS 2D', 'SWMM', 'SWAT', 'Python', 'SbN'],
    regions: ['cantareira-pcj', 'rmsp', 'vale-ribeira'],
    hazards: ['floods', 'compound-drought'],
    offers: [
      {
        id: 'off-gabriela-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Mapas de profundidade de inundação (10–100 anos) e vazão ecológica nas bacias PCJ e Tietê',
          en: 'Flood depth maps (10–100 yr return periods) and environmental flow projections for PCJ/Tietê',
        },
        scale: '5 m urbano / Sub-bacia',
      },
    ],
    needs: [
      {
        id: 'need-gabriela-1',
        domain: 'social_governance',
        label: {
          pt: 'Parceria com cientistas sociais para co-desenhar parques alagáveis com moradores de áreas de várzea',
          en: 'Social science partners to co-design sponge/floodable parks with floodplain residents',
        },
      },
      {
        id: 'need-gabriela-2',
        domain: 'health_epi',
        label: {
          pt: 'Dados de surtos de leptospirose pós-enchente para priorizar intervenções de drenagem',
          en: 'Post-flood leptospirosis incidence data to prioritize urban drainage interventions',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'fieldwork'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'diego-pereira-demo',
    name: 'Diego Pereira (Exemplo)',
    role: 'associate',
    institution: 'USP',
    unit: 'POLI-USP',
    city: 'São Paulo, SP',
    primaryAxis: 5,
    secondaryAxes: [3],
    bio: {
      pt: 'Pesquisador Associado (POLI-USP). Operação ótima de reservatórios de uso múltiplo (abastecimento, irrigação e geração hidrelétrica) no Sudeste e na Bacia do Xingu.',
      en: 'Associate Researcher (POLI-USP). Multi-purpose reservoir optimization (water supply, irrigation, hydropower) in Southeast Brazil and the Xingu Basin.',
    },
    methods: ['Hidrologia Estocástica', 'Otimização de Reservatórios', 'Nexo Água-Energia'],
    regions: ['xingu', 'paraiba-sul', 'cantareira-pcj'],
    hazards: ['compound-drought', 'energy-stress'],
    offers: [
      {
        id: 'off-diego-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Vazões regularizadas e cenários de conflito água–energia para Paraíba do Sul e Xingu',
          en: 'Regulated streamflow and water-energy conflict scenarios for Paraíba do Sul and Xingu',
        },
      },
    ],
    needs: [
      {
        id: 'need-diego-1',
        domain: 'climate_projections',
        label: {
          pt: 'Ensembles CMIP7 de precipitação e evapotranspiração corrigidos para as bacias do Xingu e Paraíba do Sul',
          en: 'Bias-corrected CMIP7 precipitation & PET ensembles for Xingu and Paraíba do Sul',
        },
      },
    ],
    availability: ['coauthor', 'committee'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 6: SEGURANÇA EM SAÚDE E RISCO DE PANDEMIAS ========================
  {
    id: 'claudia-moreno',
    name: 'Cláudia Moreno',
    role: 'pi',
    institution: 'USP',
    unit: 'FSP-USP',
    city: 'São Paulo, SP',
    primaryAxis: 6,
    secondaryAxes: [9],
    bio: {
      pt: 'Investigadora Principal do Eixo 6 (FSP-USP). Professora Titular na Faculdade de Saúde Pública: estresse térmico, ritmos biológicos, saúde do trabalhador exposto ao calor e impactos sanitários das crises climáticas.',
      en: 'Axis 6 Principal Investigator (FSP-USP). Full Professor at USP School of Public Health: thermal stress, chronobiology, outdoor worker heat health, and climate-driven health risks.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Epidemiologia Ambiental', 'Estresse Térmico Ocupacional', 'Saúde Pública', 'Séries Temporais (DLNM)'],
    regions: ['rmsp', 'sul-amazonia', 'cerrado-sp-co'],
    hazards: ['heatwaves', 'health-vectors'],
    offers: [
      {
        id: 'off-claudia-1',
        domain: 'health_epi',
        label: {
          pt: 'Limiares fisiológicos e epidemiológicos de estresse térmico (WBGT / mortalidade) em populações urbanas e trabalhadores',
          en: 'Physiological & epidemiological thermal stress thresholds (WBGT / mortality) for urban & outdoor workers',
        },
        scale: 'Municipal SP • Diário',
      },
    ],
    needs: [
      {
        id: 'need-claudia-1',
        domain: 'climate_projections',
        label: {
          pt: 'Grades diárias de temperatura máxima, mínima noturna e umidade relativa (CMIP6/CMIP7) para RMSP',
          en: 'Daily gridded Tmax, nighttime Tmin, and relative humidity (CMIP6/CMIP7) for RMSP',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief', 'committee'],
    publications: [
      {
        title: 'Nighttime heatwaves, sleep disruption, and excess cardiovascular hospitalizations in São Paulo',
        year: 2025,
        journal: 'The Lancet Planetary Health',
        coAuthorIds: ['mariana-rocha-demo'],
      },
    ],
  },
  {
    id: 'mariana-rocha-demo',
    name: 'Mariana Lins (Exemplo)',
    role: 'postdoc',
    institution: 'USP',
    unit: 'FSP-USP',
    city: 'São Paulo, SP',
    primaryAxis: 6,
    secondaryAxes: [2],
    bio: {
      pt: 'Pós-doutoranda na FSP-USP. Modelagem espaço-temporal (R/INLA, DLNM) de hospitalizações por ondas de calor, fumaça de queimadas e expansão da dengue no Estado de São Paulo.',
      en: 'Postdoctoral Fellow at FSP-USP. Spatio-temporal modeling (R/INLA, DLNM) of heatwave hospitalizations, wildfire smoke burden, and dengue expansion across São Paulo.',
    },
    email: 'mariana.lins.demo@usp.br',
    methods: ['DLNM (R)', 'INLA Espaço-Temporal', 'DATASUS / SINAN', 'Modelagem de Dengue'],
    regions: ['rmsp', 'sul-amazonia', 'cantareira-pcj', 'taquari-rs'],
    hazards: ['heatwaves', 'health-vectors', 'amazon-tipping', 'floods'],
    offers: [
      {
        id: 'off-mariana-1',
        domain: 'health_epi',
        label: {
          pt: 'Painel tratado DATASUS/SINAN de internações por calor, doenças respiratórias, dengue e leptospirose',
          en: 'Curated DATASUS/SINAN panel of heat, respiratory, dengue, and post-flood leptospirosis admissions',
        },
        scale: 'Municípios BR • Diário/Semanal',
      },
    ],
    needs: [
      {
        id: 'need-mariana-1',
        domain: 'climate_projections',
        label: {
          pt: 'Projeções futuras de temperatura de bulbo úmido e noites tropicais em alta resolução na RMSP',
          en: 'High-resolution future wet-bulb temperature and tropical nights projections for RMSP',
        },
      },
      {
        id: 'need-mariana-2',
        domain: 'economic_modeling',
        label: {
          pt: 'Valoração econômica dos custos do SUS e perda de produtividade laboral causados por ondas de calor',
          en: 'Economic valuation of SUS healthcare costs and labor productivity loss from heatwaves',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [
      {
        title: 'Wildfire smoke plumes from Southern Amazonia and respiratory morbidity surges in Southeast Brazil',
        year: 2024,
        journal: 'Environmental Health Perspectives',
        coAuthorIds: ['claudia-moreno'],
      },
    ],
    isDemoProfile: true,
  },
  {
    id: 'andre-silva-demo',
    name: 'André Queiroz (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'FM-USP',
    city: 'São Paulo, SP',
    primaryAxis: 6,
    secondaryAxes: [11],
    bio: {
      pt: 'Doutorando na Faculdade de Medicina (USP). Ecologia de patógenos zoonóticos, risco de spillover na fronteira de desmatamento amazônica e saúde indígena.',
      en: 'PhD Candidate at USP Medical School. Zoonotic pathogen ecology, spillover risk along the Amazon deforestation frontier, and indigenous health.',
    },
    methods: ['Saúde Única (One Health)', 'Ecologia de Vetores', 'Vigilância Genômica'],
    regions: ['sul-amazonia', 'xingu'],
    hazards: ['health-vectors', 'amazon-tipping'],
    offers: [
      {
        id: 'off-andre-1',
        domain: 'health_epi',
        label: {
          pt: 'Mapa de risco de spillover zoonótico e carga sanitária em fronteiras de degradação florestal',
          en: 'Zoonotic spillover risk map along Amazon forest-degradation frontiers',
        },
      },
    ],
    needs: [
      {
        id: 'need-andre-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Cenários de fragmentação florestal e uso da terra no Sul da Amazônia e Xingu',
          en: 'Forest fragmentation and land-use change scenarios for Southern Amazon & Xingu',
        },
      },
    ],
    availability: ['coauthor', 'fieldwork'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 7: EDUCAÇÃO E DIFUSÃO DO CONHECIMENTO ========================
  {
    id: 'leila-ferreira',
    name: 'Leila da Costa Ferreira',
    role: 'pi',
    institution: 'UNICAMP',
    unit: 'IFCH / NEPAM-UNICAMP',
    city: 'Campinas, SP',
    primaryAxis: 7,
    secondaryAxes: [9],
    bio: {
      pt: 'Investigadora Principal do Eixo 7 (IFCH/NEPAM-UNICAMP). Sociologia ambiental, políticas climáticas comparadas, difusão científica e formação de redes educativas para resiliência.',
      en: 'Axis 7 Principal Investigator (IFCH/NEPAM-UNICAMP). Environmental sociology, comparative climate policy, science dissemination, and resilience education.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Sociologia Ambiental', 'Difusão Científica', 'Análise de Políticas Públicas', 'Educação Climática'],
    regions: ['cantareira-pcj', 'rmsp', 'vale-ribeira'],
    hazards: ['heatwaves', 'floods'],
    offers: [
      {
        id: 'off-leila-1',
        domain: 'education_comm',
        label: {
          pt: 'Metodologias de tradução científica para prefeituras, escolas públicas e notas técnicas CEPID',
          en: 'Science translation toolkits for municipalities, public schools, and CEPID policy briefs',
        },
      },
    ],
    needs: [
      {
        id: 'need-leila-1',
        domain: 'extreme_hazards',
        label: {
          pt: 'Materiais e casos locais dos demais eixos (mapas simples e alertas) para oficinas com docentes e Defesa Civil',
          en: 'Accessible local case studies & hazard maps from other axes for teacher and Civil Defense workshops',
        },
      },
    ],
    availability: ['policy_brief', 'coauthor', 'mentoring'],
    publications: [
      {
        title: 'Bridging climate science and municipal literacy in São Paulo State',
        year: 2024,
        journal: 'Ambiente & Sociedade',
        coAuthorIds: ['pedro-jacobi'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'juliana-barros-demo',
    name: 'Juliana Barros (Exemplo)',
    role: 'postdoc',
    institution: 'UNICAMP',
    unit: 'NEPAM-UNICAMP',
    city: 'Campinas, SP',
    primaryAxis: 7,
    secondaryAxes: [2, 6],
    bio: {
      pt: 'Pós-doutoranda no NEPAM-UNICAMP. Comunicação de risco climático, combate à desinformação e design de painéis interativos para gestores municipais e escolas.',
      en: 'Postdoctoral Fellow at NEPAM-UNICAMP. Climate risk communication, countering misinformation, and interactive dashboard co-design for mayors and schools.',
    },
    methods: ['Comunicação de Risco', 'Design Participativo', 'Jornalismo Científico', 'Ciência Cidadã'],
    regions: ['litoral-norte-sp', 'rmsp', 'taquari-rs', 'vale-ribeira'],
    hazards: ['extreme-rain-landslides', 'heatwaves', 'floods'],
    offers: [
      {
        id: 'off-juliana-1',
        domain: 'education_comm',
        label: {
          pt: 'Co-design de notas técnicas visuais, kits educativos e protocolos de comunicação de alerta à população',
          en: 'Co-design of visual policy briefs, educational kits, and public alert communication protocols',
        },
      },
    ],
    needs: [
      {
        id: 'need-juliana-1',
        domain: 'health_epi',
        label: {
          pt: 'Recomendações validadas de proteção contra ondas de calor para escolas públicas da RMSP',
          en: 'Validated heatwave health-protection guidelines for public schools in RMSP',
        },
      },
      {
        id: 'need-juliana-2',
        domain: 'extreme_hazards',
        label: {
          pt: 'Linguagem e gatilhos reais dos alertas do CEMADEN para testar compreensão com comunidades',
          en: 'Actual CEMADEN alert triggers and phrasing to test comprehension with local communities',
        },
      },
    ],
    availability: ['policy_brief', 'coauthor', 'fieldwork'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'sofia-ribeiro-demo',
    name: 'Sofia Ribeiro (Exemplo)',
    role: 'ic',
    institution: 'USP',
    unit: 'IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 7,
    secondaryAxes: [1],
    bio: {
      pt: 'Bolsista de Iniciação Científica (IEE-USP). Visualização de dados climáticos, podcasts de divulgação científica e apoio editorial às ações de difusão do CLIMARES.',
      en: 'Undergraduate Researcher (IEE-USP). Climate data storytelling, science podcasts, and outreach production for CLIMARES.',
    },
    methods: ['Visualização de Dados', 'Storytelling Científico', 'Web / D3.js'],
    regions: ['rmsp'],
    hazards: ['heatwaves', 'floods'],
    offers: [
      {
        id: 'off-sofia-1',
        domain: 'education_comm',
        label: {
          pt: 'Infográficos interativos e divulgação acessível de resultados de pesquisa dos 11 eixos',
          en: 'Interactive infographics and public outreach assets for all 11 axes',
        },
      },
    ],
    needs: [
      {
        id: 'need-sofia-1',
        domain: 'geospatial_code',
        label: {
          pt: 'Camadas geoespaciais simplificadas e tutoriais de dados climáticos para visualizações públicas',
          en: 'Cleaned geospatial layers and climate data summaries for public visualizations',
        },
      },
    ],
    availability: ['policy_brief'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 8: INOVAÇÃO NA INTERVENÇÃO CLIMÁTICA ========================
  {
    id: 'colombo-tassinari',
    name: 'Colombo Tassinari',
    role: 'pi',
    institution: 'USP',
    unit: 'IEE-USP / IGc-USP',
    city: 'São Paulo, SP',
    primaryAxis: 8,
    secondaryAxes: [3],
    bio: {
      pt: 'Investigador Principal do Eixo 8 (IEE-USP / IGc-USP). Professor Titular líder em captura e armazenamento geológico de carbono (CCUS / BECCS) na Bacia do Paraná e rotas tecnológicas de mitigação.',
      en: 'Axis 8 Principal Investigator (IEE-USP / IGc-USP). Full Professor leading geological carbon capture & storage (CCUS / BECCS) in the Paraná Basin and mitigation technologies.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['CCUS / BECCS', 'Armazenamento Geológico de CO2', 'Geoquímica', 'Inovação Tecnológica'],
    regions: ['cerrado-sp-co', 'paraiba-sul'],
    hazards: ['energy-stress', 'crop-shock'],
    offers: [
      {
        id: 'off-colombo-1',
        domain: 'climate_innovation',
        label: {
          pt: 'Atlas de potencial de armazenamento geológico de CO2 (BECCS/etanol) no Estado de São Paulo e Bacia do Paraná',
          en: 'Atlas of geological CO2 storage potential (BECCS/ethanol) in São Paulo & Paraná Basin',
        },
        scale: 'Bacia do Paraná',
      },
    ],
    needs: [
      {
        id: 'need-colombo-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Modelagem de custos marginais de abatimento e impactos macroeconômicos de rotas BECCS em SP',
          en: 'Marginal abatement cost curves and macroeconomic modeling of BECCS deployment in SP',
        },
      },
    ],
    availability: ['coauthor', 'committee', 'policy_brief'],
    publications: [
      {
        title: 'Geological CO2 storage coupled with sugarcane bioenergy (BECCS) in the Paraná Basin',
        year: 2024,
        journal: 'International Journal of Greenhouse Gas Control',
        coAuthorIds: ['bruno-cardoso-demo'],
      },
    ],
  },
  {
    id: 'bruno-cardoso-demo',
    name: 'Bruno Cardoso (Exemplo)',
    role: 'postdoc',
    institution: 'USP',
    unit: 'IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 8,
    secondaryAxes: [3],
    bio: {
      pt: 'Pós-doutorando no IEE-USP. Avaliação de ciclo de vida (ACV) de tecnologias de captura de carbono, hidrogênio de baixo carbono e biometano em cadeias agroindustriais.',
      en: 'Postdoctoral Fellow at IEE-USP. Life-cycle assessment (LCA) of carbon capture, low-carbon hydrogen, and biomethane across agro-industrial chains.',
    },
    methods: ['Análise de Ciclo de Vida (ACV)', 'BECCS', 'Biometano', 'Engenharia de Processos'],
    regions: ['cerrado-sp-co', 'paraiba-sul'],
    hazards: ['energy-stress'],
    offers: [
      {
        id: 'off-bruno-1',
        domain: 'climate_innovation',
        label: {
          pt: 'Inventários ACV de emissões negativas para usinas de etanol/biogás e rotas industriais paulistas',
          en: 'Negative-emission LCA inventories for São Paulo ethanol/biogas plants and industrial hubs',
        },
      },
    ],
    needs: [
      {
        id: 'need-bruno-1',
        domain: 'agro_food',
        label: {
          pt: 'Cenários climáticos futuros de produtividade da cana-de-açúcar para calibrar oferta de biomassa BECCS até 2050',
          en: 'Future sugarcane yield scenarios to calibrate BECCS biomass availability through 2050',
        },
      },
      {
        id: 'need-bruno-2',
        domain: 'social_governance',
        label: {
          pt: 'Avaliação de percepção pública e licenciamento social de projetos de armazenamento de CO2',
          en: 'Public perception and social license evaluation for geological CO2 storage projects',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'larissa-duarte-demo',
    name: 'Larissa Duarte (Exemplo)',
    role: 'tech',
    institution: 'USP',
    unit: 'IEE-USP / RCGI',
    city: 'São Paulo, SP',
    primaryAxis: 8,
    secondaryAxes: [1],
    bio: {
      pt: 'Engenheira de Dados Científicos (IEE-USP). Arquitetura de dados abertos, integração de sensores ambientais IoT e infraestrutura de repositórios FAIR para projetos climáticos.',
      en: 'Scientific Data Engineer (IEE-USP). Open-data architecture, environmental IoT sensor integration, and FAIR repository infrastructure for climate centers.',
    },
    methods: ['Dados FAIR', 'PostGIS', 'APIs Abertas', 'IoT Ambiental', 'Docker'],
    regions: ['rmsp', 'cerrado-sp-co'],
    hazards: ['heatwaves'],
    offers: [
      {
        id: 'off-larissa-1',
        domain: 'geospatial_code',
        label: {
          pt: 'Apoio técnico para publicar bases dos 11 eixos em padrão FAIR (Zenodo/DOI/PostGIS)',
          en: 'Technical support to publish axis datasets in FAIR standards (Zenodo/DOI/PostGIS)',
        },
      },
    ],
    needs: [
      {
        id: 'need-larissa-1',
        domain: 'education_comm',
        label: {
          pt: 'Feedback de usuários não-técnicos sobre metadados e portais de dados abertos do Centro',
          en: 'Non-technical user feedback on metadata standards and Center open-data portals',
        },
      },
    ],
    availability: ['dataset_share', 'mentoring'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 9: TRANSFORMAÇÃO SOCIAL FACE ÀS ALTERAÇÕES CLIMÁTICAS ========================
  {
    id: 'pedro-jacobi',
    name: 'Pedro Roberto Jacobi',
    role: 'pi',
    institution: 'USP',
    unit: 'IEE-USP / PROCAM-USP',
    city: 'São Paulo, SP',
    primaryAxis: 9,
    secondaryAxes: [5, 7],
    bio: {
      pt: 'Investigador Principal do Eixo 9 (IEE-USP). Referência em governança ambiental e hídrica, adaptação participativa, justiça climática urbana e aprendizagem social.',
      en: 'Axis 9 Principal Investigator (IEE-USP). Leading scholar in environmental and water governance, participatory adaptation, urban climate justice, and social learning.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Governança Ambiental', 'Justiça Climática', 'Pesquisa-Ação Participativa', 'Políticas Urbanas'],
    regions: ['rmsp', 'litoral-norte-sp', 'cantareira-pcj', 'vale-ribeira'],
    hazards: ['floods', 'extreme-rain-landslides', 'heatwaves'],
    offers: [
      {
        id: 'off-jacobi-1',
        domain: 'social_governance',
        label: {
          pt: 'Redes de governança participativa com comitês de bacia, prefeituras e lideranças comunitárias em SP',
          en: 'Participatory governance networks with watershed committees, mayors, and community leaders in SP',
        },
      },
    ],
    needs: [
      {
        id: 'need-jacobi-1',
        domain: 'hydrology_water',
        label: {
          pt: 'Mapas compreensíveis de risco hídrico e soluções baseadas na natureza para oficinas nos comitês de bacia',
          en: 'Accessible flood/water-risk and nature-based solution maps for watershed committee workshops',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief', 'committee'],
    publications: [
      {
        title: 'Climate justice and participatory water governance in the São Paulo Metropolitan Region',
        year: 2025,
        journal: 'Environmental Science & Policy',
        coAuthorIds: ['leila-ferreira', 'eduardo-mendiondo', 'renata-gomes-demo'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'renata-gomes-demo',
    name: 'Renata Monteiro (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'PROCAM / IEE-USP',
    city: 'São Paulo, SP',
    primaryAxis: 9,
    secondaryAxes: [2],
    bio: {
      pt: 'Doutoranda no PROCAM-USP. Pesquisa reconstrução pós-desastre, racismo ambiental e cartografia social com comunidades atingidas no Litoral Norte de SP e Vale do Ribeira.',
      en: 'PhD Candidate at PROCAM-USP. Researches post-disaster recovery, environmental justice, and social cartography with affected communities in São Paulo North Coast and Ribeira Valley.',
    },
    methods: ['Cartografia Social', 'Entrevistas Qualitativas', 'Justiça Climática', 'Análise Institucional'],
    regions: ['litoral-norte-sp', 'vale-ribeira', 'rmsp'],
    hazards: ['extreme-rain-landslides', 'floods', 'heatwaves'],
    offers: [
      {
        id: 'off-renata-1',
        domain: 'social_governance',
        label: {
          pt: 'Cartografia social e banco qualitativo de vulnerabilidade comunitária em São Sebastião e Vale do Ribeira',
          en: 'Social cartography and qualitative community vulnerability database for São Sebastião & Ribeira Valley',
        },
      },
    ],
    needs: [
      {
        id: 'need-renata-1',
        domain: 'extreme_hazards',
        label: {
          pt: 'Polígonos técnicos de risco de deslizamento e chuva extrema para cruzar com mapas de vulnerabilidade social',
          en: 'Technical landslide hazard polygons to overlay with participatory social vulnerability maps',
        },
      },
      {
        id: 'need-renata-2',
        domain: 'hydrology_water',
        label: {
          pt: 'Apoio de engenheiros hidrólogos para avaliar propostas comunitárias de drenagem e várzeas vivas',
          en: 'Hydrology partners to evaluate community-proposed flood mitigation and sponge-park designs',
        },
      },
    ],
    availability: ['coauthor', 'fieldwork', 'policy_brief'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'mateus-silveira-demo',
    name: 'Mateus Silveira (Exemplo)',
    role: 'associate',
    institution: 'UNESP',
    unit: 'IGCE-UNESP',
    city: 'Rio Claro, SP',
    primaryAxis: 9,
    secondaryAxes: [4],
    bio: {
      pt: 'Pesquisador Associado (UNESP). Planejamento territorial, migrações induzidas por eventos climáticos extremos no Semiárido e adaptação em cidades médias paulistas.',
      en: 'Associate Researcher (UNESP). Territorial planning, climate-induced migration in the Semi-Arid, and adaptation governance in mid-sized cities.',
    },
    methods: ['Planejamento Territorial', 'Demografia Climática', 'Censo IBGE', 'SIG Social'],
    regions: ['semiarido', 'paraiba-sul', 'taquari-rs'],
    hazards: ['compound-drought', 'floods'],
    offers: [
      {
        id: 'off-mateus-1',
        domain: 'social_governance',
        label: {
          pt: 'Índice municipal de vulnerabilidade sociodemográfica (Censo 2022) para todo o Brasil',
          en: 'Municipal sociodemographic vulnerability index (2022 Census) covering all of Brazil',
        },
        scale: '5.570 municípios • CSV/Shapefile',
      },
    ],
    needs: [
      {
        id: 'need-mateus-1',
        domain: 'agro_food',
        label: {
          pt: 'Projeções de perda de aptidão agrícola no Semiárido para modelar deslocamentos rurais',
          en: 'Agricultural suitability loss projections in the Semi-Arid to model rural displacement',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 10: IMPACTOS ECONÔMICOS DA CRISE CLIMÁTICA ========================
  {
    id: 'eduardo-haddad',
    name: 'Eduardo A. Haddad',
    role: 'pi',
    institution: 'USP',
    unit: 'FEA-USP / NEREUS',
    city: 'São Paulo, SP',
    primaryAxis: 10,
    secondaryAxes: [2, 11],
    bio: {
      pt: 'Investigador Principal do Eixo 10 (FEA-USP / NEREUS). Professor Titular líder em modelos de equilíbrio geral computável (CGE) e matrizes insumo-produto inter-regionais (IIOA) aplicadas a desastres e choques climáticos.',
      en: 'Axis 10 Principal Investigator (FEA-USP / NEREUS). Full Professor leading computable general equilibrium (CGE) and interregional input-output (IIOA) models for climate disasters.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Modelos CGE (B-MARIA)', 'Insumo-Produto Inter-regional (IIOA)', 'Economia Regional', 'Valoração de Desastres'],
    regions: ['taquari-rs', 'rmsp', 'cerrado-sp-co', 'sul-amazonia'],
    hazards: ['floods', 'compound-drought', 'crop-shock', 'heatwaves'],
    offers: [
      {
        id: 'off-haddad-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Simulações CGE / IIOA de efeitos diretos e em cadeia no PIB e emprego causados por extremos climáticos',
          en: 'CGE / IIOA simulations of direct and cascading GDP & employment losses from climate extremes',
        },
        scale: 'Regiões Intermediárias / Estados BR',
      },
    ],
    needs: [
      {
        id: 'need-haddad-1',
        domain: 'extreme_hazards',
        label: {
          pt: 'Choques físicos espacializados (manchas de inundação, duração de interrupções logísticas, perdas de safra)',
          en: 'Spatially explicit physical shocks (flood footprints, transport outages, crop yield shocks)',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief', 'committee'],
    publications: [
      {
        title: 'Cascading macroeconomic losses of the 2024 Rio Grande do Sul floods across Brazilian supply chains',
        year: 2025,
        journal: 'Economic Systems Research',
        coAuthorIds: ['vinicius-moraes-demo'],
      },
    ],
  },
  {
    id: 'vinicius-moraes-demo',
    name: 'Vinícius Moraes (Exemplo)',
    role: 'postdoc',
    institution: 'USP',
    unit: 'FEA-USP / NEREUS',
    city: 'São Paulo, SP',
    primaryAxis: 10,
    secondaryAxes: [4],
    bio: {
      pt: 'Pós-doutorando no NEREUS (FEA-USP). Acoplamento de choques climáticos (ondas de calor, secas agrícolas e enchentes) a modelos econômicos municipais e perda de produtividade do trabalho.',
      en: 'Postdoctoral Fellow at NEREUS (FEA-USP). Couples physical climate shocks (heatwaves, crop droughts, floods) into municipal economic and labor-productivity models.',
    },
    email: 'vinicius.demo@usp.br',
    methods: ['GEMPACK / CGE', 'Econometria Espacial', 'Produtividade Laboral', 'R / Python'],
    regions: ['rmsp', 'taquari-rs', 'cerrado-sp-co', 'paraiba-sul'],
    hazards: ['heatwaves', 'floods', 'crop-shock', 'energy-stress'],
    offers: [
      {
        id: 'off-vinicius-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Estimativas municipais de custo econômico de ondas de calor (perda laboral + gastos hospitalares) e enchentes',
          en: 'Municipal economic cost estimates of heatwaves (labor loss + health costs) and floods',
        },
        scale: 'Municipal / Setorial',
      },
    ],
    needs: [
      {
        id: 'need-vinicius-1',
        domain: 'climate_projections',
        label: {
          pt: 'Índices municipais padronizados de dias de estresse térmico extremo (WBGT/Tmax) e seca até 2050',
          en: 'Standardized municipal indices of extreme heat days (WBGT/Tmax) and drought through 2050',
        },
      },
      {
        id: 'need-vinicius-2',
        domain: 'health_epi',
        label: {
          pt: 'Curvas dose-resposta de afastamentos e internações por calor na RMSP para alimentar o módulo laboral',
          en: 'Dose-response curves for heat hospitalizations & absenteeism in RMSP to feed the labor module',
        },
      },
      {
        id: 'need-vinicius-3',
        domain: 'geospatial_code',
        label: {
          pt: 'Polígonos georreferenciados de manchas de inundação (SAR) sobrepostos a setores censitários/empresas',
          en: 'Georeferenced SAR flood polygons overlaid on business/census tracts',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'fernanda-lopes-demo',
    name: 'Fernanda Lopes (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'FEA-USP',
    city: 'São Paulo, SP',
    primaryAxis: 10,
    secondaryAxes: [11],
    bio: {
      pt: 'Doutoranda em Economia (FEA-USP). Finanças climáticas, precificação de carbono e modelagem de valor agregado das cadeias de bioeconomia amazônica.',
      en: 'PhD Candidate in Economics (FEA-USP). Climate finance, carbon pricing, and value-chain modeling for the Amazon standing-forest bioeconomy.',
    },
    methods: ['Finanças Climáticas', 'Economia da Bioeconomia', 'Insumo-Produto'],
    regions: ['xingu', 'sul-amazonia', 'cerrado-sp-co'],
    hazards: ['amazon-tipping', 'compound-drought'],
    offers: [
      {
        id: 'off-fernanda-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Modelos de retorno econômico de cadeias da sociobiodiversidade e instrumentos de financiamento verde',
          en: 'Economic return models for sociobiodiversity value chains and green finance instruments',
        },
      },
    ],
    needs: [
      {
        id: 'need-fernanda-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Parâmetros técnicos e produtivos das Biofábricas Amazônia 4.0 (cacau, açaí, castanha) no Xingu',
          en: 'Technical yield parameters from Amazonia 4.0 biofactories (cocoa, açaí, Brazil nut) in Xingu',
        },
      },
      {
        id: 'need-fernanda-2',
        domain: 'climate_innovation',
        label: {
          pt: 'Custos de capital (CAPEX/OPEX) de rotas CCUS/BECCS para simular mercado regulado de carbono',
          en: 'CAPEX/OPEX figures for CCUS/BECCS pathways to simulate Brazil’s regulated carbon market',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief'],
    publications: [],
    isDemoProfile: true,
  },

  // ======================== EIXO 11: AMAZÔNIA: DESENVOLVIMENTO TECNOLÓGICO E SUSTENTÁVEL ========================
  {
    id: 'carlos-nobre',
    name: 'Carlos A. Nobre',
    role: 'pi',
    institution: 'USP',
    unit: 'IEA-USP / Amazônia 4.0',
    city: 'São Paulo, SP',
    primaryAxis: 11,
    secondaryAxes: [1, 10],
    bio: {
      pt: 'Investigador Principal do Eixo 11 (IEA-USP). Cientista do Sistema Terrestre, pioneiro na teoria do ponto de não retorno (tipping point) da Amazônia e idealizador da iniciativa Amazônia 4.0.',
      en: 'Axis 11 Principal Investigator (IEA-USP). Earth System scientist, pioneer of Amazon tipping point research and architect of the Amazonia 4.0 bioeconomy initiative.',
    },
    bvFapespUrl: 'https://bv.fapesp.br/',
    methods: ['Tipping Points Amazônicos', 'Amazônia 4.0', 'Bioeconomia de Floresta em Pé', 'Ciência do Sistema Terrestre'],
    regions: ['xingu', 'sul-amazonia'],
    hazards: ['amazon-tipping', 'compound-drought'],
    offers: [
      {
        id: 'off-nobre-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Síntese científica sobre limiares de savanização amazônica e arquitetura de Laboratórios Criativos Amazônia 4.0',
          en: 'Scientific synthesis on Amazon tipping thresholds and Amazonia 4.0 Creative Lab blueprints',
        },
      },
    ],
    needs: [
      {
        id: 'need-nobre-1',
        domain: 'economic_modeling',
        label: {
          pt: 'Quantificação do PIB perdido sob savanização amazônica vs. retorno da bioeconomia de alto valor',
          en: 'Quantifying GDP loss under Amazon dieback vs. high-value standing-forest bioeconomy returns',
        },
      },
    ],
    availability: ['coauthor', 'policy_brief'],
    publications: [
      {
        title: 'Critical transitions in the Amazon forest system: compound drought, fire, and pathways for a standing-forest bioeconomy',
        year: 2025,
        journal: 'Nature',
        coAuthorIds: ['cristiano-chiessi', 'tercio-ambrizzi', 'paula-mendes-demo'],
        crossAxis: true,
      },
    ],
  },
  {
    id: 'paula-mendes-demo',
    name: 'Paula Azevedo (Exemplo)',
    role: 'postdoc',
    institution: 'USP',
    unit: 'IEA-USP',
    city: 'São Paulo, SP',
    primaryAxis: 11,
    secondaryAxes: [1, 4],
    bio: {
      pt: 'Pós-doutoranda no IEA-USP. Modelagem acoplada vegetação-clima (CAETÊ / LPJmL) no Arco do Desmatamento e Bacia do Xingu, avaliando mortalidade arbórea sob secas extremas.',
      en: 'Postdoctoral Fellow at IEA-USP. Coupled vegetation-climate modeling (CAETÊ / LPJmL) across the Deforestation Arc and Xingu Basin, evaluating tree mortality under severe droughts.',
    },
    methods: ['Modelos Dinâmicos de Vegetação (CAETÊ)', 'MapBiomas', 'Sensoriamento LiDAR', 'Python'],
    regions: ['xingu', 'sul-amazonia'],
    hazards: ['amazon-tipping', 'compound-drought', 'heatwaves'],
    offers: [
      {
        id: 'off-paula-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Cenários espacializados de degradação florestal, déficit de umidade e resiliência funcional no Xingu e Sul da Amazônia',
          en: 'Spatially explicit forest degradation, moisture-deficit, and functional resilience maps for Xingu & Southern Amazon',
        },
        scale: '5 km • 2020–2080',
      },
    ],
    needs: [
      {
        id: 'need-paula-1',
        domain: 'climate_projections',
        label: {
          pt: 'Séries corrigidas CMIP7 de estação seca (CWD) e déficit de pressão de vapor na Bacia do Xingu',
          en: 'Bias-corrected CMIP7 dry-season length (CWD) and VPD projections for the Xingu Basin',
        },
      },
      {
        id: 'need-paula-2',
        domain: 'health_epi',
        label: {
          pt: 'Integração de cenários de fogo/degradação florestal com risco de arboviroses e fumaça na saúde local',
          en: 'Linking forest fire/degradation scenarios with smoke and vector-borne health burden',
        },
      },
    ],
    availability: ['coauthor', 'dataset_share', 'fieldwork'],
    publications: [],
    isDemoProfile: true,
  },
  {
    id: 'kaua-tupi-demo',
    name: 'Kauã Santana (Exemplo)',
    role: 'phd',
    institution: 'USP',
    unit: 'IEA-USP / Amazônia 4.0',
    city: 'Belém, PA / São Paulo, SP',
    primaryAxis: 11,
    secondaryAxes: [3, 7],
    bio: {
      pt: 'Doutorando vinculado ao Eixo 11. Engenharia de biofábricas móveis movidas a energia solar para beneficiamento de cacau e cupuaçu em comunidades ribeirinhas e indígenas do Xingu.',
      en: 'PhD Candidate in Axis 11. Designs solar-powered mobile biofactories for cocoa and cupuaçu processing with riverine and indigenous communities in Xingu.',
    },
    methods: ['Biofábricas 4.0', 'Tecnologia Social', 'Cadeias da Sociobiodiversidade', 'Campo Amazônia'],
    regions: ['xingu', 'sul-amazonia'],
    hazards: ['amazon-tipping', 'energy-stress'],
    offers: [
      {
        id: 'off-kaua-1',
        domain: 'amazon_bioeconomy',
        label: {
          pt: 'Dados de operação real de biofábricas comunitárias no Xingu (custos, rendimento e logística fluvial)',
          en: 'Field operational data from community biofactories in Xingu (costs, yields, river logistics)',
        },
      },
    ],
    needs: [
      {
        id: 'need-kaua-1',
        domain: 'energy_grid',
        label: {
          pt: 'Dimensionamento de microrredes solares com baterias para biofábricas isoladas na floresta (Eixo 3)',
          en: 'Sizing off-grid solar + battery microgrids for remote forest biofactories (Axis 3)',
        },
      },
      {
        id: 'need-kaua-2',
        domain: 'education_comm',
        label: {
          pt: 'Materiais pedagógicos bilíngues para capacitação tecnológica de jovens locais no Xingu',
          en: 'Pedagogical materials for local youth tech training in Xingu',
        },
      },
    ],
    availability: ['fieldwork', 'coauthor', 'policy_brief'],
    publications: [],
    isDemoProfile: true,
  },
];

// Realistic actual collaboration edges: dense within-axis cliques + sparse cross-axis bridges (highlighting real silos!)
export const SEED_EDGES: CollaborationEdge[] = [
  // Intra-Axis 1
  { id: 'e1', source: 'tercio-ambrizzi', target: 'rosmeri-rocha', kind: 'coauthored', weight: 5, label: { pt: 'Downscaling RegCM América do Sul', en: 'RegCM South America Downscaling' }, year: 2025 },
  { id: 'e2', source: 'tercio-ambrizzi', target: 'ilana-wainer', kind: 'project', weight: 4, label: { pt: 'Coordenação Eixo 1 / Atlântico Sul', en: 'Axis 1 Coordination / South Atlantic' }, year: 2024 },
  { id: 'e3', source: 'ilana-wainer', target: 'rosmeri-rocha', kind: 'coauthored', weight: 4, label: { pt: 'Extremos costeiros e TSM', en: 'Coastal extremes & SST' }, year: 2024 },
  { id: 'e4', source: 'rosmeri-rocha', target: 'marcelo-camargo-demo', kind: 'supervision', weight: 5, label: { pt: 'Orientação CMIP7 / extremos', en: 'CMIP7 / extremes advising' }, year: 2025 },
  { id: 'e5', source: 'tercio-ambrizzi', target: 'cristiano-chiessi', kind: 'project', weight: 3, label: { pt: 'Eixo 1 — Variabilidade histórica e futura', en: 'Axis 1 — Past & future variability' }, year: 2024 },

  // Intra-Axis 2
  { id: 'e6', source: 'jose-marengo', target: 'camila-santos-demo', kind: 'coauthored', weight: 5, label: { pt: 'Limiares de deslizamento Serra do Mar', en: 'Serra do Mar landslide thresholds' }, year: 2025 },
  { id: 'e7', source: 'jose-marengo', target: 'rafael-mendes-demo', kind: 'project', weight: 4, label: { pt: 'Mapeamento rápido desastre RS 2024', en: 'RS 2024 rapid flood mapping' }, year: 2024 },
  { id: 'e8', source: 'camila-santos-demo', target: 'rafael-mendes-demo', kind: 'project', weight: 3, label: { pt: 'Integração radar + satélite CEMADEN', en: 'Radar + satellite integration' }, year: 2025 },

  // Intra-Axis 3 (closed silo!)
  { id: 'e9', source: 'roberto-zilles', target: 'ildo-sauer', kind: 'coauthored', weight: 5, label: { pt: 'Transição elétrica e microrredes IEE', en: 'Grid transition & microgrids IEE' }, year: 2024 },
  { id: 'e10', source: 'roberto-zilles', target: 'tiago-oliveira-demo', kind: 'supervision', weight: 4, label: { pt: 'Pós-doc redes resilientes', en: 'Resilient grids postdoc' }, year: 2025 },
  { id: 'e11', source: 'ildo-sauer', target: 'tiago-oliveira-demo', kind: 'coauthored', weight: 4, label: { pt: 'Estresse hidrotérmico SIN', en: 'SIN hydrothermal stress' }, year: 2025 },

  // Intra-Axis 4 (mostly closed!)
  { id: 'e12', source: 'jurandir-zullo', target: 'beatriz-almeida-demo', kind: 'coauthored', weight: 5, label: { pt: 'Risco agroclimático SP', en: 'SP agroclimatic risk' }, year: 2024 },
  { id: 'e13', source: 'jurandir-zullo', target: 'henrique-costa-demo', kind: 'project', weight: 3, label: { pt: 'Resiliência Cerrado / ILPF', en: 'Cerrado ICLF resilience' }, year: 2025 },

  // Intra-Axis 5
  { id: 'e14', source: 'eduardo-mendiondo', target: 'gabriela-tavares-demo', kind: 'supervision', weight: 5, label: { pt: 'Drenagem SbN e Cantareira', en: 'NBS drainage & Cantareira' }, year: 2025 },
  { id: 'e15', source: 'eduardo-mendiondo', target: 'diego-pereira-demo', kind: 'project', weight: 4, label: { pt: 'Segurança hídrica de reservatórios', en: 'Reservoir water security' }, year: 2024 },

  // Intra-Axis 6 (siloed from physical axes!)
  { id: 'e16', source: 'claudia-moreno', target: 'mariana-rocha-demo', kind: 'coauthored', weight: 5, label: { pt: 'Estresse térmico noturno RMSP', en: 'RMSP nighttime heat stress' }, year: 2025 },
  { id: 'e17', source: 'claudia-moreno', target: 'andre-silva-demo', kind: 'project', weight: 3, label: { pt: 'Vigilância sanitária climática', en: 'Climate health surveillance' }, year: 2024 },

  // Intra-Axis 7
  { id: 'e18', source: 'leila-ferreira', target: 'juliana-barros-demo', kind: 'supervision', weight: 5, label: { pt: 'Difusão e letramento climático', en: 'Climate literacy & outreach' }, year: 2025 },
  { id: 'e19', source: 'juliana-barros-demo', target: 'sofia-ribeiro-demo', kind: 'project', weight: 4, label: { pt: 'Comunicação visual CLIMARES', en: 'CLIMARES visual outreach' }, year: 2025 },

  // Intra-Axis 8 (very closed silo!)
  { id: 'e20', source: 'colombo-tassinari', target: 'bruno-cardoso-demo', kind: 'coauthored', weight: 5, label: { pt: 'BECCS Bacia do Paraná', en: 'Paraná Basin BECCS' }, year: 2024 },
  { id: 'e21', source: 'colombo-tassinari', target: 'larissa-duarte-demo', kind: 'project', weight: 3, label: { pt: 'Repositório de dados CCUS', en: 'CCUS data repository' }, year: 2025 },

  // Intra-Axis 9
  { id: 'e22', source: 'pedro-jacobi', target: 'renata-gomes-demo', kind: 'supervision', weight: 5, label: { pt: 'Justiça climática e reconstrução', en: 'Climate justice & recovery' }, year: 2025 },
  { id: 'e23', source: 'pedro-jacobi', target: 'mateus-silveira-demo', kind: 'project', weight: 3, label: { pt: 'Governança territorial adaptativa', en: 'Adaptive territorial governance' }, year: 2024 },

  // Intra-Axis 10
  { id: 'e24', source: 'eduardo-haddad', target: 'vinicius-moraes-demo', kind: 'coauthored', weight: 5, label: { pt: 'Perdas econômicas RS 2024', en: 'RS 2024 economic losses' }, year: 2025 },
  { id: 'e25', source: 'eduardo-haddad', target: 'fernanda-lopes-demo', kind: 'supervision', weight: 4, label: { pt: 'Finanças climáticas e bioeconomia', en: 'Climate finance & bioeconomy' }, year: 2025 },

  // Intra-Axis 11
  { id: 'e26', source: 'carlos-nobre', target: 'paula-mendes-demo', kind: 'coauthored', weight: 5, label: { pt: 'Tipping point e CAETÊ Amazônia', en: 'Amazon tipping point & CAETÊ' }, year: 2025 },
  { id: 'e27', source: 'carlos-nobre', target: 'kaua-tupi-demo', kind: 'project', weight: 4, label: { pt: 'Laboratórios Amazônia 4.0 Xingu', en: 'Amazonia 4.0 Xingu Labs' }, year: 2025 },

  // Sparse Existing CROSS-AXIS BRIDGES (realistic: PIs connect at the top, few ECR cross-links yet!)
  { id: 'x1', source: 'tercio-ambrizzi', target: 'jose-marengo', kind: 'coauthored', weight: 5, label: { pt: 'Atribuição extremos RS & SP (E1↔E2)', en: 'RS & SP extreme attribution (A1↔A2)' }, year: 2025 },
  { id: 'x2', source: 'tercio-ambrizzi', target: 'carlos-nobre', kind: 'coauthored', weight: 4, label: { pt: 'Síntese CLIMARES / Amazônia (E1↔E11)', en: 'CLIMARES / Amazon synthesis (A1↔A11)' }, year: 2024 },
  { id: 'x3', source: 'tercio-ambrizzi', target: 'pedro-jacobi', kind: 'coauthored', weight: 3, label: { pt: 'Governança do CEPID CLIMARES (E1↔E9)', en: 'CEPID CLIMARES governance (A1↔A9)' }, year: 2024 },
  { id: 'x4', source: 'cristiano-chiessi', target: 'carlos-nobre', kind: 'coauthored', weight: 4, label: { pt: 'Paleo-hidroclima do Xingu (E1↔E11)', en: 'Xingu paleo-hydroclimate (A1↔A11)' }, year: 2024 },
  { id: 'x5', source: 'jose-marengo', target: 'eduardo-mendiondo', kind: 'coauthored', weight: 4, label: { pt: 'Secas Cantareira & Cheias RS (E2↔E5)', en: 'Cantareira droughts & RS floods (A2↔A5)' }, year: 2025 },
  { id: 'x6', source: 'eduardo-mendiondo', target: 'pedro-jacobi', kind: 'coauthored', weight: 4, label: { pt: 'Governança hídrica participativa (E5↔E9)', en: 'Participatory water governance (A5↔A9)' }, year: 2025 },
  { id: 'x7', source: 'pedro-jacobi', target: 'leila-ferreira', kind: 'coauthored', weight: 4, label: { pt: 'Educação e políticas municipais (E9↔E7)', en: 'Municipal policy & literacy (A9↔A7)' }, year: 2024 },
  { id: 'x8', source: 'jose-marengo', target: 'eduardo-haddad', kind: 'project', weight: 3, label: { pt: 'Avaliação impacto RS 2024 (E2↔E10)', en: 'RS 2024 impact assessment (A2↔A10)' }, year: 2025 },
  { id: 'x9', source: 'roberto-zilles', target: 'colombo-tassinari', kind: 'project', weight: 3, label: { pt: 'Inovação energética IEE-USP (E3↔E8)', en: 'IEE-USP energy innovation (A3↔A8)' }, year: 2024 },
  { id: 'x10', source: 'jurandir-zullo', target: 'tercio-ambrizzi', kind: 'project', weight: 2, label: { pt: 'Cenários climáticos p/ ZARC (E4↔E1)', en: 'Climate scenarios for ZARC (A4↔A1)' }, year: 2024 },
  // Notice: E6 (Health) has ZERO active cross-axis edges yet! E3 (Energy) has zero links to E5/E6/E11! E8 (Innovation) has zero links to E4/E9/E10!
];

export const SEED_ASSETS: CommonsAsset[] = [
  {
    id: 'asset-cmip7-explorer',
    name: 'CMIP7 Area Explorer & Downloader',
    kind: 'tool',
    description: {
      pt: 'Ferramenta interativa para seleção de recortes espaciais e extração padronizada de projeções CMIP6/CMIP7 para América do Sul e bacias brasileiras.',
      en: 'Interactive tool for spatial subsetting and standardized CMIP6/CMIP7 climate projection downloads over South America and Brazilian basins.',
    },
    axisId: 1,
    maintainerIds: ['marcelo-camargo-demo', 'rosmeri-rocha'],
    regions: ['xingu', 'rmsp', 'cantareira-pcj', 'taquari-rs', 'cerrado-sp-co'],
    hazards: ['heatwaves', 'compound-drought', 'extreme-rain-landslides'],
    domain: 'climate_projections',
    format: 'Web App / NetCDF / CSV',
    access: 'open',
    url: 'https://github.com/',
    usedByAxes: [1, 2],
    neededByAxes: [3, 4, 5, 6, 10, 11],
  },
  {
    id: 'asset-regcm5-sa',
    name: 'RegCM5 High-Res South America Ensemble',
    kind: 'dataset',
    description: {
      pt: 'Simulações climáticas regionais de 12 km (e rodadas convectivas de 4 km) para eventos extremos de chuva, vento e temperatura sob SSP2-4.5 e SSP5-8.5.',
      en: '12 km regional climate runs (plus 4 km convection-permitting slices) for extreme rainfall, wind, and temperature under SSP2-4.5/SSP5-8.5.',
    },
    axisId: 1,
    maintainerIds: ['rosmeri-rocha', 'tercio-ambrizzi'],
    regions: ['rmsp', 'litoral-norte-sp', 'taquari-rs', 'semiarido'],
    hazards: ['extreme-rain-landslides', 'floods', 'energy-stress'],
    domain: 'climate_projections',
    format: 'NetCDF-4 (CF-1.8)',
    access: 'internal',
    usedByAxes: [1, 2],
    neededByAxes: [3, 5, 6],
  },
  {
    id: 'asset-cemaden-catalog',
    name: 'Catálogo Subdiário de Alertas & Deslizamentos CEMADEN',
    kind: 'dataset',
    description: {
      pt: 'Série histórica municipal de alertas geo-hidrológicos, registros de deslizamentos e pluviômetros de 10 minutos na Serra do Mar e Sudeste.',
      en: 'Municipal historical archive of geo-hydrological warnings, landslide inventories, and 10-min rain gauges across Serra do Mar and SE Brazil.',
    },
    axisId: 2,
    maintainerIds: ['jose-marengo', 'camila-santos-demo'],
    regions: ['litoral-norte-sp', 'rmsp', 'paraiba-sul', 'taquari-rs'],
    hazards: ['extreme-rain-landslides', 'floods'],
    domain: 'extreme_hazards',
    format: 'CSV / GeoPackage',
    access: 'request',
    usedByAxes: [2, 5],
    neededByAxes: [1, 7, 9, 10],
  },
  {
    id: 'asset-sar-floods',
    name: 'Manchas de Inundação SAR 10m (RS 2024 & Vale do Ribeira)',
    kind: 'dataset',
    description: {
      pt: 'Extensão máxima de áreas inundadas mapeada com imagens Sentinel-1 SAR em alta resolução, pronta para cruzamento censitário e econômico.',
      en: 'High-resolution Sentinel-1 SAR maximum flood footprints ready for census and economic loss overlay.',
    },
    axisId: 2,
    maintainerIds: ['rafael-mendes-demo'],
    regions: ['taquari-rs', 'vale-ribeira', 'litoral-norte-sp'],
    hazards: ['floods'],
    domain: 'geospatial_code',
    format: 'Cloud-Optimized GeoTIFF',
    access: 'open',
    usedByAxes: [2],
    neededByAxes: [5, 9, 10],
  },
  {
    id: 'asset-pypsa-sin',
    name: 'PyPSA-BR: Simulador de Estresse Elétrico do SIN',
    kind: 'model',
    description: {
      pt: 'Modelo aberto de despacho hidrotérmico, solar e baterias acoplado a cenários de seca hidrelétrica e picos térmicos de demanda.',
      en: 'Open-source hydrothermal, solar, and battery dispatch model coupled with drought and heat-peak demand shocks.',
    },
    axisId: 3,
    maintainerIds: ['tiago-oliveira-demo', 'roberto-zilles'],
    regions: ['rmsp', 'xingu', 'semiarido'],
    hazards: ['energy-stress', 'heatwaves', 'compound-drought'],
    domain: 'energy_grid',
    format: 'Python / PyPSA',
    access: 'open',
    usedByAxes: [3],
    neededByAxes: [5, 6, 10, 11],
  },
  {
    id: 'asset-zarc-sp',
    name: 'Painel Agroclimático & Risco de Safras (ZARC-SP/CO)',
    kind: 'dataset',
    description: {
      pt: 'Índices municipais de aptidão agrícola, quebra de safra histórica e sensibilidade térmica de café, milho safrinha, cana e hortaliças.',
      en: 'Municipal agricultural suitability indices, yield-loss series, and heat sensitivity for coffee, maize, sugarcane, and horticulture.',
    },
    axisId: 4,
    maintainerIds: ['jurandir-zullo', 'beatriz-almeida-demo'],
    regions: ['cerrado-sp-co', 'cantareira-pcj', 'semiarido'],
    hazards: ['crop-shock', 'compound-drought'],
    domain: 'agro_food',
    format: 'Parquet / GeoJSON',
    access: 'internal',
    usedByAxes: [4],
    neededByAxes: [8, 9, 10],
  },
  {
    id: 'asset-swat-pcj',
    name: 'SWAT-PCJ & HEC-RAS 2D Drenagem Urbana',
    kind: 'model',
    description: {
      pt: 'Modelos hidrológicos calibrados para o Sistema Cantareira, bacias PCJ e sub-bacias urbanas de SP com módulos de Soluções Baseadas na Natureza.',
      en: 'Calibrated hydrological models for Cantareira, PCJ basins, and SP urban catchments with Nature-Based Solution modules.',
    },
    axisId: 5,
    maintainerIds: ['eduardo-mendiondo', 'gabriela-tavares-demo'],
    regions: ['cantareira-pcj', 'rmsp', 'paraiba-sul'],
    hazards: ['floods', 'compound-drought'],
    domain: 'hydrology_water',
    format: 'SWAT+ / HEC-RAS / GIS',
    access: 'internal',
    usedByAxes: [5, 2],
    neededByAxes: [3, 4, 6, 9],
  },
  {
    id: 'asset-datasus-clima',
    name: 'Painel Epidemiológico Clima-Saúde (DATASUS / SINAN)',
    kind: 'dataset',
    description: {
      pt: 'Séries municipais diárias tratadas de internações cardiovasculares, respiratórias, arboviroses e leptospirose para modelos dose-resposta.',
      en: 'Cleaned daily municipal panel of cardiovascular, respiratory, dengue, and leptospirosis admissions for dose-response modeling.',
    },
    axisId: 6,
    maintainerIds: ['mariana-rocha-demo', 'claudia-moreno'],
    regions: ['rmsp', 'sul-amazonia', 'cantareira-pcj', 'taquari-rs'],
    hazards: ['heatwaves', 'health-vectors', 'floods'],
    domain: 'health_epi',
    format: 'R / Parquet (anonimizado)',
    access: 'request',
    usedByAxes: [6],
    neededByAxes: [1, 5, 7, 10],
  },
  {
    id: 'asset-ccus-parana',
    name: 'Atlas Geológico de CCUS / BECCS — Bacia do Paraná',
    kind: 'dataset',
    description: {
      pt: 'Mapeamento de reservatórios geológicos salinos e fontes estacionárias de CO2 biogênico (usinas de etanol) no Estado de São Paulo.',
      en: 'Mapping of deep saline storage formations and biogenic CO2 point sources (ethanol mills) in São Paulo State.',
    },
    axisId: 8,
    maintainerIds: ['colombo-tassinari', 'bruno-cardoso-demo'],
    regions: ['cerrado-sp-co', 'paraiba-sul'],
    hazards: ['energy-stress'],
    domain: 'climate_innovation',
    format: 'Shapefile / WebGIS',
    access: 'internal',
    usedByAxes: [8, 3],
    neededByAxes: [4, 9, 10],
  },
  {
    id: 'asset-cartografia-social',
    name: 'Protocolo de Cartografia Social & Índice Censo 2022',
    kind: 'protocol',
    description: {
      pt: 'Guia de campo para mapeamento participativo em áreas de risco + índice municipal padronizado de vulnerabilidade sociodemográfica.',
      en: 'Field protocol for participatory risk cartography plus standardized 2022 Census municipal sociodemographic vulnerability index.',
    },
    axisId: 9,
    maintainerIds: ['renata-gomes-demo', 'mateus-silveira-demo', 'pedro-jacobi'],
    regions: ['litoral-norte-sp', 'vale-ribeira', 'rmsp', 'semiarido'],
    hazards: ['extreme-rain-landslides', 'floods', 'compound-drought'],
    domain: 'social_governance',
    format: 'PDF / CSV / GeoJSON',
    access: 'open',
    usedByAxes: [9, 7],
    neededByAxes: [2, 5, 6, 10],
  },
  {
    id: 'asset-iioa-br',
    name: 'Matriz IIOA-BR & Modelo B-MARIA (Choques Climáticos)',
    kind: 'model',
    description: {
      pt: 'Estrutura econômica inter-regional brasileira para simular propagação de choques físicos (enchentes, secas, calor) sobre PIB, emprego e inflação.',
      en: 'Brazilian interregional economic framework to propagate physical shocks (floods, droughts, heat) into GDP, jobs, and prices.',
    },
    axisId: 10,
    maintainerIds: ['eduardo-haddad', 'vinicius-moraes-demo'],
    regions: ['taquari-rs', 'rmsp', 'cerrado-sp-co', 'sul-amazonia'],
    hazards: ['floods', 'crop-shock', 'heatwaves', 'compound-drought'],
    domain: 'economic_modeling',
    format: 'GEMPACK / R / CSV',
    access: 'request',
    usedByAxes: [10],
    neededByAxes: [1, 2, 4, 6, 8, 11],
  },
  {
    id: 'asset-caete-amazonia',
    name: 'CAETÊ-Xingu: Dinâmica Vegetal & Biofábricas Amazônia 4.0',
    kind: 'model',
    description: {
      pt: 'Simulações de resiliência funcional da floresta amazônica acopladas a parâmetros produtivos de biofábricas comunitárias no Xingu.',
      en: 'Functional Amazon forest resilience simulations paired with community biofactory performance metrics in Xingu.',
    },
    axisId: 11,
    maintainerIds: ['paula-mendes-demo', 'kaua-tupi-demo', 'carlos-nobre'],
    regions: ['xingu', 'sul-amazonia'],
    hazards: ['amazon-tipping', 'compound-drought'],
    domain: 'amazon_bioeconomy',
    format: 'Fortran/Python • NetCDF',
    access: 'open',
    usedByAxes: [11, 1],
    neededByAxes: [3, 6, 10],
  },
];

export const SEED_MISSIONS: CrossAxisMission[] = [
  {
    id: 'mission-rmsp-heat',
    title: {
      pt: 'Nexo Calor–Saúde–Energia na RMSP (2025–2050)',
      en: 'RMSP Heat–Health–Energy Nexus (2025–2050)',
    },
    summary: {
      pt: 'Integrar projeções CMIP7/WRF de noites tropicais e bulbo úmido (E1) com picos de demanda elétrica (E3), mortalidade cardiovascular (E6), perdas laborais (E10) e protocolos escolares (E7).',
      en: 'Couple CMIP7/WRF tropical-night & wet-bulb projections (A1) with grid load spikes (A3), cardiovascular mortality (A6), labor losses (A10), and school guidelines (A7).',
    },
    status: 'urgent',
    leadId: 'claudia-moreno',
    memberIds: ['claudia-moreno', 'mariana-rocha-demo', 'marcelo-camargo-demo', 'tiago-oliveira-demo'],
    activeAxes: [1, 3, 6],
    openAxes: [7, 9, 10],
    regions: ['rmsp'],
    hazards: ['heatwaves', 'energy-stress', 'health-vectors'],
    targetOutput: {
      pt: 'Artigo síntese multidisciplinar + Nota Técnica para a Prefeitura de São Paulo e Defesa Civil',
      en: 'Multidisciplinary synthesis paper + Policy Brief for São Paulo City Hall & Civil Defense',
    },
    deadline: 'Out 2026',
  },
  {
    id: 'mission-rs-2024',
    title: {
      pt: 'Dossiê Integrado da Mega-Enchente do RS 2024',
      en: 'Integrated Dossier: 2024 Rio Grande do Sul Mega-Flood',
    },
    summary: {
      pt: 'Cadeia completa de atribuição climática (E1), alerta e mapeamento SAR (E2), hidrodinâmica (E5) e impacto macroeconômico nas cadeias produtivas brasileiras (E10).',
      en: 'End-to-end chain from climate attribution (A1) and SAR/warning forensics (A2) to hydrodynamics (A5) and cascading Brazilian GDP losses (A10).',
    },
    status: 'active',
    leadId: 'jose-marengo',
    memberIds: ['jose-marengo', 'tercio-ambrizzi', 'rafael-mendes-demo', 'eduardo-mendiondo', 'eduardo-haddad', 'vinicius-moraes-demo'],
    activeAxes: [1, 2, 5, 10],
    openAxes: [6, 7, 9],
    regions: ['taquari-rs'],
    hazards: ['floods', 'extreme-rain-landslides'],
    targetOutput: {
      pt: 'Número Especial CLIMARES + Base Aberta de Danos Físicos e Econômicos',
      en: 'CLIMARES Special Issue + Open Physical & Economic Loss Dataset',
    },
    deadline: 'Dez 2026',
  },
  {
    id: 'mission-xingu-nexus',
    title: {
      pt: 'Xingu Resiliente: Clima, Energia, Bioeconomia e Saúde',
      en: 'Resilient Xingu: Climate, Energy, Bioeconomy & Health',
    },
    summary: {
      pt: 'Conectar cenários hidroclimáticos (E1/E5) e limiares florestais (E11) ao dimensionamento de biofábricas solares Amazônia 4.0 (E3/E11) e valoração econômica de floresta em pé (E10).',
      en: 'Link hydroclimatic projections (A1/A5) and forest thresholds (A11) with solar Amazonia 4.0 biofactories (A3/A11) and standing-forest valuation (A10).',
    },
    status: 'forming',
    leadId: 'carlos-nobre',
    memberIds: ['carlos-nobre', 'paula-mendes-demo', 'kaua-tupi-demo', 'cristiano-chiessi', 'diego-pereira-demo'],
    activeAxes: [1, 5, 11],
    openAxes: [3, 6, 7, 10],
    regions: ['xingu', 'sul-amazonia'],
    hazards: ['amazon-tipping', 'compound-drought', 'energy-stress'],
    targetOutput: {
      pt: 'Relatório Executivo COP / FAPESP + Protótipo de Biofábrica Solar Autônoma',
      en: 'COP / FAPESP Executive Report + Off-grid Solar Biofactory Blueprint',
    },
    deadline: 'Mar 2027',
  },
  {
    id: 'mission-litoral-norte',
    title: {
      pt: 'Serra do Mar Segura: Alerta à Última Milha e Justiça Climática',
      en: 'Safe Serra do Mar: Last-Mile Warning & Climate Justice',
    },
    summary: {
      pt: 'Combinar downscaling convectivo (E1) e limiares geotécnicos CEMADEN (E2) com cartografia social de comunidades vulneráveis (E9) e comunicação de alertas testada em campo (E7).',
      en: 'Combine convection-permitting downscaling (A1) and CEMADEN landslide triggers (A2) with participatory social cartography (A9) and field-tested alert communication (A7).',
    },
    status: 'active',
    leadId: 'pedro-jacobi',
    memberIds: ['pedro-jacobi', 'renata-gomes-demo', 'camila-santos-demo', 'rosmeri-rocha', 'juliana-barros-demo'],
    activeAxes: [1, 2, 7, 9],
    openAxes: [5, 10],
    regions: ['litoral-norte-sp', 'vale-ribeira'],
    hazards: ['extreme-rain-landslides', 'floods'],
    targetOutput: {
      pt: 'Protocolo Integrado de Alerta Comunitário para São Sebastião e Caraguatatuba',
      en: 'Integrated Community Early-Warning Protocol for São Sebastião & Caraguatatuba',
    },
    deadline: 'Nov 2026',
  },
  {
    id: 'mission-cantareira-food-water',
    title: {
      pt: 'Nexo Água–Alimento nas Bacias PCJ & Cantareira',
      en: 'Water–Food Nexus in the PCJ & Cantareira Basins',
    },
    summary: {
      pt: 'Avaliar choques simultâneos de seca prolongada sobre o abastecimento urbano (E5), cinturões agrícolas periurbanos (E4) e governança de comitês de bacia (E9).',
      en: 'Assess compound multi-year drought impacts on urban reservoirs (A5), peri-urban food belts (A4), and watershed committee governance (A9).',
    },
    status: 'forming',
    leadId: 'eduardo-mendiondo',
    memberIds: ['eduardo-mendiondo', 'gabriela-tavares-demo', 'jurandir-zullo', 'beatriz-almeida-demo'],
    activeAxes: [4, 5],
    openAxes: [1, 9, 10],
    regions: ['cantareira-pcj'],
    hazards: ['compound-drought', 'crop-shock'],
    targetOutput: {
      pt: 'Painel de Estresse Hídrico-Agrícola para o Comitê PCJ e Sabesp',
      en: 'Water-Agro Stress Dashboard for PCJ Watershed Committee & Utilities',
    },
    deadline: 'Fev 2027',
  },
  {
    id: 'mission-beccs-cerrado',
    title: {
      pt: 'Rota BECCS Paulista: Solo, Carbono Geológico e Economia',
      en: 'São Paulo BECCS Pathway: Soil, Geological Carbon & Economy',
    },
    summary: {
      pt: 'Avaliar viabilidade integrada de remoção de CO2 acoplada à cadeia de cana-etanol sob clima futuro (E4), potencial geológico (E8), mercado de carbono (E10) e licença social (E9).',
      en: 'Assess integrated CO2 removal via sugarcane-ethanol under future climate (A4), geological storage (A8), carbon pricing (A10), and social license (A9).',
    },
    status: 'forming',
    leadId: 'colombo-tassinari',
    memberIds: ['colombo-tassinari', 'bruno-cardoso-demo', 'henrique-costa-demo'],
    activeAxes: [4, 8],
    openAxes: [1, 3, 9, 10],
    regions: ['cerrado-sp-co'],
    hazards: ['crop-shock', 'energy-stress'],
    targetOutput: {
      pt: 'Roadmap Tecnológico e Econômico de Emissões Negativas para o Estado de SP',
      en: 'Technological & Economic Negative-Emissions Roadmap for São Paulo State',
    },
    deadline: 'Jun 2027',
  },
];
