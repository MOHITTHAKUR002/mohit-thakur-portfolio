import type { RouteObject } from 'react-router-dom';
import { featureRegistry } from './featureRegistry';

export async function loadFeatureRoutes(): Promise<RouteObject[]> {
  const routes: RouteObject[] = [];
  
  for (const feature of featureRegistry) {
    if (feature.enabled) {
      try {
        const featureRoutes = await feature.routes();
        routes.push(...featureRoutes);
      } catch (e) {
        console.error(`[Feature Loader] Failed to load routes for feature: ${feature.name}`, e);
      }
    }
  }
  
  return routes;
}
