import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Globe,
  RefreshCw,
  Terminal,
  Upload,
  X,
} from 'lucide-react';
import { CSV_TEMPLATE_CONTENT, parseRosterCsv } from '../engine/csvImport';
import { UI } from '../i18n';
import { Lang, Researcher } from '../types';

interface DataSyncModalProps {
  isOpen: boolean;
  lang: Lang;
  researchers: Researcher[];
  onClose: () => void;
  onImportResearchers: (imported: Researcher[], mode: 'replace' | 'merge') => void;
  onResetDemo: () => void;
}

export const DataSyncModal: React.FC<DataSyncModalProps> = ({
  isOpen,
  lang,
  researchers,
  onClose,
  onImportResearchers,
  onResetDemo,
}) => {
  const [tab, setTab] = useState<'csv' | 'openalex' | 'deploy'>('csv');
  const [mode, setMode] = useState<'merge' | 'replace'>('merge');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  if (!isOpen) return null;
  const t = UI[lang].sync;

  const handleDownloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE_CONTENT], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'climares_equipe_modelo.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify({ researchers }, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `climares-hub-dados-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFile = async (file: File | null) => {
    if (!file) return;
    const text = await file.text();
    const { researchers: parsed, warnings: warns } = parseRosterCsv(text);
    setWarnings(warns);
    if (parsed.length > 0) {
      onImportResearchers(parsed, mode);
      setStatusMsg(`${parsed.length} ${t.importSuccess}`);
    } else {
      setStatusMsg(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900">{t.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-1">
          {(
            [
              { id: 'csv', label: t.tabCsv, icon: <Upload className="w-3.5 h-3.5" /> },
              { id: 'openalex', label: t.tabOpenAlex, icon: <Terminal className="w-3.5 h-3.5" /> },
              { id: 'deploy', label: t.tabDeploy, icon: <Globe className="w-3.5 h-3.5" /> },
            ] as const
          ).map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                tab === tb.id
                  ? 'border-teal-700 text-teal-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tb.icon}
              {tb.label}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {tab === 'csv' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={handleDownloadTemplate}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold bg-teal-50 text-teal-900 border border-teal-200 hover:bg-teal-100 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t.downloadTemplate}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportJson}
                    className="px-3 py-2 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    {t.exportJson}
                  </button>
                  <button
                    onClick={() => {
                      onResetDemo();
                      setStatusMsg(null);
                      setWarnings([]);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg font-semibold text-amber-800 bg-amber-50 border border-amber-200 hover:bg-amber-100 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {t.resetDemo}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="csvMode"
                    checked={mode === 'merge'}
                    onChange={() => setMode('merge')}
                    className="accent-teal-600"
                  />
                  <span className="font-semibold text-slate-800">{t.mergeWithPublic}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="csvMode"
                    checked={mode === 'replace'}
                    onChange={() => setMode('replace')}
                    className="accent-teal-600"
                  />
                  <span className="font-semibold text-slate-800">{t.replaceAll}</span>
                </label>
              </div>

              <label className="block border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-8 text-center cursor-pointer bg-slate-50/70 transition">
                <Upload className="w-7 h-7 text-teal-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-800 text-sm">{t.uploadLabel}</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {lang === 'pt'
                    ? 'Colunas aceitas: nome, eixo (1–11), eixos_secundarios, cargo, instituicao, unidade, email, orcid, lattes, metodos, regioes, perigos, oferta, demanda'
                    : 'Accepted columns: name, primary_axis (1–11), secondary_axes, role, institution, unit, email, orcid, lattes, methods, regions, hazards, offer, need'}
                </p>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                />
              </label>

              {statusMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {statusMsg}
                </div>
              )}

              {warnings.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                  {warnings.map((w, i) => (
                    <div key={i}>• {w}</div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'openalex' && (
            <div className="space-y-3 leading-relaxed">
              <p>
                {lang === 'pt'
                  ? 'Para eliminar a digitação manual de currículos (causa nº 1 de abandono de portais acadêmicos), este projeto já inclui o script automático de hidratação via API pública do OpenAlex e ORCID:'
                  : 'To eliminate manual CV entry (the #1 reason academic portals rot), this project ships with an automatic OpenAlex & ORCID hydration script:'}
              </p>
              <pre className="p-3.5 rounded-xl bg-slate-900 text-teal-200 font-mono-code text-[11px] overflow-x-auto">
{`# 1. Coloque a lista oficial de membros com ORCID em data/roster.json
# 2. Execute a sincronização (ou deixe o GitHub Actions rodar semanalmente):
npm run sync:openalex

# O script consulta https://api.openalex.org/works automaticamente e gera:
# - Publicações recentes de cada pesquisador(a)
# - Arestas reais de coautoria entre membros do CLIMARES (intra e inter-eixos)
# - Destaque automático de artigos transversais para relatórios FAPESP`}
              </pre>
              <p className="text-slate-500">
                {lang === 'pt'
                  ? 'O workflow .github/workflows/sync-and-deploy.yml já está configurado para rodar todo domingo às 03h (BRT) e republicar o site atualizado sem custo de servidor.'
                  : 'The included .github/workflows/sync-and-deploy.yml runs weekly and redeploys the static site at zero server cost.'}
              </p>
            </div>
          )}

          {tab === 'deploy' && (
            <div className="space-y-3 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
                <strong>
                  {lang === 'pt'
                    ? 'Seu cmip7-downloader NÃO conflita com o CLIMARES Hub!'
                    : 'Your cmip7-downloader does NOT block CLIMARES Hub!'}
                </strong>
                <p className="mt-1">
                  {lang === 'pt'
                    ? 'O GitHub Pages permite sites de projeto ilimitados em paralelo. Este repositório usa caminhos relativos (base: "./"), então funciona em qualquer subpasta ou domínio sem ajustes.'
                    : 'GitHub Pages supports unlimited parallel project sites. This app uses relative paths (base: "./"), working in any subpath or custom domain out of the box.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    1. GitHub Project Pages (Imediato)
                  </div>
                  <p className="text-slate-600 font-mono-code text-[11px]">
                    https://&lt;usuario&gt;.github.io/climares-hub/
                  </p>
                  <p className="text-slate-500 mt-1">
                    {lang === 'pt'
                      ? 'Basta subir este repositório no GitHub e ativar Settings → Pages → GitHub Actions.'
                      : 'Push this repo and enable Settings → Pages → GitHub Actions.'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 mb-1">
                    2. Organização GitHub CLIMARES (Recomendado)
                  </div>
                  <p className="text-slate-600 font-mono-code text-[11px]">
                    https://climares-hub.github.io
                  </p>
                  <p className="text-slate-500 mt-1">
                    {lang === 'pt'
                      ? 'URL institucional neutra, múltiplos mantenedores dos 11 eixos, pronto para CNAME hub.climares.usp.br.'
                      : 'Neutral institutional URL, multi-axis co-maintainers, ready for hub.climares.usp.br CNAME.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
