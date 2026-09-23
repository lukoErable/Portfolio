'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaArrowUpRightFromSquare, FaXmark } from 'react-icons/fa6';
import { LanguageContext } from '../../contexts/LanguageContext';
import DashboardPreview from './FyneriDashboardPreview';
import { labels, projectOrder, type ProjectKey, type ScreenKey } from './fyneri-showcase-copy';

export default function FyneriShowcase({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language } = useContext(LanguageContext);
  const t = labels[language];
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [project, setProject] = useState<ProjectKey>('ownaris');
  const [screen, setScreen] = useState<ScreenKey>('overview');
  const projectNames: Record<ProjectKey, string> = { ownaris: t.ownaris, dashpsp: t.dashpsp, oneclick: t.oneclick };
  const projectDescriptions: Record<ProjectKey, string> = { ownaris: t.ownarisDescription, dashpsp: t.dashpspDescription, oneclick: t.oneclickDescription };
  const screenChoices: Record<ProjectKey, ScreenKey[]> = { ownaris: ['overview', 'orders'], dashpsp: ['overview', 'connectors'], oneclick: ['overview', 'checkout'] };
  const screenNames: Record<ScreenKey, string> = { overview: t.overview, orders: t.orders, connectors: t.connectors, checkout: t.checkout };

  useEffect(() => setPortalRoot(document.body), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!portalRoot) return null;

  return createPortal((
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="fyneri-showcase-title" className="flex max-h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090810] shadow-[0_0_100px_rgba(34,211,238,0.12)]" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.99 }} transition={{ duration: 0.2 }}>
            <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3 sm:px-6">
              <div className="min-w-0"><p className="text-[9px] uppercase tracking-[0.25em] text-cyan-300/80">{t.eyebrow}</p><h2 id="fyneri-showcase-title" className="mt-1 truncate font-display text-sm font-semibold text-white sm:text-base">{t.title}</h2></div>
              <button type="button" onClick={onClose} aria-label={t.close} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"><FaXmark /></button>
            </header>
            <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-white/[0.06] px-3 py-2 sm:px-6">
              {projectOrder.map((key) => (
                <button key={key} type="button" onClick={() => { setProject(key); setScreen('overview'); }} aria-pressed={project === key} className={`min-w-[140px] flex-1 rounded-lg border px-3 py-2 text-left transition-colors sm:min-w-0 ${project === key ? 'border-cyan-300/30 bg-cyan-400/[0.08]' : 'border-transparent hover:bg-white/[0.04]'}`}>
                  <span className={`block truncate text-xs font-semibold ${project === key ? 'text-cyan-100' : 'text-slate-300'}`}>{projectNames[key]}</span>
                  <span className="mt-0.5 hidden truncate text-[9px] text-slate-500 sm:block">{projectDescriptions[key]}</span>
                </button>
              ))}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-amber-300/10 bg-amber-300/[0.045] px-4 py-2 sm:px-6">
              <div className="flex min-w-0 items-center gap-2"><span className="shrink-0 rounded bg-amber-300/10 px-1.5 py-1 text-[8px] font-bold tracking-wider text-amber-200">{t.demo}</span><p className="truncate text-[9px] text-amber-100/70 sm:text-[10px]">{t.fictional}</p></div>
              <span className="hidden shrink-0 text-[9px] text-amber-100/50 lg:block">{t.noLiveData}</span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-4 lg:p-5">
              <div className="mb-2 flex items-center justify-between gap-2 px-1 sm:mb-3">
                <div className="flex gap-1 rounded-lg border border-white/[0.07] bg-white/[0.025] p-1">
                  {screenChoices[project].map((key) => (
                    <button key={key} type="button" onClick={() => setScreen(key)} aria-pressed={screen === key} className={`rounded-md px-2.5 py-1.5 text-[9px] transition-colors sm:text-[10px] ${screen === key ? 'bg-white/[0.1] font-medium text-white' : 'text-slate-500 hover:text-slate-200'}`}>{screenNames[key]}</button>
                  ))}
                </div>
                <span className="hidden items-center gap-1.5 text-[9px] text-slate-600 md:inline-flex"><FaArrowUpRightFromSquare size={9} />{t.previewLabel}</span>
              </div>
              <DashboardPreview project={project} screen={screen} labels={t} />
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  ), portalRoot);
}
