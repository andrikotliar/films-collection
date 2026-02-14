import './main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import { toaster, NotFound, Toaster, ErrorScreen, Loader } from '~/shared';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _ctx, mutation) => {
      if (mutation.meta?.successMessage) {
        toaster.success(mutation.meta.successMessage);
      }

      if (mutation.meta?.invalidateQueries) {
        for (const keys of mutation.meta.invalidateQueries) {
          queryClient.invalidateQueries({ queryKey: keys.filter(Boolean) });
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
  defaultNotFoundComponent: () => <NotFound />,
  defaultErrorComponent: ({ error }) => {
    return <ErrorScreen error={error} />;
  },
  defaultPendingComponent: () => {
    return <Loader isFullPage />;
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
      invalidateQueries?: Array<readonly unknown[]>;
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
