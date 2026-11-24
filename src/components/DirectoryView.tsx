import React, { useMemo, useState } from 'react';
import { BookOpen, Building2, CheckCircle2, Search, X } from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import { ROLE_LABELS, UI } from '../i18n';
import { AxisId, Lang, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface DirectoryViewProps {
  researchers: Researcher[];
  lang: Lang;
  onSelectResearcher: (id: string) => void;
}

type RoleGroup = 'all' | 'leads' | 'associates' | 'fellows';

function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  researchers,
  lang,
  onSelectResearcher,
}) => {
  const t = UI[lang].people;
  const [query, setQuery] = useState('');
  const [axisFilter, setAxisFilter] = useState<AxisId | 'all'>('all');
  const [roleGroup, setRoleGroup] = useState<RoleGroup>('all');
  const [instFilter, setInstFilter] = useState<string>('all');

  const axisCounts = useMemo(() => {
    const counts = {} as Record<AxisId, number>;
    for (const a of AXES) counts[a.id] = 0;
    for (const r of researchers) {
      counts[r.primaryAxis] = (counts[r.primaryAxis] || 0) + 1;
    }
    return counts;
  }, [researchers]);

  const institutions = useMemo(
    () => Array.from(new Set(researchers.map((r) => r.institution))).sort(),
    [researchers]
  );

  const filteredPeople = useMemo(() => {
    const q = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    return researchers.filter((r) => {
      if (axisFilter !== 'all' && r.primaryAxis !== axisFilter) {
        return false;
      }
      if (instFilter !== 'all' && r.institution !== instFilter) return false;
      if (roleGroup === 'leads' && r.role !== 'coordinator' && r.role !== 'pi') return false;
      if (roleGroup === 'associates' && r.role !== 'associate') return false;
      if (
        roleGroup === 'fellows' &&
        !['postdoc', 'phd', 'msc', 'ic', 'tech'].includes(r.role)
      ) {
        return false;
      }

      if (q) {
        const hay = [
          r.name,
          r.institution,
          r.unit,
          r.city,
          ...(r.empiricalTopics || []),
          ...r.methods,
          ...r.publications.map((p) => p.title),
          ...r.regions.map((id) => REGION_MAP[id]?.shortName[lang] || id),
        ]
          .join(' ')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [researchers, query, axisFilter, instFilter, roleGroup, lang]);

  return (
    <div className="space-y-4">
      {/* Visual 11-Axis Pill Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setAxisFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition cursor-pointer ${
            axisFilter === 'all'
              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
              : 'bg-white dark:bg-[#121C26] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
          }`}
        >
          {t.allAxes} ({researchers.length})
        </button>
        {AXES.map((ax) => {
          const active = axisFilter === ax.id;
          return (
            <button
              key={ax.id}
              onClick={() => setAxisFilter(active ? 'all' : ax.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition cursor-pointer ${
                active
                  ? 'text-white shadow-xs'
                  : 'bg-white dark:bg-[#121C26] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
              }`}
              style={
                active
                  ? { backgroundColor: ax.color, borderColor: ax.color }
                  : undefined
              }
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: active ? '#fff' : ax.color }}
              />
              <span className="font-mono-code font-bold">{ax.code}</span>
              <span>{ax.shortName[lang]}</span>
              <span
                className={`text-[10px] font-mono-code px-1 rounded ${
                  active
                    ? 'bg-black/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                {axisCounts[ax.id]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Compact Search + Role Pills + Institution Filter */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-[#0B1219] p-1 text-xs font-semibold">
            {(
              [
                { id: 'all', label: t.allRoles },
                { id: 'leads', label: t.leadsOnly },
                { id: 'associates', label: t.associatesOnly },
                { id: 'fellows', label: t.fellowsOnly },
              ] as const
            ).map((rg) => (
              <button
                key={rg.id}
                onClick={() => setRoleGroup(rg.id)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  roleGroup === rg.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {rg.label}
              </button>
            ))}
          </div>

          <select
            value={instFilter}
            onChange={(e) => setInstFilter(e.target.value)}
            className="text-xs font-semibold bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <option value="all">{t.allInst}</option>
            {institutions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Photo & Bibliometric Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredPeople.map((r) => {
          const ax = AXIS_MAP[r.primaryAxis];
          const isLead = r.role === 'coordinator' || r.role === 'pi';
          const displayTopics =
            r.empiricalTopics && r.empiricalTopics.length > 0
              ? r.empiricalTopics.slice(0, 2)
              : r.methods.slice(0, 2);

          return (
            <div
              key={r.id}
              onClick={() => onSelectResearcher(r.id)}
              className="group bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200/80 dark:border-slate-800/90 hover:border-teal-500 dark:hover:border-teal-400 transition-all p-4 cursor-pointer flex flex-col justify-between relative overflow-hidden shadow-2xs hover:shadow-md"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: ax.color }}
              />

              <div>
                <div className="flex items-center gap-3.5 pt-1">
                  <ResearcherAvatar researcher={r} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1 mb-1">
                      <span
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                        style={{ backgroundColor: ax.color }}
                      >
                        {ax.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isLead
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/25'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {ROLE_LABELS[r.role][lang === 'pt' ? 'shortPt' : 'shortEn']}
                      </span>
                      {r.openalexId && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-teal-500 shrink-0"
                          aria-label={t.verifiedBadge}
                        />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 leading-snug truncate">
                      {r.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate mt-0.5">
                      <Building2 className="w-3 h-3 shrink-0" />
                      {r.unit}
                    </p>
                  </div>
                </div>

                {/* Empirical OpenAlex Topics + Territory Badges */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {displayTopics.map((tp) => (
                    <span
                      key={tp}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 truncate max-w-[200px]"
                    >
                      {tp}
                    </span>
                  ))}
                  {r.regions.slice(0, 1).map((rid) => {
                    const reg = REGION_MAP[rid];
                    if (!reg) return null;
                    return (
                      <span
                        key={rid}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20"
                      >
                        {reg.emoji} {reg.shortName[lang]}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Footer: Real Bibliometric Counts */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                <span
                  className="text-[10px] font-bold truncate max-w-[145px]"
                  style={{ color: ax.color }}
                >
                  {ax.shortName[lang]}
                </span>

                {r.worksCount ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono-code text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-3 h-3 text-teal-500" />
                    <strong>{formatCompact(r.worksCount)}</strong> {t.worksLabel}
                    {r.citedByCount ? ` • ${formatCompact(r.citedByCount)} cit.` : ''}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400 group-hover:text-teal-400">
                    {lang === 'pt' ? 'Ver perfil →' : 'View profile →'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
