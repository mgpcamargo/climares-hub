import React, { useMemo, useState } from 'react';
import {
  Building2,
  Database,
  ExternalLink,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import {
  ASSET_KIND_LABELS,
  AVAILABILITY_LABELS,
  ROLE_LABELS,
  tText,
  UI,
} from '../i18n';
import {
  AvailabilityTag,
  AxisId,
  CareerRole,
  CommonsAsset,
  Lang,
  Researcher,
} from '../types';

interface DirectoryViewProps {
  researchers: Researcher[];
  assets: CommonsAsset[];
  lang: Lang;
  onSelectResearcher: (id: string) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  researchers,
  assets,
  lang,
  onSelectResearcher,
}) => {
  const t = UI[lang].directory;
  const [subTab, setSubTab] = useState<'people' | 'commons'>('people');
  const [query, setQuery] = useState('');
  const [axisFilter, setAxisFilter] = useState<AxisId | 'all'>('all');
  const [instFilter, setInstFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<CareerRole | 'all'>('all');
  const [availFilter, setAvailFilter] = useState<AvailabilityTag | 'all'>('all');

  const institutions = useMemo(
    () => Array.from(new Set(researchers.map((r) => r.institution))).sort(),
    [researchers]
  );

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  const filteredPeople = useMemo(() => {
    const q = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    return researchers.filter((r) => {
      if (axisFilter !== 'all' && r.primaryAxis !== axisFilter && !r.secondaryAxes.includes(axisFilter)) {
        return false;
      }
      if (instFilter !== 'all' && r.institution !== instFilter) return false;
      if (roleFilter !== 'all' && r.role !== roleFilter) return false;
      if (availFilter !== 'all' && !r.availability.includes(availFilter)) return false;

      if (q) {
        const hay = [
          r.name,
          r.institution,
          r.unit,
          r.city,
          tText(r.bio, lang),
          ...r.methods,
          ...r.regions.map((id) => REGION_MAP[id]?.name[lang] || id),
          ...r.offers.map((o) => tText(o.label, lang)),
          ...r.needs.map((n) => tText(n.label, lang)),
        ]
          .join(' ')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [researchers, query, axisFilter, instFilter, roleFilter, availFilter, lang]);

  const filteredAssets = useMemo(() => {
    const q = query
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    return assets.filter((a) => {
      if (
        axisFilter !== 'all' &&
        a.axisId !== axisFilter &&
        !a.usedByAxes.includes(axisFilter) &&
        !a.neededByAxes.includes(axisFilter)
      ) {
        return false;
      }
      if (q) {
        const hay = [
          a.name,
          tText(a.description, lang),
          a.format,
          ...a.regions.map((id) => REGION_MAP[id]?.name[lang] || id),
        ]
          .join(' ')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [assets, query, axisFilter, lang]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {t.title}
          </h1>
        </div>
        <div className="inline-flex rounded-xl bg-white border border-slate-200 p-1 text-xs font-semibold shadow-2xs">
          <button
            onClick={() => setSubTab('people')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition cursor-pointer ${
              subTab === 'people'
                ? 'bg-[#0F2C38] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            {t.tabPeople} ({filteredPeople.length})
          </button>
          <button
            onClick={() => setSubTab('commons')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition cursor-pointer ${
              subTab === 'commons'
                ? 'bg-[#0F2C38] text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            {t.tabCommons} ({filteredAssets.length})
          </button>
        </div>
      </div>

      {/* Search & Faceted Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/25 focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={axisFilter}
            onChange={(e) =>
              setAxisFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as AxisId))
            }
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
          >
            <option value="all">{UI[lang].handshakes.filterAxis}</option>
            {AXES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.name[lang]}
              </option>
            ))}
          </select>

          {subTab === 'people' && (
            <>
              <select
                value={instFilter}
                onChange={(e) => setInstFilter(e.target.value)}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
              >
                <option value="all">{t.allInstitutions}</option>
                {institutions.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as CareerRole | 'all')}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
              >
                <option value="all">{t.allRoles}</option>
                {Object.entries(ROLE_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v[lang]}
                  </option>
                ))}
              </select>

              <select
                value={availFilter}
                onChange={(e) => setAvailFilter(e.target.value as AvailabilityTag | 'all')}
                className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
              >
                <option value="all">{t.allAvail}</option>
                {Object.entries(AVAILABILITY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v[lang]}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>

      {/* People Grid */}
      {subTab === 'people' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPeople.map((r) => {
            const ax = AXIS_MAP[r.primaryAxis];
            const initials = r.name
              .replace(' (Exemplo)', '')
              .split(' ')
              .slice(0, 2)
              .map((s) => s[0])
              .join('')
              .toUpperCase();

            return (
              <div
                key={r.id}
                onClick={() => onSelectResearcher(r.id)}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-teal-400/80 hover:shadow-md transition p-4.5 cursor-pointer flex flex-col justify-between overflow-hidden relative"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: ax.color }}
                />

                <div>
                  <div className="flex items-start gap-3 pt-1">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-white text-xs shrink-0 shadow-2xs"
                      style={{ backgroundColor: ax.color }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                          style={{ backgroundColor: ax.color }}
                        >
                          {ax.code}
                        </span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {ROLE_LABELS[r.role][lang]}
                        </span>
                        {r.isDemoProfile && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            {t.exampleBadge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-teal-700 truncate">
                        {r.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <Building2 className="w-3 h-3 shrink-0" />
                        {r.unit} • {r.city}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {tText(r.bio, lang)}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {r.methods.slice(0, 4).map((m) => (
                      <span
                        key={m}
                        className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200/80 text-slate-600"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2.5 text-slate-500">
                    <span className="text-emerald-700 font-semibold">
                      {r.offers.length} {t.offersCount}
                    </span>
                    <span className="text-amber-700 font-semibold">
                      {r.needs.length} {t.needsCount}
                    </span>
                  </div>
                  <span className="font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
                    {t.openProfile} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Commons Assets Grid */}
      {subTab === 'commons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssets.map((a) => {
            const ax = AXIS_MAP[a.axisId];
            const accessLabel =
              a.access === 'open'
                ? t.accessOpen
                : a.access === 'internal'
                ? t.accessInternal
                : t.accessRequest;
            const accessStyle =
              a.access === 'open'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : a.access === 'internal'
                ? 'bg-sky-50 text-sky-800 border-sky-200'
                : 'bg-amber-50 text-amber-800 border-amber-200';

            return (
              <div
                key={a.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                        style={{ backgroundColor: ax.color }}
                      >
                        {ax.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {ASSET_KIND_LABELS[a.kind][lang]}
                      </span>
                      <span className="text-[10px] font-mono-code text-slate-400">{a.format}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${accessStyle}`}>
                      {accessLabel}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900">{a.name}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {tText(a.description, lang)}
                  </p>

                  {/* Used by vs Needed by Axes */}
                  <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                      <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">
                        {t.usedBy}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {a.usedByAxes.map((id) => (
                          <span
                            key={id}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: AXIS_MAP[id].color }}
                          >
                            {AXIS_MAP[id].code}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl bg-amber-50/50 p-2.5 border border-amber-100">
                      <div className="text-[10px] font-bold uppercase text-amber-800 flex items-center gap-1 mb-1">
                        <Sparkles className="w-3 h-3" />
                        {t.neededBy}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {a.neededByAxes.map((id) => (
                          <span
                            key={id}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold border bg-white"
                            style={{
                              color: AXIS_MAP[id].color,
                              borderColor: `${AXIS_MAP[id].color}66`,
                            }}
                          >
                            {AXIS_MAP[id].code}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-[11px] text-slate-400 font-medium">{t.maintainers}:</span>
                    {a.maintainerIds.map((mid) => {
                      const m = rById.get(mid);
                      if (!m) return null;
                      return (
                        <button
                          key={mid}
                          onClick={() => onSelectResearcher(mid)}
                          className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
                        >
                          {m.name}
                        </button>
                      );
                    })}
                  </div>
                  {a.url && (
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-teal-700"
                    >
                      {t.openLink}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
