import { CollaborationEdge, ForumThread, Researcher } from '../types';

export const SEED_RESEARCHERS: Researcher[] = [
  {
    "id": "tercio-ambrizzi",
    "name": "Tércio Ambrizzi",
    "role": "coordinator",
    "institution": "USP",
    "unit": "IEE-USP / IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      11
    ],
    "photoUrl": "./photos/tercio-ambrizzi.jpg",
    "bio": {
      "pt": "Coordenador Geral do CEPID CLIMARES. Dinâmica atmosférica, teleconexões e extremos climáticos.",
      "en": "General Coordinator of CEPID CLIMARES. Atmospheric dynamics, teleconnections, and climate extremes."
    },
    "email": "ambrizzi@usp.br",
    "bvFapespUrl": "https://bv.fapesp.br/pt/pesquisador/770/tercio-ambrizzi/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "RegCM",
      "CMIP6/CMIP7",
      "Teleconexões",
      "Extremos"
    ],
    "regions": [
      "rmsp",
      "taquari-rs",
      "xingu",
      "cantareira-pcj"
    ],
    "hazards": [
      "heatwaves",
      "extreme-rain-landslides",
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-tercio-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários climáticos regionais para América do Sul",
          "en": "Regional climate scenarios for South America"
        }
      }
    ],
    "needs": [
      {
        "id": "need-tercio-1",
        "domain": "economic_modeling",
        "label": {
          "pt": "Tradução de extremos físicos em métricas econômicas e sociais",
          "en": "Translating physical extremes into socioeconomic metrics"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief",
      "committee"
    ],
    "publications": []
  },
  {
    "id": "jose-marengo",
    "name": "José A. Marengo",
    "role": "coordinator",
    "institution": "CEMADEN",
    "unit": "CEMADEN / MCTI",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      1,
      5,
      11
    ],
    "photoUrl": "./photos/jose-marengo.jpg",
    "bio": {
      "pt": "Vice-Coordenador Geral e PI do Eixo 2. Extremos hidrometeorológicos, secas, desastres e alertas precoces.",
      "en": "Vice-Coordinator & Axis 2 PI. Hydrometeorological extremes, droughts, disasters, and early warnings."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Alertas Precoces",
      "Secas",
      "Risco de Desastres",
      "Atribuição"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs",
      "sul-amazonia",
      "semiarido",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-marengo-1",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Séries históricas e alertas de desastres no Brasil (CEMADEN)",
          "en": "Historical disaster & warning series in Brazil (CEMADEN)"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marengo-1",
        "domain": "education_comm",
        "label": {
          "pt": "Comunicação de risco e resposta comunitária aos alertas",
          "en": "Last-mile risk communication and community response"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "ildo-sauer",
    "name": "Ildo Luís Sauer",
    "role": "coordinator",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      8,
      10
    ],
    "photoUrl": "./photos/ildo-sauer.jpg",
    "bio": {
      "pt": "Coordenador de Inovação e PI do Eixo 3. Planejamento energético, matriz elétrica e transição justa.",
      "en": "Innovation Coordinator & Axis 3 PI. Energy planning, power grid security, and just transition."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Planejamento Energético",
      "Sistema Interligado (SIN)",
      "Transição Justa"
    ],
    "regions": [
      "xingu",
      "paraiba-sul",
      "semiarido",
      "rmsp"
    ],
    "hazards": [
      "energy-stress",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-sauer-1",
        "domain": "energy_grid",
        "label": {
          "pt": "Cenários de segurança energética e transição do SIN",
          "en": "Power grid security and transition scenarios"
        }
      }
    ],
    "needs": [
      {
        "id": "need-sauer-1",
        "domain": "hydrology_water",
        "label": {
          "pt": "Vazões projetadas para bacias hidrelétricas estratégicas",
          "en": "Projected streamflow for strategic hydropower basins"
        }
      }
    ],
    "availability": [
      "policy_brief",
      "committee"
    ],
    "publications": []
  },
  {
    "id": "leila-ferreira",
    "name": "Leila da Costa Ferreira",
    "role": "coordinator",
    "institution": "UNICAMP",
    "unit": "IFCH / NEPAM-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      9
    ],
    "photoUrl": "./photos/leila-ferreira.jpg",
    "bio": {
      "pt": "Coordenadora de Difusão e PI do Eixo 7. Sociologia ambiental, políticas climáticas e difusão científica.",
      "en": "Outreach Coordinator & Axis 7 PI. Environmental sociology, climate policy, and science dissemination."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sociologia Ambiental",
      "Difusão Científica",
      "Políticas Climáticas"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp",
      "vale-ribeira",
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-leila-1",
        "domain": "education_comm",
        "label": {
          "pt": "Tradução científica para escolas, gestores e policy briefs",
          "en": "Science translation for schools, policymakers, and policy briefs"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leila-1",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Mapas e sínteses visuais dos demais eixos para difusão pública",
          "en": "Accessible maps and visual syntheses from other axes for public outreach"
        }
      }
    ],
    "availability": [
      "policy_brief",
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ilana-wainer",
    "name": "Ilana Wainer",
    "role": "pi",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2
    ],
    "photoUrl": "./photos/ilana-wainer.jpg",
    "bio": {
      "pt": "PI do Eixo 1 (IO-USP). Oceanografia física, interação oceano-atmosfera e variabilidade do Atlântico Sul.",
      "en": "Axis 1 PI (IO-USP). Physical oceanography, ocean-atmosphere interaction, and South Atlantic variability."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceano-Atmosfera",
      "CESM / CMIP",
      "Atlântico Sul"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs",
      "semiarido"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-ilana-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Anomalias oceânicas do Atlântico Sul e extremos costeiros",
          "en": "South Atlantic ocean anomalies and coastal extremes"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ilana-1",
        "domain": "social_governance",
        "label": {
          "pt": "Impactos costeiros em municípios do litoral paulista",
          "en": "Coastal impact feedback from São Paulo littoral municipalities"
        }
      }
    ],
    "availability": [
      "coauthor",
      "committee"
    ],
    "publications": []
  },
  {
    "id": "rosmeri-rocha",
    "name": "Rosmeri Porfírio da Rocha",
    "role": "pi",
    "institution": "USP",
    "unit": "IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      3,
      5
    ],
    "photoUrl": "./photos/rosmeri-rocha.jpg",
    "bio": {
      "pt": "PI do Eixo 1 (IAG-USP). Downscaling dinâmico (RegCM/WRF), ciclones extratropicais e extremos de chuva e vento.",
      "en": "Axis 1 PI (IAG-USP). Dynamical downscaling (RegCM/WRF), extratropical cyclones, and wind/rainfall extremes."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "RegCM5",
      "WRF",
      "CORDEX",
      "Extremos Subdiários"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp",
      "taquari-rs",
      "semiarido"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods",
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-rosmeri-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações RegCM5/WRF de alta resolução (chuva horária e vento)",
          "en": "High-resolution RegCM5/WRF runs (hourly rainfall and wind)"
        }
      }
    ],
    "needs": [
      {
        "id": "need-rosmeri-1",
        "domain": "hydrology_water",
        "label": {
          "pt": "Acoplamento de chuva subdiária com modelos hidrológicos e de encosta",
          "en": "Coupling sub-daily rainfall with hydrological and landslide models"
        }
      }
    ],
    "availability": [
      "coauthor",
      "dataset_share"
    ],
    "publications": []
  },
  {
    "id": "cristiano-chiessi",
    "name": "Cristiano Mazur Chiessi",
    "role": "pi",
    "institution": "USP",
    "unit": "EACH-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "photoUrl": "./photos/cristiano-chiessi.jpg",
    "bio": {
      "pt": "PI do Eixo 1 (EACH-USP). Paleoclimatologia, Monção Sul-Americana e variabilidade hidroclimática da Amazônia e Nordeste.",
      "en": "Axis 1 PI (EACH-USP). Paleoclimatology, South American Monsoon, and Amazon/Northeast hydroclimate variability."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoclima",
      "Monção Sul-Americana",
      "Amazônia"
    ],
    "regions": [
      "xingu",
      "sul-amazonia",
      "semiarido"
    ],
    "hazards": [
      "compound-drought",
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-chiessi-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries paleoclimáticas de megassecas na Amazônia e Semiárido",
          "en": "Paleoclimate megadrought reconstructions for Amazon & Semi-Arid"
        }
      }
    ],
    "needs": [
      {
        "id": "need-chiessi-1",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Modelos de resiliência florestal na Bacia do Xingu",
          "en": "Forest resilience modeling across the Xingu Basin"
        }
      }
    ],
    "availability": [
      "coauthor",
      "mentoring"
    ],
    "publications": []
  },
  {
    "id": "marcelo-camargo",
    "name": "Marcelo Camargo",
    "role": "phd",
    "institution": "USP",
    "unit": "IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      5,
      11
    ],
    "photoUrl": "./photos/marcelo-camargo.jpg",
    "bio": {
      "pt": "Pesquisador no Eixo 1 (IAG-USP). Variabilidade hidroclimática na Bacia do Xingu, projeções CMIP7 (ESGF-NG) e microfísica de nuvens.",
      "en": "Researcher in Axis 1 (IAG-USP). Xingu Basin hydroclimatic variability, CMIP7 projections (ESGF-NG), and cloud microphysics."
    },
    "githubUrl": "https://github.com/mgpcamargo",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "CMIP7 / ESGF-NG",
      "Python / Xarray",
      "Hidroclima Xingu",
      "Microfísica de Nuvens"
    ],
    "regions": [
      "xingu",
      "sul-amazonia",
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought",
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-marcelo-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Extração e recortes regionais CMIP7 (CMIP7 Area Explorer) para bacias brasileiras",
          "en": "CMIP7 regional subsetting & downloads (CMIP7 Area Explorer) for Brazilian basins"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcelo-1",
        "domain": "health_epi",
        "label": {
          "pt": "Demandas de variáveis climáticas dos Eixos de Água, Saúde, Economia e Amazônia",
          "en": "Climate variable requirements from Water, Health, Economy, and Amazon Axes"
        }
      }
    ],
    "availability": [
      "coauthor",
      "dataset_share"
    ],
    "publications": []
  },
  {
    "id": "chou-sin-chan",
    "name": "Chou Sin Chan",
    "role": "pi",
    "institution": "INPE",
    "unit": "INPE / CEMADEN",
    "city": "Cachoeira Paulista, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      1,
      4,
      5
    ],
    "photoUrl": "./photos/chou-sin-chan.jpg",
    "bio": {
      "pt": "PI do Eixo 2 (INPE). Modelagem atmosférica regional Eta, previsão numérica e cenários regionalizados de extremos.",
      "en": "Axis 2 PI (INPE). Eta regional atmospheric modeling, numerical weather prediction, and extreme scenarios."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelo Eta",
      "Modelagem Regional",
      "Previsão de Extremos"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul",
      "taquari-rs",
      "cerrado-sp-co"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-chou-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações climáticas regionalizadas com o Modelo Eta (INPE)",
          "en": "Regionalized climate simulations with the Eta Model (INPE)"
        }
      }
    ],
    "needs": [
      {
        "id": "need-chou-1",
        "domain": "hydrology_water",
        "label": {
          "pt": "Validação de impactos hidrológicos e agrícolas por bacia",
          "en": "Hydrological and agricultural impact validation by basin"
        }
      }
    ],
    "availability": [
      "coauthor",
      "dataset_share"
    ],
    "publications": []
  },
  {
    "id": "roberto-zilles",
    "name": "Roberto Zilles",
    "role": "pi",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      8,
      11
    ],
    "photoUrl": "./photos/roberto-zilles.jpg",
    "bio": {
      "pt": "PI do Eixo 3 (IEE-USP). Sistemas fotovoltaicos, geração distribuída, microrredes solares e armazenamento.",
      "en": "Axis 3 PI (IEE-USP). Solar PV systems, distributed generation, solar microgrids, and energy storage."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Energia Solar PV",
      "Microrredes",
      "Armazenamento"
    ],
    "regions": [
      "rmsp",
      "semiarido",
      "xingu"
    ],
    "hazards": [
      "energy-stress",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-zilles-1",
        "domain": "energy_grid",
        "label": {
          "pt": "Dimensionamento de microrredes solares e resiliência elétrica",
          "en": "Solar microgrid sizing and power resilience"
        }
      }
    ],
    "needs": [
      {
        "id": "need-zilles-1",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Demandas energéticas de comunidades isoladas e biofábricas na Amazônia",
          "en": "Energy needs of remote Amazon communities and biofactories"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "jurandir-zullo",
    "name": "Jurandir Zullo Junior",
    "role": "pi",
    "institution": "UNICAMP",
    "unit": "CEPAGRI-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 4,
    "secondaryAxes": [
      1,
      10
    ],
    "photoUrl": "./photos/jurandir-zullo.jpg",
    "bio": {
      "pt": "PI do Eixo 4 (CEPAGRI-UNICAMP). Agrometeorologia, zoneamento de risco climático (ZARC) e segurança alimentar.",
      "en": "Axis 4 PI (CEPAGRI-UNICAMP). Agrometeorology, agricultural climate risk zoning (ZARC), and food security."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Agrometeorologia",
      "ZARC",
      "Sensoriamento Agrícola"
    ],
    "regions": [
      "cerrado-sp-co",
      "cantareira-pcj",
      "semiarido"
    ],
    "hazards": [
      "crop-shock",
      "compound-drought",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-zullo-1",
        "domain": "agro_food",
        "label": {
          "pt": "Zoneamento de risco agroclimático e perda de safras",
          "en": "Agroclimatic risk zoning and crop yield loss series"
        }
      }
    ],
    "needs": [
      {
        "id": "need-zullo-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções futuras de veranicos e ondas de calor em regiões agrícolas",
          "en": "Future dry-spell and heatwave projections for agricultural belts"
        }
      }
    ],
    "availability": [
      "coauthor",
      "dataset_share"
    ],
    "publications": []
  },
  {
    "id": "eduardo-mendiondo",
    "name": "Eduardo Mario Mendiondo",
    "role": "pi",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      2,
      9
    ],
    "photoUrl": "./photos/eduardo-mendiondo.jpg",
    "bio": {
      "pt": "PI do Eixo 5 (EESC-USP). Recursos hídricos, socio-hidrologia, drenagem urbana sustentável (SbN) e segurança de bacias.",
      "en": "Axis 5 PI (EESC-USP). Water resources, socio-hydrology, nature-based urban drainage, and basin security."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrologia",
      "SWAT / HEC-RAS",
      "Soluções Baseadas na Natureza"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp",
      "taquari-rs",
      "paraiba-sul"
    ],
    "hazards": [
      "floods",
      "compound-drought",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-mendiondo-1",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrológica de cheias urbanas e segurança de reservatórios",
          "en": "Urban flood and reservoir water-security hydrological modeling"
        }
      }
    ],
    "needs": [
      {
        "id": "need-mendiondo-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Curvas de chuva intensa futura (subdiária) para dimensionamento hidráulico",
          "en": "Future sub-daily intense rainfall curves for hydraulic design"
        }
      }
    ],
    "availability": [
      "coauthor",
      "fieldwork"
    ],
    "publications": []
  },
  {
    "id": "claudia-moreno",
    "name": "Cláudia Roberta de Castro Moreno",
    "role": "pi",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      9
    ],
    "photoUrl": "./photos/claudia-moreno.jpg",
    "bio": {
      "pt": "PI do Eixo 6 (FSP-USP). Saúde pública, estresse térmico ocupacional, cronobiologia e impactos sanitários de extremos.",
      "en": "Axis 6 PI (FSP-USP). Public health, occupational heat stress, chronobiology, and health impacts of extremes."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Pública",
      "Estresse Térmico",
      "Epidemiologia"
    ],
    "regions": [
      "rmsp",
      "sul-amazonia",
      "cerrado-sp-co"
    ],
    "hazards": [
      "heatwaves",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-moreno-1",
        "domain": "health_epi",
        "label": {
          "pt": "Indicadores de estresse térmico humano e vulnerabilidade em saúde",
          "en": "Human thermal stress and public health vulnerability indicators"
        }
      }
    ],
    "needs": [
      {
        "id": "need-moreno-1",
        "domain": "climate_projections",
        "label": {
          "pt": "Grades de temperatura noturna e umidade relativa em ondas de calor",
          "en": "Nighttime temperature and humidity grids during urban heatwaves"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "colombo-tassinari",
    "name": "Colombo Celso Gaeta Tassinari",
    "role": "pi",
    "institution": "USP",
    "unit": "IEE-USP / IGc-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [
      3
    ],
    "photoUrl": "./photos/colombo-tassinari.jpg",
    "bio": {
      "pt": "PI do Eixo 8 (IEE-USP / IGc-USP). Captura e armazenamento geológico de carbono (CCUS/BECCS) e rotas tecnológicas de mitigação.",
      "en": "Axis 8 PI (IEE-USP / IGc-USP). Geological carbon capture & storage (CCUS/BECCS) and technological mitigation."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "CCUS / BECCS",
      "Armazenamento de CO2",
      "Geologia"
    ],
    "regions": [
      "cerrado-sp-co",
      "paraiba-sul"
    ],
    "hazards": [
      "energy-stress",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-colombo-1",
        "domain": "climate_innovation",
        "label": {
          "pt": "Potencial de armazenamento geológico de CO2 (BECCS) na Bacia do Paraná",
          "en": "Geological CO2 storage potential (BECCS) in the Paraná Basin"
        }
      }
    ],
    "needs": [
      {
        "id": "need-colombo-1",
        "domain": "economic_modeling",
        "label": {
          "pt": "Viabilidade econômica e mercado de carbono para projetos CCUS/BECCS",
          "en": "Economic viability and carbon-market modeling for CCUS/BECCS"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "pedro-jacobi",
    "name": "Pedro Roberto Jacobi",
    "role": "pi",
    "institution": "USP",
    "unit": "IEE-USP / PROCAM",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5,
      7
    ],
    "photoUrl": "./photos/pedro-jacobi.jpg",
    "bio": {
      "pt": "PI do Eixo 9 (IEE-USP). Governança ambiental e hídrica, justiça climática, participação social e adaptação urbana.",
      "en": "Axis 9 PI (IEE-USP). Environmental and water governance, climate justice, social participation, and urban adaptation."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Ambiental",
      "Justiça Climática",
      "Pesquisa-Ação"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp",
      "cantareira-pcj",
      "vale-ribeira"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-jacobi-1",
        "domain": "social_governance",
        "label": {
          "pt": "Articulação com prefeituras, comitês de bacia e comunidades vulneráveis",
          "en": "Engagement with municipalities, watershed committees, and communities"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jacobi-1",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas acessíveis de risco de inundação e deslizamento para oficinas locais",
          "en": "Accessible flood and landslide hazard maps for participatory workshops"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "eduardo-haddad",
    "name": "Eduardo Amaral Haddad",
    "role": "pi",
    "institution": "USP",
    "unit": "FEA-USP / NEREUS",
    "city": "São Paulo, SP",
    "primaryAxis": 10,
    "secondaryAxes": [
      2,
      4,
      11
    ],
    "photoUrl": "./photos/eduardo-haddad.jpg",
    "bio": {
      "pt": "PI do Eixo 10 (FEA-USP). Modelos de equilíbrio geral computável (CGE), insumo-produto e custos econômicos de desastres.",
      "en": "Axis 10 PI (FEA-USP). Computable general equilibrium (CGE), input-output modeling, and economic disaster costs."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelos CGE",
      "Insumo-Produto (IIOA)",
      "Economia Regional"
    ],
    "regions": [
      "taquari-rs",
      "rmsp",
      "cerrado-sp-co",
      "sul-amazonia"
    ],
    "hazards": [
      "floods",
      "compound-drought",
      "crop-shock",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-haddad-1",
        "domain": "economic_modeling",
        "label": {
          "pt": "Simulação de perdas de PIB e emprego por desastres e choques climáticos",
          "en": "GDP and employment loss modeling for climate shocks and disasters"
        }
      }
    ],
    "needs": [
      {
        "id": "need-haddad-1",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Mapas físicos de manchas de inundação e quebra agrícola municipal",
          "en": "Physical flood footprints and municipal crop-loss inputs"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "carlos-nobre",
    "name": "Carlos Afonso Nobre",
    "role": "pi",
    "institution": "USP",
    "unit": "IEA-USP / Amazônia 4.0",
    "city": "São Paulo, SP",
    "primaryAxis": 11,
    "secondaryAxes": [
      1,
      10
    ],
    "photoUrl": "./photos/carlos-nobre.jpg",
    "bio": {
      "pt": "PI do Eixo 11 (IEA-USP). Pontos de não retorno da Amazônia (tipping points) e bioeconomia de floresta em pé (Amazônia 4.0).",
      "en": "Axis 11 PI (IEA-USP). Amazon tipping points and standing-forest bioeconomy (Amazonia 4.0)."
    },
    "bvFapespUrl": "https://bv.fapesp.br/",
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Tipping Points",
      "Amazônia 4.0",
      "Bioeconomia"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-nobre-1",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Laboratórios Criativos Amazônia 4.0 e limiares climáticos da floresta",
          "en": "Amazonia 4.0 Creative Labs and forest tipping thresholds"
        }
      }
    ],
    "needs": [
      {
        "id": "need-nobre-1",
        "domain": "economic_modeling",
        "label": {
          "pt": "Valoração econômica de cadeias da sociobiodiversidade amazônica",
          "en": "Economic valuation of Amazon sociobiodiversity value chains"
        }
      }
    ],
    "availability": [
      "coauthor",
      "policy_brief"
    ],
    "publications": []
  },
  {
    "id": "alexander-m-piotrovski",
    "name": "Alexander M. Piotrovski",
    "role": "associate",
    "institution": "Rede CLIMARES",
    "unit": "Paleoclima & Oceanografia",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Paleoclima & Oceanografia). Especialista em paleoceanografia, isótopos.",
      "en": "Axis 1 Associate Researcher (Paleoclima & Oceanografia). Specialist in Paleoceanografia, Isótopos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoceanografia",
      "Isótopos"
    ],
    "regions": [
      "xingu",
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-alexander-m-piotrovski",
        "domain": "climate_projections",
        "label": {
          "pt": "Registros paleoceanográficos do Atlântico",
          "en": "Registros paleoceanográficos do Atlântico"
        }
      }
    ],
    "needs": [
      {
        "id": "need-alexander-m-piotrovski",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries continentais de paleoclima",
          "en": "Séries continentais de paleoclima"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "aline-govin",
    "name": "Aline Govin",
    "role": "associate",
    "institution": "LSCE / Colaboradora",
    "unit": "Paleoclima",
    "city": "Paris / São Paulo",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Paleoclima). Especialista em paleoclima, sedimentos marinhos.",
      "en": "Axis 1 Associate Researcher (Paleoclima). Specialist in Paleoclima, Sedimentos Marinhos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoclima",
      "Sedimentos Marinhos"
    ],
    "regions": [
      "xingu",
      "semiarido"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-aline-govin",
        "domain": "climate_projections",
        "label": {
          "pt": "Reconstruções de monção sul-americana",
          "en": "Reconstruções de monção sul-americana"
        }
      }
    ],
    "needs": [
      {
        "id": "need-aline-govin",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações paleoclimáticas acopladas",
          "en": "Simulações paleoclimáticas acopladas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ana-luiza-spadano-albuquerque",
    "name": "Ana Luiza Spadano Albuquerque",
    "role": "associate",
    "institution": "UFF",
    "unit": "Geociências UFF",
    "city": "Niterói, RJ",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Geociências UFF). Especialista em paleoclima, geoquímica.",
      "en": "Axis 1 Associate Researcher (Geociências UFF). Specialist in Paleoclima, Geoquímica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoclima",
      "Geoquímica"
    ],
    "regions": [
      "litoral-norte-sp",
      "xingu"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-ana-luiza-spadano-albuquerque",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries paleoclimáticas quaternárias do Brasil",
          "en": "Séries paleoclimáticas quaternárias do Brasil"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ana-luiza-spadano-albuquerque",
        "domain": "climate_projections",
        "label": {
          "pt": "Integração com modelos climáticos",
          "en": "Integração com modelos climáticos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "andre-bahr",
    "name": "André Bahr",
    "role": "associate",
    "institution": "Univ. Heidelberg / Colab.",
    "unit": "Geociências",
    "city": "Heidelberg / SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Geociências). Especialista em paleoceanografia, foraminíferos.",
      "en": "Axis 1 Associate Researcher (Geociências). Specialist in Paleoceanografia, Foraminíferos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoceanografia",
      "Foraminíferos"
    ],
    "regions": [
      "semiarido",
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-andre-bahr",
        "domain": "climate_projections",
        "label": {
          "pt": "Variabilidade milenar do Atlântico Sul",
          "en": "Variabilidade milenar do Atlântico Sul"
        }
      }
    ],
    "needs": [
      {
        "id": "need-andre-bahr",
        "domain": "climate_projections",
        "label": {
          "pt": "Proxies continentais brasileiros",
          "en": "Proxies continentais brasileiros"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "christopher-brierley",
    "name": "Christopher Brierley",
    "role": "associate",
    "institution": "UCL / Colaborador",
    "unit": "University College London",
    "city": "Londres / SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (University College London). Especialista em pmip / cmip, modelagem global.",
      "en": "Axis 1 Associate Researcher (University College London). Specialist in PMIP / CMIP, Modelagem Global."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "PMIP / CMIP",
      "Modelagem Global"
    ],
    "regions": [
      "xingu",
      "semiarido"
    ],
    "hazards": [
      "compound-drought",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-christopher-brierley",
        "domain": "climate_projections",
        "label": {
          "pt": "Ensembles PMIP/CMIP de clima passado e futuro",
          "en": "Ensembles PMIP/CMIP de clima passado e futuro"
        }
      }
    ],
    "needs": [
      {
        "id": "need-christopher-brierley",
        "domain": "climate_projections",
        "label": {
          "pt": "Dados observacionais da América do Sul",
          "en": "Dados observacionais da América do Sul"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "cristiano-prestrelo-de-oliveira",
    "name": "Cristiano Prestrelo de Oliveira",
    "role": "associate",
    "institution": "UFRN",
    "unit": "Ciências Climáticas UFRN",
    "city": "Natal, RN",
    "primaryAxis": 1,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Ciências Climáticas UFRN). Especialista em climatologia sinótica, extremos ne.",
      "en": "Axis 1 Associate Researcher (Ciências Climáticas UFRN). Specialist in Climatologia Sinótica, Extremos NE."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Climatologia Sinótica",
      "Extremos NE"
    ],
    "regions": [
      "semiarido",
      "sul-amazonia"
    ],
    "hazards": [
      "compound-drought",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-cristiano-prestrelo-de-oliveira",
        "domain": "climate_projections",
        "label": {
          "pt": "Climatologia de secas e extremos no Semiárido",
          "en": "Climatologia de secas e extremos no Semiárido"
        }
      }
    ],
    "needs": [
      {
        "id": "need-cristiano-prestrelo-de-oliveira",
        "domain": "agro_food",
        "label": {
          "pt": "Impactos agrícolas e hídricos no Nordeste",
          "en": "Impactos agrícolas e hídricos no Nordeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "enno-schefuss",
    "name": "Enno Schefuss",
    "role": "associate",
    "institution": "MARUM / Colaborador",
    "unit": "MARUM Bremen",
    "city": "Bremen / SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (MARUM Bremen). Especialista em biomarcadores, paleohidrologia.",
      "en": "Axis 1 Associate Researcher (MARUM Bremen). Specialist in Biomarcadores, Paleohidrologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Biomarcadores",
      "Paleohidrologia"
    ],
    "regions": [
      "xingu",
      "semiarido"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-enno-schefuss",
        "domain": "climate_projections",
        "label": {
          "pt": "Reconstrução isotópica de paleoprecipitação",
          "en": "Reconstrução isotópica de paleoprecipitação"
        }
      }
    ],
    "needs": [
      {
        "id": "need-enno-schefuss",
        "domain": "hydrology_water",
        "label": {
          "pt": "Séries fluviais amazônicas",
          "en": "Séries fluviais amazônicas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "felipe-antonio-de-lima-toledo",
    "name": "Felipe Antonio de Lima Toledo",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em oceanografia geológica, paleoceanografia.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Oceanografia Geológica, Paleoceanografia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceanografia Geológica",
      "Paleoceanografia"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-felipe-antonio-de-lima-toledo",
        "domain": "climate_projections",
        "label": {
          "pt": "Registros marinhos da margem continental sudeste",
          "en": "Registros marinhos da margem continental sudeste"
        }
      }
    ],
    "needs": [
      {
        "id": "need-felipe-antonio-de-lima-toledo",
        "domain": "climate_projections",
        "label": {
          "pt": "Modelagem costeira do Atlântico Sul",
          "en": "Modelagem costeira do Atlântico Sul"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "francesco-s-r-pausata",
    "name": "Francesco S. R. Pausata",
    "role": "associate",
    "institution": "UQAM / Colaborador",
    "unit": "Ciências da Terra UQAM",
    "city": "Montreal / SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Ciências da Terra UQAM). Especialista em modelagem climática, monções.",
      "en": "Axis 1 Associate Researcher (Ciências da Terra UQAM). Specialist in Modelagem Climática, Monções."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelagem Climática",
      "Monções"
    ],
    "regions": [
      "xingu",
      "semiarido"
    ],
    "hazards": [
      "compound-drought",
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-francesco-s-r-pausata",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações de sensibilidade da monção sul-americana",
          "en": "Simulações de sensibilidade da monção sul-americana"
        }
      }
    ],
    "needs": [
      {
        "id": "need-francesco-s-r-pausata",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Forçantes de uso da terra na Amazônia",
          "en": "Forçantes de uso da terra na Amazônia"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "igor-martins-venancio-padilha-de-oliveira",
    "name": "Igor Martins Venancio Padilha de Oliveira",
    "role": "associate",
    "institution": "UFF",
    "unit": "Geociências UFF",
    "city": "Niterói, RJ",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Geociências UFF). Especialista em paleoceanografia, micropaleontologia.",
      "en": "Axis 1 Associate Researcher (Geociências UFF). Specialist in Paleoceanografia, Micropaleontologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoceanografia",
      "Micropaleontologia"
    ],
    "regions": [
      "semiarido",
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-igor-martins-venancio-padilha-de-oliveira",
        "domain": "climate_projections",
        "label": {
          "pt": "Reconstruções do Atlântico Equatorial e Sul",
          "en": "Reconstruções do Atlântico Equatorial e Sul"
        }
      }
    ],
    "needs": [
      {
        "id": "need-igor-martins-venancio-padilha-de-oliveira",
        "domain": "climate_projections",
        "label": {
          "pt": "Comparação proxy-modelo CMIP",
          "en": "Comparação proxy-modelo CMIP"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "karen-badaraco-costa",
    "name": "Karen Badaraco Costa",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em paleoceanografia, margem sul-sudeste.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Paleoceanografia, Margem Sul-Sudeste."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoceanografia",
      "Margem Sul-Sudeste"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-karen-badaraco-costa",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries de paleotemperatura da Corrente do Brasil",
          "en": "Séries de paleotemperatura da Corrente do Brasil"
        }
      }
    ],
    "needs": [
      {
        "id": "need-karen-badaraco-costa",
        "domain": "climate_projections",
        "label": {
          "pt": "Dinâmica costeira do Atlântico Sul",
          "en": "Dinâmica costeira do Atlântico Sul"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luiz-felippe-gozzo",
    "name": "Luiz Felippe Gozzo",
    "role": "associate",
    "institution": "UNESP",
    "unit": "FCT-UNESP / IPMet",
    "city": "Bauru, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (FCT-UNESP / IPMet). Especialista em modelagem atmosférica, ciclones.",
      "en": "Axis 1 Associate Researcher (FCT-UNESP / IPMet). Specialist in Modelagem Atmosférica, Ciclones."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelagem Atmosférica",
      "Ciclones",
      "WRF"
    ],
    "regions": [
      "cerrado-sp-co",
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-luiz-felippe-gozzo",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações WRF de tempestades severas e ciclones em SP",
          "en": "Simulações WRF de tempestades severas e ciclones em SP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luiz-felippe-gozzo",
        "domain": "energy_grid",
        "label": {
          "pt": "Impactos de granizo e vento em safras e rede elétrica",
          "en": "Impactos de granizo e vento em safras e rede elétrica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcia-caruso-bicego",
    "name": "Márcia Caruso Bícego",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em química marinha, biomarcadores.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Química Marinha, Biomarcadores."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Química Marinha",
      "Biomarcadores"
    ],
    "regions": [
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-marcia-caruso-bicego",
        "domain": "climate_projections",
        "label": {
          "pt": "Geoquímica orgânica marinha e marcadores paleoclimáticos",
          "en": "Geoquímica orgânica marinha e marcadores paleoclimáticos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcia-caruso-bicego",
        "domain": "social_governance",
        "label": {
          "pt": "Poluição costeira e eventos extremos no Litoral Norte",
          "en": "Poluição costeira e eventos extremos no Litoral Norte"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-laura-bettolli",
    "name": "Maria Laura Bettolli",
    "role": "associate",
    "institution": "UBA / Colaboradora",
    "unit": "DCAO-UBA / CORDEX",
    "city": "Buenos Aires / SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (DCAO-UBA / CORDEX). Especialista em downscaling estatístico, cordex.",
      "en": "Axis 1 Associate Researcher (DCAO-UBA / CORDEX). Specialist in Downscaling Estatístico, CORDEX."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Downscaling Estatístico",
      "CORDEX"
    ],
    "regions": [
      "taquari-rs",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-maria-laura-bettolli",
        "domain": "climate_projections",
        "label": {
          "pt": "Downscaling estatístico e dinâmico na Bacia do Prata",
          "en": "Downscaling estatístico e dinâmico na Bacia do Prata"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-laura-bettolli",
        "domain": "hydrology_water",
        "label": {
          "pt": "Validação hidrológica de extremos no Sul/Sudeste",
          "en": "Validação hidrológica de extremos no Sul/Sudeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marilia-de-carvalho-campos-garcia",
    "name": "Marília de Carvalho Campos Garcia",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em oceanografia, paleoclima.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Oceanografia, Paleoclima."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceanografia",
      "Paleoclima"
    ],
    "regions": [
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-marilia-de-carvalho-campos-garcia",
        "domain": "climate_projections",
        "label": {
          "pt": "Análises laboratoriais paleoceanográficas",
          "en": "Análises laboratoriais paleoceanográficas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marilia-de-carvalho-campos-garcia",
        "domain": "climate_projections",
        "label": {
          "pt": "Integração de testemunhos marinhos",
          "en": "Integração de testemunhos marinhos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "michelle-simoes-reboita",
    "name": "Michelle Simões Reboita",
    "role": "associate",
    "institution": "UNIFEI",
    "unit": "IRN-UNIFEI",
    "city": "Itajubá, MG",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      3,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IRN-UNIFEI). Especialista em regcm, ciclones.",
      "en": "Axis 1 Associate Researcher (IRN-UNIFEI). Specialist in RegCM, Ciclones."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "RegCM",
      "Ciclones",
      "Sistemas Sinóticos"
    ],
    "regions": [
      "cantareira-pcj",
      "paraiba-sul",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "compound-drought",
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-michelle-simoes-reboita",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções RegCM de frentes, ciclones e secas no Sudeste",
          "en": "Projeções RegCM de frentes, ciclones e secas no Sudeste"
        }
      }
    ],
    "needs": [
      {
        "id": "need-michelle-simoes-reboita",
        "domain": "hydrology_water",
        "label": {
          "pt": "Acoplamento clima-hidrologia na Mantiqueira e Cantareira",
          "en": "Acoplamento clima-hidrologia na Mantiqueira e Cantareira"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "myriam-khodri",
    "name": "Myriam Khodri",
    "role": "associate",
    "institution": "IRD / LOCEAN",
    "unit": "LOCEAN-IPSL",
    "city": "Paris / SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (LOCEAN-IPSL). Especialista em ipsl-cm, teleconexões.",
      "en": "Axis 1 Associate Researcher (LOCEAN-IPSL). Specialist in IPSL-CM, Teleconexões."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "IPSL-CM",
      "Teleconexões"
    ],
    "regions": [
      "xingu",
      "semiarido"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-myriam-khodri",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações acopladas IPSL do Atlântico e Pacífico",
          "en": "Simulações acopladas IPSL do Atlântico e Pacífico"
        }
      }
    ],
    "needs": [
      {
        "id": "need-myriam-khodri",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Impactos de El Niño na Amazônia e Nordeste",
          "en": "Impactos de El Niño na Amazônia e Nordeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "renata-hanae-nagai",
    "name": "Renata Hanae Nagai",
    "role": "associate",
    "institution": "UFPR",
    "unit": "CEM-UFPR",
    "city": "Pontal do Paraná, PR",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (CEM-UFPR). Especialista em oceanografia geológica, plataforma sul.",
      "en": "Axis 1 Associate Researcher (CEM-UFPR). Specialist in Oceanografia Geológica, Plataforma Sul."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceanografia Geológica",
      "Plataforma Sul"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-renata-hanae-nagai",
        "domain": "climate_projections",
        "label": {
          "pt": "Histórico ambiental da plataforma continental sul-sudeste",
          "en": "Histórico ambiental da plataforma continental sul-sudeste"
        }
      }
    ],
    "needs": [
      {
        "id": "need-renata-hanae-nagai",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Vulnerabilidade costeira no Sul e Sudeste",
          "en": "Vulnerabilidade costeira no Sul e Sudeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "simone-erotildes-teleginski-ferraz",
    "name": "Simone Erotildes Teleginski Ferraz",
    "role": "associate",
    "institution": "UFSM",
    "unit": "Física / Meteorologia UFSM",
    "city": "Santa Maria, RS",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Física / Meteorologia UFSM). Especialista em variabilidade climática, extremos no rs.",
      "en": "Axis 1 Associate Researcher (Física / Meteorologia UFSM). Specialist in Variabilidade Climática, Extremos no RS."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Variabilidade Climática",
      "Extremos no RS"
    ],
    "regions": [
      "taquari-rs"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-simone-erotildes-teleginski-ferraz",
        "domain": "climate_projections",
        "label": {
          "pt": "Diagnóstico e projeções de chuvas extremas no Rio Grande do Sul",
          "en": "Diagnóstico e projeções de chuvas extremas no Rio Grande do Sul"
        }
      }
    ],
    "needs": [
      {
        "id": "need-simone-erotildes-teleginski-ferraz",
        "domain": "economic_modeling",
        "label": {
          "pt": "Impactos hidrológicos e socioeconômicos das enchentes no RS",
          "en": "Impactos hidrológicos e socioeconômicos das enchentes no RS"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "stefan-mulitza",
    "name": "Stefan Mulitza",
    "role": "associate",
    "institution": "MARUM / Colaborador",
    "unit": "MARUM Bremen",
    "city": "Bremen / SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (MARUM Bremen). Especialista em paleoceanografia, modelagem proxy.",
      "en": "Axis 1 Associate Researcher (MARUM Bremen). Specialist in Paleoceanografia, Modelagem Proxy."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoceanografia",
      "Modelagem Proxy"
    ],
    "regions": [
      "semiarido",
      "xingu"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-stefan-mulitza",
        "domain": "climate_projections",
        "label": {
          "pt": "Sínteses paleoclimáticas do Atlântico Tropical",
          "en": "Sínteses paleoclimáticas do Atlântico Tropical"
        }
      }
    ],
    "needs": [
      {
        "id": "need-stefan-mulitza",
        "domain": "climate_projections",
        "label": {
          "pt": "Calibração de proxies na margem brasileira",
          "en": "Calibração de proxies na margem brasileira"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "thiago-pereira-dos-santos",
    "name": "Thiago Pereira dos Santos",
    "role": "associate",
    "institution": "UFF",
    "unit": "Geociências UFF",
    "city": "Niterói, RJ",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (Geociências UFF). Especialista em paleoclima, foraminíferos.",
      "en": "Axis 1 Associate Researcher (Geociências UFF). Specialist in Paleoclima, Foraminíferos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoclima",
      "Foraminíferos"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-thiago-pereira-dos-santos",
        "domain": "climate_projections",
        "label": {
          "pt": "Paleoclima marinho do Atlântico Sul ocidental",
          "en": "Paleoclima marinho do Atlântico Sul ocidental"
        }
      }
    ],
    "needs": [
      {
        "id": "need-thiago-pereira-dos-santos",
        "domain": "climate_projections",
        "label": {
          "pt": "Conexão continente-oceano no Sudeste",
          "en": "Conexão continente-oceano no Sudeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "valdir-felipe-novello",
    "name": "Valdir Felipe Novello",
    "role": "associate",
    "institution": "USP / Univ. Tübingen",
    "unit": "IGc-USP / Geociências",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IGc-USP / Geociências). Especialista em espeleotemas, isótopos estáveis.",
      "en": "Axis 1 Associate Researcher (IGc-USP / Geociências). Specialist in Espeleotemas, Isótopos Estáveis."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Espeleotemas",
      "Isótopos Estáveis"
    ],
    "regions": [
      "cerrado-sp-co",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-valdir-felipe-novello",
        "domain": "climate_projections",
        "label": {
          "pt": "Reconstrução de secas multidecadais no Brasil Central e Sudeste via espeleotemas",
          "en": "Reconstrução de secas multidecadais no Brasil Central e Sudeste via espeleotemas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-valdir-felipe-novello",
        "domain": "hydrology_water",
        "label": {
          "pt": "Recarga de aquíferos e hidrologia cárstica",
          "en": "Recarga de aquíferos e hidrologia cárstica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "vinicius-ribau-mendes",
    "name": "Vinícius Ribau Mendes",
    "role": "associate",
    "institution": "UNIFESP",
    "unit": "IMar-UNIFESP",
    "city": "Santos, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IMar-UNIFESP). Especialista em geomorfologia costeira, luminescência osl.",
      "en": "Axis 1 Associate Researcher (IMar-UNIFESP). Specialist in Geomorfologia Costeira, Luminescência OSL."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geomorfologia Costeira",
      "Luminescência OSL"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-vinicius-ribau-mendes",
        "domain": "climate_projections",
        "label": {
          "pt": "Evolução costeira, nível do mar e eventos extremos na Baixada Santista e Litoral",
          "en": "Evolução costeira, nível do mar e eventos extremos na Baixada Santista e Litoral"
        }
      }
    ],
    "needs": [
      {
        "id": "need-vinicius-ribau-mendes",
        "domain": "social_governance",
        "label": {
          "pt": "Planejamento costeiro e risco em municípios litorâneos",
          "en": "Planejamento costeiro e risco em municípios litorâneos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-elisa-siqueira-silva",
    "name": "Maria Elisa Siqueira Silva",
    "role": "associate",
    "institution": "USP",
    "unit": "FFLCH-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      6,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (FFLCH-USP). Especialista em climatologia geográfica, clima urbano.",
      "en": "Axis 1 Associate Researcher (FFLCH-USP). Specialist in Climatologia Geográfica, Clima Urbano."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Climatologia Geográfica",
      "Clima Urbano"
    ],
    "regions": [
      "rmsp",
      "cerrado-sp-co"
    ],
    "hazards": [
      "heatwaves",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-maria-elisa-siqueira-silva",
        "domain": "climate_projections",
        "label": {
          "pt": "Climatologia urbana e variabilidade regional de temperatura em SP",
          "en": "Climatologia urbana e variabilidade regional de temperatura em SP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-elisa-siqueira-silva",
        "domain": "health_epi",
        "label": {
          "pt": "Conforto térmico e saúde urbana na Grande SP",
          "en": "Conforto térmico e saúde urbana na Grande SP"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-cleofe-valverde-brambila",
    "name": "María Cleofé Valverde Brambila",
    "role": "associate",
    "institution": "UFABC",
    "unit": "CECS-UFABC",
    "city": "Santo André, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      6,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (CECS-UFABC). Especialista em clima urbano abc, extremos de chuva.",
      "en": "Axis 1 Associate Researcher (CECS-UFABC). Specialist in Clima Urbano ABC, Extremos de Chuva."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Clima Urbano ABC",
      "Extremos de Chuva",
      "Poluição"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-maria-cleofe-valverde-brambila",
        "domain": "climate_projections",
        "label": {
          "pt": "Série climática e projeções de extremos no ABC Paulista e RMSP",
          "en": "Série climática e projeções de extremos no ABC Paulista e RMSP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-cleofe-valverde-brambila",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Defesa Civil e saúde ambiental na metrópole",
          "en": "Defesa Civil e saúde ambiental na metrópole"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "fernando-ramos-martins",
    "name": "Fernando Ramos Martins",
    "role": "associate",
    "institution": "UNIFESP",
    "unit": "IMar-UNIFESP",
    "city": "Santos, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      3
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IMar-UNIFESP). Especialista em radiação solar, energia renovável.",
      "en": "Axis 1 Associate Researcher (IMar-UNIFESP). Specialist in Radiação Solar, Energia Renovável."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Radiação Solar",
      "Energia Renovável"
    ],
    "regions": [
      "litoral-norte-sp",
      "semiarido",
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-fernando-ramos-martins",
        "domain": "climate_projections",
        "label": {
          "pt": "Atlas e séries de irradiação solar e nebulosidade no Brasil",
          "en": "Atlas e séries de irradiação solar e nebulosidade no Brasil"
        }
      }
    ],
    "needs": [
      {
        "id": "need-fernando-ramos-martins",
        "domain": "energy_grid",
        "label": {
          "pt": "Integração com geração solar fotovoltaica no Eixo 3",
          "en": "Integração com geração solar fotovoltaica no Eixo 3"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "francisco-das-chagas-vasconcelos-junior",
    "name": "Francisco das Chagas Vasconcelos Júnior",
    "role": "associate",
    "institution": "FUNCEME",
    "unit": "FUNCEME",
    "city": "Fortaleza, CE",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      4,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (FUNCEME). Especialista em previsão sazonal, secas no semiárido.",
      "en": "Axis 1 Associate Researcher (FUNCEME). Specialist in Previsão Sazonal, Secas no Semiárido."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Previsão Sazonal",
      "Secas no Semiárido"
    ],
    "regions": [
      "semiarido",
      "xingu"
    ],
    "hazards": [
      "compound-drought",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-francisco-das-chagas-vasconcelos-junior",
        "domain": "climate_projections",
        "label": {
          "pt": "Monitoramento e previsão sazonal hidroclimática para o Semiárido",
          "en": "Monitoramento e previsão sazonal hidroclimática para o Semiárido"
        }
      }
    ],
    "needs": [
      {
        "id": "need-francisco-das-chagas-vasconcelos-junior",
        "domain": "agro_food",
        "label": {
          "pt": "Impactos na agricultura familiar e reservatórios do Nordeste",
          "en": "Impactos na agricultura familiar e reservatórios do Nordeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "bruna-borba-dias",
    "name": "Bruna Borba Dias",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em oceanografia, paleoclima.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Oceanografia, Paleoclima."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceanografia",
      "Paleoclima"
    ],
    "regions": [
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-bruna-borba-dias",
        "domain": "climate_projections",
        "label": {
          "pt": "Registros paleoceanográficos e carbono marinho",
          "en": "Registros paleoceanográficos e carbono marinho"
        }
      }
    ],
    "needs": [
      {
        "id": "need-bruna-borba-dias",
        "domain": "climate_projections",
        "label": {
          "pt": "Modelagem biogeoquímica",
          "en": "Modelagem biogeoquímica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "haline-de-vasconcellos-rocha",
    "name": "Haline de Vasconcellos Rocha",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em oceanografia física, atlântico sul.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Oceanografia Física, Atlântico Sul."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Oceanografia Física",
      "Atlântico Sul"
    ],
    "regions": [
      "litoral-norte-sp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-haline-de-vasconcellos-rocha",
        "domain": "climate_projections",
        "label": {
          "pt": "Circulação oceânica do Atlântico Sul",
          "en": "Circulação oceânica do Atlântico Sul"
        }
      }
    ],
    "needs": [
      {
        "id": "need-haline-de-vasconcellos-rocha",
        "domain": "climate_projections",
        "label": {
          "pt": "Acoplamento oceano-atmosfera",
          "en": "Acoplamento oceano-atmosfera"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leticia-maria-cavole",
    "name": "Leticia Maria Cavole",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em ecologia marinha, impactos climáticos.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Ecologia Marinha, Impactos Climáticos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Ecologia Marinha",
      "Impactos Climáticos"
    ],
    "regions": [
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-leticia-maria-cavole",
        "domain": "climate_projections",
        "label": {
          "pt": "Impactos do aquecimento oceânico em ecossistemas marinhos",
          "en": "Impactos do aquecimento oceânico em ecossistemas marinhos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leticia-maria-cavole",
        "domain": "agro_food",
        "label": {
          "pt": "Segurança alimentar pesqueira costeira",
          "en": "Segurança alimentar pesqueira costeira"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-de-los-angeles-gasalla",
    "name": "Maria de los Angeles Gasalla",
    "role": "associate",
    "institution": "USP",
    "unit": "IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      4,
      9,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IO-USP). Especialista em ecossistemas pesqueiros, segurança alimentar marinha.",
      "en": "Axis 1 Associate Researcher (IO-USP). Specialist in Ecossistemas Pesqueiros, Segurança Alimentar Marinha."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Ecossistemas Pesqueiros",
      "Segurança Alimentar Marinha"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "heatwaves",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-maria-de-los-angeles-gasalla",
        "domain": "agro_food",
        "label": {
          "pt": "Impactos das mudanças climáticas na pesca e comunidades costeiras",
          "en": "Impactos das mudanças climáticas na pesca e comunidades costeiras"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-de-los-angeles-gasalla",
        "domain": "social_governance",
        "label": {
          "pt": "Valoração econômica e governança costeira",
          "en": "Valoração econômica e governança costeira"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "thomas-kenji-akabane",
    "name": "Thomas Kenji Akabane",
    "role": "associate",
    "institution": "USP",
    "unit": "IGc / IO-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IGc / IO-USP). Especialista em paleoclima, palinologia.",
      "en": "Axis 1 Associate Researcher (IGc / IO-USP). Specialist in Paleoclima, Palinologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Paleoclima",
      "Palinologia"
    ],
    "regions": [
      "xingu",
      "cerrado-sp-co"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-thomas-kenji-akabane",
        "domain": "climate_projections",
        "label": {
          "pt": "Reconstrução paleoambiental e vegetacional",
          "en": "Reconstrução paleoambiental e vegetacional"
        }
      }
    ],
    "needs": [
      {
        "id": "need-thomas-kenji-akabane",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Dinâmica floresta-savana",
          "en": "Dinâmica floresta-savana"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "amanda-rehbein",
    "name": "Amanda Rehbein",
    "role": "postdoc",
    "institution": "USP",
    "unit": "IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IAG-USP). Especialista em sistemas convectivos (scm), amazônia.",
      "en": "Axis 1 Associate Researcher (IAG-USP). Specialist in Sistemas Convectivos (SCM), Amazônia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sistemas Convectivos (SCM)",
      "Amazônia",
      "WRF"
    ],
    "regions": [
      "xingu",
      "sul-amazonia",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-amanda-rehbein",
        "domain": "climate_projections",
        "label": {
          "pt": "Climatologia e modelagem de sistemas convectivos de mesoescala na Amazônia e Sudeste",
          "en": "Climatologia e modelagem de sistemas convectivos de mesoescala na Amazônia e Sudeste"
        }
      }
    ],
    "needs": [
      {
        "id": "need-amanda-rehbein",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Impactos de tempestades severas em bacias e cidades",
          "en": "Impactos de tempestades severas em bacias e cidades"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ana-maria-pereira-nunes",
    "name": "Ana Maria Pereira Nunes",
    "role": "postdoc",
    "institution": "USP",
    "unit": "IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 1 (IAG-USP). Especialista em modelagem atmosférica, assimilação de dados.",
      "en": "Axis 1 Associate Researcher (IAG-USP). Specialist in Modelagem Atmosférica, Assimilação de Dados."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelagem Atmosférica",
      "Assimilação de Dados"
    ],
    "regions": [
      "rmsp",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-ana-maria-pereira-nunes",
        "domain": "climate_projections",
        "label": {
          "pt": "Modelagem numérica de eventos de precipitação intensa",
          "en": "Modelagem numérica de eventos de precipitação intensa"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ana-maria-pereira-nunes",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Previsão hidrometeorológica de curto prazo",
          "en": "Previsão hidrometeorológica de curto prazo"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ana-paula-martins-do-amaral-cunha",
    "name": "Ana Paula Martins do Amaral Cunha",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      4,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em monitoramento de secas, índices vhi/spi.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Monitoramento de Secas, Índices VHI/SPI."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Monitoramento de Secas",
      "Índices VHI/SPI",
      "Sensoriamento"
    ],
    "regions": [
      "semiarido",
      "cerrado-sp-co",
      "sul-amazonia"
    ],
    "hazards": [
      "compound-drought",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-ana-paula-martins-do-amaral-cunha",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Mapas nacionais de intensidade de seca integrada (IIS) e impacto agropecuário",
          "en": "Mapas nacionais de intensidade de seca integrada (IIS) e impacto agropecuário"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ana-paula-martins-do-amaral-cunha",
        "domain": "economic_modeling",
        "label": {
          "pt": "Modelagem econômica de perdas por seca",
          "en": "Modelagem econômica de perdas por seca"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "daniela-carneiro-rodrigues-porto-pontes",
    "name": "Daniela Carneiro Rodrigues Porto Pontes",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em gestão de risco, defesa civil.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Gestão de Risco, Defesa Civil."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Gestão de Risco",
      "Defesa Civil"
    ],
    "regions": [
      "litoral-norte-sp",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-daniela-carneiro-rodrigues-porto-pontes",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Protocolos operacionais de monitoramento de risco geo-hidrológico",
          "en": "Protocolos operacionais de monitoramento de risco geo-hidrológico"
        }
      }
    ],
    "needs": [
      {
        "id": "need-daniela-carneiro-rodrigues-porto-pontes",
        "domain": "social_governance",
        "label": {
          "pt": "Governança municipal de redução de desastres",
          "en": "Governança municipal de redução de desastres"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "debora-olivato",
    "name": "Débora Olivato",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      7,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em educação em risco, cemaden educação.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Educação em Risco, Cemaden Educação."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educação em Risco",
      "Cemaden Educação",
      "Ciência Cidadã"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-debora-olivato",
        "domain": "education_comm",
        "label": {
          "pt": "Rede de escolas e ciência cidadã para percepção de risco de desastres",
          "en": "Rede de escolas e ciência cidadã para percepção de risco de desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-debora-olivato",
        "domain": "education_comm",
        "label": {
          "pt": "Articulação com o Eixo 7 em escolas públicas",
          "en": "Articulação com o Eixo 7 em escolas públicas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "enner-herenio-de-alcantara",
    "name": "Enner Herenio de Alcântara",
    "role": "associate",
    "institution": "UNESP",
    "unit": "ICT-UNESP",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5,
      6
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (ICT-UNESP). Especialista em sensoriamento remoto, qualidade da água.",
      "en": "Axis 2 Associate Researcher (ICT-UNESP). Specialist in Sensoriamento Remoto, Qualidade da Água."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sensoriamento Remoto",
      "Qualidade da Água",
      "Radar SAR"
    ],
    "regions": [
      "paraiba-sul",
      "litoral-norte-sp",
      "xingu"
    ],
    "hazards": [
      "floods",
      "heatwaves",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-enner-herenio-de-alcantara",
        "domain": "geospatial_code",
        "label": {
          "pt": "Mapeamento por satélite de inundações, temperatura de superfície e corpos hídricos",
          "en": "Mapeamento por satélite de inundações, temperatura de superfície e corpos hídricos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-enner-herenio-de-alcantara",
        "domain": "health_epi",
        "label": {
          "pt": "Cruzamento com surtos sanitários e perdas urbanas",
          "en": "Cruzamento com surtos sanitários e perdas urbanas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "glauston-roberto-teixeira-de-lima",
    "name": "Glauston Roberto Teixeira de Lima",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em hidrometeorologia, radar.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Hidrometeorologia, Radar."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrometeorologia",
      "Radar"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-glauston-roberto-teixeira-de-lima",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Monitoramento hidrometeorológico de bacias críticas",
          "en": "Monitoramento hidrometeorológico de bacias críticas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-glauston-roberto-teixeira-de-lima",
        "domain": "climate_projections",
        "label": {
          "pt": "Previsão por conjunto de curto prazo",
          "en": "Previsão por conjunto de curto prazo"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "javier-tomasella",
    "name": "Javier Tomasella",
    "role": "associate",
    "institution": "INPE / CEMADEN",
    "unit": "INPE",
    "city": "Cachoeira Paulista, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (INPE). Especialista em hidrologia de grande escala, mhd-inpe.",
      "en": "Axis 2 Associate Researcher (INPE). Specialist in Hidrologia de Grande Escala, MHD-INPE."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrologia de Grande Escala",
      "MHD-INPE"
    ],
    "regions": [
      "xingu",
      "sul-amazonia",
      "cantareira-pcj",
      "cerrado-sp-co"
    ],
    "hazards": [
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-javier-tomasella",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrológica distribuída para bacias amazônicas e brasileiras",
          "en": "Modelagem hidrológica distribuída para bacias amazônicas e brasileiras"
        }
      }
    ],
    "needs": [
      {
        "id": "need-javier-tomasella",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções climáticas CMIP7 para bacias hidrográficas",
          "en": "Projeções climáticas CMIP7 para bacias hidrográficas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jorge-luis-gomes",
    "name": "Jorge Luís Gomes",
    "role": "associate",
    "institution": "INPE",
    "unit": "INPE",
    "city": "Cachoeira Paulista, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      1,
      3
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (INPE). Especialista em modelo eta, downscaling dinâmico.",
      "en": "Axis 2 Associate Researcher (INPE). Specialist in Modelo Eta, Downscaling Dinâmico."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelo Eta",
      "Downscaling Dinâmico"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs",
      "semiarido"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-jorge-luis-gomes",
        "domain": "climate_projections",
        "label": {
          "pt": "Rodadas de alta resolução do modelo Eta para extremos",
          "en": "Rodadas de alta resolução do modelo Eta para extremos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jorge-luis-gomes",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Aplicações em risco de desastres e energia",
          "en": "Aplicações em risco de desastres e energia"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leonardo-bacelar-lima-santos",
    "name": "Leonardo Bacelar Lima Santos",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em grafos & mobilidade, redes complexas.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Grafos & Mobilidade, Redes Complexas."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Grafos & Mobilidade",
      "Redes Complexas",
      "Ciência de Dados"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-leonardo-bacelar-lima-santos",
        "domain": "geospatial_code",
        "label": {
          "pt": "Modelagem em grafos de interrupção viária e mobilidade urbana sob inundações",
          "en": "Modelagem em grafos de interrupção viária e mobilidade urbana sob inundações"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leonardo-bacelar-lima-santos",
        "domain": "economic_modeling",
        "label": {
          "pt": "Custos econômicos de paralisação logística em desastres",
          "en": "Custos econômicos de paralisação logística em desastres"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luciana-de-resende-londe",
    "name": "Luciana de Resende Londe",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      6,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em impactos humanos, desabrigados.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Impactos Humanos, Desabrigados."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Impactos Humanos",
      "Desabrigados",
      "Vulnerabilidade"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-luciana-de-resende-londe",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Banco de dados de impactos humanos e populações afetadas por desastres",
          "en": "Banco de dados de impactos humanos e populações afetadas por desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luciana-de-resende-londe",
        "domain": "health_epi",
        "label": {
          "pt": "Saúde coletiva e recuperação pós-desastre",
          "en": "Saúde coletiva e recuperação pós-desastre"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luis-marcelo-de-mattos-zeri",
    "name": "Luis Marcelo de Mattos Zeri",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em agrometeorologia, fluxos de carbono/água.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Agrometeorologia, Fluxos de Carbono/Água."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Agrometeorologia",
      "Fluxos de Carbono/Água"
    ],
    "regions": [
      "semiarido",
      "cerrado-sp-co"
    ],
    "hazards": [
      "compound-drought",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-luis-marcelo-de-mattos-zeri",
        "domain": "agro_food",
        "label": {
          "pt": "Monitoramento agrometeorológico de secas e umidade do solo",
          "en": "Monitoramento agrometeorológico de secas e umidade do solo"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luis-marcelo-de-mattos-zeri",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários climáticos para o Cerrado e Semiárido",
          "en": "Cenários climáticos para o Cerrado e Semiárido"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luz-adriana-cuartas-pineda",
    "name": "Luz Adriana Cuartas Pineda",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em previsão hidrológica, bacias hidrográficas.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Previsão Hidrológica, Bacias Hidrográficas."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Previsão Hidrológica",
      "Bacias Hidrográficas"
    ],
    "regions": [
      "cantareira-pcj",
      "paraiba-sul",
      "taquari-rs"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-luz-adriana-cuartas-pineda",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem e alerta hidrológico operacional de cheias e estiagens",
          "en": "Modelagem e alerta hidrológico operacional de cheias e estiagens"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luz-adriana-cuartas-pineda",
        "domain": "climate_projections",
        "label": {
          "pt": "Acoplamento com projeções climáticas de longo prazo",
          "en": "Acoplamento com projeções climáticas de longo prazo"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcio-augusto-ernesto-de-moraes",
    "name": "Márcio Augusto Ernesto de Moraes",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em sensores geotécnicos, rede observacional.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Sensores Geotécnicos, Rede Observacional."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sensores Geotécnicos",
      "Rede Observacional"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-marcio-augusto-ernesto-de-moraes",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Dados da rede observacional de pluviômetros e sensores geotécnicos CEMADEN",
          "en": "Dados da rede observacional de pluviômetros e sensores geotécnicos CEMADEN"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcio-augusto-ernesto-de-moraes",
        "domain": "geospatial_code",
        "label": {
          "pt": "Integração IoT e ciência de dados",
          "en": "Integração IoT e ciência de dados"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "pedro-ivo-mioni-camarinha",
    "name": "Pedro Ivo Mioni Camarinha",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      9,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em índices de risco climático, adaptação municipal.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Índices de Risco Climático, Adaptação Municipal."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Índices de Risco Climático",
      "Adaptação Municipal"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-pedro-ivo-mioni-camarinha",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Diagnóstico municipal de risco de deslizamentos e inundações sob mudanças climáticas",
          "en": "Diagnóstico municipal de risco de deslizamentos e inundações sob mudanças climáticas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-pedro-ivo-mioni-camarinha",
        "domain": "economic_modeling",
        "label": {
          "pt": "Planos municipais de adaptação e financiamento",
          "en": "Planos municipais de adaptação e financiamento"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "rachel-trajber",
    "name": "Rachel Trajber",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      7,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em educação ambiental, comunicação de risco.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Educação Ambiental, Comunicação de Risco."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educação Ambiental",
      "Comunicação de Risco",
      "Juventudes"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-rachel-trajber",
        "domain": "education_comm",
        "label": {
          "pt": "Metodologias participativas de educação para prevenção de desastres",
          "en": "Metodologias participativas de educação para prevenção de desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-rachel-trajber",
        "domain": "social_governance",
        "label": {
          "pt": "Parcerias com escolas e comunidades vulneráveis (Eixos 7 e 9)",
          "en": "Parcerias com escolas e comunidades vulneráveis (Eixos 7 e 9)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "regina-celia-dos-santos-alvala",
    "name": "Regina Célia dos Santos Alvalá",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em vulnerabilidade socioambiental, gestão de desastres.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Vulnerabilidade Socioambiental, Gestão de Desastres."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Vulnerabilidade Socioambiental",
      "Gestão de Desastres"
    ],
    "regions": [
      "semiarido",
      "litoral-norte-sp",
      "rmsp"
    ],
    "hazards": [
      "compound-drought",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-regina-celia-dos-santos-alvala",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Índices municipais de vulnerabilidade e exposição a desastres naturais",
          "en": "Índices municipais de vulnerabilidade e exposição a desastres naturais"
        }
      }
    ],
    "needs": [
      {
        "id": "need-regina-celia-dos-santos-alvala",
        "domain": "social_governance",
        "label": {
          "pt": "Políticas públicas de resiliência urbana e rural",
          "en": "Políticas públicas de resiliência urbana e rural"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "regla-de-la-caridad-duthit-somoza",
    "name": "Regla de la Caridad Duthit Somoza",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      1
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em meteorologia sinótica, previsão de tempo.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Meteorologia Sinótica, Previsão de Tempo."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Meteorologia Sinótica",
      "Previsão de Tempo"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-regla-de-la-caridad-duthit-somoza",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Análise meteorológica de eventos extremos de chuva",
          "en": "Análise meteorológica de eventos extremos de chuva"
        }
      }
    ],
    "needs": [
      {
        "id": "need-regla-de-la-caridad-duthit-somoza",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações numéricas convectivas",
          "en": "Simulações numéricas convectivas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "rochane-de-oliveira-caram",
    "name": "Rochane de Oliveira Caram",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em hidrologia, modelagem de bacias.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Hidrologia, Modelagem de Bacias."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrologia",
      "Modelagem de Bacias"
    ],
    "regions": [
      "cantareira-pcj",
      "paraiba-sul"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-rochane-de-oliveira-caram",
        "domain": "hydrology_water",
        "label": {
          "pt": "Simulação hidrológica de eventos de enxurrada e inundação",
          "en": "Simulação hidrológica de eventos de enxurrada e inundação"
        }
      }
    ],
    "needs": [
      {
        "id": "need-rochane-de-oliveira-caram",
        "domain": "geospatial_code",
        "label": {
          "pt": "Mapas de uso e cobertura da terra",
          "en": "Mapas de uso e cobertura da terra"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "silvia-midori-saito",
    "name": "Silvia Midori Saito",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em sistemas de alerta, defesa civil.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Sistemas de Alerta, Defesa Civil."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sistemas de Alerta",
      "Defesa Civil"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-silvia-midori-saito",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Avaliação de eficácia de alertas precoces junto a defesas civis e moradores",
          "en": "Avaliação de eficácia de alertas precoces junto a defesas civis e moradores"
        }
      }
    ],
    "needs": [
      {
        "id": "need-silvia-midori-saito",
        "domain": "social_governance",
        "label": {
          "pt": "Pesquisas qualitativas de resposta a alertas",
          "en": "Pesquisas qualitativas de resposta a alertas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "thais-brianezi",
    "name": "Thais Brianezi",
    "role": "associate",
    "institution": "USP",
    "unit": "ECA-USP / Colaboradora",
    "city": "São Paulo, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      7,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (ECA-USP / Colaboradora). Especialista em educomunicação, jornalismo ambiental.",
      "en": "Axis 2 Associate Researcher (ECA-USP / Colaboradora). Specialist in Educomunicação, Jornalismo Ambiental."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educomunicação",
      "Jornalismo Ambiental"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-thais-brianezi",
        "domain": "education_comm",
        "label": {
          "pt": "Educomunicação socioambiental e comunicação pública da emergência climática",
          "en": "Educomunicação socioambiental e comunicação pública da emergência climática"
        }
      }
    ],
    "needs": [
      {
        "id": "need-thais-brianezi",
        "domain": "education_comm",
        "label": {
          "pt": "Narrativas e dados científicos dos eixos para divulgação",
          "en": "Narrativas e dados científicos dos eixos para divulgação"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "victor-marchezini",
    "name": "Victor Marchezini",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      7,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em sociologia dos desastres, alerta centrado nas pessoas.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Sociologia dos Desastres, Alerta Centrado nas Pessoas."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sociologia dos Desastres",
      "Alerta Centrado nas Pessoas"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-victor-marchezini",
        "domain": "social_governance",
        "label": {
          "pt": "Pesquisa sobre recuperação pós-desastre e sistemas de alerta participativos",
          "en": "Pesquisa sobre recuperação pós-desastre e sistemas de alerta participativos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-victor-marchezini",
        "domain": "health_epi",
        "label": {
          "pt": "Integração entre ciências sociais, saúde e hidrologia",
          "en": "Integração entre ciências sociais, saúde e hidrologia"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "alessandra-cristina-corsi",
    "name": "Alessandra Cristina Corsi",
    "role": "associate",
    "institution": "IPT",
    "unit": "IPT-SP",
    "city": "São Paulo, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (IPT-SP). Especialista em geotecnia, cartas de suscetibilidade.",
      "en": "Axis 2 Associate Researcher (IPT-SP). Specialist in Geotecnia, Cartas de Suscetibilidade."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geotecnia",
      "Cartas de Suscetibilidade",
      "Risco Geológico"
    ],
    "regions": [
      "litoral-norte-sp",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-alessandra-cristina-corsi",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Mapeamento geotécnico de áreas de alto risco de escorregamento em SP",
          "en": "Mapeamento geotécnico de áreas de alto risco de escorregamento em SP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-alessandra-cristina-corsi",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções futuras de chuva intensa na Serra do Mar",
          "en": "Projeções futuras de chuva intensa na Serra do Mar"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "claudio-jose-ferreira",
    "name": "Claudio José Ferreira",
    "role": "associate",
    "institution": "IPA / SEMIL-SP",
    "unit": "Instituto de Pesquisas Ambientais",
    "city": "São Paulo, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (Instituto de Pesquisas Ambientais). Especialista em perigos geológicos, geoprocessamento.",
      "en": "Axis 2 Associate Researcher (Instituto de Pesquisas Ambientais). Specialist in Perigos Geológicos, Geoprocessamento."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Perigos Geológicos",
      "Geoprocessamento"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-claudio-jose-ferreira",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Inventário de escorregamentos e processos geodinâmicos no estado de SP",
          "en": "Inventário de escorregamentos e processos geodinâmicos no estado de SP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-claudio-jose-ferreira",
        "domain": "climate_projections",
        "label": {
          "pt": "Modelagem acoplada chuva-encosta",
          "en": "Modelagem acoplada chuva-encosta"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "irineu-de-brito-junior",
    "name": "Irineu de Brito Junior",
    "role": "associate",
    "institution": "UNESP",
    "unit": "ICT-UNESP",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (ICT-UNESP). Especialista em logística humanitária, suprimentos em desastres.",
      "en": "Axis 2 Associate Researcher (ICT-UNESP). Specialist in Logística Humanitária, Suprimentos em Desastres."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Logística Humanitária",
      "Suprimentos em Desastres"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-irineu-de-brito-junior",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Planejamento de logística humanitária e abrigos em grandes desastres",
          "en": "Planejamento de logística humanitária e abrigos em grandes desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-irineu-de-brito-junior",
        "domain": "economic_modeling",
        "label": {
          "pt": "Mapas de risco de interrupção de rodovias",
          "en": "Mapas de risco de interrupção de rodovias"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "rodrigo-augusto-stabile",
    "name": "Rodrigo Augusto Stabile",
    "role": "associate",
    "institution": "CEMADEN",
    "unit": "CEMADEN",
    "city": "São José dos Campos, SP",
    "primaryAxis": 2,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 2 (CEMADEN). Especialista em geologia de engenharia, movimentos de massa.",
      "en": "Axis 2 Associate Researcher (CEMADEN). Specialist in Geologia de Engenharia, Movimentos de Massa."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geologia de Engenharia",
      "Movimentos de Massa"
    ],
    "regions": [
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-rodrigo-augusto-stabile",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Monitoramento geotécnico e limiares de deflagração de deslizamentos",
          "en": "Monitoramento geotécnico e limiares de deflagração de deslizamentos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-rodrigo-augusto-stabile",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries subdiárias de precipitação futura",
          "en": "Séries subdiárias de precipitação futura"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "carlos-eduardo-keutenedjian-mady",
    "name": "Carlos Eduardo Keutenedjian Mady",
    "role": "associate",
    "institution": "UNICAMP / USP",
    "unit": "FEM-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      6,
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (FEM-UNICAMP). Especialista em termodinâmica, exergia.",
      "en": "Axis 3 Associate Researcher (FEM-UNICAMP). Specialist in Termodinâmica, Exergia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Termodinâmica",
      "Exergia",
      "Conforto Térmico"
    ],
    "regions": [
      "rmsp",
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-carlos-eduardo-keutenedjian-mady",
        "domain": "energy_grid",
        "label": {
          "pt": "Modelagem exergética de sistemas térmicos, edificações e corpo humano sob calor",
          "en": "Modelagem exergética de sistemas térmicos, edificações e corpo humano sob calor"
        }
      }
    ],
    "needs": [
      {
        "id": "need-carlos-eduardo-keutenedjian-mady",
        "domain": "health_epi",
        "label": {
          "pt": "Limiares de estresse térmico humano (Eixo 6)",
          "en": "Limiares de estresse térmico humano (Eixo 6)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "erick-del-bianco-pelegia",
    "name": "Erick Del Bianco Pelegia",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em sistemas elétricos, transição energética.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Sistemas Elétricos, Transição Energética."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sistemas Elétricos",
      "Transição Energética"
    ],
    "regions": [
      "rmsp",
      "semiarido"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-erick-del-bianco-pelegia",
        "domain": "energy_grid",
        "label": {
          "pt": "Análise técnica e regulatória de redes elétricas e transição energética",
          "en": "Análise técnica e regulatória de redes elétricas e transição energética"
        }
      }
    ],
    "needs": [
      {
        "id": "need-erick-del-bianco-pelegia",
        "domain": "economic_modeling",
        "label": {
          "pt": "Impactos econômicos de tarifas e transição",
          "en": "Impactos econômicos de tarifas e transição"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luis-felipe-normandia-lourenco",
    "name": "Luis Felipe Normandia Lourenço",
    "role": "associate",
    "institution": "USP",
    "unit": "EP-USP / IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (EP-USP / IEE-USP). Especialista em eletrônica de potência, microrredes.",
      "en": "Axis 3 Associate Researcher (EP-USP / IEE-USP). Specialist in Eletrônica de Potência, Microrredes."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Eletrônica de Potência",
      "Microrredes",
      "Redes Inteligentes"
    ],
    "regions": [
      "rmsp",
      "semiarido"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-luis-felipe-normandia-lourenco",
        "domain": "energy_grid",
        "label": {
          "pt": "Controle de conversores e integração de renováveis à rede elétrica",
          "en": "Controle de conversores e integração de renováveis à rede elétrica"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luis-felipe-normandia-lourenco",
        "domain": "climate_projections",
        "label": {
          "pt": "Perfis climáticos extremos de vento e radiação solar",
          "en": "Perfis climáticos extremos de vento e radiação solar"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcelo-pinho-almeida",
    "name": "Marcelo Pinho Almeida",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em fotovoltaica, eletrificação rural.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Fotovoltaica, Eletrificação Rural."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Fotovoltaica",
      "Eletrificação Rural"
    ],
    "regions": [
      "xingu",
      "semiarido",
      "rmsp"
    ],
    "hazards": [
      "energy-stress",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-marcelo-pinho-almeida",
        "domain": "energy_grid",
        "label": {
          "pt": "Projetos e ensaios de sistemas fotovoltaicos autônomos e conectados",
          "en": "Projetos e ensaios de sistemas fotovoltaicos autônomos e conectados"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcelo-pinho-almeida",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Demandas de eletrificação solar na Amazônia (Eixo 11)",
          "en": "Demandas de eletrificação solar na Amazônia (Eixo 11)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "michael-moses-aba",
    "name": "Michael Moses Aba",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em política energética, acesso à energia.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Política Energética, Acesso à Energia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Política Energética",
      "Acesso à Energia"
    ],
    "regions": [
      "semiarido",
      "xingu"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-michael-moses-aba",
        "domain": "energy_grid",
        "label": {
          "pt": "Transição energética justa e acesso universal à energia limpa",
          "en": "Transição energética justa e acesso universal à energia limpa"
        }
      }
    ],
    "needs": [
      {
        "id": "need-michael-moses-aba",
        "domain": "social_governance",
        "label": {
          "pt": "Indicadores sociais de pobreza energética",
          "en": "Indicadores sociais de pobreza energética"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "nilton-bispo-amado",
    "name": "Nilton Bispo Amado",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      8,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em planejamento energético, hidreletricidade.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Planejamento Energético, Hidreletricidade."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Planejamento Energético",
      "Hidreletricidade"
    ],
    "regions": [
      "rmsp",
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-nilton-bispo-amado",
        "domain": "energy_grid",
        "label": {
          "pt": "Balanço energético nacional e papel dos reservatórios na transição",
          "en": "Balanço energético nacional e papel dos reservatórios na transição"
        }
      }
    ],
    "needs": [
      {
        "id": "need-nilton-bispo-amado",
        "domain": "hydrology_water",
        "label": {
          "pt": "Cenários hidrológicos de longo prazo para o SIN",
          "en": "Cenários hidrológicos de longo prazo para o SIN"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "priscila-rosseto-camiloti",
    "name": "Priscila Rosseto Camiloti",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em biogás, bioenergia.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Biogás, Bioenergia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Biogás",
      "Bioenergia",
      "Resíduos"
    ],
    "regions": [
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-priscila-rosseto-camiloti",
        "domain": "energy_grid",
        "label": {
          "pt": "Aproveitamento energético de biogás e resíduos agroindustriais",
          "en": "Aproveitamento energético de biogás e resíduos agroindustriais"
        }
      }
    ],
    "needs": [
      {
        "id": "need-priscila-rosseto-camiloti",
        "domain": "climate_innovation",
        "label": {
          "pt": "Integração com rotas de captura de carbono (Eixo 8)",
          "en": "Integração com rotas de captura de carbono (Eixo 8)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ricardo-da-silva-benedito",
    "name": "Ricardo da Silva Benedito",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em geração distribuída, qualidade de energia.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Geração Distribuída, Qualidade de Energia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geração Distribuída",
      "Qualidade de Energia"
    ],
    "regions": [
      "rmsp",
      "semiarido"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-ricardo-da-silva-benedito",
        "domain": "energy_grid",
        "label": {
          "pt": "Integração de geração solar distribuída em redes urbanas",
          "en": "Integração de geração solar distribuída em redes urbanas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ricardo-da-silva-benedito",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries de alta resolução de irradiância e temperatura",
          "en": "Séries de alta resolução de irradiância e temperatura"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "welson-bassi",
    "name": "Welson Bassi",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 3 (IEE-USP). Especialista em descargas atmosféricas, proteção elétrica.",
      "en": "Axis 3 Associate Researcher (IEE-USP). Specialist in Descargas Atmosféricas, Proteção Elétrica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Descargas Atmosféricas",
      "Proteção Elétrica"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "energy-stress",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-welson-bassi",
        "domain": "energy_grid",
        "label": {
          "pt": "Resiliência de redes de distribuição elétrica frente a tempestades e raios",
          "en": "Resiliência de redes de distribuição elétrica frente a tempestades e raios"
        }
      }
    ],
    "needs": [
      {
        "id": "need-welson-bassi",
        "domain": "climate_projections",
        "label": {
          "pt": "Climatologia de tempestades severas e descargas",
          "en": "Climatologia de tempestades severas e descargas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "eduardo-delgado-assad",
    "name": "Eduardo Delgado Assad",
    "role": "associate",
    "institution": "EMBRAPA / UNICAMP",
    "unit": "Embrapa / FGVAgro",
    "city": "Campinas, SP",
    "primaryAxis": 4,
    "secondaryAxes": [
      1,
      10,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 4 (Embrapa / FGVAgro). Especialista em abc+ baixo carbono, zarc.",
      "en": "Axis 4 Associate Researcher (Embrapa / FGVAgro). Specialist in ABC+ Baixo Carbono, ZARC."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "ABC+ Baixo Carbono",
      "ZARC",
      "Agroclimatologia"
    ],
    "regions": [
      "cerrado-sp-co",
      "semiarido",
      "sul-amazonia"
    ],
    "hazards": [
      "crop-shock",
      "compound-drought",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-eduardo-delgado-assad",
        "domain": "agro_food",
        "label": {
          "pt": "Cenários de impacto climático na agropecuária brasileira e agricultura de baixo carbono",
          "en": "Cenários de impacto climático na agropecuária brasileira e agricultura de baixo carbono"
        }
      }
    ],
    "needs": [
      {
        "id": "need-eduardo-delgado-assad",
        "domain": "economic_modeling",
        "label": {
          "pt": "Integração com modelos econômicos (Eixo 10) e CMIP7 (Eixo 1)",
          "en": "Integração com modelos econômicos (Eixo 10) e CMIP7 (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "cicero-zanetti-de-lima",
    "name": "Cícero Zanetti de Lima",
    "role": "associate",
    "institution": "FGV",
    "unit": "FGVAgro",
    "city": "São Paulo, SP",
    "primaryAxis": 4,
    "secondaryAxes": [
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 4 (FGVAgro). Especialista em economia agrícola, modelagem cge agro.",
      "en": "Axis 4 Associate Researcher (FGVAgro). Specialist in Economia Agrícola, Modelagem CGE Agro."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia Agrícola",
      "Modelagem CGE Agro"
    ],
    "regions": [
      "cerrado-sp-co",
      "taquari-rs"
    ],
    "hazards": [
      "crop-shock",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-cicero-zanetti-de-lima",
        "domain": "agro_food",
        "label": {
          "pt": "Modelagem econômica de choques climáticos sobre produtividade agrícola e uso da terra",
          "en": "Modelagem econômica de choques climáticos sobre produtividade agrícola e uso da terra"
        }
      }
    ],
    "needs": [
      {
        "id": "need-cicero-zanetti-de-lima",
        "domain": "climate_projections",
        "label": {
          "pt": "Índices agroclimáticos extremos por microrregião",
          "en": "Índices agroclimáticos extremos por microrregião"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "antonio-nelson-rodrigues-da-silva",
    "name": "Antonio Nelson Rodrigues da Silva",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      9,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em mobilidade urbana sustentável, planejamento urbano.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Mobilidade Urbana Sustentável, Planejamento Urbano."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Mobilidade Urbana Sustentável",
      "Planejamento Urbano"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-antonio-nelson-rodrigues-da-silva",
        "domain": "hydrology_water",
        "label": {
          "pt": "Resiliência de sistemas de transporte e mobilidade urbana frente a eventos extremos",
          "en": "Resiliência de sistemas de transporte e mobilidade urbana frente a eventos extremos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-antonio-nelson-rodrigues-da-silva",
        "domain": "social_governance",
        "label": {
          "pt": "Manchas de alagamento urbano e justiça espacial",
          "en": "Manchas de alagamento urbano e justiça espacial"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "gabriel-marinho-e-silva",
    "name": "Gabriel Marinho e Silva",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em hidrologia urbana, monitoramento hidrológico.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Hidrologia Urbana, Monitoramento Hidrológico."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrologia Urbana",
      "Monitoramento Hidrológico"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-gabriel-marinho-e-silva",
        "domain": "hydrology_water",
        "label": {
          "pt": "Monitoramento e modelagem de bacias urbanas e eventos hidrológicos extremos",
          "en": "Monitoramento e modelagem de bacias urbanas e eventos hidrológicos extremos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-gabriel-marinho-e-silva",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Séries subdiárias de precipitação e radar",
          "en": "Séries subdiárias de precipitação e radar"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marilia-de-oliveira-felten",
    "name": "Marília de Oliveira Felten",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em gestão de bacias, segurança hídrica.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Gestão de Bacias, Segurança Hídrica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Gestão de Bacias",
      "Segurança Hídrica"
    ],
    "regions": [
      "cantareira-pcj"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-marilia-de-oliveira-felten",
        "domain": "hydrology_water",
        "label": {
          "pt": "Governança e segurança hídrica adaptativa em bacias críticas",
          "en": "Governança e segurança hídrica adaptativa em bacias críticas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marilia-de-oliveira-felten",
        "domain": "education_comm",
        "label": {
          "pt": "Engajamento comunitário e educação hídrica",
          "en": "Engajamento comunitário e educação hídrica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "danielle-de-almeida-bressiani",
    "name": "Danielle de Almeida Bressiani",
    "role": "associate",
    "institution": "UFPel / Colab. EESC",
    "unit": "Engenharia Hídrica",
    "city": "Pelotas, RS / São Carlos",
    "primaryAxis": 5,
    "secondaryAxes": [
      2,
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (Engenharia Hídrica). Especialista em swat, modelagem hidrológica.",
      "en": "Axis 5 Associate Researcher (Engenharia Hídrica). Specialist in SWAT, Modelagem Hidrológica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "SWAT",
      "Modelagem Hidrológica"
    ],
    "regions": [
      "taquari-rs",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-danielle-de-almeida-bressiani",
        "domain": "hydrology_water",
        "label": {
          "pt": "Simulação SWAT de vazões e sedimentos sob mudanças climáticas no RS e SP",
          "en": "Simulação SWAT de vazões e sedimentos sob mudanças climáticas no RS e SP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-danielle-de-almeida-bressiani",
        "domain": "climate_projections",
        "label": {
          "pt": "Ensembles climáticos corrigidos para o Sul do Brasil",
          "en": "Ensembles climáticos corrigidos para o Sul do Brasil"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "denise-taffarello",
    "name": "Denise Taffarello",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em serviços ecossistêmicos hídricos, psa água.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Serviços Ecossistêmicos Hídricos, PSA Água."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Serviços Ecossistêmicos Hídricos",
      "PSA Água"
    ],
    "regions": [
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-denise-taffarello",
        "domain": "hydrology_water",
        "label": {
          "pt": "Avaliação hidrológica de pagamento por serviços ambientais (Produtor de Água) no Cantareira",
          "en": "Avaliação hidrológica de pagamento por serviços ambientais (Produtor de Água) no Cantareira"
        }
      }
    ],
    "needs": [
      {
        "id": "need-denise-taffarello",
        "domain": "economic_modeling",
        "label": {
          "pt": "Valoração socioeconômica de restauração florestal",
          "en": "Valoração socioeconômica de restauração florestal"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jamil-alexandre-ayach-anache",
    "name": "Jamil Alexandre Ayach Anache",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em balanço hídrico, erosão do solo.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Balanço Hídrico, Erosão do Solo."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Balanço Hídrico",
      "Erosão do Solo",
      "Torres de Fluxo"
    ],
    "regions": [
      "cerrado-sp-co",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-jamil-alexandre-ayach-anache",
        "domain": "hydrology_water",
        "label": {
          "pt": "Medições de evapotranspiração, recarga subterrânea e erosão no Cerrado",
          "en": "Medições de evapotranspiração, recarga subterrânea e erosão no Cerrado"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jamil-alexandre-ayach-anache",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções climáticas para uso da terra no Cerrado",
          "en": "Projeções climáticas para uso da terra no Cerrado"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcos-roberto-benso",
    "name": "Marcos Roberto Benso",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      4,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em risco hidroagrícola, seguros climáticos.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Risco Hidroagrícola, Seguros Climáticos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Risco Hidroagrícola",
      "Seguros Climáticos"
    ],
    "regions": [
      "cerrado-sp-co",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-marcos-roberto-benso",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem de risco de seca para recursos hídricos e seguro agrícola indexado",
          "en": "Modelagem de risco de seca para recursos hídricos e seguro agrícola indexado"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcos-roberto-benso",
        "domain": "agro_food",
        "label": {
          "pt": "Séries agroclimáticas e avaliação econômica de perdas",
          "en": "Séries agroclimáticas e avaliação econômica de perdas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-clara-fava",
    "name": "Maria Clara Fava",
    "role": "associate",
    "institution": "UFABC / EESC",
    "unit": "Engenharia Ambiental",
    "city": "Santo André / São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (Engenharia Ambiental). Especialista em previsão de enchentes, ciência cidadã.",
      "en": "Axis 5 Associate Researcher (Engenharia Ambiental). Specialist in Previsão de Enchentes, Ciência Cidadã."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Previsão de Enchentes",
      "Ciência Cidadã"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-maria-clara-fava",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrodinâmica de inundações urbanas combinada a dados colaborativos",
          "en": "Modelagem hidrodinâmica de inundações urbanas combinada a dados colaborativos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-clara-fava",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Alertas comunitários de enchentes",
          "en": "Alertas comunitários de enchentes"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-do-carmo-calijuri",
    "name": "Maria do Carmo Calijuri",
    "role": "associate",
    "institution": "USP",
    "unit": "EESC-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 5,
    "secondaryAxes": [
      6
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (EESC-USP). Especialista em limnologia, qualidade da água.",
      "en": "Axis 5 Associate Researcher (EESC-USP). Specialist in Limnologia, Qualidade da Água."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Limnologia",
      "Qualidade da Água",
      "Cianobactérias"
    ],
    "regions": [
      "cantareira-pcj",
      "paraiba-sul"
    ],
    "hazards": [
      "compound-drought",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-maria-do-carmo-calijuri",
        "domain": "hydrology_water",
        "label": {
          "pt": "Impactos do aquecimento e secas na qualidade da água e florações em reservatórios",
          "en": "Impactos do aquecimento e secas na qualidade da água e florações em reservatórios"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-do-carmo-calijuri",
        "domain": "health_epi",
        "label": {
          "pt": "Riscos sanitários de abastecimento público (Eixo 6)",
          "en": "Riscos sanitários de abastecimento público (Eixo 6)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marina-batalini-de-macedo",
    "name": "Marina Batalini de Macedo",
    "role": "associate",
    "institution": "UNIFEI / EESC",
    "unit": "Recursos Hídricos",
    "city": "Itajubá, MG / São Carlos",
    "primaryAxis": 5,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (Recursos Hídricos). Especialista em soluções baseadas na natureza, drenagem sustentável.",
      "en": "Axis 5 Associate Researcher (Recursos Hídricos). Specialist in Soluções Baseadas na Natureza, Drenagem Sustentável."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Soluções Baseadas na Natureza",
      "Drenagem Sustentável"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-marina-batalini-de-macedo",
        "domain": "hydrology_water",
        "label": {
          "pt": "Projeto e monitoramento de infraestrutura verde urbana (biorretenção e parques alagáveis)",
          "en": "Projeto e monitoramento de infraestrutura verde urbana (biorretenção e parques alagáveis)"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marina-batalini-de-macedo",
        "domain": "social_governance",
        "label": {
          "pt": "Implementação participativa em municípios",
          "en": "Implementação participativa em municípios"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "pedro-luiz-borges-chaffe",
    "name": "Pedro Luiz Borges Chaffe",
    "role": "associate",
    "institution": "UFSC",
    "unit": "ENS-UFSC",
    "city": "Florianópolis, SC",
    "primaryAxis": 5,
    "secondaryAxes": [
      1,
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (ENS-UFSC). Especialista em hidrologia de processos, extremos hidrológicos.",
      "en": "Axis 5 Associate Researcher (ENS-UFSC). Specialist in Hidrologia de Processos, Extremos Hidrológicos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Hidrologia de Processos",
      "Extremos Hidrológicos"
    ],
    "regions": [
      "taquari-rs",
      "litoral-norte-sp"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-pedro-luiz-borges-chaffe",
        "domain": "hydrology_water",
        "label": {
          "pt": "Atribuição de cheias e secas hidrológicas no Sul do Brasil",
          "en": "Atribuição de cheias e secas hidrológicas no Sul do Brasil"
        }
      }
    ],
    "needs": [
      {
        "id": "need-pedro-luiz-borges-chaffe",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções climáticas regionais CMIP6/CMIP7",
          "en": "Projeções climáticas regionais CMIP6/CMIP7"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "suzana-maria-gico-lima-montenegro",
    "name": "Suzana Maria Gico Lima Montenegro",
    "role": "associate",
    "institution": "UFPE",
    "unit": "CTG-UFPE",
    "city": "Recife, PE",
    "primaryAxis": 5,
    "secondaryAxes": [
      2,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 5 (CTG-UFPE). Especialista em recursos hídricos no semiárido, drenagem costeira.",
      "en": "Axis 5 Associate Researcher (CTG-UFPE). Specialist in Recursos Hídricos no Semiárido, Drenagem Costeira."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Recursos Hídricos no Semiárido",
      "Drenagem Costeira"
    ],
    "regions": [
      "semiarido"
    ],
    "hazards": [
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-suzana-maria-gico-lima-montenegro",
        "domain": "hydrology_water",
        "label": {
          "pt": "Gestão adaptativa de recursos hídricos no Semiárido e cheias urbanas no Nordeste",
          "en": "Gestão adaptativa de recursos hídricos no Semiárido e cheias urbanas no Nordeste"
        }
      }
    ],
    "needs": [
      {
        "id": "need-suzana-maria-gico-lima-montenegro",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários de aridização e governança hídrica",
          "en": "Cenários de aridização e governança hídrica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "adelaide-cassia-nardocci",
    "name": "Adelaide Cassia Nardocci",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      2,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde ambiental, avaliação de risco à saúde.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Ambiental, Avaliação de Risco à Saúde."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Ambiental",
      "Avaliação de Risco à Saúde"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves",
      "floods",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-adelaide-cassia-nardocci",
        "domain": "health_epi",
        "label": {
          "pt": "Modelagem de risco ambiental à saúde por poluição atmosférica, calor e enchentes",
          "en": "Modelagem de risco ambiental à saúde por poluição atmosférica, calor e enchentes"
        }
      }
    ],
    "needs": [
      {
        "id": "need-adelaide-cassia-nardocci",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries meteorológicas e projeções para municípios paulistas",
          "en": "Séries meteorológicas e projeções para municípios paulistas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "betzabeth-slater-villar",
    "name": "Betzabeth Slater Villar",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em nutrição em saúde pública, insegurança alimentar.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Nutrição em Saúde Pública, Insegurança Alimentar."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Nutrição em Saúde Pública",
      "Insegurança Alimentar"
    ],
    "regions": [
      "rmsp",
      "vale-ribeira"
    ],
    "hazards": [
      "crop-shock",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-betzabeth-slater-villar",
        "domain": "health_epi",
        "label": {
          "pt": "Avaliação nutricional e impactos da crise climática na segurança alimentar",
          "en": "Avaliação nutricional e impactos da crise climática na segurança alimentar"
        }
      }
    ],
    "needs": [
      {
        "id": "need-betzabeth-slater-villar",
        "domain": "agro_food",
        "label": {
          "pt": "Conexão com produção agrícola familiar (Eixo 4)",
          "en": "Conexão com produção agrícola familiar (Eixo 4)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "fabio-luiz-teixeira-goncalves",
    "name": "Fábio Luiz Teixeira Gonçalves",
    "role": "associate",
    "institution": "USP",
    "unit": "IAG-USP / FSP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      1
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (IAG-USP / FSP). Especialista em biometeorologia humana, conforto térmico.",
      "en": "Axis 6 Associate Researcher (IAG-USP / FSP). Specialist in Biometeorologia Humana, Conforto Térmico."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Biometeorologia Humana",
      "Conforto Térmico"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-fabio-luiz-teixeira-goncalves",
        "domain": "health_epi",
        "label": {
          "pt": "Biometeorologia humana e impacto de extremos térmicos em morbidade cardiorrespiratória",
          "en": "Biometeorologia humana e impacto de extremos térmicos em morbidade cardiorrespiratória"
        }
      }
    ],
    "needs": [
      {
        "id": "need-fabio-luiz-teixeira-goncalves",
        "domain": "climate_projections",
        "label": {
          "pt": "Simulações de clima urbano na RMSP",
          "en": "Simulações de clima urbano na RMSP"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "francisco-chiaravalloti-neto",
    "name": "Francisco Chiaravalloti Neto",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      1,
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em epidemiologia espacial, dengue & arboviroses.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Epidemiologia Espacial, Dengue & Arboviroses."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Epidemiologia Espacial",
      "Dengue & Arboviroses",
      "INLA"
    ],
    "regions": [
      "rmsp",
      "cerrado-sp-co",
      "cantareira-pcj"
    ],
    "hazards": [
      "health-vectors",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-francisco-chiaravalloti-neto",
        "domain": "health_epi",
        "label": {
          "pt": "Modelagem espaço-temporal da expansão de dengue e vetores sob aquecimento climático",
          "en": "Modelagem espaço-temporal da expansão de dengue e vetores sob aquecimento climático"
        }
      }
    ],
    "needs": [
      {
        "id": "need-francisco-chiaravalloti-neto",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções de temperatura e precipitação por município (Eixo 1)",
          "en": "Projeções de temperatura e precipitação por município (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-tereza-pepe-razzolini",
    "name": "Maria Tereza Pepe Razzolini",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em microbiologia ambiental, água & saúde.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Microbiologia Ambiental, Água & Saúde."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Microbiologia Ambiental",
      "Água & Saúde"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods",
      "compound-drought",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-maria-tereza-pepe-razzolini",
        "domain": "health_epi",
        "label": {
          "pt": "Riscos microbiológicos e doenças de veiculação hídrica em cenários de seca e enchente",
          "en": "Riscos microbiológicos e doenças de veiculação hídrica em cenários de seca e enchente"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-tereza-pepe-razzolini",
        "domain": "hydrology_water",
        "label": {
          "pt": "Qualidade da água em mananciais e drenagem urbana (Eixo 5)",
          "en": "Qualidade da água em mananciais e drenagem urbana (Eixo 5)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "guilherme-luis-fernandes",
    "name": "Guilherme Luis Fernandes",
    "role": "postdoc",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde ambiental, epidemiologia.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Ambiental, Epidemiologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Ambiental",
      "Epidemiologia"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-guilherme-luis-fernandes",
        "domain": "health_epi",
        "label": {
          "pt": "Análise de séries de saúde e extremos térmicos",
          "en": "Análise de séries de saúde e extremos térmicos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-guilherme-luis-fernandes",
        "domain": "climate_projections",
        "label": {
          "pt": "Índices diários de ondas de calor",
          "en": "Índices diários de ondas de calor"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "patricia-nehme",
    "name": "Patrícia Nehme",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em cronobiologia, saúde do trabalhador.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Cronobiologia, Saúde do Trabalhador."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Cronobiologia",
      "Saúde do Trabalhador"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-patricia-nehme",
        "domain": "health_epi",
        "label": {
          "pt": "Impactos do calor noturno no sono e saúde de trabalhadores",
          "en": "Impactos do calor noturno no sono e saúde de trabalhadores"
        }
      }
    ],
    "needs": [
      {
        "id": "need-patricia-nehme",
        "domain": "climate_projections",
        "label": {
          "pt": "Monitoramento de temperatura intraurbana",
          "en": "Monitoramento de temperatura intraurbana"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "weruska-barrios",
    "name": "Weruska Barrios",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde coletiva, vigilância.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Coletiva, Vigilância."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Coletiva",
      "Vigilância"
    ],
    "regions": [
      "rmsp",
      "sul-amazonia"
    ],
    "hazards": [
      "heatwaves",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-weruska-barrios",
        "domain": "health_epi",
        "label": {
          "pt": "Vigilância em saúde ambiental e populações vulneráveis",
          "en": "Vigilância em saúde ambiental e populações vulneráveis"
        }
      }
    ],
    "needs": [
      {
        "id": "need-weruska-barrios",
        "domain": "social_governance",
        "label": {
          "pt": "Mapas de vulnerabilidade social",
          "en": "Mapas de vulnerabilidade social"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "vinicius-bigogno-costa",
    "name": "Vinícius Bigogno Costa",
    "role": "phd",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde pública, clima & saúde.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Pública, Clima & Saúde."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Pública",
      "Clima & Saúde"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-vinicius-bigogno-costa",
        "domain": "health_epi",
        "label": {
          "pt": "Pesquisa de pós-graduação em clima e saúde pública",
          "en": "Pesquisa de pós-graduação em clima e saúde pública"
        }
      }
    ],
    "needs": [
      {
        "id": "need-vinicius-bigogno-costa",
        "domain": "climate_projections",
        "label": {
          "pt": "Dados climáticos urbanos",
          "en": "Dados climáticos urbanos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "abel-lulendo-m-bala",
    "name": "Abel Lulendo M Bala",
    "role": "phd",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em epidemiologia, saúde pública.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Epidemiologia, Saúde Pública."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Epidemiologia",
      "Saúde Pública"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-abel-lulendo-m-bala",
        "domain": "health_epi",
        "label": {
          "pt": "Estudos epidemiológicos de agravos sensíveis ao clima",
          "en": "Estudos epidemiológicos de agravos sensíveis ao clima"
        }
      }
    ],
    "needs": [
      {
        "id": "need-abel-lulendo-m-bala",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries climáticas regionais",
          "en": "Séries climáticas regionais"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "lara-andressa-o-goncalves",
    "name": "Lara Andressa O. Gonçalves",
    "role": "phd",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde ambiental, cronobiologia.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Ambiental, Cronobiologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Ambiental",
      "Cronobiologia"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-lara-andressa-o-goncalves",
        "domain": "health_epi",
        "label": {
          "pt": "Impactos térmicos no cotidiano e saúde urbana",
          "en": "Impactos térmicos no cotidiano e saúde urbana"
        }
      }
    ],
    "needs": [
      {
        "id": "need-lara-andressa-o-goncalves",
        "domain": "climate_projections",
        "label": {
          "pt": "Mapas de ilhas de calor",
          "en": "Mapas de ilhas de calor"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "davi-emmanuel-malcher-de-carvalho",
    "name": "Davi Emmanuel Malcher de Carvalho",
    "role": "phd",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde na amazônia, epidemiologia.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde na Amazônia, Epidemiologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde na Amazônia",
      "Epidemiologia"
    ],
    "regions": [
      "sul-amazonia",
      "xingu"
    ],
    "hazards": [
      "heatwaves",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-davi-emmanuel-malcher-de-carvalho",
        "domain": "health_epi",
        "label": {
          "pt": "Impactos de extremos climáticos na saúde de populações amazônicas",
          "en": "Impactos de extremos climáticos na saúde de populações amazônicas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-davi-emmanuel-malcher-de-carvalho",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Cenários ambientais para a Amazônia (Eixo 11)",
          "en": "Cenários ambientais para a Amazônia (Eixo 11)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "alana-tavora-rodrigues",
    "name": "Alana Távora Rodrigues",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 6 (FSP-USP). Especialista em saúde pública, epidemiologia.",
      "en": "Axis 6 Associate Researcher (FSP-USP). Specialist in Saúde Pública, Epidemiologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Pública",
      "Epidemiologia"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-alana-tavora-rodrigues",
        "domain": "health_epi",
        "label": {
          "pt": "Pesquisa em saúde coletiva e fatores ambientais",
          "en": "Pesquisa em saúde coletiva e fatores ambientais"
        }
      }
    ],
    "needs": [
      {
        "id": "need-alana-tavora-rodrigues",
        "domain": "climate_projections",
        "label": {
          "pt": "Indicadores climáticos urbanos",
          "en": "Indicadores climáticos urbanos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "sonia-regina-da-cal-seixas",
    "name": "Sônia Regina da Cal Seixas",
    "role": "associate",
    "institution": "UNICAMP",
    "unit": "NEPAM-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      3,
      6,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 7 (NEPAM-UNICAMP). Especialista em qualidade de vida, educação & sustentabilidade.",
      "en": "Axis 7 Associate Researcher (NEPAM-UNICAMP). Specialist in Qualidade de Vida, Educação & Sustentabilidade."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Qualidade de Vida",
      "Educação & Sustentabilidade",
      "Percepção Socioambiental"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-sonia-regina-da-cal-seixas",
        "domain": "education_comm",
        "label": {
          "pt": "Indicadores de percepção pública, energia, saúde ambiental e mudanças climáticas",
          "en": "Indicadores de percepção pública, energia, saúde ambiental e mudanças climáticas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-sonia-regina-da-cal-seixas",
        "domain": "social_governance",
        "label": {
          "pt": "Parcerias com escolas e municípios nos 11 eixos",
          "en": "Parcerias com escolas e municípios nos 11 eixos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "cristina-boggi-da-silva-raffaelli",
    "name": "Cristina Boggi da Silva Raffaelli",
    "role": "associate",
    "institution": "UNICAMP",
    "unit": "IFCH / NEPAM-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 7 (IFCH / NEPAM-UNICAMP). Especialista em sociologia ambiental, difusão.",
      "en": "Axis 7 Associate Researcher (IFCH / NEPAM-UNICAMP). Specialist in Sociologia Ambiental, Difusão."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sociologia Ambiental",
      "Difusão"
    ],
    "regions": [
      "cantareira-pcj"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-cristina-boggi-da-silva-raffaelli",
        "domain": "education_comm",
        "label": {
          "pt": "Difusão científica e formação socioambiental sobre mudanças climáticas",
          "en": "Difusão científica e formação socioambiental sobre mudanças climáticas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-cristina-boggi-da-silva-raffaelli",
        "domain": "education_comm",
        "label": {
          "pt": "Materiais didáticos dos eixos temáticos",
          "en": "Materiais didáticos dos eixos temáticos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "nivaldo-aparecido-correa",
    "name": "Nivaldo Aparecido Corrêa",
    "role": "associate",
    "institution": "UNICAMP",
    "unit": "NEPAM-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 7,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 7 (NEPAM-UNICAMP). Especialista em educação ambiental, comunicação.",
      "en": "Axis 7 Associate Researcher (NEPAM-UNICAMP). Specialist in Educação Ambiental, Comunicação."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educação Ambiental",
      "Comunicação"
    ],
    "regions": [
      "cantareira-pcj",
      "vale-ribeira"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-nivaldo-aparecido-correa",
        "domain": "education_comm",
        "label": {
          "pt": "Projetos educativos e engajamento escolar em resiliência climática",
          "en": "Projetos educativos e engajamento escolar em resiliência climática"
        }
      }
    ],
    "needs": [
      {
        "id": "need-nivaldo-aparecido-correa",
        "domain": "education_comm",
        "label": {
          "pt": "Conteúdos científicos aplicados",
          "en": "Conteúdos científicos aplicados"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "lucy-gomes-sant-anna",
    "name": "Lucy Gomes Sant'Anna",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP / IGc-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 8 (IEE-USP / IGc-USP). Especialista em mineralogia, reservatórios geológicos.",
      "en": "Axis 8 Associate Researcher (IEE-USP / IGc-USP). Specialist in Mineralogia, Reservatórios Geológicos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Mineralogia",
      "Reservatórios Geológicos",
      "CCUS"
    ],
    "regions": [
      "cerrado-sp-co",
      "paraiba-sul"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-lucy-gomes-sant-anna",
        "domain": "climate_innovation",
        "label": {
          "pt": "Caracterização geológica e mineralógica de reservatórios para armazenamento de CO2",
          "en": "Caracterização geológica e mineralógica de reservatórios para armazenamento de CO2"
        }
      }
    ],
    "needs": [
      {
        "id": "need-lucy-gomes-sant-anna",
        "domain": "hydrology_water",
        "label": {
          "pt": "Avaliação ambiental e hídrica de áreas de injeção",
          "en": "Avaliação ambiental e hídrica de áreas de injeção"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcos-egydio-da-silva",
    "name": "Marcos Egydio da Silva",
    "role": "associate",
    "institution": "USP",
    "unit": "IGc-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 8 (IGc-USP). Especialista em geologia estrutural, geotectônica.",
      "en": "Axis 8 Associate Researcher (IGc-USP). Specialist in Geologia Estrutural, Geotectônica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geologia Estrutural",
      "Geotectônica"
    ],
    "regions": [
      "paraiba-sul",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-marcos-egydio-da-silva",
        "domain": "climate_innovation",
        "label": {
          "pt": "Modelagem geológica estrutural de bacias sedimentares para CCUS",
          "en": "Modelagem geológica estrutural de bacias sedimentares para CCUS"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcos-egydio-da-silva",
        "domain": "climate_innovation",
        "label": {
          "pt": "Integração geofísica e segurança geológica",
          "en": "Integração geofísica e segurança geológica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "saulo-batista-de-oliveira",
    "name": "Saulo Batista de Oliveira",
    "role": "associate",
    "institution": "USP",
    "unit": "IGc-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 8 (IGc-USP). Especialista em modelagem geológica 3d, recursos minerais críticos.",
      "en": "Axis 8 Associate Researcher (IGc-USP). Specialist in Modelagem Geológica 3D, Recursos Minerais Críticos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Modelagem Geológica 3D",
      "Recursos Minerais Críticos"
    ],
    "regions": [
      "cerrado-sp-co",
      "paraiba-sul"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-saulo-batista-de-oliveira",
        "domain": "climate_innovation",
        "label": {
          "pt": "Modelagem 3D de reservatórios geológicos de carbono e minerais para transição energética",
          "en": "Modelagem 3D de reservatórios geológicos de carbono e minerais para transição energética"
        }
      }
    ],
    "needs": [
      {
        "id": "need-saulo-batista-de-oliveira",
        "domain": "energy_grid",
        "label": {
          "pt": "Demandas de minerais críticos do Eixo 3",
          "en": "Demandas de minerais críticos do Eixo 3"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "emerson-felipe-felix",
    "name": "Emerson Felipe Félix",
    "role": "associate",
    "institution": "UFSCar",
    "unit": "DECiv-UFSCar",
    "city": "São Carlos, SP",
    "primaryAxis": 8,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 8 (DECiv-UFSCar). Especialista em infraestrutura resiliente, materiais de baixo carbono.",
      "en": "Axis 8 Associate Researcher (DECiv-UFSCar). Specialist in Infraestrutura Resiliente, Materiais de Baixo Carbono."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Infraestrutura Resiliente",
      "Materiais de Baixo Carbono",
      "Durabilidade"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-emerson-felipe-felix",
        "domain": "climate_innovation",
        "label": {
          "pt": "Degradação e resiliência de infraestruturas de concreto sob mudanças climáticas e captura de CO2",
          "en": "Degradação e resiliência de infraestruturas de concreto sob mudanças climáticas e captura de CO2"
        }
      }
    ],
    "needs": [
      {
        "id": "need-emerson-felipe-felix",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções climáticas de umidade, CO2 e temperatura",
          "en": "Projeções climáticas de umidade, CO2 e temperatura"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "gabriel-andres-castro-falcon",
    "name": "Gabriel Andres Castro Falcon",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [
      3
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 8 (IEE-USP). Especialista em engenharia de carbono, ccus.",
      "en": "Axis 8 Associate Researcher (IEE-USP). Specialist in Engenharia de Carbono, CCUS."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Engenharia de Carbono",
      "CCUS"
    ],
    "regions": [
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-gabriel-andres-castro-falcon",
        "domain": "climate_innovation",
        "label": {
          "pt": "Simulação de processos de captura e transporte de CO2 em plantas de bioenergia",
          "en": "Simulação de processos de captura e transporte de CO2 em plantas de bioenergia"
        }
      }
    ],
    "needs": [
      {
        "id": "need-gabriel-andres-castro-falcon",
        "domain": "economic_modeling",
        "label": {
          "pt": "Análise tecno-econômica (Eixo 10)",
          "en": "Análise tecno-econômica (Eixo 10)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "bruno-peregrina-puga",
    "name": "Bruno Peregrina Puga",
    "role": "associate",
    "institution": "UNICAMP / USP",
    "unit": "IE-UNICAMP",
    "city": "Campinas, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IE-UNICAMP). Especialista em governança da água, economia institucional.",
      "en": "Axis 9 Associate Researcher (IE-UNICAMP). Specialist in Governança da Água, Economia Institucional."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança da Água",
      "Economia Institucional"
    ],
    "regions": [
      "cantareira-pcj",
      "paraiba-sul"
    ],
    "hazards": [
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-bruno-peregrina-puga",
        "domain": "social_governance",
        "label": {
          "pt": "Instituições, cobrança pelo uso da água e governança de bacias hidrográficas",
          "en": "Instituições, cobrança pelo uso da água e governança de bacias hidrográficas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-bruno-peregrina-puga",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelos hidrológicos e econômicos de alocação hídrica",
          "en": "Modelos hidrológicos e econômicos de alocação hídrica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "flavia-mendes-de-almeida-collaco",
    "name": "Flávia Mendes de Almeida Collaço",
    "role": "associate",
    "institution": "UFCE / USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      3
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em planejamento energético urbano, leap.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Planejamento Energético Urbano, LEAP."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Planejamento Energético Urbano",
      "LEAP",
      "Cidades"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "energy-stress",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-flavia-mendes-de-almeida-collaco",
        "domain": "social_governance",
        "label": {
          "pt": "Modelagem do nexo energia-clima em escala municipal e políticas urbanas de mitigação",
          "en": "Modelagem do nexo energia-clima em escala municipal e políticas urbanas de mitigação"
        }
      }
    ],
    "needs": [
      {
        "id": "need-flavia-mendes-de-almeida-collaco",
        "domain": "energy_grid",
        "label": {
          "pt": "Dados de consumo energético e ilhas de calor na RMSP",
          "en": "Dados de consumo energético e ilhas de calor na RMSP"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "gina-rizpah-besen",
    "name": "Gina Rizpah Besen",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      6,
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em resíduos sólidos, saneamento.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Resíduos Sólidos, Saneamento."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Resíduos Sólidos",
      "Saneamento",
      "Justiça Ambiental"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "floods",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-gina-rizpah-besen",
        "domain": "social_governance",
        "label": {
          "pt": "Gestão de resíduos sólidos, reciclagem inclusiva e saneamento resiliente ao clima",
          "en": "Gestão de resíduos sólidos, reciclagem inclusiva e saneamento resiliente ao clima"
        }
      }
    ],
    "needs": [
      {
        "id": "need-gina-rizpah-besen",
        "domain": "hydrology_water",
        "label": {
          "pt": "Aproveitamento de biogás (Eixo 3/8) e drenagem urbana (Eixo 5)",
          "en": "Aproveitamento de biogás (Eixo 3/8) e drenagem urbana (Eixo 5)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jeferson-cristiano-tavares",
    "name": "Jeferson Cristiano Tavares",
    "role": "associate",
    "institution": "USP",
    "unit": "IAU-USP",
    "city": "São Carlos, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IAU-USP). Especialista em urbanismo climático, planejamento regional.",
      "en": "Axis 9 Associate Researcher (IAU-USP). Specialist in Urbanismo Climático, Planejamento Regional."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Urbanismo Climático",
      "Planejamento Regional"
    ],
    "regions": [
      "litoral-norte-sp",
      "cantareira-pcj",
      "rmsp"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-jeferson-cristiano-tavares",
        "domain": "social_governance",
        "label": {
          "pt": "Desenho urbano e planejamento territorial adaptativo frente a riscos hídricos e costeiros",
          "en": "Desenho urbano e planejamento territorial adaptativo frente a riscos hídricos e costeiros"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jeferson-cristiano-tavares",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas hidrodinâmicos de inundação e encostas",
          "en": "Mapas hidrodinâmicos de inundação e encostas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jose-irivaldo-alves-oliveira-silva",
    "name": "José Irivaldo Alves Oliveira Silva",
    "role": "associate",
    "institution": "UFCG",
    "unit": "CDSA-UFCG",
    "city": "Sumé, PB",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (CDSA-UFCG). Especialista em direito das águas, governança no semiárido.",
      "en": "Axis 9 Associate Researcher (CDSA-UFCG). Specialist in Direito das Águas, Governança no Semiárido."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Direito das Águas",
      "Governança no Semiárido"
    ],
    "regions": [
      "semiarido",
      "xingu"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-jose-irivaldo-alves-oliveira-silva",
        "domain": "social_governance",
        "label": {
          "pt": "Marco regulatório, segurança hídrica e justiça climática no Semiárido",
          "en": "Marco regulatório, segurança hídrica e justiça climática no Semiárido"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jose-irivaldo-alves-oliveira-silva",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários hidroclimáticos para o Nordeste",
          "en": "Cenários hidroclimáticos para o Nordeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leandra-regina-goncalves-torres",
    "name": "Leandra Regina Gonçalves Torres",
    "role": "associate",
    "institution": "UNIFESP",
    "unit": "IMar-UNIFESP",
    "city": "Santos, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      1,
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IMar-UNIFESP). Especialista em governança costeira e marinha, planejamento espacial.",
      "en": "Axis 9 Associate Researcher (IMar-UNIFESP). Specialist in Governança Costeira e Marinha, Planejamento Espacial."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Costeira e Marinha",
      "Planejamento Espacial"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-leandra-regina-goncalves-torres",
        "domain": "social_governance",
        "label": {
          "pt": "Governança da zona costeira paulista e adaptação baseada em ecossistemas marinhos",
          "en": "Governança da zona costeira paulista e adaptação baseada em ecossistemas marinhos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leandra-regina-goncalves-torres",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções oceânicas e erosão costeira (Eixo 1)",
          "en": "Projeções oceânicas e erosão costeira (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leandro-luiz-giatti",
    "name": "Leandro Luiz Giatti",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5,
      6,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (FSP-USP). Especialista em nexo água-energia-alimento, saúde planetária.",
      "en": "Axis 9 Associate Researcher (FSP-USP). Specialist in Nexo Água-Energia-Alimento, Saúde Planetária."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Nexo Água-Energia-Alimento",
      "Saúde Planetária",
      "Pesquisa Participativa"
    ],
    "regions": [
      "rmsp",
      "sul-amazonia"
    ],
    "hazards": [
      "floods",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-leandro-luiz-giatti",
        "domain": "social_governance",
        "label": {
          "pt": "Inseguranças no nexo água-energia-alimento e saúde ambiental em periferias e Amazônia",
          "en": "Inseguranças no nexo água-energia-alimento e saúde ambiental em periferias e Amazônia"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leandro-luiz-giatti",
        "domain": "health_epi",
        "label": {
          "pt": "Indicadores hidrológicos (Eixo 5) e epidemiológicos (Eixo 6)",
          "en": "Indicadores hidrológicos (Eixo 5) e epidemiológicos (Eixo 6)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luciana-rodrigues-fagnoni-costa-travassos",
    "name": "Luciana Rodrigues Fagnoni Costa Travassos",
    "role": "associate",
    "institution": "UFABC",
    "unit": "CECS-UFABC",
    "city": "São Bernardo do Campo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (CECS-UFABC). Especialista em justiça climática urbana, rios urbanos.",
      "en": "Axis 9 Associate Researcher (CECS-UFABC). Specialist in Justiça Climática Urbana, Rios Urbanos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Justiça Climática Urbana",
      "Rios Urbanos"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-luciana-rodrigues-fagnoni-costa-travassos",
        "domain": "social_governance",
        "label": {
          "pt": "Desigualdade socioespacial, produção de riscos e adaptação em várzeas metropolitanas",
          "en": "Desigualdade socioespacial, produção de riscos e adaptação em várzeas metropolitanas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luciana-rodrigues-fagnoni-costa-travassos",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrológica de microbacias no ABC e RMSP",
          "en": "Modelagem hidrológica de microbacias no ABC e RMSP"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcelo-aversa",
    "name": "Marcelo Aversa",
    "role": "associate",
    "institution": "UFABC / IEE",
    "unit": "Planejamento Territorial",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Planejamento Territorial). Especialista em governança metropolitana, bacias.",
      "en": "Axis 9 Associate Researcher (Planejamento Territorial). Specialist in Governança Metropolitana, Bacias."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Metropolitana",
      "Bacias"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-marcelo-aversa",
        "domain": "social_governance",
        "label": {
          "pt": "Planejamento e governança interfederativa em regiões metropolitanas",
          "en": "Planejamento e governança interfederativa em regiões metropolitanas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcelo-aversa",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas de risco hídrico metropolitano",
          "en": "Mapas de risco hídrico metropolitano"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-luisa-de-carvalho-de-albuquerque-schmidt",
    "name": "Maria Luísa de Carvalho de Albuquerque Schmidt",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em governança climática, participação social.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Governança Climática, Participação Social."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Climática",
      "Participação Social"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-maria-luisa-de-carvalho-de-albuquerque-schmidt",
        "domain": "social_governance",
        "label": {
          "pt": "Processos participativos e aprendizagem social para adaptação climática",
          "en": "Processos participativos e aprendizagem social para adaptação climática"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-luisa-de-carvalho-de-albuquerque-schmidt",
        "domain": "education_comm",
        "label": {
          "pt": "Ferramentas de difusão e educação (Eixo 7)",
          "en": "Ferramentas de difusão e educação (Eixo 7)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "maria-mancilla-garcia",
    "name": "Maria Mancilla Garcia",
    "role": "associate",
    "institution": "ULB / Colab.",
    "unit": "Socioecologia",
    "city": "Bruxelas / SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Socioecologia). Especialista em sistemas socioecológicos, governança adaptativa.",
      "en": "Axis 9 Associate Researcher (Socioecologia). Specialist in Sistemas Socioecológicos, Governança Adaptativa."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sistemas Socioecológicos",
      "Governança Adaptativa"
    ],
    "regions": [
      "xingu",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-maria-mancilla-garcia",
        "domain": "social_governance",
        "label": {
          "pt": "Teoria e modelagem de redes de governança socioecológica",
          "en": "Teoria e modelagem de redes de governança socioecológica"
        }
      }
    ],
    "needs": [
      {
        "id": "need-maria-mancilla-garcia",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Estudos de caso na Amazônia e Sudeste",
          "en": "Estudos de caso na Amazônia e Sudeste"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "mark-pelling",
    "name": "Mark Pelling",
    "role": "associate",
    "institution": "UCL / Colaborador",
    "unit": "UCL Institute for Risk & Disaster Reduction",
    "city": "Londres / SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (UCL Institute for Risk & Disaster Reduction). Especialista em adaptação transformadora, risco urbano.",
      "en": "Axis 9 Associate Researcher (UCL Institute for Risk & Disaster Reduction). Specialist in Adaptação Transformadora, Risco Urbano."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Adaptação Transformadora",
      "Risco Urbano"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-mark-pelling",
        "domain": "social_governance",
        "label": {
          "pt": "Quadros internacionais de adaptação transformadora e resiliência urbana justa",
          "en": "Quadros internacionais de adaptação transformadora e resiliência urbana justa"
        }
      }
    ],
    "needs": [
      {
        "id": "need-mark-pelling",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Comparação de políticas municipais no Brasil",
          "en": "Comparação de políticas municipais no Brasil"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "pedro-henrique-campello-torres",
    "name": "Pedro Henrique Campello Torres",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2,
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em justiça climática, planejamento urbano.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Justiça Climática, Planejamento Urbano."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Justiça Climática",
      "Planejamento Urbano",
      "Combate ao Negacionismo"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-pedro-henrique-campello-torres",
        "domain": "social_governance",
        "label": {
          "pt": "Planos locais de ação climática, justiça socioambiental e desinformação climática",
          "en": "Planos locais de ação climática, justiça socioambiental e desinformação climática"
        }
      }
    ],
    "needs": [
      {
        "id": "need-pedro-henrique-campello-torres",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Dados de exposição a extremos por bairro e município",
          "en": "Dados de exposição a extremos por bairro e município"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "rafael-calderon-contreras",
    "name": "Rafael Calderón Contreras",
    "role": "associate",
    "institution": "UAM / Colab.",
    "unit": "Sustentabilidade Urbana",
    "city": "Cidade do México / SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Sustentabilidade Urbana). Especialista em resiliência urbana, sistemas alimentares.",
      "en": "Axis 9 Associate Researcher (Sustentabilidade Urbana). Specialist in Resiliência Urbana, Sistemas Alimentares."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Resiliência Urbana",
      "Sistemas Alimentares"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-rafael-calderon-contreras",
        "domain": "social_governance",
        "label": {
          "pt": "Resiliência socioecológica e segurança alimentar em megacidades latino-americanas",
          "en": "Resiliência socioecológica e segurança alimentar em megacidades latino-americanas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-rafael-calderon-contreras",
        "domain": "agro_food",
        "label": {
          "pt": "Dados de cinturões verdes na RMSP (Eixo 4)",
          "en": "Dados de cinturões verdes na RMSP (Eixo 4)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ronaldo-adriano-christofoletti",
    "name": "Ronaldo Adriano Christofoletti",
    "role": "associate",
    "institution": "UNIFESP",
    "unit": "IMar-UNIFESP",
    "city": "Santos, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      1,
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IMar-UNIFESP). Especialista em cultura oceânica, biodiversidade costeira.",
      "en": "Axis 9 Associate Researcher (IMar-UNIFESP). Specialist in Cultura Oceânica, Biodiversidade Costeira."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Cultura Oceânica",
      "Biodiversidade Costeira"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-ronaldo-adriano-christofoletti",
        "domain": "social_governance",
        "label": {
          "pt": "Cultura oceânica, biodiversidade marinha e engajamento costeiro na Década do Oceano",
          "en": "Cultura oceânica, biodiversidade marinha e engajamento costeiro na Década do Oceano"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ronaldo-adriano-christofoletti",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries de aquecimento e extremos costeiros (Eixo 1)",
          "en": "Séries de aquecimento e extremos costeiros (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "samia-nascimento-sulaiman",
    "name": "Samia Nascimento Sulaiman",
    "role": "associate",
    "institution": "UNIFESP / IEE",
    "unit": "Gestão de Riscos",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2,
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Gestão de Riscos). Especialista em prevenção de desastres, educação comunitária.",
      "en": "Axis 9 Associate Researcher (Gestão de Riscos). Specialist in Prevenção de Desastres, Educação Comunitária."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Prevenção de Desastres",
      "Educação Comunitária"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "floods"
    ],
    "offers": [
      {
        "id": "off-samia-nascimento-sulaiman",
        "domain": "social_governance",
        "label": {
          "pt": "Construção social do risco e capacitação comunitária para redução de desastres",
          "en": "Construção social do risco e capacitação comunitária para redução de desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-samia-nascimento-sulaiman",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Cartas geotécnicas e alertas do Eixo 2",
          "en": "Cartas geotécnicas e alertas do Eixo 2"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "sueli-angelo-furlan",
    "name": "Sueli Angelo Furlan",
    "role": "associate",
    "institution": "USP",
    "unit": "FFLCH-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (FFLCH-USP). Especialista em biogeografia, unidades de conservação.",
      "en": "Axis 9 Associate Researcher (FFLCH-USP). Specialist in Biogeografia, Unidades de Conservação."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Biogeografia",
      "Unidades de Conservação",
      "Educação"
    ],
    "regions": [
      "litoral-norte-sp",
      "vale-ribeira",
      "xingu"
    ],
    "hazards": [
      "extreme-rain-landslides",
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-sueli-angelo-furlan",
        "domain": "social_governance",
        "label": {
          "pt": "Conservação da Mata Atlântica, biogeografia e currículo de educação geográfica",
          "en": "Conservação da Mata Atlântica, biogeografia e currículo de educação geográfica"
        }
      }
    ],
    "needs": [
      {
        "id": "need-sueli-angelo-furlan",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários climáticos para corredores ecológicos",
          "en": "Cenários climáticos para corredores ecológicos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "valeriana-augusta-broetto",
    "name": "Valeriana Augusta Broetto",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em governança ambiental, sustentabilidade.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Governança Ambiental, Sustentabilidade."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Ambiental",
      "Sustentabilidade"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-valeriana-augusta-broetto",
        "domain": "social_governance",
        "label": {
          "pt": "Políticas locais de adaptação e governança socioambiental",
          "en": "Políticas locais de adaptação e governança socioambiental"
        }
      }
    ],
    "needs": [
      {
        "id": "need-valeriana-augusta-broetto",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Indicadores municipais de vulnerabilidade",
          "en": "Indicadores municipais de vulnerabilidade"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "vivian-aparecida-blaso-souza-soares-cesar",
    "name": "Vivian Aparecida Blaso Souza Soares Cesar",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em educação ambiental, governança hídrica.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Educação Ambiental, Governança Hídrica."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educação Ambiental",
      "Governança Hídrica"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-vivian-aparecida-blaso-souza-soares-cesar",
        "domain": "social_governance",
        "label": {
          "pt": "Aprendizagem social e participação em comitês e municípios",
          "en": "Aprendizagem social e participação em comitês e municípios"
        }
      }
    ],
    "needs": [
      {
        "id": "need-vivian-aparecida-blaso-souza-soares-cesar",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas de bacias hidrográficas",
          "en": "Mapas de bacias hidrográficas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "zenaida-luisa-lauda-rodriguez",
    "name": "Zenaida Luisa Lauda-Rodriguez",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP / RESAMA",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP / RESAMA). Especialista em migrações climáticas, direitos humanos.",
      "en": "Axis 9 Associate Researcher (IEE-USP / RESAMA). Specialist in Migrações Climáticas, Direitos Humanos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Migrações Climáticas",
      "Direitos Humanos",
      "Deslocados"
    ],
    "regions": [
      "semiarido",
      "taquari-rs",
      "sul-amazonia"
    ],
    "hazards": [
      "floods",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-zenaida-luisa-lauda-rodriguez",
        "domain": "social_governance",
        "label": {
          "pt": "Governança e proteção jurídica de deslocados e migrantes climáticos no Brasil",
          "en": "Governança e proteção jurídica de deslocados e migrantes climáticos no Brasil"
        }
      }
    ],
    "needs": [
      {
        "id": "need-zenaida-luisa-lauda-rodriguez",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Projeções de áreas críticas de perda de habitabilidade",
          "en": "Projeções de áreas críticas de perda de habitabilidade"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ana-terra-amorim-maia",
    "name": "Ana Terra Amorim-Maia",
    "role": "associate",
    "institution": "BC3 / Colab. IEE",
    "unit": "Justiça Climática",
    "city": "Bilbao / São Paulo",
    "primaryAxis": 9,
    "secondaryAxes": [
      6
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Justiça Climática). Especialista em interseccionalidade, refúgios climáticos urbanos.",
      "en": "Axis 9 Associate Researcher (Justiça Climática). Specialist in Interseccionalidade, Refúgios Climáticos Urbanos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Interseccionalidade",
      "Refúgios Climáticos Urbanos"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-ana-terra-amorim-maia",
        "domain": "social_governance",
        "label": {
          "pt": "Desenho de refúgios climáticos urbanos com foco em gênero, raça e cuidado",
          "en": "Desenho de refúgios climáticos urbanos com foco em gênero, raça e cuidado"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ana-terra-amorim-maia",
        "domain": "health_epi",
        "label": {
          "pt": "Mapas de ilhas de calor e saúde urbana (Eixos 1 e 6)",
          "en": "Mapas de ilhas de calor e saúde urbana (Eixos 1 e 6)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "gabriela-marques-di-giulio",
    "name": "Gabriela Marques Di Giulio",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      6,
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (FSP-USP). Especialista em comunicação de risco, governança climática.",
      "en": "Axis 9 Associate Researcher (FSP-USP). Specialist in Comunicação de Risco, Governança Climática."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Comunicação de Risco",
      "Governança Climática",
      "Coprodução"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp",
      "sul-amazonia"
    ],
    "hazards": [
      "heatwaves",
      "extreme-rain-landslides",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-gabriela-marques-di-giulio",
        "domain": "social_governance",
        "label": {
          "pt": "Coprodução ciência-política, percepção de risco e adaptação em cidades brasileiras",
          "en": "Coprodução ciência-política, percepção de risco e adaptação em cidades brasileiras"
        }
      }
    ],
    "needs": [
      {
        "id": "need-gabriela-marques-di-giulio",
        "domain": "health_epi",
        "label": {
          "pt": "Sínteses de risco climático e saúde coletiva",
          "en": "Sínteses de risco climático e saúde coletiva"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "isabela-kojin-peres",
    "name": "Isabela Kojin Peres",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em governança da água, aprendizagem social.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Governança da Água, Aprendizagem Social."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança da Água",
      "Aprendizagem Social"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp"
    ],
    "hazards": [
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-isabela-kojin-peres",
        "domain": "social_governance",
        "label": {
          "pt": "Governança adaptativa da água e resolução de conflitos hídricos",
          "en": "Governança adaptativa da água e resolução de conflitos hídricos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-isabela-kojin-peres",
        "domain": "hydrology_water",
        "label": {
          "pt": "Cenários de disponibilidade hídrica",
          "en": "Cenários de disponibilidade hídrica"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leila-maria-vendrametto",
    "name": "Leila Maria Vendrametto",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      4
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em desenvolvimento territorial, agroecologia.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Desenvolvimento Territorial, Agroecologia."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Desenvolvimento Territorial",
      "Agroecologia"
    ],
    "regions": [
      "vale-ribeira",
      "cantareira-pcj"
    ],
    "hazards": [
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-leila-maria-vendrametto",
        "domain": "social_governance",
        "label": {
          "pt": "Governança territorial e sistemas agroalimentares sustentáveis",
          "en": "Governança territorial e sistemas agroalimentares sustentáveis"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leila-maria-vendrametto",
        "domain": "agro_food",
        "label": {
          "pt": "Zoneamento agroclimático para agricultura familiar",
          "en": "Zoneamento agroclimático para agricultura familiar"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leonardo-callori-kefalas",
    "name": "Leonardo Callori Kefalás",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em educação ambiental, participação.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Educação Ambiental, Participação."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Educação Ambiental",
      "Participação"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-leonardo-callori-kefalas",
        "domain": "social_governance",
        "label": {
          "pt": "Educação crítica e mobilização comunitária frente à emergência climática",
          "en": "Educação crítica e mobilização comunitária frente à emergência climática"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leonardo-callori-kefalas",
        "domain": "education_comm",
        "label": {
          "pt": "Ferramentas de ciência cidadã",
          "en": "Ferramentas de ciência cidadã"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "lucas-henrique-sandre",
    "name": "Lucas Henrique Sandre",
    "role": "associate",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (IEE-USP). Especialista em governança ambiental, políticas urbanas.",
      "en": "Axis 9 Associate Researcher (IEE-USP). Specialist in Governança Ambiental, Políticas Urbanas."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Ambiental",
      "Políticas Urbanas"
    ],
    "regions": [
      "cantareira-pcj",
      "rmsp"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-lucas-henrique-sandre",
        "domain": "social_governance",
        "label": {
          "pt": "Análise institucional de políticas de adaptação urbana e hídrica",
          "en": "Análise institucional de políticas de adaptação urbana e hídrica"
        }
      }
    ],
    "needs": [
      {
        "id": "need-lucas-henrique-sandre",
        "domain": "hydrology_water",
        "label": {
          "pt": "Indicadores de drenagem urbana",
          "en": "Indicadores de drenagem urbana"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "micaela-trimble-nunez",
    "name": "Micaela Trimble Nuñez",
    "role": "associate",
    "institution": "SARAS / Colab.",
    "unit": "Governança Costeira e Hídrica",
    "city": "Montevidéu / SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Governança Costeira e Hídrica). Especialista em co-gestão, pesca artesanal.",
      "en": "Axis 9 Associate Researcher (Governança Costeira e Hídrica). Specialist in Co-gestão, Pesca Artesanal."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Co-gestão",
      "Pesca Artesanal"
    ],
    "regions": [
      "litoral-norte-sp",
      "taquari-rs"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-micaela-trimble-nunez",
        "domain": "social_governance",
        "label": {
          "pt": "Governança participativa em zonas costeiras e bacias transfronteiriças",
          "en": "Governança participativa em zonas costeiras e bacias transfronteiriças"
        }
      }
    ],
    "needs": [
      {
        "id": "need-micaela-trimble-nunez",
        "domain": "climate_projections",
        "label": {
          "pt": "Impactos hidrometeorológicos no Atlântico Sul",
          "en": "Impactos hidrometeorológicos no Atlântico Sul"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "paulo-antonio-de-almeida-sinisgalli",
    "name": "Paulo Antonio de Almeida Sinisgalli",
    "role": "associate",
    "institution": "USP",
    "unit": "EACH / IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (EACH / IEE-USP). Especialista em economia ecológica, valoração de serviços ecossistêmicos.",
      "en": "Axis 9 Associate Researcher (EACH / IEE-USP). Specialist in Economia Ecológica, Valoração de Serviços Ecossistêmicos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia Ecológica",
      "Valoração de Serviços Ecossistêmicos"
    ],
    "regions": [
      "cantareira-pcj",
      "litoral-norte-sp",
      "paraiba-sul"
    ],
    "hazards": [
      "compound-drought",
      "floods"
    ],
    "offers": [
      {
        "id": "off-paulo-antonio-de-almeida-sinisgalli",
        "domain": "economic_modeling",
        "label": {
          "pt": "Valoração econômica de serviços ecossistêmicos hídricos e impactos de desastres",
          "en": "Valoração econômica de serviços ecossistêmicos hídricos e impactos de desastres"
        }
      }
    ],
    "needs": [
      {
        "id": "need-paulo-antonio-de-almeida-sinisgalli",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrológica de bacias (Eixo 5)",
          "en": "Modelagem hidrológica de bacias (Eixo 5)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ricardo-sartorello",
    "name": "Ricardo Sartorello",
    "role": "associate",
    "institution": "UMC / Colab. IEE",
    "unit": "Geografia & Planejamento",
    "city": "Mogi das Cruzes, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Geografia & Planejamento). Especialista em sig, planejamento ambiental.",
      "en": "Axis 9 Associate Researcher (Geografia & Planejamento). Specialist in SIG, Planejamento Ambiental."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "SIG",
      "Planejamento Ambiental",
      "Alto Tietê"
    ],
    "regions": [
      "rmsp",
      "paraiba-sul"
    ],
    "hazards": [
      "floods",
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-ricardo-sartorello",
        "domain": "geospatial_code",
        "label": {
          "pt": "Cartografia ambiental e vulnerabilidade a inundações na bacia do Alto Tietê",
          "en": "Cartografia ambiental e vulnerabilidade a inundações na bacia do Alto Tietê"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ricardo-sartorello",
        "domain": "hydrology_water",
        "label": {
          "pt": "Modelagem hidrodinâmica de cheias",
          "en": "Modelagem hidrodinâmica de cheias"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "tatiana-tucunduva-philippi-cortese",
    "name": "Tatiana Tucunduva Philippi Cortese",
    "role": "associate",
    "institution": "USP / UNINOVE",
    "unit": "Cidades Inteligentes & Clima",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (Cidades Inteligentes & Clima). Especialista em adaptação em cidades, indicadores urbanos.",
      "en": "Axis 9 Associate Researcher (Cidades Inteligentes & Clima). Specialist in Adaptação em Cidades, Indicadores Urbanos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Adaptação em Cidades",
      "Indicadores Urbanos"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves",
      "floods"
    ],
    "offers": [
      {
        "id": "off-tatiana-tucunduva-philippi-cortese",
        "domain": "social_governance",
        "label": {
          "pt": "Indicadores de sustentabilidade e planos de ação climática em municípios",
          "en": "Indicadores de sustentabilidade e planos de ação climática em municípios"
        }
      }
    ],
    "needs": [
      {
        "id": "need-tatiana-tucunduva-philippi-cortese",
        "domain": "climate_projections",
        "label": {
          "pt": "Dados climáticos e econômicos municipais",
          "en": "Dados climáticos e econômicos municipais"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "thiago-nogueira",
    "name": "Thiago Nogueira",
    "role": "associate",
    "institution": "USP",
    "unit": "FSP / IAG-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      1,
      3,
      6
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (FSP / IAG-USP). Especialista em qualidade do ar, emissões veiculares.",
      "en": "Axis 9 Associate Researcher (FSP / IAG-USP). Specialist in Qualidade do Ar, Emissões Veiculares."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Qualidade do Ar",
      "Emissões Veiculares",
      "Saúde Urbana"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-thiago-nogueira",
        "domain": "health_epi",
        "label": {
          "pt": "Monitoramento de poluentes atmosféricos, compostos orgânicos e saúde na RMSP",
          "en": "Monitoramento de poluentes atmosféricos, compostos orgânicos e saúde na RMSP"
        }
      }
    ],
    "needs": [
      {
        "id": "need-thiago-nogueira",
        "domain": "energy_grid",
        "label": {
          "pt": "Cenários de transição energética no transporte (Eixo 3)",
          "en": "Cenários de transição energética no transporte (Eixo 3)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "valter-luis-caldana-junior",
    "name": "Valter Luís Caldana Júnior",
    "role": "associate",
    "institution": "Mackenzie / Colab.",
    "unit": "FAU-Mackenzie",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (FAU-Mackenzie). Especialista em arquitetura e urbanismo, desenho urbano resiliente.",
      "en": "Axis 9 Associate Researcher (FAU-Mackenzie). Specialist in Arquitetura e Urbanismo, Desenho Urbano Resiliente."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Arquitetura e Urbanismo",
      "Desenho Urbano Resiliente"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "floods",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-valter-luis-caldana-junior",
        "domain": "social_governance",
        "label": {
          "pt": "Projetos de requalificação urbana e adaptação climática de bairros vulneráveis",
          "en": "Projetos de requalificação urbana e adaptação climática de bairros vulneráveis"
        }
      }
    ],
    "needs": [
      {
        "id": "need-valter-luis-caldana-junior",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas microclimáticos e de drenagem (Eixos 1 e 5)",
          "en": "Mapas microclimáticos e de drenagem (Eixos 1 e 5)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "victor-fernandez-nascimento",
    "name": "Victor Fernandez Nascimento",
    "role": "associate",
    "institution": "UFABC",
    "unit": "CECS-UFABC",
    "city": "Santo André, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2,
      5
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 9 (CECS-UFABC). Especialista em sensoriamento remoto, geoprocessamento.",
      "en": "Axis 9 Associate Researcher (CECS-UFABC). Specialist in Sensoriamento Remoto, Geoprocessamento."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Sensoriamento Remoto",
      "Geoprocessamento",
      "Resíduos"
    ],
    "regions": [
      "rmsp",
      "sul-amazonia",
      "taquari-rs"
    ],
    "hazards": [
      "floods",
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-victor-fernandez-nascimento",
        "domain": "geospatial_code",
        "label": {
          "pt": "Análise geoespacial por satélite de desastres, uso do solo e infraestrutura ambiental",
          "en": "Análise geoespacial por satélite de desastres, uso do solo e infraestrutura ambiental"
        }
      }
    ],
    "needs": [
      {
        "id": "need-victor-fernandez-nascimento",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Integração de mapas SAR/ópticos com os 11 eixos",
          "en": "Integração de mapas SAR/ópticos com os 11 eixos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ariaster-baumgratz-chimeli",
    "name": "Ariaster Baumgratz Chimeli",
    "role": "associate",
    "institution": "USP",
    "unit": "FEA-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 10,
    "secondaryAxes": [
      5,
      6,
      11
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 10 (FEA-USP). Especialista em economia do meio ambiente, econometria climática.",
      "en": "Axis 10 Associate Researcher (FEA-USP). Specialist in Economia do Meio Ambiente, Econometria Climática."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia do Meio Ambiente",
      "Econometria Climática"
    ],
    "regions": [
      "rmsp",
      "xingu",
      "cantareira-pcj"
    ],
    "hazards": [
      "compound-drought",
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-ariaster-baumgratz-chimeli",
        "domain": "economic_modeling",
        "label": {
          "pt": "Econometria de impactos climáticos sobre saúde, recursos hídricos e desmatamento",
          "en": "Econometria de impactos climáticos sobre saúde, recursos hídricos e desmatamento"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ariaster-baumgratz-chimeli",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries históricas e projeções climáticas municipalizadas",
          "en": "Séries históricas e projeções climáticas municipalizadas"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "paula-carvalho-pereda",
    "name": "Paula Carvalho Pereda",
    "role": "associate",
    "institution": "USP",
    "unit": "FEA-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 10,
    "secondaryAxes": [
      4,
      6
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 10 (FEA-USP). Especialista em economia da saúde e agricultura, microeconometria climática.",
      "en": "Axis 10 Associate Researcher (FEA-USP). Specialist in Economia da Saúde e Agricultura, Microeconometria Climática."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia da Saúde e Agricultura",
      "Microeconometria Climática"
    ],
    "regions": [
      "rmsp",
      "cerrado-sp-co",
      "semiarido"
    ],
    "hazards": [
      "heatwaves",
      "crop-shock",
      "health-vectors"
    ],
    "offers": [
      {
        "id": "off-paula-carvalho-pereda",
        "domain": "economic_modeling",
        "label": {
          "pt": "Quantificação econômica de choques climáticos na produtividade agrícola, trabalho e saúde",
          "en": "Quantificação econômica de choques climáticos na produtividade agrícola, trabalho e saúde"
        }
      }
    ],
    "needs": [
      {
        "id": "need-paula-carvalho-pereda",
        "domain": "health_epi",
        "label": {
          "pt": "Projeções físicas CMIP (Eixo 1) e dados epidemiológicos (Eixo 6)",
          "en": "Projeções físicas CMIP (Eixo 1) e dados epidemiológicos (Eixo 6)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "diego-oliveira-brandao",
    "name": "Diego Oliveira Brandão",
    "role": "associate",
    "institution": "Amazônia 4.0 / IEA",
    "unit": "Instituto Amazônia 4.0",
    "city": "São Paulo, SP / Belém, PA",
    "primaryAxis": 11,
    "secondaryAxes": [
      1,
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 11 (Instituto Amazônia 4.0). Especialista em restauração florestal, carbono florestal.",
      "en": "Axis 11 Associate Researcher (Instituto Amazônia 4.0). Specialist in Restauração Florestal, Carbono Florestal."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Restauração Florestal",
      "Carbono Florestal",
      "Bioeconomia"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-diego-oliveira-brandao",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Restauração ecológica produtiva, sistemas agroflorestais e balanço de carbono na Amazônia",
          "en": "Restauração ecológica produtiva, sistemas agroflorestais e balanço de carbono na Amazônia"
        }
      }
    ],
    "needs": [
      {
        "id": "need-diego-oliveira-brandao",
        "domain": "climate_projections",
        "label": {
          "pt": "Projeções hidroclimáticas para áreas de restauração (Eixo 1)",
          "en": "Projeções hidroclimáticas para áreas de restauração (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "francisco-de-assis-costa",
    "name": "Francisco de Assis Costa",
    "role": "associate",
    "institution": "UFPA",
    "unit": "NAEA-UFPA",
    "city": "Belém, PA",
    "primaryAxis": 11,
    "secondaryAxes": [
      4,
      10
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 11 (NAEA-UFPA). Especialista em economia agrária amazônica, sistemas bioeconômicos.",
      "en": "Axis 11 Associate Researcher (NAEA-UFPA). Specialist in Economia Agrária Amazônica, Sistemas Bioeconômicos."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia Agrária Amazônica",
      "Sistemas Bioeconômicos"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-francisco-de-assis-costa",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Contabilidade social e economia política das cadeias da bioeconomia camponesa e florestal",
          "en": "Contabilidade social e economia política das cadeias da bioeconomia camponesa e florestal"
        }
      }
    ],
    "needs": [
      {
        "id": "need-francisco-de-assis-costa",
        "domain": "economic_modeling",
        "label": {
          "pt": "Integração com matrizes insumo-produto nacionais (Eixo 10)",
          "en": "Integração com matrizes insumo-produto nacionais (Eixo 10)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "lauro-euclides-soares-barata",
    "name": "Lauro Euclides Soares Barata",
    "role": "associate",
    "institution": "UFOPA / UNICAMP",
    "unit": "Química de Produtos Naturais",
    "city": "Santarém, PA",
    "primaryAxis": 11,
    "secondaryAxes": [
      8
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 11 (Química de Produtos Naturais). Especialista em fitoquímica amazônica, óleos e ativos da biodiversidade.",
      "en": "Axis 11 Associate Researcher (Química de Produtos Naturais). Specialist in Fitoquímica Amazônica, Óleos e Ativos da Biodiversidade."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Fitoquímica Amazônica",
      "Óleos e Ativos da Biodiversidade"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-lauro-euclides-soares-barata",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Desenvolvimento tecnológico de bioprodutos de alto valor da floresta amazônica em pé",
          "en": "Desenvolvimento tecnológico de bioprodutos de alto valor da floresta amazônica em pé"
        }
      }
    ],
    "needs": [
      {
        "id": "need-lauro-euclides-soares-barata",
        "domain": "energy_grid",
        "label": {
          "pt": "Energia solar limpa para biofábricas comunitárias (Eixo 3)",
          "en": "Energia solar limpa para biofábricas comunitárias (Eixo 3)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "luciana-cristina-de-sousa-vieira",
    "name": "Luciana Cristina de Sousa Vieira",
    "role": "associate",
    "institution": "IEA-USP / Amazônia 4.0",
    "unit": "Amazônia 4.0",
    "city": "São Paulo, SP / PA",
    "primaryAxis": 11,
    "secondaryAxes": [
      7,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 11 (Amazônia 4.0). Especialista em capacitação comunitária, biofábricas amazônia 4.0.",
      "en": "Axis 11 Associate Researcher (Amazônia 4.0). Specialist in Capacitação Comunitária, Biofábricas Amazônia 4.0."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Capacitação Comunitária",
      "Biofábricas Amazônia 4.0"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-luciana-cristina-de-sousa-vieira",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Formação sociotécnica e governança local com comunidades indígenas e extrativistas",
          "en": "Formação sociotécnica e governança local com comunidades indígenas e extrativistas"
        }
      }
    ],
    "needs": [
      {
        "id": "need-luciana-cristina-de-sousa-vieira",
        "domain": "education_comm",
        "label": {
          "pt": "Metodologias educativas e comunicação intercultural (Eixo 7)",
          "en": "Metodologias educativas e comunicação intercultural (Eixo 7)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "nathalia-cristina-costa-do-nascimento",
    "name": "Nathalia Cristina Costa do Nascimento",
    "role": "associate",
    "institution": "IEA-USP / Amazônia 4.0",
    "unit": "Amazônia 4.0",
    "city": "São Paulo, SP / PA",
    "primaryAxis": 11,
    "secondaryAxes": [
      4,
      9
    ],
    "bio": {
      "pt": "Pesquisador(a) Associado(a) do Eixo 11 (Amazônia 4.0). Especialista em geoprocessamento amazônico, cadeias produtivas.",
      "en": "Axis 11 Associate Researcher (Amazônia 4.0). Specialist in Geoprocessamento Amazônico, Cadeias Produtivas."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Geoprocessamento Amazônico",
      "Cadeias Produtivas"
    ],
    "regions": [
      "xingu",
      "sul-amazonia"
    ],
    "hazards": [
      "amazon-tipping",
      "compound-drought"
    ],
    "offers": [
      {
        "id": "off-nathalia-cristina-costa-do-nascimento",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Mapeamento espacial de cadeias da sociobiodiversidade e vulnerabilidade climática na Amazônia",
          "en": "Mapeamento espacial de cadeias da sociobiodiversidade e vulnerabilidade climática na Amazônia"
        }
      }
    ],
    "needs": [
      {
        "id": "need-nathalia-cristina-costa-do-nascimento",
        "domain": "climate_projections",
        "label": {
          "pt": "Recortes climáticos CMIP7 para territórios amazônicos (Eixo 1)",
          "en": "Recortes climáticos CMIP7 para territórios amazônicos (Eixo 1)"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "caroline-santos-segura",
    "name": "Caroline Santos Segura",
    "role": "phd",
    "institution": "USP",
    "unit": "IAG / IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 1,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Integrante do Eixo 1 (IAG / IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 1 (IAG / IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Meteorologia",
      "Extremos"
    ],
    "regions": [
      "rmsp",
      "litoral-norte-sp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-caroline-santos-segura",
        "domain": "climate_projections",
        "label": {
          "pt": "Análise de eventos extremos de precipitação",
          "en": "Análise de eventos extremos de precipitação"
        }
      }
    ],
    "needs": [
      {
        "id": "need-caroline-santos-segura",
        "domain": "hydrology_water",
        "label": {
          "pt": "Impactos hidrológicos",
          "en": "Impactos hidrológicos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jose-adolfo-de-almeida-schultz",
    "name": "José Adolfo de Almeida Schultz",
    "role": "phd",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 3,
    "secondaryAxes": [
      8
    ],
    "bio": {
      "pt": "Integrante do Eixo 3 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 3 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Transição Energética",
      "Sistemas Elétricos"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-jose-adolfo-de-almeida-schultz",
        "domain": "energy_grid",
        "label": {
          "pt": "Pesquisa em sistemas energéticos e descarbonização",
          "en": "Pesquisa em sistemas energéticos e descarbonização"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jose-adolfo-de-almeida-schultz",
        "domain": "climate_projections",
        "label": {
          "pt": "Cenários climáticos",
          "en": "Cenários climáticos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "jose-roberto-amaro-mantovani",
    "name": "José Roberto Amaro Mantovani",
    "role": "phd",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      7
    ],
    "bio": {
      "pt": "Integrante do Eixo 9 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 9 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Governança Ambiental",
      "Políticas Públicas"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-jose-roberto-amaro-mantovani",
        "domain": "social_governance",
        "label": {
          "pt": "Pesquisa em governança e adaptação climática local",
          "en": "Pesquisa em governança e adaptação climática local"
        }
      }
    ],
    "needs": [
      {
        "id": "need-jose-roberto-amaro-mantovani",
        "domain": "hydrology_water",
        "label": {
          "pt": "Mapas de risco hídrico",
          "en": "Mapas de risco hídrico"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "paulo-sergio-da-silva-junior",
    "name": "Paulo Sergio da Silva Júnior",
    "role": "phd",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 8,
    "secondaryAxes": [
      3
    ],
    "bio": {
      "pt": "Integrante do Eixo 8 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 8 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Inovação Climática",
      "CCUS"
    ],
    "regions": [
      "cerrado-sp-co"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-paulo-sergio-da-silva-junior",
        "domain": "climate_innovation",
        "label": {
          "pt": "Pesquisa em tecnologias de mitigação e captura de carbono",
          "en": "Pesquisa em tecnologias de mitigação e captura de carbono"
        }
      }
    ],
    "needs": [
      {
        "id": "need-paulo-sergio-da-silva-junior",
        "domain": "agro_food",
        "label": {
          "pt": "Dados de biomassa",
          "en": "Dados de biomassa"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "stephanie-san-martin-cana-janowsky",
    "name": "Stephanie San Martin Caña Janowsky",
    "role": "phd",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      2
    ],
    "bio": {
      "pt": "Integrante do Eixo 9 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 9 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Justiça Climática",
      "Risco"
    ],
    "regions": [
      "litoral-norte-sp",
      "rmsp"
    ],
    "hazards": [
      "extreme-rain-landslides"
    ],
    "offers": [
      {
        "id": "off-stephanie-san-martin-cana-janowsky",
        "domain": "social_governance",
        "label": {
          "pt": "Adaptação comunitária e vulnerabilidade socioambiental",
          "en": "Adaptação comunitária e vulnerabilidade socioambiental"
        }
      }
    ],
    "needs": [
      {
        "id": "need-stephanie-san-martin-cana-janowsky",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Mapas de suscetibilidade",
          "en": "Mapas de suscetibilidade"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "ligia-amoroso-galbiati",
    "name": "Lígia Amoroso Galbiati",
    "role": "postdoc",
    "institution": "USP",
    "unit": "IEE / PROCAM-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      4,
      11
    ],
    "bio": {
      "pt": "Integrante do Eixo 9 (IEE / PROCAM-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 9 (IEE / PROCAM-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Comunidades Tradicionais",
      "Agroecologia"
    ],
    "regions": [
      "vale-ribeira",
      "xingu"
    ],
    "hazards": [
      "floods",
      "crop-shock"
    ],
    "offers": [
      {
        "id": "off-ligia-amoroso-galbiati",
        "domain": "social_governance",
        "label": {
          "pt": "Resiliência comunitária, sistemas alimentares e governança territorial",
          "en": "Resiliência comunitária, sistemas alimentares e governança territorial"
        }
      }
    ],
    "needs": [
      {
        "id": "need-ligia-amoroso-galbiati",
        "domain": "agro_food",
        "label": {
          "pt": "Projeções agroclimáticas locais",
          "en": "Projeções agroclimáticas locais"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "giovana-cioffi-nascimento",
    "name": "Giovana Cioffi Nascimento",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Integrante do Eixo 7 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 7 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Difusão Científica",
      "Educação Climática"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-giovana-cioffi-nascimento",
        "domain": "education_comm",
        "label": {
          "pt": "Apoio à produção de materiais de educação e divulgação científica",
          "en": "Apoio à produção de materiais de educação e divulgação científica"
        }
      }
    ],
    "needs": [
      {
        "id": "need-giovana-cioffi-nascimento",
        "domain": "education_comm",
        "label": {
          "pt": "Sínteses dos 11 eixos",
          "en": "Sínteses dos 11 eixos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "giovanna-pereira-rosseto",
    "name": "Giovanna Pereira Rosseto",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      1
    ],
    "bio": {
      "pt": "Integrante do Eixo 7 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 7 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Comunicação Científica",
      "Mídias"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-giovanna-pereira-rosseto",
        "domain": "education_comm",
        "label": {
          "pt": "Divulgação científica das pesquisas do CLIMARES",
          "en": "Divulgação científica das pesquisas do CLIMARES"
        }
      }
    ],
    "needs": [
      {
        "id": "need-giovanna-pereira-rosseto",
        "domain": "education_comm",
        "label": {
          "pt": "Resultados e gráficos dos eixos",
          "en": "Resultados e gráficos dos eixos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "leticia-stevanato-rodrigues",
    "name": "Leticia Stevanato Rodrigues",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 9,
    "secondaryAxes": [
      5
    ],
    "bio": {
      "pt": "Integrante do Eixo 9 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 9 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Gestão Ambiental",
      "Governança"
    ],
    "regions": [
      "rmsp",
      "cantareira-pcj"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-leticia-stevanato-rodrigues",
        "domain": "social_governance",
        "label": {
          "pt": "Levantamento de políticas municipais de adaptação",
          "en": "Levantamento de políticas municipais de adaptação"
        }
      }
    ],
    "needs": [
      {
        "id": "need-leticia-stevanato-rodrigues",
        "domain": "extreme_hazards",
        "label": {
          "pt": "Indicadores de risco",
          "en": "Indicadores de risco"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "mariana-urretarazu-de-freitas",
    "name": "Mariana Urretarazu de Freitas",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 6,
    "secondaryAxes": [
      1
    ],
    "bio": {
      "pt": "Integrante do Eixo 6 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 6 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Saúde Ambiental",
      "Clima Urbano"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "heatwaves"
    ],
    "offers": [
      {
        "id": "off-mariana-urretarazu-de-freitas",
        "domain": "health_epi",
        "label": {
          "pt": "Apoio à pesquisa em ondas de calor e saúde urbana",
          "en": "Apoio à pesquisa em ondas de calor e saúde urbana"
        }
      }
    ],
    "needs": [
      {
        "id": "need-mariana-urretarazu-de-freitas",
        "domain": "climate_projections",
        "label": {
          "pt": "Séries de temperatura",
          "en": "Séries de temperatura"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "melina-murgel",
    "name": "Melina Murgel",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 11,
    "secondaryAxes": [
      9
    ],
    "bio": {
      "pt": "Integrante do Eixo 11 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 11 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Bioeconomia",
      "Sustentabilidade"
    ],
    "regions": [
      "xingu"
    ],
    "hazards": [
      "amazon-tipping"
    ],
    "offers": [
      {
        "id": "off-melina-murgel",
        "domain": "amazon_bioeconomy",
        "label": {
          "pt": "Pesquisa em cadeias sustentáveis e Amazônia",
          "en": "Pesquisa em cadeias sustentáveis e Amazônia"
        }
      }
    ],
    "needs": [
      {
        "id": "need-melina-murgel",
        "domain": "geospatial_code",
        "label": {
          "pt": "Mapas territoriais",
          "en": "Mapas territoriais"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "stefano-teixeira-lopes",
    "name": "Stéfano Teixeira Lopes",
    "role": "ic",
    "institution": "USP",
    "unit": "IEE-USP",
    "city": "São Paulo, SP",
    "primaryAxis": 10,
    "secondaryAxes": [
      3
    ],
    "bio": {
      "pt": "Integrante do Eixo 10 (IEE-USP) no CEPID CLIMARES.",
      "en": "Member of Axis 10 (IEE-USP) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Economia do Clima",
      "Transição"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-stefano-teixeira-lopes",
        "domain": "economic_modeling",
        "label": {
          "pt": "Levantamento de indicadores econômicos e energéticos",
          "en": "Levantamento de indicadores econômicos e energéticos"
        }
      }
    ],
    "needs": [
      {
        "id": "need-stefano-teixeira-lopes",
        "domain": "energy_grid",
        "label": {
          "pt": "Séries de energia",
          "en": "Séries de energia"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "camila-da-cunha-lopes",
    "name": "Camila da Cunha Lopes",
    "role": "tech",
    "institution": "USP",
    "unit": "IEE-USP (Sede CLIMARES)",
    "city": "São Paulo, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      1,
      9
    ],
    "bio": {
      "pt": "Integrante do Eixo 7 (IEE-USP (Sede CLIMARES)) no CEPID CLIMARES.",
      "en": "Member of Axis 7 (IEE-USP (Sede CLIMARES)) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Gestão CEPID",
      "Administração FAPESP"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "floods"
    ],
    "offers": [
      {
        "id": "off-camila-da-cunha-lopes",
        "domain": "education_comm",
        "label": {
          "pt": "Apoio administrativo, relatórios institucionais e eventos do CEPID CLIMARES",
          "en": "Apoio administrativo, relatórios institucionais e eventos do CEPID CLIMARES"
        }
      }
    ],
    "needs": [
      {
        "id": "need-camila-da-cunha-lopes",
        "domain": "education_comm",
        "label": {
          "pt": "Atualização de produção científica dos 11 eixos",
          "en": "Atualização de produção científica dos 11 eixos"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  },
  {
    "id": "marcelo-eduardo-dias-de-oliveira",
    "name": "Marcelo Eduardo Dias de Oliveira",
    "role": "tech",
    "institution": "USP",
    "unit": "IEE-USP (Sede CLIMARES)",
    "city": "São Paulo, SP",
    "primaryAxis": 7,
    "secondaryAxes": [
      1,
      3
    ],
    "bio": {
      "pt": "Integrante do Eixo 7 (IEE-USP (Sede CLIMARES)) no CEPID CLIMARES.",
      "en": "Member of Axis 7 (IEE-USP (Sede CLIMARES)) at CEPID CLIMARES."
    },
    "lattesUrl": "http://lattes.cnpq.br/",
    "methods": [
      "Gestão de Projetos",
      "Apoio Técnico"
    ],
    "regions": [
      "rmsp"
    ],
    "hazards": [
      "energy-stress"
    ],
    "offers": [
      {
        "id": "off-marcelo-eduardo-dias-de-oliveira",
        "domain": "education_comm",
        "label": {
          "pt": "Suporte administrativo e operacional aos projetos e laboratórios do CLIMARES",
          "en": "Suporte administrativo e operacional aos projetos e laboratórios do CLIMARES"
        }
      }
    ],
    "needs": [
      {
        "id": "need-marcelo-eduardo-dias-de-oliveira",
        "domain": "education_comm",
        "label": {
          "pt": "Demandas logísticas e de equipamentos multiusuários",
          "en": "Demandas logísticas e de equipamentos multiusuários"
        }
      }
    ],
    "availability": [
      "coauthor"
    ],
    "publications": []
  }
];

export const SEED_EDGES: CollaborationEdge[] = [
  {
    "id": "e1",
    "source": "tercio-ambrizzi",
    "target": "rosmeri-rocha",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Modelagem Climática Regional (E01)",
      "en": "Regional Climate Modeling (E01)"
    }
  },
  {
    "id": "e2",
    "source": "tercio-ambrizzi",
    "target": "ilana-wainer",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "Coordenação Eixo 1",
      "en": "Axis 1 Coordination"
    }
  },
  {
    "id": "e3",
    "source": "tercio-ambrizzi",
    "target": "cristiano-chiessi",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "Variabilidade Climática",
      "en": "Climate Variability"
    }
  },
  {
    "id": "e4",
    "source": "rosmeri-rocha",
    "target": "marcelo-camargo",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "CMIP7 & Extremos América do Sul",
      "en": "CMIP7 & South American Extremes"
    }
  },
  {
    "id": "e5",
    "source": "tercio-ambrizzi",
    "target": "marcelo-camargo",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "Hidroclima Xingu & CMIP7",
      "en": "Xingu Hydroclimate & CMIP7"
    }
  },
  {
    "id": "e6",
    "source": "rosmeri-rocha",
    "target": "michelle-simoes-reboita",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Downscaling RegCM & Ciclones",
      "en": "RegCM Downscaling & Cyclones"
    }
  },
  {
    "id": "e7",
    "source": "rosmeri-rocha",
    "target": "luiz-felippe-gozzo",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Tempestades Severas WRF",
      "en": "Severe Storms WRF"
    }
  },
  {
    "id": "e8",
    "source": "tercio-ambrizzi",
    "target": "amanda-rehbein",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Sistemas Convectivos na Amazônia",
      "en": "Amazon Mesoscale Convective Systems"
    }
  },
  {
    "id": "e9",
    "source": "jose-marengo",
    "target": "chou-sin-chan",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Coordenação Eixo 2 (CEMADEN/INPE)",
      "en": "Axis 2 Coordination"
    }
  },
  {
    "id": "e10",
    "source": "jose-marengo",
    "target": "ana-paula-martins-do-amaral-cunha",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Monitoramento de Secas no Brasil",
      "en": "Drought Monitoring in Brazil"
    }
  },
  {
    "id": "e11",
    "source": "jose-marengo",
    "target": "javier-tomasella",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Hidrologia Amazônica e Secas",
      "en": "Amazon Hydrology & Droughts"
    }
  },
  {
    "id": "e12",
    "source": "jose-marengo",
    "target": "victor-marchezini",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Alertas Precoces e Desastres",
      "en": "Early Warnings & Disasters"
    }
  },
  {
    "id": "e13",
    "source": "ildo-sauer",
    "target": "roberto-zilles",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Coordenação Eixo 3 (IEE-USP)",
      "en": "Axis 3 Coordination"
    }
  },
  {
    "id": "e14",
    "source": "roberto-zilles",
    "target": "marcelo-pinho-almeida",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Sistemas Fotovoltaicos IEE-USP",
      "en": "Solar PV Systems IEE-USP"
    }
  },
  {
    "id": "e15",
    "source": "jurandir-zullo",
    "target": "eduardo-delgado-assad",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Zoneamento Agrícola (ZARC)",
      "en": "Agricultural Risk Zoning (ZARC)"
    }
  },
  {
    "id": "e16",
    "source": "eduardo-mendiondo",
    "target": "maria-do-carmo-calijuri",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Segurança Hídrica EESC-USP",
      "en": "Water Security EESC-USP"
    }
  },
  {
    "id": "e17",
    "source": "eduardo-mendiondo",
    "target": "marina-batalini-de-macedo",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Soluções Baseadas na Natureza",
      "en": "Nature-Based Solutions"
    }
  },
  {
    "id": "e18",
    "source": "claudia-moreno",
    "target": "adelaide-cassia-nardocci",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Saúde Ambiental FSP-USP",
      "en": "Environmental Health FSP-USP"
    }
  },
  {
    "id": "e19",
    "source": "claudia-moreno",
    "target": "francisco-chiaravalloti-neto",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "Clima, Calor e Arboviroses (E06)",
      "en": "Climate, Heat & Arboviruses"
    }
  },
  {
    "id": "e20",
    "source": "leila-ferreira",
    "target": "sonia-regina-da-cal-seixas",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Sociologia Ambiental NEPAM-UNICAMP",
      "en": "Environmental Sociology NEPAM"
    }
  },
  {
    "id": "e21",
    "source": "colombo-tassinari",
    "target": "lucy-gomes-sant-anna",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Armazenamento Geológico de CO2 (E08)",
      "en": "Geological CO2 Storage"
    }
  },
  {
    "id": "e22",
    "source": "pedro-jacobi",
    "target": "leandro-luiz-giatti",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Governança & Nexo Água-Saúde",
      "en": "Governance & Water-Health Nexus"
    }
  },
  {
    "id": "e23",
    "source": "pedro-jacobi",
    "target": "gabriela-marques-di-giulio",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Adaptação Climática em Cidades",
      "en": "Urban Climate Adaptation"
    }
  },
  {
    "id": "e24",
    "source": "pedro-jacobi",
    "target": "pedro-henrique-campello-torres",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Justiça Climática Urbana",
      "en": "Urban Climate Justice"
    }
  },
  {
    "id": "e25",
    "source": "eduardo-haddad",
    "target": "paula-carvalho-pereda",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Economia das Mudanças Climáticas (FEA)",
      "en": "Climate Change Economics (FEA)"
    }
  },
  {
    "id": "e26",
    "source": "eduardo-haddad",
    "target": "ariaster-baumgratz-chimeli",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Economia Ambiental FEA-USP",
      "en": "Environmental Economics FEA-USP"
    }
  },
  {
    "id": "e27",
    "source": "carlos-nobre",
    "target": "diego-oliveira-brandao",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Amazônia 4.0 & Restauração",
      "en": "Amazonia 4.0 & Restoration"
    }
  },
  {
    "id": "e28",
    "source": "carlos-nobre",
    "target": "lauro-euclides-soares-barata",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Biofábricas Amazônia 4.0",
      "en": "Amazonia 4.0 Biofactories"
    }
  },
  {
    "id": "x1",
    "source": "tercio-ambrizzi",
    "target": "jose-marengo",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Coordenação Geral CLIMARES (E01↔E02)",
      "en": "CLIMARES Coordination (E01↔E02)"
    }
  },
  {
    "id": "x2",
    "source": "tercio-ambrizzi",
    "target": "carlos-nobre",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Clima & Amazônia (E01↔E11)",
      "en": "Climate & Amazon (E01↔E11)"
    }
  },
  {
    "id": "x3",
    "source": "tercio-ambrizzi",
    "target": "pedro-jacobi",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Governança Climática USP (E01↔E09)",
      "en": "USP Climate Governance (E01↔E09)"
    }
  },
  {
    "id": "x4",
    "source": "cristiano-chiessi",
    "target": "carlos-nobre",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Hidroclima da Amazônia (E01↔E11)",
      "en": "Amazon Hydroclimate (E01↔E11)"
    }
  },
  {
    "id": "x5",
    "source": "jose-marengo",
    "target": "eduardo-mendiondo",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Desastres Hidrológicos (E02↔E05)",
      "en": "Hydrological Disasters (E02↔E05)"
    }
  },
  {
    "id": "x6",
    "source": "eduardo-mendiondo",
    "target": "pedro-jacobi",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Governança da Água (E05↔E09)",
      "en": "Water Governance (E05↔E09)"
    }
  },
  {
    "id": "x7",
    "source": "pedro-jacobi",
    "target": "leila-ferreira",
    "kind": "coauthored",
    "weight": 5,
    "label": {
      "pt": "Políticas e Difusão (E09↔E07)",
      "en": "Policy & Dissemination (E09↔E07)"
    }
  },
  {
    "id": "x8",
    "source": "jose-marengo",
    "target": "eduardo-haddad",
    "kind": "project",
    "weight": 3,
    "label": {
      "pt": "Impactos Econômicos de Desastres (E02↔E10)",
      "en": "Disaster Economic Impacts (E02↔E10)"
    }
  },
  {
    "id": "x9",
    "source": "ildo-sauer",
    "target": "colombo-tassinari",
    "kind": "project",
    "weight": 4,
    "label": {
      "pt": "Energia & CCUS IEE-USP (E03↔E08)",
      "en": "Energy & CCUS IEE-USP (E03↔E08)"
    }
  },
  {
    "id": "x10",
    "source": "jurandir-zullo",
    "target": "jose-marengo",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Secas e Risco Agrícola (E04↔E02)",
      "en": "Droughts & Crop Risk (E04↔E02)"
    }
  },
  {
    "id": "x11",
    "source": "eduardo-delgado-assad",
    "target": "carlos-nobre",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Agropecuária & Amazônia (E04↔E11)",
      "en": "Agriculture & Amazon (E04↔E11)"
    }
  },
  {
    "id": "x12",
    "source": "leandro-luiz-giatti",
    "target": "claudia-moreno",
    "kind": "coauthored",
    "weight": 4,
    "label": {
      "pt": "Saúde Ambiental FSP-USP (E09↔E06)",
      "en": "Environmental Health FSP-USP (E09↔E06)"
    }
  }
];

export const SEED_FORUM_THREADS: ForumThread[] = [
  {
    "id": "th-general-1",
    "folderId": "general",
    "title": "Bem-vindos ao Hub CLIMARES — Como conectar seu grupo com os demais Eixos",
    "authorId": "tercio-ambrizzi",
    "createdAt": "18 Nov 2026",
    "body": "Colegas dos 11 Eixos, criamos este espaço para facilitar o contato direto entre pesquisadores da USP, UNICAMP, CEMADEN, INPE e instituições parceiras. Usem as pastas de cada eixo ou esta pasta geral para propor artigos conjuntos e compartilhar bases de dados.",
    "tags": [
      "Integração",
      "11 Eixos"
    ],
    "pinned": true,
    "replies": [
      {
        "id": "rep-1",
        "authorId": "jose-marengo",
        "createdAt": "18 Nov 2026",
        "body": "Excelente iniciativa, Tércio. O Eixo 2 (CEMADEN/INPE) já disponibilizou os recortes de eventos extremos no Litoral Norte e RS para cruzamento com os Eixos 5, 6, 9 e 10."
      },
      {
        "id": "rep-2",
        "authorId": "pedro-jacobi",
        "createdAt": "19 Nov 2026",
        "body": "No Eixo 9 temos grande interesse em cruzar as manchas de risco físico com nossos mapeamentos participativos na Grande SP e Litoral Norte."
      }
    ]
  },
  {
    "id": "th-general-2",
    "folderId": "general",
    "title": "Padronização de recortes CMIP7 / CMIP6 para todos os 11 Eixos",
    "authorId": "marcelo-camargo",
    "createdAt": "19 Nov 2026",
    "body": "Pessoal, para evitar que cada grupo baixe terabytes de NetCDF separadamente, o portal CMIP7 Area Explorer já permite selecionar a bacia ou estado e gerar scripts prontos de download (ESGF-NG). Quem precisar de séries diárias para Saúde, Hidrologia, Agricultura ou Economia pode responder aqui com as variáveis desejadas.",
    "tags": [
      "CMIP7",
      "Dados Climáticos"
    ],
    "replies": [
      {
        "id": "rep-3",
        "authorId": "claudia-moreno",
        "createdAt": "19 Nov 2026",
        "body": "Marcelo, para o Eixo 6 (Saúde) precisamos muito de temperatura mínima noturna e umidade relativa na RMSP para os modelos de estresse térmico."
      }
    ]
  },
  {
    "id": "th-admin-1",
    "folderId": "admin",
    "title": "Cronograma do Relatório Científico Anual FAPESP (Processo 2024/00949-5)",
    "authorId": "camila-da-cunha-lopes",
    "createdAt": "15 Nov 2026",
    "body": "Lembramos a todos os Pesquisadores Principais e Associados que o levantamento de publicações, bolsas em andamento e parcerias inter-eixos para o relatório anual da FAPESP deve ser atualizado junto à secretaria do CLIMARES (climares@iee.usp.br).",
    "tags": [
      "FAPESP",
      "Relatório Anual"
    ],
    "pinned": true,
    "replies": []
  },
  {
    "id": "th-admin-2",
    "folderId": "admin",
    "title": "Uso de Equipamentos Multiusuários e Reserva de Salas no IEE-USP",
    "authorId": "marcelo-eduardo-dias-de-oliveira",
    "createdAt": "16 Nov 2026",
    "body": "O catálogo de equipamentos multiusuários do CLIMARES e o agendamento de espaços para oficinas presenciais na sede (IEE-USP) estão disponíveis mediante solicitação à equipe administrativa.",
    "tags": [
      "Infraestrutura",
      "IEE-USP"
    ],
    "replies": []
  },
  {
    "id": "th-ax1",
    "folderId": "axis-1",
    "title": "Simulações RegCM5/WRF e CMIP7 para extremos no Sudeste e Bacia do Xingu",
    "authorId": "rosmeri-rocha",
    "createdAt": "17 Nov 2026",
    "body": "Estamos organizando os conjuntos de simulações regionais de alta resolução do Eixo 1 para disponibilizar aos grupos de recursos hídricos, energia e desastres.",
    "tags": [
      "RegCM5",
      "CMIP7"
    ],
    "replies": []
  },
  {
    "id": "th-ax2",
    "folderId": "axis-2",
    "title": "Limiares de chuva-deslizamento na Serra do Mar e alertas comunitários",
    "authorId": "chou-sin-chan",
    "createdAt": "17 Nov 2026",
    "body": "Discussão sobre acoplamento das previsões do modelo Eta com os limiares geotécnicos do CEMADEN/IPT no Litoral Norte de SP.",
    "tags": [
      "Alertas",
      "Serra do Mar"
    ],
    "replies": []
  },
  {
    "id": "th-ax3",
    "folderId": "axis-3",
    "title": "Microrredes solares para infraestrutura crítica e comunidades isoladas",
    "authorId": "roberto-zilles",
    "createdAt": "17 Nov 2026",
    "body": "Levantamento de locais prioritários para estudos de resiliência elétrica com geração solar fotovoltaica e armazenamento.",
    "tags": [
      "Fotovoltaica",
      "Microrredes"
    ],
    "replies": []
  },
  {
    "id": "th-ax4",
    "folderId": "axis-4",
    "title": "Impactos de ondas de calor e veranicos em safras paulistas e Cerrado",
    "authorId": "jurandir-zullo",
    "createdAt": "17 Nov 2026",
    "body": "Atualização dos indicadores de risco agroclimático (ZARC) frente aos novos cenários de extremos térmicos e hídricos.",
    "tags": [
      "ZARC",
      "Segurança Alimentar"
    ],
    "replies": []
  },
  {
    "id": "th-ax5",
    "folderId": "axis-5",
    "title": "Soluções Baseadas na Natureza (SbN) e segurança hídrica no Cantareira/PCJ",
    "authorId": "eduardo-mendiondo",
    "createdAt": "18 Nov 2026",
    "body": "Articulação dos modelos hidrológicos da EESC-USP com comitês de bacia e municípios.",
    "tags": [
      "Hidrologia",
      "Cantareira"
    ],
    "replies": []
  },
  {
    "id": "th-ax6",
    "folderId": "axis-6",
    "title": "Estresse térmico ocupacional e expansão da dengue em São Paulo",
    "authorId": "claudia-moreno",
    "createdAt": "18 Nov 2026",
    "body": "Integrando bases do DATASUS/SINAN com séries de ondas de calor e projeções climáticas na FSP-USP.",
    "tags": [
      "Saúde Pública",
      "Calor"
    ],
    "replies": []
  },
  {
    "id": "th-ax7",
    "folderId": "axis-7",
    "title": "Policy Briefs e formação de professores com resultados dos 11 Eixos",
    "authorId": "leila-ferreira",
    "createdAt": "18 Nov 2026",
    "body": "Chamada para que cada eixo indique 1 resultado prático para transformarmos em Policy Brief e material para escolas públicas.",
    "tags": [
      "Policy Briefs",
      "Educação"
    ],
    "replies": []
  },
  {
    "id": "th-ax8",
    "folderId": "axis-8",
    "title": "Potencial de BECCS/CCUS no setor sucroenergético paulista",
    "authorId": "colombo-tassinari",
    "createdAt": "18 Nov 2026",
    "body": "Mapeamento de reservatórios geológicos na Bacia do Paraná próximos a fontes de CO2 biogênico.",
    "tags": [
      "CCUS",
      "BECCS"
    ],
    "replies": []
  },
  {
    "id": "th-ax9",
    "folderId": "axis-9",
    "title": "Justiça climática e governança participativa no Litoral Norte e RMSP",
    "authorId": "pedro-jacobi",
    "createdAt": "18 Nov 2026",
    "body": "Oficinas e pesquisa-ação com municípios e comunidades vulneráveis a eventos extremos.",
    "tags": [
      "Governança",
      "Justiça Climática"
    ],
    "replies": []
  },
  {
    "id": "th-ax10",
    "folderId": "axis-10",
    "title": "Matriz inter-regional (IIOA) para quantificar perdas econômicas de desastres",
    "authorId": "eduardo-haddad",
    "createdAt": "18 Nov 2026",
    "body": "No NEREUS (FEA-USP) estamos calibrando choques setoriais e regionais a partir das manchas físicas de inundação e seca.",
    "tags": [
      "CGE",
      "Impacto Econômico"
    ],
    "replies": []
  },
  {
    "id": "th-ax11",
    "folderId": "axis-11",
    "title": "Laboratórios Criativos Amazônia 4.0 e resiliência climática no Xingu",
    "authorId": "carlos-nobre",
    "createdAt": "18 Nov 2026",
    "body": "Integração entre biofábricas da sociobiodiversidade, restauração florestal e cenários climáticos na Amazônia.",
    "tags": [
      "Amazônia 4.0",
      "Bioeconomia"
    ],
    "replies": []
  }
];
