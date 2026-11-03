'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import SectionHeader from './SectionHeader';

export default function Work() {
  const { language } = useContext(LanguageContext);
  const projects = content[language].projects.items;
  const ui = content[language].ui;

  return (
    <section id="work" className="relative px-4 pb-14 pt-24 md:px-8 md:pb-16 md:pt-32">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeader
          index="01"
          eyebrow={ui.workEyebrow}
          lines={ui.workTitle}
          aside={
            <span className="font-mono text-sm text-white/40">
              ({String(projects.length).padStart(2, '0')})
            </span>
          }
        />

        <div className="grid border-l border-t border-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const Tag = project.link ? 'a' : 'div';
            return (
              <Build
                key={project.title}
                label={`Card / ${project.title}`}
                delay={(i % 3) * 0.15}
                className="border-b border-r border-white/[0.08]"
              >
                <Tag
                  {...(project.link
                    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group relative flex h-full flex-col gap-6 overflow-hidden p-6 transition-colors hover:bg-white/[0.025] md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="headline text-5xl text-accent md:text-6xl">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="pt-1">
                        <h3 className="headline text-2xl text-white md:text-3xl">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-white/40">
                          {project.domain} / {project.tags[0]}
                        </p>
                      </div>
                    </div>
                    {project.link ? (
                      <FaArrowRight
                        className="mt-2 shrink-0 -rotate-45 text-white/40 transition-all duration-300 group-hover:rotate-0 group-hover:text-accent"
                        aria-label={ui.visit}
                      />
                    ) : (
                      <span className="mt-1 shrink-0 font-mono text-[10px] uppercase text-white/30">
                        {ui.private}
                      </span>
                    )}
                  </div>

                  <div className="flex items-end gap-4">
                    <p className="flex-1 text-sm leading-relaxed text-white/50 transition-colors group-hover:text-white/80">
                      {project.text}
                    </p>
                    {project.logo && (
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={52}
                        height={52}
                        className="h-[52px] w-[52px] shrink-0 rounded-xl object-contain grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      />
                    )}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Red underline sweeping in on hover */}
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                </Tag>
              </Build>
            );
          })}
        </div>
      </div>
    </section>
  );
}
