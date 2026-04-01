import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  label: string;
  value: string;
  color?: string;
}

interface ProfileStatsCardProps {
  title: string;
  stats: StatItem[];
  avatarUrl?: string;
  className?: string;
}

export const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({ title, stats, avatarUrl, className = "" }) => {
  return (
    <div className={`relative bg-black-60 backdrop-blur-s-xl border-s-2 border-brand-primary-20 rounded-s-24 overflow-hidden p-s-24 md:p-s-32 font-mono shadow-s-md ${className}`}>
      {/* Decorative scanline */}
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-s-40 bg-gradient-to-b from-transparent via-brand-primary-5 to-transparent pointer-events-none"
      />

      {/* Profile Image & Metadata */}
      <div className="flex items-center gap-s-24 mb-s-32 border-b-s-1 border-brand-primary-10 pb-s-24">
        {avatarUrl && (
          <div className="relative w-s-80 h-s-80 md:w-s-100 md:h-s-100 rounded-full border-s-2 border-brand-primary-50 p-s-4 bg-brand-primary-5">
            <div className="w-full h-full rounded-full overflow-hidden grayscale contrast-125 brightness-90 border-s-1 border-brand-primary-20">
              <img src={avatarUrl} alt="User" className="w-full h-full object-cover" />
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-s-4 right-s-4 w-s-14 h-s-14 bg-brand-primary rounded-full border-s-2 border-black animate-pulse shadow-s-glow-sm" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-s-10 mb-s-6">
            <div className="w-s-8 h-s-8 bg-brand-primary rounded-full animate-pulse shadow-s-glow-xs" />
            <span className="text-s-16 md:text-s-18 font-black text-brand-primary tracking-tighter uppercase italic">{title}</span>
          </div>
          <div className="text-s-10 md:text-s-11 text-brand-primary-40 font-bold uppercase tracking-widest font-mono">IDENT_SCAN: MOHIT_TH_8907</div>
          <div className="text-s-9 text-brand-primary-20 mt-s-8 font-bold tracking-[0.3em] font-mono">00:25:01:AF:89:D2</div>
        </div>
      </div>

      {/* Progress Bar (Decorative) */}
      <div className="mb-s-40">
        <div className="flex justify-between text-s-11 text-brand-primary-60 mb-s-8 uppercase tracking-[0.2em] font-black">
          <span>System_Sync</span>
          <span>98%</span>
        </div>
        <div className="h-s-4 w-full bg-brand-primary-10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "98%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full bg-brand-primary shadow-[0_0_calc(var(--1)*15)_var(--brand-primary-60)]"
          />
        </div>
      </div>

      {/* Stats List */}
      <div className="space-y-s-24">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex flex-col gap-s-6"
          >
            <span className="text-s-10 md:text-s-11 text-brand-primary-40 font-black uppercase tracking-[0.2em] leading-none">
              {stat.label}
            </span>
            <span className={`text-s-18 md:text-s-22 font-black ${stat.color || 'text-brand-primary'} tracking-tight leading-none`}>
              {stat.value}_
            </span>
          </motion.div>
        ))}
      </div>

      {/* Technical footer */}
      <div className="mt-s-40 pt-s-16 border-t-s-1 border-brand-primary-10 flex justify-between items-end">
        <div className="flex gap-s-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-s-16 h-s-6 bg-brand-primary-20 rounded-s-2" />
          ))}
        </div>
        <div className="text-right">
          <div className="text-s-9 text-brand-primary-20 leading-none mb-s-4 uppercase tracking-[0.2em] font-bold">Encryption</div>
          <div className="text-s-11 text-brand-primary-40 font-black tracking-[0.2em] uppercase">AES_256_PRO</div>
        </div>
      </div>
    </div>
  );
};
