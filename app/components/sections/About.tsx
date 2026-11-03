'use client';

import { useContext } from 'react';
import { FaCompass, FaParachuteBox } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import TypeText from '../build/TypeText';
import SectionHeader from './SectionHeader';

const interestIcons: Record<string, React.ElementType> = {
  thrill: FaParachuteBox,
  travel: FaCompass,
};

export default function About() {
  const { language } = useContext(LanguageContext);
  const t = content[language].about;
  const ui = content[language].ui;

  return (
    <section id="about" className="canvas-grid relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader index="03" eyebrow={ui.aboutEyebrow} lines={ui.aboutTitle} />

        {/* Stats */}
        <div className="grid grid-cols-3 border-y border-white/[0.08]">
          {ui.stats.map((s, i) => (
            <Build
              key={s.label}
              label={`Stat / ${s.label}`}
              delay={i * 0.15}
              className={i ? 'border-l border-white/[0.08]' : ''}
            >
              <div className="px-3 py-8 md:px-8 md:py-10">
                <p className="headline text-6xl text-white md:text-8xl">
                  {s.value}
                  <span className="text-accent">.</span>
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-white/50 md:text-xs">
                  {s.label}
                </p>
              </div>
            </Build>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Bio */}
          <div className="space-y-6 lg:col-span-7">
            {t.paragraphs.map((p, i) => (
              <Build key={i} label={`Text / Paragraph ${i + 1}`} delay={i * 0.2}>
                <p
                  className={
                    i === 0
                      ? 'text-lg leading-relaxed text-white md:text-2xl md:leading-snug'
                      : 'text-sm leading-relaxed text-white/50 md:text-base'
                  }
                >
                  <TypeText text={p} speed={12} />
                </p>
              </Build>
            ))}

            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {t.interests.map((it, i) => {
                const Icon = interestIcons[it.icon] ?? FaCompass;
                return (
                  <Build key={it.title} label={`Card / ${it.icon}`} delay={i * 0.15}>
                    <div className="h-full border border-white/[0.08] bg-ink-900/60 p-5">
                      <Icon className="mb-3 text-xl text-accent" />
                      <h3 className="font-semibold text-white">{it.title}</h3>
                      <p className="mt-1 text-sm text-white/50">{it.text}</p>
                    </div>
                  </Build>
                );
              })}
            </div>
          </div>

          {/* Info sheet */}
          <Build label="Table / Details" className="lg:col-span-5" delay={0.2}>
            <div className="border border-white/[0.08] bg-ink-900/60">
              <p className="eyebrow border-b border-white/[0.08] px-5 py-4">{t.infoTitle}</p>
              <dl>
                {t.info.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-white/[0.08] px-5 py-4 last:border-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Build>
        </div>
      </div>
    </section>
  );
}
