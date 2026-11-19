import { useEffect, useMemo, useState } from 'react';
import { Info, X } from 'lucide-react';
import { ConstellationView } from './components/ConstellationView';
import { DataSyncModal } from './components/DataSyncModal';
import { DirectoryView } from './components/DirectoryView';
import { HandshakesView } from './components/HandshakesView';
import { Header } from './components/Header';
import { MissionsView } from './components/MissionsView';
import { NetworkGraphView, SiloLens } from './components/NetworkGraphView';
import { ResearcherDrawer } from './components/ResearcherDrawer';
import { TerrainMapView } from './components/TerrainMapView';
import { WarmIntroModal } from './components/WarmIntroModal';
import { REGION_MAP } from './data/regionsAndHazards';
import {
  SEED_ASSETS,
  SEED_EDGES,
  SEED_MISSIONS,
  SEED_RESEARCHERS,
} from './data/seedData';
import {
  computeHandshakes,
  computeLatentBridges,
  computeSiloMetrics,
} from './engine/bridgeEngine';
import { UI } from './i18n';
import {
  AxisId,
  CapabilityItem,
  CollaborationEdge,
  CommonsAsset,
  CrossAxisMission,
  HubView,
  Lang,
  LatentBridge,
  Researcher,
} from './types';

const STORAGE_KEY = 'climares_hub_v1_state';
const VALID_VIEWS: HubView[] = [
  'graph',
  'constellation',
  'handshakes',
  'map',
  'directory',
  'missions',
];

const VALID_LENSES: SiloLens[] = ['hybrid', 'bridges', 'latent', 'all'];

function loadInitialUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const rawView = params.get('view') as HubView | null;
  const view: HubView = rawView && VALID_VIEWS.includes(rawView) ? rawView : 'graph';
  const lang: Lang = params.get('lang') === 'en' ? 'en' : 'pt';
  const member = params.get('member') || null;
  const rawLens = params.get('lens') as SiloLens | null;
  const lens: SiloLens = rawLens && VALID_LENSES.includes(rawLens) ? rawLens : 'hybrid';
  const rawRegion = params.get('region');
  const region = rawRegion && REGION_MAP[rawRegion] ? rawRegion : 'rmsp';
  const rawPair = params.get('axes');
  let axisPair: [AxisId, AxisId] | null = null;
  if (rawPair) {
    const parts = rawPair.split('-').map((n) => parseInt(n, 10));
    if (
      parts.length === 2 &&
      parts[0] >= 1 &&
      parts[0] <= 11 &&
      parts[1] >= 1 &&
      parts[1] <= 11 &&
      parts[0] !== parts[1]
    ) {
      axisPair = [parts[0] as AxisId, parts[1] as AxisId];
    }
  }
  return { view, lang, member, axisPair, lens, region };
}

