'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';
import { content } from '../data/content';
import { LanguageContext } from '../contexts/LanguageContext';

const sections = [
  { id: 'work', key: 'projects' },
  { id: 'experience', key: 'experience' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
] as const;

export default function Navbar() {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const t = content[language].nav;
  const ui = content[language].ui;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ['home', ...sections.map((s) => s.id)].forEach((id) => {
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
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled ? 'border-white/[0.08] bg-ink/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-accent"
      />

      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <a href="#home" className="flex items-start gap-1">
          <span className="font-display text-2xl uppercase tracking-tight text-white">
            Lucas
          </span>
          <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {sections.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm transition-colors ${
                active === id ? 'text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              {active === id && <span className="mr-1.5 text-accent">●</span>}
              {t[key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs text-white/50 transition-colors hover:text-white"
            aria-label="Changer de langue"
          >
            <span className={language === 'fr' ? 'text-white' : ''}>FR</span>
            <span className="mx-1 text-white/20">/</span>
            <span className={language === 'en' ? 'text-white' : ''}>EN</span>
          </button>
          <a
            href="#contact"
            className="group hidden items-center gap-2 text-sm font-medium text-white md:flex"
          >
            {ui.letsTalk}
            <FaArrowRight
              size={11}
              className="-rotate-45 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <button
            className="text-white md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <FaBars size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-ink transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          className="absolute right-4 top-4 text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Fermer le menu"
        >
          <FaTimes size={22} />
        </button>
        <div className="flex h-full flex-col justify-center gap-2 px-6">
          {sections.map(({ id, key }, i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsOpen(false)}
              className="headline flex items-baseline gap-4 text-6xl text-white"
            >
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              {t[key]}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
