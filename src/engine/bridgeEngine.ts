import { AXES, AXIS_MAP } from '../data/axes';
import { HAZARD_MAP, REGION_MAP } from '../data/regionsAndHazards';
import { DOMAIN_LABELS, ROLE_LABELS, tText } from '../i18n';
import {
  AxisId,
  BridgeReason,
  CapabilityItem,
  CollaborationEdge,
  CommonsAsset,
  CrossAxisMission,
  HandshakeMatch,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4)
  );
}

function jaccardTokens(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) {
    if (b.has(x)) inter++;
  }
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

function capabilityMatchScore(
  offer: CapabilityItem,
  need: CapabilityItem,
  sharedRegions: string[],
  sharedHazards: string[]
): number {
  if (offer.domain !== need.domain) {
    // Allow subtle secondary token overlap only if very strong
    const tA = tokenize(`${tText(offer.label, 'pt')} ${tText(offer.detail, 'pt')}`);
    const tB = tokenize(`${tText(need.label, 'pt')} ${tText(need.detail, 'pt')}`);
    const jac = jaccardTokens(tA, tB);
    if (jac < 0.22) return 0;
    return Math.min(82, Math.round(42 + jac * 65 + sharedRegions.length * 7 + sharedHazards.length * 5));
  }

  const tA = tokenize(`${tText(offer.label, 'pt')} ${tText(offer.detail, 'pt')}`);
  const tB = tokenize(`${tText(need.label, 'pt')} ${tText(need.detail, 'pt')}`);
  const jac = jaccardTokens(tA, tB);
  const base = 62;
  const textBonus = Math.min(18, Math.round(jac * 60));
  const regionBonus = Math.min(14, sharedRegions.length * 7);
  const hazardBonus = Math.min(10, sharedHazards.length * 5);
  return Math.min(99, base + textBonus + regionBonus + hazardBonus);
}

