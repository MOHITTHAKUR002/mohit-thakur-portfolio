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

const NavText: React.FC<{ label: string; isHovered: boolean }> = ({ label, isHovered }) => {
  const [displayText, setDisplayText] = useState(label);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*$";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(label);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(label
        .split("")
        .map((_, index) => {
          if (index < iterations) return label[index];
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("")
      );

      if (iterations >= label.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, label]);

  return <>{displayText}</>;
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
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
    const handleScroll = () => {
      // Use both window.scrollY and documentElement.scrollTop for cross-browser compatibility
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      setScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

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



      <div className="fixed top-0 left-0 w-full z-[60] flex justify-center pointer-events-none">
        <motion.header
          key={isMobileView ? "mobile-top" : "desktop"}
          layout
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            layout: { type: "spring", stiffness: 120, damping: 22 },
            y: { type: "spring", stiffness: 150, damping: 25 }
          }}
          className={`pointer-events-auto overflow-hidden backdrop-blur-2xl flex items-center relative transition-all duration-300 ${isMobileView
            ? 'w-fit rounded-s-16 px-s-16 py-s-6'
            : (scrolled
              ? 'w-full max-w-screen-2xl bg-bg-surface border rounded-none border-t-0 border-x-0 py-s-8 px-s-60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
              : 'w-[95%]  max-w-screen-xl rounded-s-4 py-s-14 px-s-32 shadow-s-glow-sm')
            }`}
        >
          {/* Corner Brackets (Desktop, Non-Scrolled) */}
          {!isMobileView && !scrolled && (
            <>
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />
            </>
          )}

          {!isMobileView && (
            <div className={`flex items-center gap-s-10 border-r border-brand-primary-10 pr-s-24 mr-s-24 transition-all ${scrolled ? 'opacity-100 scale-90' : 'opacity-60 scale-100'}`}>
              <div className="w-s-8 h-s-8 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_var(--brand-primary)]" />
              <div className="flex flex-col leading-none whitespace-nowrap">
                <span className="text-s-14 font-black text-brand-primary tracking-[0.3em] uppercase">MOHIT_THAKUR</span>
                <span className="text-s-12 text-brand-primary-40 font-mono mt-s-2 tracking-tighter">FRONTEND ENGINEER</span>
              </div>
            </div>
          )}

          {isMobileView ? (
            /* MOBILE TOP BRANDING ONLY */
            <div className="flex items-center gap-s-8">
              <Terminal size={14} className="text-brand-primary" />
              <span className="text-s-10 font-black text-brand-primary tracking-[0.3em] uppercase">SYSTM_OS</span>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-between">
              <motion.nav
                layout
                className="flex gap-s-32 items-center justify-center flex-1 whitespace-nowrap relative"
                onMouseLeave={() => setHoveredPath(null)}
              >
                <AnimatePresence>
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onMouseEnter={() => setHoveredPath(link.path)}
                      className={`relative px-s-24 py-s-10 text-s-16 font-mono font-bold transition-all uppercase tracking-[0.2em] z-10 ${location.pathname === link.path
                        ? 'text-brand-primary text-glow-sm'
                        : 'text-text-secondary hover:text-brand-primary grayscale-[0.5] hover:grayscale-0'
                        }`}
                    >
                      <NavText label={link.label} isHovered={hoveredPath === link.path} />

                      {/* Sliding Hover Highlight (Angular) */}
                      {hoveredPath === link.path && (
                        <motion.div
                          layoutId="nav-hover-bg"
                          className="absolute inset-0 bg-brand-primary-10 border-x border-brand-primary-30 -z-10 shadow-[0_0_15px_var(--brand-primary-10)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                        />
                      )}

                      {/* Active Indicator (Box Beam) */}
                      {location.pathname === link.path && (
                        <motion.div
                          layoutId="active-underline"
                          className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-primary shadow-[0_0_15px_var(--brand-primary)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  ))}
                </AnimatePresence>

                {/* Header Pill Scanline */}
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
                  className="absolute inset-0 w-s-100 h-full bg-gradient-to-r from-transparent via-brand-primary-10 to-transparent pointer-events-none -z-20 skew-x-12"
                />
              </motion.nav>

              <div className="flex items-center pl-s-24 ml-s-24 border-l border-brand-primary-10">
                <button
                  onClick={toggleTheme}
                  className="items-center justify-center p-s-12 text-brand-primary hover:bg-brand-primary rounded-full transition-all border border-brand-primary shadow-[0_0_20px_var(--brand-primary)] backdrop-blur-md hover:text-black bg-white-50 dark:bg-black-50 hover:scale-110"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
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
