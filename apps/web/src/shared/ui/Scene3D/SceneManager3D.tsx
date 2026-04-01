import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLocation } from 'react-router-dom';
import { HomeScene, ProjectsScene, SkillsScene, ExperienceScene } from './ModuleScenes';

export const SceneManager3D: React.FC = () => {
  const location = useLocation();

  const ActiveScene = useMemo(() => {
    switch (location.pathname) {
      case '/':
        return <HomeScene />;
      case '/projects':
        return <ProjectsScene />;
      case '/skills':
        return <SkillsScene />;
      case '/experience':
        return <ExperienceScene />;
      default:
        return <HomeScene />;
    }
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-60 transition-opacity duration-1000">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <group key={location.pathname}>
            {ActiveScene}
          </group>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ff41" />
        </Suspense>
      </Canvas>
    </div>
  );
};