export default function App() {
  const initialUrl = useMemo(() => loadInitialUrlParams(), []);

  // Main language is PT-BR; EN is accessory
  const [lang, setLang] = useState<Lang>(initialUrl.lang);
  const [activeView, setActiveView] = useState<HubView>(initialUrl.view);

  // Core state with optional localStorage persistence for live edits
  const [researchers, setResearchers] = useState<Researcher[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.researchers) && parsed.researchers.length > 0) {
          return parsed.researchers;
        }
      }
    } catch {}
    return SEED_RESEARCHERS;
  });

  const [edges, setEdges] = useState<CollaborationEdge[]>(SEED_EDGES);
  const [assets] = useState<CommonsAsset[]>(SEED_ASSETS);

  const [missions, setMissions] = useState<CrossAxisMission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.missions) && parsed.missions.length > 0) {
          return parsed.missions;
        }
      }
    } catch {}
    return SEED_MISSIONS;
  });

  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [selectedResearcherId, setSelectedResearcherId] = useState<string | null>(
    initialUrl.member
  );
  const [focusedResearcherId, setFocusedResearcherId] = useState<string | null>(null);
  const [focusedAxisPair, setFocusedAxisPair] = useState<[AxisId, AxisId] | null>(
    initialUrl.axisPair
  );
  const [graphLens, setGraphLens] = useState<SiloLens>(initialUrl.lens);
  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialUrl.region);
  const [focusedRegionId, setFocusedRegionId] = useState<string | null>(null);
  const [syncModalOpen, setSyncModalOpen] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);
  const [introModal, setIntroModal] = useState<{
    open: boolean;
    target: Researcher | null;
    bridge: LatentBridge | null;
  }>({ open: false, target: null, bridge: null });

  // Auto-hydrate from OpenAlex weekly sync artifact if present (and no custom local override saved)
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    let cancelled = false;
    fetch('./climares-synced.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        if (Array.isArray(data.researchers) && data.researchers.length > 0) {
          setResearchers(data.researchers);
        }
        if (Array.isArray(data.edges) && data.edges.length > 0) {
          setEdges(data.edges);
        }
      })
      .catch(() => {
        // Optional static artifact not generated yet — keep seeded data cleanly
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist user edits locally
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ researchers, missions }));
    } catch {}
  }, [researchers, missions]);

  // Keep <html lang> updated
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  // Keep URL query params in sync for deep-link sharing (WhatsApp / E-mail)
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeView !== 'graph') params.set('view', activeView);
    if (lang === 'en') params.set('lang', 'en');
    if (selectedResearcherId) params.set('member', selectedResearcherId);
    if (focusedAxisPair) params.set('axes', `${focusedAxisPair[0]}-${focusedAxisPair[1]}`);
    if (graphLens !== 'hybrid') params.set('lens', graphLens);
    if (activeView === 'map' && selectedRegionId) params.set('region', selectedRegionId);
    const qs = params.toString();
    const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeView, lang, selectedResearcherId, focusedAxisPair, graphLens, selectedRegionId]);

  // Derived network analytics
  const handshakes = useMemo(() => computeHandshakes(researchers), [researchers]);
  const bridges = useMemo(
    () => computeLatentBridges(researchers, edges),
    [researchers, edges]
  );
  const siloMetrics = useMemo(
    () => computeSiloMetrics(researchers, edges, bridges, missions),
    [researchers, edges, bridges, missions]
  );

  const selectedResearcher = useMemo(
    () => researchers.find((r) => r.id === selectedResearcherId) || null,
    [researchers, selectedResearcherId]
  );

  const activePersona = useMemo(
    () => researchers.find((r) => r.id === activePersonaId) || null,
    [researchers, activePersonaId]
  );

  const hasDemoProfiles = useMemo(
    () => researchers.some((r) => r.isDemoProfile),
    [researchers]
  );

  // Handlers
  const handleInspectAxisPair = (a: AxisId, b: AxisId) => {
    setFocusedAxisPair([a, b]);
    setActiveView('graph');
  };

  const handleCenterInGraph = (id: string) => {
    setSelectedResearcherId(null);
    setFocusedAxisPair(null);
    setFocusedResearcherId(id);
    setActiveView('graph');
  };

  const handleOpenWarmIntro = (target: Researcher, bridge: LatentBridge | null) => {
    // Try to locate matching bridge if caller didn't supply one and persona is active
    let resolvedBridge = bridge;
    if (!resolvedBridge && activePersonaId && activePersonaId !== target.id) {
      resolvedBridge =
        bridges.find(
          (b) =>
            (b.sourceId === activePersonaId && b.targetId === target.id) ||
            (b.sourceId === target.id && b.targetId === activePersonaId)
        ) || null;
    }
    setIntroModal({ open: true, target, bridge: resolvedBridge });
  };

  const handleAddCapability = (
    researcherId: string,
    kind: 'offer' | 'need',
    item: CapabilityItem
  ) => {
    setResearchers((prev) =>
      prev.map((r) => {
        if (r.id !== researcherId) return r;
        return kind === 'offer'
          ? { ...r, offers: [item, ...r.offers] }
          : { ...r, needs: [item, ...r.needs] };
      })
    );
  };

  const handleJoinMissionAxis = (
    missionId: string,
    axisId: AxisId,
    researcherId: string
  ) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id !== missionId) return m;
        return {
          ...m,
          activeAxes: Array.from(new Set([...m.activeAxes, axisId])).sort(
            (a, b) => a - b
          ) as AxisId[],
          openAxes: m.openAxes.filter((id) => id !== axisId),
          memberIds: Array.from(new Set([...m.memberIds, researcherId])),
        };
      })
    );
  };

  const handleCreateMission = (mission: CrossAxisMission) => {
    setMissions((prev) => [mission, ...prev]);
  };

  const handleImportResearchers = (
    imported: Researcher[],
    mode: 'replace' | 'merge'
  ) => {
    if (mode === 'replace') {
      setResearchers(imported);
      setEdges([]);
    } else {
      const publicPIs = SEED_RESEARCHERS.filter((r) => !r.isDemoProfile);
      const map = new Map<string, Researcher>();
      for (const r of publicPIs) map.set(r.id, r);
      for (const r of imported) map.set(r.id, r);
      setResearchers(Array.from(map.values()));
    }
    setSelectedResearcherId(null);
    setFocusedResearcherId(null);
  };

  const handleResetDemo = () => {
    localStorage.removeItem(STORAGE_KEY);
    setResearchers(SEED_RESEARCHERS);
    setEdges(SEED_EDGES);
    setMissions(SEED_MISSIONS);
    setActivePersonaId(null);
    setFocusedResearcherId(null);
    setFocusedAxisPair(null);
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F4] text-[#0F1F24]">
      <Header
        activeView={activeView}
        onChangeView={setActiveView}
        lang={lang}
        onChangeLang={setLang}
        researchers={researchers}
        activePersonaId={activePersonaId}
        onChangePersona={setActivePersonaId}
        onOpenSyncModal={() => setSyncModalOpen(true)}
        onCopyShareLink={handleCopyShareLink}
      />

      {/* Honest Demo Notice Banner */}
      {showDemoBanner && hasDemoProfiles && (
        <div className="bg-teal-950 text-teal-100 border-b border-teal-800/70">
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-2 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-300 shrink-0" />
              <span>{UI[lang].demoBanner}</span>
            </div>
            <button
              onClick={() => setShowDemoBanner(false)}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold bg-teal-900 hover:bg-teal-800 text-teal-100 shrink-0 cursor-pointer"
            >
              <span>{UI[lang].dismiss}</span>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 lg:px-6 py-5">
        {activeView === 'graph' && (
          <NetworkGraphView
            researchers={researchers}
            edges={edges}
            bridges={bridges}
            assets={assets}
            missions={missions}
            lang={lang}
            activePersonaId={activePersonaId}
            focusedResearcherId={focusedResearcherId}
            focusedAxisPair={focusedAxisPair}
            lens={graphLens}
            onChangeLens={setGraphLens}
            focusedRegionId={focusedRegionId}
            onClearFocusedResearcher={() => setFocusedResearcherId(null)}
            onChangeAxisPair={setFocusedAxisPair}
            onSelectResearcher={setSelectedResearcherId}
            onOpenWarmIntro={handleOpenWarmIntro}
          />
        )}

        {activeView === 'constellation' && (
          <ConstellationView
            researchers={researchers}
            edges={edges}
            bridges={bridges}
            assets={assets}
            missions={missions}
            metrics={siloMetrics}
            lang={lang}
            onInspectAxisPair={handleInspectAxisPair}
            onSelectResearcher={setSelectedResearcherId}
          />
        )}

        {activeView === 'handshakes' && (
          <HandshakesView
            researchers={researchers}
            handshakes={handshakes}
            bridges={bridges}
            lang={lang}
            activePersonaId={activePersonaId}
            onSelectResearcher={setSelectedResearcherId}
            onOpenWarmIntro={handleOpenWarmIntro}
            onAddCapability={handleAddCapability}
          />
        )}

        {activeView === 'map' && (
          <TerrainMapView
            researchers={researchers}
            bridges={bridges}
            assets={assets}
            lang={lang}
            selectedRegionId={selectedRegionId}
            onChangeRegion={setSelectedRegionId}
            onOpenRegionInGraph={(regId) => {
              setFocusedRegionId(regId);
              setActiveView('graph');
            }}
            onSelectResearcher={setSelectedResearcherId}
            onOpenWarmIntro={handleOpenWarmIntro}
          />
        )}

        {activeView === 'directory' && (
          <DirectoryView
            researchers={researchers}
            assets={assets}
            lang={lang}
            onSelectResearcher={setSelectedResearcherId}
          />
        )}

        {activeView === 'missions' && (
          <MissionsView
            missions={missions}
            researchers={researchers}
            lang={lang}
            activePersonaId={activePersonaId}
            onSelectResearcher={setSelectedResearcherId}
            onJoinMissionAxis={handleJoinMissionAxis}
            onCreateMission={handleCreateMission}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white mt-8">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <strong className="text-slate-700">CLIMARES Hub</strong> —{' '}
            {lang === 'pt'
              ? 'Centro de Pesquisa em Resiliência em Crises Climáticas e Desastres (CEPID / FAPESP • IEE-USP)'
              : 'Climate Crisis and Disasters Resilience Research Center (CEPID / FAPESP • IEE-USP)'}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView('constellation')}
              className="hover:text-teal-700 font-medium cursor-pointer"
            >
              {UI[lang].nav.constellation}
            </button>
            <button
              onClick={() => setSyncModalOpen(true)}
              className="hover:text-teal-700 font-medium cursor-pointer"
            >
              {UI[lang].dataButton}
            </button>
          </div>
        </div>
      </footer>

      {/* Global Slide-Over Researcher Profile Drawer */}
      <ResearcherDrawer
        researcher={selectedResearcher}
        allResearchers={researchers}
        bridges={bridges}
        lang={lang}
        activePersonaId={activePersonaId}
        onClose={() => setSelectedResearcherId(null)}
        onSelectResearcher={setSelectedResearcherId}
        onCenterInGraph={handleCenterInGraph}
        onSetPersona={(id) => setActivePersonaId(id)}
        onOpenWarmIntro={handleOpenWarmIntro}
      />

      {/* Warm Introduction Generator Modal */}
      <WarmIntroModal
        isOpen={introModal.open}
        from={activePersona}
        to={introModal.target}
        bridge={introModal.bridge}
        defaultLang={lang}
        onClose={() => setIntroModal({ open: false, target: null, bridge: null })}
      />

      {/* CSV Import / OpenAlex Sync / GitHub Pages Deploy Modal */}
      <DataSyncModal
        isOpen={syncModalOpen}
        lang={lang}
        researchers={researchers}
        onClose={() => setSyncModalOpen(false)}
        onImportResearchers={handleImportResearchers}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}
