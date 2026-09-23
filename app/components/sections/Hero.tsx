'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import {
  FaAppStoreIos,
  FaChrome,
  FaDumbbell,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaSeedling,
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';

function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const speed = deleting ? 35 : 75;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="caret text-gradient font-semibold">{text || ' '}</span>
  );
}

/* Project cards dealt onto the screen like a fanned deck */
const projectIcons: Record<string, React.ElementType> = {
  globe: FaGlobe,
  chrome: FaChrome,
  appstore: FaAppStoreIos,
  dumbbell: FaDumbbell,
  seedling: FaSeedling,
};

function ProjectShowcase() {
  const { language } = useContext(LanguageContext);
  const t = content[language].projects;
  const projects = t.items;
  const mid = (projects.length - 1) / 2;

  return (
    <div className="mt-16">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6 text-center text-xs uppercase tracking-[0.35em] text-gray-500"
      >
        {t.title}
      </motion.p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {projects.map((project, i) => {
          const Icon = projectIcons[project.icon] ?? FaGlobe;
          const Card = project.link ? motion.a : motion.div;
          const fan = (i - mid) * 1.2;
          return (
            /* Outer layer: entrance animation only (staggered delay).
               Hover lives on the inner layer so leaving the card snaps
               back instantly instead of re-waiting the entrance delay. */
            <Card
              key={project.title}
              {...(project.link
                ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {})}
              initial={{
                opacity: 0,
                y: 180,
                scale: 0.5,
                rotate: i % 2 === 0 ? -12 : 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: fan,
              }}
              whileHover={{ zIndex: 20 }}
              transition={{
                type: 'spring',
                stiffness: 85,
                damping: 14,
                delay: 0.9 + i * 0.18,
              }}
              className="block h-full cursor-pointer"
            >
            <motion.div
              whileHover={{ y: -8, scale: 1.04, rotate: -fan, zIndex: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              className="group relative flex h-56 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md transition-colors hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]"
            >
              {/* Visual header */}
              <div className="relative flex h-20 shrink-0 items-center justify-center bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-violet-600/25">
                <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.25),transparent_55%)]" />
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={56}
                    height={56}
                    className="relative h-14 w-14 rounded-xl object-contain drop-shadow-[0_0_18px_rgba(34,211,238,0.25)] transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Icon className="relative text-4xl text-cyan-300/80 drop-shadow-[0_0_18px_rgba(34,211,238,0.5)] transition-transform duration-500 group-hover:scale-110" />
                )}
                <span className="absolute right-3 top-3 text-gray-500 transition-all duration-300 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  {project.link && <FaArrowUpRightFromSquare size={13} />}
                </span>
              </div>

              {/* Details */}
              <div className="relative min-h-0 flex-1 p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="truncate font-display text-base font-bold text-white">
                    {project.title}
                  </h3>
                  <span className="shrink-0 text-[10px] font-medium text-cyan-400/80">
                    {project.domain}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-gray-400 group-hover:line-clamp-4">
                  {project.text}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 z-10 rounded-b-2xl bg-slate-950/95 p-3 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="truncate font-display text-base font-bold text-white">
                      {project.title}
                    </h3>
                    <span className="shrink-0 text-[10px] font-medium text-cyan-400/80">
                      {project.domain}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-5 text-xs leading-relaxed text-gray-300">
                    {project.text}
                  </p>
                </div>
              </div>
            </motion.div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function Hero() {
  const { language } = useContext(LanguageContext);
  const t = content[language].hero;

  const handleDownload = () => {
    const link = document.createElement('a');
    const isEnglish = language === 'en';
    link.href = isEnglish ? '/cv-en.pdf' : '/cv.pdf';
    link.setAttribute(
      'download',
      isEnglish ? 'CV-Lucas-Fabregoule-EN.pdf' : 'CV-Lucas-Fabregoule.pdf',
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const socials = [
    { icon: FaGithub, href: 'https://github.com/lukoErable', label: 'GitHub' },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/lucas-fabregoule-640873274',
      label: 'LinkedIn',
    },
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/lucas_fbg/',
      label: 'Instagram',
    },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-4 pt-24 md:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:justify-between">
          {/* Text */}
          <div className="w-full text-center md:w-3/5 md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm uppercase tracking-[0.3em] text-cyan-400"
            >
              {t.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
            >
              Lucas{' '}
              <span className="text-gradient drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                Fabregoule
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-4 h-8 text-lg md:text-2xl"
            >
              <Typewriter words={t.roles} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-gray-400 md:mx-0 md:text-base"
            >
              {t.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
            >
              <button
                onClick={handleDownload}
                className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-transform hover:scale-105"
              >
                {t.downloadCV}
                <HiOutlineDownload
                  size={20}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </button>
              <a
                href="#contact"
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-gray-200 transition-all hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                {t.contactMe}
              </a>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="glass rounded-full p-3 text-gray-300 transition-all hover:-translate-y-1 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex w-full justify-center md:w-2/5"
          >
            <div className="relative h-56 w-56 md:h-72 md:w-72">
              <div className="absolute -inset-3 rounded-full border border-dashed border-cyan-400/50 animate-spin-slow" />
              <div className="absolute -inset-7 rounded-full border border-violet-500/30 animate-spin-slower" />
              <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-cyan-500/20 to-violet-600/20 blur-2xl animate-pulse-glow" />
              <Image
                src="/pp.png"
                alt="Photo de Lucas Fabregoule"
                fill
                sizes="(max-width: 768px) 224px, 288px"
                className="relative z-10 rounded-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Projects dealt in like a deck of cards */}
        <ProjectShowcase />

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mx-auto mt-12 flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-cyan-300"
        >
          {t.scroll}
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="block h-8 w-[1px] bg-gradient-to-b from-cyan-400 to-transparent"
          />
        </motion.a>
      </div>
    </section>
  );
}
