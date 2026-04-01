import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function usePageLoader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstVisit = useRef(!sessionStorage.getItem('mt_visited'));
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('mt_visited');
  });

  const completeLoading = useCallback(() => {
    setIsLoading(false);
    // Auto-navigate to home after loader completes
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    // ---- FIRST VISIT ----
    if (isFirstVisit.current) {
      sessionStorage.setItem('mt_visited', '1');
      isFirstVisit.current = false;
      setIsLoading(true);
      // No internal timer; we wait for the component to call completeLoading()
    }

    // ---- /contact page specifically ----
    if (location.pathname === '/contact' && !isLoading) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return { isLoading, completeLoading };
}
