import { ConsolePage } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/console/')({
  component: () => <ConsolePage />,
});
