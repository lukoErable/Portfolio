'use client';

import { useContext } from 'react';
import { BiLogoTypescript } from 'react-icons/bi';
import {
  FaCode,
  FaKey,
  FaNodeJs,
  FaPython,
  FaReact,
  FaRobot,
  FaSwift,
} from 'react-icons/fa';
import { IoLogoJavascript } from 'react-icons/io5';
import { RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri';
import {
  SiDocker,
  SiGithub,
  SiPostgresql,
  SiRailway,
  SiShopify,
  SiStripe,
  SiWoocommerce,
} from 'react-icons/si';
import { content } from '../../data/content';
import { LanguageContext } from '../../contexts/LanguageContext';
import Build from '../build/Build';
import TypeText from '../build/TypeText';

type Tool = {
  icon: React.ElementType;
  name: string;
  kind: string;
  color: string;
  /* Some logos are wide wordmarks and need more room to read */
  iconSize?: number;
};

const rows: Tool[][] = [
  [
    { icon: IoLogoJavascript, name: 'JavaScript', kind: 'Language', color: '#f7df1e' },
    { icon: BiLogoTypescript, name: 'TypeScript', kind: 'Language', color: '#3178c6' },
    { icon: FaReact, name: 'React', kind: 'Frontend', color: '#61dafb' },
    { icon: RiNextjsLine, name: 'Next.js', kind: 'Framework', color: '#ffffff' },
    { icon: FaNodeJs, name: 'Node.js', kind: 'Backend', color: '#68a063' },
    { icon: FaPython, name: 'Python', kind: 'Backend', color: '#ffd343' },
    { icon: FaSwift, name: 'Swift', kind: 'iOS', color: '#f05138' },
    { icon: SiPostgresql, name: 'PostgreSQL', kind: 'Database', color: '#4f86e8' },
    { icon: RiTailwindCssFill, name: 'Tailwind', kind: 'Styling', color: '#38bdf8' },
  ],
  [
    { icon: SiShopify, name: 'Shopify', kind: 'E-commerce', color: '#95bf47' },
    { icon: SiWoocommerce, name: 'WooCommerce', kind: 'E-commerce', color: '#a46ad1', iconSize: 30 },
    { icon: SiStripe, name: 'Stripe', kind: 'Payments & Billing', color: '#7a73ff' },
    { icon: FaCode, name: 'REST / Webhooks', kind: 'API', color: '#a78bfa' },
    { icon: FaKey, name: 'OAuth', kind: 'Auth', color: '#fbbf24' },
    { icon: SiGithub, name: 'GitHub', kind: 'Git', color: '#ffffff' },
    { icon: SiRailway, name: 'Railway', kind: 'Hosting', color: '#ffffff' },
    { icon: SiDocker, name: 'Docker', kind: 'Containers', color: '#2496ed' },
    { icon: FaRobot, name: 'AI tools', kind: 'Workflow', color: '#c084fc' },
  ],
];

const toolCount = rows.flat().length;

/* Editorial cell: hairline borders, mono index, condensed name,
   monochrome logo that takes its brand colour on hover */
function ToolChip({ tool, index, hidden }: { tool: Tool; index: number; hidden: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="group/chip relative flex shrink-0 items-center gap-4 border-r border-white/[0.08] px-6 py-5 transition-colors duration-300 hover:bg-white/[0.03] md:px-8"
      style={{ ['--c' as string]: tool.color }}
    >
      <span className="absolute left-2 top-2 font-mono text-[9px] text-accent/70">
        {String(index + 1).padStart(2, '0')}
      </span>
      <tool.icon
        size={(tool.iconSize ?? 22) + 4}
        className="shrink-0 text-white/35 transition-colors duration-300 group-hover/chip:text-[color:var(--c)]"
      />
      <span className="flex flex-col">
        <span className="headline whitespace-nowrap text-2xl text-white/80 transition-colors duration-300 group-hover/chip:text-white md:text-3xl">
          {tool.name}
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          {tool.kind}
        </span>
      </span>
      {/* Red underline sweeping in, like the project cards */}
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover/chip:scale-x-100" />
    </div>
  );
}

export default function Stack() {
  const { language } = useContext(LanguageContext);
  const ui = content[language].ui;

  return (
    <section
      id="stack"
      className="relative overflow-hidden border-y border-white/[0.08] bg-ink-900 py-12 md:py-14"
    >
      <div className="relative mx-auto mb-8 flex w-full max-w-7xl flex-wrap items-end justify-between gap-4 px-4 md:px-8">
        <Build label="Text / Stack" frame={false}>
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <TypeText text={ui.stackEyebrow} />
          </p>
          <h2 className="headline text-4xl text-white md:text-5xl">
            {ui.stackTitle}
          </h2>
        </Build>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          <span className="text-white">{String(toolCount).padStart(2, '0')}</span> {language === 'fr' ? 'outils' : 'tools'}
        </p>
      </div>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {rows.map((row, r) => (
          <Build
            key={r}
            label={`Marquee / Row ${r + 1}`}
            delay={r * 0.25}
            frame={false}
            className={`border-white/[0.08] ${r ? 'border-b' : 'border-y'}`}
          >
            <div
              className={`flex w-max hover:[animation-play-state:paused] ${
                r % 2 ? 'animate-[marquee_55s_linear_infinite_reverse]' : 'animate-[marquee_45s_linear_infinite]'
              }`}
            >
              {[...row, ...row].map((tool, i) => (
                <ToolChip
                  key={tool.name + i}
                  tool={tool}
                  index={r * rows[0].length + (i % row.length)}
                  hidden={i >= row.length}
                />
              ))}
            </div>
          </Build>
        ))}
      </div>
    </section>
  );
}
