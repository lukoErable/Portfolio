'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { content } from '../data/content';
import { LanguageContext } from '../contexts/LanguageContext';

const sections = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  const t = content[language].nav;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 to-violet-500"
      />

      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <div className="flex items-center gap-4">
          <a href="#home" className="flex items-end gap-1.5">
            <span className="font-display text-2xl font-bold text-white">
              Lucas
            </span>
            <span className="mb-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </a>
          <button
            onClick={toggleLanguage}
            className="chip cursor-pointer font-semibold transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {sections.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative text-sm font-medium transition-colors ${
                active === id ? 'text-cyan-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t[key]}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 to-violet-500"
                />
              )}
            </a>
          ))}
        </div>

        <button
          className="text-gray-200 md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <FaBars size={22} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-72 border-l border-white/10 bg-[#0a0514]/95 p-6 transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute right-4 top-4 text-gray-300"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer le menu"
          >
            <FaTimes size={22} />
          </button>
          <div className="mt-14 flex flex-col gap-5">
            {sections.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium ${
                  active === id ? 'text-gradient' : 'text-gray-300'
                }`}
              >
                {t[key]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
