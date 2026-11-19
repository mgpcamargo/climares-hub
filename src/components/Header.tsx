import React from 'react';
import {
  Handshake,
  Map as MapIcon,
  MessageSquare,
  Moon,
  Network,
  Sun,
  Users,
} from 'lucide-react';
import { UI } from '../i18n';
import { HubView, Lang } from '../types';

interface HeaderProps {
  activeView: HubView;
  onChangeView: (v: HubView) => void;
  lang: Lang;
  onChangeLang: (l: Lang) => void;
  darkMode: boolean;
  onToggleDark: () => void;
  memberCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onChangeView,
  lang,
  onChangeLang,
  darkMode,
  onToggleDark,
  memberCount,
}) => {
  const t = UI[lang];

  const navItems: { id: HubView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'people', label: t.nav.people, icon: <Users className="w-4 h-4" />, badge: memberCount },
    { id: 'graph', label: t.nav.graph, icon: <Network className="w-4 h-4" /> },
    { id: 'map', label: t.nav.map, icon: <MapIcon className="w-4 h-4" /> },
    { id: 'handshakes', label: t.nav.handshakes, icon: <Handshake className="w-4 h-4" /> },
    { id: 'forum', label: t.nav.forum, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0D151D]/92 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/90 transition-colors">
      <div className="max-w-[1560px] mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-3">
        {/* Official CLIMARES Logo + Brand */}
        <button
          onClick={() => onChangeView('people')}
          className="flex items-center gap-3 group text-left cursor-pointer shrink-0"
        >
          <img
            src="./climares-logo.png"
            alt="CLIMARES Logo"
            className="w-10 h-10 rounded-full object-contain bg-white p-0.5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                CLIMARES <span className="text-teal-600 dark:text-teal-400">Hub</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/25">
                v1.1
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </button>

        {/* Center Navigation Tabs (5 clean tabs) */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const active = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  active
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono-code px-1.5 py-0.2 rounded-full ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Dark Mode Toggle + PT/EN Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleDark}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
            title={darkMode ? 'Modo Claro / Light Mode' : 'Modo Escuro / Dark Mode'}
            aria-label="Alternar tema"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <div
            className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 p-0.5 text-[11px] font-bold"
            role="group"
          >
            <button
              onClick={() => onChangeLang('pt')}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                lang === 'pt'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => onChangeLang('en')}
              className={`px-2 py-1 rounded-lg transition cursor-pointer ${
                lang === 'en'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
