'use client';

import { useAnimate } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { agents } from './agents';
import { useBuildState, type BuildEvent } from './BuildContext';
import { cursorCopy, pick } from './cursorCopy';

type Point = { x: number; y: number };
type Status = { text: string; target?: string };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Bottom-centre of the viewport, where the build toolbar sits */
const dockPoint = (): Point => ({
  x: window.scrollX + window.innerWidth / 2,
  y: window.scrollY + window.innerHeight - 36,
});

const onScreen = (p: Point) =>
  p.y > window.scrollY && p.y < window.scrollY + window.innerHeight;

/* Somewhere near the current spot (or anywhere, if it scrolled away),
   kept inside the visible area and clear of the toolbar */
function wanderPoint(from: Point): Point {
  const minX = window.scrollX + window.innerWidth * 0.08;
  const maxX = window.scrollX + window.innerWidth * 0.86;
  const minY = window.scrollY + window.innerHeight * 0.16;
  const maxY = window.scrollY + window.innerHeight * 0.72;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  if (!onScreen(from)) {
    return { x: minX + Math.random() * (maxX - minX), y: minY + Math.random() * (maxY - minY) };
  }
  return {
    x: clamp(from.x + (Math.random() - 0.5) * 520, minX, maxX),
    y: clamp(from.y + (Math.random() - 0.5) * 320, minY, maxY),
  };
}

/* x and y use different easings so the cursor travels on a soft curve,
   the way a hand moves a mouse, instead of a straight robotic line */
const EASE_X = [0.22, 1, 0.36, 1] as const;
const EASE_Y = [0.65, 0, 0.35, 1] as const;

function travelTime(from: Point, to: Point) {
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  return Math.min(1.1, Math.max(0.45, dist / 1300));
}

