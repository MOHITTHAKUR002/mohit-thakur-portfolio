import type { RouteObject } from 'react-router-dom';
import { ProjectsPage } from '@modules/projects/pages/ProjectsPage';

export const projectsRoutes: RouteObject[] = [
  {
    path: '/projects',
    element: <ProjectsPage />
  }
];
