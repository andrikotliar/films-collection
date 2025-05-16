import { Layout } from '@/components';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    loader: () => void 0,
    component: () => <Layout />,
  },
);
