import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { loadFeatureRoutes } from './features/loadFeatureRoutes';

function App() {
  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter> | null>(null);

  useEffect(() => {
    loadFeatureRoutes().then((routes) => {
      setRouter(createBrowserRouter([
        {
          path: '/',
          element: <MainLayout />,
          children: routes
        }
      ]));
    });
  }, []);

  if (!router) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-bg-inverse text-brand-primary">
        <div className="animate-pulse flex flex-col items-center gap-s-16">
          <div className="w-s-40 h-s-40 rounded-full border-t-2 border-r-2 border-brand-primary animate-spin"></div>
          <p className="text-s-14 font-medium tracking-widest uppercase">Initializing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="antialiased min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
