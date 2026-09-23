'use client';

import { useCallback, useContext, useState } from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Reveal from '../Reveal';
import FyneriShowcase from './FyneriShowcase';

function TimelineItem({
  period,
  title,
  subtitle,
  location,
  points,
  text,
  index,
  onClick,
  actionLabel,
}: {
  period: string;
  title: string;
  subtitle: string;
  location?: string;
  points?: string[];
  text?: string;
  index: number;
  onClick?: () => void;
  actionLabel?: string;
}) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-8 md:pl-10">
      {/* Line + dot */}
      <span className="absolute left-0 top-1 h-full w-[2px] bg-gradient-to-b from-cyan-400/60 via-violet-500/30 to-transparent" />
      <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

      <div
        className={`glass glass-hover mb-10 rounded-2xl p-5 md:p-6 ${onClick ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70' : ''}`}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        } : undefined}
        aria-haspopup={onClick ? 'dialog' : undefined}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="chip border-cyan-400/30 text-cyan-300">
            {period}
          </span>
          {location && <span className="chip">{location}</span>}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold text-white md:text-xl">
          {title}
        </h3>
        <p className="text-sm font-medium text-gradient">{subtitle}</p>
        {points && (
          <ul className="mt-3 space-y-1.5">
            {points.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-gray-400 md:text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                {p}
              </li>
            ))}
          </ul>
        )}
        {text && (
          <p className="mt-3 text-xs leading-relaxed text-gray-400 md:text-sm">
            {text}
          </p>
        )}
        {actionLabel && (
          <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3 text-xs font-medium text-cyan-300">
            <span>{actionLabel}</span>
            <FaArrowUpRightFromSquare size={12} />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const { language } = useContext(LanguageContext);
  const t = content[language].experience;
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const closeShowcase = useCallback(() => setShowcaseOpen(false), []);

  return (
    <>
    <section id="experience" className="relative px-4 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="section-title">
            <span className="text-gradient">{t.title}</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="glass rounded-xl p-3 text-cyan-400">
                  <FaBriefcase size={20} />
                </span>
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {t.workTitle}
                </h3>
              </div>
            </Reveal>
            {t.jobs.map((job, i) => (
              <TimelineItem
                key={job.company + job.period}
                period={job.period}
                title={job.company}
                subtitle={job.role}
                location={job.location}
                points={job.points}
                index={i}
                onClick={job.company === 'FYNERI LLC / TRIVIAN' ? () => setShowcaseOpen(true) : undefined}
                actionLabel={job.company === 'FYNERI LLC / TRIVIAN' ? t.viewWork : undefined}
              />
            ))}
          </div>

          <div>
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="glass rounded-xl p-3 text-violet-400">
                  <FaGraduationCap size={22} />
                </span>
                <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                  {t.eduTitle}
                </h3>
              </div>
            </Reveal>
            {t.education.map((edu, i) => (
              <TimelineItem
                key={edu.school}
                period={edu.period}
                title={edu.school}
                subtitle={edu.degree}
                text={edu.text}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    <FyneriShowcase open={showcaseOpen} onClose={closeShowcase} />
    </>
  );
}
