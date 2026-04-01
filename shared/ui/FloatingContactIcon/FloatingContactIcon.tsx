import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export const FloatingContactIcon: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  if (location.pathname === '/contact') return null;

  return (
    <div className="fixed bottom-s-120 md:bottom-s-40 right-s-20 md:right-s-40 z-50 pointer-events-none">
      <Link to="/contact" className="pointer-events-auto">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center justify-end"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: -12, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute right-full mr-s-12 bg-bg-surface backdrop-blur-md border border-brand-primary-50 text-brand-primary px-s-16 py-s-8 rounded-s-8 font-mono text-s-14 font-bold tracking-widest whitespace-nowrap shadow-[0_0_15px_rgba(0,255,65,0.2)]"
              >
                <div className="flex items-center gap-s-8">
                  <span className="w-s-8 h-s-8 bg-brand-primary animate-pulse rounded-full" />
                  CONTACT_ME
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{
              boxShadow: isHovered
                ? "0 0 25px rgba(0, 255, 65, 0.3)"
                : "0 0 12px rgba(0, 255, 65, 0.15)",
              y: [0, -8, 0]
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="w-s-64 h-s-64 bg-bg-surface border-2 border-brand-primary rounded-full flex items-center justify-center text-brand-primary backdrop-blur-md group overflow-hidden relative"
          >
            {/* Hacking scanning line effect */}
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-s-2 bg-brand-primary-20 pointer-events-none"
            />

            <div className="relative z-10">
              <MessageSquare size={28} className='w-s-28 h-s-28' />
            </div>

            {/* Background glitchy circles */}
            <div className="absolute inset-0 opacity-20 border border-brand-primary rounded-full scale-110 animate-pulse" />
          </motion.div>
        </motion.div>
      </Link>
    </div>
  );
};
