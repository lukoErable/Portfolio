'use client';

import { useContext } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiMysql } from 'react-icons/di';
import {
  FaCss3,
  FaGitAlt,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSwift,
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Reveal from '../Reveal';
import TiltCard from '../TiltCard';

const skills = [
  { icon: IoLogoJavascript, name: 'JavaScript', color: '#f7df1e' },
  { icon: BiLogoTypescript, name: 'TypeScript', color: '#3178c6' },
  { icon: FaReact, name: 'React', color: '#61dafb' },
  { icon: RiNextjsLine, name: 'Next.js', color: '#ffffff' },
  { icon: FaNodeJs, name: 'Node.js', color: '#68a063' },
  { icon: FaPython, name: 'Python', color: '#ffd343' },
  { icon: FaSwift, name: 'Swift / iOS', color: '#f05138' },
  { icon: FaHtml5, name: 'HTML5', color: '#e34c26' },
  { icon: FaCss3, name: 'CSS3', color: '#264de4' },
  { icon: RiTailwindCssFill, name: 'Tailwind', color: '#38bdf8' },
  { icon: DiMysql, name: 'SQL', color: '#00758f' },
  { icon: FaGitAlt, name: 'Git', color: '#f05033' },
];

export default function Skills() {
  const { language } = useContext(LanguageContext);
  const t = content[language].skills;

  return (
    <section id="skills" className="relative px-4 py-24 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="section-title">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <p className="mt-3 text-sm text-gray-400 md:text-base">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 4) * 0.08}>
              <TiltCard maxTilt={12}>
                <div className="glass glass-hover group flex flex-col items-center gap-3 rounded-2xl p-6">
                  <skill.icon
                    className="text-4xl transition-all duration-300 group-hover:scale-110 md:text-5xl"
                    style={{ color: skill.color }}
                  />
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                    {skill.name}
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
