'use client';

import { useContext } from 'react';
import { FaCompass, FaParachuteBox } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Reveal from '../Reveal';
import TiltCard from '../TiltCard';

export default function About() {
  const { language } = useContext(LanguageContext);
  const t = content[language].about;

  const interestIcons: Record<string, React.ElementType> = {
    thrill: FaParachuteBox,
    travel: FaCompass,
  };

  return (
    <section id="about" className="relative px-4 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            {t.subtitle}
          </p>
          <h2 className="section-title mt-2">
            <span className="text-gradient">{t.title}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Bio */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="glass h-full rounded-2xl p-6 md:p-8">
              {t.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-4 text-sm leading-relaxed text-gray-300 last:mb-0 md:text-base"
                >
                  {p}
                </p>
              ))}
              <div className="mt-8">
                <h3 className="mb-4 font-display text-lg font-semibold text-white">
                  {t.interestsTitle}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {t.interests.map((it) => {
                    const Icon = interestIcons[it.icon] ?? FaCompass;
                    return (
                      <TiltCard key={it.title}>
                        <div className="glass glass-hover h-full rounded-2xl p-4">
                          <Icon className="mb-2 text-2xl text-cyan-400" />
                          <h4 className="font-semibold text-white">
                            {it.title}
                          </h4>
                          <p className="mt-1 text-xs text-gray-400 md:text-sm">
                            {it.text}
                          </p>
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal direction="right" delay={0.15} className="lg:col-span-2">
            <div className="glass h-full rounded-2xl p-6 md:p-8">
              <h3 className="mb-6 font-display text-lg font-semibold text-white">
                {t.infoTitle}
              </h3>
              <ul className="space-y-4">
                {t.info.map((row) => (
                  <li
                    key={row.label}
                    className="flex flex-col border-b border-white/5 pb-3 last:border-0"
                  >
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      {row.label}
                    </span>
                    <span className="mt-0.5 text-sm text-gray-200 md:text-base">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
