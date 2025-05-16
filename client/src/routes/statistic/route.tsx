import { NotFound } from '@/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/statistic')({
  component: () => (
    <NotFound title="Statistic" message="Page is under development" />
  ),
});
