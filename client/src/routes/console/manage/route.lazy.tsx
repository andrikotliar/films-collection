import { ConsoleManageFilmsPage } from '@/pages/console/manage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/console/manage')({
  component: ConsoleManageFilmsPage,
});
