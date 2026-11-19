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
import { RotateCcw, Search, X } from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import { DOMAIN_LABELS, ROLE_LABELS, UI } from '../i18n';
import {
  AxisId,
  CollaborationEdge,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

export type ConnectionMode = 'all' | 'coauthor' | 'territory' | 'topic';

interface GraphNode extends SimulationNodeDatum {
  id: string;
  kind: 'axis_hub' | 'researcher';
  label: string;
  sublabel: string;
  color: string;
  radius: number;
  axisId: AxisId;
  researcher?: Researcher;
}

interface GraphLink extends SimulationLinkDatum<GraphNode> {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
  kind: 'hub_tether' | 'coauthor' | 'territory' | 'topic';
  tag: string;
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

function getAxisHubPosition(axisId: AxisId, w: number, h: number): { x: number; y: number } {
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.min(w, h) * 0.34;
  const ry = Math.min(w, h) * 0.33;
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

  const [dimensions, setDimensions] = useState({ width: 1100, height: 660 });
  const [mode, setMode] = useState<ConnectionMode>('all');
  const [selectedAxis, setSelectedAxis] = useState<AxisId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [spotlightId, setSpotlightId] = useState<string | null>(focusedResearcherId);
  const [hoveredNode, setHoveredNode] = useState<{
    node: GraphNode;
    sx: number;
    sy: number;
  } | null>(null);

  const transformRef = useRef<ZoomTransform>(zoomIdentity);
  const zoomBehaviorRef = useRef<ReturnType<typeof zoom<HTMLCanvasElement, unknown>> | null>(
    null
  );
  const nodesRef = useRef<GraphNode[]>([]);
  const hoveredIdRef = useRef<string | null>(null);
  const simRef = useRef<Simulation<GraphNode, GraphLink> | null>(null);
  const dragNodeRef = useRef<GraphNode | null>(null);
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());

  useEffect(() => {
    if (focusedResearcherId) {
      setSpotlightId(focusedResearcherId);
    }
  }, [focusedResearcherId]);

  // Preload available researcher photos for canvas rendering
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

  // Build ONE clear, intuitive graph: 11 Axis Hub nodes + Researcher nodes + 3 explicit connection types
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // 1. Add the 11 Axis Hub Nodes
    for (const ax of AXES) {
      if (selectedAxis && ax.id !== selectedAxis) {
        // Still keep all 11 hubs visible as anchors, or dim unselected
      }
      nodes.push({
        id: `hub-${ax.id}`,
        kind: 'axis_hub',
        label: ax.code,
        sublabel: ax.shortName[lang],
        color: ax.color,
        radius: 20,
        axisId: ax.id,
      });
    }

    // 2. Add Researcher Nodes ( tethered to their primary Axis hub )
    const visibleIds = new Set<string>();
    for (const r of researchers) {
      const ax = AXIS_MAP[r.primaryAxis];
      const isLead = r.role === 'coordinator' || r.role === 'pi';
      const hasPhoto = Boolean(r.photoUrl);
      const radius = isLead ? 13 : hasPhoto ? 11 : 6.5;

      visibleIds.add(r.id);
      nodes.push({
        id: r.id,
        kind: 'researcher',
        label: r.name,
        sublabel: `${ax.code} • ${r.unit}`,
        color: ax.color,
        radius,
        axisId: r.primaryAxis,
        researcher: r,
      });

      links.push({
        id: `tether-${r.id}`,
        source: `hub-${r.primaryAxis}`,
        target: r.id,
        kind: 'hub_tether',
        tag: ax.code,
        color: ax.color,
      });
    }

    // 3. Explicit Connection Type A: 🤝 Co-authorship & Joint Projects
    if (mode === 'all' || mode === 'coauthor') {
      for (const e of edges) {
        if (!visibleIds.has(e.source) || !visibleIds.has(e.target)) continue;
        links.push({
          id: `co-${e.id}`,
          source: e.source,
          target: e.target,
          kind: 'coauthor',
          tag: lang === 'pt' ? '🤝 Coautoria / Projeto' : '🤝 Co-authors / Project',
          color: '#2DD4BF',
        });
      }
    }

    // 4. Explicit Connection Type B: 📍 Shared Territory (Cross-Axis)
    if (mode === 'all' || mode === 'territory') {
      const terrBridges = bridges
        .filter((b) => b.sharedRegions.length > 0 && visibleIds.has(b.sourceId) && visibleIds.has(b.targetId))
        .slice(0, 48);
      for (const b of terrBridges) {
        const reg = REGION_MAP[b.sharedRegions[0]];
        links.push({
          id: `terr-${b.id}`,
          source: b.sourceId,
          target: b.targetId,
          kind: 'territory',
          tag: reg ? `${reg.emoji} ${reg.shortName[lang]}` : '📍 Território',
          color: '#34D399',
        });
      }
    }

    // 5. Explicit Connection Type C: 🔗 Offer ↔ Need Topic Match (Cross-Axis)
    if (mode === 'all' || mode === 'topic') {
      const topicBridges = bridges
        .filter((b) => b.matchedHandshakes.length > 0 && visibleIds.has(b.sourceId) && visibleIds.has(b.targetId))
        .slice(0, 48);
      for (const b of topicBridges) {
        const dom = DOMAIN_LABELS[b.matchedHandshakes[0].offer.domain];
        links.push({
          id: `top-${b.id}`,
          source: b.sourceId,
          target: b.targetId,
          kind: 'topic',
          tag: `${dom.emoji} ${dom.pt}`,
          color: '#FBBF24',
        });
      }
    }

    return { nodes, links };
  }, [researchers, edges, bridges, mode, selectedAxis, lang]);

  // Search match
  const searchedResearchers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return researchers
      .filter((r) => r.name.toLowerCase().includes(q) || r.unit.toLowerCase().includes(q))
      .slice(0, 6);
  }, [researchers, searchQuery]);

  // Canvas Simulation & Render
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

    const prevPos = new Map(nodesRef.current.map((n) => [n.id, { x: n.x, y: n.y }]));
    const simNodes: GraphNode[] = graphData.nodes.map((n) => {
      const hubPos = getAxisHubPosition(n.axisId, width, height);
      if (n.kind === 'axis_hub') {
        return { ...n, x: hubPos.x, y: hubPos.y, fx: hubPos.x, fy: hubPos.y };
      }
      const prev = prevPos.get(n.id);
      return {
        ...n,
        x: prev?.x ?? hubPos.x + (Math.random() - 0.5) * 55,
        y: prev?.y ?? hubPos.y + (Math.random() - 0.5) * 55,
      };
    });
    const simLinks: GraphLink[] = graphData.links.map((l) => ({ ...l }));
    nodesRef.current = simNodes;

    const draw = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const tr = transformRef.current;
      ctx.translate(tr.x, tr.y);
      ctx.scale(tr.k, tr.k);

      const cx = width / 2;
      const cy = height / 2;
      const activeId = hoveredIdRef.current || spotlightId;

      // Determine connected neighbors of activeId or selectedAxis
      const connectedNodeIds = new Set<string>();
      const highlightedLinks: GraphLink[] = [];

      if (activeId) {
        connectedNodeIds.add(activeId);
        for (const l of simLinks) {
          if (l.kind === 'hub_tether') continue;
          const s = (l.source as GraphNode).id;
          const tg = (l.target as GraphNode).id;
          if (s === activeId) {
            connectedNodeIds.add(tg);
            highlightedLinks.push(l);
          } else if (tg === activeId) {
            connectedNodeIds.add(s);
            highlightedLinks.push(l);
          }
        }
      } else if (selectedAxis) {
        for (const n of simNodes) {
          if (n.axisId === selectedAxis) connectedNodeIds.add(n.id);
        }
        for (const l of simLinks) {
          if (l.kind === 'hub_tether') continue;
          const s = l.source as GraphNode;
          const tg = l.target as GraphNode;
          if (s.axisId === selectedAxis || tg.axisId === selectedAxis) {
            connectedNodeIds.add(s.id);
            connectedNodeIds.add(tg.id);
            highlightedLinks.push(l);
          }
        }
      }

      const hasFilter = Boolean(activeId || selectedAxis);

      // 1. Draw Links
      for (const l of simLinks) {
        const s = l.source as GraphNode;
        const tg = l.target as GraphNode;
        if (s.x == null || s.y == null || tg.x == null || tg.y == null) continue;

        if (l.kind === 'hub_tether') {
          const dim = hasFilter && !connectedNodeIds.has(tg.id);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tg.x, tg.y);
          ctx.strokeStyle = `${l.color}${dim ? '12' : '38'}`;
          ctx.lineWidth = 1;
          ctx.stroke();
          continue;
        }

        const isHighlighted =
          (activeId && (s.id === activeId || tg.id === activeId)) ||
          (selectedAxis && (s.axisId === selectedAxis || tg.axisId === selectedAxis));

        if (hasFilter && !isHighlighted) {
          continue; // Hide unrelated cross-lines when focusing to keep graph ultra-clean!
        }

        ctx.save();
        ctx.beginPath();
        const mx = (s.x + tg.x) / 2;
        const my = (s.y + tg.y) / 2;
        const ctrlX = mx + (cx - mx) * 0.15;
        const ctrlY = my + (cy - my) * 0.15;
        ctx.moveTo(s.x, s.y);
        ctx.quadraticCurveTo(ctrlX, ctrlY, tg.x, tg.y);

        ctx.strokeStyle = l.color;
        ctx.globalAlpha = isHighlighted ? 0.92 : 0.28;
        ctx.lineWidth = isHighlighted ? 2.3 : 1.2;
        if (l.kind !== 'coauthor') {
          ctx.setLineDash([5, 4]);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw Visual Reason Tags right on highlighted connection lines (up to 8 clearest tags)
      if (activeId && highlightedLinks.length > 0) {
        for (const l of highlightedLinks.slice(0, 7)) {
          const s = l.source as GraphNode;
          const tg = l.target as GraphNode;
          if (s.x == null || s.y == null || tg.x == null || tg.y == null) continue;
          const mx = (s.x + tg.x) / 2;
          const my = (s.y + tg.y) / 2;
          ctx.save();
          ctx.font = '600 10px Inter, sans-serif';
          const tw = ctx.measureText(l.tag).width;
          ctx.fillStyle = 'rgba(11, 18, 25, 0.92)';
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(mx - tw / 2 - 6, my - 9, tw + 12, 18, 6);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(l.tag, mx, my);
          ctx.restore();
        }
      }

      // 3. Draw Nodes
      for (const n of simNodes) {
        if (n.x == null || n.y == null) continue;

        if (n.kind === 'axis_hub') {
          const isAxisActive = selectedAxis === n.axisId;
          ctx.save();
          if (isAxisActive) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius + 7, 0, Math.PI * 2);
            ctx.fillStyle = `${n.color}44`;
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = isAxisActive ? 3 : 2;
          ctx.stroke();

          ctx.font = '800 11px "JetBrains Mono", monospace';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y);

          // Axis short name pill outside hub
          const angle = ((n.axisId - 1) / 11) * Math.PI * 2 - Math.PI / 2;
          const lx = n.x + Math.cos(angle) * 34;
          const ly = n.y + Math.sin(angle) * 30;
          ctx.font = '700 10px Inter, sans-serif';
          ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
          ctx.fillText(n.sublabel, lx, ly);
          ctx.restore();
          continue;
        }

        const isHovered = activeId === n.id;
        const isVisible = !hasFilter || connectedNodeIds.has(n.id);
        const isLead = n.researcher?.role === 'coordinator' || n.researcher?.role === 'pi';

        ctx.save();
        ctx.globalAlpha = isVisible ? 1 : 0.14;

        if (isHovered) {
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

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.strokeStyle = isHovered ? '#FFFFFF' : n.color;
          ctx.lineWidth = isHovered ? 2.5 : 2;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          ctx.strokeStyle = isHovered ? '#FFFFFF' : '#081016';
          ctx.lineWidth = isHovered ? 2.2 : 1.2;
          ctx.stroke();
        }

        // Show name label for PIs, hovered/connected nodes, or when zoomed in
        if ((isLead || isHovered || (hasFilter && isVisible) || tr.k >= 1.55) && isVisible) {
          const shortName = n.label.split(' ').slice(0, 2).join(' ');
          ctx.font = `${isLead || isHovered ? '700' : '500'} 10px Inter, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          const tw = ctx.measureText(shortName).width;
          ctx.fillStyle = 'rgba(8, 16, 22, 0.84)';
          ctx.beginPath();
          ctx.roundRect(n.x - tw / 2 - 4, n.y + n.radius + 3, tw + 8, 14, 4);
          ctx.fill();
          ctx.fillStyle = isHovered ? '#5EEAD4' : '#F8FAFC';
          ctx.fillText(shortName, n.x, n.y + n.radius + 5);
        }

        ctx.restore();
      }

      ctx.restore();
    };

    const sim = forceSimulation<GraphNode>(simNodes)
      .force(
        'link',
        forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance((l) => (l.kind === 'hub_tether' ? 42 : 140))
          .strength((l) => (l.kind === 'hub_tether' ? 0.85 : 0.015))
      )
      .force('charge', forceManyBody<GraphNode>().strength((d) => (d.kind === 'axis_hub' ? -220 : -38)))
      .force('collide', forceCollide<GraphNode>().radius((d) => d.radius + 4).iterations(2))
      .force(
        'x',
        forceX<GraphNode>((d) => getAxisHubPosition(d.axisId, width, height).x).strength(0.18)
      )
      .force(
        'y',
        forceY<GraphNode>((d) => getAxisHubPosition(d.axisId, width, height).y).strength(0.18)
      );

    sim.on('tick', draw);
    simRef.current = sim;

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
        const hitR = n.radius + 5;
        if ((gx - n.x) ** 2 + (gy - n.y) ** 2 <= hitR * hitR) {
          return { node: n, sx, sy };
        }
      }
      return null;
    };

    const zoomBehavior = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.45, 3.5])
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
    d3Canvas.call(zoomBehavior.transform, transformRef.current);

    let pointerDownPos: { x: number; y: number } | null = null;
    let moved = false;

    const onPointerDown = (e: PointerEvent) => {
      const hit = findNodeAt(e.clientX, e.clientY);
      if (hit) {
        dragNodeRef.current = hit.node;
        pointerDownPos = { x: e.clientX, y: e.clientY };
        moved = false;
        if (hit.node.kind !== 'axis_hub') {
          hit.node.fx = hit.node.x;
          hit.node.fy = hit.node.y;
          sim.alphaTarget(0.2).restart();
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
        if (dragNodeRef.current.kind !== 'axis_hub') {
          const rect = canvas.getBoundingClientRect();
          const tr = transformRef.current;
          dragNodeRef.current.fx = (e.clientX - rect.left - tr.x) / tr.k;
          dragNodeRef.current.fy = (e.clientY - rect.top - tr.y) / tr.k;
          draw();
        }
        return;
      }

      const hit = findNodeAt(e.clientX, e.clientY);
      const nextId = hit && hit.node.kind === 'researcher' ? hit.node.id : null;
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
        if (clicked.kind !== 'axis_hub') {
          clicked.fx = null;
          clicked.fy = null;
        }
        dragNodeRef.current = null;
        sim.alphaTarget(0);
        try {
          canvas.releasePointerCapture(e.pointerId);
        } catch {}

        if (!moved) {
          if (clicked.kind === 'axis_hub') {
            setSelectedAxis((prev) => (prev === clicked.axisId ? null : clicked.axisId));
            setSpotlightId(null);
          } else if (clicked.researcher) {
            setSpotlightId(clicked.researcher.id);
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
  }, [graphData, dimensions, spotlightId, selectedAxis, lang, onSelectResearcher]);

  const handleReset = () => {
    setSelectedAxis(null);
    setSpotlightId(null);
    onClearFocusedResearcher();
    const canvas = canvasRef.current;
    if (canvas && zoomBehaviorRef.current) {
      transformRef.current = zoomIdentity;
      select(canvas).call(zoomBehaviorRef.current.transform, zoomIdentity);
    }
    simRef.current?.alpha(0.25).restart();
  };

  return (
    <div className="space-y-3">
      {/* ONE Simple Visual Bar: How Are People Connected? + Search */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
            {t.connectBy}
          </span>
          {(
            [
              { id: 'all', label: t.modes.all, dot: '#38BDF8' },
              { id: 'coauthor', label: t.modes.coauthor, dot: '#2DD4BF' },
              { id: 'territory', label: t.modes.territory, dot: '#34D399' },
              { id: 'topic', label: t.modes.topic, dot: '#FBBF24' },
            ] as const
          ).map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  active
                    ? 'bg-slate-900 dark:bg-teal-600 text-white border-transparent shadow-xs'
                    : 'bg-slate-50 dark:bg-[#0B1219] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: m.dot }} />
                {m.label}
              </button>
            );
          })}
        </div>

        {/* Simple Person Finder */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchNode}
                className="pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white w-48 focus:outline-none focus:border-teal-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.resetZoom}
            </button>
          </div>

          {searchedResearchers.length > 0 && (
            <div className="absolute right-0 mt-1 w-64 rounded-xl bg-white dark:bg-[#121C26] border border-slate-200 dark:border-slate-700 shadow-xl z-30 py-1">
              {searchedResearchers.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSpotlightId(r.id);
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

      {/* Main Graph Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[640px] lg:h-[700px] rounded-2xl overflow-hidden observatory-bg border border-slate-800 shadow-xl"
      >
        <canvas ref={canvasRef} className="block w-full h-full touch-none" />

        {/* Active Spotlight Pill */}
        {(spotlightId || selectedAxis) && (
          <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-teal-500/40 text-xs text-white flex items-center gap-2">
            <span>
              {selectedAxis
                ? `${AXIS_MAP[selectedAxis].code} — ${AXIS_MAP[selectedAxis].shortName[lang]}`
                : researchers.find((r) => r.id === spotlightId)?.name}
            </span>
            <button
              onClick={() => {
                setSpotlightId(null);
                setSelectedAxis(null);
                onClearFocusedResearcher();
              }}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Visual Legend */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-200 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#2DD4BF] inline-block" />
              🤝 {lang === 'pt' ? 'Coautoria / Projeto' : 'Co-authors'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0 border-t-2 border-dashed border-[#34D399] inline-block" />
              📍 {lang === 'pt' ? 'Mesmo Território' : 'Same Territory'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-0 border-t-2 border-dashed border-[#FBBF24] inline-block" />
              🔗 {lang === 'pt' ? 'Oferta ↔ Demanda' : 'Offer ↔ Need'}
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-950/75 border border-slate-800 text-[11px] text-slate-400 hidden md:block">
            {t.clickHint}
          </div>
        </div>

        {/* Hover Card */}
        {hoveredNode && !dragNodeRef.current && (
          <div
            className="pointer-events-none absolute z-20 max-w-xs px-3 py-2 rounded-xl bg-slate-950/95 border border-slate-700 shadow-2xl text-xs text-white"
            style={{
              left: Math.min(dimensions.width - 230, Math.max(12, hoveredNode.sx + 14)),
              top: Math.min(dimensions.height - 95, Math.max(12, hoveredNode.sy - 10)),
            }}
          >
            {hoveredNode.node.kind === 'researcher' && hoveredNode.node.researcher ? (
              <>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                    style={{ backgroundColor: hoveredNode.node.color }}
                  >
                    {AXIS_MAP[hoveredNode.node.researcher.primaryAxis].code}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {ROLE_LABELS[hoveredNode.node.researcher.role][lang === 'pt' ? 'shortPt' : 'shortEn']}
                  </span>
                </div>
                <div className="font-display font-bold text-sm">{hoveredNode.node.label}</div>
                <div className="text-[11px] text-slate-300">
                  {hoveredNode.node.researcher.unit}
                </div>
              </>
            ) : (
              <>
                <div className="font-mono-code font-bold" style={{ color: hoveredNode.node.color }}>
                  {hoveredNode.node.label}
                </div>
                <div className="font-bold">{hoveredNode.node.sublabel}</div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
