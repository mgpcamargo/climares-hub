import React, { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { ArrowUpRight, Database, Mail, MapPin, Sparkles, Users } from 'lucide-react';
import brazilStatesRaw from '../data/brazilStates.json';
import { AXIS_MAP } from '../data/axes';
import { STUDY_REGIONS } from '../data/regionsAndHazards';
import { ROLE_LABELS, tText, UI } from '../i18n';
import {
  AxisId,
  CommonsAsset,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

interface TerrainMapViewProps {
  researchers: Researcher[];
  bridges: LatentBridge[];
  assets: CommonsAsset[];
  lang: Lang;
  selectedRegionId: string;
  onChangeRegion: (id: string) => void;
  onOpenRegionInGraph: (regionId: string) => void;
  onSelectResearcher: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
}

export const TerrainMapView: React.FC<TerrainMapViewProps> = ({
  researchers,
  bridges,
  assets,
  lang,
  selectedRegionId,
  onChangeRegion,
  onOpenRegionInGraph,
  onSelectResearcher,
  onOpenWarmIntro,
}) => {
  const t = UI[lang].map;
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const width = 560;
  const height = 560;

  const { pathGen, projection, features } = useMemo(() => {
    const fc = brazilStatesRaw as unknown as GeoJSON.FeatureCollection;
    const proj = geoMercator().fitExtent(
      [
        [24, 24],
        [width - 24, height - 24],
      ],
      fc
    );
    return {
      pathGen: geoPath(proj),
      projection: proj,
      features: fc.features,
    };
  }, []);

  const regionStats = useMemo(() => {
    return STUDY_REGIONS.map((reg) => {
      const members = researchers.filter((r) => r.regions.includes(reg.id));
      const distinctAxes = Array.from(new Set(members.map((m) => m.primaryAxis))).sort(
        (a, b) => a - b
      ) as AxisId[];
      const regAssets = assets.filter((a) => a.regions.includes(reg.id));
      const regBridges = bridges.filter(
        (b) => !b.alreadyConnected && b.sharedRegions.includes(reg.id)
      );
      const coords = projection([reg.lng, reg.lat]) || [width / 2, height / 2];
      return {
        region: reg,
        members,
        distinctAxes,
        assets: regAssets,
        bridges: regBridges,
        x: coords[0],
        y: coords[1],
      };
    });
  }, [researchers, assets, bridges, projection]);

  const activeStat =
    regionStats.find((s) => s.region.id === selectedRegionId) || regionStats[0];

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  // Helper to draw multi-axis colored arc segments around each region pin
  const buildHaloArcs = (x: number, y: number, r: number, axes: AxisId[]) => {
    if (axes.length === 0) return [];
    if (axes.length === 1) {
      return [{ d: '', color: AXIS_MAP[axes[0]].color, full: true }];
    }
    const step = (Math.PI * 2) / axes.length;
    return axes.map((axId, idx) => {
      const a0 = idx * step - Math.PI / 2 + 0.08;
      const a1 = (idx + 1) * step - Math.PI / 2 - 0.08;
      const x0 = x + Math.cos(a0) * r;
      const y0 = y + Math.sin(a0) * r;
      const x1 = x + Math.cos(a1) * r;
      const y1 = y + Math.sin(a1) * r;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      return {
        d: `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`,
        color: AXIS_MAP[axId].color,
        full: false,
      };
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
          {t.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">{t.subtitle}</p>
      </div>

      {/* Quick Region Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {regionStats.map((st) => {
          const active = st.region.id === activeStat.region.id;
          return (
            <button
              key={st.region.id}
              onClick={() => onChangeRegion(st.region.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                active
                  ? 'bg-[#0F2C38] text-white border-[#0F2C38] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400'
              }`}
            >
              <span>{st.region.name[lang].split(' (')[0]}</span>
              <span
                className={`font-mono-code text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-teal-500/30 text-teal-200' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {st.distinctAxes.length}E
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Interactive Brazil GeoJSON Map */}
        <div className="xl:col-span-6 observatory-bg rounded-2xl border border-slate-800 p-4 shadow-xl relative flex flex-col items-center justify-center min-h-[540px]">
          <div className="absolute top-4 left-4 text-[11px] font-mono-code text-slate-400">
            BRASIL • {STUDY_REGIONS.length} {t.allRegions.toUpperCase()}
            {hoveredState && <span className="ml-2 text-teal-300">• {hoveredState}</span>}
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-[540px] h-auto select-none">
            {/* Subtle graticule circle */}
            <circle cx={width / 2} cy={height / 2} r={245} fill="none" stroke="rgba(148,163,184,0.06)" />

            {/* 27 Brazilian States */}
            <g>
              {features.map((feat, idx) => {
                const sigla = (feat.properties as { sigla?: string; name?: string })?.sigla || '';
                const name = (feat.properties as { name?: string })?.name || sigla;
                const isSP = sigla === 'SP';
                const isAmazon = ['AM', 'PA', 'AC', 'RO', 'RR', 'AP', 'MT', 'TO'].includes(sigla);
                return (
                  <path
                    key={sigla || idx}
                    d={pathGen(feat) || ''}
                    fill={
                      isSP
                        ? 'rgba(20, 184, 166, 0.22)'
                        : isAmazon
                        ? 'rgba(16, 185, 129, 0.12)'
                        : 'rgba(30, 41, 59, 0.72)'
                    }
                    stroke="rgba(148, 163, 184, 0.34)"
                    strokeWidth={isSP ? 1.3 : 0.8}
                    className="transition-colors hover:fill-slate-700/80"
                    onMouseEnter={() => setHoveredState(`${name} (${sigla})`)}
                    onMouseLeave={() => setHoveredState(null)}
                  />
                );
              })}
            </g>

            {/* Study Region Multi-Axis Ring Markers */}
            {regionStats.map((st) => {
              const isSelected = st.region.id === activeStat.region.id;
              const baseR = 8 + Math.min(8, st.members.length * 0.75);
              const haloR = baseR + 5;
              const arcs = buildHaloArcs(st.x, st.y, haloR, st.distinctAxes);

              return (
                <g
                  key={st.region.id}
                  className="cursor-pointer"
                  onClick={() => onChangeRegion(st.region.id)}
                >
                  {isSelected && (
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={haloR + 8}
                      fill="rgba(45, 212, 191, 0.18)"
                      stroke="rgba(45, 212, 191, 0.65)"
                      strokeWidth={1.2}
                    />
                  )}

                  {/* Multi-axis segmented color ring */}
                  {arcs.map((arc, i) =>
                    arc.full ? (
                      <circle
                        key={i}
                        cx={st.x}
                        cy={st.y}
                        r={haloR}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth={3.2}
                      />
                    ) : (
                      <path
                        key={i}
                        d={arc.d}
                        fill="none"
                        stroke={arc.color}
                        strokeWidth={isSelected ? 4 : 3.2}
                        strokeLinecap="round"
                      />
                    )
                  )}

                  {/* Center pin */}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={baseR}
                    fill={isSelected ? '#0D9488' : '#0F172A'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2 : 1.2}
                  />
                  <text
                    x={st.x}
                    y={st.y + 3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {st.members.length}
                  </text>

                  {/* Short label for selected or major hotspots */}
                  {(isSelected || ['xingu', 'taquari-rs', 'semiarido', 'sul-amazonia'].includes(st.region.id)) && (
                    <text
                      x={st.x}
                      y={st.y + haloR + 13}
                      textAnchor="middle"
                      fill={isSelected ? '#5EEAD4' : 'rgba(226,232,240,0.78)'}
                      fontSize="9.5"
                      fontWeight={isSelected ? '700' : '500'}
                    >
                      {st.region.name[lang].split(' (')[0].split(' & ')[0]}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          <div className="mt-2 text-[11px] text-slate-400 text-center">
            {lang === 'pt'
              ? 'Cada anel colorido representa os diferentes Eixos do CLIMARES atuando simultaneamente no mesmo território.'
              : 'Each colored ring segment represents distinct CLIMARES Axes simultaneously active in that territory.'}
          </div>
        </div>

        {/* Right Territory Convergence Panel */}
        <div className="xl:col-span-6 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code font-semibold text-teal-700 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {activeStat.region.state} • {activeStat.region.biome[lang]}
                </div>
                <h2 className="font-display font-extrabold text-xl text-slate-900">
                  {activeStat.region.name[lang]}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-right">
                  <div className="font-mono-code font-extrabold text-lg text-teal-900 leading-none">
                    {activeStat.distinctAxes.length} / 11
                  </div>
                  <div className="text-[10px] font-semibold text-teal-700">
                    {t.axesPresent}
                  </div>
                </div>
                <button
                  onClick={() => onOpenRegionInGraph(activeStat.region.id)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#173f50] transition cursor-pointer"
                >
                  {t.openInGraph}
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-300" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {activeStat.region.summary[lang]}
            </p>

            {/* Active Axis Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {activeStat.distinctAxes.map((axId) => {
                const ax = AXIS_MAP[axId];
                return (
                  <span
                    key={axId}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold text-white"
                    style={{ backgroundColor: ax.color }}
                  >
                    {ax.code} {ax.shortName[lang]}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Researchers in this territory */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-3">
              <Users className="w-3.5 h-3.5 text-teal-600" />
              {t.researchersHere} ({activeStat.members.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
              {activeStat.members.map((m) => {
                const ax = AXIS_MAP[m.primaryAxis];
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectResearcher(m.id)}
                    className="text-left p-2.5 rounded-xl border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/30 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                        style={{ backgroundColor: ax.color }}
                      >
                        {ax.code}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">
                        {ROLE_LABELS[m.role][lang]}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 truncate">{m.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{m.unit}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Latent Bridges & Datasets in this territory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-amber-200/80 p-4 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {t.bridgesHere} ({activeStat.bridges.length})
              </h3>
              <div className="space-y-2">
                {activeStat.bridges.slice(0, 4).map((b) => {
                  const rA = rById.get(b.sourceId);
                  const rB = rById.get(b.targetId);
                  if (!rA || !rB) return null;
                  return (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 text-xs"
                    >
                      <div className="flex items-center justify-between gap-1 font-bold text-slate-900">
                        <span className="truncate">
                          {rA.name.split(' ')[0]} ({AXIS_MAP[rA.primaryAxis].code}) ↔{' '}
                          {rB.name.split(' ')[0]} ({AXIS_MAP[rB.primaryAxis].code})
                        </span>
                        <span className="font-mono-code text-amber-800 shrink-0">{b.score}%</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">
                        {b.reasons[0]?.text[lang]}
                      </p>
                      <button
                        onClick={() => onOpenWarmIntro(rB, b)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900 cursor-pointer"
                      >
                        <Mail className="w-3 h-3" />
                        {UI[lang].handshakes.draftIntro}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2.5">
                <Database className="w-3.5 h-3.5 text-sky-600" />
                {t.datasetsHere} ({activeStat.assets.length})
              </h3>
              <div className="space-y-2">
                {activeStat.assets.map((asset) => {
                  const ax = AXIS_MAP[asset.axisId];
                  return (
                    <div
                      key={asset.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs"
                    >
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono-code font-bold text-white"
                          style={{ backgroundColor: ax.color }}
                        >
                          {ax.code}
                        </span>
                        <span className="font-bold text-slate-800 truncate">{asset.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {tText(asset.description, lang)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
