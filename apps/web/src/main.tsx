import './global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { ErrorFallback, Loader, NotFound, Toaster } from './components';
import { toaster } from '~/common';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _ctx, mutation) => {
      if (mutation.meta?.successMessage) {
        toaster.success(mutation.meta.successMessage);
      }

      if (mutation.meta?.invalidateQueries) {
        const queriesList = mutation.meta.invalidateQueries;

        if (typeof queriesList === 'string') {
          queryClient.invalidateQueries({
            queryKey: [mutation.meta.invalidateQueries],
          });
          return;
        }

        for (const queryKeys of queriesList) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys],
          });
        }
      }
    },
    onError: (error, _vars, _ctv, mutation) => {
      if (mutation.meta?.skipErrorToast) {
        return;
      }

      toaster.error(error);
    },
  }),
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

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries?: string | (string | string[])[];
      successMessage?: string;
      skipErrorToast?: boolean;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
