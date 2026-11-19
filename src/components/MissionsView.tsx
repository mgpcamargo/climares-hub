import React, { useMemo, useState } from 'react';
import { Calendar, Check, Hand, Plus, Target, X } from 'lucide-react';
import { AXES, AXIS_MAP } from '../data/axes';
import { REGION_MAP } from '../data/regionsAndHazards';
import { tText, UI } from '../i18n';
import { AxisId, CrossAxisMission, Lang, Researcher } from '../types';

interface MissionsViewProps {
  missions: CrossAxisMission[];
  researchers: Researcher[];
  lang: Lang;
  activePersonaId: string | null;
  onSelectResearcher: (id: string) => void;
  onJoinMissionAxis: (missionId: string, axisId: AxisId, researcherId: string) => void;
  onCreateMission: (mission: CrossAxisMission) => void;
}

const AxisCoverageWheel: React.FC<{
  activeAxes: AxisId[];
  openAxes: AxisId[];
  lang: Lang;
}> = ({ activeAxes, openAxes, lang }) => {
  const size = 124;
  const cx = size / 2;
  const cy = size / 2;
  const r = 46;
  const step = (Math.PI * 2) / 11;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-28 h-28 shrink-0 select-none">
      {AXES.map((ax, idx) => {
        const a0 = idx * step - Math.PI / 2 + 0.06;
        const a1 = (idx + 1) * step - Math.PI / 2 - 0.06;
        const x0 = cx + Math.cos(a0) * r;
        const y0 = cy + Math.sin(a0) * r;
        const x1 = cx + Math.cos(a1) * r;
        const y1 = cy + Math.sin(a1) * r;
        const isActive = activeAxes.includes(ax.id);
        const isOpen = openAxes.includes(ax.id);

        const statusText = isActive
          ? lang === 'pt'
            ? 'Ativo'
            : 'Active'
          : isOpen
          ? lang === 'pt'
            ? 'Cadeira aberta'
            : 'Open seat'
          : '—';

        return (
          <path
            key={ax.id}
            d={`M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`}
            fill="none"
            stroke={isActive ? ax.color : isOpen ? '#F59E0B' : '#E2E8F0'}
            strokeWidth={isActive ? 10 : isOpen ? 7 : 5}
            strokeDasharray={isOpen && !isActive ? '3 3' : undefined}
            strokeLinecap="round"
          >
            <title>{`${ax.code} — ${ax.name[lang]} (${statusText})`}</title>
          </path>
        );
      })}
      <text
        x={cx}
        y={cy - 2}
        textAnchor="middle"
        className="font-mono-code font-extrabold fill-slate-900"
        fontSize="16"
      >
        {activeAxes.length}/11
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        className="fill-slate-500 font-semibold"
        fontSize="8.5"
      >
        {lang === 'pt' ? 'EIXOS' : 'AXES'}
      </text>
    </svg>
  );
};

