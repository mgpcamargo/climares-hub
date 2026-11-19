import { AxisId, CapabilityDomain, CareerRole, Researcher } from '../types';

const VALID_ROLES: CareerRole[] = [
  'coordinator',
  'pi',
  'associate',
  'postdoc',
  'phd',
  'msc',
  'ic',
  'tech',
];

const VALID_DOMAINS: CapabilityDomain[] = [
  'climate_projections',
  'extreme_hazards',
  'hydrology_water',
  'energy_grid',
  'agro_food',
  'health_epi',
  'economic_modeling',
  'social_governance',
  'amazon_bioeconomy',
  'climate_innovation',
  'education_comm',
  'geospatial_code',
];

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === ',' || ch === ';') && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function guessDomain(axis: AxisId): CapabilityDomain {
  const map: Record<AxisId, CapabilityDomain> = {
    1: 'climate_projections',
    2: 'extreme_hazards',
    3: 'energy_grid',
    4: 'agro_food',
    5: 'hydrology_water',
    6: 'health_epi',
    7: 'education_comm',
    8: 'climate_innovation',
    9: 'social_governance',
    10: 'economic_modeling',
    11: 'amazon_bioeconomy',
  };
  return map[axis];
}

export function parseRosterCsv(csvText: string): { researchers: Researcher[]; warnings: string[] } {
  const lines = csvText
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return { researchers: [], warnings: ['CSV vazio ou sem linhas de dados.'] };
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().trim());
  const idx = (names: string[]) => headers.findIndex((h) => names.includes(h));

  const nameI = idx(['name', 'nome', 'pesquisador', 'researcher']);
  const axisI = idx(['primary_axis', 'eixo', 'eixo_principal', 'axis']);
  const secAxisI = idx(['secondary_axes', 'eixos_secundarios', 'outros_eixos']);
  const roleI = idx(['role', 'cargo', 'nivel', 'vinculo']);
  const instI = idx(['institution', 'instituicao']);
  const unitI = idx(['unit', 'unidade', 'laboratorio']);
  const cityI = idx(['city', 'cidade']);
  const emailI = idx(['email', 'e-mail']);
  const orcidI = idx(['orcid']);
  const lattesI = idx(['lattes', 'lattes_url']);
  const bioI = idx(['bio', 'resumo', 'descricao']);
  const methodsI = idx(['methods', 'metodos', 'ferramentas']);
  const regionsI = idx(['regions', 'regioes', 'territorios']);
  const hazardsI = idx(['hazards', 'perigos', 'eventos']);
  const offerI = idx(['offer', 'oferta', 'oferece']);
  const offerDomI = idx(['offer_domain', 'dominio_oferta']);
  const needI = idx(['need', 'demanda', 'busca']);
  const needDomI = idx(['need_domain', 'dominio_demanda']);

  const warnings: string[] = [];
  if (nameI === -1 || axisI === -1) {
    return {
      researchers: [],
      warnings: ['Colunas obrigatórias ausentes: inclua pelo menos "nome" e "eixo" (1 a 11).'],
    };
  }

  const researchers: Researcher[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const name = cols[nameI]?.trim();
    if (!name) continue;

    const rawAxis = parseInt((cols[axisI] || '').replace(/[^0-9]/g, ''), 10);
    if (isNaN(rawAxis) || rawAxis < 1 || rawAxis > 11) {
      warnings.push(`Linha ${i + 1} (${name}): eixo inválido "${cols[axisI]}", ignorada.`);
      continue;
    }
    const primaryAxis = rawAxis as AxisId;

    const rawRole = (roleI >= 0 ? cols[roleI] : '').toLowerCase().trim();
    const roleMap: Record<string, CareerRole> = {
      coordenador: 'coordinator',
      coordenadora: 'coordinator',
      pi: 'pi',
      principal: 'pi',
      associado: 'associate',
      associada: 'associate',
      'pos-doc': 'postdoc',
      posdoc: 'postdoc',
      postdoc: 'postdoc',
      doutorando: 'phd',
      doutoranda: 'phd',
      doutorado: 'phd',
      phd: 'phd',
      mestrando: 'msc',
      mestranda: 'msc',
      mestrado: 'msc',
      msc: 'msc',
      ic: 'ic',
      tecnico: 'tech',
      tech: 'tech',
    };
    const role: CareerRole = VALID_ROLES.includes(rawRole as CareerRole)
      ? (rawRole as CareerRole)
      : roleMap[rawRole] || 'associate';

    const splitPipe = (ix: number) =>
      ix >= 0 && cols[ix]
        ? cols[ix]
            .split('|')
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    const secondaryAxes = splitPipe(secAxisI)
      .map((x) => parseInt(x.replace(/[^0-9]/g, ''), 10))
      .filter((n) => n >= 1 && n <= 11 && n !== primaryAxis) as AxisId[];

    const id = slugify(name) || `member-${i}`;
    const offerText = offerI >= 0 ? cols[offerI] : '';
    const needText = needI >= 0 ? cols[needI] : '';

    const rawOfferDom = (offerDomI >= 0 ? cols[offerDomI] : '').trim() as CapabilityDomain;
    const rawNeedDom = (needDomI >= 0 ? cols[needDomI] : '').trim() as CapabilityDomain;

    researchers.push({
      id,
      name,
      role,
      institution: (instI >= 0 && cols[instI]) || 'USP',
      unit: (unitI >= 0 && cols[unitI]) || 'IEE-USP',
      city: (cityI >= 0 && cols[cityI]) || 'São Paulo, SP',
      primaryAxis,
      secondaryAxes,
      bio: (bioI >= 0 && cols[bioI]) || `Pesquisador(a) integrante do Eixo ${primaryAxis} do CEPID CLIMARES.`,
      email: emailI >= 0 ? cols[emailI] || undefined : undefined,
      orcid: orcidI >= 0 ? cols[orcidI] || undefined : undefined,
      lattesUrl: lattesI >= 0 ? cols[lattesI] || undefined : undefined,
      methods: splitPipe(methodsI),
      regions: splitPipe(regionsI),
      hazards: splitPipe(hazardsI),
      offers: offerText
        ? [
            {
              id: `off-csv-${id}`,
              domain: VALID_DOMAINS.includes(rawOfferDom) ? rawOfferDom : guessDomain(primaryAxis),
              label: offerText,
            },
          ]
        : [],
      needs: needText
        ? [
            {
              id: `need-csv-${id}`,
              domain: VALID_DOMAINS.includes(rawNeedDom)
                ? rawNeedDom
                : secondaryAxes[0]
                ? guessDomain(secondaryAxes[0])
                : 'climate_projections',
              label: needText,
            },
          ]
        : [],
      availability: ['coauthor'],
      publications: [],
      isDemoProfile: false,
    });
  }

  return { researchers, warnings };
}

