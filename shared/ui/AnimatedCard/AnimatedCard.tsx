import React from 'react';
import { type HTMLMotionProps } from 'framer-motion';
import { TiltCard } from '../TiltCard/TiltCard';

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = '',
  ...props
}) => {
  return (
    <TiltCard
      depth={8}
      zTranslate={15}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className={`rounded-s-20 bg-bg-elevated border border-border-primary shadow-[0_0_15px_rgba(0,255,65,0.1)] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </TiltCard>
  );
};
