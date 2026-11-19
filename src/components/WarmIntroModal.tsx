import React, { useEffect, useState } from 'react';
import { Check, Copy, Mail, MessageCircle, X } from 'lucide-react';
import { AXIS_MAP } from '../data/axes';
import { generateWarmIntro } from '../engine/bridgeEngine';
import { UI } from '../i18n';
import { Lang, LatentBridge, Researcher } from '../types';
import { ResearcherAvatar } from './ResearcherAvatar';

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
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!to) return;
    const generated = generateWarmIntro(from, to, bridge, defaultLang);
    setSubject(generated.subject);
    setBody(generated.body);
  }, [from, to, bridge, defaultLang]);

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-[#121C26] text-slate-900 dark:text-slate-100 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ResearcherAvatar researcher={to} size="sm" />
            <div>
              <h3 className="font-display font-bold text-sm">{to.name}</h3>
              <span
                className="px-1.5 py-0.2 rounded text-[10px] font-mono-code font-bold text-white"
                style={{ backgroundColor: toAxis.color }}
              >
                {toAxis.code} • {to.unit}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs font-bold"
          />
          <textarea
            rows={7}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0B1219] border border-slate-200 dark:border-slate-800 text-xs leading-relaxed"
          />

          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t.copiedText}</span>
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              {t.openWhatsApp}
            </a>
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-500"
            >
              <Mail className="w-3.5 h-3.5" />
              {t.openEmail}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