export const CSV_TEMPLATE_CONTENT = `nome,eixo,eixos_secundarios,cargo,instituicao,unidade,cidade,email,orcid,lattes,bio,metodos,regioes,perigos,oferta,dominio_oferta,demanda,dominio_demanda
"Maria Silva",1,"5|11",postdoc,USP,IAG-USP,"São Paulo, SP",maria@usp.br,0000-0000-0000-0000,http://lattes.cnpq.br/,"Modelagem climática regional CMIP7 e extremos na Amazônia.","Python|CMIP7|RegCM","xingu|rmsp","heatwaves|compound-drought","Séries corrigidas CMIP7 de temperatura e precipitação para bacias brasileiras",climate_projections,"Limiares de impacto em saúde e economia para guiar métricas físicas",health_epi
"João Oliveira",6,"1|9",phd,USP,FSP-USP,"São Paulo, SP",joao@usp.br,0000-0000-0000-0001,http://lattes.cnpq.br/,"Epidemiologia de ondas de calor e internações cardiovasculares na RMSP.","R|DLNM|DATASUS","rmsp|cantareira-pcj","heatwaves|health-vectors","Painel municipal de internações por estresse térmico",health_epi,"Projeções futuras de temperatura noturna e bulbo úmido na RMSP",climate_projections
`;
