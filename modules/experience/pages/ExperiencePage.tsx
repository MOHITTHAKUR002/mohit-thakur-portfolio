import React from 'react';
import { motion } from 'framer-motion';
import experienceData from '@/content/experience.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { AnimatedCard } from '@shared/ui/AnimatedCard/AnimatedCard';

export const ExperiencePage: React.FC = () => {
  const { metadata, content } = experienceData as { metadata: { title: string; subtitle: string }; content: string };

  const timeline = content.split('## ').filter(Boolean).map((section: string) => {
    const lines = section.trim().split('\n');
    const titleMatch = lines[0].match(/(.*?)\s*\((.*?)\)/);

    return {
      title: titleMatch ? titleMatch[1].trim() : lines[0].trim(),
      date: titleMatch ? titleMatch[2].trim() : '',
      desc: lines.slice(1).join('\n').trim()
    };
  });

  return (
    <SectionWrapper id="experience" className="py-s-80 min-h-screen">
      <div className="w-full max-w-s-900 mx-auto flex flex-col gap-s-60 px-s-20 md:px-0">
        <div className="text-center">
          <h2 className="text-s-40 md:text-s-60 font-black tracking-tighter mb-s-16 uppercase italic">
            {metadata.title.replace(' ', '_')}
          </h2>
          <p className="text-s-14 md:text-s-18 font-mono text-text-secondary opacity-60">
            {"> "} {metadata.subtitle}
          </p>
        </div>

        <div className="relative border-l-s-2 border-brand-primary-20 ml-s-20 md:ml-s-0 py-s-20 px-s-20 md:px-0">
          {timeline.map((item: { title: string; date: string; desc: string }, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 * idx }}
              className="relative mb-s-60 last:mb-0 md:ml-s-60"
            >
              {/* Timeline marker - Fluidly scaled and positioned */}
              <div className="absolute -left-s-40 md:-left-s-60 top-s-12 w-s-20 h-s-20 rounded-full bg-bg-page border-s-4 border-brand-primary shadow-[0_0_calc(var(--1)*15)_var(--brand-primary-40)] z-10 -translate-x-[calc(var(--1)*11)] md:-translate-x-[calc(var(--1)*11)] animate-roadmap-pulse"></div>

              <AnimatedCard className="p-0 border-none bg-transparent shadow-none group">
                <div className="relative p-s-30 md:p-s-40 bg-bg-surface dark:bg-bg-elevated backdrop-blur-md border border-brand-primary-10 group-hover:border-brand-primary-30 rounded-s-30 transition-all duration-500 overflow-hidden shadow-s-md">
                  {/* Inner Scanline */}
                  <div className="absolute top-0 left-0 w-full h-s-2 bg-brand-primary opacity-20 pointer-events-none animate-scanline" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-s-16 mb-s-20">
                    <h3 className="text-s-20 md:text-s-28 font-black text-text-primary uppercase italic tracking-tight">{item.title}</h3>
                    <span className="text-s-11 md:text-s-12 font-mono font-bold text-brand-primary bg-brand-primary-10 border border-brand-primary-30 px-s-16 py-s-6 rounded-full w-fit whitespace-nowrap shadow-s-sm">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-s-14 md:text-s-16 text-text-secondary leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>

                  {/* Tech Link Marker */}
                  <div className="mt-s-20 pt-s-20 border-t border-brand-primary-10 flex items-center gap-s-10 text-s-10 font-mono text-brand-primary-40">
                    <span className="w-s-8 h-s-1 bg-brand-primary-40" />
                    STATUS: RECORDED_IN_LEDGER_0x{idx}
                    <span className="w-s-8 h-s-1 bg-brand-primary-40" />
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
