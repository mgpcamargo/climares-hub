import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRightLeft,
  BookOpen,
  Building2,
  Crosshair,
  ExternalLink,
  Flame,
  Info,
  Mail,
  MapPin,
  Sparkles,
  UserCheck,
  Wrench,
  X,
} from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { HAZARD_MAP, REGION_MAP } from '../data/regionsAndHazards';
import { getBridgesForResearcher } from '../engine/bridgeEngine';
import { AVAILABILITY_LABELS, DOMAIN_LABELS, ROLE_LABELS, tText, UI } from '../i18n';
import { Lang, LatentBridge, Researcher } from '../types';

interface ResearcherDrawerProps {
  researcher: Researcher | null;
  allResearchers: Researcher[];
  bridges: LatentBridge[];
  lang: Lang;
  activePersonaId: string | null;
  onClose: () => void;
  onSelectResearcher: (id: string) => void;
  onCenterInGraph: (id: string) => void;
  onSetPersona: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
}

export const ResearcherDrawer: React.FC<ResearcherDrawerProps> = ({
  researcher,
  allResearchers,
  bridges,
  lang,
  activePersonaId,
  onClose,
  onSelectResearcher,
  onCenterInGraph,
  onSetPersona,
  onOpenWarmIntro,
}) => {
  const [tab, setTab] = useState<'overview' | 'bridges' | 'publications'>('overview');
  const t = UI[lang].drawer;

  useEffect(() => {
    setTab('overview');
  }, [researcher?.id]);

  const byId = useMemo(
    () => new Map(allResearchers.map((r) => [r.id, r])),
    [allResearchers]
  );

  const topBridges = useMemo(() => {
    if (!researcher) return [];
    return getBridgesForResearcher(researcher.id, bridges, 6);
  }, [researcher, bridges]);

  if (!researcher) return null;

  const axis = AXIS_MAP[researcher.primaryAxis];
  const roleLabel = ROLE_LABELS[researcher.role][lang];
  const isMe = activePersonaId === researcher.id;
  const initials = researcher.name
    .replace(' (Exemplo)', '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/35 backdrop-blur-[2px]">
      <div className="flex-1" onClick={onClose} />
      <aside className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Top Colored Header Strip */}
        <div
          className="px-6 pt-5 pb-4 border-b border-slate-200/80"
          style={{
            background: `linear-gradient(135deg, ${axis.color}14 0%, #ffffff 65%)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center font-display font-bold text-white text-lg shadow-sm shrink-0"
                style={{ backgroundColor: axis.color }}
              >
                {initials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono-code font-semibold text-white"
                    style={{ backgroundColor: axis.color }}
                  >
                    {axis.code} • {axis.shortName[lang]}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                    {roleLabel}
                  </span>
                  {researcher.isDemoProfile && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-100 text-amber-800">
                      {UI[lang].directory.exampleBadge}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-bold text-xl text-slate-900 leading-tight">
                  {researcher.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    {researcher.unit} ({researcher.institution})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {researcher.city}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => onCenterInGraph(researcher.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#173e4f] transition cursor-pointer"
            >
              <Crosshair className="w-3.5 h-3.5 text-teal-300" />
              {t.focusEgoGraph}
            </button>
            <button
              onClick={() => onOpenWarmIntro(researcher, null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              {t.warmIntro}
            </button>
            <button
              onClick={() => onSetPersona(researcher.id)}
              disabled={isMe}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                isMe
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 cursor-default'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              {isMe ? t.alreadyMe : t.setAsMe}
            </button>
          </div>

          {/* Drawer Tabs */}
          <div className="flex items-center gap-1 mt-4 -mb-4">
            {(
              [
                { id: 'overview', label: t.overview },
                { id: 'bridges', label: `${t.bridges} (${topBridges.length})` },
                { id: 'publications', label: `${t.publications} (${researcher.publications.length})` },
              ] as const
            ).map((tb) => (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  tab === tb.id
                    ? 'border-teal-700 text-teal-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tb.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {researcher.isDemoProfile && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{t.demoWarning}</span>
            </div>
          )}

          {tab === 'overview' && (
            <>
              <p className="text-sm text-slate-700 leading-relaxed">
                {tText(researcher.bio, lang)}
              </p>

              {/* Secondary Axes */}
              {researcher.secondaryAxes.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
                    {lang === 'pt' ? 'Afinidade secundária:' : 'Secondary axes:'}
                  </span>
                  {researcher.secondaryAxes.map((axId) => {
                    const sec = AXIS_MAP[axId];
                    return (
                      <span
                        key={axId}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border"
                        style={{
                          backgroundColor: sec.bgTint,
                          borderColor: `${sec.color}40`,
                          color: '#0f1f24',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: sec.color }}
                        />
                        {sec.code} {sec.shortName[lang]}
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Offers & Needs */}
              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2">
                    <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                    {t.offersTitle}
                  </h3>
                  {researcher.offers.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">—</p>
                  ) : (
                    <ul className="space-y-2">
                      {researcher.offers.map((off) => (
                        <li key={off.id} className="text-xs bg-white rounded-lg p-2.5 border border-emerald-100 shadow-2xs">
                          <div className="font-semibold text-slate-800">
                            {tText(off.label, lang)}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-100/80 text-emerald-900">
                              {DOMAIN_LABELS[off.domain][lang]}
                            </span>
                            {off.scale && (
                              <span className="text-[10px] font-mono-code text-slate-500">
                                {off.scale}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    {t.needsTitle}
                  </h3>
                  {researcher.needs.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">—</p>
                  ) : (
                    <ul className="space-y-2">
                      {researcher.needs.map((nd) => (
                        <li key={nd.id} className="text-xs bg-white rounded-lg p-2.5 border border-amber-100 shadow-2xs">
                          <div className="font-semibold text-slate-800">
                            {tText(nd.label, lang)}
                          </div>
                          <div className="mt-1">
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-100/80 text-amber-900">
                              {DOMAIN_LABELS[nd.domain][lang]}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Regions & Hazards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200/80 p-3.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-600" />
                    {t.regionsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {researcher.regions.map((rid) => (
                      <span
                        key={rid}
                        className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-100 text-slate-700"
                      >
                        {REGION_MAP[rid]?.name[lang] || rid}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200/80 p-3.5">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    {t.hazardsTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {researcher.hazards.map((hid) => {
                      const hz = HAZARD_MAP[hid];
                      return (
                        <span
                          key={hid}
                          className="text-[11px] font-medium px-2 py-1 rounded-md bg-orange-50 text-orange-900 border border-orange-200/60"
                        >
                          {hz ? hz.shortName[lang] : hid}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Methods */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-2">
                  <Wrench className="w-3.5 h-3.5 text-slate-400" />
                  {t.methodsTitle}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {researcher.methods.map((m) => (
                    <span
                      key={m}
                      className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              {researcher.availability.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {t.availabilityTitle}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {researcher.availability.map((av) => (
                      <span
                        key={av}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/70"
                      >
                        ✓ {AVAILABILITY_LABELS[av][lang]}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Links */}
              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {t.externalLinks}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {researcher.bvFapespUrl && (
                    <a
                      href={researcher.bvFapespUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      BV FAPESP <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                  {researcher.lattesUrl && (
                    <a
                      href={researcher.lattesUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      Currículo Lattes <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                  {researcher.orcid && (
                    <a
                      href={`https://orcid.org/${researcher.orcid}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono-code font-medium bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    >
                      ORCID {researcher.orcid} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {researcher.githubUrl && (
                    <a
                      href={researcher.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      GitHub <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                  <a
                    href={`https://openalex.org/authors?search=${encodeURIComponent(
                      researcher.name.replace(' (Exemplo)', '')
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-sky-50 border border-sky-200 text-sky-800 hover:bg-sky-100"
                  >
                    OpenAlex <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </>
          )}

          {tab === 'bridges' && (
            <div className="space-y-3">
              {topBridges.map(({ bridge, partnerId }) => {
                const partner = byId.get(partnerId);
                if (!partner) return null;
                const pAx = AXIS_MAP[partner.primaryAxis];
                return (
                  <div
                    key={bridge.id}
                    className="rounded-xl border border-slate-200 p-4 hover:border-teal-400/70 transition bg-white shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: pAx.color }}
                          >
                            {pAx.code} • {pAx.shortName[lang]}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              bridge.alreadyConnected
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {bridge.alreadyConnected ? t.alreadyCollab : t.newBridge}
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectResearcher(partner.id)}
                          className="font-display font-bold text-sm text-slate-900 hover:text-teal-700 text-left cursor-pointer"
                        >
                          {partner.name}
                        </button>
                        <p className="text-[11px] text-slate-500">
                          {ROLE_LABELS[partner.role][lang]} • {partner.unit}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-lg bg-teal-50 border border-teal-200 font-mono-code font-bold text-sm text-teal-800">
                          {bridge.score}%
                        </span>
                      </div>
                    </div>

                    <ul className="mt-3 space-y-1.5">
                      {bridge.reasons.slice(0, 3).map((r, i) => (
                        <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold mt-0.5">•</span>
                          <span>{r.text[lang]}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectResearcher(partner.id)}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                      >
                        {UI[lang].directory.openProfile} →
                      </button>
                      <button
                        onClick={() => onOpenWarmIntro(partner, bridge)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 transition cursor-pointer"
                      >
                        <Mail className="w-3 h-3" />
                        {t.warmIntro}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'publications' && (
            <div className="space-y-3">
              {researcher.publications.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500">
                  <BookOpen className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                  {t.noPubs}
                </div>
              ) : (
                researcher.publications.map((pub, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono-code font-semibold text-slate-500">
                        {pub.year} • {pub.journal}
                      </span>
                      {pub.crossAxis && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-100 text-teal-800">
                          ✦ {t.crossAxisPub}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                      {pub.title}
                    </h4>
                    {pub.coAuthorIds && pub.coAuthorIds.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {pub.coAuthorIds.map((cid) => {
                          const co = byId.get(cid);
                          if (!co) return null;
                          const cAx = AXIS_MAP[co.primaryAxis];
                          return (
                            <button
                              key={cid}
                              onClick={() => onSelectResearcher(co.id)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-white border border-slate-200 hover:border-teal-400 text-slate-700 cursor-pointer"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: cAx.color }}
                              />
                              {co.name} ({cAx.code})
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
