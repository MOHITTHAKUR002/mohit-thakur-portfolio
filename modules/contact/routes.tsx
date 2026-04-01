import type { RouteObject } from 'react-router-dom';
import { ContactPage } from '@modules/contact/pages/ContactPage';

export const contactRoutes: RouteObject[] = [
  {
    path: '/contact',
    element: <ContactPage />
  }
];
