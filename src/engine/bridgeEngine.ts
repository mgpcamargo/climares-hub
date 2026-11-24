import { AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import {
  BridgeReason,
  CollaborationEdge,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

function normTokens(items: string[]): Set<string> {
  const stop = new Set(['and', 'the', 'for', 'with', 'from', 'in', 'of', 'over', 'change', 'changes', 'study', 'studies', 'analysis', 'science', 'sciences']);
  const out = new Set<string>();
  for (const item of items) {
    for (const tok of item.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)) {
      if (tok.length >= 4 && !stop.has(tok)) out.add(tok);
    }
  }
  return out;
}

/**
 * Computes potential cross-axis bridges grounded in empirical OpenAlex topics,
 * publication titles, and verified territories (only for pairs NOT yet co-authoring!).
 */
export function computeLatentBridges(
  researchers: Researcher[],
  edges: CollaborationEdge[]
): LatentBridge[] {
  const edgeSet = new Set<string>();
  for (const e of edges) {
    edgeSet.add(`${e.source}::${e.target}`);
    edgeSet.add(`${e.target}::${e.source}`);
  }

  // Precompute topic sets & normalized paper tokens per researcher
  const exactTopics = new Map<string, string[]>();
  const topicWords = new Map<string, Set<string>>();

  for (const r of researchers) {
    const tList = r.empiricalTopics && r.empiricalTopics.length > 0 ? r.empiricalTopics : r.methods;
    exactTopics.set(r.id, tList);
    const pubTitles = r.publications.map((p) => p.title);
    topicWords.set(r.id, normTokens([...tList, ...pubTitles]));
  }

  const bridges: LatentBridge[] = [];

  for (let i = 0; i < researchers.length; i++) {
    const a = researchers[i];
    if (a.role === 'tech' || a.role === 'ic') continue;

    for (let j = i + 1; j < researchers.length; j++) {
      const b = researchers[j];
      if (b.role === 'tech' || b.role === 'ic') continue;
      if (a.primaryAxis === b.primaryAxis) continue;

      const alreadyConnected = edgeSet.has(`${a.id}::${b.id}`);
      if (alreadyConnected) continue; // Only surface NEW untapped cross-axis bridges!

      const tA = exactTopics.get(a.id) || [];
      const tB = exactTopics.get(b.id) || [];
      const sharedExactTopics = tA.filter((x) =>
        tB.some((y) => y.toLowerCase() === x.toLowerCase())
      );

      // Semantic word overlap across OpenAlex topics + recent paper titles
      const wA = topicWords.get(a.id)!;
      const wB = topicWords.get(b.id)!;
      let sharedWordCount = 0;
      const sampleWords: string[] = [];
      for (const w of wA) {
        if (wB.has(w)) {
          sharedWordCount++;
          if (sampleWords.length < 3) sampleWords.push(w);
        }
      }

      const sharedRegions = a.regions.filter((reg) => b.regions.includes(reg));

      const reasons: BridgeReason[] = [];
      let score = 0;

      if (sharedExactTopics.length > 0) {
        const pts = Math.min(54, 34 + (sharedExactTopics.length - 1) * 12);
        score += pts;
        const firstTopic = sharedExactTopics[0];
        reasons.push({
          type: 'topic',
          weight: pts,
          shortTag: {
            pt: `🧬 ${firstTopic}`,
            en: `🧬 ${firstTopic}`,
          },
          text: {
            pt: `Publicam sobre o mesmo tema OpenAlex: ${sharedExactTopics.slice(0, 2).join(', ')}`,
            en: `Publish on the same OpenAlex topic: ${sharedExactTopics.slice(0, 2).join(', ')}`,
          },
        });
      } else if (sharedWordCount >= 3) {
        const pts = Math.min(40, 18 + sharedWordCount * 4);
        score += pts;
        reasons.push({
          type: 'topic',
          weight: pts,
          shortTag: {
            pt: `🧬 ${sampleWords.slice(0, 2).join(' • ')}`,
            en: `🧬 ${sampleWords.slice(0, 2).join(' • ')}`,
          },
          text: {
            pt: ` Artigos recentes com termos convergentes (${sampleWords.join(', ')})`,
            en: `Recent papers share core terms (${sampleWords.join(', ')})`,
          },
        });
      }

      if (sharedRegions.length > 0) {
        const pts = Math.min(26, sharedRegions.length * 13);
        score += pts;
        const reg = REGION_MAP[sharedRegions[0]];
        reasons.push({
          type: 'region',
          weight: pts,
          shortTag: {
            pt: `${reg?.emoji || '📍'} ${reg?.shortName.pt || sharedRegions[0]}`,
            en: `${reg?.emoji || '📍'} ${reg?.shortName.en || sharedRegions[0]}`,
          },
          text: {
            pt: `Atuação convergente em ${sharedRegions.map((id) => REGION_MAP[id]?.shortName.pt || id).slice(0, 2).join(', ')}`,
            en: `Shared regional focus in ${sharedRegions.map((id) => REGION_MAP[id]?.shortName.en || id).slice(0, 2).join(', ')}`,
          },
        });
      }

      if (score >= 46 && reasons.length > 0) {
        bridges.push({
          id: `br-${a.id}--${b.id}`,
          sourceId: a.id,
          targetId: b.id,
          sourceAxis: a.primaryAxis,
          targetAxis: b.primaryAxis,
          score: Math.min(98, score),
          reasons: reasons.sort((x, y) => y.weight - x.weight),
          sharedTopics: sharedExactTopics.length ? sharedExactTopics : sampleWords,
          sharedRegions,
          alreadyConnected: false,
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

export function getCoauthorsForResearcher(
  researcherId: string,
  edges: CollaborationEdge[]
): { edge: CollaborationEdge; partnerId: string }[] {
  return edges
    .filter((e) => e.source === researcherId || e.target === researcherId)
    .sort((a, b) => (b.paperCount || b.weight) - (a.paperCount || a.weight))
    .map((edge) => ({
      edge,
      partnerId: edge.source === researcherId ? edge.target : edge.source,
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
  const senderUnit = from ? `${from.unit} (Eixo ${from.primaryAxis})` : 'CEPID CLIMARES';

  const overlapLines: string[] = [];
  if (bridge) {
    for (const r of bridge.reasons.slice(0, 2)) {
      overlapLines.push(`• ${r.text[lang].trim()}`);
    }
  } else if (to.empiricalTopics && to.empiricalTopics.length > 0) {
    overlapLines.push(
      lang === 'pt'
        ? `• Interesse convergente em ${to.empiricalTopics.slice(0, 2).join(' e ')}`
        : `• Shared interest in ${to.empiricalTopics.slice(0, 2).join(' & ')}`
    );
  }

  if (lang === 'pt') {
    const subject = fromAxis
      ? `[CLIMARES] Ponte Eixo ${fromAxis.id} ↔ Eixo ${toAxis.id}`
      : `[CLIMARES] Colaboração com o Eixo ${toAxis.id}`;
    const body = `Olá ${firstNameTo}, tudo bem?

Sou ${senderName} (${senderUnit}). Vi suas publicações e linha de atuação no CLIMARES Hub e notei convergência direta com o Eixo ${toAxis.id} (${toAxis.shortName.pt}):

${overlapLines.length ? overlapLines.join('\n') : '• Pesquisa interdisciplinar no CEPID CLIMARES'}

Podemos conversar rapidamente nos próximos dias sobre troca de dados ou possível parceria?

Abraço,
${senderName}`;
    return { subject, body };
  }

  const subject = fromAxis
    ? `[CLIMARES] Axis ${fromAxis.id} ↔ Axis ${toAxis.id} Collaboration`
    : `[CLIMARES] Collaboration with Axis ${toAxis.id}`;
  const body = `Hi ${firstNameTo},

I'm ${senderName} (${senderUnit}). Seeing your publications on the CLIMARES Hub, I noticed strong overlap with Axis ${toAxis.id} (${toAxis.shortName.en}):

${overlapLines.length ? overlapLines.join('\n') : '• Interdisciplinary collaboration across CLIMARES'}

Would you be open to a brief chat about exchanging data or collaborating?

Best,
${senderName}`;
  return { subject, body };
}
