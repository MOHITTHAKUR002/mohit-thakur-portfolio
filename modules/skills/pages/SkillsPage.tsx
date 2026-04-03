import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { staggerContainer, fadeInUp } from '@/animations/pageTransitions';
import { Cpu, Zap, Bot, Layout, Terminal as TerminalIcon, Code2, Globe, Boxes, Layers, Wand2 } from 'lucide-react';
import { AnimatedCard } from '../../../shared/ui/AnimatedCard/AnimatedCard';
import skillsData from '@/content/skills.json';

// Helper to parse markdown content from JSON
const parseSkillsContent = (content: string) => {
  const categories: any[] = [];
  const sections = content.split('## ').filter(Boolean);

  sections.forEach((section) => {
    const lines = section.split('\n').filter(Boolean);
    const header = lines[0].trim();
    const parts = header.split('_');
    const id = parts[0];
    const name = parts.slice(1).join('_');

    const skills = lines.slice(1).map(line => {
      // Match "- Skill Name [Status]"
      const match = line.match(/- (.*) \[(.*)\]/);
      if (match) {
        return { name: match[1], status: match[2] };
      }
      // Match "- Skill Name"
      const simpleMatch = line.match(/- (.*)/);
      if (simpleMatch) {
        return { name: simpleMatch[1], status: 'INITIALIZED' };
      }
      return null;
    }).filter(Boolean);

    categories.push({ id, name, skills });
  });

  return categories;
};

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  "0x01": Cpu,
  "0x02": Zap,
  "0x03": Bot,
  "0x04": Layout,
};

// Tech icon mapping for individual skills
const techIcons: Record<string, any> = {
  "React.js": Globe,
  "Next.js": Layers,
  "Vite.js": Zap,
  "JavaScript": Code2,
  "TypeScript": Boxes,
  "Tailwind CSS": Layout,
  "Framer Motion": Wand2,
  "GSAP": Zap,
  "Cursor AI / Antigravity": Bot,
  "Claude / GPT-4": Bot,
  "Figma / Photoshop": Layout,
};

export const SkillsPage: React.FC = () => {
  const categories = parseSkillsContent(skillsData.content);

  return (
    <SectionWrapper id="skills" className="pt-s-120 pb-s-80 min-h-fit relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5 z-0">
        <div className="absolute top-1/4 left-s-40 font-mono text-s-12 whitespace-nowrap rotate-90 text-brand-primary">
          SYSTM_ID: ALPHA_7 // CORE_LOAD: 98% // STATUS: SECURE
        </div>
        <div className="absolute bottom-1/4 right-s-40 font-mono text-s-12 whitespace-nowrap -rotate-90 text-brand-primary">
          INIT_SEQUENCE: SUCCESS // CACH_CLEAR: TRUE // LINK: ESTABLISHED
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full relative z-10"
      >
        <div className="flex flex-col items-center mb-s-80">
          <motion.div variants={fadeInUp} className="flex items-center gap-s-10 px-s-20 py-s-8 bg-brand-primary-10 border-s-2 border-brand-primary-40 rounded-full mb-s-24">
            <TerminalIcon className="w-s-16 h-s-16 text-brand-primary" />
            <span className="text-s-14 font-mono font-bold tracking-[0.2em] text-brand-primary uppercase">
              INITIALIZING_SKILL_MATRIX...
            </span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-s-40 md:text-s-80 font-black tracking-tighter text-text-primary mb-s-20 uppercase text-center italic leading-tight">
            {skillsData.metadata.title.replace(' ', '_')}
          </motion.h2>
          <motion.div variants={fadeInUp} className="w-s-120 h-s-4 bg-brand-primary-50 rounded-full shadow-[0_0_calc(var(--1)*10)_var(--brand-primary-20)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s-40">
          {categories.map((category, idx) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <AnimatedCard
                key={category.id}
                delay={0.1 * idx}
                className="relative p-0 border-none bg-transparent shadow-none group h-full"
              >
                {/* Custom Hacker Card Styling */}
                <div className="h-full flex flex-col bg-bg-surface dark:bg-bg-elevated backdrop-blur-xl rounded-s-30 border-s-2 border-brand-primary-20 group-hover:border-brand-primary-50 transition-all duration-500 overflow-hidden relative shadow-[0_0_calc(var(--1)*40)_rgba(0,0,0,0.2)]">

                  {/* Scanline Effect */}
                  <div className="absolute top-0 left-0 w-full h-full bg-scanline opacity-[0.03] pointer-events-none animate-scanline" />

                  {/* Header */}
                  <div className="p-s-30 border-b-s-2 border-brand-primary-20 flex items-center justify-between bg-brand-primary-5/50 backdrop-blur-md">
                    <div className="flex items-center gap-s-20">
                      <div className="p-s-12 bg-brand-primary-15 rounded-s-12 border-s-2 border-brand-primary-30 shadow-[0_0_calc(var(--1)*15)_var(--brand-primary-20)]">
                        <Icon className="w-s-28 h-s-28 text-brand-primary" />
                      </div>
                      <div>
                        <span className="text-s-12 font-mono font-bold text-brand-primary opacity-60 tracking-widest uppercase">[SYSTEM_MODULE_{category.id}]</span>
                        <h3 className="text-s-24 font-mono font-black text-text-primary tracking-tighter uppercase italic">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Skills List - System Log Style */}
                  <div className="p-s-20 flex-grow space-y-s-10 bg-[radial-gradient(circle_at_top_right,rgba(0,255,65,0.05),transparent)]">
                    {category.skills.map((skill: any) => {
                      const TechIcon = techIcons[skill.name] || Code2;
                      return (
                        <div key={skill.name} className="group/skill relative py-s-12 px-s-16 rounded-s-12 hover:bg-brand-primary-5 transition-all border border-transparent hover:border-brand-primary-20">
                          <div className="flex items-center justify-between gap-s-20">
                            <div className="flex items-center gap-s-16">
                              <TechIcon className="w-s-20 h-s-20 text-brand-primary opacity-60 group-hover/skill:opacity-100 transition-opacity" />
                              <span className="text-s-18 font-mono font-bold text-text-secondary group-hover/skill:text-brand-primary transition-colors">
                                {skill.name.toUpperCase()}
                              </span>
                            </div>

                            {/* Balanced Badge Design - Single Style */}
                            <span className="text-s-12 font-mono font-black px-s-12 py-s-4 rounded-s-6 border-s border-brand-primary-50 text-brand-primary bg-brand-primary-10 uppercase tracking-[0.1em] shadow-[0_0_calc(var(--1)*15)_var(--brand-primary-20)]">
                              {skill.status}
                            </span>
                          </div>

                          {/* Interactive Diagnostic Bar */}
                          <div className="mt-s-12 h-s-1 w-full bg-brand-primary-10 relative overflow-hidden">
                            <motion.div
                              initial={{ x: "-100%" }}
                              whileInView={{ x: "0%" }}
                              className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-brand-primary-50 to-transparent opacity-40"
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Tech Corner Details - More prominent */}
                  <div className="absolute top-0 right-0 w-s-12 h-s-12 border-r-s-4 border-t-s-4 border-brand-primary" />
                  <div className="absolute bottom-0 left-0 w-s-12 h-s-12 border-l-s-4 border-b-s-4 border-brand-primary" />
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
