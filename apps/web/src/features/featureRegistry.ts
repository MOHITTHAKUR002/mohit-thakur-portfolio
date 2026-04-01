import type { RouteObject } from 'react-router-dom';

export interface Feature {
  name: string;
  enabled: boolean;
  routes: () => Promise<RouteObject[]>;
  locales?: (lang: string) => Promise<any>;
}

export const featureRegistry: Feature[] = [
  {
    name: "home",
    enabled: true,
    routes: async () => (await import("@modules/home/routes")).homeRoutes,
  },
  {
    name: "skills",
    enabled: true,
    routes: async () => (await import("@modules/skills/routes")).skillsRoutes,
  },
  {
    name: "projects",
    enabled: true,
    routes: async () => (await import("@modules/projects/routes")).projectsRoutes,
  },
  {
    name: "experience",
    enabled: true,
    routes: async () => (await import("@modules/experience/routes")).experienceRoutes,
  },
  {
    name: "contact",
    enabled: true,
    routes: async () => (await import("@modules/contact/routes")).contactRoutes,
  }
];
