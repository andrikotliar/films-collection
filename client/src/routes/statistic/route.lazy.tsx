import { StatisticPage } from '@/pages';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/statistic')({
  component: () => <StatisticPage />,
});
