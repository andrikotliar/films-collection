import { Loader } from '@/components';
import { AboutPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

const Route = createLazyFileRoute('/about')({
  component: () => <AboutPage />,
  pendingComponent: () => <Loader isFullPage />,
});

export { Route };
