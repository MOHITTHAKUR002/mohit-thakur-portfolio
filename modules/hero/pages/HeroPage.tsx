import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import personalData from '@/content/personal.json';
import { SectionWrapper } from '@shared/ui/SectionWrapper/SectionWrapper';
import { Button } from '@shared/ui/Button/Button';
import { ArrowRight, Terminal, Code2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/animations/pageTransitions';
import { TiltCard } from '@shared/ui/TiltCard/TiltCard';
import profilePic from '../assets/Mohit.jpeg';

export const HeroPage: React.FC = () => {
  const navigate = useNavigate();
  const metadata = personalData.metadata as { name: string; role: string; greeting: string; cta: string; contact: string };
  const headline = personalData.content.split('\n\n')[0];
  const [displayText, setDisplayText] = React.useState('');
  const [charIndex, setCharIndex] = React.useState(0);
  const typingSpeed = 50;

  React.useEffect(() => {
    if (charIndex < headline.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + headline[charIndex]);
        setCharIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [charIndex, headline]);

  const contentTokens = personalData.content.split('\n\n');
  const shortSummary = contentTokens.length > 1 ? contentTokens[1] : "";

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring" as const, duration: 1.5, bounce: 0.4 }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <SectionWrapper id="hero" className="min-h-screen flex items-center pt-s-100 pb-s-60">
      <div className="w-full flex flex-col lg:flex-row gap-s-30 lg:gap-s-60 items-center justify-between">

        {/* Left Column: Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex-1 w-full flex flex-col gap-s-24 items-start z-10"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-s-16 bg-brand-primary-15 px-s-24 py-s-12 rounded-full border border-brand-primary-50 shadow-s-sm mb-s-10">
            <Terminal size={window.innerWidth > 768 ? 20 : 18} className="text-brand-primary" />
            <p className="text-s-16 md:text-s-18 font-mono font-bold text-brand-primary tracking-[0.2em] uppercase">
              {metadata.greeting}
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <motion.h1
              className="text-s-44 md:text-s-80 lg:text-s-80 font-black leading-[1.1] tracking-tighter text-text-primary mb-s-10"
            >
              <span className="drop-shadow-[0_0_calc(var(--1)*8)_rgba(0,255,65,0.3)]">{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="text-brand-primary ml-s-4"
              >
                _
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-col gap-s-16 mt-s-10">
            <div className="flex items-center gap-s-16">
              <Code2 size={24} className="text-brand-primary" />
              <h2 className="text-s-24 md:text-s-32 font-mono font-bold text-text-secondary leading-tight uppercase tracking-wide">
                {metadata.name} // {metadata.role}
              </h2>
            </div>
            <motion.p className="text-s-16 md:text-s-18 font-mono text-text-muted max-w-s-700 leading-relaxed border-l-s-2 border-brand-primary-30 pl-s-20 shadow-[inset_calc(var(--1)*10)_0_calc(var(--1)*30)_rgba(0,255,65,0.05)] py-s-10">
              {shortSummary}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-s-30 flex flex-wrap gap-s-30 items-center">
            <Button
              variant="outline"
              icon={<ArrowRight size={20} />}
              label={metadata.contact}
              className="border-brand-primary text-brand-primary hover:bg-brand-primary-10"
              onClick={() => navigate('/contact')}
            />
          </motion.div>
        </motion.div>

        {/* Right Column: Floating Picture Card */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="show"
          className="flex-shrink-0 flex justify-center lg:justify-end z-10 relative mt-s-40 lg:mt-0 w-full lg:w-auto"
        >
          {/* Cyberpunk background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-s-400 h-s-400 bg-brand-primary-10 rounded-full blur-s-100 -z-10 pointer-events-none"></div>

          <TiltCard
            depth={20}
            zTranslate={40}
            animate={floatAnimation}
            className="relative w-s-260 h-s-320 md:w-s-360 md:h-s-420 p-s-4 bg-gradient-to-br from-brand-primary-60 via-surface-80 to-brand-primary-20 backdrop-blur-md shadow-s-md rounded-s-24 overflow-hidden"
          >
            {/* The Actual Picture Container */}
            <div className="relative w-full h-full rounded-s-20 overflow-hidden bg-bg-inverse border border-brand-primary-40 group">
              <img
                src={profilePic}
                alt={metadata.name}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Mohit+Thakur&background=0a0a0a&color=00ff41&size=512';
                }}
              />

              {/* Scanline overlay */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: "200%" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-s-60 bg-gradient-to-b from-transparent via-brand-primary-20 to-transparent pointer-events-none"
              />

              {/* Techy Corner Details */}
              <div className="absolute top-0 left-0 w-s-30 h-s-30 border-t-s-4 border-l-s-4 border-brand-primary rounded-tl-s-12 opacity-80 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-s-30 h-s-30 border-t-s-4 border-r-s-4 border-brand-primary rounded-tr-s-12 opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-s-30 h-s-30 border-b-s-4 border-l-s-4 border-brand-primary rounded-bl-s-12 opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-s-30 h-s-30 border-b-s-4 border-r-s-4 border-brand-primary rounded-br-s-12 opacity-80 pointer-events-none"></div>

            </div>

            {/* Data HUD badges */}
            <div className="absolute top-s-20 -left-s-16 bg-bg-page border border-brand-primary px-s-12 py-s-4 text-s-10 font-mono text-brand-primary shadow-s-sm rounded-s-4">
              STS: ONLINE
            </div>
            <div className="absolute bottom-s-30 -right-s-16 bg-brand-primary text-bg-page px-s-12 py-s-4 text-s-10 font-mono font-bold tracking-widest uppercase shadow-s-md rounded-s-4">
              {metadata.role}
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </SectionWrapper>
  );
};
