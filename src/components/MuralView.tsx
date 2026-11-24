import React, { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  Folder,
  MessageSquare,
  Plus,
  RefreshCw,
  ShieldCheck,
  Wifi,
  X,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import {
  buildNewMuralIssueUrl,
  fetchLiveMuralPosts,
  fetchLiveReplies,
} from '../engine/liveBackend';
import { POST_KIND_META, UI } from '../i18n';
import {
  AxisId,
  Lang,
  MuralFolderId,
  MuralPost,
  MuralPostKind,
  MuralReply,
  Researcher,
} from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface MuralViewProps {
  researchers: Researcher[];
  lang: Lang;
  onSelectResearcher: (id: string) => void;
  onPostsLoaded?: (count: number) => void;
}

// Honest fallback posts ONLY shown if offline / API unreachable — ZERO fake professor quotes!
const FALLBACK_POSTS: MuralPost[] = [
  {
    id: 'sys-welcome',
    folderId: 'general',
    kind: 'discussion',
    title: 'Guia Rápido do Mural & Fórum CLIMARES (Sincronizado Online)',
    authorName: 'Sistema CLIMARES Hub',
    authorUnit: 'Plataforma Aberta',
    isSystemSeed: true,
    createdAt: 'Nov 2026',
    body: 'Este Mural unifica Tópicos Gerais, Avisos Administrativos FAPESP, Ofertas de Dados/Modelos e Buscas de Parceria entre os 11 Eixos.\n\nToda publicação criada aqui fica visível online em tempo real para todos os membros do Centro.',
    tags: ['Guia', '11 Eixos'],
    pinned: true,
    repliesCount: 0,
  },
  {
    id: 'offer-cmip7',
    folderId: 'axis-1',
    kind: 'offer',
    title: 'CMIP7 Area Explorer — Recortes espaciais e scripts ESGF-NG para bacias brasileiras',
    authorName: 'Marcelo Camargo',
    authorResearcherId: 'marcelo-camargo',
    authorUnit: 'IAG-USP',
    authorAxis: 1,
    createdAt: 'Nov 2026',
    body: 'Disponibilizo a ferramenta web CMIP7 Area Explorer (https://mgpcamargo.github.io/cmip7-area-explorer/) para seleção de recortes espaciais, verificação de variáveis CMIP7 (MIP-DRS7) e geração automática de scripts Python/wget para qualquer bacia ou região estudada pelos 11 Eixos.',
    tags: ['CMIP7', 'ESGF-NG', 'Dados Climáticos'],
    repliesCount: 0,
  },
];

export const MuralView: React.FC<MuralViewProps> = ({
  researchers,
  lang,
  onSelectResearcher,
  onPostsLoaded,
}) => {
  const t = UI[lang].mural;
  const [posts, setPosts] = useState<MuralPost[]>(FALLBACK_POSTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFolder, setActiveFolder] = useState<MuralFolderId>('all');
  const [kindFilter, setKindFilter] = useState<MuralPostKind | 'all'>('all');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [repliesMap, setRepliesMap] = useState<Record<string, MuralReply[]>>({});
  const [loadingReplies, setLoadingReplies] = useState(false);

  // New Post Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newKind, setNewKind] = useState<MuralPostKind>('offer');
  const [newFolder, setNewFolder] = useState<Exclude<MuralFolderId, 'all'>>('general');
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorUnit, setNewAuthorUnit] = useState('');
  const [newAuthorAxis, setNewAuthorAxis] = useState<AxisId>(1);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const live = await fetchLiveMuralPosts();
      if (live.length > 0) {
        setPosts(live);
        onPostsLoaded?.(live.length);
      } else {
        setPosts(FALLBACK_POSTS);
        onPostsLoaded?.(FALLBACK_POSTS.length);
      }
    } catch {
      setPosts(FALLBACK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const folders: {
    id: MuralFolderId;
    label: string;
    code: string;
    color: string;
    icon?: React.ReactNode;
  }[] = useMemo(() => {
    return [
      {
        id: 'all',
        label: t.allFolders,
        code: 'TUDO',
        color: '#0D9488',
      },
      {
        id: 'general',
        label: t.generalFolder,
        code: 'GERAL',
        color: '#14B8A6',
        icon: <MessageSquare className="w-3.5 h-3.5" />,
      },
      {
        id: 'admin',
        label: t.adminFolder,
        code: 'FAPESP',
        color: '#F59E0B',
        icon: <ShieldCheck className="w-3.5 h-3.5" />,
      },
      ...AXES.map((ax) => ({
        id: `axis-${ax.id}` as MuralFolderId,
        label: ax.shortName[lang],
        code: ax.code,
        color: ax.color,
      })),
    ];
  }, [lang, t.allFolders, t.generalFolder, t.adminFolder]);

  const folderCounts = useMemo(() => {
    const counts: Record<string, number> = { all: posts.length };
    for (const p of posts) {
      counts[p.folderId] = (counts[p.folderId] || 0) + 1;
    }
    return counts;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (activeFolder !== 'all' && p.folderId !== activeFolder) return false;
      if (kindFilter !== 'all' && p.kind !== kindFilter) return false;
      return true;
    });
  }, [posts, activeFolder, kindFilter]);

  const activePost = useMemo(
    () =>
      filteredPosts.find((p) => p.id === selectedPostId) ||
      filteredPosts[0] ||
      null,
    [filteredPosts, selectedPostId]
  );

  // Fetch live comments when selecting a GitHub-backed post
  useEffect(() => {
    if (!activePost?.issueNumber || repliesMap[activePost.id]) return;
    let cancelled = false;
    setLoadingReplies(true);
    fetchLiveReplies(activePost.issueNumber)
      .then((reps) => {
        if (!cancelled) {
          setRepliesMap((prev) => ({ ...prev, [activePost.id]: reps }));
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingReplies(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activePost?.id, activePost?.issueNumber]);

  const newIssueUrl = buildNewMuralIssueUrl({
    folderId: newFolder,
    kind: newKind,
    title: newTitle || 'Nova publicação CLIMARES',
    body: newBody,
    authorName: newAuthorName || 'Pesquisador(a) CLIMARES',
    authorUnit: newAuthorUnit || undefined,
    authorAxis: newAuthorAxis,
  });

  const mailtoPostUrl = `mailto:climares@iee.usp.br?subject=${encodeURIComponent(
    `[Mural CLIMARES - ${newFolder.toUpperCase()}] ${newTitle}`
  )}&body=${encodeURIComponent(
    `Autor(a): ${newAuthorName} (${newAuthorUnit}, Eixo ${newAuthorAxis})\nTipo: ${POST_KIND_META[newKind].pt}\n\n${newBody}`
  )}`;

  return (
    <div className="space-y-4">
      {/* Top Bar: Unified Post Types (Discussion | Offer | Need | Joint Paper) + New Post */}
      <div className="bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setKindFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              kindFilter === 'all'
                ? 'bg-teal-600 text-white'
                : 'bg-slate-50 dark:bg-[#0B1219] text-slate-600 dark:text-slate-300'
            }`}
          >
            {t.allKinds}
          </button>
          {(['offer', 'need', 'paper', 'discussion'] as MuralPostKind[]).map((k) => {
            const meta = POST_KIND_META[k];
            const active = kindFilter === k;
            return (
              <button
                key={k}
                onClick={() => setKindFilter(active ? 'all' : k)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-700 text-white border-transparent'
                    : 'bg-slate-50 dark:bg-[#0B1219] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                }`}
              >
                {meta.emoji} {meta[lang]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            <Wifi className="w-3.5 h-3.5" />
            {t.liveSynced}
          </span>
          <button
            onClick={loadPosts}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-teal-500 cursor-pointer"
            title="Atualizar feed online"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => {
              if (activeFolder !== 'all') setNewFolder(activeFolder);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.newPost.replace('+ ', '')}
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout: Folders | Unified Feed | Active Thread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Folders (All + Geral + Admin FAPESP + 11 Axes) */}
        <aside className="lg:col-span-3 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1 max-h-[650px] overflow-y-auto">
          <div className="px-2 py-1 text-xs font-bold text-slate-400 flex items-center gap-1.5">
            <Folder className="w-3.5 h-3.5 text-teal-500" />
            Pastas
          </div>
          {folders.map((f) => {
            const active = f.id === activeFolder;
            const cnt = folderCounts[f.id] || 0;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFolder(f.id)}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-800 text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold text-white shrink-0"
                    style={{ backgroundColor: f.color }}
                  >
                    {f.code}
                  </span>
                  <span className="truncate">{f.label}</span>
                </div>
                {cnt > 0 && (
                  <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300 font-bold">
                    {cnt}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Center: Feed Cards */}
        <section className="lg:col-span-4 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5 max-h-[650px] overflow-y-auto">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'pt'
                  ? 'Nenhuma publicação nesta pasta ainda.'
                  : 'No posts in this folder yet.'}
              </p>
              <button
                onClick={() => {
                  if (activeFolder !== 'all') setNewFolder(activeFolder);
                  setModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer"
              >
                {t.newPost}
              </button>
            </div>
          ) : (
            filteredPosts.map((p) => {
              const kMeta = POST_KIND_META[p.kind];
              const linkedMember = p.authorResearcherId ? rById.get(p.authorResearcherId) : undefined;
              const isSel = activePost?.id === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPostId(p.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer ${
                    isSel
                      ? 'bg-teal-500/10 border-teal-500/50'
                      : 'bg-slate-50 dark:bg-[#0B1219] border-slate-200/80 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${kMeta.badgeCls}`}
                    >
                      {kMeta.emoji} {kMeta[lang]}
                    </span>
                    <span className="text-[10px] font-mono-code text-slate-400">
                      {p.createdAt}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                    {p.title}
                  </h3>

                  <div className="flex items-center justify-between gap-2 mt-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      {linkedMember && <ResearcherAvatar researcher={linkedMember} size="xs" />}
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                        {p.authorName}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code text-teal-600 dark:text-teal-400 font-bold shrink-0">
                      {p.repliesCount} {t.replies}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </section>

        {/* Right: Active Post & Live Replies */}
        <section className="lg:col-span-5 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between max-h-[650px]">
          {activePost ? (
            <>
              <div className="overflow-y-auto space-y-4 pr-1">
                <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${
                        POST_KIND_META[activePost.kind].badgeCls
                      }`}
                    >
                      {POST_KIND_META[activePost.kind].emoji}{' '}
                      {POST_KIND_META[activePost.kind][lang]}
                    </span>
                    <span className="text-xs font-mono-code text-slate-400">
                      {activePost.createdAt}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    {activePost.title}
                  </h2>

                  {/* Author row */}
                  <div className="flex items-center gap-2.5 mt-3">
                    {activePost.authorResearcherId && rById.get(activePost.authorResearcherId) ? (
                      <button
                        onClick={() => onSelectResearcher(activePost.authorResearcherId!)}
                        className="flex items-center gap-2.5 cursor-pointer group"
                      >
                        <ResearcherAvatar
                          researcher={rById.get(activePost.authorResearcherId)!}
                          size="sm"
                        />
                        <div className="text-left">
                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-400">
                            {activePost.authorName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {activePost.authorUnit}
                            {activePost.authorAxis
                              ? ` • ${AXIS_MAP[activePost.authorAxis].code}`
                              : ''}
                          </div>
                        </div>
                      </button>
                    ) : (
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {activePost.authorName}
                        {activePost.authorUnit ? ` (${activePost.authorUnit})` : ''}
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-3.5 leading-relaxed whitespace-pre-line">
                    {activePost.body}
                  </p>
                </div>

                {/* Live Comments / Replies */}
                <div className="space-y-2.5">
                  {loadingReplies && (
                    <p className="text-xs text-slate-400">Carregando respostas...</p>
                  )}
                  {(repliesMap[activePost.id] || []).map((rep) => (
                    <div
                      key={rep.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <strong className="text-slate-900 dark:text-white">
                          {rep.authorName}
                        </strong>
                        <span className="font-mono-code text-slate-400">{rep.createdAt}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line">
                        {rep.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer: Reply Live on GitHub Issue */}
              <div className="pt-3 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">
                  {lang === 'pt'
                    ? 'Respostas ficam públicas e visíveis para todos os 11 Eixos.'
                    : 'Replies are public and visible to all 11 Axes.'}
                </span>
                {activePost.issueUrl ? (
                  <a
                    href={`${activePost.issueUrl}#issuecomment-new`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 shrink-0"
                  >
                    {t.replyBtn} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 shrink-0 cursor-pointer"
                  >
                    {t.newPost}
                  </button>
                )}
              </div>
            </>
          ) : null}
        </section>
      </div>

      {/* New Live Shared Post Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                {t.modalTitle}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              {/* Post Type Selector */}
              <div className="grid grid-cols-2 gap-2">
                {(['offer', 'need', 'paper', 'discussion'] as MuralPostKind[]).map((k) => {
                  const meta = POST_KIND_META[k];
                  const active = newKind === k;
                  return (
                    <button
                      type="button"
                      key={k}
                      onClick={() => setNewKind(k)}
                      className={`p-2.5 rounded-xl font-bold border text-left transition cursor-pointer ${
                        active
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {meta.emoji} {meta[lang]}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">{t.folderLabel}</label>
                  <select
                    value={newFolder}
                    onChange={(e) =>
                      setNewFolder(e.target.value as Exclude<MuralFolderId, 'all'>)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {folders
                      .filter((f) => f.id !== 'all')
                      .map((f) => (
                        <option key={f.id} value={f.id}>
                          [{f.code}] {f.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-400 mb-1">Seu Eixo</label>
                  <select
                    value={newAuthorAxis}
                    onChange={(e) => setNewAuthorAxis(Number(e.target.value) as AxisId)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {AXES.map((ax) => (
                      <option key={ax.id} value={ax.id}>
                        {ax.code} — {ax.shortName[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  placeholder="Seu nome (ex.: Maria Silva)"
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={newAuthorUnit}
                  onChange={(e) => setNewAuthorUnit(e.target.value)}
                  placeholder="Unidade (ex.: IAG-USP, CEMADEN)"
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.titleLabel}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />

              <textarea
                rows={4}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder={t.bodyLabel}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
                <a
                  href={mailtoPostUrl}
                  className="px-3 py-2 rounded-xl font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {t.submitEmail}
                </a>
                <a
                  href={newIssueUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-500"
                >
                  {t.submitGithub} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
