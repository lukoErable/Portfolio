'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { agents } from './agents';

/* Head start given to a cursor so it lands on a block before its frame shows */
export const CURSOR_LEAD_MS = 380;
/* How long an agent stays on one block before it can take the next */
const AGENT_SLOT_MS = 620;

/* A layer that just got built: where it sits on the page and what it is */
export type BuildEvent = {
  id: number;
  /* Which agent cursor takes the job */
  agent: number;
  label: string;
  /* Document coordinates (scroll offset included) */
  x: number;
  y: number;
  w: number;
  h: number;
};

type BuildActions = {
  enabled: boolean;
  register: () => void;
  unregister: () => void;
  /* A block wants to be built: books an agent cursor and returns how many
     ms to wait so that cursor is already on the block when it appears */
  claim: (label: string, el: HTMLElement) => number;
  /* A block finished appearing: count it */
  built: () => void;
};

type BuildState = {
  total: number;
  done: number;
  lastEvent: BuildEvent | null;
  enabled: boolean;
  toggle: () => void;
};

/* Actions (and the on/off flag) live apart from the counters so that
   every Build block doesn't re-render each time a layer gets built */
const ActionsContext = createContext<BuildActions>({
  enabled: false,
  register: () => {},
  unregister: () => {},
  claim: () => 0,
  built: () => {},
});

const StateContext = createContext<BuildState>({
  total: 0,
  done: 0,
  lastEvent: null,
  enabled: false,
  toggle: () => {},
});

export function BuildProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [lastEvent, setLastEvent] = useState<BuildEvent | null>(null);
  const [enabled, setEnabled] = useState(true);
  const nextId = useRef(0);
  /* When each agent is free again (performance.now() timestamps) */
  const agentFreeAt = useRef<number[]>(agents.map(() => 0));

  /* Respect reduced motion, and remember a visitor's choice */
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('build-fx');
    } catch {}
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (stored === 'off' || (stored === null && reduced)) setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      try {
        localStorage.setItem('build-fx', prev ? 'off' : 'on');
      } catch {}
      return !prev;
    });
  }, []);

  const actions = useMemo<BuildActions>(
    () => ({
      enabled,
      register: () => setTotal((n) => n + 1),
      unregister: () => setTotal((n) => Math.max(0, n - 1)),
      built: () => setDone((n) => n + 1),
      claim: (label, el) => {
        const rect = el.getBoundingClientRect();
        const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
        /* No cursors on small screens, and none for blocks scrolled past */
        if (!window.matchMedia('(min-width: 768px)').matches || !onScreen) return 0;

        /* Book whichever agent frees up first; the block waits its turn */
        const free = agentFreeAt.current;
        const agent = free.indexOf(Math.min(...free));
        const now = performance.now();
        const startAt = Math.max(now, free[agent]);
        free[agent] = startAt + AGENT_SLOT_MS;
        const wait = startAt - now;

        setTimeout(() => {
          const r = el.getBoundingClientRect();
          setLastEvent({
            id: nextId.current++,
            agent,
            label,
            x: r.left + window.scrollX,
            y: r.top + window.scrollY,
            w: r.width,
            h: r.height,
          });
        }, wait);
        return wait + CURSOR_LEAD_MS;
      },
    }),
    [enabled],
  );

  const state = useMemo(
    () => ({ total, done, lastEvent, enabled, toggle }),
    [total, done, lastEvent, enabled, toggle],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ActionsContext.Provider>
  );
}

export const useBuildActions = () => useContext(ActionsContext);
export const useBuildState = () => useContext(StateContext);
