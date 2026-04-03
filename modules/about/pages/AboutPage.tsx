import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import personalData from '@/content/personal.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { initScrollReveal } from '@/animations/scrollAnimations';
import { ProfileStatsCard } from '@shared/ui/ProfileStatsCard/ProfileStatsCard';
import { GlassCard } from '@shared/ui/GlassCard/GlassCard';
import { fadeInUp, staggerContainer } from '@/animations/pageTransitions';
import profilePic from '../../hero/assets/Mohit.jpeg';
import { ShieldCheck, Zap, Layers, Share2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const contentTokens = personalData.content.split('\n\n');

  // Find "The Convergence of Logic & Art" section
  const aboutTitleIndex = contentTokens.findIndex(t => t.includes('# The Convergence of Logic & Art'));
  const aboutContent = aboutTitleIndex !== -1 ? contentTokens[aboutTitleIndex + 1] : "";
  const hobbiesContent = contentTokens.find(t => t.includes('Beyond the Terminal')) || "";

  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      initScrollReveal([textRef.current]);
    }
  }, []);

  const stats = [
    { label: "USER_ROLE", value: "AI_STRATEGIST" },
    { label: "STACK", value: "NEXT_AI_R&D" },
    { label: "MISSION", value: "HUMAN_CREATIVITY_AI_PRECISION" },
    { label: "STATUS", value: "EVOLVING_DAILY" },
  ];

  const collaboratePoints = [
    {
      title: "Future-Proof Development",
      desc: "I leverage AI to build faster, smarter, and more reliable products.",
      icon: Zap
    },
    {
      title: "Bridge Design & Code",
      desc: "Background in Figma ensures final code matches the vision pixel-perfectly.",
      icon: Layers
    },
    {
      title: "Reliability & SEO",
      desc: "Clean architecture and SEO best practices for high-ranking, fast sites.",
      icon: ShieldCheck
    }
  ];

  return (
    <SectionWrapper id="about" className="py-s-100 min-h-screen relative overflow-hidden">

      {/* Heading */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-s-60 text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-s-32 md:text-s-54 lg:text-s-64 font-black tracking-tighter uppercase italic leading-[1.1] text-text-primary px-s-20"
        >
          The Convergence of <br /> <span className="text-brand-primary">Logic & Art</span>
        </motion.h2>
        <motion.div variants={fadeInUp} className="w-s-80 h-s-4 bg-brand-primary-40 mx-auto mt-s-16 rounded-full" />
      </motion.div>


      {/* Bio & Hobbies Section */}
      <div className="space-y-s-60 mb-s-80">
        <GlassCard className="p-s-30 md:p-s-50 border-brand-primary-20 bg-brand-primary-5/30 backdrop-blur-md rounded-s-30" ref={textRef}>
          <div className="text-s-16 md:text-s-20 text-text-secondary leading-relaxed font-medium italic">
            <p className="border-l-s-4 border-brand-primary pl-s-24 md:pl-s-40 shadow-[inset_calc(var(--1)*20)_0_calc(var(--1)*40)_rgba(0,255,65,0.02)] py-s-10">
              {aboutContent}
            </p>
          </div>
        </GlassCard>

        {/* Hobbies / Offline Mode */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-s-32"
        >
          <div className="flex items-center gap-s-16 border-b border-brand-primary-10 pb-s-12">
            <Share2 className="w-s-24 h-s-24 text-brand-primary" />
            <h3 className="text-s-20 font-mono font-bold text-brand-primary uppercase tracking-widest">
              [ OFFLINE_MODE ]
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-s-20">
            {hobbiesContent.split('\n').filter(l => l.startsWith('- ')).map((hobby, i) => {
              const parts = hobby.replace('- ', '').split(':');
              const emojiMatch = hobby.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|\u263A/g);
              const emoji = emojiMatch ? emojiMatch[0] : '⚡';
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-s-20 bg-bg-surface/50 border border-brand-primary-10 rounded-s-20 hover:border-brand-primary-40 transition-all group backdrop-blur-sm"
                >
                  <span className="text-s-24 mb-s-12 block group-hover:scale-110 transition-transform origin-left">{emoji}</span>
                  <p className="text-s-14 font-mono font-bold text-text-primary mb-s-4 uppercase tracking-tighter">{parts[0].replace(emoji, '').trim()}</p>
                  <p className="text-s-12 text-text-muted leading-tight">{parts[1]?.trim()}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Profile Card & Why Collaborate */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-s-40 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="lg:col-span-5 relative w-full max-w-s-450 mx-auto"
        >
          <div className="absolute -inset-s-20 bg-brand-primary-10 rounded-full blur-s-120 -z-10 opacity-30 animate-pulse-slow" />
          <ProfileStatsCard
            title="SYSTEM_PROFILE_V2"
            stats={stats}
            avatarUrl={profilePic}
            className="shadow-s-xl border-brand-primary-40 rounded-s-40 overflow-hidden"
          />
        </motion.div>

        {/* Why Collaborate? */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-s-32"
        >
          <h3 className="text-s-18 md:text-s-22 font-mono font-black text-text-secondary tracking-widest uppercase border-b border-brand-primary-20 pb-s-12 flex items-center justify-between">
            Why Collaborate With Me ?
            <span className="text-brand-primary animate-pulse inline-block w-s-10 h-s-10 bg-brand-primary rounded-full shadow-[0_0_calc(var(--1)*15)_var(--brand-primary)]" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-s-16">
            {collaboratePoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col gap-s-12 p-s-24 bg-brand-primary-5/20 hover:bg-brand-primary-5 rounded-s-24 transition-all border border-brand-primary-10 hover:border-brand-primary-30 group"
                >
                  <div className="flex-shrink-0 w-s-44 h-s-44 bg-brand-primary-15 rounded-s-12 flex items-center justify-center border border-brand-primary-30 group-hover:scale-110 transition-transform">
                    <Icon className="w-s-22 h-s-22 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-s-16 md:text-s-18 font-bold text-text-primary mb-s-4">{point.title}</h4>
                    <p className="text-s-13 text-text-muted leading-relaxed opacity-80">{point.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
