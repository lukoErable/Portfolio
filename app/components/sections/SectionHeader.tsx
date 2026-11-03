'use client';

import Build from '../build/Build';
import TypeText from '../build/TypeText';

/* Mono eyebrow + two-line condensed headline (second line in red) */
export default function SectionHeader({
  index,
  eyebrow,
  lines,
  aside,
}: {
  index: string;
  eyebrow: string;
  lines: readonly string[];
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
      <div>
        <Build label={`Text / ${index}`} frame={false}>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-accent">{index}</span>
            <span className="h-px w-8 bg-white/20" />
            <TypeText text={eyebrow} />
          </p>
        </Build>
        <h2 className="headline text-[15vw] sm:text-7xl lg:text-8xl">
          <Build label="Heading / Line 1" delay={0.1}>
            <span className="block text-white">{lines[0]}</span>
          </Build>
          <Build label="Heading / Line 2" delay={0.35}>
            <span className="block text-accent">{lines[1]}</span>
          </Build>
        </h2>
      </div>
      {aside}
    </div>
  );
}
