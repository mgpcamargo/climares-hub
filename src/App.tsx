import { useEffect, useMemo, useState } from 'react';
import { DirectoryView } from './components/DirectoryView';
import { Header } from './components/Header';
import { MuralView } from './components/MuralView';
import { NetworkGraphView } from './components/NetworkGraphView';
import { ResearcherDrawer } from './components/ResearcherDrawer';
import { TerrainMapView } from './components/TerrainMapView';
import { WarmIntroModal } from './components/WarmIntroModal';
import { REGION_MAP } from './data/regionsAndHazards';
import { SEED_EDGES, SEED_RESEARCHERS } from './data/seedData';
import { computeLatentBridges } from './engine/bridgeEngine';
import { fetchLiveMuralPosts } from './engine/liveBackend';
import {
  CollaborationEdge,
  HubView,
  Lang,
  LatentBridge,
  Researcher,
} from './types';

const THEME_KEY = 'climares_hub_v2_dark';
const VALID_VIEWS: HubView[] = ['people', 'graph', 'map', 'mural'];

function loadInitialUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const rawView = params.get('view');
  // Map legacy 'forum' or 'handshakes' URLs smoothly to unified 'mural'
  const mappedView =
    rawView === 'forum' || rawView === 'handshakes' ? 'mural' : (rawView as HubView | null);
  const view: HubView = mappedView && VALID_VIEWS.includes(mappedView) ? mappedView : 'people';
  const lang: Lang = params.get('lang') === 'en' ? 'en' : 'pt';
  const member = params.get('member') || null;
  const rawRegion = params.get('region');
  const region = rawRegion && REGION_MAP[rawRegion] ? rawRegion : 'rmsp';
  return { view, lang, member, region };
}

export default function App() {
  const initialUrl = useMemo(() => loadInitialUrlParams(), []);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) return saved === 'true';
    } catch {}
    return true;
  });

  const [lang, setLang] = useState<Lang>(initialUrl.lang);
  const [activeView, setActiveView] = useState<HubView>(initialUrl.view);

  const [researchers] = useState<Researcher[]>(SEED_RESEARCHERS);
  const [edges] = useState<CollaborationEdge[]>(SEED_EDGES);
  const [muralCount, setMuralCount] = useState<number>(2);

  const [selectedResearcherId, setSelectedResearcherId] = useState<string | null>(
    initialUrl.member
  );
  const [focusedResearcherId, setFocusedResearcherId] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialUrl.region);

  const [introModal, setIntroModal] = useState<{
    open: boolean;
    target: Researcher | null;
    bridge: LatentBridge | null;
  }>({ open: false, target: null, bridge: null });

  // Fetch live Mural count on startup
  useEffect(() => {
    fetchLiveMuralPosts()
      .then((posts) => {
        if (posts.length > 0) setMuralCount(posts.length);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, String(darkMode));
    } catch {}
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeView !== 'people') params.set('view', activeView);
    if (lang === 'en') params.set('lang', 'en');
    if (selectedResearcherId) params.set('member', selectedResearcherId);
    if (activeView === 'map' && selectedRegionId) params.set('region', selectedRegionId);
    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeView, lang, selectedResearcherId, selectedRegionId]);

  const bridges = useMemo(
    () => computeLatentBridges(researchers, edges),
    [researchers, edges]
  );

  const selectedResearcher = useMemo(
    () => researchers.find((r) => r.id === selectedResearcherId) || null,
    [researchers, selectedResearcherId]
  );

  const handleCenterInGraph = (id: string) => {
    setSelectedResearcherId(null);
    setFocusedResearcherId(id);
    setActiveView('graph');
  };

  const handleOpenWarmIntro = (target: Researcher, bridge: LatentBridge | null) => {
    setIntroModal({ open: true, target, bridge });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] dark:bg-[#0B1117] text-slate-900 dark:text-slate-100 transition-colors">
      <Header
        activeView={activeView}
        onChangeView={setActiveView}
        lang={lang}
        onChangeLang={setLang}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode((d) => !d)}
        memberCount={researchers.length}
        muralCount={muralCount}
      />

      <main className="flex-1 max-w-[1560px] w-full mx-auto px-4 lg:px-6 py-5">
        {activeView === 'people' && (
          <DirectoryView
            researchers={researchers}
            lang={lang}
            onSelectResearcher={setSelectedResearcherId}
          />
        )}

        {activeView === 'graph' && (
          <NetworkGraphView
            researchers={researchers}
            edges={edges}
            bridges={bridges}
            lang={lang}
            focusedResearcherId={focusedResearcherId}
            onClearFocusedResearcher={() => setFocusedResearcherId(null)}
            onSelectResearcher={setSelectedResearcherId}
          />
        )}

        {activeView === 'map' && (
          <TerrainMapView
            researchers={researchers}
            bridges={bridges}
            lang={lang}
            selectedRegionId={selectedRegionId}
            onChangeRegion={setSelectedRegionId}
            onSelectResearcher={setSelectedResearcherId}
            onOpenWarmIntro={handleOpenWarmIntro}
          />
        )}

        {activeView === 'mural' && (
          <MuralView
            researchers={researchers}
            lang={lang}
            onSelectResearcher={setSelectedResearcherId}
            onPostsLoaded={setMuralCount}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0D151D] mt-8">
        <div className="max-w-[1560px] mx-auto px-4 lg:px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src="./climares-logo-footer.png"
              alt="CLIMARES"
              className="h-7 w-auto object-contain hidden dark:block"
            />
            <img
              src="./climares-logo.png"
              alt="CLIMARES"
              className="h-7 w-7 object-contain dark:hidden"
            />
            <span>
              CEPID FAPESP (2024/00949-5) • Instituto de Energia e Ambiente da USP (IEE-USP)
            </span>
          </div>
          <a
            href="https://sites.google.com/usp.br/climares/"
            target="_blank"
            rel="noreferrer"
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            sites.google.com/usp.br/climares ↗
          </a>
        </div>
      </footer>

      <ResearcherDrawer
        researcher={selectedResearcher}
        allResearchers={researchers}
        edges={edges}
        bridges={bridges}
        lang={lang}
        onClose={() => setSelectedResearcherId(null)}
        onSelectResearcher={setSelectedResearcherId}
        onCenterInGraph={handleCenterInGraph}
        onOpenWarmIntro={handleOpenWarmIntro}
      />

      <WarmIntroModal
        isOpen={introModal.open}
        from={null}
        to={introModal.target}
        bridge={introModal.bridge}
        defaultLang={lang}
        onClose={() => setIntroModal({ open: false, target: null, bridge: null })}
      />
    </div>
  );
}
