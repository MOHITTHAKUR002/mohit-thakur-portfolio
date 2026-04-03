import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-s-30 border-t border-border-primary mt-auto">
      <p className="text-text-muted text-s-14 text-center font-medium">
        © {new Date().getFullYear()} MOHIT_THAKUR. All rights reserved.
      </p>
    </footer>
  );
};
