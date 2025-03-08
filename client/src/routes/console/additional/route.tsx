import { NotFound } from '@/ui';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/console/additional')({
  component: () => (
    <NotFound title="Lists" message="Page is under construction" />
  ),
});
