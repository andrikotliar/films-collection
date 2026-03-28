import './main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';
import { toaster, NotFound, Toaster, ErrorScreen, PageLoader } from '~/shared';

const getQueryKey = (value: string | number | (string | number)[]) => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};

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
        const options = mutation.meta.invalidateQueries;

        if (Array.isArray(options)) {
          for (const option of options) {
            queryClient.invalidateQueries({ queryKey: getQueryKey(option.queryKey) });
          }
          return;
        }

        queryClient.invalidateQueries({ queryKey: getQueryKey(options.queryKey) });
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
  defaultPendingComponent: PageLoader,
  defaultPendingMs: 0,
  defaultPendingMinMs: 0,
  context: { queryClient },
});

type InvalidateQueryOption = {
  queryKey: string | number | (string | number)[];
};

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries?: InvalidateQueryOption | InvalidateQueryOption[];
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
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </QueryClientProvider>
  </StrictMode>,
);