function AgentCursor({
  index,
  task,
  finished,
  language,
}: {
  index: number;
  task: BuildEvent | null;
  finished: boolean;
  language: 'fr' | 'en';
}) {
  const agent = agents[index];
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const pos = useRef<Point | null>(null);
  const busy = useRef(false);
  const mode = useRef<'live' | 'finale'>('live');
  const copy = useRef(cursorCopy[language]);
  copy.current = cursorCopy[language];
  const [status, setStatus] = useState<Status>({ text: '' });
  const [gone, setGone] = useState(false);

  const move = (to: Point, duration: number, smooth = false) => {
    const el = scope.current;
    pos.current = to;
    return Promise.all([
      animate(el, { x: to.x }, { duration, ease: smooth ? 'easeInOut' : EASE_X }),
      animate(el, { y: to.y }, { duration, ease: smooth ? 'easeInOut' : EASE_Y }),
    ]);
  };

  /* First appearance: come out of the toolbar */
  const ensureSpawned = async () => {
    if (pos.current && onScreen(pos.current)) return;
    pos.current = dockPoint();
    await animate(scope.current, { x: pos.current.x, y: pos.current.y, opacity: 0, scale: 0.6 }, { duration: 0 });
  };

  /* A layer was handed to this agent: travel, work on it, report back */
  useEffect(() => {
    if (!task || mode.current !== 'live' || !scope.current) return;
    /* Layers built off-screen (pre-built below, or skipped above) aren't worth chasing */
    if (task.y > window.scrollY + window.innerHeight - 40 || task.y + task.h < window.scrollY) return;
    let cancelled = false;
    busy.current = true;
    const [kind, target] = task.label.split(' / ');
    /* The finale takes over as soon as it starts */
    const live = () => !cancelled && mode.current === 'live';

    const run = async () => {
      const el = scope.current;
      await ensureSpawned();
      if (!live()) return;
      setStatus({ text: pick(copy.current.travel), target });
      animate(el, { opacity: 1, scale: 1 }, { duration: 0.25 });

      const to = {
        x: task.x + Math.min(task.w * 0.25, 60) + index * 14,
        y: task.y + Math.min(task.h * 0.35, 28) + index * 6,
      };
      await move(to, travelTime(pos.current!, to));
      if (!live()) return;

      /* Click, then drag a little across the layer as if placing it */
      setStatus({ text: pick(copy.current.work[kind] ?? copy.current.work.default), target });
      animate('svg', { scale: [1, 0.78, 1] }, { duration: 0.28, ease: 'easeOut' });
      const sweep = {
        x: to.x + Math.min(task.w * 0.35, 140),
        y: to.y + Math.min(task.h * 0.15, 16),
      };
      await sleep(120);
      await move(sweep, 0.7, true);
      if (!live()) return;

      setStatus({ text: pick(copy.current.done) });
      await sleep(800);
      if (live()) busy.current = false;
    };
    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  /* Between jobs, keep drifting around the page so the crew feels alive */
  useEffect(() => {
    let stop = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (stop) return;
      if (scope.current && pos.current && !busy.current && mode.current === 'live') {
        const to = wanderPoint(pos.current);
        setStatus({ text: pick(copy.current.idle) });
        animate(scope.current, { opacity: 1, scale: 1 }, { duration: 0.3 });
        move(to, 1.4 + Math.random() * 1.2, true);
      }
      timer = setTimeout(tick, 2600 + Math.random() * 2400);
    };
    timer = setTimeout(tick, 2500 + index * 900);
    return () => {
      stop = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Site built: gather around the "Send message" button, then vanish */
  useEffect(() => {
    if (!finished) return;
    let stop = false;
    let button: HTMLElement | null = null;

    const finale = async () => {
      await sleep(900 + index * 250);
      /* Wait until the button is actually on screen */
      while (!stop) {
        button = document.getElementById('send-message');
        const r = button?.getBoundingClientRect();
        if (r && r.top > 60 && r.bottom < window.innerHeight - 70) break;
        await sleep(400);
      }
      if (stop || !button || !scope.current) return;
      mode.current = 'finale';

      const el = scope.current;
      const r = button.getBoundingClientRect();
      const left = r.left + window.scrollX;
      const top = r.top + window.scrollY;
      const spots: Point[] = [
        { x: left - 28, y: top + r.height * 0.65 },
        { x: left + r.width * 0.45, y: top + r.height * 0.55 },
        { x: left + r.width - 6, y: top + r.height - 2 },
      ];
      const to = spots[index];

      await ensureSpawned();
      setStatus({ text: copy.current.finale[index] });
      animate(el, { opacity: 1, scale: 1 }, { duration: 0.25 });
      await move(to, travelTime(pos.current!, to));
      if (stop) return;

      /* Select the button like a layer in an editor */
      button.style.boxShadow = '0 0 0 2px #3d7bff';
      await sleep(350);
      await animate('svg', { scale: [1, 0.75, 1] }, { duration: 0.3 });
      await sleep(1800 + index * 250);
      if (stop) return;

      setStatus({ text: copy.current.bye });
      await sleep(700);
      if (index === agents.length - 1) button.style.boxShadow = '';
      await animate(el, { scale: 0.2, opacity: 0, y: to.y - 24 }, { duration: 0.45, ease: 'easeIn' });
      if (!stop) setGone(true);
    };
    finale();

    return () => {
      stop = true;
      if (button) button.style.boxShadow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  if (gone) return null;

  return (
    <div ref={scope} className="absolute left-0 top-0 origin-top-left" style={{ opacity: 0 }}>
      <svg
        width="18"
        height="20"
        viewBox="0 0 18 20"
        fill="none"
        className="origin-top-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
      >
        <path
          d="M1 1L16 9.5L9.2 11.3L5.8 18.5L1 1Z"
          fill={agent.color}
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      {status.text && (
        <span
          className="ml-3 mt-0.5 flex max-w-[260px] items-center gap-1.5 whitespace-nowrap rounded-[4px] px-1.5 py-[3px] font-mono text-[10px] leading-none text-white shadow-lg"
          style={{ backgroundColor: agent.color }}
        >
          <span className="font-bold">{agent.name}</span>
          <span key={status.text} className="truncate animate-[fadeIn_0.25s_ease-out]">
            {status.text}
            {status.target && <span className="text-white/60"> · {status.target}</span>}
          </span>
        </span>
      )}
    </div>
  );
}

/**
 * Multiplayer-style cursors that fly to each layer as it gets built,
 * drift around while idle and gather on the contact button at the end.
 * Positioned in document coordinates so they scroll with the page.
 */
export default function AgentCursors() {
  const { lastEvent, enabled, total, done } = useBuildState();
  const { language } = useContext(LanguageContext);
  const [tasks, setTasks] = useState<(BuildEvent | null)[]>(agents.map(() => null));
  const finished = total > 0 && done >= total;

  /* Hand each new layer to the next agent in turn */
  useEffect(() => {
    if (!lastEvent) return;
    const i = lastEvent.id % agents.length;
    setTasks((prev) => prev.map((t, j) => (j === i ? lastEvent : t)));
  }, [lastEvent]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-40 hidden md:block">
      {agents.map((a, i) => (
        <AgentCursor key={a.name} index={i} task={tasks[i]} finished={finished} language={language} />
      ))}
    </div>
  );
}
