import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id = '',
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`w-full min-h-screen relative flex items-center justify-center py-s-80 px-s-30 md:px-s-60 ${className}`}
    >
      <div className="w-full max-w-s-1400 mx-auto">
        {children}
      </div>
    </section>
  );
};
