'use client';

import { useContext } from 'react';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import Stack from './components/sections/Stack';
import Work from './components/sections/Work';
import { content } from './data/content';
import { LanguageContext } from './contexts/LanguageContext';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const t = content[language].footer;

  return (
    <main>
      <Hero />
      <Work />
      <Stack />
      <Experience />
      <About />
      <Contact />
      <footer className="border-t border-white/[0.08] px-4 pb-24 pt-10 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="headline text-[18vw] leading-none text-white/[0.06] md:text-[9vw] xl:text-[130px]">
            Lucas Fabregoule
          </p>
          <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 md:text-right">
            <p>{t.madeWith}</p>
            <p className="mt-1">
              © {new Date().getFullYear()} — {t.rights}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
