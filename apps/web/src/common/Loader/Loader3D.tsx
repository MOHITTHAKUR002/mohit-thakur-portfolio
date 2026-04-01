import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import profileImg from '@modules/hero/assets/Mohit.jpeg';

// Helper to get RGB from Hex for Canvas drawing
const getRGBFromHex = (hex: string) => {
  const h = hex.replace('#', '');
  if (h.length === 3) {
    return {
      r: parseInt(h[0] + h[0], 16),
      g: parseInt(h[1] + h[1], 16),
      b: parseInt(h[2] + h[2], 16),
    };
  }
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
};

// ── Particle Background ──
function renderParticles(
  canvas: HTMLCanvasElement,
  particles: { x: number; y: number; z: number; vx: number; vy: number; size: number }[],
  time: number,
  rgb: { r: number; g: number; b: number }
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const colorStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;

    const pulse = 0.5 + 0.5 * Math.sin(time * 2 + p.z);
    const alpha = 0.12 + 0.25 * pulse;
    const r = p.size * (0.8 + 0.4 * pulse);

    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${colorStr}, ${alpha})`;
    ctx.fill();

    // Soft glow
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${colorStr}, ${alpha * 0.05})`;
    ctx.fill();
  });

  // Connecting lines
  ctx.strokeStyle = `rgba(${colorStr}, 0.05)`;
  ctx.lineWidth = 0.5;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.globalAlpha = 1 - dist / 100;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

