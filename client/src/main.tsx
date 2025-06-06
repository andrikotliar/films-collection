import './global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ErrorFallback, Loader, NotFound, ToasterProvider } from './components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <Loader isFullPage />,
  defaultNotFoundComponent: () => <NotFound />,
  defaultErrorComponent: ({ error }) => {
    return <ErrorFallback message={error.message} />;
  },
  defaultPendingMs: 0,
  defaultPendingMinMs: 0,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <RouterProvider router={router} />
      </ToasterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
