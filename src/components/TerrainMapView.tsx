import React, { useMemo, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { BookOpen, ExternalLink } from 'lucide-react';
import brazilStatesRaw from '../data/brazilStates.json';
import { AXIS_MAP } from '../data/axes';
import { BRAZIL_STATE_NAMES, STUDY_REGIONS } from '../data/regionsAndHazards';
import { UI } from '../i18n';
import { AxisId, Lang, LatentBridge, Publication, Researcher } from '../types';
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
  // Selection can be either a StudyRegion id ('rmsp', 'xingu') OR 'state:AM', 'state:MG', etc.!
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [hoveredStateCode, setHoveredStateCode] = useState<string | null>(null);

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
        r.regions.includes('sul-amazonia') ||
        (r.studiedStates || []).some((s) => ['AM', 'PA', 'AC', 'RO', 'RR', 'AP'].includes(s))
      );
    }
    if (theme === 'social') {
      return [7, 9, 10].includes(r.primaryAxis);
    }
    return true;
  };

  // Count researchers active in each of the 27 Brazilian states
  const stateMemberCounts = useMemo(() => {
    const map: Record<string, Researcher[]> = {};
    for (const code of Object.keys(BRAZIL_STATE_NAMES)) map[code] = [];
    for (const r of researchers) {
      if (!matchesTheme(r)) continue;
      const stSet = new Set<string>(r.studiedStates || []);
      if (r.homeState) stSet.add(r.homeState);
      for (const rid of r.regions) {
        const reg = STUDY_REGIONS.find((x) => x.id === rid);
        reg?.states.forEach((s) => stSet.add(s));
      }
      for (const s of stSet) {
        if (map[s]) map[s].push(r);
      }
    }
    return map;
  }, [researchers, theme]);

  const regionPins = useMemo(() => {
    return STUDY_REGIONS.map((reg) => {
      const members = researchers.filter((r) => r.regions.includes(reg.id) && matchesTheme(r));
      const coords = projection([reg.lng, reg.lat]) || [width / 2, height / 2];
      return { region: reg, count: members.length, x: coords[0], y: coords[1] };
    });
  }, [researchers, projection, theme]);

  // Active Selection Data (either clicked Brazilian State OR clicked Hotspot Region)
  const activePanel = useMemo(() => {
    if (selectedState && BRAZIL_STATE_NAMES[selectedState]) {
      const meta = BRAZIL_STATE_NAMES[selectedState];
      const members = [...(stateMemberCounts[selectedState] || [])].sort(
        (a, b) => (b.photoUrl ? 1 : 0) - (a.photoUrl ? 1 : 0)
      );
      const memberIds = new Set(members.map((m) => m.id));
      const distinctAxes = Array.from(new Set(members.map((m) => m.primaryAxis))).sort(
        (a, b) => a - b
      ) as AxisId[];

      // Find real publications mentioning this state name!
      const stLower = meta.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const papers: { pub: Publication; author: Researcher }[] = [];
      const seenTitles = new Set<string>();
      for (const m of members) {
        for (const p of m.publications) {
          const tNorm = p.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
          if (
            (tNorm.includes(stLower) ||
              (selectedState === 'PA' && (tNorm.includes('xingu') || tNorm.includes('amazon'))) ||
              (selectedState === 'AM' && tNorm.includes('amazon'))) &&
            !seenTitles.has(p.title)
          ) {
            seenTitles.add(p.title);
            papers.push({ pub: p, author: m });
          }
        }
      }

      const relBridges = bridges
        .filter((b) => memberIds.has(b.sourceId) && memberIds.has(b.targetId))
        .slice(0, 4);

      return {
        emoji: meta.emoji,
        title: `${meta.name} (${selectedState})`,
        subtitle: lang === 'pt' ? meta.biomePt : meta.biomeEn,
        members,
        distinctAxes,
        papers: papers.slice(0, 4),
        bridges: relBridges,
      };
    }

    const reg = STUDY_REGIONS.find((r) => r.id === selectedRegionId) || STUDY_REGIONS[0];
    const members = researchers
      .filter((r) => r.regions.includes(reg.id) && matchesTheme(r))
      .sort((a, b) => (b.photoUrl ? 1 : 0) - (a.photoUrl ? 1 : 0));
    const distinctAxes = Array.from(new Set(members.map((m) => m.primaryAxis))).sort(
      (a, b) => a - b
    ) as AxisId[];

    const papers: { pub: Publication; author: Researcher }[] = [];
    const seenTitles = new Set<string>();
    for (const m of members) {
      for (const p of m.publications) {
        if (!seenTitles.has(p.title) && papers.length < 4) {
          seenTitles.add(p.title);
          papers.push({ pub: p, author: m });
        }
      }
    }

    const relBridges = bridges
      .filter((b) => b.sharedRegions.includes(reg.id))
      .slice(0, 4);

    return {
      emoji: reg.emoji,
      title: reg.name[lang],
      subtitle: reg.summary[lang],
      members,
      distinctAxes,
      papers,
      bridges: relBridges,
    };
  }, [selectedState, selectedRegionId, stateMemberCounts, researchers, bridges, lang, theme]);

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  return (
    <div className="space-y-4">
      {/* Emoji Theme Filter Bar */}
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

      {/* Main Split: Interactive Choropleth Brazil States + Hotspots Map | Right Face & Papers Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-6 observatory-bg rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col items-center justify-center relative">
          {/* Hotspot Quick Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-2">
            {regionPins.map((st) => {
              const active = !selectedState && st.region.id === selectedRegionId;
              return (
                <button
                  key={st.region.id}
                  onClick={() => {
                    setSelectedState(null);
                    onChangeRegion(st.region.id);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-teal-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700/80 hover:border-teal-400'
                  }`}
                >
                  <span>{st.region.emoji}</span>
                  <span>{st.region.shortName[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Hover State Indicator */}
          <div className="h-5 text-xs font-semibold text-teal-300">
            {hoveredStateCode && BRAZIL_STATE_NAMES[hoveredStateCode]
              ? `${BRAZIL_STATE_NAMES[hoveredStateCode].emoji} ${BRAZIL_STATE_NAMES[hoveredStateCode].name} (${
                  stateMemberCounts[hoveredStateCode]?.length || 0
                } ${lang === 'pt' ? 'pesquisadores — clique no estado' : 'researchers — click state'})`
              : lang === 'pt'
              ? 'Clique em qualquer Estado do mapa ou em um pino regional'
              : 'Click any Brazilian State on the map or a regional pin'}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-[540px] h-auto select-none"
          >
            {/* Interactive Clickable Brazilian States */}
            <g>
              {features.map((feat, idx) => {
                const sigla = (feat.properties as { sigla?: string })?.sigla || '';
                const cnt = stateMemberCounts[sigla]?.length || 0;
                const isSelState = selectedState === sigla;
                const isHov = hoveredStateCode === sigla;

                const intensity = Math.min(0.65, 0.08 + Math.log2(cnt + 1) * 0.09);
                const fill = isSelState
                  ? 'rgba(20, 184, 166, 0.58)'
                  : isHov
                  ? 'rgba(45, 212, 191, 0.38)'
                  : cnt > 0
                  ? `rgba(14, 165, 233, ${intensity})`
                  : 'rgba(30, 41, 59, 0.72)';

                return (
                  <path
                    key={sigla || idx}
                    d={pathGen(feat) || ''}
                    fill={fill}
                    stroke={isSelState ? '#5EEAD4' : 'rgba(148, 163, 184, 0.42)'}
                    strokeWidth={isSelState ? 2.2 : 0.9}
                    className="cursor-pointer transition-colors"
                    onMouseEnter={() => setHoveredStateCode(sigla)}
                    onMouseLeave={() => setHoveredStateCode(null)}
                    onClick={() => setSelectedState(sigla)}
                  />
                );
              })}
            </g>

            {/* Key Regional Hotspot Pins */}
            {regionPins.map((st) => {
              const isSelected = !selectedState && st.region.id === selectedRegionId;
              const r = isSelected ? 17 : 12.5;
              return (
                <g
                  key={st.region.id}
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedState(null);
                    onChangeRegion(st.region.id);
                  }}
                >
                  {isSelected && (
                    <circle
                      cx={st.x}
                      cy={st.y}
                      r={r + 7}
                      fill="rgba(45, 212, 191, 0.24)"
                      stroke="#2DD4BF"
                      strokeWidth={1.6}
                    />
                  )}
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={r}
                    fill={isSelected ? '#0D9488' : '#0B131C'}
                    stroke={isSelected ? '#FFFFFF' : '#38BDF8'}
                    strokeWidth={isSelected ? 2.2 : 1.4}
                  />
                  <text
                    x={st.x}
                    y={st.y + 4}
                    textAnchor="middle"
                    fontSize={isSelected ? '13' : '10.5'}
                  >
                    {st.region.emoji}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Panel: Selected State / Territory Visual Breakdown */}
        <div className="xl:col-span-6 space-y-4">
          {/* Header */}
          <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{activePanel.emoji}</span>
              <div>
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                  {activePanel.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activePanel.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {activePanel.distinctAxes.map((axId) => {
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

          {/* Visual Face Grid */}
          <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              👥 {t.whoWorksHere} ({activePanel.members.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[250px] overflow-y-auto pr-1">
              {activePanel.members.map((m) => {
                const ax = AXIS_MAP[m.primaryAxis];
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectResearcher(m.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 hover:border-teal-500 text-left transition cursor-pointer group"
                  >
                    <ResearcherAvatar researcher={m} size="sm" />
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
                      <div className="font-display font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-400 truncate mt-0.5">
                        {m.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real CLIMARES Publications on This Region */}
          {activePanel.papers.length > 0 && (
            <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5 mb-2.5">
                <BookOpen className="w-3.5 h-3.5" />
                {t.papersHere}
              </h3>
              <div className="space-y-2">
                {activePanel.papers.map(({ pub, author }, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400 mb-0.5">
                      <span>
                        {pub.year} • {author.name} ({AXIS_MAP[author.primaryAxis].code})
                      </span>
                      {pub.doi && (
                        <a
                          href={pub.doi}
                          target="_blank"
                          rel="noreferrer"
                          className="text-teal-500 hover:underline inline-flex items-center gap-0.5"
                        >
                          DOI <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                      {pub.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cross-Axis Pairs Here */}
          {activePanel.bridges.length > 0 && (
            <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2.5">
                🧬 {t.bridgesHere}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePanel.bridges.map((b) => {
                  const rA = rById.get(b.sourceId);
                  const rB = rById.get(b.targetId);
                  if (!rA || !rB) return null;
                  return (
                    <div
                      key={b.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="flex -space-x-2 shrink-0">
                          <ResearcherAvatar researcher={rA} size="xs" />
                          <ResearcherAvatar researcher={rB} size="xs" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {rA.name.split(' ')[0]} ({AXIS_MAP[rA.primaryAxis].code}) ↔{' '}
                            {rB.name.split(' ')[0]} ({AXIS_MAP[rB.primaryAxis].code})
                          </div>
                          <div className="text-[10px] text-teal-600 dark:text-teal-400 truncate">
                            {b.reasons[0]?.shortTag[lang]}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onOpenWarmIntro(rB, b)}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold bg-teal-600 text-white hover:bg-teal-500 shrink-0 cursor-pointer"
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
