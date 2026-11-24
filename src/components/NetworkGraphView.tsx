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
import { ArrowLeft, Search, X } from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { ROLE_LABELS, UI } from '../i18n';
import {
  AxisId,
  CollaborationEdge,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

export type EdgeMode = 'all' | 'coauthor' | 'topic';

interface GraphNode extends SimulationNodeDatum {
  id: string;
  kind: 'axis_bubble' | 'researcher';
  label: string;
  sublabel: string;
  countLabel?: string;
  color: string;
  radius: number;
  axisId: AxisId;
  researcher?: Researcher;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  kind: 'coauthor' | 'topic';
  weight: number;
  tag: string;
  detail?: string;
  color: string;
}

interface NetworkGraphViewProps {
  researchers: Researcher[];
  edges: CollaborationEdge[];
  bridges: LatentBridge[];
  lang: Lang;
  focusedResearcherId: string | null;
  onClearFocusedResearcher: () => void;
  onSelectResearcher: (id: string) => void;
}

function getMacroPos(axisId: AxisId, w: number, h: number): { x: number; y: number } {
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.min(w, h) * 0.35;
  const ry = Math.min(w, h) * 0.34;
  const angle = ((axisId - 1) / 11) * Math.PI * 2 - Math.PI / 2;
  return {
    x: cx + Math.cos(angle) * rx,
    y: cy + Math.sin(angle) * ry,
  };
}

export const NetworkGraphView: React.FC<NetworkGraphViewProps> = ({
  researchers,
  edges,
  bridges,
  lang,
  focusedResearcherId,
  onClearFocusedResearcher,
  onSelectResearcher,
}) => {
  const t = UI[lang].graph;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dimensions, setDimensions] = useState({ width: 1100, height: 650 });
  const [expandedAxes, setExpandedAxes] = useState<AxisId[]>([]);
  const [egoId, setEgoId] = useState<string | null>(focusedResearcherId);
  const [edgeMode, setEdgeMode] = useState<EdgeMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    subtitle: string;
    extra?: string;
    color: string;
    sx: number;
    sy: number;
  } | null>(null);

  const transformRef = useRef<ZoomTransform>(zoomIdentity);
  const zoomBehaviorRef = useRef<ReturnType<typeof zoom<HTMLCanvasElement, unknown>> | null>(
    null
  );
  const simRef = useRef<Simulation<GraphNode, GraphLink> | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const dragNodeRef = useRef<GraphNode | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // When a researcher is focused from the Drawer or Search, enter Ego Expansion!
  useEffect(() => {
    if (focusedResearcherId) {
      setEgoId(focusedResearcherId);
      const r = researchers.find((x) => x.id === focusedResearcherId);
      if (r) setExpandedAxes([r.primaryAxis]);
    }
  }, [focusedResearcherId, researchers]);

  useEffect(() => {
    for (const r of researchers) {
      if (r.photoUrl && !imageCacheRef.current.has(r.id)) {
        const img = new Image();
        img.src = r.photoUrl;
        imageCacheRef.current.set(r.id, img);
      }
    }
  }, [researchers]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: Math.max(320, Math.floor(entry.contentRect.width)),
          height: Math.max(540, Math.floor(entry.contentRect.height)),
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const isMacro = expandedAxes.length === 0 && !egoId;
  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  // Build either MACRO (11 Axis Bubbles) or EXPANDED (Selected Axes / Ego Researchers)
  const graphData = useMemo(() => {
    if (isMacro) {
      const counts = new Map<AxisId, number>();
      for (const ax of AXES) counts.set(ax.id, 0);
      for (const r of researchers) counts.set(r.primaryAxis, (counts.get(r.primaryAxis) || 0) + 1);

      const nodes: GraphNode[] = AXES.map((ax) => {
        const cnt = counts.get(ax.id) || 0;
        return {
          id: `ax-${ax.id}`,
          kind: 'axis_bubble',
          label: ax.code,
          sublabel: ax.shortName[lang],
          countLabel: `${cnt} ${lang === 'pt' ? 'membros' : 'members'}`,
          color: ax.color,
          radius: 24 + Math.min(20, Math.sqrt(cnt) * 3.2),
          axisId: ax.id,
        };
      });

      const links: GraphLink[] = [];

      // Aggregate real empirical cross-axis co-authored papers
      if (edgeMode === 'all' || edgeMode === 'coauthor') {
        const pairPapers = new Map<string, number>();
        for (const e of edges) {
          const a = rById.get(e.source);
          const b = rById.get(e.target);
          if (!a || !b || a.primaryAxis === b.primaryAxis) continue;
          const k = [a.primaryAxis, b.primaryAxis].sort((x, y) => x - y).join('-');
          pairPapers.set(k, (pairPapers.get(k) || 0) + (e.paperCount || 1));
        }
        for (const [k, cnt] of pairPapers.entries()) {
          const [a1, a2] = k.split('-').map(Number);
          links.push({
            id: `mac-co-${k}`,
            source: `ax-${a1}`,
            target: `ax-${a2}`,
            kind: 'coauthor',
            weight: Math.min(7, 1.5 + Math.log2(cnt + 1) * 1.4),
            tag: `${cnt} ${lang === 'pt' ? 'artigos juntos' : 'joint papers'}`,
            color: '#2DD4BF',
          });
        }
      }

      // Aggregate untapped topic bridges between axes with 0 co-authored papers
      if (edgeMode === 'all' || edgeMode === 'topic') {
        const coSet = new Set(links.map((l) => `${l.source}--${l.target}`));
        const pairBridges = new Map<string, { count: number; sampleTopic: string }>();
        for (const br of bridges) {
          if (br.score < 54) continue;
          const [a1, a2] = [br.sourceAxis, br.targetAxis].sort((x, y) => x - y);
          if (coSet.has(`ax-${a1}--ax-${a2}`)) continue;
          const k = `${a1}-${a2}`;
          const prev = pairBridges.get(k);
          if (!prev) {
            pairBridges.set(k, {
              count: 1,
              sampleTopic: br.reasons[0]?.shortTag[lang] || '',
            });
          } else {
            prev.count++;
          }
        }
        for (const [k, info] of pairBridges.entries()) {
          if (info.count < 2) continue;
          const [a1, a2] = k.split('-').map(Number);
          links.push({
            id: `mac-top-${k}`,
            source: `ax-${a1}`,
            target: `ax-${a2}`,
            kind: 'topic',
            weight: Math.min(3.2, 1 + info.count * 0.2),
            tag: `${info.count} ${lang === 'pt' ? 'pontes temáticas' : 'topic bridges'}`,
            detail: info.sampleTopic,
            color: '#FBBF24',
          });
        }
      }

      return { nodes, links };
    }

    // EXPANDED MODE: Show researchers in expandedAxes + their direct cross-axis co-authors / ego neighbors!
    const includeIds = new Set<string>();
    if (egoId && rById.has(egoId)) {
      includeIds.add(egoId);
      for (const e of edges) {
        if (e.source === egoId) includeIds.add(e.target);
        if (e.target === egoId) includeIds.add(e.source);
      }
      for (const b of bridges.filter((x) => x.sourceId === egoId || x.targetId === egoId).slice(0, 8)) {
        includeIds.add(b.sourceId);
        includeIds.add(b.targetId);
      }
    } else {
      for (const r of researchers) {
        if (expandedAxes.includes(r.primaryAxis)) {
          includeIds.add(r.id);
        }
      }
      // Also pull external cross-axis co-authors so bridges out of the expanded axis are visible!
      if (expandedAxes.length === 1) {
        for (const e of edges) {
          const a = rById.get(e.source);
          const b = rById.get(e.target);
          if (!a || !b) continue;
          if (a.primaryAxis === expandedAxes[0]) includeIds.add(b.id);
          if (b.primaryAxis === expandedAxes[0]) includeIds.add(a.id);
        }
      }
    }

    const expResearchers = researchers.filter((r) => includeIds.has(r.id));
    const nodes: GraphNode[] = expResearchers.map((r) => {
      const ax = AXIS_MAP[r.primaryAxis];
      const isLead = r.role === 'coordinator' || r.role === 'pi';
      const isCenterEgo = egoId === r.id;
      return {
        id: r.id,
        kind: 'researcher',
        label: r.name,
        sublabel: `${ax.code} • ${r.unit}`,
        countLabel: r.worksCount ? `${r.worksCount} art.` : undefined,
        color: ax.color,
        radius: isCenterEgo ? 18 : isLead ? 15 : 10.5,
        axisId: r.primaryAxis,
        researcher: r,
      };
    });

    const links: GraphLink[] = [];
    if (edgeMode === 'all' || edgeMode === 'coauthor') {
      for (const e of edges) {
        if (!includeIds.has(e.source) || !includeIds.has(e.target)) continue;
        const a = rById.get(e.source)!;
        const b = rById.get(e.target)!;
        const isCross = a.primaryAxis !== b.primaryAxis;
        links.push({
          id: e.id,
          source: e.source,
          target: e.target,
          kind: 'coauthor',
          weight: isCross ? 2.6 : 1.5,
          tag: `🤝 ${e.paperCount || 1} art.`,
          detail: e.samplePaperTitle,
          color: isCross ? '#2DD4BF' : 'rgba(148, 163, 184, 0.55)',
        });
      }
    }

    if (edgeMode === 'all' || edgeMode === 'topic') {
      const relBridges = bridges
        .filter((b) => includeIds.has(b.sourceId) && includeIds.has(b.targetId))
        .slice(0, egoId ? 10 : 28);
      for (const b of relBridges) {
        links.push({
          id: b.id,
          source: b.sourceId,
          target: b.targetId,
          kind: 'topic',
          weight: 1.6,
          tag: b.reasons[0]?.shortTag[lang] || '🧬 Tema comum',
          color: '#FBBF24',
        });
      }
    }

    return { nodes, links };
  }, [isMacro, researchers, edges, bridges, expandedAxes, egoId, edgeMode, lang, rById]);

  const searchedResearchers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return researchers
      .filter((r) => r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q))
      .slice(0, 6);
  }, [researchers, searchQuery]);

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

    transformRef.current = zoomIdentity;

    const simNodes: GraphNode[] = graphData.nodes.map((n) => {
      if (n.kind === 'axis_bubble') {
        const pos = getMacroPos(n.axisId, width, height);
        return { ...n, x: pos.x, y: pos.y, fx: pos.x, fy: pos.y };
      }
      if (egoId && n.id === egoId) {
        return { ...n, x: width / 2, y: height / 2 };
      }
      return {
        ...n,
        x: width / 2 + (Math.random() - 0.5) * 260,
        y: height / 2 + (Math.random() - 0.5) * 220,
      };
    });
    const simLinks: GraphLink[] = graphData.links.map((l) => ({ ...l }));

    const draw = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const tr = transformRef.current;
      ctx.translate(tr.x, tr.y);
      ctx.scale(tr.k, tr.k);

      const cx = width / 2;
      const cy = height / 2;
      const hoverId = hoveredIdRef.current;

      // Subtle guide ring in Macro View
      if (isMacro) {
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          Math.min(width, height) * 0.35,
          Math.min(width, height) * 0.34,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.12)';
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw Links
      for (const l of simLinks) {
        const s = l.source as GraphNode;
        const tg = l.target as GraphNode;
        if (s.x == null || s.y == null || tg.x == null || tg.y == null) continue;

        const touchesHover = hoverId && (s.id === hoverId || tg.id === hoverId);
        const dimmed = Boolean(hoverId && !touchesHover);

        ctx.save();
        ctx.beginPath();
        const mx = (s.x + tg.x) / 2;
        const my = (s.y + tg.y) / 2;
        const ctrlX = mx + (cx - mx) * 0.14;
        const ctrlY = my + (cy - my) * 0.14;
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, tg.x, tg.y);

        ctx.strokeStyle = l.color;
        ctx.globalAlpha = dimmed ? 0.08 : touchesHover ? 0.96 : isMacro ? 0.72 : 0.62;
        ctx.lineWidth = touchesHover ? l.weight + 1.2 : l.weight;
        if (l.kind === 'topic') {
          ctx.setLineDash([5, 4]);
        }
        ctx.stroke();

        // Draw badge on link when hovered (or on major macro co-authorship chords)
        if (touchesHover || (isMacro && l.kind === 'coauthor' && l.weight >= 3.2 && !hoverId)) {
          const bx = (s.x + tg.x) / 2 + (cx - mx) * 0.07;
          const by = (s.y + tg.y) / 2 + (cy - my) * 0.07;
          ctx.font = '600 10px Inter, sans-serif';
          const tw = ctx.measureText(l.tag).width;
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = '#091219';
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.roundRect(bx - tw / 2 - 5, by - 8.5, tw + 10, 17, 5);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#F8FAFC';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(l.tag, bx, by);
        }

        ctx.restore();
      }

      // Draw Nodes
      for (const n of simNodes) {
        if (n.x == null || n.y == null) continue;
        const isHovered = hoverId === n.id;

        if (n.kind === 'axis_bubble') {
          ctx.save();
          if (isHovered) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius + 9, 0, Math.PI * 2);
            ctx.fillStyle = `${n.color}40`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${n.color}26`;
          ctx.fill();
          ctx.strokeStyle = n.color;
          ctx.lineWidth = isHovered ? 3.5 : 2.5;
          ctx.stroke();

          ctx.font = '800 13px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y - 5);

          ctx.font = '600 9.5px Inter, sans-serif';
          ctx.fillStyle = '#CBD5E1';
          ctx.fillText(n.countLabel || '', n.x, n.y + 10);

          // Outer short axis title
          const angle = ((n.axisId - 1) / 11) * Math.PI * 2 - Math.PI / 2;
          const lx = n.x + Math.cos(angle) * (n.radius + 26);
          const ly = n.y + Math.sin(angle) * (n.radius + 20);
          ctx.font = '700 11px Inter, sans-serif';
          ctx.fillStyle = isHovered ? '#5EEAD4' : '#F8FAFC';
          ctx.fillText(n.sublabel, lx, ly);
          ctx.restore();
          continue;
        }

        // Researcher Node in Expanded View
        const connectedToHover =
          !hoverId ||
          hoverId === n.id ||
          simLinks.some((l) => {
            const s = (l.source as GraphNode).id;
            const tg = (l.target as GraphNode).id;
            return (s === hoverId && tg === n.id) || (tg === hoverId && s === n.id);
          });

        ctx.save();
        ctx.globalAlpha = connectedToHover ? 1 : 0.18;

        if (isHovered || egoId === n.id) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = `${n.color}55`;
          ctx.fill();
        }

        const cachedImg = imageCacheRef.current.get(n.id);
        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(
            cachedImg,
            n.x - n.radius,
            n.y - n.radius,
            n.radius * 2,
            n.radius * 2
          );
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? '#FFFFFF' : n.color;
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        // Always readable name in Expanded View!
        const shortName = n.label.split(' ').slice(0, 2).join(' ');
        ctx.font = `${isHovered ? '700' : '600'} 10.5px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const tw = ctx.measureText(shortName).width;
        ctx.fillStyle = 'rgba(8, 16, 22, 0.86)';
        ctx.beginPath();
        ctx.roundRect(n.x - tw / 2 - 4, n.y + n.radius + 4, tw + 8, 15, 4);
        ctx.fill();
        ctx.fillStyle = isHovered ? '#5EEAD4' : '#F8FAFC';
        ctx.fillText(shortName, n.x, n.y + n.radius + 6);

        ctx.restore();
      }

      ctx.restore();
    };

    const sim = forceSimulation<GraphNode>(simNodes)
      .force(
        'link',
        forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance(isMacro ? 200 : 120)
          .strength((l) => (isMacro ? 0 : l.kind === 'coauthor' ? 0.35 : 0.08))
      )
      .force('charge', forceManyBody<GraphNode>().strength(isMacro ? 0 : -260))
      .force('collide', forceCollide<GraphNode>().radius((d) => d.radius + 18).iterations(2));

    if (!isMacro) {
      if (expandedAxes.length === 2) {
        sim
          .force(
            'x',
            forceX<GraphNode>((d) =>
              d.axisId === expandedAxes[0] ? width * 0.3 : width * 0.7
            ).strength(0.26)
          )
          .force('y', forceY<GraphNode>(height / 2).strength(0.12));
      } else {
        sim
          .force('x', forceX<GraphNode>(width / 2).strength(0.09))
          .force('y', forceY<GraphNode>(height / 2).strength(0.09));
      }
    }

    sim.on('tick', draw);
    simRef.current = sim;
    draw();

    const findNodeAt = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const sx = clientX - rect.left;
      const sy = clientY - rect.top;
      const tr = transformRef.current;
      const gx = (sx - tr.x) / tr.k;
      const gy = (sy - tr.y) / tr.k;

      for (let i = simNodes.length - 1; i >= 0; i--) {
        const n = simNodes[i];
        if (n.x == null || n.y == null) continue;
        const hitR = n.radius + 6;
        if ((gx - n.x) ** 2 + (gy - n.y) ** 2 <= hitR * hitR) {
          return { node: n, sx, sy };
        }
      }
      return null;
    };

    const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.5, 3])
      .filter((event) => {
        if (event.type === 'mousedown' || event.type === 'pointerdown') {
          if (findNodeAt(event.clientX, event.clientY)) return false;
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
    d3Canvas.call(zoomBehavior.transform, zoomIdentity);

    let pointerDownPos: { x: number; y: number } | null = null;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      const hit = findNodeAt(e.clientX, e.clientY);
      if (hit) {
        dragNodeRef.current = hit.node;
        pointerDownPos = { x: e.clientX, y: e.clientY };
        moved = false;
        if (hit.node.kind === 'researcher') {
          hit.node.fx = hit.node.x;
          hit.node.fy = hit.node.y;
          sim.alphaTarget(0.25).restart();
        }
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
        if (dragNodeRef.current.kind === 'researcher') {
          const rect = canvas.getBoundingClientRect();
          const tr = transformRef.current;
          dragNodeRef.current.fx = (e.clientX - rect.left - tr.x) / tr.k;
          dragNodeRef.current.fy = (e.clientY - rect.top - tr.y) / tr.k;
          draw();
        }
        return;
      }

      const hit = findNodeAt(e.clientX, e.clientY);
      const nextId = hit ? hit.node.id : null;
      canvas.style.cursor = hit ? 'pointer' : 'grab';
      if (hoveredIdRef.current !== nextId) {
        hoveredIdRef.current = nextId;
        draw();
      }
      if (hit) {
        const n = hit.node;
        setHoveredInfo({
          title: n.kind === 'axis_bubble' ? `${n.label} — ${n.sublabel}` : n.label,
          subtitle:
            n.kind === 'axis_bubble'
              ? n.countLabel || ''
              : `${n.sublabel} • ${
                  n.researcher ? ROLE_LABELS[n.researcher.role][lang === 'pt' ? 'shortPt' : 'shortEn'] : ''
                }`,
          extra:
            n.kind === 'axis_bubble'
              ? lang === 'pt'
                ? 'Clique para expandir pesquisadores'
                : 'Click to expand researchers'
              : n.countLabel,
          color: n.color,
          sx: hit.sx,
          sy: hit.sy,
        });
      } else {
        setHoveredInfo(null);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragNodeRef.current) {
        const clicked = dragNodeRef.current;
        if (clicked.kind === 'researcher') {
          clicked.fx = null;
          clicked.fy = null;
        }
        dragNodeRef.current = null;
        sim.alphaTarget(0);
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}

        if (!moved) {
          if (clicked.kind === 'axis_bubble') {
            setHoveredInfo(null);
            hoveredIdRef.current = null;
            setExpandedAxes([clicked.axisId]);
          } else if (clicked.researcher) {
            onSelectResearcher(clicked.researcher.id);
          }
        }
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    return () => {
      sim.stop();
      d3Canvas.on('.zoom', null);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, [graphData, dimensions, isMacro, expandedAxes, egoId, lang, onSelectResearcher]);

  const toggleAxisPill = (axId: AxisId) => {
    setEgoId(null);
    onClearFocusedResearcher();
    setExpandedAxes((prev) => {
      if (prev.includes(axId)) return prev.filter((x) => x !== axId);
      if (prev.length >= 2) return [prev[1], axId];
      return [...prev, axId];
    });
  };

  return (
    <div className="space-y-3">
      {/* Top Bar: Progressive Disclosure Controls */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {!isMacro && (
              <button
                onClick={() => {
                  setExpandedAxes([]);
                  setEgoId(null);
                  onClearFocusedResearcher();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t.backToMacro}
              </button>
            )}

            <span className="text-xs font-bold text-slate-400">{t.connectBy}</span>
            {(
              [
                { id: 'all', label: t.modes.all },
                { id: 'coauthor', label: t.modes.coauthor },
                { id: 'topic', label: t.modes.topic },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                onClick={() => setEdgeMode(m.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  edgeMode === m.id
                    ? 'bg-slate-900 dark:bg-slate-700 text-white border-transparent'
                    : 'bg-slate-50 dark:bg-[#0B1219] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Search Researcher */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchNode}
              className="pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white w-52 focus:outline-none focus:border-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {searchedResearchers.length > 0 && (
              <div className="absolute right-0 mt-1 w-64 rounded-xl bg-white dark:bg-[#121C26] border border-slate-200 dark:border-slate-700 shadow-xl z-30 py-1">
                {searchedResearchers.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setEgoId(r.id);
                      setExpandedAxes([r.primaryAxis]);
                      setSearchQuery('');
                    }}
                    className="w-full px-3 py-1.5 text-left text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <span className="font-semibold text-slate-900 dark:text-white truncate">
                      {r.name}
                    </span>
                    <span
                      className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white shrink-0"
                      style={{ backgroundColor: AXIS_MAP[r.primaryAxis].color }}
                    >
                      {AXIS_MAP[r.primaryAxis].code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 11-Axis Selector Strip (Click 1 or 2 Axes to Expand/Compare!) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {AXES.map((ax) => {
            const active = expandedAxes.includes(ax.id);
            return (
              <button
                key={ax.id}
                onClick={() => toggleAxisPill(ax.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap border transition cursor-pointer ${
                  active
                    ? 'text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-[#0B1219] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
                style={active ? { backgroundColor: ax.color, borderColor: ax.color } : undefined}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: active ? '#fff' : ax.color }}
                />
                <span className="font-mono-code">{ax.code}</span>
                <span>{ax.shortName[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas Observatory */}
      <div
        ref={containerRef}
        className="relative w-full h-[630px] lg:h-[680px] rounded-2xl overflow-hidden observatory-bg border border-slate-800 shadow-xl"
      >
        <canvas ref={canvasRef} className="block w-full h-full touch-none" />

        {/* Bottom Legend */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] text-slate-200 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#2DD4BF] inline-block" />
              🤝 {lang === 'pt' ? 'Artigos em coautoria (Crossref/OpenAlex)' : 'Real co-authored papers'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0 border-t-2 border-dashed border-[#FBBF24] inline-block" />
              🧬 {lang === 'pt' ? 'Mesmo tema científico (0 artigos juntos)' : 'Shared topic (0 joint papers)'}
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 hidden md:block">
            {isMacro ? t.macroHint : t.expandedHint}
          </div>
        </div>

        {/* Hover Card */}
        {hoveredInfo && !dragNodeRef.current && (
          <div
            className="pointer-events-none absolute z-20 max-w-xs px-3 py-2 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl text-xs text-white"
            style={{
              left: Math.min(dimensions.width - 240, Math.max(12, hoveredInfo.sx + 14)),
              top: Math.min(dimensions.height - 95, Math.max(12, hoveredInfo.sy - 10)),
            }}
          >
            <div className="font-display font-bold text-sm" style={{ color: hoveredInfo.color }}>
              {hoveredInfo.title}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">{hoveredInfo.subtitle}</div>
            {hoveredInfo.extra && (
              <div className="text-[10px] text-teal-400 font-semibold mt-1">
                {hoveredInfo.extra}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
