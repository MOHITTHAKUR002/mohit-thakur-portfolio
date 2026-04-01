import React from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { staggerContainer } from '@/animations/pageTransitions';
import { Cpu, Zap, Bot, Layout, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react';
import { AnimatedCard } from '../../../shared/ui/AnimatedCard/AnimatedCard';

export const SkillsPage: React.FC = () => {
  const categories = [
    {
      id: "0x01",
      name: "FRONTEND_LOGIC",
      icon: Cpu,
      skills: [
        { name: "React.js", status: "MASTERED" },
        { name: "Next.js", status: "ADVANCED" },
        { name: "Vite", status: "OPTIMIZED" },
        { name: "JavaScript", status: "CORE_LEARNING" },
        { name: "TypeScript", status: "INITIALIZING" }
      ]
    },
    {
      id: "0x02",
      name: "STYLING_MOTION",
      icon: Zap,
      skills: [
        { name: "Tailwind CSS", status: "EXPERT" },
        { name: "Framer Motion", status: "ADVANCED" },
        { name: "GSAP", status: "ENHANCED" },
        { name: "SCSS/SASS", status: "STABLE" },
        { name: "Responsive Architecture", status: "OPTIMIZED" }
      ]
    },
    {
      id: "0x03",
      name: "AI_R&D_STACK",
      icon: Bot,
      skills: [
        { name: "Cursor AI", status: "POWERED" },
        { name: "Antigravity / GPT / Claude", status: "INTEGRATED" },
        { name: "R&D Research", status: "ACTIVE" },
        { name: "New Idea Prototyping", status: "FLUID" },
        { name: "System Analysis", status: "ANALYTICAL" }
      ]
    },
    {
      id: "0x04",
      name: "DESIGN_SYSTEMS",
      icon: Layout,
      skills: [
        { name: "UI/UX Design", status: "MASTERY" },
        { name: "Figma", status: "EXPERT" },
        { name: "Photoshop", status: "STABLE" },
        { name: "Flow Analysis", status: "OPTIMIZED" },
        { name: "Visual Branding", status: "CREATIVE" }
      ]
    },
    {
      id: "0x05",
      name: "SYSTEM_OPERATION",
      icon: ShieldCheck,
      skills: [
        { name: "Leadership", status: "STRATEGIC" },
        { name: "Multi-tasking", status: "PERFORMANCE" },
        { name: "Clean Architecture", status: "LOGICAL" },
        { name: "On-time Delivery", status: "RELIABLE" },
        { name: "Time Efficiency", status: "MAXIMIZED" }
      ]
    }
  ];

  return (
    <SectionWrapper id="skills" className="pt-s-120 pb-s-80 min-h-fit relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-5 z-0">
        <div className="absolute top-1/4 left-s-40 font-mono text-s-12 whitespace-nowrap rotate-90 text-brand-primary">
          SYSTM_ID: ALPHA_7 // CORE_LOAD: 98% // STATUS: SECURE
        </div>
        <div className="absolute bottom-1/4 right-s-40 font-mono text-s-12 whitespace-nowrap -rotate-90 text-brand-primary">
          INIT_SEQUENCE: SUCCESS // CACHE_CLEAR: TRUE // LINK: ESTABLISHED
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
          <div className="flex items-center gap-s-10 px-s-20 py-s-8 bg-brand-primary-10 border-s-2 border-brand-primary-40 rounded-full mb-s-24">
            <TerminalIcon className="w-s-16 h-s-16 text-brand-primary" />
            <span className="text-s-14 font-mono font-bold tracking-[0.2em] text-brand-primary uppercase underline-offset-[calc(var(--1)*4)] decoration-s-2">
              Technological_Prowess
            </span>
          </div>
          <h2 className="text-s-40 md:text-s-80 font-black tracking-tighter text-text-primary mb-s-20 uppercase text-center italic leading-tight">
            Skill_Matrix
          </h2>
          <div className="w-s-120 h-s-4 bg-brand-primary-50 rounded-full shadow-[0_0_calc(var(--1)*10)_var(--brand-primary-20)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-s-40">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <AnimatedCard
                key={category.id}
                delay={0.1 * idx}
                className="relative p-0 border-none bg-transparent shadow-none group h-full"
              >
                {/* Custom Hacker Card Styling */}
                <div className="h-full flex flex-col bg-bg-surface dark:bg-bg-elevated backdrop-blur-md rounded-s-30 border-s-2 border-brand-primary-20 group-hover:border-brand-primary-50 transition-all duration-500 overflow-hidden relative min-h-s-400">

                  {/* Scanline Effect */}
                  <div className="absolute top-0 left-0 w-full h-s-2 bg-brand-primary-50 opacity-20 pointer-events-none animate-scanline" />

                  {/* Header */}
                  <div className="p-s-30 border-b-s-2 border-brand-primary-20 flex items-center justify-between bg-brand-primary-5">
                    <div className="flex items-center gap-s-20">
                      <div className="p-s-12 bg-brand-primary-15 rounded-s-12 border-s-2 border-brand-primary-30">
                        <Icon className="w-s-28 h-s-28 text-brand-primary" />
                      </div>
                      <div>
                        <span className="text-s-14 font-mono font-bold text-brand-primary opacity-60 tracking-widest">MODULE_{category.id}</span>
                        <h3 className="text-s-24 font-mono font-black text-text-primary tracking-tighter uppercase italic">{category.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="p-s-40 flex-grow space-y-s-24">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group/skill relative">
                        <div className="flex items-center justify-between gap-s-20 mb-s-8">
                          <span className="text-s-18 md:text-s-20 font-mono font-bold text-text-secondary group-hover/skill:text-brand-primary transition-colors">
                            {skill.name}
                          </span>
                          <span className={`text-s-12 font-mono font-black px-s-12 py-s-4 rounded border-s-2 ${skill.status === 'MASTERED' || skill.status === 'EXPERT' || skill.status === 'MASTERY' || skill.status === 'POWERED'
                            ? 'bg-brand-primary text-bg-page border-brand-primary'
                            : 'text-brand-primary border-brand-primary-40 bg-brand-primary-5'
                            }`}>
                            {skill.status}
                          </span>
                        </div>
                        {/* Progress Indicator Dots - More prominent and glowing */}
                        <div className="flex gap-s-8 opacity-80 group-hover/skill:opacity-100 transition-opacity">
                          {[1, 2, 3, 4, 5].map((dot) => {
                            const isActive = skill.status === 'MASTERED' || skill.status === 'EXPERT' || skill.status === 'MASTERY' || skill.status === 'POWERED' || dot <= 3;
                            return (
                              <div
                                key={dot}
                                className={`h-s-6 w-s-24 rounded-full transition-all duration-300 ${isActive
                                  ? 'bg-brand-primary shadow-[0_0_calc(var(--1)*10)_var(--brand-primary-50)]'
                                  : 'bg-brand-primary-10 border border-brand-primary-20'
                                  }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Corner Details - More prominent */}
                  <div className="absolute top-0 right-0 w-s-12 h-s-12 border-r-s-4 border-t-s-4 border-brand-primary"></div>
                  <div className="absolute bottom-0 left-0 w-s-12 h-s-12 border-l-s-4 border-b-s-4 border-brand-primary"></div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
