import React from 'react';
import { motion } from 'framer-motion';
import projectsData from '@/content/projects.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { AnimatedCard } from '@shared/ui/AnimatedCard/AnimatedCard';
import { ExternalLink, Terminal, Shield, Cpu, Globe, Rocket, Layers, Zap } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/animations/pageTransitions';

export const ProjectsPage: React.FC = () => {
  const { metadata, content } = projectsData as { metadata: { title: string; subtitle: string }; content: string };

  const projects = content.split('## Project: ').filter(Boolean).map((section: string) => {
    const lines = section.trim().split('\n');
    const titleMatch = lines[0].match(/(.*) \[(Status: .*)\]/);
    const title = titleMatch ? titleMatch[1].trim() : lines[0].trim();
    const status = titleMatch ? titleMatch[2].trim() : null;

    let category = '', role = '', desc = '', link = '';

    lines.slice(1).forEach((line: string) => {
      if (line.includes('**Category:**')) category = line.replace('- **Category:**', '').trim();
      if (line.includes('**Role:**')) role = line.replace('- **Role:**', '').trim();
      if (line.includes('**Desc:**')) desc = line.replace('- **Desc:**', '').trim();
      if (line.includes('**Link:**')) {
        const match = line.match(/\[(.*?)\]\((.*?)\)/);
        if (match) link = match[2];
      }
    });

    return { title, status, category, role, desc, link };
  });

  const getCategoryIcon = (category: string) => {
    if (category.includes('Blockchain')) return <Cpu size={14} />;
    if (category.includes('Trading')) return <Rocket size={14} />;
    if (category.includes('Wallets')) return <Shield size={14} />;
    if (category.includes('Explorers')) return <Globe size={14} />;
    return <Layers size={14} />;
  };

  return (
    <SectionWrapper id="projects" className="py-s-60 md:py-s-120 min-h-screen relative overflow-hidden select-none">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(0,255,65,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:calc(var(--1)*40)_calc(var(--1)*40)]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-s-1200 mx-auto relative z-10 px-s-10 md:px-0"
      >
        {/* Responsive Scaling Header - Optimized for Mobile Labels */}
        <motion.div variants={fadeInUp} className="text-center mb-s-60 md:mb-s-120 px-s-20">
          <div className="inline-flex items-center gap-s-12 px-s-16 py-s-6 bg-brand-primary-10 border border-brand-primary-20 rounded-full mb-s-20">
            <Zap size={14} className="text-brand-primary" />
            <span className="text-s-10 md:text-s-12 font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              System_Matrix_v3.2
            </span>
          </div>
          <h2 className="text-s-34 md:text-s-80 font-black tracking-tighter text-text-primary uppercase italic mb-s-8 leading-[0.9]">
            {metadata.title.replace(' ', '_')}
          </h2>
          <p className="text-s-12 md:text-s-18 text-text-secondary font-mono max-w-s-800 mx-auto opacity-60">
            {"> "} {metadata.subtitle}
          </p>
          <div className="w-s-100 h-s-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent mt-s-24 mx-auto" />
        </motion.div>

        {/* Stable 3D Roadmap Layout */}
        <div className="relative pt-s-40">

          {/* Central Path Axis (Desktop Only - Properly Centered) */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-s-2 -translate-x-[50%] bg-gradient-to-b from-brand-primary-5 via-brand-primary-60 to-brand-primary-5 z-0" />

          {/* Mobile Path Axis (Left-aligned) */}
          <div className="md:hidden absolute left-s-15 top-0 bottom-0 w-s-2 bg-gradient-to-b from-brand-primary-5 via-brand-primary-40 to-brand-primary-5 z-0" />

          {/* Vertical Milestone Flow */}
          <div className="space-y-s-32 md:space-y-s-12 relative px-s-10 md:px-0">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={`${project.title}-${idx}`} className="relative flex flex-col md:block py-s-10 md:py-s-40">

                  {/* Connection Node and Wire */}
                  <div className="absolute left-s-7 md:left-[50%] top-s-32 md:top-[50%] -translate-y-[50%] z-20 pointer-events-none">
                    {/* Circle Node on Path */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="w-s-16 h-s-16 bg-bg-page border-s-2 border-brand-primary rounded-full md:-ml-s-8 flex items-center justify-center animate-roadmap-pulse shadow-s-sm"
                    >
                      <div className="w-s-4 h-s-4 bg-brand-primary rounded-full shadow-[0_0_calc(var(--1)*8)_var(--brand-primary)]" />
                    </motion.div>

                    {/* Desktop Wire (Connecting dot to card) */}
                    <div className={`hidden md:block absolute top-[50%] -translate-y-[50%] h-s-1 w-s-80 bg-gradient-to-r ${isEven ? 'from-brand-primary/60 to-transparent right-s-8' : 'from-transparent to-brand-primary/60 left-s-8'}`} />

                    {/* Mobile Wire */}
                    <div className="md:hidden absolute top-[50%] -translate-y-[50%] left-s-8 h-s-1 w-s-30 bg-gradient-to-r from-brand-primary/40 to-transparent" />
                  </div>

                  {/* Alternating Project Card Container */}
                  <div className={`w-full md:w-[46%] pl-s-60 md:pl-0 ${isEven ? 'md:mr-auto md:pr-s-50 md:text-right' : 'md:ml-auto md:pl-s-50 md:text-left'} relative z-10`}>
                    <AnimatedCard className="border-none bg-transparent shadow-none p-0 !rounded-none">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block relative p-s-20 md:p-s-32 bg-bg-surface dark:bg-bg-elevated/20 backdrop-blur-md border border-brand-primary-10 group-hover:border-brand-primary-50 rounded-s-24 md:rounded-s-30 transition-all duration-500 overflow-hidden group shadow-s-md`}
                      >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute top-0 left-0 w-full h-s-2 bg-brand-primary opacity-20 pointer-events-none animate-scanline" />

                        {/* Category Label */}
                        <div className={`flex items-center gap-s-10 mb-s-12 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div className="flex items-center gap-s-6 text-brand-primary-80 font-mono text-s-10 md:text-s-11 uppercase tracking-[0.2em] font-black bg-brand-primary-5 px-s-10 py-s-4 rounded border border-brand-primary-20">
                            {getCategoryIcon(project.category)}
                            {project.category}
                          </div>
                        </div>

                        {/* Individual Project Name (The Milestone) */}
                        <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} gap-s-4 mb-s-10`}>
                          <h3 className={`text-s-24 md:text-s-34 font-black text-text-primary uppercase tracking-tighter italic group-hover:text-brand-primary transition-colors duration-300 leading-tight`}>
                            {project.title}
                          </h3>
                          {project.status && (
                            <span className="text-s-10 font-mono font-bold px-s-8 py-s-2 bg-brand-primary-10 border border-brand-primary-30 text-brand-primary rounded-s-4">
                              {project.status.toUpperCase()}
                            </span>
                          )}
                        </div>


                        {/* Description */}
                        <p className={`text-s-14 md:text-s-16 text-text-secondary leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity italic max-w-lg mb-s-20 ${isEven ? 'md:ml-auto' : ''}`}>
                          "{project.desc}"
                        </p>

                        {/* Subtle ID/Terminal Link Info */}
                        <div className={`flex items-center gap-s-10 text-s-10 md:text-s-11 font-mono font-bold text-brand-primary-50 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <Terminal size={12} className="opacity-50" />
                          <span>PROJECT_ID: 0x{idx.toString(16).padStart(2, '0')}</span>
                          <div className="w-s-4 h-s-4 bg-brand-primary-30 rounded-full" />
                          <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>

                        {/* Corner HUD Markers */}
                        <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-s-12 h-s-12 border-${isEven ? 'l' : 'r'} border-t border-brand-primary-40 opacity-40`} />
                        <div className={`absolute bottom-0 ${isEven ? 'right-0' : 'left-0'} w-s-12 h-s-12 border-${isEven ? 'r' : 'l'} border-b border-brand-primary-40 opacity-40`} />
                      </a>
                    </AnimatedCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* HUD Status Footer */}
        <motion.div
          variants={fadeInUp}
          className="mt-s-80 pt-s-40 border-t border-brand-primary-10 flex flex-col md:flex-row items-center justify-between text-brand-primary-40 font-mono text-s-10 uppercase tracking-[0.3em] font-bold px-s-20 md:px-0"
        >
          <div className="flex gap-s-40 mb-s-20 md:mb-0">
            <span>LOCATION: ANTIER_CORE</span>
            <span>NODES_ACTIVE: {projects.length}</span>
          </div>
          <div className="flex items-center gap-s-12 px-s-12 py-s-4 bg-brand-primary-5 rounded animate-pulse">
            <span className="w-s-6 h-s-6 bg-brand-primary rounded-full shadow-[0_0_5px_var(--brand-primary)]" />
            <span>SYNC_ESTABLISHED...</span>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
