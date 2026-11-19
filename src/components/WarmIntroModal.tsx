import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail, MessageCircle, Sparkles, X } from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { generateWarmIntro } from '../engine/bridgeEngine';
import { UI } from '../i18n';
import { Lang, LatentBridge, Researcher } from '../types';

interface WarmIntroModalProps {
  isOpen: boolean;
  from: Researcher | null;
  to: Researcher | null;
  bridge: LatentBridge | null;
  defaultLang: Lang;
  onClose: () => void;
}

export const WarmIntroModal: React.FC<WarmIntroModalProps> = ({
  isOpen,
  from,
  to,
  bridge,
  defaultLang,
  onClose,
}) => {
  const [msgLang, setMsgLang] = useState<Lang>(defaultLang);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMsgLang(defaultLang);
  }, [defaultLang]);

  useEffect(() => {
    if (!to) return;
    const generated = generateWarmIntro(from, to, bridge, msgLang);
    setSubject(generated.subject);
    setBody(generated.body);
  }, [from, to, bridge, msgLang]);

  if (!isOpen || !to) return null;

  const t = UI[defaultLang].intro;
  const toAxis = AXIS_MAP[to.primaryAxis];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailtoHref = `mailto:${encodeURIComponent(to.email || '')}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${subject}\n\n${body}`)}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <h3 className="font-display font-bold text-base text-slate-900">{t.title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Target summary + language selector */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[11px] font-mono-code font-bold text-white"
                style={{ backgroundColor: toAxis.color }}
              >
                {toAxis.code}
              </span>
              <span className="text-sm font-bold text-slate-900">{to.name}</span>
              <span className="text-xs text-slate-500">({to.unit})</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-slate-500">{t.langLabel}:</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-semibold">
                <button
                  onClick={() => setMsgLang('pt')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${
                    msgLang === 'pt' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  PT-BR
                </button>
                <button
                  onClick={() => setMsgLang('en')}
                  className={`px-2 py-0.5 rounded-md cursor-pointer ${
                    msgLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          {bridge && bridge.reasons.length > 0 && (
            <div className="rounded-xl bg-teal-50/70 border border-teal-200/70 p-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-1.5">
                {t.sharedHighlights} ({bridge.score}%)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {bridge.reasons.slice(0, 3).map((r, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-white text-teal-900 border border-teal-200/80"
                  >
                    {r.text[msgLang]}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
            <textarea
              rows={10}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-sans"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t.copiedText}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  {t.copyText}
                </>
              )}
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {t.openWhatsApp}
            </a>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0F2C38] text-white hover:bg-[#173f50]"
            >
              <Mail className="w-3.5 h-3.5 text-teal-300" />
              {t.openEmail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
