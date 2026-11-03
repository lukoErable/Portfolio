'use client';

import { useEffect, useState } from 'react';

/**
 * True once the element has entered the viewport (native IntersectionObserver),
 * or once it has been scrolled past — jumping down with a nav link skips
 * blocks entirely, and they should still count as built.
 */
export default function useInViewOnce(
  ref: React.RefObject<Element>,
  rootMargin = '0px 0px -12% 0px',
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const passed = () => el.getBoundingClientRect().bottom < 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) || passed()) setInView(true);
      },
      { rootMargin },
    );
    const onScroll = () => {
      if (passed()) setInView(true);
    };
    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, rootMargin, inView]);

  return inView;
}