export const MissionsView: React.FC<MissionsViewProps> = ({
  missions,
  researchers,
  lang,
  activePersonaId,
  onSelectResearcher,
  onJoinMissionAxis,
  onCreateMission,
}) => {
  const t = UI[lang].missions;
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [output, setOutput] = useState('');
  const [inviteAxes, setInviteAxes] = useState<AxisId[]>([6, 9, 10]);

  const rById = useMemo(() => new Map(researchers.map((r) => [r.id, r])), [researchers]);
  const actor = (activePersonaId && rById.get(activePersonaId)) || researchers[0];

  const handleJoin = (missionId: string, openAxis: AxisId) => {
    // Prefer active persona if they belong to that axis, else any researcher of that axis or active actor
    const matchingMember =
      (actor && actor.primaryAxis === openAxis && actor) ||
      researchers.find((r) => r.primaryAxis === openAxis) ||
      actor;
    if (!matchingMember) return;
    onJoinMissionAxis(missionId, openAxis, matchingMember.id);
  };

  const toggleInviteAxis = (axId: AxisId) => {
    setInviteAxes((prev) =>
      prev.includes(axId) ? prev.filter((id) => id !== axId) : [...prev, axId]
    );
  };

  const handlePropose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !actor) return;
    const leadAxis = actor.primaryAxis;
    onCreateMission({
      id: `mission-user-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      status: 'forming',
      leadId: actor.id,
      memberIds: [actor.id],
      activeAxes: [leadAxis],
      openAxes: inviteAxes.filter((a) => a !== leadAxis),
      regions: actor.regions.slice(0, 2),
      hazards: actor.hazards.slice(0, 2),
      targetOutput: output.trim() || (lang === 'pt' ? 'Artigo síntese / Nota técnica' : 'Synthesis paper / Policy brief'),
      deadline: '2027',
    });
    setTitle('');
    setSummary('');
    setOutput('');
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            {t.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">{t.subtitle}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0F2C38] text-white hover:bg-[#173f50] shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4 text-teal-300" />
          {t.proposeButton.replace('+ ', '')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {missions.map((m) => {
          const lead = rById.get(m.leadId);
          const statusMeta =
            m.status === 'urgent'
              ? { label: t.statusUrgent, cls: 'bg-rose-50 text-rose-800 border-rose-200' }
              : m.status === 'active'
              ? { label: t.statusActive, cls: 'bg-emerald-50 text-emerald-800 border-emerald-200' }
              : { label: t.statusForming, cls: 'bg-amber-50 text-amber-800 border-amber-200' };
          const actorJoined = Boolean(activePersonaId && m.memberIds.includes(activePersonaId));

          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <AxisCoverageWheel
                  activeAxes={m.activeAxes}
                  openAxes={m.openAxes}
                  lang={lang}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusMeta.cls}`}
                    >
                      {statusMeta.label}
                    </span>
                    {m.deadline && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono-code text-slate-400">
                        <Calendar className="w-3 h-3" />
                        {m.deadline}
                      </span>
                    )}
                    {actorJoined && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        {t.joinedBadge}
                      </span>
                    )}
                  </div>

                  <h2 className="font-display font-bold text-lg text-slate-900 leading-snug">
                    {tText(m.title, lang)}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {tText(m.summary, lang)}
                  </p>

                  {m.regions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {m.regions.map((rid) => (
                        <span
                          key={rid}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                        >
                          📍 {REGION_MAP[rid]?.name[lang] || rid}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Active Axes vs Open Seats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    {t.activeAxesLabel}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {m.activeAxes.map((axId) => {
                      const ax = AXIS_MAP[axId];
                      return (
                        <span
                          key={axId}
                          className="px-2 py-0.5 rounded-md text-[11px] font-semibold text-white"
                          style={{ backgroundColor: ax.color }}
                        >
                          {ax.code} {ax.shortName[lang]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800 mb-1.5">
                    {t.openAxesLabel}
                  </div>
                  {m.openAxes.length === 0 ? (
                    <span className="text-xs text-emerald-700 font-semibold">
                      ✓ {lang === 'pt' ? 'Todos os eixos planejados preenchidos!' : 'All planned seats filled!'}
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {m.openAxes.map((axId) => {
                        const ax = AXIS_MAP[axId];
                        return (
                          <button
                            key={axId}
                            onClick={() => handleJoin(m.id, axId)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border border-dashed border-amber-400 bg-amber-50/70 text-amber-950 hover:bg-amber-100 transition cursor-pointer"
                            title={t.joinSeat}
                          >
                            <Hand className="w-3 h-3 text-amber-600" />
                            <span>
                              {ax.code} {ax.shortName[lang]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Deliverable + Team */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Target className="w-3 h-3 text-teal-600" />
                    {t.targetOutput}
                  </div>
                  <div className="font-semibold text-slate-800 mt-0.5">
                    {tText(m.targetOutput, lang)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {lead && (
                    <button
                      onClick={() => onSelectResearcher(lead.id)}
                      className="text-[11px] font-semibold text-teal-800 bg-white px-2 py-1 rounded-lg border border-slate-200 hover:border-teal-400 cursor-pointer"
                    >
                      {t.lead}: {lead.name.split(' ')[0]}
                    </button>
                  )}
                  <span className="text-[11px] font-mono-code text-slate-500 px-1.5">
                    +{Math.max(0, m.memberIds.length - 1)} {t.participants.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Propose Mission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-display font-bold text-base text-slate-900">
                {t.proposeTitle}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handlePropose} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {t.proposeName}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {t.proposeSummary}
                </label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {t.proposeOutput}
                </label>
                <input
                  type="text"
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                  {t.proposeOpenAxes}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {AXES.map((ax) => {
                    const sel = inviteAxes.includes(ax.id);
                    return (
                      <button
                        type="button"
                        key={ax.id}
                        onClick={() => toggleInviteAxis(ax.id)}
                        className={`px-2 py-1 rounded-md text-[11px] font-semibold border cursor-pointer ${
                          sel
                            ? 'text-white border-transparent'
                            : 'bg-white text-slate-600 border-slate-200'
                        }`}
                        style={sel ? { backgroundColor: ax.color } : undefined}
                      >
                        {ax.code} {ax.shortName[lang]}
                      </button>
                    );
                  })}
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
                  {t.proposeSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
