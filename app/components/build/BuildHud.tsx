'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { content } from '../../data/content';
import { agents } from './agents';
import { useBuildState } from './BuildContext';

/* Floating toolbar showing the build progress of the page */
export default function BuildHud() {
  const { total, done, enabled, toggle } = useBuildState();
  const { language } = useContext(LanguageContext);
  const t = content[language].ui.hud;

  const progress = total ? Math.min(1, done / total) : 0;
  const finished = total > 0 && done >= total;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 120, damping: 18 }}
        className="flex items-center gap-3 rounded-full border border-white/10 bg-ink-800/90 py-2 pl-2 pr-2 font-mono text-[11px] text-white/70 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md sm:gap-4"
      >
        {enabled && (
          <>
            <div className="flex items-center gap-2 pl-1">
              <div className="flex -space-x-1.5">
                {agents.map((a) => (
                  <span
                    key={a.name}
                    title={a.name}
                    className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-800 text-[9px] font-bold text-white"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.name[0]}
                  </span>
                ))}
              </div>
              <span className="hidden sm:inline">
                {agents.length} {t.agents}
              </span>
            </div>

            <span className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-2">
              <span className="tabular-nums text-white">
                {Math.min(done, total)}
                <span className="text-white/40"> / {total}</span>
              </span>
              <span className="hidden sm:inline">{t.layers}</span>
              <span className="relative h-[3px] w-14 overflow-hidden rounded-full bg-white/10 sm:w-20">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full bg-select"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                />
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={finished ? 'done' : 'building'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`hidden items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 md:flex ${
                  finished ? 'bg-emerald-500/15 text-emerald-300' : 'bg-select/20 text-[#9db8ff]'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    finished ? 'bg-emerald-400' : 'animate-pulse bg-select'
                  }`}
                />
                {finished ? t.built : `${t.building}…`}
              </motion.span>
            </AnimatePresence>
          </>
        )}

        <button
          onClick={toggle}
          aria-pressed={enabled}
          className={`whitespace-nowrap rounded-full px-2.5 py-1 transition-colors ${
            enabled ? 'bg-white/5 text-white/60 hover:text-white' : 'bg-accent/15 text-accent-soft hover:bg-accent/25'
          }`}
        >
          {t.fx} {enabled ? 'ON' : 'OFF'}
        </button>
      </motion.div>
    </div>
  );
}
