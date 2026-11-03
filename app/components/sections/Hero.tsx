'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { HiArrowDown, HiOutlineDownload } from 'react-icons/hi';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import TypeText from '../build/TypeText';

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

export default function Hero() {
  const { language } = useContext(LanguageContext);
  const t = content[language].hero;
  const ui = content[language].ui;

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

  return (
    <section
      id="home"
      className="canvas-grid relative min-h-screen overflow-hidden px-4 pb-20 pt-24 md:px-8 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Top meta row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:mb-8">
          <Build label="Text / Kicker" delay={0.2}>
            <p className="eyebrow">
              <TypeText text={ui.kicker} />
            </p>
          </Build>
          <Build label="Badge / Status" delay={0.5}>
            <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {ui.available}
            </span>
          </Build>
        </div>

        <h1 className="sr-only">Lucas Fabregoule — {t.roles[0]}</h1>

        <div className="grid items-end gap-y-0 lg:grid-cols-12 lg:gap-x-8">
          {/* Portrait: the centrepiece, on the right on desktop */}
          <Build
            label="Image / Portrait"
            delay={0.8}
            className="relative z-0 mx-auto w-full max-w-[280px] lg:order-2 lg:col-span-4 lg:max-w-[330px] lg:justify-self-end"
          >
            <figure className="group relative pb-3 pr-3">
              {/* Red block offset behind the photo */}
              <span className="absolute bottom-0 right-0 h-[calc(100%-12px)] w-[calc(100%-12px)] bg-accent transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative aspect-[4/5] overflow-hidden bg-ink-800 lg:max-h-[calc(100vh-300px)]">
                <Image
                  src="/pp.png"
                  alt="Lucas Fabregoule"
                  fill
                  sizes="(max-width: 1024px) 280px, 330px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-sm">
                  Portrait — 2026
                </span>
                <figcaption className="absolute inset-x-3 bottom-3 hidden items-end justify-between lg:flex font-mono text-[10px] uppercase tracking-wider text-white/80">
                  <span>{t.roles[0]}</span>
                  <span className="text-accent-soft">●&nbsp;Taïwan</span>
                </figcaption>
              </div>
            </figure>
          </Build>

          {/* Giant name, overlapping the photo */}
          <div
            aria-hidden
            className="relative z-10 -mt-[10vw] lg:order-1 lg:col-span-8 lg:mt-0 lg:pb-6"
          >
            <Build label="Heading / Line 1" delay={1.1}>
              <span className="headline block text-[24vw] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] lg:text-[11vw] xl:text-[160px]">
                Lucas
              </span>
            </Build>
            <Build label="Heading / Line 2" delay={1.3}>
              <span className="headline block whitespace-nowrap text-[18.5vw] text-accent drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)] lg:-mr-[30%] lg:text-[11vw] xl:text-[160px]">
                Fabregoule.
              </span>
            </Build>
          </div>
        </div>

        {/* Details row */}
        <div className="mt-10 grid gap-10 border-t border-white/[0.08] pt-8 md:grid-cols-12 md:gap-8">
          <Build label="Text / Bio" delay={1.6} className="md:col-span-5">
            <p className="text-sm leading-relaxed text-white/60 md:text-base">
              <TypeText text={t.description} speed={14} />
            </p>
          </Build>

          <Build label="List / Roles" delay={1.9} className="md:col-span-3">
            <ul className="space-y-2">
              {t.roles.map((role, i) => (
                <li key={role} className="flex gap-3 text-sm text-white/80">
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  {role}
                </li>
              ))}
            </ul>
          </Build>

          <Build label="Group / Actions" delay={2.2} className="md:col-span-4">
            <div className="flex flex-col gap-3 md:items-end">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownload}
                  className="group flex items-center gap-2 bg-accent px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-ink"
                >
                  {t.downloadCV}
                  <HiOutlineDownload className="transition-transform group-hover:translate-y-0.5" />
                </button>
                <a
                  href="#contact"
                  className="border border-white/20 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white"
                >
                  {t.contactMe}
                </a>
              </div>
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-accent hover:text-accent"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </Build>
        </div>

        <a
          href="#work"
          className="mt-14 flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          <HiArrowDown className="animate-bounce text-accent" />
          {t.scroll}
        </a>
      </div>
    </section>
  );
}
