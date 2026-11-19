import React, { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import brazilStatesRaw from '../data/brazilStates.json';
import { AXIS_MAP } from '../data/axes';
import { HAZARD_MAP, STUDY_REGIONS } from '../data/regionsAndHazards';
import { UI } from '../i18n';
import { AxisId, Lang, LatentBridge, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

type MapTheme = 'all' | 'rain' | 'heat' | 'water' | 'amazon' | 'social';

interface TerrainMapViewProps {
  researchers: Researcher[];
  bridges: LatentBridge[];
  lang: Lang;
  selectedRegionId: string;
  onChangeRegion: (id: string) => void;
  onSelectResearcher: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
}

export const TerrainMapView: React.FC<TerrainMapViewProps> = ({
  researchers,
  bridges,
  lang,
  selectedRegionId,
  onChangeRegion,
  onSelectResearcher,
  onOpenWarmIntro,
}) => {
  const t = UI[lang].map;
  const [theme, setTheme] = useState<MapTheme>('all');

  const width = 580;
  const height = 580;

  const { pathGen, projection, features } = useMemo(() => {
    const fc = brazilStatesRaw as unknown as GeoJSON.FeatureCollection;
    const proj = geoMercator().fitExtent(
      [
        [20, 20],
        [width - 20, height - 20],
      ],
      fc
    );
    return {
      pathGen: geoPath(proj),
      projection: proj,
      features: fc.features,
    };
  }, []);

  const matchesTheme = (r: Researcher): boolean => {
    if (theme === 'all') return true;
    if (theme === 'rain') {
      return r.hazards.includes('extreme-rain-landslides') || r.hazards.includes('floods');
    }
    if (theme === 'heat') {
      return r.hazards.includes('heatwaves') || r.primaryAxis === 6;
    }
    if (theme === 'water') {
      return (
        r.primaryAxis === 5 ||
        r.hazards.includes('compound-drought') ||
        r.hazards.includes('floods')
      );
    }
    if (theme === 'amazon') {
      return (
        r.primaryAxis === 11 ||
        r.regions.includes('xingu') ||
        r.regions.includes('sul-amazonia')
      );
    }
    if (theme === 'social') {
      return [7, 9, 10].includes(r.primaryAxis);
    }
    return true;
  };

  const regionStats = useMemo(() => {
    return STUDY_REGIONS.map((reg) => {
      const members = researchers
        .filter((r) => r.regions.includes(reg.id) && matchesTheme(r))
        .sort((a, b) => {
          const pa = a.photoUrl ? 1 : 0;
          const pb = b.photoUrl ? 1 : 0;
          return pb - pa;
        });
      const distinctAxes = Array.from(new Set(members.map((m) => m.primaryAxis))).sort(
        (a, b) => a - b
      ) as AxisId[];
      const regBridges = bridges
        .filter((b) => b.sharedRegions.includes(reg.id))
        .slice(0, 6);
      const coords = projection([reg.lng, reg.lat]) || [width / 2, height / 2];
      return {
        region: reg,
        members,
        distinctAxes,
        bridges: regBridges,
        x: coords[0],
        y: coords[1],
      };
    });
  }, [researchers, bridges, projection, theme]);

  const activeStat =
    regionStats.find((s) => s.region.id === selectedRegionId) || regionStats[0];

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  return (
    <div className="space-y-4">
      {/* Big Visual Emoji Theme Buttons */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-bold text-slate-400 px-2">{t.filterTheme}</span>
        {(['all', 'rain', 'heat', 'water', 'amazon', 'social'] as MapTheme[]).map((th) => {
          const active = theme === th;
          return (
            <button
              key={th}
              onClick={() => setTheme(th)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                active
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-50 dark:bg-[#0B1219] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.themes[th]}
            </button>
          );
        })}
      </div>

      {/* Main Split: Visual Brazil Map + Visual Photo Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Left: Visual Map with Emoji Badges */}
        <div className="xl:col-span-6 observatory-bg rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col items-center justify-center">
          {/* Place Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-2">
            {regionStats.map((st) => {
              const active = st.region.id === activeStat.region.id;
              return (
                <button
                  key={st.region.id}
                  onClick={() => onChangeRegion(st.region.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-teal-500 text-slate-950 shadow-sm scale-105'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-teal-400'
                  }`}
                >
                  <span>{st.region.emoji}</span>
                  <span>{st.region.shortName[lang]}</span>
                  <span className="text-[10px] font-mono-code opacity-75">
                    ({st.members.length})
                  </span>
                </button>
              );
            })}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[540px] h-auto select-none"
          >
            {/* States */}
            <g>
              {features.map((feat, idx) => {
                const sigla = (feat.properties as { sigla?: string })?.sigla || '';
                const isSP = sigla === 'SP';
                const isAmazon = ['AM', 'PA', 'AC', 'RO', 'RR', 'AP', 'MT', 'TO'].includes(sigla);
                return (
                  <path
                    key={sigla || idx}
                    d={pathGen(feat) || ''}
                    fill={
                      isSP
                        ? 'rgba(20, 184, 166, 0.25)'
                        : isAmazon
                        ? 'rgba(16, 185, 129, 0.14)'
                        : 'rgba(30, 41, 59, 0.78)'
                    }
                    stroke="rgba(148, 163, 184, 0.35)"
                    strokeWidth={isSP ? 1.4 : 0.8}
                  />
                );
              })}
            </g>

            {/* Region Pins */}
            {regionStats.map((st) => {
              const isSelected = st.region.id === activeStat.region.id;
              const r = isSelected ? 19 : 14;
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
                      r={r + 8}
                      fill="rgba(45, 212, 191, 0.22)"
                      stroke="#2DD4BF"
                      strokeWidth={1.8}
                    />
                  )}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={r}
                    fill={isSelected ? '#0D9488' : '#0F172A'}
                    stroke={isSelected ? '#FFFFFF' : '#38BDF8'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  <text
                    x={st.x}
                    y={st.y + 4.5}
                    textAnchor="middle"
                    fontSize={isSelected ? '14' : '11'}
                  >
                    {st.region.emoji}
                  </text>
                  <text
                    x={st.x}
                    y={st.y + r + 13}
                    textAnchor="middle"
                    fill={isSelected ? '#5EEAD4' : '#E2E8F0'}
                    fontSize="10"
                    fontWeight="700"
                  >
                    {st.region.shortName[lang]} ({st.members.length})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Visual Face Grid + Instant Pairs */}
        <div className="xl:col-span-6 space-y-4">
          {/* Selected Place Header Card */}
          <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeStat.region.emoji}</span>
                <div>
                  <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {activeStat.region.name[lang]}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeStat.region.summary[lang]}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Axis Color Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {activeStat.distinctAxes.map((axId) => {
                const ax = AXIS_MAP[axId];
                return (
                  <span
                    key={axId}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-bold text-white"
                    style={{ backgroundColor: ax.color }}
                  >
                    {ax.code} {ax.shortName[lang]}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Visual Face Grid: Who Works Here */}
          <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              👥 {t.whoWorksHere} ({activeStat.members.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {activeStat.members.map((m) => {
                const ax = AXIS_MAP[m.primaryAxis];
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectResearcher(m.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 hover:border-teal-500 text-left transition cursor-pointer group"
                  >
                    <ResearcherAvatar researcher={m} size="md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold text-white"
                          style={{ backgroundColor: ax.color }}
                        >
                          {ax.code}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">{m.unit}</span>
                      </div>
                      <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-teal-400 truncate mt-0.5">
                        {m.name}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {m.hazards.slice(0, 2).map((hid) => (
                          <span key={hid} className="text-[10px] text-slate-500 dark:text-slate-400">
                            {HAZARD_MAP[hid]?.emoji} {HAZARD_MAP[hid]?.shortName[lang]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual Pair Cards: Cross-Axis Connections in This Place */}
          {activeStat.bridges.length > 0 && (
            <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
                🔗 {t.suggestedConnections}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeStat.bridges.slice(0, 4).map((b) => {
                  const rA = rById.get(b.sourceId);
                  const rB = rById.get(b.targetId);
                  if (!rA || !rB) return null;
                  return (
                    <div
                      key={b.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex -space-x-2 shrink-0">
                          <ResearcherAvatar researcher={rA} size="sm" />
                          <ResearcherAvatar researcher={rB} size="sm" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {rA.name.split(' ')[0]} ({AXIS_MAP[rA.primaryAxis].code}) ↔{' '}
                            {rB.name.split(' ')[0]} ({AXIS_MAP[rB.primaryAxis].code})
                          </div>
                          <div className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate">
                            {b.reasons[0]?.shortTag[lang]}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenWarmIntro(rB, b)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-600 text-white hover:bg-teal-500 shrink-0 cursor-pointer"
                      >
                        {t.connectBtn}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
