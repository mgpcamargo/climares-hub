import React, { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Camera,
  ExternalLink,
  Mail,
  MapPin,
  Network,
  X,
} from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import { getBridgesForResearcher } from '../engine/bridgeEngine';
import { ROLE_LABELS, tText, UI } from '../i18n';
import { Lang, LatentBridge, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface ResearcherDrawerProps {
  researcher: Researcher | null;
  allResearchers: Researcher[];
  bridges: LatentBridge[];
  lang: Lang;
  onClose: () => void;
  onSelectResearcher: (id: string) => void;
  onCenterInGraph: (id: string) => void;
  onOpenWarmIntro: (target: Researcher, bridge: LatentBridge | null) => void;
  onUpdatePhoto: (researcherId: string, photoUrl: string) => void;
}

export const ResearcherDrawer: React.FC<ResearcherDrawerProps> = ({
  researcher,
  allResearchers,
  bridges,
  lang,
  onClose,
  onSelectResearcher,
  onCenterInGraph,
  onOpenWarmIntro,
  onUpdatePhoto,
}) => {
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [photoInput, setPhotoInput] = useState('');
  const t = UI[lang].drawer;

  useEffect(() => {
    setEditingPhoto(false);
    setPhotoInput(researcher?.photoUrl || '');
  }, [researcher?.id, researcher?.photoUrl]);

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
  const searchName = encodeURIComponent(researcher.name);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs">
      <div className="flex-1" onClick={onClose} />
      <aside className="relative w-full max-w-lg bg-white dark:bg-[#111A23] text-slate-900 dark:text-slate-100 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* Header with Big Photo */}
        <div
          className="px-6 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800"
          style={{
            background: `linear-gradient(135deg, ${axis.color}22 0%, transparent 70%)`,
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <ResearcherAvatar researcher={researcher} size="xl" />
                <button
                  onClick={() => setEditingPhoto((v) => !v)}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 text-white border border-slate-700 hover:bg-teal-600 transition cursor-pointer shadow"
                  title={t.changePhoto}
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
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
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {editingPhoto && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdatePhoto(researcher.id, photoInput.trim());
                setEditingPhoto(false);
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="url"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                placeholder="https://.../foto.jpg"
                className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 text-white cursor-pointer"
              >
                OK
              </button>
            </form>
          )}

          {/* Action Buttons */}
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
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Short Bio */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tText(researcher.bio, lang)}
          </p>

          {/* Direct Resume & Academic Links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.linksTitle}
            </h3>
            <div className="flex flex-wrap gap-2">
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
              <a
                href={`https://openalex.org/authors?search=${searchName}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-teal-600 hover:text-white transition"
              >
                OpenAlex / ORCID <ExternalLink className="w-3 h-3" />
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

          {/* Regions & Specialties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div className="rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800 p-3">
              <div className="text-[11px] font-bold text-slate-400 mb-2">{t.methodsTitle}</div>
              <div className="flex flex-wrap gap-1.5">
                {researcher.methods.map((m) => (
                  <span
                    key={m}
                    className="text-xs font-mono-code px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Offers & Needs (Compact Visual Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3">
              <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 mb-1.5">
                {t.offersTitle}
              </div>
              {researcher.offers.map((o) => (
                <p key={o.id} className="text-xs font-medium text-slate-800 dark:text-slate-100">
                  {tText(o.label, lang)}
                </p>
              ))}
            </div>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3">
              <div className="text-[11px] font-bold text-amber-700 dark:text-amber-300 mb-1.5">
                {t.needsTitle}
              </div>
              {researcher.needs.map((n) => (
                <p key={n.id} className="text-xs font-medium text-slate-800 dark:text-slate-100">
                  {tText(n.label, lang)}
                </p>
              ))}
            </div>
          </div>

          {/* Visual Cross-Axis Connections with Photos */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              {t.bridges} ({topBridges.length})
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
                      <ResearcherAvatar researcher={partner} size="md" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: pAx.color }}
                          >
                            {pAx.code}
                          </span>
                          <span className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-teal-500 truncate">
                            {partner.name}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bridge.reasons.slice(0, 2).map((r, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
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
        </div>
      </aside>
    </div>
  );
};
