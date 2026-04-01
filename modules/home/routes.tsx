import type { RouteObject } from 'react-router-dom';
import { HeroPage } from '@modules/hero/pages/HeroPage';
import { AboutPage } from '@modules/about/pages/AboutPage';

export const homeRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <HeroPage />
        <AboutPage />
      </>
    )
  }
];
