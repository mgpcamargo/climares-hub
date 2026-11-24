import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Network,
  UserCheck,
  X,
} from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import {
  getBridgesForResearcher,
  getCoauthorsForResearcher,
} from '../engine/bridgeEngine';
import { buildProfileClaimUrls } from '../engine/liveBackend';
import { ROLE_LABELS, tText, UI } from '../i18n';
import { CollaborationEdge, Lang, LatentBridge, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface ResearcherDrawerProps {
  researcher: Researcher | null;
  allResearchers: Researcher[];
  edges: CollaborationEdge[];
  bridges: LatentBridge[];
  lang: Lang;
  onClose: () => void;
  onSelectResearcher: (id: string) => void;
  onCenterInGraph: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
}

export const ResearcherDrawer: React.FC<ResearcherDrawerProps> = ({
  researcher,
  allResearchers,
  edges,
  bridges,
  lang,
  onClose,
  onSelectResearcher,
  onCenterInGraph,
  onOpenWarmIntro,
}) => {
  const [claimOpen, setClaimOpen] = useState(false);
  const [claimPhoto, setClaimPhoto] = useState('');
  const [claimLattes, setClaimLattes] = useState('');
  const [claimOrcid, setClaimOrcid] = useState('');
  const [claimOffer, setClaimOffer] = useState('');
  const [claimNeed, setClaimNeed] = useState('');

  const t = UI[lang].drawer;

  useEffect(() => {
    setClaimOpen(false);
    setClaimPhoto(researcher?.photoUrl || '');
    setClaimLattes(researcher?.lattesUrl || '');
    setClaimOrcid(researcher?.orcid || '');
    setClaimOffer('');
    setClaimNeed('');
  }, [researcher?.id, researcher?.photoUrl, researcher?.lattesUrl, researcher?.orcid]);

  const byId = useMemo(
    () => new Map(allResearchers.map((r) => [r.id, r])),
    [allResearchers]
  );

  const coauthors = useMemo(() => {
    if (!researcher) return [];
    return getCoauthorsForResearcher(researcher.id, edges);
  }, [researcher, edges]);

  const topBridges = useMemo(() => {
    if (!researcher) return [];
    return getBridgesForResearcher(researcher.id, bridges, 5);
  }, [researcher, bridges]);

  if (!researcher) return null;

  const axis = AXIS_MAP[researcher.primaryAxis];
  const roleLabel = ROLE_LABELS[researcher.role][lang];
  const searchName = encodeURIComponent(researcher.name);
  const topics =
    researcher.empiricalTopics && researcher.empiricalTopics.length > 0
      ? researcher.empiricalTopics
      : researcher.methods;

  const claimUrls = buildProfileClaimUrls({
    researcherId: researcher.id,
    researcherName: researcher.name,
    photoUrl: claimPhoto,
    lattesUrl: claimLattes,
    orcid: claimOrcid,
    offerText: claimOffer,
    needText: claimNeed,
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="flex-1" onClick={onClose} />
      <aside className="relative w-full max-w-xl bg-white dark:bg-[#111A23] text-slate-900 dark:text-slate-100 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Top Profile Header */}
        <div
          className="px-6 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800"
          style={{
            background: `linear-gradient(135deg, ${axis.color}22 0%, transparent 70%)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <ResearcherAvatar researcher={researcher} size="xl" />
              <div>
                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                  <span
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono-code font-bold text-white"
                    style={{ backgroundColor: axis.color }}
                  >
                    {axis.code} • {axis.shortName[lang]}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {roleLabel}
                  </span>
                  {researcher.openalexId && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                      <CheckCircle2 className="w-3 h-3" /> OpenAlex
                    </span>
                  )}
                </div>
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white leading-tight">
                  {researcher.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {researcher.unit} ({researcher.institution})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {researcher.city}
                  </span>
                </div>
                {researcher.worksCount ? (
                  <div className="text-[11px] font-mono-code text-teal-600 dark:text-teal-400 mt-1">
                    {researcher.worksCount} {UI[lang].people.worksLabel} •{' '}
                    {researcher.citedByCount || 0} {UI[lang].people.citationsLabel}
                  </div>
                ) : null}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <button
              onClick={() => onCenterInGraph(researcher.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition cursor-pointer"
            >
              <Network className="w-3.5 h-3.5 text-teal-400" />
              {t.focusGraph}
            </button>
            <button
              onClick={() => onOpenWarmIntro(researcher, null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              {t.warmIntro}
            </button>
            <button
              onClick={() => setClaimOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-500 transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-500" />
              {t.claimBtn}
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Verified Profile Claim Form (Submits to Shared Repo / Secretariat — NOT fake localStorage!) */}
          {claimOpen && (
            <div className="rounded-2xl border border-teal-500/40 bg-teal-500/5 p-4 space-y-3 text-xs">
              <div>
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  {t.claimModalTitle}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.claimModalSub}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="url"
                  value={claimPhoto}
                  onChange={(e) => setClaimPhoto(e.target.value)}
                  placeholder="URL da sua foto (opcional)"
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
                <input
                  type="url"
                  value={claimLattes}
                  onChange={(e) => setClaimLattes(e.target.value)}
                  placeholder="Link direto do Lattes (http://lattes.cnpq.br/...)"
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>
              <input
                type="text"
                value={claimOffer}
                onChange={(e) => setClaimOffer(e.target.value)}
                placeholder="📤 O que seu grupo pode compartilhar com outros eixos? (opcional)"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
              <input
                type="text"
                value={claimNeed}
                onChange={(e) => setClaimNeed(e.target.value)}
                placeholder="📥 Que dados ou parcerias você busca em outros eixos? (opcional)"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
              <div className="flex flex-wrap items-center justify-end gap-2">
                <a
                  href={claimUrls.mailtoUrl}
                  className="px-3 py-1.5 rounded-xl font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Enviar por E-mail
                </a>
                <a
                  href={claimUrls.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-500"
                >
                  Enviar Atualização Online ↗
                </a>
              </div>
            </div>
          )}

          {/* Verified Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.linksTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
              {researcher.openalexId && (
                <a
                  href={`https://openalex.org/${researcher.openalexId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/25 hover:bg-teal-600 hover:text-white transition"
                >
                  OpenAlex ({researcher.worksCount || 0}) <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {researcher.orcid && (
                <a
                  href={`https://orcid.org/${researcher.orcid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-code font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25 hover:bg-emerald-600 hover:text-white transition"
                >
                  ORCID {researcher.orcid} <ExternalLink className="w-3 h-3" />
                </a>
              )}
              <a
                href={`https://bv.fapesp.br/pt/pesquisa/buscador/?q=${searchName}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition"
              >
                BV FAPESP <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={`https://scholar.google.com.br/scholar?q=${searchName}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition"
              >
                Google Scholar <ExternalLink className="w-3 h-3" />
              </a>
              {researcher.githubUrl && (
                <a
                  href={researcher.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Empirical Topics & Territories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 p-3">
              <div className="text-[11px] font-bold text-slate-400 mb-2">{t.topicsTitle}</div>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((tp) => (
                  <span
                    key={tp}
                    className="text-xs font-medium px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700"
                  >
                    {tp}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 p-3">
              <div className="text-[11px] font-bold text-slate-400 mb-2">{t.regionsTitle}</div>
              <div className="flex flex-wrap gap-1.5">
                {researcher.regions.map((rid) => {
                  const reg = REGION_MAP[rid];
                  return (
                    <span
                      key={rid}
                      className="text-xs font-semibold px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/70 dark:border-slate-700"
                    >
                      {reg ? `${reg.emoji} ${reg.shortName[lang]}` : rid}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ONLY display Self-Declared Offers/Needs if profileClaimed === true */}
          {researcher.profileClaimed && (researcher.offers.length > 0 || researcher.needs.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {researcher.offers.length > 0 && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
                  <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                    {t.claimedOffersTitle}
                  </div>
                  {researcher.offers.map((o) => (
                    <p key={o.id} className="text-xs text-slate-800 dark:text-slate-100">
                      {tText(o.label, lang)}
                    </p>
                  ))}
                </div>
              )}
              {researcher.needs.length > 0 && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
                  <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 mb-1">
                    {t.claimedNeedsTitle}
                  </div>
                  {researcher.needs.map((n) => (
                    <p key={n.id} className="text-xs text-slate-800 dark:text-slate-100">
                      {tText(n.label, lang)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Real Co-Authors inside CLIMARES */}
          {coauthors.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2.5">
                {t.coauthorsTitle} ({coauthors.length})
              </h3>
              <div className="space-y-2">
                {coauthors.slice(0, 6).map(({ edge, partnerId }) => {
                  const partner = byId.get(partnerId);
                  if (!partner) return null;
                  const pAx = AXIS_MAP[partner.primaryAxis];
                  const isCross = partner.primaryAxis !== researcher.primaryAxis;
                  return (
                    <button
                      key={edge.id}
                      onClick={() => onSelectResearcher(partner.id)}
                      className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0B1219] p-3 flex items-center justify-between gap-3 hover:border-teal-500 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ResearcherAvatar researcher={partner} size="sm" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                              style={{ backgroundColor: pAx.color }}
                            >
                              {pAx.code}
                            </span>
                            <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                              {partner.name}
                            </span>
                            {isCross && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-600 dark:text-teal-300">
                                Inter-Eixos
                              </span>
                            )}
                          </div>
                          {edge.samplePaperTitle && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              “{edge.samplePaperTitle}”
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs font-mono-code font-bold text-teal-600 dark:text-teal-400 shrink-0">
                        {edge.paperCount || 1} art.
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real Recent Publications (OpenAlex) */}
          {researcher.publications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                {t.pubsTitle} ({researcher.publications.length})
              </h3>
              <div className="space-y-2">
                {researcher.publications.map((pub, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0B1219] p-3"
                  >
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono-code text-slate-400 mb-1">
                      <span>
                        {pub.year} • {pub.journal}
                      </span>
                      {pub.crossAxis && (
                        <span className="px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-600 dark:text-teal-300 font-sans font-bold">
                          ✦ Coautoria Inter-Eixos
                        </span>
                      )}
                    </div>
                    {pub.doi ? (
                      <a
                        href={pub.doi}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-slate-900 dark:text-white hover:text-teal-500 leading-snug inline-flex items-start gap-1"
                      >
                        <span>{pub.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5 text-slate-400" />
                      </a>
                    ) : (
                      <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        {pub.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Potential Cross-Axis Bridges (Empirical Topic Overlap, 0 Joint Papers Yet) */}
          {topBridges.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2.5">
                {t.bridgesTitle}
              </h3>
              <div className="space-y-2">
                {topBridges.map(({ bridge, partnerId }) => {
                  const partner = byId.get(partnerId);
                  if (!partner) return null;
                  const pAx = AXIS_MAP[partner.primaryAxis];
                  return (
                    <div
                      key={bridge.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1219] p-3 flex items-center justify-between gap-3"
                    >
                      <button
                        onClick={() => onSelectResearcher(partner.id)}
                        className="flex items-center gap-3 text-left min-w-0 flex-1 cursor-pointer group"
                      >
                        <ResearcherAvatar researcher={partner} size="sm" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                              style={{ backgroundColor: pAx.color }}
                            >
                              {pAx.code}
                            </span>
                            <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-teal-400 truncate">
                              {partner.name}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {bridge.reasons.slice(0, 2).map((r, i) => (
                              <span
                                key={i}
                                className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 truncate max-w-[210px]"
                              >
                                {r.shortTag[lang]}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => onOpenWarmIntro(partner, bridge)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 shrink-0 cursor-pointer"
                      >
                        {t.warmIntro}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
