import './main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { routeTree } from './routeTree.gen';
import {
  Toaster,
  ErrorScreen,
  PageLoader,
  queryClient,
  type InvalidateQueryOption,
} from '~/shared';
import { HttpError } from '@films-collection/api-client';

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    const error = new HttpError(404, 'Not found', {});
    return <ErrorScreen error={error} />;
  },
  defaultErrorComponent: ({ error }) => {
    return <ErrorScreen error={error} />;
  },
  defaultPendingComponent: PageLoader,
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
