import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../common/Navbar/Navbar';
import { Footer } from '../common/Footer/Footer';
import { CustomCursor } from '@shared/ui/Cursor/CustomCursor';
import { FloatingContactIcon } from '@shared/ui/FloatingContactIcon/FloatingContactIcon';
import { TransitionLayout } from './TransitionLayout';
import { SceneManager3D } from '../shared/ui/Scene3D/SceneManager3D';
import { Loader3D } from '../common/Loader/Loader3D';
import { usePageLoader } from '../hooks/usePageLoader';

export const MainLayout: React.FC = () => {
  const { isLoading, completeLoading } = usePageLoader();
  const isFirstVisitRef = useRef(!sessionStorage.getItem('mt_visited_flag'));

  // We track the very first mount to pass the prop correctly
  const isFirst = isFirstVisitRef.current;

  return (
    <div className="banner-gradient min-h-screen bg-bg-page text-text-primary selection:bg-brand-primary selection:text-button-primary-text font-secondary flex flex-col">
      <CustomCursor />

      {/* ── 3D Loader Overlay ── */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999]"
          >
            <Loader3D isFirstVisit={isFirst} onComplete={completeLoading} />
          </motion.div>
        )}
      </AnimatePresence>

      <SceneManager3D />
      <Navbar />
      <main className="flex-1 w-full mx-auto relative z-10 overflow-hidden">
        <TransitionLayout>
          <Outlet />
        </TransitionLayout>
      </main>
      <Footer />
      <FloatingContactIcon />
    </div>
  );
};