// ── Progress Bar ──
function HUDProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full max-w-s-280 h-s-3 bg-brand-primary-10 rounded-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-full rounded-full bg-brand-primary"
        style={{ boxShadow: '0 0 14px var(--brand-primary)' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}

// ══════════════════════════════════════
//  MAIN LOADER
// ══════════════════════════════════════
interface Loader3DProps {
  isFirstVisit?: boolean;
  onComplete?: () => void;
}

export const Loader3D: React.FC<Loader3DProps> = ({ isFirstVisit = false, onComplete }) => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<{ x: number; y: number; z: number; vx: number; vy: number; size: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [welcomeText, setWelcomeText] = useState('');
  const [nameVisible, setNameVisible] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const welcome = 'Welcome To';
  const name = 'MOHIT THAKUR';

  const statusLines = [
    '> SYSTEM_BOOT.........OK',
    '> LOADING_ASSETS......OK',
    '> RENDER_ENGINE.......OK',
    '> PORTFOLIO_READY...DONE',
  ];
  const [visibleLines, setVisibleLines] = useState(0);

  // Notify parent when done
  useEffect(() => {
    if (phase === 2 && onComplete) {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 500); 
      return () => clearTimeout(finishTimer);
    }
  }, [phase, onComplete]);

  // Init particles
  useEffect(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    particlesRef.current = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
    }));
  }, []);

  // Typewriter
  useEffect(() => {
    setTimeout(() => setShowImage(true), 200);
    let i = 0;
    const interval = setInterval(() => {
      if (i <= welcome.length) {
        setWelcomeText(welcome.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setNameVisible(true);
        setTimeout(() => setPhase(1), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Progress
  useEffect(() => {
    if (phase < 1) return;
    const duration = isFirstVisit ? 1600 : 700;
    const steps = 60;
    const step = 100 / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      setProgress(Math.min(current, 100));
      setVisibleLines(Math.min(Math.floor((current / 100) * statusLines.length), statusLines.length));
      if (current >= 100) {
        clearInterval(interval);
        setPhase(2);
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [phase]);

  // Particle animation loop
  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    if (!bgCanvas) return;

    let time = 0;
    const animate = () => {
      time += 0.016;
      const dpr = window.devicePixelRatio || 1;

      // Extract current theme color
      const rootStyle = getComputedStyle(document.documentElement);
      const brandHex = rootStyle.getPropertyValue('--brand-primary').trim() || '#00ff41';
      const rgb = getRGBFromHex(brandHex);

      if (bgCanvas.offsetWidth > 0) {
        bgCanvas.width = bgCanvas.offsetWidth * dpr;
        bgCanvas.height = bgCanvas.offsetHeight * dpr;
        const bgCtx = bgCanvas.getContext('2d');
        if (bgCtx) bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderParticles(bgCanvas, particlesRef.current, time, rgb);
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-bg-page">

      {/* ── Particle BG Canvas ── */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.04, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--brand-primary) 2px, var(--brand-primary) 4px)' }}
      />

      {/* Corner decorations */}
      {['top-s-12 left-s-12 border-t-2 border-l-2', 'top-s-12 right-s-12 border-t-2 border-r-2', 'bottom-s-12 left-s-12 border-b-2 border-l-2', 'bottom-s-12 right-s-12 border-b-2 border-r-2'].map((cls, i) => (
        <div key={i} className={`absolute w-s-24 h-s-24 border-brand-primary ${cls}`} style={{ opacity: 0.25 }} />
      ))}

      {/* Top HUD */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute top-s-16 left-1/2 -translate-x-1/2 font-mono text-s-9 text-brand-primary-40 tracking-[0.4em] uppercase whitespace-nowrap z-10"
      >
        SYS_INIT // MOHIT_THAKUR_OS
      </motion.div>

      {/* ═══ MAIN: Profile LEFT + Text RIGHT ═══ */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-s-20 sm:gap-s-32 md:gap-s-48 px-s-16 w-full" style={{ maxWidth: '700px' }}>

        {/* LEFT — Profile Image */}
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={showImage ? { scale: 1, opacity: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.1 }}
          className="relative flex-shrink-0"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute rounded-full border border-dashed border-brand-primary-30"
            style={{ inset: '-10px' }}
          />
          <div
            className="absolute rounded-full"
            style={{ inset: '-5px', boxShadow: '0 0 25px var(--brand-primary-20), inset 0 0 15px var(--brand-primary-10)' }}
          />
          <img
            src={profileImg}
            alt="Mohit Thakur"
            className="w-s-80 h-s-80 sm:w-s-100 sm:h-s-100 md:w-s-120 md:h-s-120 rounded-full object-cover grayscale border-2 border-brand-primary relative z-10"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={showImage ? { scale: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute -bottom-s-4 left-1/2 -translate-x-1/2 bg-brand-primary font-mono font-black px-s-8 py-s-2 rounded-full z-20 tracking-wider text-s-7 text-bg-page"
          >
            ONLINE
          </motion.div>
        </motion.div>

        {/* RIGHT — Text content */}
        <div className="flex flex-col items-center sm:items-start gap-s-6">

          {/* Welcome text */}
          <div className="font-mono text-s-18 sm:text-s-22 md:text-s-26 text-brand-primary-60 tracking-[0.2em] uppercase">
            {welcomeText}
            {welcomeText.length < welcome.length && <span className="animate-pulse">|</span>}
          </div>

          {/* Name */}
          {nameVisible && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="font-mono text-s-28 sm:text-s-38 md:text-s-48 font-black text-brand-primary tracking-tight uppercase leading-none"
            >
              {name}
              <span className="animate-pulse text-brand-primary-60">_</span>
            </motion.div>
          )}

          {/* Subtitle */}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono text-s-10 sm:text-s-11 text-text-muted tracking-[0.15em] uppercase"
            >
              {'</'} Web Designer & Developer {'>'}
            </motion.div>
          )}
        </div>
      </div>

      {/* ═══ BOTTOM: Status Lines + Progress ═══ */}
      <div className="relative z-10 flex flex-col items-center mt-s-24 sm:mt-s-32 px-s-16">
        <div className="font-mono text-s-9 sm:text-s-10 text-brand-primary-50 space-y-s-4 mb-s-12 min-h-s-60">
          {statusLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="tracking-[0.1em]"
            >
              {line}
            </motion.div>
          ))}
        </div>

        {phase >= 1 && <HUDProgressBar progress={progress} />}

        <div className="font-mono text-s-8 sm:text-s-9 text-brand-primary-30 mt-s-8 tracking-[0.3em]">
          {Math.round(progress)}% INITIALIZED
        </div>
      </div>

      {/* Bottom HUD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-s-12 left-1/2 -translate-x-1/2 font-mono text-s-7 sm:text-s-8 text-brand-primary-20 tracking-[0.2em] z-10 whitespace-nowrap"
      >
        PORTFOLIO_ENGINE v3.2 // ALL_RIGHTS_RESERVED
      </motion.div>
    </div>
  );
};
