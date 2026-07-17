'use client';

import { useContext } from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Reveal from '../Reveal';

function TimelineItem({
  period,
  title,
  subtitle,
  location,
  points,
  text,
  index,
}: {
  period: string;
  title: string;
  subtitle: string;
  location?: string;
  points?: string[];
  text?: string;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.1} className="relative pl-8 md:pl-10">
      {/* Line + dot */}
      <span className="absolute left-0 top-1 h-full w-[2px] bg-gradient-to-b from-cyan-400/60 via-violet-500/30 to-transparent" />
      <span className="absolute -left-[5px] top-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

      <div className="glass glass-hover mb-10 rounded-2xl p-5 md:p-6">
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
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const { language } = useContext(LanguageContext);
  const t = content[language].experience;

  return (
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
  );
}
