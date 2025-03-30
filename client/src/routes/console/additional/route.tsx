import { NotFound } from '@/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/additional')({
  component: () => (
    <NotFound title="General Data" message="Page is under construction" />
  ),
});
