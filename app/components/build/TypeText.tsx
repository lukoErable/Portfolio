'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { PhaseContext } from './Build';
import { useBuildActions } from './BuildContext';
import useInViewOnce from './useInViewOnce';

/**
 * Text that types itself in once it's revealed. The untyped remainder is
 * kept in the layout (invisible) so nothing jumps while it types.
 * Inside a <Build>, typing waits for the block to start filling.
 */
export default function TypeText({
  text,
  className = '',
  delay = 0,
  speed = 18,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, '0px 0px -4% 0px');
  const phase = useContext(PhaseContext);
  const { enabled } = useBuildActions();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const ready = phase ? phase === 'filling' || phase === 'done' : inView;

  useEffect(() => {
    if (!ready || started) return;
    const t = setTimeout(() => setStarted(true), delay * 500);
    return () => clearTimeout(t);
  }, [ready, started, delay]);

  /* New text (language switch): retype from scratch */
  useEffect(() => setCount(0), [text]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    /* Long strings type in chunks so they never take more than ~0.8s */
    const step = Math.max(1, Math.ceil(text.length / (800 / speed)));
    const t = setTimeout(() => setCount((c) => Math.min(text.length, c + step)), speed);
    return () => clearTimeout(t);
  }, [started, count, text, speed]);

  const shown = enabled ? count : text.length;
  const typing = enabled && started && shown < text.length;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, shown)}</span>
      {typing && (
        <span
          aria-hidden
          className="relative inline-block w-0 align-baseline before:absolute before:-top-[0.85em] before:left-0 before:h-[1em] before:w-[2px] before:bg-select"
        />
      )}
      <span aria-hidden className="opacity-0">
        {text.slice(shown)}
      </span>
    </span>
  );
}
