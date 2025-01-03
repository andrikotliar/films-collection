import { AboutPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
  component: () => <AboutPage />,
});
