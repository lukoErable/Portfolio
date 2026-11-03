'use client';

import { motion } from 'framer-motion';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useBuildActions } from './BuildContext';
import useInViewOnce from './useInViewOnce';

type Phase = 'waiting' | 'framing' | 'filling' | 'done';

/* Lets nested pieces (TypeText) start once their block starts filling */
export const PhaseContext = createContext<Phase | null>(null);

const FRAME_MS = 200;
const FILL_MS = 380;
const SETTLE_MS = 450;
/* Delays passed in props are scaled down so the page assembles briskly */
const DELAY_SCALE = 0.5;

/**
 * A block of the page that "gets built" when it scrolls into view:
 * a selection frame appears with its name and size, the content wipes in,
 * then the frame fades away — like a design tool assembling the layout.
 */
export default function Build({
  label,
  children,
  className = '',
  delay = 0,
  frame = true,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  frame?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /* Blocks start building as soon as they peek into view */
  const inView = useInViewOnce(ref, '0px 0px -4% 0px');
  const { enabled, register, unregister, built } = useBuildActions();
  const [phase, setPhase] = useState<Phase>('waiting');
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    register();
    return unregister;
  }, [register, unregister]);

  useEffect(() => {
    if (!inView || phase !== 'waiting') return;
    const el = ref.current;
    if (!el) return;

    if (!enabled) {
      setPhase('done');
      built(label, el);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const start = delay * DELAY_SCALE * 1000;

    at(start, () => {
      setSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
      setPhase(frame ? 'framing' : 'filling');
      if (!frame) built(label, el);
    });
    if (frame) {
      at(start + FRAME_MS, () => {
        setPhase('filling');
        built(label, el);
      });
    }
    at(start + (frame ? FRAME_MS : 0) + FILL_MS + SETTLE_MS, () => setPhase('done'));

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, enabled]);

  /* Switching the effect off mid-build shows everything at once */
  useEffect(() => {
    if (!enabled && phase !== 'waiting') setPhase('done');
  }, [enabled, phase]);

  const visible = !enabled || phase === 'filling' || phase === 'done';
  const showFrame = frame && (phase === 'framing' || phase === 'filling');

  return (
    <PhaseContext.Provider value={phase}>
      <div ref={ref} className={`relative ${className}`}>
        <motion.div
          className="h-full"
          initial={false}
          animate={
            visible
              ? {
                  opacity: 1,
                  clipPath: 'inset(0% 0% 0% 0%)',
                  transitionEnd: { clipPath: 'none' },
                }
              : { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }
          }
          transition={
            enabled
              ? { duration: FILL_MS / 1000, ease: [0.65, 0, 0.35, 1] }
              : { duration: 0 }
          }
        >
          {children}
        </motion.div>

        {frame && (
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: showFrame ? 1 : 0, scale: showFrame ? 1 : 1.015 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute -inset-[3px] z-20 border border-select"
          >
            {['-left-[4px] -top-[4px]', '-right-[4px] -top-[4px]', '-bottom-[4px] -left-[4px]', '-bottom-[4px] -right-[4px]'].map(
              (pos) => (
                <span
                  key={pos}
                  className={`absolute h-[7px] w-[7px] border border-select bg-white ${pos}`}
                />
              ),
            )}
            <span className="absolute -top-[22px] left-[-4px] flex items-center gap-1.5 whitespace-nowrap bg-select px-1.5 py-[3px] font-mono text-[10px] leading-none text-white">
              {label}
              <span className="text-white/60">
                {size.w} × {size.h}
              </span>
            </span>
          </motion.div>
        )}
      </div>
    </PhaseContext.Provider>
  );
}