export function computeHandshakes(researchers: Researcher[]): HandshakeMatch[] {
  const matches: HandshakeMatch[] = [];

  for (const provider of researchers) {
    if (!provider.offers.length) continue;
    for (const seeker of researchers) {
      if (provider.id === seeker.id || !seeker.needs.length) continue;

      const sharedRegions = provider.regions.filter((r) => seeker.regions.includes(r));
      const sharedHazards = provider.hazards.filter((h) => seeker.hazards.includes(h));

      for (const offer of provider.offers) {
        for (const need of seeker.needs) {
          const score = capabilityMatchScore(offer, need, sharedRegions, sharedHazards);
          if (score >= 60) {
            matches.push({
              id: `hs-${provider.id}-${offer.id}-${seeker.id}-${need.id}`,
              provider,
              seeker,
              offer,
              need,
              score,
              sharedRegions,
              sharedHazards,
              crossAxis: provider.primaryAxis !== seeker.primaryAxis,
            });
          }
        }
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}

export function computeLatentBridges(
  researchers: Researcher[],
  edges: CollaborationEdge[]
): LatentBridge[] {
  const edgeSet = new Set<string>();
  for (const e of edges) {
    edgeSet.add(`${e.source}::${e.target}`);
    edgeSet.add(`${e.target}::${e.source}`);
  }

  const bridges: LatentBridge[] = [];

  for (let i = 0; i < researchers.length; i++) {
    const a = researchers[i];
    for (let j = i + 1; j < researchers.length; j++) {
      const b = researchers[j];
      if (a.primaryAxis === b.primaryAxis) continue; // Only cross-axis bridges!

      const sharedRegions = a.regions.filter((r) => b.regions.includes(r));
      const sharedHazards = a.hazards.filter((h) => b.hazards.includes(h));

      const matchedHandshakes: LatentBridge['matchedHandshakes'] = [];
      let handshakePts = 0;
      let aToB = false;
      let bToA = false;

      for (const off of a.offers) {
        for (const nd of b.needs) {
          const s = capabilityMatchScore(off, nd, sharedRegions, sharedHazards);
          if (s >= 60) {
            matchedHandshakes.push({ providerId: a.id, seekerId: b.id, offer: off, need: nd });
            aToB = true;
          }
        }
      }
      for (const off of b.offers) {
        for (const nd of a.needs) {
          const s = capabilityMatchScore(off, nd, sharedRegions, sharedHazards);
          if (s >= 60) {
            matchedHandshakes.push({ providerId: b.id, seekerId: a.id, offer: off, need: nd });
            bToA = true;
          }
        }
      }

      const reasons: BridgeReason[] = [];

      if (matchedHandshakes.length > 0) {
        handshakePts = aToB && bToA ? 46 : 34;
        const first = matchedHandshakes[0];
        const domPt = DOMAIN_LABELS[first.offer.domain].pt;
        const domEn = DOMAIN_LABELS[first.offer.domain].en;
        const provName = first.providerId === a.id ? a.name.split(' ')[0] : b.name.split(' ')[0];
        const seekName = first.seekerId === a.id ? a.name.split(' ')[0] : b.name.split(' ')[0];
        reasons.push({
          type: 'handshake',
          weight: handshakePts,
          text: {
            pt: aToB && bToA
              ? `Complementaridade mútua (Oferta ↔ Demanda) em ${domPt}`
              : `Encaixe direto: ${provName} oferece e ${seekName} busca apoio em ${domPt}`,
            en: aToB && bToA
              ? `Mutual Offer ↔ Need complementarity in ${domEn}`
              : `Direct handshake: ${provName} offers what ${seekName} needs in ${domEn}`,
          },
        });
      }

      const regionPts = Math.min(28, sharedRegions.length * 14);
      if (sharedRegions.length > 0) {
        const namesPt = sharedRegions.slice(0, 2).map((id) => REGION_MAP[id]?.name.pt || id).join(', ');
        const namesEn = sharedRegions.slice(0, 2).map((id) => REGION_MAP[id]?.name.en || id).join(', ');
        reasons.push({
          type: 'region',
          weight: regionPts,
          text: {
            pt: `Mesmo território de estudo: ${namesPt}${sharedRegions.length > 2 ? ` (+${sharedRegions.length - 2})` : ''}`,
            en: `Shared study territory: ${namesEn}${sharedRegions.length > 2 ? ` (+${sharedRegions.length - 2})` : ''}`,
          },
        });
      }

      const hazardPts = Math.min(20, sharedHazards.length * 10);
      if (sharedHazards.length > 0) {
        const hPt = sharedHazards.slice(0, 2).map((id) => HAZARD_MAP[id]?.shortName.pt || id).join(' e ');
        const hEn = sharedHazards.slice(0, 2).map((id) => HAZARD_MAP[id]?.shortName.en || id).join(' & ');
        reasons.push({
          type: 'hazard',
          weight: hazardPts,
          text: {
            pt: `Foco no mesmo evento/perigo: ${hPt}`,
            en: `Shared hazard focus: ${hEn}`,
          },
        });
      }

      const secAffinity =
        a.secondaryAxes.includes(b.primaryAxis) || b.secondaryAxes.includes(a.primaryAxis);
      const secPts = secAffinity ? 10 : 0;
      if (secAffinity) {
        reasons.push({
          type: 'secondary_axis',
          weight: secPts,
          text: {
            pt: `Afinidade temática declarada entre Eixo ${a.primaryAxis} e Eixo ${b.primaryAxis}`,
            en: `Declared secondary axis affinity between Axis ${a.primaryAxis} & Axis ${b.primaryAxis}`,
          },
        });
      }

      const sharedMethods = a.methods.filter((m) =>
        b.methods.some((bm) => bm.toLowerCase() === m.toLowerCase())
      );
      const methodPts = Math.min(8, sharedMethods.length * 4);
      if (sharedMethods.length > 0) {
        reasons.push({
          type: 'method',
          weight: methodPts,
          text: {
            pt: `Ferramenta / método compartilhado: ${sharedMethods.slice(0, 2).join(', ')}`,
            en: `Shared method / tool: ${sharedMethods.slice(0, 2).join(', ')}`,
          },
        });
      }

      const totalScore = Math.min(99, handshakePts + regionPts + hazardPts + secPts + methodPts);

      if (totalScore >= 36) {
        bridges.push({
          id: `br-${a.id}--${b.id}`,
          sourceId: a.id,
          targetId: b.id,
          sourceAxis: a.primaryAxis,
          targetAxis: b.primaryAxis,
          score: totalScore,
          reasons: reasons.sort((x, y) => y.weight - x.weight),
          sharedRegions,
          sharedHazards,
          matchedHandshakes,
          alreadyConnected: edgeSet.has(`${a.id}::${b.id}`),
        });
      }
    }
  }

  return bridges.sort((a, b) => b.score - a.score);
}

export interface AxisPairMetric {
  axisA: AxisId;
  axisB: AxisId;
  actualCount: number;
  latentCount: number;
  topLatentScore: number;
  siloGapScore: number; // 0..100
}

export interface AxisHealth {
  axisId: AxisId;
  memberCount: number;
  intraEdges: number;
  crossEdges: number;
  distinctPartnerAxes: number;
  opennessRatio: number; // 0..1
  latentOpportunities: number;
}

export interface BoundarySpanner {
  researcher: Researcher;
  crossEdges: number;
  distinctAxesConnected: AxisId[];
  missionAxesCount: number;
  spannerScore: number;
}

export interface SiloMetrics {
  matrix: Record<AxisId, Record<AxisId, AxisPairMetric>>;
  axisHealth: AxisHealth[];
  boundarySpanners: BoundarySpanner[];
  totalIntraEdges: number;
  totalCrossEdges: number;
  centerIntegrationIndex: number; // 0..100
  coldAxisPairsCount: number;
}

export function computeSiloMetrics(
  researchers: Researcher[],
  edges: CollaborationEdge[],
  bridges: LatentBridge[],
  missions: CrossAxisMission[]
): SiloMetrics {
  const byId = new Map(researchers.map((r) => [r.id, r]));

  const matrix = {} as Record<AxisId, Record<AxisId, AxisPairMetric>>;
  for (const a of AXES) {
    matrix[a.id] = {} as Record<AxisId, AxisPairMetric>;
    for (const b of AXES) {
      matrix[a.id][b.id] = {
        axisA: a.id,
        axisB: b.id,
        actualCount: 0,
        latentCount: 0,
        topLatentScore: 0,
        siloGapScore: 0,
      };
    }
  }

  let totalIntraEdges = 0;
  let totalCrossEdges = 0;

  const spannerAxes = new Map<string, Set<AxisId>>();
  const spannerCrossCount = new Map<string, number>();

  for (const e of edges) {
    const src = byId.get(e.source);
    const tgt = byId.get(e.target);
    if (!src || !tgt) continue;

    matrix[src.primaryAxis][tgt.primaryAxis].actualCount++;
    if (src.primaryAxis !== tgt.primaryAxis) {
      matrix[tgt.primaryAxis][src.primaryAxis].actualCount++;
      totalCrossEdges++;

      if (!spannerAxes.has(src.id)) spannerAxes.set(src.id, new Set());
      if (!spannerAxes.has(tgt.id)) spannerAxes.set(tgt.id, new Set());
      spannerAxes.get(src.id)!.add(tgt.primaryAxis);
      spannerAxes.get(tgt.id)!.add(src.primaryAxis);
      spannerCrossCount.set(src.id, (spannerCrossCount.get(src.id) || 0) + 1);
      spannerCrossCount.set(tgt.id, (spannerCrossCount.get(tgt.id) || 0) + 1);
    } else {
      totalIntraEdges++;
    }
  }

  for (const br of bridges) {
    if (br.alreadyConnected || br.score < 52) continue;
    const cellAB = matrix[br.sourceAxis][br.targetAxis];
    const cellBA = matrix[br.targetAxis][br.sourceAxis];
    cellAB.latentCount++;
    cellBA.latentCount++;
    cellAB.topLatentScore = Math.max(cellAB.topLatentScore, br.score);
    cellBA.topLatentScore = Math.max(cellBA.topLatentScore, br.score);
  }

  let coldAxisPairsCount = 0;
  for (const a of AXES) {
    for (const b of AXES) {
      if (a.id === b.id) continue;
      const cell = matrix[a.id][b.id];
      if (cell.actualCount === 0 && cell.latentCount > 0) {
        cell.siloGapScore = Math.min(100, Math.round(cell.topLatentScore * 0.72 + cell.latentCount * 8));
        if (a.id < b.id) coldAxisPairsCount++;
      } else if (cell.actualCount === 1 && cell.latentCount >= 3) {
        cell.siloGapScore = Math.min(70, Math.round(cell.topLatentScore * 0.45 + cell.latentCount * 5));
      } else {
        cell.siloGapScore = 0;
      }
    }
  }

  const axisHealth: AxisHealth[] = AXES.map((ax) => {
    const members = researchers.filter((r) => r.primaryAxis === ax.id);
    const intraEdges = matrix[ax.id][ax.id].actualCount;
    let crossEdges = 0;
    let distinctPartnerAxes = 0;
    let latentOpportunities = 0;
    for (const other of AXES) {
      if (other.id === ax.id) continue;
      const c = matrix[ax.id][other.id];
      crossEdges += c.actualCount;
      if (c.actualCount > 0) distinctPartnerAxes++;
      latentOpportunities += c.latentCount;
    }
    const denom = intraEdges + crossEdges;
    return {
      axisId: ax.id,
      memberCount: members.length,
      intraEdges,
      crossEdges,
      distinctPartnerAxes,
      opennessRatio: denom > 0 ? crossEdges / denom : 0,
      latentOpportunities,
    };
  });

  const boundarySpanners: BoundarySpanner[] = researchers
    .map((r) => {
      const connected = Array.from(spannerAxes.get(r.id) || []);
      const crossEdges = spannerCrossCount.get(r.id) || 0;
      const missionAxes = new Set<AxisId>();
      for (const m of missions) {
        if (m.memberIds.includes(r.id)) {
          m.activeAxes.forEach((ax) => {
            if (ax !== r.primaryAxis) missionAxes.add(ax);
          });
        }
      }
      const spannerScore = connected.length * 25 + crossEdges * 10 + missionAxes.size * 6;
      return {
        researcher: r,
        crossEdges,
        distinctAxesConnected: connected,
        missionAxesCount: missionAxes.size,
        spannerScore,
      };
    })
    .filter((s) => s.spannerScore > 0)
    .sort((a, b) => b.spannerScore - a.spannerScore);

  const totalEdges = totalIntraEdges + totalCrossEdges;
  const centerIntegrationIndex =
    totalEdges > 0 ? Math.round((totalCrossEdges / totalEdges) * 100) : 0;

  return {
    matrix,
    axisHealth,
    boundarySpanners,
    totalIntraEdges,
    totalCrossEdges,
    centerIntegrationIndex,
    coldAxisPairsCount,
  };
}

export function getBridgesForResearcher(
  researcherId: string,
  bridges: LatentBridge[],
  limit = 6
): { bridge: LatentBridge; partnerId: string }[] {
  return bridges
    .filter((b) => b.sourceId === researcherId || b.targetId === researcherId)
    .slice(0, limit)
    .map((bridge) => ({
      bridge,
      partnerId: bridge.sourceId === researcherId ? bridge.targetId : bridge.sourceId,
    }));
}

export function generateWarmIntro(
  from: Researcher | null,
  to: Researcher,
  bridge: LatentBridge | null,
  lang: Lang
): { subject: string; body: string } {
  const toAxis = AXIS_MAP[to.primaryAxis];
  const fromAxis = from ? AXIS_MAP[from.primaryAxis] : null;
  const firstNameTo = to.name.replace(' (Exemplo)', '').split(' ')[0];
  const senderName = from ? from.name.replace(' (Exemplo)', '') : lang === 'pt' ? '[Seu Nome]' : '[Your Name]';
  const senderUnit = from ? `${from.unit} (Eixo ${from.primaryAxis})` : 'CLIMARES';

  const overlapLines: string[] = [];
  if (bridge) {
    for (const r of bridge.reasons.slice(0, 3)) {
      overlapLines.push(`• ${r.text[lang]}`);
    }
    if (bridge.matchedHandshakes.length > 0) {
      const hs = bridge.matchedHandshakes[0];
      const offTxt = tText(hs.offer.label, lang);
      const ndTxt = tText(hs.need.label, lang);
      overlapLines.push(
        lang === 'pt'
          ? `• Possível encaixe prático: "${offTxt}" ↔ "${ndTxt}"`
          : `• Practical fit: "${offTxt}" ↔ "${ndTxt}"`
      );
    }
  } else if (to.regions.length > 0) {
    const reg = REGION_MAP[to.regions[0]]?.name[lang];
    if (reg) {
      overlapLines.push(
        lang === 'pt' ? `• Atuação convergente em ${reg}` : `• Overlapping focus in ${reg}`
      );
    }
  }

  if (lang === 'pt') {
    const subject = fromAxis
      ? `[CLIMARES] Ponte Eixo ${fromAxis.id} ↔ Eixo ${toAxis.id}: possível colaboração`
      : `[CLIMARES] Conexão interdisciplinar com o Eixo ${toAxis.id}`;
    const body = `Olá ${firstNameTo}, tudo bem?

Sou ${senderName}, pesquisador(a) vinculado(a) ao ${senderUnit} no CEPID CLIMARES. Explorando o Hub Interdisciplinar do Centro, identifiquei pontos de convergência bem concretos entre o nosso trabalho e a sua frente no Eixo ${toAxis.id} (${toAxis.name.pt}):

${overlapLines.length ? overlapLines.join('\n') : '• Interesse compartilhado nos desafios de resiliência climática do CLIMARES'}

Você teria 15–20 minutos nas próximas semanas para um café virtual rápido? Acho que podemos destravar uma troca útil de dados/métodos entre nossos grupos (ou até desenhar uma nota técnica/artigo conjunto).

Um abraço,
${senderName}
${senderUnit} • CEPID CLIMARES`;
    return { subject, body };
  }

  const subject = fromAxis
    ? `[CLIMARES] Axis ${fromAxis.id} ↔ Axis ${toAxis.id} Bridge: potential collaboration`
    : `[CLIMARES] Interdisciplinary connection with Axis ${toAxis.id}`;
  const body = `Hi ${firstNameTo},

I'm ${senderName} from ${senderUnit} within CEPID CLIMARES. While exploring the CLIMARES Cross-Axis Hub, I noticed strong scientific overlap with your work in Axis ${toAxis.id} (${toAxis.name.en}):

${overlapLines.length ? overlapLines.join('\n') : '• Shared climate resilience goals across CLIMARES'}

Would you be open to a quick 15–20 minute virtual coffee over the next couple of weeks? I'd love to explore exchanging data/methods or co-developing a cross-axis output together.

Best regards,
${senderName}
${senderUnit} • CEPID CLIMARES`;
  return { subject, body };
}

export function exportFapespMarkdown(
  researchers: Researcher[],
  edges: CollaborationEdge[],
  bridges: LatentBridge[],
  assets: CommonsAsset[],
  missions: CrossAxisMission[],
  metrics: SiloMetrics,
  lang: Lang
): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const pt = lang === 'pt';

  const lines: string[] = [];
  lines.push(pt ? `# Relatório de Integração Inter-Eixos — CEPID CLIMARES` : `# Cross-Axis Integration Snapshot — CEPID CLIMARES`);
  lines.push(pt ? `*Gerado automaticamente pelo CLIMARES Hub em ${dateStr}*\n` : `*Generated automatically by CLIMARES Hub on ${dateStr}*\n`);

  lines.push(pt ? `## 1. Indicadores Gerais de Acoplamento` : `## 1. Center-Wide Coupling Indicators`);
  lines.push(`- **${pt ? 'Pesquisadores mapeados' : 'Mapped researchers'}:** ${researchers.length}`);
  lines.push(`- **${pt ? 'Total de conexões mapeadas' : 'Total mapped links'}:** ${edges.length} (${metrics.totalIntraEdges} ${pt ? 'intra-eixo' : 'intra-axis'}, ${metrics.totalCrossEdges} ${pt ? 'entre eixos' : 'cross-axis'})`);
  lines.push(`- **${pt ? 'Índice Global de Transversalidade' : 'Center Cross-Axis Ratio'}:** ${metrics.centerIntegrationIndex}%`);
  lines.push(`- **${pt ? 'Pares de eixos sem conexão ativa mas com alta sinergia latente' : 'Unconnected axis pairs with high latent synergy'}:** ${metrics.coldAxisPairsCount}`);
  lines.push(`- **${pt ? 'Bases, ferramentas e modelos no Acervo CLIMARES' : 'Shared Commons assets'}:** ${assets.length}`);
  lines.push(`- **${pt ? 'Missões Transversais ativas/em formação' : 'Cross-Axis Missions'}:** ${missions.length}\n`);

  lines.push(pt ? `## 2. Diagnóstico por Eixo Temático (11 Eixos)` : `## 2. Diagnostic by Thematic Axis`);
  lines.push(
    pt
      ? `| Eixo | Nome | Membros | Links Internos | Pontes Externas | Eixos Parceiros | Oportunidades Latentes |`
      : `| Axis | Name | Members | Intra Links | Cross Bridges | Partner Axes | Latent Opportunities |`
  );
  lines.push(`| :--- | :--- | ---: | ---: | ---: | ---: | ---: |`);
  for (const h of metrics.axisHealth) {
    const ax = AXIS_MAP[h.axisId];
    lines.push(
      `| ${ax.code} | ${ax.name[lang]} | ${h.memberCount} | ${h.intraEdges} | ${h.crossEdges} | ${h.distinctPartnerAxes}/10 | ${h.latentOpportunities} |`
    );
  }
  lines.push('');

  lines.push(pt ? `## 3. Articuladores Transversais ("Boundary Spanners")` : `## 3. Top Boundary Spanners`);
  for (const s of metrics.boundarySpanners.slice(0, 8)) {
    const role = ROLE_LABELS[s.researcher.role][lang];
    const ax = AXIS_MAP[s.researcher.primaryAxis].code;
    const partners = s.distinctAxesConnected.map((id) => `E${id}`).join(', ') || '—';
    lines.push(
      `- **${s.researcher.name}** (${role}, ${s.researcher.unit}, ${ax}) — ${s.crossEdges} ${pt ? 'pontes externas' : 'cross links'} (${partners})`
    );
  }
  lines.push('');

  lines.push(pt ? `## 4. Top 10 Pontes Latentes Prioritárias (Ainda sem Colaboração Formal)` : `## 4. Top 10 Priority Unconnected Latent Bridges`);
  const byId = new Map(researchers.map((r) => [r.id, r]));
  const topUnconnected = bridges.filter((b) => !b.alreadyConnected).slice(0, 10);
  for (const b of topUnconnected) {
    const rA = byId.get(b.sourceId);
    const rB = byId.get(b.targetId);
    if (!rA || !rB) continue;
    const mainReason = b.reasons[0]?.text[lang] || '';
    lines.push(
      `- **[${b.score}%]** ${rA.name} (E${rA.primaryAxis}, ${rA.unit}) ↔ ${rB.name} (E${rB.primaryAxis}, ${rB.unit}) — *${mainReason}*`
    );
  }
  lines.push('');

  lines.push(pt ? `## 5. Missões Transversais & Cadeiras Abertas` : `## 5. Cross-Axis Missions & Open Seats`);
  for (const m of missions) {
    lines.push(
      `- **${tText(m.title, lang)}** — ${pt ? 'Presentes' : 'Active'}: ${m.activeAxes.map((a) => `E${a}`).join(', ')} | ${pt ? 'Eixos faltantes' : 'Open seats'}: ${m.openAxes.map((a) => `E${a}`).join(', ') || '—'}`
    );
  }

  return lines.join('\n');
}

export function exportMatrixCsv(metrics: SiloMetrics, lang: Lang): string {
  const header = ['Eixo', ...AXES.map((a) => `${a.code} (${a.shortName[lang]})`)];
  const rows = [header.join(',')];
  for (const a of AXES) {
    const vals = AXES.map((b) => {
      const c = metrics.matrix[a.id][b.id];
      return a.id === b.id ? `${c.actualCount}` : `${c.actualCount} (${c.latentCount} lat)`;
    });
    rows.push([`"${a.code} - ${a.shortName[lang]}"`, ...vals].join(','));
  }
  return rows.join('\n');
}
