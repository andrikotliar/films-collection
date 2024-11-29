import { Layout, NotFound } from '@/components';
import { createRootRoute } from '@tanstack/react-router';

const Route = createRootRoute({
  component: () => <Layout />,
  errorComponent: () => <NotFound />,
});

export { Route };
