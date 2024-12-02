import { Layout } from '@/components';
import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext } from '@tanstack/react-router';

const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: () => <Layout />,
});

export { Route };
