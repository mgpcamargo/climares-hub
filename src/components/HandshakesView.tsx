import React, { useMemo, useState } from 'react';
import { ArrowRight, Plus, X } from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import { DOMAIN_LABELS, tText, UI } from '../i18n';
import {
  AxisId,
  CapabilityDomain,
  CapabilityItem,
  HandshakeMatch,
  Lang,
  LatentBridge,
  Researcher,
} from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface HandshakesViewProps {
  researchers: Researcher[];
  handshakes: HandshakeMatch[];
  bridges: LatentBridge[];
  lang: Lang;
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
  onSelectResearcher,
  onOpenWarmIntro,
  onAddCapability,
}) => {
  const t = UI[lang].handshakes;
  const [subTab, setSubTab] = useState<'matches' | 'offers' | 'needs'>('matches');
  const [domainFilter, setDomainFilter] = useState<CapabilityDomain | 'all'>('all');
  const [axisFilter, setAxisFilter] = useState<AxisId | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const [postKind, setPostKind] = useState<'offer' | 'need'>('offer');
  const [postResearcherId, setPostResearcherId] = useState(researchers[0]?.id || '');
  const [postDomain, setPostDomain] = useState<CapabilityDomain>('climate_projections');
  const [postLabel, setPostLabel] = useState('');

  const filteredMatches = useMemo(() => {
    return handshakes
      .filter((h) => h.crossAxis)
      .filter((h) => {
        if (domainFilter !== 'all' && h.offer.domain !== domainFilter) return false;
        if (
          axisFilter !== 'all' &&
          h.provider.primaryAxis !== axisFilter &&
          h.seeker.primaryAxis !== axisFilter
        ) {
          return false;
        }
        return true;
      });
  }, [handshakes, domainFilter, axisFilter]);

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

  const findBridge = (idA: string, idB: string): LatentBridge | null =>
    bridges.find(
      (b) =>
        (b.sourceId === idA && b.targetId === idB) ||
        (b.sourceId === idB && b.targetId === idA)
    ) || null;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postLabel.trim() || !postResearcherId) return;
    onAddCapability(postResearcherId, postKind, {
      id: `user-${postKind}-${Date.now()}`,
      domain: postDomain,
      label: postLabel.trim(),
    });
    setPostLabel('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Compact Bar: Tabs + Filters + Post Button */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-[#0B1219] p-1 text-xs font-bold">
          <button
            onClick={() => setSubTab('matches')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'matches'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {t.tabMatches} ({filteredMatches.length})
          </button>
          <button
            onClick={() => setSubTab('offers')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'offers'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {t.tabOffers} ({allOffers.length})
          </button>
          <button
            onClick={() => setSubTab('needs')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              subTab === 'needs'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {t.tabNeeds} ({allNeeds.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as CapabilityDomain | 'all')}
            className="text-xs font-semibold bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <option value="all">{t.filterDomain}</option>
            {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.emoji} {v[lang]}
              </option>
            ))}
          </select>

          <select
            value={axisFilter}
            onChange={(e) =>
              setAxisFilter(e.target.value === 'all' ? 'all' : (Number(e.target.value) as AxisId))
            }
            className="text-xs font-semibold bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            <option value="all">{t.filterAxis}</option>
            {AXES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.code} — {a.shortName[lang]}
              </option>
            ))}
          </select>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {t.postButton.replace('+ ', '')}
          </button>
        </div>
      </div>

      {/* Matches Grid with Photos on Both Sides */}
      {subTab === 'matches' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMatches.slice(0, 30).map((m) => {
            const axP = AXIS_MAP[m.provider.primaryAxis];
            const axS = AXIS_MAP[m.seeker.primaryAxis];
            const dom = DOMAIN_LABELS[m.offer.domain];

            return (
              <div
                key={m.id}
                className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    {dom.emoji} {dom[lang]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {m.sharedRegions.slice(0, 2).map((rid) => (
                      <span
                        key={rid}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300"
                      >
                        {REGION_MAP[rid]?.emoji} {REGION_MAP[rid]?.shortName[lang]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Photo Provider -> Photo Seeker */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2.5 items-center">
                  <button
                    onClick={() => onSelectResearcher(m.provider.id)}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-left hover:border-emerald-400 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <ResearcherAvatar researcher={m.provider} size="md" />
                      <div className="min-w-0">
                        <span
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold text-white"
                          style={{ backgroundColor: axP.color }}
                        >
                          {axP.code} • {t.produces}
                        </span>
                        <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mt-0.5">
                          {m.provider.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {m.provider.unit}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2">
                      {tText(m.offer.label, lang)}
                    </p>
                  </button>

                  <div className="flex justify-center">
                    <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-slate-800 text-teal-400 flex items-center justify-center rotate-90 sm:rotate-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectResearcher(m.seeker.id)}
                    className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-left hover:border-amber-400 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <ResearcherAvatar researcher={m.seeker} size="md" />
                      <div className="min-w-0">
                        <span
                          className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold text-white"
                          style={{ backgroundColor: axS.color }}
                        >
                          {axS.code} • {t.needs}
                        </span>
                        <div className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mt-0.5">
                          {m.seeker.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {m.seeker.unit}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-2">
                      {tText(m.need.label, lang)}
                    </p>
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      onOpenWarmIntro(m.provider, findBridge(m.provider.id, m.seeker.id))
                    }
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
                  >
                    {t.connectBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Offers / Needs Lists with Photos */}
      {(subTab === 'offers' || subTab === 'needs') && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {(subTab === 'offers' ? allOffers : allNeeds).map(({ researcher, item }) => {
            const ax = AXIS_MAP[researcher.primaryAxis];
            const dom = DOMAIN_LABELS[item.domain];
            return (
              <div
                key={`${researcher.id}-${item.id}`}
                className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onSelectResearcher(researcher.id)}
                    className="cursor-pointer shrink-0"
                  >
                    <ResearcherAvatar researcher={researcher} size="md" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                        style={{ backgroundColor: ax.color }}
                      >
                        {ax.code}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 truncate">
                        {dom.emoji} {dom[lang]}
                      </span>
                    </div>
                    <button
                      onClick={() => onSelectResearcher(researcher.id)}
                      className="font-display font-bold text-sm text-slate-900 dark:text-white hover:text-teal-400 truncate block cursor-pointer"
                    >
                      {researcher.name}
                    </button>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {researcher.unit}
                    </div>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  {tText(item.label, lang)}
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => onOpenWarmIntro(researcher, null)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 transition cursor-pointer"
                  >
                    {t.connectBtn}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                {t.postButton}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handlePublish} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPostKind('offer')}
                  className={`py-2 rounded-xl font-bold border cursor-pointer ${
                    postKind === 'offer'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  📤 {t.produces}
                </button>
                <button
                  type="button"
                  onClick={() => setPostKind('need')}
                  className={`py-2 rounded-xl font-bold border cursor-pointer ${
                    postKind === 'need'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-slate-300 dark:border-slate-700 text-slate-500'
                  }`}
                >
                  📥 {t.needs}
                </button>
              </div>

              <select
                value={postResearcherId}
                onChange={(e) => setPostResearcherId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                {researchers.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{AXIS_MAP[r.primaryAxis].code}] {r.name}
                  </option>
                ))}
              </select>

              <select
                value={postDomain}
                onChange={(e) => setPostDomain(e.target.value as CapabilityDomain)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.emoji} {v[lang]}
                  </option>
                ))}
              </select>

              <input
                type="text"
                required
                value={postLabel}
                onChange={(e) => setPostLabel(e.target.value)}
                placeholder={
                  lang === 'pt'
                    ? 'Descreva em 1 linha o dado, modelo ou parceria...'
                    : 'Describe in 1 line the dataset, model, or need...'
                }
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
