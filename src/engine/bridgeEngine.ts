import { AXIS_MAP } from '../data/axes';
import { HAZARD_MAP, REGION_MAP } from '../data/regionsAndHazards';
import { DOMAIN_LABELS, tText } from '../i18n';
import {
  BridgeReason,
  CapabilityItem,
  CollaborationEdge,
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
          if (score >= 62) {
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

  // Prioritize PIs/Coordinator and cross-axis matches with shared regions
  return matches.sort((a, b) => {
    const leadA = (a.provider.role === 'pi' || a.provider.role === 'coordinator' ? 4 : 0) + (a.seeker.role === 'pi' ? 4 : 0);
    const leadB = (b.provider.role === 'pi' || b.provider.role === 'coordinator' ? 4 : 0) + (b.seeker.role === 'pi' ? 4 : 0);
    return b.score + leadB - (a.score + leadA);
  });
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
      if (a.primaryAxis === b.primaryAxis) continue;

      const sharedRegions = a.regions.filter((r) => b.regions.includes(r));
      const sharedHazards = a.hazards.filter((h) => b.hazards.includes(h));

      const matchedHandshakes: LatentBridge['matchedHandshakes'] = [];
      let handshakePts = 0;
      let aToB = false;
      let bToA = false;

      for (const off of a.offers) {
        for (const nd of b.needs) {
          const s = capabilityMatchScore(off, nd, sharedRegions, sharedHazards);
          if (s >= 62) {
            matchedHandshakes.push({ providerId: a.id, seekerId: b.id, offer: off, need: nd });
            aToB = true;
          }
        }
      }
      for (const off of b.offers) {
        for (const nd of a.needs) {
          const s = capabilityMatchScore(off, nd, sharedRegions, sharedHazards);
          if (s >= 62) {
            matchedHandshakes.push({ providerId: b.id, seekerId: a.id, offer: off, need: nd });
            bToA = true;
          }
        }
      }

      const reasons: BridgeReason[] = [];

      if (matchedHandshakes.length > 0) {
        handshakePts = aToB && bToA ? 46 : 34;
        const first = matchedHandshakes[0];
        const dom = DOMAIN_LABELS[first.offer.domain];
        reasons.push({
          type: 'handshake',
          weight: handshakePts,
          shortTag: {
            pt: `${dom.emoji} ${dom.pt}`,
            en: `${dom.emoji} ${dom.en}`,
          },
          text: {
            pt: `Oferta ↔ Demanda em ${dom.pt}`,
            en: `Offer ↔ Need in ${dom.en}`,
          },
        });
      }

      const regionPts = Math.min(28, sharedRegions.length * 14);
      if (sharedRegions.length > 0) {
        const firstReg = REGION_MAP[sharedRegions[0]];
        const namesPt = sharedRegions.slice(0, 2).map((id) => REGION_MAP[id]?.shortName.pt || id).join(', ');
        const namesEn = sharedRegions.slice(0, 2).map((id) => REGION_MAP[id]?.shortName.en || id).join(', ');
        reasons.push({
          type: 'region',
          weight: regionPts,
          shortTag: {
            pt: `${firstReg?.emoji || '📍'} ${firstReg?.shortName.pt || sharedRegions[0]}`,
            en: `${firstReg?.emoji || '📍'} ${firstReg?.shortName.en || sharedRegions[0]}`,
          },
          text: {
            pt: `Atuam em ${namesPt}`,
            en: `Both work in ${namesEn}`,
          },
        });
      }

      const hazardPts = Math.min(20, sharedHazards.length * 10);
      if (sharedHazards.length > 0) {
        const firstHaz = HAZARD_MAP[sharedHazards[0]];
        const hPt = sharedHazards.slice(0, 2).map((id) => HAZARD_MAP[id]?.shortName.pt || id).join(' & ');
        const hEn = sharedHazards.slice(0, 2).map((id) => HAZARD_MAP[id]?.shortName.en || id).join(' & ');
        reasons.push({
          type: 'hazard',
          weight: hazardPts,
          shortTag: {
            pt: `${firstHaz?.emoji || '⚡'} ${firstHaz?.shortName.pt || sharedHazards[0]}`,
            en: `${firstHaz?.emoji || '⚡'} ${firstHaz?.shortName.en || sharedHazards[0]}`,
          },
          text: {
            pt: `Foco em ${hPt}`,
            en: `Focus on ${hEn}`,
          },
        });
      }

      const secAffinity =
        a.secondaryAxes.includes(b.primaryAxis) || b.secondaryAxes.includes(a.primaryAxis);
      const secPts = secAffinity ? 10 : 0;

      const totalScore = Math.min(99, handshakePts + regionPts + hazardPts + secPts);

      if (totalScore >= 52 && reasons.length > 0) {
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
  const firstNameTo = to.name.split(' ')[0];
  const senderName = from ? from.name : lang === 'pt' ? '[Seu Nome]' : '[Your Name]';
  const senderUnit = from ? `${from.unit} (Eixo ${from.primaryAxis})` : 'CLIMARES';

  const overlapLines: string[] = [];
  if (bridge) {
    for (const r of bridge.reasons.slice(0, 2)) {
      overlapLines.push(`• ${r.text[lang]}`);
    }
  } else if (to.regions.length > 0) {
    const reg = REGION_MAP[to.regions[0]]?.shortName[lang];
    if (reg) {
      overlapLines.push(lang === 'pt' ? `• Atuação em ${reg}` : `• Focus in ${reg}`);
    }
  }

  if (lang === 'pt') {
    const subject = fromAxis
      ? `[CLIMARES] Conexão Eixo ${fromAxis.id} ↔ Eixo ${toAxis.id}`
      : `[CLIMARES] Parceria com o Eixo ${toAxis.id}`;
    const body = `Olá ${firstNameTo}, tudo bem?

Sou ${senderName} (${senderUnit}) do CEPID CLIMARES. Vi seu perfil no CLIMARES Hub e notei que temos pontos diretos de conexão com o Eixo ${toAxis.id} (${toAxis.shortName.pt}):

${overlapLines.length ? overlapLines.join('\n') : '• Pesquisa integrada no CLIMARES'}

Podemos conversar rapidamente nos próximos dias sobre uma possível parceria ou troca de dados?

Abraço,
${senderName}`;
    return { subject, body };
  }

  const subject = fromAxis
    ? `[CLIMARES] Axis ${fromAxis.id} ↔ Axis ${toAxis.id} Connection`
    : `[CLIMARES] Collaboration with Axis ${toAxis.id}`;
  const body = `Hi ${firstNameTo},

I'm ${senderName} (${senderUnit}) at CEPID CLIMARES. I saw your profile on the CLIMARES Hub and noticed direct overlap with Axis ${toAxis.id} (${toAxis.shortName.en}):

${overlapLines.length ? overlapLines.join('\n') : '• Shared research across CLIMARES'}

Would you be open to a quick chat about exchanging data or collaborating?

Best,
${senderName}`;
  return { subject, body };
}
