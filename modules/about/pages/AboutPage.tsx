import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import personalData from '@/content/personal.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { initScrollReveal } from '@/animations/scrollAnimations';
import { ProfileStatsCard } from '@shared/ui/ProfileStatsCard/ProfileStatsCard';
import { GlassCard } from '@shared/ui/GlassCard/GlassCard';
import profilePic from '../../hero/assets/Mohit.jpeg';

export const AboutPage: React.FC = () => {
  const metadata = personalData.metadata as { name: string; role: string };
  const content = personalData.content as string;
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      initScrollReveal([textRef.current]);
    }
  }, []);

  const stats = [
    { label: "USER_ROLE", value: metadata.role.toUpperCase() },
    { label: "LOCATION", value: "DELHI_IN" },
    { label: "OBJECTIVE", value: "UI/UX_UX_REFINEMENT" },
    { label: "INTERESTS", value: "[VOLLEYBALL, DRAWING, MUSIC]" },
    { label: "UPLINK_STATUS", value: "ACTIVE" },
  ];

  return (
    <SectionWrapper id="about" className="py-s-80 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-s-60 items-center">
        <GlassCard className="p-0 border-none bg-transparent shadow-none backdrop-blur-none" ref={textRef}>
          <h2 className="text-s-40 md:text-s-60 font-black tracking-tighter mb-s-30 uppercase italic leading-tight">
            About_Me_v1.0
          </h2>
          <div className="text-s-16 md:text-s-20 text-text-secondary leading-relaxed space-y-s-20 font-medium opacity-80 italic">
            {content.split('\n\n').map((para: string, i: number) => (
              <p key={i} className="border-l-s-2 border-brand-primary-20 pl-s-20">
                {"> "} {para}
              </p>
            ))}
          </div>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-full max-w-s-500 mx-auto"
        >
          {/* Cyberpunk background glow - Fluidly scaled */}
          <div className="absolute -inset-s-20 bg-brand-primary-10 rounded-full blur-s-100 -z-10 opacity-30"></div>
          
          <ProfileStatsCard
            title="SYSTEM_PROFILE_SCAN_V2"
            stats={stats}
            avatarUrl={profilePic}
            className="shadow-s-md border-brand-primary-40 rounded-s-30"
          />

          {/* Decorative corner accents - Fluidly scaled */}
          <div className="absolute -top-s-10 -left-s-10 w-s-40 h-s-40 border-t-s-2 border-l-s-2 border-brand-primary-40 rounded-tl-s-16 opacity-50" />
          <div className="absolute -bottom-s-10 -right-s-10 w-s-40 h-s-40 border-b-s-2 border-r-s-2 border-brand-primary-40 rounded-br-s-16 opacity-50" />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
