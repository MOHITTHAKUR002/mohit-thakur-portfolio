import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Moon, Sun, Home, Layers, Cpu, History } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';

const links = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/projects', label: 'Projects', icon: Layers },
  { path: '/skills', label: 'Skills', icon: Cpu },
  { path: '/experience', label: 'Experience', icon: History }
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobileView = useIsMobile();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* HUD Background Scanline (Global) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] overflow-hidden opacity-[0.03] dark:opacity-[0.07]">
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-s-200 bg-gradient-to-b from-transparent via-brand-primary to-transparent"
        />
      </div>

      {/* Global Theme Toggle (Desktop Only) */}
      <div className="fixed top-s-30 right-s-40 z-50 hidden md:flex">
        <button
          onClick={toggleTheme}
          className="items-center justify-center p-s-12 text-brand-primary hover:bg-brand-primary-20 rounded-full transition-all border border-brand-primary shadow-[0_0_20px_var(--brand-primary-20)] backdrop-blur-md bg-white-50 dark:bg-black-50 hover:scale-110"
        >
          {theme === 'dark' ? <Sun size={26} /> : <Moon size={26} />}
        </button>
      </div>

      <div className="fixed top-0 left-0 w-full z-[60] flex justify-center px-s-10 md:px-s-20 pointer-events-none mt-s-10 md:mt-s-30">
        <motion.header
          key={isMobileView ? "mobile-top" : "desktop"}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
          className={`pointer-events-auto transition-all duration-500 overflow-hidden ${isMobileView
            ? 'w-fit rounded-s-16 border border-brand-primary-20 backdrop-blur-xl bg-bg-surface px-s-16 py-s-6'
            : (scrolled ? 'w-fit rounded-s-100 border border-brand-primary-30 backdrop-blur-xl bg-bg-surface shadow-s-md py-s-14 px-s-50' : 'w-full max-w-min rounded-s-24 bg-transparent py-s-20 px-s-10')
            }`}
        >
          {isMobileView ? (
            /* MOBILE TOP BRANDING ONLY */
            <div className="flex items-center gap-s-8">
              <Terminal size={14} className="text-brand-primary" />
              <span className="text-s-10 font-black text-brand-primary tracking-[0.3em] uppercase">SYSTM_OS</span>
            </div>
          ) : (
            /* DESKTOP NAV (TEXT BASED) */
            <nav className="hidden md:flex gap-s-40 items-center justify-center w-full whitespace-nowrap">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-s-16 font-mono font-bold transition-all hover:text-brand-primary uppercase tracking-widest ${location.pathname === link.path ? 'text-brand-primary drop-shadow-[0_0_8px_var(--brand-primary-80)]' : 'text-text-secondary hover:drop-shadow-[0_0_8px_var(--brand-primary-50)]'
                    }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-[8px] left-0 h-[2px] w-full bg-brand-primary rounded-full shadow-[0_0_10px_var(--brand-primary)]"
                    />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </motion.header>
      </div>

      {/* MOBILE BOTTOM HUD TAB BAR */}
      <AnimatePresence>
        {isMobileView && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-[60] px-s-10 pb-s-16 pt-s-10 pointer-events-none"
          >
            <div className="max-w-s-440 mx-auto w-full flex items-center justify-between gap-s-4 px-s-10 py-s-8 rounded-s-24 border border-brand-primary-20 backdrop-blur-2xl bg-bg-surface shadow-[0_-10px_40px_rgba(0,0,0,0.2)] pointer-events-auto relative overflow-hidden">
              {/* Scanline line for the dock */}
              <div className="absolute top-0 left-0 w-full h-[0.5px] bg-brand-primary-30" />

              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center justify-center gap-s-4 transition-all relative px-s-12 py-s-4 rounded-s-16 ${location.pathname === link.path
                    ? 'text-brand-primary'
                    : 'text-text-muted hover:text-brand-primary-60'
                    }`}
                >
                  <link.icon size={20} strokeWidth={location.pathname === link.path ? 2.5 : 2} className="transition-transform active:scale-90" />
                  <span className={`text-s-10 font-bold uppercase tracking-tighter ${location.pathname === link.path ? 'opacity-100' : 'opacity-60'}`}>
                    {link.label === 'Experience' ? 'EXP' : link.label.toUpperCase()}
                  </span>

                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="active-tab-glow"
                      className="absolute -bottom-s-2 w-s-12 h-s-2 bg-brand-primary rounded-full shadow-[0_0_15px_var(--brand-primary)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}

              <div className="h-s-30 w-px bg-brand-primary-10 mx-s-2" />

              <button
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center gap-s-4 text-brand-primary px-s-12 py-s-4"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span className="text-s-10 font-bold uppercase tracking-tighter opacity-60">MODE</span>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
