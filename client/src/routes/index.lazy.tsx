import { RootPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

const Route = createLazyFileRoute('/')({
  component: RootPage,
});

export { Route };
