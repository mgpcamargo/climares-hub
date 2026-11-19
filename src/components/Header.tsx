import React, { useState } from 'react';
import {
  Compass,
  Database,
  GitBranch,
  Handshake,
  Map as MapIcon,
  Network,
  Share2,
  Target,
  Users,
  Check,
  UserCircle2,
} from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { UI } from '../i18n';
import { HubView, Lang, Researcher } from '../types';

interface HeaderProps {
  activeView: HubView;
  onChangeView: (v: HubView) => void;
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  researchers: Researcher[];
  activePersonaId: string | null;
  onChangePersona: (id: string | null) => void;
  onOpenSyncModal: () => void;
  onCopyShareLink: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onChangeView,
  lang,
  onChangeLang,
  researchers,
  activePersonaId,
  onChangePersona,
  onOpenSyncModal,
  onCopyShareLink,
}) => {
  const t = UI[lang];
  const [copied, setCopied] = useState(false);

  const navItems: { id: HubView; label: string; icon: React.ReactNode }[] = [
    { id: 'graph', label: t.nav.graph, icon: <Network className="w-4 h-4" /> },
    { id: 'constellation', label: t.nav.constellation, icon: <Compass className="w-4 h-4" /> },
    { id: 'handshakes', label: t.nav.handshakes, icon: <Handshake className="w-4 h-4" /> },
    { id: 'map', label: t.nav.map, icon: <MapIcon className="w-4 h-4" /> },
    { id: 'directory', label: t.nav.directory, icon: <Users className="w-4 h-4" /> },
    { id: 'missions', label: t.nav.missions, icon: <Target className="w-4 h-4" /> },
  ];

  const handleCopy = () => {
    onCopyShareLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_2px_rgba(15,31,36,0.03)]">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
        {/* Top Row: Brand + Persona + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 border-b border-slate-100">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onChangeView('graph')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F2C38] via-[#124E5B] to-[#0D9488] flex items-center justify-center shadow-sm ring-1 ring-teal-900/15 group-hover:scale-[1.03] transition-transform">
                <GitBranch className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-[17px] tracking-tight text-slate-900">
                    CLIMARES <span className="text-teal-700 font-bold">Hub</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono-code font-semibold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200/70">
                    11 Eixos
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-tight">
                  {t.brandSubtitle}
                </p>
              </div>
            </button>
          </div>

          {/* Right controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Perspective / Persona selector */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-lg px-2.5 py-1">
              <UserCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span className="text-[11px] font-medium text-slate-500 hidden md:inline">
                {t.actAs}
              </span>
              <select
                value={activePersonaId || ''}
                onChange={(e) => onChangePersona(e.target.value || null)}
                className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer max-w-[190px] truncate"
                aria-label={t.actAs}
              >
                <option value="">{t.coordinatorMode}</option>
                {researchers.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{AXIS_MAP[r.primaryAxis].code}] {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Share deep link */}
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
              title={t.copyShareLink}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{t.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden xl:inline">{t.copyShareLink}</span>
                </>
              )}
            </button>

            {/* CSV Import / OpenAlex Sync */}
            <button
              onClick={onOpenSyncModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#163d4d] transition shadow-xs cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-teal-300" />
              <span>{t.dataButton}</span>
            </button>

            {/* PT-BR primary / EN accessory switcher */}
            <div
              className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-semibold"
              role="group"
              aria-label="Idioma / Language"
            >
              <button
                onClick={() => onChangeLang('pt')}
                className={`px-2 py-1 rounded-md transition cursor-pointer ${
                  lang === 'pt'
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                PT-BR
              </button>
              <button
                onClick={() => onChangeLang('en')}
                className={`px-2 py-1 rounded-md transition cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200/80'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar">
          {navItems.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-teal-700/10 text-teal-900 ring-1 ring-teal-700/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <span className={active ? 'text-teal-700' : 'text-slate-400'}>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
