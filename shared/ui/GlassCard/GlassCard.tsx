import React from 'react';
import { type HTMLMotionProps } from 'framer-motion';
import { TiltCard } from '../TiltCard/TiltCard';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <TiltCard
      depth={10}
      zTranslate={20}
      className={`rounded-s-20 bg-bg-elevated backdrop-blur-md border border-border-primary/50 shadow-[0_0_20px_rgba(0,255,65,0.05)] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </TiltCard>
  );
};
