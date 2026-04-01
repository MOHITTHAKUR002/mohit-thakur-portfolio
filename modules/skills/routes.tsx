import type { RouteObject } from 'react-router-dom';
import { SkillsPage } from '@modules/skills/pages/SkillsPage';

export const skillsRoutes: RouteObject[] = [
  {
    path: '/skills',
    element: <SkillsPage />
  }
];
