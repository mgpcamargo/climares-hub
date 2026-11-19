import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from 'd3-force';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, ZoomTransform } from 'd3-zoom';
import {
  Crosshair,
  Filter,
  Layers,
  RotateCcw,
  Sparkles,
  X,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { HAZARDS, STUDY_REGIONS } from '../data/regionsAndHazards';
import { ROLE_LABELS, tText, UI } from '../i18n';
import {
  AxisId,
  CollaborationEdge,
  CommonsAsset,
  CrossAxisMission,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

export type SiloLens = 'hybrid' | 'bridges' | 'latent' | 'all';
type LayoutMode = 'constellation' | 'cascade' | 'organic';
type CareerFilter = 'all' | 'ecr' | 'pi';
type NodeKind = 'researcher' | 'region' | 'hazard' | 'asset' | 'mission';

interface GraphNode extends SimulationNodeDatum {
  id: string;
  kind: NodeKind;
  label: string;
  sublabel?: string;
  color: string;
  radius: number;
  axisId?: AxisId;
  researcher?: Researcher;
  regionId?: string;
  hazardId?: string;
  asset?: CommonsAsset;
  mission?: CrossAxisMission;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  kind: 'actual_intra' | 'actual_cross' | 'latent' | 'entity';
  weight: number;
  score?: number;
  label?: string;
  bridge?: LatentBridge;
}

interface NetworkGraphViewProps {
  researchers: Researcher[];
  edges: CollaborationEdge[];
  bridges: LatentBridge[];
  assets: CommonsAsset[];
  missions: CrossAxisMission[];
  lang: Lang;
  activePersonaId: string | null;
  focusedResearcherId: string | null;
  focusedAxisPair: [AxisId, AxisId] | null;
  lens: SiloLens;
  onChangeLens: (l: SiloLens) => void;
  focusedRegionId?: string | null;
  onClearFocusedResearcher: () => void;
  onChangeAxisPair: (pair: [AxisId, AxisId] | null) => void;
  onSelectResearcher: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
}

function getAxisAnchor(axisId: AxisId, layout: LayoutMode, w: number, h: number): { x: number; y: number } {
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.min(w, h) * 0.34;
  const ry = Math.min(w, h) * 0.33;

  if (layout === 'constellation') {
    const idx = axisId - 1;
    const angle = (idx / 11) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  }

  if (layout === 'cascade') {
    // 4-column scientific cascade: Physical -> Sectoral Systems -> Society/Economy -> Cross-Cutting
    const positions: Record<AxisId, [number, number]> = {
      1: [0.16, 0.33],
      2: [0.16, 0.67],
      3: [0.42, 0.2],
      4: [0.42, 0.4],
      5: [0.42, 0.6],
      6: [0.42, 0.8],
      8: [0.68, 0.25],
      9: [0.68, 0.5],
      10: [0.68, 0.75],
      7: [0.87, 0.34],
      11: [0.87, 0.66],
    };
    const [px, py] = positions[axisId];
    return { x: w * px, y: h * py };
  }

  return { x: cx, y: cy };
}

export const NetworkGraphView: React.FC<NetworkGraphViewProps> = ({
  researchers,
  edges,
  bridges,
  assets,
  missions,
  lang,
  activePersonaId,
  focusedResearcherId,
  focusedAxisPair,
  lens,
  onChangeLens,
  focusedRegionId,
  onClearFocusedResearcher,
  onChangeAxisPair,
  onSelectResearcher,
  onOpenWarmIntro,
}) => {
  const t = UI[lang].graph;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dimensions, setDimensions] = useState({ width: 1000, height: 640 });
  const [layout, setLayout] = useState<LayoutMode>('constellation');
  const [careerFilter, setCareerFilter] = useState<CareerFilter>('all');
  const [selectedAxes, setSelectedAxes] = useState<AxisId[]>([]);
  const [showRegions, setShowRegions] = useState(Boolean(focusedRegionId));
  const [showHazards, setShowHazards] = useState(false);
  const [showAssets, setShowAssets] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [egoActive, setEgoActive] = useState(false);
  const [pairA, setPairA] = useState<AxisId | ''>(focusedAxisPair ? focusedAxisPair[0] : '');
  const [pairB, setPairB] = useState<AxisId | ''>(focusedAxisPair ? focusedAxisPair[1] : '');

  const [hoveredNode, setHoveredNode] = useState<{ node: GraphNode; sx: number; sy: number } | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<GraphNode | null>(null);

  const transformRef = useRef<ZoomTransform>(zoomIdentity);
  const zoomBehaviorRef = useRef<ReturnType<typeof zoom<HTMLCanvasElement, unknown>> | null>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const hoveredIdRef = useRef<string | null>(null);
  const simRef = useRef<Simulation<GraphNode, GraphLink> | null>(null);
  const dragNodeRef = useRef<GraphNode | null>(null);

  // Sync external focused axis pair
  useEffect(() => {
    if (focusedAxisPair) {
      setPairA(focusedAxisPair[0]);
      setPairB(focusedAxisPair[1]);
      setSelectedAxes([]);
    } else {
      setPairA('');
      setPairB('');
    }
  }, [focusedAxisPair]);

  // If external region focus is triggered from the Map, turn on the Territories layer
  useEffect(() => {
    if (focusedRegionId) {
      setShowRegions(true);
    }
  }, [focusedRegionId]);

  // If external researcher focus is triggered, auto-enable ego spotlight
  useEffect(() => {
    if (focusedResearcherId) {
      setEgoActive(true);
    }
  }, [focusedResearcherId]);

  const effectiveEgoId = egoActive ? focusedResearcherId || activePersonaId : null;

  // Observe container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(320, Math.floor(entry.contentRect.width));
        const h = Math.max(520, Math.floor(entry.contentRect.height));
        setDimensions({ width: w, height: h });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build filtered graph data
  const graphData = useMemo(() => {
    const activePair = pairA && pairB && pairA !== pairB ? [pairA, pairB] : null;

    const filteredResearchers = researchers.filter((r) => {
      if (careerFilter === 'ecr' && !['postdoc', 'phd', 'msc', 'ic'].includes(r.role)) {
        return false;
      }
      if (careerFilter === 'pi' && !['coordinator', 'pi'].includes(r.role)) {
        return false;
      }
      if (activePair) {
        return r.primaryAxis === activePair[0] || r.primaryAxis === activePair[1];
      }
      if (selectedAxes.length > 0) {
        return selectedAxes.includes(r.primaryAxis);
      }
      return true;
    });

    const visibleIds = new Set(filteredResearchers.map((r) => r.id));
    const rMap = new Map(filteredResearchers.map((r) => [r.id, r]));

    // Count cross-axis links per researcher for subtle node sizing
    const crossDegree = new Map<string, number>();
    for (const e of edges) {
      const a = rMap.get(e.source);
      const b = rMap.get(e.target);
      if (a && b && a.primaryAxis !== b.primaryAxis) {
        crossDegree.set(a.id, (crossDegree.get(a.id) || 0) + 1);
        crossDegree.set(b.id, (crossDegree.get(b.id) || 0) + 1);
      }
    }

    const nodes: GraphNode[] = filteredResearchers.map((r) => {
      const ax = AXIS_MAP[r.primaryAxis];
      const isLead = r.role === 'coordinator' || r.role === 'pi';
      const cd = crossDegree.get(r.id) || 0;
      const radius = isLead ? 13 + Math.min(4, cd) : 8.5 + Math.min(4, cd);
      return {
        id: r.id,
        kind: 'researcher',
        label: r.name.replace(' (Exemplo)', ''),
        sublabel: `${ax.code} • ${r.unit}`,
        color: ax.color,
        radius,
        axisId: r.primaryAxis,
        researcher: r,
      };
    });

    const links: GraphLink[] = [];
    let actualCrossCount = 0;

    // Actual collaboration edges
    for (const e of edges) {
      if (!visibleIds.has(e.source) || !visibleIds.has(e.target)) continue;
      const a = rMap.get(e.source)!;
      const b = rMap.get(e.target)!;
      const isCross = a.primaryAxis !== b.primaryAxis;
      if (isCross) actualCrossCount++;

      if (lens === 'latent' && !isCross) continue;
      links.push({
        id: e.id,
        source: e.source,
        target: e.target,
        kind: isCross ? 'actual_cross' : 'actual_intra',
        weight: e.weight,
        label: tText(e.label, lang),
      });
    }

    // Latent cross-axis bridges
    const latentThreshold = activePair ? 48 : 62;
    const maxLatent = activePair ? 25 : 42;
    const topLatent = bridges
      .filter(
        (b) =>
          !b.alreadyConnected &&
          b.score >= latentThreshold &&
          visibleIds.has(b.sourceId) &&
          visibleIds.has(b.targetId)
      )
      .slice(0, maxLatent);

    if (lens === 'hybrid' || lens === 'latent') {
      for (const b of topLatent) {
        links.push({
          id: b.id,
          source: b.sourceId,
          target: b.targetId,
          kind: 'latent',
          weight: b.score / 25,
          score: b.score,
          label: b.reasons[0]?.text[lang],
          bridge: b,
        });
      }
    }

    // Optional Entity Layers (Regions, Hazards, Assets, Missions)
    if (showRegions) {
      for (const reg of STUDY_REGIONS) {
        const members = filteredResearchers.filter((r) => r.regions.includes(reg.id));
        if (members.length === 0) continue;
        const nid = `region:${reg.id}`;
        nodes.push({
          id: nid,
          kind: 'region',
          label: reg.name[lang],
          sublabel: `${reg.state} • ${members.length} ${lang === 'pt' ? 'membros' : 'members'}`,
          color: '#34D399',
          radius: 10,
          regionId: reg.id,
        });
        for (const m of members) {
          links.push({
            id: `el-${nid}-${m.id}`,
            source: m.id,
            target: nid,
            kind: 'entity',
            weight: 1,
          });
        }
      }
    }

    if (showHazards) {
      for (const hz of HAZARDS) {
        const members = filteredResearchers.filter((r) => r.hazards.includes(hz.id));
        if (members.length === 0) continue;
        const nid = `hazard:${hz.id}`;
        nodes.push({
          id: nid,
          kind: 'hazard',
          label: hz.shortName[lang],
          sublabel: `${members.length} ${lang === 'pt' ? 'pesquisadores' : 'researchers'}`,
          color: hz.color,
          radius: 9.5,
          hazardId: hz.id,
        });
        for (const m of members) {
          links.push({
            id: `el-${nid}-${m.id}`,
            source: m.id,
            target: nid,
            kind: 'entity',
            weight: 1,
          });
        }
      }
    }

    if (showAssets) {
      for (const asset of assets) {
        const maintainers = asset.maintainerIds.filter((id) => visibleIds.has(id));
        if (maintainers.length === 0) continue;
        const nid = `asset:${asset.id}`;
        nodes.push({
          id: nid,
          kind: 'asset',
          label: asset.name,
          sublabel: `${AXIS_MAP[asset.axisId].code} • ${asset.format}`,
          color: '#38BDF8',
          radius: 9.5,
          axisId: asset.axisId,
          asset,
        });
        for (const mid of maintainers) {
          links.push({
            id: `el-${nid}-${mid}`,
            source: mid,
            target: nid,
            kind: 'entity',
            weight: 1.5,
          });
        }
      }
    }

    if (showMissions) {
      for (const mis of missions) {
        const members = mis.memberIds.filter((id) => visibleIds.has(id));
        if (members.length === 0) continue;
        const nid = `mission:${mis.id}`;
        nodes.push({
          id: nid,
          kind: 'mission',
          label: tText(mis.title, lang),
          sublabel: `${mis.activeAxes.length} ${lang === 'pt' ? 'eixos ativos' : 'active axes'}`,
          color: '#C084FC',
          radius: 12,
          mission: mis,
        });
        for (const mid of members) {
          links.push({
            id: `el-${nid}-${mid}`,
            source: mid,
            target: nid,
            kind: 'entity',
            weight: 1.5,
          });
        }
      }
    }

    // Ego-network neighbor set
    const egoNeighbors = new Set<string>();
    if (effectiveEgoId && visibleIds.has(effectiveEgoId)) {
      egoNeighbors.add(effectiveEgoId);
      for (const l of links) {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const tg = typeof l.target === 'string' ? l.target : l.target.id;
        if (s === effectiveEgoId) egoNeighbors.add(tg);
        if (tg === effectiveEgoId) egoNeighbors.add(s);
      }
    }

    return {
      nodes,
      links,
      visibleResearchersCount: filteredResearchers.length,
      actualCrossCount,
      latentCount: topLatent.length,
      egoNeighbors,
    };
  }, [
    researchers,
    edges,
    bridges,
    assets,
    missions,
    careerFilter,
    selectedAxes,
    pairA,
    pairB,
    lens,
    showRegions,
    showHazards,
    showAssets,
    showMissions,
    effectiveEgoId,
    lang,
  ]);

  // Run D3 simulation and render to Retina HTML5 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Preserve previous positions for smooth layout transitions
    const prevPos = new Map(nodesRef.current.map((n) => [n.id, { x: n.x, y: n.y }]));
    const simNodes: GraphNode[] = graphData.nodes.map((n) => {
      const prev = prevPos.get(n.id);
      const anchor = n.axisId
        ? getAxisAnchor(n.axisId, layout, width, height)
        : { x: width / 2, y: height / 2 };
      return {
        ...n,
        x: prev?.x ?? anchor.x + (Math.random() - 0.5) * 65,
        y: prev?.y ?? anchor.y + (Math.random() - 0.5) * 65,
      };
    });
    const simLinks: GraphLink[] = graphData.links.map((l) => ({ ...l }));

    nodesRef.current = simNodes;
    linksRef.current = simLinks;

    const draw = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const tr = transformRef.current;
      ctx.translate(tr.x, tr.y);
      ctx.scale(tr.k, tr.k);

      const cx = width / 2;
      const cy = height / 2;
      const activePair = pairA && pairB && pairA !== pairB ? [pairA, pairB] : null;
      const hoverId = hoveredIdRef.current;
      const egoSet = graphData.egoNeighbors;
      const hasEgo = Boolean(effectiveEgoId && egoSet.size > 0);

      // Subtle architectural backdrop cues (Axis Ring or Cascade Columns)
      if (layout === 'constellation' && !activePair) {
        const rx = Math.min(width, height) * 0.34;
        const ry = Math.min(width, height) * 0.33;
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Axis radial labels outside ring
        for (const ax of AXES) {
          if (selectedAxes.length > 0 && !selectedAxes.includes(ax.id)) continue;
          const angle = ((ax.id - 1) / 11) * Math.PI * 2 - Math.PI / 2;
          const lx = cx + Math.cos(angle) * (rx + 56);
          const ly = cy + Math.sin(angle) * (ry + 46);
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = ax.color;
          ctx.fillText(ax.code, lx, ly - 6);
          ctx.font = '500 9.5px Inter, sans-serif';
          ctx.fillStyle = 'rgba(226, 232, 240, 0.72)';
          ctx.fillText(ax.shortName[lang], lx, ly + 7);
        }
        ctx.restore();
      } else if (layout === 'cascade' && !activePair) {
        const cols = [
          { x: width * 0.16, title: lang === 'pt' ? 'FORÇANTES FÍSICAS' : 'PHYSICAL DRIVERS' },
          { x: width * 0.42, title: lang === 'pt' ? 'SISTEMAS SETORIAIS' : 'SECTORAL SYSTEMS' },
          { x: width * 0.68, title: lang === 'pt' ? 'SOCIEDADE & ECONOMIA' : 'SOCIETY & ECONOMY' },
          { x: width * 0.87, title: lang === 'pt' ? 'TRANSVERSAIS' : 'CROSS-CUTTING' },
        ];
        ctx.save();
        for (const c of cols) {
          ctx.beginPath();
          ctx.moveTo(c.x, 38);
          ctx.lineTo(c.x, height - 24);
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
          ctx.setLineDash([3, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.55)';
          ctx.textAlign = 'center';
          ctx.fillText(c.title, c.x, 26);
        }
        ctx.restore();
      }

      // Draw Links
      for (const l of simLinks) {
        const s = l.source as GraphNode;
        const tg = l.target as GraphNode;
        if (s.x == null || s.y == null || tg.x == null || tg.y == null) continue;

        const touchesHover = hoverId && (s.id === hoverId || tg.id === hoverId);
        const inEgo = !hasEgo || (s.id === effectiveEgoId || tg.id === effectiveEgoId);

        let alpha = 0.45;
        if (hasEgo && !inEgo) alpha = 0.04;
        else if (hoverId && !touchesHover) alpha = 0.08;

        ctx.save();
        ctx.beginPath();

        // Curve cross-axis and latent links gently toward center for readability
        if (l.kind === 'actual_cross' || l.kind === 'latent') {
          const mx = (s.x + tg.x) / 2;
          const my = (s.y + tg.y) / 2;
          const pull = l.kind === 'latent' ? 0.16 : 0.1;
          const ctrlX = mx + (cx - mx) * pull;
          const ctrlY = my + (cy - my) * pull;
          ctx.moveTo(s.x, s.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tg.x, tg.y);
        } else {
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tg.x, tg.y);
        }

        if (l.kind === 'actual_intra') {
          const baseA = lens === 'bridges' ? 0.07 : 0.34;
          ctx.strokeStyle = `rgba(148, 163, 184, ${Math.min(baseA, alpha)})`;
          ctx.lineWidth = touchesHover ? 1.8 : 1.1;
        } else if (l.kind === 'actual_cross') {
          const baseA = touchesHover ? 0.95 : hasEgo && !inEgo ? 0.05 : 0.78;
          ctx.strokeStyle = `rgba(45, 212, 191, ${baseA})`;
          ctx.lineWidth = touchesHover ? 2.8 : 1.9;
        } else if (l.kind === 'latent') {
          const baseA = touchesHover ? 0.98 : hasEgo && !inEgo ? 0.05 : lens === 'latent' ? 0.72 : 0.48;
          ctx.strokeStyle = `rgba(251, 191, 36, ${baseA})`;
          ctx.lineWidth = touchesHover ? 2.4 : 1.5;
          ctx.setLineDash([5, 4]);
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${touchesHover ? 0.55 : hasEgo && !inEgo ? 0.03 : 0.18})`;
          ctx.lineWidth = 0.9;
        }

        ctx.stroke();
        ctx.restore();
      }

      // Draw Nodes
      for (const n of simNodes) {
        if (n.x == null || n.y == null) continue;
        const isHovered = hoverId === n.id;
        const isPersona = activePersonaId === n.id || effectiveEgoId === n.id;
        const isDimmed =
          (hasEgo && !egoSet.has(n.id)) ||
          (hoverId &&
            hoverId !== n.id &&
            !simLinks.some((l) => {
              const s = (l.source as GraphNode).id;
              const tg = (l.target as GraphNode).id;
              return (s === hoverId && tg === n.id) || (tg === hoverId && s === n.id);
            }));

        ctx.save();
        ctx.globalAlpha = isDimmed ? 0.16 : 1;

        if (n.kind === 'researcher') {
          const isPI = n.researcher?.role === 'coordinator' || n.researcher?.role === 'pi';

          // Soft glow for hovered or ego/persona
          if (isHovered || isPersona) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius + 7, 0, Math.PI * 2);
            ctx.fillStyle = isPersona ? 'rgba(45, 212, 191, 0.28)' : `${n.color}44`;
            ctx.fill();
          }

          // Outer ring for PIs / Coordinator
          if (isPI) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius + 3, 0, Math.PI * 2);
            ctx.strokeStyle = `${n.color}BB`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }

          // Core circle
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = isPersona ? '#FFFFFF' : '#091318';
          ctx.lineWidth = isPersona ? 2.5 : 1.5;
          ctx.stroke();

          // Label: always show for PIs, hovered, ego, focused pair, or zoomed in
          const showLabel =
            isPI || isHovered || isPersona || Boolean(activePair) || tr.k >= 1.35 || hasEgo;
          if (showLabel && !isDimmed) {
            ctx.font = `${isPI || isHovered ? '600' : '500'} ${isHovered ? 11.5 : 10}px Inter, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            const shortName = n.label.split(' ').slice(0, 2).join(' ');
            const tw = ctx.measureText(shortName).width;
            ctx.fillStyle = 'rgba(9, 19, 24, 0.78)';
            ctx.beginPath();
            ctx.roundRect(n.x - tw / 2 - 4, n.y + n.radius + 4, tw + 8, 15, 4);
            ctx.fill();
            ctx.fillStyle = isHovered ? '#FFFFFF' : 'rgba(241, 245, 249, 0.92)';
            ctx.fillText(shortName, n.x, n.y + n.radius + 6.5);
          }
        } else if (n.kind === 'region') {
          // Diamond
          const r = n.radius;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - r);
          ctx.lineTo(n.x + r, n.y);
          ctx.lineTo(n.x, n.y + r);
          ctx.lineTo(n.x - r, n.y);
          ctx.closePath();
          ctx.fillStyle = '#10B981';
          ctx.fill();
          ctx.strokeStyle = '#ECFDF5';
          ctx.lineWidth = 1.4;
          ctx.stroke();
        } else if (n.kind === 'hazard') {
          // Triangle
          const r = n.radius;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - r);
          ctx.lineTo(n.x + r * 0.95, n.y + r * 0.8);
          ctx.lineTo(n.x - r * 0.95, n.y + r * 0.8);
          ctx.closePath();
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFBEB';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (n.kind === 'asset') {
          // Hexagon
          const r = n.radius;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            const px = n.x + r * Math.cos(a);
            const py = n.y + r * Math.sin(a);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fillStyle = '#0284C7';
          ctx.fill();
          ctx.strokeStyle = '#E0F2FE';
          ctx.lineWidth = 1.3;
          ctx.stroke();
        } else if (n.kind === 'mission') {
          // Double Violet Ring
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.24)';
          ctx.fill();
          ctx.strokeStyle = '#C084FC';
          ctx.lineWidth = 2.2;
          ctx.stroke();
        }

        // Entity node label when hovered or zoomed
        if (n.kind !== 'researcher' && (isHovered || tr.k >= 1.25) && !isDimmed) {
          ctx.font = '600 10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#F8FAFC';
          const shortLbl = n.label.length > 26 ? `${n.label.slice(0, 24)}…` : n.label;
          ctx.fillText(shortLbl, n.x, n.y + n.radius + 11);
        }

        ctx.restore();
      }

      ctx.restore();
    };

    const activePair = pairA && pairB && pairA !== pairB ? [pairA, pairB] : null;
    const sim = forceSimulation<GraphNode>(simNodes)
      .force(
        'link',
        forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance((l) => {
            if (l.kind === 'actual_intra') return 58;
            if (l.kind === 'entity') return 85;
            return activePair ? 170 : 140;
          })
          .strength((l) => {
            if (l.kind === 'actual_intra') return layout === 'organic' ? 0.65 : 0.25;
            if (l.kind === 'actual_cross') return layout === 'organic' ? 0.35 : 0.06;
            if (l.kind === 'latent') return 0.02;
            return 0.1;
          })
      )
      .force('charge', forceManyBody().strength(layout === 'organic' ? -240 : -115))
      .force('collide', forceCollide<GraphNode>().radius((d) => d.radius + 13).iterations(2));

    if (activePair) {
      sim
        .force(
          'x',
          forceX<GraphNode>((d) => {
            if (d.axisId === activePair[0]) return width * 0.28;
            if (d.axisId === activePair[1]) return width * 0.72;
            return width * 0.5;
          }).strength(0.32)
        )
        .force('y', forceY<GraphNode>(height / 2).strength(0.1));
    } else if (layout === 'constellation' || layout === 'cascade') {
      sim
        .force(
          'x',
          forceX<GraphNode>((d) =>
            d.axisId ? getAxisAnchor(d.axisId, layout, width, height).x : width / 2
          ).strength((d) => (d.kind === 'researcher' ? 0.32 : 0.08))
        )
        .force(
          'y',
          forceY<GraphNode>((d) =>
            d.axisId ? getAxisAnchor(d.axisId, layout, width, height).y : height / 2
          ).strength((d) => (d.kind === 'researcher' ? 0.32 : 0.08))
        );
    } else {
      sim
        .force('x', forceX<GraphNode>(width / 2).strength(0.06))
        .force('y', forceY<GraphNode>(height / 2).strength(0.06));
    }

    sim.on('tick', draw);
    simRef.current = sim;

    // Helper: screen to graph coordinate hit test
    const findNodeAt = (clientX: number, clientY: number): { node: GraphNode; sx: number; sy: number } | null => {
      const rect = canvas.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      const tr = transformRef.current;
      const gx = (sx - tr.x) / tr.k;
      const gy = (sy - tr.y) / tr.k;

      for (let i = simNodes.length - 1; i >= 0; i--) {
        const n = simNodes[i];
        if (n.x == null || n.y == null) continue;
        const dx = gx - n.x;
        const dy = gy - n.y;
        const hitR = n.radius + 7;
        if (dx * dx + dy * dy <= hitR * hitR) {
          return { node: n, sx, sy };
        }
      }
      return null;
    };

    // Zoom behavior (disabled while dragging a node)
    const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.4, 3.2])
      .filter((event) => {
        if (event.type === 'mousedown' || event.type === 'pointerdown') {
          const hit = findNodeAt(event.clientX, event.clientY);
          if (hit) return false;
        }
        return !event.button;
      })
      .on('zoom', (event) => {
        transformRef.current = event.transform;
        draw();
      });

    zoomBehaviorRef.current = zoomBehavior;
    const d3Canvas = select(canvas);
    d3Canvas.call(zoomBehavior);
    d3Canvas.call(zoomBehavior.transform, transformRef.current);

    let pointerDownPos: { x: number; y: number } | null = null;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      const hit = findNodeAt(e.clientX, e.clientY);
      if (hit) {
        dragNodeRef.current = hit.node;
        pointerDownPos = { x: e.clientX, y: e.clientY };
        moved = false;
        hit.node.fx = hit.node.x;
        hit.node.fy = hit.node.y;
        sim.alphaTarget(0.25).restart();
        canvas.setPointerCapture(e.pointerId);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (dragNodeRef.current) {
        if (
          pointerDownPos &&
          Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y) > 4
        ) {
          moved = true;
        }
        const rect = canvas.getBoundingClientRect();
        const tr = transformRef.current;
        dragNodeRef.current.fx = (e.clientX - rect.left - tr.x) / tr.k;
        dragNodeRef.current.fy = (e.clientY - rect.top - tr.y) / tr.k;
        draw();
        return;
      }

      const hit = findNodeAt(e.clientX, e.clientY);
      const nextId = hit ? hit.node.id : null;
      canvas.style.cursor = hit ? 'pointer' : 'grab';
      if (hoveredIdRef.current !== nextId) {
        hoveredIdRef.current = nextId;
        draw();
      }
      setHoveredNode(hit);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragNodeRef.current) {
        const clicked = dragNodeRef.current;
        clicked.fx = null;
        clicked.fy = null;
        dragNodeRef.current = null;
        sim.alphaTarget(0);
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}

        if (!moved) {
          if (clicked.kind === 'researcher' && clicked.researcher) {
            setSelectedEntity(null);
            onSelectResearcher(clicked.researcher.id);
          } else {
            setSelectedEntity(clicked);
          }
        }
      }
    };

    const onPointerLeave = () => {
      if (!dragNodeRef.current) {
        hoveredIdRef.current = null;
        setHoveredNode(null);
        draw();
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerLeave);

    return () => {
      sim.stop();
      d3Canvas.on('.zoom', null);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [graphData, dimensions, layout, lens, pairA, pairB, selectedAxes, activePersonaId, effectiveEgoId, lang, onSelectResearcher]);

  const handleResetZoom = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    transformRef.current = zoomIdentity;
    if (zoomBehaviorRef.current) {
      select(canvas).call(zoomBehaviorRef.current.transform, zoomIdentity);
    }
    simRef.current?.alpha(0.3).restart();
  };

  const toggleAxisFilter = (axId: AxisId) => {
    setPairA('');
    setPairB('');
    onChangeAxisPair(null);
    setSelectedAxes((prev) =>
      prev.includes(axId) ? prev.filter((id) => id !== axId) : [...prev, axId]
    );
  };

  const applyPair = (a: AxisId | '', b: AxisId | '') => {
    setPairA(a);
    setPairB(b);
    if (a && b && a !== b) {
      setSelectedAxes([]);
      onChangeAxisPair([a, b]);
    } else if (!a && !b) {
      onChangeAxisPair(null);
    }
  };

  // Members connected to a clicked non-researcher entity node
  const selectedEntityMembers = useMemo(() => {
    if (!selectedEntity) return [];
    if (selectedEntity.regionId) {
      return researchers.filter((r) => r.regions.includes(selectedEntity.regionId!));
    }
    if (selectedEntity.hazardId) {
      return researchers.filter((r) => r.hazards.includes(selectedEntity.hazardId!));
    }
    if (selectedEntity.asset) {
      return researchers.filter((r) => selectedEntity.asset!.maintainerIds.includes(r.id));
    }
    if (selectedEntity.mission) {
      return researchers.filter((r) => selectedEntity.mission!.memberIds.includes(r.id));
    }
    return [];
  }, [selectedEntity, researchers]);

  // Top pair bridge highlight when 2 axes are focused
  const pairBridges = useMemo(() => {
    if (!pairA || !pairB || pairA === pairB) return [];
    return bridges
      .filter(
        (b) =>
          (b.sourceAxis === pairA && b.targetAxis === pairB) ||
          (b.sourceAxis === pairB && b.targetAxis === pairA)
      )
      .slice(0, 4);
  }, [bridges, pairA, pairB]);

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  return (
    <div className="space-y-3.5">
      {/* Compact Top Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Layout switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.layoutLabel}
            </span>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              {(['constellation', 'cascade', 'organic'] as LayoutMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setLayout(m)}
                  className={`px-2.5 py-1.5 rounded-md transition cursor-pointer ${
                    layout === m
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.layouts[m]}
                </button>
              ))}
            </div>
          </div>

          {/* Anti-Silo Lens */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t.siloLens}
            </span>
            <select
              value={lens}
              onChange={(e) => onChangeLens(e.target.value as SiloLens)}
              className="text-xs font-semibold bg-teal-50 text-teal-950 border border-teal-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="hybrid">{t.lenses.hybrid}</option>
              <option value="bridges">{t.lenses.bridges}</option>
              <option value="latent">{t.lenses.latent}</option>
              <option value="all">{t.lenses.all}</option>
            </select>

            {/* Career filter */}
            <select
              value={careerFilter}
              onChange={(e) => setCareerFilter(e.target.value as CareerFilter)}
              className="text-xs font-medium bg-slate-50 text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
              aria-label={t.careerFilter}
            >
              <option value="all">{t.allCareers}</option>
              <option value="ecr">{t.ecrOnly}</option>
              <option value="pi">{t.piOnly}</option>
            </select>
          </div>
        </div>

        {/* Second Row: Node Layers + Axis Pair Focus + Ego Spotlight */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-slate-100">
          {/* Entity node layers */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
              <Layers className="w-3.5 h-3.5" />
              {t.layers}:
            </span>
            {[
              { key: 'regions', active: showRegions, toggle: () => setShowRegions((v) => !v), dot: '#10B981' },
              { key: 'hazards', active: showHazards, toggle: () => setShowHazards((v) => !v), dot: '#F97316' },
              { key: 'assets', active: showAssets, toggle: () => setShowAssets((v) => !v), dot: '#0284C7' },
              { key: 'missions', active: showMissions, toggle: () => setShowMissions((v) => !v), dot: '#A855F7' },
            ].map((layer) => (
              <button
                key={layer.key}
                onClick={layer.toggle}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer ${
                  layer.active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: layer.dot }}
                />
                {t.layerLabels[layer.key as keyof typeof t.layerLabels]}
              </button>
            ))}
          </div>

          {/* Axis pair compare + Ego spotlight */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
              <Filter className="w-3 h-3 text-slate-400" />
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                {t.pairFocus}:
              </span>
              <select
                value={pairA}
                onChange={(e) => applyPair(e.target.value ? (Number(e.target.value) as AxisId) : '', pairB)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="">Eixo A</option>
                {AXES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.code} {a.shortName[lang]}
                  </option>
                ))}
              </select>
              <span className="text-slate-400 font-bold">↔</span>
              <select
                value={pairB}
                onChange={(e) => applyPair(pairA, e.target.value ? (Number(e.target.value) as AxisId) : '')}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="">Eixo B</option>
                {AXES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.code} {a.shortName[lang]}
                  </option>
                ))}
              </select>
              {(pairA || pairB) && (
                <button
                  onClick={() => applyPair('', '')}
                  className="p-0.5 text-slate-400 hover:text-slate-800 cursor-pointer"
                  title={t.clearFocus}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {(activePersonaId || focusedResearcherId) && (
              <button
                onClick={() => {
                  if (egoActive) {
                    setEgoActive(false);
                    onClearFocusedResearcher();
                  } else {
                    setEgoActive(true);
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                  egoActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white text-teal-800 border-teal-300 hover:bg-teal-50'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                {t.egoMode}
              </button>
            )}
          </div>
        </div>

        {/* Interactive 11-Axis Filter Strip */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {AXES.map((ax) => {
            const active =
              selectedAxes.includes(ax.id) || pairA === ax.id || pairB === ax.id;
            const dimmed =
              (selectedAxes.length > 0 || (pairA && pairB)) && !active;
            return (
              <button
                key={ax.id}
                onClick={() => toggleAxisFilter(ax.id)}
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold border transition cursor-pointer ${
                  active
                    ? 'text-white shadow-2xs'
                    : dimmed
                    ? 'bg-slate-50 text-slate-400 border-slate-200/70 hover:text-slate-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
                style={
                  active
                    ? { backgroundColor: ax.color, borderColor: ax.color }
                    : undefined
                }
                title={ax.name[lang]}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: active ? '#ffffff' : ax.color }}
                />
                <span className="font-mono-code">{ax.code}</span>
                <span className="hidden xl:inline">{ax.shortName[lang]}</span>
              </button>
            );
          })}
          {selectedAxes.length > 0 && (
            <button
              onClick={() => setSelectedAxes([])}
              className="text-[11px] font-semibold text-teal-700 hover:underline px-2 cursor-pointer"
            >
              {t.clearFocus}
            </button>
          )}
        </div>
      </div>

      {/* Main Deep Observatory Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[630px] lg:h-[690px] rounded-2xl overflow-hidden observatory-bg observatory-grid border border-slate-800/90 shadow-xl"
      >
        <canvas ref={canvasRef} className="block w-full h-full touch-none" />

        {/* Top-left Live Telemetry Pill */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/75 backdrop-blur-md border border-slate-700/70 text-[11px] text-slate-200 flex items-center gap-3">
            <span>
              <strong className="font-mono-code text-white">{graphData.visibleResearchersCount}</strong>{' '}
              {t.statsVisible}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-teal-300">
              <strong className="font-mono-code">{graphData.actualCrossCount}</strong>{' '}
              {t.statsActualCross}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-300">
              <strong className="font-mono-code">{graphData.latentCount}</strong>{' '}
              {t.statsLatent}
            </span>
          </div>

          {effectiveEgoId && rById.get(effectiveEgoId) && (
            <div className="pointer-events-auto px-3 py-1.5 rounded-xl bg-teal-950/90 border border-teal-400/50 text-xs text-teal-100 flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-teal-300" />
              <span>
                Ego: <strong>{rById.get(effectiveEgoId)!.name}</strong>
              </span>
              <button
                onClick={() => {
                  setEgoActive(false);
                  onClearFocusedResearcher();
                }}
                className="text-teal-300 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Top-right Zoom Reset */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
          <button
            onClick={handleResetZoom}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/75 hover:bg-slate-900 text-slate-200 border border-slate-700/70 text-xs font-medium backdrop-blur-md cursor-pointer"
            title={t.resetZoom}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.resetZoom}</span>
          </button>
        </div>

        {/* Bottom-left Legend */}
        <div className="absolute bottom-3.5 left-3.5 max-w-md px-3.5 py-2.5 rounded-xl bg-slate-950/78 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 space-y-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-5 h-0.5 bg-teal-400 inline-block rounded" />
            <span>{t.legendSolid}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-0 border-t-2 border-dashed border-amber-400 inline-block" />
            <span>{t.legendDashed}</span>
          </div>
          <p className="text-[10px] text-slate-400 pt-0.5">{t.clickHint}</p>
        </div>

        {/* Axis Pair Inspector Overlay (when 2 axes focused!) */}
        {pairA && pairB && pairA !== pairB && (
          <div className="absolute bottom-3.5 right-3.5 w-80 sm:w-96 max-h-72 overflow-y-auto rounded-xl bg-slate-950/90 backdrop-blur-md border border-teal-500/40 p-3.5 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span style={{ color: AXIS_MAP[pairA].color }}>{AXIS_MAP[pairA].code}</span>
                <span>↔</span>
                <span style={{ color: AXIS_MAP[pairB].color }}>{AXIS_MAP[pairB].code}</span>
                <span className="text-slate-400 font-normal">
                  ({pairBridges.length} {lang === 'pt' ? 'pontes' : 'bridges'})
                </span>
              </div>
              <button
                onClick={() => applyPair('', '')}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {pairBridges.length === 0 ? (
              <p className="text-xs text-slate-400">
                {lang === 'pt'
                  ? 'Nenhuma ponte forte detectada ainda entre estes dois eixos.'
                  : 'No strong bridges detected yet between these two axes.'}
              </p>
            ) : (
              <div className="space-y-2">
                {pairBridges.map((b) => {
                  const rA = rById.get(b.sourceId);
                  const rB = rById.get(b.targetId);
                  if (!rA || !rB) return null;
                  return (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] space-y-1"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-semibold text-white truncate">
                          {rA.name.split(' ')[0]} ↔ {rB.name.split(' ')[0]}
                        </span>
                        <span className="font-mono-code font-bold text-amber-300 shrink-0">
                          {b.score}%
                        </span>
                      </div>
                      <p className="text-slate-300 leading-snug">{b.reasons[0]?.text[lang]}</p>
                      <button
                        onClick={() => onOpenWarmIntro(rB, b)}
                        className="text-teal-300 hover:text-teal-200 font-semibold cursor-pointer"
                      >
                        {UI[lang].handshakes.draftIntro} →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Selected Entity Node Inspector (Region / Hazard / Asset / Mission) */}
        {selectedEntity && (
          <div className="absolute bottom-3.5 right-3.5 w-80 max-h-72 overflow-y-auto rounded-xl bg-slate-950/92 backdrop-blur-md border border-slate-700 p-3.5 text-slate-100 shadow-2xl">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="text-[10px] font-mono-code uppercase tracking-wider text-teal-400">
                  {selectedEntity.kind}
                </div>
                <h4 className="font-display font-bold text-sm text-white leading-snug">
                  {selectedEntity.label}
                </h4>
                {selectedEntity.sublabel && (
                  <p className="text-[11px] text-slate-400">{selectedEntity.sublabel}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5 mt-2">
              {selectedEntityMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelectResearcher(m.id)}
                  className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left text-xs cursor-pointer"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: AXIS_MAP[m.primaryAxis].color }}
                    />
                    <span className="truncate font-medium text-slate-100">{m.name}</span>
                  </span>
                  <span className="font-mono-code text-[10px] text-slate-400 shrink-0">
                    {AXIS_MAP[m.primaryAxis].code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crisp Floating Hover Tooltip */}
        {hoveredNode && !dragNodeRef.current && (
          <div
            className="pointer-events-none absolute z-20 max-w-xs px-3 py-2.5 rounded-xl bg-slate-950/92 backdrop-blur-md border border-slate-700/90 shadow-2xl text-xs text-slate-100"
            style={{
              left: Math.min(dimensions.width - 250, Math.max(12, hoveredNode.sx + 16)),
              top: Math.min(dimensions.height - 130, Math.max(12, hoveredNode.sy - 12)),
            }}
          >
            {hoveredNode.node.kind === 'researcher' && hoveredNode.node.researcher ? (
              <>
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                    style={{ backgroundColor: hoveredNode.node.color }}
                  >
                    {AXIS_MAP[hoveredNode.node.researcher.primaryAxis].code}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {ROLE_LABELS[hoveredNode.node.researcher.role][lang]}
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-white">
                  {hoveredNode.node.researcher.name}
                </div>
                <div className="text-[11px] text-slate-300">
                  {hoveredNode.node.researcher.unit} • {hoveredNode.node.researcher.city}
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] text-teal-300">
                  <span>{hoveredNode.node.researcher.offers.length} {UI[lang].directory.offersCount}</span>
                  <span>•</span>
                  <span className="text-amber-300">
                    {hoveredNode.node.researcher.needs.length} {UI[lang].directory.needsCount}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="font-bold text-white">{hoveredNode.node.label}</div>
                {hoveredNode.node.sublabel && (
                  <div className="text-[11px] text-slate-400">{hoveredNode.node.sublabel}</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
