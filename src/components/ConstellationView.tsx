import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Award,
  Download,
  FileSpreadsheet,
  Sparkles,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import {
  exportFapespMarkdown,
  exportMatrixCsv,
  SiloMetrics,
} from '../engine/bridgeEngine';
import { ROLE_LABELS, UI } from '../i18n';
import {
  AxisId,
  CollaborationEdge,
  CommonsAsset,
  CrossAxisMission,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

interface ConstellationViewProps {
  researchers: Researcher[];
  edges: CollaborationEdge[];
  bridges: LatentBridge[];
  assets: CommonsAsset[];
  missions: CrossAxisMission[];
  metrics: SiloMetrics;
  lang: Lang;
  onInspectAxisPair: (a: AxisId, b: AxisId) => void;
  onSelectResearcher: (id: string) => void;
}

type MatrixMode = 'gap' | 'actual' | 'latent';

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const ConstellationView: React.FC<ConstellationViewProps> = ({
  researchers,
  edges,
  bridges,
  assets,
  missions,
  metrics,
  lang,
  onInspectAxisPair,
  onSelectResearcher,
}) => {
  const t = UI[lang].constellation;
  const [showLatent, setShowLatent] = useState(true);
  const [matrixMode, setMatrixMode] = useState<MatrixMode>('gap');
  const [hoverAxis, setHoverAxis] = useState<AxisId | null>(null);
  const [selectedPair, setSelectedPair] = useState<[AxisId, AxisId] | null>(null);

  // SVG Constellation geometry
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = 178;

  const axisCoords = Object.fromEntries(
    AXES.map((ax, idx) => {
      const angle = (idx / 11) * Math.PI * 2 - Math.PI / 2;
      return [
        ax.id,
        {
          x: cx + Math.cos(angle) * ringR,
          y: cy + Math.sin(angle) * ringR,
          lx: cx + Math.cos(angle) * (ringR + 40),
          ly: cy + Math.sin(angle) * (ringR + 40),
          angle,
        },
      ];
    })
  ) as Record<AxisId, { x: number; y: number; lx: number; ly: number; angle: number }>;

  const handleExportMd = () => {
    const md = exportFapespMarkdown(
      researchers,
      edges,
      bridges,
      assets,
      missions,
      metrics,
      lang
    );
    downloadFile(`climares-relatorio-integracao-${new Date().toISOString().slice(0, 10)}.md`, md, 'text/markdown;charset=utf-8');
  };

  const handleExportCsv = () => {
    const csv = exportMatrixCsv(metrics, lang);
    downloadFile(`climares-matriz-11x11-${new Date().toISOString().slice(0, 10)}.csv`, csv, 'text/csv;charset=utf-8');
  };

  // All unique axis pairs (a < b)
  const axisPairs: { a: AxisId; b: AxisId; actual: number; latent: number; gap: number }[] = [];
  for (let i = 0; i < AXES.length; i++) {
    for (let j = i + 1; j < AXES.length; j++) {
      const a = AXES[i].id;
      const b = AXES[j].id;
      const cell = metrics.matrix[a][b];
      axisPairs.push({
        a,
        b,
        actual: cell.actualCount,
        latent: cell.latentCount,
        gap: cell.siloGapScore,
      });
    }
  }

  const activeCell = selectedPair
    ? metrics.matrix[selectedPair[0]][selectedPair[1]]
    : null;

  return (
    <div className="space-y-6">
      {/* Header + Export Actions */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">{t.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
            {t.exportCsv}
          </button>
          <button
            onClick={handleExportMd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#173f50] cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-teal-300" />
            {t.exportMd}
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {t.crossRatio}
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-slate-900">
              {metrics.centerIntegrationIndex}%
            </span>
            <span className="text-xs text-slate-500">
              ({metrics.totalCrossEdges} / {metrics.totalCrossEdges + metrics.totalIntraEdges})
            </span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
            {t.crossLinks}
          </div>
          <div className="mt-1.5 font-display font-extrabold text-3xl text-teal-800">
            {metrics.totalCrossEdges}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-amber-200/90 p-4 shadow-2xs bg-amber-50/25">
          <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'pt' ? 'Pares sem conexão c/ sinergia' : 'Unlinked high-synergy pairs'}
          </div>
          <div className="mt-1.5 font-display font-extrabold text-3xl text-amber-900">
            {metrics.coldAxisPairsCount}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {lang === 'pt' ? 'Pontes latentes fortes (≥60%)' : 'Strong latent bridges (≥60%)'}
          </div>
          <div className="mt-1.5 font-display font-extrabold text-3xl text-slate-900">
            {bridges.filter((b) => !b.alreadyConnected && b.score >= 60).length}
          </div>
        </div>
      </div>

      {/* Main Row: Radial Constellation + 11x11 Coupling Matrix */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Radial SVG Constellation */}
        <div className="xl:col-span-6 observatory-bg rounded-2xl border border-slate-800 p-5 text-white shadow-xl flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="font-display font-bold text-base text-white">
                {lang === 'pt' ? 'Constelação Radial dos 11 Eixos' : '11-Axis Radial Constellation'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'pt'
                  ? 'Passe o mouse em um eixo ou clique em um arco para explorar o par.'
                  : 'Hover an axis or click any arc to explore that pair.'}
              </p>
            </div>
            <label className="inline-flex items-center gap-2 text-xs font-medium text-amber-200 cursor-pointer bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700">
              <input
                type="checkbox"
                checked={showLatent}
                onChange={(e) => setShowLatent(e.target.checked)}
                className="accent-amber-400 rounded cursor-pointer"
              />
              {t.showLatentArcs}
            </label>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[490px] h-auto select-none">
              {/* Outer Guide Ring */}
              <circle
                cx={cx}
                cy={cy}
                r={ringR}
                fill="none"
                stroke="rgba(148,163,184,0.16)"
                strokeDasharray="3 5"
              />

              {/* Latent Opportunity Arcs (amber dashed) */}
              {showLatent &&
                axisPairs
                  .filter((p) => p.actual === 0 && p.latent > 0)
                  .map((p) => {
                    const cA = axisCoords[p.a];
                    const cB = axisCoords[p.b];
                    const dimmed = hoverAxis !== null && hoverAxis !== p.a && hoverAxis !== p.b;
                    const isSel =
                      selectedPair &&
                      ((selectedPair[0] === p.a && selectedPair[1] === p.b) ||
                        (selectedPair[0] === p.b && selectedPair[1] === p.a));
                    return (
                      <path
                        key={`lat-${p.a}-${p.b}`}
                        d={`M ${cA.x} ${cA.y} Q ${cx} ${cy} ${cB.x} ${cB.y}`}
                        fill="none"
                        stroke={isSel ? '#FCD34D' : '#F59E0B'}
                        strokeWidth={isSel ? 3 : Math.min(2.6, 0.8 + p.latent * 0.45)}
                        strokeDasharray="5 4"
                        opacity={dimmed ? 0.06 : isSel ? 0.95 : 0.42}
                        className="cursor-pointer transition-opacity"
                        onClick={() => setSelectedPair([p.a, p.b])}
                      />
                    );
                  })}

              {/* Actual Collaboration Arcs (teal solid) */}
              {axisPairs
                .filter((p) => p.actual > 0)
                .map((p) => {
                  const cA = axisCoords[p.a];
                  const cB = axisCoords[p.b];
                  const dimmed = hoverAxis !== null && hoverAxis !== p.a && hoverAxis !== p.b;
                  const isSel =
                    selectedPair &&
                    ((selectedPair[0] === p.a && selectedPair[1] === p.b) ||
                      (selectedPair[0] === p.b && selectedPair[1] === p.a));
                  return (
                    <path
                      key={`act-${p.a}-${p.b}`}
                      d={`M ${cA.x} ${cA.y} Q ${cx} ${cy} ${cB.x} ${cB.y}`}
                      fill="none"
                      stroke={isSel ? '#5EEAD4' : '#2DD4BF'}
                      strokeWidth={isSel ? 4.5 : Math.min(5, 1.8 + p.actual * 1.1)}
                      opacity={dimmed ? 0.08 : 0.88}
                      className="cursor-pointer transition-opacity"
                      onClick={() => setSelectedPair([p.a, p.b])}
                    />
                  );
                })}

              {/* 11 Axis Nodes */}
              {AXES.map((ax) => {
                const pos = axisCoords[ax.id];
                const health = metrics.axisHealth.find((h) => h.axisId === ax.id)!;
                const isHover = hoverAxis === ax.id;
                const r = 13 + Math.min(8, health.memberCount * 1.3);
                return (
                  <g
                    key={ax.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoverAxis(ax.id)}
                    onMouseLeave={() => setHoverAxis(null)}
                    onClick={() => {
                      if (selectedPair && selectedPair[0] !== ax.id) {
                        setSelectedPair([selectedPair[0], ax.id]);
                      } else {
                        setSelectedPair([ax.id, ax.id === 1 ? 6 : 1]);
                      }
                    }}
                  >
                    {isHover && (
                      <circle cx={pos.x} cy={pos.y} r={r + 7} fill={ax.color} opacity={0.28} />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={ax.color}
                      stroke={isHover ? '#ffffff' : '#091318'}
                      strokeWidth={isHover ? 2.5 : 2}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 3.5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {ax.code}
                    </text>
                    <text
                      x={pos.lx}
                      y={pos.ly}
                      textAnchor="middle"
                      fill={isHover ? '#ffffff' : 'rgba(226,232,240,0.82)'}
                      fontSize="9.5"
                      fontWeight={isHover ? '700' : '500'}
                    >
                      {ax.shortName[lang]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Pair Quick Action Strip */}
          {selectedPair && activeCell && selectedPair[0] !== selectedPair[1] && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700/90 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-mono-code font-bold" style={{ color: AXIS_MAP[selectedPair[0]].color }}>
                  {AXIS_MAP[selectedPair[0]].code}
                </span>{' '}
                <span className="text-slate-400">↔</span>{' '}
                <span className="font-mono-code font-bold" style={{ color: AXIS_MAP[selectedPair[1]].color }}>
                  {AXIS_MAP[selectedPair[1]].code}
                </span>
                <span className="ml-2 text-slate-300">
                  {activeCell.actualCount} {lang === 'pt' ? 'reais' : 'actual'} •{' '}
                  <strong className="text-amber-300">
                    {activeCell.latentCount} {lang === 'pt' ? 'pontes latentes' : 'latent bridges'}
                  </strong>
                </span>
              </div>
              <button
                onClick={() => onInspectAxisPair(selectedPair[0], selectedPair[1])}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold cursor-pointer"
              >
                {t.inspectPair}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* 11x11 Silo & Coupling Matrix */}
        <div className="xl:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">{t.matrixTitle}</h2>
              <p className="text-xs text-slate-500">{t.matrixHint}</p>
            </div>
            <select
              value={matrixMode}
              onChange={(e) => setMatrixMode(e.target.value as MatrixMode)}
              className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 cursor-pointer"
            >
              <option value="gap">{t.matrixModes.gap}</option>
              <option value="actual">{t.matrixModes.actual}</option>
              <option value="latent">{t.matrixModes.latent}</option>
            </select>
          </div>

          <div className="overflow-x-auto flex-1 flex items-center">
            <table className="w-full border-separate border-spacing-1 text-[10px] font-mono-code">
              <thead>
                <tr>
                  <th className="w-10" />
                  {AXES.map((ax) => (
                    <th
                      key={ax.id}
                      className="text-center font-bold py-1"
                      style={{ color: ax.color }}
                      title={ax.name[lang]}
                    >
                      {ax.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AXES.map((rowAx) => (
                  <tr key={rowAx.id}>
                    <td
                      className="font-bold pr-1.5 text-right whitespace-nowrap"
                      style={{ color: rowAx.color }}
                      title={rowAx.name[lang]}
                    >
                      {rowAx.code}
                    </td>
                    {AXES.map((colAx) => {
                      const cell = metrics.matrix[rowAx.id][colAx.id];
                      const isDiag = rowAx.id === colAx.id;
                      let bg = '#F8FAFC';
                      let fg = '#94A3B8';
                      let val = '';

                      if (isDiag) {
                        bg = `${rowAx.color}22`;
                        fg = rowAx.color;
                        val = `${cell.actualCount}`;
                      } else if (matrixMode === 'gap') {
                        if (cell.siloGapScore > 0) {
                          const alpha = Math.min(0.95, 0.25 + (cell.siloGapScore / 100) * 0.7);
                          bg = `rgba(245, 158, 11, ${alpha})`;
                          fg = cell.siloGapScore > 65 ? '#ffffff' : '#78350F';
                          val = `${cell.latentCount}`;
                        } else if (cell.actualCount > 0) {
                          bg = 'rgba(20, 184, 166, 0.14)';
                          fg = '#0F766E';
                          val = '✓';
                        } else {
                          val = '·';
                        }
                      } else if (matrixMode === 'actual') {
                        if (cell.actualCount > 0) {
                          const alpha = Math.min(0.92, 0.3 + cell.actualCount * 0.25);
                          bg = `rgba(13, 148, 136, ${alpha})`;
                          fg = '#ffffff';
                          val = `${cell.actualCount}`;
                        } else {
                          val = '0';
                        }
                      } else {
                        if (cell.latentCount > 0) {
                          const alpha = Math.min(0.92, 0.22 + cell.latentCount * 0.16);
                          bg = `rgba(99, 102, 241, ${alpha})`;
                          fg = cell.latentCount >= 3 ? '#ffffff' : '#312E81';
                          val = `${cell.latentCount}`;
                        } else {
                          val = '·';
                        }
                      }

                      return (
                        <td key={colAx.id} className="p-0">
                          <button
                            disabled={isDiag}
                            onClick={() => {
                              setSelectedPair([rowAx.id, colAx.id]);
                              onInspectAxisPair(rowAx.id, colAx.id);
                            }}
                            style={{ backgroundColor: bg, color: fg }}
                            className={`w-full aspect-square min-w-[26px] rounded-md font-bold flex items-center justify-center transition ${
                              isDiag
                                ? 'cursor-default'
                                : 'hover:scale-110 hover:ring-2 hover:ring-slate-900/40 cursor-pointer'
                            }`}
                            title={`${rowAx.code} (${rowAx.shortName[lang]}) ↔ ${colAx.code} (${colAx.shortName[lang]}): ${cell.actualCount} reais, ${cell.latentCount} latentes`}
                          >
                            {val}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {matrixMode === 'gap'
                ? lang === 'pt'
                  ? 'Células âmbar = 0 conexões ativas hoje, mas múltiplas pontes latentes prontas para ativar.'
                  : 'Amber cells = 0 active links today, yet multiple latent bridges ready to activate.'
                : lang === 'pt'
                ? 'Diagonal = conexões internas de cada eixo.'
                : 'Diagonal = intra-axis connections.'}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Per-Axis Openness + Boundary Spanners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Per-Axis Openness Index */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <h3 className="font-display font-bold text-base text-slate-900 mb-3.5">
            {t.axisHealthTitle}
          </h3>
          <div className="space-y-2.5">
            {[...metrics.axisHealth]
              .sort((a, b) => a.opennessRatio - b.opennessRatio)
              .map((h) => {
                const ax = AXIS_MAP[h.axisId];
                const pct = Math.round(h.opennessRatio * 100);
                const isClosed = pct <= 20;
                return (
                  <div key={h.axisId} className="space-y-1">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white shrink-0"
                          style={{ backgroundColor: ax.color }}
                        >
                          {ax.code}
                        </span>
                        <span className="font-semibold text-slate-800 truncate">
                          {ax.name[lang]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 text-[11px]">
                        <span
                          className={`px-1.5 py-0.5 rounded font-semibold ${
                            isClosed
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-teal-50 text-teal-800'
                          }`}
                        >
                          {isClosed ? t.siloAlert : t.openAxis}
                        </span>
                        <span className="font-mono-code text-slate-600 w-10 text-right font-bold">
                          {pct}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden flex">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.max(4, pct)}%`,
                          backgroundColor: isClosed ? '#F59E0B' : ax.color,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>
                        {h.memberCount} {t.totalMembers} • {h.crossEdges} {t.crossLinks} ({h.distinctPartnerAxes}/10 {t.distinctAxes})
                      </span>
                      <span className="text-amber-700 font-medium">
                        +{h.latentOpportunities} {lang === 'pt' ? 'oportunidades latentes' : 'latent bridges'}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Boundary Spanners Leaderboard */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-teal-600" />
            <h3 className="font-display font-bold text-base text-slate-900">
              {t.spannersTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t.spannersSub}</p>

          <div className="space-y-2.5">
            {metrics.boundarySpanners.slice(0, 8).map((s, idx) => {
              const ax = AXIS_MAP[s.researcher.primaryAxis];
              return (
                <button
                  key={s.researcher.id}
                  onClick={() => onSelectResearcher(s.researcher.id)}
                  className="w-full text-left flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/30 transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-mono-code text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {s.researcher.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {ROLE_LABELS[s.researcher.role][lang]} • {s.researcher.unit}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                        style={{ backgroundColor: ax.color }}
                      >
                        {ax.code}
                      </span>
                      <span className="text-[10px] text-slate-400">→</span>
                      <div className="flex -space-x-1">
                        {s.distinctAxesConnected.slice(0, 4).map((pid) => (
                          <span
                            key={pid}
                            className="w-4 h-4 rounded-full text-[8px] font-mono-code font-bold text-white flex items-center justify-center ring-1 ring-white"
                            style={{ backgroundColor: AXIS_MAP[pid].color }}
                            title={AXIS_MAP[pid].name[lang]}
                          >
                            {pid}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      {s.crossEdges} {t.crossLinks}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
