import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-s-30 border-t border-border-primary mt-auto">
      <div className="max-w-7xl mx-auto px-s-30 md:px-s-60 flex flex-col md:flex-row justify-between items-center gap-s-16">
        <p className="text-text-muted text-s-14 font-medium">
          © {new Date().getFullYear()} Centeric. All rights reserved.
        </p>
        <div className="flex gap-s-24">
          <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors text-s-14 font-medium">GitHub</a>
          <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors text-s-14 font-medium">LinkedIn</a>
          <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors text-s-14 font-medium">Twitter</a>
        </div>
      </div>
    </footer>
  );
};
