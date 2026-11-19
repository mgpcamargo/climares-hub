import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Plus,
  Sparkles,
  X,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { HAZARD_MAP, REGION_MAP } from '../data/regionsAndHazards';
import { DOMAIN_LABELS, ROLE_LABELS, tText, UI } from '../i18n';
import {
  AxisId,
  CapabilityDomain,
  CapabilityItem,
  HandshakeMatch,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';

interface HandshakesViewProps {
  researchers: Researcher[];
  handshakes: HandshakeMatch[];
  bridges: LatentBridge[];
  lang: Lang;
  activePersonaId: string | null;
  onSelectResearcher: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
  onAddCapability: (
    researcherId: string,
    kind: 'offer' | 'need',
    item: CapabilityItem
  ) => void;
}

export const HandshakesView: React.FC<HandshakesViewProps> = ({
  researchers,
  handshakes,
  bridges,
  lang,
  activePersonaId,
  onSelectResearcher,
  onOpenWarmIntro,
  onAddCapability,
}) => {
  const t = UI[lang].handshakes;
  const [subTab, setSubTab] = useState<'matches' | 'offers' | 'needs'>('matches');
  const [domainFilter, setDomainFilter] = useState<CapabilityDomain | 'all'>('all');
  const [axisFilter, setAxisFilter] = useState<AxisId | 'all'>('all');
  const [crossOnly, setCrossOnly] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Modal form state
  const [postKind, setPostKind] = useState<'offer' | 'need'>('need');
  const [postResearcherId, setPostResearcherId] = useState(
    activePersonaId || researchers[0]?.id || ''
  );
  const [postDomain, setPostDomain] = useState<CapabilityDomain>('climate_projections');
  const [postLabel, setPostLabel] = useState('');
  const [postDetail, setPostDetail] = useState('');
  const [postScale, setPostScale] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const filteredMatches = useMemo(() => {
    return handshakes.filter((h) => {
      if (crossOnly && !h.crossAxis) return false;
      if (domainFilter !== 'all' && h.offer.domain !== domainFilter && h.need.domain !== domainFilter) {
        return false;
      }
      if (
        axisFilter !== 'all' &&
        h.provider.primaryAxis !== axisFilter &&
        h.seeker.primaryAxis !== axisFilter
      ) {
        return false;
      }
      return true;
    });
  }, [handshakes, crossOnly, domainFilter, axisFilter]);

  const allOffers = useMemo(() => {
    return researchers
      .flatMap((r) => r.offers.map((o) => ({ researcher: r, item: o })))
      .filter(({ researcher, item }) => {
        if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
        if (axisFilter !== 'all' && researcher.primaryAxis !== axisFilter) return false;
        return true;
      });
  }, [researchers, domainFilter, axisFilter]);

  const allNeeds = useMemo(() => {
    return researchers
      .flatMap((r) => r.needs.map((n) => ({ researcher: r, item: n })))
      .filter(({ researcher, item }) => {
        if (domainFilter !== 'all' && item.domain !== domainFilter) return false;
        if (axisFilter !== 'all' && researcher.primaryAxis !== axisFilter) return false;
        return true;
      });
  }, [researchers, domainFilter, axisFilter]);

  const findBridge = (idA: string, idB: string): LatentBridge | null => {
    return (
      bridges.find(
        (b) =>
          (b.sourceId === idA && b.targetId === idB) ||
          (b.sourceId === idB && b.targetId === idA)
      ) || null
    );
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postLabel.trim() || !postResearcherId) return;
    onAddCapability(postResearcherId, postKind, {
      id: `user-${postKind}-${Date.now()}`,
      domain: postDomain,
      label: postLabel.trim(),
      detail: postDetail.trim() || undefined,
      scale: postScale.trim() || undefined,
    });
    setPostLabel('');
    setPostDetail('');
    setPostScale('');
    setModalOpen(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 5000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">{t.subtitle}</p>
        </div>
        <button
          onClick={() => {
            setPostResearcherId(activePersonaId || researchers[0]?.id || '');
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.postButton.replace('+ ', '')}
        </button>
      </div>

      {savedNotice && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {t.modalSavedHint}
        </div>
      )}

      {/* Tabs + Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold">
          <button
            onClick={() => setSubTab('matches')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'matches' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            {t.tabMatches} ({filteredMatches.length})
          </button>
          <button
            onClick={() => setSubTab('offers')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'offers' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            {t.tabOffers} ({allOffers.length})
          </button>
          <button
            onClick={() => setSubTab('needs')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'needs' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            {t.tabNeeds} ({allNeeds.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as CapabilityDomain | 'all')}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
          >
            <option value="all">{t.filterDomain}</option>
            {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v[lang]}
              </option>
            ))}
          </select>

          <select
            value={axisFilter}
            onChange={(e) =>
              setAxisFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as AxisId))
            }
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 cursor-pointer"
          >
            <option value="all">{t.filterAxis}</option>
            {AXES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.shortName[lang]}
              </option>
            ))}
          </select>

          {subTab === 'matches' && (
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={crossOnly}
                onChange={(e) => setCrossOnly(e.target.checked)}
                className="accent-teal-600 cursor-pointer"
              />
              {t.crossOnlyToggle}
            </label>
          )}
        </div>
      </div>

      {/* Matches Grid */}
      {subTab === 'matches' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMatches.length === 0 ? (
            <div className="lg:col-span-2 bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
              {t.noMatches}
            </div>
          ) : (
            filteredMatches.slice(0, 24).map((m) => {
              const axP = AXIS_MAP[m.provider.primaryAxis];
              const axS = AXIS_MAP[m.seeker.primaryAxis];
              const isPersonaRelevant =
                activePersonaId === m.provider.id || activePersonaId === m.seeker.id;

              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs transition hover:shadow-md ${
                    isPersonaRelevant
                      ? 'border-teal-400 ring-2 ring-teal-500/15'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Top meta bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      {DOMAIN_LABELS[m.offer.domain][lang]}
                    </span>
                    <span className="font-mono-code font-extrabold text-xs px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800">
                      {t.matchScore} {m.score}%
                    </span>
                  </div>

                  {/* Provider -> Seeker flow */}
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
                    {/* Provider */}
                    <div className="rounded-xl bg-emerald-50/55 border border-emerald-200/80 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            {t.produces}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: axP.color }}
                          >
                            {axP.code}
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectResearcher(m.provider.id)}
                          className="font-display font-bold text-sm text-slate-900 hover:text-teal-700 text-left cursor-pointer"
                        >
                          {m.provider.name}
                        </button>
                        <p className="text-[11px] text-slate-500 mb-2">
                          {m.provider.unit}
                        </p>
                        <p className="text-xs text-slate-800 font-medium leading-snug">
                          “{tText(m.offer.label, lang)}”
                        </p>
                      </div>
                      {m.offer.scale && (
                        <div className="mt-2 text-[10px] font-mono-code text-emerald-900/75">
                          {m.offer.scale}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center shadow-xs rotate-90 sm:rotate-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Seeker */}
                    <div className="rounded-xl bg-amber-50/60 border border-amber-200/80 p-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                            {t.needs}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: axS.color }}
                          >
                            {axS.code}
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectResearcher(m.seeker.id)}
                          className="font-display font-bold text-sm text-slate-900 hover:text-teal-700 text-left cursor-pointer"
                        >
                          {m.seeker.name}
                        </button>
                        <p className="text-[11px] text-slate-500 mb-2">
                          {m.seeker.unit}
                        </p>
                        <p className="text-xs text-slate-800 font-medium leading-snug">
                          “{tText(m.need.label, lang)}”
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shared Context + Warm Intro CTA */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {m.sharedRegions.slice(0, 2).map((rid) => (
                        <span
                          key={rid}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                        >
                          📍 {REGION_MAP[rid]?.name[lang] || rid}
                        </span>
                      ))}
                      {m.sharedHazards.slice(0, 2).map((hid) => (
                        <span
                          key={hid}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-orange-50 text-orange-800"
                        >
                          ⚡ {HAZARD_MAP[hid]?.shortName[lang] || hid}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        onOpenWarmIntro(
                          activePersonaId === m.provider.id ? m.seeker : m.provider,
                          findBridge(m.provider.id, m.seeker.id)
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#173f50] transition cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-teal-300" />
                      {t.draftIntro}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* All Offers / Needs Lists */}
      {(subTab === 'offers' || subTab === 'needs') && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {(subTab === 'offers' ? allOffers : allNeeds).map(({ researcher, item }) => {
            const ax = AXIS_MAP[researcher.primaryAxis];
            const isOffer = subTab === 'offers';
            return (
              <div
                key={`${researcher.id}-${item.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold text-white"
                      style={{ backgroundColor: ax.color }}
                    >
                      {ax.code} • {ax.shortName[lang]}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isOffer
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {DOMAIN_LABELS[item.domain][lang]}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 leading-snug">
                    {tText(item.label, lang)}
                  </p>
                  {item.detail && (
                    <p className="text-xs text-slate-600 mt-1">{tText(item.detail, lang)}</p>
                  )}
                  {item.scale && (
                    <p className="text-[11px] font-mono-code text-slate-400 mt-1.5">
                      {item.scale}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectResearcher(researcher.id)}
                    className="text-left group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-700">
                      {researcher.name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {ROLE_LABELS[researcher.role][lang]} • {researcher.unit}
                    </div>
                  </button>
                  <button
                    onClick={() => onOpenWarmIntro(researcher, null)}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 transition cursor-pointer"
                  >
                    {t.draftIntro}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Post New Offer/Need Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-display font-bold text-base text-slate-900">{t.modalTitle}</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handlePublish} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPostKind('offer')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    postKind === 'offer'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.modalKindOffer}
                </button>
                <button
                  type="button"
                  onClick={() => setPostKind('need')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${
                    postKind === 'need'
                      ? 'bg-amber-50 border-amber-500 text-amber-950 ring-1 ring-amber-500'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {t.modalKindNeed}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.modalResearcher}
                  </label>
                  <select
                    value={postResearcherId}
                    onChange={(e) => setPostResearcherId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                  >
                    {researchers.map((r) => (
                      <option key={r.id} value={r.id}>
                        [{AXIS_MAP[r.primaryAxis].code}] {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.modalDomain}
                  </label>
                  <select
                    value={postDomain}
                    onChange={(e) => setPostDomain(e.target.value as CapabilityDomain)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium"
                  >
                    {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {t.modalLabel}
                </label>
                <input
                  type="text"
                  required
                  value={postLabel}
                  onChange={(e) => setPostLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  placeholder={
                    lang === 'pt'
                      ? 'Ex.: Projeções diárias de temperatura de bulbo úmido para municípios de SP'
                      : 'E.g., Daily wet-bulb temperature projections for São Paulo municipalities'
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.modalScale}
                  </label>
                  <input
                    type="text"
                    value={postScale}
                    onChange={(e) => setPostScale(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    placeholder="Ex.: 0.1° diário • 2025–2070"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {t.modalDetail}
                  </label>
                  <input
                    type="text"
                    value={postDetail}
                    onChange={(e) => setPostDetail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {lang === 'pt' ? 'Cancelar' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                >
                  {t.modalSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
