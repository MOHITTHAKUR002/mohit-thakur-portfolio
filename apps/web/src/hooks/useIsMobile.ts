import { useState, useEffect } from 'react';

/**
 * useIsMobile
 * Hook to detect if the viewport is within mobile range.
 * Initializes with the actual window.innerWidth to prevent 
 * animation jank on mount.
 */
export function useIsMobile(breakpoint: number = 768) {
  // Initialize with correct value to prevent 'initial' prop jank in Framer Motion
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // No need to call handleResize() here as we initialized with state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
