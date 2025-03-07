import { Layout } from '@/ui';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => <Layout />,
  },
);
