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

/* A layer that just got built: where it sits on the page and what it is */
export type BuildEvent = {
  id: number;
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
  built: (label: string, el: HTMLElement) => void;
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
      built: (label, el) => {
        const rect = el.getBoundingClientRect();
        setDone((n) => n + 1);
        setLastEvent({
          id: nextId.current++,
          label,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          w: rect.width,
          h: rect.height,
        });
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
