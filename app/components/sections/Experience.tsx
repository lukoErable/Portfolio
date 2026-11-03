'use client';

import { useCallback, useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import FyneriShowcase from './FyneriShowcase';
import SectionHeader from './SectionHeader';

const SHOWCASE_COMPANY = 'FYNERI LLC / TRIVIAN';

export default function Experience() {
  const { language } = useContext(LanguageContext);
  const t = content[language].experience;
  const ui = content[language].ui;
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const closeShowcase = useCallback(() => setShowcaseOpen(false), []);

  return (
    <>
      <section
        id="experience"
        className="relative overflow-hidden bg-gradient-to-br from-[#1a0a10] via-ink to-ink px-4 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Left: headline + education */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeader index="02" eyebrow={ui.journeyEyebrow} lines={ui.journeyTitle} />

              <p className="eyebrow mb-4">{t.eduTitle}</p>
              <div className="border-t border-white/[0.08]">
                {t.education.map((edu, i) => (
                  <Build key={edu.school} label={`Row / ${edu.period}`} delay={i * 0.12}>
                    <div className="flex items-baseline gap-4 border-b border-white/[0.08] py-4">
                      <span className="w-12 shrink-0 font-mono text-xs text-accent">
                        {edu.period}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{edu.school}</p>
                        <p className="mt-0.5 text-sm text-white/50">{edu.degree}</p>
                      </div>
                    </div>
                  </Build>
                ))}
              </div>
            </div>
          </div>

          {/* Right: work experience */}
          <div className="lg:col-span-7 lg:pt-2">
            <div className="mb-6 flex items-center justify-between">
              <p className="eyebrow">{ui.selectedJobs}</p>
              <p className="font-mono text-[11px] text-white/30">2020 — 2026</p>
            </div>
            <div className="border-t border-white/[0.08]">
              {t.jobs.map((job, i) => {
                const hasShowcase = job.company === SHOWCASE_COMPANY;
                return (
                  <Build key={job.company + job.period} label={`Row / ${job.company}`} delay={0.1}>
                    <article
                      className={`group relative border-b border-white/[0.08] py-8 transition-colors ${
                        hasShowcase
                          ? 'cursor-pointer hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent'
                          : ''
                      }`}
                      role={hasShowcase ? 'button' : undefined}
                      tabIndex={hasShowcase ? 0 : undefined}
                      aria-haspopup={hasShowcase ? 'dialog' : undefined}
                      onClick={hasShowcase ? () => setShowcaseOpen(true) : undefined}
                      onKeyDown={
                        hasShowcase
                          ? (e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setShowcaseOpen(true);
                              }
                            }
                          : undefined
                      }
                    >
                      <div className="flex items-start gap-4 md:gap-6">
                        <span className="mt-1 font-mono text-[11px] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                            <div>
                              <h3 className="headline text-3xl text-white md:text-4xl">
                                {job.company}
                              </h3>
                              <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
                                {job.role} · {job.location}
                              </p>
                            </div>
                            <span className="headline text-3xl text-accent md:text-4xl">
                              {job.period}
                            </span>
                          </div>
                          <ul className="mt-5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                            {job.points.map((p) => (
                              <li key={p} className="flex gap-2 text-[13px] leading-snug text-white/50">
                                <span className="mt-[7px] h-px w-2 shrink-0 bg-white/30" />
                                {p}
                              </li>
                            ))}
                          </ul>
                          {hasShowcase && (
                            <span className="mt-5 inline-flex items-center gap-2 border border-accent/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-accent-soft transition-colors group-hover:bg-accent group-hover:text-white">
                              {t.viewWork}
                              <FaArrowRight size={10} className="-rotate-45" />
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Build>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <FyneriShowcase open={showcaseOpen} onClose={closeShowcase} />
    </>
  );
}
