'use client';

import { useContext } from 'react';
import About from './components/sections/About';
import Contact from './components/sections/Contact';
import Experience from './components/sections/Experience';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import { content } from './data/content';
import { LanguageContext } from './contexts/LanguageContext';

export default function Home() {
  const { language } = useContext(LanguageContext);
  const t = content[language].footer;

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <footer className="border-t border-white/5 px-4 py-8 text-center text-xs text-gray-500">
        <p>{t.madeWith}</p>
        <p className="mt-1">
          © {new Date().getFullYear()} Lucas Fabregoule — {t.rights}
        </p>
      </footer>
    </main>
  );
}
