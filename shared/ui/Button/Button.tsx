import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  label: string;
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  icon,
  className = '',
  ...props
}) => {
  const baseClasses = 'flex items-center justify-center gap-s-8 h-s-50 rounded-s-28 px-s-30 font-semibold transition-all duration-300 transform';
  
  const variants = {
    primary: 'bg-brand-primary text-button-primary-text hover:brightness-110 shadow-s-sm',
    secondary: 'bg-button-secondary text-button-secondary-text hover:bg-button-secondary-hover shadow-s-sm',
    gradient: 'bg-button-primary-gradient text-text-primary hover:bg-button-primary-gradient-hover border-s-1 border-border-primary-light shadow-s-md',
    outline: 'bg-transparent border-s-1 border-button-outline-border text-button-outline-text hover:bg-button-outline-border/10',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {label}
      {icon && <span className="flex items-center">{icon}</span>}
    </motion.button>
  );
};
