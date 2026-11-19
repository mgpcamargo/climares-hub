import React, { useMemo, useState } from 'react';
import {
  Folder,
  MessageSquare,
  Pin,
  Plus,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { UI } from '../i18n';
import { ForumFolderId, ForumThread, Lang, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

interface ForumViewProps {
  threads: ForumThread[];
  researchers: Researcher[];
  lang: Lang;
  onSelectResearcher: (id: string) => void;
  onCreateThread: (thread: ForumThread) => void;
  onAddReply: (threadId: string, authorId: string, body: string) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({
  threads,
  researchers,
  lang,
  onSelectResearcher,
  onCreateThread,
  onAddReply,
}) => {
  const t = UI[lang].forum;
  const [activeFolder, setActiveFolder] = useState<ForumFolderId>('general');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    threads[0]?.id || null
  );
  const [replyAuthorId, setReplyAuthorId] = useState<string>('marcelo-camargo');
  const [replyText, setReplyText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // New Thread Modal state
  const [newFolder, setNewFolder] = useState<ForumFolderId>('general');
  const [newAuthorId, setNewAuthorId] = useState<string>('marcelo-camargo');
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newTags, setNewTags] = useState('');

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);

  // 13 Folders: 1 Geral + 1 Administrativo FAPESP + 11 Axes
  const folders: {
    id: ForumFolderId;
    label: string;
    code: string;
    color: string;
    icon?: React.ReactNode;
  }[] = useMemo(() => {
    return [
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
        id: `axis-${ax.id}` as ForumFolderId,
        label: ax.shortName[lang],
        code: ax.code,
        color: ax.color,
      })),
    ];
  }, [lang, t.generalFolder, t.adminFolder]);

  const folderCounts = useMemo(() => {
    const map = {} as Record<ForumFolderId, number>;
    for (const f of folders) map[f.id] = 0;
    for (const th of threads) {
      map[th.folderId] = (map[th.folderId] || 0) + 1;
    }
    return map;
  }, [threads, folders]);

  const folderThreads = useMemo(
    () => threads.filter((th) => th.folderId === activeFolder),
    [threads, activeFolder]
  );

  const activeThread = useMemo(
    () =>
      folderThreads.find((th) => th.id === selectedThreadId) ||
      folderThreads[0] ||
      null,
    [folderThreads, selectedThreadId]
  );

  const handleSelectFolder = (fid: ForumFolderId) => {
    setActiveFolder(fid);
    const first = threads.find((th) => th.folderId === fid);
    setSelectedThreadId(first?.id || null);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThread || !replyText.trim()) return;
    onAddReply(activeThread.id, replyAuthorId, replyText.trim());
    setReplyText('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    const created: ForumThread = {
      id: `th-${Date.now()}`,
      folderId: newFolder,
      title: newTitle.trim(),
      authorId: newAuthorId,
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      body: newBody.trim(),
      tags: newTags
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      replies: [],
    };
    onCreateThread(created);
    setActiveFolder(newFolder);
    setSelectedThreadId(created.id);
    setNewTitle('');
    setNewBody('');
    setNewTags('');
    setModalOpen(false);
  };

  const currentFolderMeta = folders.find((f) => f.id === activeFolder)!;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left Sidebar: 13 Folders (Geral + Admin FAPESP + 11 Eixos) */}
      <aside className="lg:col-span-3 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1.5">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Folder className="w-4 h-4 text-teal-500" />
            {t.title}
          </span>
          <button
            onClick={() => {
              setNewFolder(activeFolder);
              setModalOpen(true);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {lang === 'pt' ? 'Tópico' : 'New'}
          </button>
        </div>

        <div className="space-y-1 max-h-[620px] overflow-y-auto pr-0.5">
          {folders.map((f) => {
            const active = f.id === activeFolder;
            return (
              <button
                key={f.id}
                onClick={() => handleSelectFolder(f.id)}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  active
                    ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-2xs'
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
                <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded-full bg-slate-200/70 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                  {folderCounts[f.id] || 0}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Center: Thread List in Folder */}
      <section className="lg:col-span-4 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col">
        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-md text-xs font-mono-code font-bold text-white"
              style={{ backgroundColor: currentFolderMeta.color }}
            >
              {currentFolderMeta.code}
            </span>
            <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              {currentFolderMeta.label}
            </h2>
          </div>
          <button
            onClick={() => {
              setNewFolder(activeFolder);
              setModalOpen(true);
            }}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
          >
            {t.newThread}
          </button>
        </div>

        <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[580px] pr-1">
          {folderThreads.map((th) => {
            const author = rById.get(th.authorId) || researchers[0];
            const isSel = activeThread?.id === th.id;
            return (
              <button
                key={th.id}
                onClick={() => setSelectedThreadId(th.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer ${
                  isSel
                    ? 'bg-teal-500/10 border-teal-500/50'
                    : 'bg-slate-50 dark:bg-[#0B1219] border-slate-200/80 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <ResearcherAvatar researcher={author} size="xs" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {author.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono-code text-slate-400 shrink-0">
                    {th.createdAt}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug flex items-start gap-1">
                  {th.pinned && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />}
                  <span>{th.title}</span>
                </h3>

                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="flex flex-wrap gap-1">
                    {th.tags.map((tg) => (
                      <span
                        key={tg}
                        className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono-code text-teal-600 dark:text-teal-400 font-bold">
                    {th.replies.length} {t.replies}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Right: Active Thread Detail & Replies */}
      <section className="lg:col-span-5 bg-white dark:bg-[#121C26] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between">
        {activeThread ? (
          <>
            <div className="space-y-4 overflow-y-auto max-h-[480px] pr-1">
              {/* Root Thread Post */}
              {(() => {
                const author = rById.get(activeThread.authorId) || researchers[0];
                const ax = AXIS_MAP[author.primaryAxis];
                return (
                  <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <button
                        onClick={() => onSelectResearcher(author.id)}
                        className="flex items-center gap-3 text-left cursor-pointer group"
                      >
                        <ResearcherAvatar researcher={author} size="md" />
                        <div>
                          <div className="font-display font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-400">
                            {author.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                            <span
                              className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold text-white"
                              style={{ backgroundColor: ax.color }}
                            >
                              {ax.code}
                            </span>
                            <span>{author.unit}</span>
                          </div>
                        </div>
                      </button>
                      <span className="text-xs font-mono-code text-slate-400">
                        {activeThread.createdAt}
                      </span>
                    </div>

                    <h1 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                      {activeThread.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed whitespace-pre-line">
                      {activeThread.body}
                    </p>
                  </div>
                );
              })()}

              {/* Replies */}
              <div className="space-y-3">
                {activeThread.replies.map((rep) => {
                  const rAuthor = rById.get(rep.authorId) || researchers[0];
                  const rAx = AXIS_MAP[rAuthor.primaryAxis];
                  return (
                    <div
                      key={rep.id}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200/80 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <button
                          onClick={() => onSelectResearcher(rAuthor.id)}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <ResearcherAvatar researcher={rAuthor} size="sm" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-400">
                            {rAuthor.name}
                          </span>
                          <span
                            className="px-1.5 py-0.2 rounded text-[9px] font-mono-code font-bold text-white"
                            style={{ backgroundColor: rAx.color }}
                          >
                            {rAx.code}
                          </span>
                        </button>
                        <span className="text-[10px] font-mono-code text-slate-400">
                          {rep.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {rep.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reply Box */}
            <form
              onSubmit={handleReplySubmit}
              className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">{t.postAs}</span>
                <select
                  value={replyAuthorId}
                  onChange={(e) => setReplyAuthorId(e.target.value)}
                  className="bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 flex-1 truncate"
                >
                  {researchers.map((r) => (
                    <option key={r.id} value={r.id}>
                      [{AXIS_MAP[r.primaryAxis].code}] {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t.replyPlaceholder}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t.replyBtn}
                </button>
              </div>
            </form>
          </>
        ) : null}
      </section>

      {/* New Thread Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
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
            <form onSubmit={handleCreateSubmit} className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">{t.folderLabel}</label>
                  <select
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value as ForumFolderId)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        [{f.code}] {f.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">{t.postAs}</label>
                  <select
                    value={newAuthorId}
                    onChange={(e) => setNewAuthorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                  >
                    {researchers.map((r) => (
                      <option key={r.id} value={r.id}>
                        [{AXIS_MAP[r.primaryAxis].code}] {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">{t.threadTitle}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">{t.threadBody}</label>
                <textarea
                  rows={4}
                  required
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">{t.threadTags}</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="CMIP7, Hidrologia, Artigo"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
                >
                  {t.createBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
